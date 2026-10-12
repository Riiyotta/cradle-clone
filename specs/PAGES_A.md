Source: https://www.cradle.bio/

# Cradle secondary pages (set A): clone spec

Measured 2026-10-12 on the live site with Playwright (Chromium) at 1440×900 and 390×844 (mobile emulation). All values are `getComputedStyle` / `getBoundingClientRect` readings; coordinates are document-space `[x, y, w, h]`. Appear-on-load configs are copied verbatim from Framer's `__framer__appearAnimationsContent`; in-view, scroll-linked and hover motion was sampled frame-by-frame (requestAnimationFrame) and is approximate where noted. Full-page 1440 screenshots: `reference/pages/<slug>-1440.png` (cookie banner hidden).

This file extends `CLONE_SPEC.md`. **Read its §0 first.** Token names, typography roles (Section H2, H3, H4, H5, Eyebrow, Lead, Body, Quote, Footer…), fonts, breakpoints (`md: 810px`, `lg: 1200px`), and the button components (Primary36, Secondary36, Primary48, Secondary48) are reused as named there. Values below are only repeated when a page deviates.

Copy rule used here: short UI text is verbatim in backticks; long paragraphs are given as "~N words, L lines" and should be placeholder text. Links: same-site targets are given as the live relative path (`./x` or `../x` resolve to `/x`); anything on another domain is marked **EXTERNAL** and should be removed or pointed at a local route in the clone.

---

## G0. Every page

- **Navbar** (§1) and **Footer** (§13 footer) are identical on all 15 pages at both widths (same links, same mobile variant; footer 499.2 tall at 1440, 1086 at 390). Reuse unchanged.
- The cookie banner (third-party) appears on every page; ignore it as in §13.
- There are **no CSS keyframes or CSS transitions** on any of these pages (checked per page); all motion is framer-motion JS, except link colour hovers which are instant.
- Page backgrounds: body white. Solution pages wrap their content in a `#030712` `main`, so un-coloured sections there are dark.

## G1. Shared components reused from the homepage (do not re-spec)

| homepage component | used on |
|---|---|
| Navbar, Footer | all |
| Primary36/Secondary36/Primary48/Secondary48 buttons (incl. hover `#1b3ada` and gradient hover) | all |
| Footer-CTA structure (§13: H1 two-tone + button wrapper + 3-screen fan + gradient band + slide-up motion) | platform (light variant), biopharma, industrial (dark variant), antibody, enzyme, vaccine, peptide (blue variant) |
| Eyebrow (word-stagger reveal, no square on these pages) | modality pages "SELECTED PROPERTIES", "CASE STUDIES" |
| Case-study card (§5: 302 wide, 4px `#2d66f8` hover ring, title hover `#030712`) | modality/antibody, modality/enzyme |
| Customer logos (`public/assets/customer-logo-*.svg`, opacity .6) | platform, modality pages, case |
| UI screenshots `ui-round.png`, `ui-data.png`, `ui-report-cta.png` | platform, footer CTAs, team |
| Grid pattern `benefits-grid-pattern.svg` | biopharma, industrial, antibody, vaccine, team |
| Blog/case images `case-*.png`, `blog-*.jpg/png` | modality pages, case, careers, lab |

## G2. New tokens / text roles seen on these pages

