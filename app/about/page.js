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

      <h2>ZIMRA tax penalties</h2>
      <ul className="refs">
        <li><b><a href="https://www.zimra.co.zw/public-notices?download=4204%3Apublic-notice-03-of-2025-vat-returns-and-payments-categories-b-and-c-due-date-25-january-2025">ZIMRA Public Notice 03 of 2025</a></b>Issued 15 January 2025. Source of the US$30-per-day penalty for late returns. The notice does not cite the section of the Act.</li>
      </ul>

      <h2>Court Maximum Fines</h2>
      <ul className="refs">
        <li><b><a href="https://veritaszim.net/sites/veritas_d/files/Crimcode%20%28updated%20to%202023.09%29.pdf">Criminal Law (Codification and Reform) Act [Chapter 9:23]</a></b>Veritas consolidated text, amended to Act 10/2023 and SI 14A/2023. 109 penalty clauses.</li>
        <li><b><a href="https://ema.co.zw/wp-content/uploads/2026/03/EMA-ACT.pdf">Environmental Management Act [Chapter 20:27]</a></b>Text as published on the EMA website, amended to Act 6/2005. 17 penalty clauses. Later amendments, if any, are not included.</li>
        <li><b>Road Traffic Act [Chapter 13:11]</b>A consolidated text amended to SI 124/2009, publisher unknown. 59 penalty clauses. Later amendments are not included.</li>
      </ul>
      <p>Each “fine not exceeding level N” clause was extracted automatically and converted with the gazetted scale. Section numbers and titles come from the same texts.</p>

      <h2>Traffic Deposit Fines</h2>
      <ul className="refs">
        <li><b>ZRP National Schedule of Deposit Fines (unofficial copy)</b>A copy with no issue date or ZRP letterhead. All 405 rows were checked: every amount matches the level&apos;s maximum in SI 14A of 2023. Replace it once the current schedule is obtained from ZRP directly.</li>
      </ul>

      <h2 id="disclaimer">Disclaimer</h2>
      <p>This is an independent project made to educate the public about fines and penalties in Zimbabwe. It is not affiliated with or endorsed by the Government of Zimbabwe, any ministry, court, ZIMRA, the ZRP, EMA or the Reserve Bank of Zimbabwe.</p>
      <p>The information may be inaccurate, incomplete or out of date. Laws and fine scales change, some sources are unofficial or old, and much of the data was extracted automatically. Nothing here is legal, tax or financial advice. Always check the official gazette, the Act or the issuing authority before acting, and consult a qualified lawyer about your own situation. No responsibility is accepted for any loss arising from use of this site.</p>
      <p>Statutory text and official figures are quoted for education, research and public information, in reliance on fair dealing (fair use) principles. Every quotation names its source. If you are a rights holder and object to any material, or you find an error, please <a href="https://github.com/shumba-projects/zim-reference/issues">report it on GitHub</a> and it will be corrected or removed.</p>

      <h2>Exchange rate</h2>
      <p>ZiG amounts use the Reserve Bank of Zimbabwe official interbank rate (via AllRatesToday), not the market rate. The two can differ by several percent. The rate date is shown next to every converted amount.</p>
      <p>Consult a lawyer, ZIMRA or the ZRP about your own situation.</p>

      <Colophon>SI 14A of 2023, SI 19 of 2023, ZIMRA and a ZRP schedule copy</Colophon>
    </>
  )
}
