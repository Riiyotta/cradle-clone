# Local replica of https://www.cradle.bio (React/Vite clone in this folder)

Source: Local replica of https://www.cradle.bio (React/Vite clone in this folder)
Status: **measured-from-codebase**
99 routes · 25 templates · 97 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Blog post, Video page, Solution (biopharma / industrial)) account for 75 of 99 routes (76%). The remaining 24 routes span 22 templates.

| template | routes | share |
|---|---:|---:|
| Blog post | 53 | 54% |
| Video page | 20 | 20% |
| Solution (biopharma / industrial) | 2 | 2% |
| Modality (text hero) | 2 | 2% |
| Form page | 2 | 2% |
| Homepage | 1 | 1% |
| Platform | 1 | 1% |
| Solution (academia) | 1 | 1% |
| Modality (ticker hero) | 1 | 1% |
| Modality (text hero + problem statement) | 1 | 1% |
| Team | 1 | 1% |
| Careers | 1 | 1% |
| Lab | 1 | 1% |
| Case studies | 1 | 1% |
| Security | 1 | 1% |
| Blog index | 1 | 1% |
| Maturity report | 1 | 1% |
| Video index | 1 | 1% |
| Whitepaper | 1 | 1% |
| Press kit | 1 | 1% |
| Licensing | 1 | 1% |
| DPA | 1 | 1% |
| Link-in-bio (links) | 1 | 1% |
| Link-in-bio with form (notebook) | 1 | 1% |
| Link-in-bio with shirt hero | 1 | 1% |

## Page chrome

**1 routes carry chrome = `nav:dark / footer:blue`** — Homepage.

**5 routes carry chrome = `nav:dark / footer:dark`** — Platform, Solution (biopharma / industrial), Maturity report, Whitepaper.

**1 routes carry chrome = `nav:academia (light on phone) / footer:dark`** — Solution (academia).

**4 routes carry chrome = `nav:dark / footer:accent`** — Modality (ticker hero), Modality (text hero + problem statement), Modality (text hero).

**63 routes carry chrome = `nav:light / footer:dark`** — Team, Careers, Lab, Case studies, Form page, Blog index, Blog post, Press kit, Licensing, DPA.

**22 routes carry chrome = `nav:dark (light on phone) / footer:dark`** — Security, Video index, Video page.

