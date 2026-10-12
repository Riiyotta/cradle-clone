import { motion } from 'framer-motion'
import { H2, LEAD, H4, BODY, useBreakpoint } from './shared.jsx'

// PAGES_A /platform P6 "Three ways" header + FeatureRow ×3. Row body copy is placeholder (length/lines only in spec).
const ROWS = [
  {
    img: 'ui-Ty4HuN.png',
    title: 'Solves property trade-offs simultaneously with AI',
    body: 'Placeholder copy for this feature. This neutral paragraph stands in for the original description and keeps a similar length, so the layout wraps across the same number of lines. Additional plain sentences continue here to fill the remaining space without restating any claims from the source page. It stays generic.',
    section: 'pt-10 pb-[60px] md:py-20',
    inner: 'md:pr-10',
  },
  {
    img: 'ui-hMhVEl.png',
    title: <>Use AI to learn from your <br />unique experimental data</>,
    body: 'Placeholder copy for this feature. This neutral paragraph stands in for the original description and keeps a similar length, so the layout wraps across the same number of lines. Additional plain sentences continue here to fill the remaining space without restating any claims from the source page. It is generic.',
    section: 'pb-[60px] md:pb-20',
    inner: 'md:pl-10',
    imageRight: true,
  },
  {
    img: 'ui-F0OA2Y.png',
    title: <>AI that designs de-risked <br />plates by default</>,
    body: 'Placeholder copy for this feature. This neutral paragraph stands in for the original description and keeps a similar length, so the layout wraps across the same number of lines. Additional plain sentences continue here to fill the remaining space without restating any claims from the page.',
    section: 'pb-[60px] md:pb-[120px] lg:pb-40 shadow-[inset_0_-1px_0_0_rgba(0,0,0,.04)]',
    inner: 'md:pr-10',
    mask: true,
  },
]

function ImageCard({ img, mask, className = '' }) {
  return (
    <div className={`relative flex aspect-[1.2746] w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(#f9fafb,#fff)] md:aspect-auto md:h-[376.6px] md:w-[480px] md:rounded-3xl lg:h-[400px] lg:w-[576px] ${className}`}>
      <div className={`h-full w-full lg:w-[509.8px] ${mask ? '[mask-image:linear-gradient(270deg,transparent_0.75%,#000_25%)]' : ''}`}>
        <img src={`/assets/pages/platform/${img}`} alt="" className="h-full w-full object-cover" />
      </div>
    </div>
  )
}

export default function FeatureRows() {
  const bp = useBreakpoint()
  return (
    <>
      <section className="flex w-full flex-col items-center gap-5 shadow-[inset_0_1px_0_0_rgba(0,0,0,.04)] bg-white px-10 pt-20 md:gap-10 md:pt-[120px] lg:px-20">
        <h2 className={`w-full max-w-container text-center ${H2}`}>Three ways AI unlocks<br />faster R&amp;D timelines</h2>
        <p className={`w-full text-center md:max-w-[500px] lg:max-w-[640px] ${LEAD}`}>
          See how Cradle handles multiple complex objectives in parallel, adapts to your data and automatically de-risks every plate.
        </p>
      </section>
      {ROWS.map((r) => (
        <section key={r.img} className={`flex w-full justify-center bg-white px-5 md:px-10 lg:px-20 ${r.section}`}>
          <motion.div
            initial={{ y: bp === 'phone' ? 8 : 40 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`flex w-full flex-col items-center gap-10 md:flex-row md:gap-20 lg:max-w-[1080px] ${r.inner}`}
          >
            {!r.imageRight && <ImageCard img={r.img} mask={r.mask} />}
            <div className={`flex w-full flex-col items-start gap-5 md:min-w-0 md:flex-1 lg:max-w-[500px] ${r.imageRight ? 'order-2 md:order-none' : ''}`}>
              <h4 className={`${H4} text-ink`}>{r.title}</h4>
              <p className={`${BODY} text-muted`}>{r.body}</p>
            </div>
            {r.imageRight && <ImageCard img={r.img} className="order-1 md:order-none" />}
          </motion.div>
        </section>
      ))}
    </>
  )
}
