import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { placeholderChars } from '../resources/placeholder.js'
import { PosterPlayer, CradleSymbol, BTN_BASE, PRIMARY48, SECONDARY48 } from './shared.jsx'

// B6.2 Video: mave.io embed (EXTERNAL), rendered as poster + play affordance.
export function WhitepaperVideo() {
  return (
    <section className="flex w-full justify-center bg-white px-3 py-10 md:p-20">
      <PosterPlayer poster="/assets/cms/video-cradle-1-poster.jpg" title="Introducing CRADLE-1" className="aspect-video w-full max-w-[1280px] rounded-xl" />
    </section>
  )
}

// B6.3 facts. Headings verbatim; paragraphs are neutral placeholder at the live character counts.
const FACTS = [
  ['The Problem', 'Lead optimization costs $5–15M and takes up to 3 years per candidate', 298],
  ['How It Works', 'Foundation models, evotuned to your protein, fine-tuned on your data', 485],
  ['Multi-property Optimization', 'Optimize 2–6+ properties simultaneously instead of one at a time', 335],
  ['Results', 'Validated in vitro across 10 modality–target combinations', 164],
]

export function FactRows() {
  return (
    <section className="flex w-full flex-col items-center gap-10 bg-white px-5 pb-20 md:px-20">
      {FACTS.map(([lead, rest, chars], i) => (
        <Fragment key={lead}>
          {i > 0 && <div className="h-px w-full max-w-[960px] shrink-0 bg-black/[.04]" />}
          {/* fades up y 40→0 when ≈300px into view; opacity stays 1 */}
          <motion.div
            initial={{ y: 40 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '0px 0px -300px 0px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex w-full max-w-[880px] flex-col gap-4 md:flex-row md:items-start md:gap-20"
          >
            <h4 className="font-heading text-[18px] font-medium leading-[21.6px] text-gray-400 md:max-w-[400px] md:flex-1 md:text-[24px] md:leading-[28.8px]">
              <span className="text-ink">{lead}</span><br />{rest}
            </h4>
            <p className="font-sans text-[14px] font-medium leading-[22.4px] tracking-[-0.28px] text-muted md:max-w-[400px] md:flex-1 md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]">
              {placeholderChars(chars, i)}
            </p>
          </motion.div>
        </Fragment>
      ))}
    </section>
  )
}

// B6.4 document trio sheet lines (fractions of the inner width: 0.4 / 1 / 0.9; one white line)
const LEFT = [[0.4, 'e'], [1], [1], [1], [1], [0.9], [1, 'w'], [1], [1], [1], [1], [1]]
const RIGHT = [[0.4, 'e'], [1], [0.9], [1], [1], [0.9], [1, 'w'], [0.4, 'e'], [1], [1], [1], [1], [1]]

function Sheet({ lines }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex h-[62px] w-12 shrink-0 flex-col items-start gap-[4.4px] rounded-[2px] bg-white p-[4.8px] shadow-[rgba(0,0,0,.08)_0_.6px_8px_0] md:h-[104px] md:w-20 md:gap-[4.8px] md:p-2 md:shadow-[rgba(0,0,0,.08)_0_1px_8px_0]"
    >
      {lines.map(([f, c], i) => (
        <div key={i} className={`h-px shrink-0 rounded-[7px] md:h-[2px] md:rounded-[8px] ${c === 'e' ? 'bg-gray-200' : c === 'w' ? 'bg-white' : 'bg-gray-100'}`} style={{ width: `${f * 100}%` }} />
      ))}
    </motion.div>
  )
}

export function WhitepaperCTA() {
  return (
    <section className="flex w-full flex-col items-center bg-[linear-gradient(180deg,#fff_0%,#f3f4f6_100%)] pb-[120px] pt-20 md:px-20 md:py-[200px]">
      <div className="flex w-full max-w-[1280px] flex-col items-center gap-10 p-5 md:p-0">
        <div className="flex items-center justify-center gap-[8.4px] p-3 [mask-image:linear-gradient(#000_50%,transparent_70%)] [-webkit-mask-image:linear-gradient(#000_50%,transparent_70%)] md:gap-[14px] md:p-5" aria-hidden="true">
          <Sheet lines={LEFT} />
          <div className="flex h-[78px] w-[60px] shrink-0 flex-col items-center rounded-[2px] bg-white p-[19.2px] shadow-[rgba(0,0,0,.08)_0_.6px_8px_0] md:h-[130px] md:w-[100px] md:p-8 md:shadow-[rgba(0,0,0,.08)_0_1px_8px_0]">
            <CradleSymbol className="h-[32.4px] w-[32.4px] md:h-[54px] md:w-[54px]" />
          </div>
          <Sheet lines={RIGHT} />
        </div>
        <h2 className="text-center font-heading text-[32px] font-medium leading-[35.2px] tracking-[-0.64px] text-gray-800 md:text-[64px] md:leading-[64px] md:tracking-[-2.56px]">CRADLE-1 Whitepaper</h2>
        <p className="max-w-[640px] text-center font-sans text-[16px] font-medium leading-6 tracking-[-0.64px] text-muted md:text-[20px] md:leading-[30px] md:tracking-[-0.8px]">
          The paper covers the complete technical framework — group DPO, diversity-aware ranking, batch-effect handling, ablations — plus full wet-lab protocols and a documented failure case.
        </p>
        <div className="flex flex-col items-center gap-4">
          {/* "Read on bioRxiv" is EXTERNAL: same visual, no href */}
          <span className={`${BTN_BASE} ${PRIMARY48} w-[320px] cursor-default`}>Read on bioRxiv</span>
          <Link to="/get-started" className={`${BTN_BASE} ${SECONDARY48} w-[320px]`}>Talk to Sales</Link>
        </div>
      </div>
    </section>
  )
}