**3 routes carry chrome = `none`** — Link-in-bio (links), Link-in-bio with form (notebook), Link-in-bio with shirt hero.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `chrome.navbar` | CHROME | 22 | 96 | `src/components/Navbar.jsx` | On 96 routes: every route except the link-in-bio pages (links, notebook, shirt). |
| `chrome.footer` | CHROME | 22 | 96 | `src/components/Footer.jsx` | On 96 routes: every route except the link-in-bio pages (links, notebook, shirt). |
| `content.recent-posts` | CONTENT | 2 | 54 | `src/components/blog/RecentPosts.jsx` | On 54 routes: every blog post plus /blog/maturity. |
| `hero.post` | HERO | 1 | 53 | `src/components/blog/PostParts.jsx > PostHeader` | The 53 blog post routes. |
| `content.post-body` | CONTENT | 1 | 53 | `src/components/blog/PostParts.jsx > RichText` | The 53 blog post routes. |
| `hero.video-post` | HERO | 1 | 20 | `src/components/media/shared.jsx > PosterPlayer` | The 20 video routes. |
| `product.modality-pipeline` | PRODUCT | 3 | 4 | `src/components/modality/Pipeline.jsx` | All 4 modality pages. |
| `product.feature-list` | PRODUCT | 3 | 4 | `src/components/modality/Features.jsx > FeatureList` | All 4 modality pages. |
| `product.dark-band` | PRODUCT | 3 | 4 | `src/components/modality/ModalityPage.jsx > DarkBand` | All 4 modality pages. |
| `product.product-mock` | PRODUCT | 3 | 4 | `src/components/modality/Features.jsx > ProductMock` | All 4 modality pages. |
| `product.properties-grid` | PRODUCT | 3 | 4 | `src/components/modality/Features.jsx > Properties` | All 4 modality pages. |
| `proof.modality-cases` | PROOF | 3 | 4 | `src/components/modality/Cases.jsx` | All 4 modality pages. |
| `company.teams-cards-modality` | COMPANY | 3 | 4 | `src/components/modality/TeamsCTA.jsx > Teams` | All 4 modality pages. |
| `conversion.footer-cta-blue` | CONVERSION | 3 | 4 | `src/components/modality/TeamsCTA.jsx > FooterCTABlue` | All 4 modality pages. |
| `hero.link-in-bio` | HERO | 3 | 3 | `src/components/misc/LinkInBio.jsx > BrandBlock` | The 3 link-in-bio pages. |
| `conversion.link-buttons` | CONVERSION | 3 | 3 | `src/components/misc/LinkInBio.jsx > LinkButtons` | The 3 link-in-bio pages. |
| `content.wet-lab-videos` | CONTENT | 3 | 3 | `src/components/misc/LinkInBio.jsx > WetLab` | The 3 link-in-bio pages. |
| `content.footer-graphic` | CONTENT | 3 | 3 | `src/components/misc/LinkInBio.jsx > FooterGraphic` | The 3 link-in-bio pages. |
| `hero.modality-text` | HERO | 2 | 3 | `src/components/modality/Heroes.jsx > TextHero` | The 3 text-hero modality pages (enzyme, vaccine, peptide). |
| `conversion.newsletter` | CONVERSION | 2 | 2 | `src/components/company/CareersSections.jsx > Newsletter; src/components/resources/NewsletterForm.jsx` | /careers and /case. |
| `conversion.form-placeholder` | CONVERSION | 2 | 2 | `src/components/misc/LinkInBio.jsx > FormPlaceholder` | /notebook and /shirt. |
| `hero.solution` | HERO | 1 | 2 | `src/components/solutions/SolutionHero.jsx` | The 2 solution pages (biopharma and industrial). |
| `proof.logo-ticker` | PROOF | 1 | 2 | `src/components/solutions/LogoTicker.jsx` | The 2 solution pages (biopharma and industrial). |
| `product.pipeline-benefits` | PRODUCT | 1 | 2 | `src/components/solutions/PipelineBenefits.jsx` | The 2 solution pages (biopharma and industrial). |
| `product.modality-tabs` | PRODUCT | 1 | 2 | `src/components/solutions/ModalityTabs.jsx` | The 2 solution pages (biopharma and industrial). |
| `proof.case-quote` | PROOF | 1 | 2 | `src/components/solutions/CaseQuote.jsx` | The 2 solution pages (biopharma and industrial). |
| `product.workflow-tabs-solution` | PRODUCT | 1 | 2 | `src/components/solutions/TabbedCards.jsx` | The 2 solution pages (biopharma and industrial). |
| `product.security-list` | PRODUCT | 1 | 2 | `src/components/solutions/SecurityBlock.jsx` | The 2 solution pages (biopharma and industrial). |
| `conversion.footer-cta-dark` | CONVERSION | 1 | 2 | `src/components/solutions/FooterCTADark.jsx` | The 2 solution pages (biopharma and industrial). |
| `hero.form-page` | HERO | 1 | 2 | `src/components/resources/FormPage.jsx > AvatarTrio` | The 2 form pages (get-started and contact). |
| `conversion.lead-form` | CONVERSION | 1 | 2 | `src/components/resources/LeadForm.jsx` | The 2 form pages (get-started and contact). |
| `proof.trust-ticker` | PROOF | 1 | 2 | `src/components/resources/TrustTicker.jsx` | The 2 form pages (get-started and contact). |
| `hero.home` | HERO | 1 | 1 | `src/components/Hero.jsx` | Homepage only. |
| `product.platform-tabs` | PRODUCT | 1 | 1 | `src/components/PlatformUI.jsx` | Homepage only. |
| `proof.customers` | PROOF | 1 | 1 | `src/components/Customers.jsx` | Homepage only. |
| `proof.recent-case-studies` | PROOF | 1 | 1 | `src/components/CaseStudies.jsx` | Homepage only. |
| `product.benefits-bento` | PRODUCT | 1 | 1 | `src/components/Benefits.jsx` | Homepage only. |
| `product.protein-visual` | PRODUCT | 1 | 1 | `src/components/ProteinVisual.jsx` | Homepage only. |
| `product.modalities-grid` | PRODUCT | 1 | 1 | `src/components/Modalities.jsx` | Homepage only. |
| `product.use-cases` | PRODUCT | 1 | 1 | `src/components/UseCases.jsx` | Homepage only. |
| `product.enterprise` | PRODUCT | 1 | 1 | `src/components/Enterprise.jsx` | Homepage only. |
| `company.lab-teaser` | COMPANY | 1 | 1 | `src/components/Lab.jsx` | Homepage only. |
| `content.wet-lab-posts` | CONTENT | 1 | 1 | `src/components/WetLabBlog.jsx` | Homepage only. |
| `conversion.footer-cta-home` | CONVERSION | 1 | 1 | `src/components/FooterCTA.jsx` | Homepage only. |
| `hero.platform-intro` | HERO | 1 | 1 | `src/components/platform/Intro.jsx` | /platform only. |
| `product.manifesto` | PRODUCT | 1 | 1 | `src/components/platform/Manifesto.jsx` | /platform only. |
| `proof.logo-wall` | PROOF | 1 | 1 | `src/components/platform/LogoWall.jsx` | /platform only. |
| `product.ui-collage` | PRODUCT | 1 | 1 | `src/components/platform/Collage.jsx` | /platform only. |
| `product.platform-benefits` | PRODUCT | 1 | 1 | `src/components/platform/BenefitsGrid.jsx` | /platform only. |
| `product.feature-rows` | PRODUCT | 1 | 1 | `src/components/platform/FeatureRows.jsx` | /platform only. |
| `company.teams-cards-platform` | COMPANY | 1 | 1 | `src/components/platform/Teams.jsx` | /platform only. |
| `product.workflow-tabs` | PRODUCT | 1 | 1 | `src/components/platform/TabbedCards.jsx` | /platform only. |
| `proof.quote-band` | PROOF | 1 | 1 | `src/components/platform/QuoteBand.jsx` | /platform only. |
| `content.latest-updates` | CONTENT | 1 | 1 | `src/components/platform/LatestUpdates.jsx` | /platform only. |
| `conversion.footer-cta-light` | CONVERSION | 1 | 1 | `src/components/platform/FooterCTALight.jsx` | /platform only. |
| `hero.academia` | HERO | 1 | 1 | `src/components/solutions/AcademiaHero.jsx` | /solutions/academia only. |
| `conversion.academia-form` | CONVERSION | 1 | 1 | `src/components/solutions/AcademiaForm.jsx` | /solutions/academia only. |
| `hero.modality-ticker` | HERO | 1 | 1 | `src/components/modality/Heroes.jsx > PropertyTickerHero` | Antibody modality page only. |
| `product.problem-statement` | PRODUCT | 1 | 1 | `src/components/modality/Pipeline.jsx > ProblemStatement` | Enzyme modality page only. |
| `hero.team-intro` | HERO | 1 | 1 | `src/components/company/TeamIntro.jsx` | /team only. |
| `company.offices` | COMPANY | 1 | 1 | `src/components/company/TeamSections.jsx > Offices` | /team only. |
| `company.our-team` | COMPANY | 1 | 1 | `src/components/company/TeamSections.jsx > OurTeam` | /team only. |
| `company.investors` | COMPANY | 1 | 1 | `src/components/company/TeamSections.jsx > Investors` | /team only. |
| `hero.careers` | HERO | 1 | 1 | `src/components/company/CareersSections.jsx > CareersHeader` | /careers only. |
| `company.photo-mosaic` | COMPANY | 1 | 1 | `src/components/company/CareersSections.jsx > PhotoMosaic` | /careers only. |
| `company.life-at-cradle` | COMPANY | 1 | 1 | `src/components/company/CareersSections.jsx > LifeAtCradle` | /careers only. |
| `company.open-positions` | COMPANY | 1 | 1 | `src/components/company/CareersSections.jsx > OpenPositions` | /careers only. |
| `company.scam-notice` | COMPANY | 1 | 1 | `src/components/company/CareersSections.jsx > ScamNotice` | /careers only. |
| `hero.lab` | HERO | 1 | 1 | `src/components/company/LabSections.jsx > LabHeader` | /lab only. |
| `company.aerial-photo` | COMPANY | 1 | 1 | `src/components/company/LabSections.jsx > AerialPhoto` | /lab only. |
| `company.lab-intro` | COMPANY | 1 | 1 | `src/components/company/LabSections.jsx > LabIntro` | /lab only. |
| `company.perks` | COMPANY | 1 | 1 | `src/components/company/LabSections.jsx > Perks` | /lab only. |
| `company.automation` | COMPANY | 1 | 1 | `src/components/company/LabSections.jsx > Automation` | /lab only. |
| `company.lab-team-selector` | COMPANY | 1 | 1 | `src/components/company/LabSections.jsx > MeetTheTeam` | /lab only. |
| `company.sharing-is-caring` | COMPANY | 1 | 1 | `src/components/company/LabSections.jsx > SharingIsCaring` | /lab only. |
| `hero.case` | HERO | 1 | 1 | `src/pages/Case.jsx > PressTile` | /case only. |
| `proof.case-grid` | PROOF | 1 | 1 | `src/pages/Case.jsx > CaseCard` | /case only. |
| `hero.security` | HERO | 1 | 1 | `src/pages/Security.jsx > About` | /security only. |
| `content.policy-body` | CONTENT | 1 | 1 | `src/pages/Security.jsx > PolicyItem` | /security only. |
| `hero.blog` | HERO | 1 | 1 | `src/components/blog/BlogIndexParts.jsx > BlogHeading` | /blog only. |
| `content.blog-rails` | CONTENT | 1 | 1 | `src/components/blog/BlogIndexParts.jsx > GroupRail` | /blog only. |
| `content.all-posts` | CONTENT | 1 | 1 | `src/components/blog/PostRow.jsx > PostRowIndex` | /blog only. |
| `hero.maturity` | HERO | 1 | 1 | `src/pages/BlogMaturity.jsx > Hero` | /blog/maturity only. |
| `content.maturity-report` | CONTENT | 1 | 1 | `src/pages/BlogMaturity.jsx > Framework` | /blog/maturity only. |
| `content.video-index` | CONTENT | 1 | 1 | `src/components/media/VideoIndexParts.jsx` | /video only. |
| `hero.whitepaper` | HERO | 1 | 1 | `src/components/media/WhitepaperIntro.jsx` | /whitepaper only. |
| `content.whitepaper-body` | CONTENT | 1 | 1 | `src/components/media/WhitepaperSections.jsx > FactRows` | /whitepaper only. |
| `conversion.whitepaper-cta` | CONVERSION | 1 | 1 | `src/components/media/WhitepaperSections.jsx > WhitepaperCTA` | /whitepaper only. |
| `hero.presskit` | HERO | 1 | 1 | `src/components/media/Presskit.jsx > PresskitTitle` | /presskit only. |
| `content.presskit-files` | CONTENT | 1 | 1 | `src/components/media/Presskit.jsx > PresskitFileList` | /presskit only. |
| `hero.licensing` | HERO | 1 | 1 | `src/components/misc/Licensing.jsx > LicensingHero` | /licensing only. |
| `conversion.license-tiers` | CONVERSION | 1 | 1 | `src/components/misc/Licensing.jsx > LicenseGrid` | /licensing only. |
| `product.included-list` | PRODUCT | 1 | 1 | `src/components/misc/Licensing.jsx > IncludedList` | /licensing only. |
| `proof.partners-band` | PROOF | 1 | 1 | `src/components/misc/Licensing.jsx > PartnersBand` | /licensing only. |
| `content.doc-viewer` | CONTENT | 1 | 1 | `src/components/misc/DocViewer.jsx` | /dpa only. |
| `hero.shirt` | HERO | 1 | 1 | `src/components/misc/ShirtHero.jsx` | /shirt only. |
| `proof.case-grid-compact` | PROOF | 1 | 1 | `src/components/misc/LinkInBio.jsx > CaseGrid` | /links only. |

