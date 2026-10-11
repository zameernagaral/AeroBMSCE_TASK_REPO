# WIREFRAMES

Inputs read: RULES.md, BRIEF.md, TOKENS.md, REFERENCES.md, plus the existing `index.html`, `journey.html`, `partners.html` for real structure and facts.
This is a marketing site, not an app or shop, so the product-screenshot step was skipped.

## How to read these

| Mark | Meaning |
|------|---------|
| `(1)` `(2)` `(3)` | Eye stops, in order. |
| `#` border | Gold field (`--color-gold`). Text on it is ink. |
| `=` border | Ink field (`--color-ink`). Text on it is paper or ash. |
| blank | Paper ground (`--color-paper`). |
| `:` fill | A real club photograph. |
| `[ ... ]` | A slot. Final words come from `docs/COPY.md`, which does not exist yet (RULES: copy only from COPY.md). Facts quoted as `e.g.` come from the old site and are unconfirmed. |

Desktop frames are **1440px wide**, 92 characters, so one character is about 15.6px. Horizontal proportions are true. **Vertical heights are schematic.** Mobile frames are **390px wide**, 40 characters, one character is about 9.75px.

Desktop grid in every frame: container 1200px, 12 columns, 24px gutters, 120px side space. The segments are: **cols 1-3 = data rail (19 chars)**, **cols 4-10 = content (46 chars)**, **cols 11-12 = air (13 chars)**.
Mobile grid: 4 columns, 16px gutters, 20px margins, content 350px.

## Assumptions

| # | Assumption |
|---|-----------|
| W1 | The home page is one scroll with anchors: Teams, Results, Partners. If you keep three HTML pages, Results and Partners move to their own pages and keep the same section patterns. |
| W2 | The old nav links to `contact.html`, which does not exist. Here "Contact" is the final gold block on the same page. |
| W3 | **No photograph appears anywhere except the photo wall**, including the hero. This follows your single-signature decision and drops the BRIEF's "huge aircraft photo hero". The first scroll lands on the wall instead. |
| W4 | Tier badge icons (`icon-gold.png` etc.) are unused: they add colour and decoration. Tier names carry the meaning. |
| W5 | Partner and ecosystem logos are shown as supplied, flat on paper. TOKENS forbids tinting photographs, not logos, but mixed logo colours are a risk (see Open questions). |
| W6 | Aircraft names per result are unknown, so result entries carry date, place and class only. |

## Page order and eye path

| # | Section | Surface | Eye 1 | Eye 2 | Eye 3 |
|---|---------|---------|-------|-------|-------|
| 0 | Nav | paper | wordmark | Partner with us button | link row |
| 1 | Hero (A recommended) | gold | headline | Partner with us | photo wall peek |
| 2 | Photo wall | paper | lead photo | its caption | second row |
| 3 | Teams | paper | heading | first team name | rail labels |
| 4 | Results | paper | latest result | its year (rail) | next result |
| 5 | Partner tiers | paper | first tier name | first tier benefits | second tier |
| 6 | Ecosystem logos | paper | heading | software logos | academic logos |
| 7 | Final partner block | gold | headline | Partner with us | contact rows |
| 8 | Footer | ink | wordmark | email | practice-site notice |

Signature check: the photo wall is the only section with photographs. It appears **once** on desktop and **once** on mobile.

---

## 0. Nav

### 1440 desktop

```text
+--------------------------------------------------------------------------------------------+
|                                                                                            |
|       [mark] AEROBMSCE (1)     Teams   Results   Partners    [ Partner with us ] (2)       |
|       ------------------------------------------------------------------------------       |
|       (3) link row, between wordmark and button                                            |
|                                                                                            |
+--------------------------------------------------------------------------------------------+
```

- **Grid:** wordmark cols 1-3, links cols 5-9, button cols 11-12. Height 72px. Pinned to the top.
- **Tokens:** surface `paper`; wordmark `display-3` / `ink`; links `body` 500 / `ink`; button = primary (ink fill, `paper` text, `radius-1`, 48px high, hover swaps fill at `dur-1`); bottom edge `rule-1` / `rule`.
- **Logo:** `header-logo.png` has a white background and large empty margins. Use the mark from `logo.png` plus live wordmark text instead, on paper only (the dark eagle disappears on ink and the gold accent disappears on gold).
- **Eye:** (1) wordmark, (2) button, (3) links.
- **Scroll:** pinned, no shrink, no hide-on-scroll, no blur. Always one click from the one action.
- **Signature:** none.

### 390 mobile (top bar and menu)

