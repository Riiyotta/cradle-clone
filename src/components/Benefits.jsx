import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Eyebrow, Button, Container, FRAMER_EASE } from './ui.jsx'

// CLONE_SPEC §6 Benefits / "Protein engineering 2.0"
// Motion, re-measured on live (1440/1000/390):
//  - REPLAY (reset when fully out of view, re-animate on re-entry, trigger = any visible px):
//      Structure scale, blue bars 2–4, Card B front/back panels.
//  - ONCE (stay visible after scrolling away): eyebrow words, "T7 RNA" letters, radar chips.
// `hidden` transitions are instant: the reset only ever happens while the element is off-screen.

const RESET = { duration: 0 }
const replay = { initial: 'hidden', whileInView: 'show', viewport: { once: false } }
const SHADOW = 'shadow-[0_2px_8px_0_rgba(0,0,0,0.08)]'

const H4 = 'font-heading font-medium text-[18px] leading-[21.6px] lg:text-[24px] lg:leading-[28.8px]'
const BODY = 'font-sans font-medium text-[14px] leading-[22.4px] md:leading-[21px] tracking-[-0.28px] lg:text-[16px] lg:leading-[25.6px] lg:tracking-[-0.32px]'

/* ---------------- Card A: Compounding results ---------------- */

function LetterReveal({ text }) {
  // "T7 RNA" (live): per-letter opacity .001→1, y 4→0, spring 0.4s bounce 0, delay 0.2s + 75ms stagger.
  // Fires once when 50% of the label is visible; does not reset.
  let i = 0
  return (
    <motion.p initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} className="whitespace-pre font-sans font-semibold text-[13px] leading-[15.6px] text-white">
      {text.split(' ').map((word, w) => (
        <span key={w} className="whitespace-nowrap">
          {w > 0 && ' '}
          {word.split('').map((ch) => {
            const d = 0.2 + i++ * 0.075
            return (
              <motion.span
                key={d}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0.001, y: 4, transition: RESET },
                  show: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.4, bounce: 0, delay: d } },
                }}
              >
                {ch}
              </motion.span>
            )
          })}
        </span>
      ))}
    </motion.p>
  )
}

const BARS = [
  { blue: 20, gray: 10, animate: false },
  { blue: 40, gray: 15, animate: true },
  { blue: 60, gray: 17, animate: true },
  { blue: 90, gray: 24, animate: true },
]

function BarGraph() {
  return (
    <motion.div
      {...replay}
      className={`absolute right-6 bottom-6 flex h-[180px] w-[256px] flex-row items-end justify-center gap-2 overflow-hidden rounded-2xl bg-white pt-5 px-5 pb-4 ${SHADOW}`}
    >
      {BARS.map((b, i) => (
        <div key={i} className="flex w-12 flex-col justify-end gap-1">
          {/* blue clip box; bars 2–4 slide up from translateY(height). Live: 0.4s tween, ease [0.12,0.23,0.5,1]
              (no overshoot), delays 0.1/0.2/0.3s. Replays. */}
          <div className="relative flex w-full overflow-hidden rounded-[4px]" style={{ height: b.blue }}>
            <motion.div
              className="h-full w-full rounded-[4px] bg-sky400"
              variants={b.animate ? {
                hidden: { y: b.blue, transition: RESET },
                show: { y: 0, transition: { duration: 0.4, ease: FRAMER_EASE, delay: i * 0.1 } },
              } : undefined}
            />
          </div>
          <div className="w-full rounded-[4px] bg-gray-300" style={{ height: b.gray }} />
          <p className="text-center font-mono font-normal text-[14px] leading-[14px] text-muted">{i + 1}</p>
        </div>
      ))}
      <div className="absolute top-5 left-5 z-[1] flex flex-col items-start gap-1">
        <p className="whitespace-pre font-sans font-semibold text-[13px] leading-[15.6px] text-ink">Round Progress</p>
        <div className="flex flex-row items-center gap-1">
          <div className="h-2 w-2 rounded-[2px] bg-enzyme" />
          <p className="whitespace-pre font-sans font-medium text-[13px] leading-[15.6px] text-muted">with Cradle</p>
        </div>
      </div>
    </motion.div>
  )
}

