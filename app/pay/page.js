'use client'
import { useState } from 'react'
import wages from '../../data/minimum-wages.json'
import { Zig } from '../../lib/zig'
import { Notes } from '../../lib/ui'

const sectors = [...new Set(wages.map(w => w.sector))]

export default function Pay() {
  const [sector, setSector] = useState(sectors[0])
  const grades = wages.filter(w => w.sector === sector)
  const [grade, setGrade] = useState(grades[0].grade)
  const w = grades.find(g => g.grade === grade) ?? grades[0]

  return (
    <>
      <div className="title-block">
        <h1>Pay Check</h1>
        <p className="lede">The legal minimum wage for your kind of work, when it took effect and who it covers.</p>
        {w.status && <p className="flag"><b>May be out of date.</b> {w.status.replace(/, so this figure may be out of date\.$/, '.')}</p>}
      </div>

      <div className="fields">
        <label>Kind of work
          <select value={sector} onChange={e => { setSector(e.target.value); setGrade(wages.find(x => x.sector === e.target.value).grade) }}>
            {sectors.map(s => <option key={s}>{s}</option>)}
          </select>
        </label>
        {grades.length > 1 && (
          <label>Grade
            <select value={grade} onChange={e => setGrade(e.target.value)}>
              {grades.map(g => <option key={g.grade}>{g.grade}</option>)}
            </select>
          </label>
        )}
      </div>

      <div className="entry">
        <section className="figure" aria-live="polite" aria-label="Legal minimum">
          <dl>
            <div>
              <dt>Legal minimum</dt>
              <dd className="big">{w.minimum.toFixed(2)} <small>per {w.period}</small></dd>
            </div>
            <div>
              <dt>Currency</dt>
              <dd>{w.currency}</dd>
            </div>
            {w.zigAllowed && (
              <div>
                <dt>ZiG equivalent</dt>
                <dd><Zig usd={w.minimum} /></dd>
              </div>
            )}
            <div>
              <dt>Effective from</dt>
              <dd>{w.effectiveFrom}{w.effectiveNote && <><br /><small>{w.effectiveNote}</small></>}</dd>
            </div>
            <div>
              <dt>Instrument</dt>
              <dd><a href={w.url}>{w.si}</a>, retrieved {w.retrieved}</dd>
            </div>
          </dl>
        </section>

        <Notes more={[
          <div className="note" key="pay"><b>Payment rule</b><p>{w.payableNote}</p></div>,
        ]}>
          {w.excludes && <div className="note"><b>Not covered</b><p>{w.excludes}</p></div>}
          <div className="note plain">
            <b>Check your sector</b>
            <p>Most workers are covered by their sector&apos;s National Employment Council agreement, not by this general rate. Check with your NEC.</p>
          </div>
        </Notes>
      </div>
    </>
  )
}
