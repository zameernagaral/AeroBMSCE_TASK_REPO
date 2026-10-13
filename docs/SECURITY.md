# Security Plan: AeroBMSCE Platform

This document defines the comprehensive threat model, defense-in-depth architecture, and verification protocol for the AeroBMSCE web platform.

---

## 1. Host and Backend Pattern

- **Client Hosting**: Next.js App Router deployed as a static export (`output: 'export'`) to GitHub Pages, or running via Node.js server runtime on a dedicated cloud host.
- **Backend API**: Node.js / Express 5 REST API running on port 4000, enforcing server-side session authentication, Zod input validation, rate limiting, and HTTP-only cookie governance.
- **Reverse Proxy**: Next.js rewrites proxy `/api/:path*` directly to `http://localhost:4000/api/:path*`, preventing cross-origin cookie restrictions during local execution.
- **Database**: Embedded SQLite engine (`better-sqlite3`) managed through Drizzle ORM at `./data/aerobmsce.sqlite`. All database operations use parameterized statements, preventing SQL injection by design.

---

## 2. Threat Model & Verification Table

| Threat | Applies to This Site? | Defence on the Server Side | Workaround if the Host is Static | How I Will Test It | Status |
|---|---|---|---|---|---|
| **Session Hijacking / Token Theft** | **Yes**: Authenticated members and admins manage sensitive records. | Better-Auth issues cryptographically signed session tokens stored strictly in `httpOnly`, `sameSite: 'lax'`, and `secure: true` (in production) cookies. Session lifetime capped to 7 days with 24-hour sliding refresh (`session.expiresIn: 604800`, `session.updateAge: 86400`). | Static client never reads cookies via JS (`document.cookie` inaccessible). Static frontend delegates auth state checking to `GET /api/me`. | Inspect `Set-Cookie` response headers in Playwright/curl; verify `HttpOnly` and `SameSite` flags are present and JS cannot read session tokens. | **Done** |
| **CSRF (Cross-Site Request Forgery)** | **Yes**: State-mutating API routes (`/api/auth/*`, `/api/admin/*`, `/api/recruitment`, `/api/events/*/rsvp`). | Better-Auth enforces origin verification and anti-CSRF checks (`advanced.disableCSRFCheck: false`, `advanced.disableOriginCheck: false`). Express middleware validates `Origin` and `Referer` headers matching `FRONTEND_URL`. | Form submissions require explicit JSON `Content-Type: application/json` headers, which trigger CORS preflight `OPTIONS` blocks on third-party sites. | Send a forged POST request from an unauthorized origin with credentials; confirm HTTP 403 / CORS preflight block. | **Done** |
| **SQL Injection (SQLi)** | **Yes**: Database queries for users, inquiries, applications, and events. | Drizzle ORM compiles all database operations to strictly parameterized prepared statements (`better-sqlite3`). No raw string interpolation is used anywhere in SQL generation. | N/A (database queries execute strictly within the Node.js backend). | Send malicious SQL strings (`' OR 1=1 --`, `'); DROP TABLE user;--`) to search, filter, and login parameters; confirm treated strictly as literals. | **Done** |
| **Cross-Site Scripting (XSS)** | **Yes**: User-supplied input (applicant statements of purpose, inquiry messages, attendee names). | React automatically escapes HTML entities in JSX rendering. Backend validates and sanitizes input with strict Zod text schemas. Zero usage of `dangerouslySetInnerHTML`. Helmet applies `X-Content-Type-Options: nosniff` and CSP headers. | Client static pages are compiled with React DOM escaping. No unescaped user HTML is ever rendered. | Inject `<script>alert(1)</script>` and `<img src=x onerror=alert(1)>` into name and message fields; confirm stored and rendered strictly as plaintext. | **Done** |
| **Brute Force & Credential Stuffing** | **Yes**: Public `/api/auth/sign-in/email` endpoint. | `express-rate-limit` limits authentication requests to 20 attempts per 15-minute window per IP (`windowMs: 900000, limit: 20`). Argon2/Scrypt hashing enforced by Better-Auth. | N/A (authentication is processed on Express API). | Execute 25 sequential rapid login requests using curl; verify requests 21–25 receive HTTP 429 Too Many Requests. | **Done** |
| **DoS via Large Payload Flooding** | **Yes**: JSON body parsing on public intake endpoints. | `express.json({ limit: "32kb", strict: true })` rejects payloads exceeding 32 kB before route execution. | Static host refuses upload verbs; GitHub Pages serves static files only. | Transmit a 1 MB payload to `/api/admin/inquiries`; verify server immediately terminates connection with HTTP 413 Payload Too Large. | **Done** |
| **Missing Security Headers** | **Yes**: Public browser traffic. | `helmet()` middleware sets `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and `Referrer-Policy: no-referrer`. Server banner disabled via `app.disable("x-powered-by")`. | Add equivalent headers in `public/_headers` (Cloudflare Pages/Netlify) or static hosting metadata. | Inspect HTTP response headers via `curl -I http://localhost:4000/api/teams`; verify headers match OWASP recommendations. | **Done** |
| **Overly Permissive CORS** | **Yes**: Decoupled Next.js client communicating with Express API. | `cors` middleware explicitly restricts `origin` to `FRONTEND_URL` (dynamic extraction of protocol + domain), allowing only methods `["GET", "POST", "PATCH", "OPTIONS"]` and headers `["Content-Type", "Authorization"]`. | N/A (CORS enforced on backend). | Send `OPTIONS` request with `Origin: http://malicious-site.com`; confirm `Access-Control-Allow-Origin` is omitted. | **Done** |
| **Privilege Escalation via Parameter Tampering** | **Yes**: Registration and member profile modification. | Better-Auth user config sets `role: { input: false }`, ensuring clients cannot supply `role` during sign-up. Role mutation is guarded strictly by `requireAdmin` middleware. | N/A (permissions evaluated server-side). | Submit `POST /api/auth/sign-up/email` with body payload `{"name":"Eve","email":"...","password":"...","role":"admin"}`; verify database record retains `role: 'pending'`. | **Done** |
| **Feature 1: View recruitment criteria** | **Yes**: Public access. | Unrestricted public endpoint (`GET /api/recruitment/meta`). No sensitive applicant data exposed. | Statically compiled in `app/recruitment/page.tsx`. | Verify anonymous request receives HTTP 200. | **Planned** |
| **Feature 1: Submit recruitment application** | **Yes**: Intake pipeline. | Zod schema checks BMSCE email domain (`@bmsce.ac.in`), 10-digit phone, and USN format. Enforce uniqueness on `usn` per cycle. Apply `writeLimiter` (10 submissions / 15 min). | Form delegates submission to external serverless API endpoint. | Submit valid BMSCE application -> HTTP 201; submit non-BMSCE email -> HTTP 400 with domain error. | **Planned** |
| **Feature 1: Check own application status** | **Yes**: Applicant tracking. | Secure token check: `GET /api/recruitment/status?token=:token`. Query selects record strictly matching cryptographic tracking token; zero PII returned beyond status and interview timestamp. | Tracking page queries `/api/recruitment/status`. | Request status with valid token -> HTTP 200; request with forged token -> HTTP 404 with safe message. | **Planned** |
| **Feature 1: View all candidate submissions** | **Yes**: Admin review. | Guarded by `requireUser` and `requireAdmin` middleware. Rejects non-admin sessions with HTTP 403. | Protected behind admin authentication gateway. | Request `GET /api/admin/recruitment` as anonymous -> HTTP 401; as regular member -> HTTP 403 Forbidden. | **Planned** |
| **Feature 1: Update review status** | **Yes**: Admin triage. | Guarded by `requireAdmin`. Zod schema strictly allows status enum `['under_review', 'shortlisted', 'rejected']`. | Guarded on backend API. | Send `PATCH /api/admin/recruitment/:id` without admin cookie -> HTTP 401/403; with admin cookie -> HTTP 200. | **Planned** |
| **Feature 1: Add internal evaluation notes** | **Yes**: Candidate feedback. | Guarded by `requireAdmin`. Notes field sanitized and stripped of HTML control characters. | Guarded on backend API. | Verify regular member cannot update notes endpoint (HTTP 403). | **Planned** |
| **Feature 2: Register new member account** | **Yes**: Member onboarding. | Better-Auth endpoint. Default `role: 'pending'`, `approvalStatus: 'pending_review'`. Strict password policy (min 12 chars). | Auth form sends credentials to API endpoint. | Register account with 8-character password -> HTTP 400; with 12+ chars -> HTTP 200 with `pending` role. | **Planned** |
| **Feature 2: Log in to portal** | **Yes**: Portal access. | Better-Auth sign-in. Verifies password hash; sets session cookie. Auth rate limiter active. | Client redirects unauthenticated visitors to `/login`. | Attempt login with wrong password -> HTTP 401 with generic error message. | **Done** |
| **Feature 2: Access Members Hangar (`/hangar`)** | **Yes**: Protected workspace. | `requireMember` middleware checks `session.user.role in ['member', 'lead', 'admin']` AND `approvalStatus === 'approved'`. Unapproved users receive HTTP 403. | Next.js client guards route; API enforces server-side gate. | Request `/api/hangar/resources` as user with `approvalStatus: 'pending_review'` -> HTTP 403 Forbidden. | **Planned** |
| **Feature 2: Download flight telemetry & CAD** | **Yes**: Proprietary IP. | Static files served via authorized streaming endpoint `GET /api/hangar/files/:id` after verifying member approval. No public direct S3/static URLs. | Files stored in protected private storage bucket, never in public directory. | Access CAD file endpoint as anonymous -> HTTP 401 Unauthorized. | **Planned** |
| **Feature 2: View member directory** | **Yes**: Internal networking. | Guarded by `requireMember`. PII (phone, password) omitted from serialization; only name, division, and badge ID returned. | Guarded on API. | Anonymous request -> HTTP 401; approved member request -> HTTP 200 (sanitized payload). | **Planned** |
| **Feature 2: View pending member approvals** | **Yes**: Governance. | Guarded by `requireAdmin`. Lists users where `approvalStatus === 'pending_review'`. | Guarded on API. | Regular member request -> HTTP 403 Forbidden. | **Planned** |
| **Feature 2: Approve / reject registration** | **Yes**: Membership grant. | Guarded by `requireAdmin`. Atomic update sets `approvalStatus: 'approved'`, `role: 'member'`, assigns badge ID. | Guarded on API. | Send approval PATCH as member -> HTTP 403; as admin -> HTTP 200. | **Planned** |
| **Feature 2: Revoke member access** | **Yes**: Account suspension. | Guarded by `requireAdmin`. Better-Auth session revocation terminates active user sessions immediately. | Guarded on API. | Admin revokes user; subsequent user request with existing cookie receives HTTP 401. | **Planned** |
| **Feature 3: View public upcoming events** | **Yes**: Public schedule. | Public endpoint `GET /api/events`. Excludes events where `isMembersOnly: 1` unless authenticated as approved member. | Pre-rendered or fetched on demand. | Anonymous request lists public events only; members-only event omitted. | **Planned** |
| **Feature 3: RSVP to public workshop** | **Yes**: Reservation. | Atomic SQLite transaction (`BEGIN IMMEDIATE`) checks `capacity > count(active_rsvps)`. Rate limited (2 RSVPs / 10 min / IP). | Form posts to API. | Send 5 simultaneous requests for the last seat; verify exactly 1 succeeds and 4 receive waitlist. | **Planned** |
| **Feature 3: Access members-only flight trials** | **Yes**: Flight safety. | Guarded by `requireMember`. Validates approved membership before accepting RSVP. | Guarded on API. | Anonymous request to reserve flight trial -> HTTP 401 Unauthorized. | **Planned** |
| **Feature 3: Cancel own RSVP** | **Yes**: Reservation release. | `POST /api/events/rsvp/cancel` requires `cancellationToken` matching the reservation. Promotes next waitlist entry atomically. | Guarded on API. | Cancel with valid token -> HTTP 200; with invalid token -> HTTP 404. | **Planned** |
| **Feature 3: Create new workshop / notice** | **Yes**: Event publication. | Guarded by `requireAdmin`. Input validated with Zod `eventSchema` (slug, title, location, capacity > 0). | Guarded on API. | Anonymous POST `/api/admin/events` -> HTTP 401; member POST -> HTTP 403. | **Planned** |
| **Feature 3: Edit event / adjust capacity** | **Yes**: Event maintenance. | Guarded by `requireAdmin`. Prevents reducing capacity below currently confirmed attendees. | Guarded on API. | Admin edits event -> HTTP 200; member edits event -> HTTP 403. | **Planned** |
| **Feature 3: Export attendee roster (CSV)** | **Yes**: Student PII export. | Guarded by `requireAdmin`. Streamed as secure attachment; PII access logged in server audit trail. | Guarded on API. | Member request -> HTTP 403 Forbidden. | **Planned** |
| **Bot Reservation Flooding** | **Yes**: Automated seat hoarding. | Hidden honeypot field (`website_hp`) in forms; submissions with non-empty honeypots silently rejected. Rate limiting via `writeLimiter`. | Client includes honeypot and client-side challenge. | Submit form with populated `website_hp` field; verify server returns HTTP 200/400 without creating database row. | **Planned** |
| **Dependency Vulnerabilities** | **Yes**: npm package supply chain. | Run `npm audit --production` in CI pipeline. Fix all high and critical CVEs immediately. | CI workflow fails if audit reports high/critical vulnerabilities. | Run `npm audit` in terminal; confirm 0 high or critical vulnerabilities. | **Done** |
| **Information Leakage via Error Messages** | **Yes**: Server crash or DB failure. | Global Express error handler catches all unhandled exceptions, logs full stack trace to server stdout, and returns generic `{"error": "Internal server error"}` to client. | Static pages display static `error.tsx` boundary. | Trigger unhandled throw on backend; verify response body contains zero file paths or SQL traces. | **Done** |
| **Student PII Leakage** | **Yes**: Academic records (USN, phone, email). | PII stored strictly in internal tables; public endpoints serialize only public projections. Access to PII restricted to root admin role. | No PII included in static bundles or public git repo. | Query public `/api/results` and `/api/teams`; verify no student phone, email, or USN is present. | **Done** |

