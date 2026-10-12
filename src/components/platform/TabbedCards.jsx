import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { H2, LEAD, BODY, GRADIENT_H2 } from './shared.jsx'

// PAGES_A /platform P8 Workflow tabs (TabbedCards). Copy marked "~N words" in the spec is placeholder.
const P = '/assets/pages/platform/'
const TABS = {
  Learn: [
    { img: '1-2v3dNU.png', title: 'Import your data', body: 'Placeholder copy for this step. This neutral paragraph stands in for the original description and keeps a similar length, so the card wraps across the same lines here.' },
    { img: '2-rVPCq9.png', title: 'Explore your data quality', body: 'Placeholder copy for this step. This neutral paragraph stands in for the original description and keeps a similar length, so the card wraps across the same number of lines. A further plain sentence fills the space here.' },
    { img: 'ui-hMhVEl.png', title: 'Models learn with you', body: 'Placeholder copy for this step. This neutral paragraph stands in for the original description and keeps a similar length, so the card text wraps across the same number of lines.' },
  ],
  Generate: [
    { img: 'tab-generate-1-4rA0YH.png', title: 'Generate candidates', body: 'Placeholder copy for this step. This neutral paragraph stands in for the original description and keeps a similar length, so the card wraps across the same number of lines. Additional plain sentences continue here to fill the remaining space below.' },
    { img: 'ui-Ty4HuN.png', title: 'Multi-property support', body: 'Placeholder copy for this step. This neutral paragraph stands in for the original description and keeps a similar length, so the card wraps across the same number of lines in the tab panel.' },
    { img: 'ui-F0OA2Y.png', title: 'Full-plate optimization', body: 'The sequences that you download from Cradle are a carefully curated set, selected from millions of in silico designs to maximize your chances of success.' },
  ],
  Review: [
    { img: 'tab-review-reports-I9DDpC.png', title: 'Reports', body: 'Generation Reports give you full control over what candidates you bring to the lab and what to expect in performance.' },
    { img: 'tab-review-send-to-lab-9A5zde.png', title: 'Send to lab', body: 'Download sequences from Cradle, then order DNA and run assays in your own lab or use your existing CRO.' },
    { img: 'tab-review-round-statuses-JSkMFe.png', title: 'Round statuses', body: 'Track lab progress in Cradle using Round Statuses and see live metrics per protein property with every new assay upload.' },
  ],
}

export default function TabbedCards() {
  const [tab, setTab] = useState('Learn')
  const panelRef = useRef(null)
  const inView = useInView(panelRef, { once: true, amount: 0.1 })

  return (
    <section className="flex w-full flex-col items-center bg-white px-5 py-20 md:px-10 md:pb-10 md:pt-[120px] lg:px-20 lg:pb-20">
      <div className="flex w-full flex-col items-start gap-5 md:gap-10 lg:max-w-[1080px]">
        <h2 className={`w-full text-center ${H2}`}>
          <span className={GRADIENT_H2}>Same workflow.<br />Upgraded results.</span>
        </h2>
        <p className={`w-full text-center ${LEAD}`}>Your experimental workflow stays the same, your results don&apos;t.</p>

        <div className="flex w-full flex-col items-center gap-10 pb-10">
          <div role="tablist" className="flex items-center gap-1">
            {Object.keys(TABS).map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-2 font-heading font-medium text-[18px] leading-[21.6px] lg:text-[24px] lg:leading-[28.8px] ${tab === t ? 'bg-gray-100 text-gray-800' : 'bg-[rgba(249,250,251,0)] text-muted'}`}
              >
                {t}
              </button>
            ))}
          </div>

          <motion.div
            ref={panelRef}
            layout="size"
            transition={{ layout: { duration: 0.45, ease: [0.12, 0.23, 0.5, 1] } }}
            className="flex w-full flex-col items-start justify-center gap-5 md:flex-row"
          >
            {TABS[tab].map((c, i) => (
              <motion.div
                key={`${tab}-${i}`}
                initial={{ opacity: 0.001, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.001, y: 30 }}
                transition={{ type: 'spring', duration: 0.6, bounce: 0.1, delay: 0.1 * (i + 1) }}
                className="flex w-full shrink-0 flex-col items-start gap-5 md:w-[400px]"
              >
                <div className="relative aspect-[1.2746] w-full overflow-hidden rounded-2xl bg-gray-100">
                  <div className={`absolute inset-0 ${i < 2 ? '[mask-image:linear-gradient(0deg,rgba(0,0,0,.2)_0%,#000_40%)]' : ''}`}>
                    <img src={P + c.img} alt="" className="h-full w-full object-cover" />
                  </div>
                </div>
                <div className="flex w-full flex-col items-start gap-2">
                  <p className="font-sans font-semibold text-gray-800 text-[14px] leading-[18.2px] lg:text-[16px] lg:leading-[20.8px]">{c.title}</p>
                  <p className={`${BODY} text-muted`}>{c.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
