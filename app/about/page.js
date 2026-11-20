import { SI14A_URL, SI19_URL, ZIMRA_URL } from '../../data/sources'
import { Colophon } from '../../lib/ui'

export const metadata = { title: 'About' }

export default function About() {
  return (
    <>
      <div className="title-block">
        <h1>About these figures</h1>
        <p className="lede">An independent reference built from public documents. It is not a government service and is not endorsed by any ministry, court or ZIMRA.</p>
      </div>

      <h2 style={{ marginTop: 0 }}>Fines and Penalties Lookup</h2>
      <ul className="refs">
        <li><b><a href={SI14A_URL}>SI 14A of 2023</a></b>Criminal Law (Codification and Reform) (Standard Scale of Fines) Notice, 2023. Gazetted 22 February 2023. Repeals SI 209 of 2021. The level amounts are copied from this instrument.</li>
        <li><b><a href={SI19_URL}>SI 19 of 2023</a></b>Correction of Errors, gazetted 24 February 2023. Fines are in US$ but <em>may be</em> payable in local currency at the prevailing interbank rate.</li>
        <li><b><a href={ZIMRA_URL}>ZIMRA: Offences and standard scale of fines</a></b>Web page. Source of the customs offence rows.</li>
      </ul>

      <h2>Traffic deposit fines</h2>
      <ul className="refs">
        <li><b>ZRP National Schedule of Deposit Fines (unofficial copy)</b>A copy with no issue date or ZRP letterhead. All 405 rows were checked: every amount matches the level&apos;s maximum in SI 14A of 2023. Replace it once the current schedule is obtained from ZRP directly.</li>
      </ul>

      <h2>Exchange rate</h2>
      <p>ZiG amounts use the Reserve Bank of Zimbabwe official interbank rate (via AllRatesToday), not the market rate. The two can differ by several percent. The rate date is shown next to every converted amount.</p>
      <p>Consult a lawyer, ZIMRA or the ZRP about your own situation.</p>

      <Colophon>SI 14A of 2023, SI 19 of 2023, ZIMRA and a ZRP schedule copy</Colophon>
    </>
  )
}
