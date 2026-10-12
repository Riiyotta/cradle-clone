# PAGES_B asset manifest

Companion to `specs/PAGES_B.md`. Downloaded 2026-10-12 from www.cradle.bio at full resolution (Framer `?scale-down-to`/`width`/`height` params dropped). Inline SVGs were extracted from the live DOM with their `<use href>` sprite references resolved into standalone files. Paths are relative to `public/`.

## CMS images (`/assets/cms/`)
- `/assets/cms/<slug>.<ext>`: 45 blog covers (the CMS `Image` field). The other 8 covers already existed in `/assets/` and `cms.json` points at those files: keasling-qs21, beyond-the-bench, therapeutic-peptides, staphylococcus-aureus-vaccine, igg-campaign, sample-tracking, webinar-lab-automation, how-protein-tags-revolutionize-lab-automation.
- `/assets/cms/video-<slug>.<ext>`: 20 video CMS thumbnails.
- `/assets/cms/video-<slug>-poster.jpg`: 20 mave.io player posters (`https://space-o6awa.video-dns.com/<id>/thumbnail.jpg`). These are the frames shown before playback. The video files themselves were not downloaded.
- `/assets/cms/authors/<team-slug>.<ext>`: avatars for every author referenced by a blog post. They appear in the post-header author chip (20×20 desktop, 18×18 mobile, fully round).

## Not downloaded (intentional)
- Inline images inside article bodies (rich text) are placeholders by instruction.
- The 17 DPA page scans on /dpa are images of the legal text, so they are placeholders by instruction.
- Presskit download targets (zip/png/jpg on framerusercontent.com/assets) are EXTERNAL links, not page imagery.
- Whitepaper `C R A D L E - 1` letters are live text (Spot Mono Medium inside an SVG foreignObject). Render them as text, not images.

