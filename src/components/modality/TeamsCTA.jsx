import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Btn, CheckBadge, EASE_BACK, H2, H4, LEAD, BODY } from './primitives.jsx'

const CHECKS = ['API and Web Interface', 'Granular access controls', 'Unlimited seats']
const TEAMS_LEAD = 'With everyone in the same workspace, results compound across your organization. Same data. Same models. Same learning loop. New results.'

const DOTS = [
  { label: 'Web Interface', dot: 'bg-sky400 shadow-[0_0_8px_0_#0ea5e9]', grad: 'linear-gradient(270deg, rgba(255,255,255,.9) 0%, #f0f9ff 100%)' },
  { label: 'API Access', dot: 'bg-[#61c779] shadow-[0_0_8px_0_#3cab57]', grad: 'linear-gradient(90deg, #e1f7e6 0%, rgba(255,255,255,.9) 100%)' },
]
const PHOTOS = ['/assets/pages/platform/wetlab-riCniX.png', '/assets/pages/platform/computational-AcW1X3.png']
const COPY = [
  'Add your domain expertise and AI generate candidates for lab testing in just a few clicks. Upload experimental results to improve your project-specific AI automatically.',
  'Run Cradle with an API and scale your expertise without the DevOps overhead. Focus on novel design strategies, not routine requests and endless configuration.',
]

/* PhotoCard (/platform P7): mirrored photo, gradient overlay, glowing dot label, optional button.
   photo = { w, h, pw, ph } desktop / phone photo box (top −62 desktop, −94 phone, centered, rotateY 180°) */
function PhotoCard({ i, title, body, button, photo, height = 'h-[280px] md:h-[500px]' }) {
  const d = DOTS[i]
  return (
    <div
      className={`photo-card relative flex w-full min-w-0 flex-col md:flex-1 justify-between overflow-hidden rounded-3xl p-5 md:p-10 ${height}`}
      style={{ '--pw': `${photo.pw}px`, '--ph': `${photo.ph}px`, '--dw': `${photo.w}px`, '--dh': `${photo.h}px` }}
    >
      <img src={PHOTOS[i]} alt="" className="photo-card-img absolute left-1/2 max-w-none object-cover" />
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(rgba(3,7,18,.08)_40%,rgba(3,7,18,.6)_100%)]" />
      <div className="relative z-[4] flex items-center gap-[10px]">
        <div className={`h-2 w-2 rounded-[2px] ${d.dot}`} />
        <span className={`bg-clip-text text-transparent ${BODY}`} style={{ backgroundImage: d.grad, WebkitBackgroundClip: 'text' }}>{d.label}</span>
      </div>
      <div className="relative z-[3] flex flex-col items-start gap-[10px]">
        <h4 className={`text-white ${H4}`}>{title}</h4>
        <p className={`max-w-[400px] text-white/80 ${BODY}`}>{body ?? COPY[i]}</p>
        {button && <Btn to={button.to} variant="white" size="card" px="px-8">{button.label}</Btn>}
      </div>
    </div>
  )
}

