// Data sanity check: `npm test`
import assert from 'node:assert/strict'
import levels from '../data/fine-levels.json' with { type: 'json' }
import offences from '../data/customs-offences.json' with { type: 'json' }
import traffic from '../data/traffic-offences.json' with { type: 'json' }
import acts from '../data/act-offences.json' with { type: 'json' }
import tax from '../data/tax-penalties.json' with { type: 'json' }

assert.deepEqual(levels.map(l => l.level), [...Array(14)].map((_, i) => i + 1), 'levels 1-14')
for (const r of [...levels, ...offences, ...traffic]) {
  assert.ok(r.retrieved && /^\d{4}-\d\d-\d\d$/.test(r.retrieved), `retrieved date on ${JSON.stringify(r)}`)
}
for (const l of levels) assert.ok(l.maxUsd > 0 && l.source, `level ${l.level} filled`)
const byLevel = Object.fromEntries(levels.map(l => [l.level, l.maxUsd]))
for (const o of offences) {
  assert.ok(o.source, `source on s.${o.section}`)
  // ZIMRA's amount must match the gazetted scale for that level
  assert.equal(o.amountUsd, byLevel[o.level], `s.${o.section} amount vs level ${o.level}`)
}
for (const t of traffic) {
  assert.ok(t.section && t.description && t.source && t.retrieved, `traffic row ${t.id} complete`)
  assert.ok(t.level >= 1 && t.level <= 14, `traffic row ${t.id} level`)
  if (t.amountUsd !== null) assert.equal(t.amountUsd, byLevel[t.level], `traffic row ${t.id} amount vs level ${t.level}`)
  else assert.match(t.amountText, /^(caution|court|\d+\/(\d+|court))$/i, `traffic row ${t.id} amount text`)
  assert.ok(!/@/.test(JSON.stringify(t)), `traffic row ${t.id} has no email`)
}
for (const a of acts) {
  assert.ok(a.act && a.section && a.title && a.penalty && a.retrieved, `act row ${a.act} s.${a.section} complete`)
  assert.ok(a.level >= 1 && a.level <= 14, `act row s.${a.section} level`)
  const word = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen'][a.level - 1]
  assert.match(a.penalty, new RegExp(`level (${a.level}|${word})\\b`, 'i'), `act row s.${a.section}: penalty text must name level ${a.level}`)
}
for (const t of tax) assert.ok(t.amountUsd > 0 && t.source && t.url && t.retrieved, `tax rule ${t.id}`)
for (const [name, data] of Object.entries({ levels, offences, traffic, acts, tax })) {
  assert.ok(!/�|Ã.|â€/.test(JSON.stringify(data)), `${name}: contains a broken character`)
}
console.log(`ok: ${acts.length} act clauses, ${tax.length} tax rule,`)
console.log(`ok: ${levels.length} levels, ${offences.length} customs, ${traffic.length} traffic rows`)
