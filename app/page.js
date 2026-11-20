import Link from 'next/link'
import { Colophon } from '../lib/ui'

export default function Home() {
  return (
    <>
      <div className="title-block">
        <h1>Zimbabwe fines and penalties, from the gazette</h1>
        <p className="lede">Every figure is copied from the gazetted statutory instrument, with its number and date. An independent reference, not a government service.</p>
      </div>
      <ul className="tools">
        <li>
          <Link href="/fines">
            <b>Fines and Penalties Lookup</b>
            <span>The 14 levels of the standard scale of fines, customs offences and the ZIMRA late-return penalty.</span>
          </Link>
        </li>
        <li>
          <Link href="/offences">
            <b>Court Maximum Fines</b>
            <span>The most a court can fine for about 180 offences in the Criminal Law Code, the Environmental Management Act and the Road Traffic Act.</span>
          </Link>
        </li>
        <li>
          <Link href="/traffic">
            <b>Traffic Deposit Fines</b>
            <span>The deposit fine for about 400 traffic offences, from licences to speeding.</span>
          </Link>
        </li>
      </ul>
      <Colophon>SI 14A of 2023, ZIMRA, three consolidated Acts and a ZRP schedule copy</Colophon>
    </>
  )
}
