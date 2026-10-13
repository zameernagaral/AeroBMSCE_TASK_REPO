# Change Specification: Replace Hero Headline & Subtitle with Club Identity Copy

## 1. Goal
Replace the hero headline and subtitle on the homepage with authentic club identity copy representing AeroBMSCE and its aerospace engineering mission.

## 2. Why
The existing hero text ("Your logo on aircraft that competed in Texas" / "Platinum and Gold partners get their logo on our aircraft.") read like a commercial sponsorship pitch rather than an introduction to AeroBMSCE, the student aeromodelling and drone engineering club at BMS College of Engineering. The visitor needs to immediately understand who the club is, what they build, and their collegiate pedigree upon landing on the site.

## 3. Files
- **Files you may edit**:
  - `app/page.tsx`
  - `docs/COPY.md`
- **New files you may create**:
  - None
- **Files you must NOT touch**:
  - `server/index.js`
  - `server/auth.js`
  - `server/schema.js`
  - `app/admin/page.tsx`
  - `app/admin/admin.module.css`
  - `app/login/page.tsx`
  - `app/login/login.module.css`
  - `app/page.module.css`
  - `styles/tokens.css`
  - `package.json`

## 4. Blast Radius
`app/page.tsx`: Only modifies lines 111–116 inside `<section id="hero">`.
All other sections (header, photo wall, flight divisions, competition results, partner tiers, collaborators grid, and footer) remain completely untouched.

## 5. Design & Token Reuse
Reuses existing design tokens and CSS module classes:
- `styles.heroTitle`: `font-weight: 700`, `font-size: clamp(2.25rem, 6vw, 4.5rem)`, `line-height: 1.05`, `color: var(--color-ink)`
- `styles.heroLead`: `font-size: 1.25rem`, `color: var(--color-ink)`, `max-width: 42ch`
- Background: `var(--color-gold)` (`#FCBC34`)
- Contrast ratio: Ink on Gold provides an 11.19:1 contrast ratio, exceeding WCAG AAA standards.

## 6. Permissions & Data Model
| Role | Access to Homepage Hero | Access to `/login` | Access to `/admin` |
|---|---|---|---|
| **Anonymous** | View | View | Denied (redirects to `/login`) |
| **Admin** | View | View | Full CRUD access |

- **Data Model**: No database schemas or API endpoints modified.

## 7. Failure States & Edge Cases
### Failure States
1. **Mobile Header Text Overflow (<390px Viewports)**:
   - Prevention: Headline uses fluid clamp scaling and responsive breaks to ensure zero horizontal scrolling.
2. **Missing Accessible Landmark for Screen Readers**:
   - Prevention: Accessible `<h1 id="hero-title">` referenced by `aria-labelledby="hero-title"` on `<section id="hero">`.
3. **Inconsistent CTA Context**:
   - Prevention: Maintains both "Partner with us" (primary anchor) and "Join the club" (recruitment mailto) actions seamlessly aligned with the new mission statement.

### Edge Cases
1. **Narrow Viewport Word Wrapping**: Tested at 360px and 390px to prevent awkward single-word hyphens or line orphan breaks.
2. **Reduced Motion & High Contrast**: Fluid typographic hierarchy without reliance on animation triggers.
3. **Subpath Deployment / Static Generation**: Zero impact on Next.js `output: 'export'` or custom image loader.

## 8. Acceptance Tests
1. **Club Identity Prominence**: On `/`, the hero section clearly communicates AeroBMSCE and its aircraft/drone engineering focus.
2. **Descriptive Subtitle**: The subtitle explains that AeroBMSCE is the student aeromodelling and drone engineering club at BMS College of Engineering.
3. **Responsive Visual Integrity**: At 390px, 768px, and 1280px viewports, text fits within the golden field without clipping or horizontal overflow.
4. **Backend Denial Test**: Unauthorized `POST /api/admin/*` requests continue to be strictly denied with HTTP 401.

## 9. Out of Scope
- Changing header navigation links or brand mark.
- Modifying other page sections (Photo Wall, Teams, Results, Partner Tiers).
- Modifying backend server logic or database.

## 10. Rollback Strategy
- Branch: `copy/hero-club-identity`
- Rollback command: `git checkout app/page.tsx docs/COPY.md`
