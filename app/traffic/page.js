'use client'
import { useState } from 'react'
import Link from 'next/link'
import rows from '../../data/traffic-offences.json'
import notes from '../../data/traffic-notes.json'
import { Zig } from '../../lib/zig'
import { usd, LevelGauge, SearchIcon } from '../../lib/ui'
import { SI14A_URL } from '../../data/sources'

const categories = [...new Set(rows.map(r => r.category))]
const instrumentName = i => i.replace(/\s+/g, ' ').toLowerCase().replace(/(^|[\s(\[])([a-z])/g, (_, p, c) => p + c.toUpperCase()).replace(/\bA\.r\.w\b/gi, 'read with').replace(/ (And|Of|The|Or|To|In|With|For) /g, m => m.toLowerCase())

function Amount({ r }) {
  if (r.amountUsd !== null) return <><span className="amt">{usd(r.amountUsd)}</span><span className="zig"><Zig usd={r.amountUsd} short /></span></>
  const t = r.amountText.toLowerCase()
  if (t === 'caution') return <span className="amt">Caution</span>
  if (t === 'court') return <span className="amt">Court</span>
  if (t.endsWith('/court')) return <><span className="amt">{usd(Number(t.split('/')[0]))}</span><span className="zig">or court</span></>
  return <span className="amt">{t.split('/').map(n => usd(Number(n))).join(' / ')}</span> // as printed, e.g. day / night
}

export default function Traffic() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')
  const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const hits = rows.filter(r =>
    (!cat || r.category === cat) &&
    words.every(w => `${r.section} ${r.description} ${r.instrument}`.toLowerCase().includes(w)))

  let last = ''
  return (
    <>
      <div className="title-block">
        <h1>Traffic deposit fines</h1>
        <p className="lede">The deposit fine for a traffic offence: the amount you can pay to admit guilt instead of going to court.</p>
      </div>

      <div className="entry">
        <section aria-label="Traffic offences">
          <div className="fields">
            <div className="search" style={{ marginBottom: 0 }}>
              <label htmlFor="tq">Search by section or words</label>
              <SearchIcon />
              <input id="tq" type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="e.g. speed, licence, seat belt" autoComplete="off" />
            </div>
            <label>Type of offence
              <select value={cat} onChange={e => setCat(e.target.value)}>
                <option value="">All types</option>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </label>
          </div>
          <p className="count" aria-live="polite">{hits.length === rows.length ? `${rows.length} offences` : `${hits.length} of ${rows.length} offences`}</p>
          <table className="schedule stack">
            <thead>
              <tr><th scope="col">Section</th><th scope="col">Offence</th><th scope="col">Level</th><th scope="col" className="num">Deposit fine</th></tr>
            </thead>
            <tbody>
              {hits.map(r => {
                const head = r.instrument !== last ? (last = r.instrument) : null
                return [
                  head && <tr key={`h${r.id}`} className="group"><th colSpan={4} scope="colgroup">{instrumentName(head)}</th></tr>,
                  <tr key={r.id}>
                    <td className="sec">{r.section.replace(/^c\.\s?s\.?\s?/i, 's. ')}</td>
                    <td className="desc">{r.description}</td>
                    <td className="lvlcell"><Link className="lvl" href={`/fines#level-${r.level}`} aria-label={`Level ${r.level}: see it on the scale`}><b>{r.level}</b><LevelGauge level={r.level} /></Link></td>
                    <td className="num"><Amount r={r} /></td>
                  </tr>,
                ]
              })}
              {!hits.length && <tr className="empty"><td colSpan={4}>No traffic offence matches. Try one word, such as “speed” or “licence”, or choose “All types”.</td></tr>}
            </tbody>
          </table>
        </section>

        <aside className="notes" aria-label="Notes">
          <div className="note">
            <b>Unofficial copy</b>
            <p>Taken from a copy of the ZRP National Schedule of Deposit Fines that has no issue date or ZRP letterhead. Every amount matches the gazetted scale in <a href={SI14A_URL}>SI 14A of 2023</a>.</p>
          </div>
          <div className="note">
            <b>Spot fines</b>
            <p>It is not confirmed whether police currently collect deposit fines at the roadside. Ask for an official receipt, or pay at a police station or court.</p>
          </div>
          <div className="note plain">
            <b>Deposit fine, not the court maximum</b>
            <p>If the case goes to court, the Road Traffic Act allows much higher fines and sometimes prison. “Court” means the offence cannot be settled with a deposit fine.</p>
          </div>
          {notes.filter(n => !/payable/i.test(n)).map(n => <div className="note plain" key={n}><b>Schedule note</b><p>{n}</p></div>)}
        </aside>
      </div>
    </>
  )
}
