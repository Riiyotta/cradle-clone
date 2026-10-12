import { Button } from './ui.jsx'

// CLONE_SPEC §13 Footer CTA (`footer-cta`)
// Screens band (max-w 880): columns 25% / 50% / 25% (phone: flex 4 / 50% / flex 4, each 110 tall, content centered).
// Images use aspect 1.61176 and overflow their columns: side screens 327% wide, middle 164%.

const IMG = 'absolute inset-0 h-full w-full rounded-[inherit] object-cover object-[50%_0]'

export default function FooterCTA() {
  return (
    <section
      className="relative flex w-full flex-col items-center gap-20 overflow-hidden px-10 py-20 md:gap-[60px] md:pb-0 lg:gap-20 lg:pt-[120px]
        bg-[radial-gradient(89%_27%_at_50%_86.4%,#5e95fc_52%,#224eee_100%)]
        md:bg-[radial-gradient(89%_44%_at_50%_76.9%,#5e95fc_52%,#224eee_100%)]
        lg:bg-[radial-gradient(89%_50%_at_50%_76.9%,#5e95fc_52%,#224eee_100%)]"
    >
      {/* Content */}
      <div className="relative flex w-full max-w-container flex-col items-start gap-10">
        <div className="flex w-full flex-col items-center gap-10">
          <h1 className="w-full text-center font-heading font-medium text-white text-[40px] leading-[40px] tracking-[-1.6px] md:text-[56px] md:leading-[56px] md:tracking-[-2.24px] lg:text-[72px] lg:leading-[72px] lg:tracking-[-2.88px]">
            <span>You made it. Nice.</span>
            <br />
            <span className="text-blue-300">Now, let's talk?</span>
          </h1>
          <div className="flex items-center justify-center overflow-hidden rounded-2xl bg-white/[0.12] p-1">
            <Button variant="secondary" href="./get-started" className="!px-8">I'm interested</Button>
          </div>
        </div>
      </div>

      {/* Screens */}
      <div className="relative z-[1] flex h-10 w-full max-w-[880px] items-start justify-center md:h-[360px]">
        {/* left: report */}
        <div className="relative flex h-[110px] w-px flex-[4_0_0] flex-col items-center justify-center pt-10 md:h-auto md:w-1/4 md:flex-none">
          <div className="relative z-[1] w-[327%] shrink-0 aspect-[1.61176] overflow-hidden rounded-lg md:rounded-none md:rounded-t-xl md:opacity-90">
            <img src="/assets/ui-report-cta.png" alt="report" className={IMG} />
          </div>
        </div>
        {/* middle: round */}
        <div className="relative z-[3] flex h-[110px] w-1/2 shrink-0 flex-col items-center justify-center md:h-auto">
          <div className="relative z-[1] w-[164%] shrink-0 aspect-[1.61176] overflow-hidden rounded-[6px_6px_8px_8px] shadow-[0_1px_16px_0_rgba(0,0,0,0.25)] md:rounded-none md:rounded-t-xl">
            <img src="/assets/ui-round.png" alt="round" className={IMG} />
          </div>
        </div>
        {/* gradient overlay (z 4): 200% wide wrapper at left -400 (phone: h 360, bottom -150, left -155) holding a 200% gradient */}
        <div className="pointer-events-none absolute z-[4] flex h-[360px] w-[200%] -bottom-[150px] -left-[155px] items-center justify-center md:h-full md:bottom-0 md:-left-[400px]">
          <div className="h-full w-[200%] shrink-0 bg-[linear-gradient(180deg,rgba(34,77,238,0)_51%,rgba(34,77,238,0.32)_100%)]" />
        </div>
        {/* right: data */}
        <div className="relative z-[1] flex h-[110px] w-px flex-[4_0_0] flex-col items-center justify-center pt-20 md:h-auto md:w-1/4 md:flex-none">
          <div className="relative z-[1] w-[327%] shrink-0 aspect-[1.61176] overflow-hidden rounded-lg shadow-[0_1px_16px_0_rgba(0,0,0,0.25)] md:rounded-none md:rounded-t-xl md:opacity-[0.85] md:shadow-none">
            <img src="/assets/ui-data.png" alt="data" className={IMG} />
          </div>
        </div>
      </div>
    </section>
  )
}
