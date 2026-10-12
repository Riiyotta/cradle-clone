import { CheckGlyph, T } from './primitives.jsx'

// B7 / I7 SecurityBlock. bg #f9fafb, bottom border 1px black/8. Desktop padding 120 40 160; phone 80 20.
// H2 (64, hard break) — phone H1 40/40/-1.6. Row gap 50: list 615 wide (padding 20 0, gap 40) + image 615×715 r24.
// Phone: list only. No motion.

const ITEMS = [
  { title: 'Privacy-first AI', body: "Your experimental data is only used to train your organization's custom models." },
  { title: 'SOC 2 compliant', body: 'Cradle is fully SOC 2 compliant with active monitoring and tight security protocols in place.' },
  { title: 'Single sign-on', body: 'Secure and simple account management with SSO support for Google and Microsoft.' },
  { title: 'Custom predictors', beta: true, body: 'Use internally developed predictors right in Cradle and see outputs inside Reports.' },
  { title: 'Zero-maintenance', body: 'Fully managed AI infrastructure with optimized GPUs that scale with your needs.' },
]

export default function SecurityBlock() {
  return (
    <section className="flex w-full justify-center bg-gray-50 shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)] px-5 py-20 md:px-10 md:pb-[160px] md:pt-[120px]">
      <div className="flex w-full max-w-container flex-col items-start gap-10">
        <h2 className="font-heading text-[40px] font-medium leading-[40px] tracking-[-1.6px] text-ink md:text-[64px] md:leading-[64px] md:tracking-[-2.56px]">
          Always secure.<br />Scale anytime.
        </h2>
        <div className="flex w-full items-start gap-[50px]">
          <div className="flex w-full flex-col items-start gap-10 py-5 md:min-w-0 md:flex-1 lg:w-[615px] lg:flex-none">
            {ITEMS.map((it) => (
              <div key={it.title} className="flex max-w-[440px] flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                    <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-antibody">
                      <CheckGlyph className="h-2 w-[10px]" />
                    </span>
                  </span>
                  <h3 className={`${T.h5} text-gray-800`}>{it.title}</h3>
                  {it.beta && (
                    <span className="ml-[2px] flex h-4 items-center rounded px-1 py-[3px] font-sans text-[9px] font-extrabold leading-none tracking-[0.72px] text-white bg-gray-400">
                      BETA
                    </span>
                  )}
                </div>
                <p className={`${T.body} text-muted`}>{it.body}</p>
              </div>
            ))}
          </div>
          <img
            src="/assets/pages/solutions-biopharma/security-mEhlsH.png"
            alt="Scientists in the Cradle lab"
            className="hidden h-[715px] min-w-0 flex-1 rounded-3xl object-cover md:block lg:w-[615px] lg:flex-none lg:shrink-0"
          />
        </div>
      </div>
    </section>
  )
}
