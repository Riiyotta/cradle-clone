import { Fragment, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui.jsx'

// CLONE_SPEC §1 Navbar; light variant PAGES_B §B0.1 (re-measured on live /blog at 1440 and 390).
// Variants come from src/chrome.js: desktop 'dark' | 'light' | 'academia', phone 'dark' | 'light'.
// Links with href null pointed at another domain on live; they keep their visuals but have no href.

// Same-site link via the router, or a plain span when the live target is external
function NavLink({ href, className, style, children }) {
  return href
    ? <Link to={href} className={className} style={style}>{children}</Link>
    : <span className={className} style={style}>{children}</span>
}

const DROPDOWNS = {
  Solutions: {
    w: 432,
    cols: [
      { header: 'By industry', itemW: 150, pad: 'pt-2 px-2 pb-3', items: [
        { label: 'Biopharma', href: '/solutions/biopharma' },
        { label: 'Industrial', href: '/solutions/industrial' },
        { label: 'Academia', href: '/solutions/academia' },
      ] },
      { header: 'By modality', itemW: 200, pad: 'pt-2 px-2 pb-3', items: [
        { label: 'Antibody', href: '/modality/antibody', icon: 'antibody' },
        { label: 'Enzyme', href: '/modality/enzyme', icon: 'enzyme' },
        { label: 'Vaccine', href: '/modality/vaccine', icon: 'vaccine' },
        { label: 'Peptide', href: '/modality/peptide', icon: 'peptide' },
      ] },
    ],
  },
  Company: {
    w: 216,
    cols: [{ itemW: 200, pad: 'p-2', items: [
      { label: 'Our team', href: '/team', icon: 'team' },
      { label: 'Our wet lab', href: '/lab', icon: 'lab' },
      { label: 'Careers', href: '/careers', icon: 'careers' },
    ] }],
  },
  Resources: {
    w: 216,
    cols: [{ itemW: 200, pad: 'p-2', items: [
      { label: 'Blog', href: '/blog', icon: 'blog' },
      { label: 'Case studies', href: '/case', icon: 'case-studies' },
      { label: 'Documentation', href: null, icon: 'docs' },
      { label: 'Security & privacy', href: '/security', icon: 'security' },
      { label: 'Cradle-1 Whitepaper', href: '/whitepaper', icon: 'whitepaper' },
    ] }],
  },
}

const LINKS = [
  { label: 'Platform', href: '/platform' },
  { label: 'Solutions', dropdown: true },
  { label: 'Company', dropdown: true },
  { label: 'Licensing', href: '/licensing' },
  { label: 'Resources', dropdown: true },
]

// Phone menu, grouped as on live. `h` = row height when not 48 (light small-links rows).
const MOBILE_SECTIONS = [
  { rows: [{ label: 'Platform', href: '/platform' }] },
  { group: 'Industries', rows: [
    { label: 'Biopharma', href: '/solutions/biopharma' },
    { label: 'Industrial', href: '/solutions/industrial' },
    { label: 'Academia', href: '/solutions/academia' },
  ] },
  { group: 'Modalities', rows: [
    { label: 'Antibody', href: '/modality/antibody' },
    { label: 'Enzyme', href: '/modality/enzyme' },
    { label: 'Peptide', href: '/modality/peptide' },
    { label: 'Vaccine', href: '/modality/vaccine' },
  ] },
  { group: 'Company', rows: [
    { label: 'Our team', href: '/team' },
    { label: 'Careers', href: '/careers' },
    { label: 'Our wet lab', href: '/lab' },
    { label: 'Blog', href: '/blog' },
    { label: 'Case studies', href: '/case' },
  ] },
  { rows: [
    { label: 'Licensing', href: '/licensing', h: 'h-11' },
    { label: 'Documentation', href: null, h: 'h-11' },
    { label: 'Security & Privacy', href: '/security', h: 'h-11' },
    { label: 'Whitepaper', href: '/whitepaper', h: 'h-14' },
    { label: 'Trust', href: null, h: 'h-11' },
  ] },
]

// Dark phone menu (unchanged rendering): flat list, { group } = label, { label, href } = link row
const MOBILE_ROWS = MOBILE_SECTIONS.flatMap((sec) => [...(sec.group ? [{ group: sec.group }] : []), ...sec.rows])

function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-3 shrink-0 md:w-[161.2px]">
      <div
        className="fborder w-9 h-9 rounded-[9.82px] shrink-0 bg-[linear-gradient(180deg,#fff_0%,#f9fafb_100%)] shadow-[rgba(0,0,0,.25)_0_.362176px_1.08653px_-1.625px,rgba(0,0,0,.14)_0_3px_9px_-3.25px]"
        style={{ '--fb': '0.5px solid rgba(0,0,0,.03)' }}
      >
        <img src="/assets/cradle-symbol.svg" alt="" className="w-9 h-9" />
      </div>
      <img src="/assets/logo-wordmark.png" alt="cradle" className="w-[78px] h-[22.1px]" style={{ filter: light ? 'grayscale(1) invert(0)' : 'grayscale(1) invert(1)', mixBlendMode: 'luminosity' }} />
    </Link>
  )
}

