import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FRAMER_EASE } from '../ui.jsx'

// PAGES_B §B8 link-in-bio template, shared by /links, /notebook and /shirt.
// Base classes = phone (<810), md: = desktop (tablet unmeasured; uses the desktop column).

const A = '/assets/pages/links'
const NB = '/assets/pages/notebook'

export const MotionLink = motion.create(Link)

// Root frame: padding 80 80 0 / gap 80 (phone 64 24 0 / gap 10)
export function LinkInBioRoot({ className = 'pt-16 px-6 md:pt-20 md:px-20', children }) {
  return (
    <div className={`w-full bg-white flex flex-col items-center gap-[10px] md:gap-20 ${className}`}>
      {children}
    </div>
  )
}

// B8.1 column, fadeUp40 on load (exact): opacity .001→1, y 40→0, spring {bounce .1, duration .4}, delay .3
export function LinkInBioColumn({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0.001, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', bounce: 0.1, duration: 0.4, delay: 0.3 }}
      className="w-full max-w-[500px] flex flex-col items-center justify-center gap-6 md:gap-10"
    >
      {children}
    </motion.div>
  )
}

// B8.2 brand block. Logo tile on these pages has no bg/shadow (measured), radius 20 (phone 56 / 15).
export function BrandBlock() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 md:gap-4">
      <Link to="/" aria-label="Cradle home" className="block">
        <div
          className="w-14 h-14 rounded-[15px] md:w-[72px] md:h-[72px] md:rounded-[20px] bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: 'url(/assets/cradle-symbol.svg)' }}
        />
      </Link>
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <img src={`${A}/icon-130x32-5a733f.svg`} alt="cradle" className="hidden md:block w-[130px] h-8" />
        <img src={`${A}/icon-114x28-3e856c.svg`} alt="cradle" className="md:hidden w-[114px] h-7" />
        <p className="font-sans font-medium text-muted text-center text-[14px] leading-[22.4px] tracking-[-0.28px] md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]">
          Engineer better proteins, faster.
        </p>
      </div>
    </div>
  )
}

export const h5Cls = 'font-heading font-semibold text-ink text-[16px] leading-5 tracking-[-0.16px] md:text-[18px] md:leading-[25.2px] md:tracking-[-0.18px]'

// HubSpot form embed = EXTERNAL → empty box at the measured iframe size.
export function FormPlaceholder({ h, hMobile }) {
  return (
    <div
      role="presentation"
      data-placeholder="hubspot-form"
      className="w-full h-[var(--hm)] md:h-[var(--h)] bg-white"
      style={{ '--h': `${h}px`, '--hm': `${hMobile}px` }}
    />
  )
}

// B8.4 link buttons
const btnBase = 'w-full flex flex-row items-center justify-center gap-[10px] p-3 rounded-xl font-sans font-semibold text-[13px] leading-[15.6px] tracking-[-0.13px] md:text-[14px] md:leading-[16.8px] md:tracking-[-0.14px]'
const hoverT = { duration: 0.25, ease: 'easeOut' }

function LinkButton({ to, primary = false, icon, children }) {
  const cls = `${btnBase} ${primary ? 'h-12 text-white shadow-[inset_0_-2px_0_0_rgba(0,0,0,.12)]' : 'h-11 md:h-12 text-ink'}`
  const style = { backgroundColor: primary ? '#2d66f8' : '#f3f4f6' }
  const hover = { backgroundColor: primary ? '#224eee' : '#e5e7eb', transition: hoverT }
  const inner = (
    <>
      {icon && (
        <>
          <img src={icon[0]} alt="" className="hidden md:block w-6 h-6 shrink-0" />
          <img src={icon[1]} alt="" className="md:hidden w-5 h-5 shrink-0" />
        </>
      )}
      <span className="whitespace-nowrap">{children}</span>
    </>
  )
  // EXTERNAL targets render the same button without an href
  return to
    ? <MotionLink to={to} className={cls} style={style} whileHover={hover}>{inner}</MotionLink>
    : <motion.a className={`${cls} cursor-pointer`} style={style} whileHover={hover}>{inner}</motion.a>
}

