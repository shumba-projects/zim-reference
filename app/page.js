import Link from 'next/link'
import { Colophon } from '../lib/ui'

export default function Home() {
  return (
    <>
      <div className="title-block">
        <h1>Zimbabwe fines and minimum wages, from the gazette</h1>
        <p className="lede">Every figure is copied from the gazetted statutory instrument, with its number and date. An independent reference, not a government service.</p>
      </div>
      <ul className="tools">
        <li>
          <Link href="/fines">
            <b>Fines and Penalties Lookup</b>
            <span>The 14 levels of the standard scale of fines, and the fine level for customs offences.</span>
          </Link>
        </li>
        <li>
          <Link href="/traffic">
            <b>Traffic deposit fines</b>
            <span>The deposit fine for about 400 traffic offences, from licences to speeding.</span>
          </Link>
        </li>
        <li>
          <Link href="/pay">
            <b>Pay Check</b>
            <span>The statutory minimum wage, its effective date and who it covers.</span>
          </Link>
        </li>
      </ul>
      <Colophon>SI 14A of 2023, SI 186 of 2024 and ZIMRA</Colophon>
    </>
  )
}
