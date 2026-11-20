import Link from 'next/link'
import { CHECKED } from '../data/sources'

export default function Home() {
  return (
    <>
      <h1>Zimbabwe Reference</h1>
      <ul>
        <li><Link href="/fines">Fines and Penalties Lookup</Link>: standard scale of fines and customs offences</li>
        <li><Link href="/pay">Pay Check</Link>: statutory minimum wage</li>
      </ul>
      <p className="source">Sources: SI 14A of 2023, SI 186 of 2024 and ZIMRA. Last checked: {CHECKED}. Information only, not legal advice.</p>
    </>
  )
}
