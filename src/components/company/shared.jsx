import { Link } from 'react-router-dom'

// Shared type roles + primitives for /team, /careers, /lab (specs/PAGES_A.md G2 + CLONE_SPEC §0)

export const H1 = 'font-heading font-medium text-ink text-[40px] leading-[40px] tracking-[-1.6px] md:text-[72px] md:leading-[72px] md:tracking-[-2.88px]'
export const H2 = 'font-heading font-medium text-[32px] leading-[35.2px] tracking-[-0.64px] md:text-[48px] md:leading-[48px] md:tracking-[-1.92px] lg:text-[64px] lg:leading-[64px] lg:tracking-[-2.56px]'
export const H3 = 'font-heading font-medium text-[24px] leading-[28.8px] tracking-[-0.48px] md:text-[32px] md:leading-[38.4px] md:tracking-[-0.64px]'
export const H4 = 'font-heading font-medium text-[18px] leading-[21.6px] md:text-[24px] md:leading-[28.8px]'
export const LEAD = 'font-sans font-medium text-[16px] leading-[24px] tracking-[-0.64px] md:text-[20px] md:leading-[30px] md:tracking-[-0.8px]'
export const BODY = 'font-sans font-medium text-[14px] leading-[22.4px] tracking-[-0.28px] md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]'

// G2 InlineLink: #0284c7, hover #0ea5e9 (instant)
export const INLINE_LINK = 'text-[#0284c7] hover:text-[#0ea5e9]'
// G2 MutedLink: #616e80, hover #29333c (instant)
export const MUTED_LINK = 'text-muted hover:text-[#29333c]'

// Primary48 / Secondary48 rendered as a react-router Link (ui.jsx Button only renders <a href>).
// Same classes as ui.jsx Button so hover (#1b3ada / gradient) matches §0.
const BTN_BASE = 'inline-flex items-center justify-center font-sans font-semibold whitespace-nowrap transition-[background,box-shadow,color] duration-100 ease-[cubic-bezier(0.12,0.23,0.5,1)]'
const BTN_48 = 'h-12 px-6 rounded-xl text-[16px] leading-6'
const BTN_PRIMARY = 'bg-brand hover:bg-brand-hover text-white shadow-[inset_0_0_0_1px_rgba(0,0,0,.12)]'
const BTN_SECONDARY = 'bg-[linear-gradient(180deg,#fff_0%,#f9fafb_100%)] hover:bg-[linear-gradient(#f9fafb,#f3f4f6)] text-gray-800 shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)]'

export function LinkButton({ to, variant = 'primary', className = '', children }) {
  const v = variant === 'primary' ? BTN_PRIMARY : BTN_SECONDARY
  return <Link to={to} className={`${BTN_BASE} ${BTN_48} ${v} ${className}`}>{children}</Link>
}

// Glass play button used on video thumbnails (/platform P1 VideoTrigger; reused by /lab L5 VideoCard)
export function PlayGlyph({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M 0 0.736 L 0 17.259 C 0.005 17.527 0.153 17.772 0.388 17.902 C 0.623 18.031 0.91 18.025 1.139 17.886 L 14.647 9.625 C 14.866 9.492 15 9.254 15 8.997 C 15 8.741 14.866 8.503 14.647 8.37 L 1.139 0.109 C 0.91 -0.03 0.623 -0.036 0.388 0.093 C 0.153 0.222 0.005 0.468 0 0.736 Z"
        fill="#fff" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        transform="translate(6.75 3.003)"
      />
    </svg>
  )
}

export function GlassPlay() {
  return (
    <div className="fborder flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(rgba(255,255,255,.5),rgba(255,255,255,.08))] backdrop-blur-[5px] [--fb:1px_solid_rgba(255,255,255,.08)]">
      <PlayGlyph className="h-5 w-5" />
    </div>
  )
}
