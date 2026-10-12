// PAGES_B §B11 doc viewer. The 17 DPA page scans are legal text → neutral placeholder sheets.
// Card 595×842 (phone 270×382.1): white, shadow 0 1px 8px rgba(0,0,0,.08), ::after 1px rgba(0,0,0,.12).
// Centered 108×108 Cradle symbol (z1) sits under the page layer (z2), as on live.
// Placeholder line metrics are read off reference/pages/dpa-1440.png (1:1): text block x 48.5…545.5,
// first (title) line at y≈83, ≈13px line pitch, extra ≈13px between paragraphs. Bars are 6px tall #e5e7eb.

const PAGE_COUNT = 17
const W = 595
const H = 842
const PITCH = 13
const BOTTOM = 72

function rng(seed) {
  let s = seed * 9301 + 49297
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280)
}

function pageLines(n) {
  const r = rng(n + 1)
  const out = []
  let y = 83
  if (n === 0) {
    out.push({ y, x: (W - 122) / 2, w: 122 }) // centered title
    y += PITCH * 2
  }
  while (y + PITCH < H - BOTTOM) {
    const count = 1 + Math.floor(r() * 7)
    const indent = r() < 0.35 ? 20 : 0
    for (let i = 0; i < count && y + PITCH < H - BOTTOM; i++) {
      const last = i === count - 1
      const x = 48.5 + (i === 0 ? indent : 0)
      const full = 497 - (i === 0 ? indent : 0)
      out.push({ y, x, w: last ? Math.round(full * (0.25 + r() * 0.6)) : full })
      y += PITCH
    }
    y += PITCH
  }
  return out
}

const PAGES = Array.from({ length: PAGE_COUNT }, (_, i) => pageLines(i))

function Sheet({ lines }) {
  return (
    <div className="absolute left-0 top-0 z-[2] bg-white origin-top-left scale-[0.453782] md:scale-100" style={{ width: W, height: H }}>
      {lines.map((l, i) => (
        <div key={i} className="absolute h-[6px] rounded-[1px] bg-gray-200" style={{ left: l.x, top: l.y, width: l.w }} />
      ))}
    </div>
  )
}

export default function DocViewer() {
  return (
    <div className="w-full max-w-container h-[506.4px] md:h-[720px] bg-gray-100 rounded-2xl p-10 overflow-auto flex flex-col items-center gap-5">
      {PAGES.map((lines, i) => (
        <div
          key={i}
          aria-label={`Page ${i + 1}`}
          className="fborder relative shrink-0 w-[270px] h-[382.1px] md:w-[595px] md:h-[842px] bg-white shadow-[0_1px_8px_0_rgba(0,0,0,.08)] overflow-hidden flex items-center justify-center"
          style={{ '--fb': '1px solid rgba(0,0,0,.12)' }}
        >
          <div className="relative z-[1] w-[108px] h-[108px] bg-contain bg-no-repeat" style={{ backgroundImage: 'url(/assets/cradle-symbol.svg)' }} />
          <Sheet lines={lines} />
        </div>
      ))}
    </div>
  )
}
