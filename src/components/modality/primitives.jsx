import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Shared primitives for the ModalityPage template (specs/PAGES_A.md §G2/§G3, CLONE_SPEC §0).

export const EASE_FRAMER = [0.12, 0.23, 0.5, 1]
export const EASE_BACK = [0.7, -0.35, 0.3, 1.1]

// Appear-on-load configs copied from the spec (exact Framer values).
export const APPEAR_SPRING = (delay = 0) => ({
  initial: { opacity: 0.001, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring', duration: 0.8, bounce: 0, delay },
})
export const APPEAR_TWEEN_Y8 = (delay = 0) => ({
  initial: { opacity: 0.001, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'tween', duration: 0.4, ease: EASE_FRAMER, delay },
})
// `lna1wc` ("what if" blocks): tween 0.3s ease [0.12,0.23,0.19,1], delay 0.1
export const APPEAR_WHATIF = {
  initial: { opacity: 0.001, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'tween', duration: 0.3, ease: [0.12, 0.23, 0.19, 1], delay: 0.1 },
}

/* ---------- Buttons ----------
   Same-site targets render a react-router <Link>; anything without `to` (external on live)
   renders the same visual as a non-link <span>. */
const BTN_BASE = 'inline-flex shrink-0 items-center justify-center whitespace-nowrap font-sans font-semibold transition-[background,box-shadow,color] duration-100 ease-[cubic-bezier(0.12,0.23,0.5,1)]'
const BTN_VARIANT = {
  // Primary48: #224eee, hover #1b3ada
  primary: 'bg-brand text-white shadow-[inset_0_0_0_1px_rgba(0,0,0,.12)] hover:bg-brand-hover',
  // Secondary48: white→#f9fafb gradient, hover #f9fafb→#f3f4f6
  secondary: 'bg-[linear-gradient(180deg,#fff_0%,#f9fafb_100%)] text-gray-800 shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)] hover:bg-[linear-gradient(180deg,#f9fafb_0%,#f3f4f6_100%)]',
  // Ghost48 (footer CTA blue): transparent bg, white text. Hover not captured in the spec.
  ghost: 'bg-transparent text-white',
  // Secondary36-style white button used inside PhotoCards (h48 on modality pages)
  white: 'bg-white text-ink shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)]',
}
const BTN_SIZE = {
  48: 'h-12 rounded-xl text-[16px] leading-6',
  card: 'h-12 rounded-lg text-[13px] leading-[15.6px] tracking-[-0.13px] md:text-[14px] md:leading-[16.8px] md:tracking-[-0.14px]',
}

export function Btn({ to, variant = 'primary', size = 48, px = 'px-6', className = '', children }) {
  const cls = `${BTN_BASE} ${BTN_SIZE[size]} ${BTN_VARIANT[variant]} ${px} ${className}`
  if (to) return <Link to={to} className={cls}>{children}</Link>
  return <span className={`${cls} cursor-default`}>{children}</span>
}

/* ---------- Eyebrows ---------- */
const EYEBROW_TYPE = 'font-mono font-medium uppercase text-[14px] leading-6 tracking-[0.84px] md:text-[18px] md:tracking-[1.08px]'

// Eyebrow without the square, words revealed with the homepage stagger (y 8→0, 0.8s, stagger 0.1s, once).
export function WordEyebrow({ children, className = '', color = 'text-gray-400' }) {
  const words = String(children).split(' ')
  return (
    <p className={`flex flex-wrap gap-x-[0.6em] ${EYEBROW_TYPE} ${color} ${className}`}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0.001, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: 'spring', duration: 0.8, bounce: 0, delay: i * 0.1 }}
        >
          {w}
        </motion.span>
      ))}
    </p>
  )
}

// SlashEyebrow: "/" in #2d66f8 + label (row gap 5)
export function SlashEyebrow({ children, labelColor = 'text-white' }) {
  return (
    <div className={`flex items-start gap-[5px] ${EYEBROW_TYPE}`}>
      <span className="text-accent">/</span>
      <span className={labelColor}>{children}</span>
    </div>
  )
}

export function Label({ children, color }) {
  return <p className={EYEBROW_TYPE} style={{ color }}>{children}</p>
}

/* ---------- CheckBadge-green (32×32, 22×22 #3cab57 circle + white check, path M1 5 L4 8 L9.5 1) ---------- */
export function CheckBadge() {
  return (
    <motion.div
      className="relative flex h-8 w-8 shrink-0 items-center justify-center"
      initial={{ scale: 0.7 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE_FRAMER }}
    >
      <div className="absolute left-[5px] top-[5px] h-[22px] w-[22px] rounded-full bg-antibody" />
      <svg width="11" height="9" viewBox="0 0 11 9" fill="none" className="relative">
        <path d="M1 5 L4 8 L9.5 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  )
}

/* ---------- Text roles ---------- */
export const H2 = 'font-heading font-medium text-[32px] leading-[35.2px] tracking-[-0.64px] md:text-[64px] md:leading-[64px] md:tracking-[-2.56px]'
export const H4 = 'font-heading font-medium text-[18px] leading-[21.6px] md:text-[24px] md:leading-[28.8px]'
export const LEAD = 'font-sans font-medium text-[16px] leading-6 tracking-[-0.64px] md:text-[20px] md:leading-[30px] md:tracking-[-0.8px]'
export const BODY = 'font-sans font-medium text-[14px] leading-[22.4px] tracking-[-0.28px] md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]'
export const H5 = 'font-heading font-semibold text-[16px] leading-5 tracking-[-0.16px] md:text-[18px] md:leading-[25.2px] md:tracking-[-0.18px]'
