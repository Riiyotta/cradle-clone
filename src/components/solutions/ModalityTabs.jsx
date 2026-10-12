import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Btn, EASE_FRAMER, T } from './primitives.jsx'

// B4 / I4 ModalityTabs (white). Desktop padding 120 40 160; phone 120 20 80.
// Pattern layer: 600 tall, opacity .1, multiply, `benefits-grid-pattern.svg` at 101px, mask fades by 40%.
// Tabs: pills 56 tall (desktop, active bg #f3f4f6) / 3 equal stacked tiles (phone, no bg).
// Items: 2-col grid (gap 20), padding 20 20 20 0, 3px accent bar + CardTitle, Body below.
// Default-tab panels use the live fixed heights (Framer variant sizes) [phone, desktop]; other tabs size to content.
// Item appear: opacity .001→1, y 8→0, 0.2s, delay 0.1 per row (0.1, 0.1, 0.2, 0.2 …), replayed on tab change.

const PATTERN_MASK = 'linear-gradient(rgba(0,0,0,.5) 0%, rgba(0,0,0,0) 40%)'

export default function ModalityTabs({ cfg }) {
  const m = cfg.modalities
  const [active, setActive] = useState(0)
  const tab = m.tabs[active]

  return (
    <section className="relative flex w-full justify-center overflow-hidden bg-white px-5 pb-20 pt-[120px] md:px-10 md:pb-[160px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px] opacity-10 mix-blend-multiply"
        style={{
          backgroundImage: 'url(/assets/benefits-grid-pattern.svg)',
          backgroundSize: '101px auto',
          backgroundPosition: 'center',
          WebkitMaskImage: PATTERN_MASK,
          maskImage: PATTERN_MASK,
        }}
      />
      <div className="relative flex w-full max-w-container flex-col gap-10">
        <div className="flex flex-col items-start gap-5">
          <h2 className={`${T.h2} max-w-[600px] text-ink`}>{m.title}</h2>
          <p className={`${T.lead} max-w-[720px] text-muted`}>
            {m.lead}{' '}
            <Link to="/get-started" className="text-muted hover:text-[#29333c]">Contact our sales team</Link>
            {' '}to discuss your specific needs.
          </p>
        </div>

        <div className="flex flex-col items-start gap-5 md:gap-10">
          {/* tabs */}
          <div className="grid w-full grid-cols-3 gap-2 md:flex md:w-auto md:items-center" role="tablist">
            {m.tabs.map((t, i) => {
              const on = i === active
              return (
                <button
                  key={t.label}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(i)}
                  className={`flex h-[82.2px] flex-col items-center gap-2 rounded-xl px-1 py-3 md:h-14 md:flex-row md:gap-3 md:py-3 md:pl-4 md:pr-5 ${on ? 'md:bg-gray-100' : 'md:bg-gray-100/0'}`}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: on ? cfg.accent : '#9ca3af' }}
                  >
                    {t.icon}
                  </span>
                  <span className={`font-sans text-[14px] font-semibold leading-[18.2px] md:font-heading md:text-[24px] md:font-medium md:leading-[28.8px] ${on ? 'text-ink' : 'text-muted'}`}>
                    {t.label}
                  </span>
                </button>
              )
            })}
          </div>

          {/* panel */}
          <div
            key={active}
            className={`grid w-full grid-cols-1 content-start md:grid-cols-2 md:gap-5 ${tab.panelH ? 'h-[var(--ph)] md:h-[var(--pd)]' : ''}`}
            style={tab.panelH ? { '--ph': `${tab.panelH[0]}px`, '--pd': `${tab.panelH[1]}px` } : undefined}
          >
            {tab.items.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0.001, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, ease: EASE_FRAMER, delay: 0.1 * (Math.floor(i / 2) + 1) }}
                className="flex flex-col gap-2 rounded-xl py-5 pr-5"
              >
                <div className="flex items-stretch gap-2">
                  <span className="w-[3px] shrink-0 rounded-[20px]" style={{ backgroundColor: cfg.accent }} />
                  <h4 className={`${T.cardTitle} text-ink`}>{it.title}</h4>
                </div>
                <p className={`${T.body} text-muted`}>{it.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA card */}
        <div className="flex w-full flex-col items-start gap-[50px] rounded-2xl bg-gray-50 p-5 md:flex-row md:gap-10 md:p-10">
          <img src="/assets/pages/solutions-biopharma/cta-iWZePD.png" alt="" className="hidden h-[152px] w-[220px] shrink-0 rounded-xl object-cover md:block" />
          <div className="flex w-full flex-col items-start gap-5 py-2 md:w-auto md:flex-1">
            <div className="flex flex-col gap-2">
              <h4 className={`${T.h4} text-ink`}>Got another use case?<br className="md:hidden" /> Let's talk.</h4>
              <p className={`${T.body} min-h-[89.6px] max-w-[500px] text-muted md:min-h-0`}>{m.ctaBody}</p>
            </div>
            <Btn variant="primary36" to="/get-started" className="w-full md:w-auto">Let's talk</Btn>
          </div>
        </div>
      </div>
    </section>
  )
}
