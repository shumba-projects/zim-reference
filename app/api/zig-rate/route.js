// Server only. The API key never reaches the browser.
const URL = 'https://allratestoday.com/api/v1/central-bank/rbz/latest?source=USD&target=ZWG'

export async function GET() {
  const key = process.env.ALLRATESTODAY_API_KEY
  if (!key) return Response.json({ error: 'Rate service not configured' }, { status: 503 })
  try {
    // ponytail: 4h data cache keeps free-plan usage at ~6 calls/day; fetch once after RBZ publishes if quota gets tight
    const r = await fetch(URL, { headers: { Authorization: `Bearer ${key}` }, next: { revalidate: 14400 } })
    if (!r.ok) throw new Error(`upstream ${r.status}`)
    const j = await r.json()
    if (typeof j.rate !== 'number' || !j.rate_date) throw new Error('bad payload')
    return Response.json({ rate: j.rate, rateDate: j.rate_date, derived: !!j.derived })
  } catch (e) {
    console.error('zig-rate:', e.message)
    return Response.json({ error: 'RBZ rate unavailable' }, { status: 502 })
  }
}
