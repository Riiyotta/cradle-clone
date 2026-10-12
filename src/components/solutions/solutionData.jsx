import { AntibodyGlyph, PeptideGlyph, VaccineGlyph, ph, phc } from './primitives.jsx'

// Copy/asset/colour config for the shared SolutionPage template (specs/PAGES_A.md B1–B8, I1–I8).
// Short UI text is verbatim; long paragraphs the spec gives as word counts use ph(n) placeholder copy.
// ModalityTabs panels the spec did not capture (Peptides/Vaccines, Binders/Peptides) were read from the live
// page: titles verbatim, bodies ≤25 words verbatim, longer bodies placeholder.

const BIO = '/assets/pages/solutions-biopharma/'
const IND = '/assets/pages/solutions-industrial/'
const W = (a) => `rgba(255,255,255,${a})`

const item = (title, body) => ({ title, body })

export const biopharma = {
  accent: '#3cab57',
  fileColor: '#266f38',
  glow: 'rgba(60,171,87,.5)',
  video: `${BIO}img-GJxfO9.mp4`,
  hero: {
    layout: 'biopharma',
    eyebrow: 'BIOPHARMA',
    eyebrowGlyph: `${BIO}datauri-antibody-55a612.svg`,
    title: 'AI-assisted drug discovery for any biologic',
    titleGradient: 'linear-gradient(270deg, rgba(255,255,255,.7) 0%, #fff 40%)',
    lead: <>Trusted by scientists at Novo Nordisk, argenx,<br />AbbVie, Johnson & Johnson, and more</>,
    uiImage: `${BIO}data-v0H0BM.png`,
  },
  logos: {
    variant: 'biopharma',
    logos: ['LY569W', '327vcQ', 'EqXQcN', 'ukg0z4', 'qzqK7o', 'z1e1uA', 'oGv9fs', 'ENCnbk', 'H1JIZo', 'v65Tr9'].map((k) => `${BIO}logos-${k}.svg`),
  },
  pipeline: {
    beforeTitle: 'Drug discovery before',
    beforeLabels: ['Target identification', 'Target to hit', 'Hit to lead', 'Lead optimization', 'Preclinical'],
    beforeLabelsPhone: ['Target ID', 'Target to hit', 'Hit to lead', 'Lead Op', 'Preclinical'],
    beforeColorsPhone: [W(0.8), W(0.6), W(0.6), '#9ca3af', W(0.6)],
    cradleTitle: 'Drug discovery with Cradle',
    cradleSwatch: 'linear-gradient(270deg, #61c779 0%, #266f38 100%)',
    cradleBar: 'linear-gradient(270deg, #61c779 0%, #3cab57 100%)',
    cradleLabels: ['Target identification', <>AI-assisted discovery<br />and optimization</>, 'Preclinical'],
    cradleColors: [W(0.6), '#fff', W(0.6)],
    cradleLabelsPhone: ['Target ID', 'AI Protein Engineering', 'Preclinical'],
    cradleColorsPhone: [W(0.8), '#fff', W(0.6)],
  },
  timeline: {
    title: ['Meet your new AI-assisted', 'therapeutics pipeline'],
    titlePhone: 'Your new AI-assisted therapeutics pipeline',
    lead: phc(179, 0),
    blocks: [
      {
        title: <>Goodbye sequential,<br /> hello simultaneous</>,
        lead: 'Generate proteins that perform better across multiple properties, in every design cycle.',
        toggles: ['Affinity', 'Specificity', 'Stability'],
        features: [
          item('Optimize multiple objectives at once', phc(160, 1)),
          item('De-risk earlier', phc(188, 2)),
          item('Design for real-world function', phc(181, 3)),
        ],
        featureCls: ['md:max-w-[360px]', 'md:max-w-[360px]', 'md:max-w-[360px] md:pl-5'],
      },
      {
        title: <>Train Cradle across<br className="hidden md:inline" /> your datasets</>,
        lead: 'Connect all your experimental results in one place and train custom AI to learn more from your data.',
        files: ['HER2_binding_affinity.csv', 'Cell_proliferation_inhibition.xlsx', 'ADCC_activity_results.csv', 'Thermal_stability_DSC.csv', 'Aggregation_stress_test.xlsx', 'Solubility_form_screen.csv', 'Expression_yield_CHO.xlsx', 'Epitope_mapping_data.xlsx'],
        features: [
          item('Works with any format and assay', phc(163, 0)),
          item('Train AI throughout your program', phc(244, 1)),
          item('No historical data? No problem.', 'Start a new program with as little data as a single sequence.'),
        ],
        featureCls: ['md:max-w-[360px] md:pl-[2px]', '', 'md:max-w-[360px] md:pl-5'],
      },
      {
        title: <>Protein design at any<br /> level of expertise</>,
        lead: 'Use Cradle with simple defaults, or set advanced design requirements based on your in-house expertise.',
        image: `${BIO}benefits-wvZQ9s.png`,
        tileHPhone: 'h-[250px]',
        features: [
          { ...item('Simple workflows', phc(203, 2)), lines: [5, 4] },
          item('Mutations where you want them', phc(272, 3)),
          item('AI your whole team understands.', phc(170, 0)),
        ],
        featureCls: ['', '', 'md:pl-5'],
      },
    ],
  },
  modalities: {
    title: 'Works on any biologic and all properties',
    lead: phc(150, 1),
    ctaBody: phc(172, 2),
    tabs: [
      {
        label: 'Antibodies',
        panelH: [1293.8, 682.3],
        icon: <AntibodyGlyph className="h-6 w-6" />,
        items: [
          item('A flexible starting point for your program', 'Antibody projects can be started from a single weak binder sequence (see our participation in the Adaptyv competition) or existing datasets.'),
          item('Affinity maturation with developability in mind', 'Improve binding by introducing targeted mutations in CDRs or framework regions—without sacrificing stability, manufacturability, or other key developability traits.'),
          item('Maximum value from discovery libraries', phc(249, 3)),
          item('Early liability mitigation', phc(215, 0)),
          item('Optimize for efficacy, not just binding', 'Beyond binding, optimize efficacy using data from functional assays including cell surface binding, reporter signaling, T-Cell activation, or cAMP assays.'),
          item('Set antibody-specific objectives', 'Set configurable objectives when generating sequences. These can be absolute or relative - think on-rates, off-rates, preferential binding, specificity, cross-reactivity, and more.'),
          item('Fine-grained control over new mutations', phc(231, 1)),
          item('Support for diverse antibody formats', 'Formats that are within scope for Cradle include antibody fragments (VHH, scFv, Fab), full-length IgG, as well as bi- or multispecifics, and Antibody Drug Conjugates.'),
        ],
      },
      {
        label: 'Peptides',
        icon: <PeptideGlyph className="h-6 w-[25px]" />,
        items: [
          item('Optimize for efficacy and developability in parallel', 'Use Cradle to generate highly active agonists or potent antagonists while simultaneously improving properties such as stability, half-life, solubility, and bioavailability, including cell penetration.'),
          item('Supplement your discovery libraries', 'Train models on screening data from early discovery campaigns and use Cradle to generate additional candidates.'),
          item('Define relevant objectives', 'Steer towards your program goals by setting concrete optimization objectives. These may be absolute values for EC50, IC50 or relative values.'),
          item('Generate peptides that are click-chemistry ready', ph(33, 25)),
          item('Leverage in silico scores', 'In addition to data from wet lab validation, Cradle gives you the option to provide in silico scores from your own computational pipelines.'),
        ],
      },
      {
        label: 'Vaccines',
        icon: <VaccineGlyph className="h-6 w-6" />,
        items: [
          item('Stable, efficacious antigens for protein subunit vaccines', ph(31, 26)),
          item('Optimize for manufacturability', ph(36, 27)),
          item('Design broadly neutralizing binders', ph(36, 28)),
          item('Engineer enzymes for vaccine production', 'Cradle supports enzyme engineering to optimize the workhorses of mRNA vaccine production, including polymerases and capping enzymes.'),
        ],
      },
    ],
  },
  quote: {
    size: 'normal',
    // fully placeholder (spec: ~4 lines) so no invented words are attributed to the named person
    text: phc(200, 1),
    avatar: `${BIO}avatar-oBdmCN.jpg`,
    name: 'Anastasia Hager, Ph.D.',
    role: 'Global Head of Drug Discovery Sciences, Bayer',
  },
  workflowLead: 'Design with generative AI customized to your biologic and run experiments like you always do.',
}

