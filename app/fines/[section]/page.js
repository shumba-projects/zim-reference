import { notFound } from 'next/navigation'
import Link from 'next/link'
import offences from '../../../data/customs-offences.json'
import { ZIMRA_URL, SI19_URL } from '../../../data/sources'
import { Zig } from '../../../lib/zig'
import { usd, LevelGauge, BackIcon } from '../../../lib/ui'

export const dynamicParams = false
export const generateStaticParams = () => offences.map(o => ({ section: o.section }))

export async function generateMetadata({ params }) {
  const { section } = await params
  return { title: `Section ${section}` }
}

export default async function Offence({ params }) {
  const { section } = await params
  const o = offences.find(x => x.section === section)
  if (!o) notFound()
  return (
    <>
      <Link href="/fines" className="back"><BackIcon />All offences</Link>
      <div className="title-block">
        <p className="ident"><b>s. {o.section}</b>Customs and Excise Act [Chapter 23:02]</p>
        <h1>{o.description}</h1>
      </div>

      <div className="entry">
        <section className="figure" aria-label="Fine">
          <dl>
            <div>
              <dt>Maximum fine</dt>
              <dd className="big">{usd(o.amountUsd)} <small>at most</small></dd>
            </div>
            <div>
              <dt>Fine level</dt>
              <dd><Link className="lvl" href={`/fines#level-${o.level}`}><b>Level {o.level}</b><LevelGauge level={o.level} /></Link></dd>
            </div>
            <div>
              <dt>ZiG equivalent</dt>
              <dd><Zig usd={o.amountUsd} /></dd>
            </div>
            <div>
              <dt>Row source</dt>
              <dd><a href={ZIMRA_URL}>{o.source}</a>, retrieved {o.retrieved}</dd>
            </div>
          </dl>
        </section>

        <aside className="notes" aria-label="Notes">
          <div className="note">
            <b>Paying in ZiG</b>
            <p>The fine is set in US dollars but may be paid in local currency at the prevailing interbank rate (SI 14A of 2023, s.4, as corrected by <a href={SI19_URL}>SI 19 of 2023</a>).</p>
          </div>
          <div className="note">
            <b>Not the full penalty</b>
            <p>Courts may also impose imprisonment for many of these offences. Read the Act for the full penalty.</p>
          </div>
        </aside>
      </div>
    </>
  )
}
