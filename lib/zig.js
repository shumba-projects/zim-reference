'use client'
import { useEffect, useState } from 'react'

let pending // one request per page load, shared by every <Zig/>
const load = () =>
  (pending ??= fetch('/api/zig-rate').then(r => r.json()).then(j => (j.error ? Promise.reject(j.error) : j)))

export function useZigRate() {
  const [s, set] = useState({ loading: true })
  useEffect(() => {
    load().then(j => set(j), e => set({ error: String(e) }))
  }, [])
  return s
}

const fmt = n => n.toLocaleString('en-ZW', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
export const usd = n => `US$${n.toLocaleString('en-US')}`

export function Zig({ usd: amount }) {
  const { rate, rateDate, loading, error } = useZigRate()
  if (loading) return <span className="muted">…</span>
  if (error) return <span className="muted">ZiG conversion unavailable</span>
  return (
    <span>
      ZiG {fmt(amount * rate)} <small className="muted">(RBZ official rate, {rateDate})</small>
    </span>
  )
}
