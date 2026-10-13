# Feature Specifications: AeroBMSCE Club Platform

This document specifies the top 3 high-impact features selected for the AeroBMSCE platform, balancing prospective student recruitment, member community governance, and competition event operations.

---

## Feature 1: Recruitment Application Pipeline with Admin Review

- **Rank & Size**: Rank 1 · Size: Medium
- **Goal / Rubric Line**: Serves the secondary conversion goal in `docs/BRIEF.md` ("Join the club / Explore recruitment") by replacing unstructured email links with a structured, verified candidate intake pipeline for Propel Lab–3 flight divisions.
- **User Story**: As a BMSCE engineering student, I want to submit my recruitment application with my discipline preference and academic credentials so that the club leads can evaluate my technical fit and notify me of my interview status.

### Roles & Permissions Table
| Action | Anonymous | Applicant | Approved Member | Club Admin |
|---|---|---|---|---|
| View recruitment criteria & deadlines | Allow | Allow | Allow | Allow |
| Submit new recruitment application | Allow | Allow | Deny (already in club) | Deny |
| Check own application status | Deny | Allow (via secure tracking token) | Allow | Allow |
| View all candidate submissions | Deny | Deny | Deny | Allow |
| Update review status (`under_review`, `shortlisted`, `rejected`) | Deny | Deny | Deny | Allow |
| Add internal evaluation notes | Deny | Deny | Deny | Allow |

### Data Model (`recruitment_applications`)
| Field | Type | Required | Unique | Owner / Notes |
|---|---|---|---|---|
| `id` | `INTEGER PRIMARY KEY AUTOINCREMENT` | Yes | Yes | System generated |
| `name` | `TEXT` | Yes | No | Candidate full name |
| `email` | `TEXT` | Yes | Yes (per cycle) | Verified college email (`@bmsce.ac.in`) |
| `phone` | `TEXT` | Yes | No | 10-digit mobile number |
| `usn` | `TEXT` | Yes | Yes (per cycle) | University Seat Number |
| `branch` | `TEXT` | Yes | No | Engineering department |
| `semester` | `INTEGER` | Yes | No | Current semester (1–8) |
| `divisionPreference` | `TEXT` | Yes | No | Target division (`Yaksha`, `Blue Impulse`, `Flying Phantoms`, `Vectors`) |
| `priorExperience` | `TEXT` | Yes | No | CAD, RC, drones, avionics experience |
| `statementOfPurpose` | `TEXT` | Yes | No | Technical motivation (max 1500 chars) |
| `trackingToken` | `TEXT` | Yes | Yes | Cryptographic token for applicant status checks |
| `status` | `TEXT` | Yes | No | `submitted`, `under_review`, `shortlisted`, `rejected` |
| `internalNotes` | `TEXT` | No | No | Admin evaluation comments |
| `createdAt` | `INTEGER` | Yes | No | Unix timestamp |
| `updatedAt` | `INTEGER` | Yes | No | Unix timestamp |

### Happy-Path Flow
1. Applicant navigates to `/recruitment` from the homepage CTA.
2. Applicant fills out personal details, USN, division preference, technical experience, and statement of purpose.
3. Applicant submits the form; server validates inputs with Zod and persists the record with `status: 'submitted'`.
4. Applicant receives an on-screen confirmation card with a private tracking token link (`/recruitment/status?token=...`).
5. Club Admin logs into `/admin`, opens the **Recruitment** tab, reviews the candidate's submission, adds internal interview scores, and advances status to `shortlisted`.
6. Applicant revisits their tracking link and sees the updated interview schedule details.

### Failure States
1. **Invalid Email Domain**: *"Only active BMSCE institutional emails (@bmsce.ac.in) are eligible for club recruitment."*
2. **Duplicate Application**: *"An application with this USN has already been submitted for the current recruitment cycle."*
3. **Application Window Closed**: *"Recruitment for the 2026 season has concluded. Inquiries can be directed to aerobmsce@bmsce.ac.in."*
4. **Invalid Tracking Token**: *"No application was found matching this tracking token. Please verify your link."*
5. **Missing Statement of Purpose**: *"Please provide a technical statement of purpose between 50 and 1500 characters."*

### Edge Cases
1. **Student Changes Branch/Semester**: System allows applicant to update contact details before status transitions to `under_review`; field is locked thereafter.
2. **Simultaneous Status Modification by Two Admins**: Optimistic concurrency locking ensures the latest review state is persisted without overwriting internal notes.
3. **Tracking Token Loss**: A self-service "Resend tracking token" endpoint sends the token strictly to the registered `@bmsce.ac.in` address.
4. **Special Characters in USN/Name**: Strict sanitation strips non-alphanumeric control characters while preserving standard academic naming conventions.
5. **Database Connection Interruption During Submission**: The application form preserves local state in memory and displays a non-destructive retry prompt without clearing form inputs.