| role | value |
|---|---|
| InlineLink | inherits paragraph type; color `#0284c7`, hover `#0ea5e9` (instant) |
| MutedLink (inline in leads) | color `#616e80`, hover `#29333c` |
| PolicyLink (/security) | `#0099ff`, underline |
| CardTitle | Inter 16/20.8/normal/600 `#1f2937` (white on dark); phone 14/18.2 |
| H1 display (modality hero) | Rethink Sans 80/76/-3.2/500 → phone 40/38/-1.6 |
| H1 "what if" | Rethink Sans 44/44/-0.88/**600** → phone 28/28/-0.56 |
| H2 quote / intro H3 spans | Rethink Sans 48/48/-1.92/500 (quote) and 48/57.6/-0.96 (solution intro) |
| Muted lead on dark | `#9ca3af` (modality hero/"what if" leads) |
| SlashEyebrow | Spot Mono 18/24/1.08 uppercase: `/` in `#2d66f8` + label (white or `#effaf1`) |
| IconEyebrow | 28×28 tile radius 6 in accent colour + white glyph + white Eyebrow label |
| Case tag | Inter 11/14.3/-0.44/700 uppercase `#9ca3af` (phone 9/11.7/1.08) |
| Role tag (team) | Inter 10/10/0.5/700 white on `#9ca3af` |
| BETA badge | Inter 9/800/0.72 white on `#9ca3af`, radius 4 |
| Accent per modality | antibody/biopharma/vaccine/peptide green `#3cab57` (+ `#61c779`, `#266f38`); enzyme/industrial sky `#0ea5e9` (+ `#38bdf8`, `#0284c7`, `#082f49`) |
| Other new colours | `#1d2e8b` (security bubbles), `#f1f6d1`/`#20290a`/`#49581c` (careers notice), `#1f5f36`/`#1e5e35` (academia), `#0151f8` (HubSpot submit), `#111827` (illustration tiles) |
| Fonts | no new families except **"Inter var"** in the /team weather widget (fall back to Inter). Crimson Pro Regular is used for modality-page quotes (already in §15). |

## G3. New shared components (build once, reuse)

| component | where | spec section |
|---|---|---|
| CheckBadge (32px circle-check, white-translucent or green) | platform, modality teams, solution security | /platform P1, P7 |
| VideoTrigger / VideoCard (thumbnail + glass play button) | platform hero, lab automation | /platform P1, /lab L5 |
| FeatureRow (image tile + text, alternating) | platform | /platform P6 |
| PhotoCard (mirrored photo, gradient overlay, glowing dot label, optional button) | platform, all modality pages | /platform P7, /modality/antibody M7 |
| TabbedCards (Learn/Generate/Review pills + 3 cards, spring cascade) | platform, biopharma, industrial | /platform P8 |
| QuoteBand / CaseQuote / Testimonial cards | platform, solutions, modality | /platform P9, /solutions/biopharma B5, /modality/vaccine V4 |
| StickyTitleRow (sticky left heading + right column) | platform P10, team, careers, security | /careers |
| FooterCTA variants `light` / `dark` / `blue` | see G1 | /platform P11, /solutions/biopharma B8, /modality/antibody M8 |
| LogoTicker (horizontal marquee) and TrustTicker | biopharma, industrial, get-started, contact | /solutions/biopharma B2, /get-started G3 |
| PipelineCompare (before/with-Cradle stage bars, compress animation) | biopharma, industrial, all modality pages | /solutions/biopharma B3 |
| ToggleStack, FileTicker (vertical marquee), PositionStack illustrations | biopharma, industrial | /solutions/biopharma B3 |
| ModalityTabs (icon tabs + 2-col item grid + CTA card) | biopharma, industrial | /solutions/biopharma B4 |
| SecurityBlock (check list + image) | biopharma, industrial | /solutions/biopharma B7 |
| PropertyTicker hero (4 marquee rows + icon tile) | antibody | /modality/antibody M1 |
| FeatureList (in-view replay blocks) | modality pages | /modality/antibody M3 |
| ProductMock (glass frame + scroll-scaled video/image) | modality pages | /modality/antibody M4 |
| PropertiesGrid (dark, eyebrow + H2 + buttons + 4–5 col grid) | modality pages | /modality/antibody M5 |
| FeaturedCaseCard | vaccine, peptide | /modality/vaccine V4 |
| FormCard (HubSpot shell; static local form in the clone) | academia, get-started, contact | /solutions/academia A2 |
| PersonPill + bio tooltip, OfficeCard | team | /team |
| InterviewRow, scam notice band, MailerLite newsletter form | careers, case | /careers |
| CaseCard (grid) + sticky subscribe card + subscribe modal | case | /case |
| LabTeamSelector, FloatingPostCard, VisitorBadge, draw-on circle | lab | /lab |
| ChatBubble letter | security | /security |

## G4. Motion patterns (summary; details in each page)

| pattern | spec |
|---|---|
| Appear-on-load (exact Framer configs) | per page; typical: opacity .001→1 + y 20→0, spring 0.8 bounce 0 (modality heroes) or tween 0.3–0.4s ease `[0.12,0.23,0.19/0.5,1]` |
| Word/letter reveal | quote words: y 10→0, ≈0.2–0.4s each, stagger 50–75ms; platform manifesto: per sentence 0.5s, stagger 0.2s |
| Block fade-up in view | y 40 (or 8) →0, 0.4s ease-out, once |
| In-view replay | modality feature blocks (y 20, ≈0.4s, reverse on leave); solution toggle pills; pipeline compress |
| Spring card cascade | TabbedCards: y 30→0, spring 0.6 bounce 0.1, delays 0.1/0.2/0.3 |
| Marquees | biopharma/industrial logos ≈50 px/s; trust logos ≈20 px/s; antibody property rows 20–40 px/s; file list ≈15 px/s upward |
| Scroll-linked | platform UI tilt (perspective/rotateX 8→0, scale .95→1, opacity .5→1), platform collage parallax (−0.07/−0.04 × scrollY), modality product mock scale .7→1, peptide image pop .4→1, lab coat +0.2×scrollY and aerial photo scale 1.2→1, peptide molecule backdrop |
| Footer-CTA screens | middle → right (+0.1s) → left (+0.2s), 0.8s back-ease `cubic-bezier(0.7,-0.35,0.3,1.1)`, y 80 (phone 40) |
| Hovers | buttons as §0; image scale 1.02 (case cards, featured case) or 1.05 (lab floating cards); row/tile background plates; ≈80–100ms |

## G5. Not captured / caveats (all pages)

- **Tablet (810–1199)** not measured.
- **Third-party embeds** are not reproducible and were measured only from the outside (plus field lists where the iframe was same-origin-readable): HubSpot forms (academia, get-started, contact), MailerLite newsletter (careers, case modal/sidebar), Mave video players (enzyme hero, careers), the /team live weather widget, and the /careers Ashby jobs list, which **failed to load in every attempt** (no job titles captured).
- **Interactive states not opened**: biopharma/industrial ModalityTabs other than the default tab (Peptides/Vaccines, Binders/Peptides copy not captured); lab team selector on phone; team-group info-icon tooltips; video-trigger modals (clicking produced nothing measurable); subscribe-modal and tooltip open/close timings.
- In-view/scroll-linked easing curves are fitted from samples; only appear-on-load configs are exact.
- Long body copy is intentionally not transcribed (word counts given).
- Mobile menu and footer are as in CLONE_SPEC.md (not re-measured in depth).
- Live-site bugs noted inline (industrial "See benefits" → biopharma anchor; leftover antibody labels in enzyme/peptide/industrial phone pipelines; broken `https://obal He` link; Boston address duplicate on /team phone; security/vaccine/peptide phone overflow).

---

# /platform

Title `The AI protein engineering software built for scientists`. Doc height 13366 (1440) / 12080 (390). Screenshot `reference/pages/platform-1440.png`.
Order: Navbar (shared) · P1 Intro (dark video hero) · P2 Manifesto + tilted UI · P3 Logo wall · P4 Floating UI collage · P5 Benefits grid · P6 "Three ways" header + 3 alternating feature rows · P7 Teams (2 dark photo cards) · P8 Workflow tabs · P9 Quote · P10 Latest updates (sticky H2) · P11 Footer CTA **light variant** (`FooterCTALight`) · Footer (shared).

## P1 Intro (`intro`), desktop
- Section 1440×900, bg `#030712`, padding-top 80, overflow clip, column center.
- Background video (absolute, x=310, 1440×900, `object-fit:cover`, autoplay muted loop, no poster) `intro-yChT7D.mp4`, wrapper opacity **0.2**, `filter:grayscale(0)`.
- Mask overlay (z2, full section): `radial-gradient(56% 42% at 74.5% 50%, rgba(3,7,18,0) 0%, rgba(3,7,18,.5) 42%, #030712 100%)`.
- Content box (z2) `[80,80,1280,820]`, max-w 1280, column, `justify-content:flex-end`, gap 40, padding `80px 80px 60px`.
  - Text stack (gap 24):
    - Kicker `/ Our platform`: Inter 16/25.6/-0.32/500 `rgba(255,255,255,.8)`; the "/" is `#2d66f8`. (New role **SlashKicker**.)
    - H2 `The AI protein engineering software built for scientists`: Section H2 (64/64/-2.56/500) white, max-w 60% (672 wide, 3 lines).
    - Lead (Inter 20/30/-0.8/500 `rgba(255,255,255,.8)`, max-w 520), ≤25 words: `Cradle makes it easy for scientists to train and run protein AI that produces successful candidates 2 - 12x faster than traditional workflows.`
    - Check row (gap 16): two items (gap 4) = **CheckBadge** 32×32 (22×22 circle `rgba(255,255,255,.2)` centered + 11×9 white check stroke 2, round caps, path `M1 5 L4 8 L9.5 1`) + Inter 16/25.6/normal/500 `rgba(255,255,255,.8)`: `Wet lab validated AI` (word "validated" underlined), `Used by leading R&D teams` ("leading R&D teams" underlined).
  - Divider 1px `rgba(255,255,255,.08)` full width (1120).
  - Bottom row (h80, gap 24, center):
    - **VideoTrigger** 116×80: padding 4, bg `#030712`, radius 12, inner border 4px `rgba(255,255,255,.24)` (::after). Thumbnail 108×72 radius 8 `video-trigger-evbqum.png`, mask `linear-gradient(#000 0%, rgba(0,0,0,.9) 100%)`. Centered play button 40×40 radius 100, bg `linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.08))`, 1px border `rgba(255,255,255,.08)`, `backdrop-filter:blur(5px)`, 20×20 play icon `inline-video-trigger-d14d23.svg`. cursor pointer. Clicking it opened nothing measurable headless (no modal/iframe appeared); treat as non-interactive or a placeholder modal.
    - Text column (flex 1, gap 8): `Introducing Cradle` Inter 16/20.8/600 white; `2 minutes` Inter 16/19.2/400 white at opacity .5.
    - Secondary36 (padding `0 16px`, bg white) `Explore platform` → `./platform#intro`.
- Phone: section 390×844, no top padding; video box 390×506 at top; mask `radial-gradient(138% 42% at 48.3% 50%, …same stops)` 390×514. Content padding `50px 20px 120px`, gap 20, flex-end. Kicker 14/22.4/-0.28. Title is an **H1** 40/40/-1.6 white (350 wide, 3 lines). Lead 16/24/-0.64. Check items stack vertically (14/22.4). Divider at y=623. Bottom row: thumbnail 108×72 + text (`Introducing Cradle` 14/18.2/600) ; the "Explore platform" button is hidden on phone.
- Motion (appear on load, exact Framer config): video wrapper `1tnjmep` opacity .001→0.2, scale 1.2→1, tween 0.7s, delay 0.2s, ease `[0.12,0.23,0.5,1]`. Content `ce4w03` opacity .001→1, y 20→0, spring duration 0.8 bounce 0.2, delay 0.6.

## P2 Manifesto + tilted UI (`Variant 1` desktop / `mobile1` phone)
- Section 1440×1600, bg `#030712`, padding `0 80px 20px`, column `justify-content:space-between`, align center, overflow clip, z2.
- Top fade: absolute 1440×200 `linear-gradient(#030712 0%, rgba(3,7,18,0) 100%)`.
- Manifesto block (z2, max-w 440, 928.6 tall, column centered) with mask `linear-gradient(0deg, #000 50%, rgba(0,0,0,.6) 100%)`. One H4, center, Rethink Sans **28/33.6/normal/500** white (spans), eight short lines (verbatim): `Endless cycles. Slow progress.` / `Money, time, wells — wasted.` / `"This is how it's always been…" you keep hearing.` (the quoted part italic) / `For decades, it held true.` / `Today, it changes.` / `Scientists, meet Cradle.` (rendered 12 lines at 440 wide, text block at y≈1196–1532).
- UI frame (`content`, max-w 1280, gap 40) at y=1828: `ui` box max-w 1140, aspect 1.75, radius 24, z2, mask `linear-gradient(0deg, transparent 0%, #000 80%)`, contains `round` screenshot (`ui-round.png` existing homepage asset, rendered 1183.7×677.6, radius `12 12 0 0`, shadow `rgba(22,31,85,.16) 0 1px 8px 0`, object-position `50% 0`).
- Bottom fade: absolute at y=1939, 1440×561 `linear-gradient(rgba(249,250,251,0), #f9fafb)` (section blends into P3's `#f9fafb`).
- Phone: section 390×1033.7, padding `0 8px 20px`, `justify-content:center`. Manifesto H4 16/19.2 (spans 16px) in a 374×800 block, 13 lines. UI image 344×208.6 radius `6 6 0 0`.
- Motion:
  - Manifesto reveal (in-view, once): text is split into letter spans, but whole sentences animate together. Each sentence: opacity .001→1, y 10→0, ≈0.5s ease-out. Sentences stagger **0.2s** (sentence 1 starts ≈25ms after entering, last starts +1.2s). Same on phone.
  - UI tilt (scroll-linked, spring-smoothed): style at start `perspective(500px) translateY(40px) scale(.95) rotateX(8deg)`, opacity .5 → end `none`, opacity 1. Progress 0 at scrollY≈930 (UI top just below the viewport bottom) to 1 at scrollY≈1580 at 1440×900 (linear map, then ~0.5s smoothing). Phone: same values, completes by scrollY≈1200.

## P3 Logo wall (`section`)
- 1440×549, padding `20px 80px 80px`, bg `linear-gradient(#f9fafb 50%, #fff 100%)`, z2. Content max-w 1280, gap 80.
- Top (gap 40, centered): H1 `The AI engineering platform for biology` Rethink Sans 72/72/-2.88/500 `#030712` center (2 lines, 1280 wide). Lead (center, max-w 640) ≤25 words: `Scientists in pharma and industrial bio use Cradle to shorten protein R&D timelines up to 12x while growing overall pipeline success.`
- Logo grid 1040 wide: 5 columns × 192, row gap 41, column gap 20, 2 rows. Each cell row-flex centered; logo box max-w 117, height 42 (aspect from file), `object-fit:contain`, **opacity .6**. Logos (all already in `public/assets`, homepage customer logos): row 1 `suE7e8…`, `RzFCW4…`, `NNOIC4…`, `5a0pQd…`, `WWPHAL…`; row 2 `yffefa…`, `VJNMk7…` (illumina), `Mleuk…`, `9BailN…` (Lundbeck), `fG7WNP…`. Map by hash to `public/assets/MANIFEST.md`.
- Phone: padding `20px 20px 40px`, gap 40. H2 32/35.2/-0.64 center (the tag is H2 on phone). Lead 16/24/-0.64. Grid 3 cols × 103.3, gap 41/20, logos 97 wide; only 9 logos (the 10th, `fG7WNP…`, is not shown).
- No motion.

## P4 Floating UI collage (no name)
- 1440×427, bg white, padding `40px 80px 0`. Inner row max-w 1040, 387 tall, centered.
- `ui` 600×387 radius 21, overflow hidden, holds `data` screenshot (`ui-data.png`, existing) at offset (20,20), 633×398, radius `8 8 0 0`, 1px border `rgba(0,0,0,.08)`, mask `linear-gradient(336deg, transparent 35%, #000 78%)`.
- `Wetlab` photo card (abs, z3) 160×220 at x=360 (overlaps UI left-bottom, top at 3366 i.e. 277px below the row top before parallax), radius 16, shadow `rgba(0,0,0,.08) 0 1px 8px 0`, image `wetlab-riCniX.png` cover.
- `3d` card (abs, z3) 200×151 at x=925 (right edge), radius 16, bg `linear-gradient(#1f2937, #000)`, 1px border `rgba(255,255,255,.2)`, contains a 130×96 cluster of 29 "bubble" dots (20×20, radius 50, bg `rgba(255,255,255,.6)`, inset shadow `rgba(156,163,175,.32) 0 0 16px`, `backdrop-filter:blur(2px)`) forming a molecule shape (3 hidden extra dots at opacity 0). Positions relative to the cluster origin (x,y): (18,28) (33,18) (33,28) (48,23) (47,37.6) (52.7,0) (28,37.6) (38,46) (57.3,28) (60.2,10) (63,43) (75,53) (87,43) (95,30) (28,58) (38,71) (13,61) (10,18) (80,61) (93,53) (105,43) (0,28) (70,33.4) (45,10) (70,40.1) (43,58) (85,76) (95,66) (110,30).
- Phone: 390×216, padding `40px 20px 0`; UI 280×176 (radius 4 top); Wetlab 64×88 radius 6 at x=19; 3d 85×64 radius 7 at x=284.5.
- Motion:
  - Desktop: Wetlab and 3d fade/scale in on enter (opacity 0→1, scale .95→1 (Wetlab) / .9→1 (3d), ≈0.7s) **and** a continuous scroll parallax: translateY = −0.07·scrollY (Wetlab) and −0.04·scrollY (3d), measured as −168/−96 at scrollY 2400, linear.
  - Phone: no parallax; Wetlab opacity 0→1, y 20→0, scale .95→1, 0.7s; 3d y 30→0, scale .9→1, 0.7s, starting 0.2s later.

## P5 Benefits grid
- 1440×744.7, bg white, padding `120px 80px`. Grid `scale` max-w 960: 2 cols × 440, column gap 80, row gap 20.
- Each item (column gap 20): H4 (24/28.8/500 `#030712`), Body paragraph (16/25.6), then link line(s) (Body size, link color `#0284c7`, hover `#0ea5e9`, instant; new role **InlineLink**):
  1. `Save months of R&D time` + ≤25 words `Customers achieve 2-12x speedups across 50+ programs. We help you reach your targets in fewer rounds by solving complex trade-offs faster.` + `See case studies` → ./blog
  2. `Higher program success` + paragraph (~22 words, 3 lines) + `See case studies` → ./blog
  3. `Built for scientists` + paragraph ~29 words, 4 lines + `Explore Biopharma` → ./solutions/biopharma, `Explore Industrial Bio` → ./solutions/industrial (gap 20)
  4. `Wet lab verified AI` + paragraph ~26 words, 4 lines + `Learn more` → ./lab
- Phone: padding `20px 20px 120px`, single column gap 40, item gap 12, H4 18/21.6, body 14/22.4.

## P6 "Three ways" header + feature rows
- Header section: 1440×348, padding `120px 80px 0`, 1px top border `rgba(0,0,0,.04)`, gap 40. H2 `Three ways AI unlocks faster R&D timelines` (64, center, 2 lines). Lead center max-w 640: `See how Cradle handles multiple complex objectives in parallel, adapts to your data and automatically de-risks every plate.`
- Three `ui` rows (**FeatureRow**). Row inner max-w 1080, row flex gap 80, 400 tall. Image card 576×400, radius 24, bg `linear-gradient(#f9fafb, #fff)`, image 509.8×400 centered (`object-fit:cover`). Text column 384 wide (max-w 500, gap 20): H4 (24/28.8, 2 lines) + body paragraph.
  1. padding `80px`, inner padding-right 40; image left `ui-Ty4HuN.png`; `Solves property trade-offs simultaneously with AI` + paragraph ~39 words (7 lines).
  2. padding `0 80px 80px`, inner padding-left 40; image **right** `ui-hMhVEl.png`; `Use AI to learn from your unique experimental data` + ~48 words (7 lines).
  3. padding `0 80px 160px`, bottom border 1px `rgba(0,0,0,.04)`; image left `ui-F0OA2Y.png` with mask `linear-gradient(270deg, transparent .75%, #000 25%)`; `AI that designs de-risked plates by default` + ~42 words (6 lines).
- Phone: header padding `80px 40px 0`, gap 20, H2 32/35.2, lead 16/24. Rows stack image (350×274.6, radius 16) above text (gap 40), padding `40px 20px 60px` (first) / `0 20px 60px`; H4 18/21.6; body 14/22.4. Row 2 keeps text-first DOM order but renders the image on top (`order`).
- Motion: each row inner block slides up on enter: y 40→0 (phone 8→0), opacity stays 1, 0.4s ease-out, once.

## P7 Teams (`teams`)
- 1440×1160, bg white, padding `120px 80px 160px`. Inner max-w 1080, gap 80.
- Header (gap 40, center): H2 `All your teams in one workspace` (64, gradient text `linear-gradient(270deg, #1f2937 0%, #030712 100%)` clipped), lead max-w 680 center (≤25 words): `With everyone in the same workspace, results compound across your organization. Same data. Same models. Same learning loop. New results.` Check row (gap 24, centered): 3 × **CheckBadge-green** (32×32 with 22×22 `#3cab57` circle + white check `inline-end-6be8c4.svg`) + Body text (gap 6): `API and Web Interface`, `Granular access controls`, `Unlimited seats`.
- Cards row (gap 10, centered): two **PhotoCard**s 480×500, padding 40, radius 24, column `space-between`, overflow clip:
  - Background photo: 587.5×625 abs, centered `translateX(-50%) rotateY(180deg)` (mirrored), cover. `wetlab-riCniX.png` / `computational-AcW1X3.png`.
  - Overlay z2: `linear-gradient(rgba(3,7,18,.08) 40%, rgba(3,7,18,.6) 100%)`.
  - Top label row (z4, gap 10): 8×8 dot radius 2 with glow: card 1 bg `#38bdf8` shadow `#0ea5e9 0 0 8px`, label `Web Interface` (gradient text `linear-gradient(270deg, rgba(255,255,255,.9), #f0f9ff)`); card 2 bg `#61c779` shadow `#3cab57 0 0 8px`, label `API Access` (gradient `linear-gradient(90deg, #e1f7e6, rgba(255,255,255,.9))`). Inter 16/25.6/-0.32/500.
  - Bottom (z3, gap 10): H4 white `Wet lab` / `Computational`; paragraph `rgba(255,255,255,.8)` (≤25 words each): `Add your domain expertise and AI generate candidates for lab testing in just a few clicks. Upload experimental results to improve your project-specific AI automatically.` / `Run Cradle with an API and scale your expertise without the DevOps overhead. Focus on novel design strategies, not routine requests and endless configuration.`
- Phone: padding `80px 20px 40px`, gap 40. H2 32 left-aligned. Check items become a 350-wide list of 44-tall rows separated by 1px `#f9fafb` lines. Cards stack (gap 10) 350×280, padding 20, H4 18, body 14/22.4, label 14/22.4.
- Motion: check badges scale .7→1, 0.5s, on enter (all three together). Cards static.

## P8 Workflow tabs (`workflow`) (**TabbedCards**; also on /solutions/biopharma and /solutions/industrial)
- 1440×1053.4, bg white, padding `120px 80px 80px`. Content max-w 1080, gap 40.
- Header (gap 20): H2 `Same workflow. Upgraded results.` (64, center, gradient text as P7). Lead center: `Your experimental workflow stays the same, your results don't.`
- Tab bar (centered, gap 4): pills padding `8px 16px`, radius 100; active bg `#f3f4f6` + text `#1f2937`; inactive bg `rgba(249,250,251,0)` + text `#616e80`. Label H4 24/28.8/500. Tabs: `Learn` (default), `Generate`, `Review`. No auto-advance (checked 12s). Click switches instantly (pill colors swap with no measurable tween).
- Panel: row of 3 cards (gap 20; cards 400 wide, the row overflows the 1080 container symmetrically: x=100…1340). Card (column gap 20): image tile 400×313.8 (aspect 1.2746) radius 16 bg `#f3f4f6`, image cover with mask `linear-gradient(0deg, rgba(0,0,0,.2) 0%, #000 40%)` (cards 1–2 only); text (gap 8, max-w 400): title Inter 16/20.8/600 `#1f2937` (**CardTitle**) + body paragraph.
  - Learn: `Import your data` (~27 words) `1-2v3dNU.png`; `Explore your data quality` (~35 words) `2-rVPCq9.png`; `Models learn with you` (~27 words) `ui-hMhVEl.png`.
  - Generate: `Generate candidates` (~38 words) `4rA0YH…png`; `Multi-property support` (~30 words) `ui-Ty4HuN.png`; `Full-plate optimization` `The sequences that you download from Cradle are a carefully curated set, selected from millions of in silico designs to maximize your chances of success.` `ui-F0OA2Y.png`.
  - Review: `Reports` `Generation Reports give you full control over what candidates you bring to the lab and what to expect in performance.` `I9DDpC…png`; `Send to lab` `Download sequences from Cradle, then order DNA and run assays in your own lab or use your existing CRO.` `9A5zde…png`; `Round statuses` `Track lab progress in Cradle using Round Statuses and see live metrics per protein property with every new assay upload.` `JSkMFe…png` (this tile radius 16).
- Phone: padding `80px 20px`, gap 20; H2 32; tab pills 37.6 tall with 18/21.6 labels; cards stack (gap 20), image 350×274.6, title 14/18.2/600, body 14/22.4.
- Motion: on tab change and on first appearance, cards enter opacity .001→1, y 30→0, spring duration 0.6 bounce 0.1, delays 0.1 / 0.2 / 0.3 (exact appear config `2o9z7`/`axwsek`/`1al4fq9`). Measured: each card ≈0.5s to opacity .98, tiny overshoot (−0.045px). On "Learn" re-select the panel also does a layout morph (scaleY 1.089→1, y 29→0, ≈0.45s).

## P9 Quote (`quote`) (**QuoteBand**)
- 1440×900, padding `160px 80px`, gap 40, bg `linear-gradient(#fff 0%, #f0f9ff 19.58%, #dbe7fe 80%, #fff 100%)`.
- Quote H2 max-w 640, Rethink Sans **48/48/-1.92/500** `#030712`, left-aligned, 5 lines, mask `linear-gradient(62deg, rgba(0,0,0,.8) 0%, #000 43.6%, rgba(0,0,0,.7) 79%)`: `"Cradle's AI-based protein design platform provides easy access and acceleration to protein optimization for the discovery pipeline."`
- Attribution row (max-w 640, gap 16): logo tile 48×48 padding 3, bg white, radius 12, shadow `rgba(0,0,0,.04) 0 1px 8px`, containing a 40×40 Corteva mark (inline SVG background in the source; use `customer-logo-corteva.svg` or the extracted data-URI). Text: `Eswar Narayanan` Inter 16/25.6/500 `#1f2937`; `Director, Corteva Catalyst` same, `rgba(31,41,55,.6)`.
- Phone: **the whole quote section is hidden** (not rendered at 390).
- Motion: word-by-word reveal on enter: each word opacity .001→1, y 10→0, ≈0.4s, stagger ≈75ms (17 words over ≈1.2s).

## P10 Latest updates (`platform`)
- 1440×2652.5, padding `120px 80px 160px`. Row max-w 1080, gap 80, align start.
- Left: H2 `Latest updates` (64, 500 wide, 2 lines), **`position:sticky; top:120px`**.
- Right column 500 wide, gap 80: four groups (column gap 40). Each: icon tile 48×48 radius 12 bg white, shadow `rgba(0,0,0,.09) 0 .301px .903px -1px, rgba(0,0,0,.09) 0 1.144px 3.433px -2px, rgba(0,0,0,.06) 0 5px 15px -3px`, holding a 32×32 PNG icon; H4; then bullet paragraphs (Body; each starts with a bold-ish lead phrase in `#1f2937`, rest `#616e80`).
  1. icon `data-XQPahj.png`, `Data & Workflow Management`: leads `Flexible data management` (~27 words), `Complete provenance tracking`, `Full API access`, `Multi-modality support`.
  2. `optimzaiton-6gDPYK.png`, `Design and Optimization`: `Multi-property optimization`, `Modular task system`, `Advanced sequence design controls`, `Intelligent plate design`, `Hit identification`.
  3. `models-CWU1tI.png`, `AI and model updates`: `Automated model finetuning` (~48 words, includes InlineLink `security page` → ./security), `De-risked plate generation`, `Wet lab proven technology`.
  4. `models-BonaDa.png`, `Security and access control` (H4 color `#1f2937`): `Enterprise-grade security`, `Role-based permissions`.
  Paragraphs are 3–4 lines (~20–30 words each); use placeholder copy after the lead phrase.
- Phone: padding `0 20px 80px`; single column gap 40; H2 32 centered, not sticky; body 14/22.4.
- No motion.

## P11 Footer CTA light (`footer-cta`) (**FooterCTALight**)
- 1440×932, padding `200px 40px 0`, gap 80, bg `linear-gradient(#fff 0%, #f9fafb 100%)`, overflow hidden.
- H2 `Want faster results? Talk to our team today.` (64, `#030712`, center, 2 lines). Phone copy: `Want faster results? Talk to our team.`
- Button stack 328×124 (padding 4, radius 16, column gap 20, both buttons 320 wide, padding `0 32px`): Primary48 `Talk to sales` → ./get-started; Secondary48 `Academic program` → ./solutions/academia.
- Screens: same 3-screen fan as homepage footer CTA (`ui-report-cta.png`/`ui-round.png`/`ui-data.png`; report shadow `rgba(0,0,0,.04) 0 0 8px`, round shadow `rgba(0,0,0,.08) 0 1px 16px`), gradient band `linear-gradient(rgba(255,255,255,0) 51%, rgba(3,7,18,.08) 100%)`.
- Phone: 390×438.4, padding `40px 20px 0`; H2 32; buttons become Primary36/secondary36 (342 wide, 13px labels, gap 8); screens 286×177.5, radius 8 (middle `6 6 8 8`).
- Motion: screens slide up on enter with the homepage hero back-ease `cubic-bezier(0.7,-0.35,0.3,1.1)`, 0.8s: middle (y 80→0) first, right (x −20→0, y 80→0) +0.1s, left (x 20→0, y 80→0) +0.2s. Phone: y 40 instead of 80.

## Links (platform)
Same-site: ./platform#intro, ./blog, ./solutions/biopharma, ./solutions/industrial, ./lab, ./security, ./get-started, ./solutions/academia (+ nav/footer). EXTERNAL: none in page body (nav/footer externals as homepage).

## Assets (platform)
New files live in `public/assets/pages/platform/` (full resolution, query params stripped). Files marked (existing) are already in `public/assets/` (see `public/assets/MANIFEST.md`) or in another page folder of this spec. Rendered sizes are CSS px; n/a = not rendered at that width (or only in an interactive state).

| file | used in (framer layer) | original URL | file size/format | rendered 1440 | rendered 390 |
|---|---|---|---|---|---|
| `public/assets/logo-wordmark.png` (existing) | Wordmark 2 | https://framerusercontent.com/images/AtEI6tbWiHI47fwFzLXMJG4y8oE.png | 222×66 png | 78×22.1 | 78×22.1 |
| `public/assets/pages/platform/intro-yChT7D.mp4` | intro | https://framerusercontent.com/assets/yChT7Dl4UMMHRx3twCRqxMwA0.mp4 | mp4 2389 KB | 1440×900 | 390×506.4 |
| `public/assets/pages/platform/video-trigger-evbqum.png` | video trigger | https://framerusercontent.com/images/evbqump3avvawgLVBbaXvVUQlk0.png | 196×120 png | 108×72 | 108×72 |
| `public/assets/ui-round.png` (existing) | round | https://framerusercontent.com/images/M1VjhVbzNNZuncHQjV3aQJDdKo.png | 2560×1760 png | 1183.7×677.6 | 344.2×208.6 |
| `public/assets/customer-logo-novonesis.svg` (existing) | content | https://framerusercontent.com/images/suE7e8mMA7izB47HQgdMNN82Egk.svg | svg | 117×42 | 97×36.2 |
| `public/assets/customer-logo-novo-nordisk.svg` (existing) | content | https://framerusercontent.com/images/RzFCW4BGahMQ5UyzrWnZqCb2nE.svg | svg | 117×42 | 97×39 |
| `public/assets/customer-logo-jnj.svg` (existing) | content | https://framerusercontent.com/images/NNOIC4y7PhTDgk0yuG2XEBVQeTQ.svg | svg | 117×42 | 97×36.2 |
| `public/assets/customer-logo-bayer.svg` (existing) | content | https://framerusercontent.com/images/5a0pQd2IWouqVfhkiEKYCtPedM.svg | svg | 117×42 | 97×39 |
| `public/assets/customer-logo-abbvie.svg` (existing) | content | https://framerusercontent.com/images/WWPHALSmU8sypw0cb6qwKuWLb24.svg | svg | 117×21.8 | 97×18.1 |
| `public/assets/customer-logo-hansa.svg` (existing) | content | https://framerusercontent.com/images/yffefaHejeGA519Z70MjCTGMxFI.svg | svg | 117×42 | 97×39 |
| `public/assets/customer-logo-illumina.svg` (existing) | content | https://framerusercontent.com/images/VJNMk77p52CD9Z81GERCNgR9f4.svg | svg | 117×26.7 | 97×22.1 |
| `public/assets/customer-logo-csl.svg` (existing) | content | https://framerusercontent.com/images/MleukVGRRNyR2iVHFWQFky0g8c.svg | svg | 117×42 | 97×39 |
| `public/assets/customer-logo-lundbeck.svg` (existing) | content | https://framerusercontent.com/images/9BailNhHuuybz72q93fOyVTqs.svg | svg | 117×42 | 97×39 |
| `public/assets/customer-logo-ultragenyx.svg` (existing) | content | https://framerusercontent.com/images/fG7WNPtJqIJK65b1efymRYVvcg8.svg | svg | 117×42 | n/a |
| `public/assets/pages/platform/wetlab-riCniX.png` | Wetlab, wet lab | https://framerusercontent.com/images/riCniXBWMkubE5HZ7IR2p5Srs.png | 960×1100 png | 160×220 | 64×88 |
| `public/assets/ui-data.png` (existing) | data | https://framerusercontent.com/images/1sLbKCfenmgZZIF3rnKvoWX6w.png | 2560×1760 png | 633×398 | 280×176 |
| `public/assets/pages/platform/ui-Ty4HuN.png` | ui | https://framerusercontent.com/images/Ty4HuNujCKlUKa2DxPkD2DO2KqQ.png | 1280×1000 png | 509.8×400 | 350×274.6 |
| `public/assets/pages/platform/ui-hMhVEl.png` | ui, 3 | https://framerusercontent.com/images/hMhVElfVP5EMobCToP5D6bDV5N4.png | 1280×1000 png | 509.8×400 | 350×274.6 |
| `public/assets/pages/platform/ui-F0OA2Y.png` | ui | https://framerusercontent.com/images/F0OA2YHnZOJKLPBWQklLEDmGBTc.png | 1280×1000 png | 509.8×400 | 350×274.6 |
| `public/assets/pages/platform/computational-AcW1X3.png` | computational | https://framerusercontent.com/images/AcW1X3KdCLZFYY8h8JvDQW2NkMw.png | 960×1100 png | 587.5×625 | 350×372.3 |
| `public/assets/pages/platform/1-2v3dNU.png` | 1 | https://framerusercontent.com/images/2v3dNUIi6OGXFJmP7CahPLz7KWg.png | 1280×1000 png | 400×313.8 | 350×274.6 |
| `public/assets/pages/platform/2-rVPCq9.png` | 2 | https://framerusercontent.com/images/rVPCq9JIaYAKrdzeBvooHblRE.png | 1280×1000 png | 400×313.8 | 350×274.6 |
| `public/assets/pages/platform/data-XQPahj.png` | Data | https://framerusercontent.com/images/XQPahjGPei7kLV296k0K2kHdQ.png | 96×96 png | 32×32 | 32×32 |
| `public/assets/pages/platform/optimzaiton-6gDPYK.png` | Optimzaiton | https://framerusercontent.com/images/6gDPYKS2SyUCIV1GQcIPwi6H8Y0.png | 96×96 png | 32×32 | 32×32 |
| `public/assets/pages/platform/models-CWU1tI.png` | Models | https://framerusercontent.com/images/CWU1tIsOf4QWWdjVpTND65sbI0.png | 96×96 png | 32×32 | 32×32 |
| `public/assets/pages/platform/models-BonaDa.png` | Models | https://framerusercontent.com/images/BonaDaBkriolSY8admCYNSpZVQ.png | 96×96 png | 32×32 | 32×32 |
| `public/assets/ui-report-cta.png` (existing) | report | https://framerusercontent.com/images/IfqouN2MOOjMjZsnHQBzBZfe6c.png | 2560×1760 png | 719.4×446.3 | 286.1×177.5 |
| `public/assets/pages/platform/tab-generate-1-4rA0YH.png` | (interactive state) | https://framerusercontent.com/images/4rA0YHjY8j7n4vbJRWtcoj6JA0.png | 1280×1000 png | n/a | n/a |
| `public/assets/pages/platform/tab-review-reports-I9DDpC.png` | (interactive state) | https://framerusercontent.com/images/I9DDpC0L7uN4ZgH9LHC372cmqk.png | 1280×1000 png | n/a | n/a |
| `public/assets/pages/platform/tab-review-send-to-lab-9A5zde.png` | (interactive state) | https://framerusercontent.com/images/9A5zdeuj9bgLd5FF0P6sfPlJbTs.png | 1280×1000 png | n/a | n/a |
| `public/assets/pages/platform/tab-review-round-statuses-JSkMFe.png` | (interactive state) | https://framerusercontent.com/images/JSkMFex7UQiqwbwpmUzUPQNQ.png | 1280×1000 png | n/a | n/a |
| `public/assets/pages/platform/inline-video-trigger-d14d23.svg` | inline SVG in `video trigger` | (inline markup) | svg 24×24 | 20×20 | |
| `public/assets/pages/platform/inline-end-6be8c4.svg` | inline SVG in `end` | (inline markup) | svg | 11×9 | |
| `public/assets/pages/platform/datauri-animated-checkmark-8b8eaf.svg` | data-URI bg in `animated checkmark` | (data URI) | svg 11×9 | 11×9 | |
| `public/assets/pages/platform/datauri-corteva-logo-51c480.svg` | data-URI bg in `Corteva-logo` | (data URI) | svg 40×40 | 40×40 | |

---

# /solutions/academia

Title `Cradle` (generic). Doc height 2853 (1440) / 3694 (390). Screenshot `reference/pages/solutions-academia-1440.png`.
Order: Navbar · A1 Green hero · A2 Application form (HubSpot) · Footer. **No footer CTA** on this page.

## A1 Hero (green)
- Section 1440×934, padding `120px 40px 40px`, bg `linear-gradient(#1f5f36 0%, #1e5e35 100%)` (rgb(31,95,54)→rgb(30,94,53)), overflow clip. Content max-w 1280, column gap 40, centered.
- `hero` block (max-w 960, gap 20, centered):
  - Photo 200×130, radius 8, `object-fit:cover`, mask `radial-gradient(50% 50%, #000 35%, transparent 100%)` (soft vignette) `hero-FRS8jc.jpg` (1200×900 source).
  - H2 `Cradle for Academia`: Section H2 64/64/-2.56 white, center, gradient text `linear-gradient(270deg, rgba(255,255,255,.8) 0%, #fff 50%)`.
  - Lead center, max-w 600, `rgba(255,255,255,.8)`: `Apply now to join our limited availability academic program, and start using Cradle in your research.`
- `logos` row (max-w 960, padding `0 20px`, gap 16): three tiles 296×128, padding 24, bg `rgba(255,255,255,.08)`, radius 16, logo centered: DTU `dtu-KWTpRW.png` 73×80; Berkeley `berkley-etW70y.png` 158×80; WAG `wag-psX75e.svg` 169×49.9.
- `list` (max-w 960): 3 rows, padding `24px 0`, bottom border 1px `rgba(255,255,255,.04)` (not on last). Row inner padding `0 20px`, gap 40: left 300 wide (gap 20) = 24×24 green circle (`#3cab57`, radius 55%) with white 10×8 check (`inline-row-2a6b26.svg`) + title Inter 16/20.8/600 white; right 580 wide description Body `rgba(255,255,255,.8)`:
  1. `Unpaid access` / `Cradle's license fee is waived for non-commercial research use.`
  2. `Publication` / `You have publication rights, and Cradle will provide materials to support publication.`
  3. `Support` / `You'll get direct access to the Cradle API and/or UI. Cradle experts are available to help you get started and answer questions along the way.`
- Phone: 390×928.6, padding `120px 20px 40px`. Photo 131×72. H2 32/35.2/-0.64. Lead 16/24/-0.64. Logo tiles 111.3×72.5, padding `16px 0`, radius 12, gap 8 (logos 37×40.5, 79×40, 102×30). List rows: column (gap 16), icon+title row (gap 16, title 14/18.2/600), description below full width 14/22.4; check 7×6 (`inline-row-1d2c62.svg`).
- Motion (appear on load, exact): hero `1el5n47`, logos `6ww8ga`, list `typflp`: opacity .001→1, y 20→0, tween 0.4s ease `[0.12,0.23,0.5,1]`, delays 0 / 0.1 / 0.3.

## A2 Application form (`typeform`, actually a HubSpot embed) (**FormCard**)
- Section 1440×1420, padding `40px 40px 100px`, gap 40, bg `#1e5e35`.
- Divider label row (max-w 960, gap 24): 1px lines `rgba(255,255,255,.08)` radius 10 either side of `Submit your application today` (Body, `rgba(255,255,255,.8)`).
- Card max-w 960, padding 40, bg white, radius 24, shadow `rgba(0,0,0,.08) 0 1px 16px 0`, column-wrap gap 10: H3 `Let's talk!` Rethink Sans 32/38.4/-0.64/500 `#030712` (left), then the form iframe 880×1086.
- **Form (EXTERNAL HubSpot iframe `js-eu1.hsforms.net`, portal 145883606, form 0f2cd9b9…; the clone must render a local static form instead)**. Measured inside the iframe at 1440: content inset 40; labels Inter 16/400 `#4a5463` (h20) 10px above inputs; inputs h54, radius 12, border 1px `#9fa8b5`, bg white, text Inter 16/400 `#212d3a`; row pitch 104; 2-column rows use 385-wide fields with a 30 gap (800 total). Fields in order:
  1. `First name*` (text, ph "First name") | `Last name*` (text, ph "Last name")
  2. `Position*` (ph "Position") | `Academic/Research Institution*` (ph "Name of institution")
  3. `Lab/Group*` full width (ph "Name of lab/group")
  4. `Email*` full width, help text `Please use your work/university email address.` under the label, ph "you@acme.edu"
  5. `Phone number (optional)` + help text `If you'd like us to call you, please provide your phone number below.`; country-flag select (68 wide, geo-defaulted) joined to a tel input (radius `0 12 12 0`)
  6. `Tell us more about your project*` + help text (~30 words, placeholder), textarea h74, ph "Please provide project context."
  7. `Where did you hear about Cradle? (optional)` text input
  8. Consent paragraph (~45 words, placeholder) with a `Privacy Policy` link (EXTERNAL target in HubSpot)
  9. Submit button 103×44, right-aligned, bg `#0151f8`, radius 12, Inter 16/700 white, label `Submit`.
- Phone: section padding `0 20px 50px`; divider label 14/22.4; card radius 12, padding `20px 0 0`, H3 24/28.8/-0.48 centered; iframe 350×1509; fields single column 270 wide (inset 40).
- No scroll motion.

## Links (academia)
Page body has no links besides the form. EXTERNAL: HubSpot form iframe (and its Privacy Policy link).

## Assets (solutions-academia)
New files live in `public/assets/pages/solutions-academia/` (full resolution, query params stripped). Files marked (existing) are already in `public/assets/` (see `public/assets/MANIFEST.md`) or in another page folder of this spec. Rendered sizes are CSS px; n/a = not rendered at that width (or only in an interactive state).

| file | used in (framer layer) | original URL | file size/format | rendered 1440 | rendered 390 |
|---|---|---|---|---|---|
| `public/assets/logo-wordmark.png` (existing) | Wordmark 2 | https://framerusercontent.com/images/AtEI6tbWiHI47fwFzLXMJG4y8oE.png | 222×66 png | 78×22.1 | 78×22.1 |
| `public/assets/pages/solutions-academia/hero-FRS8jc.jpg` | hero | https://framerusercontent.com/images/FRS8jcOd9TQ5O94AEMje92f1O1U.jpg | 1200×900 jpeg | 200×130 | 131×72 |
| `public/assets/pages/solutions-academia/dtu-KWTpRW.png` | Dtu | https://framerusercontent.com/images/KWTpRWoMWTpZm7JDxhvqeMXdM3o.png | 219×240 png | 73×80 | 37×40.5 |
| `public/assets/pages/solutions-academia/berkley-etW70y.png` | Berkley | https://framerusercontent.com/images/etW70yy817C5SASdTOXNprcewtI.png | 474×240 png | 158×80 | 79×40 |
| `public/assets/pages/solutions-academia/wag-psX75e.svg` | Wag | https://framerusercontent.com/images/psX75eeAwDaAfmxvmeBVoFzpM.svg | svg | 169×49.9 | 102×30.1 |
| `public/assets/pages/solutions-academia/inline-row-2a6b26.svg` | inline SVG in `row` | (inline markup) | svg | 10×8 | |
| `public/assets/pages/solutions-academia/inline-row-1d2c62.svg` | inline SVG in `row` | (inline markup) | svg | 7×6 | |

---

# /solutions/biopharma

Title `AI-assisted drug discovery for any biologic`. Doc height 9688 (1440) / 10951 (390). Screenshot `reference/pages/solutions-biopharma-1440.png`.
The page content sits in a `main` wrapper with bg `#030712`; sections without their own bg (B3) inherit that dark bg.
Order: Navbar · B1 Dark split hero · B2 Logo ticker (dark) · B3 Pipeline + benefits (dark) · B4 Modalities tabs (white) · B5 Case quote · B6 Workflow tabs (TabbedCards, left-aligned) · B7 Security · B8 Footer CTA **dark variant** · Footer.
Template shared with /solutions/industrial (**SolutionPage**): same section skeleton with different copy/assets/colours.

## B1 Hero (`hero`)
- 1440×644, padding `120px 40px 0`, bg `#030712`, overflow hidden. `columns` row max-w 1280, gap 40, align center.
- Left `text` 590 wide, column gap 32:
  - **IconEyebrow** (row gap 12, h28): 28×28 tile radius 6, bg `#3cab57`, mask `linear-gradient(#000 47%, rgba(0,0,0,.8) 100%)`, holding a 24×24 white antibody glyph (`datauri-antibody-55a612.svg`); label `BIOPHARMA` = Eyebrow role (Spot Mono 18/24/1.08 uppercase) in **white**.
  - H2 `AI-assisted drug discovery for any biologic` (64/64/-2.56, white, gradient text `linear-gradient(270deg, rgba(255,255,255,.7) 0%, #fff 40%)`), 3 lines.
  - Lead `rgba(255,255,255,.8)`: `Trusted by scientists at Novo Nordisk, argenx, AbbVie, Johnson & Johnson, and more`
  - Buttons (gap 10): Secondary48 (padding `0 20px`) `Talk to sales` → ../get-started; **Ghost48** (transparent, padding `0 20px`, radius 12, text white 16/600; hover bg `rgba(0,0,0,.02)`) `See benefits` → `./biopharma#usp1` (in-page anchor).
- Right `ui` 650×524 (padding `60px 0 40px 60px`, radius 24, flex-end): the `data` screenshot `data-v0H0BM.png` (2560×1760 source) absolutely positioned 1200.7×676.4 at (591.6, 80.8), radius `12 12 0 0`, shadow `rgba(0,0,0,.25) 0 1px 32px 0`, **static 3D tilt** `transform: rotate(20deg) rotateX(-30deg) rotateY(24deg)` (computed matrix3d(0.928,0.121,-0.352,0, -0.296,0.814,-0.5,0, 0.226,0.568,0.791,0, 0,0,0,1)), mask `radial-gradient(69% 93% …)` fading the far edges.
- Phone: 390×699.6, padding `120px 20px 0`; column (gap 40). Eyebrow 14/24/0.84. H2 32/35.2/-0.64. Lead 16/24. Buttons become full-width 36px (secondary36 white `Talk to sales`, **ghost36** `See benefits`, 13px labels, gap 10). UI image 460×285.4, radius `9 9 0 0`, no tilt, in a 350×220 box overflowing right.
- Motion (appear on load, exact): text `7wivxl` opacity .001→1, y 20→0, tween 0.3s ease `[0.12,0.23,0.19,1]`, delay 0.1. UI `s1zhvn` opacity .001→1, x 10→0, y 10→0, tween 1.2s ease `[0.12,0.23,0.1,1.02]`, delay 0.2.

## B2 Logo ticker (`logos`) (**LogoTicker**, dark)
- Container max-w 1280, h62, padding `0 40px 20px`, bg `#030712`, bottom border 1px `rgba(255,255,255,.08)`, mask `radial-gradient(50% 177%, #000 72.36%, transparent 100%)` (edges fade).
- Ticker row 1200 wide, gap 48: 10 logos repeated, each box 76.8 wide × 42 max (contain, opacity .6). Logo files (white versions, new): `logos-LY569W.svg`, `logos-327vcQ.svg`, `logos-EqXQcN.svg`, `logos-ukg0z4.svg`, `logos-qzqK7o.svg`, `logos-z1e1uA.svg` (illumina), `logos-oGv9fs.svg`, `logos-ENCnbk.svg` (Lundbeck), `logos-H1JIZo.svg`, `logos-v65Tr9.svg`.
- Motion: continuous leftward marquee **≈50 px/s** (−45px per 0.9s), seamless loop (list duplicated).
- Phone: 390×60, padding `20px 0`, gap 16, logos 64×20 max. Same marquee.

## B3 Pipeline + benefits (`timeline`, dark)
- 1440×3460.4, padding `80px 40px 200px`, bottom border 1px `rgba(255,255,255,.08)`. Content max-w 1280, gap 80.
- Intro (960 wide, gap 40): H3 (rendered as two spans at Rethink Sans **48/57.6/-0.96/500** white) `Meet your new AI-assisted` / `therapeutics pipeline`; Lead `rgba(255,255,255,.8)` (~27 words, 2 lines at 960; placeholder).
- **PipelineCompare** (`pipeline`, padding-bottom 80, gap 80):
  - Row A `traditional` (gap 20): legend (32×12 swatch radius 3 bg `#f3f4f6` + H4 white `Drug discovery before`); then 5 stages (gap 4) each 252.8 wide: bar h40 radius 8 + label Body `rgba(255,255,255,.6)` below (gap 10). Bars 1 and 5 bg `rgba(255,255,255,.12)`, bars 2–4 bg white. Labels: `Target identification`, `Target to hit`, `Hit to lead`, `Lead optimization`, `Preclinical`.
  - Row B `cradle`: legend swatch `linear-gradient(270deg, #61c779 0%, #266f38 100%)`, H4 `Drug discovery with Cradle`. Stages: `Target identification` (254.4, bar `rgba(255,255,255,.12)`), `AI-assisted discovery and optimization` (763.2 wide, bar `linear-gradient(270deg, #61c779, #3cab57)`, label white), `Preclinical` (254.4).
  - Motion (in view, replays on re-entry; needs the block fully visible): variant `bio_start` → `bio_end`. The green bar shrinks from 763 to 253 wide and `Preclinical` slides left from x=1106 to x=595 (i.e. the Cradle timeline ends two slots earlier). Layout tween ≈0.9s, slow-in/slow-out (≈`cubic-bezier(.45,0,.55,1)`), starting ≈0.3s after entering. Labels move with their bars.
- Benefit blocks (`benefits`, gap 80, separated by 1px `rgba(255,255,255,.08)` dividers): each is a 3-col grid (413.3 each, gap 20 col / 40 row), rows [457.7, auto]:
  - Cell 1: text (padding `2px 16px 20px 0`, justify end, gap 20): H3 32/38.4/-0.64 white + Lead `rgba(255,255,255,.8)`.
  - Cells 2–3 (spanning 846.7, aspect 1.85, radius 16): illustration.
  - Row 2: three feature columns (padding-top 20, gap 8): **CardTitle** white (16/20.8/600) + Body `rgba(255,255,255,.8)`; third column has padding-left 20.
  1. (`1`, id target `#usp1`) `Goodbye sequential, hello simultaneous` / `Generate proteins that perform better across multiple properties, in every design cycle.` Illustration: looping muted video `img-GJxfO9.mp4` (cover, 1439×778 overflowing the tile) plus a centered **ToggleStack** 300 wide (gap 12): white pills 300×57.6 (padding 16, radius 12) with Body text `#1f2937` and a 36×24 switch (bg `#3cab57`, radius 100, padding 4, white 18×18 knob on the right): `Affinity`, `Specificity`, `Stability`. Features: `Optimize multiple objectives at once` (~25 words), `De-risk earlier` (~29 words), `Design for real-world function` (~30 words).
     Motion: the 2nd and 3rd pills fade/slide in (opacity 0→1, y 20→0, ≈0.45s ease-out, stagger 0.1s) after the tile enters, and reset to hidden when it leaves the viewport.
  2. (`2`) `Train Cradle across your datasets` / `Connect all your experimental results in one place and train custom AI to learn more from your data.` Illustration: tile bg `#111827`; a **vertical file ticker** (mask `linear-gradient(transparent 0%, #000 12.5%, #000 87.5%, transparent 100%)`, padding 10) of pills 384×68.8 (padding 19.2, radius 14, bg `#1f2937`, gap 14.4) each with a 22×19 file icon (`inline-affinity-7fd532.svg`) and Inter 19/30.4/500 `rgba(255,255,255,.6)` filenames: `HER2_binding_affinity.csv`, `Cell_proliferation_inhibition.xlsx`, `ADCC_activity_results.csv`, `Thermal_stability_DSC.csv`, `Aggregation_stress_test.xlsx`, `Solubility_form_screen.csv`, `Expression_yield_CHO.xlsx`, `Epitope_mapping_data.xlsx`. Moves upward continuously ≈15 px/s (−13.5px per 0.9s). Centered over it a white pill button 260×72 (radius 1008, padding `24px 24px 24px 16px`, gap 12, shadow `rgba(60,171,87,.5) 0 1px 40px 0`) with 24×24 icon (`inline-video-trigger-d14d23.svg`, play glyph) and `Start training` Inter 23/36.8/500 `#1f2937` (decorative). Features: `Works with any format and assay` (~25 words), `Train AI throughout your program` (~37 words), `No historical data? No problem.` / `Start a new program with as little data as a single sequence.`
  3. `Protein design at any level of expertise` / `Use Cradle with simple defaults, or set advanced design requirements based on your in-house expertise.` Illustration: tile bg `#111827`, image `benefits-wvZQ9s.png` (2850×1796) with mask `radial-gradient(69% 113%, #000 0%, transparent 97%)`; centered stack 320 wide of white pills (radius 12, padding 16, gap 12): 12×12 swatch radius 4 + Body `#1f2937` label + right-aligned Body `#616e80` value: `Blocked` `14 positions` (swatch `#98b62c`), `Unreliable` `16 positions` (`#0ea5e9`), `Ignore` `21 positions` (`#9b9265`). Image motion: on enter opacity 0→1 and scale 1.2→1, 0.8s ease-out. Features: `Simple workflows` (~32 words), `Mutations where you want them` (~44 words), `AI your whole team understands.` (~29 words).
- Phone: section padding `80px 20px`, gap 40; intro H2 24/24/-0.48 copy `Your new AI-assisted therapeutics pipeline`, lead 16/24. Pipeline uses a compact variant: bars h24 radius 4, labels Inter 10/16/500, stages 66.8 wide (gap 4) with labels `Target ID`, `Target to hit`, `Hit to lead`, `Lead Op` (`#9ca3af`), `Preclinical`; Cradle row (`m_bio_start`): `Target ID` 68.4, `AI Protein Engineering` 205.2, `Preclinical` 68.4; legend H4 18/21.6. Benefit blocks stack: illustration first (video tile 350 wide with pill labels 10/16), H3 24/28.8/-0.48, lead 16/24, features 14/18.2 + 14/22.4. File ticker pills use 14/22.4 text. The 3rd illustration image 350×250; value pills text 12/19.2.

## B4 Modalities (`modalities`) (**ModalityTabs**)
- 1440×1641.9, padding `120px 40px 160px`, bg white. Background pattern layer (abs, 1440×600, opacity .1, `mix-blend-mode:multiply`, mask `linear-gradient(rgba(0,0,0,.5) 0%, transparent 40%)`) tiling `9c47fOR3CNoSsEtr6IEYJoKM.svg` (homepage `benefits-grid-pattern.svg`) at `background-size:101px auto`, centered.
- Section max-w 1280, gap 40. Text (gap 20): H2 `Works on any biologic and all properties` (64, max-w 600, 2 lines); Lead max-w 720 (~35 words, 3 lines; its last sentence is the inline link `Contact our sales team` → ../get-started).
- Tabs (gap 8): pill 56 tall, padding `12px 20px 12px 16px`, radius 12, gap 12; active bg `#f3f4f6`, inactive transparent. 32×32 icon tile radius 8 (active `#3cab57`, inactive `#9ca3af`) with white 24px glyph (`inline-antibody-d31d7d.svg`, `inline-peptide-a0c795.svg`, `inline-vaccine-5360fd.svg`); label H4 24/28.8 (`#030712` active, `#616e80` inactive): `Antibodies` (default), `Peptides`, `Vaccines`.
- Panel (`antibody`): 2-col grid (630 each, gap 20). Items padding `20px 20px 20px 0`, radius 12, column gap 8: title row = 3×20.8 accent bar (radius 20, `#3cab57`) + CardTitle `#030712`; Body description. Antibodies items (titles verbatim, descriptions ≤25 words verbatim else placeholder):
  - `A flexible starting point for your program`: `Antibody projects can be started from a single weak binder sequence (see our participation in the Adaptyv competition) or existing datasets.`
  - `Affinity maturation with developability in mind`: `Improve binding by introducing targeted mutations in CDRs or framework regions—without sacrificing stability, manufacturability, or other key developability traits.`
  - `Maximum value from discovery libraries` (~34 words)
  - `Early liability mitigation` (~32 words; "in vitro"/"ex vivo" italic)
  - `Optimize for efficacy, not just binding`: `Beyond binding, optimize efficacy using data from functional assays including cell surface binding, reporter signaling, T-Cell activation, or cAMP assays.`
  - `Set antibody-specific objectives`: `Set configurable objectives when generating sequences. These can be absolute or relative - think on-rates, off-rates, preferential binding, specificity, cross-reactivity, and more.`
  - `Fine-grained control over new mutations` (~37 words)
  - `Support for diverse antibody formats`: `Formats that are within scope for Cradle include antibody fragments (VHH, scFv, Fab), full-length IgG, as well as bi- or multispecifics, and Antibody Drug Conjugates.`
  Peptides/Vaccines panels were not opened in this pass (same item component; copy not captured).
- CTA card (`cta`): 1280×265.6, padding 40, gap 40, bg `#f9fafb`, radius 16. Image 220×152 radius 12 `cta-iWZePD.png`; text column (padding `8px 0`, gap 20): H4 `Got another use case? Let's talk.`, Body (max-w 500, ~28 words), Primary36 `Let's talk` → ../get-started.
- Phone: padding `120px 20px 80px`, gap 20; H2 32; tabs become 3 equal 111.3×82.2 tiles (column, gap 8, padding `12px 4px`, radius 12, icon above, label Inter 14/18.2/600); items single column (14/18.2 title, 14/22.4 body); CTA card column (padding 20, gap 50), H4 18/21.6, button full width.
- Motion (exact appear configs on the items): each item opacity .001→1, y 8→0, tween 0.2s ease `[0.12,0.23,0.5,1]`, delays by row: 0.1, 0.1, 0.2, 0.2, 0.3, 0.3, 0.4, 0.4 (both columns of a row share the delay).

## B5 Case quote (`case`) (**CaseQuote**)
- 1440×313.6, padding `80px 40px`, bg `linear-gradient(112deg, #f0f9ff 8%, #f9fafb 100%)`.
- Row (gap 20): quote block 850 wide, padding-left 30, **left border 6px `#0ea5e9`** (::after), H3 32/38.4/-0.64 `#030712` (~30 words, 4 lines; verbatim start `Cradle's platform provides us with scalable scientist-centric solutions…`; use placeholder for the remainder). Right 410 wide, flex-end: avatar 56×56 radius 12 bg `rgba(0,0,0,.08)` (image `avatar-oBdmCN.jpg`, mask `linear-gradient(#000 50%, rgba(0,0,0,.5) 100%)`), then name Body `#030712` `Anastasia Hager, Ph.D.` and role Body `#616e80` `Global Head of Drug Discovery Sciences, Bayer` (gap 20).
- Phone: 390×448.8, padding `80px 20px`; column; H3 24/28.8/-0.48 (7 lines); avatar 40×40; name/role 14/22.4.
- Motion: word reveal, each word opacity .001→1, y 10→0, ≈0.2s, stagger 50ms.

## B6 Workflow tabs (`platform`)
- 1440×1103.4, padding `120px 40px`, bg white. Content max-w 1280, gap 40, **left-aligned** header: H2 `Design in Cradle. Validate in the lab.` (64, 2 lines), Lead max-w 500 `Design with generative AI customized to your biologic and run experiments like you always do.`
- Same **TabbedCards** as /platform P8 (Learn/Generate/Review, same cards, same motion) except tab pills use **radius 12** and are left-aligned; cards row still spans x=100…1340.
- Phone: padding `80px 20px 80px 16px`; pills 37.6 tall radius 12.

## B7 Security (`security`) (**SecurityBlock**, also on industrial)
- 1440×1163, padding `120px 40px 160px`, bg `#f9fafb`, bottom border 1px `rgba(0,0,0,.08)`.
- H2 `Always secure. Scale anytime.` (64, left; renders on 2 lines, 1280×128, so there is a hard break after `Always secure.`).
- Row (gap 50): left list 615 wide (padding `20px 0`, gap 40) of 5 items (max-w 440, gap 8): title row = 20×20 badge (18×18 `#3cab57` circle + 10×8 white check `inline-mobile-fa6e92.svg`) + H5 (Rethink Sans 18/25.2/-0.18/600 `#1f2937`); Body description `#616e80`:
  1. `Privacy-first AI` / `Your experimental data is only used to train your organization's custom models.`
  2. `SOC 2 compliant` / `Cradle is fully SOC 2 compliant with active monitoring and tight security protocols in place.`
  3. `Single sign-on` / `Secure and simple account management with SSO support for Google and Microsoft.`
  4. `Custom predictors` + **BetaBadge** (34.6×16, padding `3px 4px`, radius 4, bg `#9ca3af`, Inter 9/800/0.72 white `BETA`) / `Use internally developed predictors right in Cradle and see outputs inside Reports.`
  5. `Zero-maintenance` / `Fully managed AI infrastructure with optimized GPUs that scale with your needs.`
  Right: image 615×715 radius 24 `security-mEhlsH.png` (1104×1532), cover.
- Phone: padding `80px 20px`; title is an H1 40/40/-1.6; list only (image hidden); H5 16/20/-0.16; body 14/22.4; items gap 40.
- No motion.

## B8 Footer CTA dark (`footer-cta`) (**FooterCTA** variant `dark`)
- Same structure as the homepage footer CTA (section 13) with: bg `linear-gradient(#030712 52%, #1f2937 100%)`; H1 72/72/-2.88 line 1 `Ready to start?` white, line 2 `Talk to our team` `rgba(255,255,255,.6)`; button wrapper (bg `rgba(255,255,255,.12)`, radius 16, padding 4) with Secondary48 `Let's talk` → ../get-started; middle screen shadow `rgba(0,0,0,.25) 0 1px 16px`; gradient band `linear-gradient(rgba(17,24,39,0) 51%, rgba(17,24,39,.32) 100%)`; report screen opacity .9 (no shadow), data .85.
- Phone: 390×456, padding `80px 40px`, H1 40/40/-1.6, plain Secondary48 (no wrapper), screens ≈253×157.
- Motion: identical to homepage/platform screens slide-up (middle, then right +0.1s, left +0.2s; 0.8s back-ease; y 80, phone 40).

## Links (biopharma)
Same-site: ../get-started (hero, CTA card, footer CTA), ./biopharma#usp1. The B4 lead paragraph ends with an inline link `Contact our sales team` → ../get-started (Lead style, color `#616e80`; hover → `#29333c`, instant). EXTERNAL: none in body.

## Assets (solutions-biopharma)
New files live in `public/assets/pages/solutions-biopharma/` (full resolution, query params stripped). Files marked (existing) are already in `public/assets/` (see `public/assets/MANIFEST.md`) or in another page folder of this spec. Rendered sizes are CSS px; n/a = not rendered at that width (or only in an interactive state).

| file | used in (framer layer) | original URL | file size/format | rendered 1440 | rendered 390 |
|---|---|---|---|---|---|
| `public/assets/logo-wordmark.png` (existing) | Wordmark 2 | https://framerusercontent.com/images/AtEI6tbWiHI47fwFzLXMJG4y8oE.png | 222×66 png | 78×22.1 | 78×22.1 |
| `public/assets/pages/solutions-biopharma/data-v0H0BM.png` | data | https://framerusercontent.com/images/v0H0BMfuI0tYo3qPbkA8zvcCW8o.png | 2560×1760 png | 1200.7×676.4 | 460×285.4 |
| `public/assets/pages/solutions-biopharma/logos-LY569W.svg` | logos | https://framerusercontent.com/images/LY569WlNQQVpLYPGZBMNEaT2LBg.svg | svg | 76.8×42 | 64×20 |
| `public/assets/pages/solutions-biopharma/logos-327vcQ.svg` | logos | https://framerusercontent.com/images/327vcQLWQhtwRfPbxW19LCAQsw.svg | svg | 76.8×28.7 | 64×20 |
| `public/assets/pages/solutions-biopharma/logos-EqXQcN.svg` | logos | https://framerusercontent.com/images/EqXQcN82KM7ExhkubT8IUiomzbA.svg | svg | 76.8×42 | 64×20 |
| `public/assets/pages/solutions-biopharma/logos-ukg0z4.svg` | logos | https://framerusercontent.com/images/ukg0z4Fn21eIsaufCskyOZPeFk.svg | svg | 76.8×14.3 | 64×11.9 |
| `public/assets/pages/solutions-biopharma/logos-qzqK7o.svg` | logos | https://framerusercontent.com/images/qzqK7opgh6QkQaJhJvtncPVGOo.svg | svg | 76.8×42 | 64×20 |
| `public/assets/pages/solutions-biopharma/logos-z1e1uA.svg` | logos | https://framerusercontent.com/images/z1e1uAx0BjEGMjugzBMyxlDKgMU.svg | svg | 76.8×17.5 | 64×14.6 |
| `public/assets/pages/solutions-biopharma/logos-oGv9fs.svg` | logos | https://framerusercontent.com/images/oGv9fsxFWIJK5t2PowmIBsANCo.svg | svg | 76.8×38.4 | 64×20 |
| `public/assets/pages/solutions-biopharma/logos-ENCnbk.svg` | logos | https://framerusercontent.com/images/ENCnbkU8ghDdColu2DilnmMFcA.svg | svg | 76.8×32.2 | 64×20 |
| `public/assets/pages/solutions-biopharma/logos-H1JIZo.svg` | logos | https://framerusercontent.com/images/H1JIZoAr3xj2biJhadduGPIhI0.svg | svg | 76.8×28.7 | 64×20 |
| `public/assets/pages/solutions-biopharma/logos-v65Tr9.svg` | logos | https://framerusercontent.com/images/v65Tr9puLm4Z4dhhxWoUIFmYOQ.svg | svg | 76.8×17.4 | n/a |
| `public/assets/pages/solutions-biopharma/img-GJxfO9.mp4` | img | https://framerusercontent.com/assets/GJxfO9H6gZKMsUoB87z1ttg60Vc.mp4 | mp4 1318 KB | 1439.3×778 | 525×283.8 |
| `public/assets/pages/solutions-biopharma/benefits-wvZQ9s.png` | benefits | https://framerusercontent.com/images/wvZQ9szPda7rPn70CEi54qWm3x4.png | 2850×1796 png | 846.7×457.7 | 350×250 |
| `public/assets/benefits-grid-pattern.svg` (existing) | bg-pattern | https://framerusercontent.com/images/9c47fOR3CNoSsEtr6IEYJoKM.svg | svg | 1440×600 | 390×600 |
| `public/assets/pages/solutions-biopharma/cta-iWZePD.png` | cta | https://framerusercontent.com/images/iWZePDHrnhcKQtxFx1Ah1N2JJY.png | 1544×1186 png | 220×152 | n/a |
| `public/assets/pages/solutions-biopharma/avatar-oBdmCN.jpg` | avatar | https://framerusercontent.com/images/oBdmCND3HzkJmc3JiARv6oZhrM.jpg | 439×439 jpeg | 56×56 | 40×40 |
| `public/assets/pages/platform/1-2v3dNU.png` (existing) | 1 | https://framerusercontent.com/images/2v3dNUIi6OGXFJmP7CahPLz7KWg.png | 1280×1000 png | 400×313.8 | 354×277.7 |
| `public/assets/pages/platform/2-rVPCq9.png` (existing) | 2 | https://framerusercontent.com/images/rVPCq9JIaYAKrdzeBvooHblRE.png | 1280×1000 png | 400×313.8 | 354×277.7 |
| `public/assets/pages/platform/ui-hMhVEl.png` (existing) | 3 | https://framerusercontent.com/images/hMhVElfVP5EMobCToP5D6bDV5N4.png | 1280×1000 png | 400×313.8 | 354×277.7 |
| `public/assets/pages/solutions-biopharma/security-mEhlsH.png` | security | https://framerusercontent.com/images/mEhlsHmlGJYd9WA4bDJWoH6sR1A.png | 1104×1532 png | 615×715 | n/a |
| `public/assets/ui-report-cta.png` (existing) | report | https://framerusercontent.com/images/IfqouN2MOOjMjZsnHQBzBZfe6c.png | 2560×1760 png | 719.4×446.3 | 253.4×157.2 |
| `public/assets/ui-round.png` (existing) | round | https://framerusercontent.com/images/M1VjhVbzNNZuncHQjV3aQJDdKo.png | 2560×1760 png | 721.6×447.7 | 254.2×157.7 |
| `public/assets/ui-data.png` (existing) | data | https://framerusercontent.com/images/1sLbKCfenmgZZIF3rnKvoWX6w.png | 2560×1760 png | 719.4×446.3 | 253.4×157.2 |
| `public/assets/pages/solutions-biopharma/inline-affinity-7fd532.svg` | inline SVG in `affinity` | (inline markup) | svg | 22×19 | |
| `public/assets/pages/platform/inline-video-trigger-d14d23.svg` (existing) | inline SVG in `button` | (inline markup) | svg 24×24 | 24×24 | |
| `public/assets/pages/solutions-biopharma/inline-antibody-d31d7d.svg` | inline SVG in `Antibody` | (inline markup) | svg 32×32 | 24×24 | |
| `public/assets/pages/solutions-biopharma/inline-peptide-a0c795.svg` | inline SVG in `Peptide` | (inline markup) | svg 32×32 | 25×24 | |
| `public/assets/pages/solutions-biopharma/inline-vaccine-5360fd.svg` | inline SVG in `Vaccine` | (inline markup) | svg 32×32 | 24×24 | |
| `public/assets/pages/solutions-biopharma/inline-mobile-fa6e92.svg` | inline SVG in `mobile` | (inline markup) | svg | 10×8 | |
| `public/assets/pages/solutions-biopharma/inline-affinity-b26394.svg` | inline SVG in `affinity` | (inline markup) | svg | 16×15 | |
| `public/assets/pages/solutions-biopharma/datauri-antibody-55a612.svg` | data-URI bg in `antibody` | (data URI) | svg 24×24 | 24×24 | |

---

# /solutions/industrial

Title `AI-assisted protein engineering for industrial teams`. Doc height 10113 (1440) / 11437 (390). Screenshot `reference/pages/solutions-industrial-1440.png`.
**Same SolutionPage template as /solutions/biopharma** (sections I1–I8 = B1–B8). Everything not listed below (layout, sizes, typography, phone behaviour, motion) is identical to biopharma. Accent colour is **sky** (`#0ea5e9`) instead of green.

## Differences by section
- **I1 Hero**: hero aligns `flex-end`; text column (`container`) gap **40** (eyebrow, then a `text` group with gap 20 for H2+lead, then `buttons`). Eyebrow tile bg `#0ea5e9`, mask `linear-gradient(#000 50%, rgba(0,0,0,.8) 100%)`, glyph is a 23×23 img (`datauri-eyebrow-824e99.svg`), label `INDUSTRIAL`. H2 `AI-assisted protein engineering for industrial teams` with gradient `linear-gradient(285deg, rgba(255,255,255,.7) 0%, #fff 58%)`. Lead `Trusted by scientists at Novonesis, Corteva, IFF and more.` Buttons identical (`See benefits` still links to `./biopharma#usp1` on the live site: a live bug; point it at `#usp1` on this page in the clone). Screenshot `ui-3kLG8J.png`. Appear ids `13gmk68` (same config as `7wivxl`) and `1tikvi9` (same as `s1zhvn`).
- **I2 Logo ticker**: wrapper row (max-w 1280, h62) holding the `logos` strip 1280×55, mask `radial-gradient(50% 177%, #000 52.45%, transparent 100%)`. Only three logos repeated: `logos-UekOaZ.svg`, `logos-7vYN5L.svg`, `logos-3xsUSq.svg`, each 107×35 in a radius-8 box, opacity .6, gap 24. Speed ≈50 px/s leftwards.
- **I3 Pipeline + benefits**: intro H3 `Fast-track your protein engineering with Cradle` (48/57.6 spans), lead ~31 words. Row A legend `Protein engineering before`, stages `Project design`, `Variant generation`, `Optimization`, `Application testing`, `Scale up`. Row B legend swatch `linear-gradient(270deg, #38bdf8 0%, #0ea5e9 100%)`, `Protein engineering with Cradle`, variant `ind_start`→`ind_end`: `Project design`, `AI protein engineering` (bar `linear-gradient(270deg, #38bdf8 0%, #0284c7 100%)`), `Scale up`; first/last labels `rgba(255,255,255,.8)`. Same compress animation.
  - Block 1 lead `Generate proteins that move the needle on performance and manufacturability, in every design cycle.`; toggles `Catalytic activity`, `Stability`, `Yield` with switch bg `#0ea5e9`; features `Efficiently explore diverse designs` (~47 words; contains "in planta" italic), `Optimize multiple objectives at once` (~32), `Design for real-world function` (~52).
  - Block 2 lead `Connect all your experimental results in one place and train custom AI on your data, from FACS screening to high resolution assays.`; filenames `P450_substr_spec_R1.csv`, `Metab_path_opt_R2.xlsx`, `Biocat_act_screen_R3.csv`, `Proc_temp_stab_R1.csv`, `Enz_expr_lvls_R2.xlsx`, `Chem_conv_rates_R1.csv`, `Ind_yield_opt_R2.csv` (icon `inline-affinity-2705c8.svg`); `Start training` pill glow `rgba(14,165,233,.5) 0 1px 40px`. Ticker ≈15 px/s up. Features `Works with any format and assay` (~31), `Train AI throughout your program` (~34), `No historical data? No problem.` / `Start a new program from a single sequence, or kick-start your Cradle journey with data you have already collected.`
  - Block 3 image `benefits-lwJeDE.png`; features `Simple workflows` (~35), `Mutations where you want them` (~42), `AI your whole team understands.` (~29).
  - Phone live quirk: the intro H2 still reads `Your new AI-assisted therapeutics pipeline` and the compact "before" row reuses `Target ID` / `Lead Op` labels (`Target ID`, `Variant generation`, `Optimization`, `Lead Op`, `Scale up`); Cradle row `m_ind_start`: `Project design`, `AI Protein Engineering`, `Scale up`. Decide whether to copy the bug.
- **I4 Modalities**: H2 `Works on any protein and all properties`, lead ~35 words with the same `Contact our sales team` inline link. Tabs `Enzymes` (active, tile `#0ea5e9`, glyph `datauri-enzyme-cf640c.svg`), `Binders` (18×18 glyph `datauri-binding-ae0969.svg`), `Peptides` (`inline-peptide-a0c795.svg`). Accent bars `#0ea5e9`. Items (titles verbatim; bodies placeholder unless ≤25 words): `Explore improvements beyond the active site` (~63), `Improve activity, specificity, and more` (~39), `Improve performance of heterologous enzymes` (~43), `Screening data without the combinatorial headache` (~41), `Leverage natural diversity` / `You can provide Cradle with diverse natural homologs of interest, helping the models tease out important underlying patterns.`, `Capture epistatic effects from the start of the program` (~27), `Keep learning across assay conditions and experimental batches` (~56). Seven items (last row single). Same CTA card. Appear delays by row 0.1/0.1/0.2/0.2/0.3/0.3/0.4.
- **I5 Case quote**: larger variant: section 1440×640, padding `160px 40px`; quote block 850 wide with left border 6px `#0ea5e9`, **H2 64/64/-2.56** `#030712` (5 lines): `Cradle's AI-based protein design platform provides easy access and acceleration to protein optimization for the discovery pipeline`. Avatar 56×56 `avatar-tiB8dY.png`, `Eswar Narayanan` / `Director, Corteva Catalyst`. Word reveal (17 words). Phone: 390×516, H2 32/35.2.
- **I6 Workflow tabs**: lead `Design with generative AI customized to your protein and run experiments like you always do.` Otherwise identical.
- **I7 Security**, **I8 Footer CTA dark**: identical to biopharma.

## Links (industrial)
Same-site: ../get-started (×3), ./biopharma#usp1 (live bug). EXTERNAL: none in body.

## Assets (solutions-industrial)
New files live in `public/assets/pages/solutions-industrial/` (full resolution, query params stripped). Files marked (existing) are already in `public/assets/` (see `public/assets/MANIFEST.md`) or in another page folder of this spec. Rendered sizes are CSS px; n/a = not rendered at that width (or only in an interactive state).

| file | used in (framer layer) | original URL | file size/format | rendered 1440 | rendered 390 |
|---|---|---|---|---|---|
| `public/assets/logo-wordmark.png` (existing) | Wordmark 2 | https://framerusercontent.com/images/AtEI6tbWiHI47fwFzLXMJG4y8oE.png | 222×66 png | 78×22.1 | 78×22.1 |
| `public/assets/pages/solutions-industrial/data-3kLG8J.png` | data | https://framerusercontent.com/images/3kLG8Jz4wJV4sai3x3zkIyMf4.png | 2560×1760 png | 1200.7×676.4 | 460×285.4 |
| `public/assets/pages/solutions-industrial/logos-UekOaZ.svg` | logos | https://framerusercontent.com/images/UekOaZVek5Gkqn2DtzhtBUy0.svg | svg | 107×35 | 97×24 |
| `public/assets/pages/solutions-industrial/logos-7vYN5L.svg` | logos | https://framerusercontent.com/images/7vYN5LbPskceSxlSU74u9X8zdTs.svg | svg | 107×35 | 97×24 |
| `public/assets/pages/solutions-industrial/logos-3xsUSq.svg` | logos | https://framerusercontent.com/images/3xsUSqKFzxOQD3erKH0HPLvH4w.svg | svg | 107×35 | 97×24 |
| `public/assets/pages/solutions-biopharma/img-GJxfO9.mp4` (existing) | img | https://framerusercontent.com/assets/GJxfO9H6gZKMsUoB87z1ttg60Vc.mp4 | mp4 1318 KB | 1439.3×778 | 525×283.8 |
| `public/assets/pages/solutions-industrial/benefits-lwJeDE.png` | benefits | https://framerusercontent.com/images/lwJeDEGDffYU2Je9mTr6krprk8.png | 2850×1796 png | 846.7×457.7 | 350×220 |
| `public/assets/benefits-grid-pattern.svg` (existing) | bg-pattern | https://framerusercontent.com/images/9c47fOR3CNoSsEtr6IEYJoKM.svg | svg | 1440×600 | 390×600 |
| `public/assets/pages/solutions-biopharma/cta-iWZePD.png` (existing) | cta | https://framerusercontent.com/images/iWZePDHrnhcKQtxFx1Ah1N2JJY.png | 1544×1186 png | 220×152 | n/a |
| `public/assets/pages/solutions-industrial/avatar-tiB8dY.png` | avatar | https://framerusercontent.com/images/tiB8dYjCwRlJyI4wnbvYdTxqE.png | 800×800 png | 56×56 | 40×40 |
| `public/assets/pages/platform/1-2v3dNU.png` (existing) | 1 | https://framerusercontent.com/images/2v3dNUIi6OGXFJmP7CahPLz7KWg.png | 1280×1000 png | 400×313.8 | 354×277.7 |
| `public/assets/pages/platform/2-rVPCq9.png` (existing) | 2 | https://framerusercontent.com/images/rVPCq9JIaYAKrdzeBvooHblRE.png | 1280×1000 png | 400×313.8 | 354×277.7 |
| `public/assets/pages/platform/ui-hMhVEl.png` (existing) | 3 | https://framerusercontent.com/images/hMhVElfVP5EMobCToP5D6bDV5N4.png | 1280×1000 png | 400×313.8 | 354×277.7 |
| `public/assets/pages/solutions-biopharma/security-mEhlsH.png` (existing) | security | https://framerusercontent.com/images/mEhlsHmlGJYd9WA4bDJWoH6sR1A.png | 1104×1532 png | 615×715 | n/a |
| `public/assets/ui-report-cta.png` (existing) | report | https://framerusercontent.com/images/IfqouN2MOOjMjZsnHQBzBZfe6c.png | 2560×1760 png | 719.4×446.3 | 253.4×157.2 |
| `public/assets/ui-round.png` (existing) | round | https://framerusercontent.com/images/M1VjhVbzNNZuncHQjV3aQJDdKo.png | 2560×1760 png | 721.6×447.7 | 254.2×157.7 |
| `public/assets/ui-data.png` (existing) | data | https://framerusercontent.com/images/1sLbKCfenmgZZIF3rnKvoWX6w.png | 2560×1760 png | 719.4×446.3 | 253.4×157.2 |
| `public/assets/pages/solutions-industrial/inline-affinity-2705c8.svg` | inline SVG in `affinity` | (inline markup) | svg | 22×19 | |
| `public/assets/pages/platform/inline-video-trigger-d14d23.svg` (existing) | inline SVG in `button` | (inline markup) | svg 24×24 | 24×24 | |
| `public/assets/pages/solutions-biopharma/inline-peptide-a0c795.svg` (existing) | inline SVG in `Peptide` | (inline markup) | svg 32×32 | 25×24 | |
| `public/assets/pages/solutions-biopharma/inline-mobile-fa6e92.svg` (existing) | inline SVG in `mobile` | (inline markup) | svg | 10×8 | |
| `public/assets/pages/solutions-industrial/inline-affinity-3bfcd0.svg` | inline SVG in `affinity` | (inline markup) | svg | 16×15 | |
| `public/assets/pages/solutions-industrial/datauri-eyebrow-824e99.svg` | data-URI img in `eyebrow` | (data URI) | svg 24×24 | 23×23 | |
| `public/assets/pages/solutions-industrial/datauri-enzyme-cf640c.svg` | data-URI bg in `enzyme` | (data URI) | svg 24×24 | 24×24 | |
| `public/assets/pages/solutions-industrial/datauri-binding-ae0969.svg` | data-URI bg in `binding` | (data URI) | svg 17.598×17.366 | 18×18 | |

---

# /modality/antibody

Title `AI-Guided Antibody Development • Cradle`. Doc height 8068 (1440) / 8108 (390). Screenshot `reference/pages/modality-antibody-1440.png`.
Template **ModalityPage** (shared with /modality/enzyme, /vaccine, /peptide; each page re-orders or swaps a few blocks, see their sections). Accent: green `#3cab57` (glow `#61c779`).
Order: Navbar · M1 Property-ticker hero · M2 "What if" + PipelineCompare · M3 Feature list (sticky-style 2 col) · M4 Product video mock · M5 Selected properties · M6 Case studies (logos + quote + cards) · M7 Teams (2 photo cards with buttons) · M8 Footer CTA **blue variant** · Footer.
Two stray 126×8 bars (bg `rgba(0,0,0,.04)`, radius 4) are absolutely positioned at (41,60) and (41,70) in the page root on all modality pages; they are invisible under the nav and can be ignored.

## M1 Hero (`hero`)
- 1440×897, padding `120px 40px 60px`, bg `#030712`, column gap 40, centered.
- **PropertyTicker** block (960 wide, gap 10), mask `radial-gradient(36% 100%, #000 20.26%, transparent 100%)`: four 64-tall rows, each a horizontal marquee (`section` padding 10, mask `linear-gradient(to right, transparent 0%, #000 12.5%, #000 87.5%, transparent 100%)`, list gap 10). Items are 254-wide cells with centered H3 32/38.4/-0.64/500 white at **opacity .5**:
  - row 1 `Specificity`, `Thermostability`, `Aggregation`, `Expression` (≈35 px/s leftward)
  - row 2 `Immunogenicity`, `Humanness`, `Hydrophobicity`, `Cross-reactivity` (≈25 px/s)
  - row 3 `Thermostability`, `Aggregation`, `Specificity` (≈20 px/s)
  - row 4 `Cross-reactivity`, `Hydrophobicity`, `Humanness`, `Immunogenicity` (≈40 px/s)
  (speeds from translateX deltas over 0.9s; all move left, loop seamlessly.)
- **Icon tile** centered over the ticker (abs, z3) 112×112 at (664,207), radius 28, bg `#3cab57`, shadow `rgba(0,0,0,.6) 0 14px 32px 0, #61c779 0 1.75px 32px 0`, containing an 80×80 white antibody glyph drawn as a CSS mask (`datauri-hero-4156f4.svg`).
- Text stack (1360 wide, gap 33, centered):
  - Eyebrow (no square) Spot Mono 18/24/1.08 uppercase **`#3cab57`** center: `AI-GUIDED ANTIBODY DEVELOPMENT`
  - H1 Rethink Sans **80/76/-3.2/500** white center, max 800 wide (2 lines): `Make your complex biologics happen.`
  - Lead center, color `#9ca3af`, max-w 640: `Get to clinically viable antibody candidates faster. Meet every property in your TPP, with fewer programs lost along the way.`
  - Buttons (row gap 10, padding 4, radius 16): Primary48 (padding `0 32px`) `Talk to sales` → ../get-started; Secondary48 `Read the Cradle whitepaper` → ../whitepaper.
- Phone: 390×797, padding `110px 20px 40px`. Ticker rows 48 tall with H3 24/28.8/-0.48; mask `radial-gradient(62% 57%, …)`. Icon tile 80×80 radius 20 at (155,181). Eyebrow 14/24/0.84; H1 40/38/-1.6; lead 16/24; buttons stacked full width (342×48, gap 10).
- Motion (appear on load, exact): icon `11ew8hn` scale .2→1, y 100→0, spring stiffness 376 damping 80 mass 2, delay 0. Eyebrow `1n8vwsl` and H1 `1fsu10u` opacity .001→1, y 20→0, spring duration 0.8 bounce 0, delay 0.5; lead `1gbpsdy` same, delay 0.7; buttons `5caf0x` same, delay 0.5. Tickers run continuously from load.

## M2 "What if" + pipeline (`hero` #2)
- 1440×932.4, padding `120px 40px 0`, bg `#030712`, gap 40.
- Text block (max-w 700, gap 20, padding-bottom 80, centered): H1 Rethink Sans **44/44/-0.88/600** white center `The next generation of biologics needs more than affinity` (2 lines); paragraph Lead `#9ca3af` center, ~51 words, 5 lines (placeholder). Appear `lna1wc`: opacity .001→1, y 20→0, tween 0.3s ease `[0.12,0.23,0.19,1]`, delay 0.1.
- **PipelineCompare** identical to /solutions/biopharma B3 (same stage labels, `bio_start`→`bio_end` animation), legends `Antibody development before` / `Antibody development with Cradle`.
- Phone: padding `120px 40px 0`; H1 28/28/-0.56/600; paragraph 16/24 (10 lines); compact pipeline (labels 10/16, see biopharma phone; legends 18/21.6, Cradle legend wraps to 2 lines).

## M3 Feature list (`modalities`)
- 1440×1081.9, padding `120px 40px 160px`, bg white; bg-pattern layer 1440×1440 (same pattern as biopharma B4, `aspect-ratio:1`).
- Row (max-w 1280, gap 70, align start): left H2 (585 wide) `Move faster from screening hit to scalable antibody.` (64, 3 lines). Right column 625 wide (padding-right 40, bg white, gap 80) with 3 blocks (max-w 500, gap 20): eyebrow-style label Spot Mono 18/24/1.08 uppercase `#3cab57`, H4 24/28.8 (2 lines), Body paragraph.
  1. `FEWER ROUNDS` / `Reach your full target product profile 2-12x faster` / ~30 words
  2. `BETTER ANTIBODIES` / `Explore sequence space your intuition wouldn't reach.` / ~34 words
  3. `BUILT FOR SCIENTISTS` / `An intuitive workbench for antibody scientists` / ~27 words
- Motion: each block fades/slides in while in view (opacity 0→1, y 20→0, ≈0.4s ease-out) as it enters, and reverses when it leaves the viewport (replays).
- Phone: padding `120px 20px 80px`; single column, gap 70 between H2 and the list; label 14/24/0.84, H4 18/21.6, body 14/22.4; pattern 390×390 at 82px tiles.

## M4 Product video (`desktop mock`)
- 1440×738, bg `#030712`, overflow clip. Frame `ui` 1140×629.3 (centered, z2, padding 20, bg `rgba(255,255,255,.04)`, radius 24, 1px border `rgba(255,255,255,.16)`, radial mask fading the bottom) containing a muted looping video `ui-RQcVIw.mp4` 770×412.5 (radius `12 12 0 0`, cover).
- Motion: scroll-linked: video wrapper scale .7→1 and opacity .1→1 as the section scrolls in (progress 0 when the video top is ≈90px below the viewport bottom, 1 when it is ≈400px from the viewport top, ≈590px of scroll; linear, slight smoothing).
- Phone: 390×227.5; frame full width, video 245×131.3; no scale effect captured.

## M5 Selected properties (`properties`)
- Full-width dark band (`#030712`), inner section 1200 wide, padding `80px 40px 120px`, gap 80.
- Header (739 wide, centered, gap 44): eyebrow (no square) `SELECTED PROPERTIES` Spot Mono 18 `#9ca3af`; H2 `If you can measure it, you can optimize it with Cradle.` (64, white, center, 2 lines); Lead center `#616e80`: `Set multiple objectives and let your team's project-specific model find candidates that balance them.`; button row (gap 16, bg `rgba(255,255,255,.12)`): Primary48 `Talk to Sales` → ../get-started, Secondary48 `Read whitepaper` → ../whitepaper.
- Properties grid 5 cols × 204.8, gap 24: H5 (18/25.2/-0.18/600 white) + Body `#616e80`: `Binding` / `KD, kon, koff, specificity, cross-reactivity, pH-dependent binding`; `Stability` / `Thermostability (Tm), aggregation, viscosity`; `Manufacturability` / `Expression yield, hydrophobicity (HIC)`; `Immunogenicity` / `Humanness, T-cell epitope risk, MHC binding`; `Developability` / `PTM liabilities (isomerization, deamidation, oxidation), polyspecificity`.
- Motion: eyebrow words reveal (homepage Eyebrow word-stagger: y 8→0, 0.8s, stagger 0.1s).
- Phone: padding `40px 20px 60px`, gap 40; eyebrow 14; H2 32; buttons stacked full width; properties single column (H5 16/20, body 14/22.4, 10px under the H5, 25px between properties).

## M6 Case studies (`cases`)
- 1440×1243.6, padding `120px 40px`, bg `#f3f4f6`. Content max-w 1280, gap 40.
- Eyebrow `CASE STUDIES` (Spot Mono 18 `#9ca3af`, word reveal); H2 `8 of the top 25 pharma companies already use Cradle.` (64, `#1f2937`, max 1024, 2 lines).
- Logo grid 5 cols × 224 (gap 60 row / 40 col), logos 117 max × 42, opacity .6 (all existing homepage customer logos; `zwIhUJ…` = `customer-logo-repligen.svg`).
- Quote row (gap 24, align end): white card 768.9×294.4 (padding 80, radius 16) with **Crimson Pro 28/33.6** `#030712` quote (`"Cradle's platform provides us with scalable scientist-centric solutions …"`, ~30 words; the closing phrase `deliver faster, more effective medicines` in `#2d66f8`); person card 487.1×294.4 bg `#2d66f8`, radius 16, centered column: avatar 40×40 radius 8 with 2px white border, `avatar-oBdmCN.jpg` (shared with biopharma), name `Anastasia Hager, Ph. D.` white, role `Global Head of Drug Discovery Sciences, Bayer` `rgba(255,255,255,.6)` (live bug: the role is wrapped in a link to `https://obal He`; render as plain text).
- 4 **CaseStudyCard**s (homepage component, 302 wide, image 302×160.4 radius 16, 4px hover ring `#2d66f8`, title hover `#030712`), gap 24:
  1. `Rescuing a stalled IgG campaign: 10 candidates meeting potency and developability criteria in 3 rounds` → ../blog/igg-campaign (image `case-igg-campaign.png`, existing)
  2. `Engineering polyspecific anti-venom VHHs with sub-nanomolar binding and high thermostability` → ../blog/polyspecific-anti-venom-vhhs (`variant-1-rkmKWh.png`)
  3. `Engineering polyspecific VHHs with picomolar binding to SARS-CoV-2 wild type and Omicron` → ../blog/polyspecific-vhhs-sars-cov-2 (`variant-1-IZZ2BY.png`)
  4. `Optimizing Cetuximab: An update on our win of the Adaptyv 2024 competition` → ../blog/adaptyv2 (`variant-1-oPewEN.png`)
- Phone: padding `60px 20px`, gap 24; H2 32 (280 wide); logos 3×90 grid; quote card padding 24 with Crimson 22/26.4; person row (avatar 40, name/role 14/22.4, role `#9ca3af`); cards in a 2-col grid (167 wide, image 167×88.7, title 14/22.4).

## M7 Teams (no name; `team-carousel`)
- 1080 wide, padding `100px 0`, gap 80. Header identical to /platform P7 but H2 `Same experimental workflow. Better results.` with the same lead and check row.
- Cards: same **PhotoCard** as /platform P7 but 535×500 each (gap 10), bottom text block gap 10 with a secondary36-style button (h48 here, padding `0 32px`, text 14/600): card 1 H4 `For scientists` + `Learn more about the Cradle platform` → ../platform; card 2 H4 `For computational teams` + `Read documentation` → **EXTERNAL** https://docs.cradle.bio/.
- Motion: check badges scale .7→1, 0.5s.
- Phone: padding 40, cards 310×280 stacked (gap 10), H4 18, button 13px.

## M8 Footer CTA blue (`footer-cta`) (**FooterCTA** variant `blue`)
- Homepage footer-CTA structure with: bg solid `#2d66f8`; H1 line 1 `Ready to get to clinical faster?` white, line 2 `Talk to the Cradle team.` `#92bafe`; button wrapper (bg `rgba(255,255,255,.12)`, radius 16, padding 4, gap 10) holding Secondary48 `I'm interested` → ../get-started and **Ghost48** `Read the whitepaper` → ../whitepaper (white text); gradient band `linear-gradient(rgba(45,102,248,0) 51%, rgba(45,102,248,.5) 100%)`.
- Phone: 390×668, padding `120px 40px 0`, H1 40/40/-1.6 (4 lines), buttons stacked (223.5 wide), screens ≈253×157 with radius `12 12 0 0`.
- Motion: screens slide-up as on the homepage.

## Links (antibody)
Same-site: ../get-started, ../whitepaper (×3), ../platform, ../blog/igg-campaign, ../blog/polyspecific-anti-venom-vhhs, ../blog/polyspecific-vhhs-sars-cov-2, ../blog/adaptyv2. EXTERNAL: https://docs.cradle.bio/ (Read documentation), `https://obal He` (broken live link on the role text).

## Assets (modality-antibody)
New files live in `public/assets/pages/modality-antibody/` (full resolution, query params stripped). Files marked (existing) are already in `public/assets/` (see `public/assets/MANIFEST.md`) or in another page folder of this spec. Rendered sizes are CSS px; n/a = not rendered at that width (or only in an interactive state).

| file | used in (framer layer) | original URL | file size/format | rendered 1440 | rendered 390 |
|---|---|---|---|---|---|
| `public/assets/logo-wordmark.png` (existing) | Wordmark 2 | https://framerusercontent.com/images/AtEI6tbWiHI47fwFzLXMJG4y8oE.png | 222×66 png | 78×22.1 | 78×22.1 |
| `public/assets/benefits-grid-pattern.svg` (existing) | bg-pattern | https://framerusercontent.com/images/9c47fOR3CNoSsEtr6IEYJoKM.svg | svg | 1440×1440 | 390×390 |
| `public/assets/pages/modality-antibody/ui-RQcVIw.mp4` | ui | https://framerusercontent.com/assets/RQcVIwdv0x0AvRkMg94MjEzLI.mp4 | mp4 2335 KB | 770×412.5 | 245×131.3 |
| `public/assets/customer-logo-novo-nordisk.svg` (existing) | content | https://framerusercontent.com/images/RzFCW4BGahMQ5UyzrWnZqCb2nE.svg | svg | 117×42 | 90×39 |
| `public/assets/customer-logo-jnj.svg` (existing) | content | https://framerusercontent.com/images/NNOIC4y7PhTDgk0yuG2XEBVQeTQ.svg | svg | 117×42 | 90×33.6 |
| `public/assets/customer-logo-bayer.svg` (existing) | content | https://framerusercontent.com/images/5a0pQd2IWouqVfhkiEKYCtPedM.svg | svg | 117×42 | 90×39 |
| `public/assets/customer-logo-abbvie.svg` (existing) | content | https://framerusercontent.com/images/WWPHALSmU8sypw0cb6qwKuWLb24.svg | svg | 117×21.8 | 90×16.8 |
| `public/assets/customer-logo-hansa.svg` (existing) | content | https://framerusercontent.com/images/yffefaHejeGA519Z70MjCTGMxFI.svg | svg | 117×42 | 90×39 |
| `public/assets/customer-logo-illumina.svg` (existing) | content | https://framerusercontent.com/images/VJNMk77p52CD9Z81GERCNgR9f4.svg | svg | 117×26.7 | 90×20.5 |
| `public/assets/customer-logo-csl.svg` (existing) | content | https://framerusercontent.com/images/MleukVGRRNyR2iVHFWQFky0g8c.svg | svg | 117×42 | 90×39 |
| `public/assets/customer-logo-lundbeck.svg` (existing) | content | https://framerusercontent.com/images/9BailNhHuuybz72q93fOyVTqs.svg | svg | 117×42 | 90×37.7 |
| `public/assets/customer-logo-ultragenyx.svg` (existing) | content | https://framerusercontent.com/images/fG7WNPtJqIJK65b1efymRYVvcg8.svg | svg | 117×42 | 90×33.6 |
| `public/assets/customer-logo-repligen.svg` (existing) | content | https://framerusercontent.com/images/zwIhUJdcL3DPmch49JKoIIRihmE.svg | svg | 117×26.5 | n/a |
| `public/assets/pages/solutions-biopharma/avatar-oBdmCN.jpg` (existing) | avatar | https://framerusercontent.com/images/oBdmCND3HzkJmc3JiARv6oZhrM.jpg | 439×439 jpeg | 40×40 | 40×40 |
| `public/assets/case-igg-campaign.png` (existing) | Variant 1 | https://framerusercontent.com/images/BxXtrMbTWl6eupW0bp1qEL5ZI.png | 2400×1260 png | 302×160.4 | 167×88.7 |
| `public/assets/pages/modality-antibody/variant-1-rkmKWh.png` | Variant 1 | https://framerusercontent.com/images/rkmKWhBIqCVp5PkbS2NXYMHemQ.png | 2400×1260 png | 302×160.4 | 167×88.7 |
| `public/assets/pages/modality-antibody/variant-1-IZZ2BY.png` | Variant 1 | https://framerusercontent.com/images/IZZ2BYMQhuRJMkkT4XMs4jiKM.png | 2400×1260 png | 302×160.4 | 167×88.7 |
| `public/assets/pages/modality-antibody/variant-1-oPewEN.png` | Variant 1 | https://framerusercontent.com/images/oPewENrrJiCR2BbhRRQDhsEks.png | 2400×1280 png | 302×160.4 | 167×88.7 |
| `public/assets/pages/platform/wetlab-riCniX.png` (existing) | wet lab | https://framerusercontent.com/images/riCniXBWMkubE5HZ7IR2p5Srs.png | 960×1100 png | 587.5×625 | 310×329.8 |
| `public/assets/pages/platform/computational-AcW1X3.png` (existing) | computational | https://framerusercontent.com/images/AcW1X3KdCLZFYY8h8JvDQW2NkMw.png | 960×1100 png | 587.5×625 | 310×329.8 |
| `public/assets/ui-report-cta.png` (existing) | report | https://framerusercontent.com/images/IfqouN2MOOjMjZsnHQBzBZfe6c.png | 2560×1760 png | 719.4×446.3 | 253.4×157.2 |
| `public/assets/ui-round.png` (existing) | round | https://framerusercontent.com/images/M1VjhVbzNNZuncHQjV3aQJDdKo.png | 2560×1760 png | 721.6×447.7 | 254.2×157.7 |
| `public/assets/ui-data.png` (existing) | data | https://framerusercontent.com/images/1sLbKCfenmgZZIF3rnKvoWX6w.png | 2560×1760 png | 719.4×446.3 | 253.4×157.2 |
| `public/assets/pages/platform/inline-end-6be8c4.svg` (existing) | inline SVG in `end` | (inline markup) | svg | 11×9 | |
| `public/assets/pages/modality-antibody/datauri-hero-4156f4.svg` | data-URI mask in `hero` | (data URI) | svg 24×24 | 80×80 | |

---

# /modality/enzyme

Title `AI-Guided Enzyme Engineering • Cradle`. Doc height 8967 (1440) / 7937 (390). Screenshot `reference/pages/modality-enzyme-1440.png`.
ModalityPage variant with accent **sky** (`#0ea5e9`). Order: Navbar · E1 Video hero · E2 Problem statement · E3 PipelineCompare (static) · E4 Feature list (= antibody M3) · E5 Product video + selected properties (merged) · E6 Case studies · E7 Teams · E8 Footer CTA blue · Footer.

## E1 Video hero (`hero`)
- 1440×1628, padding `240px 40px 60px`, bg `#030712`. Content max-w 1280, column gap 40, left-aligned.
- **SlashEyebrow** (row gap 5): `/` in Spot Mono 18/24/1.08 `#2d66f8` + `AI-GUIDED ENZYME OPTIMIZATION` white.
- Row (gap 40): H2 (744 wide) `Optimize all your enzyme properties in the same campaign` (64, white, 3 lines); right column 496 wide (padding-top 12) with a Lead `rgba(255,255,255,.8)` paragraph (~29 words, 4 lines; placeholder).
- Video player 1280×720 (16:9), bg black, radius 12: **EXTERNAL embedded Mave player** (`<mave-player>`, poster `content-vqPB1r.jpg` from `space-o6awa.video-dns.com`, centered with `translate(-50%,-50%)`, `background-size:contain`). The clone should show the poster image with a play affordance (the player's own controls are third-party and were not inspected).
- Buttons (gap 16, padding-bottom 24): Primary48 (padding `0 20px`) `Read enzyme case studies` → `./enzyme#case` (in-page anchor to E6); Secondary48 `Explore platform` → ../platform.
- Logo row (3 cols × 413.3, gap 20): tiles 160 tall, bg `rgba(255,255,255,.12)`, radius 8, each with one logo 117×42 (opacity .6, radius 8): `UekOaZ…svg`, `3xsUSq…svg`, `7vYN5L…svg` (same files as the industrial ticker: `public/assets/pages/solutions-industrial/logos-*.svg`).
- Phone: 390×924.5, padding `110px 20px 40px`, gap 24. Eyebrow 14/24/0.84; H2 32/35.2; lead 16/24 (5 lines); video 350×196.9; buttons stacked full width (48 tall); logo tiles 111.3×80 (gap 8), logos 89×24.
- Motion (appear on load, exact): H2 `1eui8ih` opacity .001→1, y 20→0, spring 0.8 bounce 0, delay 0.1; lead `8ky5on` same, delay 0.2; buttons `xxlrl` opacity, y 8→0, tween 0.4s ease `[0.12,0.23,0.5,1]`, delay 0.15.

## E2 Problem statement
- 1440×530, bg `#030712`; inner (`cotnent`) max-w 1280, padding `80px 40px`, row gap 40: H2 (580 wide) `Every enzyme engineer has seen the pattern…` (64, white, 3 lines); right column 580 wide with three Lead paragraphs `rgba(255,255,255,.8)` (gap 20): ~44 words (5 lines), ~26 words (4 lines), and `Cradle was built for teams past the screening hit. The goal is to get you to a variant that holds up at scale.`
- Phone: padding `40px 20px`, column gap 24, H2 32, paragraphs 16/24.

## E3 Pipeline (static)
- Section 1440×608.8, padding `120px 40px 0`, bg `linear-gradient(#030712 20%, #082f49 100%)`, top border 1px `rgba(255,255,255,.08)`.
- PipelineCompare layout as biopharma, legends `Enzyme discovery before` / `Enzyme discovery with Cradle` (Cradle swatch solid `#0ea5e9`). Row A stages: `Project design`, `Variant generation`, `Optimization`, `Application testing`, `Scale up`. Row B (`timeline`) is **already compressed and static**: three 253.3-wide stages in a 768-wide group: `Project design` (`rgba(255,255,255,.12)`, label .8), `AI protein engineering` (bar solid `#0ea5e9`, label white), `Scale up`. No animation.
- Phone: padding `40px 16px 0`; compact labels (10/16); live quirk: row A shows `Target ID` … `Lead Op` and row B `Target ID`, `AI Protein Engineering`, `Preclinical` (antibody labels left over).

## E4 Feature list (`modalities`)
- As antibody M3 but section padding `120px 40px`, no bg pattern, labels in `#0ea5e9`: `FEWER ROUNDS` / `Stop running dozen-round directed evolution campaigns` (~48 words); `BETTER ENZYMES` / `Optimize for activity, stability, and expression in parallel` (~52); `BUILT FOR BIOLOGISTS` / `An intuitive workbench for any enzyme class` (~47). H2 `Move faster from screening hit to scalable enzyme.` Same in-view replay motion.

## E5 Product video + properties (`properties`)
- One dark section 1440×1542.4, padding `80px 40px 120px`, gap 80, bg `#030712`: first the `desktop mock` (1280×738, video `ui-tWumED.mp4` 770×413.3, same frame + scroll-linked scale .7→1/opacity .1→1 as antibody M4), then the properties block: eyebrow `SELECTED PROPERTIES`, H2 `If you can assay it, you can optimize it with Cradle.`, lead `Set multiple objectives and let your team's project-specific model find sequences that balance them.`, buttons `Talk to Sales` / `Read whitepaper` (same as antibody), properties grid **4 cols × 302** (gap 24): `Activity` / `Catalytic turnover, kcat, specific activity, substrate conversion`; `Stability` / `Thermostability (Tₘ), pH tolerance, solvent tolerance, shelf life`; `Selectivity` / `Product selectivity, substrate specificity, enantioselectivity`; `Application-specific` / `Fermentation robustness, formulation compatibility`.

## E6 Case studies (`cases`, anchor `#case`)
- As antibody M6 minus the logo grid: eyebrow `CASE STUDIES`, H2 `Wet lab validated. Trusted at industrial scale.` (64, `#1f2937`); quote card 768.9×328 (Crimson 28/33.6, ~29 words, 5 lines) + blue person card: avatar `avatar-drK6tN.png`, `Claus Fuglsang Crone` / `Chief Scientific Officer, Novonesis`.
- Cards (CaseStudyCard): `Using AI to produce vaccine adjuvants without cutting down rainforest` → ../blog/keasling-qs21 (image = existing `case-keasling-qs21.png`) · `Improving haloalkane dehalogenase thermostability by +20 °C while enhancing activity and expression` → ../blog/haloalkane-dehalogenase-thermostability (`variant-1-Oy964Y.png`) · `'Align to Innovate' benchmark: state-of-the-art enzyme engineering with fully-automated GenAI` → ../blog/align-to-innovate-benchmark (`variant-1-ln7s2S.jpg`) · `Case study: design better P450s 4X faster by combining AI-generated mutations with human expertise` → ../blog/case-study-combining-ai-generated-mutations-with-human-expertise-for-better-enzyme-designs (`variant-1-7wk2YA.jpg`).

## E7 Teams (`teams`)
- 1440×1100, padding `120px 40px 140px`; content max-w 1280, gap 40, **left-aligned** header: H2 `Same experimental workflow — better results.` (64, renders on 2 lines, 1280×128), lead (680) as platform P7, check row left-aligned.
- Two PhotoCards 635×500 (gap 10): `Wet lab` / `Computational` (no buttons; same copy as platform P7). Photos 650×745 mirrored.

## E8 Footer CTA blue
- As antibody M8 but section 1440×850; H1 single-colour white `Better enzymes start with Cradle` (2 lines); buttons stacked in a 300-wide column (gap 10, no translucent wrapper): Secondary48 `Let's talk` → ../get-started, Ghost48 `Read the whitepaper` → ../whitepaper.

## Links (enzyme)
Same-site: ./enzyme#case, ../platform, ../get-started, ../whitepaper (×2), the four ../blog/* case links. EXTERNAL: Mave video player (`space-o6awa.video-dns.com`).

## Assets (modality-enzyme)
New files live in `public/assets/pages/modality-enzyme/` (full resolution, query params stripped). Files marked (existing) are already in `public/assets/` (see `public/assets/MANIFEST.md`) or in another page folder of this spec. Rendered sizes are CSS px; n/a = not rendered at that width (or only in an interactive state).

| file | used in (framer layer) | original URL | file size/format | rendered 1440 | rendered 390 |
|---|---|---|---|---|---|
| `public/assets/logo-wordmark.png` (existing) | Wordmark 2 | https://framerusercontent.com/images/AtEI6tbWiHI47fwFzLXMJG4y8oE.png | 222×66 png | 78×22.1 | 78×22.1 |
| `public/assets/pages/modality-enzyme/content-vqPB1r.jpg` | content | https://space-o6awa.video-dns.com/vqPB1r3SIK/thumbnail.jpg (EXTERNAL player poster) | 1280×720 jpeg | 1280×720 | 350×196.9 |
| `public/assets/pages/solutions-industrial/logos-UekOaZ.svg` (existing) | content | https://framerusercontent.com/images/UekOaZVek5Gkqn2DtzhtBUy0.svg | svg | 117×42 | 89.1×24 |
| `public/assets/pages/solutions-industrial/logos-3xsUSq.svg` (existing) | content | https://framerusercontent.com/images/3xsUSqKFzxOQD3erKH0HPLvH4w.svg | svg | 117×42 | 89.1×24 |
| `public/assets/pages/solutions-industrial/logos-7vYN5L.svg` (existing) | content | https://framerusercontent.com/images/7vYN5LbPskceSxlSU74u9X8zdTs.svg | svg | 117×42 | 89.1×24 |
| `public/assets/pages/modality-enzyme/ui-tWumED.mp4` | ui | https://framerusercontent.com/assets/tWumEDzu9XlCejmrDsGDOGEN3gE.mp4 | mp4 972 KB | 770×413.3 | 217×116.5 |
| `public/assets/pages/modality-enzyme/avatar-drK6tN.png` | avatar | https://framerusercontent.com/images/drK6tN2TD0lvmRgoi7wdNcd5qwE.png | 183×182 png | 40×40 | 40×40 |
| `public/assets/case-keasling-qs21.png` (existing) | Variant 1 | https://framerusercontent.com/images/3xanLcT3TJPy6Zy2FYx9nwRU.png | 1200×630 png | 302×160.4 | 167×88.7 |
| `public/assets/pages/modality-enzyme/variant-1-Oy964Y.png` | Variant 1 | https://framerusercontent.com/images/Oy964YRBRqXuJe8u1q4htgILas.png | 1200×630 png | 302×160.4 | 167×88.7 |
| `public/assets/pages/modality-enzyme/variant-1-ln7s2S.jpg` | Variant 1 | https://framerusercontent.com/images/ln7s2Sj6jJsFHUNZpa6Yk8ujA.jpg | 2400×1280 jpeg | 302×160.4 | 167×88.7 |
| `public/assets/pages/modality-enzyme/variant-1-7wk2YA.jpg` | Variant 1 | https://framerusercontent.com/images/7wk2YAfyZdDZhtZLJH4FS1a0DzE.jpg | 2400×1260 jpeg | 302×160.4 | 167×88.7 |
| `public/assets/pages/platform/wetlab-riCniX.png` (existing) | wet lab | https://framerusercontent.com/images/riCniXBWMkubE5HZ7IR2p5Srs.png | 960×1100 png | 650×744.8 | 350×548 |
| `public/assets/pages/platform/computational-AcW1X3.png` (existing) | computational | https://framerusercontent.com/images/AcW1X3KdCLZFYY8h8JvDQW2NkMw.png | 960×1100 png | 648.6×690 | 350×372.3 |
| `public/assets/ui-report-cta.png` (existing) | report | https://framerusercontent.com/images/IfqouN2MOOjMjZsnHQBzBZfe6c.png | 2560×1760 png | 719.4×446.3 | 253.4×157.2 |
| `public/assets/ui-round.png` (existing) | round | https://framerusercontent.com/images/M1VjhVbzNNZuncHQjV3aQJDdKo.png | 2560×1760 png | 721.6×447.7 | 254.2×157.7 |
| `public/assets/ui-data.png` (existing) | data | https://framerusercontent.com/images/1sLbKCfenmgZZIF3rnKvoWX6w.png | 2560×1760 png | 719.4×446.3 | 253.4×157.2 |
| `public/assets/pages/platform/inline-end-6be8c4.svg` (existing) | inline SVG in `end` | (inline markup) | svg | 11×9 | |

---

# /modality/vaccine

Title `AI-Guided Vaccine & Antigen Engineering • Cradle`. Doc height 8317 (1440) / 8334 (390). Screenshot `reference/pages/modality-vaccine-1440.png`.
ModalityPage variant, accent green `#3cab57`. Order: Navbar · V1 Text hero + logo tiles · V2 (`main`, dark) "What if" + PipelineCompare, then white Feature list · V3 Product video + properties (dark) · V4 Case studies (logos + featured case + testimonial) · V5 Teams (`workflow`) · V6 Footer CTA blue · Footer.

## V1 Hero
- 1440×885, padding `120px 40px 60px`, bg `#030712`; content max-w 1280, gap 40, left-aligned.
- SlashEyebrow: `/` `#2d66f8` + `AI-GUIDED VACCINE & ANTIGEN ENGINEERING` in `#effaf1` (rgb(239,250,241)).
- Row: H2 (780.7 wide) `Expressive, stable antigens. In fewer rounds.` (64, white, 2 lines); right 459.3 wide (offset +12) Lead `#9ca3af`: `Get measurable Tₘ improvements without compromising the immune response — in fewer rounds than traditional rational approaches.`
- Buttons (gap 16, padding-bottom 24): Primary48 (padding `0 20px`) `Read vaccine case studies` → ../blog/staphylococcus-aureus-vaccine; Secondary48 `Explore platform` → ../platform.
- Logo tiles grid 4 cols × 305, 2 rows × 160 (gap 41 row / 20 col); tiles bg `rgba(255,255,255,.12)` radius 8, logos 117×42 max, opacity .6. Logos (white set, files in `public/assets/pages/solutions-biopharma/`): `logos-qzqK7o`, `logos-z1e1uA` (illumina), `logos-oGv9fs`, `logos-ENCnbk` (Lundbeck), `logos-H1JIZo`, `logos-v65Tr9`, `logos-LY569W`, `logos-327vcQ`.
- Appear (exact): H2 `fndfqg` opacity/y 20, spring 0.8 bounce 0, delay 0.1; lead `7nmva5` same, delay 0.2; buttons `cs9flz` y 8, tween 0.4s `[0.12,0.23,0.5,1]`, delay 0.15.
- Phone: 390×897.6, padding `110px 20px 40px`; H2 32/35.2; lead 16/24; buttons stacked full width (350×48, gap 16); logo tiles become a 3-col grid (111.3 wide × 80 tall, gaps 41 row / 8 col). Live quirk: the V4 case-logo grid keeps its desktop size (5×208, 1120 wide) on phone and overflows the viewport; clamp it in the clone.

## V2 `main` (bg `#030712`)
- "What if" block: as antibody M2: H1 44/44/-0.88/600 `Human intuition isn't built for multi-property antigen optimization.` (2 lines) + two Lead paragraphs `#9ca3af` center (~42 and ~40 words, 4 lines each; gap 20). Appear `156ts9n` (= `lna1wc`).
- PipelineCompare: legends `Vaccine discovery before` / `Vaccine discovery with Cradle`; stages `Project design`, `Variant generation`, `Optimization`, `Application testing`, `Scale up`; Cradle row `Project design`, `AI protein engineering` (bar solid `#3cab57`), `Scale up`. **Animated** (`bio_start`→`bio_end`, same as biopharma; replays in both directions as you scroll).
- Feature list (`modalities`, white, padding `120px 40px`, pattern layer 600 tall): H2 `From unstable antigen to thermostable candidate, faster.` (4 lines, 585 wide). Blocks (labels `#3cab57`): `FEWER ROUNDS` / `Measurable improvement, often in a single round` (~48 words; contains InlineLink `Cradle delivered +2.5°C Tₘ in a single zero-shot round, 7× f…` → ../blog/staphylococcus-aureus-vaccine, `#0284c7` hover `#0ea5e9`); `BETTER ANTIGENS` / `Control conformation, epitope presentation, and stability together` (~28); `BUILT FOR BIOLOGISTS` / `An intuitive workbench for any enzyme class` (live copy) (~40).
  - Motion here differs from antibody: the whole right column slides up once (y 40→0, opacity stays 1, 0.4s ease-out) on enter.

## V3 Product video + properties (dark, padding-bottom 40, gap 65)
- `desktop mock` 1440×738 with video `ui-fPEYEm.mp4` (scroll-linked scale .7→1 / opacity .1→1 as antibody M4).
- `properties` (padding `120px 40px`): eyebrow `SELECTED PROPERTIES`, H2 `If you can assay for it, you can optimize it with Cradle.` (844.8 wide), lead `Set multiple objectives and let Cradle find variants that balance them — starting from as few as 96 variants per round.`, buttons `Talk to Sales` / `Read whitepaper`. Grid 5 cols × 236.8 (gap 24): `Immunogenicity` / `Epitope presentation, conformation (prefusion/postfusion), neutralizing antibody response`; `Stability` / `Thermostability (Tm), aggregation resistance, shelf life, storage stability`; `Manufacturability & Expression` / `Expression yield, construct expressibility, solubility, post-translational modification compatibility`; `Formulation` / `Lyophilization compatibility, glass transition temperature (Tg)`; `Structural Tractability` / `Crystallizability, ligand-bound structure formation, assay compatibility, screening compatibility`.

## V4 Case studies (`timleine`)
- 1440×1127.8, padding `120px 40px`, bg `#f3f4f6`. Eyebrow + H2 `8 of the top 25 pharma companies already use Cradle.`; logo grid 5×208 (gap 41/20, logos radius 8).
- Row (gap 24) of two white cards 628×490.8 (padding 40, radius 24):
  - **FeaturedCaseCard** → ../blog/staphylococcus-aureus-vaccine: image 548×285.4 (radius 8, 1px border `rgba(27,27,177,.04)`, existing `case-staph-aureus-vaccine.png`), tag `CASE STUDIES` Inter 11/14.3/-0.44/700 uppercase `#9ca3af`, H4 `#1f2937` `Improving Staphylococcus aureus vaccine thermostability by 2.5 °C in a single round, 7× faster than rational design` (3 lines). Hover: image scales to 1.02 (≈100ms).
  - **Testimonial card**: Crimson Pro 28/33.6 quote (~30 words, `deliver faster, more effective medicines` in `#2d66f8`), bottom avatar row: 56×56 radius 12 avatar (`avatar-oBdmCN.jpg`) + `Anastasia Hager, Ph.D.` / `Global Head of Drug Discovery Sciences, Bayer`.

## V5 Teams (`workflow`)
- Section measured 1339.2 wide centered (x=50.4), padding `120px 80px 80px`, bg white; content max-w 1080. Same as antibody M7 but card 1 H4 `For wet lab scientists` (body copy says "AI-generate"); buttons `Learn more about the Cradle platform` → ../platform, `Read documentation` → EXTERNAL https://docs.cradle.bio/.

## V6 Footer CTA blue
- As antibody M8: H1 `Better vaccines. Faster.` (white) / `Talk to the Cradle team.` (`#92bafe`); buttons in the translucent wrapper: Secondary48 `Talk to sales` → **EXTERNAL** https://cradlebio.typeform.com/to/mduYZaOX (point to /get-started in the clone), Ghost48 `Read the whitepaper` → ../whitepaper.

## Links (vaccine)
Same-site: ../blog/staphylococcus-aureus-vaccine (×3), ../platform (×2), ../get-started, ../whitepaper (×2). EXTERNAL: https://docs.cradle.bio/, https://cradlebio.typeform.com/to/mduYZaOX.

## Assets (modality-vaccine)
New files live in `public/assets/pages/modality-vaccine/` (full resolution, query params stripped). Files marked (existing) are already in `public/assets/` (see `public/assets/MANIFEST.md`) or in another page folder of this spec. Rendered sizes are CSS px; n/a = not rendered at that width (or only in an interactive state).

| file | used in (framer layer) | original URL | file size/format | rendered 1440 | rendered 390 |
|---|---|---|---|---|---|
| `public/assets/logo-wordmark.png` (existing) | Wordmark 2 | https://framerusercontent.com/images/AtEI6tbWiHI47fwFzLXMJG4y8oE.png | 222×66 png | 78×22.1 | 78×22.1 |
| `public/assets/pages/solutions-biopharma/logos-qzqK7o.svg` (existing) | hero | https://framerusercontent.com/images/qzqK7opgh6QkQaJhJvtncPVGOo.svg | svg | 117×42 | 89.1×24 |
| `public/assets/pages/solutions-biopharma/logos-z1e1uA.svg` (existing) | hero | https://framerusercontent.com/images/z1e1uAx0BjEGMjugzBMyxlDKgMU.svg | svg | 117×26.7 | 89.1×20.3 |
| `public/assets/pages/solutions-biopharma/logos-oGv9fs.svg` (existing) | hero | https://framerusercontent.com/images/oGv9fsxFWIJK5t2PowmIBsANCo.svg | svg | 117×42 | 89.1×24 |
| `public/assets/pages/solutions-biopharma/logos-ENCnbk.svg` (existing) | hero | https://framerusercontent.com/images/ENCnbkU8ghDdColu2DilnmMFcA.svg | svg | 117×42 | 89.1×24 |
| `public/assets/pages/solutions-biopharma/logos-H1JIZo.svg` (existing) | hero | https://framerusercontent.com/images/H1JIZoAr3xj2biJhadduGPIhI0.svg | svg | 117×42 | 89.1×24 |
| `public/assets/pages/solutions-biopharma/logos-v65Tr9.svg` (existing) | hero | https://framerusercontent.com/images/v65Tr9puLm4Z4dhhxWoUIFmYOQ.svg | svg | 117×26.5 | 89.1×20.2 |
| `public/assets/pages/solutions-biopharma/logos-LY569W.svg` (existing) | hero | https://framerusercontent.com/images/LY569WlNQQVpLYPGZBMNEaT2LBg.svg | svg | 117×42 | 89.1×24 |
| `public/assets/pages/solutions-biopharma/logos-327vcQ.svg` (existing) | hero | https://framerusercontent.com/images/327vcQLWQhtwRfPbxW19LCAQsw.svg | svg | 117×42 | 89.1×24 |
| `public/assets/benefits-grid-pattern.svg` (existing) | bg-pattern | https://framerusercontent.com/images/9c47fOR3CNoSsEtr6IEYJoKM.svg | svg | 1440×600 | 390×600 |
| `public/assets/pages/modality-vaccine/ui-fPEYEm.mp4` | ui | https://framerusercontent.com/assets/fPEYEmlpPqc0SgtY7bY6XqpQlhs.mp4 | mp4 1069 KB | 770×413.3 | 245×131.5 |
| `public/assets/customer-logo-novo-nordisk.svg` (existing) | timleine | https://framerusercontent.com/images/RzFCW4BGahMQ5UyzrWnZqCb2nE.svg | svg | 117×42 | 117×42 |
| `public/assets/customer-logo-jnj.svg` (existing) | timleine | https://framerusercontent.com/images/NNOIC4y7PhTDgk0yuG2XEBVQeTQ.svg | svg | 117×42 | 117×42 |
| `public/assets/customer-logo-bayer.svg` (existing) | timleine | https://framerusercontent.com/images/5a0pQd2IWouqVfhkiEKYCtPedM.svg | svg | 117×42 | 117×42 |
| `public/assets/customer-logo-abbvie.svg` (existing) | timleine | https://framerusercontent.com/images/WWPHALSmU8sypw0cb6qwKuWLb24.svg | svg | 117×21.8 | 117×21.8 |
| `public/assets/customer-logo-hansa.svg` (existing) | timleine | https://framerusercontent.com/images/yffefaHejeGA519Z70MjCTGMxFI.svg | svg | 117×42 | 117×42 |
| `public/assets/customer-logo-illumina.svg` (existing) | timleine | https://framerusercontent.com/images/VJNMk77p52CD9Z81GERCNgR9f4.svg | svg | 117×26.7 | 117×26.7 |
| `public/assets/customer-logo-csl.svg` (existing) | timleine | https://framerusercontent.com/images/MleukVGRRNyR2iVHFWQFky0g8c.svg | svg | 117×42 | 117×42 |
| `public/assets/customer-logo-lundbeck.svg` (existing) | timleine | https://framerusercontent.com/images/9BailNhHuuybz72q93fOyVTqs.svg | svg | 117×42 | 117×42 |
| `public/assets/customer-logo-ultragenyx.svg` (existing) | timleine | https://framerusercontent.com/images/fG7WNPtJqIJK65b1efymRYVvcg8.svg | svg | 117×42 | 117×42 |
| `public/assets/customer-logo-repligen.svg` (existing) | timleine | https://framerusercontent.com/images/zwIhUJdcL3DPmch49JKoIIRihmE.svg | svg | 117×26.5 | 117×26.5 |
| `public/assets/case-staph-aureus-vaccine.png` (existing) | featured top | https://framerusercontent.com/images/CRRFF43xDoJUsY42UgD9vzcuAM.png | 2400×1260 png | 548×285.4 | n/a |
| `public/assets/pages/solutions-biopharma/avatar-oBdmCN.jpg` (existing) | avatar | https://framerusercontent.com/images/oBdmCND3HzkJmc3JiARv6oZhrM.jpg | 439×439 jpeg | 56×56 | 40×40 |
| `public/assets/pages/platform/wetlab-riCniX.png` (existing) | wet lab | https://framerusercontent.com/images/riCniXBWMkubE5HZ7IR2p5Srs.png | 960×1100 png | 587.5×625 | 350×372.3 |
| `public/assets/pages/platform/computational-AcW1X3.png` (existing) | computational | https://framerusercontent.com/images/AcW1X3KdCLZFYY8h8JvDQW2NkMw.png | 960×1100 png | 587.5×625 | 350×372.3 |
| `public/assets/ui-report-cta.png` (existing) | report | https://framerusercontent.com/images/IfqouN2MOOjMjZsnHQBzBZfe6c.png | 2560×1760 png | 719.4×446.3 | 253.4×157.2 |
| `public/assets/ui-round.png` (existing) | round | https://framerusercontent.com/images/M1VjhVbzNNZuncHQjV3aQJDdKo.png | 2560×1760 png | 721.6×447.7 | 254.2×157.7 |
| `public/assets/ui-data.png` (existing) | data | https://framerusercontent.com/images/1sLbKCfenmgZZIF3rnKvoWX6w.png | 2560×1760 png | 719.4×446.3 | 253.4×157.2 |
| `public/assets/pages/solutions-biopharma/logos-EqXQcN.svg` (existing) | hero | https://framerusercontent.com/images/EqXQcN82KM7ExhkubT8IUiomzbA.svg | svg | n/a | 89.1×24 |
| `public/assets/pages/platform/inline-end-6be8c4.svg` (existing) | inline SVG in `end` | (inline markup) | svg | 11×9 | |

---

# /modality/peptide

Title `AI-Guided Peptide Engineering • Cradle`. Doc height 8163 (1440) / 8212 (390). Screenshot `reference/pages/modality-peptide-1440.png`.
ModalityPage variant, accent green `#3cab57`. Order: Navbar · P1 Text hero with molecule backdrop + logo tiles · P2 "What if" (two-column) + PipelineCompare · P3 Feature list · P4 Image mock + selected properties (dark) · P5 Case studies (logos + featured case + testimonial) · P6 Teams (`workflow`) · P7 Footer CTA blue · Footer.

## P1 Hero
- 1440×889, padding `120px 40px 60px`, bg `#030712`; content (z2) max-w 1280, gap 70. Same layout as /modality/vaccine V1: SlashEyebrow `/` + `AI-GUIDED PEPTIDE ENGINEERING` (`#effaf1`); H2 `Optimize peptides without protein-scale data.` (780.7 wide, 2 lines); right Lead `#9ca3af` (459.3 wide, 4 lines, ~27 words; placeholder); buttons Primary48 `Read peptide case studies` → `./peptide#case`, Secondary48 `Explore platform` → ../platform; 4×2 logo tiles (same 8 white logos as vaccine).
- **Molecule backdrop** (abs, behind content): `hero-mUg9uM.svg` (344×405 source) rendered 675.6×628.7 centered near the top (x=382, y=5), `object-fit:contain`, mask `radial-gradient(41% 24% at 47% 41%, #000 0%, transparent 100%)`.
  - Appear `w093lh` (exact): opacity 0.3→0.55, scale 1.4→1, tween 2s ease `[0.44,0,0.56,1]`, delay 0.
  - Also scroll-linked: measured scale 1.062→1.105 and opacity .261→.232 between scrollY 0 and 150, and 1.133→1.150 / .213→.202 between 600 and 750 (grows and fades as you scroll; the two effects compound, so the exact mapping is approximate).
- Appear (exact): H2 `12lkskf`, lead `k4wv25`, buttons `knkbv4` (same configs as vaccine V1).

## P2 "What if" + pipeline (`hero` #2)
- 1440×984.4, padding `120px 40px 0`, bg `#030712`. Two-column text (gap 40): H1 44/44/-0.88/600 white, 620 wide, **left-aligned** `Peptides aren't just small proteins. Your tools shouldn't treat them like they are.` (3 lines); right 620 wide two Lead paragraphs `#9ca3af` (~49 words 6 lines; ~23 words 3 lines: `Cradle helps scientists engineer better peptides faster by learning from your in-house assay data and building project-specific mo…`, placeholder). Block gap 60 to the pipeline; appear `1neg6x2` (= `lna1wc`).
- PipelineCompare: legends `Peptide discovery before` / `Peptide discovery with Cradle`; row A `Project design`, `Variant generation`, `Optimization`, `Application testing`, `Scale up`; row B `Target identification`, `AI-assisted discovery and optimization`, `Preclinical` (green gradient bar, animated like biopharma).

## P3 Feature list (`modalities`)
- As antibody M3 (no bg pattern; text container 1360 wide). H2 `Move faster from a weak lead to a candidate clearing every constraint.` (4 lines). Blocks: `FEWER ROUNDS` / `Multi-property optimization with peptide-scale data` (~28 words); `BETTER PEPTIDES` / `Reach peptides that clear tight, simultaneous constraints` (~43); `BUILT FOR SCIENTISTS` / `An intuitive workbench for any peptide format` / `Your team runs campaigns directly, no coding required. Your sequences and models stay your exclusive IP.` In-view replay motion as antibody.

## P4 Image mock + properties (`timeline`, dark)
- 1440×1688, padding `0 40px`, bg `#030712`, bottom border 1px `rgba(255,255,255,.08)`; inner column gap 65, padding-bottom 40.
- `desktop mock` frame (1117×625.6, same glass frame as antibody M4) containing a **static image** `ui-DmrQiF.png` (3020×1642 source) 430.8×234.2 radius 16. Scroll-linked: scale .4→1 and opacity 0→1 as it scrolls in (measured scale .4/op 0 at scrollY 2400 → 1.007/op 1 at 2550; i.e. it pops in over ≈150px of scroll with spring overshoot), reverses when scrolled back.
- `properties` (padding `120px 40px`): eyebrow `SELECTED PEPTIDE PROPERTIES` (word reveal), H2 `If you can assay for it, you can optimize it with Cradle.`, lead (same as vaccine, ~22 words), buttons `Talk to Sales` → ../get-started / `Read whitepaper` → ../whitepaper. Grid 4 × 302 (gap 24): `Potency` / `EC50, IC50, KD, on-rate, off-rate, receptor activation`; `Selectivity` / `Off-target binding, receptor specificity, cross-reactivity`; `Stability` / `Metabolic stability, plasma half-life, proteolytic resistance, thermostability (Tm)`; `Developability` / `Expression, solubility, aggregation, synthetic accessibility`.

## P5 Case studies (`timleine`, anchor `#case`)
- As vaccine V4 with H2 `Trusted by 8 of the top 25 pharma companies and industrial R&D leaders.` (2 lines, full 1280 wide), content gap 80, logo grid 1120 wide starting x=160. FeaturedCaseCard → ../blog/therapeutic-peptides: `Engineering therapeutic peptides with 50% success rate under tight multi-property constraints, 5× faster than prior efforts` (image = existing `case-therapeutic-peptides.png`). Testimonial card identical to vaccine (Anastasia Hager quote).

## P6 Teams (`workflow`)
- 1440×1080, padding `120px 80px 80px`, gap 0. H2 `Cradle works with peptide-scale data and constraints.`; lead + checks as antibody M7; card 1 H4 `For peptide engineers`, card 2 `For computational teams`; buttons `Learn more about the Cradle platform` → ../platform, `Read documentation` → EXTERNAL https://docs.cradle.bio/.

## P7 Footer CTA blue
- H1 `Better peptides. Faster.` (white) / `Talk to the Cradle team.` (`#92bafe`); wrapper buttons: Secondary48 `I'm interested` → **EXTERNAL** https://cradlebio.typeform.com/to/mduYZaOX (use /get-started), Ghost48 `Read the whitepaper` → ../whitepaper.

## Phone (all modality pages)
Measured at 390 for every modality page; the patterns are shared: hero padding `110px 20px 40px`, H2 32/35.2/-0.64, lead 16/24/-0.64, buttons full-width 48px stacked (gap 16), hero logo tiles 3 columns × 111.3 (80 tall, gaps 41/8; vaccine/peptide), "what if" H1 28/28/-0.56/600 with 16/24 paragraphs, compact pipeline (10/16 labels; antibody labels leak into enzyme/peptide rows as a live quirk), feature list single column (label 14/24, H4 18/21.6, body 14/22.4), video/image mock ≈350 wide, properties single column (H5 16/20), case H2 32 with a 3-col 90px logo grid on antibody (on vaccine/peptide the 5×208 desktop grid overflows the phone viewport: live quirk), stacked cards, team cards 310×280 stacked, footer CTA H1 40/40/-1.6 with stacked buttons. Doc heights: antibody 8108, enzyme 7937, vaccine 8334, peptide 8212.

## Links (peptide)
Same-site: ./peptide#case, ../platform (×2), ../get-started, ../whitepaper (×2), ../blog/therapeutic-peptides. EXTERNAL: https://docs.cradle.bio/, https://cradlebio.typeform.com/to/mduYZaOX.

## Assets (modality-peptide)
New files live in `public/assets/pages/modality-peptide/` (full resolution, query params stripped). Files marked (existing) are already in `public/assets/` (see `public/assets/MANIFEST.md`) or in another page folder of this spec. Rendered sizes are CSS px; n/a = not rendered at that width (or only in an interactive state).

| file | used in (framer layer) | original URL | file size/format | rendered 1440 | rendered 390 |
|---|---|---|---|---|---|
| `public/assets/logo-wordmark.png` (existing) | Wordmark 2 | https://framerusercontent.com/images/AtEI6tbWiHI47fwFzLXMJG4y8oE.png | 222×66 png | 78×22.1 | 78×22.1 |
| `public/assets/pages/solutions-biopharma/logos-qzqK7o.svg` (existing) | hero | https://framerusercontent.com/images/qzqK7opgh6QkQaJhJvtncPVGOo.svg | svg | 117×42 | 89.1×24 |
| `public/assets/pages/solutions-biopharma/logos-z1e1uA.svg` (existing) | hero | https://framerusercontent.com/images/z1e1uAx0BjEGMjugzBMyxlDKgMU.svg | svg | 117×26.7 | 89.1×20.3 |
| `public/assets/pages/solutions-biopharma/logos-oGv9fs.svg` (existing) | hero | https://framerusercontent.com/images/oGv9fsxFWIJK5t2PowmIBsANCo.svg | svg | 117×42 | 89.1×24 |
| `public/assets/pages/solutions-biopharma/logos-ENCnbk.svg` (existing) | hero | https://framerusercontent.com/images/ENCnbkU8ghDdColu2DilnmMFcA.svg | svg | 117×42 | 89.1×24 |
| `public/assets/pages/solutions-biopharma/logos-H1JIZo.svg` (existing) | hero | https://framerusercontent.com/images/H1JIZoAr3xj2biJhadduGPIhI0.svg | svg | 117×42 | 89.1×24 |
| `public/assets/pages/solutions-biopharma/logos-v65Tr9.svg` (existing) | hero | https://framerusercontent.com/images/v65Tr9puLm4Z4dhhxWoUIFmYOQ.svg | svg | 117×26.5 | 89.1×20.2 |
| `public/assets/pages/solutions-biopharma/logos-LY569W.svg` (existing) | hero | https://framerusercontent.com/images/LY569WlNQQVpLYPGZBMNEaT2LBg.svg | svg | 117×42 | 89.1×24 |
| `public/assets/pages/solutions-biopharma/logos-327vcQ.svg` (existing) | hero | https://framerusercontent.com/images/327vcQLWQhtwRfPbxW19LCAQsw.svg | svg | 117×42 | 89.1×24 |
| `public/assets/pages/modality-peptide/hero-mUg9uM.svg` | hero | https://framerusercontent.com/images/mUg9uMv3O4DoyZDAOVBysClY.svg | svg | 675.6×628.7 | 185.3×686.2 |
| `public/assets/pages/modality-peptide/ui-DmrQiF.png` | ui | https://framerusercontent.com/images/DmrQiFjdNQ41IacYwRJSWV9h2c.png | 3020×1642 png | 430.8×234.2 | 108×58.7 |
| `public/assets/customer-logo-novo-nordisk.svg` (existing) | timleine | https://framerusercontent.com/images/RzFCW4BGahMQ5UyzrWnZqCb2nE.svg | svg | 117×42 | 117×42 |
| `public/assets/customer-logo-jnj.svg` (existing) | timleine | https://framerusercontent.com/images/NNOIC4y7PhTDgk0yuG2XEBVQeTQ.svg | svg | 117×42 | 117×42 |
| `public/assets/customer-logo-bayer.svg` (existing) | timleine | https://framerusercontent.com/images/5a0pQd2IWouqVfhkiEKYCtPedM.svg | svg | 117×42 | 117×42 |
| `public/assets/customer-logo-abbvie.svg` (existing) | timleine | https://framerusercontent.com/images/WWPHALSmU8sypw0cb6qwKuWLb24.svg | svg | 117×21.8 | 117×21.8 |
| `public/assets/customer-logo-hansa.svg` (existing) | timleine | https://framerusercontent.com/images/yffefaHejeGA519Z70MjCTGMxFI.svg | svg | 117×42 | 117×42 |
| `public/assets/customer-logo-illumina.svg` (existing) | timleine | https://framerusercontent.com/images/VJNMk77p52CD9Z81GERCNgR9f4.svg | svg | 117×26.7 | 117×26.7 |
| `public/assets/customer-logo-csl.svg` (existing) | timleine | https://framerusercontent.com/images/MleukVGRRNyR2iVHFWQFky0g8c.svg | svg | 117×42 | 117×42 |
| `public/assets/customer-logo-lundbeck.svg` (existing) | timleine | https://framerusercontent.com/images/9BailNhHuuybz72q93fOyVTqs.svg | svg | 117×42 | 117×42 |
| `public/assets/customer-logo-ultragenyx.svg` (existing) | timleine | https://framerusercontent.com/images/fG7WNPtJqIJK65b1efymRYVvcg8.svg | svg | 117×42 | 117×42 |
| `public/assets/customer-logo-repligen.svg` (existing) | timleine | https://framerusercontent.com/images/zwIhUJdcL3DPmch49JKoIIRihmE.svg | svg | 117×26.5 | 117×26.5 |
| `public/assets/case-therapeutic-peptides.png` (existing) | featured top | https://framerusercontent.com/images/zFxJKxnPIK4SNB2TDWo7XlzTCPY.png | 2400×1260 png | 548×285.4 | n/a |
| `public/assets/pages/solutions-biopharma/avatar-oBdmCN.jpg` (existing) | avatar | https://framerusercontent.com/images/oBdmCND3HzkJmc3JiARv6oZhrM.jpg | 439×439 jpeg | 56×56 | 40×40 |
| `public/assets/pages/platform/wetlab-riCniX.png` (existing) | wet lab | https://framerusercontent.com/images/riCniXBWMkubE5HZ7IR2p5Srs.png | 960×1100 png | 587.5×625 | 170×180.8 |
| `public/assets/pages/platform/computational-AcW1X3.png` (existing) | computational | https://framerusercontent.com/images/AcW1X3KdCLZFYY8h8JvDQW2NkMw.png | 960×1100 png | 587.5×625 | 170×180.8 |
| `public/assets/ui-report-cta.png` (existing) | report | https://framerusercontent.com/images/IfqouN2MOOjMjZsnHQBzBZfe6c.png | 2560×1760 png | 719.4×446.3 | 253.4×157.2 |
| `public/assets/ui-round.png` (existing) | round | https://framerusercontent.com/images/M1VjhVbzNNZuncHQjV3aQJDdKo.png | 2560×1760 png | 721.6×447.7 | 254.2×157.7 |
| `public/assets/ui-data.png` (existing) | data | https://framerusercontent.com/images/1sLbKCfenmgZZIF3rnKvoWX6w.png | 2560×1760 png | 719.4×446.3 | 253.4×157.2 |
| `public/assets/pages/solutions-biopharma/logos-EqXQcN.svg` (existing) | hero | https://framerusercontent.com/images/EqXQcN82KM7ExhkubT8IUiomzbA.svg | svg | n/a | 89.1×24 |
| `public/assets/pages/platform/inline-end-6be8c4.svg` (existing) | inline SVG in `end` | (inline markup) | svg | 11×9 | |

---

# /team

Title `Team - Cradle`. Doc height 5471 (1440) / 5835 (390). Screenshot `reference/pages/team-1440.png`.
One `main` section (padding-top 64), content max-w 1280, padding `80px 40px 160px`. Order: Navbar · T1 Intro + bento · T2 Our offices · T3 Our team · T4 Our investors · Footer. **No footer CTA.**

## T1 Intro (`intro`, gap 80)
- H1 `Making biology programmable` (Rethink Sans 72/72/-2.88/500 `#030712`, left, 2 lines, 1200 wide). Lead max-w 560 (≤25 words): `Building on the latest technological breakthroughs in AI, Cradle helps scientists decode and rewrite biology to unlock new food sources, materials, and therapeutics.` Gap 40.
- **Bento grid** 1200×600 (3 cols × 386.7, 2 rows × 290, gap 20):
  - Video tile spanning 2 cols × 2 rows (793.3×600), radius 16, wrapper opacity .9, video `3xPwhR…mp4` (poster `DCTQ1c…png`), cover, autoplay muted loop. Appear `aw4nom`: opacity .001→1, spring 0.4 bounce 0.2.
  - Top-right tile 386.7×290 bg `#f3f4f6` radius 16: `ui-data.png` (existing) 411.7×258.8 at offset (48,48), radius `6 6 0 0`, 1px border `rgba(0,0,0,.08)`, mask `linear-gradient(309deg, transparent 21%, #000 91%)`. Appear `f967wm`: opacity .001→1, scale 1.2→1, tween 0.4s `[0.12,0.23,0.5,1]`, delay 0.2.
  - Bottom-right tile bg `#224eee` radius 16: molecule cluster of 29 glass bubbles (36×36, bg `rgba(255,255,255,.6)`, inset shadow `rgba(156,163,175,.32) 0 0 16px`, `backdrop-filter:blur(4px)`) inside a 233×173 box (same arrangement as the /platform P4 cluster scaled ×1.8), plus a background pattern (1200×720, opacity .05, `filter:invert(1)`, `mix-blend-mode:lighten`, radial mask, pattern svg at 126px).
- Phone: content padding `40px 16px 120px`; H1 40/40/-1.6; lead 16/24; video 358×290; data screenshot 249×156.6 below; gap 40.

## T2 Our offices (`2 columns`)
- Row padding `80px 0`, gap 40: left title column 386.7 wide with H3 `Our offices` (32/38.4/-0.64) **`position:sticky`**; right `content` 773.3 wide, gap 40:
  - Paragraph (max-w 600, ~32 words, 3 lines) with the city names `Amsterdam,` `Zurich` `Boston` in `#030712`.
  - Two office videos side by side (2 cols × 376.7, gap 20), radius 16, bg `#f9fafb`: `LOvlFN…mp4` (poster `XWsIgg…png`, cover) and `yygvM8…mp4` (poster `l8k0T7…png`, `object-fit:fill`), 211.9 tall.
  - **OfficeCard** ×3 (3 cols × 244.4, gap 20): padding 20, bg `#f9fafb`, radius 16. Top: weather pill (white, radius 100, padding `14px 22px`, shadow `rgba(0,0,0,.04) 0 1px 4px`) containing an emoji + temperature in **"Inter var" 14/14/500 `#111827`** (degree sign 12px `#9ca3af`). This is a **live weather widget** (third-party data; values at capture: Zurich 🌫️ 6°, Amsterdam ⛅️ 9°, Boston 🌧️ 11°); render static. Then city `🇨🇭 Zurich` / `🇳🇱 Amsterdam` / `🇺🇸 Boston` (Body `#030712`) and address (Body `#9ca3af`): `Brandschenkestrasse 150, 8002, Zürich, Switzerland`; `Radarweg 60, 1043 NT Amsterdam Netherlands`; `1 Broadway, Cambridge, MA 02142, USA`.
- Phone: stacked; H3 24/28.8 not sticky; videos 169 wide radius 8; office cards full width with shortened addresses (`Brandschenkestrasse 150`, `Radarweg 60`, and a live bug: Boston also shows `Brandschenkestrasse 150`).

## T3 Our team (`team`)
- Row padding `80px 0`, top border 1px `rgba(0,0,0,.04)`; sticky H3 `Our team`; right column (773.3, padding-top 8, gap 40):
  - Paragraph (max-w 600, ~33 words, 4 lines; the last ~11 words are `#9ca3af`, and include InlineLink-style `state-of-the art lab` → ./lab, color `#616e80` hover `#29333c`).
  - `team-members` (gap 24, padding-top 20): groups, each = header row 56 tall (label Body `#616e80` + 20×20 info icon `inline-info-9d2b0a.svg` 2px to the right, except Co-founders) + a 3-column grid (257.8 each) of **PersonPill**s 48 tall (padding `4px 0`): 32×32 round avatar + name Body `#616e80` (padding `0 8px`) with a 2px bottom underline `rgba(0,0,0,.12)`; optional **RoleTag** after the name (outer 0.5px padding radius 4, inner bg `#9ca3af` radius 3.5, Inter 10/10/0.5/700 white): `CEO`, `CTO`, `CCO`, `COO`.
  - Groups and names (verbatim): Co-founders: Eli, Elise, Harmen, Jelle, Stef (CEO). Bioengineering: Angela, Cas, Catalina, Daan, Daniëlle, Emma, Jack, Jinel, Michelle, Nicolò. Machine Learning: Arthur, Christian, Constance, David, Fabian, Franzi, Gino, Jonathan, Nicolas, Noé, Paula, Sebastian, Shayan. Engineering / Product: Adam, Armin, Daniel (CTO), David, David, Elia, Ena, Janosch, Melanie, Michael, Michael, Robbert, Tilke. Design: Gijs, Sytske, Vilem. Partnerships: André, Denise, Jarred, Johan, Luke, Mike, Milind, Nadim, Néstor, Paul, Ruben, Sam (CCO), Sara, Thijs, Toby, Travis, Wallis. Customer Success: Brian, Catherine, Dave, Emanuele. Operations: Andi, Claire, Devesh, Iana, Irina, Luba (COO), Max.
  - Avatars: 76 small images downloaded to `public/assets/pages/team/` (see table). Some members have no photo in the source (check table).
  - **Hover** on a pill: a bio tooltip appears, horizontally centered on the pill, ≈10px below it: 320 wide, padding 16, bg `#1f2937`, radius 16, shadow `rgba(0,0,0,.05) 0 10px 20px 0, rgba(255,255,255,.4) 0 0 16px 0`, text Inter 13/500 `#f9fafb` (bio ~40–50 words; placeholder). Fade-in timing not sampled (appears within 600ms).
- Phone: names 14/22.4 in a 3-col grid (119.3 pitch), group headers 14/22.4, rows 44 tall.

## T4 Our investors (`investors`)
- Row padding-top 80, top border 1px `rgba(0,0,0,.04)`; H3 `Our investors` (sticky column). Right: 3 logo tiles 244.4×120 (bg `#f9fafb`, radius 16) each with a 64×64 round logo (radius 75, contain): `ojKp3J…png`, `GuiCA2…png`, `43meP…png`; paragraph (max-w 600, ~25 words) `We are funded by leading investors IVP, Index Ventures, and Kindred Capital, as well as a long list of world-class advisors…` (placeholder ok); then a 3-column list (263.1 pitch, rows ≈99) of advisors: name Body `#030712`, role Inter 13/20.8/500 `#616e80`:
  Emily Leproust / CEO at Twist Biosciences · John Zimmer / CEO & Founder at Lyft · Adriaan Mol / Founder at Mollie & Messagebird · Patrick Hsu / Professor at UC Berkeley & Co-founder of Arc Institute · Chris Gibson / Co-founder & CEO at Recursion · Sylvain Gariel / Founder & COO at DNA Script · Tom Glocer / Former CEO of Thomson Reuters and Lead Director at Merck · Feike Sijbesma / Honorary Chairman and former CEO at Royal DSM · Mehdi Ghissassi / Director of Product at Google Deepmind · Tim Geistlinger / Chief Scientific Officer at Perfect Day · Steve Crossan / SVP AI at GSK, ex Head of Product at Deepmind and co-founder of Alphafold
- Phone: column (padding-top 40, gap 20), H3 24.

## Fonts
"Inter var" (weather widget) is a new family not in §0; fall back to Inter.

## Links (team)
Same-site: ./lab (`state-of-the art lab`). EXTERNAL: none (weather widget data source is third-party).

## Assets (team)
New files live in `public/assets/pages/team/` (full resolution, query params stripped). Files marked (existing) are already in `public/assets/` (see `public/assets/MANIFEST.md`) or in another page folder of this spec. Rendered sizes are CSS px; n/a = not rendered at that width (or only in an interactive state).

| file | used in (framer layer) | original URL | file size/format | rendered 1440 | rendered 390 |
|---|---|---|---|---|---|
| `public/assets/logo-wordmark.png` (existing) | Wordmark 2 | https://framerusercontent.com/images/AtEI6tbWiHI47fwFzLXMJG4y8oE.png | 222×66 png | 78×22.1 | 78×22.1 |
| `public/assets/pages/team/intro-3xPwhR.mp4` | intro | https://framerusercontent.com/assets/3xPwhRMjRDFKlj8ct1CeRj1U.mp4 | mp4 1652 KB | 793.3×600 | 358×290 |
| `public/assets/pages/team/intro-DCTQ1c.png` | intro | https://framerusercontent.com/images/DCTQ1cwZUmiz8ka73BIxsYFiTwM.png | 800×600 png | 793.3×600 | 358×290 |
| `public/assets/ui-data.png` (existing) | data | https://framerusercontent.com/images/1sLbKCfenmgZZIF3rnKvoWX6w.png | 2560×1760 png | 411.7×258.8 | 249×156.6 |
| `public/assets/benefits-grid-pattern.svg` (existing) | bg-pattern | https://framerusercontent.com/images/9c47fOR3CNoSsEtr6IEYJoKM.svg | svg | 1200×720 | 1200×720 |
| `public/assets/pages/team/content-LOvlFN.mp4` | content | https://framerusercontent.com/assets/LOvlFNFpseA6E5oBNoqgExdWXQ.mp4 | mp4 166 KB | 376.7×211.9 | 169×95.1 |
| `public/assets/pages/team/content-XWsIgg.png` | content | https://framerusercontent.com/images/XWsIggCS8bYL7MfAQ3JxNASx9UA.png | 600×328 png | 376.7×211.9 | 169×95.1 |
| `public/assets/pages/team/content-yygvM8.mp4` | content | https://framerusercontent.com/assets/yygvM8fva8pbOLQAFZiSmb2iiaM.mp4 | mp4 334 KB | 376.7×210.9 | 169×94.6 |
| `public/assets/pages/team/content-l8k0T7.png` | content | https://framerusercontent.com/images/l8k0T7uhYYH7l5LpyH7BGgpwU.png | 600×328 png | 376.7×210.9 | 169×94.6 |
| `public/assets/pages/team/avatar-BPNHeI.png` | avatar | https://framerusercontent.com/images/BPNHeIz7jaBz48mHhMdgxYPjp9g.png | 192×192 png | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-kthOYp.jpg` | avatar | https://framerusercontent.com/images/kthOYpyZLoGq2DBN21LBeyDmLo.jpg | 300×300 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-ziucpt.png` | avatar | https://framerusercontent.com/images/ziucptQMGbyEVTJtzVCbfgCZujs.png | 192×192 png | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-YPCeqR.png` | avatar | https://framerusercontent.com/images/YPCeqRKc2tE0wKhopcM9vLGzJw.png | 192×192 png | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-FJMp2R.png` | avatar | https://framerusercontent.com/images/FJMp2RvQUB82Q1MYiJD58F1JPT4.png | 192×192 png | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-6Atwel.jpg` | avatar | https://framerusercontent.com/images/6AtwelEQaUxxiHghEIt5Vtt5aU.jpg | 200×200 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-Wfvd8P.jpg` | avatar | https://framerusercontent.com/images/Wfvd8PFQlo2rcbbSUp0Y5neAqH4.jpg | 124×124 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-Ig1Bks.jpg` | avatar | https://framerusercontent.com/images/Ig1BksdYVVzvkE1F4RWUB4rUkU.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-NgM8cF.jpg` | avatar | https://framerusercontent.com/images/NgM8cFT26qXYK4MZ1R5x2cGs.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-bLwfjv.jpg` | avatar | https://framerusercontent.com/images/bLwfjvzItEfVTOKZkAMYUzW2o.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-Vx5iVi.jpg` | avatar | https://framerusercontent.com/images/Vx5iViuIC1yoI05UoRHGEOWojM.jpg | 574×600 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-AU1jd0.jpg` | avatar | https://framerusercontent.com/images/AU1jd0advr8qd5E9IEJzi3OF4.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-NakClq.jpg` | avatar | https://framerusercontent.com/images/NakClq5VCeaHoduNQ7UWYSILQs.jpg | 400×400 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-S8iuyU.jpg` | avatar | https://framerusercontent.com/images/S8iuyUFwOimhaZeYtuU6gxYrdnk.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-jDC7a4.jpg` | avatar | https://framerusercontent.com/images/jDC7a447nV6uBfZIe2OPDciTbE.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-qYlDKa.png` | avatar | https://framerusercontent.com/images/qYlDKa1p09JnFfqMFwmtk8ojobw.png | 192×192 png | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-KtmGIT.jpg` | avatar | https://framerusercontent.com/images/KtmGITlJlz7yVWQjrxg7pwyfOhk.jpg | 200×200 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-dg4l8w.png` | avatar | https://framerusercontent.com/images/dg4l8wJx2hluMiI7PZZsBVXyms.png | 192×192 png | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-DhjHKH.jpg` | avatar | https://framerusercontent.com/images/DhjHKHu0ug86MVQWiw1BixQ.jpg | 124×124 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-inho2w.jpg` | avatar | https://framerusercontent.com/images/inho2wsEyVkakCUFAxbe644bIY.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-Dgp7sG.jpg` | avatar | https://framerusercontent.com/images/Dgp7sGa1MJmx7rew9sjBUUlCrYM.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-qPzuir.jpg` | avatar | https://framerusercontent.com/images/qPzuirWDpgKBHOHwNR08SLKMm4c.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-UmEieu.jpg` | avatar | https://framerusercontent.com/images/UmEieuH0hqrhE4ggMT6SafTHPAE.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-CUQuN2.jpg` | avatar | https://framerusercontent.com/images/CUQuN2vKMaXoKkd5XdZYeMmLh1g.jpg | 300×300 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-SQQ0QJ.jpg` | avatar | https://framerusercontent.com/images/SQQ0QJRcVAfCsIyqVExWXVhtbao.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-7Uxm2k.jpg` | avatar | https://framerusercontent.com/images/7Uxm2kf5s1c4UaRkRVBydjrA.jpg | 400×400 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-wyVeTN.jpg` | avatar | https://framerusercontent.com/images/wyVeTNtuZj9N2PZ7AoxmdxOkA.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-C1x6LI.jpg` | avatar | https://framerusercontent.com/images/C1x6LI5DzdJtDlR691sLzuCYbbY.jpg | 124×124 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-aqSnzw.png` | avatar | https://framerusercontent.com/images/aqSnzwJF60ZmbQ3rSBsbLvEZuM.png | 192×192 png | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-O5X2vv.jpg` | avatar | https://framerusercontent.com/images/O5X2vv5FLDmiV0FcSfOyFDarCRk.jpg | 400×400 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-xuTsAL.jpg` | avatar | https://framerusercontent.com/images/xuTsALYZbctCwmuHdbt5RfCPIg.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-dBi96O.jpg` | avatar | https://framerusercontent.com/images/dBi96ONV9z45QkUL9bMXUtMjdc.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-9sjXbA.png` | avatar | https://framerusercontent.com/images/9sjXbAO4RI8v3uEgwzzIrjdObU.png | 400×400 png | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-HvtKip.jpg` | avatar | https://framerusercontent.com/images/HvtKip3rXaFR8fFEuA6Pu7nnzA.jpg | 200×200 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-qkhzXf.png` | avatar | https://framerusercontent.com/images/qkhzXfWxbTHtTSDBC7TkHaYHU.png | 192×192 png | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-G9lgWP.jpg` | avatar | https://framerusercontent.com/images/G9lgWPjvvyvpVWo5HYi8af7HBA.jpg | 200×200 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-IeYOqp.jpg` | avatar | https://framerusercontent.com/images/IeYOqpkRi6VZNWbvXrAnTjne0kI.jpg | 512×512 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-fw1eRg.jpg` | avatar | https://framerusercontent.com/images/fw1eRg1vxglncURrvDIr1N6nhpw.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-xWvejW.jpg` | avatar | https://framerusercontent.com/images/xWvejWIbpflP1YZqBWtu4niV5M.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-mmSUqB.jpg` | avatar | https://framerusercontent.com/images/mmSUqBG4tKAST8Wt3KgrtwCIE.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-WjkUQ0.jpg` | avatar | https://framerusercontent.com/images/WjkUQ02uLcymuCkSC0hdqPt5J9U.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-uIFHU0.jpg` | avatar | https://framerusercontent.com/images/uIFHU0OElzFwIl7wFANzk3XjPA.jpg | 600×599 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-JUN0G5.jpg` | avatar | https://framerusercontent.com/images/JUN0G5vhTLs3KnGYfJHolonPgA.jpg | 300×300 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-DsXq2x.jpg` | avatar | https://framerusercontent.com/images/DsXq2xuDzWFRZmqfao0bEGcTMOk.jpg | 124×124 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-uN7M9P.jpg` | avatar | https://framerusercontent.com/images/uN7M9PQH8dibLQxdlevQtTEr8kM.jpg | 124×124 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-1iEn32.jpg` | avatar | https://framerusercontent.com/images/1iEn32mZVzVTmHhz3z3luPoJLqM.jpg | 200×200 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-q5EgW8.png` | avatar | https://framerusercontent.com/images/q5EgW8Ut4f4d4ohEyXrV9pe4i0.png | 201×202 png | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-HJ65T1.jpg` | avatar | https://framerusercontent.com/images/HJ65T1sCj3Q6J25EQhp6zIve4eA.jpg | 200×200 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-StOHv1.jpg` | avatar | https://framerusercontent.com/images/StOHv1j95ZzZHVDKYmtZwylbuI.jpg | 124×124 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-U6QGkf.jpg` | avatar | https://framerusercontent.com/images/U6QGkfaFBcWRM2lR0D9oPpeHRw.jpg | 200×200 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-rd5Mgf.jpg` | avatar | https://framerusercontent.com/images/rd5MgfUbehNJFlOj4GFTSCu6s.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-PxBGIf.jpg` | avatar | https://framerusercontent.com/images/PxBGIfghYFew8VWj8LYaC8jyA.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-Q5AEeH.png` | avatar | https://framerusercontent.com/images/Q5AEeHZnk1JXSYVK9baO1CzYxs.png | 902×892 png | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-dLRbza.png` | avatar | https://framerusercontent.com/images/dLRbzaEf9TUr3XgwUrEkRLkKlW4.png | 472×542 png | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-ENozUy.jpg` | avatar | https://framerusercontent.com/images/ENozUyYvENh0NUkA6PL2wMoDcA.jpg | 124×124 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-r2eetA.jpg` | avatar | https://framerusercontent.com/images/r2eetAoQs17lOQpY5ZXcQqAmqk.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-Tte2Oo.png` | avatar | https://framerusercontent.com/images/Tte2OooMyM3J5yjKFL2z5CEKc.png | 1282×1254 png | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-OWtK8c.jpg` | avatar | https://framerusercontent.com/images/OWtK8csPRIgyIbwUmXibw4qkvPo.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-w2A6Le.jpg` | avatar | https://framerusercontent.com/images/w2A6LegqDzMUVR82vPg20sgR18.jpg | 400×400 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-Wzsab7.png` | avatar | https://framerusercontent.com/images/Wzsab7Kk6ZBbQhbbMDko93laUo.png | 221×200 png | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-UykoKB.jpg` | avatar | https://framerusercontent.com/images/UykoKB3qWpDuQFs63IkEFFJAHJU.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-X2QgBU.jpg` | avatar | https://framerusercontent.com/images/X2QgBUcbmQobP5fl0ZEURaLwM.jpg | 124×124 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-J3M0vG.jpg` | avatar | https://framerusercontent.com/images/J3M0vGLWJULlZCIC1iDmYTQak.jpg | 124×124 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-4IK4tL.jpg` | avatar | https://framerusercontent.com/images/4IK4tLP0h3ZV0qyk0VyJyvIwt4.jpg | 300×300 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-ZfB5PH.png` | avatar | https://framerusercontent.com/images/ZfB5PH8U6Aj787GSJKNoe2uMes.png | 192×192 png | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-EF5uYE.jpg` | avatar | https://framerusercontent.com/images/EF5uYEPfaSTQoMwy7htYzmVNj00.jpg | 866×866 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-ycUATx.jpg` | avatar | https://framerusercontent.com/images/ycUATxqZ9ZcNOgXFx4ClLs5dfs.jpg | 400×400 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-JnVlel.jpg` | avatar | https://framerusercontent.com/images/JnVlelNPBs1PRsC3kwxD8s8sVKg.jpg | 380×380 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-x27Ysx.jpg` | avatar | https://framerusercontent.com/images/x27YsxYbZEM4S7ntSzl5VD3atQ.jpg | 100×101 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-tX1ayB.jpg` | avatar | https://framerusercontent.com/images/tX1ayBsCqmeiSMxlarts2K3nvy4.jpg | 400×400 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-vKyTEH.jpg` | avatar | https://framerusercontent.com/images/vKyTEHBxKXQD1QI84p5qVjZ4fTM.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/avatar-F3ceJk.jpg` | avatar | https://framerusercontent.com/images/F3ceJkJixfSXJ3s8bE3FnzuBbnM.jpg | 500×500 jpeg | 32×32 | 28×28 |
| `public/assets/pages/team/logo-ojKp3J.png` | logo | https://framerusercontent.com/images/ojKp3JZi2HCTKWygXtBocpqErz8.png | 240×240 png | 64×64 | 48×48 |
| `public/assets/pages/team/logo-GuiCA2.png` | logo | https://framerusercontent.com/images/GuiCA21b8mNKNyTom9v5sRwrhU.png | 160×160 png | 64×64 | 48×48 |
| `public/assets/pages/team/logo-43mePq.png` | logo | https://framerusercontent.com/images/43mePqyyobRSLNkDyLE7KNIQq0c.png | 160×160 png | 64×64 | 48×48 |
| `public/assets/pages/team/inline-info-9d2b0a.svg` | inline SVG in `info` | (inline markup) | svg | 20×20 | |

---

# /careers

Title `Careers - Cradle`. Doc height 4084 (1440) / 4207 (390). Screenshot `reference/pages/careers-1440.png`.
Order: Navbar · C1 Page header · C2 Photo mosaic · C3 Life at Cradle (sticky title + interviews list) · C4 Open positions · C5 Newsletter · C6 Scam notice · Footer. No footer CTA. A 1×1 invisible element at the top (opacity 0) is a tracking/embed stub; ignore.

Layout system used by C3–C5 (**StickySplitRow**, also /team): row padding `80px 0`, gap 60; left column 380 wide with H3 32/38.4/-0.64 `#030712`; right column 760 wide (text max-w 600). Rows after the first get a 1px top border `rgba(0,0,0,.04)`. Page content max-w 1280, padding `0 40px 160px`.

## C1 Page header
- 1280×476 (x=80), padding `80px 40px`. H1 `Help build the thing scientists use to build the next big thing` (72/72/-2.88/500, 3 lines, 1200 wide). Row (space-between): Lead max-w 560 `Join the best minds in biology, design, engineering and machine learning building better tools for scientists.`; Primary48 (padding `0 24px`) `Open positions` → `./careers#careers` (anchor to C4).
- Phone: padding `40px 16px`; title is an **H2 36/36/-0.72** with different copy `Build the thing scientists use to build the next big thing.`; lead 16/24; Primary36 full width (13px label).

## C2 Photo mosaic
- Grid 1200×440: 4 cols × 288, 2 rows × 212, gap 16; all tiles radius 16, images cover:
  - `1` (col 1,row 1) `1-E7ZaDp.png`; `group` (cols 2–3, rows 1–2, 592×440) `group-19Nkdl.jpg` (6192×4128 source); `3` (col 4, rows 1–2, 288×440) `3-XTTHv7.png`; `2` (col 1, row 2) `2-v63kx1.png`.
- Appear (exact): tile 1 `1nuj5mo` opacity .001→1, scale .9→1, tween 0.3s `[0.12,0.23,0.5,1]`, delay 0; tile 3 `p4phh0` delay 0.2; tile 2 `1t0k22p` delay 0.3; group tile `1ucd1af` (config empty in the appear script; it renders static).
- Phone: grid 3 cols × 114 (rows 96, gap 8): group 236×200 spanning 2×2 on the left, tiles 1 and 3 stacked on the right; tile 2 hidden.

## C3 Life at Cradle (`interviews`)
- H3 `Life at Cradle`. Right column (gap 80):
  - Text block (max-w 600): paragraph ~40 words (4 lines) containing InlineLink `here` → ./blog/cultural-values; paragraph ~32 words; `Here's a glimpse from our January off-site in Chamonix:`.
  - Video 560×315 (16:9-ish 640/360), black bg, radius 12: **EXTERNAL Mave player** (poster `interviews-D8TD7I.jpg` from video-dns.com). Render as poster + play.
  - `Team interviews:` (Body `#030712`), then **InterviewRow** list (grid, gap 20), each row 760×75.7 (`a`, gap 20, align center): thumbnail 64×75.7 radius 8 (`object-position: 0% 50%`), title Body `#616e80` max-w 440. Hover: title → `#030712`, and a background plate (`hover` layer, inset −6/−4px, 772×83.7, radius 12) goes from `rgba(242,243,245,.06)` to `#f3f4f6` (≈100ms).
    1. `We put our CTO in a lab coat. Here's what happened next.` → ./blog/beyond-the-bench (`bGwzod…png`, homepage `blog-beyond-the-bench.png`)
    2. `From lab rat to data detective: How this scientist turned Sales into an art form.` → ./blog/from-lab-rat-to-data-detective-how-this-scientist-turned-sales-into-an-art-form (`variant-1-PbdOLD.png`)
    3. `Designing the future, one protein at a time: A chat with Franzi` → ./blog/interviews-franzi (`variant-1-4NSjVd.jpg`)
    4. `From Prisons to Proteins: The Unexpected Journey of a UX Researcher` → ./blog/from-prisons-to-proteins (`variant-1-W0wS15.jpg`)
    5. `From Bench to Bytes: Why This Protein Engineer Joined an AI Startup, an Interview with Jinel Shah` → ./blog/interviews-jinel (`variant-1-wUjFRH.jpg`)
- Phone: stacked (gap 20, padding `40px 0`), H3 24, body 14/22.4, rows keep 64px thumbnails with 274-wide titles.

## C4 Open positions (`careers`, anchor `#careers`)
- H3 `Open positions` (12px top padding). Right (gap 40): **job list embed failed to load** in every capture (`We could not load current openings. Please try again shortly.` rendered in system sans 16/400 `rgba(0,0,0,.65)`, padding `24px 0`; no request to the jobs provider was made). Not capturable; build a static placeholder list.
- Card below: padding 24, bg `#f9fafb`, radius 12: `Don't see a fit? We're growing fast and new roles come up often. Drop us an open application and we'll keep you in mind.` with InlineLink `open application` → **EXTERNAL** https://jobs.ashbyhq.com/cradlebio/67273d3e-ff4f-4f98-b8a2-921a1d45b5a0.

## C5 Newsletter (`interviews` #2)
- H3 `Newsletter`; right column (gap 26): H4 `Sign up for our email list` (24/28.8 `#616e80`), paragraph ~27 words (2 lines), then an embedded **EXTERNAL MailerLite form** (srcdoc iframe 760×221, posts to assets.mailerlite.com). Measured inside: inputs 760×43, Inter 14/400 `#666`, bg white, border 1px `#ccc`, radius 12, gap 10: `First name` (text), `Email` (email); checkbox row (13px box) + `Yes, I want to receive updates from Cradle.` Inter 12/400 `#5c5c5c`; submit `Subscribe` 760×41, bg `#2d66f8`, radius 12, Inter 14/700 white.
- Phone: H4 18/21.6, body 14/22.4.

## C6 Recruitment scam notice (`notice`)
- Full-width band 1440×156.8, padding 40, bg `#f1f6d1` (rgb(241,246,209)); inner max-w 1280 row gap 60: title `A notice about recruitment scams` Inter 16/20.8/600 `#20290a` (406.7 wide) + paragraph (813.3 wide, ~56 words, 3 lines) Body `#49581c`.
- Phone: padding `40px 20px`, column gap 20, 14px text.

## Links (careers)
Same-site: ./careers#careers, ./blog/cultural-values, the five ./blog/* interview links. EXTERNAL: jobs.ashbyhq.com (open application), MailerLite form, Mave video player.

## Assets (careers)
New files live in `public/assets/pages/careers/` (full resolution, query params stripped). Files marked (existing) are already in `public/assets/` (see `public/assets/MANIFEST.md`) or in another page folder of this spec. Rendered sizes are CSS px; n/a = not rendered at that width (or only in an interactive state).

| file | used in (framer layer) | original URL | file size/format | rendered 1440 | rendered 390 |
|---|---|---|---|---|---|
| `public/assets/logo-wordmark.png` (existing) | Wordmark 2 | https://framerusercontent.com/images/AtEI6tbWiHI47fwFzLXMJG4y8oE.png | 222×66 png | 78×22.1 | 78×22.1 |
| `public/assets/pages/careers/1-E7ZaDp.png` | 1 | https://framerusercontent.com/images/E7ZaDpbDsQNuljD7bF3vfOmYTfw.png | 1212×1058 png | 288×212 | 114×96 |
| `public/assets/pages/careers/group-19Nkdl.jpg` | group | https://framerusercontent.com/images/19NkdlMvb1KLy5bs3que49lTf4.jpg | 6192×4128 jpeg | 592×440 | 236×200 |
| `public/assets/pages/careers/3-XTTHv7.png` | 3 | https://framerusercontent.com/images/XTTHv7fJzQRDcsOR0oQo48QqtE.png | 1898×1556 png | 288×440 | 114×96 |
| `public/assets/pages/careers/2-v63kx1.png` | 2 | https://framerusercontent.com/images/v63kx1qsyxiXqe6ViE9oJ8OsZHM.png | 1852×1766 png | 288×212 | n/a |
| `public/assets/pages/careers/interviews-D8TD7I.jpg` | interviews | https://space-o6awa.video-dns.com/D8TD7Ik2Ab/thumbnail.jpg (EXTERNAL player poster) | 1280×720 jpeg | 560×315 | 560×315 |
| `public/assets/blog-beyond-the-bench.png` (existing) | Variant 1 | https://framerusercontent.com/images/bGwzodiFTanxuEUdEmGVycl1E.png | 1200×640 png | 64×75.7 | 64×75.7 |
| `public/assets/pages/careers/variant-1-PbdOLD.png` | Variant 1 | https://framerusercontent.com/images/PbdOLDNavFxSDenj88z7fIHus.png | 2400×1280 png | 64×75.7 | 64×75.7 |
| `public/assets/pages/careers/variant-1-4NSjVd.jpg` | Variant 1 | https://framerusercontent.com/images/4NSjVd3ZuFNDoeXvOXAf3qDN094.jpg | 2400×1280 jpeg | 64×75.7 | 64×75.7 |
| `public/assets/pages/careers/variant-1-W0wS15.jpg` | Variant 1 | https://framerusercontent.com/images/W0wS15ywz1H8qAlGp26A3so9nc.jpg | 2400×1280 jpeg | 64×75.7 | 64×75.7 |
| `public/assets/pages/careers/variant-1-wUjFRH.jpg` | Variant 1 | https://framerusercontent.com/images/wUjFRHdnKHYLNhA24EUC9jgZQI.jpg | 2400×1280 jpeg | 64×75.7 | 64×75.7 |

---

# /lab

Title `The Cradle Wet Lab`. Doc height 6565 (1440) / 7066 (390). Screenshot `reference/pages/lab-1440.png`.
Order: Navbar · L1 Lab-coat header · L2 Aerial photo band · L3 Intro statement · L4 Perks (video + 3 points) · L5 Automation (blue) + lab blog cards · L6 Meet the team (selector) · L7 Sharing is caring (dark, floating cards) · Footer. No footer CTA.

## L1 Header (`header`)
- 1280×900 (x=80), padding `60px 40px 80px`, bg white, column centered.
- Lab-coat image block 360×422 (aspect .857), mask `linear-gradient(#000 39%, transparent 85%)`; image `coat-FjFiAj.png` (930×1366) 360×420 cover top, `filter: hue-rotate(0deg) saturate(.82)`. On the coat pocket a **VisitorBadge** (58.4×23.4, rotated −5°): outer padding 1.45, radius 4, bg `linear-gradient(#ffc591, #ff9d47)`, shadow `rgba(0,0,0,.12) 0 .9px .5px`; inner radius 2, bg `linear-gradient(#ff7700, #ed6f00)`, inset shadow `rgba(0,0,0,.08) 0 .54px 1px`, text `VISITOR` Spot Mono 12/12/400 `rgba(255,255,255,.98)`.
- H1 `Here, put this on.` (72/72/-2.88, center). Lead center `Scroll to explore the Cradle Amsterdam wet lab.` (phone: `Scroll to explore the Cradle wet lab.`).
- Motion: coat block appear `18rhvad` (exact): opacity .001→1, scale .85→1, y −20→0, tween 1s ease `[0.02,0.64,0.61,1]`, delay 0.9; then scroll-linked: translateY = +0.2·scrollY (30px at 150, 120 at 600, 150 at 750), i.e. it sinks behind the text as you scroll. Lead appear `1fiaedj`: opacity .001→1, y 10→0, 0.6s ease `[0.44,0,0.56,1]`, delay 1.2, then a continuous gentle bob (translateY oscillates 0↔3px, ≈1.5s per half-cycle, ease-in-out).
- Phone: 390×844, padding `80px 16px 64px`, coat 300×349, badge text 10px, H1 40/40/-1.6, lead 16/24.

## L2 Aerial photo (`img`)
- 1440×550, bg white, overflow hidden. Photo `img-piUfsp.jpg` (5910×3940) in a 1728×660 box at (−144, 845), opacity .9, `filter: blur(3px)`, mask `linear-gradient(#000 50%, transparent 100%)`, top shade `linear-gradient(rgba(3,7,18,.32), transparent)` 216 tall.
- Overlaid labels (abs, top-left at x=20): `Cradle Amsterdam HQ` Body white, below it `(52.390999, 4.835315)` Body white at opacity .8.
- Motion: photo scale 1.2→1 scroll-linked (1.2 at scrollY 0, 1.145 at 150; ≈−0.00036/px) and the coordinates type in letter by letter on enter (20 characters, ≈5ms apart, each opacity .001→1).
- Phone: 390×400, photo 468×480, labels 14/22.4.

## L3 Intro (`intro`)
- 1280×720, padding `120px 40px`. Centered column max-w 720, gap 40: H2 `A software company. With a wet lab. Here's why.` (64, center, 2 lines) with a hand-drawn circle annotation (`inline-circled-on-9be469.svg`, 194.4×101.5 in a 226×119 box, positioned around the words "wet lab" at (883,1677); stroke `#2d66f8` width 3, round caps). **Draw-on motion** when it enters view: `stroke-dashoffset` 270.58→0 (dasharray 270.58) over ≈1.15s, ease-in-out (slow start, fastest mid-way, slow end), starting ≈90ms after mount; two Lead paragraphs in **`#1f2937`** center: `Many AI protein engineering companies work purely in silico. We're different.` ("in silico" italic) and ~46 words (4 lines).
- Phone: H2 copy `A software company. With a wet lab. Why?` 32/35.2; paragraphs 16/24 `#1f2937`.

## L4 Perks (`perks`)
- 1440×735.1, padding `0 40px 120px`. Row (max-w 1280, gap 40): video 620×615.1 radius 16 (opacity .9, `3xPwhR…mp4`, same video as /team), text column 620 (padding `20px 0`, gap 60) with three items (gap 12): H4 + Body: `Models, meet reality` (~34 words), `Large datasets build smarter models` (~40), `Built by scientists, for scientists` (~57).
- Phone: stacked; video 358×268.5; H4 18/21.6; body 14/22.4.

## L5 Automation (`automation`)
- 1440×1165.1, padding `120px 40px`, bg `linear-gradient(#224eee 55%, #0ea5e9 100%)`. Background video `automation-tNNkDQ.mp4` (1440×768.9, mirrored `rotateY(180deg)`, `filter: blur(2px)`, `mix-blend-mode: overlay`, mask fading to bottom); fades in on enter (opacity 0→1, 0.4s).
- Top row (gap 40, padding-bottom 40): H2 `Solving the data bottleneck with automation.` (620 wide, white, gradient text `linear-gradient(270deg, #eff4ff, #fff)`); right column (padding-top 16, gap 40): Lead `rgba(255,255,255,.9)` `Biology has always moved on slow feedback loops. The faster we can generate lab data, the faster our AI models get better.` + ~59-word paragraph; then a **VideoCard** 620×112 (padding 16, gap 16, bg white, radius 16, 1px border `rgba(255,255,255,.08)`, `backdrop-filter: blur(10px)`): thumbnail 120×80 radius 6 (`automation-PHAYVk.png`) with the glass play button (40×40, same as /platform VideoTrigger), title `Lab automation at Cradle` (CardTitle `#1f2937`) and `3 min` (Body `#9ca3af`). Clicking opened nothing measurable.
- `cradle-dbtl-cycle` block (padding-top 40, top border 1px `rgba(255,255,255,.08)`, gap 40): H3 `More learnings from the lab` (white, center), Lead `rgba(255,255,255,.6)` `We're big on automation—and sharing our knowledge.`; 4 **LabPostCard**s (305 wide, gap 20): image frame (padding 4, bg `rgba(255,255,255,.12)`, radius 12) with 297×180.3 image radius 8; title Inter 16/20.8/600 white. Hover: frame bg → white (≈100ms).
  1. `Optimizing across the entire batch is one secret to better proteins` → ./blog/optimizing-entire-batch
  2. `How does AI change the first round of antibody optimization?` → ./blog/antibody-first-round
  3. `From picking favorites to designing experiments: how ML rethinks variant selection` → ./blog/variant-selection-with-ml
  4. `Zero-shot antibody diversification with Cradle` → ./blog/zero-shot
- Phone: padding `120px 0 40px`; text padding `0 16px`; H2 32; cards become horizontal rows (358×84: 125.3×76 image + 14/18.2/600 title); only the first 3 cards are shown.

## L6 Meet the team (`team`) (**LabTeamSelector**)
- 1440×1096, padding `120px 40px`. H2 `Meet the team` (64). Component (`harmen` variant = selected member), column gap 12:
  - Row (h550, gap 12): (a) selected photo 543.4×550 radius 12 with bottom shade `linear-gradient(rgba(3,7,18,0) 14%, rgba(3,7,18,.5) 70%)`, name H4 white + 20×20 LinkedIn icon link (`datauri-linkedin-ae5032.svg`, EXTERNAL linkedin.com, target _blank), role H4 white at opacity .7; (b) blue quote card 389.3×550 (padding 32, bg `#2d66f8`, radius 12, column space-between): 43×36 quote-mark icon (`inline-harmen-2d0b64.svg`, mask fading down) top-left, Body white paragraph (~65 words, 9 lines) at the bottom; (c) right column 325.3 wide: equipment card 325.3×394 (padding 40, bg white, radius 12, 1px border `rgba(0,0,0,.08)`) with a 180×180 product image and a 20×20 info icon top-right (`inline-variant-1-b9093e.svg`); **hover** fades in a description overlay (opacity 0→1; padding 20, bg `rgba(255,255,255,.1)`, `backdrop-filter: blur(5px)`, Inter 14/22.4/500 `#616e80`, ~35 words); below it a 325.3×144 white card (radius 12, border) with a 54×54 `#224eee` icon drawn by mask (`datauri-harmen-a7e570.svg`, arrow glyph), cursor pointer.
  - Avatar strip (gap 12): 7 tiles 172.6×218 radius 12; selected tile has a 3px `#2d66f8` inner border, others `filter: grayscale(1)` with a transparent 4px border. Click selects (content swaps; transition not sampled).
  - Members (avatar order: name / role / equipment): Harmen / Co-founder Bioengineering / Formulatrix Mantis liquid handler · Jinel / Scientist / Tecan Spark (equipment text links EXTERNAL https://www.tecan.com/spark-overview) · Daan / Research Associate / Nanopore MinION sequencer · Michelle / Research Associate / Carterra LSA-XT · Angela / Antibody Scientist / Pixl colony picker · Catalina / Research Associate / Integra Voyager multichannel pipette · Nicolò / Scientist / FACS. Each has a ~45–78-word quote (placeholder) and a 25–45-word equipment description (placeholder). LinkedIn links are EXTERNAL.
  - Photos: `selected-avatar-b9QMOd.jpg` (Harmen) and `off-*.jpg` set (tiles 1200×1800 sources); Angela's large photo `547wKt…jpg` and the equipment images (`MTK25R…`, `8P2hOZ…`, `xDoyd6…`, `IPgXoI…`, `Ixka2X…`, `h11ydQ…`, `78mflo…`) are in `public/assets/pages/lab/`.
- Phone: padding `60px 16px 64px`; H2 32 + hint `Psst! Tap any team member to find out what their favourite lab device is.` (14/22.4 at opacity .8); 2-col grid of 174×222.7 tiles (radius 11) with name H4 18 white overlay at bottom-left; 8 members (adds `Janis`, `off-ihfeJt.jpg`). The tap-to-reveal state was not captured.

## L7 Sharing is caring (`content`)
- 1440×900, padding `200px 40px`, bg `#030712`. Center column max-w 640 (550 wide), gap 40: H2 `Sharing is caring` (64, white), two Lead paragraphs white at opacity .8 (~30 and ~42 words), Secondary48 `Explore blog posts` → ./blog.
- Four **FloatingPostCard**s absolutely positioned around the text (each: image with a blurred duplicate glow beneath at blur 16–20px, opacity .5–.9; title Inter 600 white at opacity .8):
  - top right (x=1020, y=+89 from section top): 215 wide, image 215×129 radius 8, title 13/16.9 `Backbone of high-throughput experimentation: Design principles for ML-ready sample tracking` → ./blog/sample-tracking (image is homepage `blog-sample-tracking.jpg`)
  - top left (x=275, +80): 159 wide, image 159×95.4 radius 6, title 10/13 `Lab automation for faster ML-driven protein engineering` → ./blog/webinar-lab-automation (`blog-webinar-lab-automation.jpg`)
  - bottom right (x=972, +691): 143 wide, image radius 6, title 9/11.7 `SLAS 2025: A Peek at The Future of Lab Automation` → ./blog/slas2025 (`bottom-right-Jyybc4.jpg`)
  - bottom left (x=234, +678): 143 wide, title 10/13 `We put our CTO in a lab coat. Here's what happened next.` → ./blog/beyond-the-bench (`blog-beyond-the-bench.png`)
  - Motion: each pops in on enter (opacity 0→1, scale .8→1, ≈0.6s ease-out), order top-right (0), top-left (+0.2s), bottom-right (+0.4s), bottom-left (+0.5s). Hover: card scales to 1.05 (≈100ms).
- Phone: 390×817.2, padding `80px 16px 60px`, the four images form a 2×2 grid (133.3×122.8, radius 8) tilted in 3D (`matrix3d` ≈ rotateY(40deg) rotateX(20deg)) above the text (4th image is the existing `blog-protein-tags.png`, phone only); H2 32; paragraphs 16/24.

## Links (lab)
Same-site: ./blog, ./blog/optimizing-entire-batch, ./blog/antibody-first-round, ./blog/variant-selection-with-ml, ./blog/zero-shot, ./blog/sample-tracking, ./blog/webinar-lab-automation, ./blog/slas2025, ./blog/beyond-the-bench. EXTERNAL: LinkedIn profiles (7), https://www.tecan.com/spark-overview.

## Assets (lab)
New files live in `public/assets/pages/lab/` (full resolution, query params stripped). Files marked (existing) are already in `public/assets/` (see `public/assets/MANIFEST.md`) or in another page folder of this spec. Rendered sizes are CSS px; n/a = not rendered at that width (or only in an interactive state).

| file | used in (framer layer) | original URL | file size/format | rendered 1440 | rendered 390 |
|---|---|---|---|---|---|
| `public/assets/logo-wordmark.png` (existing) | Wordmark 2 | https://framerusercontent.com/images/AtEI6tbWiHI47fwFzLXMJG4y8oE.png | 222×66 png | 78×22.1 | 78×22.1 |
| `public/assets/pages/lab/coat-FjFiAj.png` | coat | https://framerusercontent.com/images/FjFiAjN1q6yBtUj8hUPW9d36rww.png | 930×1366 png | 360×420 | 300×349 |
| `public/assets/pages/lab/img-piUfsp.jpg` | img | https://framerusercontent.com/images/piUfspnlLTAaGMkIRf9RjGTRE9s.jpg | 5910×3940 jpeg | 1728×660 | 468×480 |
| `public/assets/pages/team/intro-3xPwhR.mp4` (existing) | perks | https://framerusercontent.com/assets/3xPwhRMjRDFKlj8ct1CeRj1U.mp4 | mp4 1652 KB | 620×615.1 | 358×268.5 |
| `public/assets/pages/team/intro-DCTQ1c.png` (existing) | perks | https://framerusercontent.com/images/DCTQ1cwZUmiz8ka73BIxsYFiTwM.png | 800×600 png | 620×615.1 | 358×268.5 |
| `public/assets/pages/lab/automation-tNNkDQ.mp4` | automation | https://framerusercontent.com/assets/tNNkDQuIpFOiq1ifVwfCZdtWPAk.mp4 | mp4 1191 KB | 1440×768.9 | 390×382.3 |
| `public/assets/pages/lab/automation-PHAYVk.png` | automation | https://framerusercontent.com/images/PHAYVkrRFaaDtMFrVC6DPhdDBmY.png | 3296×1982 png | 120×80 | 120×80 |
| `public/assets/pages/lab/cradle-dbtl-cycle-Jipxhi.png` | cradle-dbtl-cycle | https://framerusercontent.com/images/JipxhiqSo0ZOCyqbHd29FhgyBk.png | 1200×720 png | 297×180.3 | 125.3×76 |
| `public/assets/pages/lab/cradle-dbtl-cycle-7LXf4G.png` | cradle-dbtl-cycle | https://framerusercontent.com/images/7LXf4GlkeDtQsPuLzpyBK4ATTlc.png | 1200×720 png | 297×180.3 | 125.3×76 |
| `public/assets/pages/lab/cradle-dbtl-cycle-IMvEP1.png` | cradle-dbtl-cycle | https://framerusercontent.com/images/IMvEP1no7o1S2MVbcAdIAvWjOM.png | 1200×720 png | 297×180.3 | 125.3×76 |
| `public/assets/pages/lab/cradle-dbtl-cycle-p58PfR.png` | cradle-dbtl-cycle | https://framerusercontent.com/images/p58PfRHDwBzCT6euTQ7y4zA5YK8.png | 1200×640 png | 297×180.3 | n/a |
| `public/assets/pages/lab/selected-avatar-b9QMOd.jpg` | selected avatar, on, off | https://framerusercontent.com/images/b9QMOdtjrTFsdeOP6IhPRnX9UDU.jpg | 1200×1800 jpeg | 543.4×550 | 174×222.7 |
| `public/assets/pages/lab/variant-1-MTK25R.png` | Variant 1 | https://framerusercontent.com/images/MTK25RfbhmLTT9Pn5UQsV5Dc.png | 600×600 png | 180×180 | n/a |
| `public/assets/pages/lab/off-mLppC4.jpg` | off | https://framerusercontent.com/images/mLppC4f4VlE2lQ9xzEAJgxErKp0.jpg | 1200×1800 jpeg | 172.6×218 | 174×221.7 |
| `public/assets/pages/lab/off-7V4MvM.jpg` | off | https://framerusercontent.com/images/7V4MvM8BQXQKLKfd0JlGU5ARU.jpg | 1200×1800 jpeg | 172.6×218.9 | 174×222.7 |
| `public/assets/pages/lab/off-lIyM8G.jpg` | off | https://framerusercontent.com/images/lIyM8Gypx18xxScTAupUFKemQI.jpg | 1200×1800 jpeg | 172.6×219 | 174×221.7 |
| `public/assets/pages/lab/off-zOEpQv.jpg` | off | https://framerusercontent.com/images/zOEpQvWtPxwV4NPoNuKolRytT0.jpg | 1200×1800 jpeg | 172.6×218.9 | 174×222.7 |
| `public/assets/pages/lab/off-mx3TLf.jpg` | off | https://framerusercontent.com/images/mx3TLflnOraIBNILEey58ARbrt4.jpg | 1200×1800 jpeg | 172.6×218 | 174×221.7 |
| `public/assets/pages/lab/off-Jgf57m.jpg` | off | https://framerusercontent.com/images/Jgf57mJh9gN1XodpkkMmqnXQ.jpg | 1200×1800 jpeg | 172.6×218 | 174×222.7 |
| `public/assets/blog-sample-tracking.jpg` (existing) | top right, content | https://framerusercontent.com/images/Qapk2ea1kvA4MNhAvq4dfNglA.jpg | 2400×1260 jpeg | 215×129 | 133.3×122.8 |
| `public/assets/blog-webinar-lab-automation.jpg` (existing) | top left, content | https://framerusercontent.com/images/Dwe28QpR2vpOX1aNrfV8bsUVGY.jpg | 1920×945 jpeg | 159×95.4 | 133.3×122.8 |
| `public/assets/pages/lab/bottom-right-Jyybc4.jpg` | bottom right | https://framerusercontent.com/images/Jyybc4Az8Ee6bKerfDq0AVojyc.jpg | 2400×1280 jpeg | 143×85.8 | n/a |
| `public/assets/blog-beyond-the-bench.png` (existing) | bottom left, content | https://framerusercontent.com/images/bGwzodiFTanxuEUdEmGVycl1E.png | 1200×640 png | 143×85.8 | 133.3×122.8 |
| `public/assets/pages/lab/off-ihfeJt.jpg` | off | https://framerusercontent.com/images/ihfeJtWsGAvK0AyXHQOtolPu6Po.jpg | 1200×1800 jpeg | n/a | 174×222.7 |
| `public/assets/blog-protein-tags.png` (existing) | content | https://framerusercontent.com/images/ZpyturaxK2Nt8Q37vEyq3caito.png | 2400×1280 png | n/a | 133.3×122.8 |
| `public/assets/pages/lab/selected-avatar-angela-547wKt.jpg` | (interactive state) | https://framerusercontent.com/images/547wKtHlHT9DAZkamivA6xJspc.jpg | 4128×6192 jpeg | n/a | n/a |
| `public/assets/pages/lab/equipment-tecan-spark-8P2hOZ.png` | (interactive state) | https://framerusercontent.com/images/8P2hOZjcHgYnl58PgUiNC4WRK4.png | 600×600 png | n/a | n/a |
| `public/assets/pages/lab/equipment-nanopore-minion-xDoyd6.png` | (interactive state) | https://framerusercontent.com/images/xDoyd6Z1ZeaNICpNcWZWShtpn4.png | 600×600 png | n/a | n/a |
| `public/assets/pages/lab/equipment-carterra-lsa-IPgXoI.png` | (interactive state) | https://framerusercontent.com/images/IPgXoICnM3ss47sLTqzwKxwpYA.png | 600×600 png | n/a | n/a |
| `public/assets/pages/lab/equipment-pixl-Ixka2X.png` | (interactive state) | https://framerusercontent.com/images/Ixka2Xcut4qkVygxoGYaCH75OiY.png | 600×600 png | n/a | n/a |
| `public/assets/pages/lab/equipment-integra-voyager-h11ydQ.png` | (interactive state) | https://framerusercontent.com/images/h11ydQgC5XjF5OFnfrh35XAV28.png | 600×600 png | n/a | n/a |
| `public/assets/pages/lab/equipment-facs-78mflo.png` | (interactive state) | https://framerusercontent.com/images/78mfloEboMq3G1NqM36ycN9Goc0.png | 600×600 png | n/a | n/a |
| `public/assets/pages/lab/inline-circled-on-9be469.svg` | inline SVG in `circled-on` | (inline markup) | svg 134×70 | 194.4×101.5 | |
| `public/assets/pages/platform/inline-video-trigger-d14d23.svg` (existing) | inline SVG in `automation` | (inline markup) | svg 24×24 | 20×20 | |
| `public/assets/pages/lab/inline-harmen-2d0b64.svg` | inline SVG in `harmen` | (inline markup) | svg | 43×36 | |
| `public/assets/pages/lab/inline-variant-1-b9093e.svg` | inline SVG in `Variant 1` | (inline markup) | svg 24×24 | 20×20 | |
| `public/assets/pages/lab/datauri-linkedin-ae5032.svg` | data-URI bg in `linkedin` | (data URI) | svg 20×20 | 20×20 | |
| `public/assets/pages/lab/datauri-harmen-a7e570.svg` | data-URI mask in `harmen` | (data URI) | svg 24×24 | 54×54 | |

---

# /case

Title `Case studies – Cradle`. Doc height 4169 (1440) / 6336 (390). Screenshot `reference/pages/case-1440.png`.
Order: Navbar · K1 Header + press logo grid · K2 Case grid + sticky subscribe card · K3 Newsletter band · Footer. No footer CTA.

## K1 Header
- `content` (max-w 1280, padding `144px 40px 80px`, gap 40). Header row (gap 40, padding-bottom 80):
  - Left 580 (gap 32): back link `Back to blog` → ./blog (24×24 chevron icon `inline-content-d6b886.svg` + Body `#1f2937`, gap 4); H2 `Learn how scientists use Cradle` (64, `#1f2937`, 2 lines); Lead ~40 words (4 lines; placeholder); secondary36-style button (h48, padding `0 32px`, 14/600) `Talk to Sales` → ./get-started.
  - Right 580: **PressLogoGrid** 3 cols × 185.3, 4 rows × 95.4, gap 12; tiles: bg white, radius 17, 1px border `rgba(0,0,0,.08)`, logo 117×42 max (opacity .6, radius 8). Tiles are links (hover adds shadow `rgba(0,0,0,.04) 0 0 6px`, ≈100ms); several are not links (`href=null`). Appears with a fade/slide (inline will-change; config not in appear script). Logos in order (all existing homepage customer logos; `zwIhUJ` = `customer-logo-repligen.svg`, `o8hfsY` = `customer-logo-corteva.svg`): Novonesis → EXTERNAL linkedin.com post; `RzFCW4` → EXTERNAL pharmavoice.com; `NNOIC4` (no link); `5a0pQd` → https://www.cradle.bio/blog/bayer-collaboration (same-site absolute; use /blog/bayer-collaboration, target _blank on live); `WWPHAL` (no link); `yffefa` → EXTERNAL hansabiopharma.com press release; illumina (no link); `Mleuk` (no link); Lundbeck → EXTERNAL cen.acs.org; `fG7WNP` (no link); `zwIhUJ` (no link); `o8hfsY` (no link).
- Phone: padding `100px 20px 0`; H2 32; lead 16/24; logo grid hidden.

## K2 Case grid (`sections`)
- Row (gap 64): left grid 777.1 wide, 2 cols × 378.6 (gap 40 row / 20 col); right sticky card.
- **CaseCard** (link, column-wrap gap 16): image 378.6×197.2 (aspect 1.92, radius 8, 1px border `rgba(27,27,177,.04)`); text (gap 12): tag Inter 11/14.3/-0.44/700 uppercase `#9ca3af`; H5 Rethink Sans 18/25.2/-0.18/600 `#1f2937`; excerpt Inter 13/20.8/500 `#616e80` clamped to 3 lines (overflow clip; placeholder). Hover: image scales to 1.02 (≈100ms).
  1. ENZYME `Using AI to produce vaccine adjuvants without cutting down rainforest` → ./blog/keasling-qs21
  2. PEPTIDE `Engineering therapeutic peptides with 50% success rate under tight multi-property constraints, 5× faster than prior efforts` → ./blog/therapeutic-peptides
  3. VACCINE `Improving Staphylococcus aureus vaccine thermostability by 2.5 °C in a single round, 7× faster than rational design` → ./blog/staphylococcus-aureus-vaccine
  4. ANTIBODY `Rescuing a stalled IgG campaign: 10 candidates meeting potency and developability criteria in 3 rounds` → ./blog/igg-campaign
  5. ENZYME `Improving haloalkane dehalogenase thermostability by +20 °C while enhancing activity and expression` → ./blog/haloalkane-dehalogenase-thermostability
  6. ANTIBODY `Engineering polyspecific anti-venom VHHs with sub-nanomolar binding and high thermostability` → ./blog/polyspecific-anti-venom-vhhs
  7. ANTIBODY `Engineering polyspecific VHHs with picomolar binding to SARS-CoV-2 wild type and Omicron` → ./blog/polyspecific-vhhs-sars-cov-2
  8. ANTIBODY `Optimizing Cetuximab: An update on our win of the Adaptyv 2024 competition` / excerpt `How Cradle's 12 designs would have ranked top-12 in Adaptyv's protein design competition` → ./blog/adaptyv2
  9. ANTIBODY `8x improvement in EGFR binding affinity: winning the Adaptyv Bio protein design competition` → ./blog/adaptyv-protein-design-competition (`featured-top-4UdCTb.jpg`)
  10. ENZYME `'Align to Innovate' benchmark: state-of-the-art enzyme engineering with fully-automated GenAI` → ./blog/align-to-innovate-benchmark
  11. ENZYME `Case study: design better P450s 4X faster by combining AI-generated mutations with human expertise` → ./blog/case-study-combining-ai-generated-mutations-with-human-expertise-for-better-enzyme-designs
  Images: cards 1–4 reuse the homepage `case-keasling-qs21.png`, `case-therapeutic-peptides.png`, `case-staph-aureus-vaccine.png`, `case-igg-campaign.png`; cards 5–8, 10, 11 reuse the modality-page files (`modality-enzyme/variant-1-Oy964Y.png`, `modality-antibody/variant-1-rkmKWh.png`, `variant-1-IZZ2BY.png`, `variant-1-oPewEN.png`, `modality-enzyme/variant-1-ln7s2S.jpg`, `variant-1-7wk2YA.jpg`); card 9 is new (`case/featured-top-4UdCTb.jpg`).
- **Sticky subscribe card** (`form`): 358.9 wide, padding 24, bg white, radius 16, shadow `rgba(0,0,0,.08) 0 1px 8px 0`, `position: sticky` (top offset not exposed; measured starting at the grid top y=681.6), gap 20: CardTitle centered `Subscribe to new case studies and other Cradle updates`, then the **EXTERNAL MailerLite** form iframe 310.9×221 (same form as /careers C5).
- Phone: single column cards 350 wide (image 350×182.3, tag 9/11.7/1.08, H5 16/20/-0.16), gap 40; sticky card hidden.

## K3 Newsletter band (`newsletter`)
- 1440×347.4, padding 80, bg `#f9fafb`, top border 1px `rgba(0,0,0,.08)`, gap 20, centered: H3 `Subscribe to updates` (32), Lead center (400 wide) `Get new posts and other Cradle updates directly to your inbox. No spam :)`, button 240×48 (padding `0 24px`, bg `#224eee`, radius 12, Inter 16/20.8/600 white `Subscribe`; hover bg `#0057ba` ≈100ms).
- Click opens a **modal**: full-screen overlay `rgba(0,0,0,.8)`, centered dialog 720×409.6 bg `#f3f4f6` repeating the heading + lead and embedding the MailerLite form (EXTERNAL). Open/close animation not sampled.
- Phone: 390×506.4, padding `54px 20px`.

## Links (case)
Same-site: ./blog (back), ./get-started, 11 ./blog/* case links, /blog/bayer-collaboration. EXTERNAL: linkedin.com post, pharmavoice.com, hansabiopharma.com, cen.acs.org, MailerLite form.

## Assets (case)
New files live in `public/assets/pages/case/` (full resolution, query params stripped). Files marked (existing) are already in `public/assets/` (see `public/assets/MANIFEST.md`) or in another page folder of this spec. Rendered sizes are CSS px; n/a = not rendered at that width (or only in an interactive state).

| file | used in (framer layer) | original URL | file size/format | rendered 1440 | rendered 390 |
|---|---|---|---|---|---|
| `public/assets/logo-wordmark.png` (existing) | Wordmark 2 | https://framerusercontent.com/images/AtEI6tbWiHI47fwFzLXMJG4y8oE.png | 222×66 png | 78×22.1 | 78×22.1 |
| `public/assets/customer-logo-novonesis.svg` (existing) | content | https://framerusercontent.com/images/suE7e8mMA7izB47HQgdMNN82Egk.svg | svg | 117×42 | n/a |
| `public/assets/customer-logo-novo-nordisk.svg` (existing) | content | https://framerusercontent.com/images/RzFCW4BGahMQ5UyzrWnZqCb2nE.svg | svg | 117×42 | n/a |
| `public/assets/customer-logo-jnj.svg` (existing) | content | https://framerusercontent.com/images/NNOIC4y7PhTDgk0yuG2XEBVQeTQ.svg | svg | 117×42 | n/a |
| `public/assets/customer-logo-bayer.svg` (existing) | content | https://framerusercontent.com/images/5a0pQd2IWouqVfhkiEKYCtPedM.svg | svg | 117×42 | n/a |
| `public/assets/customer-logo-abbvie.svg` (existing) | content | https://framerusercontent.com/images/WWPHALSmU8sypw0cb6qwKuWLb24.svg | svg | 117×21.8 | n/a |
| `public/assets/customer-logo-hansa.svg` (existing) | content | https://framerusercontent.com/images/yffefaHejeGA519Z70MjCTGMxFI.svg | svg | 117×42 | n/a |
| `public/assets/customer-logo-illumina.svg` (existing) | content | https://framerusercontent.com/images/VJNMk77p52CD9Z81GERCNgR9f4.svg | svg | 117×26.7 | n/a |
| `public/assets/customer-logo-csl.svg` (existing) | content | https://framerusercontent.com/images/MleukVGRRNyR2iVHFWQFky0g8c.svg | svg | 117×42 | n/a |
| `public/assets/customer-logo-lundbeck.svg` (existing) | content | https://framerusercontent.com/images/9BailNhHuuybz72q93fOyVTqs.svg | svg | 117×42 | n/a |
| `public/assets/customer-logo-ultragenyx.svg` (existing) | content | https://framerusercontent.com/images/fG7WNPtJqIJK65b1efymRYVvcg8.svg | svg | 117×42 | n/a |
| `public/assets/customer-logo-repligen.svg` (existing) | content | https://framerusercontent.com/images/zwIhUJdcL3DPmch49JKoIIRihmE.svg | svg | 117×26.5 | n/a |
| `public/assets/customer-logo-corteva.svg` (existing) | content | https://framerusercontent.com/images/o8hfsY0lyrsheQQRGcArXQHKIA.svg | svg | 117×42 | n/a |
| `public/assets/case-keasling-qs21.png` (existing) | featured top | https://framerusercontent.com/images/3xanLcT3TJPy6Zy2FYx9nwRU.png | 1200×630 png | 378.6×197.2 | 350×182.3 |
| `public/assets/case-therapeutic-peptides.png` (existing) | featured top | https://framerusercontent.com/images/zFxJKxnPIK4SNB2TDWo7XlzTCPY.png | 2400×1260 png | 378.6×197.2 | 350×182.3 |
| `public/assets/case-staph-aureus-vaccine.png` (existing) | featured top | https://framerusercontent.com/images/CRRFF43xDoJUsY42UgD9vzcuAM.png | 2400×1260 png | 378.6×197.2 | 350×182.3 |
| `public/assets/case-igg-campaign.png` (existing) | featured top | https://framerusercontent.com/images/BxXtrMbTWl6eupW0bp1qEL5ZI.png | 2400×1260 png | 378.6×197.2 | 350×182.3 |
| `public/assets/pages/modality-enzyme/variant-1-Oy964Y.png` (existing) | featured top | https://framerusercontent.com/images/Oy964YRBRqXuJe8u1q4htgILas.png | 1200×630 png | 378.6×197.2 | 350×182.3 |
| `public/assets/pages/modality-antibody/variant-1-rkmKWh.png` (existing) | featured top | https://framerusercontent.com/images/rkmKWhBIqCVp5PkbS2NXYMHemQ.png | 2400×1260 png | 378.6×197.2 | 350×182.3 |
| `public/assets/pages/modality-antibody/variant-1-IZZ2BY.png` (existing) | featured top | https://framerusercontent.com/images/IZZ2BYMQhuRJMkkT4XMs4jiKM.png | 2400×1260 png | 378.6×197.2 | 350×182.3 |
| `public/assets/pages/modality-antibody/variant-1-oPewEN.png` (existing) | featured top | https://framerusercontent.com/images/oPewENrrJiCR2BbhRRQDhsEks.png | 2400×1280 png | 378.6×197.2 | 350×182.3 |
| `public/assets/pages/case/featured-top-4UdCTb.jpg` | featured top | https://framerusercontent.com/images/4UdCTbTNeeNo0TyNDeXL0GNKa1k.jpg | 2400×1280 jpeg | 378.6×197.2 | 350×182.3 |
| `public/assets/pages/modality-enzyme/variant-1-ln7s2S.jpg` (existing) | featured top | https://framerusercontent.com/images/ln7s2Sj6jJsFHUNZpa6Yk8ujA.jpg | 2400×1280 jpeg | 378.6×197.2 | 350×182.3 |
| `public/assets/pages/modality-enzyme/variant-1-7wk2YA.jpg` (existing) | featured top | https://framerusercontent.com/images/7wk2YAfyZdDZhtZLJH4FS1a0DzE.jpg | 2400×1260 jpeg | 378.6×197.2 | 350×182.3 |
| `public/assets/pages/case/inline-content-d6b886.svg` | inline SVG in `content` | (inline markup) | svg 24×24 | 24×24 | |

---

# /security

Title `Security - Cradle`. Doc height 12229 (1440) / 13392 (390). Screenshot `reference/pages/security-1440.png`.
Long-form policy page. Order: Navbar · S1 Dark header · S2 Chat-bubble letter from the security officer · S3 Section title · S4 Policy body (sticky H4 left, content right) · Footer. No footer CTA.

## S1 Header
- 1440×630 (starts at y=64), padding `80px 40px`, bg `#030712`, content aligned to the bottom. Inner max-w 1280, column gap 40:
  - H1 Rethink Sans 72/72/-2.88/500 white, 2 lines: `Security and` / `privacy at Cradle` (1120 wide, absolutely positioned with `translateX(-50%)` in a 1120×334 clip box).
  - Lead `rgba(255,255,255,.8)` max-w 560, ~45 words, 5 lines (placeholder), 40px under the title.
  - Divider 1px `rgba(255,255,255,.08)` across 1280.
- Phone: 390×590.8, padding `40px 16px`; H1 36/36/-0.72 center and lead 14/22.4 center. Live quirk: both keep the desktop absolute centring and overflow to x=−365 (1120/560 wide); constrain them in the clone.

## S2 Letter (`page header` #2)
- 1440×1379, padding `0 40px 120px`, bg `linear-gradient(#030712 0%, #1f2937 100%)`. Row (max-w 1280, padding `0 80px 40px 0`, gap 40):
  - Avatar 56×56 round with 2px white ring, `page-header-46aE6Z.png` (400×400), **sticky**.
  - **ChatBubble** column (560 wide, gap 20): five bubbles, padding 32, bg `#1d2e8b` (rgb(29,46,139)), radius 32, inset glow `rgba(146,186,254,.5) 0 0 40px 0`, text Body `rgba(255,255,255,.9)`. Bubble 1 (448 wide): `Hello, I'm Noé Lutz, Information Security Officer at Cradle. Let me give you an overview of our commitment to security.` Bubbles 2–5 (560/560/560/504 wide): ~47, ~70, ~67, ~59 words (placeholder).
  - Right sticky sidebar (504 wide, padding `8px 0 0 40px`, content max-w 300, gap 10): H5 `About Noé` white; H6 Inter 12/18/500 `rgba(255,255,255,.6)`: `Noé is responsible for security and steers the ship of Cradle's ML engineering wizards and scrubs the deck when needed.`; second H6 ~39 words.
  - Motion: bubbles enter one after another: opacity 0→1, translateX −20→0, scale .9→1, 0.6s ease-out; bubble 1 at t0, bubbles 2–3 together at +0.25s, bubble 4 at +0.48s (measured on initial load, they are in view).
- Phone: padding `0 16px 40px`; avatar 32×32 (1px ring); bubbles become plain text (13/18.2 `rgba(255,255,255,.9)`, padding 16 left offset), about block below (H5 16/20, text 14/22.4).

## S3 Title
- 1280×450, padding `80px 40px`: H2 `Security and privacy at Cradle` (64, center, 2 lines) with word reveal (6 words, each opacity .001→1, y 10→0, 0.6s, stagger ≈50ms).
- Phone: padding `40px 16px 0`, H2 32/35.2.

## S4 Policy body
- Container max-w 960, padding `80px 40px 320px`; sections column gap 93. Each section row: left H4 (24/28.8/500 `#030712`, max-w 33% = 290.4, **sticky**), gap 48, right column 541.6 wide (gap 19) of H5 subheads (Rethink Sans 18/25.2/-0.18/600 `#030712`) and Body paragraphs `#616e80` (30–110 words each; all placeholder).
- Section and subhead outline (verbatim headings):
  1. `Executive Summary`: 3 paragraphs (~61, ~75, ~46 words).
  2. `Our Commitment`: 1 paragraph (~102 words).
  3. `Product Security`: `Authentication & Access Control` (2 paras), `Role-Based Access Management`, `Data Encryption`.
  4. `Compliance & Certifications`: intro para, `SOC 2` (para with link `public Trust Center` → EXTERNAL app.eu.vanta.com trust page), `Data Privacy & GDPR`, `Automated Compliance Monitoring` (link `Vanta's security and compliance automation platform` → EXTERNAL https://www.vanta.com/).
  5. `Production Security`: intro, `Infrastructure Security and Engineering` (3 paras), `Software Development Life Cycle` (3), `Identity and Access Management` (3), `Data Protection`, `Backup and Disaster Recovery`, `Security Operations` (link `independently monitored through Betterstack` → EXTERNAL https://status.cradle.bio/).
  6. `Privacy`: `Data Usage and Control`, `Machine Learning Model Privacy and Integrity`, `Minimal Data Collection`, `Responsible Disclosure Policy`, `How to Report a Vulnerability` (link `Report a Vulnerability` → EXTERNAL https://cradlebio.typeform.com/vuln-report), `Guidelines for Responsible Disclosure`, `Our Commitment`, `Contact Security`.
- In-body links use a distinct style: Body size, color `#0099ff` (rgb(0,153,255)), underline.
- Phone: padding `40px 16px 160px`; sections stack (H4 18/21.6 not sticky, gap 20), body 14/22.4.

## Links (security)
EXTERNAL only: Vanta trust center, vanta.com, status.cradle.bio, typeform vulnerability report.

## Assets (security)
New files live in `public/assets/pages/security/` (full resolution, query params stripped). Files marked (existing) are already in `public/assets/` (see `public/assets/MANIFEST.md`) or in another page folder of this spec. Rendered sizes are CSS px; n/a = not rendered at that width (or only in an interactive state).

| file | used in (framer layer) | original URL | file size/format | rendered 1440 | rendered 390 |
|---|---|---|---|---|---|
| `public/assets/logo-wordmark.png` (existing) | Wordmark 2 | https://framerusercontent.com/images/AtEI6tbWiHI47fwFzLXMJG4y8oE.png | 222×66 png | 78×22.1 | 78×22.1 |
| `public/assets/pages/security/page-header-46aE6Z.png` | page header | https://framerusercontent.com/images/46aE6Zj4t0xLU1Bo82ZB7KO558.png | 400×400 png | 56×56 | 32×32 |

---

# /get-started

Title `Cradle`. Doc height 2299 (1440) / 3355 (390). Screenshot `reference/pages/get-started-1440.png`.
Order: Navbar · G1 Header with avatar trio · G2 Form card (HubSpot) · G3 Trust logo ticker · Footer. No footer CTA.

## G1 Header
- Section 1440×388, padding `120px 40px 40px`, bg white (page bg). Column gap 20, centered.
- Avatar trio row (gap 10, h64, centered): 40×40 round (radius 50%) `rd5Mgf…jpg`, 64×64 round `UykoKB…jpg`, 40×40 round `OWtK8c…jpg` (side avatars vertically centered: y offset 12). Sources 500×500.
- H2 `Talk to a Cradle expert` (64, `#030712`, center). Lead (center, max-w 500): `Discuss your needs with a Cradle expert to find the right license and support for your R&D program.`
- Phone: 390×355.2, padding `120px 20px 40px`; avatars 30/48/30 (gap ≈7.5); H2 32/35.2; lead 16/24.
- Motion (appear on load, exact): center avatar `1wpn7kh` opacity .001→1, scale .6→1, spring 0.5s bounce .1, delay .1. Left `1jbe8vh` opacity, scale .8→1, x 8→0, spring 0.8s bounce .1, delay .2. Right `1710p20` same with x −8→0, delay .3.

## G2 Form card (`typeform`) (**FormCard**, light variant)
- Section 1440×1229.4, padding `40px 40px 60px`, bg `linear-gradient(#fff 0%, #f3f4f6 100%)`.
- Card max-w 1040, bg white, radius 24, 1px border `rgba(0,0,0,.08)` (::after), column gap 10. Header padding `40px 40px 0`: H3 `Let's talk!` (32/38.4/-0.64, left). Then form iframe 1040×1041.
- **Form (EXTERNAL HubSpot iframe, form 44ef7684…)**: same field styling as /solutions/academia (labels Inter 16/400 `#4a5463`, inputs h54 radius 12 border `#9fa8b5`), inset 40, 2-col fields 465 wide gap 30 (960 total). Above the fields: a notice line `Working in academia? Apply to join Cradle's academic research program instead. Learn more.` ("Learn more" link → /solutions/academia in the clone). Fields: `First name*` | `Last name*`; `Job Title*` (ph "Your job title") | `Company name*` (ph "Your company name"); `Email*` (help `Please use your work email address.`, ph "you@acme.bio"); `Phone number (optional)` (+ help, flag select + tel); `Tell us more about your project*` (help ~35 words, textarea ph "Please provide project context."); `Where did you hear about Cradle? (optional)`; consent paragraph; `Submit` button (103×44, `#0151f8`, radius 12, right-aligned).
- Phone: padding `0 20px 50px`; card 350 wide radius 12; header H3 24/28.8/-0.48 centered; iframe 350×1479, single-column fields.

## G3 Trust logos (**TrustTicker**; also on /contact)
- Section 1440×182, padding-bottom 80, bg `#f3f4f6`. Inner row max-w 1040, top border 1px `rgba(0,0,0,.04)`, padding `30px 20px 0`, gap 40.
- Left text 196 wide, Body, two lines: `Cradle is used and trusted` / `by leading R&D teams` (spans colored `rgba(3,7,18,.6)`).
- Right `logos` 763.8×72, opacity .6, mask `linear-gradient(270deg, transparent 0%, #000 4.17%, #000 96.46%, transparent 100%)`: a horizontal **ticker** `UL` (gap 30) of 7 logo cells (h72, padding `0 16px`, content centered). Logos are SVG masks filled `#030712` (files `datauri-*.svg` in `public/assets/pages/get-started/`): `1-e34499` 55×44, `johnson-johnson-462200` 127×48, `1-3c001c` 109×20.6, `3-650741` 35×24, `4-070511` 120×45, `5-164964` (plain img) 103×38.6, `6-d6d3f4` 120×45, plus `inline-7-3e51a6.svg` 96×36.
- Motion: continuous marquee to the left at ≈20 px/s (measured −17.6px per 0.9s), items recycled (Framer Ticker). On enter the strip also fades in: opacity 0→1 from x −30.
- Phone: section 390×306.4; column layout, text `Used and trusted by leading R&D teams` (14/22.4, centered, single line); logos become a static 4×2 grid (cells 77.5×72, no gap), opacity .6, logo sizes ≈45.5 wide. No marquee.

## Links (get-started)
None in body except the form. EXTERNAL: HubSpot iframe.

## Assets (get-started)
New files live in `public/assets/pages/get-started/` (full resolution, query params stripped). Files marked (existing) are already in `public/assets/` (see `public/assets/MANIFEST.md`) or in another page folder of this spec. Rendered sizes are CSS px; n/a = not rendered at that width (or only in an interactive state).

| file | used in (framer layer) | original URL | file size/format | rendered 1440 | rendered 390 |
|---|---|---|---|---|---|
| `public/assets/logo-wordmark.png` (existing) | Wordmark 2 | https://framerusercontent.com/images/AtEI6tbWiHI47fwFzLXMJG4y8oE.png | 222×66 png | 78×22.1 | 78×22.1 |
| `public/assets/pages/team/avatar-rd5Mgf.jpg` (existing) | img | https://framerusercontent.com/images/rd5MgfUbehNJFlOj4GFTSCu6s.jpg | 500×500 jpeg | 40×40 | 30×30 |
| `public/assets/pages/team/avatar-UykoKB.jpg` (existing) | img | https://framerusercontent.com/images/UykoKB3qWpDuQFs63IkEFFJAHJU.jpg | 500×500 jpeg | 64×64 | 48×48 |
| `public/assets/pages/team/avatar-OWtK8c.jpg` (existing) | img | https://framerusercontent.com/images/OWtK8csPRIgyIbwUmXibw4qkvPo.jpg | 500×500 jpeg | 40×40 | 30×30 |
| `public/assets/pages/get-started/inline-7-3e51a6.svg` | inline SVG in `7` | (inline markup) | svg 96×36 | 96×36 | |
| `public/assets/pages/get-started/datauri-1-e34499.svg` | data-URI mask in `1` | (data URI) | svg 96×77 | 55×44 | |
| `public/assets/pages/get-started/datauri-johnson-johnson-462200.svg` | data-URI mask in `Johnson&johnson` | (data URI) | svg 96×36 | 127×48 | |
| `public/assets/pages/get-started/datauri-1-3c001c.svg` | data-URI mask in `1` | (data URI) | svg 254×48 | 109×21 | |
| `public/assets/pages/get-started/datauri-3-650741.svg` | data-URI mask in `3` | (data URI) | svg 111×76 | 35×24 | |
| `public/assets/pages/get-started/datauri-4-070511.svg` | data-URI mask in `4` | (data URI) | svg 96×36 | 120×45 | |
| `public/assets/pages/get-started/datauri-5-164964.svg` | data-URI img in `5` | (data URI) | svg 96×36 | 103×39 | |
| `public/assets/pages/get-started/datauri-6-d6d3f4.svg` | data-URI mask in `6` | (data URI) | svg 96×36 | 120×45 | |

---

# /contact

Title `Cradle`. Doc height 2216 (1440) / 3149 (390). Screenshot `reference/pages/contact-1440.png`.
Order: Navbar · C1 Header · C2 Form card · C3 Trust logos · Footer. Same template as /get-started (reuse **FormCard** light + **TrustTicker**).

## C1 Header
- 1440×404, padding `180px 40px 80px`, column gap 20, centered. No avatars.
- H2 `Nice to meet you.` (64, center). Lead (center, max-w 500): `Do you want to partner with Cradle, or just get in touch? You can do that with the form below.`
- Phone: 390×323.2, padding `180px 20px 40px`; H2 32/35.2; lead 16/24.
- No motion.

## C2 Form card
- Identical shell to /get-started G2 (section 1440×1130.4). H3 `Get in touch with Cradle`. Iframe 1040×942 (EXTERNAL HubSpot form 0156fad7…).
- Fields: `First name*` | `Last name*`; `Job Title*` | `Company name*`; `Email*` (help `Please use your work email address.`); `Phone number (optional)` (+ help); `Message*` (textarea, ph "Please provide context on your ask."); `Where did you hear about Cradle? (optional)`; consent paragraph; `Submit`. No academia notice line.
- Phone: card 350×1383.8, H3 24 centered, iframe 350×1305.

## C3 Trust logos
Identical to /get-started G3 (section 1440×182 / 390×306.4).

## Links (contact)
None in body. EXTERNAL: HubSpot iframe.

## Assets (contact)
New files live in `public/assets/pages/contact/` (full resolution, query params stripped). Files marked (existing) are already in `public/assets/` (see `public/assets/MANIFEST.md`) or in another page folder of this spec. Rendered sizes are CSS px; n/a = not rendered at that width (or only in an interactive state).

| file | used in (framer layer) | original URL | file size/format | rendered 1440 | rendered 390 |
|---|---|---|---|---|---|
| `public/assets/logo-wordmark.png` (existing) | Wordmark 2 | https://framerusercontent.com/images/AtEI6tbWiHI47fwFzLXMJG4y8oE.png | 222×66 png | 78×22.1 | 78×22.1 |
| `public/assets/pages/get-started/inline-7-3e51a6.svg` (existing) | inline SVG in `7` | (inline markup) | svg 96×36 | 96×36 | |
| `public/assets/pages/get-started/datauri-1-e34499.svg` (existing) | data-URI mask in `1` | (data URI) | svg 96×77 | 55×44 | |
| `public/assets/pages/get-started/datauri-johnson-johnson-462200.svg` (existing) | data-URI mask in `Johnson&johnson` | (data URI) | svg 96×36 | 127×48 | |
| `public/assets/pages/get-started/datauri-1-3c001c.svg` (existing) | data-URI mask in `1` | (data URI) | svg 254×48 | 109×21 | |
| `public/assets/pages/get-started/datauri-3-650741.svg` (existing) | data-URI mask in `3` | (data URI) | svg 111×76 | 35×24 | |
| `public/assets/pages/get-started/datauri-4-070511.svg` (existing) | data-URI mask in `4` | (data URI) | svg 96×36 | 120×45 | |
| `public/assets/pages/get-started/datauri-5-164964.svg` (existing) | data-URI img in `5` | (data URI) | svg 96×36 | 103×39 | |
| `public/assets/pages/get-started/datauri-6-d6d3f4.svg` (existing) | data-URI mask in `6` | (data URI) | svg 96×36 | 120×45 | |

---
