import { LinkInBioRoot, LinkInBioColumn, BrandBlock, LinkButtons, CaseGrid, WetLab, FooterGraphic } from '../components/misc/LinkInBio.jsx'

// PAGES_B §B8 /links (no navbar / footer on live)
export default function Links() {
  return (
    <LinkInBioRoot>
      <LinkInBioColumn>
        <BrandBlock />
        <LinkButtons />
        <CaseGrid />
        <WetLab />
      </LinkInBioColumn>
      <FooterGraphic />
    </LinkInBioRoot>
  )
}
