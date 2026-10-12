import { LinkInBioRoot, LinkInBioColumn, BrandBlock, LinkButtons, WetLab, FooterGraphic, FormPlaceholder, h5Cls } from '../components/misc/LinkInBio.jsx'

// PAGES_B §B8 /notebook (no navbar / footer on live)
export default function Notebook() {
  return (
    <LinkInBioRoot>
      <LinkInBioColumn>
        <BrandBlock />
        {/* B8.3. Live phone variant shows "Recent case studies" here (Framer quirk); the spec copy is used instead. */}
        <div className="w-full min-h-11 md:min-h-0 flex flex-col justify-center">
          <h5 className={h5Cls}>
            We're glad you've enjoyed your notebook! 🎉
            <br />
            <br />
            Happy to send you another one - just send a quick message.
          </h5>
        </div>
        {/* HubSpot form (EXTERNAL): 500×1002, phone 342×1325 (measured) */}
        <FormPlaceholder h={1002} hMobile={1325} />
        <LinkButtons antibodyIcon="notebook" />
        <WetLab />
      </LinkInBioColumn>
      <FooterGraphic />
    </LinkInBioRoot>
  )
}
