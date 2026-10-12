import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Shared primitives — CLONE_SPEC §0 "Shared components"

// Framer's default tween ease (measured on live for scroll appears, tabs, hovers)
export const FRAMER_EASE = [0.12, 0.23, 0.5, 1]

export function Eyebrow({ children, dark = false, className = "" }) {
  const words = String(children).split(' ')
  const color = dark ? 'text-white/80' : 'text-muted'
  return (
    <div className={`flex items-center gap-3 md:gap-4 ${className}`}>
      <div className="h-[9px] pt-px"><div className="h-2 w-2 rounded-[2px] bg-accent" /></div>
      {/* Desktop/tablet: per-word reveal. Live: spring 0.8s bounce 0, stagger 0.1s, y 8→0,
          fires once when ≈15% of the 24px line is visible (4px). Phone: static text. */}
      <p className={`hidden md:flex flex-wrap gap-x-[0.6em] font-mono text-[16px] leading-[24px] tracking-[0.96px] lg:text-[18px] lg:tracking-[1.08px] font-medium uppercase ${color}`}>
        {words.map((w, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.001, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ type: 'spring', duration: 0.8, bounce: 0, delay: i * 0.1 }}
            className="inline-block"
          >
            {w}
          </motion.span>
        ))}
      </p>
      <p className={`md:hidden font-mono text-[14px] leading-[24px] tracking-[0.84px] font-medium uppercase ${color}`}>{children}</p>
    </div>
  )
}

// Hover: ≈100ms tween, ease [0.12,0.23,0.5,1] (measured on live primary buttons)
const base = 'inline-flex items-center justify-center font-sans font-semibold whitespace-nowrap transition-[background,box-shadow,color] duration-100 ease-[cubic-bezier(0.12,0.23,0.5,1)]'

// `to` renders a react-router <Link>; `href={null}` renders a <button type="button"> (removed external link, same visuals)
export function Button({ variant = 'primary', size = 48, href = '#', to, className = '', children, ...rest }) {
  const sz = size === 36
    ? 'h-9 px-3 rounded-lg text-[14px] leading-[16.8px] tracking-[-0.14px]'
    : 'h-12 px-6 rounded-xl text-[16px] leading-6 md:text-[18px] md:leading-[27px] lg:text-[16px] lg:leading-6'
  const v = variant === 'primary'
    ? 'bg-brand hover:bg-brand-hover text-white shadow-[inset_0_0_0_1px_rgba(0,0,0,.12)]'
    : size === 36
      ? 'bg-white text-ink shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)]'
      : 'bg-[linear-gradient(180deg,#fff_0%,#f9fafb_100%)] hover:bg-[linear-gradient(#f9fafb,#f3f4f6)] text-gray-800 shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)]'
  const cls = `${base} ${sz} ${v} ${className}`
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  if (href === null) return <button type="button" className={`${cls} border-0 cursor-pointer`} {...rest}>{children}</button>
  return <a href={href} className={cls} {...rest}>{children}</a>
}

export function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-container ${className}`}>{children}</div>
}
