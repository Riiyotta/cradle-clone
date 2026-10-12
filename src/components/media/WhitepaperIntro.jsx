import { motion, useScroll, useTransform } from 'framer-motion'
import { CradleSymbol, BTN_BASE, SECONDARY_ON_DARK40 } from './shared.jsx'

// B6.1 Intro (dark): parallax letters, blurred squiggles, PaperStack callout.

// Scroll parallax (exact, linear): translateY = −k·scrollY
const LETTERS = [['C', 0.17], ['R', 0.07], ['A', 0.25], ['D', 0.10], ['L', 0.35], ['E', 0.13], ['-', 0.08], ['1', 0.24]]

// Glyph box = 8 equal columns of the row. Spot Mono advance with −0.04em = 0.5761em
// (live foreignObject viewBox 884.4/1535), so font-size = column width / 0.5761 = row width / 4.6088.
// 1440 → 295px font in 170×295 boxes; 390 → 75.9px in 43.8×75.9.
function Letter({ ch, k, scrollY }) {
  const y = useTransform(scrollY, (v) => -k * v)
  return (
    <div className="flex min-w-0 flex-1 items-center justify-center">
      <motion.div style={{ y }} className="w-full whitespace-nowrap font-mono font-medium leading-[1em] tracking-[-0.04em] text-white [font-size:calc(100cqw/4.6088)]">
        {ch}
      </motion.div>
    </div>
  )
}

const SPRING = { type: 'spring', bounce: 0.3, duration: 1 }

// Appear (exact) + scroll parallax translateY = +k·scrollY (they sink). Parallax sits on the outer
// element and the appear on the inner one, so the two transforms don't fight.
function Squiggle({ k, scrollY, className, initial, delay, children }) {
  const y = useTransform(scrollY, (v) => k * v)
  return (
    <motion.div style={{ y }} className={`absolute blur-[5px] ${className}`}>
      <motion.div initial={initial} animate={{ opacity: 1, scale: 1, x: 0, y: 0 }} transition={{ ...SPRING, delay }} className="h-full w-full">
        {children}
      </motion.div>
    </motion.div>
  )
}

export function PaperStack() {
  // B2.6 PaperStack at the whitepaper size: 80×78 box (padding-right 20).
  // Back sheet behind and to the right, front sheet rotated −3° on top.
  const widths = [15.9, 39.8, 39.8, 39.8, 39.8, 35.8, 39.8, 15.9, 39.8, 35.8]
  return (
    <div className="relative h-[78px] w-20 shrink-0" aria-hidden="true">
      <div className="absolute left-[25px] top-[5px] flex h-[68px] w-[53px] flex-col items-start gap-[4.4px] rounded-[2px] bg-white p-[6.6px] shadow-[rgba(0,0,0,.08)_0_.66px_8px_0]">
        {widths.map((w, i) => (
          <div key={i} className={`h-[2px] shrink-0 rounded-[8px] ${i === 6 ? 'bg-white' : 'bg-gray-200'}`} style={{ width: w }} />
        ))}
      </div>
      <div className="absolute left-[-2px] top-[-1.5px] z-[1] flex h-[81px] w-16 rotate-[-3deg] items-center justify-center rounded-[2px] bg-white shadow-[rgba(0,0,0,.08)_0_.66px_8px_0]">
        <CradleSymbol className="h-[43.1px] w-[43.1px]" />
      </div>
    </div>
  )
}

export function WhitepaperIntro() {
  const { scrollY } = useScroll()
  return (
    <section className="fborder misc-bb relative flex h-[720px] w-full flex-col items-center overflow-clip bg-ink pt-20 [--fb:1px_solid_rgba(255,255,255,.08)] md:h-[882px]">
      <div className="relative z-[2] flex h-full w-full flex-col items-center justify-end gap-5 px-5 pb-10 md:gap-2 md:px-10">
        <div className="flex w-full flex-1 items-end justify-center [container-type:inline-size] [mask-image:linear-gradient(270deg,rgba(0,0,0,.8)_10%,#000_60%)] [-webkit-mask-image:linear-gradient(270deg,rgba(0,0,0,.8)_10%,#000_60%)]">
          {LETTERS.map(([ch, k]) => <Letter key={ch} ch={ch} k={k} scrollY={scrollY} />)}
        </div>
        <div className="h-px w-full shrink-0 bg-white/[.12]" />
        <div className="flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between md:py-5 md:pl-5">
          <div className="flex items-center gap-6">
            <div className="hidden md:block"><PaperStack /></div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'linear' }}
              className="max-w-[450px] font-sans text-[14px] font-medium leading-[22.4px] tracking-[-0.28px] text-white/80 md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]"
            >
              An automated machine-learning framework for protein lead optimization — validated across antibodies, enzymes, peptides, vaccines, and gene-editing systems.
            </motion.p>
          </div>
          {/* "Read whitepaper" → bioRxiv is EXTERNAL: same visual, no href */}
          <span className={`${BTN_BASE} ${SECONDARY_ON_DARK40} w-full cursor-default md:w-auto`}>Read whitepaper</span>
        </div>
      </div>

      {/* bg squiggles (z1). Container rect and mask measured live (not in the B6.1 text). */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-[-118px] right-[-118px] top-[-124px] z-[1] overflow-clip [mask-image:linear-gradient(#000_35%,rgba(0,0,0,.5)_96%)] [-webkit-mask-image:linear-gradient(#000_35%,rgba(0,0,0,.5)_96%)] md:top-[-18px]">
        <Squiggle k={0.5} scrollY={scrollY} delay={0.2} initial={{ opacity: 0.001, scale: 0.8, x: -20, y: 20 }}
          className="left-[-145px] top-[310px] h-[313px] w-[389px] md:left-[-280px] md:top-[173px] md:h-[626px] md:w-[778px]">
          <img src="/assets/pages/whitepaper/left-389x313-bb8cc6.svg" alt="" className="h-full w-full md:hidden" />
          <img src="/assets/pages/whitepaper/left-777x626-e4555f.svg" alt="" className="hidden h-full w-full md:block" />
        </Squiggle>
        <Squiggle k={0.2} scrollY={scrollY} delay={0.4} initial={{ opacity: 0.001, scale: 0.8, y: 40 }}
          className="left-[305px] top-[487px] h-[263px] w-[417px] md:left-[56px] md:top-[591px] md:h-[527px] md:w-[834px]">
          <div className="flex h-full w-full items-center justify-center py-[30px] md:py-[60px]">
            <img src="/assets/pages/whitepaper/bottom-450x424-d1942a.svg" alt="" className="h-[203px] w-[417px] max-w-none rotate-[-40deg] md:hidden" />
            <img src="/assets/pages/whitepaper/bottom-900x848-fe16a0.svg" alt="" className="hidden h-[406px] w-[834px] max-w-none rotate-[-40deg] md:block" />
          </div>
        </Squiggle>
        <Squiggle k={0.4} scrollY={scrollY} delay={0.6} initial={{ opacity: 0.001, x: 20, y: 30 }}
          className="right-[-49px] top-[175px] h-[259px] w-[291px] md:right-[-84px] md:top-[173.5px] md:h-[517px] md:w-[581px]">
          <img src="/assets/pages/whitepaper/right-290x259-e34be8.svg" alt="" className="h-full w-full md:hidden" />
          <img src="/assets/pages/whitepaper/right-581x517-4318d1.svg" alt="" className="hidden h-full w-full md:block" />
        </Squiggle>
      </div>
    </section>
  )
}
