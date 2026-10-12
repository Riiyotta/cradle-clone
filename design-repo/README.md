# Cradle design-repo

A machine-validated PageSpec system for the Cradle marketing site (a real company's public website). A generator composes pages from 98 section contracts, 26 templates and 101 routes without inventing colours, copy budgets, sections or assets. Everything here is derived from the local clone (`src/`, `CLONE_SPEC.md`, `ia.json`), not guessed.

Status: **design-review-pending**, `productionApproved: false`.

## Counts (recomputed from disk by `extraction/verify_all.py`)

| what | count |
|---|---|
| section contracts | 98 |
| templates | 26 |
| routes | 101 |
| primitives | 8 |
| components | 9 |
| graph rules | 15 |
| asset roles | 15 |
| registered assets | 457 |
| foundation tokens | 185 |
| semantic tokens | 23 |

## Layout

- `tokens/00-foundation` colour, typography, radius, spacing, breakpoint, elevation, icon-size, motion. Values come from histograms over `src/` and from `tailwind.config.js` / `CLONE_SPEC.md`; each carries a usage count and a citation.
- `tokens/10-semantic`, `tokens/20-component`, `tokens/30-layout`, `tokens/themes` (light, dark) resolve roles down to foundation values.
- `tokens/llm/component-allowlist.json` closed list of what a generator may use or set. `tokens/llm/asset-roles.json` closed asset-role registry with generation/licensing policy.
- `primitives/`, `components/` generic building blocks, each citing the code that implements it.
- `sections/` one contract per section type: content fields with `maxWords`, allowed templates, variants, media roles, motion patterns with reduced-motion fallbacks, and a structured `responsive` block.
- `templates/templates.json` explicit node sequences; `templates/routes.json` every route with its measured navbar/footer variants.
- `compatibility/graph.json` rhythm and structure rules, each `error` or `warn`.
- `schema/pagespec.schema.json` Draft-07 contract; `schema/semantic_validate.py` what the schema cannot express; `schema/tests/adversarial_test.py` proof that each rule rejects a bad instance.
- `extraction/measured-values.json` every citation with an anchor string; `extraction/verify_all.py` the integrity check.

## Using it

```bash
pip install jsonschema                    # only dependency
python3 extraction/verify_all.py          # full integrity check (includes the adversarial suite)
python3 schema/semantic_validate.py my.pagespec.json
```

A PageSpec names a `template`, a `route`, and `nodes` that must equal that template's node list. See `schema/example.pagespec.json` (the homepage).

## Things that are unusual about this source (read before generating)

- **Source is a real company's live site.** Real customer logos, employee/author photos, case-study covers and lab photos must never be generated or attributed to anyone else. `tokens/llm/asset-roles.json` enforces this: roles with policy `must-reuse-exact` / `must-not-fabricate` only accept a registered file as `assetRef` (pinned-value check); only `ui-icon`, `hero-blob` and `placeholder` may be generated. Real people's names present in the clone's team data are deliberately not copied into any example.
- **No outbound links.** The clone renders external anchors as plain buttons and its forms submit nowhere (no `fetch`/`action` in `src/`). The `NO_EXTERNAL_LINKS` rule forbids any URL, `mailto:` or protocol-relative link in a PageSpec; CTA `href`s must be same-site paths.
- **Reduced motion is a generation-time contract, not an observed behaviour.** The source contains no `useReducedMotion` / `prefers-reduced-motion` handling. Every node must still declare a `reducedMotionFallback` mapped to its pattern so that *new* pages degrade safely. All motion is framer-motion JS (no CSS keyframes), so motion patterns are named after the JS behaviour measured in `CLONE_SPEC.md` section 14.
- **Tablet (810-1199px) was not measured on the live site** (CLONE_SPEC section 17). Responsive blocks describe the classes the clone actually uses at `md`/`lg`, not a measured tablet layout.
- **Template nodes are all `required: true, repeatable: false`.** The source shows no optional or repeated section within a template, so none is invented. Two templates (`template.blog-post`, `template.video-post`) cover {53+20} CMS pages; their content is referenced by `{collection, slug}`.
- **16 sections have an empty content contract** (chrome.footer, company.investors, company.open-positions, company.perks, company.photo-mosaic, content.footer-graphic, content.policy-body, content.whitepaper-body, hero.blog, hero.form-page, hero.shirt, hero.whitepaper, product.product-mock, product.ui-collage, proof.case-quote, proof.logo-ticker). Their copy is fixed inside the component or its children, so the contract exposes media and motion only rather than inventing editable fields.
- **Content contracts are derived statically** from literal JSX text, data arrays and component prop signatures; fields are typed at depth 1-2. Word budgets are `max(observed+2, ceil(observed*1.5))` (field `measuredMax` records the observed maximum); where no literal exists the budget is the site-wide observed maximum for that key name (`budgetBasis`).
- **No per-instance token overrides**: the PageSpec schema has no such field, so the allowlist's `tokenOverrides` is empty by design.
- **Three routes are not in the live sitemap**: `/video` (exists as a page, noted in the IA), and `/legal-terms` and `/privacy-policy` (placeholder pages in the clone whose navbar/footer were not measured on live; `src/chrome.js` styles them like `/dpa`). They are included so every clone route maps to a template.
- A scroll-linked motion budget of 2 nodes per page is the most any real template allows.

## Delivery

Zip with the CLI (`zip -r design-repo.zip design-repo -x '*.DS_Store' -x '__MACOSX*'`), regenerate it last, and do not commit it (`.gitignore` lists `design-repo.zip`).
