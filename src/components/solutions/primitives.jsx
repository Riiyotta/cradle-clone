import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'

// Shared building blocks for /solutions/* (specs/PAGES_A.md G2–G4, CLONE_SPEC §0).

export const EASE_FRAMER = [0.12, 0.23, 0.5, 1]
export const EASE_BACK = [0.7, -0.35, 0.3, 1.1]

// ---- Typography roles (desktop values at md+, phone below) ----
export const T = {
  h1cta: 'font-heading font-medium text-[40px] leading-[40px] tracking-[-1.6px] md:text-[72px] md:leading-[72px] md:tracking-[-2.88px]',
  h2: 'font-heading font-medium text-[32px] leading-[35.2px] tracking-[-0.64px] md:text-[64px] md:leading-[64px] md:tracking-[-2.56px]',
  h3: 'font-heading font-medium text-[24px] leading-[28.8px] tracking-[-0.48px] md:text-[32px] md:leading-[38.4px] md:tracking-[-0.64px]',
  h4: 'font-heading font-medium text-[18px] leading-[21.6px] md:text-[24px] md:leading-[28.8px]',
  h5: 'font-heading font-semibold text-[16px] leading-[20px] tracking-[-0.16px] md:text-[18px] md:leading-[25.2px] md:tracking-[-0.18px]',
  lead: 'font-sans font-medium text-[16px] leading-[24px] tracking-[-0.64px] md:text-[20px] md:leading-[30px] md:tracking-[-0.8px]',
  body: 'font-sans font-medium text-[14px] leading-[22.4px] tracking-[-0.28px] md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]',
  cardTitle: 'font-sans font-semibold text-[14px] leading-[18.2px] md:text-[16px] md:leading-[20.8px]',
}

// ---- Placeholder copy (spec gives only word counts for long paragraphs) ----
const SENTENCES = [
  'This placeholder paragraph stands in for the final product copy.',
  'It keeps the measured length so the layout matches the reference design.',
  'The wording is written separately by the content team for review before launch.',
  'It can be replaced without changing any of the surrounding structure or spacing in this section.',
]

export function ph(n, seed = 0) {
  const words = []
  for (let k = 0; words.length < n; k++) words.push(...SENTENCES[(seed + k) % SENTENCES.length].split(' '))
  const out = words.slice(0, n).join(' ').replace(/[.,]$/, '')
  return out + '.'
}

// ---- Buttons (CLONE_SPEC §0 Primary/Secondary 36/48 + Ghost48/36 from G2/B1) ----
const BTN = 'inline-flex shrink-0 items-center justify-center whitespace-nowrap font-sans font-semibold transition-[background,box-shadow,color] duration-100 ease-[cubic-bezier(0.12,0.23,0.5,1)]'
const VARIANTS = {
  secondary48: 'h-12 rounded-xl px-6 text-[16px] leading-6 text-gray-800 bg-[linear-gradient(180deg,#fff_0%,#f9fafb_100%)] hover:bg-[linear-gradient(#f9fafb,#f3f4f6)] shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)]',
  ghost48: 'h-12 rounded-xl px-5 text-[16px] leading-6 text-white bg-transparent hover:bg-black/[0.02]',
  primary36: 'h-9 rounded-lg px-4 text-[13px] leading-[15.6px] tracking-[-0.13px] md:text-[14px] md:leading-[16.8px] md:tracking-[-0.14px] text-white bg-brand hover:bg-brand-hover shadow-[inset_0_0_0_1px_rgba(0,0,0,.12)]',
  secondary36: 'h-9 rounded-lg px-5 text-[13px] leading-[15.6px] tracking-[-0.13px] text-ink bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)]',
  ghost36: 'h-9 rounded-lg px-5 text-[13px] leading-[15.6px] tracking-[-0.13px] text-white bg-transparent hover:bg-black/[0.02]',
}

export function Btn({ variant, to, onClick, className = '', children }) {
  const cls = `${BTN} ${VARIANTS[variant]} ${className}`
  if (to) return <Link to={to} className={cls}>{children}</Link>
  return <button type="button" onClick={onClick} className={cls}>{children}</button>
}