**18 shared sections** appear in more than one template and belong in a component library.

**79 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Homepage — `template.home`

1 route · `/` · chrome: **nav:dark / footer:blue**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.home` | page-local |
| 3 | PRODUCT | `product.platform-tabs` | page-local |
| 4 | PROOF | `proof.customers` | page-local |
| 5 | PROOF | `proof.recent-case-studies` | page-local |
| 6 | PRODUCT | `product.benefits-bento` | page-local |
| 7 | PRODUCT | `product.protein-visual` | page-local |
| 8 | PRODUCT | `product.modalities-grid` | page-local |
| 9 | PRODUCT | `product.use-cases` | page-local |
| 10 | PRODUCT | `product.enterprise` | page-local |
| 11 | COMPANY | `company.lab-teaser` | page-local |
| 12 | CONTENT | `content.wet-lab-posts` | page-local |
| 13 | CONVERSION | `conversion.footer-cta-home` | page-local |
| 14 | CHROME | `chrome.footer` | shared ×22 |

### Platform — `template.platform`

1 route · `/platform` · chrome: **nav:dark / footer:dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.platform-intro` | page-local |
| 3 | PRODUCT | `product.manifesto` | page-local |
| 4 | PROOF | `proof.logo-wall` | page-local |
| 5 | PRODUCT | `product.ui-collage` | page-local |
| 6 | PRODUCT | `product.platform-benefits` | page-local |
| 7 | PRODUCT | `product.feature-rows` | page-local |
| 8 | COMPANY | `company.teams-cards-platform` | page-local |
| 9 | PRODUCT | `product.workflow-tabs` | page-local |
| 10 | PROOF | `proof.quote-band` | page-local |
| 11 | CONTENT | `content.latest-updates` | page-local |
| 12 | CONVERSION | `conversion.footer-cta-light` | page-local |
| 13 | CHROME | `chrome.footer` | shared ×22 |