---

## 3. Secrets Inventory & Handling

Every environment secret is managed according to strict least-privilege standards:

| Secret Key Name | Scope | Sensitivity | Where It Lives | Usage Rule |
|---|---|---|---|---|
| `BETTER_AUTH_SECRET` | Private | **Critical** | Server `.env` / Cloud Secrets | Minimum 32-character high-entropy key for HMAC signing and session cookie encryption. Never committed to git. |
| `BETTER_AUTH_URL` | Private | Low | Server `.env` | Internal base URL for the Better-Auth daemon (e.g. `http://localhost:4000`). |
| `FRONTEND_URL` | Private | Low | Server `.env` | Trusted origin URL for CORS headers and cookie domain matching. |
| `DATABASE_PATH` | Private | Low | Server `.env` | Local filesystem path to the SQLite file (`./data/aerobmsce.sqlite`). |
| `ADMIN_EMAIL` | Private | Medium | Server `.env` | Root administrator identity for database seeding and disaster recovery. |
| `ADMIN_PASSWORD` | Private | **Critical** | Server `.env` | High-entropy root password (12–128 chars) used exclusively during `npm run seed`. |
| `RECRUITMENT_CYCLE_SALT` | Private | Medium | Server `.env` | Cryptographic salt used to generate non-guessable applicant tracking tokens. |
| `NEXT_PUBLIC_BASE_PATH` | Public | None | Next.js build environment | Public subpath prefix (`/AeroBMSCE_TASK_REPO`) for static asset resolution on GitHub Pages. |

