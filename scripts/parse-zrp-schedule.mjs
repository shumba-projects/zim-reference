// Turns the ZRP "National Schedule of Deposit Fines" into data/traffic-offences.json.
// Usage: pdftotext -raw <schedule.pdf> schedule.txt && node scripts/parse-zrp-schedule.mjs schedule.txt <retrieved YYYY-MM-DD>
// The PDF itself is not committed (the copy we hold carries a private person's watermark).
import { readFileSync, writeFileSync } from 'node:fs'

const [file, retrieved] = process.argv.slice(2)
if (!file || !/^\d{4}-\d\d-\d\d$/.test(retrieved ?? '')) throw new Error('usage: parse-zrp-schedule.mjs <raw.txt> <YYYY-MM-DD>')

const SCALE = { 1: 5, 2: 15, 3: 30, 4: 100, 5: 200, 6: 300, 7: 400, 8: 500, 9: 600, 10: 700, 11: 1000, 12: 2000, 13: 3000, 14: 5000 }
const lines = readFileSync(file, 'utf8').replace(/\r/g, '').split('\n')
  .map(l => l.replace(/ /g, ' ').replace(/\s+/g, ' ').trim())
  .filter(l => l && !/@|^\d+$|^NATIONAL SCHEDULE|^SECTION OFFENCE|^\(US\$\)$/.test(l))

// Row end: "<text> .... <level> <amount>"; a few rows have no dot leader.
const ROW = /^(.*?)(?:\s*\.{2,}\s*|\s+)(1[0-4]|[1-9])\s+(\d+(?:\/(?:\d+|court))?|Caution|Court)\s*$/i
const SEC = /^(c\.\s?s\.?\s?\S+(?:\s?a\.r\.w\.?\s?(?:s\.?\s?)?\(?\w+\)?(?:\(\w+\))*)*)\s*(.*)$/i
const caps = l => l === l.toUpperCase() && /[A-Z]{3}/.test(l)

const rows = []
const clean = t => t.replace(/(\s*\.{2,}\s*)+/g, ' ').trim()
// group: a caps sub-head (e.g. ALL LIGHT MOTOR VEHICLES) that qualifies every row until the next heading.
// lead: an offence stem whose variants follow as separate rows (e.g. animals grazing, DAY/NIGHT).
let category = '', instrument = '', section = '', group = '', lead = '', buf = []
const takeSection = t => {
  const s = t.match(SEC)
  if (!s) return t
  let rest = s[2].trim()
  const sub = rest.match(/^(\(\w+\))\s+(.*)$/) // "a.r.w. (10) Licensed..." → keep (10) in the section
  if (sub && /a\.r\.w\.?$/i.test(s[1])) { s[1] += ` ${sub[1]}`; rest = sub[2] }
  section = s[1].replace(/\s+/g, ' ')
  lead = ''
  return rest
}
const dropped = [], notes = []
let inNote = false
for (const l of lines) {
  const m = l.match(ROW)
  if (!m) {
    if (/^\[?(Note|NB)\b/i.test(l)) { notes.push(l); inNote = !/\]$/.test(l); buf = []; continue }
    if (inNote && !/^c\.\s?s/i.test(l) && !caps(l)) { notes[notes.length - 1] += ` ${l}`; continue }
    inNote = false
    if (caps(l) && !buf.length) {
      if (/OFFENCES'?$/.test(l)) { category = l; instrument = ''; group = ''; lead = '' }
      else if (/ACT|REGULATIONS|REGS|\[CHAPTER|^S\.?\s?I|^RGN|^SI\b/.test(l)) { instrument = l; group = ''; lead = '' }
      else { group = l; lead = '' }
      continue
    }
    if (caps(l) && buf.length && !/^c\.\s?s/i.test(l)) { const t = takeSection(clean(buf.join(' '))); lead = `${t} ${l}`; buf = []; continue }
    if (/^\(/.test(l) && !buf.length && rows.length) { rows.at(-1).description += ` ${l}`; continue } // trailing note for the row above
    if (/^c\.\s?s/i.test(l) && buf.length && !/^c\.\s?s/i.test(buf[0])) { dropped.push(buf.join(' ')); buf = [] } // stray note before a new section
    buf.push(l)
    continue
  }
  inNote = false
  let text = clean([...buf, m[1]].join(' '))
  buf = []
  text = takeSection(text)
  const [level, amount] = [Number(m[2]), m[3]]
  const amountUsd = /^\d+$/.test(amount) ? Number(amount) : null
  if (amountUsd !== null && SCALE[level] !== amountUsd) throw new Error(`level ${level} ≠ US$${amountUsd}: ${text}`)
  rows.push({
    id: rows.length + 1,
    category: category.replace(/'/g, '').replace(/\s+OFFENCES$/, '').toLowerCase().replace(/^\w/, c => c.toUpperCase()),
    instrument: instrument.replace(/�/g, '-'),
    section,
    description: [group && group.charAt(0) + group.slice(1).toLowerCase(), lead.replace(/[;:]\s*/g, ', '), text].filter(Boolean).join(': '),
    level,
    amountUsd,
    amountText: amount,
    source: 'ZRP National Schedule of Deposit Fines (unofficial copy)',
    retrieved,
  })
}
writeFileSync('data/traffic-offences.json', JSON.stringify(rows, null, 1) + '\n')
const tidy = n => n.replace(/^\[|\]$/g, '').replace(/^(Note|NB)\s*:?-*:?-*\s*/i, '').replace(/\s+/g, ' ').trim()
writeFileSync('data/traffic-notes.json', JSON.stringify([...new Set(notes.map(tidy))], null, 1) + '\n')
if (dropped.length) console.log('notes not attached to a row:\n  ' + dropped.join('\n  '))
console.log(`${rows.length} rows; ${rows.filter(r => r.amountUsd === null).length} without a single US$ amount`)
