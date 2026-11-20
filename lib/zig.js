'use client'
import { useEffect, useState } from 'react'

let pending // one request per page load, shared by every <Zig/>
const load = () =>
  (pending ??= fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/zig-rate.json`, { cache: 'no-cache' })
    .then(r => r.json())
    .then(j => (j.error ? Promise.reject(j.error) : j)))

export function useZigRate() {
  const [s, set] = useState({ loading: true })
  useEffect(() => {
    load().then(j => set(j), e => set({ error: String(e) }))
  }, [])
  return s
}

const fmt = n => n.toLocaleString('en-ZW', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function Zig({ usd: amount, short }) {
  const { rate, rateDate, loading, error } = useZigRate()
  if (loading) return <span className="skel" aria-label="Loading ZiG rate" />
  if (error) return <span>ZiG conversion unavailable</span>
  return (
    <span>
      ZiG {fmt(amount * rate)}
      {short ? null : <> <small>at the RBZ official rate of {rateDate}</small></>}
    </span>
  )
}

export function RateDate() {
  const { rateDate, loading, error } = useZigRate()
  if (loading || error) return null
  return <>ZiG amounts use the RBZ official rate of {rateDate}.</>
}