---

## 4. What This Host Cannot Do (Static GitHub Pages Limitations & Workarounds)

When the frontend is deployed to GitHub Pages as a static export, GitHub Pages operates as a pure content delivery network (CDN) without a server runtime. Here is what GitHub Pages cannot do and the explicit workaround for each:

1. **Cannot Evaluate Authentication Sessions or Run Middleware**:
   - *Limitation*: GitHub Pages cannot inspect incoming request cookies, run Better-Auth session verification, or enforce server-side redirects on `/admin` or `/hangar`.
   - *Workaround*: All protected pages use client-side authentication guards (React `useEffect`) that query `GET /api/me` on the external Express backend. Unauthenticated clients are instantly bounced to `/login`. Furthermore, all data fetching occurs exclusively through authenticated API endpoints; no privileged data is ever pre-rendered into the static HTML.

2. **Cannot Process Form Submissions or Execute Database Mutations**:
   - *Limitation*: GitHub Pages cannot accept `POST`, `PATCH`, or `DELETE` HTTP verbs; all form actions targeting the static host directly will return HTTP 405 Method Not Allowed.
   - *Workaround*: Frontend forms submit payloads via `fetch()` directly to the Express API (`/api/recruitment`, `/api/events/*/rsvp`, `/api/admin/*`), which validates and writes to SQLite with full ACID compliance.

