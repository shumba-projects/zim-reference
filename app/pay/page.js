'use client'
import { useState } from 'react'
import wages from '../../data/minimum-wages.json'
import { Zig } from '../../lib/zig'

const sectors = [...new Set(wages.map(w => w.sector))]

export default function Pay() {
  const [sector, setSector] = useState(sectors[0])
  const grades = wages.filter(w => w.sector === sector)
  const [grade, setGrade] = useState(grades[0].grade)
  const w = grades.find(g => g.grade === grade) ?? grades[0]

  return (
    <>
      <h1>Pay Check</h1>
      <p className="warn">
        Most workers are covered by their sector&apos;s National Employment Council agreement, not by this general rate.
        Check with your NEC.
      </p>
      <label>Kind of work<br />
        <select value={sector} onChange={e => { setSector(e.target.value); setGrade(wages.find(x => x.sector === e.target.value).grade) }}>
          {sectors.map(s => <option key={s}>{s}</option>)}
        </select>
      </label>
      <br />
      <label>Grade<br />
        <select value={grade} onChange={e => setGrade(e.target.value)}>
          {grades.map(g => <option key={g.grade}>{g.grade}</option>)}
        </select>
      </label>

      <h2>Legal minimum: {w.minimum.toFixed(2)} per {w.period}</h2>
      {w.status && <p className="warn">{w.status}</p>}
      <dl>
        <dt>Currency</dt><dd>{w.currency}</dd>
        <dt>Payment rule</dt><dd>{w.payableNote}</dd>
        {w.zigAllowed && <><dt>ZiG equivalent</dt><dd><Zig usd={w.minimum} /></dd></>}
        <dt>Effective from</dt><dd>{w.effectiveFrom}{w.effectiveNote && <> <span className="muted">({w.effectiveNote})</span></>}</dd>
        <dt>Instrument</dt><dd><a href={w.url}>{w.si}</a>, retrieved {w.retrieved}</dd>
        {w.excludes && <><dt>Not covered</dt><dd>{w.excludes}</dd></>}
      </dl>
    </>
  )
}
