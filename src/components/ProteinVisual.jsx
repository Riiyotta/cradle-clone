import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

// CLONE_SPEC §7 Protein visual (`modlaities` [sic])

// 29 bubbles in DOM order: [desktop left, top] in the 739×546 cluster, [phone left, top] in the 280×207 cluster.
// Desktop = spec §7 list. Phone = resolved from the phone rules in reference/original.html.
const BUBBLES = [
  [[102, 157], [39, 59]],
  [[188, 100], [71, 38]],
  [[188, 157], [71, 59]],
  [[271, 133], [103, 50]],
  [[268, 213.6], [102, 81]], // highlighted
  [[299.4, 0], [113.45, 0]],
  [[157, 213.6], [59, 81]],
  [[214, 261], [81, 99]],
  [[325.5, 157], [123.35, 59]],
  [[342.2, 57], [129.65, 22]],
  [[356, 247], [135, 94]],
  [[428, 304], [162, 115]],
  [[497, 247], [188, 94]],
  [[542, 171], [205, 65]],
  [[157, 327], [59, 124]],
  [[214, 406], [81, 154]],
  [[74, 349], [28, 132]],
  [[57, 100], [22, 38]],
  [[459, 349], [174, 132]],
  [[527, 304], [200, 115]],
  [[599, 247], [227, 94]],
  [[0, 157], [0, 59]],
  [[399, 189.9], [151, 72]],
  [[259, 57], [98, 22]],
  [[399, 227.8], [151, 86.4]],
  [[242, 327], [92, 124]],
  [[485, 432], [184, 164]],
  [[542, 375], [205, 142]],
  [[625, 171], [237, 65]],
]
const HIGHLIGHT = 4

// Tile anchors are % of the protein-visual box. Desktop = spec table; phone anchors/widths from original.html phone rules.
const TILES = [
  { name: 'antibody', bg: '#3cab57', travel: 180, phoneTravel: 90, scaleTo: 1,
    d: { x: '31%', y: '64%', w: 'min(7%, 80px)', aspect: 0.993711, r: 20, shadow: '0 1px 25px 0 rgba(17,24,39,.24)' },
    p: { x: '21%', y: '59%', w: '10%', r: 10, shadow: '0 .8px 25px 0 rgba(17,24,39,.24)' },
    t: { w: '56px', r: 12 } },
  { name: 'vaccine', bg: '#9b9265', travel: 250, phoneTravel: 75, scaleTo: 1,
    d: { x: '70%', y: '30%', w: 'min(4%, 50px)', aspect: 1, r: 16, shadow: '0 .83px 25px 0 rgba(17,24,39,.12)' },
    p: { x: '83%', y: '39%', w: '8%', r: 8, shadow: '0 .66px 25px 0 rgba(17,24,39,.12)' },
    t: { w: '41px', r: 10, shadow: '0 1px 25px 0 rgba(17,24,39,.12)' } },
  { name: 'peptide', bg: '#98b62c', travel: 150, phoneTravel: 50, scaleTo: 1.1,
    d: { x: '39%', y: '31%', w: 'min(10%, 120px)', aspect: 0.995781, r: 32, shadow: '0 1px 25px 0 rgba(17,24,39,.24)' },
    p: { x: '34%', y: '35%', w: '13%', r: 12, shadow: '0 .8px 25px 0 rgba(17,24,39,.24)' },
    t: { w: '80px', r: 20 } },
  { name: 'enzyme', bg: '#0ea5e9', travel: 100, phoneTravel: 40, scaleTo: 1.1,
    d: { x: '60%', y: '58%', w: 'min(12%, 148px)', aspect: 1, r: 40, shadow: '0 1.24px 25px 0 rgba(17,24,39,.24)' },
    p: { x: '65%', y: '61%', w: '14%', r: 14, shadow: '0 .99px 25px 0 rgba(17,24,39,.24)' },
    t: { w: '100px', r: 24 } },
]

