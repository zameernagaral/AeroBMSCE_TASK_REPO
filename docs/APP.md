# AeroBMSCE Application Specification (APP.md)

Specification for the AeroBMSCE web platform based on [docs/BRIEF.md](file:///Users/zameerabdulkalamnagaral/docs/BRIEF.md). Defines v1 features, user roles, data models, API endpoints, authentication architecture, page routes, acceptance tests, and out-of-scope boundaries.

---

## 1. Ranked v1 Features & Acceptance Tests

### Feature 1: Public Engineering Showcase & Hardware Photo Wall (Rank 1)
- **Description**: Public visitors explore AeroBMSCE's four flight divisions (Yaksha, Blue Impulse, Flying Phantoms, Vectors), verified competition podium finishes since 2018, and authentic hardware photography.
- **Acceptance Test**: A prospective sponsor visits the homepage, browses the four flight divisions and competition podium finishes, and opens the photo wall to see verified aircraft build photography.

### Feature 2: Sponsorship & Partnership Inquiry Intake (Rank 2)
- **Description**: Prospective industry, institutional, and alumni partners submit structured sponsorship inquiries with their name, organization, email, and message. Submissions are strictly validated server-side and rate-limited.
- **Acceptance Test**: A corporate representative submits a partnership inquiry with their organization name and message, receives an immediate submission confirmation, and the record is stored securely with a "new" status.

### Feature 3: Admin Inquiry Management & Triage (Rank 3)
- **Description**: Authenticated club leads review inbound partnership inquiries, examine submission details, and update operational statuses (`new` → `contacted` → `closed`).
- **Acceptance Test**: A club lead signs in with admin credentials, views all incoming sponsorship inquiries ordered by submission date, and updates an inquiry status to "contacted".

### Feature 4: Admin Competition Results Publishing (Rank 4)
- **Description**: Authenticated club administrators publish and update verified competition results, podium finishes, cash awards, and flight team entries.
- **Acceptance Test**: An authenticated admin publishes a new podium placement from SAE Aerothon, and the result immediately appears in the results catalog.

### Feature 5: Role-Based Session Authentication & Access Control (Rank 5)
- **Description**: Secure, server-side session authentication with role-based access control protecting all administrative triage and modification endpoints.
- **Acceptance Test**: An unauthenticated visitor attempting to access admin inquiry or creation endpoints receives an authorization rejection and cannot read or mutate restricted data.

---

## 2. User Roles

| Role | Access Level | Description |
|---|---|---|
| `visitor` | Public (Unauthenticated) | Can view the homepage, flight divisions, competition results, partner tiers, and submit partnership inquiries. |
| `member` | Authenticated Club Member | Can sign in, view internal club documentation, roster notices, and session information. |
| `admin` | Authenticated Lead / Mentor | Full access: triages sponsorship inquiries, publishes/edits competition results and flight division records. |

---

## 3. Data Models

### 3.1 `user`
| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | `text` | Primary Key | Unique user identifier (UUID) |
| `name` | `text` | Not Null | User full name |
| `email` | `text` | Not Null, Unique | User contact email address |
| `emailVerified` | `boolean` | Not Null, Default: `false` | Email verification flag |
| `image` | `text` | Nullable | Avatar image URL |
| `role` | `text` | Not Null, Default: `'member'` | Authorization role (`'member'` or `'admin'`) |
| `createdAt` | `timestamp` | Not Null | Account creation timestamp |
| `updatedAt` | `timestamp` | Not Null | Account last modified timestamp |

### 3.2 `session`
| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | `text` | Primary Key | Unique session identifier |
| `expiresAt` | `timestamp` | Not Null | Session expiration deadline |
| `token` | `text` | Not Null, Unique | Cryptographic session bearer token |
| `createdAt` | `timestamp` | Not Null | Session issuance timestamp |
| `updatedAt` | `timestamp` | Not Null | Session last touch timestamp |
| `ipAddress` | `text` | Nullable | Client IP address at login |
| `userAgent` | `text` | Nullable | Client browser user agent |
| `userId` | `text` | Not Null, Foreign Key (`user.id`) | Cascading reference to owning user |

### 3.3 `account`
| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | `text` | Primary Key | Account entry identifier |
| `accountId` | `text` | Not Null | Provider account ID |
| `providerId` | `text` | Not Null | Auth provider identifier (`'credential'`) |
| `userId` | `text` | Not Null, Foreign Key (`user.id`) | Cascading reference to owning user |
| `password` | `text` | Nullable | Argon2id / bcrypt hashed credential |
| `createdAt` | `timestamp` | Not Null | Account linkage timestamp |
| `updatedAt` | `timestamp` | Not Null | Account update timestamp |

### 3.4 `verification`
| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | `text` | Primary Key | Verification record identifier |
| `identifier` | `text` | Not Null | Verification target (e.g. email) |
| `value` | `text` | Not Null | Secure one-time token / code |
| `expiresAt` | `timestamp` | Not Null | Token expiry timestamp |
| `createdAt` | `timestamp` | Not Null | Token creation timestamp |
| `updatedAt` | `timestamp` | Not Null | Token update timestamp |

### 3.5 `teams`
| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | `integer` | Primary Key, Auto Increment | Division sequence identifier |
| `name` | `text` | Not Null, Unique | Team name (e.g. "Team Yaksha") |
| `discipline` | `text` | Not Null | Specialization (e.g. "International Competitions") |
| `description` | `text` | Not Null | Mission, aircraft class, and focus |

### 3.6 `results`
| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | `integer` | Primary Key, Auto Increment | Competition result identifier |
| `title` | `text` | Not Null | Award or placement headline |
| `event` | `text` | Not Null | Competition and host venue |
| `year` | `integer` | Not Null | Competition season year (e.g. 2025) |
| `placement` | `text` | Nullable | Standardized rank or podium placement |
| `verified` | `boolean` | Not Null, Default: `false` | Club lead verification check |

### 3.7 `partner_tiers`
| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | `integer` | Primary Key, Auto Increment | Tier level sequence identifier |
| `name` | `text` | Not Null, Unique | Tier title ("Platinum", "Gold", etc.) |
| `descriptor` | `text` | Not Null | Primary alignment summary |
| `benefits` | `text` | Not Null | JSON array of promised sponsor deliverables |

### 3.8 `inquiries`
| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | `integer` | Primary Key, Auto Increment | Inbound inquiry identifier |
| `name` | `text` | Not Null | Contact person full name |
| `email` | `text` | Not Null | Contact email address |
| `organization` | `text` | Not Null | Company, laboratory, or agency name |
| `message` | `text` | Not Null | Sponsorship intent or collaboration scope |
| `status` | `text` | Not Null, Default: `'new'` | Triage state (`'new'`, `'contacted'`, `'closed'`) |
| `createdAt` | `timestamp` | Not Null | Submission timestamp |

---

## 4. API Routes

### 4.1 Public Endpoints
- `GET /api/health` — System uptime and health status check.
- `GET /api/teams` — List active flight divisions (query: `limit`).
- `GET /api/results` — List historical competition podiums (query: `year`, `limit`).
- `GET /api/partner-tiers` — List available partnership packages with benefits.
- `POST /api/inquiries` — Submit a partnership inquiry (Rate limit: 10 per 15 min; body: `name`, `email`, `organization`, `message`).

### 4.2 Authentication Endpoints (`/api/auth/*`)
- `POST /api/auth/sign-in/email` — Authenticate user via email and password.
- `POST /api/auth/sign-up/email` — Register new team member account.
- `POST /api/auth/sign-out` — Invalidate current session token.
- `GET /api/auth/get-session` — Retrieve active authenticated session and user object.
- `GET /api/me` — Authenticated user profile and assigned role (`requireUser`).

### 4.3 Admin Endpoints (Requires `requireUser` + `requireAdmin`)
- `GET /api/admin/inquiries` — List all inbound inquiries with status and timestamp.
- `PATCH /api/admin/inquiries/:id` — Update inquiry status (`new`, `contacted`, `closed`).
- `POST /api/admin/teams` — Register a new flight division or aircraft team.
- `POST /api/admin/results` — Publish a verified competition award or podium finish.

---

## 5. Authentication & Security Architecture

- **Library**: `better-auth` (v1.7.7) with `@better-auth/drizzle-adapter` and SQLite / Drizzle ORM.
- **Session Strategy**: Database-persisted cryptographic bearer tokens transmitted via HTTP cookies or Bearer headers.
- **Rate Limiting**:
  - Auth endpoints: 20 requests per 15-minute window via `express-rate-limit`.
  - Ingestion / write endpoints: 10 requests per 15-minute window.
- **Payload Limits**: Strict JSON body parsing capped at 32KB.
- **Transport Security**:
  - `helmet` security headers enabled with `x-powered-by` disabled.
  - Strict CORS origin whitelisting bound to the configured frontend origin.
- **Validation**: Strict schema parsing using `zod` on all route parameters, queries, and mutation bodies.

---

## 6. Page Routes

| Route | Access | Purpose |
|---|---|---|
| `/` | Public | Main landing page: Hero, Photo Wall, Teams, Results, Partnership Tiers, Collaborators, Partner CTA block, Footer. |
| `/_style-tile` | Public | Design tokens, typography hierarchy, button states, and color system reference style tile. |
| `/login` | Public | Member and administrator authentication sign-in portal. |
| `/admin/inquiries` | Admin Only | Administrative inbox for triaging, reviewing, and tracking inbound partnership inquiries. |
| `/admin/results` | Admin Only | Competition achievement publishing interface. |

---

## 7. Out of Scope (Explicit Boundaries)

The following capabilities are deliberately excluded from v1 to maintain architectural discipline and focus:

1. **Real-Time Flight Telemetry & Video Streaming**: No live WebSocket telemetry gauges, cockpit video feeds, or real-time ground-station dashboards.
2. **E-Commerce & Merchandise Checkout**: No payment gateway processing, shopping carts, or club apparel store.
3. **Automated Multi-Round Recruitment Pipeline**: No multi-stage applicant tracking, resume parsing, or interview scheduling system.
4. **Confidential Defense CAD/Aero Data Downloads**: Proprietary CAD assemblies, DRDO joint project schematics, and simulation meshes are never hosted for public download.
5. **Community Social Feed & Member Chat**: No social networking features, open comments, or peer-to-peer discussion threads.
