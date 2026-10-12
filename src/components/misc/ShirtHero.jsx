import { motion, useScroll, useTransform } from 'framer-motion'

// PAGES_B §B9 hero (`platform-ui`): 1200×668.7 dark block; stays 1200 wide on phone (centered, overflowing).
// Squiggle rects measured on live relative to the block: right [652,-114,717,727], left [-276,-39,778,626].
function Squiggle({ src, factor, delay, className }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, (v) => -factor * v)
  return (
    <motion.img
      src={src}
      alt=""
      initial={{ opacity: 0.001, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', bounce: 0.3, duration: 1, delay }}
      style={{ y }}
      className={`absolute object-cover max-w-none ${className}`}
    />
  )
}

export default function ShirtHero() {
  return (
    <div className="relative w-[1200px] h-[668.7px] shrink-0 bg-ink overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 pointer-events-none">
        <Squiggle src="/assets/hero-blob-right.png" factor={0.15} delay={0.3} className="left-[652px] top-[-114px] w-[717px] h-[727px]" />
        <Squiggle src="/assets/hero-blob-left.png" factor={0.3} delay={0.2} className="left-[-276px] top-[-39px] w-[778px] h-[626px]" />
      </div>
      <img src="/assets/pages/shirt/image-31-vBTUyXNN.png" alt="Cradle t-shirt" className="relative z-10 w-[472px] h-[668.7px] object-cover" />
    </div>
  )
}
