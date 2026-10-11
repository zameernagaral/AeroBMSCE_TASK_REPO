# AeroBMSCE Recruitment Task Website

**Live URL**: [https://zameernagaral.github.io/AeroBMSCE_TASK_REPO/](https://zameernagaral.github.io/AeroBMSCE_TASK_REPO/)

---

## 1. Flaws of the Original Site
1. **Broken Mobile Layout & Responsiveness**: The original site relied on separate legacy static pages (`index.html`, `journey.html`, `partners.html`) with hardcoded pixel widths, missing fluid layout constraints, and broken tap targets on small viewports (<390px).
2. **Poor Contrast & Accessibility Floor**: Key navigation items and text pairings failed WCAG AA/AAA color contrast standards; interactive buttons lacked visible keyboard focus indicators and semantic ARIA attributes.
3. **Absence of a Design System**: Styling was fragmented across ad-hoc inline styles and disparate stylesheets without design tokens, causing severe layout shifts (CLS) when unoptimized images loaded.

---

## 2. Design Route & Aesthetic
- **Design System**: *Precision Minimal* — duotone block theme featuring saturated **Gold** (`#FCBC34`) and **Ink** (`#101014`) on cool **Paper** (`#F2F3F0`), sampled directly from the official AeroBMSCE wordmark.
- **Typography**: Heavy grotesque display headers paired with clean neutral body typography and IBM Plex Mono for technical data rails and telemetry.
- **Signature Element**: Real-Photo Wall ([app/_wall/PhotoWall.tsx](file:///Users/zameerabdulkalamnagaral/AeroBMSCE_TASK_REPO/app/_wall/PhotoWall.tsx)) showcasing genuine club competition photography with staggered reveal transitions and reserved aspect ratios.
- **Restraint**: Zero third-party motion bloat; all micro-interactions use performant CSS spring transitions (`cubic-bezier(0.34, 1.35, 0.64, 1)`) with strict `@media (prefers-reduced-motion: reduce)` compliance.

---

## 3. Handled Edge Cases
- **Slow Network & Image Failure Fallback**:
  The real-photo wall calculates and reserves exact bounding aspect-ratios before image assets arrive, eliminating Cumulative Layout Shift (CLS = 0). If an image fails to load over a poor mobile connection, a high-contrast hairline box gracefully persists to display the photo's descriptive alt text and competition metadata without breaking the grid layout.
- **Subpath Static Deployment on GitHub Pages**:
  Configured Next.js static export (`output: 'export'`) with a custom image loader (`image-loader.ts`) and `.nojekyll` handling, ensuring every image, font, and chunk resolves without 404s under the `/AeroBMSCE_TASK_REPO/` base path.

---

## 4. Website Sections
1. **Home**: Hero section highlighting international SAE credentials and primary partnership call to action.
2. **Who We Are**: The signature Photo Wall capturing members at SAE competitions across India and the US.
3. **What We Build**: Four flight divisions (Team Yaksha, Team Blue Impulse, Team Flying Phantoms, Team Vectors).
4. **Our Achievements**: Verified podium finishes and competition standings since 2018 with expandable seasons.
5. **Partner with Us**: Platinum, Gold, Silver, and Technical sponsorship tiers, collaborator marks, and direct contact details.
