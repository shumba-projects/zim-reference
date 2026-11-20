'use client'
import { useState } from 'react'
import Link from 'next/link'
import levels from '../../data/fine-levels.json'
import offences from '../../data/customs-offences.json'
import { Zig, usd } from '../../lib/zig'

export default function Fines() {
  const [q, setQ] = useState('')
  const s = q.trim().toLowerCase()
  const hits = offences.filter(o => `${o.section} ${o.description}`.toLowerCase().includes(s))

  return (
    <>
      <h1>Fines and Penalties Lookup</h1>
      <label>
        Search customs offences (section or words)
        <br />
        <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="e.g. smuggling or 182" />
      </label>
      <table>
        <thead><tr><th>Section</th><th>Offence</th><th>Level</th><th>Max fine</th></tr></thead>
        <tbody>
          {hits.map(o => (
            <tr key={o.section}>
              <td>{o.section}</td>
              <td><Link href={`/fines/${o.section}`}>{o.description}</Link></td>
              <td>{o.level}</td>
              <td>{usd(o.amountUsd)}<br /><Zig usd={o.amountUsd} /></td>
            </tr>
          ))}
          {!hits.length && <tr><td colSpan={4}>No customs offence matches “{q}”.</td></tr>}
        </tbody>
      </table>
      <p className="muted">Customs and Excise Act offences as listed by ZIMRA. Traffic offences are not covered.</p>

      <h2>Standard scale of fines</h2>
      <p>Each level is a maximum. A court may impose less, but never more.</p>
      <table>
        <thead><tr><th>Level</th><th>Maximum</th><th>ZiG equivalent</th></tr></thead>
        <tbody>
          {levels.map(l => (
            <tr key={l.level}><td>{l.level}</td><td>{usd(l.maxUsd)}</td><td><Zig usd={l.maxUsd} /></td></tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
