import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Phone breakpoint (CLONE_SPEC §0: max-width 809.98px)
export function useIsPhone() {
  const q = '(max-width: 809.98px)'
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setM(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return m
}

// §B0.5 cursorBlink: opacity 1 for ≈600ms, 0 for ≈600ms, step, repeat.
export function Caret({ className = '' }) {
  return (
    <motion.span
      aria-hidden
      className={`block w-[3px] shrink-0 bg-enzyme ${className}`}
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 1.2, ease: (t) => (t < 0.5 ? 0 : 1), repeat: Infinity }}
    />
  )
}

// §B1.6 ladder tile + §B0.5 ladderLoop. Desktop 80×80 r12, bars 40w (30/60/90) r6;
// phone 60×60 r9, bars 30w (23/45/68) r5. Bar row starts one bar-width left of the tile.
// Loop: translate (0,0)→(-40,30) [phone (-30,23)] over ≈0.65s ease-in-out, hold ≈0.55s, snap back.
export function LadderTile({ className = '' }) {
  const phone = useIsPhone()
  const bw = phone ? 30 : 40
  const hs = phone ? [23, 45, 68] : [30, 60, 90]
  const dy = phone ? 23 : 30
  return (
    <div className={`relative h-[60px] w-[60px] shrink-0 overflow-clip rounded-[9px] bg-[#7dd3fc] md:h-20 md:w-20 md:rounded-xl ${className}`}>
      <motion.div
        key={phone ? 'p' : 'd'}
        className="absolute bottom-0 flex items-end"
        style={{ left: -bw, width: bw * 3, height: hs[2] }}
        animate={{ x: [0, -bw, -bw], y: [0, dy, dy] }}
        transition={{ duration: 1.23, times: [0, 0.53, 1], ease: ['easeInOut', 'linear'], repeat: Infinity, repeatType: 'loop' }}
      >
        {hs.map((h) => (
          <div key={h} className="shrink-0 rounded-tl-[5px] bg-accent md:rounded-tl-[6px]" style={{ width: bw, height: h }} />
        ))}
      </motion.div>
    </div>
  )
}

// §B0.5 wordReveal: per word opacity 0→1, y 10→0, ≈0.35s ease-out, stagger ≈0.1s, once on enter.
export function WordReveal({ text, as = 'h2', className = '', wordClassName = '', style }) {
  const Tag = motion[as]
  const words = text.split(' ')
  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className={`inline-block whitespace-pre ${wordClassName}`}
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }}
        >
          {w + (i < words.length - 1 ? ' ' : '')}
        </motion.span>
      ))}
    </Tag>
  )
}
