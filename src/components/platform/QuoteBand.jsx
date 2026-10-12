import { motion } from 'framer-motion'

// PAGES_A /platform P9 Quote (QuoteBand). Hidden on phone (not rendered on live at 390).
const QUOTE = '"Cradle\'s AI-based protein design platform provides easy access and acceleration to protein optimization for the discovery pipeline."'
const META = 'font-sans font-medium text-[14px] leading-[21px] tracking-[-0.28px] lg:text-[16px] lg:leading-[25.6px] lg:tracking-[-0.32px]'

export default function QuoteBand() {
  const words = QUOTE.split(' ')
  return (
    <section className="hidden h-[720px] w-full flex-col items-center justify-center gap-10 bg-[linear-gradient(#fff_0%,#f0f9ff_19.58%,#dbe7fe_80%,#fff_100%)] px-20 py-40 md:flex lg:h-[900px]">
      <div className="w-full max-w-[640px] [mask-image:linear-gradient(62deg,rgba(0,0,0,.8)_0%,#000_43.6%,rgba(0,0,0,.7)_79%)]">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.075 } } }}
          className="text-left font-heading font-medium text-ink text-[48px] leading-[48px] tracking-[-1.92px]"
        >
          {words.map((w, i) => (
            <span key={i}>
              <motion.span
                className="inline-block"
                variants={{ hidden: { opacity: 0.001, y: 10 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {w}
              </motion.span>
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </motion.h2>
      </div>
      <div className="flex w-full max-w-[640px] items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white p-[3px] shadow-[0_1px_8px_0_rgba(0,0,0,.04)]">
          <img src="/assets/pages/platform/datauri-corteva-logo-51c480.svg" alt="Corteva" className="h-10 w-10" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-start justify-center">
          <p className={`${META} text-gray-800`}>Eswar Narayanan</p>
          <p className={`${META} text-[rgba(31,41,55,.6)]`}>Director, Corteva Catalyst</p>
        </div>
      </div>
    </section>
  )
}
