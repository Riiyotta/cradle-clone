import { motion, useScroll, useTransform } from 'framer-motion'
import { Btn, SlashEyebrow, APPEAR_SPRING, APPEAR_TWEEN_Y8, H2, LEAD } from './primitives.jsx'

/* ============================================================
   M1 PropertyTicker hero (/modality/antibody)
   ============================================================ */
const CELL = 254 // px, desktop and phone
const GAP = 10

function TickerRow({ items, speed }) {
  const period = items.length * (CELL + GAP)
  const loop = [...items, ...items, ...items]
  return (
    <section className="ticker-row-mask h-12 w-full overflow-hidden p-[10px] md:h-16">
      <motion.ul
        className="flex h-full w-max gap-[10px]"
        animate={{ x: [0, -period] }}
        transition={{ duration: period / speed, ease: 'linear', repeat: Infinity }}
      >
        {loop.map((t, i) => (
          <li key={i} className="flex h-full w-[254px] shrink-0 items-center justify-center">
            <h3 className="whitespace-nowrap text-center font-heading font-medium text-white opacity-50 text-[24px] leading-[28.8px] tracking-[-0.48px] md:text-[32px] md:leading-[38.4px] md:tracking-[-0.64px]">
              {t}
            </h3>
          </li>
        ))}
      </motion.ul>
    </section>
  )
}

