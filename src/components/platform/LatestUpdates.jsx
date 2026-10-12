import { Link } from 'react-router-dom'
import { H2, H4, BODY, INLINE_LINK } from './shared.jsx'

// PAGES_A /platform P10 Latest updates. Lead phrases verbatim; the text after each lead is placeholder.
const GROUPS = [
  {
    icon: 'data-XQPahj.png', title: 'Data & Workflow Management',
    items: [
      ['Flexible data management', 'Placeholder copy for this update. This neutral text stands in for the original description and keeps a similar length, so that it wraps the same way.'],
      ['Complete provenance tracking', 'Placeholder copy for this update. This neutral text stands in for the original description and keeps a similar overall length here too.'],
      ['Full API access', 'Placeholder copy for this update. This neutral text stands in for the original and keeps a similar text length.'],
      ['Multi-modality support', 'Placeholder copy for this update. This neutral text stands in for the original and keeps a similar overall text length.'],
    ],
  },
  {
    icon: 'optimzaiton-6gDPYK.png', title: 'Design and Optimization',
    items: [
      ['Multi-property optimization', 'Placeholder copy for this update. This neutral text stands in for the original description and keeps a similar length, so the paragraph wraps the same way on screen.'],
      ['Modular task system', 'Placeholder copy for this update. This neutral text stands in for the original description and keeps a similar length across all of its many lines.'],
      ['Advanced sequence design controls', 'Placeholder copy for this update. This neutral text stands in for the original description and keeps a similar length, so that it wraps the same way.'],
      ['Intelligent plate design', 'Placeholder copy for this update. This neutral text stands in for the original description and keeps a similar length, so the paragraph wraps the same way here.'],
      ['Hit identification', 'Placeholder copy for this update. This neutral text stands in for the original and keeps a similar length here.'],
    ],
  },
  {
    icon: 'models-CWU1tI.png', title: 'AI and model updates',
    items: [
      ['Automated model finetuning', 'Placeholder copy for this update. This neutral text stands in for the original description and keeps a similar length, so the paragraph wraps across the same number of lines as in the source text. A further plain sentence follows. (More about security and privacy on our', 'security page', '.)'],
      ['De-risked plate generation', 'Placeholder copy for this update. This neutral text stands in for the original description and keeps a similar length, so the paragraph wraps the same way on every screen.'],
      ['Wet lab proven technology', 'Placeholder copy for this update. This neutral text stands in for the original description and keeps a similar overall length too.'],
    ],
  },
  {
    icon: 'models-BonaDa.png', title: 'Security and access control', titleColor: 'text-gray-800',
    items: [
      ['Enterprise-grade security', 'Placeholder copy for this update. This neutral text stands in for the original and keeps a similar length in the list.'],
      ['Role-based permissions', 'Placeholder copy for this update. This neutral text stands in for the original and keeps a similar length here.'],
    ],
  },
]

export default function LatestUpdates() {
  return (
    <section className="flex w-full flex-col items-center bg-white px-5 pb-20 md:px-10 md:pb-40 md:pt-[120px] lg:px-20">
      <div className="flex w-full flex-col items-start gap-10 md:flex-row md:justify-center md:gap-20 lg:max-w-[1080px]">
        <div className="w-full md:sticky md:top-[120px] md:w-[420px] md:shrink-0 lg:w-[500px]">
          <h2 className={`text-center md:text-left ${H2}`}>Latest<br className="hidden md:inline" /><span className="md:hidden"> </span>updates</h2>
        </div>
        <div className="flex w-full flex-col items-start gap-10 md:w-[420px] md:shrink-0 md:gap-20 lg:w-[500px]">
          {GROUPS.map((g) => (
            <div key={g.title} className="flex w-full flex-col items-start gap-5 md:gap-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-[0_0.301px_0.903px_-1px_rgba(0,0,0,.09),0_1.144px_3.433px_-2px_rgba(0,0,0,.09),0_5px_15px_-3px_rgba(0,0,0,.06)]">
                <img src={`/assets/pages/platform/${g.icon}`} alt="" className="h-8 w-8 object-cover" />
              </div>
              <h4 className={`${H4} ${g.titleColor || 'text-ink'}`}>{g.title}</h4>
              <div className="flex w-full flex-col gap-5">
                {g.items.map(([lead, rest, linkText, after]) => (
                  <p key={lead} className={`${BODY} text-muted`}>
                    <span className="text-gray-800">{lead}</span>
                    <br />
                    {rest}
                    {linkText && <>{' '}<Link to="/security" className={INLINE_LINK}>{linkText}</Link>{after}</>}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
