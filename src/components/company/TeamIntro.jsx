import { motion } from 'framer-motion'
import { FRAMER_EASE } from '../ui.jsx'
import { H1, LEAD } from './shared.jsx'
import { BUBBLES } from './teamData.js'

// /team T1 Intro + bento (specs/PAGES_A.md T1)

function Molecule() {
  // Desktop: 233×173 cluster of 36px bubbles (blur 4). Phone: 117×86 cluster of 18px bubbles (blur 2), same arrangement ×0.5.
  return (
    <div className="absolute left-1/2 top-1/2 h-[86px] w-[117px] -translate-x-1/2 -translate-y-1/2 md:h-[173px] md:w-[233px]">
      {BUBBLES.map(([x, y], i) => (
        <div
          key={i}
          className="team-bubble absolute rounded-full bg-white/60 shadow-[inset_0_0_16px_0_rgba(156,163,175,.32)]"
          style={{ '--bx': `${x - 76.7}px`, '--by': `${y - 58.8}px` }}
        />
      ))}
    </div>
  )
}

export default function TeamIntro() {
  return (
    <div className="flex w-full flex-col gap-10 pb-2 md:gap-20 md:pb-0">
      <div className="flex w-full flex-col gap-5 md:gap-10">
        <h1 className={H1}>
          Making biology
          <br />
          programmable
        </h1>
        <p className={`${LEAD} max-w-[560px] text-muted`}>
          Building on the latest technological breakthroughs in AI, Cradle helps scientists decode and rewrite biology to unlock new food sources, materials, and therapeutics.
        </p>
      </div>

      {/* Bento: desktop 3 cols × 2 rows (290), gap 20; phone video 358×290 then two 175×191 tiles, gap 8 */}
      <div className="grid w-full grid-cols-2 gap-2 md:aspect-[2] md:grid-cols-3 md:grid-rows-2 md:gap-5">
        <motion.div
          className="col-span-2 h-[290px] overflow-hidden rounded-2xl opacity-90 md:row-span-2 md:h-auto"
          initial={{ opacity: 0.001 }}
          animate={{ opacity: 0.9 }}
          transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
        >
          <video
            className="h-full w-full rounded-2xl object-cover"
            src="/assets/pages/team/intro-3xPwhR.mp4"
            poster="/assets/pages/team/intro-DCTQ1c.png"
            autoPlay muted loop playsInline
          />
        </motion.div>

        {/* Data screenshot tile (#f3f4f6). Phone: right tile of the pair */}
        <div className="relative order-3 h-[191px] overflow-hidden rounded-2xl bg-gray-100 md:order-none md:h-auto">
          <motion.div
            className="team-data fborder absolute overflow-hidden"
            initial={{ opacity: 0.001, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: FRAMER_EASE, delay: 0.2 }}
          >
            <img src="/assets/ui-data.png" alt="" className="h-full w-full object-cover object-left-top" />
          </motion.div>
        </div>

        {/* Blue molecule tile (#224eee). Phone: left tile of the pair */}
        <div className="relative order-2 h-[191px] overflow-hidden rounded-2xl bg-brand md:order-none md:h-auto">
          <div className="team-pattern pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[1200px] -translate-x-1/2 -translate-y-1/2" />
          <Molecule />
        </div>
      </div>
    </div>
  )
}
