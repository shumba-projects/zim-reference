import { SI14A_URL } from '../../data/sources'
import { Colophon } from '../../lib/ui'

export const metadata = { title: 'Court maximum fines' }

export default function OffencesLayout({ children }) {
  return (
    <>
      {children}
      <Colophon>Criminal Law Code (Veritas consolidation), Environmental Management Act (EMA), Road Traffic Act (2009 consolidation); levels converted with <a href={SI14A_URL}>SI 14A of 2023</a></Colophon>
    </>
  )
}