```text
+----------------------------------------+
|                                        |
|  [mark] AEROBMSCE (1)      Menu (2)    |
|  ------------------------------------  |
|                                        |
|  Menu open: full-height paper sheet    |
|                                        |
|  Teams (1)                             |
|  Results                               |
|  Partners                              |
|                                        |
|  [ Partner with us        ] (2)        |
|  Join the club                         |
|                                        |
|  Close (3)                             |
+----------------------------------------+
```

- **Redesign, not shrink:** no row of links. A 56px top bar holds wordmark and a text "Menu" (no hamburger icon). The one action is **not** in the bar: it lives in the sticky bottom bar (see Hero) and at the bottom of the menu sheet.
- **Tokens:** bar `paper`, 56px, `rule-1` bottom edge. Sheet links `display-2` / `ink`. Margins `space-5`.
- **Eye (menu open):** (1) first link, (2) Partner with us, (3) Close.
- **Scroll:** the top bar scrolls away (not pinned). The sheet opens at `dur-2` with a colour swap only; body scroll is locked while open.
- **Signature:** none.

---

## 1. Hero

Two alternatives. **Recommendation: A**, because event dates are unconfirmed (BRIEF) and the visitor's one action is Partner with us. Switch to B once COPY.md holds one confirmed upcoming event.

### Hero A: next action leads

#### 1440 desktop

```text
+--------------------------------------------------------------------------------------------+
|############################################################################################|
|#                                                                                          #|
|#      EST. 2012  .  PROPEL LAB-3  .  BMS COLLEGE OF ENGINEERING, BENGALURU                #|
|#      ------------------------------------------------------------------------------      #|
|#                                                                                          #|
|#      [HEADLINE, display-1, max 4 words, two lines] (1)                                   #|
|#      [                                           ]                                       #|
|#                                                                                          #|
|#      [Lead: one line, 36rem max]                                                         #|
|#                                                                                          #|
|#      [ Partner with us ] (2)     Join the club ->                                        #|
|#                                                                                          #|
|############################################################################################|
|                                                                                            |
|                                                                                            |
|                                                                                            |
|       +----------------------------------------------------------------------------+       |
|       | (3) top edge of the lead photo, visible 140px above a 900px fold          |        |
+--------------------------------------------------------------------------------------------+
```

- **Grid:** headline cols 1-10; lead and buttons cols 1-6; eyebrow cols 1-12. Cols 11-12 stay empty (air).
- **Tokens:** field `gold`, padding `space-10` (96px). Eyebrow `data` / `ink`, `rule-1` in `ink` below it. Headline `display-1` / 800 / `wdth 125` / `ink`. Lead `lead` / `ink`. Primary button: ink fill, `paper` text. Secondary: `body` 500 underline in `ink`, `rule-2` on hover.
- **Rhythm:** hero to wall gap is `space-11` (128px). Nav 72 + hero about 560 + 128 puts the wall's top edge near y=760, so about 140px of photo shows at a 900px fold: that is the scroll invitation.
- **Eye:** (1) headline, (2) Partner with us, (3) photo peek.
- **Scroll:** nothing animates on load. Nothing above the fold is gated by IntersectionObserver.
- **Signature:** none in the hero. No photo here (W3).

#### 390 mobile

```text
+----------------------------------------+
|########################################|
|#                                      #|
|# EST. 2012 . PROPEL LAB-3             #|
|# BMSCE, BENGALURU                     #|
|# ------------------------------------ #|
|#                                      #|
|# [HEADLINE display-1,                 #|
|#  max 3 lines] (1)                    #|
|#                                      #|
|# [Lead: 2-3 lines]                    #|
|#                                      #|
|# [ Partner with us        ] (2)       #|
|#   full width, 48px                   #|
|#                                      #|
|# Join the club ->                     #|
|#                                      #|
|########################################|
|                                        |
|                                        |
|  +----------------------------------+  |
|  | (3) lead photo, fully visible    |  |
|  +----------------------------------+  |
|                                        |
|========================================|
|= [ Partner with us        ]           =|
|=   sticky bar, ink, 56px              =|
|========================================|
+----------------------------------------+
```

- **Redesign, not shrink:** one stacked column, headline before anything else, button full width and in the lower half of the screen (thumb reach). Eyebrow wraps to two lines. No rail. The fixed bottom bar appears after the hero button leaves the screen.
- **Tokens:** field `gold`, padding `space-8` (48px). Headline `display-1` at its 39px minimum. Button 48px, `radius-1`. Sticky bar: field `ink`, text `paper`, 56px plus safe-area inset, `rule-1` top edge in `graphite`.
- **Eye:** (1) headline, (2) Partner with us, (3) lead photo.
- **Scroll:** sticky bar shows when the hero button leaves the viewport (IntersectionObserver, one observer on that button), hides again when the final gold block is in view. It appears by opacity at `dur-2`, 16px travel maximum; with reduced motion it simply appears.
- **Signature:** none.

