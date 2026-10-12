import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { avatarFor, longDate, shortIntroFor } from './blogData.js'
import { SecondaryOnDark40 } from './Buttons.jsx'

// ---------------- §B2.2 header ----------------
const chip = 'fborder flex h-[30px] items-center gap-1 rounded-lg py-[6px] pl-[6px] pr-2 md:h-8'
const chipText = 'font-sans text-[11px] font-medium leading-[11px] tracking-[-0.11px] text-muted md:text-[13px] md:leading-[13px] md:tracking-[-0.13px]'

export function PostHeader({ post }) {
  return (
    <div className="flex w-full flex-col gap-[25px] md:pb-20">
      <h1 className="max-w-[640px] font-heading text-[28px] font-semibold leading-[28px] tracking-[-0.56px] text-ink md:text-[44px] md:leading-[44px] md:tracking-[-0.88px]">
        {post.title}
      </h1>
      <p className="font-sans text-[16px] font-medium leading-[24px] tracking-[-0.64px] text-muted md:text-[20px] md:leading-[30px] md:tracking-[-0.8px]">{shortIntroFor(post.slug)}</p>
      <div className="flex flex-wrap items-center gap-2">
        <div className={chip}>
          <img src="/assets/pages/blog-post/date-18x18-8dbda2.svg" alt="" className="h-[18px] w-[18px] md:h-5 md:w-5" />
          <time dateTime={post.date} className={chipText}>{longDate(post.date)}</time>
        </div>
        <div className="h-4 w-px bg-black/[.08]" />
        {post.authors.map((a) => (
          <motion.div
            key={a}
            className={chip}
            initial={{ backgroundColor: 'rgba(243,244,246,0)' }}
            whileHover={{ backgroundColor: '#f9fafb' }}
            transition={{ duration: 0.1 }}
          >
            {avatarFor(a) && <img src={avatarFor(a)} alt="" className="h-[18px] w-[18px] rounded-full object-cover md:h-5 md:w-5" />}
            <span className={chipText}>{a}</span>
          </motion.div>
        ))}
      </div>
      <div className="fborder h-[182.3px] w-full rounded-2xl md:h-[333.3px]" style={{ '--fb': '1px solid rgba(27,27,27,.04)' }}>
        <img src={post.cover} alt="" className="h-full w-full rounded-[inherit] object-cover" />
      </div>
    </div>
  )
}

// ---------------- §B2.3 rich text ----------------
const pCls = 'font-sans font-medium text-gray-800 text-[14px] leading-[24.5px] tracking-[-0.14px] md:text-[16px] md:leading-[28px] md:tracking-[-0.16px]'
const aCls = 'text-[#0284c7] hover:text-[#0ea5e9] hover:underline'

function Inline({ runs }) {
  return runs.map((r, i) => {
    if (typeof r === 'string') return <Fragment key={i}>{r}</Fragment>
    if (r.strong) return <strong key={i} className="font-bold">{r.strong}</strong>
    if (r.em) return <em key={i}>{r.em}</em>
    if (r.link) return <Link key={i} to={r.to} className={aCls}>{r.link}</Link>
    return null
  })
}

function BodyImage() {
  // Article-body images were deliberately not downloaded (PAGES_B_ASSETS). Neutral placeholder at 16:9.
  return (
    <div className="mt-6 w-full md:mt-8">
      <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-gray-100">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" aria-hidden>
          <rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M21 16l-5-5-9 9" />
        </svg>
      </div>
    </div>
  )
}