export function LinkButtons({ antibodyIcon = 'links' }) {
  const ab = antibodyIcon === 'notebook'
    ? [`${NB}/antibody-24x24-0775c9.svg`, `${NB}/antibody-20x20-2b54f9.svg`]
    : [`${A}/antibody-24x24-757549.svg`, `${A}/antibody-20x20-97c11e.svg`]
  return (
    <div className="w-full flex flex-col items-center justify-center gap-[11px] md:gap-3">
      <LinkButton to="/get-started" primary>Book a meeting</LinkButton>
      <LinkButton to="/solutions/biopharma" icon={ab}>Cradle for Biopharma</LinkButton>
      <LinkButton to="/solutions/industrial" icon={[`${A}/bottle-24x24-43acf5.svg`, `${A}/bottle-20x20-0f637f.svg`]}>Cradle for Industrial Bio</LinkButton>
      {/* Only 24px files exist for the next three; phone renders them at 20px */}
      <LinkButton to="/" icon={[`${A}/icon-24x24-88eed1.svg`, `${A}/icon-24x24-88eed1.svg`]}>Website <span className="text-muted">(cradle.bio)</span></LinkButton>
      <LinkButton to="/whitepaper" icon={[`${A}/icon-24x24-66f3dc.svg`, `${A}/icon-24x24-66f3dc.svg`]}>Cradle whitepaper</LinkButton>
      <LinkButton icon={[`${A}/icon-24x24-7957ee.svg`, `${A}/icon-24x24-7957ee.svg`]}>Follow us on Linkedin</LinkButton>
    </div>
  )
}

// B8.5 case studies (6 latest CMS "Case studies" posts)
const CASES = [
  { slug: 'keasling-qs21', tag: 'Enzyme', img: '/assets/case-keasling-qs21.png', title: 'Using AI to produce vaccine adjuvants without cutting down rainforest' },
  { slug: 'therapeutic-peptides', tag: 'Peptide', img: '/assets/case-therapeutic-peptides.png', title: 'Engineering therapeutic peptides with 50% success rate under tight multi-property constraints, 5× faster than prior efforts' },
  { slug: 'staphylococcus-aureus-vaccine', tag: 'Vaccine', img: '/assets/case-staph-aureus-vaccine.png', title: 'Improving Staphylococcus aureus vaccine thermostability by 2.5 °C in a single round, 7× faster than rational design' },
  { slug: 'igg-campaign', tag: 'Antibody', img: '/assets/case-igg-campaign.png', title: 'Rescuing a stalled IgG campaign: 10 candidates meeting potency and developability criteria in 3 rounds' },
  { slug: 'haloalkane-dehalogenase-thermostability', tag: 'Enzyme', img: '/assets/cms/haloalkane-dehalogenase-thermostability.png', title: 'Improving haloalkane dehalogenase thermostability by +20 °C while enhancing activity and expression' },
  { slug: 'polyspecific-anti-venom-vhhs', tag: 'Antibody', img: '/assets/cms/polyspecific-anti-venom-vhhs.png', title: 'Engineering polyspecific anti-venom VHHs with sub-nanomolar binding and high thermostability' },
]

export function CaseGrid() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-1 md:gap-3">
      <div className="w-full min-h-11 md:min-h-8 flex flex-col justify-center">
        {/* Live phone variant titles this "Recent case studies" (measured at 390) */}
        <h5 className={h5Cls}><span className="md:hidden">Recent case studies</span><span className="hidden md:inline">Case studies</span></h5>
      </div>
      <div className="w-full grid grid-cols-2 auto-rows-fr gap-x-3 gap-y-6">
        {CASES.map((c) => (
          <Link key={c.slug} to={`/blog/${c.slug}`} className="flex flex-col items-center gap-[10px]">
            <div className="w-full aspect-[244/120.3] rounded-lg overflow-hidden">
              <img src={c.img} alt="" className="w-full h-full object-cover rounded-lg" />
            </div>
            <p className="w-full font-sans font-bold uppercase text-gray-400 text-[9px] leading-[11.7px] tracking-[1.08px] md:text-[11px] md:leading-[14.3px] md:tracking-[-0.44px]">{c.tag}</p>
            <h6 className="w-full font-sans font-medium text-gray-400 text-[10px] leading-[15px] md:text-[12px] md:leading-[18px]">{c.title}</h6>
          </Link>
        ))}
      </div>
    </div>
  )
}

