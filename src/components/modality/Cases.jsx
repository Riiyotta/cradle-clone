import { Link } from 'react-router-dom'
import { WordEyebrow, H2, H4, BODY } from './primitives.jsx'

/* ============================================================
   M6 / E6 / V4 / P5 Case studies
   ============================================================ */
const QUOTE = 'font-quote text-ink text-[22px] leading-[26.4px] md:text-[28px] md:leading-[33.6px]'

function Quote({ quote }) {
  return (
    <p className={QUOTE}>
      {quote.before}<span className="text-accent">{quote.highlight}</span>{quote.after}
    </p>
  )
}

function Avatar({ src, className, style }) {
  return (
    <div className={`avatar-mask shrink-0 overflow-hidden bg-black/[0.08] ${className}`} style={style}>
      <img src={src} alt="" className="h-full w-full object-cover" />
    </div>
  )
}

// Antibody / enzyme: white quote card + blue person card (phone: one white card, person row underneath)
function QuoteRow({ quote, person }) {
  return (
    <div className="flex w-full flex-col md:flex-row md:items-stretch md:gap-6">
      <div className="rounded-t-2xl bg-white p-6 md:w-[60.07%] md:shrink-0 md:rounded-2xl md:p-20">
        <Quote quote={quote} />
      </div>
      {/* desktop person card */}
      <div className="hidden flex-col items-center justify-center rounded-2xl bg-accent text-center md:flex md:flex-1">
        <Avatar src={person.avatar} className="fborder mb-5 h-10 w-10 rounded-lg" style={{ '--fb': '2px solid #fff' }} />
        <p className={`text-white ${BODY}`}>{person.name}</p>
        <p className={`text-white/60 ${BODY}`}>{person.role}</p>
      </div>
      {/* phone person row */}
      <div className="flex items-center gap-5 rounded-b-2xl border-t border-gray-100 bg-white p-6 md:hidden">
        <Avatar src={person.avatar} className="h-10 w-10 rounded-lg" />
        <div>
          <p className={`text-ink ${BODY}`}>{person.name}</p>
          <p className={`text-gray-400 ${BODY}`}>{person.role}</p>
        </div>
      </div>
    </div>
  )
}

// Vaccine / peptide: FeaturedCaseCard + testimonial card (628×490.8 each, padding 40, radius 24)
function FeaturedRow({ featured, quote, person }) {
  return (
    <div className="flex w-full flex-col gap-6 md:flex-row">
      <Link to={featured.to} className="group hidden flex-col rounded-3xl bg-white p-10 md:flex md:flex-1">
        <div className="fborder overflow-hidden rounded-lg" style={{ '--fb': '1px solid rgba(27,27,177,.04)' }}>
          <img src={featured.image} alt="" className="aspect-[548/285.4] w-full object-cover transition-transform duration-100 ease-[cubic-bezier(0.12,0.23,0.5,1)] group-hover:scale-[1.02]" />
        </div>
        <div className="mt-4 flex h-[15px] items-center">
          <p className="font-sans text-[11px] font-bold uppercase leading-[14.3px] tracking-[-0.44px] text-gray-400">Case studies</p>
        </div>
        <h4 className={`mt-2 text-gray-800 ${H4}`}>{featured.title}</h4>
      </Link>
      <div className="flex flex-col justify-between gap-6 rounded-3xl bg-white p-10 md:flex-1">
        <Quote quote={quote} />
        <div className="flex items-center gap-5">
          <Avatar src={person.avatar} className="h-10 w-10 rounded-xl md:h-14 md:w-14" />
          <div>
            <p className={`text-ink ${BODY}`}>{person.name}</p>
            <p className={`text-muted ${BODY}`}>{person.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// CaseStudyCard (homepage §5): 302 wide, image radius 16 with 4px #2d66f8 hover ring, title hover #030712
function CaseCard({ to, image, title }) {
  return (
    <Link to={to} className="group flex min-w-0 flex-col gap-4">
      <div className="fborder fborder-anim aspect-[1.88235] w-full rounded-2xl group-hover:[--cs-border:#2d66f8]" style={{ '--fb': '4px solid var(--cs-border,rgba(45,102,248,0))' }}>
        <img src={image} alt="" className="absolute inset-0 h-full w-full rounded-[inherit] object-cover" />
      </div>
      <p className={`text-muted transition-colors duration-150 ease-[cubic-bezier(0.12,0.23,0.5,1)] group-hover:text-ink ${BODY}`}>{title}</p>
    </Link>
  )
}

const ANTIBODY_LOGOS = 'grid-cols-3 gap-x-10 gap-y-[60px] md:grid-cols-5 md:gap-x-10 md:gap-y-[60px]'
const WIDE_LOGOS = 'grid-cols-3 gap-x-10 gap-y-[60px] md:max-w-[1120px] md:grid-cols-5 md:gap-x-5 md:gap-y-[41px]'

export function CaseStudies({ id, title, titleMax = 'md:max-w-[1024px]', logos, logoStyle = 'antibody', logosCentered = false, quote, person, featured, cards, gap = 'md:gap-10', headGap }) {
  return (
    <section id={id} className="flex w-full justify-center bg-gray-100 px-5 py-[60px] md:px-10 md:py-[120px]">
      <div className={`flex w-full max-w-container flex-col gap-6 ${gap}`}>
        <div className={`flex flex-col gap-6 ${headGap ?? gap}`}>
          <WordEyebrow>Case studies</WordEyebrow>
          <h2 className={`text-gray-800 ${H2} ${titleMax}`}>{title}</h2>
        </div>
        {logos && (
          <div className={`grid w-full ${logoStyle === 'antibody' ? ANTIBODY_LOGOS : WIDE_LOGOS} ${logosCentered ? 'md:mx-auto' : ''}`}>
            {logos.map((src, i) => (
              <div key={src} className={`flex items-center justify-center ${i > 8 ? 'hidden md:flex' : ''}`}>
                <img src={src} alt="" className={`h-[39px] w-[90px] object-contain opacity-60 md:h-[42px] md:w-[117px] ${logoStyle === 'antibody' ? '' : 'rounded-lg'}`} />
              </div>
            ))}
          </div>
        )}
        {featured ? <FeaturedRow featured={featured} quote={quote} person={person} /> : <QuoteRow quote={quote} person={person} />}
        {cards && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:flex md:items-start md:gap-6">
            {cards.map((c) => <div key={c.to} className="min-w-0 md:flex-1"><CaseCard {...c} /></div>)}
          </div>
        )}
      </div>
    </section>
  )
}
