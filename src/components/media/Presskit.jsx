import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

// B7 /presskit: PresskitTitle (icon cluster + shimmer) and PresskitFileList

const POP = { type: 'spring', bounce: 0.2, duration: 0.6 }

function PopIcon({ src, delay, className }) {
  return (
    <motion.img
      src={src} alt="" draggable={false}
      initial={{ opacity: 0.001, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...POP, delay }}
      className={`block shrink-0 ${className}`}
    />
  )
}

// Shimmer: 35.5×96 strip in a 120×96 clip over the centre icon (z1; outer icons z2).
// Loop: translateX 0→200 over ≈0.6s, rest ≈3s. Stops once scrolled past ≈300px.
function Shimmer() {
  const { scrollY } = useScroll()
  const [on, setOn] = useState(true)
  useMotionValueEvent(scrollY, 'change', (v) => setOn(v <= 300))
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-24 w-[120px] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
      <motion.div
        className="absolute left-[-50px] top-0 h-24 w-[35.5px]"
        animate={on ? { x: [0, 200] } : { x: 0 }}
        transition={on ? { duration: 0.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 } : { duration: 0 }}
      >
        <img src="/assets/pages/presskit/shimmer-43x139-03a4dd.svg" alt="" className="absolute left-[-7px] top-[-30px] h-[139px] w-[43px] max-w-none" />
      </motion.div>
    </div>
  )
}

export function PresskitTitle() {
  return (
    <div className="flex w-full max-w-[960px] flex-col gap-5 px-5 pb-10 pt-[140px] md:px-0 md:pb-12 md:pt-[144px]">
      <div className="relative flex h-[72px] items-center justify-center gap-5 md:h-24">
        <PopIcon src="/assets/pages/presskit/page-title-56x56-12bca5.svg" delay={0} className="relative z-[2] h-10 w-10 md:h-14 md:w-14" />
        <PopIcon src="/assets/pages/presskit/page-title-96x96-ae7a4c.svg" delay={0.2} className="h-[72px] w-[72px] md:h-24 md:w-24" />
        <PopIcon src="/assets/pages/presskit/page-title-48x48-fea7c7.svg" delay={0.1} className="relative z-[2] h-8 w-8 md:h-12 md:w-12" />
        <Shimmer />
      </div>
      <div className="flex flex-col items-center gap-[10px] text-center">
        <h1 className="font-heading text-[40px] font-medium leading-[40px] tracking-[-1.6px] text-ink md:text-[72px] md:leading-[72px] md:tracking-[-2.88px]">Press kit</h1>
        <p className="font-sans text-[14px] font-medium leading-[22.4px] tracking-[-0.28px] text-muted md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]">
          For inquires or questions email us at <a href="mailto:hello@cradle.bio" className="text-[#0284c7]">hello@cradle.bio</a>
        </p>
      </div>
    </div>
  )
}

const ICON = {
  vector: '/assets/pages/presskit/variant-1-24x24-91b3e5.svg',
  image: '/assets/pages/presskit/variant-1-24x24-1e5286.svg',
  shot: '/assets/pages/presskit/variant-1-24x24-674b87.svg',
}

export const PRESS_SECTIONS = [
  ['Logos', [['cradle-logo.svg', '2 files', 'vector'], ['cradle-logo.png', '6 files', 'image'], ['cradle-logo.eps', '2 files', 'vector']]],
  ['Screenshots', [['sequence-viewer.png', '180 KB', 'shot'], ['round-overview.png', '74 KB', 'shot'], ['generation-report.png', '80 KB', 'shot']]],
  ['Photos', [
    ['company-team-photo.jpg', '1.6 MB'], ['cradle-founders-1.jpg', '2.4 MB'], ['cradle-founders-2.jpg', '1.6 MB'],
    ['stef-van-grieken-portrait.jpg', '2.0 MB'], ['elise-de-reus-portrait.jpg', '2.0 MB'], ['eli-bixby-portrait.jpg', '2.5 MB'],
    ['jelle-prins-portrait.jpg', '1.7 MB'], ['daniel-danciu-portrait.jpg', '2.5 MB'], ['harmen-van-rossum-portrait.jpg', '2.2 MB'],
    ['cradle-lab-team.jpg', '1.3 MB'], ['ams-lab-01.jpg', '1.4 MB'], ['ams-lab-02.jpg', '1.3 MB'], ['ams-lab-03.jpg', '1.7 MB'], ['ams-lab-04.jpg', '1.3 MB'],
  ].map(([n, s]) => [n, s, 'image'])],
]

const BODY = 'font-sans text-[14px] font-medium leading-[22.4px] tracking-[-0.28px] md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]'

function FileRow({ name, size, icon, last }) {
  return (
    <div className={`flex h-14 w-full items-center gap-1 bg-white pl-1 pr-2 transition-colors duration-[250ms] ease-out hover:bg-gray-50 md:pr-4 ${last ? '' : 'fborder misc-bb [--fb:1px_solid_rgba(0,0,0,.04)]'}`}>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center">
        <img src={ICON[icon]} alt="" className="h-6 w-6" />
      </div>
      <p className={`min-w-0 flex-1 truncate text-ink ${BODY}`}>{name}</p>
      <p className={`hidden w-[261px] shrink-0 text-gray-400 md:block ${BODY}`}>{size}</p>
      {/* Download targets are framerusercontent.com files (EXTERNAL): same visual, no href */}
      <span className="flex h-11 shrink-0 cursor-default items-center gap-[5px] rounded-[50px] p-[10px] font-sans text-[16px] font-medium leading-4 text-[#0284c7] transition-colors duration-[250ms] ease-out hover:text-[#0ea5e9]">
        <span className="hidden md:inline">Download</span>
        <img src="/assets/pages/presskit/item-20x20-fdc1c4.svg" alt="Download" className="h-5 w-5 md:hidden" />
      </span>
    </div>
  )
}

export function PresskitFileList({ title, items }) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex h-14 items-center pl-4">
        <p className="font-sans text-[14px] font-semibold leading-[18.2px] text-gray-400 md:text-[16px] md:leading-[20.8px]">{title}</p>
      </div>
      <div className="fborder flex flex-col overflow-hidden rounded-2xl">
        {items.map(([name, size, icon], i) => <FileRow key={name} name={name} size={size} icon={icon} last={i === items.length - 1} />)}
      </div>
    </div>
  )
}
