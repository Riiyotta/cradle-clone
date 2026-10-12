import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Eyebrow, FRAMER_EASE } from './ui.jsx'

// CLONE_SPEC §4 Customers

// Live: slides advance every ≈5.5s (5501/5515/5502ms measured); a tile click jumps to that slide and
// restarts the timer. The progress fill grows linearly at 507.2px / 5.556s starting ≈40ms after the
// switch, so it is at ≈98% when the next slide replaces it. Hovering the card does not pause.
const SLIDE_MS = 5500
const FILL_S = 5.556
const FILL_DELAY_S = 0.04
const SLIDE_BG3 = 'linear-gradient(180deg, #fff 60%, rgba(137,211,42,.08) 100%)'

const SLIDES = [
  {
    bg: 'linear-gradient(180deg, #fff 60%, rgba(241,255,241,.5) 100%)',
    logo: 'testimonial-logo-novonesis.png',
    quote: 'Through our partnership with Cradle, we are embedding advanced Al directly into how we innovate, enabling our teams to shorten development time and bring real-world biosolutions faster to market.',
    name: 'Claus Fuglsang Crone',
    title: 'Chief Scientific Officer, Novonesis',
  },
  {
    bg: 'linear-gradient(179deg, #fff 60%, rgba(20,116,205,.08) 100%)',
    logo: 'testimonial-logo-corteva.png',
    quote: 'Cradle’s AI-based protein design platform provides easy access and acceleration to protein optimization for the discovery pipeline.',
    name: 'Eswar Narayanan',
    title: 'Director, Corteva Catalyst',
  },
  {
    bg: SLIDE_BG3,
    logo: 'testimonial-logo-bayer.svg',
    quote: 'Cradle’s platform provides us with a scalable, scientist-centric solution to maximize the opportunities in our biologics portfolio and potentially deliver faster, more effective medicines to patients.',
    name: 'Anastasia Hager, Ph.D.',
    title: 'Global Head of Drug Discovery Sciences, Bayer',
  },
  {
    bg: 'linear-gradient(180deg, #fff 60%, rgba(175,1,3,.08) 100%)',
    logo: 'testimonial-logo-lundbeck.svg',
    quote: 'Our partnership with Cradle fits perfectly into our commitment to become a bionic company. Cradle provides our scientists with powerful AI that fits seamlessly into our processes, strengthening our ability to discover and optimize therapeutics.',
    name: 'Tarek Samad',
    title: 'SVP & Global Head, Research, Lundbeck',
  },
]

const LOGOS = [
  { file: 'novonesis', alt: 'novonesis', badge: 'Read announcement' },
  { file: 'novo-nordisk', alt: 'Novo Nordisk', badge: 'Read article' },
  { file: 'jnj', alt: 'Johnson&Johnson Innovative Medicine' },
  { file: 'bayer', alt: 'Bayer', to: '/blog/bayer-collaboration', badge: 'Read announcement' },
  { file: 'abbvie', alt: 'abbvie' },
  { file: 'hansa', alt: 'Hansa Biopharma', badge: 'Read announcement' },
  { file: 'illumina', alt: 'illumina' },
  { file: 'csl', alt: 'CSL' },
  { file: 'lundbeck', alt: 'Lundbeck', badge: 'Read article' },
  { file: 'ultragenyx', alt: 'ultragenyx' },
  { file: 'repligen', alt: 'Repligen' },
  { file: 'corteva', alt: 'Corteva' },
]

// Live: opacity 0→1, y 20→0, 0.4s tween, ease [0.12,0.23,0.5,1]; card delay 0.1s, grid 0.25s.
// Each block triggers once when 50% of it is visible.
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.4, delay, ease: FRAMER_EASE },
})

