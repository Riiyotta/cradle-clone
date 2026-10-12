import { useEffect } from 'react'
import SolutionHero from './SolutionHero.jsx'
import LogoTicker from './LogoTicker.jsx'
import PipelineBenefits from './PipelineBenefits.jsx'
import ModalityTabs from './ModalityTabs.jsx'
import CaseQuote from './CaseQuote.jsx'
import TabbedCards from './TabbedCards.jsx'
import SecurityBlock from './SecurityBlock.jsx'
import FooterCTADark from './FooterCTADark.jsx'
import { useHashScroll } from './primitives.jsx'

// SolutionPage template (PAGES_A /solutions/biopharma B1–B8; /solutions/industrial I1–I8 via cfg).
// Content sits in a #030712 wrapper so sections without their own bg (B3) are dark.
export default function SolutionPage({ cfg, title }) {
  useHashScroll()
  useEffect(() => { document.title = title }, [title])
  return (
    <div className="flex w-full flex-col items-center bg-ink">
      <SolutionHero cfg={{ ...cfg.hero, accent: cfg.accent }} />
      <LogoTicker cfg={cfg.logos} />
      <PipelineBenefits cfg={cfg} />
      <ModalityTabs cfg={cfg} />
      <CaseQuote cfg={cfg} />
      <TabbedCards lead={cfg.workflowLead} />
      <SecurityBlock />
      <FooterCTADark />
    </div>
  )
}
