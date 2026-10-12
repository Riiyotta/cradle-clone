import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { T, ph, phc } from './primitives.jsx'

// B6 / I6 Workflow tabs (TabbedCards, left-aligned, radius-12 pills).
// Desktop: padding 120 40, content max-w 1280 gap 40. Cards 400 wide (gap 20), row centered (x=100…1340 at 1440).
// Phone: padding 80 20 80 16; pills 37.6 tall (18/21.6 labels); cards stack, gap 20.
// Motion: cards opacity .001→1, y 30→0, spring 0.6 / bounce 0.1, delays .1/.2/.3 on first view and every tab change.

const P = '/assets/pages/platform/'
const IMG_MASK = 'linear-gradient(0deg, rgba(0,0,0,.2) 0%, #000 40%)'

const TABS = [
  {
    label: 'Learn',
    cards: [
      { title: 'Import your data', body: phc(166, 0), img: `${P}1-2v3dNU.png` },
      { title: 'Explore your data quality', body: phc(219, 1), img: `${P}2-rVPCq9.png` },
      { title: 'Models learn with you', body: phc(176, 2), img: `${P}ui-hMhVEl.png` },
    ],
  },
  {
    label: 'Generate',
    cards: [
      { title: 'Generate candidates', body: ph(38, 4), img: `${P}tab-generate-1-4rA0YH.png` },
      { title: 'Multi-property support', body: ph(30, 5), img: `${P}ui-Ty4HuN.png` },
      { title: 'Full-plate optimization', body: 'The sequences that you download from Cradle are a carefully curated set, selected from millions of in silico designs to maximize your chances of success.', img: `${P}ui-F0OA2Y.png` },
    ],
  },
  {
    label: 'Review',
    cards: [
      { title: 'Reports', body: 'Generation Reports give you full control over what candidates you bring to the lab and what to expect in performance.', img: `${P}tab-review-reports-I9DDpC.png` },
      { title: 'Send to lab', body: 'Download sequences from Cradle, then order DNA and run assays in your own lab or use your existing CRO.', img: `${P}tab-review-send-to-lab-9A5zde.png` },
      { title: 'Round statuses', body: 'Track lab progress in Cradle using Round Statuses and see live metrics per protein property with every new assay upload.', img: `${P}tab-review-round-statuses-JSkMFe.png` },
    ],
  },
]

export default function TabbedCards({ lead }) {
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="flex w-full justify-center bg-white pb-20 pl-4 pr-5 pt-20 md:px-10 md:py-[120px]">
      <div className="flex w-full max-w-container flex-col items-start gap-10">
        <div className="flex flex-col items-start gap-5">
          <h2 className={`${T.h2} text-ink`}>Design in Cradle.<br />Validate in the lab.</h2>
          <p className={`${T.lead} max-w-[500px] text-muted`}>{lead}</p>
        </div>

        <div ref={ref} className="flex w-full flex-col items-start gap-10 pb-10">
          <div className="flex items-center gap-1" role="tablist">
            {TABS.map((t, i) => (
              <button
                key={t.label}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`rounded-xl px-4 py-2 ${T.h4} ${i === active ? 'bg-gray-100 text-gray-800' : 'bg-gray-50/0 text-muted'}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div key={active} className="flex w-full flex-col items-start gap-5 md:flex-row md:justify-center">
            {TABS[active].cards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0.001, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.001, y: 30 }}
                transition={{ type: 'spring', duration: 0.6, bounce: 0.1, delay: 0.1 * (i + 1) }}
                className="flex w-full flex-col items-start gap-5 md:w-[calc((100%-40px)/3)] md:shrink-0 lg:w-[400px]"
              >
                <div className="relative aspect-[1.2746] w-full overflow-hidden rounded-2xl bg-gray-100">
                  <img
                    src={c.img}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    style={i < 2 ? { WebkitMaskImage: IMG_MASK, maskImage: IMG_MASK } : undefined}
                  />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <h3 className={`${T.cardTitle} text-gray-800`}>{c.title}</h3>
                  <p className={`${T.body} text-muted`}>{c.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
