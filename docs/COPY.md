# COPY

Every string on the page, by section, with a maximum length in characters. Wireframe sections follow `docs/WIREFRAMES.md`.

## Rules applied

- **Facts only.** Every claim comes from the proof inventory: the old `index.html`, `journey.html`, `partners.html`, the logo files, and what is visibly printed in the photos (banners, cheques, signs). Anything else is `[NEEDS FACT: ...]`, listed at the end.
- **Every claim names a person, project, number or date.**
- Sentence case everywhere. The uppercase on labels and data lines is applied by CSS (`--text-data`), so write them in sentence case here.
- Verbs over adjectives. Labels say what happens.
- **One name per action.** Partner with us (nav, hero, sticky bar, final block). Join the club (hero, menu, footer). Show earlier seasons / Show fewer seasons. Show benefits / Hide benefits.
- Banned words are checked by script: passionate, innovative, seamless, leverage, crafting, journey, cutting-edge, building the future. None appear.
- "Max" is the longest length the layout can hold. `[NEEDS FACT]` strings must fit the same limit once filled.

> [!IMPORTANT]
> Results, dates and prizes below come from the old site. The BRIEF says exact numbers and dates are not yet confirmed, so each one is listed in "Confirm before launch" at the end.

## 0. Page level

| ID | String | Max | Source / note |
|---|---|---|---|
| meta.title | AeroBMSCE: aircraft and drone team at BMSCE, Bengaluru | 60 | Index: design, build and test aircraft and drones; BMS College of Engineering |
| meta.description | AeroBMSCE builds and flies aircraft and drones at BMS College of Engineering, Bengaluru. 2nd at SAE Aerothon 2025. Partner with us. | 155 | Cheque in photo1/photo7; Aerothon 2025 2nd, ₹1,25,000 |
| meta.og.alt | [NEEDS FACT: describe the share image once chosen] | 125 | Share image not yet chosen |
| a11y.skip | Skip to content | 20 | Skip link |
| nav.aria | Main | 10 | aria-label of the nav landmark |

## 0b. Nav (desktop bar, mobile top bar and menu sheet)

| ID | String | Max | Source / note |
|---|---|---|---|
| nav.logo.alt |  | 0 | Empty alt: the wordmark text next to the mark carries the name |
| nav.wordmark | AeroBMSCE | 12 | Text, not the old logo image |
| nav.link.teams | Teams | 10 | Anchor to section 3 |
| nav.link.results | Results | 10 | Anchor to section 4 |
| nav.link.partners | Partners | 10 | Anchor to section 5 |
| nav.cta | Partner with us | 20 | Primary action. Scrolls to section 7 |
| nav.menu.open | Menu | 8 | Mobile text button, no icon |
| nav.menu.close | Close | 8 | Inside the open sheet |
| nav.menu.cta | Partner with us | 20 | Same name as nav.cta |
| nav.menu.join | Join the club | 20 | Same name as hero secondary |

## 1. Hero A: next action leads (recommended)

| ID | String | Max | Source / note |
|---|---|---|---|
| hero.eyebrow | Est. 2012 · Propel Lab–3 · BMS College of Engineering, Bengaluru | 72 | Index: established 2012, Propel Lab–3. Wraps to two lines on mobile |
| hero.h1 | Your logo on aircraft that competed in Texas | 48 | Platinum/Gold tiers put logos on aircraft; SAE Aero Design West, Fort Worth, Texas, 2026 season. Confirm the entry (item 5) |
| hero.lead | Platinum and Gold partners get their logo on our aircraft. | 70 | partners.html: Platinum primary logo, Gold secondary logo on aircraft models |
| hero.cta.primary | Partner with us | 20 | Scrolls to section 7 |
| hero.cta.secondary | Join the club | 20 | [NEEDS FACT: where this link goes, item 11] |
| sticky.cta | Partner with us | 20 | Mobile bottom bar, appears after the hero button leaves the screen |

## 1b. Hero B: next event leads (use once one event date is confirmed)

