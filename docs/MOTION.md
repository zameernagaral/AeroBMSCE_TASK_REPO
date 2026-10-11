# MOTION

Table of animations for AeroBMSCE per `docs/RULES.md` and `docs/TOKENS.md` (Section 6).
Strict constraint: Max 6 rows. Animate only transform and opacity (plus signature clip-path). Reduced motion shows zero movement.

---

## 1. Motion Tokens

| Token | Value | Applied To |
|---|---|---|
| `--dur-1` | `120ms` | Hover, press, tactile button/link feedback |
| `--dur-2` | `240ms` | Disclosure, accordion, mobile sticky CTA reveal |
| `--dur-3` | `480ms` | Signature photo wall scroll reveal only |
| `--ease` | `cubic-bezier(0.2, 0, 0, 1)` | Single project easing (decisive ease-out) |
| `--travel` | `16px` | Maximum element displacement distance |

---

## 2. Animation Inventory

| Element | Trigger | Property | Duration Token | Why it exists |
|---|---|---|---|---|
| **Primary Buttons & CTAs** (`.heroPrimaryBtn`, `.navCta`, `.finalCta`) | Hover / Focus / Press | `background-color`, `color`, `outline-color` | `--dur-1` (120ms) | Provides instant tactile confirmation of clickable affordance before action dispatch. |
| **Signature Photo Wall Tiles** (`.tile .frame`) | Scroll into viewport (IntersectionObserver threshold 0.15) | `clip-path` (inset bottom wipe) | `--dur-3` (480ms) + `--dur-1` stagger | Directs visual focus to real competition aircraft evidence sequentially without jarring page pop. |
| **Mobile Sticky CTA Bar** (`.stickyBar`) | Scroll past hero section fold threshold | `transform` (Y 16px -> 0), `opacity` (0 -> 1) | `--dur-2` (240ms) | Smoothly introduces persistent primary action access on small screens when the hero CTA departs viewport. |
| **Partner Tier Benefits Disclosure** (`.tierBenefits`) | Click "Show benefits" toggle button | `opacity` (0 -> 1), `transform` (Y 8px -> 0) | `--dur-2` (240ms) | Expands itemized partnership deliverable details on demand without sudden layout jumps. |
| **Earlier Seasons Disclosure** (`.seasonsList` archived entries) | Click "Show earlier seasons" button | `opacity` (0 -> 1), `transform` (Y 8px -> 0) | `--dur-2` (240ms) | Unfolds historical competition archives smoothly while preserving the user's reading anchor. |
| **Data Rail Item Hover** (`.teamRow`, `.seasonGroup`, `.tierRow`) | Hover / Focus | `border-color`, `color` | `--dur-1` (120ms) | Visually tethers wide 12-column metadata labels to corresponding content blocks across the desktop grid. |

---

## 3. Reduced Motion & Failure Modes

- **`prefers-reduced-motion: reduce`**:
  - All `transform` values set to `none`.
  - All `clip-path` transitions removed; tiles render immediately revealed.
  - Travel distance reduced to `0px`.
  - Durations collapse to `0.01ms` (or instant color swap).
- **No Scroll Hijacking**: Native browser scrolling remains untouched; no Lenis, smooth-scroll polyfill, or wheel trapping.
- **Implementation Mechanism**: CSS Modules + native `IntersectionObserver` (0 external dependencies per TOKENS.md Section 1 & 6).
