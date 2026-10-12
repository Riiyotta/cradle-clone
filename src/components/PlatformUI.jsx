import { useState } from 'react'
import { motion } from 'framer-motion'
import { useIsDesktop } from './Hero.jsx'

// CLONE_SPEC §3 Platform UI showcase

const BACK = [0.7, -0.35, 0.3, 1.1]
// Live tab switch: width/bar/title/height and screenshot crossfade are all 0.3s tweens with Framer's
// default ease [0.12,0.23,0.5,1]. Phone pills switch colours instantly.
const TAB_T = { duration: 0.3, ease: [0.12, 0.23, 0.5, 1] }

const TABS = [
  { title: 'Generate candidates', pill: 'Generation', img: 'round', desc: 'Track round status easily, from generating candidates to uploading experimental results.' },
  { title: 'Explore reports', pill: 'Reports', img: 'report', desc: 'Review predicted performance of generated sequences before sending them to the lab.' },
  { title: 'Manage data', pill: 'Data', img: 'data', desc: 'Securely upload, manage, and track experimental data and generated candidates in one place.' },
]
// DOM order of the stacked screenshots (round default on top)
const SCREENS = ['round', 'data', 'report']

const FRAME_MASK = 'radial-gradient(158% 75% at 50% 23.1%, #000 82.0471%, rgba(0,0,0,.95) 85%, rgba(0,0,0,.75) 88%, rgba(0,0,0,.55) 91.4277%, rgba(0,0,0,.35) 94.1967%, rgba(0,0,0,.2) 97.1918%, rgba(0,0,0,0) 100%)'

function Screens({ active, inset, radius }) {
  return SCREENS.map((name) => (
    <motion.img
      key={name}
      src={`/assets/ui-${name}.png`}
      alt={`${name} ui`}
      initial={false}
      animate={{ opacity: TABS[active].img === name ? 1 : 0 }}
      transition={TAB_T}
      className={`absolute ${inset} object-cover object-[50%_0%] overflow-hidden shadow-[0_1px_8px_0_rgba(22,31,85,.16)] backdrop-blur-[5px] ${radius}`}
    />
  ))
}

function Frame({ active, className, inset, radius }) {
  return (
    <div
      className={`fborder relative w-full bg-white/[.04] ${className}`}
      style={{ '--fb': '1px solid rgba(255,255,255,.16)', WebkitMaskImage: FRAME_MASK, maskImage: FRAME_MASK }}
    >
      <Screens active={active} inset={inset} radius={radius} />
    </div>
  )
}

function DesktopTab({ tab, selected, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={false}
      animate={{ width: selected ? 400 : 'auto' }}
      transition={TAB_T}
      className="flex flex-col gap-[10px] text-left overflow-hidden shrink-0 cursor-pointer bg-transparent border-0 p-0"
    >
      <div className="h-5 pb-4 w-full">
        <motion.div
          initial={false}
          animate={{ backgroundColor: selected ? '#2d66f8' : 'rgba(255,255,255,0.08)' }}
          transition={TAB_T}
          className="h-1 w-full rounded-[100px]"
        />
      </div>
      <motion.h4
        initial={false}
        animate={{ color: selected ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)' }}
        transition={TAB_T}
        className="m-0 font-heading font-medium text-[18px] leading-[21.6px] lg:text-[24px] lg:leading-[28.8px] whitespace-nowrap"
      >
        {tab.title}
      </motion.h4>
      <motion.div
        initial={false}
        animate={{ height: selected ? 'auto' : 0, marginTop: selected ? 0 : -10 }}
        transition={TAB_T}
        className="overflow-hidden w-0 min-w-full"
      >
        <motion.p
          initial={false}
          // Live: no fade/delay. The incoming description is opaque and slides up ≈84px→0 inside the
          // growing tab (Framer layout projection, ≈0.28s); the outgoing one disappears immediately.
          animate={selected ? { opacity: 1, y: 0 } : { opacity: 0, y: 84 }}
          transition={selected ? { opacity: { duration: 0 }, y: { duration: 0.28, ease: [0.05, 0.27, 0.23, 0.92] } } : { duration: 0 }}
          className="m-0 w-[400px] font-sans font-medium text-[14px] leading-[21px] tracking-[-0.28px] lg:text-[16px] lg:leading-[25.6px] lg:tracking-[-0.32px] text-gray-400"
        >
          {tab.desc}
        </motion.p>
      </motion.div>
    </motion.button>
  )
}

export default function PlatformUI() {
  const [active, setActive] = useState(0)
  const desktop = useIsDesktop()

  return (
    <section
      id="platform-ui"
      className="w-full flex justify-center md:bg-ink md:pb-10 lg:px-9 lg:pb-20"
      style={desktop ? undefined : { backgroundImage: 'linear-gradient(190deg, #030712 30%, #ffffff 73%)' }}
    >
      <motion.div
        key={desktop ? 'd' : 'p'}
        initial={{ opacity: 0.001, y: desktop ? 60 : 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: desktop ? 0.8 : 1.15, delay: desktop ? 0.3 : 0.2, ease: BACK }}
        className="relative z-[5] w-full"
      >
        {desktop ? (
          <div className="flex flex-col items-center gap-10 pt-2 px-10 pb-10">
            <Frame active={active} className="max-w-[1140px] aspect-[1140/651.4] rounded-[24px]" inset="left-3 top-3 w-[calc(100%-24px)] aspect-[1116/692.4]" radius="rounded-[12px_12px_0_0]" />
            <div className="w-full max-w-[1080px] px-4 flex flex-row justify-center items-start gap-5">
              {TABS.map((t, i) => (
                <DesktopTab key={t.title} tab={t} selected={i === active} onSelect={() => setActive(i)} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8 pt-2 px-2 pb-10">
            <div className="flex flex-row flex-wrap justify-center gap-2">
              {TABS.map((t, i) => (
                <motion.button
                  key={t.pill}
                  type="button"
                  onClick={() => setActive(i)}
                  initial={false}
                  animate={i === active
                    ? { backgroundColor: 'rgba(255,255,255,1)', color: 'rgba(3,7,18,1)' }
                    : { backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(156,163,175,1)' }}
                  transition={{ duration: 0 }}
                  className="h-9 px-4 py-0 rounded-[100px] border-0 cursor-pointer font-sans font-semibold text-[14px] leading-[18.2px] text-center"
                >
                  {t.pill}
                </motion.button>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0.001, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6, ease: [0.12, 0.23, 0.5, 1] }}
            >
              <Frame active={active} className="h-[calc((100vw-16px)*0.5714)] rounded-[12px]" inset="left-[6px] top-[6px] w-[calc(100%-12px)] aspect-[362/222.2]" radius="rounded-[8px]" />
            </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  )
}
