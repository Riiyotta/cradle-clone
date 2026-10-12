import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { WordReveal } from '../Motion.jsx'
import { ph } from '../blogData.js'
import { LADDER_LABELS, TOC } from './content.js'

// Shared type (PAGES_B §B2.3 body scale, reused on /blog/maturity)
export const P = 'font-sans font-medium text-gray-800 text-[14px] leading-[24.5px] tracking-[-0.14px] md:text-[16px] md:leading-[28px] md:tracking-[-0.16px]'
export const H1 = 'font-heading font-semibold text-[28px] leading-[28px] tracking-[-0.56px] md:text-[44px] md:leading-[44px] md:tracking-[-0.88px]'
export const H2 = 'font-heading font-semibold text-[24px] leading-[33.6px] tracking-[-0.48px] md:text-[36px] md:leading-[43.2px] md:tracking-[-0.72px]'
export const H3 = 'font-heading font-semibold text-[22px] leading-[30.8px] tracking-[-0.44px] md:text-[28px] md:leading-[33.6px] md:tracking-[-0.56px]'
const BIG = 'font-heading font-medium text-[32px] leading-[35.2px] tracking-[-0.64px] md:text-[64px] md:leading-[64px] md:tracking-[-2.56px]'

export const Ph = ({ n, seed, className = P }) => <p className={className}>{ph(n, seed)}</p>

// ---------- §B3.1 on-page TOC (fixed) ----------
export function OnPageTOC() {
  const [open, setOpen] = useState(false)
  return (
    <div className="pointer-events-none fixed inset-0 z-[8] flex flex-col items-end justify-end gap-[10px] p-5 md:items-start">
      <AnimatePresence>
        {open && (
          <motion.nav
            key="panel"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="pointer-events-auto flex w-[248px] flex-col rounded-xl bg-white p-1 shadow-[rgba(0,0,0,.08)_0_1px_16px_0]"
          >
            {TOC.map((t) => (
              <motion.a
                key={t.href}
                href={t.href}
                onClick={() => setOpen(false)}
                initial={{ height: 55 }}
                animate={{ height: 58 }}
                transition={{ duration: 0.2 }}
                className="flex w-[240px] flex-col justify-center gap-1 overflow-hidden rounded-lg bg-white p-3"
              >
                <span className="font-sans text-[10px] font-semibold uppercase leading-[13px] tracking-[0.8px] text-gray-400">{t.kicker}</span>
                <span className="font-sans text-[14px] font-semibold leading-[16.8px] tracking-[-0.14px] text-ink">{t.title}</span>
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        aria-label="Table of contents"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        initial={{ backgroundColor: '#1f2937' }}
        whileHover={{ backgroundColor: '#374151' }}
        transition={{ duration: 0.15 }}
        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-xl shadow-[rgba(0,0,0,.08)_0_1px_16px_0]"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
          <path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.5" cy="6" r=".75" fill="#fff" /><circle cx="4.5" cy="12" r=".75" fill="#fff" /><circle cx="4.5" cy="18" r=".75" fill="#fff" />
        </svg>
      </motion.button>
    </div>
  )
}

// ---------- §B3.2 (3) interactive ladder ----------
function Bar({ i, label }) {
  const last = i === 4
  const cls = `flex flex-1 flex-col items-start p-2 md:w-[216px] md:flex-none md:p-5 ${last ? 'rounded-t-lg md:rounded-t-xl' : 'rounded-tl-lg md:rounded-tl-xl'}`
  const props = {
    initial: { backgroundColor: '#2d66f8' },
    whileHover: { backgroundColor: '#5e95fc' },
    transition: { duration: 0.15 },
    className: cls,
    style: { '--h': `${40 + i * 20}px`, '--hd': `${80 + i * 80}px` },
  }
  const content = <h5 className="font-heading text-[8px] font-semibold leading-[11.2px] text-white/90 md:text-[18px] md:leading-[25.2px] md:tracking-[-0.18px]">{label}</h5>
  const sized = 'h-[var(--h)] md:h-[var(--hd)]'
  return i === 0
    ? <MotionLink to="/" {...props} className={`${cls} ${sized}`}>{content}</MotionLink>
    : <motion.div {...props} className={`${cls} ${sized}`}>{content}</motion.div>
}
const MotionLink = motion(Link)

function Pill({ children }) {
  return (
    <span className="fborder shrink-0 rounded-[1000px] bg-white px-3 py-1 font-heading text-[10px] font-semibold leading-[12.5px] text-muted md:text-[18px] md:leading-[25.2px] md:tracking-[-0.18px]">
      {children}
    </span>
  )
}

export function InteractiveLadder() {
  return (
    <section className="flex w-full flex-col items-center bg-gray-50 px-4 py-10 md:px-20 md:py-[120px]">
      <div className="flex w-full max-w-[1080px] flex-col">
        <div className="flex items-end gap-px md:gap-0">
          {LADDER_LABELS.map((l, i) => <Bar key={l} i={i} label={l} />)}
        </div>
        <div className="flex items-center gap-5 pt-6">
          <Pill>Old car</Pill>
          <div className="h-[2px] flex-1 bg-blue-300" />
          <Pill>Waymo</Pill>
        </div>
      </div>
    </section>
  )
}

// ---------- §B3.2 (4) sticky level indicator ----------
export function StickyLevelIndicator({ active }) {
  return (
    <div className="sticky top-[160px] flex h-[50px] w-[120px] shrink-0 items-end">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`w-6 ${i === 4 ? 'rounded-t-[2px]' : 'rounded-tl-[2px]'}`}
          style={{ height: 10 + i * 10, background: i === active ? '#2d66f8' : '#d1d5db' }}
        />
      ))}
    </div>
  )
}

// Active level = last block whose top has passed y=160 (scroll-driven, instant).
export function useActiveLevel(ids) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const on = () => {
      let a = 0
      ids.forEach((id, i) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= 161) a = i })
      setActive(a)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [ids])
  return active
}

