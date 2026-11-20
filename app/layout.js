import Link from 'next/link'
import './globals.css'

export const metadata = { title: 'Zimbabwe Reference', description: 'Fines and minimum wages from official sources' }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link> <Link href="/fines">Fines</Link> <Link href="/pay">Pay Check</Link>{' '}
          <Link href="/about">About</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
