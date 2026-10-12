import { motion } from 'framer-motion'
import logo7 from './assets/trust-logo-7.svg'

// PAGES_A /get-started G3 TrustTicker (also /contact C3)
const P = '/assets/pages/get-started/'
// [file, w, h, mask?] — desktop rendered sizes; cells are logo + 32px horizontal padding
const LOGOS = [
  [P + 'datauri-1-e34499.svg', 55, 44, true],
  [P + 'datauri-johnson-johnson-462200.svg', 127, 48, true],
  [P + 'datauri-1-3c001c.svg', 109, 20.6, true],
  [P + 'datauri-3-650741.svg', 35, 24, true],
  [P + 'datauri-4-070511.svg', 120, 45, true],
  [P + 'datauri-5-164964.svg', 103, 38.6, false],
  [P + 'datauri-6-d6d3f4.svg', 120, 45, true],
  [logo7, 96, 36, false],
]
const GAP = 30
// one set = cells (w + 32) + gap after each item
const SET_W = LOGOS.reduce((s, [, w]) => s + w + 32 + GAP, 0)
const SPEED = 20 // px/s (measured −17.6px / 0.9s)

function Logo({ src, w, h, mask, scale = 1 }) {
  const style = { width: w * scale, height: h * scale }
  if (!mask) return <img src={src} alt="" style={style} className="shrink-0" />
  return (
    <div
      style={{ ...style, WebkitMaskImage: `url("${src}")`, maskImage: `url("${src}")`, WebkitMaskSize: '100% 100%', maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' }}
      className="shrink-0 bg-ink"
    />
  )
}

export default function TrustTicker() {
  return (
    <section className="w-full bg-gray-100 px-5 pb-20">
      <div className="mx-auto flex max-w-[1040px] flex-col items-center border-t border-black/[.04] px-5 pt-[60px] md:flex-row md:gap-10 md:pt-[30px]">
        <p className="hidden w-[196px] shrink-0 font-sans text-[16px] font-medium leading-[25.6px] tracking-[-0.32px] text-muted md:block">
          <span className="text-ink/60">Cradle is used and trusted</span><br />
          <span className="text-ink/60">by leading R&amp;D teams</span>
        </p>
        <p className="w-full text-center font-sans text-[14px] font-medium leading-[22.4px] tracking-[-0.28px] text-ink/60 md:hidden">
          Used and trusted by leading R&amp;D teams
        </p>

        {/* Desktop/tablet: marquee */}
        <motion.div
          className="trust-ticker-mask hidden h-[72px] min-w-0 flex-1 overflow-hidden opacity-60 md:block"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 0.6, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.12, 0.23, 0.5, 1] }}
        >
          <motion.ul
            className="m-0 flex h-full w-max list-none p-0"
            animate={{ x: [0, -SET_W] }}
            transition={{ duration: SET_W / SPEED, ease: 'linear', repeat: Infinity }}
          >
            {[0, 1].map((copy) =>
              LOGOS.map(([src, w, h, mask], i) => (
                <li key={`${copy}-${i}`} aria-hidden={copy === 1} className="flex h-[72px] shrink-0 items-center justify-center px-4" style={{ marginRight: GAP }}>
                  <Logo src={src} w={w} h={h} mask={mask} />
                </li>
              ))
            )}
          </motion.ul>
        </motion.div>

        {/* Phone: static 4×2 grid, cells 77.5×72, logos ≈ desktop × 0.442 (img 5: 103 → 45.5) */}
        <ul className="m-0 grid w-full max-w-[310px] list-none grid-cols-4 p-0 opacity-60 md:hidden">
          {LOGOS.map(([src, w, h, mask], i) => (
            <li key={i} className="flex h-[72px] items-center justify-center">
              <Logo src={src} w={w} h={h} mask={mask} scale={45.5 / 103} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
