Source: https://www.cradle.bio/

# Cradle homepage: clone spec

Measured on 2026-10-12 from the live site (Playwright, Chromium) at 1440x900 and 390x844, cross-checked against `reference/original.html`. All values come from `getComputedStyle` / `getBoundingClientRect`. Coordinates are document-space `[x, y, w, h]` in px at the stated viewport. Reference screenshots: `reference/live-1440.png` (1440x10562) and `reference/live-390.png` (390x10491). The cookie banner was hidden for the screenshots.

The site is a Framer build. There are no CSS keyframes or CSS transitions on the page. All motion is framer-motion JS, specified in the Motion section of each block and summarised in section 14.

---

## 0. Global

### Breakpoints (from `__framer__breakpoints`)
| name | media query | Framer variant hash (appear anims) |
|---|---|---|
| Desktop | `(min-width: 1200px)` | `default` |
| Tablet | `(min-width: 810px) and (max-width: 1199.98px)` | `llr21f` |
| Phone | `(max-width: 809.98px)` | `1oroiq2` |

Tailwind suggestion: `screens: { md: '810px', lg: '1200px' }`. This spec documents Desktop (1440) and Phone (390). The tablet layout was not measured.

### Page frame
- `body` bg `#ffffff`. Every page wrapper is a column flex with `align-items:center`.
- Fixed nav is 64px tall and overlays the page. `#main` starts at y=0, and the hero adds its own top padding (280px desktop, 120px mobile).
- Content container: `max-width:1280px`, horizontal section padding `40px` on desktop (so content spans x=80…1360 at 1440) and `16px` on mobile (content is 358 wide at 390).
- Document height: 10562px desktop (main 10062 + footer 499), 10491px mobile.

### Color tokens (Framer `--token-*`, resolved)
| role | value |
|---|---|
| ink / dark bg (`gray-950`) | `#030712` rgb(3,7,18) |
| gray-900 | `#111827` |
| gray-800 (secondary-button text, card gradient) | `#1f2937` rgb(31,41,55) |
| gray-700 | `#374151` |
| body muted text | `#616e80` rgb(97,110,128) |
| gray-400 (icons, inactive tab text) | `#9ca3af` rgb(156,163,175) |
| gray-300 (bar-chart gray) | `#d1d5db` |
| gray-200 | `#e5e7eb` |
| gray-100 (card bg) | `#f3f4f6` |
| gray-50 (section alt bg) | `#f9fafb` |
| brand blue (button bg) | `#224eee` rgb(34,78,238) |
| brand blue hover | `#1b3ada` rgb(27,58,218) |
| accent blue (bullets, active borders, tab bar) | `#2d66f8` rgb(45,102,248) |
| blue-400 (CTA gradient) | `#5e95fc` |
| blue-300 (CTA 2nd line) | `#92bafe` rgb(146,186,254) |
| blue-200 (progress fill, glow) | `#bed5ff` rgb(190,213,255) |
| blue-100 (highlight bubble) | `#dbe7fe` |
| blue-50 | `#eff4ff` |
| green (antibody) | `#3cab57` rgb(60,171,87) |
| sky (enzyme, bar "with Cradle") | `#0ea5e9` rgb(14,165,233); sky-400 `#38bdf8` rgb(56,189,248) |
| olive (peptide) | `#98b62c` rgb(152,182,44) |
| khaki (vaccine) | `#9b9265` rgb(155,146,101) |
| orange (in-progress icon) | rgb(235,145,49) |
| white alphas | `#ffffff0a` (0.04), `#ffffff14` (0.08), `#ffffff1f` (0.12), `#fff3` (0.2), `#fff6` (0.4), `#fff9` (0.6), `#fffc` (0.8) |
| black alphas | `#0000000a` (0.04), `#00000014` (0.08), `#0000001f` (0.12) |

### Fonts (see section 15 for @font-face)
| family | weights used | used for |
|---|---|---|
| `"Rethink Sans", "Rethink Sans Placeholder", sans-serif` | 500, 600 | all headings (h1–h5), tab titles, "All projects" |
| `Inter, "Inter Placeholder", sans-serif` | 400, 500, 600, 800 | body, nav, buttons, captions |
| `"Spot Mono Medium", "Spot Mono Medium Placeholder", monospace` | 500 (also rendered at 400 in bar labels) | eyebrow labels (uppercase), footer column headers, bar numbers |
| `"Crimson Pro Regular", "Crimson Pro Regular Placeholder", serif` | 400 | testimonial quotes |

`Hedvig Letters Serif`, `Crimson Pro Bold`, `JetBrains Mono`, `Rethink Sans 700/800` and many Inter italics are declared in the page CSS but never rendered on the homepage. Source Sans 3 loads from the Framer editor iframe and is not part of the page.

### Typography scale (desktop → mobile)
| role | family | size / line-height / letter-spacing / weight | color |
|---|---|---|---|
| Hero H1 | Rethink Sans | 95.49 / 95.49 / -4.77px (-0.05em) / 500 → mobile 51.3 rendered (44px × 0.9 × 1.296 SVG scale), lh 1em, ls -0.05em | white, gradient-clipped (see 2) |
| Footer-CTA H1 | Rethink Sans | 72 / 72 / -2.88px / 500 → 40 / 40 / -1.6px | `#fff` + `#92bafe` |
| Section H2 | Rethink Sans | 64 / 64 / -2.56px / 500 → 32 / 35.2 / -0.64px | `#030712` (white on dark) |
| H3 (rail titles) | Rethink Sans | 32 / 38.4 / -0.64px / 500 → 24 / 28.8 / -0.48px | `#030712` |
| H4 (card titles, tab titles) | Rethink Sans | 24 / 28.8 / normal / 500 → 18 / 21.6 | `#030712` / white |
| H5 (modality, feature) | Rethink Sans | 18 / 25.2 / -0.18px / 600 → 16 / 20 / -0.16px | `#030712` / white |
| Eyebrow | Spot Mono Medium | 18 / 24 / 1.08px / 500, uppercase → 14 / 24 / 0.84px | `#616e80` (on dark: `rgba(255,255,255,.8)`) |
| Lead paragraph | Inter | 20 / 30 / -0.8px / 500 → 16 / 24 / -0.64px | `#616e80` (white on dark) |
| Body | Inter | 16 / 25.6 / -0.32px / 500 → 14 / 22.4 / -0.28px | `#616e80` |
| Nav link / button 36 | Inter | 14 / 16.8 / -0.14px / 600 → mobile buttons 13 / 15.6 / -0.13px | |
| Button 48 | Inter | 16 / 24 / normal / 600 | |
| Quote | Crimson Pro Regular | 28 / 33.6 / normal / 400 → 22 / 26.4 | `#030712` |
| Footer col header | Spot Mono Medium | 16 / 16 / normal / 500 uppercase → 13 / 13 / 0.26px | `rgba(255,255,255,.6)` |
| Footer link | Inter | 16 / 25.6 / -0.32px / 500 → 14 / 22.4 / -0.28px | `#fff` |
| Legal | Inter | 12 / 19.2 / 0.24px / 500 → 10 / 16 / 0.2px | `rgba(255,255,255,.6)` |
| Badge text | Inter | 8 / 9.6 / 0.08px / 600 | `#616e80` |

