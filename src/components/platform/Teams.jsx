import { H2, LEAD, H4, BODY, GRADIENT_H2, CheckBadge } from './shared.jsx'

// PAGES_A /platform P7 Teams + PhotoCard ×2
const CHECKS = ['API and Web Interface', 'Granular access controls', 'Unlimited seats']
const CARDS = [
  {
    img: 'wetlab-riCniX.png', label: 'Web Interface', title: 'Wet lab',
    dot: 'bg-sky400 shadow-[0_0_8px_0_#0ea5e9]',
    labelGradient: 'bg-[linear-gradient(270deg,rgba(255,255,255,.9)_0%,#f0f9ff_100%)]',
    body: 'Add your domain expertise and AI generate candidates for lab testing in just a few clicks. Upload experimental results to improve your project-specific AI automatically.',
  },
  {
    img: 'computational-AcW1X3.png', label: 'API Access', title: 'Computational',
    dot: 'bg-[#61c779] shadow-[0_0_8px_0_#3cab57]',
    labelGradient: 'bg-[linear-gradient(90deg,#e1f7e6_0%,rgba(255,255,255,.9)_100%)]',
    body: 'Run Cradle with an API and scale your expertise without the DevOps overhead. Focus on novel design strategies, not routine requests and endless configuration.',
  },
]

function PhotoCard({ c }) {
  return (
    <div className="relative flex h-[280px] w-full shrink-0 flex-col items-start justify-between overflow-clip rounded-3xl p-5 md:h-[500px] md:w-[480px] md:p-10">
      {/* mirrored background photo */}
      <img
        src={`/assets/pages/platform/${c.img}`}
        alt=""
        className="absolute left-1/2 top-[-94px] h-[372.3px] w-[350px] max-w-none -translate-x-1/2 -scale-x-100 object-cover md:top-1/2 md:h-[625px] md:w-[587.5px] md:-translate-y-1/2"
      />
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(rgba(3,7,18,.08)_40%,rgba(3,7,18,.6)_100%)]" />
      <div className="relative z-[4] flex w-full items-center gap-[10px]">
        <div className={`h-2 w-2 shrink-0 rounded-[2px] ${c.dot}`} />
        <p className={`min-w-0 flex-1 text-white/80 ${BODY}`}>
          <span className={`bg-clip-text [-webkit-text-fill-color:transparent] ${c.labelGradient}`}>{c.label}</span>
        </p>
      </div>
      <div className="relative z-[3] flex w-full flex-col items-start gap-[10px]">
        <h4 className={`${H4} text-white`}>{c.title}</h4>
        <p className={`${BODY} text-white/80`}>{c.body}</p>
      </div>
    </div>
  )
}

export default function Teams() {
  return (
    <section className="flex w-full flex-col items-center bg-white px-5 pb-10 pt-20 md:px-10 md:py-[120px] lg:px-20 lg:pb-40">
      <div className="flex w-full flex-col items-center gap-10 md:gap-20 lg:max-w-[1080px]">
        <div className="flex w-full flex-col items-center gap-5 md:gap-10">
          <h2 className={`w-full text-left md:text-center ${H2}`}>
            <span className={GRADIENT_H2}>All your teams<br />in one workspace</span>
          </h2>
          <p className={`w-full text-left md:max-w-[560px] md:text-center lg:max-w-[680px] ${LEAD}`}>
            With everyone in the same workspace, results compound across your organization. Same data. Same models. Same learning loop. New results.
          </p>
          <div className="flex w-full flex-col items-center md:flex-row md:justify-center md:gap-6">
            {CHECKS.map((t, i) => (
              <div key={t} className={`flex h-11 w-full items-center gap-[6px] md:h-8 md:w-auto ${i < CHECKS.length - 1 ? 'border-b border-gray-50 md:border-0' : ''}`}>
                <CheckBadge green animate />
                <p className={`min-w-0 flex-1 text-muted md:flex-none ${BODY}`}>{t}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-[10px] md:flex-row">
          {CARDS.map((c) => <PhotoCard key={c.title} c={c} />)}
        </div>
      </div>
    </section>
  )
}
