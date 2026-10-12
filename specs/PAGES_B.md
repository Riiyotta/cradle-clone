Source: https://www.cradle.bio/

# Cradle: CMS templates and misc pages (PAGES_B)

Measured 2026-10-12 on the live site with headless Chromium (Playwright) at 1440×900 and 390×844. Every value comes from `getComputedStyle` or `getBoundingClientRect`. Rects are document-space `[x, y, w, h]` at the stated viewport. Motion was sampled frame by frame, or taken from Framer's `__framer__appearAnimationsContent` config where that exists (marked **exact**).

This file extends `CLONE_SPEC.md` (homepage). It reuses that file's §0 names: color tokens, fonts, the type scale, **Primary36 / Secondary36 / Primary48 / Secondary48**, **Eyebrow**, and the Framer `::after` border convention. A value written as `#616e80` here is the same token as in §0.

- Screenshots: `reference/pages/<slug>-1440.png` (full page): `blog`, `blog-series-b`, `blog-therapeutic-peptides`, `blog-optimizing-entire-batch`, `blog-keasling-qs21`, `blog-maturity`, `video`, `video-guided-rounds`, `video-sankey`, `whitepaper`, `presskit`, `notebook`, `links`, `shirt`, `licensing`, `dpa`.
- Asset manifest: `specs/PAGES_B_ASSETS.md`. CMS data: `src/data/cms.json`.
- **Link rule.** Same-site links are given as local paths (`/blog/x`). Any other domain is marked **EXTERNAL**, and the clone removes it. Framer emits relative hrefs (`./x`, `../x`); resolve them to absolute local paths.

---

## B0. Shared across these pages