| ID | String | Max | Source / note |
|---|---|---|---|
| heroB.eyebrow | Next event | 20 | Label |
| heroB.h1 | NACDEC 2026 | 28 | partners.html upcoming list; [NEEDS FACT: confirm this is the next event] |
| heroB.row.date.label | Date | 10 |  |
| heroB.row.date.value | [NEEDS FACT: date of the event] | 24 | No date on the old site |
| heroB.row.place.label | Place | 10 |  |
| heroB.row.place.value | [NEEDS FACT: venue, city] | 40 | Not on the old site |
| heroB.row.class.label | Class | 10 |  |
| heroB.row.class.value | [NEEDS FACT: competition class] | 40 | Not on the old site |
| heroB.row.organiser.label | Organiser | 10 |  |
| heroB.row.organiser.value | Aeronautical Society of India | 40 | partners.html |
| heroB.row.status.label | Status | 10 |  |
| heroB.row.status.value | [NEEDS FACT: registered or planned] | 24 | Not on the old site |
| heroB.cta.primary | Partner with us | 20 | Same as hero A |
| heroB.cta.secondary | Join the club | 20 | Same as hero A |

Other events listed on the old site (all undated): ISRO IROC, NITK Drone Racing Competition 2026, SAE International Aero Design West 2027, SAE Aerothon 2027.

## 2. Photo wall (signature)

| ID | String | Max | Source / note |
|---|---|---|---|
| wall.label | Team photos | 24 |  |
| wall.h2 | The team at SAE competitions | 40 | Holds only if photos 3 to 6 and 8 are SAE events. Item 1. Otherwise change the heading or cut those photos |
| wall.caption.label.event | Event | 10 | Mobile three-line caption labels |
| wall.caption.label.date | Date | 10 |  |
| wall.caption.label.aircraft | Aircraft | 10 |  |

Desktop caption is one line: `event · date · aircraft` (max 90). Mobile shows the three labels above, each on its own line.

Reading order from the wireframe. Alt text describes only what is visible. Event, date and aircraft stay empty until confirmed.

| Photo | Alt text (max 125) | Event (max 60) | Date (max 14) | Aircraft (max 40) |
|---|---|---|---|---|
| photo8 | A quadcopter carrying a small box flies against a clear sky. | [NEEDS FACT: event] | [NEEDS FACT: date] | [NEEDS FACT: aircraft name] |
| photo2 | Members hold two model aircraft in front of an SAEINDIA Southern Section and Prathyusha Engineering College banner. | SAEINDIA flying ground, Prathyusha Engineering College | [NEEDS FACT: date] | [NEEDS FACT: aircraft name] |
| photo5 | More than twenty members pose in a hall, standing and seated in rows. | [NEEDS FACT: event] | [NEEDS FACT: date] | [NEEDS FACT: aircraft name or leave blank] |
| photo1 | Team Flying Phantoms and officials on stage at Aerothon 2025 with a ₹1,25,000 second-prize cheque; a member holds a drone. | SAE Aerothon 2025, 2nd place | Nov 2025 | [NEEDS FACT: aircraft name] |
| photo3 | Members stand in front of an SAE International banner at a competition field. | [NEEDS FACT: event] | [NEEDS FACT: date] | [NEEDS FACT: aircraft name or leave blank] |
| photo4 | Members stand in front of the Prathyusha Engineering College entrance sign. | [NEEDS FACT: event] | [NEEDS FACT: date] | [NEEDS FACT: aircraft name or leave blank] |
| photo6 | Four members stand holding a quadcopter in front of a statue of a hand holding the Moon. | [NEEDS FACT: event and place] | [NEEDS FACT: date] | [NEEDS FACT: aircraft name] |
| photo7 | A quadcopter on a stone ledge in front of the Aerothon 2025 second-prize cheque of ₹1,25,000, written for Flying Phantoms. | SAE Aerothon 2025, 2nd place | Nov 2025 | [NEEDS FACT: confirm this is the competition drone] |

Photo 1 and photo 7 facts are printed on the cheque and match the 2025 result on the old site (SAE Aerothon, 2nd place overall, ₹1,25,000, Nov 2025). The cheque names Flying Phantoms.

## 3. Teams

