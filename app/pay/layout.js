import { SI186_URL } from '../../data/sources'
import { Colophon } from '../../lib/ui'

export const metadata = { title: 'Pay Check' }

export default function PayLayout({ children }) {
  return (
    <>
      {children}
      <Colophon><a href={SI186_URL}>SI 186 of 2024</a></Colophon>
    </>
  )
}
