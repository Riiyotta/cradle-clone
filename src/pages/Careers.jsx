import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  CareersHeader, LifeAtCradle, Newsletter, OpenPositions, PhotoMosaic, ScamNotice,
} from '../components/company/CareersSections.jsx'

// /careers — specs/PAGES_A.md C1–C6. main padding-top 64; content max-w 1280, padding 0 40 160 (phone 0 16 40). No footer CTA.
export default function Careers() {
  const { hash } = useLocation()
  useEffect(() => { document.title = 'Careers - Cradle' }, [])
  // "Open positions" → /careers#careers (anchor to C4)
  useEffect(() => {
    if (hash !== '#careers') return
    const el = document.getElementById('careers')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <div className="flex w-full flex-col items-center bg-white pt-16">
      <CareersHeader />
      <div className="w-full max-w-container px-4 pb-10 md:px-10 md:pb-40">
        <PhotoMosaic />
        <LifeAtCradle />
        <OpenPositions />
        <Newsletter />
      </div>
      <ScamNotice />
    </div>
  )
}