### Solution (biopharma / industrial) — `template.solution`

2 routes · `/solutions/biopharma`, `/solutions/industrial` · chrome: **nav:dark / footer:dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.solution` | page-local |
| 3 | PROOF | `proof.logo-ticker` | page-local |
| 4 | PRODUCT | `product.pipeline-benefits` | page-local |
| 5 | PRODUCT | `product.modality-tabs` | page-local |
| 6 | PROOF | `proof.case-quote` | page-local |
| 7 | PRODUCT | `product.workflow-tabs-solution` | page-local |
| 8 | PRODUCT | `product.security-list` | page-local |
| 9 | CONVERSION | `conversion.footer-cta-dark` | page-local |
| 10 | CHROME | `chrome.footer` | shared ×22 |

### Solution (academia) — `template.academia`

1 route · `/solutions/academia` · chrome: **nav:academia (light on phone) / footer:dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.academia` | page-local |
| 3 | CONVERSION | `conversion.academia-form` | page-local |
| 4 | CHROME | `chrome.footer` | shared ×22 |

### Modality (ticker hero) — `template.modality-ticker`

1 route · `/modality/antibody` · chrome: **nav:dark / footer:accent**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.modality-ticker` | page-local |
| 3 | PRODUCT | `product.modality-pipeline` | shared ×3 |
| 4 | PRODUCT | `product.feature-list` | shared ×3 |
| 5 | PRODUCT | `product.dark-band` | shared ×3 |
| 6 | PRODUCT | `product.product-mock` | shared ×3 |
| 7 | PRODUCT | `product.properties-grid` | shared ×3 |
| 8 | PROOF | `proof.modality-cases` | shared ×3 |
| 9 | COMPANY | `company.teams-cards-modality` | shared ×3 |
| 10 | CONVERSION | `conversion.footer-cta-blue` | shared ×3 |
| 11 | CHROME | `chrome.footer` | shared ×22 |

### Modality (text hero + problem statement) — `template.modality-problem`

1 route · `/modality/enzyme` · chrome: **nav:dark / footer:accent**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.modality-text` | shared ×2 |
| 3 | PRODUCT | `product.problem-statement` | page-local |
| 4 | PRODUCT | `product.modality-pipeline` | shared ×3 |
| 5 | PRODUCT | `product.feature-list` | shared ×3 |
| 6 | PRODUCT | `product.dark-band` | shared ×3 |
| 7 | PRODUCT | `product.product-mock` | shared ×3 |
| 8 | PRODUCT | `product.properties-grid` | shared ×3 |
| 9 | PROOF | `proof.modality-cases` | shared ×3 |
| 10 | COMPANY | `company.teams-cards-modality` | shared ×3 |
| 11 | CONVERSION | `conversion.footer-cta-blue` | shared ×3 |
| 12 | CHROME | `chrome.footer` | shared ×22 |

### Modality (text hero) — `template.modality-text`

2 routes · `/modality/vaccine`, `/modality/peptide` · chrome: **nav:dark / footer:accent**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.modality-text` | shared ×2 |
| 3 | PRODUCT | `product.modality-pipeline` | shared ×3 |
| 4 | PRODUCT | `product.feature-list` | shared ×3 |
| 5 | PRODUCT | `product.dark-band` | shared ×3 |
| 6 | PRODUCT | `product.product-mock` | shared ×3 |
| 7 | PRODUCT | `product.properties-grid` | shared ×3 |
| 8 | PROOF | `proof.modality-cases` | shared ×3 |
| 9 | COMPANY | `company.teams-cards-modality` | shared ×3 |
| 10 | CONVERSION | `conversion.footer-cta-blue` | shared ×3 |
| 11 | CHROME | `chrome.footer` | shared ×22 |

### Team — `template.team`

1 route · `/team` · chrome: **nav:light / footer:dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.team-intro` | page-local |
| 3 | COMPANY | `company.offices` | page-local |
| 4 | COMPANY | `company.our-team` | page-local |
| 5 | COMPANY | `company.investors` | page-local |
| 6 | CHROME | `chrome.footer` | shared ×22 |

### Careers — `template.careers`

1 route · `/careers` · chrome: **nav:light / footer:dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.careers` | page-local |
| 3 | COMPANY | `company.photo-mosaic` | page-local |
| 4 | COMPANY | `company.life-at-cradle` | page-local |
| 5 | COMPANY | `company.open-positions` | page-local |
| 6 | CONVERSION | `conversion.newsletter` | shared ×2 |
| 7 | COMPANY | `company.scam-notice` | page-local |
| 8 | CHROME | `chrome.footer` | shared ×22 |

### Lab — `template.lab`

1 route · `/lab` · chrome: **nav:light / footer:dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.lab` | page-local |
| 3 | COMPANY | `company.aerial-photo` | page-local |
| 4 | COMPANY | `company.lab-intro` | page-local |
| 5 | COMPANY | `company.perks` | page-local |
| 6 | COMPANY | `company.automation` | page-local |
| 7 | COMPANY | `company.lab-team-selector` | page-local |
| 8 | COMPANY | `company.sharing-is-caring` | page-local |
| 9 | CHROME | `chrome.footer` | shared ×22 |

### Case studies — `template.case`

1 route · `/case` · chrome: **nav:light / footer:dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.case` | page-local |
| 3 | PROOF | `proof.case-grid` | page-local |
| 4 | CONVERSION | `conversion.newsletter` | shared ×2 |
| 5 | CHROME | `chrome.footer` | shared ×22 |

### Security — `template.security`

1 route · `/security` · chrome: **nav:dark (light on phone) / footer:dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.security` | page-local |
| 3 | CONTENT | `content.policy-body` | page-local |
| 4 | CHROME | `chrome.footer` | shared ×22 |

### Form page — `template.form-page`

