import { Eyebrow, Button } from './ui.jsx'

// CLONE_SPEC §8 Modalities (`modalities`)

const CARDS = [
  { title: 'Antibodies', color: 'bg-antibody', icon: 'modality-icon-antibody.svg', hover: 'modality-icon-hover-antibody-enzyme.svg', href: './modality/antibody', body: 'Craft mature and developable binders that avoid unwanted immunogenicity.' },
  { title: 'Enzymes', color: 'bg-enzyme', icon: 'modality-icon-enzyme.svg', hover: 'modality-icon-hover-antibody-enzyme.svg', href: './modality/enzyme', body: 'Accelerate specific catalytic conversions, even in challenging conditions.' },
  { title: 'Vaccines', color: 'bg-vaccine', icon: 'modality-icon-vaccine.svg', hover: 'modality-icon-hover-vaccine.svg', href: './modality/vaccine', body: 'Stabilize your antigens and hit therapeutic goals faster.' },
  { title: 'Peptides', color: 'bg-peptide', icon: 'modality-icon-peptide.svg', hover: 'modality-icon-hover-peptide.svg', href: './modality/peptide', body: 'Get to desired efficacy while ensuring stability.' },
]

function Card({ title, color, icon, hover, href, body }) {
  return (
    <a
      href={href}
      className="flex w-full max-w-[95%] md:max-w-none items-start md:items-center gap-6 md:gap-4 py-4 px-0 md:p-6 bg-white rounded-2xl shadow-[0_2px_4px_0_rgba(3,7,18,0.08)] no-underline"
    >
      {/* Icon box 48 r12 (phone 40 r10), ::after bottom 1px rgba(0,0,0,.08) */}
      <div className={`relative shrink-0 overflow-hidden w-10 h-10 rounded-[10px] md:w-12 md:h-12 md:rounded-xl ${color}`}>
        <img
          src={`/assets/${icon}`}
          alt=""
          className="absolute w-6 h-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-8 md:h-8 md:top-2 md:left-2 md:translate-x-0 md:translate-y-0"
        />
        {/* icon-hover layer: present on live at opacity 0, never animates (spec §8) */}
        <img src={`/assets/${hover}`} alt="" aria-hidden="true" className="absolute w-8 h-8 top-2 left-[calc(50%-16px)] opacity-0 pointer-events-none" />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-black/[0.08]" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2 md:gap-1">
        <h5 className="font-heading font-semibold text-ink text-[16px] leading-[20px] tracking-[-0.16px] md:text-[17px] md:leading-[23.8px] md:tracking-[-0.17px] lg:text-[18px] lg:leading-[25.2px] lg:tracking-[-0.18px]">{title}</h5>
        <p className="max-w-[400px] font-sans font-medium text-muted text-[14px] leading-[22.4px] md:leading-[21px] tracking-[-0.28px] lg:text-[16px] lg:leading-[25.6px] lg:tracking-[-0.32px]">{body}</p>
      </div>
    </a>
  )
}

export default function Modalities() {
  return (
    <section
      id="modalities"
      className="relative flex w-full flex-row items-center justify-center bg-white pt-20 md:px-10 md:pb-[60px] shadow-[inset_0_-1px_0_0_rgba(3,7,18,0.04)]"
    >
      <div className="flex w-full max-w-container flex-col gap-10 px-4 pb-10 md:flex-row md:items-start md:px-0 md:pt-[13px] md:pb-0 lg:gap-20 lg:pb-[13px]">
        {/* Left */}
        <div className="flex w-full flex-col items-start gap-5 md:w-px md:flex-[1.25] md:gap-10 lg:flex-1 lg:gap-[30px]">
          <div className="flex w-full flex-col gap-3 lg:gap-5">
            <Eyebrow>WORK ON ANY PROTEIN</Eyebrow>
            <h2 className="font-heading font-medium text-ink text-[32px] leading-[35.2px] tracking-[-0.64px] md:text-[48px] md:leading-[48px] md:tracking-[-1.92px] lg:text-[64px] lg:leading-[64px] lg:tracking-[-2.56px]">
              Bring any protein<br />and all properties
            </h2>
          </div>
          <div className="flex w-full flex-col gap-5 font-sans font-medium text-muted text-[16px] leading-[24px] tracking-[-0.64px] lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.8px]">
            <p>Accelerate your journey from hit identification to lead optimization and beyond. If you can measure it, you can optimize it with Cradle.</p>
            <p>This makes Cradle fit-for-purpose for teams developing therapeutics, agricultural solutions, food ingredients, and more.</p>
          </div>
          <Button href="/platform" className="w-full md:hidden">Explore Cradle Platform</Button>
          <Button href="/platform" className="hidden md:inline-flex">Explore our platform</Button>
        </div>
        {/* Right: cards */}
        <div className="flex w-full flex-col gap-0 md:w-px md:flex-1 md:gap-5 lg:gap-6 lg:pt-[50px]">
          {CARDS.map((c) => <Card key={c.title} {...c} />)}
        </div>
      </div>
    </section>
  )
}