### Shared components
**Primary36** (nav "Discuss your project"): h36, padding `0 12px`, radius 8, bg `#224eee` (also `linear-gradient(#224eee,#224eee)`), shadow `inset 0 0 0 1px rgba(0,0,0,.12)`, text Inter 14/600/16.8/-0.14 white. Hover: bg → `#1b3ada`, ~80–100ms.
**Secondary36** ("Sign in"): h36, padding `0 12px`, radius 8, bg white, shadow `inset 0 0 0 1px rgba(0,0,0,.08)`, text `#030712`. Hover: no measurable change.
**Primary48**: h48, padding `0 24px`, radius 12, bg `#224eee`, `inset 0 0 0 1px rgba(0,0,0,.12)`, text Inter 16/600/24 white. Hover bg `#1b3ada`.
**Secondary48**: h48, padding `0 24px` (footer CTA `0 32px`), radius 12, bg `linear-gradient(180deg,#fff 0%,#f9fafb 100%)`, shadow `inset 0 0 0 1px rgba(0,0,0,.08)`, text Inter 16/600/24 `#1f2937`. Hover bg → `linear-gradient(#f9fafb,#f3f4f6)`.
**Eyebrow**: row, gap 16 (mobile 12), align center: 8×8 square bg `#2d66f8` radius 2 (sits in a 9px-tall box with 1px top padding), then the label. On desktop each word is a separate `<span>` for the word-stagger animation. On mobile the label is a single `<p>` and nothing animates.
**Framer borders**: Framer draws every border with an inset `::after` (`content:""; position:absolute; inset:0; border:…; border-radius:inherit; pointer-events:none`). Reproduce them with `ring`/`box-shadow inset` or an `::after`. The values are listed per element below.

---

## 1. Navbar (`desktop-nav`)

### Desktop (≥1200)
- `position:fixed; top:0; width:100%; z-index:10; height:64px`.
- Inner bar `Desktop-dark`: bg `#030712`, padding `0 24px`, overflow hidden. `::after` bottom border 0.5px `rgba(243,244,246,0)` (invisible).
- Row `[24,14,1392,36]`, `justify-content:space-between; align-items:center`.
  - **Logo link** `href="./"` (gap 12):
    - Symbol tile 36×36, radius 9.82px, bg `linear-gradient(180deg,#fff 0%,#f9fafb 100%)`, shadow `rgba(0,0,0,.25) 0 .362176px 1.08653px -1.625px, rgba(0,0,0,.14) 0 3px 9px -3.25px`, `::after` 0.5px `rgba(0,0,0,.03)`. The glyph is a background SVG, 36×36 viewBox → `public/assets/cradle-symbol.svg`.
    - Wordmark: `logo-wordmark.png` (222×66) rendered 78×22.1 at x=72, y=21 with `filter: grayscale(1) invert(1); mix-blend-mode: luminosity` (renders white).
  - **Links** (centered group, x=464, gap 0). Each item has padding `0 12px`, h36, radius 8, text Inter 14/600/16.8/-0.14 white, `white-space:pre`:
    `Platform` (./platform) · `Solutions` (dropdown) · `Company` (dropdown) · `Licensing` (./licensing) · `Resources` (dropdown). Item widths: 80.1 / 86 / 88 / 88 / 94.1.
    Hover: text color → `rgba(255,255,255,.8)`. No bg change.
  - **Buttons** (gap 8): `Sign in` Secondary36 (68.9 wide) → https://app.cradle.bio/login. `Discuss your project` Primary36 (160 wide) → ./get-started.
- **Scroll behaviour: none.** The bar keeps the same bg, height and colors at every scroll position (checked at 0…10000). It never hides or shrinks.