### B0.1 Navbar variants (structure, metrics and dropdowns: CLONE_SPEC §1)
| variant | used on | bar bg | link text | wordmark filter |
|---|---|---|---|---|
| `Desktop-dark` / `mobile-dark-closed` (homepage variant) | /blog/maturity, /video, /video/*, /whitepaper | `#030712` | white | `grayscale(1) invert(1)` (white) |
| **`desktop light` / `mobile-light-closed` (new)** | /blog, all CMS posts, /presskit, /licensing, /dpa | `#ffffff` | `#616e80`, hover `#030712` (instant) | `grayscale(1) invert(0)` (dark) |
| none | /links, /notebook, /shirt | no navbar and no footer (link-in-bio pages) | | |

- **Light variant.** Same geometry as the dark one: h64, padding `0 24px`, `::after` bottom 0.5px `rgba(243,244,246,0)`. Sign in is Secondary36 and Discuss your project is Primary36, both unchanged.
- **Mobile light hamburger.** The 36×36 box has bg `rgba(255,255,255,.08)`, radius 6, `mix-blend-mode:luminosity` and `::after` 1px `rgba(0,0,0,.08)`. Its two 14×2 bars are `#030712`.
- **Quirk.** On /video/* at 390 the navbar is the **light** variant over a dark page, while /video at 1440 uses the dark one. Replicate as measured.

### B0.2 Footer: dark variant (new)
Every page in this file with a footer uses the **dark footer**: bg `#030712` instead of the homepage `#224eee`. Everything else matches CLONE_SPEC §13 "Footer": columns, links, legal bar, mobile stacking, "Docs" on mobile. Heights are 499.2 (desktop) and 1086 (phone). **None of these pages has the homepage Footer CTA** (`footer-cta` "You made it. Nice."). /whitepaper has its own CTA section (B6.4).
→ Implement as `<Footer variant="dark" />`.

### B0.3 Shared components (exist on homepage)
Navbar (+light variant), Footer (+dark variant), Primary36, Secondary36, Primary48, Secondary48, the Cradle logo tile (CLONE_SPEC §1 gradient tile), and the `cradle-symbol.svg` / `cradle-symbol-footer.svg` glyphs. The **blog thumbnail card** is homepage §5's case-study card with different sizes (B1.4). The homepage Eyebrow is **not used** on any of these pages.

### B0.4 New shared components
| name | where | spec |
|---|---|---|
| **Ghost36** | post footer "Print this article" | h36, padding `0 16px`, radius 8, bg transparent, text Inter 14/600/16.8/-0.14 `#030712`. Hover bg `rgba(0,0,0,.02)` (≈100ms). |
| **Secondary36 (padding 16)** | "See all…", "Read guide", "Apply now", "Contact Cradle" | Secondary36 with padding `0 16px` (homepage uses 12). Measured hover: no change. |
| **SecondaryOnDark40** | whitepaper callout "Read whitepaper" | h40, padding `0 20px`, radius 8, bg `rgba(255,255,255,.08)`, `inset 0 0 0 1px rgba(0,0,0,.08)`, text Inter 14/600 white. No hover change. |
| **ButtonDefault** (`Default`) | "Subscribe" buttons | radius 12, padding `0 24px`, bg `#224eee`, text Inter 16/600/20.8 white. Height 40 in "Recent posts", 48×240 in /blog newsletter. Hover bg → `rgb(0,87,186)`, ≈250ms ease-out. Mobile text 14/18.2. No visible action on click in headless (likely a MailerLite popup, EXTERNAL). |
| **PostRow** | /blog "All posts", post "Recent posts", maturity "Recent posts" | see B1.6 and B2.4 |
| **RecentPosts** section | bottom of every CMS post and /blog/maturity | B2.4 |
| **PaperStack icon** | whitepaper callout, /whitepaper intro | B2.6 |
| **LinkInBio** column | /links, /notebook, /shirt | B8 |
| **DarkFooter**, **LightNav** | | B0.1, B0.2 |

### B0.5 Motion tokens used on these pages
| token | spec | source |
|---|---|---|
| `postEnter` | whole post column: opacity .001→1, y 80→0, `transformPerspective:1200`, tween 0.3s, ease `[0.15,0.45,0.15,1.15]`, delay 0, on load | exact (appear id `23mtdr`) |
| `thumbPop` | opacity .001→1, scale 0.9→1, spring `{bounce:0.1, duration:0.4}`, delay 0.2, on load | exact (`1bzfblo-0`) |
| `fadeUp40` | opacity .001→1, y 40→0, spring `{bounce:0.1, duration:0.4}`, delay 0.3, on load | exact (links `8kcac5`, notebook `179b9c1`, shirt `1v4icxa`) |
| `cardHoverScale` | image wrapper scale 1→1.02, ≈250ms ease-out (50ms: 1.0058, 120ms: 1.0175) | sampled |
| `rowHoverText` | title color → `#030712` (≈150ms) plus `text-decoration: underline` (instant) | sampled |
| `wordReveal` | per word: opacity 0→1, y 10→0, ≈0.35s ease-out, stagger ≈0.1s, once on enter | sampled (maturity quotes) |
| `letterFade` | per-letter spans; all letters fade 0→1 together ≈0.8→1.6s after load (no visible stagger) | sampled (whitepaper intro text, callout text) |
| `ladderLoop` | 3-bar "ladder" group: translate (0,0)→(-40,30) over ≈0.65s ease-in-out, hold ≈0.55s, snap back, repeat (period ≈1.23s). Mobile (60px tile): (-30,23). Runs continuously; hover-independent. | sampled |
| `cursorBlink` | 3px caret: opacity 1 for ≈600ms, 0 for ≈600ms, repeat (step) | sampled |

There are no CSS `@keyframes` and no CSS transitions on any of these pages. All motion is framer-motion.

---

## B1. `/blog` (index)
Light nav. Document height 7165 (desktop) / 7789 (mobile). Title `Blog - Cradle`. Meta description `News, updates, tutorials, and more from the makers of Cradle`. og:image is a Framer image (not downloaded; reuse `/assets/og-image.png` or leave unset).

**No filters, no pagination.** "All posts" renders all 53 CMS posts in date-desc order (= `cms.json` `blog` order).

### B1.1 Page frame
`content`: max-w 1280 centered, padding `144px 40px 80px`, column, gap 40. Content spans x 120…1320 (1200). Mobile: padding `0 0 58px`, gap 40.

### B1.2 Hero heading
- Two stacked lines, left-aligned. Desktop each line is Rethink Sans 64/64/-2.56/500; mobile 32/35.2/-0.64.
  - Line 1 row (gap 6, align center): `Unfold`, color `#1f2937`, then a **caret** 3×64 (mobile 3×35.2) bg `#0ea5e9` running `cursorBlink`.
  - Line 2: `A blog by Cradle`, color `#d1d5db`.
- Mobile wrapper padding `100px 20px 0`.

### B1.3 Two-column body (desktop)
- `sections` row: gap 64, align flex-start.
  - Left column: 777.1 wide, column, gap 80.
  - Right column: the sticky subscribe card (B1.8).
- Mobile: single column, gap 40, sections have no side padding (each has its own 20px padding), and the subscribe card is hidden.

### B1.4 Featured post card (latest post, `aintibody`)
- `a` 777.1×400, radius 16, overflow clip, padding 40, column `space-between`. Mobile: 350×400 inside 20px side padding, padding 24.
- **Background layer** (z0): the post cover image `object-fit:cover`, filter `blur(12px)`, oversized and centered. Desktop rect `[-6,191.4,1029.1,608.6]` vs card `[120,312,777,400]`, i.e. ≈132%×152%. Mobile 735×434.6.
- **Overlay** (z3): bottom 274px, `linear-gradient(180deg, rgba(3,7,18,0) 0%, rgba(3,7,18,.7) 100%)`.
- **Thumbnail** (z4): 128×75.6, radius 8, the cover image, `::after` 2px white border. Animates `thumbPop` on load.
- **Text block** (z4, column gap 16):
  - h4 title: Rethink Sans 24/28.8/normal/500 white, max-w 488. Mobile 18/21.6.
  - Intro excerpt (CMS `Intro`, placeholder): Inter 16/25.6/500 white in a wrapper at opacity 0.7, max-w 557.7, 2 lines. Mobile 14/22.4.
  - Pill `Read now`: white bg, radius 8, padding `0 16px`, h36, `inset 0 0 0 1px rgba(0,0,0,.08)`, text Inter 14/600 `#030712` (mobile 13).
- Hover: none measured.
- → `/blog/aintibody`

### B1.5 Group rails: "Case studies", "News & Updates", "Meet the team"
- Each group is a column, gap 24, padding-bottom 24. Mobile gap 20.
- Title row (space-between): h3 Rethink Sans 32/38.4/-0.64/500 `#1f2937` (mobile 24/28.8/-0.48). Only "Case studies" has a right-side Secondary36 (padding 16) `See all case studies` → `/case` (mobile text 13px).
- Desktop: grid of 3 columns × 245.7 with gap 20.
- Mobile: horizontal scroll row (`overflow:auto`), padding `0 20px 8px`, gap 16, cards 320 wide.
- **Thumbnail card** (`a`, column, gap 16):
  - Image: 245.7×128 (mobile 320×166.7), radius 8, cover, `::after` 1px `rgba(27,27,177,.04)`.
  - Title h5: Rethink Sans 18/25.2/-0.18/600. Mobile 16/20/-0.16. Color `#1f2937` in Case studies, `#030712` in the other two groups.
  - Hover: image wrapper `cardHoverScale`. No title change.
- Content (from the CMS):
  - Case studies: first 3 posts with category `Case studies` (keasling-qs21, therapeutic-peptides, staphylococcus-aureus-vaccine). Mobile shows 4 (+ igg-campaign).
  - News & Updates: `aintibody`, `hansa`, `guided-rounds`. This is **not** a pure category filter: guided-rounds is `Product` and the News post lundbeck is skipped. Hard-code these 3 slugs.
  - Meet the team: first 3 `Stories` posts (company-culture, from-lab-rat-…, cultural-values).

### B1.6 "Maturity guide" promo card (between Case studies and News)
- Outer 777.1×298.4, radius 16, overflow clip.
- Inner: radius 8, padding 40, row, gap 40, bg `radial-gradient(28% 50% at 89% 26.9%, #e0f2fe 0%, #f9fafb 100%)`. Mobile: column, padding 20, gap 40, bg `radial-gradient(66% 50% at 15.9% 14.3%, #e0f2fe 0%, #f9fafb 100%)`, outer padding 20.
- Text column (577.1, gap 24):
  - h4 `Introducing an ‘ML maturity ladder’ for biologics discovery and development`: Rethink Sans 24/28.8/500 `#1f2937` (mobile 18/21.6).
  - p: Inter 16/25.6/-0.32/500 `#616e80` in an opacity .7 wrapper (mobile 14/22.4). Copy: `Many organizations confine machine learning in molecular discovery and design to isolated proof-of-concept projects. We propose a 5-level maturity ladder to illustrate how teams advance towards autonomous systems that learn from every experiment and guide discovery across entire pipelines.`
  - Secondary36 (padding 16) `Read guide` → `/blog/maturity`.
- **Ladder tile**: 80×80 (mobile 60×60), radius 12 (mobile 9), bg `#7dd3fc`, overflow clip, at the card's top-right (desktop) / top-left (mobile).
  - Inside, a bottom-aligned row of 3 bars, gap 0. Bars are 40 wide (mobile 30) with heights 30/60/90 (mobile 23/45/68), bg `#2d66f8`, radius `6px 0 0 0` (mobile 5px).
  - The bar row is 120×90 and starts at x = tile.x − 40 (it overflows left). It runs `ladderLoop`.

### B1.7 "All posts"
- Column, gap 20: h3 `All posts` (as B1.5), then the list (gap 0).
- **PostRow (index)**: `a` 1200×72, padding `16px 0`, row, gap 20, align center, bottom border 0.5px `#f3f4f6`.
  - Thumb 64×40, radius 6, cover, `::after` 1px `rgba(27,27,177,.04)`.
  - Then a row (gap 16): title Inter 14/22.4/normal/500 `#1f2937` (flex 1), then date `<time>` Inter 14/22.4/500 `#9ca3af`, format `Oct 12, 2026`, right-aligned.
  - Hover: `rowHoverText`.
- Mobile: rows 350 wide, padding `16px 0`, gap `20px 12px` (wrap), thumb 64×40, title 14/22.4 up to 3 lines. **The date is hidden on mobile.**

### B1.8 Sticky subscribe card (desktop only)
- 358.9 wide, `position:sticky; top:80px`, bg white, radius 16, shadow `rgba(0,0,0,.08) 0 1px 8px 0`, padding 24, column, gap 20.
- p `Subscribe to new posts and updates from the Cradle team`: Inter 16/20.8/600 `#1f2937`, centered.
- MailerLite embed iframe 310.9×221 (fields First name / Email, consent checkbox, Subscribe). **EXTERNAL embed.** Replace with a static placeholder form of the same size.

### B1.9 Newsletter band (above the footer)
- bg `#f9fafb`, padding 80 (mobile `54px 20px`), `::after` top 1px `rgba(0,0,0,.08)`, column centered, gap 20.
- Inner column 400 wide, gap 31. Its text group (gap 10):
  - h3 `Subscribe to updates`: Rethink Sans 32/38.4/-0.64/500 `#030712` (mobile 24/28.8).
  - p `Get new posts and other Cradle updates directly to your inbox. No spam :)`: Inter 20/30/-0.8/500 `#616e80`, centered, max-w 480 (mobile 16/24/-0.64, max-w 90%).
- ButtonDefault 240×48 `Subscribe`.

Then the dark footer.

### B1.10 Motion on /blog
- Caret `cursorBlink`.
- Featured thumbnail `thumbPop`.
- Ladder `ladderLoop`.
- Card hovers (`cardHoverScale`) and row hovers (`rowHoverText`).
- Nothing animates on scroll.

---

## B2. Blog post template `/blog/[slug]` (53 CMS posts)
Light nav, dark footer. Measured on `series-b` (base layout, 38 of 53 posts share the exact DOM), `therapeutic-peptides` (case-study variant with the whitepaper callout, 4 posts + 2 with an extra card), `optimizing-entire-batch` (blog-info callout, 2 posts), and `keasling-qs21` (embedded video module, 7 posts use it). All variants share one template. The differences are only modules inside the rich text.

### B2.1 Layout
- `Post` wrapper: max-w 1280, padding `144px 0 40px` (mobile `90px 20px 60px`), column, gap 40. Runs `postEnter` on load.
- `content`: padding `0 40px` (mobile `20px 0 0`).
- Header column: max-w **640**, centered (x 400…1040 at 1440). Mobile 350.
  - Header block: padding-bottom 80 (mobile 0), column, gap 25.

### B2.2 Header (top to bottom, gap 25)
1. **h1 title**: Rethink Sans 44/44/-0.88/**600** `#030712`, max-w 640. Mobile 28/28/-0.56.
2. **Intro** (CMS `Intro`; placeholder text OK): Inter 20/30/-0.8/500 `#616e80`. Mobile 16/24/-0.64.
3. **Meta row** (row, wrap, gap 8, align center):
   - **Date chip**: h32 (mobile 30), radius 8, padding `6px 8px 6px 6px`, gap 4, `::after` 1px `rgba(0,0,0,.08)`.
     - Icon 20×20 (mobile 18): `/assets/pages/blog-post/date-18x18-8dbda2.svg`.
     - `<time>` Inter 13/13/-0.13/500 `#616e80` (mobile 11/11/-0.11), format `November 26, 2024` (long month).
   - **Divider**: 1×16 `rgba(0,0,0,.08)`.
   - **Author chip(s)**: one per author, same chip box, bg `rgba(243,244,246,0)`.
     - Avatar 20×20 (mobile 18), radius 100px: `/assets/cms/authors/*`.
     - Name: first name only (CMS team `Name`), Inter 13/13/-0.13/500 `#616e80`.
     - Hover: chip bg → `#f9fafb` (≈100ms).
     - Not a link.
4. **Cover image**: 640×333.3 (mobile 350×182.3), radius 16, cover, `::after` 1px `rgba(27,27,27,.04)`.

There is **no category tag, no read time, and no share buttons** on the post template.

### B2.3 Article body (rich text, `Content`; text is placeholder)
Column max-w 640 (mobile 350). The block sits in a wrapper with padding-bottom 80. Each top-level element carries its own `margin-top`; the first child's margin is included.

| element | desktop (1440) | mobile (390) |
|---|---|---|
| `p` | Inter 16/28/-0.16/500 `#1f2937`, mt 16 | 14/24.5/-0.14, mt 16 |
| `h2` | Rethink Sans 36/43.2/-0.72/600 `#030712`, mt 40, left | 24/33.6/-0.48, mt 40 |
| `h3` | Rethink Sans 28/33.6/-0.56/600 `#030712`, mt 48 | 22/30.8/-0.44, mt 20 |
| `strong` / `em` | weight 700 / italic, inherits size | same |
| `a` | color `#0284c7`, no underline. Hover: `#0ea5e9` + underline (instant). Same-site → local path; other domains EXTERNAL (render as plain text in the clone). | same |
| `ul` | mt 32. `li`: padding-left 20.66, `list-style: disc`, marker `#1f2937` 16px; li text = `p` style, li margin 0 | li 14/24.5 |
| `ol` | as `ul` with decimal markers (seen on /blog/maturity) | |
| `blockquote` | mt 24, padding `4px 0 4px 20px`. `::before`: 4px wide, full height, bg `#38bdf8`, radius 1, absolute at left 0. Inner `p`: **Rethink Sans 28/33.6/-0.56/500** `#1f2937`, margin 0. An attribution line inside uses `strong` Inter 14 / 700 `#1f2937` after two `<br>`. | mt 24. The attribution `strong` measured 14px with lh 27px / ls -0.36px, so the quote `p` is inferred as ≈18/27/-0.36 (not directly measured). |
| `img` (`framer-image`) | mt 32, width 100% (640), natural aspect, radius 8 | mt 24, width 350 |
| `figure > table` | figure mt 32, `overflow:auto`. Table: 1px `rgba(0,0,0,.08)` border, radius 8, overflow hidden. `td`: bg white, padding `4px 12px`, cell text = `p` style (header cells use `strong`). Rows 36–37 tall, 1px `rgba(0,0,0,.08)` top border on rows after the first, 1px left border on cells after the first column. | mt 24, rows ≈32.5 tall |
| module embeds (`div.framer-text-module`) | mt 32 (callouts and video below) | mt 24 |
| `code` / `pre` | **not present in any measured post** (checked 4 posts + maturity). Not captured. | |

Body outlines for the measured posts (placeholder targets):
- series-b: `p×4, ul(3 li), p, blockquote(p×?), p×4`. 9 paragraphs, avg ≈330 chars.
- therapeutic-peptides: `table, h2 Context, p×2, h2 Challenge, p×2, h2 Approach, p×2, h2 Results, p, table, p×3, callout-whitepaper, h2 What this means, p×3, h2 Methods note, p`. 14 p, avg ≈380 chars.
- optimizing-entire-batch: `p, blog-info callout, p×5, h2, p×6, h2, p×3, img, p, img, p×5, img, p, h2, p×13, h3 Conclusion, p×3`. 38 p, avg ≈375 chars.
- keasling-qs21: `p×2, video module, p, img, p, h2, p×2, img, p×4, h2, p×2, blockquote, p, h2, p×4, h2, p×5`. 22 p, avg ≈335 chars.

### B2.4 RecentPosts section (after the body, full-bleed)
- bg `#f9fafb`, padding `80px 0` (mobile `40px 16px`), column centered, gap 40.
- Inner column max-w 640 (mobile 358), gap 40.
- Head (column, gap 20):
  - h3 `Recent posts`: Rethink Sans 32/38.4/-0.64/500 `#030712` (mobile 24/28.8).
  - p `Subscribe and get new posts and updates from Cradle straight to your inbox.`: Inter 16/25.6/-0.32/500 `#616e80`, max-w 400 (mobile 14/22.4/-0.28).
  - ButtonDefault h40 `Subscribe` (126.4 wide; mobile full width 358, text 14/18.2).
- **List**: 5 latest posts on desktop, **3 on mobile**.
  - **PostRow (recent)**: `a` 640 wide, padding `16px 0`, row, gap 20, align center, `::after` bottom 1px `#f3f4f6`.
  - Thumb 64×40 radius 6.
  - Text column (gap 4):
    - title Inter 16/25.6/normal/500 `#1f2937`.
    - date Inter 11/14.3/-0.44/**700** `#9ca3af` **uppercase** (`OCT 12, 2026`). Mobile 9/11.7/1.08.
  - Hover: title underline (instant).
  - Mobile row gap `20px` (wrap).
- Buttons row (gap 10):
  - Secondary36 (padding 16) `See all posts` → `/blog`.
  - Ghost36 `Print this article` → `./<slug>/print`. This print route is not in the sitemap and was not measured; point it at the post itself or drop it.
  - Mobile: both 174×49, side by side.

### B2.5 Embedded video module (in 7 posts, e.g. keasling-qs21)
- `Variant 1` block: padding `40px 0`, column, gap 16.
- iframe 640×360: `https://space-o6awa.video-dns.com/<id>/player.html` (**mave.io, EXTERNAL**). Clone: a 16:9 box with a poster image and a play affordance, no playback.

### B2.6 `callout-whitepaper` module (6 case-study posts)
- Wrapper max-w 650, padding `20px 0`.
- Card 640×343.2: bg `#030712`, radius 16, `::after` 1px `rgba(0,0,0,.08)`, overflow clip.
- Content (z2, column centered, padding 20, gap 20):
  - **PaperStack icon** (96×98 box, padding 8):
    - Back sheet `2`: 53×68, white, radius 2, shadow `rgba(0,0,0,.08) 0 .66px 8px`, padding 6.6, column gap 4.4. Ten 2px text lines (widths 15.9/39.8/39.8/39.8/39.8/35.8/39.8(white)/15.9/39.8/35.8), radius 7.92, `#e5e7eb`.
    - Front sheet `front`: 64×81, white, radius 2, same shadow, `rotate(-3deg)`, holding a centered 43.1px Cradle symbol.
  - Text column (450 wide, max 75%, gap 15):
    - Title `Meet CRADLE-1`: Rethink Sans 32/38.4/-0.64/500 white, centered.
    - Body `An automated machine-learning framework for protein lead optimization — validated across antibodies, enzymes, peptides, vaccines, and gene-editing systems.`: Inter 16/25.6/-0.32/500 `rgba(255,255,255,.8)`, centered.
    - SecondaryOnDark40 `Read whitepaper` → `/whitepaper`.
  - Title and body are split into per-letter spans and animate with `letterFade`, plus y 10→0, when in view.
- **Glow** (z1): a 405×198 row, `translateY(-99px)`, filter `blur(14px)`, holding two blob SVGs:
  - 437.5×412 rotated 40° (`matrix(.766,-.643,.643,.766)`): `/assets/pages/blog-post-case/callout-whitepaper-438x412-9a4ed2.svg`
  - 282×251: `.../callout-whitepaper-282x251-9d00fc.svg`

### B2.7 `blog-info callout` module (optimizing-entire-batch, antibody-first-round)
- Card: bg `#f9fafb`, radius 20, padding 24, row, gap 18, shadow `rgba(3,7,18,.08) 0 18px 50px 0`, `::after` 1px `#e5e7eb`.
- **Accent rail** 4×(full height): radius 100, `linear-gradient(180deg, #0ea5e9 0%, #61c779 100%)`.
- Content column (gap 14):
  - Label row (gap 10): 8×8 dot `#0ea5e9` radius 100, then `Editor's note` in Spot Mono Medium 14/24/0.84/500 `#0369a1`.
  - h3 (example `If you're not familiar with Cradle...`): Rethink Sans 22/25.96/-0.44/600 `#030712`.
  - Body: Inter 16/28/-0.16/500 `#1f2937`. In-body links are `#1f2937`; the last link ("Unfold") is `#2d66f8`.

### B2.8 Post responsive summary (390)
- `Post` padding `90px 20px 60px`.
- h1 28/28. Intro 16/24. Chips h30 / 11px. Cover 350×182.3 r16.
- Body per the table above.
- RecentPosts per B2.4.
- Then the dark footer (phone).

---

## B3. `/blog/maturity` (bespoke long-form guide, not a CMS item)
Dark nav, dark footer. Very long: 37 943 (desktop) / 39 284 (mobile). Body copy is placeholder. Short headings below are verbatim.

### B3.1 On-page TOC (fixed)
- `on page nav`: fixed full-viewport layer, z 8, `pointer-events` on children only.
- Menu button 48×48: bg `#1f2937` (hover `#374151`), radius 12, shadow `rgba(0,0,0,.08) 0 1px 16px`, white 24px list icon. Desktop at bottom-left (x 20, bottom 20); mobile at bottom-right (x 326, y 776).
- Click opens a white panel above the button. Panel ≈248 wide, items stacked from y≈471 at 1440.
  - Each item is an `a` 240×58: padding 12, radius 8, bg white, column gap 4.
  - Item text: kicker Inter 10/13/0.8/600 `#9ca3af` uppercase, then title Inter 14/16.8/-0.14/600 `#030712`.
  - Items: INTRO/The ML Maturity Ladder (`#intro`), FRAMEWORK/The 3 Strands of ML maturity, STRAND 1/Scope of ML Application, STRAND 2/Experimental Data Practices, STRAND 3/Organizational Integration, CONCLUSION/Applying the Framework. Only `#intro` was read. Give the other sections ids.
  - Open motion: height grows 55→58 over ≈200ms; no opacity fade measured.

### B3.2 Sections (desktop → mobile)
1. **Hero**
   - bg `#030712`, padding `160px 80px 80px` (mobile `120px 20px 80px`), inner max-w 960, gap 40.
   - Ladder tile 80×80 (B1.6, `ladderLoop`).
   - h2: Rethink Sans 64/64/-2.56/500 white (mobile 32/35.2/-0.64). Same title as the B1.6 card.
   - p: Inter 20/30/-0.8/500 `#f3f4f6` at opacity .8, max-w 768 (mobile 16/24). Same copy as the B1.6 card.
   - 1px divider `rgba(255,255,255,.08)`.
   - Author row (gap 20): avatar 30×30 radius 8, then `Stef van Grieken` Inter 16/25.6/-0.32/500 white and a span `· 15 min read` at `rgba(255,255,255,.6)` (mobile 14/22.4).
2. **Pre**: padding `80px 0` (mobile `40px 20px`). Max-w 720 text column, 5 paragraphs of body `p` (B2.3 style).
3. **Interactive Ladder**
   - bg `#f9fafb`, padding `120px 80px` (mobile `40px 16px`), max-w 1080.
   - 5 bars bottom-aligned, gap 0 (mobile gap 1). Each bar 216 wide, heights 80/160/240/320/400 (mobile 70.8 wide, 40…120 tall).
   - Bar style: bg `#2d66f8`, radius `12px 0 0 0` (last `12px 12px 0 0`; mobile 8px), padding 20 (mobile 8), `::after` right 2px `rgba(255,255,255,0)`.
   - Labels h5 Rethink Sans 18/25.2/-0.18/600 `rgba(255,255,255,.9)` (mobile **8/11.2**): `No ML`, `Human assessment`, `ML ranking and selection`, `ML generation and learning`, `AI agents and decision making`.
   - Hover on a bar: bg → `#5e95fc`. Bar 0 is a link to `/`.
   - Axis row (padding-top 24, gap 20):
     - Pill `Old car`: white bg, radius 1000, padding `4px 12px`, `::after` 1px `rgba(0,0,0,.08)`, h5 18/25.2/600 `#616e80` (mobile 10/12.5).
     - A 2px line `#92bafe`.
     - Pill `Waymo`.
   - A 54×54 `logo` sits top-left.
4. **Ledger**
   - padding `80px 0 120px`, gap 80, column max-w 720.
   - Intro h2: Rethink Sans 36/43.2/-0.72/600 `#9ca3af`, with a leading span `The ML Maturity Ladder` in `#030712` ("From traditional to autonomous biologics R&D"). Then a body p.
   - **Levels**: row, gap 60 (mobile 20).
     - Left: the **sticky level indicator** `animated` (120×50, `position:sticky; top:160px`). Five bars 24 wide (10/20/30/40/50 tall), radius 2. The active level is `#2d66f8`, the others `#d1d5db`. The active bar switches as each level block (0–4) passes top:160 (scroll-driven, instant).
     - Right: a 540 column, gap 80, of 5 level blocks. Each block (gap 20) has:
       - h3 28/33.6/-0.56/600 `#030712`, with leading span `Level N` in `#9ca3af`.
       - h6 Inter 12/18/500 `#616e80` (level 4: `#9ca3af`): `Akin to SAE Level 0: full manual control, where the human does all the driving and the system offers no automation.` etc.
       - Body p's.
     - Level titles: `No Machine Learning Used`, `Human Assessment`, `ML Ranking and Selection`, `ML Generation and Learning`, `AI Agents and Decision Making`.
   - Closing block `What it really takes to ladder up` (h2 36/43.2, `#030712`) + 2 p.
5. **Framework Intro**: h1 Rethink Sans 44/44/-0.88/600 `#030712` with leading span `Climbing the Ladder` in `#9ca3af` ("A Practical Framework for ML Maturity in Biologics Discovery"). Then a p.
6. **Framework Visual**: full-bleed image 1440×756 on `#f9fafb` → `/assets/pages/blog-maturity/image-BuFFsMu1.png` (mobile 390×205).
7. **Framework Ledger**
   - padding `80px 0`, column max-w 720, gap 80. Intro p with 3 bold phrases.
   - h2 `The Three Strands of ML Maturity`.
   - 3 items (gap 40). Each item: 32×32 icon (`1-i7eLtA6o.png`, `2-jnHZtAaC.png`, `3-P6Vpflbk.png`), then h3 28/33.6/600 `#1f2937` (`Scope of ML Application`, `Experimental Data Practices`, `Organizational Integration`), then p.
8. **Section Header 1 / 2 / 3** (full-bleed bands)
   - Height 500, padding `120px 0`. Mobile height 422, no padding.
   - bg: 1 `#2d66f8`, 2 `#3cab57`, 3 `#0ea5e9`.
   - Watermark numeral `01`/`02`/`03`: Rethink Sans **400/480/500** (mobile 200/240), color `#92bafe`, centered, statically shifted `translateY(-240px)`, clipped.
   - Title words centered: Rethink Sans 64/64/-2.56/500 white (mobile 32/35.2): `Scope of ML application`, `Experimental Data Practices`, `Organizational Integration`. Words run `wordReveal` on enter.
9. **Content 1 / 2 / 3**: padding `80px 0 120px`, column max-w 1080, gap 80. Pattern:
   - Lead h2 36/43.2/600 `#1f2937` + p. Leads:
     - `How broadly and deeply are ML tools used across your discovery pipeline?`
     - `Are your experiments setting up your ML systems for success?`
     - `Is machine learning embedded in your day-to-day work, or trapped in si…` (truncated in capture)
   - 1px separator `rgba(0,0,0,.04)` (1080 wide).
   - Then 2–3 **Section** blocks (720, gap 40). Each Section:
     - h2 36/43.2/600 in the band color (e.g. `#2d66f8`) with a leading dark span (e.g. `Modalities` + `From Simple to Complex Biologics`).
     - Two cards `What It Means` / `Why It Matters`: bg `#f9fafb`, radius 16 (12 in later sections), padding 32. h4 Rethink Sans 18/21.6/600 in the band color, then p.
     - h3 `The Maturity Spectrum`.
     - Two rows (gap 20). Each row: a 28×28 white icon built from stacked 14×2 bars (`section-14x2-*.svg`, 4 variants), then a bold label (`Low Maturity:` / `High Maturity:`) and a `ul`.
     - A 720×378 image (radius 16/12; `image-*.png`, see manifest).
     - `Real-World Excellence` h3, then sub-heads. These are Inter 16/700 `strong` in Content 1 and Rethink Sans 18/21.6/700 in Content 2–3. Each is followed by p's and a source line: `Source:` Inter 12/18/500 `#616e80` + link Inter 12/18 `#0284c7` (EXTERNAL).
   - **Quote** blocks:
     - padding-left 40 (mobile 20), `::after` left border 8px (mobile 4px) in the band color.
     - Words: Rethink Sans 64/64/-2.56/500 `#1f2937`/`#030712` (mobile 32/35.2), `wordReveal`.
     - Quotes verbatim:
       - `"We don't go into the lab and make things unless we have a good idea of what the forecast looks like."` (`#2d66f8`)
       - `High-throughput screening generates 100-1000x more training data per cycle, enabling models to learn exponentially faster` (`#3cab57`)
       - `Organizations with ML in strategic decisions report 2-3x higher ROI from ML investments compared to those using it only tactically` (`#0ea5e9`)
       - `"Any company that thinks it can build its own enterprise software is probably kidding itself. We needed infrastructure that 'just works' so our scientists could focus on biology, not debugging code."` (`#0ea5e9`)
10. **Common Patterns**: padding `80px 0 160px`. Blocks separated by 1px `rgba(0,0,0,.04)`, each with an h1 44/44/600 `#030712`:
    - `Common Maturity Patterns We See` (image + h3s `The Pilot Trap`, `The Data Desert`, `The Silo Problem`)
    - `Assess Your ML Maturity` (p + `ol` of 3 bold items + image)
    - `The Road Ahead`
    - `Continue the Conversation` (p ending in link `Get in touch.` → `/get-started`)
11. **Form**
    - `HS Form` card 800 wide, bg `#eff4ff`, radius 16, padding 45.
    - h2 36/43.2/600 `#1f2937` centered: span `Is your R&D ML ready?` in `rgba(31,42,56,.6)`, then `Get in touch to get a personal assessment.`
    - HubSpot iframe 710×368 (**EXTERNAL**, placeholder form).
12. **Recent Posts**: identical to B2.4.

### B3.3 Motion
- Hero ladder `ladderLoop`.
- Sticky level indicator (scroll-position driven).
- `wordReveal` on section-header titles and quotes.
- Interactive-ladder bar hover color.
- TOC open/close.
- No appear-on-load config exists for this page.

---

## B4. Video template `/video/[slug]` (20 CMS videos)
Dark nav (light at 390, see B0.1), dark footer. Measured `guided-rounds` and `sankey`; they are identical except for title length. Height 1538 (desktop), 2125 (mobile).

- **Hero section**: bg `#030712`, **fixed height 1039** (desktop and mobile), padding `80px 0 0`, content centered vertically.
  - Inner: padding 40, column, gap 70.
  - h1 = CMS title, centered, Rethink Sans **62/58.9/-2.48/500** white, width 1360. **Not resized on mobile**: still 62px at 390, wrapping to 3 lines.
  - **Player box**: bg `#000`, radius 20, overflow hidden, 16:9. Desktop 1360×765. Mobile 310×174.4 (40px side padding).
    - Contains `<mave-player embed="<maveEmbedId>" controls="full" autoplay="off">` (**mave.io, EXTERNAL**). Its background is the poster `center/contain`.
    - Clone: render the local poster `cms.json video[].poster` (`/assets/cms/video-<slug>-poster.jpg`) as cover with a centered play affordance, no playback.
- There is no description, transcript, date or related list on this template.
- Then the dark footer.
- Motion: none.

---

## B5. `/video` (index): exists
Dark nav (light at 390), dark footer. Title `Cradle`. Height 2270 (desktop) / 2843 (mobile).

- **Section**: bg `#030712`, padding `65px 0 0`, column.
- **Header row**: padding 60, gap 130.
  - h1 `Cradle Videos`: Rethink Sans 80/76/-3.2/500 white (mobile 40/38/-1.6).
  - **Category filter** (`label`, column, gap 8):
    - Caption `Category`: Inter 12/14.4/500 `#666`.
    - Select box 180×40: bg `rgba(187,187,187,.15)`, radius 10, `::after` 1px `rgba(136,136,136,.1)`, padding-right 12.
    - `<select>` padding 12, Inter 14/16.8/400 `#222`. Chevron 16×16 mask (`M3.5 6 L8 10.5 L12.5 6`, stroke 1.5) colored `#999`, at right 10.
    - Options: `All`, `Academy`, `Keynote`, `Webinar`, `Case study`, `Other`. Filters by `cms.json video[].category`.
    - These are Framer default form styles (grey on dark).
- **List**: padding 60, column, gap 20. Shows **4 items** in CMS order (guided-rounds, sankey, launch, launch-sm).
  - A `Load More` element exists in the DOM but renders 0×0 (not visible). Clicking does nothing. Treat as page size 4, with no visible pagination.
  - **Video row** (`a` → `/video/<slug>`): row, gap 27, height 315.
    - Media 560×315: bg `#000`, radius 12, poster as cover.
    - Text column (gap 10):
      - Category: Spot Mono Medium 16/16/500 `#9ca3af` uppercase (mobile 13/13/0.26).
      - h4 title: Rethink Sans 24/28.8/500 white (mobile 18/21.6).
  - Hover: none.
- **Mobile is broken on the live site**: the rows keep the 560px media and 60px padding, so the text column sits off-screen (clipped). Recommended clone fix: stack the media (full width) above the text. Measured live values are above.
- Motion: none.

---

## B6. `/whitepaper`
Dark nav, dark footer. Height 4231 (desktop) / 4064 (mobile).

### B6.1 Intro (dark)
- bg `#030712`, padding `80px 0 0`, height 882 (mobile 720), `::after` bottom 1px `rgba(255,255,255,.08)`.
- **Letters row** `C R A D L E - 1`:
  - 8 boxes, each 170×≈295 (mobile 44×76), row aligned flex-end, within a 1360 row. Each box holds one glyph as **live text**: Spot Mono Medium 500, white, letter-spacing -0.04em, line-height 1em, fit-to-box (≈295px font desktop, ≈76px mobile).
  - The row has `mask-image: linear-gradient(270deg, rgba(0,0,0,.8) 10%, #000 60%)`.
  - **Scroll parallax** (exact ratios, linear, translateY = −k·scrollY): C 0.17, R 0.07, A 0.25, D 0.10, L 0.35, E 0.13, `-` 0.08, 1 0.24.
- Divider 1360×1 `rgba(255,255,255,.12)`.
- **Callout row** (padding `20px 0 20px 20px`, space-between):
  - PaperStack icon (B2.6), 24px gap.
  - Description (Inter 16/25.6/-0.32/500 `rgba(255,255,255,.8)`, max-w 450): `An automated machine-learning framework for protein lead optimization — validated across antibodies, enzymes, peptides, vaccines, and gene-editing systems.`. Runs `letterFade` on load (≈0.8–1.6s).
  - SecondaryOnDark40 `Read whitepaper` → bioRxiv (**EXTERNAL**).
- **bg squiggles** (z1, `filter: blur(5px)`). Three blob SVGs:
  - left 778×626: `left-777x626-e4555f.svg`
  - bottom 834×527 holding a 900×848 SVG rotated −40°: `bottom-900x848-fe16a0.svg`
  - right 581×517: `right-581x517-4318d1.svg`
  - Mobile versions: `*-389x313`, `*-450x424`, `*-290x259`.
  - **Appear (exact, on load):**
    - left: opacity .001, scale .8, x −20, y 20 → 1/1/0/0, spring `{bounce .3, duration 1}`, delay .2
    - bottom: opacity .001, scale .8, y 40, delay .4
    - right: opacity .001, x 20, y 30, delay .6
  - **Scroll parallax**: translateY = +k·scrollY with left 0.5, bottom 0.2, right 0.4 (they sink, i.e. move slower than the page).

### B6.2 Video
- White section, padding 80 (mobile `40px 12px`).
- Player 1280×720, radius 12, bg `#000`. mave.io embed `o6awanqC6cPGa7M` (the `cradle-1` video). Poster `/assets/cms/video-cradle-1-poster.jpg`. **EXTERNAL**, placeholder.

### B6.3 `ui` facts (4 rows)
- Padding `0 80px 80px` (mobile `0 20px 80px`). Rows max-w 880, each row = 2 columns (400 + 400, gap 80). Rows separated by 960×1 `rgba(0,0,0,.04)` with 40px gaps.
- Left column: h4 Rethink Sans 24/28.8/500 `#9ca3af`, with a leading span in `#030712` (mobile 18/21.6).
- Right column: p Inter 16/25.6/-0.32/500 `#616e80` (mobile 14/22.4).

| leading span | rest of h4 | paragraph |
|---|---|---|
| `The Problem` | `Lead optimization costs $5–15M and takes up to 3 years per candidate` | `It's the longest and most expensive step in pre-clinical development, yet the design-build-test-learn cycle remains largely manual and heuristic. CRADLE-1 automates the design and learning steps, treating lead optimization as a high-dimensional search problem rather than a trial-and-error process.` |
| `How It Works` | `Foundation models, evotuned to your protein, fine-tuned on your data` | `CRADLE-1 adapts pre-trained protein language models to your project in stages: unsupervised evotuning on evolutionary neighborhoods, then supervised fine-tuning using both preference optimization (group DPO) and regression predictors trained on your assay data. A diversity-aware search algorithm generates candidate libraries optimized for both predicted function and sequence diversity. The first round can also run zero-shot, without any experimental data.` |
| `Multi-property Optimization` | `Optimize 2–6+ properties simultaneously instead of one at a time` | `Binding, thermostability, expression, activity, aggregation, immunogenicity — CRADLE-1 handles them together and gives you visibility into how they interact. The system steers candidates along the Pareto frontier so you can make informed trade-offs, rather than fixing one property at the expense of another.` |
| `Results` | `Validated in vitro across 10 modality–target combinations` | `CRADLE-1 achieves ~90–95% success rate in hitting target product profiles across dozens of commercial campaigns, compared to ~85% for traditional lead optimization.` |

- Motion: each row fades up y 40→0 when ≈300px into view (opacity stays 1; ≈0.4s).

### B6.4 `footer-cta` (page-specific CTA, not the homepage one)
- bg `linear-gradient(180deg, #fff 0%, #f3f4f6 100%)`, padding `200px 0` (mobile `80px 0 120px`), content gap 40.
- **Document trio** (row, gap 14, padding 20):
  - `left` 80×104 and `right` 80×104 sheets: white, radius 2, shadow `rgba(0,0,0,.08) 0 1px 8px`, padding 8, 12 text lines of 2px (`#e5e7eb` first line, `#f3f4f6` the rest, one white), gap 4.8.
  - `middle` 100×130 with a 54px Cradle symbol, padding 32.
  - Motion: left/right sheets go opacity 0, y 16 → 1, 0 on enter (≈0.5s).
- h2 `CRADLE-1 Whitepaper`: Rethink Sans 64/64/-2.56/500 `#1f2937`, centered (mobile 32/35.2).
- p `The paper covers the complete technical framework — group DPO, diversity-aware ranking, batch-effect handling, ablations — plus full wet-lab protocols and a documented failure case.`: Inter 20/30/-0.8/500 `#616e80`, max-w 640 (mobile 16/24).
- Buttons (column, gap 16, each 320×48, padding `0 32px`):
  - Primary48 `Read on bioRxiv` (**EXTERNAL**). Hover bg `#1b3ada`.
  - Secondary48 `Talk to Sales` → `/get-started`.

---

## B7. `/presskit`
Light nav, dark footer. Height 2403 (desktop) / 2901 (mobile).

- **Page title**: padding `144px 0 48px`, max-w 960, gap 20.
  - Icon cluster (row, gap 20, centered, 96 tall): three gradient file icons (data-URI SVGs saved as `page-title-56x56-12bca5.svg`, `page-title-96x96-ae7a4c.svg`, `page-title-48x48-fea7c7.svg`) at 56 / 96 / 48. The outer two have z 2.
    - **Appear (exact)**: each opacity .001, scale .2 → 1, spring `{bounce .2, duration .6}`. Delays: 56px icon 0, 48px icon 0.1, 96px icon 0.2.
    - **Shimmer** (z1): a 35.5×96 strip (`shimmer-43x139-03a4dd.svg`) inside a 120×96 clip over the center icon. Loop: translateX 0→200 over ≈0.6s, then rest ≈3s (period ≈3.6s). It stops once the page is scrolled past ≈300px.
  - h1 `Press kit`: Rethink Sans 72/72/-2.88/500 `#030712`, centered (mobile 40/40/-1.6).
  - p `For inquires or questions email us at` + link `hello@cradle.bio` (`mailto:`, keep). Inter 16/25.6/-0.32/500 `#616e80`; link `#0284c7`. Mobile 14/22.4.
- **Sections** (max-w 960, gap 40): `Logos`, `Screenshots`, `Photos`.
  - Header row: h56, padding-left 16. Label Inter 16/20.8/600 `#9ca3af` (mobile 14/18.2).
  - Items container: radius 16, `::after` 1px `rgba(0,0,0,.08)`, overflow hidden.
  - **Item row** 960×56: bg white, padding `0 16px 0 4px`, gap 4, `::after` bottom 1px `rgba(0,0,0,.04)` (not on the last row).
    - 48×48 icon cell holding a 24×24 file-type icon (`variant-1-24x24-*.svg`: three types).
    - Name (flex 1): Inter 16/25.6/-0.32/500 `#030712`.
    - Size (261 wide): same style, `#9ca3af`.
    - `Download` link: Inter 16/16/500 `#0284c7`, padding 10, radius 50, gap 5. Mobile shows a 20×20 download glyph (`item-20x20-fdc1c4.svg`) instead of the word.
    - Hover: row bg → `#f9fafb` (≈250ms). Link → `#0ea5e9` (≈250ms).
  - Rows (name / size):
    - Logos: `cradle-logo.svg` 2 files · `cradle-logo.png` 6 files · `cradle-logo.eps` 2 files
    - Screenshots: `sequence-viewer.png` 180 KB · `round-overview.png` 74 KB · `generation-report.png` 80 KB
    - Photos: `company-team-photo.jpg` 1.6 MB · `cradle-founders-1.jpg` 2.4 MB · `cradle-founders-2.jpg` 1.6 MB · `stef-van-grieken-portrait.jpg` 2.0 MB · `elise-de-reus-portrait.jpg` 2.0 MB · `eli-bixby-portrait.jpg` 2.5 MB · `jelle-prins-portrait.jpg` 1.7 MB · `daniel-danciu-portrait.jpg` 2.5 MB · `harmen-van-rossum-portrait.jpg` 2.2 MB · `cradle-lab-team.jpg` 1.3 MB · `ams-lab-01.jpg` 1.4 MB · `ams-lab-02.jpg` 1.3 MB · `ams-lab-03.jpg` 1.7 MB · `ams-lab-04.jpg` 1.3 MB
  - All Download hrefs are framerusercontent.com files (**EXTERNAL**). They were not downloaded.
- Content wrapper padding `0 80px 120px` (mobile `0 20px 80px`).

---

## B8. `/links` and `/notebook` (link-in-bio template)
**No navbar and no footer.** White page.

### B8.1 Column
- Max-w 500, centered, starting y 80 (mobile: root padding `64px 24px 0`, column 342 wide).
- Column gap 40 (mobile 24).
- The whole column runs `fadeUp40` on load.

### B8.2 Brand block (gap 16, then gap 12)
- Logo tile 72×72 (mobile 56), radius 20, Cradle symbol.
- Wordmark SVG 130×32 (mobile 114×28): `/assets/pages/links/icon-130x32-5a733f.svg` (mobile `icon-114x28-3e856c.svg`).
- Tagline `Engineer better proteins, faster.`: Inter 16/25.6/-0.32/500 `#616e80`, centered (mobile 14/22.4).

### B8.3 /notebook only
- h5 Rethink Sans 18/25.2/-0.18/600 `#030712` (mobile 16/20): `We're glad you've enjoyed your notebook! 🎉` / `Happy to send you another one - just send a quick message.` (two lines).
- Then a HubSpot form iframe 500×1002 (**EXTERNAL**, placeholder).

### B8.4 Link buttons (column, gap 12; mobile gap 11; each 500×48, radius 12, padding 12, centered content, gap 10)
| button | style | target |
|---|---|---|
| `Book a meeting` | bg `#2d66f8`, `::after` bottom 2px `rgba(0,0,0,.12)`, text Inter 14/600/16.8 white. Hover bg `#224eee` (≈250ms). | `/get-started` (written as an absolute cradle.bio URL, so treat as same-site) |
| `Cradle for Biopharma` | bg `#f3f4f6`, text `#030712`, 24px antibody icon (`antibody-24x24-757549.svg`). Hover bg `#e5e7eb` (≈250ms). Same style for all rows below. | `/solutions/biopharma` |
| `Cradle for Industrial Bio` | bottle icon `bottle-24x24-43acf5.svg` | `/solutions/industrial` |
| `Website` + `(cradle.bio)` in `#616e80` | globe icon `icon-24x24-88eed1.svg` | `/` |
| `Cradle whitepaper` | doc icon `icon-24x24-66f3dc.svg` | `/whitepaper` |
| `Follow us on Linkedin` | square icon `icon-24x24-7957ee.svg` | **EXTERNAL** (LinkedIn) |

Mobile text 13/15.6, icons 20px (`*-20x20-*` files).

### B8.5 /links only: case studies
- h5 `Case studies` (Rethink Sans 18/25.2/600).
- 2-column grid 244 + 244, gap `24px 12px`. Mobile gap 4.
- Card: image 244×120.3 radius 8, then the modality tag Inter 11/14.3/-0.44/700 `#9ca3af` uppercase (mobile 9/11.7/1.08), then title h6 Inter 12/18/500 `#9ca3af` (mobile 10/15). Gap 10.
- 6 cards = the 6 latest `Case studies` posts. The tag is the CMS `modality`.
- No hover change measured.

### B8.6 Wet lab block
- Title row: h5 `Meet the Cradle wet lab`, plus right-aligned link `Learn more` (Inter 16/25.6/500 `#616e80`, hover `#29333c`) → `/lab`.
- Two **video cards** (500×112): white, radius 16, shadow `rgba(0,0,0,.08) 0 1px 8px`, padding 16, gap 16, `backdrop-filter: blur(10px)`, `::after` 1px `rgba(255,255,255,.08)`.
  - Thumb 120×80, radius 6, opacity .95: `video-PHAYVkrR.png`, `video-w2zATkuZ.png`.
  - A centered 40×40 glass play button: radius 100, `linear-gradient(180deg, rgba(255,255,255,.5), rgba(255,255,255,.08))`, `backdrop-filter: blur(5px)`, 20px play icon `video-20x20-63208f.svg`.
  - Text (gap 6): title Inter 16/20.8/600 `#1f2937` (`Lab automation at Cradle`, `Design principles for ML-ready sample tracking`) and `3 min` in Inter 16/25.6/500 `#9ca3af`.
  - Links go to cradle.wistia.com (**EXTERNAL**).
  - No hover.

### B8.7 Footer graphic
- `footer` 1280×300 (mobile 342×250, padding-top 70), white, clip.
- Contains a 400×400 (mobile 250×250) clip box with the large SVG `footer-300x314-36e14f.svg` (mobile `footer-188x196-f2337c.svg`).
- On enter it slides up from `translateY(320px)` to 0 (≈0.4s, once).

---

## B9. `/shirt`
**No navbar and no footer.** Root padding `0 80px` (mobile `0 24px`), column, gap 80 (mobile 10).

- **Hero** (`platform-ui`): 1200×668.7 dark block `#030712` (at 390 it stays 1200 wide, centered and overflowing at x −405).
  - Squiggle images: right 717×727 and left 778×626. They reuse `/assets/hero-blob-right.png` and `/assets/hero-blob-left.png` (same source files as the homepage hero).
    - **Appear (exact)**: right opacity .001, scale .9 → 1, spring `{bounce .3, duration 1}`, delay .3. Left: same, delay .2.
    - **Parallax**: right −0.15·scrollY, left −0.30·scrollY, same as the homepage hero.
  - T-shirt photo 472×668.7, centered, z 10: `/assets/pages/shirt/image-31-vBTUyXNN.png`.
- **Column** (LinkInBio B8, max-w 500, `fadeUp40`):
  - Brand block.
  - h3 `We'd love to send you a t-shirt!`: Rethink Sans 32/38.4/-0.64/500 `#030712` (mobile 24/28.8).
  - h5 `We just need some of your details to make that happen. Please fill out the form below and we'll go to work.` (18/25.2/600; mobile 16/20).
  - HubSpot form iframe 500×1483 (**EXTERNAL**).
  - Link buttons (B8.4).
  - Wet lab block (B8.6).
  - Footer graphic (B8.7).
- After the footer graphic, the t-shirt photo repeats once more (472×668.7) at the very bottom. This is a live-site quirk; keep or drop.

---

## B10. `/licensing` (marketing page with tiers; short copy, so verbatim is OK)
Light nav, dark footer. Height 3390 (desktop) / 3760 (mobile). The task brief assumed long legal text, but this page has none.

### B10.1 Hero
- Padding `144px 40px 40px` (mobile `144px 20px 40px`), centered max-w 800, gap 32 (mobile 20).
- Logo tile 72×72 (radius 20, gradient tile + Cradle symbol).
  - **Appear (exact)**: opacity .001, rotate −10, scale .5 → 1, spring `{bounce .2, duration .4}`, delay .1.
- h2 `A modern software license. No hidden fees.` (line break after "software"): Rethink Sans 64/64/-2.56/500 `#1f2937`, centered (mobile 32/35.2).
- p `One annual software license. No complicated royalty deals, no milestone payments, no hidden fees. It's that simple.`: Inter 20/30/-0.8/500 `#616e80` (mobile 16/24).
- **Logo grid**: 5 columns × 108.8, gap `32px 64px` (mobile 4 cols × 75.5, gap `32px 16px`). 10 customer logos at opacity .6, contain, max-w 117. They reuse the existing files `/assets/customer-logo-{novonesis,novo-nordisk,jnj,bayer,abbvie,hansa,illumina,csl,lundbeck,ultragenyx}.svg`, in that order, row-major.

### B10.2 `license-grid`
- Padding `80px 40px` (mobile `40px 20px`), max-w 960.
- Head: h3 `Our licenses` (32/38.4) + p `Licensing for every research need.` (16/25.6 `#616e80`).
- Grid: 3 cols × 306.7, gap 20. Rows 420 + 200.
- **Tier card**: radius 24, padding 40, column space-between, overflow hidden.
  - Title row (gap 8): `hover-highlight` bar 4×24 radius 4, then h4 Rethink Sans 24/28.8/500 `#030712` (mobile 18/21.6). Sub p 16/25.6 `#616e80`.
  - Body p + button (gap 20).
  - Hover: `box-shadow: inset 0 0 0 2px rgba(0,0,0,.04)` (≈100ms). The highlight bar does not change.

| tier | bg | bar | sub | body | button |
|---|---|---|---|---|---|
| `Standard` | `linear-gradient(180deg, #f0f9ff, #e0f2fe)` | `#0ea5e9` | `Per active project` | `Annual License based on the number of projects you need. For organizations that run one to several programs.` | Primary36 (padding 16) `Let's talk` → `/get-started` |
| `Enterprise` | `linear-gradient(180deg, #eff4ff, #dbe7fe)` | `#2d66f8` | `Scale flexibly` | `For organizations with multiple projects who want to deploy Cradle across programs and divisions.` | Primary36 `Let's talk` → `/get-started` |
| photo tile | `license-grid-FwU6ZVTs.jpg` 306.7×420, radius 24 | | | | |
| photo tile | `license-grid-FRS8jcOd.jpg` 306.7×200, radius 24 | | | | |
| `Academic` (spans 2 cols, row layout) | `linear-gradient(180deg, #effaf1, #e1f7e6)` | `#3cab57` | `Not-for-profit research` | `Apply to join our academic program tailored to not-for-profit research. Limited availability.` | Secondary36 `Apply now` → `/solutions/academia` |

- Mobile: single column. Tier cards animate in from `translateY(40px) scale(.95)` to none on enter.

### B10.3 "Included in all licenses"
- Padding `80px 40px 160px` (mobile `40px 20px 80px`). Row, gap 80: title column 440 + list column 440.
- Title: h3 `Included in all licenses` + p `Everything you need to get started on day one.`
- 3 groups (gap 40). Each group: h4 24/28.8/500 `#030712` (mobile **16/20/-0.16/600**), then rows.
- Row: 48 tall, gap 16, padding-right 8, `::after` bottom 1px `rgba(0,0,0,.04)` (not on the last).
  - Check icon: a 32 box with a 22×22 circle `#3cab57` and a white 11×9 check (`end-11x9-b855c2.svg`, stroke 2).
  - Text Inter 16/25.6/-0.32/500 `#616e80`.
- Content:
  - `Private and secure`: `Private workspace for your organization` · `Industry leading` + link `security standards` (`#0284c7` → `/security`) · `Your data and models remain private to you`
  - `Full ownership. Full access.`: `Full ownership of sequence IP` · `Own all data and reports created` · `Full access to Cradle platform and API`
  - `No hidden fees`: `Unlimited users` · `Unlimited data upload and storage` · `Compute and infra included` · `Expert technical support` · `No royalty or milestone fees`
- Motion: each check circle scales 0.7→1 as its row enters the viewport (≈0.3s, once).

### B10.4 Partnerships band
- bg `#f9fafb`, padding `80px 40px 120px` (mobile `80px 20px`), `::after` top 1px `rgba(0,0,0,.04)`. Row max-w 996, gap 80.
- h3 `Partnerships`.
- p `CRO or service provider? If you wish to use or deploy Cradle as part of your service offering, please contact us here to discuss options.`
- Secondary36 `Contact Cradle` → `mailto:partnerships@cradle.bio` (keep the mailto).

---

## B11. `/dpa` (Data Processing Addendum)
Light nav, dark footer. **The legal text is image scans, so it becomes placeholder.**

- `main` padding-top 84. `content` padding 80 (mobile 20), gap 80 (mobile 40).
- Title block (gap 40):
  - h1 `Data Processing` / `Addendum` (two lines): Rethink Sans 80/76/-3.2/500 `#030712`, centered (mobile 40/38/-1.6).
  - `Download` button 117.5×48 (mobile 44 tall): bg `#eff4ff`, radius 8, padding `0 20px`, Inter 16/16/600 `#224eee`. Links to a framerusercontent PDF (**EXTERNAL**). Clone: disable or link to a placeholder.
- **Doc viewer**: 1280×720 (mobile 350×506), bg `#f3f4f6`, radius 16, padding 40, `overflow:auto` (scrolls internally), column, gap 20.
  - Contains **17 page cards**, each 595×842 (A4 at 72dpi; mobile 270×382): white, shadow `rgba(0,0,0,.08) 0 1px 8px`, `::after` 1px `rgba(0,0,0,.12)`.
  - Each card has a centered 108×108 Cradle symbol (loading placeholder, z1) under the page image (z2).
  - Structure only: 17 pages, a scanned legal agreement, no heading outline available (images).
  - **Placeholder**: render the 17 blank page cards with the centered symbol, or with placeholder text lines.
- Motion: none.

---

## B12. Links map (same-site vs EXTERNAL)
- **Same-site** (keep as local paths):
  - `/`, `/blog`, `/blog/<slug>`, `/case`, `/video/<slug>`, `/whitepaper`, `/get-started`, `/platform`, `/licensing`, `/security`, `/lab`, `/team`, `/careers`
  - `/solutions/{biopharma,industrial,academia}`, `/modality/{antibody,enzyme,peptide,vaccine}`
  - `/legal-terms`, `/privacy-policy`, `/presskit`
  - `/blog/<slug>/print` (unmeasured, see B2.4)
- **mailto** (keep): `hello@cradle.bio`, `partnerships@cradle.bio`.
- **EXTERNAL** (the clone removes them):
  - app.cradle.bio (Sign in), docs.cradle.bio, trust.cradle.bio, linkedin.com, biorxiv.org
  - framerusercontent.com downloads (presskit, DPA PDF), cradle.wistia.com
  - mave.io players (video-dns.com), MailerLite and HubSpot form embeds
  - every outbound link inside article bodies and maturity sources

---

## B13. New components to build
LightNav variant · DarkFooter variant · Ghost36 · SecondaryOnDark40 · ButtonDefault · BlogHeading (caret) · FeaturedPostCard · ThumbCard (rail + mobile h-scroll) · MaturityPromoCard + LadderTile (`ladderLoop`) · PostRow (index / recent) · SubscribeCard (sticky, placeholder form) · NewsletterBand · PostHeader (title/intro/date+author chips/cover) · RichText (B2.3 table) · CalloutWhitepaper (+PaperStack, glow) · BlogInfoCallout · VideoEmbedPlaceholder (poster + play) · RecentPosts · VideoHero · VideoIndex (+CategorySelect, VideoRow) · WhitepaperIntro (parallax letters, squiggles) · FactRows · DocTrio CTA · PresskitFileList · LinkInBio (brand block, LinkButton, CaseGrid, WetLabVideoCard, FooterGraphic) · ShirtHero · LicensingHero/TierCard/IncludedList/PartnersBand · DocViewer (DPA) · Maturity page: OnPageTOC, InteractiveLadder, StickyLevelIndicator, SectionHeaderBand, InfoCard, QuoteReveal (`wordReveal`), HSFormCard.

## B14. Not captured / caveats
- **Tablet (810–1199)**: not measured.
- **`code` / `pre` in rich text**: absent from the 4 measured posts and maturity, so there are no values. The other 49 posts were not inspected element by element.
- **Mobile blockquote `p` size**: inferred (≈18/27/-0.36) from its nested `strong`, not measured directly.
- **Third-party embeds** (mave.io video, MailerLite form, HubSpot forms): cross-origin iframes / custom elements. Their inner UI was not measured. Specified as placeholders at the measured box sizes.
- **ButtonDefault "Subscribe"** on /blog and posts: no observable action in headless Chromium.
- **/video "Load More"**: present in the DOM but renders 0×0. Behaviour unknown.
- **Maturity TOC**: only the `#intro` anchor was read. The other anchor ids and the close animation were not captured.
- **`/blog/<slug>/print`**: linked from every post but not in the sitemap. Not measured.
- **Counts**: the brief said 55 blog / 20 video. Measured: the sitemap has **54** `/blog/*` URLs = **53 CMS posts + the bespoke `/blog/maturity`**, and **20** `/video/*`. All 53 + 20 are in `cms.json`, and maturity is listed under `pages`.
- **Read time** exists only on /blog/maturity (`15 min read`). The CMS has no such field. **Video** entries have no date or author in the CMS.
- In-view animation curves (`wordReveal`, `fadeUp`, check-circle scale, footer-graphic slide) are fitted from sampled frames. Appear-on-load values marked *exact* come from Framer's config.
- **DPA page scans and article-body images**: deliberately not downloaded (placeholder content).
