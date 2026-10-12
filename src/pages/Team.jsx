import { useEffect } from 'react'
import TeamIntro from '../components/company/TeamIntro.jsx'
import { Investors, Offices, OurTeam } from '../components/company/TeamSections.jsx'

// /team — specs/PAGES_A.md T1–T4. main padding-top 64 (fixed nav); content max-w 1280, padding 80 40 160 (phone 40 16 120). No footer CTA.
export default function Team() {
  useEffect(() => { document.title = 'Team - Cradle' }, [])
  return (
    <div className="flex w-full flex-col items-center bg-white pt-16">
      <div className="w-full max-w-container px-4 pb-[120px] pt-10 md:px-10 md:pb-40 md:pt-20">
        <TeamIntro />
        <Offices />
        <OurTeam />
        <Investors />
      </div>
    </div>
  )
}
