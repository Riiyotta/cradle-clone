import cms from '../../data/cms.json'

// PAGES_B §B1/§B2 — every list on the blog pages is generated from cms.json.
export const POSTS = cms.blog
export const POST_BY_SLUG = Object.fromEntries(POSTS.map((p) => [p.slug, p]))
export const MATURITY = cms.pages.find((p) => p.slug === 'maturity')

// §B1.5 rails
export const CASE_RAIL = POSTS.filter((p) => p.categories.includes('Case studies')).slice(0, 4) // desktop shows 3, mobile 4
export const NEWS_RAIL = ['aintibody', 'hansa', 'guided-rounds'].map((s) => POST_BY_SLUG[s]) // hard-coded per spec
export const TEAM_RAIL = POSTS.filter((p) => p.categories.includes('Stories')).slice(0, 3)

// §B2.4 "Recent posts": live order on every post + /blog/maturity (not strictly by date).
export const RECENT = ['aintibody', 'hansa', 'optimizing-entire-batch', 'antibody-first-round', 'variant-selection-with-ml'].map((s) => POST_BY_SLUG[s])

// Author avatars (§B2.2, PAGES_B_ASSETS "cms-authors")
const AVATAR = {
  Constance: 'constance-ferragu.png', Daan: 'daan.jpg', Daniel: 'daniel.jpg', Dave: 'dave.jpg', Elise: 'elise-de-reus.jpg',
  Emanuele: 'emanuele.png', Franzi: 'franzi.jpg', Gino: 'gino.jpg', Harmen: 'harmen-van-rossum.png', Jack: 'jack.jpg',
  Jelle: 'jelle-prins.png', Jinel: 'jinel.jpg', Jonathan: 'jonathan.jpg', Luba: 'luba-protopopova.jpg', Michelle: 'michelle.jpg',
  Nicolas: 'nicolas.jpg', 'Nicolò': 'nicolò.jpg', 'Noé': 'noé.jpg', Patrick: 'patrick.jpg', Paul: 'paul.png', Richard: 'richard.png',
  Stef: 'stef.png', Sytske: 'sytske.jpg', Thijs: 'thijs.jpg', Thomas: 'thomas.jpg', Toby: 'toby.jpg',
}
export const avatarFor = (name) => (AVATAR[name] ? `/assets/cms/authors/${encodeURI(AVATAR[name])}` : null)

// Dates are calendar dates; format in UTC so they never shift by timezone.
const fmt = (iso, month) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', { month, day: 'numeric', year: 'numeric', timeZone: 'UTC' })
export const shortDate = (iso) => fmt(iso, 'short') // "Oct 12, 2026"
export const longDate = (iso) => fmt(iso, 'long') // "November 26, 2024"

// ---- Neutral placeholder text (deterministic per seed) ----
const WORDS = ('lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ' +
  'enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit ' +
  'voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit ' +
  'anim id est laborum curabitur pretium tincidunt lacus nunc pulvinar sapien ligula viverra orci sagittis eu volutpat odio facilisis mauris ' +
  'vitae ultricies leo integer malesuada placerat vestibulum rhoncus mattis porta lectus gravida quam pellentesque nec nam aliquam').split(' ')

export function rng(seed) {
  let h = 2166136261
  for (const c of String(seed)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) }
  return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 100000) / 100000 }
}

// Placeholder text of ~n characters, sentence-cased, ending with a period.
export function ph(n, seed) {
  const r = rng(seed)
  let out = ''
  let sentence = 0
  while (out.length < n) {
    let w = WORDS[Math.floor(r() * WORDS.length)]
    if (sentence === 0) w = w[0].toUpperCase() + w.slice(1)
    out += (out ? ' ' : '') + w
    sentence++
    if (sentence > 7 && r() < 0.18 && out.length < n - 12) { out += '.'; sentence = 0 }
  }
  return out.replace(/[.]?$/, '.')
}

// Placeholder heading/title of ~n characters, no trailing period.
export const phTitle = (n, seed) => ph(n, seed).replace(/\.$/, '').replace(/\./g, '')

// Featured card / post header intro (CMS `Intro` field is not in cms.json).
export const introFor = (slug) => ph(170 + Math.floor(rng(slug + ':i')() * 30), slug + ':intro') // featured card (2-line clamp ≥810)
export const shortIntroFor = (slug) => ph(50 + Math.floor(rng(slug + ':i')() * 60), slug + ':intro') // post header