### Hero B: next event leads (use once a date is confirmed)

#### 1440 desktop

```text
+--------------------------------------------------------------------------------------------+
|############################################################################################|
|#                                                                                          #|
|#      NEXT EVENT                                                                          #|
|#      ------------------------------------------------------------------------------      #|
|#                                                                                          #|
|#      [EVENT NAME, display-1, e.g. NACDEC 2026] (1)                                       #|
|#                                                                                          #|
|#      DATE               [confirmed date] (2)                                             #|
|#      ------------------------------------------------------------------------------      #|
|#      PLACE              [venue, city]                                                    #|
|#      ------------------------------------------------------------------------------      #|
|#      CLASS              [competition class]                                              #|
|#      ------------------------------------------------------------------------------      #|
|#      STATUS             [Registered / Planned]                                           #|
|#                                                                                          #|
|#      [ Partner with us ] (3)     Join the club ->                                        #|
|#                                                                                          #|
|############################################################################################|
+--------------------------------------------------------------------------------------------+
```

- **Grid:** event name cols 1-10. Data rows use the page's rail pattern: label cols 1-3, value cols 4-10.
- **Tokens:** field `gold`. Labels `data` / `ink`, values `body` 500 / `ink`. Row dividers `rule-1` in `ink`. Same buttons as A.
- **Eye:** (1) event name, (2) date, (3) Partner with us. The action is third, which is why A is recommended while dates are unconfirmed.
- **Scroll / Signature:** as A. No photo.
- **Rule:** if no event has a confirmed date, show Hero A. Never show a placeholder date.

#### 390 mobile

```text
+----------------------------------------+
|########################################|
|#                                      #|
|# NEXT EVENT                           #|
|# ------------------------------------ #|
|#                                      #|
|# [EVENT NAME display-1,               #|
|#  max 3 lines] (1)                    #|
|#                                      #|
|# DATE      [confirmed date] (2)       #|
|# PLACE     [venue, city]              #|
|# CLASS     [class]                    #|
|# STATUS    [Registered]               #|
|#                                      #|
|# [ Partner with us        ] (3)       #|
|# Join the club ->                     #|
|#                                      #|
|########################################|
+----------------------------------------+
```

- **Redesign, not shrink:** label and value sit side by side in a two-column data list (labels 9 characters wide) instead of the desktop rail. Sticky bar behaves as in A.
- **Tokens:** as desktop. Padding `space-8`.
- **Eye:** (1) event name, (2) date, (3) Partner with us.

---

## 2. Photo wall (the signature, appears once)

#### 1440 desktop

```text
+--------------------------------------------------------------------------------------------+
|                                                                                            |
|       [LABEL]            [HEADING display-2, max 5 words]                                  |
|                                                                                            |
|       +----------------------------------------------------------------------------+       |
|       |::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|       |
|       |::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|       |
|       |::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|       |
|       |:::::::::::::::::::::::::::: photo8 (1) 3000x2000 ::::::::::::::::::::::::::|       |
|       |::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|       |
|       |::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|       |
|       |::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|       |
|       +----------------------------------------------------------------------------+       |
|       [caption: event . date . aircraft]  (2)      [SIGNATURE]                             |
|                                                                                            |
|       +-----------------------------------+ +--------------------------------------+       |
|       |:::::::::::::::::::::::::::::::::::| |::::::::::::::::::::::::::::::::::::::|       |
|       |:::::::::::::::::::::::::::::::::::| |::::::::::::::::::::::::::::::::::::::|       |
|       |::::::::::::: photo2 ::::::::::::::| |::::::::::::::: photo5 :::::::::::::::|       |
|       |:::::::::::::::::::::::::::::::::::| |::::::::::::::::::::::::::::::::::::::|       |
|       |:::::::::::::::::::::::::::::::::::| |::::::::::::::::::::::::::::::::::::::|       |
|       +-----------------------------------+ +--------------------------------------+       |
|       [caption]                              [caption]  (3)                                |
|                                                                                            |
|       +-------------------------+ +-----------------------+ +----------------------+       |
|       |:::::::::::::::::::::::::| |:::::::::::::::::::::::| |::::::::::::::::::::::|       |
|       |:::::::: photo1 :::::::::| |::::::: photo3 ::::::::| |::::::: photo4 :::::::|       |
|       |:::::::::::::::::::::::::| |:::::::::::::::::::::::| |::::::::::::::::::::::|       |
|       +-------------------------+ +-----------------------+ +----------------------+       |
|       [caption]                [caption]       [caption]                                   |
|                                                                                            |
|       +-------------------------------------------------+ +------------------------+       |
|       |:::::::::::::::::::::::::::::::::::::::::::::::::| |::::::::::::::::::::::::|       |
|       |:::::::::::::::::::::::::::::::::::::::::::::::::| |::::::::::::::::::::::::|       |
|       |:::::::::::::::::::::::::::::::::::::::::::::::::| |::::::::::::::::::::::::|       |
|       |:::::::::::::::::::: photo6 :::::::::::::::::::::| |::: photo7 portrait ::::|       |
|       |:::::::::::::::::::::::::::::::::::::::::::::::::| |::::::::::::::::::::::::|       |
|       |:::::::::::::::::::::::::::::::::::::::::::::::::| |::::::::::::::::::::::::|       |
|       +-------------------------------------------------+ +------------------------+       |
|       [caption]                                              [caption]                     |
|                                                                                            |
+--------------------------------------------------------------------------------------------+
```

