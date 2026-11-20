'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [['/fines', 'Fines'], ['/traffic', 'Traffic'], ['/about', 'About']]

export default function Nav() {
  const path = usePathname()
  return (
    <nav className="nav" aria-label="Main">
      {links.map(([href, label]) => (
        <Link key={href} href={href} aria-current={path.startsWith(href) ? 'page' : undefined}>{label}</Link>
      ))}
    </nav>
  )
}