function Testimonial() {
  const [i, setI] = useState(0)
  const [hover, setHover] = useState(-1)
  const s = SLIDES[i]
  // Timer restarts whenever the slide changes (auto or click)
  useEffect(() => {
    const t = setTimeout(() => setI((n) => (n + 1) % SLIDES.length), SLIDE_MS)
    return () => clearTimeout(t)
  }, [i])
  return (
    <motion.div
      {...fadeUp(0.1)}
      className="fborder w-full md:flex-1 md:min-w-0 lg:flex-[507.2_1_0px] h-[450px] md:h-[460px] lg:h-[500px] bg-white rounded-2xl overflow-clip flex flex-col justify-between"
    >
      <div className="flex-1 min-h-0 p-6 flex flex-col justify-between" style={{ backgroundImage: s.bg }}>
        <p className="relative z-[2] m-0 font-quote font-normal text-ink text-[22px] leading-[26.4px] lg:text-[28px] lg:leading-[33.6px]">{s.quote}</p>
        <div className="font-sans font-medium text-[14px] leading-[22.4px] md:leading-[21px] tracking-[-0.28px] lg:text-[16px] lg:leading-[25.6px] lg:tracking-[-0.32px]">
          <p className="m-0 text-ink">{s.name}</p>
          <p className="m-0 text-muted">{s.title}</p>
        </div>
      </div>
      <div className="h-[3px] w-full overflow-clip shrink-0">
        <motion.div
          key={i}
          className="h-full bg-blue-200"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: FILL_S, delay: FILL_DELAY_S, ease: 'linear' }}
        />
      </div>
      <div className="h-20 shrink-0 py-4 px-6 flex flex-row items-center gap-3">
        {SLIDES.map((sl, n) => (
          // Live tile states tween ≈0.2s (ease-in-out): active ::after 3px #2d66f8, inactive 1px rgba(0,0,0,.08),
          // hovered inactive 1px rgba(0,0,0,.12). Clicking selects the slide.
          <div
            key={sl.logo}
            role="button"
            tabIndex={0}
            aria-label={`Show testimonial ${n + 1}`}
            onClick={() => setI(n)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setI(n) } }}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(-1)}
            className="fborder fborder-anim w-12 h-12 p-[3px] bg-white rounded-xl shrink-0 cursor-pointer"
            style={{
              '--fb': n === i ? '3px solid #2d66f8' : `1px solid ${hover === n ? 'rgba(0,0,0,.12)' : 'rgba(0,0,0,.08)'}`,
              '--fbt': '.2s',
              '--fbe': 'cubic-bezier(.44,0,.56,1)',
            }}
          >
            <img src={`/assets/${sl.logo}`} alt="" className="w-8 h-8 m-[5px]" />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function LogoTile({ l, idx }) {
  // Same-site links use the router; external announcement links are removed (rendered as a plain tile)
  const Tag = l.to ? Link : 'div'
  const linkProps = l.to ? { to: l.to } : {}
  return (
    <Tag
      {...linkProps}
      className={`fborder relative ${idx >= 9 ? 'hidden lg:flex' : 'flex'} flex-col items-center justify-center gap-[15px] md:gap-[10px] bg-white rounded-xl md:rounded-[17px] hover:shadow-[rgba(0,0,0,.04)_0_0_6px_0] transition-shadow duration-100 ease-in-out`}
    >
      <img
        src={`/assets/customer-logo-${l.file}.svg`}
        alt={l.alt}
        className="w-[70%] aspect-[117/42] md:w-full md:max-w-[117px] md:h-[42px] md:aspect-auto object-contain opacity-60"
      />
      {l.badge && (
        <span
          className="fborder flex absolute left-[10px] top-[88px] lg:top-auto lg:bottom-3 whitespace-nowrap flex-row items-center gap-[2px] bg-gray-100 rounded-[34px] pt-[2px] pr-[6px] pb-[2px] pl-2 font-sans font-semibold text-[8px] leading-[9.6px] tracking-[0.08px] text-muted"
          style={{ '--fb': '0.5px solid rgba(0,0,0,.04)' }}
        >
          {l.badge}
          <span
            className="w-3 h-3 bg-gray-400"
            style={{ WebkitMask: 'url(/assets/icon-arrow-up-right.svg) center / contain no-repeat', mask: 'url(/assets/icon-arrow-up-right.svg) center / contain no-repeat' }}
          />
        </span>
      )}
    </Tag>
  )
}

export default function Customers() {
  return (
    <section
      id="customers"
      className="w-full flex flex-col items-center gap-8 md:gap-5 py-10 px-4 md:py-[60px] md:px-10 lg:pt-[120px] lg:pb-[60px]"
      style={{ backgroundImage: 'linear-gradient(180deg, #fff 64%, #f9fafb 99.7152%)' }}
    >
      <div className="w-full max-w-container flex flex-col gap-10">
        <div className="flex flex-col gap-5 md:gap-[10px] lg:gap-5">
          <Eyebrow>OUR CUSTOMERS</Eyebrow>
          <h2 className="m-0 max-w-[720px] md:max-w-none lg:max-w-[720px] font-heading font-medium text-ink text-[32px] leading-[35.2px] tracking-[-0.64px] md:text-[48px] md:leading-[48px] md:tracking-[-1.92px] lg:text-[64px] lg:leading-[64px] lg:tracking-[-2.56px]">
            Trusted by the world's top Biopharma and Industrial Bio R&amp;D teams
          </h2>
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-3">
          <Testimonial />
          <motion.div
            {...fadeUp(0.25)}
            className="w-full md:flex-1 md:min-w-0 lg:flex-[760.8_1_0px] grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 auto-rows-[calc((100vw-48px)/3*0.7132)] md:auto-rows-[82.4px] lg:auto-rows-[116px] gap-2 md:gap-3 content-start"
          >
            {LOGOS.map((l, n) => <LogoTile key={l.file} l={l} idx={n} />)}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
