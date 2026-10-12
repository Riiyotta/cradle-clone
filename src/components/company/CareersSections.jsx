import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FRAMER_EASE } from '../ui.jsx'
import { BODY, H1, H3, H4, INLINE_LINK, LEAD } from './shared.jsx'

// /careers C1–C6 (specs/PAGES_A.md)

/* ---------- C1 Page header ---------- */
export function CareersHeader() {
  return (
    <header className="flex w-full max-w-container flex-col gap-5 px-4 py-10 md:gap-10 md:px-10 md:py-20">
      <h1 className={`${H1} hidden md:block`}>
        Help build the thing
        <br />
        scientists use to build
        <br />
        the next big thing
      </h1>
      {/* Phone: H2 36/36/-0.72 with different copy */}
      <h2 className="font-heading text-[36px] font-medium leading-[36px] tracking-[-0.72px] text-ink md:hidden">
        Build the thing scientists use to build the next big thing.
      </h2>
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-10">
        <p className={`${LEAD} max-w-[560px] text-muted`}>
          Join the best minds in biology, design, engineering and machine learning building better tools for scientists.
        </p>
        <Link
          to="/careers#careers"
          className="inline-flex h-9 w-full shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-brand px-6 font-sans text-[13px] font-semibold leading-[15.6px] tracking-[-0.13px] text-white shadow-[inset_0_0_0_1px_rgba(0,0,0,.12)] transition-[background] duration-100 ease-[cubic-bezier(0.12,0.23,0.5,1)] hover:bg-brand-hover md:h-12 md:w-auto md:rounded-xl md:text-[16px] md:leading-6 md:tracking-normal"
        >
          Open positions
        </Link>
      </div>
    </header>
  )
}

/* ---------- C2 Photo mosaic ---------- */
// Appear (exact): opacity .001→1, scale .9→1, tween 0.3s [0.12,0.23,0.5,1]; tile 1 delay 0, tile 3 0.2, tile 2 0.3. Group tile static.
function Tile({ src, className, delay }) {
  const img = <img src={`/assets/pages/careers/${src}`} alt="" className="h-full w-full object-cover" />
  if (delay === undefined) return <div className={`overflow-hidden rounded-2xl ${className}`}>{img}</div>
  return (
    <motion.div
      className={`overflow-hidden rounded-2xl ${className}`}
      initial={{ opacity: 0.001, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: FRAMER_EASE, delay }}
    >
      {img}
    </motion.div>
  )
}

export function PhotoMosaic() {
  // Desktop 4 cols × 288, rows 212, gap 16. Phone 3 cols × 114, rows 96, gap 8 (group 2×2 left, tiles 1 and 3 right, tile 2 hidden).
  return (
    <div className="grid w-full grid-cols-3 grid-rows-[96px_96px] gap-2 md:grid-cols-4 md:grid-rows-[repeat(2,minmax(0,1fr))] md:gap-4 lg:grid-rows-[212px_212px]">
      <Tile src="1-E7ZaDp.png" delay={0} className="col-start-3 row-start-1 md:col-start-1" />
      <Tile src="group-19Nkdl.jpg" className="col-span-2 col-start-1 row-span-2 row-start-1 md:col-start-2" />
      <Tile src="3-XTTHv7.png" delay={0.2} className="col-start-3 row-start-2 md:col-start-4 md:row-span-2 md:row-start-1" />
      <Tile src="2-v63kx1.png" delay={0.3} className="hidden md:col-start-1 md:row-start-2 md:block" />
    </div>
  )
}

/* ---------- Split rows (C3–C5): left 380 H3 + right 760, gap 60, padding 80 0 (phone stacked, gap 20, padding 40 0) ---------- */
function SplitRow({ id, title, titleClassName = '', border = true, contentClassName = '', children }) {
  return (
    <section
      id={id}
      className={`grid w-full scroll-mt-16 grid-cols-1 gap-5 py-10 md:grid-cols-[1fr_2fr] md:gap-[60px] md:py-20 ${border ? 'border-t border-black/[.04]' : ''}`}
    >
      <h3 className={`${H3} text-ink ${titleClassName}`}>{title}</h3>
      <div className={`flex min-w-0 flex-col ${contentClassName}`}>{children}</div>
    </section>
  )
}

