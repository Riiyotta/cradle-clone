import { POSTS, ph, phTitle, rng } from './blogData.js'
import { POST_OUTLINES } from './postOutlines.js'

// Placeholder article body for a CMS post (§B2.3). Structure follows the live outline of that post;
// every element type of the measured typography is guaranteed to appear at least once.
const REQUIRED = ['h2', 'h3', 'ul', 'blockquote', 'img', 'figure', 'CALLOUT']

// Posters for posts with an embedded video module (§B2.5). keasling-qs21's mave id matches the
// `keasling` CMS video exactly; the other three are Wistia embeds matched to the CMS video by topic.
const VIDEO_POSTER = {
  'keasling-qs21': '/assets/cms/video-keasling-poster.jpg',
  'visualizing-trade-offs-in-multi-property-protein-optimization': '/assets/cms/video-sankey-poster.jpg',
  'marcus-schindler': '/assets/cms/video-welcome-marcus-poster.jpg',
  'sample-tracking': '/assets/cms/video-lab-tracking-poster.jpg',
}

function withRequired(tokens) {
  const out = [...tokens]
  const has = (t) => (t === 'CALLOUT' ? out.some((x) => x === 'I' || x === 'W') : out.includes(t))
  const missing = REQUIRED.filter((t) => !has(t))
  missing.forEach((t, k) => {
    // insert after a paragraph roughly evenly spread through the body
    let at = Math.max(1, Math.round(((k + 1) * out.length) / (missing.length + 1)))
    while (at < out.length && out[at - 1] !== 'p') at++
    const ins = t === 'CALLOUT' ? ['I'] : t === 'h2' || t === 'h3' ? [t, 'p'] : [t]
    out.splice(at, 0, ...ins)
  })
  return out
}

export function buildBody(post) {
  const seed = post.slug
  const r = rng(seed + ':body')
  const others = POSTS.filter((p) => p.slug !== post.slug)
  const otherLink = () => others[Math.floor(r() * others.length)].path
  const tokens = withRequired((POST_OUTLINES[post.slug] || 'p,p,h2,p,p').split(','))

  const para = (n, s) => {
    const text = ph(n, s)
    const roll = r()
    if (roll < 0.25) {
      // same-site inline link (B12: blog posts stay local)
      const words = text.split(' ')
      const a = Math.max(2, Math.floor(r() * (words.length - 4)))
      return [words.slice(0, a).join(' ') + ' ', { link: words.slice(a, a + 3).join(' '), to: otherLink() }, ' ' + words.slice(a + 3).join(' ')]
    }
    if (roll < 0.4) {
      const words = text.split(' ')
      return [{ strong: words.slice(0, 3).join(' ') }, ' ' + words.slice(3).join(' ')]
    }
    return [text]
  }

  return tokens.map((t, i) => {
    const s = `${seed}:${i}`
    const len = (a, b) => a + Math.floor(r() * (b - a))
    switch (t) {
      case 'p':
      case 'h6':
        return { t: 'p', runs: para(len(180, 480), s) }
      case 'h2':
        return { t: 'h2', text: phTitle(len(10, 34), s) }
      case 'h3':
      case 'h4':
        return { t: 'h3', text: phTitle(len(10, 30), s) }
      case 'ul':
      case 'ol':
        return { t, items: [0, 1, 2].map((j) => [ph(len(50, 140), `${s}:${j}`)]) }
      case 'blockquote':
        return { t: 'blockquote', text: `“${ph(len(140, 280), s).replace(/\.$/, '')}.”`, cite: phTitle(len(14, 28), s + ':c') }
      case 'img':
      case 'K':
        return { t: 'img' }
      case 'figure': {
        const cols = r() < 0.5 ? 2 : 3
        const header = cols === 3
        const rows = Array.from({ length: header ? 4 : 6 }, (_, ri) =>
          Array.from({ length: cols }, (_, ci) => phTitle(ci === 0 ? len(6, 22) : len(6, 40), `${s}:${ri}:${ci}`)))
        return { t: 'table', rows, header }
      }
      case 'I': {
        const body = ph(len(220, 360), s).split(' ')
        const n = body.length
        return {
          t: 'I',
          title: phTitle(len(24, 44), s + ':t'),
          runs: [
            body.slice(0, Math.floor(n / 3)).join(' ') + ' ',
            { link: body.slice(Math.floor(n / 3), Math.floor(n / 3) + 2).join(' '), to: otherLink() },
            ' ' + body.slice(Math.floor(n / 3) + 2, n - 2).join(' ') + ' ',
            { link: 'Unfold', to: '/blog', last: true },
            '.',
          ],
        }
      }
      case 'W':
        return { t: 'W' }
      case 'V':
        return { t: 'V', poster: VIDEO_POSTER[post.slug] || post.cover }
      default:
        return { t: 'p', runs: [ph(len(180, 480), s)] }
    }
  })
}
