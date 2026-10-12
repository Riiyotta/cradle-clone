import { motion } from 'framer-motion'
import { FRAMER_EASE } from '../ui.jsx'
import { CheckBadge, LinkButton, BTN_SECONDARY36 } from './shared.jsx'

// PAGES_A /platform P1 Intro (`intro`)
const CHECK_TEXT = 'font-sans font-medium text-white/80 text-[14px] leading-[22.4px] lg:text-[16px] lg:leading-[25.6px] [font-feature-settings:"blwf"_on,"tnum"_on]'
const DOTTED = 'underline decoration-dotted underline-offset-2'

function VideoTrigger() {
  // Clicking produced nothing measurable on live: rendered as a non-navigating button
  return (
    <button type="button" aria-label="Introducing Cradle video" className="relative flex h-20 w-[116px] shrink-0 cursor-pointer items-center justify-center rounded-xl bg-ink p-1">
      <div className="relative flex h-[72px] w-[108px] items-center justify-center rounded-lg [mask-image:linear-gradient(#000_0%,rgba(0,0,0,.9)_100%)]">
        <img src="/assets/pages/platform/video-trigger-evbqum.png" alt="" className="absolute inset-0 h-full w-full rounded-lg object-cover" />
        <div className="absolute left-[33.8px] top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(rgba(255,255,255,.5)_0%,rgba(255,255,255,.08)_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)] backdrop-blur-[5px]">
          {/* 20×20 play glyph; triangle measured 12.5×15 at (5.6, 2.5) */}
          <svg className="h-5 w-5" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M6.6 3.4 C6.6 2.6 7.4 2.2 8.1 2.6 L17.4 9.1 C18 9.5 18 10.5 17.4 10.9 L8.1 17.4 C7.4 17.8 6.6 17.4 6.6 16.6 Z" fill="#fff" />
          </svg>
        </div>
      </div>
      {/* Framer ::after inner border 4px rgba(255,255,255,.24) */}
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] border-4 border-white/[0.24]" />
    </button>
  )
}

export default function Intro() {
  return (
    <section id="intro" className="relative flex h-[844px] w-full flex-col items-center justify-center overflow-clip bg-ink md:h-[900px] md:pt-20">
      {/* Background video: wrapper opacity .2 (appear .001→.2, scale 1.2→1) */}
      <motion.div
        initial={{ opacity: 0.001, scale: 1.2 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ type: 'tween', duration: 0.7, delay: 0.2, ease: FRAMER_EASE }}
        className="absolute left-0 top-0 h-[506.4px] w-full md:h-[900px] lg:left-[21.5278%]"
      >
        <video src="/assets/pages/platform/intro-yChT7D.mp4" autoPlay muted loop playsInline className="h-full w-full object-cover" />
      </motion.div>
      {/* Mask overlay */}
      <div className="pointer-events-none absolute left-0 top-0 z-[2] h-[514px] w-full bg-[radial-gradient(138%_42%_at_48.3%_50%,rgba(3,7,18,0)_0%,rgba(3,7,18,.5)_42%,#030712_100%)] md:h-full md:bg-[radial-gradient(56%_42%_at_74.5%_50%,rgba(3,7,18,0)_0%,rgba(3,7,18,.5)_42%,#030712_100%)]" />

      <motion.div
        initial={{ opacity: 0.001, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.8, bounce: 0.2, delay: 0.6 }}
        className="relative z-[2] flex h-full w-full max-w-container flex-col justify-end gap-5 px-5 pb-[120px] pt-[50px] md:gap-10 md:px-10 md:pb-[60px] md:pt-20 lg:px-20"
      >
        <div className="flex w-full flex-col items-start gap-5 md:gap-6">
          <p className="font-sans font-medium text-white/80 text-[14px] leading-[22.4px] tracking-[-0.28px] md:leading-[21px] lg:text-[16px] lg:leading-[25.6px] lg:tracking-[-0.32px]">
            <span className="text-accent">/</span> Our platform
          </p>
          <div className="w-full pb-[6px] md:max-w-[70%] lg:max-w-[60%]">
            <h1 className="font-heading font-medium text-white text-[40px] leading-[40px] tracking-[-1.6px] md:text-[56px] md:leading-[56px] md:tracking-[-2.24px] lg:text-[64px] lg:leading-[64px] lg:tracking-[-2.56px]">
              The AI protein engineering software built for scientists
            </h1>
          </div>
          <p className="max-w-[520px] font-sans font-medium text-white/80 text-[16px] leading-[24px] tracking-[-0.64px] lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.8px]">
            Cradle makes it easy for scientists to train and run protein AI that produces successful candidates 2 - 12x faster than traditional workflows.
          </p>
          <div className="flex flex-col items-start gap-4 md:flex-row">
            <div className="flex items-center gap-1">
              <CheckBadge />
              <p className={CHECK_TEXT}>Wet lab <span className={DOTTED}>validated</span> AI</p>
            </div>
            <div className="flex items-center gap-1">
              <CheckBadge />
              <p className={CHECK_TEXT}>Used by <span className={DOTTED}>leading R&amp;D teams</span></p>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-white/[0.08]" />

        <div className="flex h-20 w-full items-center gap-6">
          <VideoTrigger />
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
            <p className="font-sans font-semibold text-white text-[14px] leading-[18.2px] lg:text-[16px] lg:leading-[20.8px]">Introducing Cradle</p>
            <p className="font-sans font-normal text-white text-[16px] leading-[19.2px] opacity-50">2 minutes</p>
          </div>
          <LinkButton to="/platform#intro" className={`hidden h-9 rounded-lg px-4 text-[14px] leading-[16.8px] tracking-[-0.14px] md:inline-flex ${BTN_SECONDARY36}`}>
            Explore platform
          </LinkButton>
        </div>
      </motion.div>
    </section>
  )
}
