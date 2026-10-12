import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Btn, WordEyebrow, Label, H2, H4, H5, BODY, LEAD } from './primitives.jsx'

/* ============================================================
   M3 FeatureList (`modalities`)
   motion 'replay'  : each block fades/slides in (opacity 0→1, y 20→0, ≈0.4s ease-out) and reverses on leave
   motion 'column'  : vaccine: the whole right column slides up once (y 40→0, opacity stays 1, 0.4s ease-out)
   ============================================================ */
export function FeatureList({ title, accent, blocks, pattern, motionMode = 'replay', pad = 'pt-[120px] pb-20 md:pb-[120px]' }) {
  const Col = motionMode === 'column' ? motion.div : 'div'
  const colProps = motionMode === 'column'
    ? { initial: { y: 40 }, whileInView: { y: 0 }, viewport: { once: true }, transition: { duration: 0.4, ease: 'easeOut' } }
    : {}
  return (
    <section className={`relative flex w-full justify-center overflow-hidden bg-white px-5 md:px-10 ${pad}`}>
      {pattern && <div className={`modality-grid-pattern pointer-events-none absolute left-0 top-0 w-full ${pattern}`} />}
      <div className="relative flex w-full max-w-container flex-col items-start gap-[70px] md:flex-row">
        <h2 className={`text-ink md:flex-[0_1_585px] ${H2}`}>{title}</h2>
        <Col {...colProps} className="flex w-full flex-col gap-10 bg-white md:flex-[0_1_625px] md:gap-20 md:pr-10">
          {blocks.map((b, i) => {
            const Block = motionMode === 'replay' ? motion.div : 'div'
            const blockProps = motionMode === 'replay'
              ? { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: false, amount: 0.2 }, transition: { duration: 0.4, ease: 'easeOut' } }
              : {}
            return (
              <Block key={i} {...blockProps} className="flex max-w-[500px] flex-col gap-5">
                <div className="flex flex-col gap-[10px]">
                  <Label color={accent}>{b.label}</Label>
                  <h4 className={`text-ink ${H4}`}>{b.title}</h4>
                </div>
                <p className={`text-muted ${BODY}`}>{b.body}</p>
              </Block>
            )
          })}
        </Col>
      </div>
    </section>
  )
}

/* ============================================================
   M4 ProductMock (`desktop mock`): glass frame + scroll-scaled video / image
   ============================================================ */
function ScaledVideo({ src, aspect }) {
  const ref = useRef(null)
  // progress 0 when the media top is ≈90px below the viewport bottom, 1 when it is ≈400px from the top
  const { scrollYProgress } = useScroll({ target: ref, offset: ['-90px end', 'start 400px'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 400, damping: 60, restDelta: 0.0005 })
  const scale = useTransform(smooth, [0, 1], [0.7, 1])
  const opacity = useTransform(smooth, [0, 1], [0.1, 1])
  return (
    <div ref={ref} className="w-full" style={{ aspectRatio: aspect }}>
      <motion.div className="h-full w-full" style={{ scale, opacity }}>
        <video src={src} className="h-full w-full rounded-t-xl object-cover" autoPlay muted loop playsInline />
      </motion.div>
    </div>
  )
}

function PopImage({ src, aspect }) {
  const ref = useRef(null)
  // measured: scale .4 / opacity 0 when the media top is at ≈70.5% of the viewport, 1 at ≈53.9% (spring overshoot)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.705', 'start 0.539'] })
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.4, 1])
  const scale = useSpring(rawScale, { stiffness: 260, damping: 18 })
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <div ref={ref} className="w-full" style={{ aspectRatio: aspect }}>
      <motion.img src={src} alt="" className="h-full w-full rounded-2xl object-cover" style={{ scale, opacity }} />
    </div>
  )
}

export function ProductMock({ video, image, aspect, frameMax = 'md:max-w-[1140px]', phoneBleed = false, className = '' }) {
  return (
    <div className={`flex w-full items-end justify-center md:h-[738px] ${phoneBleed ? '' : 'px-5 md:px-0'} ${className}`}>
      <div className={`mock-frame fborder relative z-[2] w-full rounded-3xl bg-white/[0.04] p-5 ${frameMax}`} style={{ '--fb': '1px solid rgba(255,255,255,.16)' }}>
        {video ? <ScaledVideo src={video} aspect={aspect} /> : <PopImage src={image} aspect={aspect} />}
      </div>
    </div>
  )
}

/* ============================================================
   M5 PropertiesGrid (`properties`)
   ============================================================ */
export function Properties({ eyebrow, title, lead, titleMax = 'md:max-w-[739px]', compactHeader = false, divider = false, cols, items, buttons }) {
  const grid = { 4: 'md:grid-cols-4', 5: 'md:grid-cols-5' }[cols]
  return (
    <div className="flex w-full flex-col items-center gap-10 md:gap-20">
      <div className={`flex w-full flex-col items-center text-center ${titleMax} ${compactHeader ? 'gap-6' : 'gap-[44px]'}`}>
        <div className={`flex w-full flex-col items-center ${compactHeader ? 'gap-6' : 'gap-[10px]'}`}>
          <WordEyebrow className="justify-center">{eyebrow}</WordEyebrow>
          <h2 className={`w-full text-white ${H2}`}>{title}</h2>
        </div>
        <p className={`w-full text-muted ${LEAD}`}>{lead}</p>
        <div className="flex w-full flex-col gap-4 bg-white/[0.12] md:w-auto md:flex-row">
          <Btn to={buttons[0].to} variant="primary" px="px-8" className="w-full md:w-auto">{buttons[0].label}</Btn>
          <Btn to={buttons[1].to} variant="secondary" px="px-8" className="w-full md:w-auto">{buttons[1].label}</Btn>
        </div>
      </div>
      {divider && <div className="h-px w-full bg-black/[0.08]" />}
      <div className={`grid w-full grid-cols-1 gap-[25px] md:gap-6 ${grid}`}>
        {items.map(([h, b]) => (
          <div key={h} className="flex flex-col gap-[10px]">
            <h5 className={`text-white ${H5}`}>{h}</h5>
            <p className={`text-muted ${BODY}`}>{b}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