- **Grid:** the wall breaks out of the reading column to all **12 columns** (1200px). Row edges meet the container; inside a row, tile widths follow each photo's aspect ratio so every row has equal height. Gaps 8px (`space-2`).
- **Reading order:** photo8, photo2, photo5, photo1, photo3, photo4, photo6, photo7. Same order on mobile.
- **Tile widths checked against TOKENS resolution rule** (width must be under source width / 1.5): photo1 about 420px (limit 512), photo3 about 385px (limit 432), photo4 about 370px (limit 512), photo7 about 400px (limit 600). All pass. No crops.
- **Tokens:** ground `paper`. Tiles `radius-0`, no shadow, no overlay. Captions: `data` size, labels `graphite`, values `ink`, `space-3` below the tile, `rule-1` in `rule` above the caption. Heading `display-2` / `ink`; label `data` / `graphite`.
- **Eye:** (1) the lead photo, (2) its caption, (3) the second row.
- **Scroll:** below-the-fold tiles reveal with one clip wipe from the bottom edge at `dur-3`, `--ease`, zero travel, columns staggered at `dur-1` steps (3 steps maximum), fires once. No-JS and reduced-motion show all tiles immediately. Hover and focus on a tile: caption value gets `rule-2` underline at `dur-1`; no zoom.
- **Signature:** **this is it.** Gold never appears inside the wall.

#### 390 mobile

```text
+----------------------------------------+
|                                        |
|  [LABEL]                               |
|  [HEADING display-2, 3 lines]          |
|                                        |
|  +----------------------------------+  |
|  |::::::::::::::::::::::::::::::::::|  |
|  |::::::::::::::::::::::::::::::::::|  |
|  |::::::::: photo8 3:2 (1) :::::::::|  |
|  |::::::::::::::::::::::::::::::::::|  |
|  |::::::::::::::::::::::::::::::::::|  |
|  +----------------------------------+  |
|  DATE   [..]  (2)   [SIGNATURE]        |
|  EVENT  [..]                           |
|  CRAFT  [..]                           |
|                                        |
|  +----------------------------------+  |
|  |::::::::::::::::::::::::::::::::::|  |
|  |::::::::::::::::::::::::::::::::::|  |
|  |::::::::::::::::::::::::::::::::::|  |
|  |::::::::: photo2 4:3 (3) :::::::::|  |
|  |::::::::::::::::::::::::::::::::::|  |
|  |::::::::::::::::::::::::::::::::::|  |
|  |::::::::::::::::::::::::::::::::::|  |
|  +----------------------------------+  |
|  DATE / EVENT / CRAFT                  |
|                                        |
|  +----------------------------------+  |
|  |:::::::::: photo5 peeks ::::::::::|  |
|  +----------------------------------+  |
|  :: photos 5, 1, 3, 4, 6, 7 follow     |
|  :: same pattern, one per row          |
|                                        |
+----------------------------------------+
```

- **Redesign, not shrink:** one tile per row at full container width (350px), caption **under** each tile as a three-line label/value stack (desktop uses one line). Portrait photo7 stays portrait (350 x 467), which makes a deliberate change of rhythm near the end. Rows of three tiles do not exist on mobile.
- **Tokens:** as desktop. Caption sits `space-3` below its tile; `space-6` between one caption and the next tile, so each caption reads as belonging to the photo above it. Section padding `space-9` (64px).
- **Eye:** (1) lead photo, (2) its caption, (3) the second photo.
- **Scroll:** same one-shot wipe, `dur-3`. First tile loads eagerly with a 768px-wide WebP; the rest lazy-load. Explicit width and height on every tile.
- **Signature:** the wall, once.

---

## 3. Teams (rows with a data rail)

