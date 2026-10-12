import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Caret, LadderTile } from './Motion.jsx'
import { ButtonDefault, Secondary36P16 } from './Buttons.jsx'
import { introFor } from './blogData.js'

const MotionLink = motion.create(Link)

// §B1.2 Hero heading with blinking caret
export function BlogHeading() {
  const line = 'font-heading font-medium text-[32px] leading-[35.2px] tracking-[-0.64px] md:text-[64px] md:leading-[64px] md:tracking-[-2.56px]'
  return (
    <div className="flex flex-col px-5 pt-[100px] md:px-0 md:pt-0">
      <h1 className="flex flex-col">
        <span className="flex items-center gap-[6px]">
          <span className={`${line} text-gray-800`}>Unfold</span>
          <Caret className="h-[35.2px] md:h-16" />
        </span>
        <span className={`${line} text-gray-300`}>A blog by Cradle</span>
      </h1>
    </div>
  )
}

// §B1.4 Featured post card (latest post). Thumbnail runs thumbPop on load. Hover: none measured.
export function FeaturedPostCard({ post }) {
  return (
    <div className="px-5 md:px-0">
      <Link to={post.path} className="relative flex h-[400px] w-full flex-col justify-between overflow-clip rounded-2xl p-6 md:p-10">
        {/* background: cover, blur 12, oversized (desktop rect [-126,-120.6,1029.1,608.6] vs 777×400 card) */}
        <img
          src={post.cover}
          alt=""
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[434.6px] w-[735px] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover blur-[12px] md:left-[-126px] md:top-[-120.6px] md:h-[608.6px] md:w-[1029.1px] md:translate-x-0 md:translate-y-0"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[274px] bg-[linear-gradient(180deg,rgba(3,7,18,0)_0%,rgba(3,7,18,.7)_100%)]" />
        <motion.div
          className="fborder relative z-[4] h-[75.6px] w-32 rounded-lg"
          style={{ '--fb': '2px solid #fff' }}
          initial={{ opacity: 0.001, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', bounce: 0.1, duration: 0.4, delay: 0.2 }}
        >
          <img src={post.cover} alt="" className="h-full w-full rounded-[inherit] object-cover" />
        </motion.div>
        <div className="relative z-[4] flex flex-col items-start gap-4">
          <h4 className="max-w-[488px] font-heading text-[18px] font-medium leading-[21.6px] text-white md:text-[24px] md:leading-[28.8px]">{post.title}</h4>
          <div className="max-w-[557.7px] opacity-70">
            <p className="font-sans md:line-clamp-2 text-[14px] font-medium leading-[22.4px] text-white md:text-[16px] md:leading-[25.6px]">{introFor(post.slug)}</p>
          </div>
          <span className="inline-flex h-9 items-center rounded-lg bg-white px-4 font-sans text-[13px] font-semibold leading-[15.6px] text-ink shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)] md:text-[14px] md:leading-[16.8px] md:tracking-[-0.14px]">
            Read now
          </span>
        </div>
      </Link>
    </div>
  )
}

// §B1.5 thumbnail card. Hover: image wrapper cardHoverScale (1→1.02, ≈250ms ease-out).
function ThumbCard({ post, titleColor, className = '' }) {
  return (
    <MotionLink to={post.path} initial="rest" whileHover="hover" className={`flex w-[320px] shrink-0 flex-col gap-4 md:w-auto md:min-w-0 ${className}`}>
      <motion.div
        variants={{ rest: { scale: 1 }, hover: { scale: 1.02 } }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fborder h-[166.7px] w-full rounded-lg md:h-32"
        style={{ '--fb': '1px solid rgba(27,27,177,.04)' }}
      >
        <img src={post.cover} alt="" loading="lazy" className="h-full w-full rounded-[inherit] object-cover" />
      </motion.div>
      <h5 className="font-heading text-[16px] font-semibold leading-[20px] tracking-[-0.16px] md:text-[18px] md:leading-[25.2px] md:tracking-[-0.18px]" style={{ color: titleColor }}>
        {post.title}
      </h5>
    </MotionLink>
  )
}

export const railTitle = 'font-heading font-medium text-gray-800 text-[24px] leading-[28.8px] tracking-[-0.48px] md:text-[32px] md:leading-[38.4px] md:tracking-[-0.64px]'

// §B1.5 group rail: desktop 3-col grid (245.7 each, gap 20); phone horizontal scroller.
export function GroupRail({ title, posts, titleColor = '#030712', action, mobileCount = 3 }) {
  return (
    <section className="flex flex-col gap-5 md:gap-6 md:pb-6">
      <div className="flex items-center justify-between px-5 md:px-0">
        <h3 className={railTitle}>{title}</h3>
        {action}
      </div>
      <div className="flex gap-4 overflow-auto px-5 pb-2 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:p-0">
        {posts.map((p, i) => (
          <ThumbCard key={p.slug} post={p} titleColor={titleColor} className={i >= 3 ? 'md:hidden' : i >= mobileCount ? 'max-md:hidden' : ''} />
        ))}
      </div>
    </section>
  )
}

// §B1.6 "Maturity guide" promo card
export function MaturityPromoCard() {
  return (
    <div className="p-5 md:p-0">
      <div className="overflow-clip rounded-2xl">
        <div className="flex flex-col gap-10 rounded-lg bg-[radial-gradient(66%_50%_at_15.9%_14.3%,#e0f2fe_0%,#f9fafb_100%)] p-5 md:flex-row-reverse md:bg-[radial-gradient(28%_50%_at_89%_26.9%,#e0f2fe_0%,#f9fafb_100%)] md:p-10">
          <LadderTile />
          <div className="flex min-w-0 flex-1 flex-col items-start gap-6">
            <h4 className="font-heading text-[18px] font-medium leading-[21.6px] text-gray-800 md:text-[24px] md:leading-[28.8px]">
              Introducing an ‘ML maturity ladder’ for biologics discovery and development
            </h4>
            <div className="opacity-70">
              <p className="line-clamp-3 font-sans text-[14px] font-medium leading-[22.4px] tracking-[-0.28px] text-muted md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]">
                Many organizations confine machine learning in molecular discovery and design to isolated proof-of-concept projects. We propose a 5-level maturity ladder to illustrate how teams advance towards autonomous systems that learn from every experiment and guide discovery across entire pipelines.
              </p>
            </div>
            <Secondary36P16 to="/blog/maturity">Read guide</Secondary36P16>
          </div>
        </div>
      </div>
    </div>
  )
}

// Static local stand-in for the MailerLite embed (EXTERNAL). Inner field metrics were not measured
// (§B14); sized to the measured 310.9×221 iframe box.
function PlaceholderSubscribeForm() {
  const field = 'h-[42px] w-full rounded-lg border border-gray-300 bg-white px-3 font-sans text-[14px] text-ink placeholder:text-muted outline-none focus:border-accent'
  return (
    <form className="flex h-[221px] w-[310.9px] flex-col gap-[10px]" onSubmit={(e) => e.preventDefault()}>
      <input className={field} type="text" placeholder="First name" aria-label="First name" />
      <input className={field} type="email" placeholder="Email" aria-label="Email" />
      <label className="mt-[6px] flex items-center gap-2 font-sans text-[12px] text-muted">
        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
        Yes, I want to receive updates from Cradle.
      </label>
      <ButtonDefault type="submit" className="mt-[14px] h-10 w-full !rounded-lg !text-[14px]">Subscribe</ButtonDefault>
    </form>
  )
}

// §B1.8 sticky subscribe card (desktop only)
export function SubscribeCard() {
  return (
    <aside className="sticky top-20 hidden w-[358.9px] shrink-0 flex-col items-center gap-5 rounded-2xl bg-white p-6 shadow-[rgba(0,0,0,.08)_0_1px_8px_0] lg:flex">
      <p className="text-center font-sans text-[16px] font-semibold leading-[20.8px] text-gray-800">Subscribe to new posts and updates from the Cradle team</p>
      <PlaceholderSubscribeForm />
    </aside>
  )
}

// §B1.9 newsletter band above the footer
export function NewsletterBand() {
  return (
    <section className="relative flex min-h-[506px] w-full flex-col items-center justify-center gap-5 bg-gray-50 px-5 py-[54px] md:min-h-0 shadow-[inset_0_1px_0_0_rgba(0,0,0,.08)] md:p-20">
      <div className="flex w-full max-w-[400px] flex-col items-center gap-[31px]">
        <div className="flex w-full flex-col items-center gap-[10px] text-center">
          <h3 className="font-heading text-[24px] font-medium leading-[28.8px] tracking-[-0.48px] text-ink md:text-[32px] md:leading-[38.4px] md:tracking-[-0.64px]">Subscribe to updates</h3>
          <p className="max-w-[90%] font-sans text-[16px] font-medium leading-[24px] tracking-[-0.64px] text-muted md:-mx-10 md:max-w-[480px] md:text-[20px] md:leading-[30px] md:tracking-[-0.8px]">
            Get new posts and other Cradle updates directly to your inbox. No spam :)
          </p>
        </div>
        <ButtonDefault className="h-12 w-[240px]">Subscribe</ButtonDefault>
      </div>
    </section>
  )
}

