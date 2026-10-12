import { useEffect } from 'react'
import AcademiaHero from '../components/solutions/AcademiaHero.jsx'
import AcademiaForm from '../components/solutions/AcademiaForm.jsx'

// /solutions/academia: green hero + application form. No footer CTA on this page.
export default function SolutionsAcademia() {
  useEffect(() => { document.title = 'Cradle' }, [])
  return (
    <div className="flex w-full flex-col items-center">
      <AcademiaHero />
      <AcademiaForm />
    </div>
  )
}