2 routes · `/get-started`, `/contact` · chrome: **nav:light / footer:dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.form-page` | page-local |
| 3 | CONVERSION | `conversion.lead-form` | page-local |
| 4 | PROOF | `proof.trust-ticker` | page-local |
| 5 | CHROME | `chrome.footer` | shared ×22 |

### Blog index — `template.blog-index`

1 route · `/blog` · chrome: **nav:light / footer:dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.blog` | page-local |
| 3 | CONTENT | `content.blog-rails` | page-local |
| 4 | CONTENT | `content.all-posts` | page-local |
| 5 | CHROME | `chrome.footer` | shared ×22 |

### Blog post — `template.blog-post`

53 routes · `/blog/{slug}` · chrome: **nav:light / footer:dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.post` | page-local |
| 3 | CONTENT | `content.post-body` | page-local |
| 4 | CONTENT | `content.recent-posts` | shared ×2 |
| 5 | CHROME | `chrome.footer` | shared ×22 |

### Maturity report — `template.blog-maturity`

1 route · `/blog/maturity` · chrome: **nav:dark / footer:dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.maturity` | page-local |
| 3 | CONTENT | `content.maturity-report` | page-local |
| 4 | CONTENT | `content.recent-posts` | shared ×2 |
| 5 | CHROME | `chrome.footer` | shared ×22 |

### Video index — `template.video-index`

1 route · `/video` · chrome: **nav:dark (light on phone) / footer:dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | CONTENT | `content.video-index` | page-local |
| 3 | CHROME | `chrome.footer` | shared ×22 |

### Video page — `template.video-post`

20 routes · `/video/{slug}` · chrome: **nav:dark (light on phone) / footer:dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.video-post` | page-local |
| 3 | CHROME | `chrome.footer` | shared ×22 |

### Whitepaper — `template.whitepaper`

1 route · `/whitepaper` · chrome: **nav:dark / footer:dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.whitepaper` | page-local |
| 3 | CONTENT | `content.whitepaper-body` | page-local |
| 4 | CONVERSION | `conversion.whitepaper-cta` | page-local |
| 5 | CHROME | `chrome.footer` | shared ×22 |

### Press kit — `template.presskit`

1 route · `/presskit` · chrome: **nav:light / footer:dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.presskit` | page-local |
| 3 | CONTENT | `content.presskit-files` | page-local |
| 4 | CHROME | `chrome.footer` | shared ×22 |

### Licensing — `template.licensing`

1 route · `/licensing` · chrome: **nav:light / footer:dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.licensing` | page-local |
| 3 | CONVERSION | `conversion.license-tiers` | page-local |
| 4 | PRODUCT | `product.included-list` | page-local |
| 5 | PROOF | `proof.partners-band` | page-local |
| 6 | CHROME | `chrome.footer` | shared ×22 |

### DPA — `template.dpa`

1 route · `/dpa` · chrome: **nav:light / footer:dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | CONTENT | `content.doc-viewer` | page-local |
| 3 | CHROME | `chrome.footer` | shared ×22 |

### Link-in-bio (links) — `template.link-in-bio-links`

1 route · `/links` · chrome: **none**

| # | category | section | |
|---:|---|---|---|
| 1 | HERO | `hero.link-in-bio` | shared ×3 |
| 2 | CONVERSION | `conversion.link-buttons` | shared ×3 |
| 3 | PROOF | `proof.case-grid-compact` | page-local |
| 4 | CONTENT | `content.wet-lab-videos` | shared ×3 |
| 5 | CONTENT | `content.footer-graphic` | shared ×3 |

### Link-in-bio with form (notebook) — `template.link-in-bio-form`

1 route · `/notebook` · chrome: **none**

| # | category | section | |
|---:|---|---|---|
| 1 | HERO | `hero.link-in-bio` | shared ×3 |
| 2 | CONVERSION | `conversion.form-placeholder` | shared ×2 |
| 3 | CONVERSION | `conversion.link-buttons` | shared ×3 |
| 4 | CONTENT | `content.wet-lab-videos` | shared ×3 |
| 5 | CONTENT | `content.footer-graphic` | shared ×3 |

### Link-in-bio with shirt hero — `template.shirt`

1 route · `/shirt` · chrome: **none**

| # | category | section | |
|---:|---|---|---|
| 1 | HERO | `hero.shirt` | page-local |
| 2 | HERO | `hero.link-in-bio` | shared ×3 |
| 3 | CONVERSION | `conversion.form-placeholder` | shared ×2 |
| 4 | CONVERSION | `conversion.link-buttons` | shared ×3 |
| 5 | CONTENT | `content.wet-lab-videos` | shared ×3 |
| 6 | CONTENT | `content.footer-graphic` | shared ×3 |

## Section reference

### CHROME

_Site-wide navigation and footer, whose colour variant is chosen per route in src/chrome.js._

**`chrome.navbar`** — Fixed 64px top bar with the Cradle mark, Solutions/Company/Resources hover dropdowns, a Sign in control and a Discuss-your-project button; on phone it collapses to a hamburger menu. One component with dark, light and academia (green bar) variants.

· On 96 routes: every route except the link-in-bio pages (links, notebook, shirt). · appears on 96 routes · implemented by `src/components/Navbar.jsx`

**`chrome.footer`** — Columned site footer: logo, link columns, a Connect column and a legal bar. One component whose only difference between variants is the background colour (blue, dark or accent).

· On 96 routes: every route except the link-in-bio pages (links, notebook, shirt). · appears on 96 routes · implemented by `src/components/Footer.jsx`

### HERO

_Page-opening header block._

**`hero.home`** — Dark homepage hero: news pill, gradient-clipped H1, lead paragraph and two blurred blobs with scroll parallax.

· Homepage only. · appears on 1 routes · implemented by `src/components/Hero.jsx`

**`hero.platform-intro`** — Dark platform intro with a video trigger and heading that appears on load.

· /platform only. · appears on 1 routes · implemented by `src/components/platform/Intro.jsx`

**`hero.solution`** — Split hero with a 3D-tilted screenshot; accent colour green (biopharma) or sky (industrial).

· The 2 solution pages (biopharma and industrial). · appears on 2 routes · implemented by `src/components/solutions/SolutionHero.jsx`

**`hero.academia`** — Green academia hero with logo tiles and a three-row checklist.

· /solutions/academia only. · appears on 1 routes · implemented by `src/components/solutions/AcademiaHero.jsx`