### Abuse Case
- **Rapid Automated Form Flooding**: A bot script attempts to flood the intake pipeline with fake candidate submissions.
  - *Mitigation*: Rate-limiting via `express-rate-limit` (max 5 submissions per IP per hour) combined with strict institutional email domain validation, honeypot inputs, and unique constraints on `email` and `usn`.

### Acceptance Tests
1. **Valid Submission**: Submitting a valid BMSCE student application returns HTTP 201 with a unique tracking token and sets status to `submitted`.
2. **Duplicate Denial**: Submitting a second application with an identical USN in the same recruitment cycle returns HTTP 409 Conflict with the exact error message.
3. **Admin Status Progression**: An authenticated admin can transition status to `shortlisted` and attach internal notes.
4. **Access Denied (Backend)**: An anonymous user attempting `GET /api/admin/recruitment` receives HTTP 401 Unauthorized; an unapproved user receives HTTP 403 Forbidden.

### Out of Scope
- Automated AI resume parsing or video interview uploads.
- Automated SMS dispatch (email notifications and web portal tracking only).

---

## Feature 2: Member Portal with Admin Approval Workflow

- **Rank & Size**: Rank 2 · Size: Big (The single designated big feature)
- **Goal / Rubric Line**: Fulfills the internal governance rubric by establishing a secure, authenticated "Members Hangar" workspace for active pilots, builders, and avionics developers, enforcing multi-tier authorization.
- **User Story**: As an enrolled club member, I want to create an account and access the restricted Members Hangar after admin verification so that I can access proprietary flight logs, workshop manuals, and team inventory.

### Roles & Permissions Table
| Action | Anonymous | Pending User | Approved Member | Club Admin |
|---|---|---|---|---|
| Register new account | Allow | Deny | Deny | Deny |
| Log in to portal | Allow | Allow (sees Pending view) | Allow | Allow |
| Access Members Hangar dashboard (`/hangar`) | Deny (401) | Deny (403 Pending) | Allow | Allow |
| Download flight telemetry & CAD archives | Deny (401) | Deny (403 Pending) | Allow | Allow |
| View member directory | Deny (401) | Deny (403 Pending) | Allow | Allow |
| View pending member approvals | Deny (401) | Deny (403) | Deny (403) | Allow |
| Approve / reject member registration | Deny (401) | Deny (403) | Deny (403) | Allow |
| Revoke member access / change role | Deny (401) | Deny (403) | Deny (403) | Allow |

### Data Model (`user` & `member_profiles`)
| Field | Type | Required | Unique | Owner / Notes |
|---|---|---|---|---|
| `id` | `TEXT PRIMARY KEY` | Yes | Yes | Better-Auth user identifier |
| `name` | `TEXT` | Yes | No | Member full name |
| `email` | `TEXT` | Yes | Yes | Institutional email |
| `passwordHash` | `TEXT` | Yes | No | Managed securely by Better-Auth |
| `role` | `TEXT` | Yes | No | `pending`, `member`, `lead`, `admin` |
| `approvalStatus` | `TEXT` | Yes | No | `pending_review`, `approved`, `rejected`, `suspended` |
| `division` | `TEXT` | No | No | Assigned division (`Yaksha`, `Blue Impulse`, etc.) |
| `flightBadgeId` | `TEXT` | No | Yes | Club membership badge code (e.g. `AERO-2026-042`) |
| `approvedBy` | `TEXT` | No | No | Admin user ID who granted access |
| `approvedAt` | `INTEGER` | No | No | Timestamp of approval |
| `createdAt` | `INTEGER` | Yes | No | Account creation timestamp |

### Happy-Path Flow
1. Member navigates to `/register` and signs up with name, email, password, and student ID.
2. Better-Auth creates the record with `role: 'pending'` and `approvalStatus: 'pending_review'`.
3. Member logs in; portal displays an informational status banner: *"Account awaiting admin approval"*.
4. Admin logs into `/admin/members`, reviews the pending queue, verifies student ID in college records, and clicks **Approve Member**.
5. Server updates `role: 'member'`, sets `approvalStatus: 'approved'`, assigns a badge ID, and logs the approving admin ID.
6. Member refreshes or logs in; the system redirects them directly into the full **Members Hangar** (`/hangar`).