| ID | String | Max | Source / note |
|---|---|---|---|
| teams.label | Teams | 24 |  |
| teams.h2 | Four teams, four disciplines | 40 | Index and journey pages list four teams |
| teams.1.discipline | International competitions | 28 | journey.html: Team Yaksha |
| teams.1.name | Team Yaksha | 28 |  |
| teams.1.line | [NEEDS FACT: one dated result or project for Yaksha] | 70 | Old site gives no result for this team |
| teams.2.discipline | Aeromodelling | 28 | journey.html: Team Blue Impulse |
| teams.2.name | Team Blue Impulse | 28 |  |
| teams.2.line | Won SAE India 2020: 1st overall, ₹1,00,000. | 70 | journey.html, 2020 season: SAE-India 1st place overall; Blue Impulse won nationally |
| teams.3.discipline | Drone development | 28 | journey.html: Team Flying Phantoms |
| teams.3.name | Team Flying Phantoms | 28 |  |
| teams.3.line | Placed 2nd at SAE Aerothon 2025: ₹1,25,000. | 70 | Cheque in photo1 and photo7 names Flying Phantoms |
| teams.4.discipline | Drone racing | 28 | journey.html: Team Vectors |
| teams.4.name | Team Vectors | 28 |  |
| teams.4.line | Placed 2nd at NITK Drone Racing, 18–20 Oct 2024. | 70 | Result from journey.html. The old site does not say Vectors entered it: confirm (item 4) |

## 4. Results

| ID | String | Max | Source / note |
|---|---|---|---|
| results.label | Results | 24 |  |
| results.h2 | Podium finishes since 2018 | 40 | Every season listed has a podium or 1st place; earliest is 2018 (3rd overall) |
| results.more | Show earlier seasons | 24 | Mobile disclosure, closed state |
| results.less | Show fewer seasons | 24 | Mobile disclosure, open state |

Result is the large line. Event is the second line. The data line carries date, place and extras. Desktop shows every season. Mobile shows 2026 and 2025, the rest sit behind the disclosure.

| Season label (max 14) | Result (max 56) | Event (max 70) | Data line (max 60) |
|---|---|---|---|
| 2026 season | 2nd place, MATLAB Simulation Awards | SAE International Aero Design West | Fort Worth, Texas, USA · #16 globally, Micro Class |
|  | 1st place, Unique Technology development | SAE Aerothon, ADDC 2026 | [NEEDS FACT: date and place] |
| 2025 season | 2nd place overall, ₹1,25,000 | SAE Aerothon | Nov 2025 |
|  | 1st place, Best Technical Presentation, ₹10,000 | SAE Drone Design Challenge | May 2025 |
|  | 1st place, Best Innovation, ₹5,000 | SAE Autonomous Drone Design Challenge | Apr 2025 |
| 2024 season | 2nd place | NITK Drone Racing Competition | 18–20 Oct 2024 |
|  | 1st place | Global Academy of Technology drone racing | Nov 2024 |
|  | 12th place globally | SAE International Aero Design West | Aug 2024 |
| 2022 season | 3rd place, ₹50,000 | SAE Aerothon | [NEEDS FACT: date] |
|  | 2nd place, ₹15,000 | [NEEDS FACT: exhibition name; old site reads 'lll South India Exhibition'] | Kalpataru Institute of Technology, Tiptur, Karnataka |
|  | 4th place nationally | AI-VTOL, Techfest, IIT Bombay | [NEEDS FACT: date] |
|  | 9th in design report, 11th in presentation, globally | SAE International Aero Design West | [NEEDS FACT: date] |
| 2020 season | 1st place overall, ₹1,00,000 | SAE India | Team Blue Impulse, national winners |
|  | 8th place in design standings, globally | SAE Aero Design West | [NEEDS FACT: date] |
| 2018 season | 3rd place overall | SAE India, Anna University, Chennai | [NEEDS FACT: date] |
|  | 2nd place in design report | SAE India, Anna University, Chennai | [NEEDS FACT: date] |

## 5. Partner tiers

