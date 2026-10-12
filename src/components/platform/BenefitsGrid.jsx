import { Link } from 'react-router-dom'
import { H4, BODY, INLINE_LINK } from './shared.jsx'

// PAGES_A /platform P5 Benefits grid. Items 2–4 body copy is placeholder (length/lines only in spec).
const ITEMS = [
  {
    title: 'Save months of R&D time',
    body: 'Customers achieve 2-12x speedups across 50+ programs. We help you reach your targets in fewer rounds by solving complex trade-offs faster.',
    links: [['See case studies', '/blog']],
  },
  {
    title: 'Higher program success',
    body: 'Placeholder copy for this benefit. This neutral paragraph stands in for the original description and keeps a similar length across the whole layout.',
    links: [['See case studies', '/blog']],
  },
  {
    title: 'Built for scientists',
    body: 'Placeholder copy for this benefit. This neutral paragraph stands in for the original description and keeps a similar length, so the layout wraps across the same number of lines.',
    links: [['Explore Biopharma', '/solutions/biopharma'], ['Explore Industrial Bio', '/solutions/industrial']],
  },
  {
    title: 'Wet lab verified AI',
    body: 'Placeholder copy for this benefit. This neutral paragraph stands in for the original description and keeps a similar length, so the text wraps across the same number of lines here.',
    links: [['Learn more', '/lab']],
  },
]

export default function BenefitsGrid() {
  return (
    <section className="flex w-full flex-col items-center bg-white px-5 pb-[120px] pt-5 md:px-10 md:py-[120px] lg:px-20">
      <div className="flex w-full flex-col gap-10 md:grid md:max-w-[920px] md:auto-rows-fr md:grid-cols-[repeat(2,420px)] md:gap-x-20 md:gap-y-5 lg:max-w-[960px] lg:grid-cols-[repeat(2,440px)]">
        {ITEMS.map((it) => (
          <div key={it.title} className="flex flex-col items-start gap-3 md:gap-5">
            <h4 className={`${H4} text-ink`}>{it.title}</h4>
            <p className={`${BODY} text-muted`}>{it.body}</p>
            {it.links.map(([label, to]) => (
              <p key={to} className={`${BODY} text-muted`}>
                <Link to={to} className={INLINE_LINK}>{label}</Link>
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
