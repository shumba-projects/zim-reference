// Server-safe UI pieces shared by every page.
import { CHECKED } from '../data/sources'

export const usd = n => `US$${n.toLocaleString('en-US')}`

// 14 ticks, filled up to the level. The recurring mark of the schedule.
export function LevelGauge({ level, of = 14 }) {
  return (
    <span className="gauge" role="img" aria-label={`Level ${level} of ${of}`}>
      {Array.from({ length: of }, (_, i) => <i key={i} className={i < level ? 'on' : undefined} />)}
    </span>
  )
}

// Log-scaled ramp so US$5 and US$5,000 both read on one scale.
export const ramp = (v, max = 5000, min = 5) => `${(8 + (92 * Math.log(v / min)) / Math.log(max / min)).toFixed(1)}%`

export function Colophon({ children }) {
  return (
    <footer className="colophon">
      <p>Source: {children}. Last checked: {CHECKED}. Information only, not legal advice.</p>
    </footer>
  )
}

// Marginal notes: key caveats stay visible, secondary ones fold away so the figures stay near the top.
export function Notes({ label = 'Notes', more = [], children }) {
  return (
    <aside className="notes" aria-label={label}>
      {children}
      {more.length > 0 && (
        <details className="more-notes">
          <summary>{more.length} more {more.length === 1 ? 'note' : 'notes'}</summary>
          {more}
        </details>
      )}
    </aside>
  )
}

export function Mark() {
  return (
    <svg className="mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 5h16M4 10h16M4 15h10M4 20h6" />
      <path className="mark-ink" d="M17 14v7" />
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21" />
    </svg>
  )
}

export function BackIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M15 5 8 12l7 7" />
    </svg>
  )
}