function Table({ rows, header }) {
  return (
    <figure className="mt-6 w-full overflow-auto md:mt-8">
      <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-lg border border-black/[.08]">
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className={`bg-white px-3 py-1 align-top ${pCls} ${ri > 0 ? 'border-t border-black/[.08]' : ''} ${ci > 0 ? 'border-l border-black/[.08]' : ''}`}>
                  {(header && ri === 0) || (!header && ci === 0) ? <strong className="font-bold">{cell}</strong> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}

export function RichText({ blocks, post }) {
  return (
    <div className="flex w-full max-w-[350px] flex-col pb-20 pt-[10px] md:max-w-[640px]">
      {/* pt 10: live first paragraph sits 10px below the measured 80px header gap (series-b, 1440 + 390) */}
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'p':
            return <p key={i} className={`mt-4 ${pCls}`}><Inline runs={b.runs} /></p>
          case 'h2':
            return <h2 key={i} className="mt-10 font-heading text-[24px] font-semibold leading-[33.6px] tracking-[-0.48px] text-ink md:text-[36px] md:leading-[43.2px] md:tracking-[-0.72px]">{b.text}</h2>
          case 'h3':
            return <h3 key={i} className="mt-5 font-heading text-[22px] font-semibold leading-[30.8px] tracking-[-0.44px] text-ink md:mt-12 md:text-[28px] md:leading-[33.6px] md:tracking-[-0.56px]">{b.text}</h3>
          case 'ul':
          case 'ol': {
            const L = b.t
            return (
              <L key={i} className={`mt-8 pl-[20.66px] marker:text-[16px] marker:text-gray-800 ${b.t === 'ul' ? 'list-disc' : 'list-decimal'}`}>
                {b.items.map((it, j) => <li key={j} className={`m-0 ${pCls}`}><Inline runs={it} /></li>)}
              </L>
            )
          }
          case 'blockquote':
            return (
              <blockquote key={i} className="relative mt-6 py-1 pl-5 before:absolute before:inset-y-0 before:left-0 before:w-1 before:rounded-[1px] before:bg-sky400 before:content-['']">
                <p className="m-0 font-heading text-[18px] font-medium leading-[27px] tracking-[-0.36px] text-gray-800 md:text-[28px] md:leading-[33.6px] md:tracking-[-0.56px]">
                  {b.text}
                  <br /><br />
                  <strong className="font-sans text-[14px] font-bold">{b.cite}</strong>
                </p>
              </blockquote>
            )
          case 'img':
            return <BodyImage key={i} />
          case 'table':
            return <Table key={i} rows={b.rows} header={b.header} />
          case 'I':
            return <div key={i} className="mt-6 md:mt-8"><BlogInfoCallout title={b.title} runs={b.runs} /></div>
          case 'W':
            return <div key={i} className="mt-6 md:mt-8"><CalloutWhitepaper /></div>
          case 'V':
            return <div key={i} className="mt-6 md:mt-8"><VideoEmbedPlaceholder poster={b.poster} /></div>
          default:
            return null
        }
      })}
    </div>
  )
}

// ---------------- §B2.7 blog-info callout ----------------
export function BlogInfoCallout({ title, runs }) {
  return (
    <div className="fborder flex gap-[18px] rounded-[20px] bg-gray-50 p-6 shadow-[rgba(3,7,18,.08)_0_18px_50px_0]" style={{ '--fb': '1px solid #e5e7eb' }}>
      <div className="w-1 shrink-0 self-stretch rounded-full bg-[linear-gradient(180deg,#0ea5e9_0%,#61c779_100%)]" />
      <div className="flex min-w-0 flex-col gap-[14px]">
        <div className="flex items-center gap-[10px]">
          <span className="h-2 w-2 rounded-full bg-enzyme" />
          <span className="font-mono text-[14px] font-medium leading-6 tracking-[0.84px] text-[#0369a1]">Editor's note</span>
        </div>
        <h3 className="font-heading text-[22px] font-semibold leading-[25.96px] tracking-[-0.44px] text-ink">{title}</h3>
        <p className="font-sans text-[16px] font-medium leading-[28px] tracking-[-0.16px] text-gray-800">
          {runs.map((r, i) => (typeof r === 'string'
            ? <Fragment key={i}>{r}</Fragment>
            : <Link key={i} to={r.to} className={r.last ? 'text-accent' : 'text-gray-800'}>{r.link}</Link>))}
        </p>
      </div>
    </div>
  )
}

