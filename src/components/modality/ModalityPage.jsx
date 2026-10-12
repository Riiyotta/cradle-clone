import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { PropertyTickerHero, TextHero } from './Heroes.jsx'
import { WhatIf, ProblemStatement, PipelineCompare } from './Pipeline.jsx'
import { FeatureList, ProductMock, Properties } from './Features.jsx'
import { CaseStudies } from './Cases.jsx'
import { Teams, FooterCTABlue } from './TeamsCTA.jsx'

/* ModalityPage template (specs/PAGES_A.md "/modality/*"). Each page passes `sections`, an ordered list of
   { type, ...props }. Section wrappers that differ per page (dark bands, gaps) are described by the data. */

function PipelineSection({ whatIf, pipeline, sectionClass, bg = 'bg-ink' }) {
  return (
    <section className={`flex w-full flex-col items-center ${bg} ${sectionClass}`}>
      {whatIf && <WhatIf {...whatIf} />}
      <PipelineCompare {...pipeline} />
    </section>
  )
}

// Dark band that groups the product mock, the properties block and (antibody) the case studies.
function DarkBand({ sectionClass = '', children }) {
  return <div className={`flex w-full flex-col items-center bg-ink ${sectionClass}`}>{children}</div>
}

function renderSection(s, i) {
  switch (s.type) {
    case 'tickerHero': return <PropertyTickerHero key={i} {...s} />
    case 'textHero': return <TextHero key={i} {...s} />
    case 'problem': return <ProblemStatement key={i} {...s} />
    case 'pipeline': return <PipelineSection key={i} {...s} />
    case 'features': return <FeatureList key={i} {...s} />
    case 'mock': return <ProductMock key={i} {...s} />
    case 'properties': return (
      <div key={i} className={`flex w-full justify-center ${s.wrapClass ?? ''}`}>
        <Properties {...s} />
      </div>
    )
    case 'band': return <DarkBand key={i} sectionClass={s.sectionClass}>{s.children.map(renderSection)}</DarkBand>
    case 'cases': return <CaseStudies key={i} {...s} />
    case 'teams': return <Teams key={i} {...s} />
    case 'cta': return <FooterCTABlue key={i} {...s} />
    default: return null
  }
}

export default function ModalityPage({ title, sections }) {
  const { hash } = useLocation()
  useEffect(() => { document.title = title }, [title])
  // In-page anchors (e.g. `Read enzyme case studies` → #case)
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])
  return <div className="flex w-full flex-col items-center">{sections.map(renderSection)}</div>
}
