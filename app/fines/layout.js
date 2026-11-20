import { CHECKED, SI14A_URL } from '../../data/sources'

export default function FinesLayout({ children }) {
  return (
    <>
      {children}
      <p className="source">
        Source: <a href={SI14A_URL}>SI 14A of 2023</a>. Last checked: {CHECKED}. Information only, not legal advice.
      </p>
    </>
  )
}
