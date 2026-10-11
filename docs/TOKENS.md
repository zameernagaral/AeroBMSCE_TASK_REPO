# TOKENS

Single source of design values (RULES.md: no hex, size or duration outside this file).
Inputs read: BRIEF.md, REFERENCES.md, NOTION-SUMMARY.md, RULES.md, plus the logo files in `images/`.

---

## 0. Assumptions and conflicts to confirm

| # | What | What I did |
|---|------|-----------|
| A1 | "eal-photo wall" | Read as **real-photo wall** (club's own photographs only). |
| A2 | "One saturated field + off-white text" cannot work with the logo gold. Off-white on `#FCBC34` is **1.52:1** (needs 4.5:1). | Gold is the saturated field and carries **ink** text. Off-white text appears only on ink surfaces. |
| A3 | BRIEF says desktop-first; the decision says mobile-first. | CSS is authored mobile-first. Design review happens at **390px and 1440px**, 1440 first. |
| A4 | BRIEF signature (scroll-driven plane + flight-log timeline) vs decision (photo wall). | One signature only: the photo wall. The scroll-driven plane is dropped. The achievements list stays as plain structure (data type, hairlines), not a second signature. |
| A5 | Event dates and numbers are unconfirmed (BRIEF). | Hero shows the next event only when a date is confirmed in COPY.md. Otherwise the next action is **Partner with us**. |
| A6 | Repo is plain HTML today. | Tokens are written as CSS custom properties for the Next.js + CSS Modules build. Migration is a later stage. |
| A7 | CSS variables do not work inside media queries. | Breakpoints are documented constants, not variables. |

---

## 1. Decision log and Notion sources

Source = a real item in your Notion notes. "None" means no note covers it.

| Decision | Draws on (Notion) | Note |
|----------|-------------------|------|
| Direction: precision minimal | **Web Dev** style list: *minimalism* (chosen) over glassmorphism, brutalism, bento grid, liquid glass. **Toolkit:** *Frontend Design* (Skills.md), *impeccable* (design language), *tasteskills* (anti-slop). | Hairlines + flat colour + air. |
| Palette: duotone block | **Toolkit:** *real time colors* (contrast checks). **Web Dev:** *fix color contrast*. | *shader gradient* (colour palette) deliberately not used: flat only. Colours sampled from the logo, per BRIEF. |
| Type: heavy grotesque + readable body | **Toolkit:** *Frontend Design* (type carries the personality). | No font tool in your notes. Fonts chosen independently. |
| Hero: next event / next action | **Web Dev:** *cta above the fold*, *sticky mobile cta*. | Primary action from BRIEF: Partner with us. |
| Layout: single column, mobile-first | **Web Dev:** *test mobile layouts*, *test slow internet*, *fix layout shift*, *keyboard friendly forms*. **Toolkit:** *basement studio*. | Rail idea comes from REFERENCES Ref 1. |
| Signature: real-photo wall | **Web Dev:** *images → webp*, *alt text on images*, *fix layout shift*, *load under 2s*, *social share img*. **Toolkit:** *addy osmani* (web-quality-skills: site load faster), *basement studio*. | |
| Motion: CSS + IntersectionObserver | **Toolkit:** *motion dev*, *motion primitives*, *gsap*, *anime.js*, *lenis* exist and are **deliberately unused**. No new dependency. | Restraint per frontend-design: extra animation reads as AI-made. |
| Stack: Next.js + CSS Modules + CSS variables | **Toolkit:** *context7* (fetch installed-version docs before coding), *playwright* (testing). | Next.js itself is from your global rules, not a Notion note. |

---

## 2. Colour

Duotone block = **gold field + ink**, the logo's own two colours. Off-white is the page ground ("air"). Ink is never a large field, which keeps this clear of the banned near-black + single-accent look.

| Token | Hex | Usage rule |
|-------|-----|-----------|
| `--color-gold` | `#FCBC34` | Saturated field. Max **two** full-bleed blocks per page: hero and final partner block. Text on gold is `ink` only. Never gold text or lines on paper (1.52:1). Never a gradient, tint or opacity variant. Sampled from the header-logo wordmark. |
| `--color-ink` | `#101014` | All text on gold and paper. Hairlines on gold. Fill for primary buttons. Reverse field in **two places only**: footer and mobile sticky CTA bar. Sampled from the logo body. |
| `--color-paper` | `#F2F3F0` | Page ground and the home of the photo wall. Text on ink surfaces. Cool neutral, deliberately not cream (`#F4F1EA` is a banned default). |
| `--color-graphite` | `#55565C` | Secondary text on paper only (captions, metadata). Hairlines on ink surfaces. Never text on gold (4.31:1) or on ink (2.60:1). |
| `--color-ash` | `#A4A6AB` | Secondary text on ink surfaces only. |
| `--color-rule` | `#CBCDC8` | Hairlines and dividers on paper only. Decorative, never carries meaning alone. |
| `--color-white` | `#FFFFFF` | Utility backing for collaborator marks and sponsor logo cells to ensure high contrast for light-gray marks. |

Allowed text pairs (WCAG, computed):

| Text on surface | Ratio |
|-----------------|-------|
| ink on gold | 11.19 |
| ink on paper | 17.04 |
| paper on ink | 17.04 |
| graphite on paper | 6.56 |
| ash on ink | 7.79 |
| gold on ink (focus ring, large display only) | 11.19 |

Banned pairs: paper on gold 1.52, gold on paper 1.52, graphite on gold 4.31, graphite on ink 2.60.
Photographs are never colour-washed, tinted or duotoned. The duotone applies to blocks only.

Focus ring: 2px solid, offset 2px. `ink` on paper and gold, `gold` on ink surfaces.

---

## 3. Type

Faces:

| Role | Face | Settings | Use |
|------|------|----------|-----|
| Display | **Archivo** (Google Fonts, variable) | `wdth 125`, weight 800 (700 for display-3) | Headlines. Sentence case. |
| Body | **IBM Plex Sans** | weights 400, 500 | Prose, buttons, nav. |
| Data | **IBM Plex Mono** | weights 400, 500, tabular numerals | Dates, results, captions, labels. Uppercase. |

Verified: Archivo has `wdth` 62–125 and `wght` 100–900. Self-host through `next/font` for zero layout shift. Fetch the installed-version docs via Context7 before writing that code.

Scale (base 16px, ratio 1.25):

| Step | rem | px |
|------|-----|----|
| -1 | 0.8 | 12.8 |
| 0 | 1 | 16 |
| 1 | 1.25 | 20 |
| 2 | 1.563 | 25 |
| 3 | 1.953 | 31.25 |
| 4 | 2.441 | 39.06 |
| 5 | 3.052 | 48.83 |
| 6 | 3.815 | 61.04 |
| 7 | 4.768 | 76.29 |

Fluid display sizes (fluid between 390px and 1440px viewports, interpolation checked at both ends):

| Token | clamp() | Min to max |
|-------|---------|-----------|
| `--text-display-1` (hero) | `clamp(2.441rem, 1.577rem + 3.546vw, 4.768rem)` | step 4 to step 7 |
| `--text-display-2` (section heading) | `clamp(1.953rem, 1.545rem + 1.674vw, 3.052rem)` | step 3 to step 5 |
| `--text-display-3` (item heading) | `clamp(1.563rem, 1.418rem + 0.595vw, 1.953rem)` | step 2 to step 3 |

Fixed sizes: `--text-lead` 1.25rem, `--text-body` 1rem, `--text-data` 0.8rem (the only size under 16px, data role only).

| Token | Line-height | Letter-spacing | Weight |
|-------|-------------|----------------|--------|
| display-1 | 0.95 | -0.02em | 800 |
| display-2 | 1.05 | -0.015em | 800 |
| display-3 | 1.15 | -0.01em | 700 |
| lead | 1.5 | 0 | 400 |
| body | 1.55 | 0 | 400 (500 emphasis) |
| data | 1.4 | +0.08em, uppercase | 400 (500 for values) |

Prose measure: `36rem` (about 65 characters).

---

## 4. Space

4px base. 

| Token | px | Token | px |
|-------|----|-------|----|
| `--space-1` | 4 | `--space-7` | 32 |
| `--space-2` | 8 | `--space-8` | 48 |
| `--space-3` | 12 | `--space-9` | 64 |
| `--space-4` | 16 | `--space-10` | 96 |
| `--space-5` | 20 | `--space-11` | 128 |
| `--space-6` | 24 | | |

| Rule | Mobile (below 768) | Desktop (1024 and up) |
|------|-------------------|-----------------------|
| Gap between sections | `space-9` (64) | `space-11` (128) |
| Gold block vertical padding | `space-8` (48) | `space-10` (96) |
| Outer margin | `space-5` (20) | `space-8` (48); 768–1023 uses `space-7` (32) |
| Grid | 4 columns | 12 columns; 768–1023 uses 8 |
| Gutter | `space-4` (16) | `space-6` (24) |

Max container width: **1200px**. Breakpoints (constants): 768, 1024, 1440.
Minimum tap target: 48px high.

---

## 5. Shape

| Token | Value | Use |
|-------|-------|-----|
| `--radius-0` | 0 | Photos, blocks, rules. |
| `--radius-1` | 2px | Buttons, inputs, tags. |
| Maximum | 2px | No pills, no rounded cards. |
| `--rule-1` | 1px | Hairlines. |
| `--rule-2` | 2px | Focus ring, active/hover underline. |
| `--shadow-none` | none | No shadows anywhere. Separation comes from colour blocks and hairlines. The sticky CTA bar uses a 1px graphite top rule. |

---

## 6. Motion

| Token | Value | Use |
|-------|-------|-----|
| `--dur-1` | 120ms | Hover, press, colour swaps. |
| `--dur-2` | 240ms | Disclosure and menu state changes. |
| `--dur-3` | 480ms | Photo wall reveal only. |
| `--ease` | `cubic-bezier(0.2, 0, 0, 1)` | The only easing. Decisive ease-out. |
| `--travel` | 16px | Maximum movement for any element. |

Rules:
- IntersectionObserver reveals **only** photo wall tiles: threshold 0.15, root margin `0px 0px -10% 0px`, one-shot (unobserve after firing).
- Reveal is a clip-path wipe from the bottom edge at `dur-3`, with zero travel. Not a fade-up, which is the most common generated-site effect.
- Stagger: `dur-1` steps by column index, at most 3 steps.
- Nothing above the fold is gated by the observer (protects the under-2s load and LCP). Tiles are visible by default; script hides only tiles below the fold, so no-JS shows everything.
- Reduced motion: no reveal, no transforms. Colour swaps only, at `dur-1`.
- No smooth-scroll library, no parallax, no looping animation.

---

## 7. Signature: the photo wall

A full-width wall of the club's own photographs, set flat on paper with 8px gaps and no overlays, filters, shadows or rounded corners. Photos keep their native aspect ratio and are never cropped; the real aircraft and the real people carry the page, not decoration. It sits between the gold hero and the gold partner block, so the page reads gold, then evidence, then gold. Each tile has one data-type caption of real facts (date, event, aircraft) from COPY.md, nothing invented. Tiles settle into place with one clip wipe as they enter view. Everything else on the page stays quiet.

Source set: `photo1.jpg` to `photo8.jpg` (8 files). Excluded: logos, partner marks, `cad-plane.png` (a render), `bg.jpg` (unverified). I checked pixel sizes only, not photo content. Subjects and captions are pending COPY.md.

Resolution rule: tile CSS width must not exceed source width ÷ 1.5. At the 1200px container, one column is 78px; `n` columns span `102n − 24` px.

| File | Source px | Aspect | Max columns |
|------|-----------|--------|-------------|
| photo1 | 768 × 432 | 1.78 | 5 |
| photo2 | 1248 × 936 | 1.33 | 8 |
| photo3 | 648 × 407 | 1.59 | 4 |
| photo4 | 768 × 492 | 1.56 | 5 |
| photo5 | 1178 × 833 | 1.41 | 7 |
| photo6 | 1556 × 1037 | 1.50 | 10 |
| photo7 | 900 × 1200 | 0.75 | 6 |
| photo8 | 3000 × 2000 | 1.50 | 12 |

Mobile: one tile per row at full container width.
Delivery: convert to WebP, set explicit width and height on every tile (no layout shift), meaningful alt text on all, lazy-load everything below the fold.

Tokens the signature may use:
- **Colour:** `paper` (ground), `ink` (caption values), `graphite` (caption labels), `rule` (hairline between caption and tile). Not `gold`.
- **Type:** data role only, `--text-data`, weights 400/500, uppercase, +0.08em.
- **Space:** `space-2` (tile gap), `space-3` (caption offset), `space-9` / `space-11` (section rhythm), 12-column grid.
- **Shape:** `radius-0`, `rule-1`, `shadow-none`.
- **Motion:** `dur-1` (hover and focus), `dur-3` (reveal), `--ease`, no travel.

---

## 8. Layout and hero rules

- One vertical reading column. On 1024 and up a hanging **data rail** sits in columns 1–3 (year, class, place as data-type labels) and content in columns 4–10. The wall breaks out to all 12. On mobile the rail collapses into a label above its content.
- Hero is a gold block: data-type eyebrow, display-1 headline, one lead line, primary button (**Partner with us**), secondary text link (Join the club). Primary button: ink fill, paper text, `radius-1`, 48px high. Hover swaps to paper fill with ink text and a 2px ink border at `dur-1`. Never animated on load.
- Mobile sticky CTA: ink bar, paper text, same primary action.
- No multi-column body text, no card grids, no numbered markers unless the content is truly a sequence.

---

## 9. Self-critique

Two decisions looked most like generic defaults. Both are changed above.

**1. Palette as briefed: saturated field + off-white text (on near-black).**
It fails twice. Off-white on the logo gold is 1.52:1, and the workable fix (dark ground + one bright accent) is banned look number 2 and the usual yellow-on-black hazard cliché. **Changed to:** paper-dominant page, gold as one block at the top and one at the bottom, ink as text and as a field only in the footer and sticky bar. The gold is the logo's own gold, and the ink is the logo's own ink. **Why:** the logo already is a duotone, so the palette says "this club" instead of "dark theme with an accent". Ratios in section 2 prove legibility.

**2. Layout as briefed: single column, mobile-first.**
A stack of full-width centred sections is exactly what the BRIEF's hated-site description says, and it carries no information. **Changed to:** a single reading column with a hanging data rail on desktop, so the left margin shows real year, class and place. The wall breaks out to the full grid. **Why:** structure should encode something true (frontend-design), and it borrows the one thing worth taking from basement's metadata panel (REFERENCES Ref 1). Mobile stays a single column.

Remaining risk: hairlines plus 0 radius plus a rail edge toward the banned broadsheet look. Controls: low density, no column rules, radius 2px on controls, hairlines only separate rail entries, body text stays one column.
