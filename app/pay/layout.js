import { CHECKED, SI186_URL } from '../../data/sources'

export default function PayLayout({ children }) {
  return (
    <>
      {children}
      <p className="source">
        Source: <a href={SI186_URL}>SI 186 of 2024</a>. Last checked: {CHECKED}. Information only, not legal advice.
      </p>
    </>
  )
}