#### 1440 desktop

```text
+--------------------------------------------------------------------------------------------+
|                                                                                            |
|       [LABEL]            [HEADING display-2] (1)                                           |
|                                                                                            |
|       ------------------------------------------------------------------------------       |
|       INTERNATIONAL      Team Yaksha (2)                                                   |
|       AERO DESIGN        [one line, from COPY.md]                                          |
|       ------------------------------------------------------------------------------       |
|       AEROMODELLING      Team Blue Impulse                                                 |
|                          [one line]                                                        |
|       ------------------------------------------------------------------------------       |
|       DRONE              Team Flying Phantoms                                              |
|       DEVELOPMENT        [one line]                                                        |
|       ------------------------------------------------------------------------------       |
|       DRONE RACING       Team Vectors                                                      |
|                          [one line]                                                        |
|       ------------------------------------------------------------------------------       |
|       (3) the discipline labels down the rail                                              |
+--------------------------------------------------------------------------------------------+
```

- **Grid:** rail cols 1-3 (discipline), content cols 4-10 (team name and one line). Cols 11-12 air.
- **Tokens:** rail `data` / `graphite`; team name `display-3` / `ink`; line `body` / `ink`, measure 36rem; dividers `rule-1` / `rule`; row padding `space-6`; section gap `space-11`. Team names and disciplines are real (index and journey pages).
- **Eye:** (1) heading, (2) first team name, (3) the rail labels.
- **Scroll:** static. No animation.
- **Signature:** none. No photos, no cards, no icons.

#### 390 mobile

```text
+----------------------------------------+
|                                        |
|  [LABEL]                               |
|  [HEADING display-2] (1)               |
|                                        |
|  ------------------------------------  |
|  INTERNATIONAL AERO DESIGN             |
|  Team Yaksha (2)                       |
|  [one line]                            |
|  ------------------------------------  |
|  AEROMODELLING                         |
|  Team Blue Impulse                     |
|  [one line]                            |
|  ------------------------------------  |
|  DRONE DEVELOPMENT                     |
|  Team Flying Phantoms                  |
|  [one line]                            |
|  ------------------------------------  |
|  DRONE RACING                          |
|  Team Vectors (3)                      |
|  [one line]                            |
|  ------------------------------------  |
+----------------------------------------+
```

- **Redesign, not shrink:** the rail collapses into a label **above** each team name, so each row reads label, name, line.
- **Tokens:** as desktop. Row padding `space-5`. Section gap `space-9`.
- **Eye:** (1) heading, (2) first team name, (3) last team name (the list reads as a set of four).
- **Scroll / Signature:** static, none.

---

## 4. Results (data rows, replaces the flight-log timeline)

Facts below are `e.g.` from `journey.html`, unconfirmed (BRIEF). The BRIEF's flight-log timeline is not a second signature here: it is plain data rows.

#### 1440 desktop

```text
+--------------------------------------------------------------------------------------------+
|                                                                                            |
|       [LABEL]            [HEADING display-2]                                               |
|                                                                                            |
|       ------------------------------------------------------------------------------       |
|       2026 SEASON (2)    2nd place, MATLAB Simulation Awards (1)                           |
|                          SAE International Aero Design West                                |
|       (rail sticks)      FORT WORTH, TEXAS, USA                                            |
|       ------------------------------------------------------------------------------       |
|                          1st place, Unique Technology                                      |
|                          SAE Aerothon, ADDC 2026                                           |
|       ------------------------------------------------------------------------------       |
|       2025 SEASON        2nd place overall  (3)                                            |
|                          SAE Aerothon  .  NOV 2025                                         |
|       ------------------------------------------------------------------------------       |
|                          1st place, Best Technical Presentation                            |
|                          SAE Drone Design Challenge  .  MAY 2025                           |
|       ------------------------------------------------------------------------------       |
|       2024 / 2022 /      [same row pattern continues]                                      |
|       2020 / 2018                                                                          |
+--------------------------------------------------------------------------------------------+
```

- **Grid:** season rail cols 1-3, entries cols 4-10. Cols 11-12 air.
- **Row anatomy:** result `display-3` / `ink`; event `body` / `ink`; date, place, class on one `data` line / `graphite`. Dividers `rule-1` / `rule`. Row padding `space-6`. Prize amounts and counts appear only if COPY.md confirms them.
- **Tokens:** rail `data` / `graphite` (season label), section gap `space-11`.
- **Eye:** (1) latest result, (2) its season in the rail, (3) the next season's first result.
- **Scroll:** the season label is `position: sticky` at the top of the viewport while its group scrolls past, then releases. This is layout, not animation. No reveal, no counters.
- **Signature:** none.

