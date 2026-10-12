import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BODY, H3, MUTED_LINK } from './shared.jsx'
import { ADVISORS, OFFICES, TEAM_GROUPS } from './teamData.js'

// /team T2–T4 (specs/PAGES_A.md). Two-column rows: left title column 386.7 (sticky, top 84) + right 773.3, gap 40.

function Row({ title, border = false, className = '', contentClassName = '', children }) {
  return (
    <section
      className={`relative grid w-full grid-cols-1 gap-5 py-10 md:grid-cols-[1fr_2fr] md:gap-10 md:py-20 ${border ? 'border-t border-black/[.04]' : ''} ${className}`}
    >
      <h3 className={`${H3} text-ink md:sticky md:top-[84px] md:self-start`}>{title}</h3>
      <div className={`flex min-w-0 flex-col ${contentClassName}`}>{children}</div>
    </section>
  )
}

/* ---------- T2 Our offices ---------- */

function WeatherPill({ emoji, temp }) {
  // Static stand-in for the live weather widget: 64×32 white pill, "Inter var" (falls back to Inter) 14/1/500 #111827
  return (
    <div className="hidden h-8 w-16 items-center justify-center rounded-[100px] bg-white shadow-[0_1px_4px_rgba(0,0,0,.04)] md:flex">
      <span className="flex items-center gap-[6px] text-[14px] font-medium leading-none text-gray-900 [font-family:'Inter_var',Inter,sans-serif]">
        <span>{emoji}</span>
        <span>
          {temp}
          <span className="relative top-[-2px] ml-px text-[12px] text-gray-400">°</span>
        </span>
      </span>
    </div>
  )
}

function OfficeCard({ office }) {
  const { city, address, short, weather } = office
  return (
    <div className="flex flex-col rounded-2xl bg-gray-50 p-5">
      <WeatherPill emoji={weather[0]} temp={weather[1]} />
      <p className={`${BODY} text-ink md:mt-[10px]`}>{city}</p>
      <p className={`${BODY} mt-[7px] text-gray-400 md:mt-[10px]`}>
        <span className="md:hidden">{short}</span>
        <span className="hidden md:inline">
          {Array.isArray(address) ? <>{address[0]}<br />{address[1]}</> : address}
        </span>
      </p>
    </div>
  )
}

export function Offices() {
  return (
    <Row title="Our offices" contentClassName="gap-10 md:pt-2">
      {/* ~32 words, 3 lines — placeholder copy; city names + lab link kept */}
      <p className={`${BODY} max-w-[600px] text-muted`}>
        Our offices are located in <span className="text-ink">Amsterdam,</span> <span className="text-ink">Zurich</span>, and{' '}
        <span className="text-ink">Boston</span>. Placeholder sentence about the Amsterdam office and its{' '}
        <Link to="/lab" className={MUTED_LINK}>state-of-the art lab</Link>, written only to match the length of the original copy.
      </p>
      <div className="grid grid-cols-2 gap-5">
        <video
          className="aspect-[376.7/211.9] w-full rounded-lg bg-gray-50 object-cover md:rounded-2xl"
          src="/assets/pages/team/content-LOvlFN.mp4" poster="/assets/pages/team/content-XWsIgg.png"
          autoPlay muted loop playsInline
        />
        <video
          className="aspect-[376.7/210.9] w-full rounded-lg bg-gray-50 object-fill md:rounded-2xl"
          src="/assets/pages/team/content-yygvM8.mp4" poster="/assets/pages/team/content-l8k0T7.png"
          autoPlay muted loop playsInline
        />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {OFFICES.map((o) => <OfficeCard key={o.city} office={o} />)}
      </div>
    </Row>
  )
}

/* ---------- T3 Our team ---------- */

function InfoIcon() {
  return (
    <span className="flex h-6 w-6 items-center justify-center bg-white">
      <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
        <path
          d="M 16 10 C 16 13.314 13.314 16 10 16 C 6.686 16 4 13.314 4 10 C 4 6.686 6.686 4 10 4 C 13.314 4 16 6.686 16 10 Z M 11 10 C 11 9.448 10.552 9 10 9 C 9.448 9 9 9.448 9 10 L 9 12 C 9 12.552 9.448 13 10 13 C 10.552 13 11 12.552 11 12 Z M 10 6 C 9.448 6 9 6.448 9 7 C 9 7.552 9.448 8 10 8 C 10.552 8 11 7.552 11 7 C 11 6.448 10.552 6 10 6 Z"
          fill="#9ca3af"
        />
      </svg>
    </span>
  )
}