**`hero.modality-ticker`** — Modality hero with scrolling property tickers.

· Antibody modality page only. · appears on 1 routes · implemented by `src/components/modality/Heroes.jsx > PropertyTickerHero`

**`hero.modality-text`** — Text-led modality hero with a video poster or molecule backdrop.

· The 3 text-hero modality pages (enzyme, vaccine, peptide). · appears on 3 routes · implemented by `src/components/modality/Heroes.jsx > TextHero`

**`hero.team-intro`** — Team page intro bento with video and data tile.

· /team only. · appears on 1 routes · implemented by `src/components/company/TeamIntro.jsx`

**`hero.careers`** — Careers page header.

· /careers only. · appears on 1 routes · implemented by `src/components/company/CareersSections.jsx > CareersHeader`

**`hero.lab`** — Lab header with a parallax lab coat and visitor badge.

· /lab only. · appears on 1 routes · implemented by `src/components/company/LabSections.jsx > LabHeader`

**`hero.case`** — Case-studies header with a press-logo grid.

· /case only. · appears on 1 routes · implemented by `src/pages/Case.jsx > PressTile`

**`hero.security`** — Dark security header with a chat-bubble letter and sticky avatar.

· /security only. · appears on 1 routes · implemented by `src/pages/Security.jsx > About`

**`hero.form-page`** — Form-page header with an avatar trio.

· The 2 form pages (get-started and contact). · appears on 2 routes · implemented by `src/components/resources/FormPage.jsx > AvatarTrio`

**`hero.blog`** — Blog heading with a blinking caret, plus a featured latest-post card.

· /blog only. · appears on 1 routes · implemented by `src/components/blog/BlogIndexParts.jsx > BlogHeading`

**`hero.post`** — Post header with title, intro, date, author chips and cover image.

· The 53 blog post routes. · appears on 53 routes · implemented by `src/components/blog/PostParts.jsx > PostHeader`

**`hero.maturity`** — Maturity report hero with an on-page table-of-contents menu.

· /blog/maturity only. · appears on 1 routes · implemented by `src/pages/BlogMaturity.jsx > Hero`

**`hero.video-post`** — Dark video hero with title and a poster-only player.

· The 20 video routes. · appears on 20 routes · implemented by `src/components/media/shared.jsx > PosterPlayer`

**`hero.whitepaper`** — 'CRADLE-1' letters with scroll parallax, blurred blobs and description.

· /whitepaper only. · appears on 1 routes · implemented by `src/components/media/WhitepaperIntro.jsx`

**`hero.presskit`** — Press kit title with a popping, shimmering icon cluster.

· /presskit only. · appears on 1 routes · implemented by `src/components/media/Presskit.jsx > PresskitTitle`

**`hero.licensing`** — Licensing hero with a logo grid.

· /licensing only. · appears on 1 routes · implemented by `src/components/misc/Licensing.jsx > LicensingHero`

**`hero.shirt`** — Dark t-shirt hero with parallax squiggles.

· /shirt only. · appears on 1 routes · implemented by `src/components/misc/ShirtHero.jsx`

**`hero.link-in-bio`** — Centred brand block (logo tile and name) opening a link-in-bio page.

· The 3 link-in-bio pages. · appears on 3 routes · implemented by `src/components/misc/LinkInBio.jsx > BrandBlock`

### PROOF

_Customer logos, testimonials, quotes and case-study listings._

**`proof.customers`** — Auto-advancing testimonial carousel with a progress bar, beside a 3x4 customer-logo grid with read-more badges.

· Homepage only. · appears on 1 routes · implemented by `src/components/Customers.jsx`

**`proof.recent-case-studies`** — Row of four case-study cards (two on phone) with image, title and hover border.

· Homepage only. · appears on 1 routes · implemented by `src/components/CaseStudies.jsx`

**`proof.logo-wall`** — Static wall of customer logos.

· /platform only. · appears on 1 routes · implemented by `src/components/platform/LogoWall.jsx`

**`proof.quote-band`** — Full-width quote revealed word by word.

· /platform only. · appears on 1 routes · implemented by `src/components/platform/QuoteBand.jsx`

**`proof.logo-ticker`** — Horizontally scrolling marquee of customer logos.

· The 2 solution pages (biopharma and industrial). · appears on 2 routes · implemented by `src/components/solutions/LogoTicker.jsx`

**`proof.case-quote`** — Single customer quote with avatar, name and role.

· The 2 solution pages (biopharma and industrial). · appears on 2 routes · implemented by `src/components/solutions/CaseQuote.jsx`

**`proof.modality-cases`** — Modality case studies: logos, a quote or a featured card, plus case cards.

· All 4 modality pages. · appears on 4 routes · implemented by `src/components/modality/Cases.jsx`

**`proof.case-grid`** — Eleven-card case grid beside a sticky subscribe card, with a subscribe modal.

· /case only. · appears on 1 routes · implemented by `src/pages/Case.jsx > CaseCard`

**`proof.trust-ticker`** — Trust-logo ticker; a static 4x2 grid on phone.

· The 2 form pages (get-started and contact). · appears on 2 routes · implemented by `src/components/resources/TrustTicker.jsx`

**`proof.partners-band`** — Partnerships band.

· /licensing only. · appears on 1 routes · implemented by `src/components/misc/Licensing.jsx > PartnersBand`

**`proof.case-grid-compact`** — Compact recent case-study grid.

· /links only. · appears on 1 routes · implemented by `src/components/misc/LinkInBio.jsx > CaseGrid`

### PRODUCT

_Explanation of the platform and its capabilities._

**`product.platform-tabs`** — Click-only tabs that crossfade three app screenshots inside a masked frame; pills on phone.

· Homepage only. · appears on 1 routes · implemented by `src/components/PlatformUI.jsx`

**`product.benefits-bento`** — 'Protein engineering 2.0' bento grid of animated mini-UIs, a video card and a radar chart.

· Homepage only. · appears on 1 routes · implemented by `src/components/Benefits.jsx`

**`product.protein-visual`** — Field of 29 frosted bubbles with four molecule tiles that drift on scroll.

