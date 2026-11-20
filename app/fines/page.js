'use client'
import { useState } from 'react'
import Link from 'next/link'
import levels from '../../data/fine-levels.json'
import offences from '../../data/customs-offences.json'
import { Zig, RateDate } from '../../lib/zig'
import { usd, ramp, LevelGauge, SearchIcon, Notes } from '../../lib/ui'
import { SI19_URL } from '../../data/sources'

export default function Fines() {
  const [q, setQ] = useState('')
  const s = q.trim().toLowerCase()
  const hits = offences.filter(o => `${o.section} ${o.description}`.toLowerCase().includes(s))

  return (
    <>
      <div className="title-block">
        <h1>Fines and Penalties Lookup</h1>
        <p className="lede">Each fine level sets the most a court can impose. Find a customs offence, or go to <a href="#scale">the scale of all 14 levels</a>.</p>
      </div>

      <div className="entry">
        <section aria-labelledby="customs">
          <h2 id="customs" style={{ marginTop: 0 }}>Customs and Excise Act offences</h2>
          <div className="search">
            <label htmlFor="q" className="visually-hidden">Search customs offences by section number or words</label>
            <SearchIcon />
            <input id="q" type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Search customs offences, e.g. smuggling or 182" autoComplete="off" />
          </div>
          <p className="count" aria-live="polite">
            {hits.length === offences.length ? `${hits.length} offences` : `${hits.length} of ${offences.length} offences`}
          </p>
          <table className="schedule stack">
            <thead>
              <tr><th scope="col">Section</th><th scope="col">Offence</th><th scope="col">Level</th><th scope="col" className="num">Maximum fine</th></tr>
            </thead>
            <tbody>
              {hits.map(o => (
                <tr key={o.section}>
                  <td className="sec">s.&nbsp;{o.section}</td>
                  <td className="desc"><Link href={`/fines/${o.section}`}>{o.description}</Link></td>
                  <td className="lvlcell"><a className="lvl" href={`#level-${o.level}`} aria-label={`Level ${o.level}: see it on the scale`}><b>{o.level}</b><LevelGauge level={o.level} /></a></td>
                  <td className="num"><span className="amt">{usd(o.amountUsd)}</span><span className="zig"><Zig usd={o.amountUsd} short /></span></td>
                </tr>
              ))}
              {!hits.length && (
                <tr className="empty"><td colSpan={4}>No customs offence matches “{q}”. Try a section number such as 182, or a single word such as “invoice”.</td></tr>
              )}
            </tbody>
          </table>
        </section>

        <Notes more={[
          <div className="note plain" key="src"><b>Row source</b><p>Offences as listed by ZIMRA. For traffic offences, see <Link href="/traffic">Traffic deposit fines</Link>.</p></div>,
        ]}>
          <div className="note">
            <b>Maximum, not fixed</b>
            <p>A court can set a lower fine within a level, never a higher one.</p>
          </div>
        </Notes>
      </div>

      <div className="entry">
        <section aria-labelledby="scale">
          <h2 id="scale">Standard scale of fines</h2>
          <table className="schedule dense">
            <caption><RateDate /></caption>
            <thead>
              <tr><th scope="col">Level</th><th scope="col" className="ramp-cell"><span className="visually-hidden">Relative size</span></th><th scope="col" className="num">Maximum</th><th scope="col" className="num">ZiG</th></tr>
            </thead>
            <tbody>
              {levels.map(l => (
                <tr key={l.level} id={`level-${l.level}`}>
                  <td className="sec">{l.level}</td>
                  <td className="ramp-cell"><div className="ramp" style={{ '--w': ramp(l.maxUsd) }} /></td>
                  <td className="num"><b>{usd(l.maxUsd)}</b></td>
                  <td className="num zig-col"><Zig usd={l.maxUsd} short /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <Notes label="Notes on the scale" more={[
          <div className="note plain" key="bar"><b>Bar length</b><p>Drawn on a log scale so that US$5 and US$5,000 fit on one line.</p></div>,
        ]}>
          <div className="note scale-note">
            <b>Corrected 24 Feb 2023</b>
            <p>Set in US dollars but <em>may be</em> paid in local currency at the interbank rate (<a href={SI19_URL}>SI 19 of 2023</a>).</p>
          </div>
        </Notes>
      </div>
    </>
  )
}