function StructureCard() {
  return (
    <div className={`absolute top-6 left-6 h-[180px] w-[256px] overflow-hidden rounded-2xl bg-ink ${SHADOW}`}>
      <div className="absolute top-3 right-3 flex items-center rounded-full bg-gray-800 px-2 py-1">
        <p className="whitespace-pre font-sans font-semibold text-[13px] leading-[15.6px] text-white [font-feature-settings:'tnum']">
          <span className="text-sky400">+</span>300%
        </p>
      </div>
      <div className="absolute bottom-4 left-4">
        <LetterReveal text="T7 RNA" />
      </div>
      {/* Structure: 125w (aspect 1.02475) centered, base scale .8 → 1. Live: spring 0.8s bounce 0.2 (peak 1.003). Replays. */}
      <motion.div
        {...replay}
        className="absolute top-1/2 left-1/2 w-[125px] aspect-[1.02475]"
        style={{ x: '-50%', y: '-50%' }}
        variants={{
          hidden: { scale: 0.8, transition: RESET },
          show: { scale: 1, transition: { type: 'spring', duration: 0.8, bounce: 0.2 } },
        }}
      >
        <img
          src="/assets/benefits-t7rna-structure.png"
          alt="Abstract image of clustered white circles on a dark teal background."
          className="h-full w-full object-cover object-center"
        />
      </motion.div>
    </div>
  )
}

function CompoundingCard() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-start overflow-hidden rounded-2xl bg-gray-100 md:col-span-4 md:h-auto lg:col-span-3">
      {/* asset area: 435 tall, padding 40 (phone: fills remaining height, shown after text) */}
      <div className="relative order-1 flex h-px w-full flex-1 items-center justify-center overflow-hidden p-10 md:order-none md:h-[400px] md:flex-none lg:h-[435px]">
        <div
          className="benefits-pattern absolute z-0 mix-blend-multiply"
          style={{ backgroundImage: 'url(/assets/benefits-grid-pattern.svg)', backgroundRepeat: 'repeat', backgroundPosition: 'left top', backgroundSize: '110.5px auto' }}
        />
        {/* 500×300 asset; phone: 119% wide, contents scaled 0.66 */}
        <div className="relative w-[119%] shrink-0 aspect-[1.66667] overflow-hidden md:w-[500px]">
          <div className="absolute top-0 left-0 h-[300px] w-[500px] origin-top-left scale-[0.66] md:scale-100">
            <StructureCard />
            <BarGraph />
          </div>
        </div>
      </div>
      <div className="order-none flex w-full flex-col items-start gap-3 p-6 md:p-[30px] lg:gap-4 lg:p-10">
        <h4 className={`${H4} text-ink`}>Compounding results</h4>
        <p className={`${BODY} w-full text-muted [text-wrap:balance] md:max-w-[80%] lg:max-w-[90%]`}>
          Move from incremental progress to compounding results with models that learn from every round of your wet lab data. Teams that use Cradle report 2-12x faster development timelines.
        </p>
      </div>
    </div>
  )
}

/* ---------------- Card B: Breakthroughs on repeat ---------------- */

const PROJECTS = [
  { name: 'mAb-HER2', icon: 'icon-antibody-mask.svg', status: 'icon-status-in-progress.svg', label: 'Round 4', border: true },
  { name: 'mAb-TNF', icon: 'icon-antibody-mask.svg', status: 'icon-status-completed.svg', label: 'Completed', border: true },
  { name: 'vax-HPV9', icon: 'icon-vaccine-mask.svg', status: 'icon-status-completed.svg', label: 'Completed', border: false },
]

