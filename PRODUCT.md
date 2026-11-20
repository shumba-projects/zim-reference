# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Members of the Zimbabwean public: people who have been fined or charged and want to know the maximum the law allows, and drivers checking the deposit fine for a traffic offence. They use phones and desktops about equally.

## Product Purpose
Look up a Zimbabwean fine level or deposit fine and see the exact figure from the gazetted instrument, with its source, date and an RBZ-rate ZiG equivalent. Success means the person leaves with a figure they can trust and cite, and knows where it came from.

## Positioning
Every number traces to a gazetted statutory instrument (copies are kept in `sources/`) or a named official page, never to news reports. The app records corrections (SI 19 of 2023) and caveats (exemptions, unstated currency, reported revisions) rather than smoothing them over.

## Operating Context
Fines and penalties reference: Fines and Penalties Lookup (`/fines`, `/fines/[section]`, incl. the ZIMRA late-return penalty), Court maximum fines from three Acts (`/offences`) and Traffic deposit fines (`/traffic`), plus `/about`. Hosted as a static export on GitHub Pages. The ZiG rate is fetched once a day by a GitHub Action from AllRatesToday (RBZ official rate) and shipped as `zig-rate.json`.

## Capabilities and Constraints
- Static export only (Next.js `output: 'export'`, base path `/zim-reference`). No server at runtime.
- Plain CSS, no extra dependencies.
- Every screen shows the source line: "Source: <SI>. Last checked: <date>. Information only, not legal advice."
- The rate is labelled "RBZ official rate" with its date. When it is unavailable, show the USD amount and say the conversion is unavailable.
- Fines and penalties only. Minimum wages (Pay Check) were removed on 2026-11-20 at the owner's request.
- Traffic deposit fines come from an unofficial copy of the ZRP schedule and are labelled as such.

## Brand Commitments
An independent reference, not a government site. It must not use the Zimbabwe coat of arms, ministry branding or gazette mastheads, and must not suggest any official endorsement.

## Evidence on Hand
- `sources/SI-14A-2023-standard-scale-of-fines.pdf`, `sources/SI-19-2023-correction-of-errors.pdf`
- ZIMRA offences page (customs rows), retrieved 2026-11-20.
- No testimonials, usage figures or endorsements exist. Do not invent any.

## Product Principles
1. The source comes first. A figure without its instrument and date is not shown.
2. Caveats are content, not footnotes. Exemptions, corrections and possible staleness are stated plainly where the figure appears.
3. Plain language for a non-lawyer, with exact legal citations alongside.
4. Works on a cheap phone on slow data as well as on a desktop.

## Accessibility & Inclusion
General public audience: readable at default zoom, high contrast, large tap targets, works without the rate loading, light and dark modes.
