# AeroBMSCE Recruitment Task Website

**Live URL**: [https://zameernagaral.github.io/AeroBMSCE_TASK_REPO/](https://zameernagaral.github.io/AeroBMSCE_TASK_REPO/)

---

## Question 1: Touch upon the flaws of the original website. What were the most noticeable things that you came across?

During our initial technical and UX audit of the legacy AeroBMSCE repository, several critical architectural and visual flaws were identified:

1. **Fragmented Multi-Page Architecture & Navigation Decay**:
   - The original website was split across disconnected static HTML files (`index.html`, `journey.html`, `partners.html`) with duplicate header and navigation markup.
   - Moving between sections triggered jarring full-page refreshes rather than a modern, fluid user experience, and several internal anchor links led to dead ends or mismatched IDs.

2. **Broken Mobile Layout & Responsiveness (<390px Viewports)**:
   - Layout elements used fixed, hardcoded pixel dimensions (e.g., static `1200px` containers and non-responsive table layouts) with missing or incomplete viewport constraints.
   - On standard mobile viewports (360px–390px), horizontal overflow caused the entire screen to scroll sideways uncontrollably.
   - Interactive buttons and links failed minimum touch target standards (<44×44px), making mobile tap navigation error-prone.

3. **Accessibility (a11y) & Contrast Failures**:
   - Severe WCAG color contrast violations: multiple text elements (such as light gray metadata on white backgrounds and dark gold wordmarks on paper) scored as low as 1.5:1, far below the required 4.5:1 (AA) and 7:1 (AAA) thresholds.
   - Imagery completely lacked descriptive `alt` attributes or relied on empty placeholders, rendering the site unusable for screen reader users.
   - Interactive buttons and links had no visible `:focus-visible` keyboard focus indicators, breaking keyboard-only navigation.

4. **Severe Cumulative Layout Shift (CLS) & Asset Bloat**:
   - Full-resolution team photographs and drone imagery (some exceeding 1 MB uncompressed) lacked explicit `width`, `height`, or reserved aspect-ratio bounding boxes in HTML/CSS.
   - As assets loaded asynchronously across mobile connections, the page continuously jumped and reflowed, resulting in a poor Cumulative Layout Shift score (CLS > 0.4).

5. **Absence of a Unified Design System**:
   - The original code mixed arbitrary inline styles with disorganized CSS files. There were no reusable design tokens for color, typography, radius, or spacing.
   - Typography was inconsistent, alternating between generic browser fallback serifs and disparate sans-serifs, which gave the club an amateur template appearance rather than reflecting BMSCE's premier aerospace engineering pedigree.

---

## Question 2: Brief explanation of your design route and any decisions you took on designing the UI/UX.

Our objective was to design a clean, authoritative, and high-performance digital presence that commands respect from competition judges, research mentors, and corporate sponsors:

1. **Design Philosophy: Precision Minimalist & Aviation Identity**:
   - Deliberately rejected generic AI web clichés: no purple gradient hero backgrounds, no soft blurry bento grids, and no stock corporate illustrations.
   - Adopted a clean, utilitarian aesthetic inspired by flight telemetry, aircraft instrumentation, and technical engineering documentation.

2. **Duotone Color System Sampled from Brand Identity**:
   - **Aviation Gold (`#FCBC34`)**: Sampled directly from the official AeroBMSCE logo wordmark. Used purposefully in full-bleed fields (Hero and final Call-to-Action block) to create high-impact visual anchors without visual clutter.
   - **Aerospace Ink (`#101014`)**: Sampled from the logo mark; serves as high-contrast text on gold (11.19:1 ratio) and paper (17.04:1 ratio), providing crisp readability.
   - **Cool Paper Ground (`#F2F3F0`)**: A cool neutral background that provides spacious breathing room ("air") and avoids muddy cream defaults.
   - **Graphite (`#55565C`) & Rule (`#CBCDC8`)**: Used strictly for secondary metadata, captions, and structural hairlines.

3. **Typography Hierarchy**:
   - **Display Headings**: High-impact grotesque sans-serif (`Inter` bold/heavy) to convey technical confidence and aerospace pedigree.
   - **Body Copy**: Neutral, highly legible type designed for effortless scanning on both mobile and desktop.
   - **Data Rails (`IBM Plex Mono`)**: Monospaced typography for telemetry metadata, competition dates, tail designations, and prize standings.

4. **Single Memorable Signature Element: Real-Photo Wall**:
   - To build authentic trust, we implemented a curated **Photo Wall** ([app/_wall/PhotoWall.tsx](file:///Users/zameerabdulkalamnagaral/AeroBMSCE_TASK_REPO/app/_wall/PhotoWall.tsx)) displaying genuine team and competition photos from SAE Aerothon and SAE Aero Design West (Texas).
   - Each tile reserves its exact bounding aspect ratio before the image arrives to eliminate layout shifts (CLS = 0).
   - Images reveal with subtle staggered wipe transitions powered by native `IntersectionObserver` with zero external library overhead.

5. **Restrained Micro-Interactions (Zero-Dependency Animated Background)**:
   - Implemented an interactive sliding background indicator ([AnimatedBackground](file:///Users/zameerabdulkalamnagaral/AeroBMSCE_TASK_REPO/components/core/animated-background.tsx)) for navigation links and admin console tabs.
   - Uses hardware-accelerated CSS transforms (`translate3d`) with spring-feel cubic-bezier easing (`cubic-bezier(0.34, 1.35, 0.64, 1)`), avoiding the 35+ kB bundle bloat of heavy animation libraries.
   - Strictly respects `@media (prefers-reduced-motion: reduce)`, instantly falling back to zero transitions for users who request reduced motion.

6. **Consolidated 5-Section Information Architecture**:
   - Streamlined the experience into a single fluid page with persistent navigation:
     1. **Home**: High-conversion hero with direct *"Partner with us"* CTA and competition proof points.
     2. **Who We Are**: The signature Photo Wall capturing members building and competing at SAE events.
     3. **What We Build**: The four flight divisions (Team Yaksha, Team Blue Impulse, Team Flying Phantoms, Team Vectors).
     4. **Our Achievements**: Verified historical standings since 2018 with expandable seasons.
     5. **Partner with Us**: Transparent partnership tier matrices (Platinum, Gold, Silver, Technical), verified collaborator logos (DRDO, CSIR-NAL, Ansys, SolidWorks), and direct contact details.

---

## Question 3: Describe one problem/edge case you faced while building your website. Explain the problem, how you ran into it, and the steps you took to work around it.

### 1. The Problem
Deploying a modern Next.js App Router application as a fully static export (`output: 'export'`) to a subpath repository on GitHub Pages (`https://zameernagaral.github.io/AeroBMSCE_TASK_REPO/`) created multiple critical breaking points:
- **Image Asset 404s**: While Next.js can set `basePath` for JavaScript chunks and CSS files, string-based `<Image src="/images/logo.png" />` references in static exports do not automatically prepend the repository subpath when image optimization is disabled on serverless/static hosts. In production, browsers requested `/images/logo.png` from the root domain (`https://zameernagaral.github.io/images/logo.png`), resulting in HTTP 404 errors across all 27 club photos and sponsor marks.
- **Jekyll Folder Ignoral**: GitHub Pages runs a Jekyll processor by default, which silently ignores directories prefixed with an underscore (such as Next.js's required `_next/` static chunk folder), breaking stylesheets, scripts, and fonts.
- **Static Metadata Build Errors**: Dynamic metadata generation in `robots.ts` and `sitemap.ts` halted `next build` because static export requires route generation to be explicitly frozen.

### 2. How We Ran Into It
During local testing and initial GitHub Actions CI workflow runs, the static build output placed all bundled assets under `out/_next/` and rendered image tags pointing to root-relative paths (`/images/...`). When auditing the deployed output in a subpath environment matching GitHub Pages:
- All 27 images and partner marks failed to render.
- The build pipeline failed on route collection for `/robots.txt` and `/sitemap.xml` with:
  ```
  Error: export const dynamic = "force-static" not configured on route "/robots.txt" with "output: export"
  ```
- Deploying directly without Jekyll overrides prevented the browser from loading the `_next/` bundle files.

### 3. The Steps Taken to Work Around It
1. **Implemented a Custom Image Loader ([image-loader.ts](file:///Users/zameerabdulkalamnagaral/AeroBMSCE_TASK_REPO/image-loader.ts))**:
   - Created a dedicated loader script that detects whether the application is running under GitHub Actions / production static export:
     ```ts
     const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.GITHUB_ACTIONS === 'true' ? '/AeroBMSCE_TASK_REPO' : '');
     export default function imageLoader({ src }: { src: string }) {
       if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) return src;
       const cleanSrc = src.startsWith('/') ? src : `/${src}`;
       return `${basePath}${cleanSrc}`;
     }
     ```
   - Configured `images.loader: 'custom'` and `images.loaderFile: './image-loader.ts'` in [next.config.js](file:///Users/zameerabdulkalamnagaral/AeroBMSCE_TASK_REPO/next.config.js). This cleanly ensured all `<Image />` components prepend `/AeroBMSCE_TASK_REPO` without altering codebase component files.
2. **Added Jekyll Bypass Rules (`.nojekyll`)**:
   - Created `.nojekyll` files at both the repository root and inside `public/.nojekyll`. Next.js automatically copies `public/.nojekyll` to `out/.nojekyll`, instructing GitHub Pages to serve all `_next/` static JavaScript, CSS, and font chunks without filtering.
3. **Locked Metadata Routes to Static Generation**:
   - Added `export const dynamic = 'force-static';` to both [app/robots.ts](file:///Users/zameerabdulkalamnagaral/AeroBMSCE_TASK_REPO/app/robots.ts) and [app/sitemap.ts](file:///Users/zameerabdulkalamnagaral/AeroBMSCE_TASK_REPO/app/sitemap.ts), allowing `next build` to prerender all 11 routes into static HTML/XML cleanly in under 500ms.
4. **End-to-End Local Emulation & Automated Verification**:
   - Tested the complete static build locally using a subpath-emulated server (`http://localhost:5050/AeroBMSCE_TASK_REPO/`).
   - Audited every network request across 360px, 768px, and 1280px viewports via Playwright. Confirmed that all 32 static requests returned HTTP 200 with zero 404s and zero console errors.

---

## Technical & Submission Verification

- **Live URL**: [https://zameernagaral.github.io/AeroBMSCE_TASK_REPO/](https://zameernagaral.github.io/AeroBMSCE_TASK_REPO/)
- **Repository**: [https://github.com/zameernagaral/AeroBMSCE_TASK_REPO](https://github.com/zameernagaral/AeroBMSCE_TASK_REPO)
- **CI/CD Pipeline**: [.github/workflows/deploy.yml](file:///Users/zameerabdulkalamnagaral/AeroBMSCE_TASK_REPO/.github/workflows/deploy.yml)
- **Design Tokens**: [styles/tokens.css](file:///Users/zameerabdulkalamnagaral/AeroBMSCE_TASK_REPO/styles/tokens.css) & [docs/TOKENS.md](file:///Users/zameerabdulkalamnagaral/AeroBMSCE_TASK_REPO/docs/TOKENS.md)
- **App Specification**: [docs/APP.md](file:///Users/zameerabdulkalamnagaral/AeroBMSCE_TASK_REPO/docs/APP.md) & [docs/BRIEF.md](file:///Users/zameerabdulkalamnagaral/AeroBMSCE_TASK_REPO/docs/BRIEF.md)
