import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { T, useIsPhone } from './primitives.jsx'

// B3 PipelineCompare. Row A: 5 equal stages (gap 4). Row B: 3 stages at 1:3:1; in view the accent bar
// compresses to one slot (flex-grow 3→1, a trailing spacer 0→2) so the last stage slides left two slots.
// ≈0.9s slow-in/slow-out, starts ≈0.3s after the whole block is visible; resets on leave (replays).
// Desktop bars h40 r8, labels Body, gap 10. Phone bars h24 r4, labels Inter 10/16/500.

const W = (a) => `rgba(255,255,255,${a})`

function Legend({ swatch, children }) {
  return (
    <div className="flex w-full items-center gap-[10px]">
      <div className="h-3 w-8 shrink-0 rounded-[3px]" style={{ background: swatch }} />
      <h4 className={`${T.h4} text-white`}>{children}</h4>
    </div>
  )
}

function Stage({ bar, label, color, style, animate, transition }) {
  return (
    <motion.div className="flex min-w-0 basis-0 flex-col gap-[10px]" style={style} animate={animate} transition={transition}>
      <div className="h-6 w-full rounded-[4px] md:h-10 md:rounded-lg" style={{ background: bar }} />
      <p
        className="font-sans text-[10px] font-medium leading-4 md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]"
        style={{ color }}
      >
        {label}
      </p>
    </motion.div>
  )
}

export default function PipelineCompare({ cfg }) {
  const p = cfg.pipeline
  const phone = useIsPhone()
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 1 })
  const before = phone ? p.beforeLabelsPhone : p.beforeLabels
  const beforeColors = phone ? p.beforeColorsPhone : p.beforeLabels.map(() => W(0.6))
  const cradle = phone ? p.cradleLabelsPhone : p.cradleLabels
  const cradleColors = phone ? p.cradleColorsPhone : p.cradleColors
  const tr = inView ? { duration: 0.9, ease: [0.45, 0, 0.55, 1], delay: 0.3 } : { duration: 0 }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-10 pb-10 md:gap-20 md:pb-20">
      <div className="flex w-full flex-col gap-5">
        <Legend swatch="#f3f4f6">{p.beforeTitle}</Legend>
        <div className="flex w-full items-start gap-1">
          {before.map((l, i) => (
            <Stage key={i} label={l} color={beforeColors[i]} bar={i === 0 || i === 4 ? W(0.12) : '#fff'} style={{ flexGrow: 1 }} />
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col gap-5">
        <Legend swatch={p.cradleSwatch}>{p.cradleTitle}</Legend>
        <div className="flex w-full items-start gap-1">
          <Stage label={cradle[0]} color={cradleColors[0]} bar={W(0.12)} style={{ flexGrow: 1 }} />
          <Stage
            label={cradle[1]}
            color={cradleColors[1]}
            bar={p.cradleBar}
            style={{ flexGrow: 3 }}
            animate={{ flexGrow: inView ? 1 : 3 }}
            transition={tr}
          />
          <Stage label={cradle[2]} color={cradleColors[2]} bar={W(0.12)} style={{ flexGrow: 1 }} />
          {/* spacer: cancels its own gap with -4px margin so the start state is exactly 1:3:1 */}
          <motion.div className="-ml-1 min-w-0 basis-0" style={{ flexGrow: 0 }} animate={{ flexGrow: inView ? 2 : 0 }} transition={tr} />
        </div>
      </div>
    </div>
  )
}
