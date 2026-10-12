// Route → site-chrome variant table (single source of truth).
// Measured on live www.cradle.bio 2026-10-12 at 1440 (desktop) and 390 (phone) with Playwright:
// the Framer variant names were 'Desktop-dark' / 'desktop light' / 'academia' and
// 'mobile-dark-closed' / 'mobile-light-closed'.
//
// nav:    { desktop, phone } — 'dark' | 'light' | 'academia' (dark styling, bar bg #1f5f36; desktop only)
//         null = no navbar
// footer: 'blue' (#224eee, homepage) | 'dark' (#030712) | 'accent' (#2d66f8, modality pages) | null = no footer

const DARK = { desktop: 'dark', phone: 'dark' }
const LIGHT = { desktop: 'light', phone: 'light' }
const DARK_DESKTOP_LIGHT_PHONE = { desktop: 'dark', phone: 'light' }

// First match wins. `prefix: true` matches the path and everything below it.
export const CHROME = [
  { path: '/', nav: DARK, footer: 'blue' },
  // link-in-bio pages: no chrome
  { path: '/links', nav: null, footer: null },
  { path: '/notebook', nav: null, footer: null },
  { path: '/shirt', nav: null, footer: null },
  // PAGES_A (live differs from PAGES_A §G0, which says "identical on all pages")
  { path: '/platform', nav: DARK, footer: 'dark' },
  { path: '/solutions/biopharma', nav: DARK, footer: 'dark' },
  { path: '/solutions/industrial', nav: DARK, footer: 'dark' },
  { path: '/solutions/academia', nav: { desktop: 'academia', phone: 'light' }, footer: 'dark' },
  { path: '/modality', prefix: true, nav: DARK, footer: 'accent' },
  { path: '/team', nav: LIGHT, footer: 'dark' },
  { path: '/careers', nav: LIGHT, footer: 'dark' },
  { path: '/lab', nav: LIGHT, footer: 'dark' },
  { path: '/case', nav: LIGHT, footer: 'dark' },
  { path: '/security', nav: DARK_DESKTOP_LIGHT_PHONE, footer: 'dark' },
  { path: '/get-started', nav: LIGHT, footer: 'dark' },
  { path: '/contact', nav: LIGHT, footer: 'dark' },
  // PAGES_B
  { path: '/blog/maturity', nav: DARK, footer: 'dark' },
  { path: '/blog', prefix: true, nav: LIGHT, footer: 'dark' },
  { path: '/video', prefix: true, nav: DARK_DESKTOP_LIGHT_PHONE, footer: 'dark' },
  { path: '/whitepaper', nav: DARK, footer: 'dark' },
  { path: '/presskit', nav: LIGHT, footer: 'dark' },
  { path: '/licensing', nav: LIGHT, footer: 'dark' },
  { path: '/dpa', nav: LIGHT, footer: 'dark' },
]

// Unknown routes (404) were not measured; they fall back to the homepage chrome.
const FALLBACK = { nav: DARK, footer: 'blue' }

export function chromeFor(pathname) {
  const p = pathname.replace(/\/+$/, '') || '/'
  return CHROME.find((r) => p === r.path || (r.prefix && p.startsWith(r.path + '/'))) || FALLBACK
}
