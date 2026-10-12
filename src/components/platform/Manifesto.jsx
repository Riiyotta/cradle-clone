import { Fragment, useRef } from 'react'
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion'

// PAGES_A /platform P2 Manifesto + tilted UI
// Sentences (verbatim); null = blank line (<br><br>). Line layout measured on live: 10 lines at both widths.
const SENTENCES = [
  ['Endless cycles. Slow progress.'],
  ['Money, time, wells — wasted.'],
  null,
  ['"', { em: 'This is how it\'s always' }, { br: true }, { em: ' been…"' }, ' you keep hearing.'],
  null,
  ['For decades, it held true.'],
  null,
  ['Today, it changes.'],
  ['Scientists, meet Cradle.'],
]

function Sentence({ parts, index, inView }) {
  // Whole sentence animates together (opacity .001→1, y 10→0, ≈0.5s ease-out, stagger 0.2s).
  // Words are inline-block so wrapping matches the live text.
  const transition = { duration: 0.5, ease: 'easeOut', delay: 0.025 + index * 0.2 }
  const word = (w, k, italic) => (
    <motion.span
      key={k}
      className={`inline-block ${italic ? 'italic' : ''}`}
      initial={{ opacity: 0.001, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.001, y: 10 }}
      transition={transition}
    >
      {w}
    </motion.span>
  )
  const out = []
  parts.forEach((p, pi) => {
    if (p.br) { out.push(<br key={pi} />); return }
    const italic = typeof p === 'object'
    const text = italic ? p.em : p
    // keep leading/trailing spaces as plain text between inline-block words
    const tokens = text.split(/(\s+)/)
    const nodes = tokens.map((t, ti) => (t === '' ? null : /^\s+$/.test(t) ? ' ' : word(t, `${pi}-${ti}`, italic)))
    out.push(italic ? <em key={pi} className="not-italic">{nodes}</em> : <Fragment key={pi}>{nodes}</Fragment>)
  })
  return <>{out}</>
}

export default function Manifesto() {
  const textRef = useRef(null)
  const inView = useInView(textRef, { once: true })

  // UI tilt: progress 0 when the UI top meets the viewport bottom, 1 when its bottom does (live: scrollY 930→1580 at 1440×900)
  const uiRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: uiRef, offset: ['start end', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.0005 })
  const transform = useTransform(p, (v) => `perspective(500px) translateY(${40 * (1 - v)}px) scale(${0.95 + 0.05 * v}) rotateX(${8 * (1 - v)}deg)`)
  const opacity = useTransform(p, [0, 1], [0.5, 1])

  let s = 0
  return (
    <section className="relative z-[2] flex w-full flex-col items-center justify-center overflow-clip bg-ink px-2 pb-5 md:justify-between md:px-20">
      <div className="pointer-events-none absolute left-0 top-0 h-[200px] w-full bg-[linear-gradient(#030712_0%,rgba(3,7,18,0)_100%)]" />

      <div ref={textRef} className="relative z-[2] flex h-[800px] w-full max-w-[440px] flex-col justify-center [mask-image:linear-gradient(0deg,#000_50%,rgba(0,0,0,.6)_100%)] md:h-[1100px] lg:h-[928.6px]">
        <h4 className="text-center font-heading font-medium text-white text-[20px] leading-[24px] md:text-[28px] md:leading-[33.6px]">
          {SENTENCES.map((parts, i) => {
            if (!parts) return <br key={i} />
            const idx = s++
            return (
              <Fragment key={i}>
                <Sentence parts={parts} index={idx} inView={inView} />
                {i < SENTENCES.length - 1 && <br />}
              </Fragment>
            )
          })}
        </h4>
      </div>

      <div className="relative flex w-full max-w-container flex-col items-center gap-10">
        <motion.div
          ref={uiRef}
          style={{ transform, opacity }}
          className="relative z-[2] aspect-[1.75] w-full max-w-[1140px] rounded-3xl [mask-image:linear-gradient(0deg,transparent_0%,#000_80%)]"
        >
          <div className="absolute left-3 top-[13px] aspect-[1.61176] w-[calc(100%-24px)] overflow-hidden rounded-t-[6px] shadow-[0_1px_8px_0_rgba(22,31,85,.16)] md:rounded-t-xl">
            <img src="/assets/ui-round.png" alt="Cradle round view" className="h-full w-full object-cover object-[50%_0]" />
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-[561px] w-full bg-[linear-gradient(rgba(249,250,251,0),#f9fafb)]" />
    </section>
  )
}