/* Teams. layout 'center' (antibody/vaccine/peptide, max-w 1080) or 'left' (enzyme, max-w 1280). */
export function Teams({ title, gradient = true, layout = 'center', cards, sectionClass, photo, cardHeight }) {
  const center = layout === 'center'
  return (
    <section className={`flex w-full justify-center bg-white ${sectionClass}`}>
      <div className={`flex w-full flex-col gap-10 ${center ? 'max-w-[1080px] md:gap-20' : 'max-w-container'}`}>
        <div className={`flex flex-col gap-5 md:gap-10 ${center ? 'items-start text-left md:items-center md:text-center' : 'items-start'}`}>
          <h2 className={`${H2} ${gradient ? 'bg-[linear-gradient(270deg,#1f2937_0%,#030712_100%)] bg-clip-text text-transparent' : 'text-ink'}`}>{title}</h2>
          <p className={`max-w-[680px] text-muted ${LEAD}`}>{TEAMS_LEAD}</p>
          <ul className={`flex w-full flex-col md:w-auto md:flex-row md:gap-6 ${center ? 'md:justify-center' : ''}`}>
            {CHECKS.map((c, i) => (
              <li key={c} className={`flex h-11 items-center gap-[6px] text-left md:h-auto ${i ? 'border-t border-gray-50 md:border-0' : ''}`}>
                <CheckBadge />
                <span className={`text-muted ${BODY}`}>{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-[10px] md:flex-row">
          {cards.map((c, i) => <PhotoCard key={i} i={i} {...c} photo={photo[i]} height={cardHeight} />)}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   FooterCTA variant `blue` (M8/E8/V6/P7)
   ============================================================ */
function useIsPhone() {
  const q = '(max-width: 809.98px)'
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setM(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return m
}

const SCREENS = [
  // [src, class, delay, x-from]  order in DOM: left(report), middle(round), right(data)
  { src: '/assets/ui-report-cta.png', cls: 'cta-screen cta-report', delay: 0.2, x: 20 },
  { src: '/assets/ui-round.png', cls: 'cta-screen cta-round', delay: 0, x: 0 },
  { src: '/assets/ui-data.png', cls: 'cta-screen cta-data', delay: 0.1, x: -20 },
]

export function FooterCTABlue({ line1, line2, buttons, stacked = false, phoneWrapper = false, sectionClass = '', h1Class = '' }) {
  const phone = useIsPhone()
  const y = phone ? 40 : 80
  return (
    <section className={`relative flex w-full flex-col items-center gap-20 overflow-hidden bg-accent px-10 ${sectionClass}`}>
      <div className="flex w-full max-w-container flex-col items-center gap-10">
        <h1 className={`text-center font-heading font-medium text-white text-[40px] leading-10 tracking-[-1.6px] md:text-[72px] md:leading-[72px] md:tracking-[-2.88px] ${h1Class}`}>
          <span>{line1}</span>
          {line2 && <><br /><span className="text-blue-300">{line2}</span></>}
        </h1>
        {stacked ? (
          <div className="flex w-[300px] flex-col gap-[10px]">
            <Btn to={buttons[0].to} variant="secondary" px="px-8" className="w-full">{buttons[0].label}</Btn>
            <Btn to={buttons[1].to} variant="ghost" px="px-8" className="w-full">{buttons[1].label}</Btn>
          </div>
        ) : (
          <div className={`flex flex-col items-center gap-[10px] rounded-2xl md:flex-row md:bg-white/[0.12] md:p-1 ${phoneWrapper ? 'bg-white/[0.12] p-1' : ''}`}>
            <Btn to={buttons[0].to} variant="secondary" px="px-8" className={phoneWrapper ? 'w-[223.5px] md:w-auto' : ''}>{buttons[0].label}</Btn>
            <Btn to={buttons[1].to} variant="ghost" px="px-8" className={phoneWrapper ? 'w-[223.5px] md:w-auto' : ''}>{buttons[1].label}</Btn>
          </div>
        )}
      </div>
      {/* Screens band: 360 tall desktop / ≈154 phone, clipped by the section */}
      <div className="relative h-[154px] w-full shrink-0 md:h-[360px]">
        {SCREENS.map((s, i) => (
          <motion.img
            key={s.src}
            src={s.src}
            alt=""
            className={s.cls}
            initial={{ opacity: 1, y, x: s.x }}
            whileInView={{ y: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_BACK, delay: s.delay }}
            style={{ zIndex: i === 1 ? 3 : 1 }}
          />
        ))}
        <div className="pointer-events-none absolute left-1/2 top-0 z-[4] h-full w-[1240px] -translate-x-1/2 bg-[linear-gradient(rgba(45,102,248,0)_51%,rgba(45,102,248,.5)_100%)] md:w-[3520px]" />
      </div>
    </section>
  )
}
