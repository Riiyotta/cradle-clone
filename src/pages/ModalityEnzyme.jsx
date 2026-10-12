import ModalityPage from '../components/modality/ModalityPage.jsx'
import { A, PROPERTY_BUTTONS, PIPELINE_BEFORE_GENERIC, PHOTO_635 } from '../components/modality/shared.js'

// /modality/enzyme — specs/PAGES_A.md E1–E8 (accent sky #0ea5e9)
const P = `${A}/pages/modality-enzyme`
const IND = `${A}/pages/solutions-industrial`

const page = {
  title: 'AI-Guided Enzyme Engineering • Cradle',
  sections: [
    {
      type: 'textHero',
      topPad: 'md:pt-[240px]',
      eyebrow: 'AI-guided Enzyme Optimization',
      title: 'Optimize all your enzyme properties in the same campaign',
      lead: 'Placeholder text describing how one campaign can improve several enzyme properties at the same time, trained on your own assay data, so you can reach a suitable variant in fewer rounds.',
      leadColor: 'text-white/80',
      titleBasis: '744px',
      leadBasis: '496px',
      video: `${P}/content-vqPB1r.jpg`,
      buttons: [{ label: 'Read enzyme case studies', to: '/modality/enzyme#case' }, { label: 'Explore platform', to: '/platform' }],
      logos: ['UekOaZ', '3xsUSq', '7vYN5L'].map((h) => `${IND}/logos-${h}.svg`),
      logoCols: 3,
    },
    {
      type: 'problem',
      title: 'Every enzyme engineer has seen the pattern…',
      paragraphs: [
        'Placeholder text describing a familiar situation: a promising variant improves one property while another one drops, and a strong result does not hold under the conditions that matter. Combining the best single changes does not always help, and measurements can shift between batches.',
        'Placeholder text describing how common approaches tend to improve one property per round, miss distant positions that drive real performance, and overlook how individual changes interact with each other.',
        'Cradle was built for teams past the screening hit. The goal is to get you to a variant that holds up at scale.',
      ],
    },
    {
      type: 'pipeline',
      bg: 'bg-[linear-gradient(#030712_20%,#082f49_100%)] border-t border-white/[0.08]',
      sectionClass: 'px-4 pb-10 pt-10 md:px-10 md:pb-[160px] md:pt-[120px]',
      pipeline: {
        legendA: 'Enzyme discovery before',
        legendB: 'Enzyme discovery with Cradle',
        stagesA: PIPELINE_BEFORE_GENERIC,
        stagesB: [{ label: 'Project design' }, { label: 'AI protein engineering' }, { label: 'Scale up' }],
        swatchB: '#0ea5e9',
        barB: '#0ea5e9',
        sideLabelColor: 'rgba(255,255,255,.8)',
        swatchClass: 'h-2 w-5 md:h-3 md:w-8',
        animated: false, // E3: already compressed and static
      },
    },
    {
      type: 'features',
      title: 'Move faster from screening hit to scalable enzyme.',
      accent: '#0ea5e9',
      pad: 'pt-[60px] pb-20 md:py-[120px]',
      blocks: [
        { label: 'Fewer rounds', title: 'Stop running dozen-round directed evolution campaigns', body: 'Placeholder text describing how the platform copes with everyday lab conditions such as noisy assays and variation between batches. It learns from each round of results, so teams can move from early hits to strong variants in a handful of rounds instead of many long campaigns.' },
        { label: 'Better enzymes', title: 'Optimize for activity, stability, and expression in parallel', body: 'Placeholder text describing how teams no longer need to choose between a variant with high activity and one with good stability. Several properties are balanced in the same round, and each new set of candidates reflects what was learned before, so progress on one goal does not quietly undo the progress made on the others, even as the campaign moves toward its final rounds.' },
        { label: 'Built for biologists', title: 'An intuitive workbench for any enzyme class', body: 'Placeholder text describing a simple interface that combines structural views with sequence insights, so biologists can run campaigns without writing code. Teams keep full control of the strategy, choose which positions to explore, and decide which of the candidates move forward to the lab for testing.' },
      ],
    },
    {
      type: 'band',
      sectionClass: 'gap-20 px-5 pb-[60px] pt-10 md:px-10 md:pb-[120px] md:pt-20',
      children: [
        { type: 'mock', video: `${P}/ui-tWumED.mp4`, aspect: '2012 / 1080', phoneBleed: true, className: 'max-w-container' },
        {
          type: 'properties',
          wrapClass: 'max-w-container',
          eyebrow: 'Selected properties',
          title: 'If you can assay it, you can optimize it with Cradle.',
          lead: "Set multiple objectives and let your team's project-specific model find sequences that balance them.",
          buttons: PROPERTY_BUTTONS,
          cols: 4,
          items: [
            ['Activity', 'Catalytic turnover, kcat, specific activity, substrate conversion'],
            ['Stability', 'Thermostability (Tₘ), pH tolerance, solvent tolerance, shelf life'],
            ['Selectivity', 'Product selectivity, substrate specificity, enantioselectivity'],
            ['Application-specific', 'Fermentation robustness, formulation compatibility'],
          ],
        },
      ],
    },
    {
      type: 'cases',
      id: 'case',
      title: <>Wet lab validated. <br className="hidden md:inline" />Trusted at industrial scale.</>,
      titleMax: '',
      quote: {
        before: '"Placeholder quote describing how a partnership with Cradle brings AI directly into the way a team innovates, helping our teams shorten development time across many programs and ',
        highlight: 'move new products to market faster',
        after: '."',
      },
      person: { avatar: `${P}/avatar-drK6tN.png`, name: 'Claus Fuglsang Crone', role: 'Chief Scientific Officer, Novonesis' },
      cards: [
        { to: '/blog/keasling-qs21', image: `${A}/case-keasling-qs21.png`, title: 'Using AI to produce vaccine adjuvants without cutting down rainforest' },
        { to: '/blog/haloalkane-dehalogenase-thermostability', image: `${P}/variant-1-Oy964Y.png`, title: 'Improving haloalkane dehalogenase thermostability by +20 °C while enhancing activity and expression' },
        { to: '/blog/align-to-innovate-benchmark', image: `${P}/variant-1-ln7s2S.jpg`, title: "'Align to Innovate' benchmark: state-of-the-art enzyme engineering with fully-automated GenAI" },
        { to: '/blog/case-study-combining-ai-generated-mutations-with-human-expertise-for-better-enzyme-designs', image: `${P}/variant-1-7wk2YA.jpg`, title: 'Case study: design better P450s 4X faster by combining AI-generated mutations with human expertise' },
      ],
    },
    {
      type: 'teams',
      layout: 'left',
      title: <>Same experimental <br className="hidden md:inline" />workflow — better results.</>,
      sectionClass: 'px-5 pb-20 pt-[60px] md:px-10 md:pb-[140px] md:pt-[120px]',
      photo: PHOTO_635,
      cards: [{ title: 'Wet lab' }, { title: 'Computational' }],
    },
    {
      type: 'cta',
      line1: 'Better enzymes start with Cradle',
      h1Class: 'md:max-w-[560px]',
      stacked: true,
      buttons: [{ label: "Let's talk", to: '/get-started' }, { label: 'Read the whitepaper', to: '/whitepaper' }],
      sectionClass: 'pt-20 md:pt-[120px]',
    },
  ],
}

export default function ModalityEnzyme() {
  return <ModalityPage {...page} />
}
