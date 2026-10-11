'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import PhotoWall from './_wall/PhotoWall';
import { AnimatedBackground } from '../components/core/animated-background';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [finalVisible, setFinalVisible] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [openTiers, setOpenTiers] = useState<Record<string, boolean>>({
    platinum: false,
    gold: false,
    silver: false,
    technical: false,
  });

  useEffect(() => {
    setMounted(true);
    const heroEl = document.getElementById('hero');
    const partnerEl = document.getElementById('partner');

    const heroObserver = heroEl
      ? new IntersectionObserver(
          ([entry]) => {
            setHeroVisible(entry.isIntersecting);
          },
          { threshold: 0.1 }
        )
      : null;

    const partnerObserver = partnerEl
      ? new IntersectionObserver(
          ([entry]) => {
            setFinalVisible(entry.isIntersecting);
          },
          { threshold: 0.1 }
        )
      : null;

    if (heroEl && heroObserver) heroObserver.observe(heroEl);
    if (partnerEl && partnerObserver) partnerObserver.observe(partnerEl);

    return () => {
      heroObserver?.disconnect();
      partnerObserver?.disconnect();
    };
  }, []);

  const toggleTier = (tier: string) => {
    setOpenTiers((prev) => ({ ...prev, [tier]: !prev[tier] }));
  };
  return (
    <>
      {/* Skip Link for Keyboard Accessibility */}
      <a href="#content" className={styles.skipLink}>
        Skip to content
      </a>

      {/* 0. Header Landmark */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#hero" className={styles.brand}>
            <Image
              src="/images/logo.png"
              width={1537}
              height={699}
              alt=""
              priority
              className={styles.brandMark}
            />
            <span className={styles.brandWordmark}>AeroBMSCE</span>
          </a>

          <nav aria-label="Main" className={styles.nav}>
            <a href="#teams" className={styles.menuTrigger}>Menu</a>
            <div className={styles.navList}>
              <AnimatedBackground
                enableHover
                className={styles.navPillHover}
                transition={{
                  type: 'spring',
                  bounce: 0.15,
                  duration: 0.3,
                }}
              >
                <a href="#teams" data-id="teams" className={styles.navLink}>Teams</a>
                <a href="#results" data-id="results" className={styles.navLink}>Results</a>
                <a href="#tiers" data-id="tiers" className={styles.navLink}>Partners</a>
              </AnimatedBackground>
              <a href="#partner" className={styles.navCta}>
                Partner with us
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Landmark */}
      <main id="content">
        {/* 1. Hero Section (Gold Field) */}
        <section id="hero" aria-labelledby="hero-title" className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>
              Est. 2012 · Propel Lab–3 · BMS College of Engineering, Bengaluru
            </p>
            <h1 id="hero-title" className={styles.heroTitle}>
              Your logo on aircraft that competed in Texas
            </h1>
            <p className={styles.heroLead}>
              Platinum and Gold partners get their logo on our aircraft.
            </p>
            <div className={styles.heroActions}>
              <a href="#partner" className={styles.heroPrimaryBtn}>
                Partner with us
              </a>
              <a
                href="mailto:aerobmsce@bmsce.ac.in?subject=Joining%20AeroBMSCE"
                className={styles.heroSecondaryLink}
              >
                Join the club
              </a>
            </div>
          </div>
        </section>

        {/* 2. Photo Wall Section (Signature) */}
        <section id="photos" aria-labelledby="wall-title" className={styles.signatureSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel}>Team photos</p>
              <h2 id="wall-title" className={styles.sectionTitle}>
                The team at SAE competitions
              </h2>
            </div>

            <PhotoWall />
          </div>
        </section>

        {/* 3. Teams Section (Data Rail) */}
        <section id="teams" aria-labelledby="teams-title" className={styles.teamsSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel}>Teams</p>
              <h2 id="teams-title" className={styles.sectionTitle}>
                Four teams, four disciplines
              </h2>
            </div>

            <ul className={styles.teamsList}>
              <li className={styles.teamRow}>
                <span className={styles.teamRail}>International competitions</span>
                <div className={styles.teamContent}>
                  <h3 className={styles.teamName}>Team Yaksha</h3>
                  <p className={styles.teamLine}>
                    [NEEDS FACT: one dated result or project for Yaksha]
                  </p>
                </div>
              </li>
              <li className={styles.teamRow}>
                <span className={styles.teamRail}>Aeromodelling</span>
                <div className={styles.teamContent}>
                  <h3 className={styles.teamName}>Team Blue Impulse</h3>
                  <p className={styles.teamLine}>
                    Won SAE India 2020: 1st overall, ₹1,00,000.
                  </p>
                </div>
              </li>
              <li className={styles.teamRow}>
                <span className={styles.teamRail}>Drone development</span>
                <div className={styles.teamContent}>
                  <h3 className={styles.teamName}>Team Flying Phantoms</h3>
                  <p className={styles.teamLine}>
                    Placed 2nd at SAE Aerothon 2025: ₹1,25,000.
                  </p>
                </div>
              </li>
              <li className={styles.teamRow}>
                <span className={styles.teamRail}>Drone racing</span>
                <div className={styles.teamContent}>
                  <h3 className={styles.teamName}>Team Vectors</h3>
                  <p className={styles.teamLine}>
                    Placed 2nd at NITK Drone Racing, 18–20 Oct 2024.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* 4. Results Section (Data Rail) */}
        <section id="results" aria-labelledby="results-title" className={styles.resultsSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel}>Results</p>
              <h2 id="results-title" className={styles.sectionTitle}>
                Podium finishes since 2018
              </h2>
            </div>

            <ol className={styles.seasonsList}>
              {/* 2026 Season */}
              <li className={styles.seasonGroup}>
                <span className={styles.seasonRail}>2026 season</span>
                <ul className={styles.seasonEntries}>
                  <li className={styles.resultItem}>
                    <h3 className={styles.resultTitle}>
                      2nd place, MATLAB Simulation Awards
                    </h3>
                    <p className={styles.resultEvent}>
                      SAE International Aero Design West
                    </p>
                    <p className={styles.resultData}>
                      Fort Worth, Texas, USA · #16 globally, Micro Class
                    </p>
                  </li>
                  <li className={styles.resultItem}>
                    <h3 className={styles.resultTitle}>
                      1st place, Unique Technology development
                    </h3>
                    <p className={styles.resultEvent}>
                      SAE Aerothon, ADDC 2026
                    </p>
                    <p className={styles.resultData}>
                      [NEEDS FACT: date and place]
                    </p>
                  </li>
                </ul>
              </li>

              {/* 2025 Season */}
              <li className={styles.seasonGroup}>
                <span className={styles.seasonRail}>2025 season</span>
                <ul className={styles.seasonEntries}>
                  <li className={styles.resultItem}>
                    <h3 className={styles.resultTitle}>
                      2nd place overall, ₹1,25,000
                    </h3>
                    <p className={styles.resultEvent}>SAE Aerothon</p>
                    <p className={styles.resultData}>Nov 2025</p>
                  </li>
                  <li className={styles.resultItem}>
                    <h3 className={styles.resultTitle}>
                      1st place, Best Technical Presentation, ₹10,000
                    </h3>
                    <p className={styles.resultEvent}>
                      SAE Drone Design Challenge
                    </p>
                    <p className={styles.resultData}>May 2025</p>
                  </li>
                  <li className={styles.resultItem}>
                    <h3 className={styles.resultTitle}>
                      1st place, Best Innovation, ₹5,000
                    </h3>
                    <p className={styles.resultEvent}>
                      SAE Autonomous Drone Design Challenge
                    </p>
                    <p className={styles.resultData}>Apr 2025</p>
                  </li>
                </ul>
              </li>

              {/* 2024 Season */}
              <li className={styles.seasonGroup}>
                <span className={styles.seasonRail}>2024 season</span>
                <ul className={styles.seasonEntries}>
                  <li className={styles.resultItem}>
                    <h3 className={styles.resultTitle}>2nd place</h3>
                    <p className={styles.resultEvent}>
                      NITK Drone Racing Competition
                    </p>
                    <p className={styles.resultData}>18–20 Oct 2024</p>
                  </li>
                  <li className={styles.resultItem}>
                    <h3 className={styles.resultTitle}>1st place</h3>
                    <p className={styles.resultEvent}>
                      Global Academy of Technology drone racing
                    </p>
                    <p className={styles.resultData}>Nov 2024</p>
                  </li>
                  <li className={styles.resultItem}>
                    <h3 className={styles.resultTitle}>12th place globally</h3>
                    <p className={styles.resultEvent}>
                      SAE International Aero Design West
                    </p>
                    <p className={styles.resultData}>Aug 2024</p>
                  </li>
                </ul>
              </li>

              {/* 2022 Season */}
              <li
                id="archive-2022"
                className={`${styles.seasonGroup} ${styles.archiveGroup}`}
                data-expanded={!mounted ? 'true' : showArchive ? 'true' : 'false'}
              >
                <span className={styles.seasonRail}>2022 season</span>
                <ul className={styles.seasonEntries}>
                  <li className={styles.resultItem}>
                    <h3 className={styles.resultTitle}>3rd place, ₹50,000</h3>
                    <p className={styles.resultEvent}>SAE Aerothon</p>
                    <p className={styles.resultData}>[NEEDS FACT: date]</p>
                  </li>
                  <li className={styles.resultItem}>
                    <h3 className={styles.resultTitle}>2nd place, ₹15,000</h3>
                    <p className={styles.resultEvent}>
                      [NEEDS FACT: exhibition name; old site reads &#39;lll South India Exhibition&#39;]
                    </p>
                    <p className={styles.resultData}>
                      Kalpataru Institute of Technology, Tiptur, Karnataka
                    </p>
                  </li>
                  <li className={styles.resultItem}>
                    <h3 className={styles.resultTitle}>4th place nationally</h3>
                    <p className={styles.resultEvent}>
                      AI-VTOL, Techfest, IIT Bombay
                    </p>
                    <p className={styles.resultData}>[NEEDS FACT: date]</p>
                  </li>
                  <li className={styles.resultItem}>
                    <h3 className={styles.resultTitle}>
                      9th in design report, 11th in presentation, globally
                    </h3>
                    <p className={styles.resultEvent}>
                      SAE International Aero Design West
                    </p>
                    <p className={styles.resultData}>[NEEDS FACT: date]</p>
                  </li>
                </ul>
              </li>

              {/* 2020 Season */}
              <li
                id="archive-2020"
                className={`${styles.seasonGroup} ${styles.archiveGroup}`}
                data-expanded={!mounted ? 'true' : showArchive ? 'true' : 'false'}
              >
                <span className={styles.seasonRail}>2020 season</span>
                <ul className={styles.seasonEntries}>
                  <li className={styles.resultItem}>
                    <h3 className={styles.resultTitle}>
                      1st place overall, ₹1,00,000
                    </h3>
                    <p className={styles.resultEvent}>SAE India</p>
                    <p className={styles.resultData}>
                      Team Blue Impulse, national winners
                    </p>
                  </li>
                  <li className={styles.resultItem}>
                    <h3 className={styles.resultTitle}>
                      8th place in design standings, globally
                    </h3>
                    <p className={styles.resultEvent}>
                      SAE Aero Design West
                    </p>
                    <p className={styles.resultData}>[NEEDS FACT: date]</p>
                  </li>
                </ul>
              </li>

              {/* 2018 Season */}
              <li
                id="archive-2018"
                className={`${styles.seasonGroup} ${styles.archiveGroup}`}
                data-expanded={!mounted ? 'true' : showArchive ? 'true' : 'false'}
              >
                <span className={styles.seasonRail}>2018 season</span>
                <ul className={styles.seasonEntries}>
                  <li className={styles.resultItem}>
                    <h3 className={styles.resultTitle}>3rd place overall</h3>
                    <p className={styles.resultEvent}>
                      SAE India, Anna University, Chennai
                    </p>
                    <p className={styles.resultData}>[NEEDS FACT: date]</p>
                  </li>
                  <li className={styles.resultItem}>
                    <h3 className={styles.resultTitle}>
                      2nd place in design report
                    </h3>
                    <p className={styles.resultEvent}>
                      SAE India, Anna University, Chennai
                    </p>
                    <p className={styles.resultData}>[NEEDS FACT: date]</p>
                  </li>
                </ul>
              </li>
            </ol>

            <button
              type="button"
              className={styles.resultsMoreBtn}
              aria-expanded={mounted ? showArchive : true}
              aria-controls="archive-2022 archive-2020 archive-2018"
              onClick={() => setShowArchive((prev) => !prev)}
            >
              {mounted && showArchive ? 'Hide earlier seasons' : 'Show earlier seasons'}
            </button>
          </div>
        </section>

        {/* 5. Partner Tiers Section */}
        <section id="tiers" aria-labelledby="tiers-title" className={styles.tiersSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel}>Partner tiers</p>
              <h2 id="tiers-title" className={styles.sectionTitle}>
                Four ways to partner
              </h2>
            </div>

            <p className={styles.tiersLead}>
              Sponsorship pays for travel, accommodation and logistics. BMS College of Engineering&#39;s R&amp;D department already funds research and fabrication of our current flight systems.
            </p>
            <p className={styles.tiersPrice}>Tier prices are shared by email.</p>

            <ul className={styles.tiersList}>
              {/* Platinum */}
              <li className={styles.tierRow}>
                <h3 className={styles.tierRail}>Platinum partner</h3>
                <div className={styles.tierContent}>
                  <p className={styles.tierTagline}>
                    Title partner · strategic alignment
                  </p>
                  <ol
                    id="tier-benefits-platinum"
                    className={styles.tierBenefits}
                    data-expanded={!mounted ? 'true' : openTiers.platinum ? 'true' : 'false'}
                  >
                    <li className={styles.tierBenefitItem}>1. Primary logo on aircraft and UAV models</li>
                    <li className={styles.tierBenefitItem}>2. Logo and verbal thanks in official videos and key events</li>
                    <li className={styles.tierBenefitItem}>3. Priority place on flags, banners and standees</li>
                    <li className={styles.tierBenefitItem}>4. Named in reports, submissions and press releases</li>
                    <li className={styles.tierBenefitItem}>5. Direct contact with the core team and leads</li>
                    <li className={styles.tierBenefitItem}>6. Tied to flagship projects and major events</li>
                  </ol>
                  <button
                    type="button"
                    aria-expanded={mounted ? openTiers.platinum : true}
                    aria-controls="tier-benefits-platinum"
                    aria-label={openTiers.platinum ? 'Hide Platinum partner benefits' : 'Show Platinum partner benefits'}
                    className={styles.tierToggleBtn}
                    onClick={() => toggleTier('platinum')}
                  >
                    {mounted && openTiers.platinum ? 'Hide benefits' : 'Show benefits'}
                  </button>
                </div>
              </li>

              {/* Gold */}
              <li className={styles.tierRow}>
                <h3 className={styles.tierRail}>Gold partner</h3>
                <div className={styles.tierContent}>
                  <p className={styles.tierTagline}>
                    High visibility · competition presence
                  </p>
                  <ol
                    id="tier-benefits-gold"
                    className={styles.tierBenefits}
                    data-expanded={!mounted ? 'true' : openTiers.gold ? 'true' : 'false'}
                  >
                    <li className={styles.tierBenefitItem}>1. Secondary logo on selected aircraft models</li>
                    <li className={styles.tierBenefitItem}>2. Logo on team uniforms and presentations</li>
                    <li className={styles.tierBenefitItem}>3. Shared branding on competition banners and standees</li>
                    <li className={styles.tierBenefitItem}>4. Named across events and on social media</li>
                    <li className={styles.tierBenefitItem}>5. Branding at workshops and technical events</li>
                    <li className={styles.tierBenefitItem}>6. Present at national and international competitions</li>
                  </ol>
                  <button
                    type="button"
                    aria-expanded={mounted ? openTiers.gold : true}
                    aria-controls="tier-benefits-gold"
                    aria-label={openTiers.gold ? 'Hide Gold partner benefits' : 'Show Gold partner benefits'}
                    className={styles.tierToggleBtn}
                    onClick={() => toggleTier('gold')}
                  >
                    {mounted && openTiers.gold ? 'Hide benefits' : 'Show benefits'}
                  </button>
                </div>
              </li>

              {/* Silver */}
              <li className={styles.tierRow}>
                <h3 className={styles.tierRail}>Silver partner</h3>
                <div className={styles.tierContent}>
                  <p className={styles.tierTagline}>
                    Event and media visibility
                  </p>
                  <ol
                    id="tier-benefits-silver"
                    className={styles.tierBenefits}
                    data-expanded={!mounted ? 'true' : openTiers.silver ? 'true' : 'false'}
                  >
                    <li className={styles.tierBenefitItem}>1. Logo on team uniforms</li>
                    <li className={styles.tierBenefitItem}>2. Logo on presentations and project materials</li>
                    <li className={styles.tierBenefitItem}>3. Place on team banners and shared standees</li>
                    <li className={styles.tierBenefitItem}>4. Named in event communications</li>
                    <li className={styles.tierBenefitItem}>5. Social media mentions during competitions</li>
                    <li className={styles.tierBenefitItem}>6. Visible at select AeroBMSCE events</li>
                  </ol>
                  <button
                    type="button"
                    aria-expanded={mounted ? openTiers.silver : true}
                    aria-controls="tier-benefits-silver"
                    aria-label={openTiers.silver ? 'Hide Silver partner benefits' : 'Show Silver partner benefits'}
                    className={styles.tierToggleBtn}
                    onClick={() => toggleTier('silver')}
                  >
                    {mounted && openTiers.silver ? 'Hide benefits' : 'Show benefits'}
                  </button>
                </div>
              </li>

              {/* Technical */}
              <li className={styles.tierRow}>
                <h3 className={styles.tierRail}>Technical and ecosystem partner</h3>
                <div className={styles.tierContent}>
                  <p className={styles.tierTagline}>
                    Design · simulation · analysis
                  </p>
                  <ol
                    id="tier-benefits-technical"
                    className={styles.tierBenefits}
                    data-expanded={!mounted ? 'true' : openTiers.technical ? 'true' : 'false'}
                  >
                    <li className={styles.tierBenefitItem}>1. Your tools shown in design and competition reports</li>
                    <li className={styles.tierBenefitItem}>2. Credit in technical presentations and submissions</li>
                    <li className={styles.tierBenefitItem}>3. Co-branded hands-on workshops</li>
                    <li className={styles.tierBenefitItem}>4. Logo on reports, posters and certificates</li>
                    <li className={styles.tierBenefitItem}>5. Technical banners and workshop standees</li>
                    <li className={styles.tierBenefitItem}>6. Early access to high-performing students</li>
                  </ol>
                  <button
                    type="button"
                    aria-expanded={mounted ? openTiers.technical : true}
                    aria-controls="tier-benefits-technical"
                    aria-label={openTiers.technical ? 'Hide Technical and ecosystem partner benefits' : 'Show Technical and ecosystem partner benefits'}
                    className={styles.tierToggleBtn}
                    onClick={() => toggleTier('technical')}
                  >
                    {mounted && openTiers.technical ? 'Hide benefits' : 'Show benefits'}
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* 6. Collaborators Section */}
        <section id="partners" aria-labelledby="eco-title" className={styles.collaboratorsSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel}>Collaborators</p>
              <h2 id="eco-title" className={styles.sectionTitle}>
                10 organisations we work with
              </h2>
            </div>

            <div className={styles.groupsList}>
              {/* Group 1 */}
              <div className={styles.groupRow}>
                <h3 className={styles.groupRail}>
                  Design, simulation and engineering software
                </h3>
                <ul className={styles.groupLogos}>
                  <li className={styles.logoCell}>
                    <Image
                      src="/images/solidworks.png"
                      width={750}
                      height={155}
                      alt="SolidWorks"
                      className={styles.logoImg}
                    />
                  </li>
                  <li className={styles.logoCell}>
                    <Image
                      src="/images/ansys.png"
                      width={396}
                      height={128}
                      alt="Ansys"
                      className={styles.logoImg}
                    />
                  </li>
                  <li className={styles.logoCell}>
                    <Image
                      src="/images/altair.png"
                      width={659}
                      height={135}
                      alt="Altair"
                      className={styles.logoImg}
                    />
                  </li>
                  <li className={styles.logoCell}>
                    <Image
                      src="/images/siemens.png"
                      width={768}
                      height={123}
                      alt="Siemens"
                      className={styles.logoImg}
                    />
                  </li>
                  <li className={styles.logoCell}>
                    <Image
                      src="/images/flow5.png"
                      width={391}
                      height={105}
                      alt="Flow5"
                      className={styles.logoImg}
                    />
                  </li>
                  <li className={styles.logoCell}>
                    <Image
                      src="/images/simscale.png"
                      width={480}
                      height={252}
                      alt="SimScale"
                      className={styles.logoImg}
                    />
                  </li>
                </ul>
              </div>

              {/* Group 2 */}
              <div className={styles.groupRow}>
                <h3 className={styles.groupRail}>
                  UAV hardware and components
                </h3>
                <ul className={styles.groupLogos}>
                  <li className={styles.logoCell}>
                    <Image
                      src="/images/drkstore.png"
                      width={687}
                      height={169}
                      alt="DRK Store"
                      className={styles.logoImg}
                    />
                  </li>
                  <li className={styles.logoCell}>
                    <Image
                      src="/images/uav-marketplace.png"
                      width={320}
                      height={320}
                      alt="UAV Marketplace"
                      className={styles.logoImg}
                    />
                  </li>
                </ul>
              </div>

              {/* Group 3 */}
              <div className={styles.groupRow}>
                <h3 className={styles.groupRail}>Academic and research</h3>
                <ul className={styles.groupLogos}>
                  <li className={styles.logoCell}>
                    <Image
                      src="/images/drdo.png"
                      width={360}
                      height={360}
                      alt="DRDO"
                      className={styles.logoImg}
                    />
                  </li>
                  <li className={styles.logoCell}>
                    <Image
                      src="/images/csir-nal.png"
                      width={192}
                      height={190}
                      alt="CSIR-NAL"
                      className={styles.logoImg}
                    />
                  </li>
                </ul>
              </div>
            </div>

            <p className={styles.drdoNote}>
              DRDO: joint project, details restricted.
            </p>
          </div>
        </section>

        {/* 7. Final Partner Block (Gold Field) */}
        <section id="partner" aria-labelledby="final-title" className={styles.finalBlock}>
          <div className={styles.finalInner}>
            <h2 id="final-title" className={styles.finalTitle}>
              Fund our trip to Aero Design West 2027
            </h2>
            <p className={styles.finalLead}>
              Sponsorship pays for travel, accommodation and logistics.
            </p>
            <a
              href="mailto:aerobmsce@bmsce.ac.in?subject=Partnership%20enquiry%3A%20AeroBMSCE&body=Organisation%3A%0ATier%20of%20interest%3A%0AYour%20name%20and%20phone%3A"
              className={styles.finalCta}
            >
              Partner with us
            </a>

            <dl className={styles.contactList}>
              <div className={styles.contactRow}>
                <dt className={styles.contactLabel}>Partnership head</dt>
                <dd className={styles.contactValue}>Rajesh [NEEDS FACT: surname]</dd>
              </div>
              <div className={styles.contactRow}>
                <dt className={styles.contactLabel}>Email</dt>
                <dd className={styles.contactValue}>
                  <a href="mailto:aerobmsce@bmsce.ac.in" className={styles.contactLink}>
                    aerobmsce@bmsce.ac.in
                  </a>
                </dd>
              </div>
              <div className={styles.contactRow}>
                <dt className={styles.contactLabel}>Base</dt>
                <dd className={styles.contactValue}>
                  Propel Lab–3, BMS College of Engineering, Bengaluru
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      {/* 8. Footer Landmark (Ink Field) */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerWordmark}>AeroBMSCE</p>

          <nav aria-label="Footer navigation">
            <ul className={styles.footerNavList}>
              <li><a href="#teams" className={styles.footerNavLink}>Teams</a></li>
              <li><a href="#results" className={styles.footerNavLink}>Results</a></li>
              <li><a href="#tiers" className={styles.footerNavLink}>Partners</a></li>
              <li>
                <a
                  href="mailto:aerobmsce@bmsce.ac.in?subject=Joining%20AeroBMSCE"
                  className={styles.footerNavLink}
                >
                  Join the club
                </a>
              </li>
            </ul>
          </nav>

          <div className={styles.footerContact}>
            <span className={styles.footerEmailLabel}>Email</span>
            <span className={styles.footerEmailValue}>
              <a href="mailto:aerobmsce@bmsce.ac.in" className={styles.footerEmailLink}>
                aerobmsce@bmsce.ac.in
              </a>
            </span>
          </div>

          <hr className={styles.footerDivider} />

          <p className={styles.footerCopy}>© 2026 AeroBMSCE</p>
          <p className={styles.footerNotice}>
            Practice website for the AeroBMSCE web development recruitment task. This is not the official AeroBMSCE website.
          </p>
        </div>
      </footer>

      {/* Mobile Sticky CTA Bar */}
      <aside
        className={styles.stickyBar}
        data-visible={!mounted ? undefined : !heroVisible && !finalVisible ? 'true' : 'false'}
        aria-label="Quick contact"
      >
        <a href="#partner" className={styles.stickyBtn}>
          Partner with us
        </a>
      </aside>
    </>
  );
}