### Dropdowns (hover, desktop)
The panel is fixed. Its top is 54 (4px below the bar items) and it is horizontally centered under the trigger item.
- Panel: bg white, radius 12, shadow `rgba(0,0,0,.18) 0 .602187px .602187px -1.25px, rgba(0,0,0,.16) 0 2.28853px 2.28853px -2.5px, rgba(0,0,0,.06) 0 10px 10px -3.75px`.
- Column: padding `8px 8px 12px 8px` (Company/Resources: `8px`). Column header row 200×32, padding `8 16 8 12`, text Inter 13/500/15.6 `#9ca3af`.
- Item link: 200 (Solutions-left 150) × 40, padding `8px 12px`, radius 8, gap 12, optional 24×24 icon, text Inter 14/500/16.8 `#616e80`. Hover: text → `#030712`, no bg.
- **Solutions** (432×212, x=371): left col "By industry" → Biopharma (./solutions/biopharma), Industrial (./solutions/industrial), Academia (./solutions/academia), no icons. Right col "By modality" → Antibody, Enzyme, Vaccine, Peptide (./modality/*) with icons `menu-icon-{antibody,enzyme,vaccine,peptide}.svg`.
- **Company** (216×136, x=566): Our team (./team), Our wet lab (./lab), Careers (./careers), with icons `menu-icon-team/lab/careers.svg`.
- **Resources** (216×216, x=745): Blog (./blog), Case studies (./case), Documentation (https://docs.cradle.bio), Security & privacy (https://www.cradle.bio/security), Cradle-1 Whitepaper (./whitepaper), with icons `menu-icon-blog/case-studies/docs/security/whitepaper.svg`.
- **Open/close motion** (sampled per frame): the panel wrapper animates `opacity 0→1` and `translateY(8px)→0`. Opacity reaches 1 at ≈180ms. The y value overshoots to −0.12px at ≈220ms and settles by ≈400ms, which is a spring (≈ `{type:'spring', stiffness:500, damping:35}` reproduces it). Close is the reverse: opacity 1→0 in ≈150ms, y → 8px, then the panel unmounts.

### Phone (<810)
- Variant `mobile-dark-closed`: h64, bg `#030712`, padding 16, row `[16,10,358,44]`.
- Logo is the same as desktop (tile at x=16, wordmark at x=64).
- Right group (gap 4): Primary36 `Discuss your project` 150.3 wide, text Inter 13/600/15.6/-0.13. Then the hamburger: 44×44 hit area holding a 36×36 box, bg `rgba(255,255,255,.08)`, radius 6, with two bars 14×2 white radius 10 at y=27 and y=35 (centered x).
- **Open** (`mobile-dark-open`): the bar expands to full height 844, padding `10px 16px 120px`, column gap 40.
  - The hamburger becomes an X: two 11×11 white bars rotated ±45°.
  - The header button changes to `Talk to sales` (100 wide). It renders with opacity 0 on its wrapper.
  - Below: full-width `Sign in` (Secondary36) and `Discuss your project` (Primary36), each 358×36, gap 8.
  - Then link rows 358×48 (Inter 14/600/18.2, white on dark), 1px dividers `rgba(255,255,255,.08)`, and group labels Inter 13/500/15.6 `#9ca3af`. Order: Platform | Industries: Biopharma, Industrial, Academia | Modalities: Antibody, Enzyme, Peptide, Vaccine | Company: Our team, Careers, Our wet lab, Blog, Case studies | Licensing, Documentation, Security & Privacy, Whitepaper, Trust.
  - **Live quirk:** the live site also renders a duplicate set of "on-light" rows (text `#616e80`: a second "Platform", then Industries and Modalities) above the white rows. The duplicate is visible in the live UI. Decide with the user whether to replicate it. The open/close animation timing was not captured.

---

## 2. Hero / intro (`intro`)

### Desktop
- Section: bg `#030712`, padding-top 280, height 545.1, row `justify-content:center; align-items:flex-end`.
- `content` `[80,280,1280,265]`: max-w 1280, padding-bottom 40, column, gap 60.
- `text` `[200,280,1040,225]`: max-w 1040, row, `align-items:flex-end`, gap 120, z 5.
  - **Left `title`** (600 wide, column gap 8):
    - **News pill** `a` → `./blog/hansa`, `[200,280,272.8,26]`: padding `1px 0 1px 6px`, radius 6, bg `rgba(255,255,255,0)`, `::after` bottom 0.5px transparent, gap 6.
      - 3×10 rounded bar `#2d66f8` (`news-pill-bar.svg`).
      - Text `News:` Inter 12/400/14.4 white.
      - Text `Hansa Biopharma chooses Cradle` Inter 12/400/14.4 white, masked with `linear-gradient(270deg, rgba(0,0,0,.4) 0%, rgba(0,0,0,.8) 100%)` (renders as dimmed white).
      - Chevron `icon-chevron-right-small.svg` 24×24 at opacity 0.5.
      - Hover: bg → `rgba(255,255,255,.06)` (~100ms).
    - **H1** (`svg` viewBox `0 0 599.77 191`, rendered 600×191.1 at y=314; Framer fit-text, scale 1). Text, verbatim with a line break: `Engineer better` / `proteins, faster.`. Font: Rethink Sans 500, 95.4932px, line-height 1em, letter-spacing −0.05em. Fill: `background-image: linear-gradient(270deg, rgba(255,255,255,.8) 0%, #fff 54%); background-clip:text; -webkit-text-fill-color:transparent`. The span has 12px padding, a Framer gradient-clip artifact. Ignore it in the clone. Line 1 is 595 wide, line 2 is 583.4 wide.
  - **Right `body`** `[920,378.7,320,126.4]` (column gap 16, padding-bottom 7):
    - 40×1 rule, bg `rgba(255,255,255,.08)`.
    - Paragraph (max-w 320), verbatim: `Leverage AI to generate protein candidates and improve their properties. More breakthroughs in fewer experiments — guided by your own experimental data.` Inter 16/500/25.6/-0.32, gradient text `linear-gradient(283deg, rgba(255,255,255,.6) 0%, rgba(255,255,255,.8) 100%)` clipped to text. Four lines, 102.4 tall.
- **Background blobs** (`bg squiggles`, absolute `[0,255,1440,900]`, overflow hidden, z 1; desktop only, hidden on phone):
  - `right`: `hero-blob-right.png` (1434×1454 natural) at `[863,341.6,717,727]` (blurred green blob, object-fit cover). Base transform `translateY(-50%)`.
  - `left`: `hero-blob-left.png` (1727×1394) at `[-280,419,778,626]` (blue blob). Base `translateY(-50%)`.
  - These blobs overlap down into the platform-UI section.

### Phone
- Section padding-top 120, height 419.6. `content` padding `0 16px 32px`, column, `justify-content:flex-end`, gap 60.
- `text` column gap 20, centered.
- News pill `[16,120,358,36]`: padding `8 0 8 6`. Text 10/400/12 white. **The copy differs on phone:** `News:` + `Lundbeck partners with Cradle` (href still ./blog/hansa). Bar 2×8, chevron 20×20.
- H1: SVG viewBox `0 0 276.2 88` rendered 358×114.1. foreignObject `scale(0.9)`, font-size 44px, ls −0.05em, lh 1em, `text-align:center`. The rendered glyph size is ≈51.3px.
- Body: 322.2 wide, centered at x=33.9, Inter 14/500/22.4/-0.28 `rgba(255,255,255,.6)`, centered, solid color (no gradient).

### Motion (appear on load; from `__framer__appearAnimationsContent`)
Initial state is `opacity:0.001`. All Desktop/Tablet/Phone variants share the same values unless noted.
| element | from | to | transition |
|---|---|---|---|
| News pill (id `1aaq7dz`) | y 10 | y 0, opacity 1 | spring `bounce:0.05, duration:0.4, delay:0.8` |
| H1 svg (`1a5ta0x`) | y 20 | 0 | tween `duration 1, delay 0.1, ease cubic-bezier(0.7,-0.35,0.3,1.1)` (phone: y 30, dur 1.15, delay 0) |
| Body (`t28ivq`) | y 30 | 0 | tween `duration 1.15, delay 0.1`, same ease |
| Platform-UI wrapper (`v3qs3o`) | y 60 | 0 | tween `duration 0.8, delay 0.3`, same ease (phone: y 30, dur 1.15, delay 0.2) |
| Blob right (`ke9rn0`) | scale 0.9 | 1 | spring `bounce 0.3, duration 1, delay 0.3`, transformTemplate `translateY(-50%) …` |
| Blob left (`1t4yh5f`) | scale 0.9 | 1 | spring `bounce 0.3, duration 1, delay 0.2` |
| Phone only: UI frame (`tn7rml`) | scale 0.8 | 1 | tween `duration 0.3, delay 0.6, ease cubic-bezier(0.12,0.23,0.5,1)` |

### Scroll parallax (blobs, measured linear)
- `right`: `translateY(calc(-50% - 0.15 * scrollY))`. At scroll 0, y = −363.5 (= −50%). At scroll 1000, y = −513.5.
- `left`: `translateY(calc(-50% - 0.30 * scrollY))`. At scroll 0, y = −313. At scroll 1000, y = −613.
- No smoothing lag was measured, so update directly per scroll frame.

---

## 3. Platform UI showcase (`platform-ui`)

### Desktop
- Section: bg `#030712`, padding-bottom 80, height 939.4. The inner wrapper is the appear-animated `v3qs3o`, z 5.
- `desktop 1` `[36,545,1368,859]`: padding `8px 40px 40px`, column, gap 40.
- **UI frame `ui`** `[150,553,1140,651.4]`:
  - max-w 1140, bg `rgba(255,255,255,.04)`, radius 24, `::after` 1px `rgba(255,255,255,.16)`.
  - Mask: `radial-gradient(158% 75% at 50% 23.1%, #000 82.0471%, rgba(0,0,0,.95) 85%, rgba(0,0,0,.75) 88%, rgba(0,0,0,.55) 91.4277%, rgba(0,0,0,.35) 94.1967%, rgba(0,0,0,.2) 97.1918%, rgba(0,0,0,0) 100%)` (fades out the bottom).
  - Three stacked screenshots, absolute `[162,565,1116,692.4]` (12px inset). Each has radius `12px 12px 0 0`, shadow `rgba(22,31,85,.16) 0 1px 8px 0`, `backdrop-filter: blur(5px)`, overflow hidden, and `object-fit:cover; object-position:50% 0%`:
    - `round` → `ui-round.png` (alt "round ui"), active by default (opacity 1).
    - `data` → `ui-data.png` (alt "data ui"), opacity 0.
    - `report` → `ui-report.png` (alt "report ui"), opacity 0.
- **Tabs** `[180,1244.5,1080,120]`: max-w 1080, padding `0 16px`, row, `justify-content:center; align-items:flex-start`, gap 20. Clicking switches the tab. **There is no auto-advance** (observed 20s).
  - Selected tab: 400 wide, column gap 10.
    - 4px bar radius 100 bg `#2d66f8`, inside a 20px-tall row with 16px bottom padding.
    - H4 Rethink Sans 24/500/28.8 white.
    - Description (max-w 400) Inter 16/500/25.6/-0.32 `#9ca3af`. Every letter is its own span, grouped in word spans (`white-space:nowrap`).
  - Unselected tab: content width, bar `rgba(255,255,255,.08)`, H4 `rgba(255,255,255,.6)`, no description. Height 58.8.
  - Copy (verbatim) and the screenshot each tab shows:
    1. `Generate candidates`, round ui: `Track round status easily, from generating candidates to uploading experimental results.`
    2. `Explore reports`, report ui: `Review predicted performance of generated sequences before sending them to the lab.`
    3. `Manage data`, data ui: `Securely upload, manage, and track experimental data and generated candidates in one place.`
  - Measured layout at default: selected tab x=345.6 (400), others 166.5 and 142.3 wide at x=765.6 and 952.1. The row is centered.
- **Tab switch motion** (sampled per frame after a click):
  - The tabs animate layout over ≈300ms with an ease-in-out shape. The newly selected tab grows from 59→120 tall and 167→400 wide, the old one shrinks, and the row re-centers.
  - The bar color crossfades `rgba(255,255,255,.08)`↔`#2d66f8`. The H4 color crossfades `.6`↔`1`.
  - The screenshots crossfade opacity over ≈250ms.
  - Description letters start at opacity 0 and y 10px, begin ≈250ms after the click, and all reach 1 / y 0 together in ≈300ms (ease-out). There is no per-letter stagger.

### Phone
- Section bg `linear-gradient(190deg, #030712 30%, #ffffff 73%)`, height 329.7. Wrapper `mobile 1` padding `8 8 40 8`, gap 32.
- Tabs come first, as pills `[8,427.6,374,36]`, centered row with wrap, gap 8:
  - Pill: padding `8px 16px`, radius 100, text Inter 14/600/18.2 centered.
  - Selected pill: bg white, text `#030712`. Others: bg `rgba(255,255,255,.08)`, text `#9ca3af`.
  - Labels: `Generation`, `Reports`, `Data`.
- UI frame `[8,495.6,374,213.7]` radius 12. Screens inset 6 at `[14,501.6,362,222.2]`, radius 8.

---

## 4. Customers (`customers`)

### Desktop
- Section: bg `linear-gradient(180deg, #fff 64%, #f9fafb 99.7152%)`, padding `120px 40px 60px`, height 956, gap 20.
- Inner column (max-w 1280) gap 40.
- Title block (column gap 20):
  - Eyebrow `OUR CUSTOMERS`.
  - H2 (max-w 720, 2 lines × 64 = 192 tall), verbatim: `Trusted by the world's top Biopharma and Industrial Bio R&D teams`.
- Row `[80,1880,1280,500]`, gap 12:
  - **Testimonial card** `[80,1880,507.2,500]`: bg white, radius 16, `::after` 1px `rgba(0,0,0,.08)`, overflow clip, column `justify-content:space-between`.
    - Top area 417 tall, padding 24, bg per slide (below). Quote (z 2) is Crimson Pro Regular 28/33.6 `#030712`. Attribution is bottom-aligned: name Inter 16/500/25.6/-0.32 `#030712`, title the same in `#616e80`.
    - Progress track `[80,2297.5,507.2,3]`, overflow clip. The fill is bg `#bed5ff` and grows linearly from width 0→507 over the slide duration.
    - Logo row 80 tall, padding `16px 24px`, gap 12: four 48×48 tiles, bg white, radius 12, padding 3, with 32×32 logos inside. Inactive tile `::after` 1px `rgba(0,0,0,.08)`; active tile `::after` 3px `#2d66f8`.
    - **Auto-advance every ≈5.45s** (measured 5446–5458ms between slides), looping 1→2→3→4→1. The quote/attribution swap shows no opacity animation; the progress resets to 0 on each change.
    - Slides (verbatim):
      1. Bg `linear-gradient(180deg, #fff 60%, rgba(193,125,119,.18) 100%)`. Logo: `testimonial-logo-novonesis.png`. `Through our partnership with Cradle, we are embedding advanced Al directly into how we innovate, enabling our teams to shorten development time and bring real-world biosolutions faster to market.` / `Claus Fuglsang Crone` / `Chief Scientific Officer, Novonesis`. The "Al" (lowercase L) typo is verbatim.
      2. Bg `linear-gradient(179.548deg, #fff 60%, rgba(179,204,225,.31) 100%)` (rendered once as `179deg … rgba(20,116,205,.08)`). Logo: `testimonial-logo-corteva.png`. `Cradle’s AI-based protein design platform provides easy access and acceleration to protein optimization for the discovery pipeline.` / `Eswar Narayanan` / `Director, Corteva Catalyst`.
      3. Bg `linear-gradient(180deg, #fff 60%, rgba(137,211,42,.08) 100%)`. Logo: `testimonial-logo-bayer.svg`. `Cradle’s platform provides us with a scalable, scientist-centric solution to maximize the opportunities in our biologics portfolio and potentially deliver faster, more effective medicines to patients.` / `Anastasia Hager, Ph.D.` / `Global Head of Drug Discovery Sciences, Bayer`.
      4. Bg same as 3. Logo: `testimonial-logo-lundbeck.svg`. `Our partnership with Cradle fits perfectly into our commitment to become a bionic company. Cradle provides our scientists with powerful AI that fits seamlessly into our processes, strengthening our ability to discover and optimize therapeutics.` / `Tarek Samad` / `SVP & Global Head, Research, Lundbeck`.
  - **Logo grid** `[599.2,1880,760.8,500]`: CSS grid of 3 columns (245.6 each) × 4 rows (116 each), gap 12.
    - Tile: bg white, radius 17, `::after` 1px `rgba(0,0,0,.08)`, column centered, gap 10.
    - Logo box max-w 117, height 42, opacity 0.6, `object-fit:contain`.
    - Badge (absolute, left 10, bottom 16): bg `#f3f4f6`, radius 34, padding `2px 6px 2px 8px`, gap 2, `::after` 0.5px `rgba(0,0,0,.04)`. Text 8/600/9.6/0.08 `#616e80`, followed by a 12×12 `#9ca3af` arrow (`icon-arrow-up-right.svg` as mask).
    - Hover: tile gains `box-shadow: rgba(0,0,0,.04) 0 0 6px 0`. Logo and badge do not change.
    - Order (row-major), file, link, badge:
      1. novonesis `customer-logo-novonesis.svg` → linkedin.com/posts/novonesis_… , "Read announcement"
      2. Novo Nordisk `customer-logo-novo-nordisk.svg` → pharmavoice.com/… , "Read article"
      3. Johnson&Johnson Innovative Medicine `customer-logo-jnj.svg`, no link
      4. Bayer `customer-logo-bayer.svg` → https://www.cradle.bio/blog/bayer-collaboration , "Read announcement"
      5. abbvie `customer-logo-abbvie.svg` (renders 117×21.8), no link
      6. Hansa `customer-logo-hansa.svg` → hansabiopharma.com/… , "Read announcement"
      7. illumina `customer-logo-illumina.svg` (117×26.7, alt "illumina"), no link
      8. CSL `customer-logo-csl.svg`, no link
      9. Lundbeck `customer-logo-lundbeck.svg` (alt "Lundbeck") → cen.acs.org/… , "Read article"
      10. ultragenyx `customer-logo-ultragenyx.svg`, no link
      11. Repligen `customer-logo-repligen.svg` (117×26.5), no link
      12. Corteva `customer-logo-corteva.svg`, no link
    - Full hrefs: `https://www.linkedin.com/posts/novonesis_biosolutions-innovation-collaboration-activity-7407400799586189312-edTX/`, `https://www.pharmavoice.com/news/ai-drug-discovery-pharma-immunai-pfizer-novo-nordisk-cradle/758994/`, `https://www.hansabiopharma.com/media/press-releases/2026/hansa-biopharma-partners-with-cradle-to-advance-ai-driven-protein-design-and-engineering/`, `https://cen.acs.org/articles/104/web/2026/06/exclusive-lundbeck-taps-cradle-ai.html`.

### Phone
- Section padding `40px 16px`, gap 32. Eyebrow 14px. H2 32/35.2 (105.6 tall).
- Order is reversed: the logo grid comes first (`[16,979,358,260]`, 3 cols × 114, rows 81.3, gap 8; tile radius 12, gap 15, logo max-w 70%), then the testimonial card (358×450, quote 22/26.4, attribution 14/22.4).

### Motion
- Eyebrow words: each word `opacity .001→1, translateY(8px)→0`, duration ≈0.8s, stagger 0.1s per word. Progress is ≈0.95 at the half-time point, so use a strong ease-out such as `cubic-bezier(0.22,1,0.36,1)`. Fires once when the element enters the viewport (any pixel visible).
- Testimonial card and logo grid: `opacity 0→1, translateY(20px)→0`, ≈0.4s, ease-out (≈77% at half-time), grid delayed 0.15s after the card. The trigger fires only once the 500px block is (nearly) fully in view (observed with `amount` ≈ 0.5–1), once.

---

## 5. Recent case studies (`lab-blog-posts` #1)

### Desktop
- Section: bg `#f9fafb`, padding `60px 40px 80px`, height 497, `::after` top 1px `rgba(0,0,0,.04)`.
- Content gap 40. H3 `Recent case studies`.
- Row of 4 cards, gap 24, `align-items:flex-start`. Card width 302, column gap 16.
  - Image 302×160.4, radius 16, cover. `::after` 4px `rgba(45,102,248,0)`.
  - Title Inter 16/500/25.6/-0.32 `#616e80`.
  - **Hover**: image `::after` border → 4px `#2d66f8` (inside), title → `#030712`.
- Cards (verbatim):
  1. `case-keasling-qs21.png` → ./blog/keasling-qs21: `Using AI to produce vaccine adjuvants without cutting down rainforest`
  2. `case-therapeutic-peptides.png` → ./blog/therapeutic-peptides: `Engineering therapeutic peptides with 50% success rate under tight multi-property constraints, 5× faster than prior efforts`
  3. `case-staph-aureus-vaccine.png` → ./blog/staphylococcus-aureus-vaccine: `Improving Staphylococcus aureus vaccine thermostability by 2.5 °C in a single round, 7× faster than rational design`
  4. `case-igg-campaign.png` → ./blog/igg-campaign: `Rescuing a stalled IgG campaign: 10 candidates meeting potency and developability criteria in 3 rounds`

### Phone
- Padding `32px 16px 64px`, gap 32, H3 24/28.8/-0.48.
- **Only cards 1 and 2 are shown**, in a 2-column grid of 167 each with gap 24. Image 167×88.7, title 14/22.4.

---

## 6. Benefits / "Protein engineering 2.0" (`benefits`)

### Desktop
- Section: bg white, padding `120px 40px 80px`, height 1926.6. Content max-w 1280, gap 40.
- Header (column gap 30):
  - Eyebrow `PROTEIN ENGINEERING 2.0`.
  - H2 (720 wide), verbatim: `Better results across` / `all your properties`.
  - Lead paragraph (600 wide, 4 lines = 120 tall): `Get products to market in quarters, not years. Use Cradle to chart the fastest course to proteins that meet all your desired objectives. Explore further, optimize faster, and reach your destination in fewer experiments.`
  - Primary48 `Explore our platform` (205.1 wide) → ./platform.
- **Bento grid**: 5 columns × 240 with gap 20. Rows are 636.6 and 610.
  - **Card A** "Compounding results" (col span 3, 760×636.6):
    - bg `#f3f4f6`, radius 16, overflow hidden.
    - Asset area 435 tall, padding 40:
      - `bg-pattern`: `benefits-grid-pattern.svg` tiled at 110.5px, opacity 0.05, `mix-blend-mode:multiply`, mask `radial-gradient(45% 50%, #000 0%, transparent 100%)`, `translateX(-380px)` (static).
      - Inner asset 500×300 holds two overlapping mini-cards:
        - `structure` card `[234,3589,256,180]` (rel. to asset: 24,24): bg `#030712`, radius 16, shadow `rgba(0,0,0,.08) 0 2px 8px 0`.
          - Pill top-right `[+181,+12,62.7,23.6]`: bg `#1f2937`, radius 100, padding `4px 8px`, text `+300%` Inter 13/600/15.6 `#38bdf8`.
          - Label bottom-left `T7 RNA` Inter 13/600/15.6 white at (+16,+148.4).
          - Image `benefits-t7rna-structure.png` 100×97.6 at (+78,+41), base `scale(0.8)`.
        - `bar graph` card `[430,3661,256,180]` (rel. 220,96): bg white, radius 16, same shadow, padding `20 20 16 20`, row `justify-content:center; align-items:flex-end`, gap 8.
          - Title `Round Progress` Inter 13/600/15.6 `#030712`. Legend: 8×8 `#0ea5e9` radius 2 + `with Cradle` Inter 13/500 `#616e80`, gap 4.
          - Four bars 48 wide, column, `justify-content:flex-end`, gap 4:
            - Blue (`#38bdf8`, radius 4) heights 20 / 40 / 60 / 90.
            - Gray (`#d1d5db`, radius 4) heights 10 / 15 / 17 / 24.
            - Label `1`–`4` Spot Mono 14/400/14 `#616e80`.
    - Text area padding 40, gap 16. H4 `Compounding results`. Body (max-w 90%): `Move from incremental progress to compounding results with models that learn from every round of your wet lab data. Teams that use Cradle report 2-12x faster development timelines.`
  - **Card B** "Breakthroughs on repeat" (span 2, 500×636.6):
    - bg `#030712`, radius 16.
    - Text area padding 40, gap 20. H4 white. Body `rgba(255,255,255,.6)`: `Following a single path puts you at risk of hitting a dead end. Instead, confidently explore multiple design strategies to bring more programs over the finish line and strengthen your IP portfolio.`
    - Lower area: bg `linear-gradient(180deg,#030712 0%,#1f2937 100%)`, column `justify/align flex-end`. `ui` 500×300, padding-left 32:
      - `back` strip 448×24 (padding-left 20): bg `rgba(255,255,255,.6)`, radius `16px 0 0 0`.
      - `front` panel 468×260 (it overflows the card bottom): bg white, radius `16px 0 0 0`, padding `48px 0 16px 40px`, gap 24, mask `linear-gradient(180deg,#000 75%,rgba(0,0,0,.8) 100%)`.
        - Header: `All projects` Rethink Sans 24/500/24 `#030712`, then a 24×24 chevron (`icon-chevron-down.svg` mask, `#9ca3af`), gap 10.
        - Three rows 56 tall, padding `8px 0`, gap 72. Rows 1–2 have `::after` bottom 1px `#f9fafb`.
          - Left (178 wide, gap 16): 40×40 icon box with a 28px `#9ca3af` masked icon (antibody, antibody, vaccine) + name Inter 16/500/16 `#030712`.
          - Right (gap 12): 20×20 status icon + label Inter 16/500/16 `#616e80`.
          - Rows: `mAb-HER2` · in-progress (`icon-status-in-progress.svg`, orange) `Round 4`; `mAb-TNF` · `icon-status-completed.svg` (green check) `Completed`; `vax-HPV9` · `Completed`.
  - **Card C** video (span 2, 500×610): radius 16, overflow hidden.
    - `<video src=benefits-video.mp4 autoplay muted loop playsinline preload=auto poster=benefits-video-poster.png>`, object-fit cover.
    - Video is 1920×1080, 15.32s. Framer pauses it when out of view and plays it when in view.
  - **Card D** "Co-optimize all your properties" (span 3, 760×610): bg `#f3f4f6`, radius 16.
    - Chart area 434 tall, padding 40. Radar container 480×360. Coordinates below are relative to the container.
      - Circles `radar-circles.svg` 240×240 at (120,60).
      - Polygons `radar-polygon-blue.svg` 177×174 at (146,83) and `radar-polygon-yellow.svg` 177×151 at (166,113).
      - Dots 12×12: blue at (234,77) (140,134) (183,234) (299,249) (315,140); yellow at (234,107) (161,144) (163,256) (288,233) (335,130).
      - Chips (bg white, radius 100, padding `8px 10px`, shadow `rgba(0,0,0,.08) 0 2px 8px 0`, text Inter 14/500/14/-0.14 `#616e80`):
        - `Binding affinity` centered at x=240, top 23 (uses `translateX(-50%)`).
        - `Specificity` (30,114).
        - `Activity` (360,114).
        - `Expression` (76,284).
        - `Stability` (313,284).
    - Text area padding 40, gap 16. H4 `Co-optimize all your properties`. Body: `Activity, binding, stability, expression, and more. Co-optimize the properties you care about, turning complex trade-offs into optimized solutions in fewer rounds.`

### Phone
- Section padding `40px 16px 64px`. H2 32/35.2. Lead 16/24/-0.64.
- Button is full width (358) and **reads `Explore Cradle Platform`**.
- Single-column grid with gap 16. Order: Card A, B, video (358×447.5), D.
- In cards A and D the text block comes **first** and the visual second. Text padding 24, H4 18/21.6, body 14/22.4.
- Card A's mini-cards are scaled about 0.66×. Card B's UI is scaled down (names 13px, All projects 19px).
- Card D on phone uses a **static image** `benefits-radar-mobile.png` (358×268.5) instead of the live radar. Its alt text is "Radar chart comparing antibody characteristics: binding affinity, specificity, activity, expression, and stability. …".

### Motion (desktop; every item here replays: it resets when it leaves the viewport and re-animates on re-entry)
- Eyebrow word stagger as in section 4.
- `T7 RNA` letters: each letter `opacity .001→1, y 4→0`, ≈0.4s, stagger ≈70–80ms.
- Blue bars 2/3/4 (bar 1 static): start at `translateY(40/60/90px)`, i.e. fully hidden below their clip, and slide to 0. ≈0.4s each, stagger ≈100ms, eased with slight overshoot.
- `Structure` image: `scale 0.8→1`, spring with a slight overshoot (peak 1.003), ≈1s. Returns to 0.8 when out of view.
- Card B `front`: `translateY(30)→0`. `back`: `opacity 0→1, y 30→0`, ≈100ms after front, ≈0.35s.
- Radar chips: `opacity 0→1, scale 0.8→1` with overshoot (peak 1.0023), ≈0.5s each, stagger 0.1s in this order: Binding affinity → Activity → Stability → Expression → Specificity.

---

## 7. Protein visual (`modlaities` [sic])

### Desktop
- Section: bg `linear-gradient(180deg,#f9fafb 0%,#fff 100%)`, height 900, overflow hidden. Inner `protein-visual` 1280×900.
- Glow: absolute `[160,5114,1120,400]`, bg `#bed5ff`, radius 200, `filter: blur(100px)`, z 1.
- `protein` cluster: absolute `[351.6,5041.1,739,546]`, z 2. It holds 29 frosted bubbles of 114×114:
  - Bubble style: bg `rgba(243,244,246,.6)`, radius 79%, shadow `inset 4px -24px 16px 3.6px rgba(7,89,133,.16), inset 2px 12px 12px 0 rgba(255,255,255,.5)`, `backdrop-filter: blur(16px)`.
  - Positions (left, top relative to the cluster), in DOM order: (102,157) (188,100) (188,157) (271,133) **(268,213.6)** (299.4,0) (157,213.6) (214,261) (325.5,157) (342.2,57) (356,247) (428,304) (497,247) (542,171) (157,327) (214,406) (74,349) (57,100) (459,349) (527,304) (599,247) (0,157) (399,189.9) (259,57) (399,227.8) (242,327) (485,432) (542,375) (625,171).
  - The bold 5th entry is the highlighted bubble: bg `#dbe7fe`, radius 79.2%, shadow `inset 4px -24px 16px 3.6px rgba(3,7,18,.08), 2px 0 24px 0 rgba(45,102,247,0)`, no blur.
- Molecule tiles (absolute, z 3, overflow hidden):
  - Each tile holds a centered icon SVG at 75% of its size: `molecule-*.svg`, 32×32 viewBox with filters, white glyphs.
  - Anchor = tile center as % of the 1280×900 `protein-visual` box, positioned with `translate(-50%,-50%)` plus the scroll offset below.
  | tile | size | radius | bg | shadow | anchor (x%, y%) | scroll travel | scale |
  |---|---|---|---|---|---|---|---|
  | antibody | 80×80.5 | 20 | `#3cab57` | `rgba(17,24,39,.24) 0 1px 25px 0` | 31%, 64% | +180px→0 | 1 |
  | vaccine | 50×50 | 16 | `#9b9265` | `rgba(17,24,39,.12) 0 .83px 25px 0` | 70.0%, 30.0% | +250px→0 | 1 |
  | peptide | 120×120.5 | 32 | `#98b62c` | `rgba(17,24,39,.24) 0 1px 25px 0` | 39.0%, 31.0% | +150px→0 | 1→1.1 |
  | enzyme | 148×148 | 40 | `#0ea5e9` | `rgba(17,24,39,.24) 0 1.24px 25px 0` | 60.0%, 58.0% | +100px→0 | 1→1.1 |
- **Scroll-linked motion** (measured settled values, linear):
  - `progress = clamp((viewportCenter − sectionTop) / 900, 0, 1)`. Progress runs from 0 when the section top reaches the viewport center (top ≈ 451px in a 900px viewport) to 1 when the section bottom reaches it.
  - `translateY = −50% + travel·(1−progress)`. Scale interpolates linearly over the same range.
  - The value is smoothed with a spring: after a scroll stop it settles in ≈1s and reaches ~75% of the remaining distance in ~300ms. Use `useSpring(…, {stiffness≈100, damping≈30})` or similar.

### Phone
- Height 422, cluster `[59,4717,280,207]` (≈0.379 scale of desktop).
- Glow 200×200 at (80,4721), blur 60px, radius 200.
- Tiles: antibody 39×39.2 r10, vaccine 31.2 r8, peptide 50.7 r12, enzyme 54.6 r14. The same motion applies.

---

## 8. Modalities (`modalities`)

### Desktop
- Wrapper: bg white, padding `80px 40px 60px`, height 776, `::after` bottom 1px `rgba(3,7,18,.04)`.
- Row (max-w 1280, padding `13px 0`) gap 80.
- Left (600 wide):
  - Eyebrow `WORK ON ANY PROTEIN`.
  - H2: `Bring any protein` / `and all properties`.
  - Two lead paragraphs (each 600×60), verbatim:
    - `Accelerate your journey from hit identification to lead optimization and beyond. If you can measure it, you can optimize it with Cradle.`
    - `This makes Cradle fit-for-purpose for teams developing therapeutics, agricultural solutions, food ingredients, and more.`
  - Primary48 `Explore our platform` → ./platform.
  - Column gaps: 20 between eyebrow and H2, 30 between the heading block and the paragraphs.
- Right (600 wide, padding-top 50, column gap 24): four cards.
  - Card: 600 × 128.4 (last one 102.8), bg white, radius 16, shadow `rgba(3,7,18,.08) 0 2px 4px 0`, padding 24, row gap 16, `align-items:center`.
  - Icon container 48×48 radius 12 in the modality color, `::after` bottom 1px `rgba(0,0,0,.08)`, with a 32×32 white icon inside.
  - Text column gap 4: H5 18/600/25.2/-0.18 `#030712`, body (max-w 400) 16/25.6 `#616e80`.
  - Hover: no measurable change (an `icon-hover` layer exists at opacity 0 and never animates on the live site).
  - Cards (verbatim):
    1. Antibodies (`#3cab57`, `modality-icon-antibody.svg`) → ./modality/antibody: `Craft mature and developable binders that avoid unwanted immunogenicity.`
    2. Enzymes (`#0ea5e9`, `modality-icon-enzyme.svg`) → ./modality/enzyme: `Accelerate specific catalytic conversions, even in challenging conditions.`
    3. Vaccines (`#9b9265`, `modality-icon-vaccine.svg`) → ./modality/vaccine: `Stabilize your antigens and hit therapeutic goals faster.`
    4. Peptides (`#98b62c`, `modality-icon-peptide.svg`) → ./modality/peptide: `Get to desired efficacy while ensuring stability.`

### Phone
- Padding-top 80, inner padding `0 16px 40px`, column gap 40.
- Button is full width and reads `Explore Cradle Platform`.
- Cards are 340.1 wide (max-w 95%) with **no outer padding**: padding `16px 0`, no gap between cards, gap 24 inside the card.
- Icon box 40×40 r10 with a 24×24 icon. H5 16/600/20. Body 14/22.4.

---

## 9. Explore use cases

### Desktop
- Section: bg `#f9fafb`, padding `40px 40px 80px`, height 291.6, gap 40.
- H4 `Explore uses cases` (verbatim typo).
- Row of two cards, gap 24. Card: 628×102.8, bg white, radius 16, shadow `rgba(3,7,18,.08) 0 2px 4px 0`, padding 24.
  - Inner row gap 24: 32×32 masked icon in the accent color, then a text column (gap 4) with H5 and body.
  - 24×24 chevron at the far right (`icon-chevron-right-card.svg`).
  - Cards:
    1. `Biopharma` / `See how Cradle works for pharma` → ./solutions/biopharma. Icon antibody mask, `#3cab57`.
    2. `Industrial Bio` / `See how Cradle works for industrial` → ./solutions/industrial. Icon flask mask `icon-flask-mask.svg`, `#0ea5e9`.
  - **Hover**: shadow → `rgba(60,171,87,.4) 0 0 8px 0` (card 1) or `rgba(14,165,233,.4) 0 0 8px 0` (card 2).

### Phone
- Padding `40px 20px`, H4 18/21.6.
- Cards stack (gap 16), 350×56, radius 12, padding 16. Icon 24×24. Only the H5 is shown (no subtitle).

---

## 10. Enterprise (`enterprise`)

### Desktop
- Section: bg `#030712`, padding `160px 40px 120px`, height 1065.8, overflow hidden.
- Background `bg`: absolute `[-60,6772,1560,783.3]`, `enterprise-bg.png` (blurred lab photo) cover, `filter: blur(8px)`, mask `linear-gradient(180deg,#000 17%,transparent 82%)`, z 1.
  - Motion: opacity 0→1 over ≈1.0s when it enters view (once).
- Content (z 2, max-w 1280) column gap 40:
  - Header row (832 wide):
    - Eyebrow `BUILT FOR ENTERPRISE` in `rgba(255,255,255,.8)`.
    - H2 `Private. Secure. Yours.` (white, 64).
    - Paragraph 20/30/-0.8 white, verbatim, with two `<br>` (blank line) before "Plus": `With Cradle, your sequences and data remain private, secure, and entirely yours. Only you and those you invite can access your data, which is never used to train models for others. Protected by bank-grade security, your data stays secure at all times.` ⏎⏎ `Plus, you retain full ownership of your intellectual property—no royalties, just a software subscription fee.`
    - Secondary48 `Security at Cradle` → ./security.
  - 1px rule, `rgba(255,255,255,.16)`, full width.
  - Feature grid: 3 columns × 400, gap 40, 2 rows.
    - Item column gap 24. Icon: 32×32 box holding a 22×22 `#2d66f8` circle with an 11×9 white check (`icon-check.svg`).
    - Title H5 18/600/25.2/-0.18 white. Body 16/25.6 `rgba(255,255,255,.6)`. 16px gap between the icon+title block and the body.
    - Items (verbatim):
      1. `Privacy-first AI`: `You experimental data is only used to train your organizations custom models.` (typos verbatim)
      2. `SOC 2 compliant`: `Cradle is fully SOC 2 compliant with active monitoring and tight security protocols in place.`
      3. `Single Sign-on`: `Secure and simple account management with SSO support for Google and Microsoft.`
      4. `Custom predictors` + badge `BETA` (bg white, radius 4, padding `3px 4px`, text Inter 9/800/ls .72 `#030712`): `Use internally developed predictors right in Cradle and see outputs inside Reports.`
      5. `Zero-maintenance`: `Fully managed AI infrastructure with optimized GPU that scales with your need.`
      6. `Dedicated support`: `Our team of scientists and ML experts are ready to assist with any issues.`

### Phone
- Padding `80px 16px 64px`. bg image `[-20,6183,430,316]` with blur 4px.
- H2 32. Paragraph 16/24/-0.64. Secondary48 full width.
- Grid: 2 columns × 167, gap 24, padding-top 40. Icon 20×20 with a 10×8 check.
- Titles are Inter 14/600/18.2 (not Rethink). Bodies 14/22.4. BETA badge 7px, padding `2px 3px`.

---

## 11. The Cradle lab (`lab`)

### Desktop
- Section: bg white, padding `120px 40px 80px`, height 832.9.
- Row gap 80:
  - Left (600, column gap 30):
    - Eyebrow `THE CRADLE LAB`.
    - H2 `AI that gets better` / `every two weeks`.
    - Paragraph 1 (20/30, `#616e80`), with `<br><br>` after the question: `Cradle isn’t a CRO, so why do we run our own wet lab in Amsterdam?` ⏎⏎ `It's simple. So you get reliable and high-performing models from day one, while your proprietary data remains completely private.`
    - Paragraph 2: `Much like a self-driving car company: they wouldn’t just design algorithms and cross their fingers. They need to test real-world scenarios and collect data in order to fine-tune performance. We take the same approach, ensuring our models are performant even before seeing your data.`
    - Primary48 `Get to know our wet lab` (229.9) → ./lab.
  - Right (600, padding-top 56): image `lab-photo.jpg` 600×576.9, radius 24, cover.

### Phone
- Padding `64px 16px 40px`. Paragraphs 16/24/-0.64. On phone paragraph 1 has no blank line between its sentences.
- The button is **Secondary36** (bg white) `Get to know our wet lab`: 192.8×36, padding `0 24px`, text 13/600/15.6.
- Image 358×250, radius 16, below the text (gap 40).

---

## 12. Learnings from our wet lab (`lab-blog-posts` #2)

### Desktop
- Section: bg white, padding `80px 40px 120px`, `::after` top 1px `rgba(0,0,0,.04)`.
- H3 `Learnings from our wet lab`. Card styles and hover are identical to section 5.
- Cards (verbatim):
  1. `blog-beyond-the-bench.png` → ./blog/beyond-the-bench: `We put our CTO in a lab coat. Here’s what happened next.`
  2. `blog-sample-tracking.jpg` → ./blog/sample-tracking: `Backbone of high-throughput experimentation: Design principles for ML-ready sample tracking`
  3. `blog-webinar-lab-automation.jpg` → ./blog/webinar-lab-automation: `Lab automation for faster ML-driven protein engineering`
  4. `blog-protein-tags.png` → ./blog/how-protein-tags-revolutionize-lab-automation: `Next-level high throughput workflows: Gotta tag 'em all`

### Phone
- All 4 cards, as a 2×2 grid (167 columns, gap 24). Padding `40px 16px 64px`.

---

## 13. Footer CTA + footer

### Footer CTA (`footer-cta`), desktop
- Section: height 800, padding `120px 40px 0`, gap 80, overflow hidden. bg `radial-gradient(89% 50% at 50% 76.9%, #5e95fc 52%, #224eee 100%)`.
- H1 centered (Rethink Sans 72/72/-2.88, 500): line 1 `You made it. Nice.` white, `<br>`, line 2 `Now, let's talk?` `#92bafe`.
- Button wrapper 178.2×56: bg `rgba(255,255,255,.12)`, radius 16, padding 4. It contains Secondary48 `I'm interested` (padding `0 32px`, 170.2×48) → ./get-started. Gap 40 below the H1.
- `Screens` (max-w 880, z 1) row of three columns (220 / 440 / 220), images overflowing their columns:
  - left: padding-top 40, `report` 719.4×446.3 at x=30, opacity 0.9, radius `12 12 0 0`, `ui-report-cta.png`, object-position `50% 0`.
  - middle (z 3): `round` 721.6×447.7 at x=359, shadow `rgba(0,0,0,.25) 0 1px 16px 0`, radius `12 12 0 0`, `ui-round.png`.
  - right: padding-top 80, `data` 719.4×446.3 at x=690, opacity 0.85, `ui-data.png`.
  - Gradient overlay (z 4) across the 360px screens band: `linear-gradient(180deg, rgba(34,77,238,0) 51%, rgba(34,77,238,.32) 100%)`, 3520 wide, centered.
  - The section clips the screens at its bottom (y=10062).
- Phone:
  - Height 456, padding `80px 40px`. bg `radial-gradient(89% 27% at 50% 86.4%, #5e95fc 52%, #224eee 100%)`.
  - H1 40/40/-1.6.
  - Screens scale to about 253×157 each: report at x=−48, round at x=68 (radius `6 6 8 8`), data at x=184.5 with shadow.

### Footer (`Desktop` / `Phone`)
- bg `#224eee`.
- **Desktop** link area `Nav`: padding `40px 40px 80px`, `::after` top 1px `rgba(255,255,255,.04)`, height 440.
  - Row (max-w 1280, gap 40):
    - Logo tile 64×64: radius 17.45, same gradient and shadow as the nav tile, glyph `cradle-symbol-footer.svg` (40 viewBox) at 64px, links to ./. It sits in a 224-wide column.
    - Four 224-wide columns. Column headers are Spot Mono 16 uppercase `rgba(255,255,255,.6)` in 40px rows (`mix-blend-mode:overlay`). Links are Inter 16/500/25.6 white in 40px rows. Link hover: color → `rgba(255,255,255,.8)` (CSS, instant).
      1. **Company**: Careers (./careers), Our team (./team)
      2. **Industries**: Biopharma, Industrial Bio. Then **Modalities**: Antibody, Enzyme, Peptide, Vaccine.
      3. **Resources**: Blog (./blog), Press kit (./presskit), Trust center (https://trust.cradle.bio), Security & privacy (./security), Documentation (https://docs.cradle.bio)
      4. **Connect**: Talk to a Cradle expert (./get-started), For academia (./solutions/academia). Then **Follow Cradle**: LinkedIn (https://www.linkedin.com/company/cradlebio/)
  - Legal bar: padding 20, `::after` top 1px `rgba(255,255,255,.04)`, row `space-between`, height 59.2.
    - Left (gap 20): `© 2026 · Cradle is a registered trademark`, `Legal Terms` (./legal-terms), `Privacy Policy` (./privacy-policy), `Cookies` (button that opens the cookie settings).
    - Right: `Built with ❤️ in Amsterdam & Zurich`.
    - All legal text Inter 12/500/19.2/0.24 `rgba(255,255,255,.6)`.
- **Phone**:
  - No logo. Nav padding `40px 16px 80px`. Columns stack (gap 20). Headers 13/13/0.26. Links 14/22.4 in 36px rows.
  - Resources lists **`Docs`** instead of "Documentation".
  - Legal row (padding `20px 16px`): `© 2026 · Cradle`, `Legal Terms`, `Privacy Policy`, `Cookies`, all at 10/16/0.2. The "Built with…" line is not shown.

### Cookie banner (third-party consent, not part of the design)
Fixed bottom-right, 360 wide, white, radius 14, shadow `rgba(0,0,0,.08) 0 0 8px 0, inset 0 0 0 1px rgba(0,0,0,.05)`, padding 16. Text: `Cookie settings` / `Cradle uses cookies to create a better experience, personalize content, and track website usage. For more details see our Cookie Policy.` Buttons: Reject / Customize (bg `#eee`) and Accept (bg `#224eee`), each 33px tall, radius 8. Include it only if requested.

---

## 14. Motion summary

| pattern | where | spec |
|---|---|---|
| Load appear (tween, back-ease) | hero title/body, platform UI | see section 2 table; ease `cubic-bezier(0.7,-0.35,0.3,1.1)` |
| Load appear (spring) | blobs, news pill | spring, bounce 0.3 / 0.05 |
| Word-stagger reveal | all desktop eyebrows | per word: opacity .001→1, y 8→0, 0.8s, stagger 0.1s, once on enter |
| Block fade-up | testimonial + logo grid | opacity 0→1, y 20→0, 0.4s ease-out, +0.15s second block |
| Letter reveal | "T7 RNA" | y 4→0, opacity, 0.4s, stagger ≈75ms |
| Replay-on-view | bars, Structure scale, Card B panels, radar chips | animate in on enter, reset on leave (see 6) |
| Scroll parallax (direct) | hero blobs | right −0.15·scrollY, left −0.30·scrollY |
| Scroll-linked + spring | protein molecule tiles | see 7 |
| Fade-in on view | enterprise bg | opacity 0→1, ≈1s |
| Auto carousel | testimonials | 5.45s per slide, linear progress bar `#bed5ff` |
| Click tabs | platform UI | ≈300ms layout + ≈250ms crossfade + description fade-up (y10) |
| Dropdown | nav | opacity 0→1 / y 8→0 spring (≈180ms visible, 400ms settle) |
| Variant hovers | buttons, news pill, cards | ≈80–100ms color/shadow change |
| Text-link hovers | nav links, footer links, dropdown items | color change, CSS, instant |
| Video | benefits card C | autoplay muted loop when in view |

There are **no marquees, tickers, canvases or Lottie animations** on the homepage. There are no CSS `@keyframes` or CSS transitions.

---

## 15. @font-face (files in `public/fonts/`)

Use `font-display: swap` for all.

```css
/* Rethink Sans (Google Fonts static instances; no unicode-range) */
@font-face { font-family: "Rethink Sans"; src: url("/fonts/RethinkSans-500-all.woff2") format("woff2"); font-weight: 500; font-style: normal; font-display: swap; }
@font-face { font-family: "Rethink Sans"; src: url("/fonts/RethinkSans-600-all.woff2") format("woff2"); font-weight: 600; font-style: normal; font-display: swap; }
@font-face { font-family: "Rethink Sans"; src: url("/fonts/RethinkSans-700-all.woff2") format("woff2"); font-weight: 700; font-style: normal; font-display: swap; } /* declared, unused */

/* Inter (Framer-hosted). latin + latin-ext per weight */
@font-face { font-family: "Inter"; src: url("/fonts/Inter-400-latin.woff2") format("woff2"); font-weight: 400; font-style: normal; font-display: swap; unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2070, U+2074-207E, U+2080-208E, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: "Inter"; src: url("/fonts/Inter-400-latin-ext.woff2") format("woff2"); font-weight: 400; font-style: normal; font-display: swap; unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF; }
/* Repeat both blocks for weights 500, 600 and 800 with Inter-{500,600,800}-latin.woff2 / -latin-ext.woff2 and the same unicode-ranges. */

/* Framer custom fonts (no unicode-range) */
@font-face { font-family: "Spot Mono Medium"; src: url("/fonts/SpotMonoMedium-500-all.woff2") format("woff2"); font-weight: 500; font-style: normal; font-display: swap; }
@font-face { font-family: "Crimson Pro Regular"; src: url("/fonts/CrimsonProRegular-400-all.woff2") format("woff2"); font-weight: 400; font-style: normal; font-display: swap; }

/* Declared on the page but not rendered on the homepage (downloaded for completeness) */
@font-face { font-family: "Crimson Pro Bold"; src: url("/fonts/CrimsonProBold-700-all.woff2") format("woff2"); font-weight: 700; font-display: swap; }
@font-face { font-family: "JetBrains Mono"; src: url("/fonts/JetBrainsMono-500-all.woff2") format("woff2"); font-weight: 500; font-display: swap; }
@font-face { font-family: "Hedvig Letters Serif"; src: url("/fonts/HedvigLettersSerif-400-latin.woff2") format("woff2"); font-weight: 400; font-display: swap; unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: "Hedvig Letters Serif"; src: url("/fonts/HedvigLettersSerif-400-latin-ext.woff2") format("woff2"); font-weight: 400; font-display: swap; unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF; }
@font-face { font-family: "Rethink Sans"; src: url("/fonts/RethinkSans-800-latin.woff2") format("woff2"); font-weight: 800; font-display: swap; unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: "Rethink Sans"; src: url("/fonts/RethinkSans-800-latin-ext.woff2") format("woff2"); font-weight: 800; font-display: swap; unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF; }
```
Not downloaded: the Inter italic sets and the Inter cyrillic/greek/vietnamese subsets. They are declared on the page, but the homepage copy needs none of them.

## 16. Head / meta
- `<title>Cradle | Engineer better proteins, faster.</title>`, `lang="en"`, `<meta name="viewport" content="width=device-width">`.
- Description / og:description: `Protein engineering AI, built for scientists. Leverage AI to generate protein candidates and improve their properties. More breakthroughs in fewer experiments — guided by your own experimental data.`
- og:image / twitter:image: `/assets/og-image.png`. twitter:card `summary_large_image`.
- Icons:
  - `<link rel="icon" href="/assets/favicon-light.png" media="(prefers-color-scheme: light)">`
  - `<link rel="icon" href="/assets/favicon-dark.png" media="(prefers-color-scheme: dark)">`
  - `<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">`

## 17. Not captured / caveats
- **Tablet (810–1199)**: not measured.
- **Mobile menu open/close animation timing**: not sampled; only the open end state is documented. The live open menu also shows duplicated "on-light" link groups (section 1).
- **Eyebrow / fade-up easing curves**: derived from sampled frames (duration, stagger, mid-point progress). The exact Framer curve or spring parameters aren't exposed for in-view animations, so the curves given are fitted approximations. The appear-on-load values (section 2) are exact, from Framer's config.
- **Molecule smoothing spring**: the scroll mapping is exact. The smoothing constants are fitted.
- **Mobile protein-tile anchor %**: the phone tiles were captured mid-scroll, so only their sizes are given; use the same anchor %/travel ratios scaled by 0.379.
- **Case-study / blog cover images and the UI screenshots are raster files.** Their inner text is baked into the images and can't be extracted.
- `cdn.sanity.io/…mp4` and Source Sans 3 seen in network logs belong to the Framer editor iframe and other prefetches, not this page.