const mask = (file) => ({ WebkitMaskImage: `url(/assets/${file})`, maskImage: `url(/assets/${file})`, WebkitMaskSize: '100% 100%', maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' })

function ProjectRow({ name, icon, status, label, border }) {
  return (
    <div className={`flex w-full flex-row items-center justify-start gap-8 py-2 md:gap-[57.6px] lg:gap-[72px] ${border ? 'shadow-[inset_0_-1px_0_0_#f9fafb]' : ''}`}>
      <div className="flex w-px flex-1 flex-row items-center gap-[12.8px] lg:gap-4">
        <div className="relative h-8 w-8 shrink-0 overflow-hidden lg:h-10 lg:w-10">
          <div className="absolute top-1/2 left-1/2 aspect-square w-[22px] -translate-x-1/2 -translate-y-1/2 bg-gray-400 lg:w-7" style={mask(icon)} />
        </div>
        <p className="whitespace-pre font-sans font-medium text-[13px] leading-[1em] text-ink lg:text-[16px]">{name}</p>
      </div>
      <div className="flex w-px flex-1 flex-row items-center gap-[9.6px] overflow-hidden lg:gap-3">
        <img src={`/assets/${status}`} alt="" className="h-4 w-4 shrink-0 lg:h-5 lg:w-5" />
        <p className="whitespace-pre font-sans font-medium text-[13px] leading-[1em] text-muted lg:text-[16px]">{label}</p>
      </div>
    </div>
  )
}

const FRONT_MASK = 'linear-gradient(180deg,#000 75%,rgba(0,0,0,.8) 100%)'

function BreakthroughsCard() {
  return (
    <div className="flex h-[60vh] w-full flex-col items-center justify-start self-center overflow-hidden rounded-2xl bg-ink md:col-span-2 md:h-[500px] lg:h-full">
      <div className="flex w-full flex-col items-start gap-3 p-6 md:p-[30px] lg:gap-5 lg:p-10">
        <h4 className={`${H4} text-white`}>Breakthroughs on repeat</h4>
        <p className={`${BODY} w-full text-white/60 [text-wrap:balance]`}>
          Following a single path puts you at risk of hitting a dead end. Instead, confidently explore multiple design strategies to bring more programs over the finish line and strengthen your IP portfolio.
        </p>
      </div>
      <div className="flex h-px w-full flex-1 flex-col items-end justify-end overflow-hidden bg-[linear-gradient(180deg,#030712_0%,#1f2937_100%)]">
        <motion.div {...replay} className="relative flex h-[300px] w-full flex-col items-center justify-end overflow-hidden pl-6 md:pl-8">
          {/* back strip (live): opacity 0→1, y 30→0, 0.3s tween ease [0.12,0.23,0.5,1], delay 0.25s. Replays. */}
          <motion.div
            className="relative z-[1] w-full pl-5"
            variants={{
              hidden: { opacity: 0, y: 30, transition: RESET },
              show: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.25, ease: FRAMER_EASE } },
            }}
          >
            <div className="h-5 w-full rounded-tl-2xl bg-white/60 md:h-6" />
          </motion.div>
          {/* front panel 468×260 desktop (live): y 30→0, 0.3s tween ease [0.12,0.23,0.5,1], delay 0.1s. Replays. */}
          <motion.div
            className="relative z-[2] flex w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-tl-2xl bg-white pt-9 pb-2 pl-8 md:gap-6 md:pt-8 md:pl-6 lg:h-[260px] lg:pt-12 lg:pb-4 lg:pl-10"
            style={{ WebkitMaskImage: FRONT_MASK, maskImage: FRONT_MASK }}
            variants={{
              hidden: { y: 30, transition: RESET },
              show: { y: 0, transition: { duration: 0.3, delay: 0.1, ease: FRAMER_EASE } },
            }}
          >
            <div className="flex w-full flex-row items-center justify-start gap-2 lg:gap-[10px]">
              <p className="whitespace-pre font-heading font-medium text-[19px] leading-[1em] text-ink lg:text-[24px]">All projects</p>
              <div className="aspect-square w-[19px] shrink-0 bg-gray-400 lg:w-6" style={mask('icon-chevron-down.svg')} />
            </div>
            <div className="flex w-full flex-col items-center">
              {PROJECTS.map((p) => <ProjectRow key={p.name} {...p} />)}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

/* ---------------- Card C: video ---------------- */

// Live: autoplay attr off; plays while any px is in view, pauses (keeps position) once fully out.
function VideoCard() {
  const ref = useRef(null)
  const inView = useInView(ref)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (inView) v.play().catch(() => {})
    else v.pause()
  }, [inView])
  return (
    <div className="relative flex w-full self-start overflow-hidden rounded-2xl md:col-span-2 md:h-[500px] lg:h-full">
      <video
        ref={ref}
        src="/assets/benefits-video.mp4"
        poster="/assets/benefits-video-poster.png"
        muted
        loop
        playsInline
        preload="auto"
        className="block w-full aspect-[0.8] object-cover object-center md:absolute md:inset-0 md:aspect-auto md:h-full"
      />
    </div>
  )
}

/* ---------------- Card D: Co-optimize ---------------- */

const DOTS = {
  blue: [[234, 77], [140, 134], [183, 234], [299, 249], [315, 140]],
  yellow: [[234, 107], [161, 144], [163, 256], [288, 233], [335, 130]],
}

// order index = stagger slot (Binding affinity → Activity → Stability → Expression → Specificity).
// Live: each chip has its own in-view trigger (any visible px), fires ONCE (no reset),
// spring 0.5s bounce 0.2, delay 0.1s × (order + 1).
const CHIPS = [
  { label: 'Binding affinity', pos: { top: 23, left: 240 }, center: true, order: 0 },
  { label: 'Specificity', pos: { top: 114, left: 30 }, order: 4 },
  { label: 'Activity', pos: { top: 114, left: 360 }, order: 1 },
  { label: 'Stability', pos: { top: 284, left: 313 }, order: 2 },
  { label: 'Expression', pos: { top: 284, left: 76 }, order: 3 },
]

