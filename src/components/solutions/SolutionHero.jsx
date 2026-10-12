import { motion } from 'framer-motion'
import { Btn, T, scrollToId } from './primitives.jsx'

// PAGES_A /solutions/biopharma B1 (+ industrial I1 differences).
// Desktop: columns max-w 1280 gap 40; text 590 wide; `ui` 650×524 holding the tilted `data` screenshot.
// Phone: column gap 40; text gap 20; full-width 36px buttons; 350×220 ui box with an untilted 460×285.4 image.

// Live computed transform of `data` (rotate(20deg) rotateX(-30deg) rotateY(24deg), no perspective)
const TILT = 'matrix3d(0.928008,0.121347,-0.352244,0,-0.296198,0.813798,-0.5,0,0.225982,0.568338,0.791154,0,0,0,0,1)'
const UI_MASK = 'radial-gradient(69% 93% at 5.6% 5.8%, #000 26.0311%, rgba(0,0,0,0) 100%)'

export default function SolutionHero({ cfg }) {
  const { accent, eyebrow, title, titleGradient, lead, uiImage, layout } = cfg
  const isInd = layout === 'industrial'

  const heading = (
    <h1
      className={`${T.h2} bg-clip-text text-transparent`}
      style={{ backgroundImage: titleGradient }}
    >
      {title}
    </h1>
  )
  const leadEl = <p className={`${T.lead} text-white/80`}>{lead}</p>
  const buttons = (
    <div className="flex w-full flex-col items-center gap-[10px] md:w-auto md:flex-row">
      <Btn variant="secondary48" to="/get-started" className="hidden !px-5 md:inline-flex">Talk to sales</Btn>
      <Btn variant="ghost48" onClick={() => scrollToId('usp1')} className="hidden md:inline-flex">See benefits</Btn>
      <Btn variant="secondary36" to="/get-started" className="w-full md:hidden">Talk to sales</Btn>
      <Btn variant="ghost36" onClick={() => scrollToId('usp1')} className="w-full md:hidden">See benefits</Btn>
    </div>
  )

  return (
    <section className="relative flex w-full justify-center overflow-hidden bg-ink px-5 pt-[120px] md:px-10">
      <div className="flex w-full max-w-container flex-col items-center gap-10 md:flex-row">
        {/* text — appear `7wivxl` / `13gmk68`: opacity .001→1, y 20→0, 0.3s, delay .1 */}
        <motion.div
          initial={{ opacity: 0.001, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.12, 0.23, 0.19, 1], delay: 0.1 }}
          className={`flex w-full flex-col items-start gap-5 md:min-w-0 md:flex-1 lg:w-[590px] lg:flex-none md:self-stretch ${isInd ? 'md:gap-10' : 'md:gap-8'}`}
        >
          {/* IconEyebrow */}
          <div className="flex h-6 items-center gap-3 md:h-7">
            <div
              className="flex h-5 w-5 items-center justify-center rounded-[4px] md:h-7 md:w-7 md:rounded-[6px]"
              style={{
                backgroundColor: accent,
                WebkitMaskImage: isInd ? 'linear-gradient(#000 50%, rgba(0,0,0,.8) 100%)' : 'linear-gradient(#000 47%, rgba(0,0,0,.8) 100%)',
                maskImage: isInd ? 'linear-gradient(#000 50%, rgba(0,0,0,.8) 100%)' : 'linear-gradient(#000 47%, rgba(0,0,0,.8) 100%)',
              }}
            >
              <img
                src={cfg.eyebrowGlyph}
                alt=""
                className={isInd ? 'h-4 w-4 md:h-[23px] md:w-[23px]' : 'h-[17px] w-[17px] md:h-6 md:w-6'}
              />
            </div>
            <span className="font-mono text-[14px] font-medium uppercase leading-6 tracking-[0.84px] text-white md:text-[18px] md:tracking-[1.08px]">
              {eyebrow}
            </span>
          </div>

          {isInd ? (
            <div className="flex flex-col gap-5">{heading}{leadEl}</div>
          ) : (
            <>{heading}{leadEl}</>
          )}
          {buttons}
        </motion.div>

        {/* ui — appear `s1zhvn` / `1tikvi9`: opacity .001→1, x 10→0, y 10→0, 1.2s, delay .2 */}
        <motion.div
          initial={{ opacity: 0.001, x: 10, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, ease: [0.12, 0.23, 0.1, 1.02], delay: 0.2 }}
          className="relative h-[220px] w-full shrink-0 md:h-[524px] md:w-[50%] lg:w-[650px]"
        >
          {/* phone: flat 460×285.4 */}
          <div
            className="absolute left-0 top-0 h-[285.4px] w-[460px] overflow-hidden rounded-[9px_9px_0_0] shadow-[0_1px_32px_0_rgba(0,0,0,0.25)] md:hidden"
            style={{ WebkitMaskImage: UI_MASK, maskImage: UI_MASK }}
          >
            <img src={uiImage} alt="Cradle sequences view" className="h-full w-full object-cover object-[50%_0]" />
          </div>
          {/* desktop: 1080×670 at (-58,-36), tilted */}
          <div
            className="absolute left-[-58px] top-[-36px] hidden h-[670.06px] w-[1080px] overflow-hidden rounded-[12px_12px_0_0] shadow-[0_1px_32px_0_rgba(0,0,0,0.25)] md:block"
            style={{ transform: TILT, WebkitMaskImage: UI_MASK, maskImage: UI_MASK }}
          >
            <img src={uiImage} alt="Cradle sequences view" className="h-full w-full object-cover object-[50%_0]" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
