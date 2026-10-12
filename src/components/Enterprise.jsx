import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Eyebrow, Button, FRAMER_EASE } from './ui.jsx'

// CLONE_SPEC §10 Enterprise (`enterprise`)

const FEATURES = [
  { title: 'Privacy-first AI', body: 'You experimental data is only used to train your organizations custom models.' },
  { title: 'SOC 2 compliant', body: 'Cradle is fully SOC 2 compliant with active monitoring and tight security protocols in place.' },
  { title: 'Single Sign-on', body: 'Secure and simple account management with SSO support for Google and Microsoft.' },
  { title: 'Custom predictors', beta: true, body: 'Use internally developed predictors right in Cradle and see outputs inside Reports.' },
  { title: 'Zero-maintenance', body: 'Fully managed AI infrastructure with optimized GPU that scales with your need.' },
  { title: 'Dedicated support', body: 'Our team of scientists and ML experts are ready to assist with any issues.' },
]

// 32×32 box (phone 20×20) → #2d66f8 circle (22, phone 18) → white check 11×9 (phone 10×8)
function Check() {
  return (
    <div className="relative h-5 w-5 shrink-0 overflow-hidden md:h-8 md:w-8">
      <div className="absolute rounded-full bg-accent h-[18px] w-[18px] top-[calc(50%-9px)] left-[calc(50%-9px)] md:h-[22px] md:w-[22px] md:top-[calc(50%-11px)] md:left-[calc(50%-11px)]" />
      <img
        src="/assets/icon-check.svg"
        alt=""
        className="absolute h-2 w-[10px] top-[6px] left-[calc(50%-5px)] md:h-[9px] md:w-[11px] md:top-[calc(50%-4.5px)] md:left-[calc(50%-5.5px)]"
      />
    </div>
  )
}

function Feature({ title, body, beta, row2 }) {
  // Live quirk: row-2 items use a 10px title→body gap on desktop, row 1 uses 16px.
  return (
    <div className={`flex w-full flex-col items-start gap-2 self-start ${row2 ? 'md:gap-[10px]' : 'md:gap-4'}`}>
      <div className="flex w-full flex-col items-start gap-[10px]">
        <Check />
        <div className="flex w-full items-center gap-[6px] md:gap-[10px]">
          <h5 className="whitespace-pre font-sans font-semibold text-white text-[14px] leading-[18.2px] md:font-heading md:text-[17px] md:leading-[23.8px] md:tracking-[-0.17px] lg:text-[18px] lg:leading-[25.2px] lg:tracking-[-0.18px]">{title}</h5>
          {beta && (
            <span className="flex h-4 items-center justify-center rounded bg-white px-[3px] py-[2px] md:px-1 md:py-[3px]">
              <span className="font-sans font-extrabold leading-none text-ink text-[7px] tracking-[0.72px] md:text-[9px]">BETA</span>
            </span>
          )}
        </div>
      </div>
      <p className="w-full font-sans font-medium text-white/60 text-[14px] leading-[22.4px] md:leading-[21px] tracking-[-0.28px] lg:text-[16px] lg:leading-[25.6px] lg:tracking-[-0.32px]">{body}</p>
    </div>
  )
}

export default function Enterprise() {
  // Trigger = 50% of a viewport-wide box with the bg's height visible (live fires at 392/783px at 1440;
  // measuring the 1560px-wide bg itself would fire ≈30px late because its sides are clipped).
  const sentinel = useRef(null)
  const bgIn = useInView(sentinel, { once: true, amount: 0.5 })
  return (
    <section
      id="security"
      className="relative flex w-full min-h-[100vh] flex-col items-center gap-4 overflow-hidden bg-ink px-4 pt-20 pb-16 md:px-10 md:pt-40 md:pb-20 lg:gap-10 lg:pb-[120px]"
    >
      {/* bg: blurred lab photo, masked. Desktop: inset -60 (top/left/right), aspect 1.99161, blur 8. Phone: top -40, left/right -20, aspect 1.36076, blur 4.
          Motion (live): opacity 0→1, 1.0s tween ease [0.12,0.23,0.5,1], once, when 50% of the (section-clipped) bg is visible. */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: bgIn ? 1 : 0 }}
        transition={{ duration: 1, ease: FRAMER_EASE }}
        style={{ WebkitMaskImage: 'linear-gradient(#000 17%, #0000 82%)', maskImage: 'linear-gradient(#000 17%, #0000 82%)' }}
        className="absolute z-[1] -top-10 -left-5 -right-5 aspect-[1.36076] blur-[4px] md:-top-[60px] md:-left-[60px] md:-right-[60px] md:aspect-[1.99161] md:blur-[8px]"
      >
        <img src="/assets/enterprise-bg.png" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div ref={sentinel} className="pointer-events-none absolute inset-y-0 left-5 right-5 md:left-[60px] md:right-[60px]" />
      </motion.div>

      <div className="relative z-[2] flex w-full max-w-container flex-col items-start gap-6 md:gap-5 lg:gap-10">
        {/* Header row: text column is 65% (832 at 1280) */}
        <div className="flex w-full items-center gap-10">
          <div className="flex w-px flex-1 flex-col items-start gap-[30px] md:flex-[0.65_0_0]">
            <div className="flex w-full flex-col gap-5">
              <Eyebrow dark>BUILT FOR ENTERPRISE</Eyebrow>
              <h2 className="w-full font-heading font-medium text-white text-[32px] leading-[35.2px] tracking-[-0.64px] md:text-[48px] md:leading-[48px] md:tracking-[-1.92px] lg:text-[64px] lg:leading-[64px] lg:tracking-[-2.56px]">
                Private. Secure. Yours.
              </h2>
            </div>
            <p className="w-full font-sans font-medium text-white text-[16px] leading-[24px] tracking-[-0.64px] lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.8px]">
              With Cradle, your sequences and data remain private, secure, and entirely yours. Only you and those you invite can access your data, which is never used to train models for others. Protected by bank-grade security, your data stays secure at all times.
              <br />
              <br />
              Plus, you retain full ownership of your intellectual property—no royalties, just a software subscription fee.
            </p>
            <Button variant="secondary" href="./security" className="w-full md:w-auto">Security at Cradle</Button>
          </div>
        </div>

        <div className="h-px w-full bg-white/[0.16]" />

        <div className="grid w-full grid-cols-2 auto-rows-fr gap-6 pt-10 md:gap-10 md:pt-[60px] lg:grid-cols-3 lg:pt-0">
          {FEATURES.map((f, i) => <Feature key={f.title} {...f} row2={i >= 3} />)}
        </div>
      </div>
    </section>
  )
}
