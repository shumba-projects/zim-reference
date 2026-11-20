---
name: Zimbabwe Reference
description: The Schedule. Ruled statute tables with marginal notes, for gazetted fines and wages.
colors:
  ground: "#f6f7f9"
  sheet: "#ffffff"
  ink: "#14181d"
  ink-2: "#4b5562"
  rule: "#d3d9e0"
  rule-strong: "#14181d"
  accent: "#1d4ea0"
  accent-tint: "#e6edf8"
  note: "#7a4a00"
  note-tint: "#fbf1de"
  note-rule: "#e4c58a"
  dark-ground: "#0f1317"
  dark-sheet: "#151a20"
  dark-ink: "#e8ecf0"
  dark-ink-2: "#a3adb8"
  dark-rule: "#2b333c"
  dark-accent: "#93b4ff"
  dark-note: "#f2bd6b"
  dark-note-tint: "#2a2112"
typography:
  h1:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "2rem"
    fontWeight: 750
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  h2:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.15
  body:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  figure:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  ident:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  h1-narrow:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 750
    lineHeight: 1.15
  tool-title:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.15
  lede:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  note:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  small:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
  zig:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.55
  column-head:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 650
    letterSpacing: "0.06em"
rounded:
  tick: "1px"
  hair: "2px"
  sm: "3px"
spacing:
  s1: "0.25rem"
  s2: "0.5rem"
  s3: "0.75rem"
  s4: "1rem"
  s5: "1.5rem"
  s6: "2rem"
  s7: "3rem"
  s8: "4.5rem"
components:
  note:
    backgroundColor: "{colors.note-tint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  note-plain:
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  input:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    height: "48px"
  schedule-row-hover:
    backgroundColor: "{colors.accent-tint}"
  nav-link:
    textColor: "{colors.ink-2}"
    height: "44px"
---

# Design System: Zimbabwe Reference

## Overview

**The Schedule.** Every page is laid out like the schedule of a statute. Figures sit in ruled tables with large tabular numerals. The caveats that qualify a figure (corrections, exemptions, staleness) sit beside it as marginal notes, the way a printed Act carries notes in its margin. Nothing is a card; structure comes from rules.

The site is an independent reference, not a government service. It never uses a coat of arms, ministry branding or a gazette masthead.

## Colors

Restrained: cool neutrals, one ink-blue accent, and amber reserved for caveats.

### Primary
- **Registry blue** (`accent`): links, focus rings, the active nav underline, the selected level. Never decoration.

### Secondary
- **Caveat amber** (`note`, `note-tint`, `note-rule`): only on marginal notes that qualify a figure.

### Neutral
- **Cool ground** (`ground`) behind **white sheets** (`sheet`) that hold the tables. **Ink** for figures, **ink-2** for secondary text. **rule** for hairlines and **rule-strong** for table heads and section rules.

### Named Rules
- **The Caveat Rule.** Amber means "this qualifies the figure". Plain bordered notes (`note-plain`) carry neutral context.
- **Dark by scene.** Light is the default for phones used outdoors. Dark mode follows the system setting, with every token swapped.

## Typography

One family, the system sans, so nothing extra loads on slow mobile data. Figures always use `tabular-nums lining-nums`.

### Hierarchy
- **ident** (3rem/800): the section identifier, e.g. "s. 182", as the headline on detail pages.
- **figure** (2.5rem/800): the amount the reader came for.
- **h1** 2rem (1.75rem below 40rem), **tool-title** 1.375rem on the home list, **h2** 1.25rem.
- **lede** 1.0625rem, **body** 1rem/1.55 with a 68ch measure, **note** 0.9375rem, **small** 0.875rem (captions, colophon, group heads), **zig** 0.8125rem (the ZiG line under an amount).
- **column-head** (0.75rem, uppercase, 0.06em tracking): table column heads, `dt` labels and note titles only.

## Layout

A centred 68rem sheet. An `.entry` pairs the main content with a 17rem notes column at 60rem and wider; below that, the notes stack under the figure. Schedule tables turn into stacked rows below 40rem. Spacing runs from s1 to s8, with more space above a heading than below it.

## Elevation & Depth

None. Depth comes from rules: 2px `rule-strong` above a table, 1px `rule` between rows, 1px `rule-strong` below. No shadows.

## Shapes

Square by default. Notes and inputs take a 3px radius, and ticks and focus rings 2px.

## Components

### Schedule table
Column heads in `column-head`, rows separated by hairlines, amounts right-aligned with the ZiG figure underneath in small `ink-2`. Hovering a row tints it `accent-tint`; a targeted row (`#level-n`) also turns its number and ramp blue.

### Level gauge (signature)
Fourteen 4×14px ticks: filled ticks in ink, the top filled tick in accent, the rest in `rule`. It links an offence to its row on the scale (`#level-n`).

### Instrument group head
In long schedules (traffic), rows are grouped under the act or regulations they come from: a full-width head row in `small` ink on the ground colour, ruled below.

### Level ramp
A log-scaled 10px bar per level, so that US$5 and US$5,000 read on one scale.

### Figure block
A `dl` between a 2px top rule and a 1px bottom rule. On wide screens, labels sit in a 12rem column.

### Inputs / Fields
48px tall, 1px `ink-2` border, a drawn SVG search icon and chevron, and focus shown in accent.

### Navigation
Text links at least 44px tall. The current page has a 2px accent underline.

### Colophon
A ruled footer on every screen: "Source: <SI>. Last checked: <date>. Information only, not legal advice."

## Do's and Don'ts

### Do:
- Show every figure with its instrument and date.
- Put caveats in a note next to the figure they qualify.
- Use drawn SVG icons in one 2px stroke.

### Don't:
- Use cards, shadows, gradients or thick side borders.
- Put labels or kickers above headings.
- Use the coat of arms, flag colours or anything that suggests an official site.
