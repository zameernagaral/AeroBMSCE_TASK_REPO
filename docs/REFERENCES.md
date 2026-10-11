# Design References Analysis

Analysis of visual references captured in `docs/refs/` alongside component patterns from Motion-Primitives (`AccordionBasic` and `AnimatedTabs`).

---

### Reference 1: basement.studio — Ranboo Merch Showcase (Split Layout & Meta Panel)
- **File**: `docs/refs/Screenshot 2026-10-11 at 12.28.26 AM.png`
- **Type feel**: High-contrast editorial pairing — oversized display serif paired with high-density monospace / uppercase technical metadata.
- **Spacing density**: Dense left-column metadata index contrasted against edge-to-edge media blocks on the right.
- **Colour logic**: Pitch black background (`#000000`), stark white rule dividers, bold crimson accent (`#E5192D`), and vibrant green highlights.
- **Motion character**: Snap-to-grid layout transitions with sharp hover feedback and a toggle switch between perspectives.
- **ONE thing to steal**: The structural left metadata panel (Client, Year, Type, Awards) — adapt this format for aircraft spec sheets and competition credentials.
- **ONE thing to ignore**: The chaotic neon sticker / high-street street-wear aesthetic, which clashes with aerospace engineering.

---

### Reference 2: basement.studio — Hardware & Editorial Display
- **File**: `docs/refs/Screenshot 2026-10-11 at 12.28.33 AM.png`
- **Type feel**: Gigantic bespoke titling contrasted with razor-sharp micro uppercase labels (`SHOP`, `ABOUT`, `BAG (1)`).
- **Spacing density**: Monolithic hero photography with extreme negative space beneath headline type.
- **Colour logic**: Solid cadmium red backdrop holding high-contrast dark product containers.
- **Motion character**: Smooth inertia-based scroll reveals showcasing physical devices and hardware mockups.
- **ONE thing to steal**: High-fidelity hardware photography presented at full scale with clean geometric letterboxing.
- **ONE thing to ignore**: Deep red saturation covering large viewport areas, which can fatigue the user and dilute technical legibility.

---

### Reference 3: basement.studio — Product Catalog & Detail Grid
- **File**: `docs/refs/Screenshot 2026-10-11 at 12.28.40 AM.png`
- **Type feel**: Restrained, legible sans-serif for itemized pricing and metadata tags.
- **Spacing density**: Razor-thin 1px grid borders framing modular cards in a structured matrix.
- **Colour logic**: Matte dark gray (`#121212`) containers separated by subtle low-contrast boundary lines.
- **Motion character**: Slide-over drawer panels with precise spring physics.
- **ONE thing to steal**: Hairline 1px border grid system that separates distinct specs without heavy card shadows or rounded blur.
- **ONE thing to ignore**: Multi-step e-commerce checkout widgets and cart badge elements.

---

### Reference 4: basement.studio — Sticker Bomb / Brutalist Contrast
- **File**: `docs/refs/Screenshot 2026-10-11 at 12.28.46 AM.png`
- **Type feel**: Playful, irregular street typography mixed with standard catalog labels.
- **Spacing density**: Cluttered, intentionally overlapping collage layout.
- **Colour logic**: High-noise neon collage against deep black boundaries.
- **Motion character**: Quick, elastic hover states.
- **ONE thing to steal**: High-contrast badge tags (`BUY NOW`, `SPECIFICATION`, `PODIUM`) used as deliberate punctuation markers.
- **ONE thing to ignore**: The intentional collage disorder; an aerospace team requires calibration, rigor, and structural order.

---

### Reference 5: refero.design — Raycast AI Flow (Centered Modal & Utility Bar)
- **File**: `docs/refs/Screenshot 2026-10-11 at 12.30.57 AM.png`
- **Type feel**: Clean modern system sans-serif (Inter/SF Pro style) with crisp numeric readouts.
- **Spacing density**: Generous breathing room, focused on a single centered interaction pill.
- **Colour logic**: Near-black void background (`#0A0A0C`) with a glowing crimson/ember gradient indicator bar.
- **Motion character**: Instantaneous keyboard-driven navigation with snappy pill expansions.
- **ONE thing to steal**: The disciplined floating bottom pill navigation (`Download Flow` / carousel step dots) for secondary controls.
- **ONE thing to ignore**: The empty centered search box layout, which feels like a SaaS utility rather than an engineering showcase.