· Homepage only. · appears on 1 routes · implemented by `src/components/ProteinVisual.jsx`

**`product.modalities-grid`** — Four modality cards (antibody, enzyme, peptide, vaccine) with coloured icons.

· Homepage only. · appears on 1 routes · implemented by `src/components/Modalities.jsx`

**`product.use-cases`** — Two 'explore use cases' cards with glow-on-hover shadows.

· Homepage only. · appears on 1 routes · implemented by `src/components/UseCases.jsx`

**`product.enterprise`** — Dark enterprise section with a fading background photo and a six-item feature grid.

· Homepage only. · appears on 1 routes · implemented by `src/components/Enterprise.jsx`

**`product.manifesto`** — Sentence-by-sentence manifesto reveal beside a UI screenshot that tilts upright on scroll.

· /platform only. · appears on 1 routes · implemented by `src/components/platform/Manifesto.jsx`

**`product.ui-collage`** — Parallax collage of product UI fragments.

· /platform only. · appears on 1 routes · implemented by `src/components/platform/Collage.jsx`

**`product.platform-benefits`** — Grid of platform benefit tiles.

· /platform only. · appears on 1 routes · implemented by `src/components/platform/BenefitsGrid.jsx`

**`product.feature-rows`** — Three alternating image/text feature rows that slide up on enter.

· /platform only. · appears on 1 routes · implemented by `src/components/platform/FeatureRows.jsx`

**`product.workflow-tabs`** — Learn/Generate/Review tabs whose cards cascade in on every switch.

· /platform only. · appears on 1 routes · implemented by `src/components/platform/TabbedCards.jsx`

**`product.pipeline-benefits`** — Before vs. with-Cradle pipeline animation followed by three benefit blocks (toggles, file ticker, positions illustration).

· The 2 solution pages (biopharma and industrial). · appears on 2 routes · implemented by `src/components/solutions/PipelineBenefits.jsx`

**`product.modality-tabs`** — Tabs switching between modality panels.

· The 2 solution pages (biopharma and industrial). · appears on 2 routes · implemented by `src/components/solutions/ModalityTabs.jsx`

**`product.workflow-tabs-solution`** — Workflow tabs with cascading cards, solution-page variant.

· The 2 solution pages (biopharma and industrial). · appears on 2 routes · implemented by `src/components/solutions/TabbedCards.jsx`

**`product.security-list`** — Security and compliance checklist block.

· The 2 solution pages (biopharma and industrial). · appears on 2 routes · implemented by `src/components/solutions/SecurityBlock.jsx`

**`product.problem-statement`** — Problem-statement block that precedes the pipeline.

· Enzyme modality page only. · appears on 1 routes · implemented by `src/components/modality/Pipeline.jsx > ProblemStatement`

**`product.modality-pipeline`** — 'What if' copy plus a pipeline bar that shrinks when fully in view and replays on return.

· All 4 modality pages. · appears on 4 routes · implemented by `src/components/modality/Pipeline.jsx`

**`product.feature-list`** — Feature list whose items replay on scroll.

· All 4 modality pages. · appears on 4 routes · implemented by `src/components/modality/Features.jsx > FeatureList`

**`product.dark-band`** — Dark interstitial band between features and the product mock.

· All 4 modality pages. · appears on 4 routes · implemented by `src/components/modality/ModalityPage.jsx > DarkBand`

**`product.product-mock`** — Product video or image that scales up as it scrolls into view.

· All 4 modality pages. · appears on 4 routes · implemented by `src/components/modality/Features.jsx > ProductMock`

**`product.properties-grid`** — Grid of optimisable protein properties.

· All 4 modality pages. · appears on 4 routes · implemented by `src/components/modality/Features.jsx > Properties`

**`product.included-list`** — 'Included in all licenses' checklist.

· /licensing only. · appears on 1 routes · implemented by `src/components/misc/Licensing.jsx > IncludedList`

### COMPANY

_Team, offices, hiring and lab content._

**`company.lab-teaser`** — Homepage teaser for the Cradle wet lab: photo plus short text and a button.

· Homepage only. · appears on 1 routes · implemented by `src/components/Lab.jsx`

**`company.teams-cards-platform`** — Photo cards describing who uses the platform, with check badges.

· /platform only. · appears on 1 routes · implemented by `src/components/platform/Teams.jsx`

**`company.teams-cards-modality`** — Photo cards describing teams who use this modality.

· All 4 modality pages. · appears on 4 routes · implemented by `src/components/modality/TeamsCTA.jsx > Teams`

**`company.offices`** — Sticky 'our offices' section with office cards and a static weather pill.

· /team only. · appears on 1 routes · implemented by `src/components/company/TeamSections.jsx > Offices`

**`company.our-team`** — Team members grouped as photo pills with bio tooltips.

· /team only. · appears on 1 routes · implemented by `src/components/company/TeamSections.jsx > OurTeam`

**`company.investors`** — Investors and advisors grid.

· /team only. · appears on 1 routes · implemented by `src/components/company/TeamSections.jsx > Investors`

**`company.photo-mosaic`** — Mosaic of office and team photos that load in.

· /careers only. · appears on 1 routes · implemented by `src/components/company/CareersSections.jsx > PhotoMosaic`

**`company.life-at-cradle`** — Life-at-Cradle video poster plus interview rows.

· /careers only. · appears on 1 routes · implemented by `src/components/company/CareersSections.jsx > LifeAtCradle`

**`company.open-positions`** — Open positions list (placeholder rows in the clone).

· /careers only. · appears on 1 routes · implemented by `src/components/company/CareersSections.jsx > OpenPositions`

**`company.scam-notice`** — Recruitment-scam warning band.

· /careers only. · appears on 1 routes · implemented by `src/components/company/CareersSections.jsx > ScamNotice`

**`company.aerial-photo`** — Aerial lab photo that scales down on scroll.

· /lab only. · appears on 1 routes · implemented by `src/components/company/LabSections.jsx > AerialPhoto`

**`company.lab-intro`** — Lab intro text with a circle that draws itself on enter.