/* ---------- C3 Life at Cradle ---------- */
const INTERVIEWS = [
  ['We put our CTO in a lab coat. Here’s what happened next.', '/blog/beyond-the-bench', '/assets/blog-beyond-the-bench.png'],
  ['From lab rat to data detective: How this scientist turned Sales into an art form.', '/blog/from-lab-rat-to-data-detective-how-this-scientist-turned-sales-into-an-art-form', '/assets/pages/careers/variant-1-PbdOLD.png'],
  ['Designing the future, one protein at a time: A chat with Franzi', '/blog/interviews-franzi', '/assets/pages/careers/variant-1-4NSjVd.jpg'],
  ['From Prisons to Proteins: The Unexpected Journey of a UX Researcher', '/blog/from-prisons-to-proteins', '/assets/pages/careers/variant-1-W0wS15.jpg'],
  ['From Bench to Bytes: Why This Protein Engineer Joined an AI Startup, an Interview with Jinel Shah', '/blog/interviews-jinel', '/assets/pages/careers/variant-1-wUjFRH.jpg'],
]

function InterviewRow({ title, to, img }) {
  // Hover: plate (inset −4/−6) rgba(242,243,245,.06) → #f3f4f6 and title → #030712, ≈100ms
  return (
    <Link to={to} className="group relative flex h-[75.7px] items-center gap-5">
      <span className="absolute -inset-x-[6px] -inset-y-1 rounded-xl bg-[rgba(242,243,245,.06)] transition-colors duration-100 group-hover:bg-gray-100" />
      <img src={img} alt="" className="relative h-[75.7px] w-16 shrink-0 rounded-lg object-cover object-[0%_50%]" />
      <p className={`${BODY} relative max-w-[274px] text-muted transition-colors duration-100 group-hover:text-ink md:max-w-[440px]`}>{title}</p>
    </Link>
  )
}

function VideoPoster() {
  // EXTERNAL Mave player → static poster with a player-style control bar (no playback, no external request)
  return (
    <div className="relative aspect-[560/315] w-full max-w-[560px] overflow-hidden rounded-xl bg-black">
      <img src="/assets/pages/careers/interviews-D8TD7I.jpg" alt="" className="absolute inset-x-0 top-0 h-[calc(100%-51px)] w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 flex h-[51px] items-center gap-4 bg-white px-4">
        <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z" fill="#000" /></svg>
        <span className="font-sans text-[14px] font-medium text-black">0:00</span>
        <span className="h-[2px] flex-1 rounded bg-gray-200" />
      </div>
    </div>
  )
}

export function LifeAtCradle() {
  return (
    <SplitRow title="Life at Cradle" border={false} contentClassName="gap-10 md:gap-20">
      {/* Body copy below is placeholder (~40 and ~32 words); the "here" link and last line are kept */}
      <div className="flex max-w-[600px] flex-col gap-5">
        <p className={`${BODY} text-muted`}>
          Placeholder paragraph about culture at Cradle, describing the kind of space the team has tried to build together since day one.
          <br />
          <br />
          Read more about our cultural values and their origin{' '}
          <Link to="/blog/cultural-values" className={INLINE_LINK}>here</Link>.
        </p>
        <p className={`${BODY} text-muted`}>
          Placeholder paragraph about how a team spread across several countries and time zones meets up in person on a regular basis to step back, look at the bigger picture together and have longer conversations.
        </p>
        <p className={`${BODY} text-muted`}>Here's a glimpse from our January off-site in Chamonix:</p>
      </div>
      <VideoPoster />
      <div className="flex flex-col gap-5 md:gap-10">
        <p className={`${BODY} text-ink`}>Team interviews:</p>
        <div className="grid gap-5">
          {INTERVIEWS.map(([t, to, img]) => <InterviewRow key={to} title={t} to={to} img={img} />)}
        </div>
      </div>
    </SplitRow>
  )
}

