import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import NewsletterForm from '../components/resources/NewsletterForm.jsx'
import SubscribeModal from '../components/resources/SubscribeModal.jsx'
import { placeholder, placeholderChars } from '../components/resources/placeholder.js'

// PAGES_A /case — K1 header + press logo grid · K2 case grid + sticky subscribe card · K3 newsletter band

const A = '/assets/'
const ME = '/assets/pages/modality-enzyme/'
const MA = '/assets/pages/modality-antibody/'

// [logo, height, kind]: kind 'ext' = live tile linked to another domain (rendered without href),
// 'int' = same-site link, null = no link on live
const PRESS = [
  ['customer-logo-novonesis.svg', 42, 'ext'],
  ['customer-logo-novo-nordisk.svg', 42, 'ext'],
  ['customer-logo-jnj.svg', 42, null],
  ['customer-logo-bayer.svg', 42, 'int'],
  ['customer-logo-abbvie.svg', 21.8, null],
  ['customer-logo-hansa.svg', 42, 'ext'],
  ['customer-logo-illumina.svg', 26.7, null],
  ['customer-logo-csl.svg', 42, null],
  ['customer-logo-lundbeck.svg', 42, 'ext'],
  ['customer-logo-ultragenyx.svg', 42, null],
  ['customer-logo-repligen.svg', 26.5, null],
  ['customer-logo-corteva.svg', 42, null],
]

const CASES = [
  ['Enzyme', 'Using AI to produce vaccine adjuvants without cutting down rainforest', '/blog/keasling-qs21', A + 'case-keasling-qs21.png'],
  ['Peptide', 'Engineering therapeutic peptides with 50% success rate under tight multi-property constraints, 5× faster than prior efforts', '/blog/therapeutic-peptides', A + 'case-therapeutic-peptides.png'],
  ['Vaccine', 'Improving Staphylococcus aureus vaccine thermostability by 2.5 °C in a single round, 7× faster than rational design', '/blog/staphylococcus-aureus-vaccine', A + 'case-staph-aureus-vaccine.png'],
  ['Antibody', 'Rescuing a stalled IgG campaign: 10 candidates meeting potency and developability criteria in 3 rounds', '/blog/igg-campaign', A + 'case-igg-campaign.png'],
  ['Enzyme', 'Improving haloalkane dehalogenase thermostability by +20 °C while enhancing activity and expression', '/blog/haloalkane-dehalogenase-thermostability', ME + 'variant-1-Oy964Y.png'],
  ['Antibody', 'Engineering polyspecific anti-venom VHHs with sub-nanomolar binding and high thermostability', '/blog/polyspecific-anti-venom-vhhs', MA + 'variant-1-rkmKWh.png'],
  ['Antibody', 'Engineering polyspecific VHHs with picomolar binding to SARS-CoV-2 wild type and Omicron', '/blog/polyspecific-vhhs-sars-cov-2', MA + 'variant-1-IZZ2BY.png'],
  ['Antibody', 'Optimizing Cetuximab: An update on our win of the Adaptyv 2024 competition', '/blog/adaptyv2', MA + 'variant-1-oPewEN.png', "How Cradle's 12 designs would have ranked top-12 in Adaptyv's protein design competition"],
  ['Antibody', '8x improvement in EGFR binding affinity: winning the Adaptyv Bio protein design competition', '/blog/adaptyv-protein-design-competition', '/assets/pages/case/featured-top-4UdCTb.jpg'],
  ['Enzyme', "'Align to Innovate' benchmark: state-of-the-art enzyme engineering with fully-automated GenAI", '/blog/align-to-innovate-benchmark', ME + 'variant-1-ln7s2S.jpg'],
  ['Enzyme', 'Case study: design better P450s 4X faster by combining AI-generated mutations with human expertise', '/blog/case-study-combining-ai-generated-mutations-with-human-expertise-for-better-enzyme-designs', ME + 'variant-1-7wk2YA.jpg'],
]

const HOVER_EASE = [0.12, 0.23, 0.5, 1]

function BackChevron() {
  // inline-content-d6b886.svg referenced a <use> symbol; symbol copied from the live page
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden className="shrink-0">
      <path d="M 7.5 15 L 0 7.5 L 7.5 0" fill="none" stroke="#2d66f8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(7.5 4.5)" />
    </svg>
  )
}

function PressTile({ logo, h, kind }) {
  const cls = 'fborder flex h-[95.4px] items-center justify-center rounded-[17px] bg-white transition-shadow duration-100 ease-[cubic-bezier(0.12,0.23,0.5,1)]'
  const img = <img src={A + logo} alt="" className="w-[117px] rounded-lg object-contain opacity-60" style={{ height: h }} />
  if (kind === 'int') return <Link to="/blog/bayer-collaboration" className={`${cls} hover:shadow-[rgba(0,0,0,.04)_0_0_6px]`}>{img}</Link>
  if (kind === 'ext') return <span className={`${cls} hover:shadow-[rgba(0,0,0,.04)_0_0_6px]`}>{img}</span>
  return <div className={cls}>{img}</div>
}

