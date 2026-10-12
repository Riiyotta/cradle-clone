import { Container } from './ui.jsx'

// CLONE_SPEC §5 Recent case studies (`lab-blog-posts` #1)

const CARDS = [
  { img: 'case-keasling-qs21.png', href: './blog/keasling-qs21', title: 'Using AI to produce vaccine adjuvants without cutting down rainforest' },
  { img: 'case-therapeutic-peptides.png', href: './blog/therapeutic-peptides', title: 'Engineering therapeutic peptides with 50% success rate under tight multi-property constraints, 5× faster than prior efforts' },
  { img: 'case-staph-aureus-vaccine.png', href: './blog/staphylococcus-aureus-vaccine', title: 'Improving Staphylococcus aureus vaccine thermostability by 2.5 °C in a single round, 7× faster than rational design' },
  { img: 'case-igg-campaign.png', href: './blog/igg-campaign', title: 'Rescuing a stalled IgG campaign: 10 candidates meeting potency and developability criteria in 3 rounds' },
]

function Card({ img, href, title, className = '' }) {
  return (
    <a href={href} className={`group flex flex-col items-start gap-4 no-underline ${className}`}>
      {/* Image 302×160.4 (aspect 1.88235), radius 16; ::after 4px rgba(45,102,248,0) → #2d66f8 on hover. Live: border + title colour tween 150ms, ease [0.12,0.23,0.5,1] */}
      <div
        className="fborder fborder-anim w-full aspect-[1.88235] rounded-2xl group-hover:[--cs-border:#2d66f8]"
        style={{ '--fb': '4px solid var(--cs-border,rgba(45,102,248,0))' }}
      >
        <img src={`/assets/${img}`} alt="" className="absolute inset-0 h-full w-full rounded-[inherit] object-cover object-center" />
      </div>
      <p className="w-full font-sans font-medium text-[14px] leading-[22.4px] md:leading-[21px] tracking-[-0.28px] lg:text-[16px] lg:leading-[25.6px] lg:tracking-[-0.32px] text-muted group-hover:text-ink transition-colors duration-150 ease-[cubic-bezier(0.12,0.23,0.5,1)]">
        {title}
      </p>
    </a>
  )
}

export default function CaseStudies() {
  return (
    <section className="relative w-full flex flex-col items-center bg-gray-50 px-4 pt-8 pb-16 md:px-10 md:pt-10 md:pb-20 lg:pt-[60px] shadow-[inset_0_1px_0_0_rgba(0,0,0,0.04)]">
      <Container className="flex flex-col items-start gap-8 md:gap-10">
        <h3 className="font-heading font-medium text-ink text-[24px] leading-[28.8px] tracking-[-0.48px] lg:text-[32px] lg:leading-[38.4px] lg:tracking-[-0.64px]">
          Recent case studies
        </h3>
        {/* Phone: 2-col grid (167 each, gap 24), cards 1–2 only. Desktop: row of 4, gap 24, align start */}
        <div className="grid w-full grid-cols-2 gap-6 md:flex md:items-start md:gap-3 lg:gap-6">
          {CARDS.map((c, i) => (
            <Card key={c.href} {...c} className={`min-w-0 md:flex-1 ${i > 2 ? 'hidden lg:flex' : i > 1 ? 'hidden md:flex' : ''}`} />
          ))}
        </div>
      </Container>
    </section>
  )
}
