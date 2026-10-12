import { LinkInBioRoot, LinkInBioColumn, BrandBlock, LinkButtons, WetLab, FooterGraphic, FormPlaceholder, h5Cls } from '../components/misc/LinkInBio.jsx'
import ShirtHero from '../components/misc/ShirtHero.jsx'

// PAGES_B §B9 /shirt (no navbar / footer on live). The duplicated t-shirt photo after the footer graphic is dropped.
export default function Shirt() {
  return (
    <LinkInBioRoot className="px-6 md:px-20">
      <ShirtHero />
      <LinkInBioColumn>
        <BrandBlock />
        <div className="w-full flex flex-col items-center justify-center gap-[29px]">
          <h3 className="w-full font-heading font-medium text-ink text-[24px] leading-[28.8px] tracking-[-0.48px] md:text-[32px] md:leading-[38.4px] md:tracking-[-0.64px]">
            We'd love to send you a t-shirt!
          </h3>
          <h5 className={`w-full ${h5Cls}`}>
            We just need some of your details to make that happen.{' '}
            <br className="hidden md:inline" />
            Please fill out the form below and we'll go to work.
          </h5>
        </div>
        {/* HubSpot form (EXTERNAL): 500×1483 per spec, phone 342×1685 (measured) */}
        <FormPlaceholder h={1483} hMobile={1685} />
        <LinkButtons antibodyIcon="notebook" />
        <WetLab />
      </LinkInBioColumn>
      <FooterGraphic />
    </LinkInBioRoot>
  )
}
