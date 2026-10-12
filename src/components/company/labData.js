// /lab L6 team selector data (specs/PAGES_A.md L6). Names, roles and equipment are verbatim;
// quotes and equipment descriptions are neutral placeholders (spec gives length only).
const L = '/assets/pages/lab/'

const QUOTE = 'Placeholder quote about a favourite piece of lab equipment. It explains in a few friendly sentences what the device does, how it fits into the daily work in the lab, and why it stands out among all the other instruments on the bench. The text is neutral filler written only to match the length of the original quote.'
const DESC = 'Placeholder description of the instrument and how the lab uses it in day-to-day experiments, written to match the length of the original text.'

export const LAB_MEMBERS = [
  { name: 'Harmen', role: 'Co-founder Bioengineering', equipment: 'Formulatrix Mantis liquid handler', photo: `${L}selected-avatar-b9QMOd.jpg`, tile: `${L}selected-avatar-b9QMOd.jpg`, device: `${L}variant-1-MTK25R.png` },
  { name: 'Jinel', role: 'Scientist', equipment: 'Tecan Spark', photo: `${L}off-mLppC4.jpg`, tile: `${L}off-mLppC4.jpg`, device: `${L}equipment-tecan-spark-8P2hOZ.png` },
  { name: 'Daan', role: 'Research Associate', equipment: 'Nanopore MinION sequencer', photo: `${L}off-7V4MvM.jpg`, tile: `${L}off-7V4MvM.jpg`, device: `${L}equipment-nanopore-minion-xDoyd6.png` },
  { name: 'Michelle', role: 'Research Associate', equipment: 'Carterra LSA-XT', photo: `${L}off-lIyM8G.jpg`, tile: `${L}off-lIyM8G.jpg`, device: `${L}equipment-carterra-lsa-IPgXoI.png` },
  { name: 'Angela', role: 'Antibody Scientist', equipment: 'Pixl colony picker', photo: `${L}selected-avatar-angela-547wKt.jpg`, tile: `${L}off-zOEpQv.jpg`, device: `${L}equipment-pixl-Ixka2X.png` },
  { name: 'Catalina', role: 'Research Associate', equipment: 'Integra Voyager multichannel pipette', photo: `${L}off-mx3TLf.jpg`, tile: `${L}off-mx3TLf.jpg`, device: `${L}equipment-integra-voyager-h11ydQ.png` },
  { name: 'Nicolò', role: 'Scientist', equipment: 'FACS', photo: `${L}off-Jgf57m.jpg`, tile: `${L}off-Jgf57m.jpg`, device: `${L}equipment-facs-78mflo.png` },
].map((m) => ({ ...m, quote: QUOTE, description: DESC }))

// Phone grid adds Janis (live phone order)
export const LAB_PHONE_TILES = [
  ['Harmen', `${L}selected-avatar-b9QMOd.jpg`], ['Jinel', `${L}off-mLppC4.jpg`],
  ['Daan', `${L}off-7V4MvM.jpg`], ['Michelle', `${L}off-lIyM8G.jpg`],
  ['Janis', `${L}off-ihfeJt.jpg`], ['Angela', `${L}off-zOEpQv.jpg`],
  ['Catalina', `${L}off-mx3TLf.jpg`], ['Nicolò', `${L}off-Jgf57m.jpg`],
]

export const LAB_POSTS = [
  ['Optimizing across the entire batch is one secret to better proteins', '/blog/optimizing-entire-batch', `${L}cradle-dbtl-cycle-Jipxhi.png`],
  ['How does AI change the first round of antibody optimization?', '/blog/antibody-first-round', `${L}cradle-dbtl-cycle-7LXf4G.png`],
  ['From picking favorites to designing experiments: how ML rethinks variant selection', '/blog/variant-selection-with-ml', `${L}cradle-dbtl-cycle-IMvEP1.png`],
  ['Zero-shot antibody diversification with Cradle', '/blog/zero-shot', `${L}cradle-dbtl-cycle-p58PfR.png`],
]

// L7 floating cards: offsets relative to the 550-wide text column (top = H2 top), measured on live at 1440.
export const FLOATING = [
  { key: 'tr', x: 575, y: -120, w: 215, radius: 8, title: 'Backbone of high-throughput experimentation: Design principles for ML-ready sample tracking', titleCls: 'text-[13px] leading-[16.9px]', gap: 8, to: '/blog/sample-tracking', img: '/assets/blog-sample-tracking.jpg', ar: 215 / 129, glow: { y: 34, op: 0.5, blur: 16, r: 6 }, delay: 0 },
  { key: 'tl', x: -170, y: -129, w: 159, radius: 6, title: 'Lab automation for faster ML-driven protein engineering', titleCls: 'text-[10px] leading-[13px]', gap: 6, to: '/blog/webinar-lab-automation', img: '/assets/blog-webinar-lab-automation.jpg', ar: 159 / 95.4, glow: { y: 0, op: 1, blur: 20, r: 5 }, delay: 0.2 },
  { key: 'br', x: 527, y: 482, w: 143, radius: 6, title: 'SLAS 2025: A Peek at The Future of Lab Automation', titleCls: 'text-[9px] leading-[11.7px]', gap: 6, to: '/blog/slas2025', img: `${L}bottom-right-Jyybc4.jpg`, ar: 143 / 85.8, glow: { y: -13, op: 0.9, blur: 20, r: 4 }, delay: 0.4 },
  { key: 'bl', x: -211, y: 469, w: 143, radius: 6, title: 'We put our CTO in a lab coat. Here’s what happened next.', titleCls: 'text-[10px] leading-[13px]', gap: 8, to: '/blog/beyond-the-bench', img: '/assets/blog-beyond-the-bench.png', ar: 143 / 85.8, glow: { y: 0, op: 1, blur: 20, r: 4 }, delay: 0.5 },
]