// In-page anchor: scrolls to an id on the current page (no navigation, no external target).
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', `#${id}`)
}

// ---- Glyphs (symbol markup resolved from the live page; the downloaded inline-*.svg files are <use> stubs) ----
export function CheckGlyph({ className = '', strokeWidth = 2 }) {
  return (
    <svg viewBox="0 0 10 8" className={className} fill="none" aria-hidden="true">
      <path d="M 1.5 4.5 L 4 7 L 8.5 1" stroke="#fff" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function FileGlyph({ fill, className = '' }) {
  return (
    <svg viewBox="0 0 21.6 19.2" className={className} aria-hidden="true">
      <path fill={fill} d="M 0 3.6 C 0 1.612 1.612 0 3.6 0 L 18 0 C 19.988 0 21.6 1.612 21.6 3.6 L 21.6 15.6 C 21.6 17.588 19.988 19.2 18 19.2 L 3.6 19.2 C 1.612 19.2 0 17.588 0 15.6 Z M 4.8 6 L 8.4 6 C 9.063 6 9.6 5.463 9.6 4.8 C 9.6 4.137 9.063 3.6 8.4 3.6 L 4.8 3.6 C 4.137 3.6 3.6 4.137 3.6 4.8 C 3.6 5.463 4.137 6 4.8 6 Z M 13.2 3.6 C 12.537 3.6 12 4.137 12 4.8 C 12 5.463 12.537 6 13.2 6 L 16.8 6 C 17.463 6 18 5.463 18 4.8 C 18 4.137 17.463 3.6 16.8 3.6 Z M 4.8 10.8 L 8.4 10.8 C 9.063 10.8 9.6 10.263 9.6 9.6 C 9.6 8.937 9.063 8.4 8.4 8.4 L 4.8 8.4 C 4.137 8.4 3.6 8.937 3.6 9.6 C 3.6 10.263 4.137 10.8 4.8 10.8 Z M 13.2 8.4 C 12.537 8.4 12 8.937 12 9.6 C 12 10.263 12.537 10.8 13.2 10.8 L 16.8 10.8 C 17.463 10.8 18 10.263 18 9.6 C 18 8.937 17.463 8.4 16.8 8.4 Z M 4.8 15.6 L 8.4 15.6 C 9.063 15.6 9.6 15.063 9.6 14.4 C 9.6 13.737 9.063 13.2 8.4 13.2 L 4.8 13.2 C 4.137 13.2 3.6 13.737 3.6 14.4 C 3.6 15.063 4.137 15.6 4.8 15.6 Z M 13.2 13.2 C 12.537 13.2 12 13.737 12 14.4 C 12 15.063 12.537 15.6 13.2 15.6 L 16.8 15.6 C 17.463 15.6 18 15.063 18 14.4 C 18 13.737 17.463 13.2 16.8 13.2 Z" />
    </svg>
  )
}

// "Start training" play glyph: fill + 2px stroke in the accent (live CSS vars --21h8s6 / --1m6trwb=1 / --pgex8v=2)
export function PlayGlyph({ color, className = '' }) {
  const d = 'M 0 0.736 L 0 17.259 C 0.005 17.527 0.153 17.772 0.388 17.902 C 0.623 18.031 0.91 18.025 1.139 17.886 L 14.647 9.625 C 14.866 9.492 15 9.254 15 8.997 C 15 8.741 14.866 8.503 14.647 8.37 L 1.139 0.109 C 0.91 -0.03 0.623 -0.036 0.388 0.093 C 0.153 0.222 0.005 0.468 0 0.736 Z'
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d={d} transform="translate(6.75 3.003)" fill={color} />
      <path d={d} transform="translate(6.75 3.003)" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TabGlyph({ id, d, grad, filterBox, className }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-g`} x1={grad[0]} y1={grad[1]} x2={grad[0]} y2={grad[2]} gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity={grad[3]} />
          <stop offset="1" stopColor="#fff" stopOpacity=".8" />
        </linearGradient>
        <filter id={`${id}-f`} x={filterBox[0]} y={filterBox[1]} width={filterBox[2]} height={filterBox[3]} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
          <feBlend in2="BackgroundImageFix" result="s" />
          <feBlend in="SourceGraphic" in2="s" result="shape" />
        </filter>
      </defs>
      <g filter={`url(#${id}-f)`}>
        <path fillRule="evenodd" clipRule="evenodd" d={d} fill={`url(#${id}-g)`} />
      </g>
    </svg>
  )
}

export const AntibodyGlyph = ({ className }) => (
  <TabGlyph id="sol-antibody" className={className} grad={[16, 4.083, 29.25, 1]} filterBox={[-0.584, 4.083, 33.168, 29.167]}
    d="M6.217 4.45a1.25 1.25 0 0 0-1.768 1.767l3.116 3.116-2.232 2.232L3.55 9.782a1.25 1.25 0 0 0-1.768 1.768l2.667 2.667 3.333 3.333a1.25 1.25 0 1 0 1.768-1.768L7.1 13.334l2.233-2.232 1.944 1.944a2.75 2.75 0 0 1 .806 1.945V28a1.25 1.25 0 0 0 2.5 0V14.99a5.25 5.25 0 0 0-1.538-3.712l-2.828-2.829-4-4Zm19.566 0a1.25 1.25 0 0 1 1.768 1.767l-3.116 3.116 2.232 2.232 1.783-1.783a1.25 1.25 0 0 1 1.768 1.768l-2.667 2.667-3.333 3.333a1.25 1.25 0 1 1-1.768-1.768l2.45-2.449-2.233-2.232-1.944 1.944a2.750 2.750 0 0 0-.806 1.945V28a1.25 1.25 0 0 1-2.5 0V14.99a5.25 5.25 0 0 1 1.538-3.712l2.828-2.829 4-4Z" />
)

export const PeptideGlyph = ({ className }) => (
  <TabGlyph id="sol-peptide" className={className} grad={[16.666, 2.75, 29.25, 1]} filterBox={[3.416, 2.75, 26.5, 30.5]}
    d="M13.415 6.667a1.417 1.417 0 1 0-2.833 0 1.417 1.417 0 0 0 2.833 0Zm1.918-2.057A3.917 3.917 0 1 0 9.942 10a3.914 3.914 0 0 0-1.55 4.864 3.918 3.918 0 0 0 .82 7.717 3.917 3.917 0 1 0 2.907-1.163 3.904 3.904 0 0 0 1.13-2.751c0-.543-.11-1.060-.31-1.530A3.918 3.918 0 0 0 14.056 10c.518-.32.956-.758 1.277-1.277a3.914 3.914 0 0 0 4.765 1.59 3.904 3.904 0 0 0 1.114 3.105 3.917 3.917 0 1 0 2.907 1.164 3.917 3.917 0 1 0-1.551-7.562 3.917 3.917 0 0 0-7.235-2.410Zm3.334.64a1.417 1.417 0 1 1 0 2.833 1.417 1.417 0 0 1 0-2.833Zm5.332 4a1.417 1.417 0 1 1 0 2.833 1.417 1.417 0 0 1 0-2.833Zm-12 2.667a1.417 1.417 0 1 1 0 2.833 1.417 1.417 0 0 1 0-2.833Zm-1.25 6.75a1.417 1.417 0 1 0-2.833 0 1.417 1.417 0 0 0 2.833 0Zm1.25 5.25a1.417 1.417 0 1 1 0 2.833 1.417 1.417 0 0 1 0-2.833Zm10.75-6.583a1.417 1.417 0 1 0-2.833 0 1.417 1.417 0 0 0 2.833 0Z" />
)

export const VaccineGlyph = ({ className }) => (
  <TabGlyph id="sol-vaccine" className={className} grad={[15.844, 3.356, 28.955, 0.886]} filterBox={[1.045, 3.356, 29.6, 29.599]}
    d="M21.796 3.723a1.25 1.25 0 0 1 1.768 0L25.92 6.08l2.357 2.357a1.25 1.25 0 1 1-1.768 1.767l-1.473-1.473-2.004 2.004 2.888 2.887 1.414 1.414a1.25 1.25 0 1 1-1.768 1.768l-.53-.53-2.888 2.887-3.77 3.771-1.532 1.532a2.582 2.582 0 0 1-1.655.75l-6.571.439c-.158.01-.31-.009-.453-.053l-2.99 2.99a1.25 1.25 0 0 1-1.767-1.769l3.025-3.024a1.708 1.708 0 0 1-.075-.625l.425-6.364a2.583 2.583 0 0 1 .75-1.655l8.19-8.19-.53-.53a1.25 1.25 0 1 1 1.768-1.768l1.414 1.415 2.887 2.887 2.004-2.004-1.473-1.473a1.25 1.25 0 0 1 0-1.767ZM17.494 8.73l2.888 2.888 2.887 2.887-2.003 2.003-1.473-1.472a1.25 1.25 0 0 0-1.768 1.768l1.473 1.472-2.004 2.004-1.472-1.473a1.25 1.25 0 1 0-1.768 1.768l1.473 1.472-.648.648a.083.083 0 0 1-.053.024l-6.102.407a1.712 1.712 0 0 0-.048-.085l.404-6.067c.001-.02.01-.04.024-.054l8.19-8.19Z" />
)

// ---- Continuous marquee (constant px/s, seamless). axis 'x' moves left, 'y' moves up. ----
// `gap` is the spacing between copies; each copy's own internal layout is the caller's.
export function Marquee({ axis = 'x', speed, gap, className = '', innerClassName = '', children, minCopies = 2 }) {
  const wrapRef = useRef(null)
  const copyRef = useRef(null)
  const [size, setSize] = useState(0)
  const [copies, setCopies] = useState(minCopies)
  const offset = useMotionValue(0)
  const pos = useRef(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (!copyRef.current || !wrapRef.current) return
      const c = copyRef.current.getBoundingClientRect()
      const w = wrapRef.current.getBoundingClientRect()
      const s = (axis === 'x' ? c.width : c.height) + gap
      const view = axis === 'x' ? w.width : w.height
      setSize(s)
      if (s > 0) setCopies(Math.max(minCopies, Math.ceil(view / s) + 1))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(wrapRef.current)
    if (copyRef.current) ro.observe(copyRef.current)
    return () => ro.disconnect()
  }, [axis, gap, minCopies])

  useAnimationFrame((_, delta) => {
    if (!size) return
    pos.current = (pos.current + (speed * Math.min(delta, 100)) / 1000) % size
    offset.set(-pos.current)
  })

  const flex = axis === 'x' ? 'flex-row' : 'flex-col'
  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <motion.div
        className={`flex ${flex} ${axis === 'x' ? 'w-max' : 'h-max'} ${innerClassName}`}
        style={{ [axis]: offset, gap }}
      >
        {Array.from({ length: copies }).map((_, i) => (
          <div key={i} ref={i === 0 ? copyRef : undefined} className={`flex shrink-0 ${flex}`} aria-hidden={i > 0 || undefined}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// Scroll to the hash target once the page has mounted (ScrollToTop in App only handles pathname).
export function useHashScroll() {
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }), 50)
    return () => clearTimeout(t)
  }, [])
}

// Reactive media query (phone = below the md breakpoint, 810px).
export function useMedia(query) {
  const get = () => typeof window !== 'undefined' && window.matchMedia(query).matches
  const [match, setMatch] = useState(get)
  useEffect(() => {
    const m = window.matchMedia(query)
    const on = () => setMatch(m.matches)
    on()
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [query])
  return match
}
export const useIsPhone = () => useMedia('(max-width: 809.98px)')

// Placeholder sized by character count (matches the live paragraph length so line counts line up).
export function phc(chars, seed = 0) {
  let out = ''
  for (let k = 0; out.length < chars - 1; k++) {
    for (const w of SENTENCES[(seed + k) % SENTENCES.length].split(' ')) {
      out = out ? `${out} ${w}` : w
      if (out.length >= chars - 1) break
    }
  }
  return out.replace(/[.,]$/, '') + '.'
}