#### 390 mobile

```text
+----------------------------------------+
|                                        |
|  [LABEL]                               |
|  [HEADING display-2]                   |
|                                        |
|  ------------------------------------  |
|  2026 SEASON                           |
|  2nd place, MATLAB                     |
|  Simulation Awards (1)                 |
|  SAE Intl Aero Design West             |
|  FORT WORTH, USA  (2)                  |
|  ------------------------------------  |
|  1st place, Unique Technology          |
|  SAE Aerothon, ADDC 2026               |
|  ------------------------------------  |
|  2025 SEASON                           |
|  2nd place overall  (3)                |
|  SAE Aerothon . NOV 2025               |
|  ------------------------------------  |
|  [ Earlier seasons  + ]                |
|    disclosure: 2024, 2022, 2020, 2018  |
|  ------------------------------------  |
+----------------------------------------+
```

- **Redesign, not shrink:** season becomes a full-width label above its entries, result first and largest. Only the two latest seasons show. Earlier seasons sit behind one disclosure button ("Earlier seasons") that expands at `dur-2`; its label does not change after opening except to "Fewer seasons".
- **Tokens:** as desktop. Row padding `space-5`.
- **Eye:** (1) latest result, (2) its place line, (3) next season's result.
- **Scroll:** nothing sticky on mobile (no spare height).
- **Signature:** none.

---

## 5. Partner tiers (rows, not cards)

Tier names and benefits are from `partners.html` (real). Counts and impressions on the old page stay out unless COPY.md confirms them.

#### 1440 desktop

```text
+--------------------------------------------------------------------------------------------+
|                                                                                            |
|       [LABEL]            [HEADING display-2]                                               |
|                                                                                            |
|       ------------------------------------------------------------------------------       |
|       PLATINUM (1)       TITLE PARTNER . STRATEGIC ALIGNMENT                               |
|       PARTNER            Primary logo on aircraft and UAV models                           |
|                          Logo and acknowledgement in videos (2)                            |
|                          Priority on flags, banners, standees                              |
|                          Featured in reports and press releases                            |
|                          Direct engagement with core team                                  |
|                          Association with flagship projects                                |
|       ------------------------------------------------------------------------------       |
|       GOLD (3)           HIGH VISIBILITY . COMPETITION PRESENCE                            |
|       PARTNER            [6 benefits, same pattern]                                        |
|       ------------------------------------------------------------------------------       |
|       SILVER             EVENT AND MEDIA VISIBILITY                                        |
|       PARTNER            [6 benefits]                                                      |
|       ------------------------------------------------------------------------------       |
|       TECHNICAL AND      DESIGN . SIMULATION . ANALYSIS                                    |
|       ECOSYSTEM          [6 benefits]                                                      |
|       ------------------------------------------------------------------------------       |
+--------------------------------------------------------------------------------------------+
```

- **Grid:** tier name in the rail cols 1-3, tagline and benefits cols 4-10. All four tiers are open on desktop.
- **Tokens:** tier name `display-3` / `ink` (wraps to two or three lines in the rail); tagline `data` / `graphite`; benefits `body` / `ink`, one per line, `space-2` apart; dividers `rule-1` / `rule`; row padding `space-7`.
- **Eye:** (1) Platinum, (2) its benefits, (3) Gold.
- **Scroll:** static.
- **Signature:** none. No tier badges (W4), no cards, no shadows.

#### 390 mobile

```text
+----------------------------------------+
|                                        |
|  [LABEL]                               |
|  [HEADING display-2]                   |
|                                        |
|  ------------------------------------  |
|  Platinum partner            + (1)     |
|  TITLE PARTNER (2)                     |
|  ------------------------------------  |
|  Gold partner                +         |
|  HIGH VISIBILITY                       |
|  ------------------------------------  |
|  Silver partner              +         |
|  EVENT AND MEDIA VISIBILITY            |
|  ------------------------------------  |
|  Technical and ecosystem     +         |
|  DESIGN . SIMULATION (3)               |
|  ------------------------------------  |
|  Open row: benefits list, body,        |
|  one per line, 6 items.                |
+----------------------------------------+
```

- **Redesign, not shrink:** each tier is a closed row with its name and tagline and a "+" control (48px high, whole row tappable). One row opens at a time; opening animates height at `dur-2`. Four open tiers of six lines each would be about 1,500px of scrolling.
- **Tokens:** name `display-3`, tagline `data` / `graphite`, `+` in `ink`, dividers `rule-1` / `rule`, row padding `space-5`. Focus ring `rule-2` / `ink`.
- **Eye:** (1) Platinum row, (2) its tagline, (3) the last row (the whole set reads as four).
- **Scroll:** opening a row does not auto-scroll. Reduced motion: height changes instantly.
- **Signature:** none.

