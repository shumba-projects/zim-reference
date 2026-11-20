import { SI14A_URL } from '../../data/sources'
import { Colophon } from '../../lib/ui'

export const metadata = { title: 'Fines and Penalties Lookup' }

export default function FinesLayout({ children }) {
  return (
    <>
      {children}
      <Colophon><a href={SI14A_URL}>SI 14A of 2023</a></Colophon>
    </>
  )
}