## Page assets
| page | context (framer-name path) | rendered size | local file | source / note |
|---|---|---|---|---|
| blog | desktop light›nav›logo›Wordmark 2 | 78x22 | `/assets/logo-wordmark.png` | existing |
| blog | content›sections›sections›thumbnail | 128x76 | `/assets/cms/aintibody.png` | CMS cover |
| blog | sections›sections›cases›featured top | 246x128 | `/assets/case-keasling-qs21.png` | existing |
| blog | sections›sections›cases›featured top | 246x128 | `/assets/case-therapeutic-peptides.png` | existing |
| blog | sections›sections›cases›featured top | 246x128 | `/assets/case-staph-aureus-vaccine.png` | existing |
| blog | sections›sections›news›featured top | 246x128 | `/assets/cms/hansa.png` | CMS cover |
| blog | sections›sections›news›featured top | 246x128 | `/assets/cms/guided-rounds.png` | CMS cover |
| blog | sections›sections›team›featured top | 246x128 | `/assets/cms/company-culture.jpg` | CMS cover |
| blog | sections›sections›team›featured top | 246x128 | `/assets/cms/from-lab-rat-to-data-detective-how-this-scientist-turned-sales-into-an-art-form.png` | CMS cover |
| blog | sections›sections›team›featured top | 246x128 | `/assets/cms/cultural-values.jpeg` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/optimizing-entire-batch.png` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/variant-selection-with-ml.png` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/antibody-first-round.png` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/zero-shot.png` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/lundbeck.png` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/visualizing-trade-offs-in-multi-property-protein-optimization.png` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/marcus-schindler.jpg` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/blog-beyond-the-bench.png` | existing |
| blog | content›all›Variant 1›post | 64x40 | `/assets/case-igg-campaign.png` | existing |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/haloalkane-dehalogenase-thermostability.png` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/polyspecific-anti-venom-vhhs.png` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/polyspecific-vhhs-sars-cov-2.png` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/bayer-collaboration.png` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/cradle-2025.png` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/blog-sample-tracking.jpg` | existing |
| blog | content›all›Variant 1›post | 64x40 | `/assets/blog-webinar-lab-automation.jpg` | existing |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/webinar-maturity.png` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/benchmarking-at-cradle.png` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/adaptyv2.png` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/ab4s.png` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/blog-protein-tags.png` | existing |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/slas2025.jpg` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/adaptyv-protein-design-competition.jpg` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/series-b.jpg` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/antibody-ngs-data-initiative.jpg` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/align-to-innovate-benchmark.jpg` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/sam-partovi-joins-cradle-as-cco.jpg` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/affordable-high-throughput-protein-purification.gif` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/the-art-of-assays-part-2.jpg` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/the-art-of-assays-part-1.jpg` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/interviews-franzi.jpg` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/from-prisons-to-proteins.jpg` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/cradle-partners-with-google-cloud-on-security-for-protein-engineering.gif` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/the-rise-of-the-bioneers-innovating-with-proteins-to-transform-industries-part-2.png` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/interviews-jinel.jpg` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/the-rise-of-the-bioneers-part-1.gif` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/exploring-darwin-assembly.jpg` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/interviews-jonathan.jpg` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/case-study-combining-ai-generated-mutations-with-human-expertise-for-better-enzyme-designs.jpg` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/ginkgo-partnership.jpg` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/data-collection-guide.jpg` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/cradle-raises-24m-series-a-and-signs-partnerships-with-industry-leaders.jpg` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/2022-bio-developer-survey-results.jpg` | CMS cover |
| blog | content›all›Variant 1›post | 64x40 | `/assets/cms/cradle-raises-5m.webp` | CMS cover |
| blog | nav›logo›logo›Cradle-symbol | 36x36 | `(reuse /assets/cradle-symbol.svg)` | data-URI |
| blog | — | 40x40 | `/assets/cradle-symbol-footer.svg (existing)` | inline svg <use> resolved |
| blog-post | desktop light›nav›logo›Wordmark 2 | 78x22 | `/assets/logo-wordmark.png` | existing |
| blog-post | Post›content›main›author | 20x20 | `/assets/cms/authors/stef.png` | author avatar |
| blog-post | Post›content›main›image | 640x333 | `/assets/cms/series-b.jpg` | CMS cover |
| blog-post | img›post | 64x40 | `/assets/cms/aintibody.png` | CMS cover |
| blog-post | img›post | 64x40 | `/assets/cms/hansa.png` | CMS cover |
| blog-post | img›post | 64x40 | `/assets/cms/optimizing-entire-batch.png` | CMS cover |
| blog-post | img›post | 64x40 | `/assets/cms/antibody-first-round.png` | CMS cover |
| blog-post | img›post | 64x40 | `/assets/cms/variant-selection-with-ml.png` | CMS cover |
| blog-post | nav›logo›logo›Cradle-symbol | 36x36 | `(reuse /assets/cradle-symbol.svg)` | data-URI |
| blog-post | Post›content›main›date | 18x18 | `/assets/pages/blog-post/date-18x18-8dbda2.svg` | inline svg <use> resolved |
| blog-post | — | 40x40 | `/assets/cradle-symbol-footer.svg (existing)` | inline svg (dup) |
| blog-post-case | desktop light›nav›logo›Wordmark 2 | 78x22 | `/assets/logo-wordmark.png` | existing |
| blog-post-case | Post›content›main›author | 20x20 | `/assets/cms/authors/daniel.jpg` | author avatar |
| blog-post-case | Post›content›main›image | 640x333 | `/assets/case-therapeutic-peptides.png` | existing |
| blog-post-case | img›post | 64x40 | `/assets/cms/aintibody.png` | CMS cover |
| blog-post-case | img›post | 64x40 | `/assets/cms/hansa.png` | CMS cover |
| blog-post-case | img›post | 64x40 | `/assets/cms/optimizing-entire-batch.png` | CMS cover |
| blog-post-case | img›post | 64x40 | `/assets/cms/antibody-first-round.png` | CMS cover |
| blog-post-case | img›post | 64x40 | `/assets/cms/variant-selection-with-ml.png` | CMS cover |
| blog-post-case | nav›logo›logo›Cradle-symbol | 36x36 | `(reuse /assets/cradle-symbol.svg)` | data-URI |
| blog-post-case | callout-whitepaper›content›front›Cradle-symbol | 43x43 | `(reuse /assets/cradle-symbol.svg)` | data-URI |
| blog-post-case | Post›content›main›date | 18x18 | `/assets/pages/blog-post/date-18x18-8dbda2.svg` | inline svg (dup) |
| blog-post-case | content›main›Content›callout-whitepaper | 438x412 | `/assets/pages/blog-post-case/callout-whitepaper-438x412-9a4ed2.svg` | inline svg <use> resolved |
| blog-post-case | content›main›Content›callout-whitepaper | 282x251 | `/assets/pages/blog-post-case/callout-whitepaper-282x251-9d00fc.svg` | inline svg <use> resolved |
| blog-post-case | — | 40x40 | `/assets/cradle-symbol-footer.svg (existing)` | inline svg (dup) |
| blog-post-info | desktop light›nav›logo›Wordmark 2 | 78x22 | `/assets/logo-wordmark.png` | existing |
| blog-post-info | Post›content›main›author | 20x20 | `/assets/cms/authors/nicolas.jpg` | author avatar |
| blog-post-info | Post›content›main›image | 640x333 | `/assets/cms/optimizing-entire-batch.png` | CMS cover |
| blog-post-info | Post›content›main›Content | 640x616 | `NOT DOWNLOADED (article body image, placeholder)` | https://framerusercontent.com/images/IcVKJBG6igQaxFoNKmYBKzE9cAo.png |
| blog-post-info | img›post | 64x40 | `/assets/cms/aintibody.png` | CMS cover |
| blog-post-info | img›post | 64x40 | `/assets/cms/hansa.png` | CMS cover |
| blog-post-info | img›post | 64x40 | `/assets/cms/antibody-first-round.png` | CMS cover |
| blog-post-info | img›post | 64x40 | `/assets/cms/variant-selection-with-ml.png` | CMS cover |
| blog-post-info | nav›logo›logo›Cradle-symbol | 36x36 | `(reuse /assets/cradle-symbol.svg)` | data-URI |
| blog-post-info | Post›content›main›date | 18x18 | `/assets/pages/blog-post/date-18x18-8dbda2.svg` | inline svg (dup) |
| blog-post-info | — | 40x40 | `/assets/cradle-symbol-footer.svg (existing)` | inline svg (dup) |
| blog-maturity | Desktop-dark›nav›logo›Wordmark 2 | 78x22 | `/assets/logo-wordmark.png` | existing |
| blog-maturity | Hero | 30x30 | `/assets/cms/authors/stef.png` | author avatar |
| blog-maturity | Framework Visual›Image | 1440x756 nat1440x755 | `/assets/pages/blog-maturity/image-BuFFsMu1.png` | https://framerusercontent.com/images/BuFFsMu1QOxiN5HDlKwylJzHeg.png |
| blog-maturity | Framework Ledger›1 | 32x32 nat96x96 | `/assets/pages/blog-maturity/1-i7eLtA6o.png` | https://framerusercontent.com/images/i7eLtA6oLV4gud2beJIS0chCaJs.png |
| blog-maturity | Framework Ledger›2 | 32x32 nat96x96 | `/assets/pages/blog-maturity/2-jnHZtAaC.png` | https://framerusercontent.com/images/jnHZtAaCovXCfpUWyVDZpX9rwBs.png |
| blog-maturity | Framework Ledger›3 | 32x32 nat96x96 | `/assets/pages/blog-maturity/3-P6Vpflbk.png` | https://framerusercontent.com/images/P6VpflbkycKKY68XFAgV6t1BCUc.png |
| blog-maturity | Content 1›Section›Image | 720x378 nat720x378 | `/assets/pages/blog-maturity/image-0S3u451Y.png` | https://framerusercontent.com/images/0S3u451Yft5sVSY85zvYfVV3OM.png |
| blog-maturity | Content 1›Section›Image | 720x378 nat0x0 | `/assets/pages/blog-maturity/image-VIMnwmz7.png` | https://framerusercontent.com/images/VIMnwmz74sWDbsRBjPvrPliDdPU.png |
| blog-maturity | Content 1›Section›Image | 720x378 nat720x378 | `/assets/pages/blog-maturity/image-owIbU34H.png` | https://framerusercontent.com/images/owIbU34HlO68ltin7FzTcRlkM.png |
| blog-maturity | Content 2›Section›Image | 720x378 nat720x378 | `/assets/pages/blog-maturity/image-AnGgUNm2.png` | https://framerusercontent.com/images/AnGgUNm2UbvqePf9wabHZ369Kg.png |
| blog-maturity | Content 2›Section›Image | 720x378 nat720x378 | `/assets/pages/blog-maturity/image-YGDmzmkr.png` | https://framerusercontent.com/images/YGDmzmkrEUNzA25mDMY78APvMk.png |
| blog-maturity | Content 2›Section›Image | 720x378 nat720x378 | `/assets/pages/blog-maturity/image-6rHlyYbC.png` | https://framerusercontent.com/images/6rHlyYbCluWM2PxKuHLRcSfydws.png |
| blog-maturity | Content 3›Section›Image | 720x378 nat720x378 | `/assets/pages/blog-maturity/image-lkIbj7HP.png` | https://framerusercontent.com/images/lkIbj7HPP9I7tNDToucYKdNUUa0.png |
| blog-maturity | Content 3›Section›Image | 720x378 nat720x378 | `/assets/pages/blog-maturity/image-CzLrvdX3.png` | https://framerusercontent.com/images/CzLrvdX3brI9gRS8FvstF6rEE.png |
| blog-maturity | Common Patterns›Image | 720x378 nat720x378 | `/assets/pages/blog-maturity/image-LHcLhAvL.png` | https://framerusercontent.com/images/LHcLhAvLEilwx5jMFRzK15WCI.png |
| blog-maturity | Common Patterns›Image | 720x378 nat720x378 | `/assets/pages/blog-maturity/image-Bk9yRR6E.png` | https://framerusercontent.com/images/Bk9yRR6ENM85DuhhFBjRRA4hqkE.png |
| blog-maturity | Recent Posts›posts›img›post | 64x40 | `/assets/cms/aintibody.png` | CMS cover |
| blog-maturity | Recent Posts›posts›img›post | 64x40 | `/assets/cms/hansa.png` | CMS cover |
| blog-maturity | Recent Posts›posts›img›post | 64x40 | `/assets/cms/optimizing-entire-batch.png` | CMS cover |
| blog-maturity | Recent Posts›posts›img›post | 64x40 | `/assets/cms/antibody-first-round.png` | CMS cover |
| blog-maturity | Recent Posts›posts›img›post | 64x40 | `/assets/cms/variant-selection-with-ml.png` | CMS cover |
| blog-maturity | nav›logo›logo›Cradle-symbol | 36x36 | `(reuse /assets/cradle-symbol.svg)` | data-URI |
| blog-maturity | Content 1›Section | 14x2 | `/assets/pages/blog-maturity/section-14x2-1b93d6.svg` | inline svg <use> resolved |
| blog-maturity | Content 1›Section | 14x2 | `/assets/pages/blog-maturity/section-14x2-7e24b9.svg` | inline svg <use> resolved |
| blog-maturity | Content 2›Section | 14x2 | `/assets/pages/blog-maturity/section-14x2-8479e6.svg` | inline svg <use> resolved |
| blog-maturity | Content 3›Section | 14x2 | `/assets/pages/blog-maturity/section-14x2-21dd38.svg` | inline svg <use> resolved |
| blog-maturity | — | 40x40 | `/assets/cradle-symbol-footer.svg (existing)` | inline svg (dup) |
| video-template | Desktop-dark›nav›logo›Wordmark 2 | 78x22 | `/assets/logo-wordmark.png` | existing |
| video-template | nav›logo›logo›Cradle-symbol | 36x36 | `(reuse /assets/cradle-symbol.svg)` | data-URI |
| video-template | — | 40x40 | `/assets/cradle-symbol-footer.svg (existing)` | inline svg (dup) |
| video-template | — | 310x223 | `/assets/cms/video-guided-rounds-poster.jpg` | mave poster |
| video-index | Desktop-dark›nav›logo›Wordmark 2 | 78x22 | `/assets/logo-wordmark.png` | existing |
| video-index | nav›logo›logo›Cradle-symbol | 36x36 | `(reuse /assets/cradle-symbol.svg)` | data-URI |
| video-index | — | 560x403 | `/assets/cms/video-guided-rounds-poster.jpg` | mave poster |
| video-index | — | 560x315 | `/assets/cms/video-sankey-poster.jpg` | mave poster |
| video-index | — | 560x315 | `/assets/cms/video-launch-poster.jpg` | mave poster |
| video-index | — | 560x315 | `/assets/cms/video-launch-sm-poster.jpg` | mave poster |
| video-index | — | 40x40 | `/assets/cradle-symbol-footer.svg (existing)` | inline svg (dup) |
| whitepaper | Desktop-dark›nav›logo›Wordmark 2 | 78x22 | `/assets/logo-wordmark.png` | existing |
| whitepaper | nav›logo›logo›Cradle-symbol | 36x36 | `(reuse /assets/cradle-symbol.svg)` | data-URI |
| whitepaper | intro›text›front›Cradle-symbol | 43x43 | `(reuse /assets/cradle-symbol.svg)` | data-URI |
| whitepaper | content | 1280x720 | `/assets/cms/video-cradle-1-poster.jpg` | mave poster |
| whitepaper | footer-cta›content›middle›Cradle-symbol | 54x54 | `(reuse /assets/cradle-symbol.svg)` | data-URI |
| whitepaper | content›intro›bg squiggles›left | 777x626 | `/assets/pages/whitepaper/left-777x626-e4555f.svg` | inline svg <use> resolved |
| whitepaper | content›intro›bg squiggles›bottom | 900x848 | `/assets/pages/whitepaper/bottom-900x848-fe16a0.svg` | inline svg <use> resolved |
| whitepaper | content›intro›bg squiggles›right | 581x517 | `/assets/pages/whitepaper/right-581x517-4318d1.svg` | inline svg <use> resolved |
| whitepaper | — | 40x40 | `/assets/cradle-symbol-footer.svg (existing)` | inline svg (dup) |
| whitepaper | content›intro›bg squiggles›left | 389x313 | `/assets/pages/whitepaper/left-389x313-bb8cc6.svg` | inline svg <use> resolved |
| whitepaper | content›intro›bg squiggles›bottom | 450x424 | `/assets/pages/whitepaper/bottom-450x424-d1942a.svg` | inline svg <use> resolved |
| whitepaper | content›intro›bg squiggles›right | 290x259 | `/assets/pages/whitepaper/right-290x259-e34be8.svg` | inline svg <use> resolved |
| presskit | desktop light›nav›logo›Wordmark 2 | 78x22 | `/assets/logo-wordmark.png` | existing |
| presskit | content›Page title | 56x56 | `/assets/pages/presskit/page-title-56x56-12bca5.svg` | data-URI svg |
| presskit | content›Page title | 96x96 | `/assets/pages/presskit/page-title-96x96-ae7a4c.svg` | data-URI svg |
| presskit | content›Page title | 48x48 | `/assets/pages/presskit/page-title-48x48-fea7c7.svg` | data-URI svg |
| presskit | Logo›items›item›Variant 1 | 24x24 | `/assets/pages/presskit/variant-1-24x24-91b3e5.svg` | data-URI svg |
| presskit | Logo›items›item›Variant 1 | 24x24 | `/assets/pages/presskit/variant-1-24x24-1e5286.svg` | data-URI svg |
| presskit | UI›items›item›Variant 1 | 24x24 | `/assets/pages/presskit/variant-1-24x24-674b87.svg` | data-URI svg |
| presskit | nav›logo›logo›Cradle-symbol | 36x36 | `(reuse /assets/cradle-symbol.svg)` | data-URI |
| presskit | content›Page title›shimmer›shimmer | 43x139 | `/assets/pages/presskit/shimmer-43x139-03a4dd.svg` | inline svg <use> resolved |
| presskit | — | 40x40 | `/assets/cradle-symbol-footer.svg (existing)` | inline svg (dup) |
| presskit | Sections›Logo›items›item | 20x20 | `/assets/pages/presskit/item-20x20-fdc1c4.svg` | inline svg <use> resolved |
| links | — | 244x120 | `/assets/case-keasling-qs21.png` | existing |
| links | — | 244x120 | `/assets/case-therapeutic-peptides.png` | existing |
| links | — | 244x120 | `/assets/case-staph-aureus-vaccine.png` | existing |
| links | — | 244x120 | `/assets/case-igg-campaign.png` | existing |
| links | — | 244x120 | `/assets/cms/haloalkane-dehalogenase-thermostability.png` | CMS cover |
| links | — | 244x120 | `/assets/cms/polyspecific-anti-venom-vhhs.png` | CMS cover |
| links | video | 120x80 nat119x72 | `/assets/pages/links/video-PHAYVkrR.png` | https://framerusercontent.com/images/PHAYVkrRFaaDtMFrVC6DPhdDBmY.png |
| links | video | 120x80 nat119x67 | `/assets/pages/links/video-w2zATkuZ.png` | https://framerusercontent.com/images/w2zATkuZPvYqAoOzr84XrBkd6k.png |
| links | logo›logo›Cradle-symbol | 72x72 | `(reuse /assets/cradle-symbol.svg)` | data-URI |
| links | — | 130x32 | `/assets/pages/links/icon-130x32-5a733f.svg` | data-URI svg |
| links | antibody | 24x24 | `/assets/pages/links/antibody-24x24-757549.svg` | inline svg <use> resolved |
| links | bottle | 24x24 | `/assets/pages/links/bottle-24x24-43acf5.svg` | inline svg <use> resolved |
| links | — | 24x24 | `/assets/pages/links/icon-24x24-88eed1.svg` | inline svg <use> resolved |
| links | — | 24x24 | `/assets/pages/links/icon-24x24-66f3dc.svg` | inline svg <use> resolved |
| links | — | 24x24 | `/assets/pages/links/icon-24x24-7957ee.svg` | inline svg <use> resolved |
| links | video | 20x20 | `/assets/pages/links/video-20x20-63208f.svg` | inline svg <use> resolved |
| links | footer | 300x314 | `/assets/pages/links/footer-300x314-36e14f.svg` | inline svg <use> resolved |
| links | — | 114x28 | `/assets/pages/links/icon-114x28-3e856c.svg` | data-URI svg |
| links | antibody | 20x20 | `/assets/pages/links/antibody-20x20-97c11e.svg` | inline svg <use> resolved |
| links | bottle | 20x20 | `/assets/pages/links/bottle-20x20-0f637f.svg` | inline svg <use> resolved |
| links | footer | 188x196 | `/assets/pages/links/footer-188x196-f2337c.svg` | inline svg <use> resolved |
| notebook | video | 120x80 | `/assets/pages/links/video-PHAYVkrR.png` | dup |
| notebook | video | 120x80 | `/assets/pages/links/video-w2zATkuZ.png` | dup |
| notebook | logo›logo›Cradle-symbol | 72x72 | `(reuse /assets/cradle-symbol.svg)` | data-URI |
| notebook | — | 130x32 | `/assets/pages/links/icon-130x32-5a733f.svg` | data-URI svg (dup) |
| notebook | antibody | 24x24 | `/assets/pages/notebook/antibody-24x24-0775c9.svg` | inline svg <use> resolved |
| notebook | bottle | 24x24 | `/assets/pages/links/bottle-24x24-43acf5.svg` | inline svg (dup) |
| notebook | — | 24x24 | `/assets/pages/links/icon-24x24-88eed1.svg` | inline svg (dup) |
| notebook | — | 24x24 | `/assets/pages/links/icon-24x24-66f3dc.svg` | inline svg (dup) |
| notebook | — | 24x24 | `/assets/pages/links/icon-24x24-7957ee.svg` | inline svg (dup) |
| notebook | video | 20x20 | `/assets/pages/links/video-20x20-63208f.svg` | inline svg (dup) |
| notebook | footer | 300x314 | `/assets/pages/links/footer-300x314-36e14f.svg` | inline svg (dup) |
| notebook | — | 114x28 | `/assets/pages/links/icon-114x28-3e856c.svg` | data-URI svg (dup) |
| notebook | antibody | 20x20 | `/assets/pages/notebook/antibody-20x20-2b54f9.svg` | inline svg <use> resolved |
| notebook | bottle | 20x20 | `/assets/pages/links/bottle-20x20-0f637f.svg` | inline svg (dup) |
| notebook | footer | 188x196 | `/assets/pages/links/footer-188x196-f2337c.svg` | inline svg (dup) |
| shirt | platform-ui›Image 31 | 472x669 nat472x668 | `/assets/pages/shirt/image-31-vBTUyXNN.png` | https://framerusercontent.com/images/vBTUyXNNeFsTaL0Do00AJNpRY.png |
| shirt | platform-ui›bg squiggles›right | 717x727 | `/assets/hero-blob-right.png` | existing |
| shirt | platform-ui›bg squiggles›left | 778x626 | `/assets/hero-blob-left.png` | existing |
| shirt | video | 120x80 | `/assets/pages/links/video-PHAYVkrR.png` | dup |
| shirt | video | 120x80 | `/assets/pages/links/video-w2zATkuZ.png` | dup |
| shirt | logo›logo›Cradle-symbol | 72x72 | `(reuse /assets/cradle-symbol.svg)` | data-URI |
| shirt | — | 130x32 | `/assets/pages/links/icon-130x32-5a733f.svg` | data-URI svg (dup) |
| shirt | antibody | 24x24 | `/assets/pages/notebook/antibody-24x24-0775c9.svg` | inline svg (dup) |
| shirt | bottle | 24x24 | `/assets/pages/links/bottle-24x24-43acf5.svg` | inline svg (dup) |
| shirt | — | 24x24 | `/assets/pages/links/icon-24x24-88eed1.svg` | inline svg (dup) |
| shirt | — | 24x24 | `/assets/pages/links/icon-24x24-66f3dc.svg` | inline svg (dup) |
| shirt | — | 24x24 | `/assets/pages/links/icon-24x24-7957ee.svg` | inline svg (dup) |
| shirt | video | 20x20 | `/assets/pages/links/video-20x20-63208f.svg` | inline svg (dup) |
| shirt | footer | 300x314 | `/assets/pages/links/footer-300x314-36e14f.svg` | inline svg (dup) |
| shirt | — | 114x28 | `/assets/pages/links/icon-114x28-3e856c.svg` | data-URI svg (dup) |
| shirt | antibody | 20x20 | `/assets/pages/notebook/antibody-20x20-2b54f9.svg` | inline svg (dup) |
| shirt | bottle | 20x20 | `/assets/pages/links/bottle-20x20-0f637f.svg` | inline svg (dup) |
| shirt | footer | 188x196 | `/assets/pages/links/footer-188x196-f2337c.svg` | inline svg (dup) |
| licensing | desktop light›nav›logo›Wordmark 2 | 78x22 | `/assets/logo-wordmark.png` | existing |
| licensing | hero | 109x41 | `/assets/customer-logo-novonesis.svg` | existing |
| licensing | hero | 109x42 | `/assets/customer-logo-novo-nordisk.svg` | existing |
| licensing | hero | 109x41 | `/assets/customer-logo-jnj.svg` | existing |
| licensing | hero | 109x42 | `/assets/customer-logo-bayer.svg` | existing |
| licensing | hero | 109x20 | `/assets/customer-logo-abbvie.svg` | existing |
| licensing | hero | 109x42 | `/assets/customer-logo-hansa.svg` | existing |
| licensing | hero | 109x25 | `/assets/customer-logo-illumina.svg` | existing |
| licensing | hero | 109x42 | `/assets/customer-logo-csl.svg` | existing |
| licensing | hero | 109x42 | `/assets/customer-logo-lundbeck.svg` | existing |
| licensing | hero | 109x41 | `/assets/customer-logo-ultragenyx.svg` | existing |
| licensing | license-grid | 307x420 nat307x426 | `/assets/pages/licensing/license-grid-FwU6ZVTs.jpg` | https://framerusercontent.com/images/FwU6ZVTsTqTTGZvmmH4ruJ29mMU.jpg |
| licensing | license-grid | 307x200 nat306x230 | `/assets/pages/licensing/license-grid-FRS8jcOd.jpg` | https://framerusercontent.com/images/FRS8jcOd9TQ5O94AEMje92f1O1U.jpg |
| licensing | nav›logo›logo›Cradle-symbol | 36x36 | `(reuse /assets/cradle-symbol.svg)` | data-URI |
| licensing | hero›logo›Cradle-symbol | 72x72 | `(reuse /assets/cradle-symbol.svg)` | inline svg |
| licensing | end | 11x9 | `/assets/pages/licensing/end-11x9-b855c2.svg` | inline svg <use> resolved |
| licensing | — | 40x40 | `/assets/cradle-symbol-footer.svg (existing)` | inline svg (dup) |
| licensing | mobile | 10x8 | `/assets/pages/licensing/mobile-10x8-edd023.svg` | inline svg <use> resolved |
| dpa | desktop light›nav›logo›Wordmark 2 | 78x22 | `/assets/logo-wordmark.png` | existing |
| dpa | content›doc viewer›Page 1›Img | 595x842 | `NOT DOWNLOADED (DPA page scan = legal text, placeholder)` | https://framerusercontent.com/images/6aoe9bFy8G6pkkAmNk8KPcS8pE.jpg |
| dpa | content›doc viewer›Page 2›Img | 595x842 | `NOT DOWNLOADED (DPA page scan = legal text, placeholder)` | https://framerusercontent.com/images/O4cUax46I4PRhaXU87KUBmyJg0.jpg |
| dpa | content›doc viewer›Page 3›Img | 595x842 | `NOT DOWNLOADED (DPA page scan = legal text, placeholder)` | https://framerusercontent.com/images/U7vkZsEuGx59BM1WWl1SNJRoC8.jpg |
| dpa | content›doc viewer›Page 4›Img | 595x842 | `NOT DOWNLOADED (DPA page scan = legal text, placeholder)` | https://framerusercontent.com/images/vuG9iq7jqqwhkvec9zozmjbStG0.jpg |
| dpa | content›doc viewer›Page 5›Img | 595x842 | `NOT DOWNLOADED (DPA page scan = legal text, placeholder)` | https://framerusercontent.com/images/IcclfA9TLx9cAOUsE3iMbHHlRw.jpg |
| dpa | content›doc viewer›Page 6›Img | 595x842 | `NOT DOWNLOADED (DPA page scan = legal text, placeholder)` | https://framerusercontent.com/images/eIZe2k2BjmnykNkqfdhQ8w9CEsE.jpg |
| dpa | content›doc viewer›Page 7›Img | 595x842 | `NOT DOWNLOADED (DPA page scan = legal text, placeholder)` | https://framerusercontent.com/images/itbzfQoMXnH0kdpJ3OcOcAb91E.jpg |
| dpa | content›doc viewer›Page 8›Img | 595x842 | `NOT DOWNLOADED (DPA page scan = legal text, placeholder)` | https://framerusercontent.com/images/Ps1fG8BXpCmv4qXeulX95wZmi8.jpg |
| dpa | content›doc viewer›Page 9›Img | 595x842 | `NOT DOWNLOADED (DPA page scan = legal text, placeholder)` | https://framerusercontent.com/images/3A2fJ0sFapXFZcxbFfP3XC8Tk.jpg |
| dpa | content›doc viewer›Page 10›Img | 595x842 | `NOT DOWNLOADED (DPA page scan = legal text, placeholder)` | https://framerusercontent.com/images/xtFnNNlYupeZA2YOudI2jYrgG34.jpg |
| dpa | content›doc viewer›Page 11›Img | 595x842 | `NOT DOWNLOADED (DPA page scan = legal text, placeholder)` | https://framerusercontent.com/images/WShMDcU6mtBZdZysj6ALATSEA0.jpg |
| dpa | content›doc viewer›Page 12›Img | 595x842 | `NOT DOWNLOADED (DPA page scan = legal text, placeholder)` | https://framerusercontent.com/images/rX5DvbgixmnlZ5iGf8JzBAbw.jpg |
| dpa | content›doc viewer›Page 13›Img | 595x842 | `NOT DOWNLOADED (DPA page scan = legal text, placeholder)` | https://framerusercontent.com/images/FFE1rep25VlTqZ6jKWuHsfkoQs.jpg |
| dpa | content›doc viewer›Page 14›Img | 595x842 | `NOT DOWNLOADED (DPA page scan = legal text, placeholder)` | https://framerusercontent.com/images/YuPcbkOdbz6o5JZEaiBgStg2qM.jpg |
| dpa | content›doc viewer›Page 15›Img | 595x842 | `NOT DOWNLOADED (DPA page scan = legal text, placeholder)` | https://framerusercontent.com/images/unQYc18BNbkBsGRTpjavzMkVmQ.jpg |
| dpa | content›doc viewer›Page 16›Img | 595x842 | `NOT DOWNLOADED (DPA page scan = legal text, placeholder)` | https://framerusercontent.com/images/zYdrW3MkfEH2Q1jwFwOszbLtYgU.jpg |
| dpa | content›doc viewer›Page 17›Img | 595x842 | `NOT DOWNLOADED (DPA page scan = legal text, placeholder)` | https://framerusercontent.com/images/JyNj4seEKmdKPAvirdzebnbsj5I.jpg |
| dpa | nav›logo›logo›Cradle-symbol | 36x36 | `(reuse /assets/cradle-symbol.svg)` | data-URI |
| dpa | doc viewer›Page 1›Logo›Cradle-symbol | 108x108 | `(reuse /assets/cradle-symbol.svg)` | inline svg |
| dpa | — | 40x40 | `/assets/cradle-symbol-footer.svg (existing)` | inline svg (dup) |
| cms-authors | Constance | 20x20 (post header chip) | `/assets/cms/authors/constance-ferragu.png` | author avatar |
| cms-authors | Daan | 20x20 (post header chip) | `/assets/cms/authors/daan.jpg` | author avatar |
| cms-authors | Daniel | 20x20 (post header chip) | `/assets/cms/authors/daniel.jpg` | author avatar |
| cms-authors | Dave | 20x20 (post header chip) | `/assets/cms/authors/dave.jpg` | author avatar |
| cms-authors | Elise | 20x20 (post header chip) | `/assets/cms/authors/elise-de-reus.jpg` | author avatar |
| cms-authors | Emanuele | 20x20 (post header chip) | `/assets/cms/authors/emanuele.png` | author avatar |
| cms-authors | Franzi | 20x20 (post header chip) | `/assets/cms/authors/franzi.jpg` | author avatar |
| cms-authors | Gino | 20x20 (post header chip) | `/assets/cms/authors/gino.jpg` | author avatar |
| cms-authors | Harmen | 20x20 (post header chip) | `/assets/cms/authors/harmen-van-rossum.png` | author avatar |
| cms-authors | Jack | 20x20 (post header chip) | `/assets/cms/authors/jack.jpg` | author avatar |
| cms-authors | Jelle | 20x20 (post header chip) | `/assets/cms/authors/jelle-prins.png` | author avatar |
| cms-authors | Jinel | 20x20 (post header chip) | `/assets/cms/authors/jinel.jpg` | author avatar |
| cms-authors | Jonathan | 20x20 (post header chip) | `/assets/cms/authors/jonathan.jpg` | author avatar |
| cms-authors | Luba | 20x20 (post header chip) | `/assets/cms/authors/luba-protopopova.jpg` | author avatar |
| cms-authors | Michelle | 20x20 (post header chip) | `/assets/cms/authors/michelle.jpg` | author avatar |
| cms-authors | Nicolas | 20x20 (post header chip) | `/assets/cms/authors/nicolas.jpg` | author avatar |
| cms-authors | Nicolò | 20x20 (post header chip) | `/assets/cms/authors/nicolò.jpg` | author avatar |
| cms-authors | Noé | 20x20 (post header chip) | `/assets/cms/authors/noé.jpg` | author avatar |
| cms-authors | Patrick | 20x20 (post header chip) | `/assets/cms/authors/patrick.jpg` | author avatar |
| cms-authors | Paul | 20x20 (post header chip) | `/assets/cms/authors/paul.png` | author avatar |
| cms-authors | Richard | 20x20 (post header chip) | `/assets/cms/authors/richard.png` | author avatar |
| cms-authors | Stef | 20x20 (post header chip) | `/assets/cms/authors/stef.png` | author avatar |
| cms-authors | Sytske | 20x20 (post header chip) | `/assets/cms/authors/sytske.jpg` | author avatar |
| cms-authors | Thijs | 20x20 (post header chip) | `/assets/cms/authors/thijs.jpg` | author avatar |
| cms-authors | Thomas | 20x20 (post header chip) | `/assets/cms/authors/thomas.jpg` | author avatar |
| cms-authors | Toby | 20x20 (post header chip) | `/assets/cms/authors/toby.jpg` | author avatar |