// ---------------- §B2.6 callout-whitepaper ----------------
const LINES = [15.9, 39.8, 39.8, 39.8, 39.8, 35.8, 39.8, 15.9, 39.8, 35.8]
const sheetShadow = 'shadow-[rgba(0,0,0,.08)_0_0.66px_8px_0]'

export function PaperStack() {
  return (
    <div className="relative h-[98px] w-24 shrink-0 p-2">
      <div className={`absolute right-2 top-2 flex h-[68px] w-[53px] flex-col gap-[4.4px] rounded-[2px] bg-white p-[6.6px] ${sheetShadow}`}>
        {LINES.map((w, i) => <div key={i} className="h-[2px] shrink-0 rounded-[7.92px]" style={{ width: w, background: i === 6 ? '#fff' : '#e5e7eb' }} />)}
      </div>
      <div className={`absolute bottom-2 left-2 flex h-[81px] w-16 -rotate-3 items-center justify-center rounded-[2px] bg-white ${sheetShadow}`}>
        <img src="/assets/cradle-symbol.svg" alt="" className="h-[43.1px] w-[43.1px]" />
      </div>
    </div>
  )
}

// letterFade (§B0.5): all letters fade together ≈0.8→1.6s, plus y 10→0, when in view.
const letterFade = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay: 0.8, duration: 0.8, ease: 'easeOut' },
}

export function CalloutWhitepaper() {
  return (
    <div className="w-full max-w-[650px] py-5">
      <div className="fborder relative flex w-full flex-col items-center overflow-clip rounded-2xl bg-ink">
        {/* Glow (z1, blur 14). Card-relative boxes measured on live therapeutic-peptides: blob A 405×197.3
            rotated -40° centred at (438,172); blob B 281.8×251 at (-123,130). */}
        <div className="pointer-events-none absolute inset-0 z-[1] blur-[14px]">
          <img src="/assets/pages/blog-post-case/callout-whitepaper-438x412-9a4ed2.svg" alt="" className="absolute left-[235.5px] top-[73.3px] h-[197.3px] w-[405.1px] max-w-none -rotate-[40deg]" />
          <img src="/assets/pages/blog-post-case/callout-whitepaper-282x251-9d00fc.svg" alt="" className="absolute left-[-123px] top-[130px] h-[251px] w-[281.8px] max-w-none" />
        </div>
        <div className="relative z-[2] flex w-full flex-col items-center gap-5 p-5">
          <PaperStack />
          <div className="flex w-[450px] max-w-[75%] flex-col items-center gap-[15px] text-center">
            <motion.h3 {...letterFade} className="font-heading text-[32px] font-medium leading-[38.4px] tracking-[-0.64px] text-white">Meet CRADLE-1</motion.h3>
            <motion.p {...letterFade} className="font-sans text-[16px] font-medium leading-[25.6px] tracking-[-0.32px] text-white/80">
              An automated machine-learning framework for protein lead optimization — validated across antibodies, enzymes, peptides, vaccines, and gene-editing systems.
            </motion.p>
            <SecondaryOnDark40 to="/whitepaper">Read whitepaper</SecondaryOnDark40>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------- §B2.5 video module ----------------
// The mave.io / Wistia players are EXTERNAL: poster image + play affordance, no playback.
// Play-button styling is not in the spec (player UI was cross-origin); neutral circle used.
export function VideoEmbedPlaceholder({ poster }) {
  return (
    <div className="flex w-full flex-col gap-4 py-10">
      <div className="relative aspect-video w-full overflow-hidden bg-ink">
        <img src={poster} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-[0_4px_16px_rgba(0,0,0,.2)]">
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden><path d="M8 5v14l11-7z" fill="#030712" /></svg>
          </span>
        </div>
      </div>
    </div>
  )
}
