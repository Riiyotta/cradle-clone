import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// CLONE_SPEC §2 Hero / intro

const BACK = [0.7, -0.35, 0.3, 1.1]

// Desktop variant = (min-width:1200px). Tablet is unmeasured and falls back to the phone layout.
export function useIsDesktop() {
  const q = '(min-width: 810px)' // Desktop + Tablet share the wide layout/motion values
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const m = window.matchMedia(q)
    const on = () => setMatch(m.matches)
    on()
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return match
}

function Chevron({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={{ opacity: 0.5 }} aria-hidden="true">
      <path d="M 0 0 L 3.5 3.25 L 0 6.5" transform="translate(10.75 8.75)" fill="transparent" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function NewsPill() {
  return (
    <motion.a
      href="/blog/hansa"
      initial={{ opacity: 0.001, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', bounce: 0.05, duration: 0.4, delay: 0.8 }}
      // Hover (live): bg → rgba(255,255,255,.06) and the 0.5px bottom ::after → rgba(255,255,255,.1), ≈100ms, ease [0.12,0.23,0.5,1]
      className="fborder fborder-bottom-half fborder-anim flex items-center justify-center md:justify-start gap-[6px] self-stretch md:self-start h-9 md:h-[26px] py-2 md:py-px pl-[6px] pr-0 rounded-[6px] bg-white/0 hover:bg-white/[.06] hover:[--pill-b:rgba(255,255,255,.1)] transition-colors duration-100 ease-[cubic-bezier(0.12,0.23,0.5,1)] font-sans font-normal text-white text-[10px] leading-[12px] md:text-[12px] md:leading-[14.4px]"
      style={{ '--fb': '0 solid var(--pill-b, rgba(255,255,255,0))', '--fbt': '.1s' }}
    >
      <img src="/assets/news-pill-bar.svg" alt="" className="w-[2px] h-2 md:w-[3px] md:h-[10px] shrink-0" />
      <span>News:</span>
      <span className="flex items-center gap-[6px] md:gap-0">
        <span style={{ WebkitMaskImage: 'linear-gradient(270deg, rgba(0,0,0,.4) 0%, rgba(0,0,0,.8) 100%)', maskImage: 'linear-gradient(270deg, rgba(0,0,0,.4) 0%, rgba(0,0,0,.8) 100%)' }}>
          <span className="md:hidden">Lundbeck partners with Cradle</span>
          <span className="hidden md:inline">Hansa Biopharma chooses Cradle</span>
        </span>
        <Chevron className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
      </span>
    </motion.a>
  )
}

function Blob({ src, className, delay, factor }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, (v) => -factor * v)
  return (
    <motion.img
      src={src}
      alt=""
      initial={{ opacity: 0.001, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', bounce: 0.3, duration: 1, delay }}
      style={{ y }}
      transformTemplate={(_, generated) => `translateY(-50%) ${generated === 'none' ? '' : generated}`}
      className={`absolute object-cover max-w-none ${className}`}
    />
  )
}

export default function Hero() {
  const desktop = useIsDesktop()
  return (
    <section id="intro" className="relative w-full bg-ink flex flex-row justify-center items-end pt-[120px] md:pt-40 lg:pt-[280px] lg:h-[545.1px]">
      {/* bg squiggles: desktop only, overflows down into the platform-ui section */}
      <div className="hidden md:block absolute left-0 top-[130.3px] lg:top-[255px] w-full h-[900px] overflow-hidden z-[1] pointer-events-none">
        <Blob src="/assets/hero-blob-right.png" factor={0.15} delay={0.3} className="right-[-280px] top-[370px] w-[637px] h-[645.9px] lg:right-[-140px] lg:top-1/2 lg:w-[717px] lg:h-[727px]" />
        <Blob src="/assets/hero-blob-left.png" factor={0.3} delay={0.2} className="left-[-370px] top-[427px] w-[778px] h-[626px] lg:left-[-280px] lg:top-[477px]" />
      </div>

      <div className="w-full max-w-container flex flex-col justify-end gap-[60px] px-4 pb-8 md:px-12 md:pb-5 lg:px-0 lg:pb-10">
        <div className="relative z-[5] w-full md:max-w-[1040px] md:mx-auto flex flex-col items-center gap-5 md:flex-row md:items-center md:gap-10 lg:items-end lg:gap-[120px]">
          <div className="w-full md:w-auto md:min-w-0 md:flex-[2_1_0px] lg:flex-none lg:w-[600px] flex flex-col gap-2">
            <NewsPill />
            <motion.h1
              key={desktop ? 'd' : 'p'}
              initial={{ opacity: 0.001, y: desktop ? 20 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: desktop ? 1 : 1.15, delay: desktop ? 0.1 : 0, ease: BACK }}
              className="m-0 font-heading font-medium leading-[1em] tracking-[-0.05em] text-center md:text-left text-[calc((100vw-32px)*0.143375)] h-[calc((100vw-32px)*0.31861)] pt-[calc((100vw-32px)*0.01592)] md:pt-0 md:text-[calc(min(100vw-136px,1000px)*0.106088)] md:leading-[0.9em] md:h-[calc(min(100vw-136px,1000px)*0.238773)] lg:leading-[1em] lg:text-[95.4932px] lg:h-[191.1px] whitespace-pre"
            >
              <span
                className="bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(270deg, rgba(255,255,255,.8) 0%, #fff 54%)', WebkitTextFillColor: 'transparent', WebkitBoxDecorationBreak: 'clone' }}
              >
                {'Engineer better\nproteins, faster.'}
              </span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0.001, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.15, delay: 0.1, ease: BACK }}
            className="w-full md:w-auto md:min-w-0 md:flex-[1_1_0px] md:py-2 lg:flex-none lg:w-[320px] lg:pt-0 lg:pb-[7px] flex flex-col gap-4"
          >
            <div className="hidden md:block w-10 h-px bg-white/[.08]" />
            <p className="hidden lg:block m-0 max-w-[320px] font-sans font-medium text-[16px] leading-[25.6px] tracking-[-0.32px] bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(283deg, rgba(255,255,255,.6) 0%, rgba(255,255,255,.8) 100%)', WebkitTextFillColor: 'transparent' }}>
              Leverage AI to generate protein candidates and improve their properties. More breakthroughs in fewer experiments — guided by your own experimental data.
            </p>
            <p className="lg:hidden m-0 mx-auto max-w-[90%] text-center md:mx-0 md:max-w-[280px] md:text-left font-sans font-medium text-[14px] leading-[22.4px] md:leading-[21px] tracking-[-0.28px] text-white/60">
              Leverage AI to generate protein candidates and improve their properties. More breakthroughs in fewer experiments — guided by your own experimental data.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
