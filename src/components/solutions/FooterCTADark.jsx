import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Btn, EASE_BACK, useIsPhone } from './primitives.jsx'

// B8 / I8 FooterCTA variant `dark` (structure = homepage CLONE_SPEC §13, built locally so the homepage file stays untouched).
// bg linear-gradient(#030712 52%, #1f2937 100%). H1 `Ready to start?` / `Talk to our team` (white/60).
// Screens slide up on enter: middle first, right (x −20→0) +0.1s, left (x 20→0) +0.2s; y 80 (phone 40); 0.8s back-ease.

const IMG = 'absolute inset-0 h-full w-full rounded-[inherit] object-cover object-[50%_0]'

export default function FooterCTADark() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const phone = useIsPhone()
  const dy = phone ? 40 : 80
  const shot = (x, delay) => ({
    initial: { x, y: dy },
    animate: inView ? { x: 0, y: 0 } : { x, y: dy },
    transition: { duration: 0.8, ease: EASE_BACK, delay },
  })

  return (
    <section
      ref={ref}
      className="relative flex w-full flex-col items-center gap-20 overflow-hidden px-10 py-20 md:gap-20 md:pb-0 md:pt-[120px]"
      style={{ backgroundImage: 'linear-gradient(#030712 52%, #1f2937 100%)' }}
    >
      <div className="relative flex w-full max-w-container flex-col items-center gap-10">
        <h2 className="w-full text-center font-heading font-medium text-white text-[40px] leading-[40px] tracking-[-1.6px] md:text-[72px] md:leading-[72px] md:tracking-[-2.88px]">
          <span>Ready to start?</span>
          <br />
          <span className="text-white/60">Talk to our team</span>
        </h2>
        <div className="flex items-center justify-center rounded-2xl bg-white/[0.12] p-1">
          <Btn variant="secondary48" to="/get-started" className="!px-8">Let's talk</Btn>
        </div>
      </div>

      {/* Screens (max-w 880): columns 25/50/25 (phone flex 4 / 50% / flex 4, 110 tall, centered) */}
      <div className="relative z-[1] flex h-10 w-full max-w-[880px] items-start justify-center md:h-[360px]">
        <motion.div {...shot(20, 0.2)} className="relative flex h-[110px] w-px flex-[4_0_0] flex-col items-center justify-center pt-10 md:h-auto md:w-1/4 md:flex-none">
          <div className="relative z-[1] aspect-[1.61176] w-[327%] shrink-0 overflow-hidden rounded-lg md:rounded-none md:rounded-t-xl md:opacity-90">
            <img src="/assets/ui-report-cta.png" alt="" className={IMG} />
          </div>
        </motion.div>
        <motion.div {...shot(0, 0)} className="relative z-[3] flex h-[110px] w-1/2 shrink-0 flex-col items-center justify-center md:h-auto">
          <div className="relative z-[1] aspect-[1.61176] w-[164%] shrink-0 overflow-hidden rounded-[6px_6px_8px_8px] shadow-[0_1px_16px_0_rgba(0,0,0,0.25)] md:rounded-none md:rounded-t-xl">
            <img src="/assets/ui-round.png" alt="" className={IMG} />
          </div>
        </motion.div>
        <div className="pointer-events-none absolute -bottom-[150px] -left-[155px] z-[4] flex h-[360px] w-[200%] items-center justify-center md:bottom-0 md:-left-[400px] md:h-full">
          <div className="h-full w-[200%] shrink-0 bg-[linear-gradient(180deg,rgba(17,24,39,0)_51%,rgba(17,24,39,0.32)_100%)]" />
        </div>
        <motion.div {...shot(-20, 0.1)} className="relative z-[1] flex h-[110px] w-px flex-[4_0_0] flex-col items-center justify-center pt-20 md:h-auto md:w-1/4 md:flex-none">
          <div className="relative z-[1] aspect-[1.61176] w-[327%] shrink-0 overflow-hidden rounded-lg shadow-[0_1px_16px_0_rgba(0,0,0,0.25)] md:rounded-none md:rounded-t-xl md:opacity-[0.85] md:shadow-none">
            <img src="/assets/ui-data.png" alt="" className={IMG} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