---

### Reference 6: refero.design — Raycast Model Selector & Benchmarks Flyout
- **File**: `docs/refs/Screenshot 2026-10-11 at 12.31.03 AM.png`
- **Type feel**: Ultra-compact 11px-13px data typography with tabular figures and aligned key-value metrics.
- **Spacing density**: Dense information hierarchy: Speed, Intelligence, Context Window, and Capabilities packed into an inspector panel.
- **Colour logic**: Matte slate container (`#18181B`) with discrete red step meters indicating benchmark capacity.
- **Motion character**: Sharp dropdown expansion with zero layout delay.
- **ONE thing to steal**: The telemetry / spec readout card design (segmented progress bars for Speed/Range/Payload capacity).
- **ONE thing to ignore**: Multi-tier AI model provider icons and SaaS license dropdown options.

---

### Reference 7: refero.design — Raycast Parameter Inspector & Detailed State
- **File**: `docs/refs/Screenshot 2026-10-11 at 12.31.08 AM.png`
- **Type feel**: Crisp, legible monospace and geometric labels for technical parameters.
- **Spacing density**: High density, single-purpose popup with nested sub-menus.
- **Colour logic**: Deep charcoal backdrop with subtle border delineation and status dots.
- **Motion character**: Smooth spring flyouts anchored precisely to trigger elements.
- **ONE thing to steal**: Compact key-value telemetry data tables with status checkmarks for verified specs.
- **ONE thing to ignore**: Small multi-layered contextual popup menus that obscure underlying page content.

---

### Reference 8: Motion-Primitives — Accordion & Animated Pill Tabs
- **File**: Provided React snippet (`AccordionBasic` and `AnimatedTabs`)
- **Type feel**: Minimal zinc hierarchy (`text-zinc-950 dark:text-zinc-50` headers with `text-zinc-500` descriptions).
- **Spacing density**: Controlled vertical divide lines (`divide-y divide-zinc-800`) and compact pill navigation container.
- **Colour logic**: Strict monochromatic zinc scale with single active state highlights.
- **Motion character**: Smooth spring-based layout sliding behind active tabs (`type: 'spring', bounce: 0.2, duration: 0.3`).
- **ONE thing to steal**: The sliding active background indicator (`AnimatedBackground`) for switching between aircraft divisions and timeline seasons.
- **ONE thing to ignore**: Generic standard accordion collapsible lists for primary technical accomplishments.

---

## The Common Thread
Across the most effective references (basement's hardware framing and Raycast's technical instrumentation), design power comes from **extreme contrast and functional density**: deep matte void backgrounds (`#09090B` to `#000000`), crisp hairline 1px borders, and data laid out like an instrument panel (specs, tail codes, dates, telemetry metrics) rather than decorative marketing copy. Both references reject generic rounded cards and purple gradients in favor of authoritative, confident engineering clarity.

## What My Site Must Do Differently From All of These
While basement leans into chaotic streetwear merchandise hype and Raycast is built for a compact desktop keyboard utility, **AeroBMSCE is an aerospace flight and aeromodelling team building physical, flyable machines**. 

1. **Aviation Authenticity**: Instead of e-commerce clothing racks or AI prompt inputs, the visual layout must feel like a live **aircraft flight operations log and hangar telemetry station**.
2. **Real Hardware First**: Full-bleed physical aircraft photography (carbon fiber frames, fixed-wing spans, balsa ribs, UAV avionics) will replace abstract vectors and 3D mockups.
3. **Flight Log Architecture**: Competitions and achievements will not be hidden inside generic accordions; they will be documented as chronological flight records with tail codes, class rankings, and technical payload stats.
4. **Signal Orange / Aviation Yellow Accent**: Rather than startup purple or neon streetwear green, we will use a single, purposeful aviation signal accent (inspired by flight test indicators) to guide prospective partners and sponsors directly to the primary action.
