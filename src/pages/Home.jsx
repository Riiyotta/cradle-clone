import Hero from '../components/Hero.jsx'
import PlatformUI from '../components/PlatformUI.jsx'
import Customers from '../components/Customers.jsx'
import CaseStudies from '../components/CaseStudies.jsx'
import Benefits from '../components/Benefits.jsx'
import ProteinVisual from '../components/ProteinVisual.jsx'
import Modalities from '../components/Modalities.jsx'
import UseCases from '../components/UseCases.jsx'
import Enterprise from '../components/Enterprise.jsx'
import Lab from '../components/Lab.jsx'
import WetLabBlog from '../components/WetLabBlog.jsx'
import FooterCTA from '../components/FooterCTA.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <PlatformUI />
      <Customers />
      <CaseStudies />
      <Benefits />
      <ProteinVisual />
      <Modalities />
      <UseCases />
      <Enterprise />
      <Lab />
      <WetLabBlog />
      <FooterCTA />
    </>
  )
}
