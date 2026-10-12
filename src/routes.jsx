import { lazy } from 'react'

// Route table — page files live in src/pages/. Edit page files, not this table.
const Platform = lazy(() => import('./pages/Platform.jsx'))
const SolutionsAcademia = lazy(() => import('./pages/SolutionsAcademia.jsx'))
const SolutionsBiopharma = lazy(() => import('./pages/SolutionsBiopharma.jsx'))
const SolutionsIndustrial = lazy(() => import('./pages/SolutionsIndustrial.jsx'))
const ModalityAntibody = lazy(() => import('./pages/ModalityAntibody.jsx'))
const ModalityEnzyme = lazy(() => import('./pages/ModalityEnzyme.jsx'))
const ModalityVaccine = lazy(() => import('./pages/ModalityVaccine.jsx'))
const ModalityPeptide = lazy(() => import('./pages/ModalityPeptide.jsx'))
const Team = lazy(() => import('./pages/Team.jsx'))
const Careers = lazy(() => import('./pages/Careers.jsx'))
const LabPage = lazy(() => import('./pages/LabPage.jsx'))
const Case = lazy(() => import('./pages/Case.jsx'))
const Security = lazy(() => import('./pages/Security.jsx'))
const GetStarted = lazy(() => import('./pages/GetStarted.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'))
const BlogMaturity = lazy(() => import('./pages/BlogMaturity.jsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'))
const VideoIndex = lazy(() => import('./pages/VideoIndex.jsx'))
const VideoPost = lazy(() => import('./pages/VideoPost.jsx'))
const Whitepaper = lazy(() => import('./pages/Whitepaper.jsx'))
const Presskit = lazy(() => import('./pages/Presskit.jsx'))
const Notebook = lazy(() => import('./pages/Notebook.jsx'))
const Links = lazy(() => import('./pages/Links.jsx'))
const Shirt = lazy(() => import('./pages/Shirt.jsx'))
const Licensing = lazy(() => import('./pages/Licensing.jsx'))
const LegalTerms = lazy(() => import('./pages/LegalDoc.jsx').then((m) => ({ default: m.LegalTerms })))
const PrivacyPolicy = lazy(() => import('./pages/LegalDoc.jsx').then((m) => ({ default: m.PrivacyPolicy })))
const Dpa = lazy(() => import('./pages/Dpa.jsx'))

export const routes = [
  { path: '/platform', Component: Platform },
  { path: '/solutions/academia', Component: SolutionsAcademia },
  { path: '/solutions/biopharma', Component: SolutionsBiopharma },
  { path: '/solutions/industrial', Component: SolutionsIndustrial },
  { path: '/modality/antibody', Component: ModalityAntibody },
  { path: '/modality/enzyme', Component: ModalityEnzyme },
  { path: '/modality/vaccine', Component: ModalityVaccine },
  { path: '/modality/peptide', Component: ModalityPeptide },
  { path: '/team', Component: Team },
  { path: '/careers', Component: Careers },
  { path: '/lab', Component: LabPage },
  { path: '/case', Component: Case },
  { path: '/security', Component: Security },
  { path: '/get-started', Component: GetStarted },
  { path: '/contact', Component: Contact },
  { path: '/blog', Component: Blog },
  { path: '/blog/maturity', Component: BlogMaturity },
  { path: '/blog/:slug', Component: BlogPost },
  { path: '/video', Component: VideoIndex },
  { path: '/video/:slug', Component: VideoPost },
  { path: '/whitepaper', Component: Whitepaper },
  { path: '/presskit', Component: Presskit },
  { path: '/notebook', Component: Notebook },
  { path: '/links', Component: Links },
  { path: '/shirt', Component: Shirt },
  { path: '/licensing', Component: Licensing },
  { path: '/dpa', Component: Dpa },
  { path: '/legal-terms', Component: LegalTerms },
  { path: '/privacy-policy', Component: PrivacyPolicy },
]
