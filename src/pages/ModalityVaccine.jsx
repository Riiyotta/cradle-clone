import { Link } from 'react-router-dom'
import ModalityPage from '../components/modality/ModalityPage.jsx'
import {
  A, BIO, CUSTOMER_LOGOS, HERO_LOGOS, HERO_LOGO_PHONE, PROPERTY_BUTTONS, PIPELINE_BEFORE_GENERIC, GREEN_SWATCH,
  BAYER_QUOTE, PHOTO_535_WIDE_PHONE, DOCS_BUTTON, PLATFORM_BUTTON,
} from '../components/modality/shared.js'

// /modality/vaccine — specs/PAGES_A.md V1–V6
const P = `${A}/pages/modality-vaccine`
const STAPH = '/blog/staphylococcus-aureus-vaccine'

const page = {
  title: 'AI-Guided Vaccine & Antigen Engineering • Cradle',
  sections: [
    {
      type: 'textHero',
      eyebrow: 'AI-guided Vaccine & Antigen Engineering',
      eyebrowColor: 'text-[#effaf1]',
      title: 'Expressive, stable antigens. In fewer rounds.',
      lead: 'Get measurable Tₘ improvements without compromising the immune response — in fewer rounds than traditional rational approaches.',
      titleBasis: '780.7px',
      leadBasis: '459.3px',
      buttons: [{ label: 'Read vaccine case studies', to: STAPH }, { label: 'Explore platform', to: '/platform' }],
      logos: HERO_LOGOS,
      logosPhoneExtra: HERO_LOGO_PHONE,
    },
    {
      type: 'pipeline',
      sectionClass: 'gap-10 px-10 pb-20 pt-[120px] md:pb-[160px]',
      whatIf: {
        title: "Human intuition isn't built for multi-property antigen optimization.",
        paragraphs: [
          'Placeholder text describing how an antigen has to survive storage and transport, while changes that improve stability or solubility can disturb how it is presented. Fixing one property can weaken another, and changing the structure too much can reduce its usefulness.',
          'Placeholder text describing how traditional approaches work through properties one at a time, first stability and expression, then checking the immune response, then fixing what changed. Each cycle takes months, and many late programs still fall short on efficacy.',
        ],
      },
      pipeline: {
        legendA: 'Vaccine discovery before',
        legendB: 'Vaccine discovery with Cradle',
        stagesA: PIPELINE_BEFORE_GENERIC,
        stagesB: [{ label: 'Project design' }, { label: 'AI protein engineering' }, { label: 'Scale up' }],
        swatchB: GREEN_SWATCH,
        barB: '#3cab57',
        sideLabelColor: 'rgba(255,255,255,.8)',
      },
    },
    {
      type: 'features',
      title: 'From unstable antigen to thermostable candidate, faster.',
      accent: '#3cab57',
      pattern: 'h-[600px]',
      motionMode: 'column',
      pad: 'pt-[120px] pb-20 md:pb-[120px]',
      blocks: [
        {
          label: 'Fewer rounds',
          title: 'Measurable improvement, often in a single round',
          body: (
            <>
              Placeholder text describing how diverse panels of candidates explore every property at once and balance competing goals to speed up research across every stage of a program. On a <em>sample</em> antigen,{' '}
              <Link to={STAPH} className="text-[#0284c7] hover:text-[#0ea5e9]">Cradle delivered +2.5°C Tₘ in a single zero-shot round, 7× faster than the partner's rational design approach</Link>
              . No starting sequence-function dataset required.
            </>
          ),
        },
        { label: 'Better Antigens', title: 'Control conformation, epitope presentation, and stability together', body: 'Placeholder text describing how stability, presentation, expression and manufacturability are balanced in parallel rather than one after another. Keep favorable states stable, control how epitopes are presented, avoid sequences prone to aggregation and reduce modification risks.' },
        { label: 'Built for biologists', title: 'An intuitive workbench for any enzyme class', body: 'Placeholder text describing a simple interface that combines structural views with sequence insights, so no coding or data science background is required. Whether you work on one antigen or several, your team keeps full control of the overall strategy.' },
      ],
    },
    {
      type: 'band',
      sectionClass: 'gap-[65px] pb-10',
      children: [
        { type: 'mock', video: `${P}/ui-fPEYEm.mp4`, aspect: '2012 / 1080', phoneBleed: true, className: 'pt-10 md:pt-0' },
        {
          type: 'properties',
          wrapClass: 'max-w-[1360px] px-5 pb-5 pt-10 md:px-10 md:py-[120px]',
          eyebrow: 'Selected properties',
          title: 'If you can assay for it, you can optimize it with Cradle.',
          titleMax: 'md:max-w-[844.8px]',
          compactHeader: true,
          divider: true,
          lead: 'Set multiple objectives and let Cradle find variants that balance them — starting from as few as 96 variants per round.',
          buttons: PROPERTY_BUTTONS,
          cols: 5,
          items: [
            ['Immunogenicity', 'Epitope presentation, conformation (prefusion/postfusion), neutralizing antibody response'],
            ['Stability', 'Thermostability (Tm), aggregation resistance, shelf life, storage stability'],
            ['Manufacturability & Expression', 'Expression yield, construct expressibility, solubility, post-translational modification compatibility'],
            ['Formulation', 'Lyophilization compatibility, glass transition temperature (Tg)'],
            ['Structural Tractability', 'Crystallizability, ligand-bound structure formation, assay compatibility, screening compatibility'],
          ],
        },
      ],
    },
    {
      type: 'cases',
      title: '8 of the top 25 pharma companies already use Cradle.',
      logos: CUSTOMER_LOGOS,
      logoStyle: 'wide',
      featured: {
        to: STAPH,
        image: `${A}/case-staph-aureus-vaccine.png`,
        title: 'Improving Staphylococcus aureus vaccine thermostability by 2.5 °C in a single round, 7× faster than rational design',
      },
      quote: BAYER_QUOTE,
      person: { avatar: `${BIO}/avatar-oBdmCN.jpg`, name: 'Anastasia Hager, Ph.D.', role: 'Global Head of Drug Discovery Sciences, Bayer' },
    },
    {
      type: 'teams',
      title: <>Same experimental workflow. <br />Better results.</>,
      sectionClass: 'px-5 py-20 md:w-[93%] md:px-20 md:pb-20 md:pt-[120px]',
      photo: PHOTO_535_WIDE_PHONE,
      cards: [
        {
          title: 'For wet lab scientists',
          body: 'Add your domain expertise and AI-generate candidates for lab testing in just a few clicks. Upload experimental results to improve your project-specific AI automatically.',
          button: PLATFORM_BUTTON,
        },
        { title: 'For computational teams', button: DOCS_BUTTON },
      ],
    },
    {
      type: 'cta',
      line1: 'Better vaccines. Faster.',
      line2: 'Talk to the Cradle team.',
      // Live points this at an EXTERNAL typeform; the clone uses the local form.
      buttons: [{ label: 'Talk to sales', to: '/get-started' }, { label: 'Read the whitepaper', to: '/whitepaper' }],
      sectionClass: 'pt-[120px]',
    },
  ],
}

export default function ModalityVaccine() {
  return <ModalityPage {...page} />
}