export function PropertyTickerHero({ rows, iconMask, eyebrow, title, lead, buttons }) {
  return (
    <section className="relative flex w-full flex-col items-center gap-10 bg-ink px-5 pb-10 pt-[110px] md:px-10 md:pb-[60px] md:pt-[120px]">
      <div className="relative flex w-full max-w-[960px] flex-col items-center">
        <div className="ticker-block-mask flex w-full flex-col gap-[10px]">
          {rows.map((r, i) => <TickerRow key={i} {...r} />)}
        </div>
        {/* Icon tile, centered over the ticker (z3) */}
        <motion.div
          className="absolute left-1/2 top-1/2 -ml-10 -mt-10 flex h-20 w-20 items-center justify-center rounded-[20px] bg-antibody shadow-[0_14px_32px_0_rgba(0,0,0,.6),0_1.75px_32px_0_#61c779] md:-ml-14 md:-mt-14 md:h-28 md:w-28 md:rounded-[28px]"
          style={{ zIndex: 3 }}
          initial={{ scale: 0.2, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 376, damping: 80, mass: 2, delay: 0 }}
        >
          <div
            className="h-[50px] w-[50px] bg-white md:h-20 md:w-20"
            style={{ WebkitMask: `url("${iconMask}") center / contain no-repeat`, mask: `url("${iconMask}") center / contain no-repeat` }}
          />
        </motion.div>
      </div>

      <div className="flex w-full max-w-[1360px] flex-col items-center gap-[33px] text-center">
        <motion.p {...APPEAR_SPRING(0.5)} className="w-full font-mono font-medium uppercase text-antibody text-[14px] leading-6 tracking-[0.84px] md:text-[18px] md:tracking-[1.08px]">
          {eyebrow}
        </motion.p>
        <motion.h1 {...APPEAR_SPRING(0.5)} className="w-full max-w-[800px] font-heading font-medium text-white text-[40px] leading-[38px] tracking-[-1.6px] md:text-[80px] md:leading-[76px] md:tracking-[-3.2px]">
          {title}
        </motion.h1>
        <motion.p {...APPEAR_SPRING(0.7)} className={`w-full max-w-[640px] text-gray-400 ${LEAD}`}>{lead}</motion.p>
        <motion.div {...APPEAR_SPRING(0.5)} className="flex w-full flex-col gap-[10px] rounded-2xl p-1 md:w-auto md:flex-row">
          {buttons.map((b, i) => (
            <Btn key={i} to={b.to} variant={i === 0 ? 'primary' : 'secondary'} px="px-8" className="w-full md:w-auto">{b.label}</Btn>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ============================================================
   Text hero (enzyme E1 / vaccine V1 / peptide P1)
   ============================================================ */
function VideoPoster({ poster }) {
  // EXTERNAL Mave player on live: rendered here as its poster + a static control strip (decorative).
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      <img src={poster} alt="" className="absolute inset-0 h-full w-full object-contain" />
      <div className="absolute inset-x-0 bottom-0 flex h-10 items-center gap-3 bg-[rgba(3,7,18,.6)] px-4 text-white md:h-12">
        <svg width="14" height="16" viewBox="0 0 14 16" fill="#fff" aria-hidden="true"><path d="M1 1.5v13a.5.5 0 0 0 .76.43l11-6.5a.5.5 0 0 0 0-.86l-11-6.5A.5.5 0 0 0 1 1.5Z" /></svg>
        <span className="font-sans text-[12px] font-medium">0:00</span>
        <span className="h-[3px] flex-1 rounded-full bg-white/20" />
      </div>
    </div>
  )
}

function Molecule({ src }) {
  const { scrollY } = useScroll()
  // Scroll-linked part, fitted to the spec samples (scrollY 0/150/600/750).
  const scale = useTransform(scrollY, [0, 150, 600, 750], [1.062, 1.105, 1.133, 1.15])
  const opacity = useTransform(scrollY, [0, 150, 600, 750], [0.475, 0.42, 0.387, 0.367])
  return (
    <div className="pointer-events-none absolute left-1/2 top-[-16px] z-0 h-[686.2px] w-[185.3px] -translate-x-1/2 md:top-[5px] md:h-[628.7px] md:w-[675.6px]">
      <motion.div className="h-full w-full" style={{ scale, opacity }}>
        <motion.img
          src={src}
          alt=""
          className="molecule-mask h-full w-full object-contain"
          initial={{ opacity: 0.3, scale: 1.4 }}
          animate={{ opacity: 0.55, scale: 1 }}
          transition={{ type: 'tween', duration: 2, ease: [0.44, 0, 0.56, 1], delay: 0 }}
        />
      </motion.div>
    </div>
  )
}

export function TextHero({
  eyebrow, eyebrowColor = 'text-white', title, lead, leadColor = 'text-gray-400',
  titleBasis, leadBasis, video, buttons, logos, logosPhoneExtra, logoCols = 4, molecule, topPad = 'md:pt-[120px]',
}) {
  return (
    <section className={`relative flex w-full flex-col items-center overflow-hidden bg-ink px-5 pb-10 pt-[110px] md:px-10 md:pb-[60px] ${topPad}`}>
      {molecule && <Molecule src={molecule} />}
      <div className="relative z-[2] flex w-full max-w-container flex-col gap-6 md:gap-10">
        <SlashEyebrow labelColor={eyebrowColor}>{eyebrow}</SlashEyebrow>
        <div className="flex flex-col gap-6 md:flex-row md:gap-10">
          <motion.h2 {...APPEAR_SPRING(0.1)} className={`text-white md:flex-[1_1_var(--tb)] ${H2}`} style={{ '--tb': titleBasis }}>{title}</motion.h2>
          <div className="md:flex-[0_1_var(--lb)] md:pt-3" style={{ '--lb': leadBasis }}>
            <motion.p {...APPEAR_SPRING(0.2)} className={`${leadColor} ${LEAD}`}>{lead}</motion.p>
          </div>
        </div>
        {video && <VideoPoster poster={video} />}
        <motion.div {...APPEAR_TWEEN_Y8(0.15)} className="flex flex-col gap-4 pb-4 md:flex-row md:pb-6">
          {buttons.map((b, i) => (
            <Btn key={i} to={b.to} variant={i === 0 ? 'primary' : 'secondary'} px="px-5" className="w-full md:w-auto">{b.label}</Btn>
          ))}
        </motion.div>
        <div className={`grid grid-cols-3 gap-x-2 gap-y-[41px] md:gap-x-5 ${logoCols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}>
          {[...logos, ...(logosPhoneExtra ? [logosPhoneExtra] : [])].map((src, i) => (
            <div key={src} className={`flex h-20 items-center justify-center rounded-lg bg-white/[0.12] md:h-40 ${i >= logos.length ? 'md:hidden' : ''}`}>
              <img src={src} alt="" className="h-6 w-[89.1px] rounded-lg object-contain opacity-60 md:h-[42px] md:w-[117px]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
