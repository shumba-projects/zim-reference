'use client'
import { useState } from 'react'
import Link from 'next/link'
import rows from '../../data/act-offences.json'
import levels from '../../data/fine-levels.json'
import { Zig } from '../../lib/zig'
import { usd, LevelGauge, SearchIcon, Notes } from '../../lib/ui'
import { SI14A_URL } from '../../data/sources'

const PAGE = 30
const MAX = Object.fromEntries(levels.map(l => [l.level, l.maxUsd]))
const acts = [...new Set(rows.map(r => r.act))]
const shortAct = a => a.replace(/ \(Codification and Reform\)/, '')

export default function Offences() {
  const [q, setQ] = useState('')
  const [act, setAct] = useState('')
  const [limit, setLimit] = useState(PAGE)
  const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const hits = rows.filter(r => (!act || r.act === act) && words.every(w => `${r.section} ${r.title} ${r.penalty}`.toLowerCase().includes(w)))
  const shown = hits.slice(0, limit)
  const reset = f => v => { f(v); setLimit(PAGE) }

  let last = ''
  return (
    <>
      <div className="title-block">
        <h1>Court maximum fines</h1>
        <p className="lede">The most a court can fine you for an offence under the Criminal Law Code, the Environmental Management Act or the Road Traffic Act.</p>
      </div>

      <div className="entry">
        <section aria-label="Offences">
          <div className="fields">
            <div className="search" style={{ marginBottom: 0 }}>
              <label htmlFor="oq" className="visually-hidden">Search offences by section or words</label>
              <SearchIcon />
              <input id="oq" type="search" value={q} onChange={e => reset(setQ)(e.target.value)} placeholder="Search, e.g. theft, assault, littering" autoComplete="off" />
            </div>
            <label><span className="visually-hidden">Act</span>
              <select value={act} onChange={e => reset(setAct)(e.target.value)}>
                <option value="">All Acts</option>
                {acts.map(a => <option key={a} value={a}>{shortAct(a)} ({rows.filter(r => r.act === a).length})</option>)}
              </select>
            </label>
          </div>
          <p className="count" aria-live="polite">
            {hits.length === rows.length ? `${rows.length} penalties` : `${hits.length} of ${rows.length} penalties`}
            {hits.length > shown.length && `, showing the first ${shown.length}`}
          </p>
          <table className="schedule stack">
            <thead>
              <tr><th scope="col">Section</th><th scope="col">Offence and penalty</th><th scope="col">Level</th><th scope="col" className="num">Maximum fine</th></tr>
            </thead>
            <tbody>
              {shown.map((r, i) => {
                const head = r.act !== last ? (last = r.act) : null
                return [
                  head && <tr key={`h${i}`} className="group"><th colSpan={4} scope="colgroup">{r.act} [Chapter {r.chapter}] <span className="muted">· as amended to {r.consolidatedTo}</span></th></tr>,
                  <tr key={i}>
                    <td className="sec">s.&nbsp;{r.section}</td>
                    <td className="desc">{r.title}<span className="zig">{r.penalty}</span></td>
                    <td className="lvlcell"><Link className="lvl" href={`/fines#level-${r.level}`} aria-label={`Level ${r.level}: see it on the scale`}><b>{r.level}</b><LevelGauge level={r.level} /></Link></td>
                    <td className="num"><span className="amt">{usd(MAX[r.level])}</span><span className="zig"><Zig usd={MAX[r.level]} short /></span></td>
                  </tr>,
                ]
              })}
              {!hits.length && <tr className="empty"><td colSpan={4}>No offence matches. Try one word, such as “theft” or “noise”, or choose “All Acts”.</td></tr>}
            </tbody>
          </table>
          {hits.length > shown.length && (
            <button type="button" className="more" onClick={() => setLimit(l => l + PAGE)}>
              Show {Math.min(PAGE, hits.length - shown.length)} more ({hits.length - shown.length} left)
            </button>
          )}
        </section>

        <Notes more={[
          <div className="note plain" key="text"><b>Wording under each offence</b><p>The penalty as the Act words it. Some sections set different levels for different cases, so they appear more than once.</p></div>,
          <div className="note plain" key="zwd"><b>Old dollar amounts</b><p>Some clauses also name amounts like “fifteen million dollars”. These are pre-2009 Zimbabwe dollars and no longer apply.</p></div>,
          <div className="note plain" key="conv"><b>US$ figure</b><p>Each level is converted with the gazetted scale in <a href={SI14A_URL}>SI 14A of 2023</a>.</p></div>,
        ]}>
          <div className="note">
            <b>Maximum, not usual</b>
            <p>Courts usually impose far less than the maximum, and many offences also allow prison.</p>
          </div>
          <div className="note">
            <b>Check the date of each Act</b>
            <p>The Road Traffic Act text is only amended to 2009 and the EMA Act text to 2005. Later amendments are not included.</p>
          </div>
        </Notes>
      </div>
    </>
  )
}
