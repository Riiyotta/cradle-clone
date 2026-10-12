import { GlassPlay } from '../company/shared.jsx'

// Shared bits for /video, /video/:slug, /whitepaper, /presskit (specs/PAGES_B.md B4–B7)

// mave.io player placeholder (B4 / B6.2): local poster as cover + centered play affordance.
// No third-party player is loaded and nothing plays.
export function PosterPlayer({ poster, title = '', className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-black ${className}`} role="img" aria-label={title}>
      <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <div className="absolute inset-0 flex items-center justify-center">
        <GlassPlay />
      </div>
    </div>
  )
}

// Button looks (CLONE_SPEC §0 Primary48 / Secondary48, B0.4 SecondaryOnDark40).
// Hover: ≈100ms tween with Framer's default ease (same as ui.jsx Button).
export const BTN_BASE = 'inline-flex items-center justify-center font-sans font-semibold whitespace-nowrap transition-[background,box-shadow,color] duration-100 ease-[cubic-bezier(0.12,0.23,0.5,1)]'
export const PRIMARY48 = 'h-11 md:h-12 px-8 rounded-xl text-[16px] leading-6 bg-brand hover:bg-brand-hover text-white shadow-[inset_0_0_0_1px_rgba(0,0,0,.12)]'
export const SECONDARY48 = 'h-11 md:h-12 px-8 rounded-xl text-[16px] leading-6 bg-[linear-gradient(180deg,#fff_0%,#f9fafb_100%)] hover:bg-[linear-gradient(#f9fafb,#f3f4f6)] text-gray-800 shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)]'
export const SECONDARY_ON_DARK40 = 'h-10 px-5 rounded-lg bg-white/[.08] shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)] text-white text-[13px] leading-[15.6px] tracking-[-0.13px] md:text-[14px] md:leading-[16.8px] md:tracking-[-0.14px]'

// Cradle glyph (CLONE_SPEC §1 symbol, reused per PAGES_B_ASSETS "reuse /assets/cradle-symbol.svg")
export function CradleSymbol({ className = '' }) {
  return <img src="/assets/cradle-symbol.svg" alt="" aria-hidden="true" className={`block max-w-none shrink-0 ${className}`} draggable={false} />
}