function RoleTag({ children }) {
  // outer 0.5px padding r4 → middle bg #9ca3af r3.5 p1 → inner r2.5 px2; Inter 10/10/0.5/700 white
  return (
    <span className="hidden shrink-0 rounded p-[0.5px] md:flex">
      <span className="flex rounded-[3.5px] bg-gray-400 p-px">
        <span className="rounded-[2.5px] px-[2px] font-sans text-[10px] font-bold leading-[10px] tracking-[0.5px] text-white">{children}</span>
      </span>
    </span>
  )
}

// Bio text is placeholder (~45 words, two paragraphs) per the copy rule.
const BIO = [
  'Placeholder biography for this team member, describing their role and day-to-day focus at Cradle.',
  'A second short paragraph outlines their background, education and earlier research experience before they joined the team. It is neutral filler text of the same length.',
]

function PersonPill({ name, avatar, role }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`relative py-1 ${open ? 'z-[5]' : ''}`}>
      <div
        className="group relative flex h-9 w-fit cursor-default items-center gap-1 pl-1 md:h-10"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
      >
        <img src={`/assets/pages/team/${avatar}`} alt="" className="h-7 w-7 shrink-0 rounded-full object-cover md:h-8 md:w-8" />
        <span className="px-1 md:px-2">
          <span className={`${BODY} relative block whitespace-nowrap text-muted after:pointer-events-none after:absolute after:inset-0 after:border-b-2 after:border-dotted after:border-black/[.12] after:content-[''] group-hover:text-ink group-hover:after:border-ink`}>
            {name}
          </span>
        </span>
        {role && <RoleTag>{role}</RoleTag>}

        {/* Bio tooltip: 320 wide, centered under the pill, ≈9px below. Live: scale .95→1, y −8→0, opacity 0→1, spring ≈0.3s with slight overshoot. */}
        <div className="pointer-events-none absolute left-1/2 top-[calc(100%+9px)] w-[320px] -translate-x-1/2">
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                className="origin-top rounded-2xl bg-gray-800 p-4 shadow-[0_10px_20px_0_rgba(0,0,0,.05),inset_0_0_16px_0_rgba(255,255,255,.4)]"
                initial={{ opacity: 0, scale: 0.95, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
              >
                {BIO.map((t, i) => (
                  <p key={i} className={`font-sans text-[12px] font-medium leading-[16.8px] text-gray-50 ${i ? 'mt-[16.8px]' : ''}`}>{t}</p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export function OurTeam() {
  return (
    <Row title="Our team" border contentClassName="gap-10 md:pt-2">
      {/* ~33 words, 4 lines; last ~11 words #9ca3af — placeholder copy */}
      <p className={`${BODY} max-w-[600px] text-muted`}>
        Placeholder text introducing the team and the disciplines it brings together, from biology and design to engineering and machine learning, written only to match the original length.{' '}
        <span className="text-gray-400">The final words of this placeholder paragraph appear in a lighter grey tone.</span>
      </p>
      <div className="flex flex-col gap-6 md:pt-5">
        {TEAM_GROUPS.map((g) => (
          <div key={g.label}>
            <div className="flex h-14 items-center">
              <p className={`${BODY} text-muted`}>{g.label}</p>
              {g.info && <InfoIcon />}
            </div>
            <div className="grid grid-cols-3">
              {g.members.map(([name, avatar, role], i) => <PersonPill key={i} name={name} avatar={avatar} role={role} />)}
            </div>
          </div>
        ))}
      </div>
    </Row>
  )
}

/* ---------- T4 Our investors ---------- */

const LOGOS = ['logo-ojKp3J.png', 'logo-GuiCA2.png', 'logo-43mePq.png']

export function Investors() {
  return (
    <Row title="Our investors" border className="!pb-0 md:!pb-0">
      <div className="grid grid-cols-3 gap-2 md:gap-5">
        {LOGOS.map((l) => (
          <div key={l} className="flex h-24 items-center justify-center rounded-2xl bg-gray-50 md:h-[120px]">
            <img src={`/assets/pages/team/${l}`} alt="" className="h-12 w-12 rounded-[75px] object-contain md:h-16 md:w-16" />
          </div>
        ))}
      </div>
      <p className={`${BODY} mt-4 max-w-[600px] text-muted md:mt-5`}>
        We are funded by leading investors <span className="text-ink">IVP</span>, <span className="text-ink">Index Ventures</span>, and{' '}
        <span className="text-ink">Kindred Capital</span>, as well as a long list of world-class advisors and angel investors.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 lg:auto-rows-fr">
        {ADVISORS.map(([name, role]) => (
          <div key={name} className="pb-1">
            <div className="py-1">
              <p className={`${BODY} text-ink`}>{name}</p>
            </div>
            <p className="font-sans text-[14px] font-medium leading-[22.4px] text-muted md:text-[13px] md:leading-[20.8px]">{role}</p>
          </div>
        ))}
      </div>
    </Row>
  )
}