| ID | String | Max | Source / note |
|---|---|---|---|
| tiers.label | Partner tiers | 24 |  |
| tiers.h2 | Four ways to partner | 40 | Four tiers on partners.html |
| tiers.lead | Sponsorship pays for travel, accommodation and logistics. BMS College of Engineering's R&D department already funds research and fabrication of our current flight systems. | 200 | partners.html: financial sponsorship scope; 100% of R&D and fabrication subsidised by the BMSCE R&D department. Added line, not in the wireframe |
| tiers.price | Tier prices are shared by email. | 40 | [NEEDS FACT: confirm prices are not published, item 12]. Added line, not in the wireframe |
| tiers.toggle.show | Show benefits | 20 | Mobile row control, closed. Screen-reader name: 'Show [tier] benefits' |
| tiers.toggle.hide | Hide benefits | 20 | Mobile row control, open |

| Tier name (max 32) | Tagline (max 44) | Benefits (each max 60) |
|---|---|---|
| Platinum partner | Title partner · strategic alignment | 1. Primary logo on aircraft and UAV models<br>2. Logo and verbal thanks in official videos and key events<br>3. Priority place on flags, banners and standees<br>4. Named in reports, submissions and press releases<br>5. Direct contact with the core team and leads<br>6. Tied to flagship projects and major events |
| Gold partner | High visibility · competition presence | 1. Secondary logo on selected aircraft models<br>2. Logo on team uniforms and presentations<br>3. Shared branding on competition banners and standees<br>4. Named across events and on social media<br>5. Branding at workshops and technical events<br>6. Present at national and international competitions |
| Silver partner | Event and media visibility | 1. Logo on team uniforms<br>2. Logo on presentations and project materials<br>3. Place on team banners and shared standees<br>4. Named in event communications<br>5. Social media mentions during competitions<br>6. Visible at select AeroBMSCE events |
| Technical and ecosystem partner | Design · simulation · analysis | 1. Your tools shown in design and competition reports<br>2. Credit in technical presentations and submissions<br>3. Co-branded hands-on workshops<br>4. Logo on reports, posters and certificates<br>5. Technical banners and workshop standees<br>6. Early access to high-performing students |

Benefits are the six lines per tier on `partners.html`, shortened. No tier badge icons (WIREFRAMES W4).

## 6. Collaborators (logos)

| ID | String | Max | Source / note |
|---|---|---|---|
| eco.label | Collaborators | 24 |  |
| eco.h2 | 10 organisations we work with | 40 | Ten logos on partners.html. Confirm permission to show each (item 13) |
| eco.g1 | Design, simulation and engineering software | 48 | partners.html |
| eco.g2 | UAV hardware and components | 48 | partners.html |
| eco.g3 | Academic and research | 48 | partners.html |
| eco.drdo | DRDO: joint project, details restricted. | 60 | partners.html: confidential defence project with DRDO. Confirm it may be stated publicly (item 13) |

Logo alt text is the organisation name, max 24 each: SolidWorks, Ansys, Altair, Siemens, Flow5, SimScale, DRK Store, UAV Marketplace, DRDO, CSIR-NAL.

## 7. Final partner block

| ID | String | Max | Source / note |
|---|---|---|---|
| final.h1 | Fund our trip to Aero Design West 2027 | 44 | partners.html lists SAE International Aero Design West, 2027, as planned; sponsorship covers travel |
| final.lead | Sponsorship pays for travel, accommodation and logistics. | 70 | partners.html |
| final.cta | Partner with us | 20 | Opens the visitor's email app (mailto). No form |
| final.row.head.label | Partnership head | 20 |  |
| final.row.head.value | Rajesh [NEEDS FACT: surname] | 40 | partners.html: Rajesh (Partnership Head) |
| final.row.email.label | Email | 20 |  |
| final.row.email.value | aerobmsce@bmsce.ac.in | 40 | partners.html |
| final.row.base.label | Base | 20 |  |
| final.row.base.value | Propel Lab–3, BMS College of Engineering, Bengaluru | 56 | index.html |
| final.mailto.subject | Partnership enquiry: AeroBMSCE | 60 | mailto subject |
| final.mailto.body | Organisation:
Tier of interest:
Your name and phone: | 120 | mailto body, three lines to fill in |

## 8. Footer

