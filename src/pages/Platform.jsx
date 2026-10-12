import { useEffect } from 'react'
import Intro from '../components/platform/Intro.jsx'
import Manifesto from '../components/platform/Manifesto.jsx'
import LogoWall from '../components/platform/LogoWall.jsx'
import Collage from '../components/platform/Collage.jsx'
import BenefitsGrid from '../components/platform/BenefitsGrid.jsx'
import FeatureRows from '../components/platform/FeatureRows.jsx'
import Teams from '../components/platform/Teams.jsx'
import TabbedCards from '../components/platform/TabbedCards.jsx'
import QuoteBand from '../components/platform/QuoteBand.jsx'
import LatestUpdates from '../components/platform/LatestUpdates.jsx'
import FooterCTALight from '../components/platform/FooterCTALight.jsx'

// /platform — specs/PAGES_A.md "/platform" P1–P11
export default function Platform() {
  useEffect(() => { document.title = 'The AI protein engineering software built for scientists' }, [])
  return (
    <>
      <Intro />
      <Manifesto />
      <LogoWall />
      <Collage />
      <BenefitsGrid />
      <FeatureRows />
      <Teams />
      <TabbedCards />
      <QuoteBand />
      <LatestUpdates />
      <FooterCTALight />
    </>
  )
}