// ---------- §B3.2 (8) section header band ----------
export function SectionHeaderBand({ id, num, title, band, numColor }) {
  return (
    <section id={id} className="relative flex h-[450px] w-full items-center justify-center overflow-clip md:h-[500px] md:py-[120px]" style={{ background: band }}>
      <p
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-heading text-[200px] font-medium leading-[240px] md:text-[400px] md:leading-[480px]"
        style={{ color: numColor }}
      >
        {num}
      </p>
      <WordReveal text={title} className={`relative w-full px-5 text-center text-white ${BIG}`} />
    </section>
  )
}

// ---------- quote (wordReveal) ----------
export function QuoteReveal({ text, band, color }) {
  // padding-left 40 (phone 20); ::after left border 8px (phone 4px) in the band colour
  return (
    <div className="relative flex w-full pl-5 md:pl-10">
      <span aria-hidden className="absolute inset-y-0 left-0 w-1 md:w-2" style={{ background: band }} />
      <WordReveal text={text} className={`w-full ${BIG}`} style={{ color }} wordClassName="" />
    </div>
  )
}

// ---------- What It Means / Why It Matters card ----------
export function InfoCard({ title, n, seed, band, radius }) {
  return (
    <div className="flex w-full flex-col gap-4 bg-gray-50 p-8" style={{ borderRadius: radius }}>
      <h4 className="font-heading text-[18px] font-semibold leading-[21.6px]" style={{ color: band }}>{title}</h4>
      <Ph n={n} seed={seed} />
    </div>
  )
}

// 28×28 icon of five stacked 14×2 bars (low: bottom bar in band colour; high: all bars).
function MaturityIcon({ band, high }) {
  return (
    <div className="flex h-7 w-7 shrink-0 flex-col items-center justify-center gap-[1.5px]">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="h-[2px] w-[14px] rounded-[1px]" style={{ background: high || i === 4 ? band : '#e5e7eb' }} />
      ))}
    </div>
  )
}

export function SpectrumRow({ label, high, items, band, seed }) {
  return (
    <div className="flex w-full gap-5">
      <MaturityIcon band={band} high={high} />
      <div className="flex min-w-0 flex-1 flex-col">
        <p className={P}><strong className="font-bold">{label}</strong></p>
        <ul className="mt-4 list-disc pl-[20.66px] marker:text-gray-800">
          {items.map((n, j) => <li key={j} className={P}>{ph(n, `${seed}:${j}`)}</li>)}
        </ul>
      </div>
    </div>
  )
}

// ---------- §B3.2 (11) HS Form card (static local stand-in for the EXTERNAL HubSpot embed) ----------
export function HSFormCard() {
  const field = 'h-10 w-full rounded-lg border border-gray-300 bg-white px-3 font-sans text-[14px] text-ink placeholder:text-muted outline-none focus:border-accent'
  const lab = 'flex flex-col gap-1 font-sans text-[13px] font-medium text-gray-800'
  return (
    <div className="flex w-full justify-center pb-[50px]">
      <div className="flex w-full max-w-[800px] flex-col items-center gap-[10px] rounded-2xl bg-blue-50 p-5 md:p-[45px]">
        <h2 className={`text-center text-gray-800 ${H2}`}>
          <span className="text-[rgba(31,42,56,.6)]">Is your R&amp;D ML ready?</span>
          <br />
          Get in touch to get a personal assessment.
        </h2>
        {/* HubSpot iframe 710×368 (EXTERNAL; inner fields not measured) */}
        <form className="flex w-full max-w-[710px] flex-col gap-3 md:h-[368px]" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-3 md:flex-row">
            <label className={`${lab} flex-1`}>First name<input className={field} type="text" /></label>
            <label className={`${lab} flex-1`}>Last name<input className={field} type="text" /></label>
          </div>
          <label className={lab}>Work email<input className={field} type="email" /></label>
          <label className={lab}>Company<input className={field} type="text" /></label>
          <button type="submit" className="mt-2 h-10 self-start rounded-lg bg-brand px-5 font-sans text-[14px] font-semibold text-white hover:bg-brand-hover">Submit</button>
        </form>
      </div>
    </div>
  )
}
