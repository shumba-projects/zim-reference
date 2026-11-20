import Link from 'next/link'
import Nav from './nav'
import { Mark } from '../lib/ui'
import './globals.css'

export const metadata = {
  title: { default: 'Zimbabwe Reference', template: '%s · Zimbabwe Reference' },
  description: 'Zimbabwe fines and penalties, checked against the gazetted standard scale of fines.',
}
export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#151a20' },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="top">
          <div className="top-inner">
            <Link href="/" className="brand"><Mark /><span className="brand-name">Zimbabwe Reference</span></Link>
            <Nav />
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