### Failure States
1. **Unapproved Access Attempt**: *"Your account is currently under administrative review. Access will be granted once your club membership is verified."*
2. **Account Rejected**: *"Your membership request was not approved. If you believe this is an error, please contact your division lead."*
3. **Session Expired**: *"Your session has expired. Please sign in again to access the Members Hangar."*
4. **Weak Password Violation**: *"Password must be at least 12 characters and include a mixture of letters, numbers, and symbols."*
5. **Self-Approval Attempt**: *"Administrators cannot modify their own approval status or role hierarchy."*

### Edge Cases
1. **Admin Demotes or Suspends an Active Member**: Member's active JWT/session cookie is invalidated immediately on subsequent server requests via Better-Auth hook.
2. **Approved Member Promoted to Division Lead**: Role changes dynamically grant sub-team document edit rights without requiring account re-creation.
3. **Concurrent Approvals by Two Admins**: Drizzle atomic update ensures idempotent approval status without duplicate badge allocation.
4. **Member Email Change**: Email alteration triggers mandatory re-verification and resets status to `pending_review`.
5. **Deleted Admin Account**: Foreign key constraints set `approvedBy` to `SET NULL` while preserving member approval integrity.

### Abuse Case
- **Privilege Escalation via Parameter Tampering**: A registered applicant sends a patched payload containing `role: 'admin'` or `approvalStatus: 'approved'` during registration.
  - *Mitigation*: Server-side validation schemas strictly strip `role` and `approvalStatus` fields from all user-accessible mutation endpoints; only endpoints guarded by `adminMiddleware` can modify authorization claims.

### Acceptance Tests
1. **Pending Lockout**: A user with `approvalStatus: 'pending_review'` attempting to access `/api/hangar/docs` must be strictly **DENIED** with HTTP 403 Forbidden.
2. **Admin Queue Retrieval**: An authenticated admin successfully lists all pending member applications.
3. **Successful State Transition**: Approving a pending user updates their status to `approved` and allows subsequent access to `/hangar`.
4. **Tamper Rejection (Backend)**: Attempting to pass `role: 'admin'` in `POST /api/auth/sign-up/email` yields a user with `role: 'pending'`.

### Out of Scope
- OAuth social logins (Google/GitHub); authentication uses verified credentials.
- Real-time video conferencing inside the portal.

---

## Feature 3: Flight Events & Technical Workshops with Capacity RSVP

- **Rank & Size**: Rank 3 · Size: Medium
- **Goal / Rubric Line**: Delivers community engagement by organizing SAE bootcamps, aeromodelling workshops, and flight trials with dynamic capacity management.
- **User Story**: As a student interested in aerospace, I want to view upcoming workshops and reserve a seat with real-time seat counts so that I can attend hands-on building sessions in Propel Lab–3.

### Roles & Permissions Table
| Action | Anonymous | Pending Member | Approved Member | Club Admin |
|---|---|---|---|---|
| View public upcoming events & capacity | Allow | Allow | Allow | Allow |
| RSVP to public workshop | Allow | Allow | Allow | Allow |
| Access members-only flight trials | Deny (401) | Deny (403) | Allow | Allow |
| Cancel own RSVP | Allow (token) | Allow | Allow | Allow |
| Create new workshop or flight notice | Deny | Deny | Deny | Allow |
| Edit event details or adjust capacity | Deny | Deny | Deny | Allow |
| Export attendee roster (CSV) | Deny | Deny | Deny | Allow |

### Data Model (`events` & `event_rsvps`)
#### Table: `events`
| Field | Type | Required | Unique | Owner / Notes |
|---|---|---|---|---|
| `id` | `INTEGER PRIMARY KEY AUTOINCREMENT` | Yes | Yes | System generated |
| `title` | `TEXT` | Yes | No | Event headline |
| `slug` | `TEXT` | Yes | Yes | URL slug (e.g. `cad-bootcamp-2026`) |
| `description` | `TEXT` | Yes | No | Overview and prerequisites |
| `location` | `TEXT` | Yes | No | e.g. `Propel Lab–3 / BMSCE Ground` |
| `startTime` | `INTEGER` | Yes | No | Event start timestamp |
| `endTime` | `INTEGER` | Yes | No | Event conclusion timestamp |
| `capacity` | `INTEGER` | Yes | No | Maximum seats available (e.g. 40) |
| `isMembersOnly` | `INTEGER` | Yes | No | `0` = public, `1` = members only |
| `status` | `TEXT` | Yes | No | `draft`, `published`, `completed`, `cancelled` |
| `createdBy` | `TEXT` | Yes | No | Admin user ID |