const PLAY = 'M 0 0.736 L 0 17.259 C 0.005 17.527 0.153 17.772 0.388 17.902 C 0.623 18.031 0.91 18.025 1.139 17.886 L 14.647 9.625 C 14.866 9.492 15 9.254 15 8.997 C 15 8.741 14.866 8.503 14.647 8.37 L 1.139 0.109 C 0.91 -0.03 0.623 -0.036 0.388 0.093 C 0.153 0.222 0.005 0.468 0 0.736 Z'

// B8.6 wet lab block. Video links go to cradle.wistia.com (EXTERNAL) → no href.
function VideoCard({ img, title }) {
  return (
    <a className="fborder w-full h-28 flex flex-row items-center justify-center gap-4 p-4 rounded-2xl bg-white shadow-[0_1px_8px_0_rgba(0,0,0,.08)] backdrop-blur-[10px] cursor-pointer" style={{ '--fb': '1px solid rgba(255,255,255,.08)' }}>
      <div className="relative w-[120px] h-20 shrink-0 rounded-[6px] overflow-hidden opacity-95">
        <img src={img} alt="" className="w-full h-full object-cover rounded-[6px]" />
        <div className="absolute left-10 top-5 w-10 h-10 rounded-[100px] flex items-center justify-center backdrop-blur-[5px]" style={{ backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,.5) 0%, rgba(255,255,255,.08) 100%)' }}>
          {/* video-20x20-63208f.svg inlined: live paints it via CSS vars (fill #fff opacity 1, stroke #fff 1.5) */}
          <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
            <path d={PLAY} transform="translate(6.75 3.003)" fill="#fff" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-[6px]">
        <p className="font-sans font-semibold text-gray-800 text-[14px] leading-[18.2px] md:text-[16px] md:leading-[20.8px]">{title}</p>
        <p className="font-sans font-medium text-gray-400 text-[14px] leading-[22.4px] tracking-[-0.28px] md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]">3 min</p>
      </div>
    </a>
  )
}

export function WetLab() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-1 md:gap-3">
      <div className="w-full min-h-11 md:min-h-8 flex flex-row items-center gap-[10px]">
        <h5 className={`flex-1 ${h5Cls}`}>Meet the Cradle wet lab</h5>
        <p className="shrink-0 md:flex-1 text-right font-sans font-medium text-[14px] leading-[22.4px] md:text-[16px] md:leading-[25.6px]">
          <Link to="/lab" className="text-muted hover:text-[#29333c] underline">Learn more</Link>
        </p>
      </div>
      <VideoCard img={`${A}/video-PHAYVkrR.png`} title="Lab automation at Cradle" />
      <VideoCard img={`${A}/video-w2zATkuZ.png`} title="Design principles for ML-ready sample tracking" />
    </div>
  )
}

// B8.7 footer graphic: 1280×300 clip (phone 342×250, pt 70). Inner box slides up from y 320 on enter (≈0.4s, once).
export function FooterGraphic() {
  return (
    <motion.div
      initial="off"
      whileInView="on"
      viewport={{ once: true }}
      className="w-full max-w-container h-[250px] pt-[70px] md:h-[300px] md:pt-0 bg-white overflow-hidden flex flex-row justify-center items-start shrink-0"
    >
      <motion.div
        variants={{ off: { y: 320 }, on: { y: 0 } }}
        transition={{ duration: 0.4, ease: FRAMER_EASE }}
        className="relative w-[250px] h-[250px] md:w-[400px] md:h-[400px] shrink-0 overflow-hidden"
      >
        <img src={`${A}/footer-300x314-36e14f.svg`} alt="" className="hidden md:block absolute left-[44px] top-[43px] w-[300px] h-[314px] max-w-none" />
        <img src={`${A}/footer-188x196-f2337c.svg`} alt="" className="md:hidden absolute left-8 top-[22px] w-[188px] h-[196px] max-w-none" />
      </motion.div>
    </motion.div>
  )
}
