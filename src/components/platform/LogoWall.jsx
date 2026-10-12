import { LEAD } from './shared.jsx'

// PAGES_A /platform P3 Logo wall. Heights: [desktop/tablet (117 wide), phone (97 wide)] from live.
const LOGOS = [
  ['novonesis', 'Novonesis', 42, 36.2],
  ['novo-nordisk', 'Novo Nordisk', 42, 39],
  ['jnj', 'Johnson & Johnson Innovative Medicine', 42, 36.2],
  ['bayer', 'Bayer', 42, 39],
  ['abbvie', 'AbbVie', 21.8, 18.1],
  ['hansa', 'Hansa Biopharma', 42, 39],
  ['illumina', 'Illumina', 26.7, 22.1],
  ['csl', 'CSL', 42, 39],
  ['lundbeck', 'Lundbeck', 42, 39],
  ['ultragenyx', 'Ultragenyx', 42, null], // not shown below desktop
]

export default function LogoWall() {
  return (
    <section className="relative z-[2] flex w-full flex-col items-center gap-10 bg-[linear-gradient(#f9fafb_50%,#fff_100%)] px-5 pb-10 pt-5 md:px-10 md:pb-20 lg:px-20">
      <div className="flex w-full max-w-container flex-col items-center gap-10 md:gap-20">
        <div className="flex w-full flex-col items-center gap-5 md:gap-10">
          <h2 className="w-full text-center font-heading font-medium text-ink text-[32px] leading-[35.2px] tracking-[-0.64px] md:text-[56px] md:leading-[56px] md:tracking-[-2.24px] lg:text-[72px] lg:leading-[72px] lg:tracking-[-2.88px]">
            The AI engineering<br />platform for biology
          </h2>
          <p className={`w-full max-w-[640px] text-center ${LEAD}`}>
            Scientists in pharma and industrial bio use Cradle to shorten protein R&amp;D timelines up to 12x while growing overall pipeline success.
          </p>
        </div>
        <div className="grid w-full grid-cols-3 items-center gap-x-5 gap-y-[41px] md:max-w-[920px] md:items-start lg:w-[1040px] lg:max-w-none lg:grid-cols-[repeat(5,192px)]">
          {LOGOS.map(([slug, name, h, hp]) => (
            <div key={slug} className={`flex items-center justify-center ${hp == null ? 'hidden lg:flex' : ''}`}>
              <img
                src={`/assets/customer-logo-${slug}.svg`}
                alt={name}
                style={{ '--h': `${h}px`, '--hp': `${hp ?? h}px` }}
                className="h-[var(--hp)] w-[97px] object-contain opacity-60 md:h-[var(--h)] md:w-[117px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
