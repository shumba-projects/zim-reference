---
version: 1
slug: "app-layout-js"
primary_target: "app/layout.js"
related_targets: ["app/fines/page.js","app/traffic/page.js"]
---

# Surface: whole site (/, /fines, /fines/[section], /traffic, /about)

Mode: Operate (lookup), with Read on About. Audience: the Zimbabwean public on phones and desktops. Task: find a fine or wage figure and leave knowing its legal source. Constraints: static export, plain CSS, system fonts (slow data), light and dark.

## Direction contract
THESIS: Every page is a legal schedule. Figures sit in ruled schedule tables with large tabular numerals, and caveats live as marginal notes beside the figure, as in a printed Act. This refuses the category default of rounded cards, a hero banner and a disclaimer buried in the footer.
OWN-WORLD: Cool off-white ground (dark: slate), near-black ink, 1px hairline rules only (no cards, no shadows), one registry-blue ink for links and focus, amber for caveat notes. System sans throughout, tabular lining numerals, small-caps column heads. A 14-tick level gauge is the recurring mark.
STORY: The reader finds the offence or work type, sees the maximum or minimum as the largest thing on screen, reads the margin note that qualifies it, and leaves with the SI citation and date.
FIRST VIEWPORT: /fines opens with the title, then a full-width search field, then live result rows (section number | offence | level gauge | US$ and ZiG). The 14-level schedule follows, each row with a log-scaled ramp bar. The source colophon is ruled off at the foot.
FORM: Statute schedule with marginal notes, 4th on the grounded list; seed 6ad30619. Raises: exposure record (quantities on one ramp scale: log-scaled level ramp), Japanese high-density (density courage: hairline-only rule system, compact rows), Saville catalog (the identifier is the headline: "s. 182" on detail pages). Signature interaction: the level gauge links each offence to its level on the scale.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
