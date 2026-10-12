import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { BODY, GlassPlay, H1, H2, H4, LEAD, LinkButton } from './shared.jsx'
import { FLOATING, LAB_MEMBERS, LAB_PHONE_TILES, LAB_POSTS } from './labData.js'

// /lab L1–L7 (specs/PAGES_A.md)

/* ---------- L1 Header ---------- */
function VisitorBadge() {
  // 58.4×23.4 (phone 48.7×19.5), rotated −5°, orange gradient frame + inner plate, Spot Mono 12 (phone 10)
  return (
    <div className="absolute left-[25.9%] top-[49.3%] flex h-[19.5px] w-[48.7px] -rotate-[5deg] rounded bg-[linear-gradient(#ffc591,#ff9d47)] p-[1.21px] shadow-[0_.75px_.5px_rgba(0,0,0,.12)] md:h-[23.4px] md:w-[58.4px] md:p-[1.45px] md:shadow-[0_.9px_.5px_rgba(0,0,0,.12)]">
      <div className="flex flex-1 items-center justify-center rounded-[2px] bg-[linear-gradient(#ff7700,#ed6f00)] shadow-[inset_0_.54px_1px_rgba(0,0,0,.08)]">
        <span className="font-mono text-[10px] font-normal leading-[10px] text-white/[.98] md:text-[12px] md:leading-3">VISITOR</span>
      </div>
    </div>
  )
}

export function LabHeader() {
  const { scrollY } = useScroll()
  const coatY = useTransform(scrollY, (v) => v * 0.2) // sinks behind the text: +0.2·scrollY
  return (
    <header className="flex h-[844px] w-full max-w-container flex-col items-center bg-white px-4 pt-[204.5px] md:h-[900px] md:justify-center md:px-10 md:pb-20 md:pt-[60px]">
      <motion.div style={{ y: coatY }} className="relative z-0">
        <motion.div
          className="lab-coat relative h-[349px] w-[300px] md:h-[422px] md:w-[360px]"
          initial={{ opacity: 0.001, scale: 0.85, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.02, 0.64, 0.61, 1], delay: 0.9 }}
        >
          <img src="/assets/pages/lab/coat-FjFiAj.png" alt="" className="h-full w-full object-cover object-top [filter:hue-rotate(0deg)_saturate(.82)] md:h-[420px]" />
          <VisitorBadge />
        </motion.div>
      </motion.div>
      <h1 className={`${H1} relative z-[1] mt-[52.5px] w-full text-center md:mt-0`}>Here, put this on.</h1>
      <motion.p
        className={`${LEAD} relative z-[1] mt-5 w-full text-center text-muted`}
        initial={{ opacity: 0.001, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.44, 0, 0.56, 1], delay: 1.2 }}
      >
        <motion.span
          className="inline-block"
          animate={{ y: [0, 3] }}
          transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror', delay: 1.8 }}
        >
          <span className="md:hidden">Scroll to explore the Cradle wet lab.</span>
          <span className="hidden md:inline">Scroll to explore the Cradle Amsterdam wet lab.</span>
        </motion.span>
      </motion.p>
    </header>
  )
}

/* ---------- L2 Aerial photo ---------- */
const COORDS = '(52.390999, 4.835315)'

export function AerialPhoto() {
  const { scrollY } = useScroll()
  const scale = useTransform(scrollY, [0, 545], [1.2, 1], { clamp: true }) // 1.2 at 0, ≈−0.00036/px
  return (
    <section className="relative h-[400px] w-full overflow-hidden bg-white md:h-[550px]">
      <motion.img
        src="/assets/pages/lab/img-piUfsp.jpg"
        alt=""
        style={{ scale }}
        className="lab-aerial absolute left-[-10%] top-[-10%] h-[120%] w-[120%] object-cover opacity-90"
      />
      <div className="absolute inset-x-0 top-0 h-[180px] bg-[linear-gradient(rgba(3,7,18,.32),rgba(3,7,18,0))] md:h-[216px]" />
      <div className="absolute left-5 top-5">
        <p className={`${BODY} text-white`}>Cradle Amsterdam HQ</p>
        <motion.p
          className={`${BODY} text-white/80`}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.005 } } }}
        >
          {COORDS.split('').map((c, i) => (
            <motion.span key={i} variants={{ hidden: { opacity: 0.001 }, show: { opacity: 1, transition: { duration: 0.01 } } }}>{c}</motion.span>
          ))}
        </motion.p>
      </div>
    </section>
  )
}

