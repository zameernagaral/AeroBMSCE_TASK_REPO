# Codebase Architecture

## Architecture Overview
- **Framework**: Next.js 16 (App Router) + React 19.
- **Backend API**: Node.js / Express 5 REST API running on port 4000.
- **Database**: SQLite (`better-sqlite3` + Drizzle ORM) stored at `./data/aerobmsce.sqlite`.
- **Authentication**: Better-Auth with SQLite Drizzle Adapter, issuing HTTP-only session cookies.
- **Proxy**: Next.js rewrites proxy `/api/:path*` directly to `http://localhost:4000/api/:path*` during local development (`process.env.GITHUB_ACTIONS !== 'true'`), while production GitHub Actions build uses `output: 'export'`.

## Routes
- `/`: Public landing page (Hero, Photo Wall signature, Teams, Results, Partner Tiers, Collaborators, Footer with Admin Portal link).
- `/login`: Admin login portal with Evaluator Access demo credentials callout (`admin@aerobmsce.ac.in` / `Aer0BMSCE!SecureAdmin2026`).
- `/admin`: Protected administration console (Inquiries triage, Results publisher, Team manager), guarded client-side by `GET /api/me` and server-side by `requireAdmin` middleware.
- `/_style-tile`: Design tokens reference and style tile.

## Known Problems
- Cached HTTP 308 redirects: Browsers that previously loaded `/api/me` under `trailingSlash: true` may hold a permanent redirect to `/api/me/`, causing an `ERR_TOO_MANY_REDIRECTS` loop until cache is cleared or tested in an incognito/private browsing session.