· /lab only. · appears on 1 routes · implemented by `src/components/company/LabSections.jsx > LabIntro`

**`company.perks`** — Lab perks list.

· /lab only. · appears on 1 routes · implemented by `src/components/company/LabSections.jsx > Perks`

**`company.automation`** — Blue automation section with a background video and four post cards.

· /lab only. · appears on 1 routes · implemented by `src/components/company/LabSections.jsx > Automation`

**`company.lab-team-selector`** — Click-to-select lab team member viewer.

· /lab only. · appears on 1 routes · implemented by `src/components/company/LabSections.jsx > MeetTheTeam`

**`company.sharing-is-caring`** — Floating post cards that pop in on enter.

· /lab only. · appears on 1 routes · implemented by `src/components/company/LabSections.jsx > SharingIsCaring`

### CONTENT

_Editorial and document bodies, such as articles, lists and policy text._

**`content.wet-lab-posts`** — Four 'learnings from our wet lab' blog cards.

· Homepage only. · appears on 1 routes · implemented by `src/components/WetLabBlog.jsx`

**`content.latest-updates`** — Sticky-title 'latest updates' list of recent posts.

· /platform only. · appears on 1 routes · implemented by `src/components/platform/LatestUpdates.jsx`

**`content.policy-body`** — Long policy body with sticky H4 headings (placeholder paragraphs).

· /security only. · appears on 1 routes · implemented by `src/pages/Security.jsx > PolicyItem`

**`content.blog-rails`** — Three post rails (case studies, news, meet the team) and the maturity promo card.

· /blog only. · appears on 1 routes · implemented by `src/components/blog/BlogIndexParts.jsx > GroupRail`

**`content.all-posts`** — Date-sorted list of all posts beside a sticky subscribe card, followed by a newsletter band.

· /blog only. · appears on 1 routes · implemented by `src/components/blog/PostRow.jsx > PostRowIndex`

**`content.post-body`** — Rich-text article body (placeholder copy) exercising h2/h3/list/quote/table/callout.

· The 53 blog post routes. · appears on 53 routes · implemented by `src/components/blog/PostParts.jsx > RichText`

**`content.recent-posts`** — Recent-posts row of post cards.

· On 54 routes: every blog post plus /blog/maturity. · appears on 54 routes · implemented by `src/components/blog/RecentPosts.jsx`

**`content.maturity-report`** — Interactive maturity ladder, ledger, framework, coloured strand bands and common patterns (placeholder paragraphs).

· /blog/maturity only. · appears on 1 routes · implemented by `src/pages/BlogMaturity.jsx > Framework`

**`content.video-index`** — Video index with a locally filtered category select, video rows and Load More.

· /video only. · appears on 1 routes · implemented by `src/components/media/VideoIndexParts.jsx`

**`content.whitepaper-body`** — Whitepaper video poster and four fact rows.

· /whitepaper only. · appears on 1 routes · implemented by `src/components/media/WhitepaperSections.jsx > FactRows`

**`content.presskit-files`** — Three press file lists (download items are inert).

· /presskit only. · appears on 1 routes · implemented by `src/components/media/Presskit.jsx > PresskitFileList`

**`content.doc-viewer`** — Scrolling document viewer of 17 placeholder pages.

· /dpa only. · appears on 1 routes · implemented by `src/components/misc/DocViewer.jsx`

**`content.wet-lab-videos`** — Wet-lab video cards (poster only).

· The 3 link-in-bio pages. · appears on 3 routes · implemented by `src/components/misc/LinkInBio.jsx > WetLab`

**`content.footer-graphic`** — Footer graphic that slides up on enter.

· The 3 link-in-bio pages. · appears on 3 routes · implemented by `src/components/misc/LinkInBio.jsx > FooterGraphic`

### CONVERSION

_Calls to action, lead forms and newsletter capture._

**`conversion.footer-cta-home`** — Closing call-to-action band with a two-tone heading, buttons and sliding app screens.

· Homepage only. · appears on 1 routes · implemented by `src/components/FooterCTA.jsx`

**`conversion.footer-cta-light`** — Light closing call-to-action band with sliding screens.

· /platform only. · appears on 1 routes · implemented by `src/components/platform/FooterCTALight.jsx`

**`conversion.footer-cta-dark`** — Dark closing call-to-action band with sliding screens.

· The 2 solution pages (biopharma and industrial). · appears on 2 routes · implemented by `src/components/solutions/FooterCTADark.jsx`

**`conversion.academia-form`** — Static local application form (submit is inert).

· /solutions/academia only. · appears on 1 routes · implemented by `src/components/solutions/AcademiaForm.jsx`

**`conversion.footer-cta-blue`** — Blue closing call-to-action band with sliding screens.

· All 4 modality pages. · appears on 4 routes · implemented by `src/components/modality/TeamsCTA.jsx > FooterCTABlue`

**`conversion.newsletter`** — Static local newsletter signup band (submit is inert).

· /careers and /case. · appears on 2 routes · implemented by `src/components/company/CareersSections.jsx > Newsletter; src/components/resources/NewsletterForm.jsx`

**`conversion.lead-form`** — Static local lead form card (submit shows a thanks state).

· The 2 form pages (get-started and contact). · appears on 2 routes · implemented by `src/components/resources/LeadForm.jsx`

**`conversion.whitepaper-cta`** — Whitepaper closing call to action with side sheets.

· /whitepaper only. · appears on 1 routes · implemented by `src/components/media/WhitepaperSections.jsx > WhitepaperCTA`

**`conversion.license-tiers`** — License tier cards.

· /licensing only. · appears on 1 routes · implemented by `src/components/misc/Licensing.jsx > LicenseGrid`

**`conversion.link-buttons`** — Stack of link buttons; same-site ones navigate, external ones are inert.

· The 3 link-in-bio pages. · appears on 3 routes · implemented by `src/components/misc/LinkInBio.jsx > LinkButtons`

**`conversion.form-placeholder`** — Empty form box at the measured size where the live page embeds a form.

· /notebook and /shirt. · appears on 2 routes · implemented by `src/components/misc/LinkInBio.jsx > FormPlaceholder`
