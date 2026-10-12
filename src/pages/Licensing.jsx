import { LicensingHero, LicenseGrid, IncludedList, PartnersBand } from '../components/misc/Licensing.jsx'

// PAGES_B §B10 /licensing (light nav + dark footer are handled globally)
export default function Licensing() {
  return (
    <div className="w-full bg-white flex flex-col items-center">
      <LicensingHero />
      <LicenseGrid />
      <IncludedList />
      <PartnersBand />
    </div>
  )
}