---

## 6. Ecosystem logos

Real files: software (solidworks, ansys, altair, siemens, flow5, simscale), UAV hardware (drkstore, uav-marketplace), academic and research (drdo, csir-nal).

#### 1440 desktop

```text
+--------------------------------------------------------------------------------------------+
|                                                                                            |
|       [LABEL]            [HEADING display-2] (1)                                           |
|                                                                                            |
|       ------------------------------------------------------------------------------       |
|       DESIGN, SIM AND    +----------+----------+----------+                                |
|       ENGINEERING        |SolidWorks|  Ansys   |  Altair  | (2)                            |
|       SOFTWARE           +----------+----------+----------+                                |
|                          | Siemens  |  Flow5   | SimScale |                                |
|                          +----------+----------+----------+                                |
|       ------------------------------------------------------------------------------       |
|       UAV HARDWARE       +----------+----------+                                           |
|       AND COMPONENTS     | DRK Store|UAV Market|                                           |
|                          +----------+----------+                                           |
|       ------------------------------------------------------------------------------       |
|       ACADEMIC AND       +----------+----------+                                           |
|       RESEARCH           |   DRDO   | CSIR-NAL | (3)                                       |
|                          +----------+----------+                                           |
|       ------------------------------------------------------------------------------       |
+--------------------------------------------------------------------------------------------+
```

- **Grid:** group label in the rail cols 1-3; logo cells in cols 4-10, three cells per row, each spanning two columns (cols 4-5, 6-7, 8-9); col 10 stays empty.
- **Tokens:** cell frame `rule-1` / `rule`, `radius-0`, cell padding `space-6`, logo scaled to a common visual height of 40px with `object-fit: contain`. Group label `data` / `graphite`. Heading `display-2`.
- **Eye:** (1) heading, (2) the software grid (the largest group), (3) the DRDO and CSIR-NAL row.
- **Scroll:** static.
- **Signature:** none. These are logos, not photographs.

#### 390 mobile

```text
+----------------------------------------+
|                                        |
|  [LABEL]                               |
|  [HEADING display-2] (1)               |
|                                        |
|  DESIGN, SIM, ENGINEERING              |
|  +---------------+---------------+     |
|  |  SolidWorks   |  Ansys (2)    |     |
|  +---------------+---------------+     |
|  |    Altair     |    Siemens    |     |
|  +---------------+---------------+     |
|  |     Flow5     |   SimScale    |     |
|  +---------------+---------------+     |
|                                        |
|  UAV HARDWARE AND COMPONENTS           |
|  +---------------+---------------+     |
|  |   DRK Store   |  UAV Market   |     |
|  +---------------+---------------+     |
|                                        |
|  ACADEMIC AND RESEARCH                 |
|  +---------------+---------------+     |
|  |     DRDO      | CSIR-NAL (3)  |     |
|  +---------------+---------------+     |
+----------------------------------------+
```

- **Redesign, not shrink:** two cells per row instead of three; the group label sits above its logos instead of in a rail.
- **Tokens:** as desktop. Logo height 32px. Cell padding `space-5`.
- **Eye:** (1) heading, (2) first software row, (3) academic row.
- **Scroll / Signature:** static, none.

---

## 7. Final partner block (gold)

Second and last gold field on the page. The contact name and email are from `partners.html` and unconfirmed.

#### 1440 desktop

```text
+--------------------------------------------------------------------------------------------+
|############################################################################################|
|#                                                                                          #|
|#      [HEADLINE display-1, the one action, max 4 words] (1)                               #|
|#                                                                                          #|
|#      [Lead: one line, 36rem max]                                                         #|
|#                                                                                          #|
|#      [ Partner with us ] (2)                                                             #|
|#                                                                                          #|
|#      ------------------------------------------------------------------------------      #|
|#      PARTNERSHIP HEAD   [name] (3)                                                       #|
|#      ------------------------------------------------------------------------------      #|
|#      EMAIL              aerobmsce@bmsce.ac.in                                            #|
|#      ------------------------------------------------------------------------------      #|
|#      BASE               Propel Lab-3, BMSCE, Bengaluru                                   #|
|#                                                                                          #|
|############################################################################################|
+--------------------------------------------------------------------------------------------+
```

- **Grid:** headline cols 1-10; contact rows use the rail: label cols 1-3, value cols 4-10.
- **Tokens:** field `gold`, padding `space-10`. Headline `display-1` / `ink`. Primary button: ink fill, `paper` text; its action is a `mailto:` link to the address (no form, no backend; an app-style form would require server-side handling per RULES). Rows `data` labels, `body` 500 values, `rule-1` in `ink` dividers.
- **Eye:** (1) headline, (2) Partner with us, (3) the named contact.
- **Scroll:** static. The mobile sticky bar hides when this block enters view.
- **Signature:** none.

