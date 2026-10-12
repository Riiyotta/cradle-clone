import { Marquee, useIsPhone } from './primitives.jsx'

// B2 / I2 LogoTicker (dark). Leftward marquee ≈50 px/s, seamless.
// biopharma: 1280×62 box, padding 0 40 20, bottom border, 10 logos 76.8×42 (contain, opacity .6), gap 48.
//            phone: 390×60, padding 20 0, logos 64×20, gap 16.
// industrial: 1280×62 wrapper holding a 1280×55 strip (padding 0 40 20), 3 logos 107×35 radius 8, gap 24.
//            phone: wrapper h62, strip 390×44 (padding-bottom 20), logos 97×24, gap 24.

export default function LogoTicker({ cfg }) {
  const { logos, variant } = cfg
  const phone = useIsPhone()
  if (variant === 'industrial') {
    const mask = 'radial-gradient(50% 177% at 50% 50%, #000 52.4476%, rgba(0,0,0,0) 100%)'
    return (
      <div className="flex w-full justify-center bg-ink md:px-10">
        <div className="flex h-[62px] w-full max-w-container items-center">
          <div className="h-[44px] w-full bg-ink pb-5 md:h-[55px] md:px-10" style={{ WebkitMaskImage: mask, maskImage: mask }}>
            <Marquee speed={50} gap={24} className="h-full" innerClassName="h-full">
              <div className="flex h-full items-start gap-6">
                {logos.map((src) => (
                  <img key={src} src={src} alt="" className="h-6 w-[97px] rounded-lg object-contain opacity-60 md:h-[35px] md:w-[107px]" />
                ))}
              </div>
            </Marquee>
          </div>
        </div>
      </div>
    )
  }
  const mask = 'radial-gradient(50% 177% at 50% 50%, #000 72.3571%, rgba(0,0,0,0) 100%)'
  return (
    <div className="flex w-full justify-center bg-ink md:px-10">
      <div
        className="relative h-[60px] w-full max-w-container bg-ink py-5 md:h-[62px] md:px-10 md:pb-5 md:pt-0"
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      >
        <Marquee speed={50} gap={phone ? 16 : 48} className="h-full" innerClassName="h-full">
          <div className="flex h-full items-center gap-4 md:gap-12">
            {logos.map((src) => (
              <img key={src} src={src} alt="" className="h-5 w-16 object-contain opacity-60 md:h-[42px] md:w-[76.8px]" />
            ))}
          </div>
        </Marquee>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/[0.08]" />
      </div>
    </div>
  )
}
