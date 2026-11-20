// Runs in GitHub Actions (or locally) with ALLRATESTODAY_API_KEY set.
// Writes public/zig-rate.json, which ships as a static file. The key never leaves the build machine.
import { writeFileSync, mkdirSync } from 'node:fs'

const URL = 'https://allratestoday.com/api/v1/central-bank/rbz/latest?source=USD&target=ZWG'
let out
try {
  const key = process.env.ALLRATESTODAY_API_KEY
  if (!key) throw new Error('ALLRATESTODAY_API_KEY not set')
  const r = await fetch(URL, { headers: { Authorization: `Bearer ${key}` } })
  if (!r.ok) throw new Error(`upstream ${r.status}`)
  const j = await r.json()
  if (typeof j.rate !== 'number' || !(j.rate > 0) || !j.rate_date) throw new Error('bad payload')
  out = { rate: j.rate, rateDate: j.rate_date, derived: !!j.derived }
} catch (e) {
  console.error('zig-rate:', e.message) // site still deploys; it shows "ZiG conversion unavailable"
  out = { error: 'RBZ rate unavailable' }
}
mkdirSync('public', { recursive: true })
writeFileSync('public/zig-rate.json', JSON.stringify(out))
console.log(out)
