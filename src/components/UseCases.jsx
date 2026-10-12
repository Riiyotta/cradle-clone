import { motion } from 'framer-motion'

// CLONE_SPEC §9 Explore use cases
// Live hover (frame-sampled): box-shadow rgba(3,7,18,.08) 0 2px 4px → <accent .4> 0 0 8px.
// Hover-in is a spring (duration 0.4, bounce 0.2, slight overshoot); hover-out ≈ spring 0.6 / 0.2 (≈300ms, no visible overshoot).
const REST_SHADOW = 'rgba(3,7,18,0.08) 0px 2px 4px 0px'
const HOVER_IN = { type: 'spring', duration: 0.4, bounce: 0.2 }
const HOVER_OUT = { type: 'spring', duration: 0.6, bounce: 0.2 }

const CARDS = [
  {
    title: 'Biopharma',
    body: 'See how Cradle works for pharma',
    href: './solutions/biopharma',
    mask: 'icon-antibody-mask.svg',
    color: 'bg-antibody',
    hover: 'rgba(60,171,87,0.4) 0px 0px 8px 0px',
  },
  {
    title: 'Industrial Bio',
    body: 'See how Cradle works for industrial',
    href: './solutions/industrial',
    mask: 'icon-flask-mask.svg',
    color: 'bg-enzyme',
    hover: 'rgba(14,165,233,0.4) 0px 0px 8px 0px',
  },
]

// Chevron from the live sprite (#3166100823): stroke #9ca3af, width 2
function Chevron() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden="true">
      <path d="M 0 0 L 7.5 7.5 L 0 15" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(9 4.5)" />
    </svg>
  )
}

export default function UseCases() {
  return (
    <section className="relative flex w-full flex-col items-center gap-10 overflow-clip bg-gray-50 px-5 py-10 md:px-10 md:pt-10 md:pb-20">
      <div className="flex w-full max-w-container flex-col items-center gap-6 lg:gap-10">
        <h4 className="w-full font-heading font-medium text-ink text-[18px] leading-[21.6px] lg:text-[24px] lg:leading-[28.8px]">
          Explore uses cases
        </h4>
        <div className="flex w-full flex-col items-center gap-4 md:flex-row lg:gap-6">
          {CARDS.map((c) => (
            <motion.a
              key={c.title}
              href={c.href}
              initial={false}
              style={{ boxShadow: REST_SHADOW }}
              animate={{ boxShadow: REST_SHADOW, transition: HOVER_OUT }}
              whileHover={{ boxShadow: c.hover, transition: HOVER_IN }}
              className="flex w-full items-center gap-4 overflow-clip rounded-xl bg-white p-4 no-underline md:w-px md:flex-1 md:rounded-2xl md:p-6"
            >
              <div className="flex min-w-0 flex-1 items-center gap-4 md:gap-6">
                <span
                  aria-hidden="true"
                  className={`block h-6 w-6 shrink-0 md:h-8 md:w-8 ${c.color}`}
                  style={{
                    WebkitMaskImage: `url(/assets/${c.mask})`,
                    maskImage: `url(/assets/${c.mask})`,
                    WebkitMaskSize: '100% 100%',
                    maskSize: '100% 100%',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                  }}
                />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <h5 className="font-heading font-semibold text-ink text-[16px] leading-[20px] tracking-[-0.16px] md:text-[17px] md:leading-[23.8px] md:tracking-[-0.17px] lg:text-[18px] lg:leading-[25.2px] lg:tracking-[-0.18px]">{c.title}</h5>
                  <p className="hidden md:block font-sans font-medium text-muted text-[14px] leading-[21px] tracking-[-0.28px] lg:text-[16px] lg:leading-[25.6px] lg:tracking-[-0.32px]">{c.body}</p>
                </div>
              </div>
              <Chevron />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
