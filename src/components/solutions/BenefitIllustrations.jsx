import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FileGlyph, Marquee, PlayGlyph } from './primitives.jsx'

// B3 benefit illustrations. Desktop tiles 846.7 wide, aspect 1.85, radius 16.
// Phone tiles 350×220 (#1, #2) and 350×250 (#3); the inner widgets scale to 0.6 (toggles) / 0.75 (files, positions).

// 1 — looping video + ToggleStack. Pills 2–3 fade/slide in after the tile enters and reset when it leaves.
export function ToggleIllustration({ video, toggles, accent }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.5 })
  return (
    <div ref={ref} className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl">
      <video
        src={video}
        autoPlay
        muted
        loop
        playsInline
        className="pointer-events-none absolute left-1/2 top-1/2 h-[283.8px] w-[525px] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover md:h-[778px] md:w-[1439.3px]"
      />
      <div className="relative flex w-[180px] flex-col items-center gap-[7.2px] md:w-[300px] md:gap-3">
        {toggles.map((label, i) => (
          <motion.div
            key={label}
            initial={i === 0 ? false : { opacity: 0, y: 20 }}
            animate={i === 0 ? undefined : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={inView ? { duration: 0.45, ease: 'easeOut', delay: 0.1 * i } : { duration: 0 }}
            className="flex h-[35.2px] w-full items-start gap-[6px] rounded-[7px] bg-white p-[9.6px] md:h-[57.6px] md:gap-[10px] md:rounded-xl md:p-4"
          >
            <span className="min-w-0 flex-1 font-sans text-[10px] font-medium leading-4 text-gray-800 md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]">
              {label}
            </span>
            <span
              className="flex h-[14.4px] w-[21.6px] shrink-0 items-center justify-end rounded-full p-[2.4px] md:h-6 md:w-9 md:p-1"
              style={{ backgroundColor: accent }}
            >
              <span className="h-[10.8px] w-[10.8px] rounded-full bg-white md:h-[18px] md:w-[18px]" />
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// 2 — vertical file ticker (≈15 px/s upward) with a centered decorative "Start training" pill.
export function FileTickerIllustration({ files, fileColor, accent, glow }) {
  const mask = 'linear-gradient(rgba(0,0,0,0) 0%, #000 12.5%, #000 87.5%, rgba(0,0,0,0) 100%)'
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-900">
      <div className="absolute inset-0 p-[10px]" style={{ WebkitMaskImage: mask, maskImage: mask }}>
        <Marquee axis="y" speed={15} gap={10} className="h-full w-full" innerClassName="mx-auto w-[288px] md:w-[384px]">
          <div className="flex w-full flex-col items-center gap-3 md:gap-[14.4px]">
            {files.map((f) => (
              <div key={f} className="flex h-[51.2px] w-full items-start gap-[9px] rounded-[11px] bg-gray-800 p-[14.4px] md:h-[68.8px] md:gap-3 md:rounded-[14px] md:p-[19.2px]">
                <span className="flex h-[22.8px] w-[21.7px] shrink-0 items-center justify-center md:h-[30.4px] md:w-[28.9px]">
                  <FileGlyph fill={fileColor} className="h-[14.25px] w-[16.5px] md:h-[19px] md:w-[22px]" />
                </span>
                <span className="truncate font-sans text-[14px] font-medium leading-[22.4px] text-white/60 md:text-[19px] md:leading-[30.4px]">{f}</span>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
      <div
        className="relative flex h-[43px] w-[156px] items-center justify-center gap-[7.2px] rounded-[605px] bg-white py-[14.4px] pl-[9.6px] pr-[14.4px] md:h-[72px] md:w-[260px] md:gap-3 md:rounded-[1008px] md:py-6 md:pl-4 md:pr-6"
        style={{ boxShadow: `${glow} 0 1px 40px 0` }}
      >
        <PlayGlyph color={accent} className="h-[14.4px] w-[14.4px] shrink-0 md:h-6 md:w-6" />
        <span className="whitespace-nowrap font-sans text-[14px] font-medium leading-[22.4px] text-gray-800 md:text-[23px] md:leading-[36.8px]">
          Start training
        </span>
      </div>
    </div>
  )
}

// 3 — masked protein image (in view: opacity 0→1, scale 1.2→1, 0.8s ease-out) + position stack.
const POSITIONS = [
  { label: 'Blocked', value: '14 positions', swatch: '#98b62c' },
  { label: 'Unreliable', value: '16 positions', swatch: '#0ea5e9' },
  { label: 'Ignore', value: '21 positions', swatch: '#9b9265' },
]

export function PositionsIllustration({ image }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3, once: true })
  const mask = 'radial-gradient(69% 113% at 50% 50%, #000 0%, rgba(0,0,0,0) 97%)'
  return (
    <div ref={ref} className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-900">
      <motion.img
        src={image}
        alt=""
        initial={{ opacity: 0, scale: 1.2 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.2 }}
        transition={inView ? { duration: 0.8, ease: 'easeOut' } : { duration: 0 }}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      />
      <div className="relative flex w-[240px] flex-col items-center gap-[9px] md:w-[320px] md:gap-3">
        {POSITIONS.map((p) => (
          <div key={p.label} className="flex h-[43.2px] w-full items-center gap-[7.5px] rounded-[9px] bg-white p-3 md:h-[57.6px] md:gap-[10px] md:rounded-xl md:p-4">
            <span className="h-[9px] w-[9px] shrink-0 rounded-[3px] md:h-3 md:w-3 md:rounded" style={{ backgroundColor: p.swatch }} />
            <span className="min-w-0 flex-1 font-sans text-[12px] font-medium leading-[19.2px] text-gray-800 md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]">{p.label}</span>
            <span className="min-w-0 flex-1 text-right font-sans text-[12px] font-medium leading-[19.2px] text-muted md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]">{p.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
