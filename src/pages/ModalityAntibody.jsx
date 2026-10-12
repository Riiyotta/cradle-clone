import ModalityPage from '../components/modality/ModalityPage.jsx'
import {
  A, CUSTOMER_LOGOS, PROPERTY_BUTTONS, PIPELINE_CRADLE_ANTIBODY, GREEN_SWATCH, GREEN_BAR, BAYER_QUOTE,
  PHOTO_535, DOCS_BUTTON, PLATFORM_BUTTON,
} from '../components/modality/shared.js'

// /modality/antibody — specs/PAGES_A.md M1–M8
const P = `${A}/pages/modality-antibody`

const page = {
  title: 'AI-Guided Antibody Development • Cradle',
  sections: [
    {
      type: 'tickerHero',
      rows: [
        { items: ['Specificity', 'Thermostability', 'Aggregation', 'Expression'], speed: 35 },
        { items: ['Immunogenicity', 'Humanness', 'Hydrophobicity', 'Cross-reactivity'], speed: 25 },
        { items: ['Thermostability', 'Aggregation', 'Specificity'], speed: 20 },
        { items: ['Cross-reactivity', 'Hydrophobicity', 'Humanness', 'Immunogenicity'], speed: 40 },
      ],
      iconMask: `${P}/datauri-hero-4156f4.svg`,
      eyebrow: 'AI-guided antibody Development',
      title: 'Make your complex biologics happen.',
      lead: 'Get to clinically viable antibody candidates faster. Meet every property in your TPP, with fewer programs lost along the way.',
      buttons: [{ label: 'Talk to sales', to: '/get-started' }, { label: 'Read the Cradle whitepaper', to: '/whitepaper' }],
    },
    {
      type: 'pipeline',
      sectionClass: 'gap-10 px-10 pb-10 pt-[120px] md:pb-20',
      whatIf: {
        title: 'The next generation of biologics needs more than affinity',
        paragraphs: ['Programs today need molecules that perform across many measures at once, not only one. Binding has to hold while stability, expression and safety stay within range. Each new format brings its own trade-offs, and every round of testing adds time. Teams need a way to balance these goals together, round after round, without losing ground.'],
      },
      pipeline: {
        legendA: 'Antibody development before',
        legendB: 'Antibody development with Cradle',
        stagesA: [
          { label: 'Target identification', phone: 'Target ID' },
          { label: 'Target to hit' }, { label: 'Hit to lead' },
          { label: 'Lead optimization', phone: 'Lead Op' },
          { label: 'Preclinical' },
        ],
        stagesB: PIPELINE_CRADLE_ANTIBODY,
        swatchB: GREEN_SWATCH,
        barB: GREEN_BAR,
      },
    },
    {
      type: 'features',
      title: 'Move faster from screening hit to scalable antibody.',
      accent: '#3cab57',
      pattern: 'aspect-square',
      pad: 'pt-[120px] pb-20 md:pb-[160px]',
      blocks: [
        { label: 'Fewer rounds', title: 'Reach your full target product profile 2-12x faster', body: 'Placeholder text describing how several properties are improved together in each round, so programs reach their full target profile sooner, with far fewer slow and costly cycles of testing in your own wet lab.' },
        { label: 'Better Antibodies', title: "Explore sequence space your intuition wouldn't reach.", body: 'Placeholder text describing how the platform proposes varied candidates that teams might not consider on their own, widening the search while keeping every design grounded in the data your lab has already measured and in the constraints your program has set.' },
        { label: 'Built for scientists', title: 'An intuitive workbench for antibody scientists', body: 'Placeholder text describing a simple interface where scientists set goals and review results directly, while computational teams extend the same workflow through an interface.' },
      ],
    },
    {
      type: 'band',
      sectionClass: 'gap-[10px]',
      children: [
        { type: 'mock', video: `${P}/ui-RQcVIw.mp4`, aspect: '2016 / 1080', phoneBleed: true },
        {
          type: 'properties',
          wrapClass: 'max-w-[1200px] px-5 pb-[60px] pt-10 md:px-10 md:pb-[120px] md:pt-20',
          eyebrow: 'Selected properties',
          title: 'If you can measure it, you can optimize it with Cradle.',
          lead: "Set multiple objectives and let your team's project-specific model find candidates that balance them.",
          buttons: PROPERTY_BUTTONS,
          cols: 5,
          items: [
            ['Binding', 'KD, kon, koff, specificity, cross-reactivity, pH-dependent binding'],
            ['Stability', 'Thermostability (Tm), aggregation, viscosity'],
            ['Manufacturability', 'Expression yield, hydrophobicity (HIC)'],
            ['Immunogenicity', 'Humanness, T-cell epitope risk, MHC binding'],
            ['Developability', 'PTM liabilities (isomerization, deamidation, oxidation), polyspecificity'],
          ],
        },
        {
          type: 'cases',
          title: '8 of the top 25 pharma companies already use Cradle.',
          titleMax: 'max-w-[280px] md:max-w-[1024px]',
          logos: CUSTOMER_LOGOS,
          quote: BAYER_QUOTE,
          // Live wraps the role in a broken link (`https://obal He`); rendered as plain text here.
          person: { avatar: `${A}/pages/solutions-biopharma/avatar-oBdmCN.jpg`, name: 'Anastasia Hager, Ph. D.', role: 'Global Head of Drug Discovery Sciences, Bayer' },
          cards: [
            { to: '/blog/igg-campaign', image: `${A}/case-igg-campaign.png`, title: 'Rescuing a stalled IgG campaign: 10 candidates meeting potency and developability criteria in 3 rounds' },
            { to: '/blog/polyspecific-anti-venom-vhhs', image: `${P}/variant-1-rkmKWh.png`, title: 'Engineering polyspecific anti-venom VHHs with sub-nanomolar binding and high thermostability' },
            { to: '/blog/polyspecific-vhhs-sars-cov-2', image: `${P}/variant-1-IZZ2BY.png`, title: 'Engineering polyspecific VHHs with picomolar binding to SARS-CoV-2 wild type and Omicron' },
            { to: '/blog/adaptyv2', image: `${P}/variant-1-oPewEN.png`, title: 'Optimizing Cetuximab: An update on our win of the Adaptyv 2024 competition' },
          ],
        },
      ],
    },
    {
      type: 'teams',
      title: <>Same experimental workflow. <br />Better results.</>,
      sectionClass: 'p-10 md:px-0 md:py-[100px]',
      photo: PHOTO_535,
      cards: [
        { title: 'For scientists', button: PLATFORM_BUTTON },
        { title: 'For computational teams', button: DOCS_BUTTON },
      ],
    },
    {
      type: 'cta',
      line1: 'Ready to get to clinical faster?',
      line2: 'Talk to the Cradle team.',
      buttons: [{ label: "I'm interested", to: '/get-started' }, { label: 'Read the whitepaper', to: '/whitepaper' }],
      phoneWrapper: true,
      sectionClass: 'pt-[120px]',
    },
  ],
}

export default function ModalityAntibody() {
  return <ModalityPage {...page} />
}
