import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FRAMER_EASE } from '../ui.jsx'
import { MotionLink } from './LinkInBio.jsx'

// PAGES_B §B10 /licensing. Base = phone (<810), md: = desktop values.

function usePhone() {
  const q = '(max-width: 809.98px)'
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setM(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return m
}

const h3Cls = 'font-heading font-medium text-ink text-[24px] leading-[28.8px] tracking-[-0.48px] md:text-[32px] md:leading-[38.4px] md:tracking-[-0.64px]'
const bodyCls = 'font-sans font-medium text-muted text-[14px] leading-[22.4px] tracking-[-0.28px] md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]'
const btn36 = 'shrink-0 inline-flex items-center justify-center h-9 px-4 rounded-lg font-sans font-semibold whitespace-nowrap text-[13px] leading-[15.6px] tracking-[-0.13px] md:text-[14px] md:leading-[16.8px] md:tracking-[-0.14px]'

// Primary36 / Secondary36 with padding 0 16px (B0.4). Primary hover bg #1b3ada ≈100ms; Secondary: no hover change.
function Primary36({ to, className = '', children }) {
  return (
    <MotionLink
      to={to}
      className={`${btn36} text-white shadow-[inset_0_0_0_1px_rgba(0,0,0,.12)] ${className}`}
      style={{ backgroundColor: '#224eee' }}
      whileHover={{ backgroundColor: '#1b3ada', transition: { duration: 0.1, ease: FRAMER_EASE } }}
    >
      {children}
    </MotionLink>
  )
}
const secondaryCls = `${btn36} bg-white text-ink shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)]`

// ---------- B10.1 Hero ----------
// [file, desktop h, phone h] — rendered heights measured on live (width 108.8 / phone 75.5, contain)
const LOGOS = [['novonesis', 40.6, 28.2], ['novo-nordisk', 42, 39], ['jnj', 40.6, 28.2], ['bayer', 42, 39], ['abbvie', 20.3], ['hansa', 42], ['illumina', 24.8], ['csl', 42], ['lundbeck', 42], ['ultragenyx', 40.6]]

export function LicensingHero() {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-10 pt-[144px] px-5 pb-10 md:px-10">
      <div className="w-full max-w-[800px] flex flex-col items-center justify-center gap-5 md:gap-8">
        {/* Appear (exact): opacity .001, rotate -10, scale .5 → 1, spring {bounce .2, duration .4}, delay .1 */}
        <motion.div
          initial={{ opacity: 0.001, rotate: -10, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.4, delay: 0.1 }}
          className="fborder w-[72px] h-[72px] rounded-[20px] shrink-0 shadow-[0_0.362176px_1.08653px_-1.625px_rgba(0,0,0,.25),0_3px_9px_-3.25px_rgba(0,0,0,.14)]"
          style={{ backgroundImage: 'url(/assets/cradle-symbol.svg), linear-gradient(180deg,#fff 0%,#f9fafb 100%)', backgroundSize: 'contain, auto', backgroundRepeat: 'no-repeat', '--fb': '.5px solid rgba(0,0,0,.03)' }}
        />
        <h2 className="w-full text-center font-heading font-medium text-gray-800 text-[32px] leading-[35.2px] tracking-[-0.64px] md:text-[64px] md:leading-[64px] md:tracking-[-2.56px]">
          A modern software
          <br />
          license. No hidden fees.
        </h2>
        <p className="w-full text-center [text-wrap:balance] font-sans font-medium text-muted text-[16px] leading-6 tracking-[-0.64px] md:text-[20px] md:leading-[30px] md:tracking-[-0.8px]">
          One annual software license. No complicated royalty deals, no milestone payments, no hidden fees. It's that simple.
        </p>
      </div>
      {/* 5 × 108.8, gap 32/64 (phone 4 × 75.5, gap 32/16; live phone shows only the first 4 logos) */}
      <div className="w-full max-w-[800px] grid grid-cols-4 gap-x-4 gap-y-8 md:grid-cols-5 md:gap-x-16 items-center">
        {LOGOS.map(([l, h, hm], i) => (
          <div key={l} className={`flex items-center justify-center ${i >= 4 ? 'hidden md:flex' : ''}`}>
            <img src={`/assets/customer-logo-${l}.svg`} alt={l} className="w-full max-w-[117px] h-[var(--hm)] md:h-[var(--h)] object-contain opacity-60" style={{ '--h': `${h}px`, '--hm': `${hm || h}px` }} />
          </div>
        ))}
      </div>
    </section>
  )
}

