import ModalityPage from '../components/modality/ModalityPage.jsx'
import {
  A, BIO, CUSTOMER_LOGOS, HERO_LOGOS, HERO_LOGO_PHONE, PROPERTY_BUTTONS, PIPELINE_BEFORE_GENERIC, PIPELINE_CRADLE_ANTIBODY,
  GREEN_SWATCH, GREEN_BAR, BAYER_QUOTE, PHOTO_535_WIDE_PHONE, DOCS_BUTTON, PLATFORM_BUTTON,
} from '../components/modality/shared.js'

// /modality/peptide — specs/PAGES_A.md P1–P7
const P = `${A}/pages/modality-peptide`

const page = {
  title: 'AI-Guided Peptide Engineering • Cradle',
  sections: [
    {
      type: 'textHero',
      eyebrow: 'AI-guided Peptide Engineering',
      eyebrowColor: 'text-[#effaf1]',
      title: 'Optimize peptides without protein-scale data.',
      lead: 'Placeholder text describing how the platform learns from small datasets and tight sequence limits, helping teams reach candidates that meet their requirements, even late in development.',
      titleBasis: '780.7px',
      leadBasis: '459.3px',
      buttons: [{ label: 'Read peptide case studies', to: '/modality/peptide#case' }, { label: 'Explore platform', to: '/platform' }],
      logos: HERO_LOGOS,
      logosPhoneExtra: HERO_LOGO_PHONE,
      molecule: `${P}/hero-mUg9uM.svg`,
    },
    {
      type: 'pipeline',
      sectionClass: 'gap-[60px] px-10 pb-20 pt-[120px] md:pb-[160px]',
      whatIf: {
        layout: 'columns',
        title: <>Peptides aren't <em>just</em> small proteins. Your tools shouldn't treat them like they are.</>,
        paragraphs: [
          'Placeholder text describing how common prediction tools were built for larger proteins, and public data for peptides is sparse. Peptide programs also bring constraints that protein work does not, such as unusual building blocks, chemical modifications and late changes where sequence flexibility is limited and several properties still need to be met at once.',
          'Placeholder text describing how the platform helps scientists improve peptides faster by learning from in-house assay data and building project-specific models.',
        ],
      },
      pipeline: {
        legendA: 'Peptide discovery before',
        legendB: 'Peptide discovery with Cradle',
        stagesA: PIPELINE_BEFORE_GENERIC,
        stagesB: PIPELINE_CRADLE_ANTIBODY,
        swatchB: GREEN_SWATCH,
        barB: GREEN_BAR,
      },
    },
    {
      type: 'features',
      title: 'Move faster from a weak lead to a candidate clearing every constraint.',
      accent: '#3cab57',
      pad: 'pt-[120px] pb-20 md:pb-[160px]',
      blocks: [
        { label: 'Fewer rounds', title: 'Multi-property optimization with peptide-scale data', body: 'Placeholder text describing how binding, stability, solubility and developability are balanced in one campaign, using the data peptide programs have.' },
        { label: 'Better peptides', title: 'Reach peptides that clear tight, simultaneous constraints', body: 'Placeholder text describing how the platform reaches peptide variants that other approaches miss, while respecting tight limits on sequence changes. Teams can set the positions that must stay fixed and still improve several properties together in each round of design and testing.' },
        { label: 'Built for scientists', title: 'An intuitive workbench for any peptide format', body: 'Your team runs campaigns directly, no coding required. Your sequences and models stay your exclusive IP.' },
      ],
    },
    {
      type: 'band',
      sectionClass: 'gap-[65px] border-b border-white/[0.08] px-5 pb-10 md:px-10',
      children: [
        { type: 'mock', image: `${P}/ui-DmrQiF.png`, aspect: '3020 / 1642', frameMax: 'md:max-w-[1117px]', phoneBleed: true, className: 'pt-10 md:pt-0' },
        {
          type: 'properties',
          wrapClass: 'max-w-container pb-5 pt-10 md:py-[120px]',
          eyebrow: 'Selected peptide properties',
          title: 'If you can assay for it, you can optimize it with Cradle.',
          titleMax: 'md:max-w-[844.8px]',
          compactHeader: true,
          divider: true,
          lead: 'Set multiple objectives and let Cradle find variants that balance them — starting from as few as 96 variants per round.',
          buttons: PROPERTY_BUTTONS,
          cols: 4,
          items: [
            ['Potency', 'EC50, IC50, KD, on-rate, off-rate, receptor activation'],
            ['Selectivity', 'Off-target binding, receptor specificity, cross-reactivity'],
            ['Stability', 'Metabolic stability, plasma half-life, proteolytic resistance, thermostability (Tm)'],
            ['Developability', 'Expression, solubility, aggregation, synthetic accessibility'],
          ],
        },
      ],
    },
    {
      type: 'cases',
      id: 'case',
      title: 'Trusted by 8 of the top 25 pharma companies and industrial R&D leaders.',
      titleMax: '',
      gap: 'md:gap-20',
      headGap: 'md:gap-6',
      logos: CUSTOMER_LOGOS,
      logoStyle: 'wide',
      logosCentered: true,
      featured: {
        to: '/blog/therapeutic-peptides',
        image: `${A}/case-therapeutic-peptides.png`,
        title: 'Engineering therapeutic peptides with 50% success rate under tight multi-property constraints, 5× faster than prior efforts',
      },
      quote: BAYER_QUOTE,
      person: { avatar: `${BIO}/avatar-oBdmCN.jpg`, name: 'Anastasia Hager, Ph.D.', role: 'Global Head of Drug Discovery Sciences, Bayer' },
    },
    {
      type: 'teams',
      title: 'Cradle works with peptide-scale data and constraints.',
      gradient: false,
      sectionClass: 'px-5 py-20 md:px-20 md:pb-20 md:pt-[120px]',
      photo: PHOTO_535_WIDE_PHONE,
      cards: [
        { title: 'For peptide engineers', button: PLATFORM_BUTTON },
        { title: 'For computational teams', button: DOCS_BUTTON },
      ],
    },
    {
      type: 'cta',
      line1: 'Better peptides. Faster.',
      line2: 'Talk to the Cradle team.',
      // Live points this at an EXTERNAL typeform; the clone uses the local form.
      buttons: [{ label: "I'm interested", to: '/get-started' }, { label: 'Read the whitepaper', to: '/whitepaper' }],
      sectionClass: 'pt-[120px]',
    },
  ],
}

export default function ModalityPeptide() {
  return <ModalityPage {...page} />
}
