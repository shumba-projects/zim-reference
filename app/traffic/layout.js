import { SI14A_URL } from '../../data/sources'
import { Colophon } from '../../lib/ui'

export const metadata = { title: 'Traffic Deposit Fines' }

export default function TrafficLayout({ children }) {
  return (
    <>
      {children}
      <Colophon>ZRP National Schedule of Deposit Fines (unofficial copy), amounts checked against <a href={SI14A_URL}>SI 14A of 2023</a></Colophon>
    </>
  )
}