3. **Cannot Securely Store Private Secrets**:
   - *Limitation*: GitHub Pages bundles and serves all assets to the browser. Any secret compiled into client-side code is publicly compromised.
   - *Workaround*: Zero secrets are ever prefixed with `NEXT_PUBLIC_` or imported into frontend components. All private keys (`BETTER_AUTH_SECRET`, `ADMIN_PASSWORD`, `RECRUITMENT_CYCLE_SALT`) reside exclusively on the isolated Node.js server.

4. **Cannot Enforce Custom Dynamic Security Headers via Server Engine**:
   - *Limitation*: GitHub Pages does not allow custom server response headers (e.g. custom `Content-Security-Policy` or `X-Frame-Options` on HTML responses).
   - *Workaround*: Critical security meta tags (e.g. `<meta http-equiv="X-Content-Type-Options" content="nosniff">`) are embedded in `app/layout.tsx`. When deployed to hosting providers supporting headers (Cloudflare Pages, Vercel, Netlify), header rules are configured in `_headers` or config files. The Express API strictly sets Helmet security headers on all API transactions.

---

## 5. Verification Protocol (Playwright & curl)

Every threat marked **Done** is verified using active testing scripts:
1. **Authentication Gate**: `curl -s http://localhost:4000/api/admin/inquiries` -> Returns `{"error": "Authentication required"}` (HTTP 401).
2. **Role Authorization Gate**: Login as user with `role: 'member'`; attempt `GET /api/admin/inquiries` -> Returns `{"error": "Admin permission required"}` (HTTP 403).
3. **Payload Limit**: `curl -X POST -H "Content-Type: application/json" -d @oversized.json http://localhost:4000/api/admin/inquiries` -> Returns HTTP 413 Payload Too Large.
4. **CORS Enforcement**: `curl -H "Origin: http://evil.com" -I http://localhost:4000/api/teams` -> `Access-Control-Allow-Origin` is omitted.
5. **Rate Limiting**: Dispatch 25 rapid requests to `/api/auth/sign-in/email` -> Returns HTTP 429 Too Many Requests.
