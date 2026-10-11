# Workspace Rules

## Core Constraints
- **Design Tokens**: Design values (colors, typography, spacing, shadows, radii) must be derived ONLY from `docs/TOKENS.md`. No ad-hoc hex codes or arbitrary spacing values.
- **Copy & Content**: Copy must come strictly from `docs/COPY.md`. No filler, placeholder, or generic lorem ipsum text.
- **Banned Looks (AI Defaults)**:
  1. Warm cream background (`#F4F1EA`) with high-contrast serif display and terracotta accent.
  2. Near-black background with a single bright acid-green or vermilion accent.
  3. Broadsheet newspaper style with hairline borders, zero border-radius, and dense columns.
- **Signature Element**: Exactly one memorable signature element that embodies the brief. Keep surrounding elements disciplined and quiet.
- **Quality Floor**: Built-in responsive design down to 390px mobile, explicit visible keyboard focus states, accessibility contrast conformance, and strict `prefers-reduced-motion` compliance.
- **Backend & Auth**: Apps and shops must enforce server-side authentication, authorization, and paywall validation. Never trust client-side state.