/* ---------- L3 Intro ---------- */
export function LabIntro() {
  return (
    <section className="flex w-full max-w-container justify-center bg-white px-4 py-20 md:px-10 lg:h-[720px] lg:items-center lg:py-[120px]">
      <div className="flex w-full max-w-[720px] flex-col gap-5 md:gap-10">
        <h2 className={`${H2} relative text-center text-ink`}>
          <span className="md:hidden">A software company. <br />With a wet lab. Why?</span>
          <span className="hidden md:inline">A software company. <br />With a wet lab. Here's why.</span>
          {/* Hand-drawn circle (desktop): 194.4×101.5 at (547.9, 44.7) from the H2 box; draw-on ≈1.15s ease-in-out, ≈90ms after entering */}
          <svg viewBox="0 0 134 70" className="pointer-events-none absolute left-[547.9px] top-[44.7px] hidden h-[101.5px] w-[194.4px] lg:block" aria-hidden="true">
            <motion.path
              d="M 55.074 8 C 55.074 8 -56.584 42.197 38.074 59.5 C 132.731 76.803 125.367 0 46.574 0"
              fill="none" stroke="#2d66f8" strokeWidth="3" strokeLinecap="round" strokeMiterlimit="4"
              transform="translate(13.426 4)"
              strokeDasharray="270.58 270.58"
              initial={{ strokeDashoffset: 270.58 }}
              whileInView={{ strokeDashoffset: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.15, ease: 'easeInOut', delay: 0.09 }}
            />
          </svg>
        </h2>
        <div className="flex flex-col gap-5">
          <p className={`${LEAD} text-center text-gray-800`}>
            Many AI protein engineering companies work purely <em>in silico</em>. We're different.
          </p>
          {/* ~46 words, 4 lines — placeholder */}
          <p className={`${LEAD} text-center text-gray-800`}>
            Placeholder paragraph explaining why the company runs its own wet lab alongside its software. It describes how real experiments produce reliable results and how an in-house lab helps the team move faster by continually improving the models behind the platform.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ---------- L4 Perks ---------- */
const PERKS = [
  ['Models, meet reality', 'Placeholder description of how each new model iteration is tested against the previous one in the lab, and how results across many different assays and properties are compared systematically, so that each release can be confirmed to improve on the models that came before it.'],
  ['Large datasets build smarter models', 'Placeholder description of how the scientists design large targeted datasets that capture relationships between sequence and properties, mapping how changes affect expression, stability and solubility, so that the default models keep getting better.'],
  ['Built by scientists, for scientists', 'Placeholder description of how having scientists in-house helps the team understand the daily challenges of protein engineering. It covers the exchange between software, machine learning and biology teams, how that shapes the product, and how findings and methods are shared with the wider scientific community through the blog.'],
]

export function Perks() {
  return (
    <section className="flex w-full justify-center bg-white px-4 pb-16 md:px-10 md:pb-[120px]">
      <div className="flex w-full max-w-container flex-col gap-5 md:flex-row md:gap-10">
        <div className="aspect-[358/268.5] w-full overflow-hidden rounded-2xl opacity-90 md:aspect-auto md:flex-1">
          <video className="h-full w-full object-cover" src="/assets/pages/team/intro-3xPwhR.mp4" poster="/assets/pages/team/intro-DCTQ1c.png" autoPlay muted loop playsInline />
        </div>
        <div className="flex flex-col gap-10 py-5 md:flex-1 md:gap-[60px]">
          {PERKS.map(([t, d]) => (
            <div key={t} className="flex flex-col gap-3">
              <h4 className={`${H4} text-ink`}>{t}</h4>
              <p className={`${BODY} text-muted`}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- L5 Automation ---------- */
function VideoCard() {
  // Clicking opened nothing measurable on live → non-interactive card
  return (
    <div className="fborder flex h-28 w-full cursor-pointer items-center gap-4 rounded-2xl bg-white p-4 backdrop-blur-[10px] [--fb:1px_solid_rgba(255,255,255,.08)]">
      <div className="relative h-20 w-[120px] shrink-0 overflow-hidden rounded-md">
        <img src="/assets/pages/lab/automation-PHAYVk.png" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center"><GlassPlay /></div>
      </div>
      <div className="flex flex-col gap-[6px]">
        <p className="font-sans text-[14px] font-semibold leading-[18.2px] text-gray-800 md:text-[16px] md:leading-[20.8px]">Lab automation at Cradle</p>
        <p className={`${BODY} text-gray-400`}>3 min</p>
      </div>
    </div>
  )
}

function LabPostCard({ title, to, img }) {
  // Hover: frame bg rgba(255,255,255,.12) → white ≈100ms. Phone: horizontal row 358×84.
  return (
    <Link to={to} className="group flex items-center gap-4 md:flex-col md:items-stretch md:gap-[10px]">
      <div className="w-[133.3px] shrink-0 rounded-xl bg-white/[.12] p-1 transition-colors duration-100 group-hover:bg-white md:w-auto">
        <img src={img} alt="" className="aspect-[125.3/76] w-full rounded-lg object-cover md:aspect-[297/180.3]" />
      </div>
      <p className="font-sans text-[14px] font-semibold leading-[18.2px] text-white md:text-[16px] md:leading-[20.8px]">{title}</p>
    </Link>
  )
}

export function Automation() {
  return (
    <section className="relative flex w-full justify-center overflow-hidden bg-[linear-gradient(#224eee_55%,#0ea5e9_100%)] pb-10 pt-[120px] md:px-10 md:pb-[120px]">
      <motion.video
        className="lab-auto-video pointer-events-none absolute left-0 top-0 aspect-[1440/768.9] w-full object-cover"
        src="/assets/pages/lab/automation-tNNkDQ.mp4"
        autoPlay muted loop playsInline
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      />
      <div className="relative flex w-full max-w-container flex-col gap-[60px] md:gap-20">
        <div className="flex flex-col gap-5 px-4 md:flex-row md:gap-10 md:px-0">
          <h2 className={`${H2} bg-[linear-gradient(270deg,#eff4ff,#fff)] bg-clip-text text-transparent md:flex-1`}>
            Solving the data <br />bottleneck with automation.
          </h2>
          <div className="flex flex-col gap-10 md:flex-1 md:pt-4">
            <div className="flex flex-col gap-5">
              <p className={`${LEAD} text-white/90`}>
                Biology has always moved on slow feedback loops. The faster we can generate lab data, the faster our AI models get better.
              </p>
              {/* ~59 words, 6 lines — placeholder */}
              <p className={`${LEAD} text-white/90`}>
                Placeholder paragraph about how lab workflows are optimised and automated to speed up iteration and improve the machine learning models. It mentions fewer manual errors, higher-quality data, robots taking over repetitive tasks so scientists can focus on harder questions, and how the overall turnaround time for a full experimental cycle has dropped from several months down to only a few weeks.
              </p>
            </div>
            <VideoCard />
          </div>
        </div>
        <div className="flex flex-col gap-9 border-t border-white/[.08] pb-4 pt-10 md:gap-10 md:pb-0">
          <div className="flex flex-col gap-2 pl-4 md:pl-0">
            <h3 className="font-heading text-[24px] font-medium leading-[28.8px] tracking-[-0.48px] text-white md:text-[32px] md:leading-[38.4px] md:tracking-[-0.64px]">More learnings from the lab</h3>
            <p className={`${LEAD} text-white/60`}>We're big on automation—and sharing our knowledge.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 px-4 md:grid-cols-4 md:px-0">
            {LAB_POSTS.map(([t, to, img], i) => (
              <div key={to} className={i === 3 ? 'hidden md:block' : ''}><LabPostCard title={t} to={to} img={img} /></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- L6 Meet the team (LabTeamSelector) ---------- */
function LinkedInIcon() {
  // EXTERNAL linkedin.com target removed — icon only
  return (
    <span className="h-5 w-5 shrink-0" aria-hidden="true">
      <svg viewBox="0 0 20 20" className="h-5 w-5">
        <path d="M 2.222 20 L 17.778 20 C 19.005 20 20 19.005 20 17.778 L 20 2.222 C 20 0.995 19.005 0 17.778 0 L 2.222 0 C 0.995 0 0 0.995 0 2.222 L 0 17.778 C 0 19.005 0.995 20 2.222 20 Z" fill="rgba(255,255,255,.4)" />
        <path d="M 17.222 17.222 L 14.254 17.222 L 14.254 12.167 C 14.254 10.781 13.728 10.007 12.631 10.007 C 11.437 10.007 10.814 10.813 10.814 12.167 L 10.814 17.222 L 7.953 17.222 L 7.953 7.593 L 10.814 7.593 L 10.814 8.89 C 10.814 8.89 11.674 7.298 13.717 7.298 C 15.76 7.298 17.222 8.546 17.222 11.125 Z M 4.541 6.332 C 3.567 6.332 2.778 5.536 2.778 4.555 C 2.778 3.573 3.567 2.778 4.542 2.778 C 5.516 2.778 6.305 3.573 6.305 4.555 C 6.305 5.536 5.516 6.332 4.542 6.332 Z M 3.065 17.222 L 3.065 7.592 L 6.047 7.592 L 6.047 17.222 Z" fill="#fff" />
      </svg>
    </span>
  )
}

const QUOTE_MARK = 'M 13.133 1.498 C 14.4 0.461 15.667 0 16.819 0 C 18.202 0 19.469 1.152 19.469 2.65 C 19.469 3.802 18.893 4.954 17.51 5.99 C 12.096 9.907 8.41 16.474 8.179 20.736 C 8.986 20.506 9.677 20.39 10.483 20.39 C 14.4 20.39 17.856 23.155 17.856 27.878 C 17.856 32.602 14.17 35.827 9.101 35.827 C 3.226 35.827 0 31.565 0 24.883 C 0 15.322 6.451 6.221 13.133 1.498 Z M 36.883 1.498 C 38.15 0.461 39.302 0 40.454 0 C 41.952 0 43.219 1.152 43.219 2.65 C 43.219 3.802 42.643 4.954 41.261 5.99 C 35.846 9.907 32.16 16.474 31.93 20.736 C 32.736 20.506 33.427 20.39 34.234 20.39 C 38.15 20.39 41.606 23.155 41.606 27.878 C 41.606 32.602 37.92 35.827 32.851 35.827 C 26.976 35.827 23.635 31.565 23.635 24.883 C 23.635 15.322 30.202 6.221 36.883 1.498 Z'

const SWAP = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3, ease: 'easeOut' } }

function DesktopSelector() {
  const [idx, setIdx] = useState(0)
  const m = LAB_MEMBERS[idx]
  return (
    // 752 tall, overflow hidden, content (550 + 12 + 219) centered → clipped 14.5px top and bottom as on live
    <div className="hidden h-[752px] flex-col justify-center gap-3 overflow-hidden md:flex">
      <div className="grid h-[550px] shrink-0 grid-cols-[543.4fr_389.3fr_325.3fr] gap-3">
        <div className="relative overflow-hidden rounded-xl">
          <AnimatePresence initial={false}>
            <motion.img key={m.photo} src={m.photo} alt="" className="absolute inset-0 h-full w-full object-cover" {...SWAP} />
          </AnimatePresence>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(3,7,18,0)_14%,rgba(3,7,18,.5)_70%)]" />
          <div className="absolute inset-x-8 bottom-8 flex flex-col justify-center gap-1">
            <div className="flex items-center gap-[10px]">
              <h4 className={`${H4} text-white`}>{m.name}</h4>
              <LinkedInIcon />
            </div>
            <h4 className={`${H4} text-white/70`}>{m.role}</h4>
          </div>
        </div>
        <div className="flex flex-col justify-between rounded-xl bg-accent p-8">
          <svg viewBox="0 0 43.219 35.827" className="h-9 w-[43px]" aria-hidden="true"><path d={QUOTE_MARK} fill="#5e95fc" /></svg>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p key={m.name} className={`${BODY} text-white`} {...SWAP}>{m.quote}</motion.p>
          </AnimatePresence>
        </div>
        <div className="flex flex-col gap-3">
          <div className="fborder group relative flex h-[394px] items-center justify-center rounded-xl bg-white p-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img key={m.device} src={m.device} alt="" className="h-[180px] w-[180px] object-contain" {...SWAP} />
            </AnimatePresence>
            <svg viewBox="0 0 24 24" className="absolute right-5 top-5 h-5 w-5" aria-hidden="true">
              <path d="M 7 8 L 9 8 L 9 13 M 7 13 L 11 13 M 8.408 4.5 L 8.418 4.5 M 18 9 C 18 13.971 13.971 18 9 18 C 4.029 18 0 13.971 0 9 C 0 4.029 4.029 0 9 0 C 13.971 0 18 4.029 18 9 Z" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 3)" />
            </svg>
            {/* Hover: description overlay fades in (opacity 0→1) */}
            <div className="absolute inset-[10px] bg-white/10 p-5 opacity-0 backdrop-blur-[5px] transition-opacity duration-200 group-hover:opacity-100">
              <p className="font-sans text-[14px] font-medium leading-[22.4px] text-muted">
                {/* Jinel's equipment links to tecan.com on live (EXTERNAL) — rendered as plain text */}
                <span>{m.equipment}</span>: {m.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Next team member"
            onClick={() => setIdx((i) => (i + 1) % LAB_MEMBERS.length)}
            className="fborder flex h-36 cursor-pointer items-center justify-center rounded-xl bg-white"
          >
            <span className="lab-arrow h-[54px] w-[54px] bg-brand" />
          </button>
        </div>
      </div>
      <div className="grid h-[219px] shrink-0 grid-cols-7 gap-3">
        {LAB_MEMBERS.map((t, i) => (
          <button
            key={t.name}
            type="button"
            aria-label={t.name}
            onClick={() => setIdx(i)}
            className={`fborder h-[218px] overflow-hidden rounded-xl ${i === idx ? '[--fb:3px_solid_#2d66f8]' : '[--fb:4px_solid_rgba(45,102,248,0)]'}`}
          >
            <img src={t.tile} alt="" className={`h-full w-full object-cover transition-[filter] duration-300 ${i === idx ? '' : 'grayscale'}`} />
          </button>
        ))}
      </div>
    </div>
  )
}

export function MeetTheTeam() {
  return (
    <section className="flex w-full justify-center bg-white px-4 pb-16 pt-[60px] md:px-10 md:py-[120px]">
      <div className="flex w-full max-w-container flex-col gap-[26px] md:gap-10">
        <div className="flex flex-col gap-[10px]">
          <h2 className={`${H2} text-ink`}>Meet the team</h2>
          <p className={`${BODY} text-muted opacity-80 md:hidden`}>Psst! Tap any team member to find out what their favourite lab device is.</p>
        </div>
        <DesktopSelector />
        {/* Phone: 2-col grid 174×222.7, r11, gap 10 (tap-to-reveal state not captured on live) */}
        <div className="grid grid-cols-2 gap-[10px] md:hidden">
          {LAB_PHONE_TILES.map(([name, img]) => (
            <div key={name} className="relative aspect-[174/222.7] overflow-hidden rounded-[11px]">
              <img src={img} alt="" className="h-full w-full object-cover" />
              <h4 className={`${H4} absolute bottom-3 left-3 text-white`}>{name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- L7 Sharing is caring ---------- */
function FloatingPostCard({ c }) {
  return (
    <motion.div
      className="absolute"
      style={{ left: c.x, top: c.y, width: c.w }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: c.delay }}
    >
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.1 }}>
        <Link to={c.to} className="flex flex-col" style={{ gap: c.gap }}>
          <div className="relative" style={{ aspectRatio: c.ar }}>
            <img
              src={c.img} alt="" aria-hidden="true"
              className="absolute left-0 h-full w-full object-cover"
              style={{ top: c.glow.y, opacity: c.glow.op, filter: `blur(${c.glow.blur}px)`, borderRadius: c.glow.r }}
            />
            <img src={c.img} alt="" className="relative h-full w-full object-cover opacity-90" style={{ borderRadius: c.radius }} />
          </div>
          <p className={`font-sans font-semibold text-white opacity-80 ${c.titleCls}`}>{c.title}</p>
        </Link>
      </motion.div>
    </motion.div>
  )
}

const PHONE_GRID = ['/assets/blog-beyond-the-bench.png', '/assets/blog-sample-tracking.jpg', '/assets/blog-webinar-lab-automation.jpg', '/assets/blog-protein-tags.png']

export function SharingIsCaring() {
  return (
    <section className="flex w-full flex-col items-center gap-10 overflow-hidden bg-ink px-4 pb-[60px] pt-20 md:h-[900px] md:justify-center md:px-10 md:py-[200px]">
      {/* Phone: 2×2 grid (174×90 tiles, gap 10) tilted in 3D (rotateY 40°, rotateX 20°) */}
      <div
        className="grid w-full grid-cols-2 gap-[10px] md:hidden"
        style={{ transform: 'matrix3d(0.766044, -0.219846, 0.604023, 0, 0, 0.939693, 0.34202, 0, -0.642788, -0.262003, 0.719846, 0, 0, 0, 0, 1)' }}
      >
        {PHONE_GRID.map((s) => <img key={s} src={s} alt="" className="h-[90px] w-full rounded-lg object-cover" />)}
      </div>
      <div className="relative flex w-full max-w-[550px] flex-col items-center gap-10">
        <div className="pointer-events-none absolute inset-0 hidden md:block [&_a]:pointer-events-auto">
          {FLOATING.map((c) => <FloatingPostCard key={c.key} c={c} />)}
        </div>
        <h2 className={`${H2} text-center text-white`}>Sharing is caring</h2>
        {/* ~30 and ~42 words — placeholder */}
        <div className="flex flex-col gap-5">
          <p className={`${LEAD} text-center text-white/80`}>
            Placeholder paragraph about how most labs keep their work private, while this team takes a different approach and openly shares its workflows and insights with the wider community.
          </p>
          <p className={`${LEAD} text-center text-white/80`}>
            Placeholder paragraph about how machine learning speeds up research cycles that still often take months, and how sharing what is learned in real time can help other teams adopt these tools more quickly and move their own research forward.
          </p>
        </div>
        <LinkButton to="/blog" variant="secondary">Explore blog posts</LinkButton>
      </div>
    </section>
  )
}
