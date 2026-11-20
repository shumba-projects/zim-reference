// Data sanity check: `npm test`
import assert from 'node:assert/strict'
import levels from '../data/fine-levels.json' with { type: 'json' }
import offences from '../data/customs-offences.json' with { type: 'json' }
import wages from '../data/minimum-wages.json' with { type: 'json' }

assert.deepEqual(levels.map(l => l.level), [...Array(14)].map((_, i) => i + 1), 'levels 1-14')
for (const r of [...levels, ...offences, ...wages]) {
  assert.ok(r.retrieved && /^\d{4}-\d\d-\d\d$/.test(r.retrieved), `retrieved date on ${JSON.stringify(r)}`)
}
for (const l of levels) assert.ok(l.maxUsd > 0 && l.source, `level ${l.level} filled`)
const byLevel = Object.fromEntries(levels.map(l => [l.level, l.maxUsd]))
for (const o of offences) {
  assert.ok(o.source, `source on s.${o.section}`)
  // ZIMRA's amount must match the gazetted scale for that level
  assert.equal(o.amountUsd, byLevel[o.level], `s.${o.section} amount vs level ${o.level}`)
}
for (const w of wages) assert.ok(w.minimum > 0 && w.si && w.effectiveFrom, `wage ${w.sector}`)
console.log(`ok: ${levels.length} levels, ${offences.length} offences, ${wages.length} wage rows`)
