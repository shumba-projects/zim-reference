import { CHECKED, SI14A_URL, SI19_URL, ZIMRA_URL, SI186_URL } from '../../data/sources'

export default function About() {
  return (
    <>
      <h1>About</h1>
      <h2>Fines and Penalties Lookup</h2>
      <ul>
        <li><a href={SI14A_URL}>SI 14A of 2023</a>: Criminal Law (Codification and Reform) (Standard Scale of Fines) Notice, 2023. Gazetted 22 February 2023. Repeals SI 209 of 2021. Level amounts are copied from this instrument.</li>
        <li><a href={SI19_URL}>SI 19 of 2023</a>: Correction of Errors, gazetted 24 February 2023. Fines are in US$ but <em>may be</em> payable in local currency at the prevailing interbank rate.</li>
        <li><a href={ZIMRA_URL}>ZIMRA: Offences and standard scale of fines</a> (web page). Source of the customs offence rows.</li>
      </ul>
      <p>Traffic offences are not included until the current ZRP Schedule of Deposit Fines is obtained from ZRP.</p>
      <h2>Pay Check</h2>
      <ul>
        <li><a href={SI186_URL}>SI 186 of 2024</a>: Labour Relations (Specification of Minimum Wages) (Amendment) Notice, 2024 (No. 17). Gazetted 22 November 2024.</li>
      </ul>
      <h2>Exchange rate</h2>
      <p>ZiG amounts use the Reserve Bank of Zimbabwe official interbank rate (via AllRatesToday), not the market rate. The two can differ by several percent. The rate date is shown next to every converted amount.</p>
      <p className="source">Last checked: {CHECKED}. Information only, not legal advice. Consult a lawyer, ZIMRA or your National Employment Council about your situation.</p>
    </>
  )
}
