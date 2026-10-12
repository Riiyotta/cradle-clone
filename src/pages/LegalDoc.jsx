import { motion } from 'framer-motion'
import { FRAMER_EASE } from '../components/ui.jsx'

// Placeholder legal document. These routes are linked from the footer but were never
// measured on live; headings are generic and every paragraph is placeholder text.
const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
const SECTIONS = ['Introduction', 'Definitions', 'Scope', 'Your responsibilities', 'Our responsibilities', 'Data and security', 'Changes to this document', 'Contact']

function LegalDoc({ title }) {
  return (
    <section className="w-full px-4 pt-[120px] pb-20 lg:px-10 lg:pt-[160px] lg:pb-[120px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: FRAMER_EASE }}
        className="mx-auto flex max-w-[720px] flex-col gap-10"
      >
        <div className="flex flex-col gap-4">
          <h1 className="font-heading font-medium text-ink text-[40px] leading-[40px] tracking-[-1.6px] lg:text-[64px] lg:leading-[64px] lg:tracking-[-2.56px]">{title}</h1>
          <p className="font-sans font-medium text-muted text-[14px] leading-[22.4px] lg:text-[16px] lg:leading-[25.6px]">Placeholder document. Last updated: —</p>
        </div>
        {SECTIONS.map((h, i) => (
          <div key={h} className="flex flex-col gap-3">
            <h2 className="font-heading font-medium text-ink text-[18px] leading-[21.6px] lg:text-[24px] lg:leading-[28.8px]">{i + 1}. {h}</h2>
            <p className="font-sans font-medium text-muted text-[14px] leading-[22.4px] tracking-[-0.28px] lg:text-[16px] lg:leading-[25.6px] lg:tracking-[-0.32px]">{LOREM}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

export function LegalTerms() { return <LegalDoc title="Legal Terms" /> }
export function PrivacyPolicy() { return <LegalDoc title="Privacy Policy" /> }