/* ---------- C4 Open positions ---------- */
// The live Ashby job list never loaded during capture; neutral placeholder rows in its place.
const JOBS = [
  ['Role title', 'Team · Location'],
  ['Role title', 'Team · Location'],
  ['Role title', 'Team · Location'],
  ['Role title', 'Team · Location'],
]

export function OpenPositions() {
  return (
    <SplitRow id="careers" title="Open positions" titleClassName="md:pt-3" contentClassName="gap-5 md:gap-10">
      <ul className="flex flex-col">
        {JOBS.map(([role, meta], i) => (
          <li key={i} className="flex flex-col gap-1 border-b border-black/[.04] py-5 first:pt-0 md:flex-row md:items-center md:justify-between md:gap-5 md:py-6 md:first:pt-3">
            <p className={`${BODY} text-ink`}>{role}</p>
            <p className={`${BODY} text-gray-400`}>{meta}</p>
          </li>
        ))}
      </ul>
      <div className="rounded-xl bg-gray-50 p-6">
        <p className={`${BODY} max-w-[460px] text-muted`}>
          Don't see a fit? We're growing fast and new roles come up often. Drop us an{' '}
          {/* EXTERNAL (jobs.ashbyhq.com) — link removed */}
          <span className={`${INLINE_LINK} cursor-pointer`}>open application</span> and we'll keep you in mind.
        </p>
      </div>
    </SplitRow>
  )
}

/* ---------- C5 Newsletter (static local stand-in for the MailerLite embed) ---------- */
const INPUT = 'h-[43px] w-full rounded-xl border border-[#ccc] bg-white px-[10px] font-sans text-[14px] font-normal text-[#666] placeholder:text-[#666] outline-none focus:border-[#999]'

export function Newsletter() {
  return (
    <SplitRow title="Newsletter" border={false} contentClassName="gap-10 md:gap-[26px]">
      <h4 className={`${H4} text-muted`}>Sign up for our email list</h4>
      {/* ~27 words, 2 lines — placeholder */}
      <p className={`${BODY} max-w-[600px] text-muted`}>
        Placeholder text inviting readers to subscribe to the email list, which is also where new open roles are announced as soon as they are published.
      </p>
      <form className="flex w-full flex-col pb-5" onSubmit={(e) => e.preventDefault()}>
        <input type="text" name="name" placeholder="First name" className={INPUT} />
        <input type="email" name="email" placeholder="Email" className={`${INPUT} mt-[10px]`} />
        <label className="mt-[21.5px] flex cursor-pointer items-center gap-[11px] font-sans text-[12px] font-normal leading-[13px] text-[#5c5c5c]">
          <input type="checkbox" className="h-[13px] w-[13px] shrink-0 rounded-[3px] border border-[#ccc] accent-accent" />
          Yes, I want to receive updates from Cradle.
        </label>
        <button type="submit" className="mt-[29.5px] h-[41px] w-full rounded-xl bg-accent font-sans text-[14px] font-bold text-white">
          Subscribe
        </button>
      </form>
    </SplitRow>
  )
}

/* ---------- C6 Recruitment scam notice ---------- */
export function ScamNotice() {
  return (
    <section className="flex w-full justify-center bg-[#f1f6d1] px-5 py-10 md:px-10">
      <div className="grid w-full max-w-container grid-cols-1 gap-5 md:grid-cols-[1fr_2fr] md:gap-[60px]">
        <p className="font-sans text-[14px] font-semibold leading-[18.2px] text-[#20290a] md:text-[16px] md:leading-[20.8px]">A notice about recruitment scams</p>
        {/* ~56 words, 3 lines — placeholder */}
        <p className={`${BODY} text-[#49581c]`}>
          Placeholder notice text. It warns that people may pose as recruiters to obtain personal details or money, names the only email domain used for contact, explains that offers follow an in-person meeting at an office, and states that candidates never pay for anything during the process.
        </p>
      </div>
    </section>
  )
}