// Live scroll smoothing (fit to frame samples after a scroll jump): spring stiffness 300, damping 60, mass 1
// (≈74% of the distance in 275ms, settled ≈1.2s).
const SMOOTH = { stiffness: 300, damping: 60, mass: 1 }

function useIsPhone(q = '(max-width: 809.98px)') {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setM(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [q])
  return m
}

function Tile({ tile, progress, phone, tablet }) {
  // Tablet (810–1199): desktop anchors/travel, fixed px widths + radii measured on live at 1000
  const v = phone ? { ...tile.d, ...tile.p } : tablet ? { ...tile.d, ...tile.t } : tile.d
  // Live phone (<810): own travel values (90/75/50/40px) and no scale. Tablet/desktop: desktop values.
  const travel = phone ? tile.phoneTravel : tile.travel
  const scaleTo = phone ? 1 : tile.scaleTo
  // progress 0→1 maps translateY travel→0 and scale 1→scaleTo (linear), then spring-smoothed
  const y = useSpring(useTransform(progress, [0, 1], [travel, 0]), SMOOTH)
  const scale = useSpring(useTransform(progress, [0, 1], [1, scaleTo]), SMOOTH)
  return (
    // anchor wrapper: centered on (x%, y%) via translate(-50%,-50%); scroll offset applied on the inner tile
    <div
      className="absolute z-[3] -translate-x-1/2 -translate-y-1/2"
      style={{ left: v.x, top: v.y, width: v.w }}
    >
      <motion.div
        className="relative flex w-full items-center justify-center overflow-hidden"
        style={{ y, scale, aspectRatio: v.aspect, backgroundColor: tile.bg, borderRadius: v.r, boxShadow: v.shadow }}
      >
        <img src={`/assets/molecule-${tile.name}.svg`} alt="" className="h-3/4 w-3/4" />
      </motion.div>
    </div>
  )
}

export default function ProteinVisual() {
  const ref = useRef(null)
  const phone = useIsPhone()
  const tablet = useIsPhone('(min-width: 810px) and (max-width: 1199.98px)')
  // Desktop/tablet (live): progress = clamp((viewportCenter − sectionTop) / sectionHeight, 0, 1).
  // Phone (live): progress runs from section top at viewport bottom to section bottom at viewport bottom.
  const { scrollYProgress: wide } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  const { scrollYProgress: narrow } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const scrollYProgress = phone ? narrow : wide

  return (
    <section ref={ref} className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#f9fafb_0%,#fff_100%)]">
      <div className="relative flex min-h-[422px] w-full max-w-container items-start justify-center md:h-[540px] md:min-h-0 lg:h-screen">
        {/* glow */}
        <div className="absolute z-[1] left-20 right-[110px] top-[calc(50%-100px)] h-[200px] rounded-[200px] bg-blue-200 blur-[60px] md:right-20 md:top-[calc(50%-115px)] md:h-[230px] md:blur-[100px] lg:top-[calc(50%-200px)] lg:h-[400px]" />
        {/* protein cluster */}
        <div className="absolute z-[2] w-[280px] h-[207px] top-[calc(50%-103.5px)] left-[calc(51.0256%-139.95px)] md:w-[385px] md:h-[285px] md:top-[calc(50%-142.5px)] md:left-[calc(50.13%-192.5px)] lg:w-[739px] lg:h-[546px] lg:top-[calc(50%-273.24px)] lg:left-[calc(50.0833%-369.47px)]">
          {BUBBLES.map(([d, p], i) => (
            <div
              key={i}
              className={`pv-bubble absolute ${i === HIGHLIGHT ? 'pv-bubble--hl' : ''}`}
              style={{ '--l': `${d[0]}px`, '--t': `${d[1]}px`, '--pl': `${p[0]}px`, '--pt': `${p[1]}px` }}
            />
          ))}
        </div>
        {TILES.map((t) => <Tile key={`${t.name}-${phone}-${tablet}`} tile={t} progress={scrollYProgress} phone={phone} tablet={tablet} />)}
      </div>
    </section>
  )
}