function Panel({ name }) {
  const d = DROPDOWNS[name]
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      // Live open: opacity 0→1 and y 8→0 share one spring (duration 0.4, bounce 0.2; y overshoots to −0.12px, settles ≈420ms).
      // Close timing could not be measured on live (synthetic pointer events don't close it); exit kept as before.
      animate={{ opacity: 1, y: 0, transition: { type: 'spring', duration: 0.4, bounce: 0.2 } }}
      exit={{ opacity: 0, y: 8, transition: { duration: 0.15, ease: 'easeIn' } }}
      className="flex flex-row bg-white rounded-xl shadow-[rgba(0,0,0,.18)_0_.602187px_.602187px_-1.25px,rgba(0,0,0,.16)_0_2.28853px_2.28853px_-2.5px,rgba(0,0,0,.06)_0_10px_10px_-3.75px]"
      style={{ width: d.w }}
    >
      {d.cols.map((col, ci) => (
        <div key={ci} className={`flex flex-col ${col.pad}`}>
          {col.header && (
            <div className="w-[200px] h-8 pt-2 pr-4 pb-2 pl-3 font-sans font-medium text-[13px] leading-[15.6px] text-gray-400">{col.header}</div>
          )}
          {col.items.map((it) => (
            <NavLink
              key={it.label}
              href={it.href}
              className="flex items-center gap-3 h-10 py-2 px-3 rounded-lg font-sans font-medium text-[14px] leading-[16.8px] text-muted hover:text-ink whitespace-nowrap"
              style={{ width: col.itemW }}
            >
              {it.icon && <img src={`/assets/menu-icon-${it.icon}.svg`} alt="" className="w-6 h-6 shrink-0" />}
              {it.label}
            </NavLink>
          ))}
        </div>
      ))}
    </motion.div>
  )
}

const linkBase = 'flex items-center h-9 px-3 rounded-lg font-sans font-semibold text-[14px] leading-[16.8px] tracking-[-0.14px] whitespace-pre'
// Dark/academia: white, hover rgba(255,255,255,.8). Light: #616e80, hover #030712 (instant).
const linkColor = { dark: 'text-white hover:text-white/80', academia: 'text-white hover:text-white/80', light: 'text-muted hover:text-ink' }
const barBg = { dark: 'bg-ink', academia: 'bg-[#1f5f36]', light: 'bg-white' }

function DesktopLinks({ variant }) {
  const [open, setOpen] = useState(null)
  const linkCls = `${linkBase} ${linkColor[variant]}`
  return (
    <div className="flex flex-row items-center">
      {LINKS.map((l) =>
        !l.dropdown ? (
          <Link key={l.label} to={l.href} className={linkCls}>{l.label}</Link>
        ) : (
          <div key={l.label} className="relative" onMouseEnter={() => setOpen(l.label)} onMouseLeave={() => setOpen(null)}>
            <button type="button" className={`${linkCls} bg-transparent border-0 cursor-pointer`}>{l.label}</button>
            {/* pt-1 bridges the 4px gap between the trigger (bottom 50) and the panel (top 54) */}
            <div className="absolute left-1/2 top-full -translate-x-1/2 pt-1">
              <AnimatePresence>{open === l.label && <Panel name={l.label} />}</AnimatePresence>
            </div>
          </div>
        ),
      )}
    </div>
  )
}

// Light: box adds mix-blend-mode luminosity + ::after 1px rgba(0,0,0,.08) (fborder default); bars #030712
function Hamburger({ open, onClick, light = false }) {
  const bar = light ? 'bg-ink' : 'bg-white'
  return (
    <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={onClick} className="w-11 h-11 flex items-center justify-center bg-transparent border-0 p-0 cursor-pointer">
      <span className={`relative w-9 h-9 rounded-[6px] bg-white/[.08] ${light ? 'fborder mix-blend-luminosity' : ''}`}>
        <span className={`absolute left-[11px] w-[14px] h-[2px] rounded-[10px] ${bar} ${open ? 'top-[17px] rotate-45' : 'top-[13px]'}`} />
        <span className={`absolute left-[11px] w-[14px] h-[2px] rounded-[10px] ${bar} ${open ? 'top-[17px] -rotate-45' : 'top-[21px]'}`} />
      </span>
    </button>
  )
}

