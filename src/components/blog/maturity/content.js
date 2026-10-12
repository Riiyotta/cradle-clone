// /blog/maturity content map (PAGES_B §B3.2), read from the live page on 2026-10-12.
// Headings, labels and short UI strings are verbatim. Numbers are character counts of the live
// paragraphs / list items; the page renders neutral placeholder text of that length instead.

export const LEVELS = [
  { title: 'No Machine Learning Used', akin: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.', ps: [286] },
  { title: 'Human Assessment', akin: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco.', ps: [187] },
  { title: 'ML Ranking and Selection', akin: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip.', ps: [414] },
  { title: 'ML Generation and Learning', akin: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation.', ps: [415, 463, 323] },
  { title: 'AI Agents and Decision Making', akin: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad.', ps: [589], muted: true },
]

export const LADDER_LABELS = ['No ML', 'Human assessment', 'ML ranking and selection', 'ML generation and learning', 'AI agents and decision making']

export const STRANDS = [
  { icon: '/assets/pages/blog-maturity/1-i7eLtA6o.png', title: 'Scope of ML Application', p: 220 },
  { icon: '/assets/pages/blog-maturity/2-jnHZtAaC.png', title: 'Experimental Data Practices', p: 218 },
  { icon: '/assets/pages/blog-maturity/3-P6Vpflbk.png', title: 'Organizational Integration', p: 220 },
]

const img = (h) => `/assets/pages/blog-maturity/image-${h}.png`

// Example sub-head style: 'strong' = Inter 16/700 in a p; 'h4' = Rethink Sans 18/21.6 (live mixes both).
export const CONTENT = [
  {
    id: 'strand-1', num: '01', band: '#2d66f8', numColor: '#92bafe', quoteColor: '#030712', radius: 16,
    title: 'Scope of ML application',
    lead: 'How broadly and deeply are ML tools used across your discovery pipeline?', leadPs: [403],
    items: [
      { id: 'modalities', lead: 'Modalities', sub: 'From Simple to Complex Biologics', means: 295, matters: 337, low: [85, 82, 68, 60], high: [108, 79, 80, 68], img: img('0S3u451Y'),
        ex: [{ h: 'AbbVie: Protein Language Models for Bispecific Engineering', s: 'strong', ps: [407], src: 'Nature PMC' }, { h: 'Sanofi: Custom AI for mRNA Therapeutics', s: 'strong', ps: [371, 253], src: 'Sanofi Digital & AI' }] },
      { id: 'phases', lead: 'Phases', sub: 'Connecting Your R&D Pipeline', means: 344, matters: 379, low: [75, 46, 43, 52], high: [98, 103, 77, 73], img: img('VIMnwmz7'),
        ex: [{ h: 'Bristol Myers Squibb: "Predict First" Before Getting Physical', s: 'strong', ps: [783], src: 'PharmaVoice' }, { h: 'Pfizer: Accelerating Clinical Trials and Manufacturing', s: 'strong', ps: [692], src: 'Pfizer News' }] },
      { quote: '"We don\'t go into the lab and make things unless we have a good idea of what the forecast looks like."' },
      { id: 'properties', lead: 'Properties', sub: 'Multi-Objective Optimization', means: 218, matters: 304, low: [58, 80, 49, 54], high: [104, 71, 59, 79], img: img('owIbU34H'),
        ex: [{ h: 'Amgen: Sequence-Based Viscosity Prediction', s: 'h4', ps: [696], src: 'MDPI Biomolecules' }, { h: 'Novartis: SUMO – In Silico Sequence Assessment Using Multiple Optimization Parameters', s: 'h4', ps: [435, 411, 311], src: 'PubMed' }] },
    ],
  },
  {
    id: 'strand-2', num: '02', band: '#3cab57', numColor: 'rgb(151,222,168)', quoteColor: '#1f2937', radius: 12,
    title: 'Experimental Data Practices',
    lead: 'Are your experiments setting up your ML systems for success?', leadPs: [269, 127],
    items: [
      { id: 'quantity', lead: 'Quantity', sub: 'Scale and Throughput', means: 235, matters: 420, low: [37, 37, 30, 76, 25], high: [67, 68, 45, 47, 43], img: img('AnGgUNm2'),
        ex: [{ h: 'Sanofi: Industrial-Scale Automated Platform', s: 'h4', ps: [281, 324], src: 'Taylor & Francis mAbs' }, { h: 'Genentech: Active Learning Strategy', s: 'h4', ps: [355, 297], src: 'bioRxiv' }] },
      { quote: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { id: 'quality', lead: 'Quality', sub: 'Reproducibility and Controls', means: 237, matters: 389, low: [25, 43, 40, 43, 63], high: [63, 33, 58, 51, 95], img: img('YGDmzmkr'),
        ex: [{ h: 'Roche: "FAIR Data by Design"', s: 'strong', ps: [359, 491, 186], src: 'Pistoia Alliance FAIR Toolkit' }, { h: 'Novartis: FAIR Data Hub for AI', s: 'strong', ps: [497], src: 'Handelsblatt' }] },
      { id: 'workflow', lead: 'Workflow', sub: 'Automated Data Integration', means: 169, matters: 336, low: [48, 50, 36, 60, 37, 47], high: [49, 115, 39, 63, 39, 57], img: img('6rHlyYbC'),
        ex: [{ h: 'Pfizer: TetraScience Automated Data Platform', s: 'strong', ps: [543], src: 'TetraScience' }, { h: 'AbbVie’s Collaborative Hub', s: 'strong', ps: [657], src: 'AbbVie Science' }] },
    ],
  },
  {
    id: 'strand-3', num: '03', band: '#0ea5e9', numColor: 'rgb(125,211,252)', quoteColor: '#1f2937', radius: 12,
    title: 'Organizational Integration',
    lead: 'Is machine learning embedded in your day-to-day work, or trapped in silos?', leadPs: [464],
    items: [
      { id: 'integration', lead: 'Integration', sub: 'Strategic Embedding', means: 162, matters: 333, low: [55, 32, 62, 64, 57], high: [63, 94, 86, 66, 96], img: img('lkIbj7HP'),
        ex: [{ h: 'Genentech: Prescient Design Acquisition', s: 'strong', ps: [630], src: 'Genentech' }, { h: 'AstraZeneca: Turbine Lab-in-the-Loop Partnership', s: 'strong', ps: [665], src: 'Pharma Industrial India' }] },
      { quote: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim.' },
      { id: 'access', lead: 'Access', sub: 'Democratized Usage', means: 213, matters: 394, low: [46, 62, 58, 51, 63, 76], high: [53, 66, 62, 52, 78, 77], img: img('CzLrvdX3'),
        ex: [{ h: 'Merck: GPTeal Platform', s: 'strong', ps: [582], src: 'IntuitionLabs' }, { h: 'Sanofi: "Expert AI" vs "Snackable AI" Strategy', s: 'strong', ps: [700] }] },
      { quote: '"Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris."' },
    ],
  },
]

export const TOC = [
  { href: '#intro', kicker: 'Intro', title: 'The ML Maturity Ladder' },
  { href: '#framework', kicker: 'Framework', title: 'The 3 Strands of ML maturity' },
  { href: '#strand-1', kicker: 'Strand 1', title: 'Scope of ML Application' },
  { href: '#strand-2', kicker: 'Strand 2', title: 'Experimental Data Practices' },
  { href: '#strand-3', kicker: 'Strand 3', title: 'Organizational Integration' },
  { href: '#conclusion', kicker: 'Conclusion', title: 'Applying the Framework' },
]
