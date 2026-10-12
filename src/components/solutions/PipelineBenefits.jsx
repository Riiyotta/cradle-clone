import { T } from './primitives.jsx'
import PipelineCompare from './PipelineCompare.jsx'
import { FileTickerIllustration, PositionsIllustration, ToggleIllustration } from './BenefitIllustrations.jsx'

// B3 / I3 `timeline` (dark, inherits the #030712 main bg).
// Desktop: padding 80 40 200, content max-w 1280 gap 80, bottom border 1px white/8.
// Phone: padding 80 20, gap 40. Optional f.lines = [phone, desktop] minimum line counts for placeholder bodies
// whose live line count differs per width (keeps section heights equal to the measured ones). Benefit blocks stack illustration → text → features, 40 apart.

function BenefitBlock({ block, cfg, index }) {
  const tileH = block.tileHPhone ?? 'h-[220px]'
  const ill =
    index === 0 ? <ToggleIllustration video={cfg.video} toggles={block.toggles} accent={cfg.accent} /> :
    index === 1 ? <FileTickerIllustration files={block.files} fileColor={cfg.fileColor} accent={cfg.accent} glow={cfg.glow} /> :
    <PositionsIllustration image={block.image} />

  return (
    <div id={index === 0 ? 'usp1' : undefined} className="flex w-full scroll-mt-16 flex-col gap-10 md:grid md:grid-cols-3 md:gap-x-5 md:gap-y-10">
      {/* text cell: padding 2 16 20 0, justify end */}
      <div className="flex flex-col justify-end gap-5 md:pb-5 md:pr-4 md:pt-[2px]">
        <h3 className={`${T.h3} text-white`}>{block.title}</h3>
        <p className={`${T.lead} text-white/80`}>{block.lead}</p>
      </div>
      <div className={`order-first w-full ${tileH} md:order-none md:col-span-2 md:h-auto md:aspect-[1.85]`}>{ill}</div>
      {block.features.map((f, i) => (
        <div key={f.title} className={`flex flex-col gap-2 md:pt-5 ${block.featureCls?.[i] ?? ''}`}>
          <h4 className={`${T.cardTitle} text-white`}>{f.title}</h4>
          <p
            className={`${T.body} text-white/80 ${f.lines ? 'min-h-[calc(var(--lp)*22.4px)] md:min-h-[calc(var(--ld)*25.6px)]' : ''}`}
            style={f.lines ? { '--lp': f.lines[0], '--ld': f.lines[1] } : undefined}
          >
            {f.body}
          </p>
        </div>
      ))}
    </div>
  )
}

export default function PipelineBenefits({ cfg }) {
  const t = cfg.timeline
  return (
    <section className="flex w-full justify-center px-5 shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)] py-20 md:px-10 md:pb-[200px]">
      <div className="flex w-full max-w-container flex-col items-start gap-10 md:gap-20">
        <div className={`flex w-full max-w-[960px] flex-col gap-5 ${t.introGap ?? 'md:gap-10'}`}>
          <h2 className="font-heading text-[24px] font-medium leading-[24px] tracking-[-0.48px] text-white md:text-[48px] md:leading-[57.6px] md:tracking-[-0.96px]">
            <span className="md:hidden">{t.titlePhone}</span>
            <span className="hidden md:inline">{t.title[0]}<br />{t.title[1]}</span>
          </h2>
          <p className={`${T.lead} text-white/80`}>{t.lead}</p>
        </div>

        <PipelineCompare cfg={cfg} />

        <div className="flex w-full flex-col items-center gap-10 md:gap-20">
          {t.blocks.map((b, i) => (
            <div key={i} className="contents">
              {i > 0 && <div className="h-px w-full shrink-0 bg-white/[0.08]" />}
              <BenefitBlock block={b} cfg={cfg} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
