import { useEffect } from 'react'
import {
  AerialPhoto, Automation, LabHeader, LabIntro, MeetTheTeam, Perks, SharingIsCaring,
} from '../components/company/LabSections.jsx'

// /lab — specs/PAGES_A.md L1–L7. No main top padding (header has its own). No footer CTA.
export default function LabPage() {
  useEffect(() => { document.title = 'The Cradle Wet Lab' }, [])
  return (
    <div className="flex w-full flex-col items-center bg-white">
      <LabHeader />
      <AerialPhoto />
      <LabIntro />
      <Perks />
      <Automation />
      <MeetTheTeam />
      <SharingIsCaring />
    </div>
  )
}
