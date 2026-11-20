// Extracts every "fine not exceeding level N" clause from an Act's text into data/act-offences.json.
// Usage: pdftotext -raw act.pdf act.txt
//        node scripts/parse-act.mjs act.txt '<Act name>' '<Chapter>' '<consolidated to>' '<source label>' '<url or "">' <YYYY-MM-DD>
// Rows for the same Act are replaced; other Acts are kept.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const [file, act, chapter, consolidatedTo, source, url, retrieved] = process.argv.slice(2)
if (!/^\d{4}-\d\d-\d\d$/.test(retrieved ?? '')) throw new Error('see usage in header')

const WORDS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen']
const toLevel = w => (/^\d+$/.test(w) ? Number(w) : WORDS.indexOf(w.toLowerCase()) + 1)

// Join the text into one stream but remember where each section heading starts.
const lines = readFileSync(file, 'utf8').replace(/\r/g, '').split('\n').map(l => l.replace(/�/g, '-').trim())
const HEAD = /^(\d{1,3}[A-Z]{0,2})\.? ([A-Z][A-Za-z ,'()\-–/]{3,120}?)\.?$/
const SKIP = /^(CHAPTER|PART|ARRANGEMENT|Section$|- ?\d+ ?-$|_{5,})|\[Chapter \d+:\d+\]$/
let text = '', heads = []
for (let i = 0; i < lines.length; i++) {
  const l = lines[i]
  if (/^([A-Z]+ )?SCHEDULE \(Section/.test(l)) break // schedules (incl. amendments to other Acts) are not this Act's offences
  if (!l || SKIP.test(l)) continue
  // Some texts glue the heading to the body: "115 Inspector may make order ...environment(1) If an inspector".
  const full = l.match(HEAD)
  const h = full ?? l.match(/^(\d{1,3}[A-Z]{0,2}) ([A-Z][A-Za-z ,'\-/]{3,120}?[a-z])(?=\(\d|[A-Z][a-z]|[—-]$)/)
  if (h) {
    let title = h[2]
    const next = lines[i + 1] ?? ''
    if (full && /^[a-z][a-z ,'()\-]{0,60}$/.test(next)) title += ` ${next}` // heading wrapped onto a second line
    if (!/\b(of|and|or|the|to|in)$/i.test(title)) heads.push({ at: text.length, section: h[1], title: title.replace(/\s+/g, ' ') })
  }
  text += l.replace(/-$/, '') + (l.endsWith('-') ? '' : ' ')
}
text = text.replace(/\s+/g, ' ').replace(/\[[^\]]{0,200}?(amended|inserted|substituted|repealed)[^\]]{0,200}\]/gi, '').replace(/\s+/g, ' ')
// note: heading offsets were recorded before this clean-up, so re-anchor them by searching for each heading's text
heads = heads.map(h => ({ ...h, at: text.indexOf(`${h.section} ${h.title.split(' ').slice(0, 3).join(' ')}`) })).filter(h => h.at >= 0).sort((a, b) => a.at - b.at)

const LEVEL = /fine not exceeding level (\d{1,2}|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen)\b/gi
const rows = []
for (const m of text.matchAll(LEVEL)) {
  const level = toLevel(m[1])
  if (!(level >= 1 && level <= 14)) throw new Error(`bad level ${m[1]}`)
  let h = null
  for (const x of heads) { if (x.at <= m.index) h = x; else break }
  if (!h) throw new Error(`no heading before clause at ${m.index}`)
  // Start at the nearest clause boundary before the fine: "liable to", "; ", "--", or a paragraph marker like "(b) ".
  const win = text.slice(Math.max(0, m.index - 400), m.index)
  const sub = win.lastIndexOf('. (') // a new subsection starts after ". (n)"
  const start = m.index - win.length + Math.max(0, win.lastIndexOf('liable to'), win.lastIndexOf('; '), win.lastIndexOf('--'), sub < 0 ? 0 : sub + 2)
  const from = m.index - start > 160 ? m.index : start // long lead-ins are context, not the penalty
  const end = text.slice(m.index).search(/[;.](\s|$)/)
  const penalty = (from === m.index ? 'a ' : '') + text.slice(from, m.index + (end < 0 ? 200 : end)).replace(/^(?:;\s*|--\s*|or\s+|liable to\s*(?:--|-)?\s*)+/i, '').trim()
  const prison = penalty.match(/imprisonment for a period not exceeding ([^,;]+?)(?:,|\s+or\b|$)/i)?.[1] ?? null
  rows.push({ act, chapter, section: h.section, title: h.title, level, prison, penalty, consolidatedTo, source, url: url || null, retrieved })
}
const count = [...text.matchAll(LEVEL)].length
if (rows.length !== count) throw new Error(`captured ${rows.length} of ${count} clauses`)

const out = 'data/act-offences.json'
const prev = existsSync(out) ? JSON.parse(readFileSync(out, 'utf8')).filter(r => r.act !== act) : []
writeFileSync(out, JSON.stringify([...prev, ...rows], null, 1) + '\n')
console.log(`${act}: ${rows.length} clauses in ${new Set(rows.map(r => r.section)).size} sections`)
