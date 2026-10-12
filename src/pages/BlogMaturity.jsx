import { Fragment, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { LadderTile } from '../components/blog/Motion.jsx'
import { ph } from '../components/blog/blogData.js'
import RecentPosts from '../components/blog/RecentPosts.jsx'
import { CONTENT, LEVELS, STRANDS } from '../components/blog/maturity/content.js'
import {
  H1, H2, H3, P, Ph, HSFormCard, InfoCard, InteractiveLadder, OnPageTOC, QuoteReveal,
  SectionHeaderBand, SpectrumRow, StickyLevelIndicator, useActiveLevel,
} from '../components/blog/maturity/Parts.jsx'

// PAGES_B §B3 /blog/maturity. Headings/labels verbatim; long paragraphs are neutral placeholder.
const col720 = 'flex w-full max-w-[720px] flex-col'
const Sep = () => <div className="h-px w-full max-w-[1080px] bg-black/[.04]" />

function Hero() {
  return (
    <section id="hero" className="flex w-full flex-col items-center bg-ink px-5 pb-20 pt-[120px] md:px-20 md:pt-40">
      <div className="flex w-full max-w-[960px] flex-col items-start gap-6 md:gap-10">
        <LadderTile />
        <h2 className="font-heading text-[32px] font-medium leading-[35.2px] tracking-[-0.64px] text-white md:text-[64px] md:leading-[64px] md:tracking-[-2.56px]">
          Introducing an ‘ML maturity ladder’ for biologics discovery and development
        </h2>
        <p className="max-w-[768px] font-sans text-[16px] font-medium leading-[24px] tracking-[-0.64px] text-gray-100 opacity-80 md:text-[20px] md:leading-[30px] md:tracking-[-0.8px]">
          Many organizations confine machine learning in molecular discovery and design to isolated proof-of-concept projects. We propose a 5-level maturity ladder to illustrate how teams advance towards autonomous systems that learn from every experiment and guide discovery across entire pipelines.
        </p>
        <div className="h-px w-full bg-white/[.08]" />
        <div className="flex items-center gap-5">
          <img src="/assets/cms/authors/stef.png" alt="" className="h-[30px] w-[30px] rounded-lg object-cover" />
          <p className="font-sans text-[14px] font-medium leading-[22.4px] tracking-[-0.28px] text-white md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]">
            Stef van Grieken <span className="text-white/60">· 15 min read</span>
          </p>
        </div>
      </div>
    </section>
  )
}

const LEVEL_IDS = LEVELS.map((_, i) => `level-${i}`)

function Ledger() {
  const active = useActiveLevel(LEVEL_IDS)
  return (
    <section className="flex w-full flex-col items-center gap-10 pb-[120px] pt-10 md:gap-20 md:pt-20">
      <div className={`${col720} gap-5 px-5 md:px-0 md:pb-10`}>
        <h2 className={`text-gray-400 ${H2}`}><span className="text-ink">The ML Maturity Ladder</span><br />From traditional to autonomous biologics R&amp;D</h2>
        <Ph n={208} seed="m:ledger" />
      </div>
      <div className="flex w-full max-w-[720px] items-start gap-5 px-5 md:gap-[60px] md:px-0">
        <div className="hidden self-stretch md:block"><StickyLevelIndicator active={active} /></div>
        <div className="flex min-w-0 flex-1 flex-col gap-10 md:max-w-[540px] md:gap-20">
          {LEVELS.map((l, i) => (
            <div key={i} className="flex flex-col gap-5">
              <h3 id={LEVEL_IDS[i]} className={`text-ink ${H3}`}><span className="text-gray-400">Level {i}</span><br />{l.title}</h3>
              <h6 className={`font-sans text-[10px] font-medium leading-[15px] md:text-[12px] md:leading-[18px] ${l.muted ? 'text-gray-400' : 'text-muted'}`}>{l.akin}</h6>
              <div className="flex flex-col gap-4">
                {l.ps.map((n, j) => <Ph key={j} n={n} seed={`m:lvl${i}:${j}`} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`${col720} gap-5 px-5 md:px-0 md:pt-10`}>
        <h2 className={`text-ink ${H2}`}>What it really takes to ladder up</h2>
        <div className="flex flex-col gap-4"><Ph n={477} seed="m:take1" /><Ph n={474} seed="m:take2" /></div>
      </div>
    </section>
  )
}

function Framework() {
  const p1 = useMemo(() => ph(300, 'm:fw1').replace(/\.$/, ''), [])
  return (
    <>
      <section id="framework" className="flex w-full flex-col items-center px-5 py-10 md:px-0 md:pb-20 md:pt-0">
        <div className={`${col720} gap-5`}>
          <h1 className={`text-ink ${H1}`}><span className="text-gray-400">Climbing the Ladder</span><br />A Practical Framework for ML Maturity in Biologics Discovery</h1>
          <Ph n={208} seed="m:fwintro" />
        </div>
      </section>
      <div className="flex w-full items-center justify-center bg-gray-50">
        <img src="/assets/pages/blog-maturity/image-BuFFsMu1.png" alt="" className="h-auto w-full max-w-[1440px] object-cover" />
      </div>
      <section className="flex w-full flex-col items-center gap-20 px-5 py-[60px] md:px-0 md:py-20">
        <div className={`${col720} gap-4`}>
          <p className={P}>
            {p1}: <strong className="font-bold">scope of ML application</strong>, <strong className="font-bold">data practices</strong> and <strong className="font-bold">organisational integration</strong>.
          </p>
          <Ph n={363} seed="m:fw2" />
        </div>
        <div className={`${col720} gap-5`}>
          <h2 className={`text-ink ${H2}`}>The Three Strands of ML Maturity</h2>
          <Ph n={109} seed="m:fw3" />
        </div>
        <div className={`${col720} gap-10`}>
          {STRANDS.map((s, i) => (
            <div key={s.title} className="flex flex-col">
              <img src={s.icon} alt="" className="h-8 w-8" />
              <h3 className={`mt-5 text-gray-800 ${H3}`}>{s.title}</h3>
              <Ph n={s.p} seed={`m:strand${i}`} className={`mt-4 ${P}`} />
            </div>
          ))}
          <p className={`-mt-6 ${P}`}>Now let's break down each strand into its key components.</p>
        </div>
      </section>
    </>
  )
}

function Example({ e, seed }) {
  return (
    <div className="flex flex-col">
      {e.s === 'h4'
        ? <h4 className="font-heading text-[18px] font-semibold leading-[21.6px] text-gray-800">{e.h}</h4>
        : <p className={P}><strong className="font-bold">{e.h}</strong></p>}
      <div className="mt-4 flex flex-col gap-4">{e.ps.map((n, j) => <Ph key={j} n={n} seed={`${seed}:${j}`} />)}</div>
      {/* Source links are EXTERNAL: same visual, no href */}
      {e.src && <h6 className="mt-2 min-h-[30px] font-sans text-[10px] font-medium leading-[15px] text-muted md:min-h-[36px] md:text-[12px] md:leading-[18px]">Source: <span className="text-[#0284c7]">{e.src}</span></h6>}
    </div>
  )
}

function StrandSection({ it, c }) {
  const seed = `m:${it.id}`
  return (
    <div id={it.id} className={`${col720} gap-10`}>
      <h2 className={H2} style={{ color: c.band }}><span className="text-gray-800">{it.lead}</span><br />{it.sub}</h2>
      <InfoCard title="What It Means" n={it.means} seed={seed + ':means'} band={c.band} radius={c.radius} />
      <InfoCard title="Why It Matters" n={it.matters} seed={seed + ':matters'} band={c.band} radius={c.radius} />
      <h3 className={`text-gray-800 ${H3}`}>The Maturity Spectrum</h3>
      <SpectrumRow label="Low Maturity:" items={it.low} band={c.band} seed={seed + ':low'} />
      <SpectrumRow label="High Maturity:" high items={it.high} band={c.band} seed={seed + ':high'} />
      <img src={it.img} alt="" loading="lazy" className="aspect-[720/378] w-full object-cover" style={{ borderRadius: c.radius }} />
      <div className="flex flex-col">
        <h3 className={`text-gray-800 ${H3}`}><br />Real-World Excellence</h3>
        <div className="mt-4 flex flex-col">
          {/* live spacing between examples: 60 after "strong" sub-heads (empty spacer paragraph), 32 before h4 sub-heads */}
          {it.ex.map((e, j) => <div key={j} className={j === 0 ? '' : e.s === 'h4' ? 'mt-8' : 'mt-[60px]'}><Example e={e} seed={`${seed}:ex${j}`} /></div>)}
        </div>
      </div>
    </div>
  )
}

// measured bottom padding per strand content block (1440 / 390)
const PB = ['pb-[120px]', 'pb-20', 'pb-0 md:pb-10']

function Strand({ c, k }) {
  return (
    <>
      <SectionHeaderBand id={c.id} num={c.num} title={c.title} band={c.band} numColor={c.numColor} />
      <section className={`flex w-full flex-col items-center px-5 pt-10 md:px-0 md:pt-20 ${PB[k]}`}>
        <div className="flex w-full max-w-[1080px] flex-col items-center gap-10 md:gap-20">
          <div className={`${col720} gap-4`}>
            <h2 className={`text-gray-800 ${H2}`}>{c.lead}</h2>
            {c.leadPs.map((n, j) => <Ph key={j} n={n} seed={`m:c${k}:lead${j}`} />)}
          </div>
          {c.items.map((it, j) => (
            <Fragment key={j}>
              {!it.quote && <Sep />}
              {it.quote
                ? <QuoteReveal text={it.quote} band={c.band} color={c.quoteColor} />
                : <StrandSection it={it} c={c} />}
            </Fragment>
          ))}
        </div>
      </section>
    </>
  )
}

function CommonPatterns() {
  return (
    <section id="conclusion" className="flex w-full flex-col items-center gap-10 px-5 pb-40 pt-20 md:gap-20 md:px-0">
      <Sep />
      <div className={`${col720} gap-10`}>
        <h1 className={`text-ink ${H1}`}>Common Maturity Patterns We See</h1>
        <Ph n={211} seed="m:cp1" />
        <img src="/assets/pages/blog-maturity/image-LHcLhAvL.png" alt="" loading="lazy" className="aspect-[720/378] w-full rounded-xl object-cover" />
        <div className="flex flex-col gap-12">
          {[['The Pilot Trap', 297], ['The Data Desert', 227], ['The Silo Problem', 270]].map(([t, n]) => (
            <div key={t} className="flex flex-col gap-4">
              <h3 className={`text-gray-800 ${H3}`}>{t}</h3>
              <Ph n={n} seed={`m:${t}`} />
            </div>
          ))}
        </div>
        <Ph n={229} seed="m:cp2" className={`mt-5 ${P}`} />
      </div>
      <Sep />
      <div className={`${col720} gap-10`}>
        <h1 className={`text-ink ${H1}`}>Assess Your ML Maturity</h1>
        <div className="flex flex-col gap-4">
          <Ph n={276} seed="m:assess" />
          <p className={P}>Our simple matrix helps you:</p>
          <ol className="list-decimal pl-[20.66px] marker:text-gray-800">
            {[['Identify your current position', 34], ['Spot imbalances', 97], ['Prioritise investments', 52]].map(([b, n]) => (
              <li key={b} className={P}><strong className="font-bold">{b}</strong> {ph(n, 'm:ol' + b).replace(/\.$/, '')}</li>
            ))}
          </ol>
          <p className={P}><strong className="font-bold">Track improvement</strong> over time with concrete milestones on each dimension</p>
        </div>
        <img src="/assets/pages/blog-maturity/image-Bk9yRR6E.png" alt="" loading="lazy" className="aspect-[720/378] w-full rounded-xl object-cover" />
      </div>
      <Sep />
      <div className={`${col720} gap-10`}>
        <h1 className={`text-ink ${H1}`}>The Road Ahead</h1>
        <div className="flex flex-col gap-4">
          <Ph n={172} seed="m:road1" /><Ph n={224} seed="m:road2" /><Ph n={443} seed="m:road3" />
          <p className={P}>The framework we’ve outlined here provides a road map for that journey.</p>
        </div>
      </div>
      <Sep />
      <div className={`${col720} gap-10`}>
        <h1 className={`text-ink ${H1}`}>Continue the Conversation</h1>
        <p className={P}>
          {ph(340, 'm:conv')}{' '}
          <Link to="/get-started" className="text-[#0284c7] hover:text-[#0ea5e9] hover:underline">Get in touch.</Link>
        </p>
      </div>
      <HSFormCard />
    </section>
  )
}

export default function BlogMaturity() {
  return (
    <div className="flex w-full flex-col items-center">
      <OnPageTOC />
      <Hero />
      <section id="intro" className="flex w-full flex-col items-center px-5 py-10 md:px-0 md:py-20">
        <div className={`${col720} gap-4`}>
          {[373, 182, 230, 396, 235].map((n, i) => <Ph key={i} n={n} seed={`m:pre${i}`} />)}
        </div>
      </section>
      <InteractiveLadder />
      <Ledger />
      <Framework />
      {CONTENT.map((c, k) => <Strand key={c.id} c={c} k={k} />)}
      <CommonPatterns />
      <RecentPosts showButtons={false} />
    </div>
  )
}
