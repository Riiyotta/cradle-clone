import { motion, useScroll, useTransform } from 'framer-motion'
import { FRAMER_EASE } from '../ui.jsx'
import { useBreakpoint } from './shared.jsx'

// PAGES_A /platform P4 Floating UI collage
// 3d cluster bubble positions relative to the cluster origin.
// Desktop (130×96, 20px bubbles); tablet = desktop × 0.9 (117×86, 18px); phone measured separately (55×41, 8px).
const DOTS = [[18,28],[33,18],[33,28],[48,23],[47,37.6],[52.7,0],[28,37.6],[38,46],[57.3,28],[60.2,10],[63,43],[75,53],[87,43],[95,30],[28,58],[38,71],[13,61],[10,18],[80,61],[93,53],[105,43],[0,28],[70,33.4],[45,10],[70,40.1],[43,58],[85,76],[95,66],[110,30],[50,71]]
const DOTS_PHONE = [[8,12],[14,7],[14,12],[20,10],[20,16.1],[22.3,0],[12,16.1],[16,20],[24.3,12],[25.5,4],[26,19],[32,23],[37,19],[40,13],[12,25],[16,31],[5,27],[4,7],[34,27],[39,23],[45,19],[0,12],[30,14.3],[19,4],[30,17.2],[18,25],[36,33],[40,29],[47,13],[21,30]]

const BUBBLE = 'absolute rounded-full bg-white/60 shadow-[inset_0_0_16px_0_rgba(156,163,175,.32)] backdrop-blur-[2px]'

function Cluster() {
  return (
    <>
      {/* phone */}
      <div className="absolute left-1/2 top-1/2 h-[41px] w-[55px] -translate-x-1/2 -translate-y-1/2 md:hidden">
        {DOTS_PHONE.map(([x, y], i) => <div key={i} className={`${BUBBLE} h-2 w-2`} style={{ left: x, top: y }} />)}
      </div>
      {/* tablet / desktop */}
      <div className="absolute left-1/2 top-1/2 hidden h-[86px] w-[117px] -translate-x-1/2 -translate-y-1/2 md:block lg:h-[96px] lg:w-[130px]">
        {DOTS.map(([x, y], i) => (
          <div key={i} className={`${BUBBLE} h-[18px] w-[18px] left-[calc(var(--x)*0.9)] top-[calc(var(--y)*0.9)] lg:h-5 lg:w-5 lg:left-[var(--x)] lg:top-[var(--y)]`} style={{ '--x': `${x}px`, '--y': `${y}px` }} />
        ))}
      </div>
    </>
  )
}

export default function Collage() {
  const bp = useBreakpoint()
  const { scrollY } = useScroll()
  // Desktop: continuous parallax −0.07·scrollY (Wetlab) and −0.04·scrollY (3d). Tablet (measured): 3d only. Phone: none.
  const wetY = useTransform(scrollY, (v) => (bp === 'desktop' ? -0.07 * v : 0))
  const d3Y = useTransform(scrollY, (v) => (bp === 'phone' ? 0 : -0.04 * v))
  const phone = bp === 'phone'
  const ease = FRAMER_EASE
  const view = { once: true, amount: 0.5 }

  return (
    <section className="flex w-full justify-center bg-white px-5 pt-10 md:px-20">
      <div className="relative flex h-[176px] w-full items-center justify-center md:h-[387px] lg:max-w-[1040px]">
        {/* Wetlab photo card */}
        <motion.div style={{ y: wetY }} className="absolute left-[-1px] top-[67px] z-[3] md:left-[4.6px] md:top-[174.8px] lg:left-40 lg:top-[277.5px]">
          <motion.div
            initial={phone ? { opacity: 0, y: 20, scale: 0.95 } : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={view}
            transition={{ duration: 0.7, ease }}
            className="h-[88px] w-16 overflow-hidden rounded-[6px] shadow-[0_0.4px_8px_0_rgba(0,0,0,.08)] md:h-[165px] md:w-[120px] md:rounded-xl md:shadow-[0_0.75px_8px_0_rgba(0,0,0,.08)] lg:h-[220px] lg:w-40 lg:rounded-2xl lg:shadow-[0_1px_8px_0_rgba(0,0,0,.08)]"
          >
            <img src="/assets/pages/platform/wetlab-riCniX.png" alt="Scientist in the wet lab" className="h-full w-full object-cover" />
          </motion.div>
        </motion.div>

        {/* UI with data screenshot */}
        <div className="relative flex h-[176px] w-full justify-center overflow-hidden rounded-[21px] md:block md:h-[387px] md:w-[600px] md:shrink-0">
          <div className="fborder relative h-[176px] w-[280px] overflow-hidden rounded-t-[4px] [mask-image:linear-gradient(336deg,transparent_35%,#000_78%)] md:absolute md:left-5 md:top-5 md:h-[398px] md:w-[633px] md:rounded-t-lg">
            <img src="/assets/ui-data.png" alt="Cradle data view" className="h-full w-full object-cover object-[50%_0]" />
          </div>
        </div>

        {/* 3d molecule card */}
        <motion.div style={{ y: d3Y }} className="absolute left-[264.5px] top-[75px] z-[3] md:left-[678.9px] md:top-[160.3px] lg:left-[725px] lg:top-[323px]">
          <motion.div
            initial={phone ? { opacity: 1, y: 30, scale: 0.9 } : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={view}
            transition={{ duration: 0.7, ease, delay: phone ? 0.2 : 0 }}
            className="fborder relative h-16 w-[85px] overflow-hidden rounded-[7px] bg-[linear-gradient(#1f2937,#000)] [--fb:1px_solid_rgba(255,255,255,.2)] md:h-[136px] md:w-[180px] md:rounded-[14px] lg:h-[151px] lg:w-[200px] lg:rounded-2xl"
          >
            <Cluster />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