// ---------- B10.2 license-grid ----------
const TIERS = {
  standard: { title: 'Standard', bg: 'linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)', bar: '#0ea5e9', sub: 'Per active project', body: 'Annual License based on the number of projects you need. For organizations that run one to several programs.' },
  enterprise: { title: 'Enterprise', bg: 'linear-gradient(180deg, #eff4ff 0%, #dbe7fe 100%)', bar: '#2d66f8', sub: 'Scale flexibly', body: 'For organizations with multiple projects who want to deploy Cradle across programs and divisions.' },
  academic: { title: 'Academic', bg: 'linear-gradient(180deg, #effaf1 0%, #e1f7e6 100%)', bar: '#3cab57', sub: 'Not-for-profit research', body: 'Apply to join our academic program tailored to not-for-profit research. Limited availability.' },
}

function TierCard({ tier, wide = false, button, className = '' }) {
  const t = TIERS[tier]
  const phone = usePhone()
  // Phone: enter from translateY(40px) scale(.95) (transition not captured; uses fadeUp40's spring)
  const enter = phone
    ? { initial: { y: 40, scale: 0.95 }, whileInView: { y: 0, scale: 1 }, viewport: { once: true }, transition: { type: 'spring', bounce: 0.1, duration: 0.4 } }
    : {}
  return (
    <motion.div
      {...enter}
      whileHover={{ boxShadow: 'inset 0 0 0 2px rgba(0,0,0,.04)', transition: { duration: 0.1, ease: FRAMER_EASE } }}
      style={{ backgroundImage: t.bg, boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0)' }}
      className={`flex flex-col justify-start gap-10 p-5 rounded-2xl overflow-hidden md:justify-between md:gap-0 md:p-10 md:rounded-3xl ${wide ? 'md:flex-row md:items-start' : 'md:h-[420px]'} ${className}`}
    >
      <div className={`flex flex-col items-start justify-center gap-1 ${wide ? 'md:flex-1' : ''}`}>
        <div className="h-7 flex flex-row items-center gap-2">
          <div className="w-1 h-6 rounded-[4px] shrink-0" style={{ background: t.bar }} />
          <h4 className="font-heading font-medium text-ink text-[18px] leading-[21.6px] md:text-[24px] md:leading-[28.8px]">{t.title}</h4>
        </div>
        <p className={bodyCls}>{t.sub}</p>
      </div>
      <div className={`flex flex-col items-stretch gap-5 md:items-start ${wide ? 'md:flex-1' : ''}`}>
        <p className={bodyCls}>{t.body}</p>
        {button}
      </div>
    </motion.div>
  )
}

export function LicenseGrid() {
  return (
    <section className="w-full flex flex-col items-center gap-10 py-10 px-5 md:py-20 md:px-10">
      <div className="w-full max-w-[960px] flex flex-col gap-2">
        <h3 className={h3Cls}>Our licenses</h3>
        <p className={bodyCls}>Licensing for every research need.</p>
      </div>
      <div className="w-full max-w-[960px] flex flex-col gap-5 md:grid md:grid-cols-3 md:grid-rows-[420px_200px]">
        <TierCard tier="standard" button={<Primary36 to="/get-started">Let's talk</Primary36>} />
        <TierCard tier="enterprise" button={<Primary36 to="/get-started">Let's talk</Primary36>} />
        <img src="/assets/pages/licensing/license-grid-FwU6ZVTs.jpg" alt="" className="hidden md:block w-full h-[420px] object-cover rounded-3xl" />
        <img src="/assets/pages/licensing/license-grid-FRS8jcOd.jpg" alt="" className="hidden md:block w-full h-[200px] object-cover rounded-3xl" />
        <TierCard tier="academic" wide className="md:col-span-2 md:h-[200px]" button={<Link to="/solutions/academia" className={secondaryCls}>Apply now</Link>} />
      </div>
    </section>
  )
}

// ---------- B10.3 Included in all licenses ----------
const GROUPS = [
  { title: 'Private and secure', rows: ['Private workspace for your organization', 'SEC', 'Your data and models remain private to you'] },
  { title: 'Full ownership. Full access.', rows: ['Full ownership of sequence IP', 'Own all data and reports created', 'Full access to Cradle platform and API'] },
  { title: 'No hidden fees', rows: ['Unlimited users', 'Unlimited data upload and storage', 'Compute and infra included', 'Expert technical support', 'No royalty or milestone fees'] },
]

function Check() {
  // Desktop: 32 box / 22 circle / 11×9 check. Phone (measured): 20 box / 18 circle / 10×8 check.
  // Scales 0.7→1 as its row enters (≈0.3s, once).
  return (
    <motion.div
      initial={{ scale: 0.7 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: FRAMER_EASE }}
      className="w-5 h-5 md:w-8 md:h-8 shrink-0 flex items-center justify-center"
    >
      <div className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] rounded-full bg-antibody flex items-center justify-center">
        <img src="/assets/pages/licensing/end-11x9-b855c2.svg" alt="" className="hidden md:block w-[11px] h-[9px]" />
        <img src="/assets/pages/licensing/mobile-10x8-edd023.svg" alt="" className="md:hidden w-[10px] h-2" />
      </div>
    </motion.div>
  )
}

export function IncludedList() {
  return (
    <section className="w-full flex flex-col items-center pt-10 px-5 pb-20 md:pt-20 md:px-10 md:pb-[160px]">
      <div className="w-full max-w-[960px] flex flex-col gap-10 md:flex-row md:gap-20 md:items-start">
        <div className="md:flex-1 flex flex-col gap-2">
          <h3 className={h3Cls}>Included in all licenses</h3>
          <p className={bodyCls}>Everything you need to get started on day one.</p>
        </div>
        <div className="md:flex-1 flex flex-col gap-6 md:gap-10">
          {GROUPS.map((g, gi) => (
            // Live phone gaps h4→rows: 10, 10, 20
            <div key={g.title} className={`flex flex-col items-start md:gap-4 ${gi === 2 ? 'gap-5' : 'gap-[10px]'}`}>
              <h4 className="font-heading text-ink font-semibold text-[16px] leading-5 tracking-[-0.16px] md:font-medium md:text-[24px] md:leading-[28.8px] md:tracking-normal">{g.title}</h4>
              <div className="w-full flex flex-col">
                {/* Phone rows are 44 tall; live has one 48-tall row ("Own all data…") */}
                {g.rows.map((r, i) => (
                  <div
                    key={r}
                    className={`${i < g.rows.length - 1 ? 'fborder misc-bb' : ''} w-full ${gi === 1 && i === 1 ? 'h-12' : 'h-11'} md:h-12 flex flex-row items-center gap-3 md:gap-4 pr-2`}
                    style={{ '--fb': '1px solid rgba(0,0,0,.04)' }}
                  >
                    <Check />
                    <p className={`flex-1 ${bodyCls}`}>
                      {r === 'SEC' ? <>Industry leading <Link to="/security" className="text-[#0284c7]">security standards</Link></> : r}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- B10.4 Partnerships band ----------
export function PartnersBand() {
  return (
    <section className="fborder misc-bt w-full bg-gray-50 flex flex-col items-center py-20 px-5 md:pt-20 md:px-10 md:pb-[120px]" style={{ '--fb': '1px solid rgba(0,0,0,.04)' }}>
      <div className="w-full max-w-[996px] flex flex-col gap-5 md:flex-row md:gap-20 md:items-start">
        <h3 className={`md:flex-1 text-center md:text-left ${h3Cls}`}>Partnerships</h3>
        <div className="md:flex-1 flex flex-col items-stretch md:items-start gap-5">
          <p className={`text-center md:text-left ${bodyCls}`}>
            CRO or service provider? If you wish to use or deploy Cradle as part of your service offering, please contact us here to discuss options.
          </p>
          <a href="mailto:partnerships@cradle.bio" className={secondaryCls}>Contact Cradle</a>
        </div>
      </div>
    </section>
  )
}