| ID | String | Max | Source / note |
|---|---|---|---|
| footer.wordmark | AeroBMSCE | 12 | Text only: no light-on-dark logo file yet |
| footer.link.teams | Teams | 10 |  |
| footer.link.results | Results | 10 |  |
| footer.link.partners | Partners | 10 |  |
| footer.link.join | Join the club | 20 | [NEEDS FACT: destination, item 11] |
| footer.email.label | Email | 10 |  |
| footer.email.value | aerobmsce@bmsce.ac.in | 40 |  |
| footer.copy | © 2026 AeroBMSCE | 30 |  |
| footer.notice | Practice website for the AeroBMSCE web development recruitment task. This is not the official AeroBMSCE website. | 130 | Kept word for word from the old site. Remove only when you say so |

## 9. Error pages

| ID | String | Max | Source / note |
|---|---|---|---|
| err404.title | Page not found | 30 |  |
| err404.body | No page exists at this address. Check the link, or go to the home page. | 90 | Says what went wrong and what to do |
| err404.cta | Go to home page | 24 |  |
| err500.title | This page did not load | 30 |  |
| err500.body | Our server failed to send this page. Reload in a minute, or email aerobmsce@bmsce.ac.in. | 110 |  |
| err500.cta | Reload page | 24 |  |

## Cut from the old site (and why)

| Old text | Why it is out |
|----------|---------------|
| "One of India's longest-running competitive aerospace and UAV teams" | Superlative with no source. It could sit on any rival's site. |
| "Above gravity, beyond limits" | Motto that fits any aerospace club. Not used as copy. |
| "16+ years" | Conflicts with "established 2012" (about 14 years in 2026). |
| "75+ projects", "50+ research papers, reports and certifications", "20+ podium finishes" | Counts not confirmed (BRIEF). The dated results above replace them. |
| "20,000+ digital and 50,000+ on-ground impressions" | Not confirmed. Sponsors will check it. |
| "We have a flight-proven product ready for the world stage" | No product, no name, no number. |
| "Our vision" paragraph and "Why it matters" list | Could describe any engineering club. |
| "Our Journey & Impact" heading | Banned word: journey. |
| Mission list "Competitive aircraft and UAV design", "Talent development through real-world engineering" | Generic. Teams and results replace it. |

## [NEEDS FACT] list

| # | Missing fact | Where it blocks |
|---|--------------|-----------------|
| 1 | Event, date and aircraft name for photos 8, 2, 5, 3, 4, 6. Confirm the aircraft in photos 1 and 7. Photos 5, 6 and 8 may not be SAE events, which would break the wall heading. | Wall captions, `wall.h2` |
| 2 | The lead tile (photo8) has no documented caption. If it stays unconfirmed, pick a documented lead in the next stage. | Wall |
| 3 | Team Yaksha: one dated result or project. | `teams.1.line` |
| 4 | Confirm Team Vectors entered NITK Drone Racing 2024. Confirm Blue Impulse's 2020 title (the old site states it). | Teams |
| 5 | Confirm the 2026 Aero Design West entry flew in Fort Worth. The hero headline says "competed in Texas". | `hero.h1` |
| 6 | Dates and places for results marked [NEEDS FACT] in section 4. Correct name of the exhibition written as "lll South India Exhibition". | Results |
| 7 | Next event with a confirmed date, place and class (candidates: NACDEC 2026, ISRO IROC, NITK Drone Racing 2026). | Hero B |
| 8 | Real project count, paper count and podium count, and the true age of the club (2012 vs "16+ years"). | Not used until confirmed |
| 9 | Impression numbers (20,000+ digital, 50,000+ on-ground). | Not used until confirmed |
| 10 | Partnership head's full name and role; confirm the email is read. | Final block |
| 11 | Where "Join the club" goes, and what happens there (recruitment dates, form, email). | Hero, menu, footer |
| 12 | Tier prices, or confirm they are shared by email. | `tiers.price` |
| 13 | Permission to show each of the ten logos, and to state the DRDO project publicly. | Collaborators |
| 14 | Share-image choice and its description. | `meta.og.alt` |
| 15 | Team member names and roles, if you want people named in captions (none are used). | Wall, Teams |

## Confirm before launch (facts used from the old site)

Every result in section 4 (placings, prizes, months), the 2026 Aero Design West result, the 2012 founding year, the four team names and disciplines, the ten partner logos, the Rajesh contact and the tier benefits are copied from the old pages and are treated as true until you say otherwise.
