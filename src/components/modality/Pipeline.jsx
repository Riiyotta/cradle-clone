import { motion } from 'framer-motion'
import { APPEAR_WHATIF, H2, LEAD } from './primitives.jsx'

/* ============================================================
   "What if" text block (antibody M2 / vaccine V2 centered, peptide P2 two-column)
   ============================================================ */
const WHATIF_H1 = 'font-heading font-semibold text-white text-[28px] leading-[28px] tracking-[-0.56px] md:text-[44px] md:leading-[44px] md:tracking-[-0.88px]'

export function WhatIf({ title, paragraphs, layout = 'center' }) {
  if (layout === 'columns') {
    return (
      <motion.div {...APPEAR_WHATIF} className="flex w-full max-w-container flex-col gap-5 md:flex-row md:gap-10">
        <h1 className={`md:flex-1 ${WHATIF_H1}`}>{title}</h1>
        <div className="flex flex-col gap-5 md:flex-1">
          {paragraphs.map((p, i) => <p key={i} className={`text-gray-400 ${LEAD}`}>{p}</p>)}
        </div>
      </motion.div>
    )
  }
  return (
    <motion.div {...APPEAR_WHATIF} className="flex w-full max-w-[700px] flex-col items-center gap-5 pb-20 text-center">
      <h1 className={`w-full ${WHATIF_H1}`}>{title}</h1>
      {paragraphs.map((p, i) => <p key={i} className={`w-full text-gray-400 ${LEAD}`}>{p}</p>)}
    </motion.div>
  )
}

/* ============================================================
   E2 Problem statement (enzyme)
   ============================================================ */
export function ProblemStatement({ title, paragraphs }) {
  return (
    <section className="flex w-full justify-center bg-ink">
      <div className="flex w-full max-w-container flex-col gap-6 px-5 py-10 md:flex-row md:gap-10 md:px-10 md:py-20">
        <h2 className={`text-white md:flex-1 ${H2}`}>{title}</h2>
        <div className="flex flex-col gap-5 md:flex-1">
          {paragraphs.map((p, i) => <p key={i} className={`text-white/80 ${LEAD}`}>{p}</p>)}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   PipelineCompare (biopharma B3 layout)
   Row A: 5 equal stages (gap 4). Row B: 5 slots (gap 4); middle bar spans 3 slots at `bio_start`
   and shrinks to 1 slot at `bio_end` (Preclinical slides left with it).
   ============================================================ */
const LABEL = 'font-sans font-medium text-[10px] leading-4 md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]'
const BAR = 'h-6 w-full rounded md:h-10 md:rounded-lg'
const SLOT = 'calc(20% - 1.6px)' // (100% - 2×4px) / 5
const SLOT3 = 'calc(60% - 4.8px)'

function Legend({ swatch, swatchClass = 'h-3 w-8', children }) {
  return (
    <div className="flex items-center gap-[10px]">
      <div className={`shrink-0 rounded-[3px] ${swatchClass}`} style={{ background: swatch }} />
      <h4 className="font-heading font-medium text-white text-[18px] leading-[21.6px] md:text-[24px] md:leading-[28.8px]">{children}</h4>
    </div>
  )
}

function StageLabel({ s, color }) {
  return (
    <p className={LABEL} style={{ color: s.color || color }}>
      {s.phone ? <><span className="md:hidden">{s.phone}</span><span className="hidden whitespace-pre-line md:inline">{s.label}</span></> : <span className="md:whitespace-pre-line">{s.label}</span>}
    </p>
  )
}

const ROW_A_BARS = ['rgba(255,255,255,.12)', '#fff', '#fff', '#fff', 'rgba(255,255,255,.12)']

export function PipelineCompare({ legendA, legendB, stagesA, stagesB, swatchB, barB, sideLabelColor = 'rgba(255,255,255,.6)', animated = true, swatchClass, className = '' }) {
  const variants = {
    start: { width: SLOT3 },
    end: { width: SLOT },
  }
  const transition = { duration: 0.9, ease: [0.45, 0, 0.55, 1], delay: 0.3 }
  return (
    <motion.div
      className={`flex w-full max-w-container flex-col gap-10 md:gap-20 ${className}`}
      initial={animated ? 'start' : 'end'}
      whileInView={animated ? 'end' : undefined}
      viewport={{ amount: 'all', once: false }}
    >
      {/* Row A: before */}
      <div className="flex flex-col gap-5">
        <Legend swatch="#f3f4f6" swatchClass={swatchClass}>{legendA}</Legend>
        <div className="flex w-full gap-1">
          {stagesA.map((s, i) => (
            <div key={i} className="flex min-w-0 flex-1 flex-col gap-[10px]">
              <div className={BAR} style={{ background: ROW_A_BARS[i] }} />
              <StageLabel s={s} color="rgba(255,255,255,.6)" />
            </div>
          ))}
        </div>
      </div>
      {/* Row B: with Cradle */}
      <div className="flex flex-col gap-5">
        <Legend swatch={swatchB} swatchClass={swatchClass}>{legendB}</Legend>
        <div className="flex w-full gap-1">
          <div className="flex min-w-0 flex-col gap-[10px]" style={{ width: SLOT }}>
            <div className={BAR} style={{ background: 'rgba(255,255,255,.12)' }} />
            <StageLabel s={stagesB[0]} color={sideLabelColor} />
          </div>
          <motion.div className="flex min-w-0 flex-col gap-[10px]" variants={variants} transition={transition}>
            <div className={BAR} style={{ background: barB }} />
            <StageLabel s={stagesB[1]} color="#fff" />
          </motion.div>
          <div className="flex min-w-0 flex-col gap-[10px]" style={{ width: SLOT }}>
            <div className={BAR} style={{ background: 'rgba(255,255,255,.12)' }} />
            <StageLabel s={stagesB[2]} color={sideLabelColor} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