#### 390 mobile

```text
+----------------------------------------+
|########################################|
|#                                      #|
|# [HEADLINE display-1,                 #|
|#  max 3 lines] (1)                    #|
|#                                      #|
|# [Lead: 2 lines]                      #|
|#                                      #|
|# [ Partner with us        ] (2)       #|
|#                                      #|
|# ------------------------------------ #|
|# PARTNERSHIP HEAD                     #|
|# [name] (3)                           #|
|# ------------------------------------ #|
|# EMAIL                                #|
|# aerobmsce@bmsce.ac.in                #|
|# ------------------------------------ #|
|#                                      #|
|########################################|
+----------------------------------------+
```

- **Redesign, not shrink:** contact rows stack label over value instead of the rail, and the button is full width. This is the only place on mobile where Partner with us is both a button and a labelled address.
- **Tokens:** field `gold`, padding `space-8`, headline at 39px minimum.
- **Eye:** (1) headline, (2) Partner with us, (3) contact name.
- **Scroll:** sticky bar is hidden here.
- **Signature:** none.

---

## 8. Footer

#### 1440 desktop

```text
+--------------------------------------------------------------------------------------------+
|============================================================================================|
|=                                                                                          =|
|=      AEROBMSCE (1)      Teams      Results      Partners                                 =|
|=                         Join the club                                                    =|
|=                                                                                          =|
|=      EMAIL              aerobmsce@bmsce.ac.in (2)                                        =|
|=      ------------------------------------------------------------------------------      =|
|=      (c) AeroBMSCE                                                                       =|
|=      [Practice-site notice, kept from the old site] (3)                                  =|
|=                                                                                          =|
|============================================================================================|
+--------------------------------------------------------------------------------------------+
```

- **Grid:** wordmark cols 1-3, links cols 4-10.
- **Tokens:** field `ink`, padding `space-9`. Wordmark text in `paper`, `display-3`, **text only** (the dark eagle does not read on ink; a light-on-dark logo file has not been supplied). Links and email `body` / `paper`, `rule-2` underline in `gold` on hover. Notice and copyright `data` / `ash`. Divider `rule-1` / `graphite`.
- **Notice:** the old site says it is a practice site for the recruitment task and not the official AeroBMSCE site, with `noindex`. Keep both until you say otherwise.
- **Eye:** (1) wordmark, (2) email, (3) the notice.
- **Scroll:** static.
- **Signature:** none.

#### 390 mobile

```text
+----------------------------------------+
|========================================|
|=                                      =|
|= AEROBMSCE (1)                        =|
|=                                      =|
|= Teams                                =|
|= Results                              =|
|= Partners                             =|
|= Join the club                        =|
|=                                      =|
|= aerobmsce@bmsce.ac.in (2)            =|
|= ------------------------------------ =|
|= (c) AeroBMSCE                        =|
|= [Practice-site notice] (3)           =|
|=                                      =|
|========================================|
+----------------------------------------+
```

- **Redesign, not shrink:** one column of 48px-high links instead of a row; email is its own line.
- **Tokens:** field `ink`, padding `space-8`. Text `paper`, notice `ash`.
- **Eye:** (1) wordmark, (2) email, (3) notice.
- **Scroll:** static. The sticky bar is already hidden.
- **Signature:** none.

---

## Quality floor, applied to every wireframe

- Visible keyboard focus: `rule-2` focus ring, `ink` on paper and gold, `gold` on ink.
- Tap targets 48px high (buttons, tier rows, menu links, footer links).
- Contrast uses only the pairs allowed in TOKENS.md section 2.
- Reduced motion: no wipe, no travel, no height animation; colour swaps only.
- Mobile first: all mobile layouts are authored first, then widened.
- No server-side auth needed: there are no accounts, forms or paywalls. The one contact path is `mailto:`.

## Open questions

1. **Hero A or B?** A is recommended until one event has a confirmed date.
2. **Partner logo colours.** Ten full-colour logos on a duotone page may fight the palette. Default is as supplied (W5). Alternative: show them in `ink` only, which needs your OK and single-colour files.
3. **Footer logo.** A light-on-dark mark is needed, or the footer stays text only.
4. **Partnership head name.** "Rajesh" comes from the old page. Confirm before it ships.
5. **Impression numbers** (20,000+ digital, 50,000+ on-ground) and "20+ podium finishes" are unconfirmed and are not shown.
6. **One page or three?** Wireframes assume one page (W1).
