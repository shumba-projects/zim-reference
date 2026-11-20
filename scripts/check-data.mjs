// Data sanity check: `npm test`
import assert from 'node:assert/strict'
import levels from '../data/fine-levels.json' with { type: 'json' }
import offences from '../data/customs-offences.json' with { type: 'json' }
import traffic from '../data/traffic-offences.json' with { type: 'json' }

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
console.log(`ok: ${levels.length} levels, ${offences.length} customs, ${traffic.length} traffic rows`)
