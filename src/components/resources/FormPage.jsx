import { motion } from 'framer-motion'
import LeadForm from './LeadForm.jsx'
import TrustTicker from './TrustTicker.jsx'

// Shared template for /get-started (G1–G3) and /contact (C1–C3).
const T = '/assets/pages/team/'

function AvatarTrio() {
  const side = 'h-[30px] w-[30px] rounded-full object-cover md:h-10 md:w-10'
  return (
    <div className="flex h-12 items-center justify-center gap-[7.5px] md:h-16 md:gap-[10px]">
      {/* Appear configs exact from Framer appear script */}
      <motion.img
        src={T + 'avatar-rd5Mgf.jpg'} alt="" className={side}
        initial={{ opacity: 0.001, scale: 0.8, x: 8 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ type: 'spring', duration: 0.8, bounce: 0.1, delay: 0.2 }}
      />
      <motion.img
        src={T + 'avatar-UykoKB.jpg'} alt="" className="h-12 w-12 rounded-full object-cover md:h-16 md:w-16"
        initial={{ opacity: 0.001, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 0.5, bounce: 0.1, delay: 0.1 }}
      />
      <motion.img
        src={T + 'avatar-OWtK8c.jpg'} alt="" className={side}
        initial={{ opacity: 0.001, scale: 0.8, x: -8 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ type: 'spring', duration: 0.8, bounce: 0.1, delay: 0.3 }}
      />
    </div>
  )
}

/**
 * variant: 'get-started' | 'contact'
 */
export default function FormPage({ variant, title, lead, cardTitle }) {
  const gs = variant === 'get-started'
  return (
    <div className="flex w-full flex-col items-center">
      {/* Header: get-started padding 120 40 40 (phone 120 20 40) + avatars; contact 180 40 80 (phone 180 20 40) */}
      <section
        className={`flex w-full flex-col items-center gap-5 px-5 md:px-10 ${gs ? 'pb-10 pt-[120px]' : 'pb-10 pt-[180px] md:pb-20'}`}
      >
        {gs && <AvatarTrio />}
        <h2 className="m-0 w-full max-w-container text-center font-heading text-[32px] font-medium leading-[35.2px] tracking-[-0.64px] text-ink md:text-[64px] md:leading-[64px] md:tracking-[-2.56px]">
          {title}
        </h2>
        <p className="m-0 max-w-[500px] text-center font-sans text-[16px] font-medium leading-6 tracking-[-0.64px] text-muted md:text-[20px] md:leading-[30px] md:tracking-[-0.8px]">
          {lead}
        </p>
      </section>

      {/* FormCard (light): section padding 40 40 60 (phone 0 20 50), gradient #fff → #f3f4f6 */}
      <section className="w-full bg-[linear-gradient(#fff_0%,#f3f4f6_100%)] px-5 pb-[50px] md:px-10 md:pb-[60px] md:pt-10">
        <div className="fborder mx-auto flex w-full max-w-[1040px] flex-col gap-[10px] rounded-xl bg-white md:rounded-3xl">
          <div className="px-10 pt-10">
            <h3 className="m-0 font-heading text-[24px] font-medium leading-[28.8px] tracking-[-0.48px] text-ink md:text-[32px] md:leading-[38.4px] md:tracking-[-0.64px]">
              {cardTitle}
            </h3>
          </div>
          <LeadForm variant={variant} />
        </div>
      </section>

      <TrustTicker />
    </div>
  )
}
