'use client'
import { useState } from 'react'
import Link from 'next/link'
import rows from '../../data/traffic-offences.json'
import notes from '../../data/traffic-notes.json'
import { Zig } from '../../lib/zig'
import { usd, LevelGauge, SearchIcon, Notes } from '../../lib/ui'

const PAGE = 30
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
  const [limit, setLimit] = useState(PAGE)
  const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const hits = rows.filter(r =>
    (!cat || r.category === cat) &&
    words.every(w => `${r.section} ${r.description} ${r.instrument}`.toLowerCase().includes(w)))
  const shown = hits.slice(0, limit)

  let last = ''
  return (
    <>
      <div className="title-block">
        <h1>Traffic Deposit Fines</h1>
        <p className="lede">The amount you can pay to admit guilt for a traffic offence instead of going to court.</p>
        <p className="flag"><b>Unofficial copy.</b> Amounts checked against SI 14A of 2023. See the notes.</p>
      </div>

      <div className="entry">
        <section aria-label="Traffic offences">
          <div className="fields">
            <div className="search" style={{ marginBottom: 0 }}>
              <label htmlFor="tq" className="visually-hidden">Search traffic offences by section or words</label>
              <SearchIcon />
              <input id="tq" type="search" value={q} onChange={e => { setQ(e.target.value); setLimit(PAGE) }} placeholder="Search, e.g. speed, licence, seat belt" autoComplete="off" />
            </div>
            <label><span className="visually-hidden">Type of offence</span>
              <select value={cat} onChange={e => { setCat(e.target.value); setLimit(PAGE) }}>
                <option value="">All types of offence</option>
                {categories.map(c => <option key={c} value={c}>{c} ({rows.filter(r => r.category === c).length})</option>)}
              </select>
            </label>
          </div>
          <p className="count" aria-live="polite">
            {hits.length === rows.length ? `${rows.length} offences` : `${hits.length} of ${rows.length} offences`}
            {hits.length > shown.length && `, showing the first ${shown.length}`}
          </p>
          <table className="schedule stack">
            <thead>
              <tr><th scope="col">Section</th><th scope="col">Offence</th><th scope="col">Level</th><th scope="col" className="num">Deposit fine</th></tr>
            </thead>
            <tbody>
              {shown.map(r => {
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
          {hits.length > shown.length && (
            <button type="button" className="more" onClick={() => setLimit(l => l + PAGE)}>
              Show {Math.min(PAGE, hits.length - shown.length)} more ({hits.length - shown.length} left)
            </button>
          )}
        </section>

        <Notes more={[
          <div className="note plain" key="court">
            <b>Deposit fine, not the court maximum</b>
            <p>If the case goes to court, the Road Traffic Act allows much higher fines and sometimes prison. “Court” means the offence cannot be settled with a deposit fine.</p>
          </div>,
          ...notes.filter(n => !/payable/i.test(n)).map(n => <div className="note plain" key={n}><b>Schedule note</b><p>{n}</p></div>),
        ]}>
          <div className="note">
            <b>Unofficial copy</b>
            <p>From a copy of the ZRP National Schedule of Deposit Fines with no issue date or ZRP letterhead. Every amount matches the gazetted scale in <a href={SI14A_URL}>SI 14A of 2023</a>.</p>
          </div>
          <div className="note">
            <b>Spot fines</b>
            <p>Not confirmed whether police currently collect these at the roadside. Ask for an official receipt, or pay at a police station or court.</p>
          </div>
        </Notes>
      </div>
    </>
  )
}
