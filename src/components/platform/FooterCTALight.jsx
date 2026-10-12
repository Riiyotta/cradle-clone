import { motion } from 'framer-motion'
import { H2, LinkButton, BTN_PRIMARY, BTN_SECONDARY36, BTN_SECONDARY48, useBreakpoint } from './shared.jsx'

// PAGES_A /platform P11 Footer CTA light variant (FooterCTALight); structure from CLONE_SPEC §13.
// Screens band: columns 25% / 50% / 25%; images aspect 1.61176 overflow their columns (sides 327%, middle 164%).
const IMG = 'absolute inset-0 h-full w-full rounded-[inherit] object-cover object-[50%_0]'
const BACK = [0.7, -0.35, 0.3, 1.1]

export default function FooterCTALight() {
  const bp = useBreakpoint()
  const dy = bp === 'phone' ? 40 : 80
  const slide = (x, delay) => ({
    initial: { x, y: dy },
    whileInView: { x: 0, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: BACK, delay },
  })
  const btn = 'h-9 w-full rounded-lg px-8 text-[13px] leading-[15.6px] tracking-[-0.13px] md:h-12 md:w-[320px] md:rounded-xl md:text-[18px] md:leading-[27px] md:tracking-normal lg:text-[16px] lg:leading-6'

  return (
    <section className="relative flex w-full flex-col items-center gap-20 overflow-hidden bg-[linear-gradient(#fff_0%,#f9fafb_100%)] px-5 pt-10 md:px-10 md:pt-[200px]">
      <div className="flex w-full max-w-container flex-col items-center gap-10">
        <h2 className={`w-full text-center ${H2}`}>
          Want faster results?<br />Talk to our team<span className="hidden md:inline"> today</span>.
        </h2>
        <div className="flex w-full flex-col items-center gap-2 rounded-2xl p-1 md:w-[328px] md:gap-5">
          <LinkButton to="/get-started" className={`${btn} ${BTN_PRIMARY}`}>Talk to sales</LinkButton>
          <LinkButton to="/solutions/academia" className={`${btn} ${BTN_SECONDARY36} md:bg-[linear-gradient(180deg,#fff_0%,#f9fafb_100%)] md:text-gray-800 md:hover:bg-[linear-gradient(#f9fafb,#f3f4f6)]`}>Academic program</LinkButton>
        </div>
      </div>

      <div className="relative z-[1] flex h-[120px] w-full items-start justify-center md:h-[288px] md:max-w-[584px] lg:h-[360px] lg:max-w-[880px]">
        {/* left: report */}
        <div className="relative z-[1] flex h-[110px] w-1/4 flex-col items-center justify-center pt-10 md:h-auto md:pt-8 lg:pt-10">
          <motion.div {...slide(20, 0.2)} className="relative aspect-[1.61176] w-[327%] shrink-0 overflow-hidden rounded-lg shadow-[0_1px_8px_0_rgba(0,0,0,.08)] md:rounded-none md:rounded-t-[10px] md:opacity-90 md:shadow-[0_0_8px_0_rgba(0,0,0,.04)] lg:rounded-t-xl">
            <img src="/assets/ui-report-cta.png" alt="Generation report" className={IMG} />
          </motion.div>
        </div>
        {/* middle: round */}
        <div className="relative z-[3] flex h-[110px] w-1/2 shrink-0 flex-col items-center justify-center md:h-auto">
          <motion.div {...slide(0, 0)} className="relative aspect-[1.61176] w-[164%] shrink-0 overflow-hidden rounded-[6px_6px_8px_8px] shadow-[0_1px_8px_0_rgba(0,0,0,.08)] md:rounded-none md:rounded-t-[10px] md:shadow-[0_0.8px_16px_0_rgba(0,0,0,.08)] lg:rounded-t-xl lg:shadow-[0_1px_16px_0_rgba(0,0,0,.08)]">
            <img src="/assets/ui-round.png" alt="Round view" className={IMG} />
          </motion.div>
        </div>
        {/* gradient band (z 4) */}
        <div className="pointer-events-none absolute -bottom-[150px] -left-[155px] z-[4] flex h-[360px] w-[200%] items-center justify-center md:-left-[400px] md:bottom-0 md:h-full">
          <div className="h-full w-[200%] shrink-0 bg-[linear-gradient(rgba(255,255,255,0)_51%,rgba(3,7,18,.08)_100%)]" />
        </div>
        {/* right: data */}
        <div className="relative z-[1] flex h-[110px] w-1/4 flex-col items-center justify-center pt-20 md:h-auto md:pt-16 lg:pt-20">
          <motion.div {...slide(-20, 0.1)} className="relative aspect-[1.61176] w-[327%] shrink-0 overflow-hidden rounded-lg shadow-[0_1px_8px_0_rgba(0,0,0,.08)] md:rounded-none md:rounded-t-[10px] md:opacity-[0.85] md:shadow-none lg:rounded-t-xl">
            <img src="/assets/ui-data.png" alt="Data view" className={IMG} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
