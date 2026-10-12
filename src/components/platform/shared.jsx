import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Shared type roles for /platform (specs/PAGES_A.md /platform; tablet values measured on live at 1000)
// phone (<810) → tablet (md) → desktop (lg)
export const H2 = 'font-heading font-medium text-ink text-[32px] leading-[35.2px] tracking-[-0.64px] md:text-[48px] md:leading-[48px] md:tracking-[-1.92px] lg:text-[64px] lg:leading-[64px] lg:tracking-[-2.56px]'
export const LEAD = 'font-sans font-medium text-muted text-[16px] leading-[24px] tracking-[-0.64px] lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.8px]'
export const H4 = 'font-heading font-medium text-[18px] leading-[21.6px] lg:text-[24px] lg:leading-[28.8px]'
export const BODY = 'font-sans font-medium text-[14px] leading-[22.4px] tracking-[-0.28px] md:leading-[21px] lg:text-[16px] lg:leading-[25.6px] lg:tracking-[-0.32px]'
// CLONE_SPEC §0 / PAGES_A G2: InlineLink #0284c7, hover #0ea5e9 (instant)
export const INLINE_LINK = 'text-[#0284c7] hover:text-[#0ea5e9]'
// Gradient-clipped heading text (P7/P8 H2)
export const GRADIENT_H2 = 'bg-[linear-gradient(270deg,#1f2937_0%,#030712_100%)] bg-clip-text [-webkit-text-fill-color:transparent]'

// Breakpoint for motion variants that differ per layout (Framer Desktop/Tablet/Phone)
export function useBreakpoint() {
  const get = () => (typeof window === 'undefined' ? 'desktop'
    : window.matchMedia('(min-width: 1200px)').matches ? 'desktop'
    : window.matchMedia('(min-width: 810px)').matches ? 'tablet' : 'phone')
  const [bp, setBp] = useState(get)
  useEffect(() => {
    const on = () => setBp(get())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return bp
}

// Same-site button (CLONE_SPEC §0 Primary/Secondary). Sizes passed explicitly per use.
const BTN_BASE = 'inline-flex items-center justify-center font-sans font-semibold whitespace-nowrap transition-[background,box-shadow,color] duration-100 ease-[cubic-bezier(0.12,0.23,0.5,1)]'
export const BTN_PRIMARY = 'bg-brand hover:bg-brand-hover text-white shadow-[inset_0_0_0_1px_rgba(0,0,0,.12)]'
export const BTN_SECONDARY48 = 'bg-[linear-gradient(180deg,#fff_0%,#f9fafb_100%)] hover:bg-[linear-gradient(#f9fafb,#f3f4f6)] text-gray-800 shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)]'
export const BTN_SECONDARY36 = 'bg-white text-ink shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)]'
export function LinkButton({ to, className = '', children }) {
  return <Link to={to} className={`${BTN_BASE} ${className}`}>{children}</Link>
}

// CheckBadge (G3): 32px box, 22px circle, 11×9 white check (path from datauri-animated-checkmark)
export function CheckBadge({ green = false, animate = false }) {
  const Inner = animate ? motion.div : 'div'
  const motionProps = animate ? {
    initial: { scale: 0.7 }, whileInView: { scale: 1 }, viewport: { once: true },
    transition: { duration: 0.5, ease: [0.12, 0.23, 0.5, 1] },
  } : {}
  return (
    <div className="relative h-8 w-8 shrink-0">
      <Inner {...motionProps} className="absolute inset-0">
        <div className={`absolute left-[5px] top-[5px] h-[22px] w-[22px] rounded-full ${green ? 'bg-antibody' : 'bg-white/20'}`} />
        <svg className="absolute left-[10.5px] top-[11.5px] h-[9px] w-[11px]" viewBox="0 0 11 9" fill="none" aria-hidden="true">
          <path d="M 1 5 L 4 8 L 9.5 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Inner>
    </div>
  )
}