const btnPhone = '!text-[13px] !leading-[15.6px] !tracking-[-0.13px]'
const groupLabel = 'font-sans font-medium text-[13px] leading-[15.6px] text-gray-400'

// Light open menu, measured on live /blog at 390 (`mobile-light-open`): one column, gap 16 between
// buttons, rows, dividers and labels; rows inside a group gap 4. Rows 358×48 (small links 44, Whitepaper 56),
// text Inter 14/600/18.2 #616e80. Dividers 1px rgba(0,0,0,.04); live also renders a second
// rgba(255,255,255,.08) divider before "Industries" (invisible on white), kept as measured.
function LightMenu() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Button variant="secondary" size={36} href={null} className={`w-full ${btnPhone}`}>Sign in</Button>
        <Button variant="primary" size={36} to="/get-started" className={`w-full ${btnPhone}`}>Discuss your project</Button>
      </div>
      {MOBILE_SECTIONS.map((sec, i) => (
        <Fragment key={i}>
          {i > 0 && <div className="h-px w-full bg-black/[.04]" />}
          {i === 1 && <div className="h-px w-full bg-white/[.08]" />}
          {sec.group && <p className={groupLabel}>{sec.group}</p>}
          <div className="flex flex-col gap-1">
            {sec.rows.map((r) => (
              <NavLink key={r.label} href={r.href} className={`flex items-center w-full ${r.h || 'h-12'} font-sans font-semibold text-[14px] leading-[18.2px] text-muted`}>{r.label}</NavLink>
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  )
}

function PhoneNav({ variant }) {
  const [open, setOpen] = useState(false)
  const light = variant === 'light'
  return (
    <div className={`md:hidden ${light ? 'bg-white' : 'bg-ink'} px-4 flex flex-col ${open ? 'h-[100dvh] pt-[10px] pb-[120px] gap-10 overflow-y-auto' : 'h-16 py-[10px]'}`}>
      <div className="flex flex-row items-center justify-between h-11 shrink-0">
        <Logo light={light} />
        <div className="flex flex-row items-center gap-1">
          {open ? (
            <div className="opacity-0"><Button variant="primary" size={36} to="/get-started" className={`w-[100px] ${btnPhone}`} tabIndex={-1} aria-hidden="true">Talk to sales</Button></div>
          ) : (
            <Button variant="primary" size={36} to="/get-started" className={btnPhone}>Discuss your project</Button>
          )}
          <Hamburger open={open} light={light} onClick={() => setOpen((o) => !o)} />
        </div>
      </div>
      {open && (light ? <LightMenu /> : (
        <>
          <div className="flex flex-col gap-2">
            <Button variant="secondary" size={36} href={null} className={`w-full ${btnPhone}`}>Sign in</Button>
            <Button variant="primary" size={36} to="/get-started" className={`w-full ${btnPhone}`}>Discuss your project</Button>
          </div>
          <nav className="flex flex-col">
            {MOBILE_ROWS.map((r, i) =>
              r.group ? (
                <div key={i} className={`pt-6 pb-2 ${groupLabel}`}>{r.group}</div>
              ) : (
                <NavLink key={i} href={r.href} className="flex items-center h-12 border-b border-white/[.08] font-sans font-semibold text-[14px] leading-[18.2px] text-white">{r.label}</NavLink>
              ),
            )}
          </nav>
        </>
      ))}
    </div>
  )
}

export default function Navbar({ desktop = 'dark', phone = 'dark' }) {
  // Close the phone menu on navigation: remount PhoneNav per route
  const { pathname } = useLocation()
  return (
    <header id="desktop-nav" className="fixed top-0 left-0 w-full z-10">
      <div className={`hidden md:flex h-16 ${barBg[desktop]} px-6 flex-row items-center justify-between`}>
        <Logo light={desktop === 'light'} />
        <DesktopLinks variant={desktop} />
        <div className="flex flex-row items-center gap-2">
          <Button variant="secondary" size={36} href={null}>Sign in</Button>
          <Button variant="primary" size={36} to="/get-started">Discuss your project</Button>
        </div>
      </div>
      <PhoneNav key={pathname} variant={phone} />
    </header>
  )
}
