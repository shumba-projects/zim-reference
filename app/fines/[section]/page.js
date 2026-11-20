import { notFound } from 'next/navigation'
import Link from 'next/link'
import offences from '../../../data/customs-offences.json'
import { ZIMRA_URL } from '../../../data/sources'
import { Zig } from '../../../lib/zig'

export const dynamicParams = false
export const generateStaticParams = () => offences.map(o => ({ section: o.section }))

export default async function Offence({ params }) {
  const { section } = await params
  const o = offences.find(x => x.section === section)
  if (!o) notFound()
  return (
    <>
      <p><Link href="/fines">← All offences</Link></p>
      <h1>Section {o.section}: {o.description}</h1>
      <p className="muted">Customs and Excise Act [Chapter 23:02]</p>
      <dl>
        <dt>Fine level</dt><dd>Level {o.level} (maximum)</dd>
        <dt>Maximum in US dollars</dt><dd>US${o.amountUsd.toLocaleString('en-US')}</dd>
        <dt>ZiG equivalent</dt><dd><Zig usd={o.amountUsd} /></dd>
        <dt>Row source</dt><dd><a href={ZIMRA_URL}>{o.source}</a>, retrieved {o.retrieved}</dd>
      </dl>
      <p>
        The fine is expressed in US dollars but may be paid in local currency at the prevailing interbank rate
        (SI 14A of 2023, s.4, as corrected by SI 19 of 2023). Courts may also impose imprisonment for many of these
        offences. Read the Act for the full penalty.
      </p>
    </>
  )
}
