import { motion } from 'framer-motion'
import { EASE_FRAMER, T } from './primitives.jsx'

// B5 CaseQuote / I5 (large variant). bg linear-gradient(112deg, #f0f9ff 8%, #f9fafb 100%).
// Quote block 850 wide, padding-left 30, 6px #0ea5e9 left border. Attribution 410 wide, bottom-right aligned.
// Word reveal on enter: opacity .001→1, y 10→0, ≈0.2s each, stagger 50ms.

export default function CaseQuote({ cfg }) {
  const q = cfg.quote
  const large = q.size === 'large'
  const words = q.text.split(' ')
  const textCls = large ? T.h2 : T.h3
  return (
    <section
      className={`flex w-full justify-center px-5 py-20 md:px-10 ${large ? 'pb-[160px] md:py-[160px]' : ''}`}
      style={{ backgroundImage: 'linear-gradient(112deg, #f0f9ff 8%, #f9fafb 100%)' }}
    >
      <div className="flex w-full max-w-container flex-col items-center gap-5 md:flex-row">
        <div className="relative w-full md:w-[850px] md:shrink md:pl-[30px]">
          <span className="absolute inset-y-0 left-0 hidden w-[6px] bg-[#0ea5e9] md:block" />
          <motion.p
            className={`${textCls} text-ink`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
          >
            {words.map((w, i) => (
              <span key={i}>
                <motion.span
                  className="inline-block"
                  variants={{ hidden: { opacity: 0.001, y: 10 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.2, ease: EASE_FRAMER }}
                >
                  {w}
                </motion.span>
                {i < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </motion.p>
        </div>
        <div className="flex w-full items-center justify-end gap-5 md:w-[280px] md:shrink-0 lg:w-[410px] md:items-end md:self-stretch">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-black/[0.08] md:h-14 md:w-14">
            <img
              src={q.avatar}
              alt=""
              className="h-full w-full object-cover"
              style={{ WebkitMaskImage: 'linear-gradient(#000 50%, rgba(0,0,0,.5) 100%)', maskImage: 'linear-gradient(#000 50%, rgba(0,0,0,.5) 100%)' }}
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <p className={`${T.body} text-ink`}>{q.name}</p>
            <p className={`${T.body} text-muted`}>{q.role}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