#### Table: `event_rsvps`
| Field | Type | Required | Unique | Owner / Notes |
|---|---|---|---|---|
| `id` | `INTEGER PRIMARY KEY AUTOINCREMENT` | Yes | Yes | System generated |
| `eventId` | `INTEGER` | Yes | No | Foreign key -> `events.id` |
| `userId` | `TEXT` | No | No | Optional FK -> `user.id` (if logged in) |
| `attendeeName` | `TEXT` | Yes | No | Name of attendee |
| `attendeeEmail` | `TEXT` | Yes | No | Contact email |
| `cancellationToken` | `TEXT` | Yes | Yes | Token to cancel reservation |
| `status` | `TEXT` | Yes | No | `confirmed`, `waitlist`, `cancelled` |
| `createdAt` | `INTEGER` | Yes | No | Timestamp of reservation |

### Happy-Path Flow
1. User browses `/events` and sees the card for *"Autonomous Drone PID Tuning Workshop"*, with *"12 of 40 seats remaining"*.
2. User clicks **Reserve Seat**, fills in their name and email, and submits.
3. Server executes an atomic database transaction: verifies remaining capacity > 0, inserts the reservation, and increments booked count.
4. User receives an immediate on-screen confirmation card with reservation badge and a cancellation link.
5. Event card dynamically updates to *"11 of 40 seats remaining"*.

### Failure States
1. **Event Fully Booked**: *"This workshop has reached maximum capacity. You have been placed on the priority waitlist."*
2. **Duplicate RSVP**: *"An active reservation under this email already exists for this event."*
3. **Registration Window Closed**: *"Reservations for this event closed 2 hours prior to flight departure."*
4. **Invalid Cancellation Token**: *"Unable to locate an active reservation with this cancellation link."*
5. **Members-Only Restriction**: *"This event is restricted to verified AeroBMSCE flight division members. Please sign in to reserve."*

### Edge Cases
1. **Simultaneous Last-Seat RSVP**: An atomic SQLite transaction (`BEGIN IMMEDIATE`) prevents overbooking; the second user is placed on the waitlist with a clean explanatory banner.
2. **Attendee Cancels Seat**: The waitlist automatically promotes the next eligible attendee and flags their reservation as confirmed.
3. **Admin Reduces Capacity Below Current Bookings**: Existing confirmed reservations are preserved; new bookings are immediately frozen.
4. **Event Postponed or Relocated**: Status transitions to `rescheduled`, and an alert banner displays prominently on the public card.
5. **Offline/Past Event Access**: Completed events are archived under an "Earlier Sessions" accordion, disabling RSVP buttons while preserving session notes.

### Abuse Case
- **Seat Hoarding / Denial-of-Inventory**: A malicious script attempts to reserve all 40 seats using dummy emails to lock out legitimate students.
  - *Mitigation*: Rate-limiting (max 2 RSVPs per IP per 10 minutes), mandatory email verification, and a limit of 1 active reservation per email address per event.

### Acceptance Tests
1. **Capacity Enforcement**: Submitting an RSVP when available seats equals 0 returns status `waitlist` without incrementing capacity beyond the maximum limit.
2. **Members-Only Restriction**: An anonymous request to reserve a seat in a members-only event must be **DENIED** with HTTP 401 Unauthorized.
3. **Cancellation Freeing Capacity**: Cancelling a confirmed reservation increments available seats by 1.
4. **Admin Event Creation**: An authenticated admin successfully creates and publishes a new event via `POST /api/admin/events`.

### Out of Scope
- Paid ticketing / payment gateway integration (all club workshops are free or sponsored).
- QR-code hardware turnstile scanners.

---

## Host and Backend Architecture

- **Hosting Environment**:
  - **Public Frontend**: Next.js App Router deployed statically or via server runtime with route optimization.
  - **Backend API**: Express 5 REST API running on internal port 4000, proxied via Next.js rewrites (`/api/:path*`).
- **Authentication**:
  - Better-Auth with SQLite Drizzle Adapter, enforcing secure HTTP-only session cookies and role-based access control.
- **Database Engine**:
  - SQLite (`better-sqlite3` + Drizzle ORM) stored at `./data/aerobmsce.sqlite`.

---

## Required Environment Secrets (Names Only)

The 3 specified features require the following environment variables (defined in `.env`, strictly excluded from git):

1. `BETTER_AUTH_SECRET` — Session encryption and token signing key.
2. `BETTER_AUTH_URL` — Authentication server base URL.
3. `FRONTEND_URL` — Client URL for CORS origin validation.
4. `DATABASE_PATH` — Filesystem location of the SQLite database.
5. `ADMIN_EMAIL` — Initial root administrator email for portal bootstrap.
6. `ADMIN_PASSWORD` — Initial administrator credentials for seeding.
7. `RECRUITMENT_CYCLE_SALT` — Cryptographic salt for applicant tracking token generation.
