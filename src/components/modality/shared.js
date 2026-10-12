// Shared data for the four modality pages (specs/PAGES_A.md).

export const A = '/assets'
export const BIO = `${A}/pages/solutions-biopharma`

// Customer logos (case studies grid), live order
export const CUSTOMER_LOGOS = [
  'novo-nordisk', 'jnj', 'bayer', 'abbvie', 'hansa', 'illumina', 'csl', 'lundbeck', 'ultragenyx', 'repligen',
].map((n) => `${A}/customer-logo-${n}.svg`)

// White logo tiles (vaccine / peptide heroes); the 9th tile only renders on phone
export const HERO_LOGOS = ['qzqK7o', 'z1e1uA', 'oGv9fs', 'ENCnbk', 'H1JIZo', 'v65Tr9', 'LY569W', '327vcQ'].map((h) => `${BIO}/logos-${h}.svg`)
export const HERO_LOGO_PHONE = `${BIO}/logos-EqXQcN.svg`

export const PROPERTY_BUTTONS = [
  { label: 'Talk to Sales', to: '/get-started' },
  { label: 'Read whitepaper', to: '/whitepaper' },
]

export const PIPELINE_BEFORE_GENERIC = [
  { label: 'Project design' }, { label: 'Variant generation' }, { label: 'Optimization' }, { label: 'Application testing' }, { label: 'Scale up' },
]

// Antibody stage labels (desktop) with the compact phone labels from the biopharma phone pipeline
export const PIPELINE_CRADLE_ANTIBODY = [
  { label: 'Target identification', phone: 'Target ID' },
  { label: 'AI-assisted discovery\nand optimization', phone: 'AI Protein Engineering' },
  { label: 'Preclinical' },
]

export const GREEN_SWATCH = 'linear-gradient(270deg, #61c779 0%, #266f38 100%)'
export const GREEN_BAR = 'linear-gradient(270deg, #61c779 0%, #3cab57 100%)'

export const BAYER_QUOTE = {
  before: '"Cradle\'s platform provides us with scalable scientist-centric solutions to expand the possibilities in our biologics portfolio and potentially ',
  highlight: 'deliver faster, more effective medicines',
  after: ' to patients."',
}

// Teams photo boxes: desktop w/h (top −62), phone pw/ph (top −94)
export const PHOTO_535 = [{ w: 587.5, h: 625, pw: 310, ph: 329.8 }, { w: 587.5, h: 625, pw: 310, ph: 329.8 }]
export const PHOTO_535_WIDE_PHONE = [{ w: 587.5, h: 625, pw: 350, ph: 372.3 }, { w: 587.5, h: 625, pw: 350, ph: 372.3 }]
export const PHOTO_635 = [{ w: 650, h: 744.8, pw: 350, ph: 548 }, { w: 648.6, h: 690, pw: 350, ph: 372.3 }]

export const DOCS_BUTTON = { label: 'Read documentation' } // EXTERNAL on live (docs.cradle.bio): rendered without a link
export const PLATFORM_BUTTON = { label: 'Learn more about the Cradle platform', to: '/platform' }