function CaseCard({ tag, title, to, img, excerpt, i }) {
  return (
    <motion.div initial="rest" whileHover="hover" animate="rest" className="min-w-0">
      <Link to={to} className="flex h-full flex-col gap-4 no-underline">
        <div className="relative aspect-[1.92] w-full overflow-hidden rounded-lg">
          <motion.img
            src={img} alt="" className="h-full w-full object-cover"
            variants={{ rest: { scale: 1 }, hover: { scale: 1.02 } }}
            transition={{ duration: 0.1, ease: HOVER_EASE }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-solid border-[rgba(27,27,177,.04)]" />
        </div>
        <div className="flex flex-col gap-3">
          <p className="m-0 font-sans text-[9px] font-bold uppercase leading-[11.7px] tracking-[1.08px] text-gray-400 md:text-[11px] md:leading-[14.3px] md:tracking-[-0.44px]">{tag}</p>
          <h5 className="m-0 font-heading text-[16px] font-semibold leading-5 tracking-[-0.16px] text-gray-800 md:text-[18px] md:leading-[25.2px] md:tracking-[-0.18px]">{title}</h5>
          <p className="m-0 line-clamp-3 font-sans text-[13px] font-medium leading-[20.8px] text-muted">{excerpt ?? placeholder(40, i)}</p>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Case() {
  const [modal, setModal] = useState(false)
  return (
    <div className="flex w-full flex-col items-center">
      {/* K1 + K2: content max-w 1280, padding 144 40 80 (phone 100 20 0), gap 40 */}
      <div className="flex w-full max-w-container flex-col gap-10 px-5 pt-[100px] md:px-10 md:pb-[103.4px] md:pt-[144px]">
        {/* K1 header row */}
        <div className="flex flex-col gap-10 md:flex-row md:pb-20">
          <div className="flex flex-col items-start gap-8 md:w-[580px] md:shrink">
            <Link to="/blog" className="flex items-center gap-1 no-underline">
              <BackChevron />
              <span className="font-sans text-[14px] font-medium leading-[22.4px] tracking-[-0.28px] text-gray-800 md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]">Back to blog</span>
            </Link>
            <h2 className="m-0 font-heading text-[32px] font-medium leading-[35.2px] tracking-[-0.64px] text-gray-800 md:text-[64px] md:leading-[64px] md:tracking-[-2.56px]">
              Learn how scientists use Cradle
            </h2>
            <p className="m-0 font-sans text-[16px] font-medium leading-6 tracking-[-0.64px] text-muted md:text-[20px] md:leading-[30px] md:tracking-[-0.8px]">
              {placeholderChars(199, 2)}
            </p>
            <Link
              to="/get-started"
              className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-lg bg-white px-8 font-sans text-[13px] font-semibold leading-[15.6px] tracking-[-0.13px] text-ink no-underline shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)] md:text-[14px] md:leading-[16.8px] md:tracking-[-0.14px]"
            >
              Talk to Sales
            </Link>
          </div>
          {/* PressLogoGrid — appear config not in Framer appear script; generic fade-up used */}
          <motion.div
            className="hidden grid-cols-3 gap-3 self-start md:grid md:w-[580px] md:shrink"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {PRESS.map(([logo, h, kind]) => <PressTile key={logo} logo={logo} h={h} kind={kind} />)}
          </motion.div>
        </div>

        {/* K2 case grid + sticky subscribe card */}
        <div className="flex items-start gap-16">
          <div className="grid min-w-0 flex-1 grid-cols-1 gap-y-10 md:auto-rows-fr md:grid-cols-2 md:gap-x-5 lg:max-w-[777.1px]">
            {CASES.map(([tag, title, to, img, excerpt], i) => (
              <CaseCard key={to} i={i} tag={tag} title={title} to={to} img={img} excerpt={excerpt} />
            ))}
          </div>
          <aside className="sticky top-20 hidden w-[358.9px] shrink-0 flex-col gap-5 rounded-2xl bg-white px-6 pb-[27px] pt-6 shadow-[rgba(0,0,0,.08)_0_1px_8px_0] lg:flex">
            <p className="m-0 text-balance text-center font-sans text-[16px] font-semibold leading-[20.8px] text-gray-800">
              Subscribe to new case studies and other Cradle updates
            </p>
            <div className="pb-5">
              <NewsletterForm id="nl-side" />
            </div>
          </aside>
        </div>
      </div>

      {/* K3 newsletter band */}
      <section className="mt-16 flex h-[506.4px] w-full flex-col items-center justify-center border-t border-solid border-black/[.08] bg-gray-50 px-5 py-[54px] md:mt-0 md:h-auto md:p-20">
        <h3 className="m-0 text-center font-heading text-[24px] font-medium leading-[28.8px] tracking-[-0.48px] text-ink md:text-[32px] md:leading-[38.4px] md:tracking-[-0.64px]">
          Subscribe to updates
        </h3>
        <p className="m-0 mt-[9.6px] max-w-[400px] text-center font-sans text-[16px] font-medium leading-6 tracking-[-0.64px] text-muted md:text-[20px] md:leading-[30px] md:tracking-[-0.8px]">
          Get new posts and other Cradle updates directly to your inbox. No spam :)
        </p>
        <button
          type="button"
          onClick={() => setModal(true)}
          className="mt-[31.4px] h-12 w-[240px] cursor-pointer rounded-xl border-0 bg-brand px-6 font-sans text-[14px] font-semibold leading-[18.2px] text-white transition-colors duration-100 ease-[cubic-bezier(0.12,0.23,0.5,1)] hover:bg-[#0057ba] md:text-[16px] md:leading-[20.8px]"
        >
          Subscribe
        </button>
      </section>
      <SubscribeModal open={modal} onClose={() => setModal(false)} />
    </div>
  )
}