export const industrial = {
  accent: '#0ea5e9',
  fileColor: '#0369a1',
  glow: 'rgba(14,165,233,.5)',
  video: `${BIO}img-GJxfO9.mp4`,
  hero: {
    layout: 'industrial',
    eyebrow: 'INDUSTRIAL',
    eyebrowGlyph: `${IND}datauri-eyebrow-824e99.svg`,
    title: 'AI-assisted protein engineering for industrial teams',
    titleGradient: 'linear-gradient(285deg, rgba(255,255,255,.7) 0%, #fff 58%)',
    lead: <>Trusted by scientists at Novonesis, Corteva,<br />IFF and more.</>,
    uiImage: `${IND}data-3kLG8J.png`,
  },
  logos: {
    variant: 'industrial',
    logos: ['UekOaZ', '7vYN5L', '3xsUSq'].map((k) => `${IND}logos-${k}.svg`),
  },
  pipeline: {
    beforeTitle: 'Protein engineering before',
    beforeLabels: ['Project design', 'Variant generation', 'Optimization', 'Application testing', 'Scale up'],
    // live phone reuses the biopharma labels (bug); the intended industrial labels are used here
    beforeLabelsPhone: ['Project design', 'Variant generation', 'Optimization', 'Application testing', 'Scale up'],
    beforeColorsPhone: [W(0.8), W(0.6), W(0.6), W(0.6), W(0.6)],
    cradleTitle: 'Protein engineering with Cradle',
    cradleSwatch: 'linear-gradient(270deg, #38bdf8 0%, #0ea5e9 100%)',
    cradleBar: 'linear-gradient(270deg, #38bdf8 0%, #0284c7 100%)',
    cradleLabels: ['Project design', 'AI protein engineering', 'Scale up'],
    cradleColors: [W(0.8), '#fff', W(0.8)],
    cradleLabelsPhone: ['Project design', 'AI Protein Engineering', 'Scale up'],
    cradleColorsPhone: [W(0.8), '#fff', W(0.6)],
  },
  timeline: {
    title: ['Fast-track your protein', 'engineering with Cradle'],
    // live phone shows the biopharma heading (bug); the industrial heading is used here
    titlePhone: 'Fast-track your protein engineering with Cradle',
    introGap: 'md:gap-5',
    lead: phc(200, 0),
    blocks: [
      {
        title: <>Goodbye sequential,<br /> hello simultaneous</>,
        lead: 'Generate proteins that move the needle on performance and manufacturability, in every design cycle.',
        toggles: ['Catalytic activity', 'Stability', 'Yield'],
        features: [
          item('Efficiently explore diverse designs', phc(300, 1)),
          item('Optimize multiple objectives at once', phc(218, 2)),
          { ...item('Design for real-world function', phc(340, 3)), lines: [0, 9] },
        ],
        featureCls: ['md:max-w-[360px]', 'md:max-w-[360px]', 'md:max-w-[360px] md:pl-5'],
      },
      {
        title: <>Train Cradle across<br className="hidden md:inline" /> your datasets</>,
        lead: 'Connect all your experimental results in one place and train custom AI on your data, from FACS screening to high resolution assays.',
        files: ['P450_substr_spec_R1.csv', 'Metab_path_opt_R2.xlsx', 'Biocat_act_screen_R3.csv', 'Proc_temp_stab_R1.csv', 'Enz_expr_lvls_R2.xlsx', 'Chem_conv_rates_R1.csv', 'Ind_yield_opt_R2.csv'],
        features: [
          item('Works with any format and assay', phc(217, 0)),
          item('Train AI throughout your program', phc(243, 1)),
          item('No historical data? No problem.', 'Start a new program from a single sequence, or kick-start your Cradle journey with data you have already collected.'),
        ],
        featureCls: ['md:max-w-[360px] md:pl-[2px]', '', 'md:max-w-[360px] md:pl-5'],
      },
      {
        title: <>Protein design at any<br /> level of expertise</>,
        lead: 'Use Cradle with simple defaults, or set advanced design requirements based on your in-house expertise.',
        image: `${IND}benefits-lwJeDE.png`,
        features: [
          { ...item('Simple workflows', phc(202, 2)), lines: [5, 4] },
          { ...item('Mutations where you want them', phc(258, 3)), lines: [6, 5] },
          item('AI your whole team understands.', phc(170, 0)),
        ],
        featureCls: ['', '', 'md:pl-5'],
      },
    ],
  },
  modalities: {
    title: 'Works on any protein and all properties',
    lead: phc(150, 1),
    ctaBody: phc(172, 2),
    tabs: [
      {
        label: 'Enzymes',
        panelH: [1457.3, 750.3],
        icon: <img src={`${IND}datauri-enzyme-cf640c.svg`} alt="" className="h-6 w-6" />,
        items: [
          item('Explore improvements beyond the active site', phc(392, 3)),
          item('Improve activity, specificity, and more', phc(260, 0)),
          item('Improve performance of heterologous enzymes', phc(280, 1)),
          item('Screening data without the combinatorial headache', phc(278, 2)),
          item('Leverage natural diversity', 'You can provide Cradle with diverse natural homologs of interest, helping the models tease out important underlying patterns.'),
          item('Capture epistatic effects from the start of the program', phc(185, 3)),
          item('Keep learning across assay conditions and experimental batches', phc(363, 0)),
        ],
      },
      {
        label: 'Binders',
        icon: <img src={`${IND}datauri-binding-ae0969.svg`} alt="" className="h-[18px] w-[18px]" />,
        items: [
          item('Affinity maturation with manufacturability in mind', ph(31, 48)),
          item('Set binder-specific objectives', 'Set configurable objectives when generating sequences. These can be absolute or relative: binding affinity (KD, on-/off-rates), specificity, polyreactivity, cross-reactivity, stability, and more.'),
          item('Maximum value from discovery libraries', ph(35, 49)),
          item('A flexible starting point for your program', 'Projects to develop a functional and robust binder can begin from a single low-affinity binder or existing screening datasets.'),
        ],
      },
      {
        label: 'Peptides',
        icon: <PeptideGlyph className="h-6 w-[25px]" />,
        items: [
          item('Design effective candidates', 'Generate bioactive agonists or antagonists while improving properties including stability, solubility, bioavailability, and even cell penetration.'),
          item('Supplement discovery libraries', 'Train models on screening data from early discovery campaigns and use Cradle to generate additional diverse candidates before moving into multi-property optimization.'),
          item('Define relevant optimization goals', ph(28, 50)),
          item('Prepare for downstream modifications', 'Ensure sequences are ready for downstream steps like click-chemistry, with options to limit or block specific residues.'),
          item('Connect your own predictive models', 'Combine wet lab results with in silico scores from your own computational pipelines.'),
        ],
      },
    ],
  },
  quote: {
    size: 'large',
    text: "Cradle's AI-based protein design platform provides easy access and acceleration to protein optimization for the discovery pipeline",
    avatar: `${IND}avatar-tiB8dY.png`,
    name: 'Eswar Narayanan',
    role: 'Director, Corteva Catalyst',
  },
  workflowLead: 'Design with generative AI customized to your protein and run experiments like you always do.',
}
