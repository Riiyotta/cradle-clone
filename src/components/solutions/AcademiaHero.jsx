import { motion } from 'framer-motion'
import { EASE_FRAMER, T } from './primitives.jsx'

// /solutions/academia A1 Hero (green). Desktop padding 120 40 40, content max-w 1280 gap 40.
// Appear on load (exact): hero `1el5n47`, logos `6ww8ga`, list `typflp` — opacity .001→1, y 20→0, 0.4s, delays 0 / .1 / .3.

const A = '/assets/pages/solutions-academia/'
const appear = (delay) => ({
  initial: { opacity: 0.001, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: EASE_FRAMER, delay },
})
const PHOTO_MASK = 'radial-gradient(50% 50% at 50% 50%, #000 35%, rgba(0,0,0,0) 100%)'

const LOGOS = [
  { src: `${A}dtu-KWTpRW.png`, alt: 'DTU', cls: 'h-[40.5px] w-[37px] md:h-20 md:w-[73px]' },
  { src: `${A}berkley-etW70y.png`, alt: 'UC Berkeley', cls: 'h-10 w-[79px] md:h-20 md:w-[158px]' },
  { src: `${A}wag-psX75e.svg`, alt: 'Wageningen University & Research', cls: 'h-[30.1px] w-[102px] md:h-[49.9px] md:w-[169px]' },
]

const ROWS = [
  { title: 'Unpaid access', body: "Cradle's license fee is waived for non-commercial research use." },
  { title: 'Publication', body: 'You have publication rights, and Cradle will provide materials to support publication.' },
  { title: 'Support', body: "You’ll get direct access to the Cradle API and/or UI. Cradle experts are available to help you get started and answer questions along the way." },
]

function Check() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[55%] bg-antibody">
      <svg viewBox="0 0 9.273 7.636" className="h-[6px] w-[7px] overflow-visible md:h-2 md:w-[10px]" fill="none" aria-hidden="true">
        <path d="M 0 4.364 L 3.273 7.636 L 9.273 0" stroke="#fff" strokeWidth="2.18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export default function AcademiaHero() {
  return (
    <section
      className="flex w-full justify-center overflow-clip px-5 pb-10 pt-[120px] md:px-10"
      style={{ backgroundImage: 'linear-gradient(#1f5f36 0%, #1e5e35 100%)' }}
    >
      <div className="flex w-full max-w-container flex-col items-center gap-10">
        <motion.div {...appear(0)} className="flex w-full max-w-[960px] flex-col items-center gap-5">
          <img
            src={`${A}hero-FRS8jc.jpg`}
            alt=""
            className="h-[72px] w-[131px] rounded-lg object-cover md:h-[130px] md:w-[200px]"
            style={{ WebkitMaskImage: PHOTO_MASK, maskImage: PHOTO_MASK }}
          />
          <h1
            className={`${T.h2} bg-clip-text text-center text-transparent`}
            style={{ backgroundImage: 'linear-gradient(270deg, rgba(255,255,255,.8) 0%, #fff 50%)' }}
          >
            Cradle for Academia
          </h1>
          <p className={`${T.lead} max-w-[600px] text-center text-white/80`}>
            Apply now to join our limited availability academic program,<br className="hidden md:inline" /> and start using Cradle in your research.
          </p>
        </motion.div>

        <motion.div {...appear(0.1)} className="flex w-full max-w-[960px] items-center gap-2 md:gap-4 md:px-5">
          {LOGOS.map((l) => (
            <div key={l.alt} className="flex h-[72.5px] min-w-0 flex-1 items-center justify-center rounded-xl bg-white/[0.08] py-4 md:h-32 md:rounded-2xl md:p-6">
              <img src={l.src} alt={l.alt} className={`${l.cls} shrink-0 object-cover`} />
            </div>
          ))}
        </motion.div>

        <motion.div {...appear(0.3)} className="flex w-full max-w-[960px] flex-col">
          {ROWS.map((r, i) => (
            <div key={r.title} className={`py-6 ${i < ROWS.length - 1 ? 'shadow-[inset_0_-1px_0_rgba(255,255,255,0.04)]' : ''}`}>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-10 md:px-5">
                <div className="flex items-center gap-4 md:w-[300px] md:shrink-0 md:gap-5">
                  <Check />
                  <h3 className={`${T.cardTitle} text-white`}>{r.title}</h3>
                </div>
                <p className={`${T.body} text-balance text-white/80 md:w-[580px] md:min-w-0 md:shrink md:text-wrap`}>{r.body}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
