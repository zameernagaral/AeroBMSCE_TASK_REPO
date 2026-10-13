# Changelog

## 2026-10-13 — Collaborator Logo Contrast Fix & Admin Portal README Documentation

### What Changed
- **Logo Contrast Fix**: Restored high contrast for white transparent brand logos (`DRK Store` and `UAV Marketplace`) by converting white pixels to crisp dark ink (`#101014`) and applying `.logoImgInvert` (`filter: brightness(0)`) in `app/page.module.css`. Corrected `Ansys` logotype by retaining the authentic yellow slash while rendering the "Ansys" lettering in dark ink against the white tile.
- **README.md Documentation**: Added prominent "Administrative Portal & Evaluator Guide" section in `README.md` detailing:
  - Location of the Admin Portal in the footer navigation (`Footer -> Admin Portal`) and route `/login`.
  - Seeded root administrator credentials (`admin@aerobmsce.ac.in` / `Aer0BMSCE!SecureAdmin2026`).
  - One-click "Fill Demo Credentials" functionality.
  - Three admin management workflows (`/admin`): Partnership inquiries triage, Competition results publishing, and Flight divisions manager.
  - Technical & submission verification list updated with `/login`.

### Files Touched
- `app/page.module.css`
- `app/page.tsx`
- `public/images/ansys.png`, `images/ansys.png`
- `public/images/drkstore.png`, `images/drkstore.png`
- `public/images/uav-marketplace.png`, `images/uav-marketplace.png`
- `README.md`

### Tests Run and Results
- `npm run build`: **PASS** (11/11 static pages generated)
- Live Playwright visual inspection (`section#partners`): **PASS** (All 10 logos clearly visible, high-contrast, verified via screenshot `.playwright-mcp/collaborators-fixed.png`)
- **Total Test Score**: 2 passed / 0 failed.

### What Is Left
- None.

---

## 2026-10-13 — Admin Panel Access & Demo Credentials Callout

### What Changed
- **Footer Navigation**: Added accessible, discrete "Admin Portal" link to footer navigation pointing to `/login`.
- **Demo Credentials Callout**: Rendered high-contrast Evaluator Access card on `/login` displaying seeded admin credentials (`admin@aerobmsce.ac.in` / `Aer0BMSCE!SecureAdmin2026`).
- **One-Click Auto-Fill**: Implemented "Fill Demo Credentials" action populating email and password inputs without form submission, clearing any active error alerts.
- **Strict Error Messaging**: Aligned login failure messages strictly with specification (HTTP 401 returns `"Authentication failed. Please check your credentials."`; network/offline errors return `"Sign-in failed. Please try again."`).
- **Reverse Proxy Rewrites**: Enabled Next.js rewrites in `next.config.js` proxying `/api/:path*` to `http://localhost:4000/api/:path*` during local development, while preserving `output: 'export'` for GitHub Actions deployment.

### Files Touched
- `app/page.tsx`
- `app/login/login.module.css`
- `app/login/page.tsx`
- `next.config.js`
- `next-env.d.ts` (Next.js types)

### Tests Run and Results
- `npm run build`: **PASS** (11/11 static pages generated)
- `npm run seed`: **PASS** (Admin account ready for `admin@aerobmsce.ac.in`)
- Direct Express auth tests:
  - Invalid credentials (`admin@aerobmsce.ac.in` / `WrongPassword123`): **PASS** (HTTP 401 `INVALID_EMAIL_OR_PASSWORD`)
  - Valid credentials (`admin@aerobmsce.ac.in` / `Aer0BMSCE!SecureAdmin2026`): **PASS** (HTTP 200, session cookie set)
- Live Playwright browser verification:
  - Acceptance Test 1 (Footer Discovery): **PASS** (`link "Admin Portal"` present in footer nav pointing to `/login/`)
  - Acceptance Test 2 (Demo Box Render): **PASS** (Card displays exact email and password)
  - Acceptance Test 3 (One-Click Auto-Fill): **PASS** (Inputs populated instantly without submitting)
  - Acceptance Test 4 (Denial Message): **PASS** (Displays `"Authentication failed. Please check your credentials."`)
  - Acceptance Test 5 (Auto-Fill Overwrite & Error Clear): **PASS** (Alert removed and fields updated on auto-fill click)
  - Responsive layout (360px width): **PASS** (`hasHorizontalOverflow: false`)
  - Keyboard accessibility: **PASS** (`:focus-visible` outline verified on auto-fill button)
- **Total Test Score**: 8 passed / 0 failed.

### What Is Left
- Refresh browser cache / verify `/admin` dashboard hydration in client browser sessions that had previously cached the Next.js `308 Permanent Redirect` on `/api/me`.

### Known Problems
- Browsers (such as Safari or Chrome) that visited `/api/me` while `trailingSlash: true` was active may retain a cached `308 Permanent Redirect` to `/api/me/`, causing a temporary client-side `net::ERR_TOO_MANY_REDIRECTS` loop until browser cache is cleared or a private window is used.