function Radar() {
  return (
    <div className="relative h-[360px] w-[480px] shrink-0 overflow-hidden">
      <img src="/assets/radar-circles.svg" alt="" className="absolute h-[240px] w-[240px]" style={{ left: 120, top: 60 }} />
      <img src="/assets/radar-polygon-yellow.svg" alt="" className="absolute h-[151px] w-[177px]" style={{ left: 166, top: 113 }} />
      <img src="/assets/radar-polygon-blue.svg" alt="" className="absolute h-[174px] w-[177px]" style={{ left: 146, top: 83 }} />
      {Object.entries(DOTS).map(([c, pts]) => pts.map(([l, t]) => (
        <img key={`${c}${l}${t}`} src={`/assets/radar-dot-${c}.svg`} alt="" className="absolute h-3 w-3" style={{ left: l, top: t }} />
      )))}
      {CHIPS.map((c) => (
        <motion.div
          key={c.label}
          className={`absolute z-[1] flex h-[26px] items-center justify-center rounded-full bg-white px-[10px] py-2 ${SHADOW}`}
          style={{ ...c.pos, ...(c.center ? { x: '-50%' } : {}) }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.2, delay: (c.order + 1) * 0.1 }}
        >
          <p className="whitespace-pre font-sans font-medium text-[14px] leading-[14px] tracking-[-0.14px] text-muted">{c.label}</p>
        </motion.div>
      ))}
    </div>
  )
}

function CoOptimizeCard() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-start overflow-hidden rounded-2xl bg-gray-100 md:col-span-4 md:h-auto lg:col-span-3">
      <div className="order-1 flex w-full items-center justify-center overflow-hidden md:order-none md:h-[400px] md:p-10 lg:h-[434px]">
        <div className="hidden md:block">
          <Radar />
        </div>
        <img
          src="/assets/benefits-radar-mobile.png"
          alt="Radar chart comparing antibody characteristics: binding affinity, specificity, activity, expression, and stability. …"
          className="block w-full aspect-[358/268.5] md:hidden"
        />
      </div>
      <div className="order-none flex w-full flex-col items-start gap-4 p-6 md:p-[30px] lg:p-10">
        <h4 className={`${H4} text-ink`}>Co-optimize all your properties</h4>
        <p className={`${BODY} w-full text-muted [text-wrap:balance] md:max-w-[80%] lg:max-w-none`}>
          Activity, binding, stability, expression, and more. Co-optimize the properties you care about, turning complex trade-offs into optimized solutions in fewer rounds.
        </p>
      </div>
    </div>
  )
}

/* ---------------- Section ---------------- */

export default function Benefits() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-white px-4 pt-10 pb-16 md:px-10 md:pt-20 md:pb-20 lg:pt-[120px]">
      <Container className="flex flex-col items-start gap-10">
        <div className="flex w-full flex-col items-start gap-5 lg:gap-[30px]">
          <div className="flex w-full flex-col items-start gap-3 md:gap-[10px] lg:gap-5">
            <Eyebrow>PROTEIN ENGINEERING 2.0</Eyebrow>
            <h2 className="font-heading font-medium text-ink text-[32px] leading-[35.2px] tracking-[-0.64px] md:text-[48px] md:leading-[48px] md:tracking-[-1.92px] lg:w-[720px] lg:text-[64px] lg:leading-[64px] lg:tracking-[-2.56px]">
              {/* Tablet (810–1199) uses different copy on live */}
              <span className="md:hidden lg:inline">Better results across<br />all your properties</span>
              <span className="hidden md:inline lg:hidden">Compounding results<br />across all properties.</span>
            </h2>
          </div>
          <p className="font-sans font-medium text-muted text-[16px] leading-6 tracking-[-0.64px] md:w-[600px] lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.8px]">
            Get products to market in quarters, not years. Use Cradle to chart the fastest course to proteins that meet all your desired objectives. Explore further, optimize faster, and reach your destination in fewer experiments.
          </p>
          <Button href="./platform" className="w-full md:w-auto">
            <span className="md:hidden">Explore Cradle Platform</span>
            <span className="hidden md:inline">Explore our platform</span>
          </Button>
        </div>
        {/* Tablet: live grid ends 46.8px below card D (empty trailing track) */}
        <div className="grid w-full grid-cols-1 grid-rows-[repeat(3,min-content)] auto-rows-min gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-5 md:pb-[46.8px] lg:pb-0">
          <CompoundingCard />
          <BreakthroughsCard />
          <VideoCard />
          <CoOptimizeCard />
        </div>
      </Container>
    </section>
  )
}
