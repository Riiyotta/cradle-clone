import { Link } from 'react-router-dom'

// CLONE_SPEC §13 Footer (`Desktop` / `Phone`); dark variant PAGES_B §B0.2.
// Variants differ only in background (diffed on live at 1440, every element identical otherwise):
// blue #224eee (homepage), dark #030712 (PAGES_B pages and most PAGES_A pages), accent #2d66f8 (/modality/*).
// Links with href null pointed at another domain on live; they keep their visuals but have no href.
const BG = { blue: 'bg-brand', dark: 'bg-ink', accent: 'bg-accent' }

const COLUMNS = [
  { gap: 'gap-[10px]', groups: [
    { header: 'Company', links: [['Careers', '/careers'], ['Our team', '/team']] },
  ] },
  // Groups in this column: gap 0 on desktop; 20px on phone (measured from live-390.png)
  { gap: 'gap-5 md:gap-0', groups: [
    { header: 'Industries', links: [['Biopharma', '/solutions/biopharma'], ['Industrial Bio', '/solutions/industrial']] },
    { header: 'Modalities', links: [['Antibody', '/modality/antibody'], ['Enzyme', '/modality/enzyme'], ['Peptide', '/modality/peptide'], ['Vaccine', '/modality/vaccine']] },
  ] },
  { gap: 'gap-0', groups: [
    { header: 'Resources', links: [
      ['Blog', '/blog', true],
      ['Press kit', '/presskit'],
      ['Trust center', null],
      ['Security & privacy', '/security'],
      [<><span className="md:hidden">Docs</span><span className="hidden md:inline">Documentation</span></>, null],
    ] },
  ] },
  { gap: 'gap-[10px]', groups: [
    { header: 'Connect', links: [['Talk to a Cradle expert', '/get-started'], ['For academia', '/solutions/academia']] },
    { header: 'Follow Cradle', links: [['LinkedIn', null]] },
  ] },
]

const LEGAL = 'font-sans font-medium text-white/60 whitespace-pre text-[10px] leading-[16px] tracking-[0.2px] md:text-[12px] md:leading-[18px] md:tracking-[0.24px] lg:leading-[19.2px]'

function Group({ header, links }) {
  return (
    <div className="flex w-full flex-col items-start">
      <p className="flex h-10 w-full items-center font-mono font-medium uppercase text-white/60 mix-blend-overlay text-[13px] leading-[13px] tracking-[0.26px] md:text-[14px] md:leading-[14px] md:tracking-[1.26px] lg:text-[16px] lg:leading-[16px] lg:tracking-normal">
        {header}
      </p>
      {links.map(([label, href, tall], i) => {
        const Tag = href ? Link : 'span'
        return (
        // Phone rows are 36px except Blog, which keeps 40px on live
        <p key={i} className={`flex w-full items-center md:h-10 ${tall ? 'h-10' : 'h-9'}`}>
          <Tag
            {...(href ? { to: href } : {})}
            className="font-sans font-medium text-white no-underline hover:text-white/80 text-[14px] leading-[22.4px] md:leading-[21px] tracking-[-0.28px] lg:text-[16px] lg:leading-[25.6px] lg:tracking-[-0.32px]"
          >
            {label}
          </Tag>
        </p>
        )
      })}
    </div>
  )
}

export default function Footer({ variant = 'blue' }) {
  return (
    <footer className={`flex w-full flex-col items-center ${BG[variant]}`}>
      {/* Nav: padding 40 40 80 (phone 40 16 80), ::after top 1px rgba(255,255,255,.04) */}
      <div className="relative flex w-full flex-col items-center px-4 pt-10 pb-20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] md:px-[60px] lg:px-10">
        <div className="relative z-[3] flex w-full max-w-container flex-col items-start gap-5 md:flex-row md:justify-center md:gap-5 lg:gap-10">
          {/* Logo column (desktop only) */}
          <div className="hidden md:flex md:w-px md:flex-[0.5] md:items-center lg:flex-1">
            <Link
              to="/"
              className="fborder flex h-16 w-16 shrink-0 items-center justify-center rounded-[17.45px] bg-[linear-gradient(180deg,#fff_0%,#f9fafb_100%)] shadow-[rgba(0,0,0,0.25)_0_0.362176px_1.08653px_-1.625px,rgba(0,0,0,0.14)_0_3px_9px_-3.25px]"
              style={{ '--fb': '0.5px solid rgba(0,0,0,.03)' }}
              aria-label="Cradle"
            >
              <img src="/assets/cradle-symbol-footer.svg" alt="" className="h-16 w-16" />
            </Link>
          </div>
          {COLUMNS.map((col, i) => (
            <div key={i} className={`flex w-full flex-col items-start md:w-px md:flex-1 ${col.gap}`}>
              {col.groups.map((g) => <Group key={g.header} {...g} />)}
            </div>
          ))}
        </div>
      </div>

      {/* Legal bar: padding 20 (phone 20 16), ::after top 1px rgba(255,255,255,.04) */}
      <div className="relative flex w-full flex-col items-center justify-start gap-4 px-4 py-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] md:flex-row md:justify-between md:gap-0 md:p-5">
        <div className="flex w-full items-center justify-between md:w-px md:flex-1 md:justify-start md:gap-5">
          <p className={LEGAL}>
            <span className="md:hidden whitespace-pre">{' © 2026 · Cradle'}</span>
            <span className="hidden md:inline whitespace-pre">{' © 2026 · Cradle is a registered trademark'}</span>
          </p>
          <p className={LEGAL}><Link to="/legal-terms" className="text-inherit no-underline">Legal Terms</Link></p>
          <p className={`${LEGAL} md:!leading-[19.2px]`}><Link to="/privacy-policy" className="text-inherit no-underline">Privacy Policy</Link></p>
          <button type="button" aria-label="Cookie Trigger" className={`${LEGAL} cursor-pointer border-0 bg-transparent p-0`}>Cookies</button>
        </div>
        <p className={`${LEGAL} hidden md:block`}>Built with ❤️ in Amsterdam &amp; Zurich</p>
      </div>
    </footer>
  )
}
