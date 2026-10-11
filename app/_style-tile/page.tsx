import styles from './styleTile.module.css';

export default function StyleTilePage() {
  const swatches = [
    {
      name: '--color-gold',
      hex: '#FCBC34',
      bg: 'var(--color-gold)',
      textColor: 'var(--color-ink)',
      role: 'Saturated field. Max two blocks per page (hero and final block). Text on gold is ink only.',
    },
    {
      name: '--color-ink',
      hex: '#101014',
      bg: 'var(--color-ink)',
      textColor: 'var(--color-paper)',
      role: 'All text on gold and paper. Fill for primary buttons. Field in footer & mobile sticky bar.',
    },
    {
      name: '--color-paper',
      hex: '#F2F3F0',
      bg: 'var(--color-paper)',
      textColor: 'var(--color-ink)',
      border: 'var(--rule-1) solid var(--color-rule)',
      role: 'Page ground and photo wall ground. Cool neutral, deliberately not cream.',
    },
    {
      name: '--color-graphite',
      hex: '#55565C',
      bg: 'var(--color-graphite)',
      textColor: 'var(--color-paper)',
      role: 'Secondary text on paper ground (captions, metadata). Hairlines on ink surfaces.',
    },
    {
      name: '--color-ash',
      hex: '#A4A6AB',
      bg: 'var(--color-ash)',
      textColor: 'var(--color-ink)',
      role: 'Secondary text on ink surfaces only.',
    },
    {
      name: '--color-rule',
      hex: '#CBCDC8',
      bg: 'var(--color-rule)',
      textColor: 'var(--color-ink)',
      role: 'Hairlines and dividers on paper ground only. Decorative.',
    },
  ];

  const contrastPairs = [
    { text: 'Ink on Gold', ratio: '11.19:1', status: 'PASS AAA', bg: 'var(--color-gold)', color: 'var(--color-ink)' },
    { text: 'Ink on Paper', ratio: '17.04:1', status: 'PASS AAA', bg: 'var(--color-paper)', color: 'var(--color-ink)' },
    { text: 'Paper on Ink', ratio: '17.04:1', status: 'PASS AAA', bg: 'var(--color-ink)', color: 'var(--color-paper)' },
    { text: 'Graphite on Paper', ratio: '6.56:1', status: 'PASS AA', bg: 'var(--color-paper)', color: 'var(--color-graphite)' },
    { text: 'Ash on Ink', ratio: '7.79:1', status: 'PASS AAA', bg: 'var(--color-ink)', color: 'var(--color-ash)' },
    { text: 'Gold on Ink (Focus/Display)', ratio: '11.19:1', status: 'PASS AAA', bg: 'var(--color-ink)', color: 'var(--color-gold)' },
  ];

  const spaceTokens = [
    { token: '--space-1', px: '4px', value: 'var(--space-1)' },
    { token: '--space-2', px: '8px', value: 'var(--space-2)' },
    { token: '--space-3', px: '12px', value: 'var(--space-3)' },
    { token: '--space-4', px: '16px', value: 'var(--space-4)' },
    { token: '--space-5', px: '20px', value: 'var(--space-5)' },
    { token: '--space-6', px: '24px', value: 'var(--space-6)' },
    { token: '--space-7', px: '32px', value: 'var(--space-7)' },
    { token: '--space-8', px: '48px', value: 'var(--space-8)' },
    { token: '--space-9', px: '64px', value: 'var(--space-9)' },
    { token: '--space-10', px: '96px', value: 'var(--space-10)' },
    { token: '--space-11', px: '128px', value: 'var(--space-11)' },
  ];

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <span className={styles.subtitle}>Design System · Single Source of Truth</span>
        <h1 className={styles.title}>AeroBMSCE Style Tile</h1>
        <p className={styles.typeMeta}>Derived strictly from docs/TOKENS.md. Editing any variable updates all references.</p>
      </header>

      {/* 1. Colour Swatches */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Colour Palette (Duotone Block)</h2>
        <div className={styles.swatchGrid}>
          {swatches.map((s) => (
            <div key={s.name} className={styles.swatchCard}>
              <div
                className={styles.swatchColorBox}
                style={{
                  backgroundColor: s.bg,
                  color: s.textColor,
                  border: s.border || 'none',
                }}
              >
                <span className={styles.swatchToken}>{s.name}</span>
              </div>
              <div className={styles.swatchInfo}>
                <span className={styles.swatchHex}>{s.hex}</span>
                <p className={styles.swatchRole}>{s.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. WCAG Contrast Checks */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. WCAG Contrast Verification</h2>
        <div className={styles.contrastGrid}>
          {contrastPairs.map((cp) => (
            <div
              key={cp.text}
              className={styles.contrastCard}
              style={{ backgroundColor: cp.bg, color: cp.color }}
            >
              <span className={styles.contrastBadge}>{cp.status} ({cp.ratio})</span>
              <p style={{ fontWeight: 500, fontSize: '1rem' }}>{cp.text}</p>
              <span style={{ fontSize: '0.8rem', opacity: 0.85 }}>Contrast validated per WCAG AA/AAA</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Typography Scale per Role */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Typography Scale & Hierarchy</h2>
        <div className={styles.typeStack}>
          {/* Display 1 */}
          <div className={styles.typeRow}>
            <span className={styles.typeMeta}>
              Display-1 (Hero) · Archivo wdth 125 wght 800 · clamp(2.441rem, 1.577rem + 3.546vw, 4.768rem) · lh 0.95 · ls -0.02em
            </span>
            <div className={styles.display1Sample}>
              Your logo on aircraft that competed in Texas.
            </div>
          </div>

          {/* Display 2 */}
          <div className={styles.typeRow}>
            <span className={styles.typeMeta}>
              Display-2 (Section Heading) · Archivo wdth 125 wght 800 · clamp(1.953rem, 1.545rem + 1.674vw, 3.052rem) · lh 1.05 · ls -0.015em
            </span>
            <div className={styles.display2Sample}>
              Four teams. Twelve seasons of competition flight.
            </div>
          </div>

          {/* Display 3 */}
          <div className={styles.typeRow}>
            <span className={styles.typeMeta}>
              Display-3 (Item Heading) · Archivo wdth 125 wght 700 · clamp(1.563rem, 1.418rem + 0.595vw, 1.953rem) · lh 1.15 · ls -0.01em
            </span>
            <div className={styles.display3Sample}>
              Team Yaksha: Heavy-lift regular class UAV
            </div>
          </div>

          {/* Body Lead */}
          <div className={styles.typeRow}>
            <span className={styles.typeMeta}>
              Body Lead · IBM Plex Sans 400 · 1.25rem (20px) · lh 1.5 · measure 36rem
            </span>
            <p className={styles.leadSample}>
              AeroBMSCE designs, builds and flies aircraft out of Propel Lab-3 at BMS College of Engineering, Bengaluru.
            </p>
          </div>

          {/* Body Standard */}
          <div className={styles.typeRow}>
            <span className={styles.typeMeta}>
              Body · IBM Plex Sans 400 (500 emphasis) · 1.0rem (16px) · lh 1.55 · measure 36rem
            </span>
            <p className={styles.bodySample}>
              Every airframe is engineered from first aerodynamic principles, validated in CFD and structural simulation, and flight-tested by student pilots on South Indian airfields.
            </p>
            <p className={styles.bodySampleSecondary}>
              Secondary body text rendered in --color-graphite (#55565C) for supporting prose on paper ground.
            </p>
          </div>

          {/* Data Role */}
          <div className={styles.typeRow}>
            <span className={styles.typeMeta}>
              Data · IBM Plex Mono 400/500 · 0.8rem (12.8px) · lh 1.4 · ls +0.08em uppercase tabular
            </span>
            <p className={styles.dataSample}>
              SAE INDIA AEROTHON 2025 · 2ND PLACE OVERALL · ₹1,25,000 CASH PRIZE · CHENNAI
            </p>
          </div>
        </div>
      </section>

      {/* 4. Spacing Blocks */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Spacing Scale (4px Base)</h2>
        <div className={styles.spaceGrid}>
          {spaceTokens.map((s) => (
            <div key={s.token} className={styles.spaceRow}>
              <span className={styles.spaceLabel}>{s.token} ({s.px})</span>
              <div
                className={styles.spaceBar}
                style={{ width: s.value }}
                title={`${s.token}: ${s.px}`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 5. Shape & Controls */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Shape, Borders & Interactive Controls</h2>
        <div className={styles.shapeGrid}>
          <div className={styles.controlCard}>
            <span className={styles.subtitle}>Primary Button (--radius-1, 48px tap min)</span>
            <button type="button" className={styles.primaryButton}>
              Partner with us
            </button>
            <span className={styles.typeMeta}>Hover swaps to paper fill with 2px ink border at 120ms</span>
          </div>

          <div className={styles.controlCard}>
            <span className={styles.subtitle}>Rules & Borders</span>
            <div style={{ borderBottom: 'var(--rule-1) solid var(--color-rule)', paddingBottom: '8px' }}>
              <span className={styles.typeMeta}>--rule-1: 1px hairline</span>
            </div>
            <div style={{ borderBottom: 'var(--rule-2) solid var(--color-ink)', paddingBottom: '8px' }}>
              <span className={styles.typeMeta}>--rule-2: 2px focus/active indicator</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Motion Tokens */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>6. Motion Durations (120ms / 240ms / 480ms, 16px max travel)</h2>
        <div className={styles.motionGrid}>
          <div className={styles.motionCard}>
            <span className={styles.subtitle}>--dur-1: 120ms (Hover / Press)</span>
            <div className={styles.motionTrack}>
              <div className={styles.motionObject1} />
            </div>
            <span className={styles.typeMeta}>Hover this card to preview 16px travel</span>
          </div>

          <div className={styles.motionCard}>
            <span className={styles.subtitle}>--dur-2: 240ms (Disclosure / Menu)</span>
            <div className={styles.motionTrack}>
              <div className={styles.motionObject2} />
            </div>
            <span className={styles.typeMeta}>Hover this card to preview 16px travel</span>
          </div>

          <div className={styles.motionCard}>
            <span className={styles.subtitle}>--dur-3: 480ms (Wall Reveal Only)</span>
            <div className={styles.motionTrack}>
              <div className={styles.motionObject3} />
            </div>
            <span className={styles.typeMeta}>Hover this card to preview 16px travel</span>
          </div>
        </div>
      </section>
    </main>
  );
}
