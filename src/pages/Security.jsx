import { motion } from 'framer-motion'
import { placeholderChars as ph } from '../components/resources/placeholder.js'

// PAGES_A /security — S1 dark header · S2 chat-bubble letter · S3 title · S4 policy body

const BODY = 'm-0 font-sans text-[14px] font-medium leading-[22.4px] tracking-[-0.28px] text-muted md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]'
const H5 = 'm-0 font-heading text-[16px] font-semibold leading-5 tracking-[-0.16px] text-ink md:text-[18px] md:leading-[25.2px] md:tracking-[-0.18px]'

// External targets (Vanta, status page, Typeform) are rendered without href.
const PolicyLink = ({ children }) => <span className="text-[#0099ff] underline">{children}</span>

// Paragraph lengths (rendered line counts at 1440) measured on the live page; text is placeholder.
// Item shapes: number = paragraph of N lines; ['h', text] = H5; ['link', N, label] = paragraph
// ending with an inline link; ['ul', [n, n, ...]] = bulleted list.
const POLICY = [
  ['Executive Summary', [7, 9, 5]],
  ['Our Commitment', [12]],
  ['Product Security', [['h', 'Authentication & Access Control'], 5, 6, ['h', 'Role-Based Access Management'], 4, ['h', 'Data Encryption'], 7]],
  ['Compliance & Certifications', [3, ['h', 'SOC 2'], ['link', 3, 'public Trust Center'], ['h', 'Data Privacy & GDPR'], 6, ['h', 'Automated Compliance Monitoring'], ['link', 4, "Vanta's security and compliance automation platform"]]],
  ['Production Security', [5, ['h', 'Infrastructure Security and Engineering'], 9, 10, 8, ['h', 'Software Development Life Cycle'], 8, 7, 8, ['h', 'Identity and Access Management'], 12, 6, 10, ['h', 'Data Protection'], 8, ['h', 'Backup and Disaster Recovery'], 8, 6, ['h', 'Security Operations'], ['link', 12, 'independently monitored through Betterstack'], 6, 7]],
  ['Privacy', [4, ['h', 'Data Usage and Control'], 7, ['h', 'Machine Learning Model Privacy and Integrity'], 10, 9, ['h', 'Minimal Data Collection'], 4, ['h', 'Responsible Disclosure Policy'], 6, ['h', 'How to Report a Vulnerability'], ['link', 2, 'Report a Vulnerability'], 1, 3, ['h', 'Guidelines for Responsible Disclosure'], 1, ['ul', [1, 2, 2, 1, 1]], ['h', 'Our Commitment'], 1, ['ul', [1, 1, 2, 2]], ['h', 'Contact Security'], 2]],
]
// lines (as rendered live at 1440, 542px column) → placeholder length; ~72 chars per line
const len = (lines) => Math.round((lines - 0.5) * 72)

const BUBBLES = [
  { w: 'md:max-w-[448px]', pw: 'max-w-[252.8px]', text: "Hello, I'm Noé Lutz, Information Security Officer at Cradle. Let me give you an overview of our commitment to security." },
  { w: 'md:max-w-[560px]', pw: 'max-w-[316px]', text: ph(315, 0) },
  { w: 'md:max-w-[560px]', pw: 'max-w-[316px]', text: ph(494, 2) },
  { w: 'md:max-w-[560px]', pw: 'max-w-[316px]', text: ph(506, 4) },
  { w: 'md:max-w-[504px]', pw: 'max-w-[316px]', text: ph(420, 6) },
]
// Measured: bubble 1 at t0, 2–3 at +0.25s, 4 at +0.48s (bubble 5 not sampled; uses +0.48s)
const BUBBLE_DELAY = [0, 0.25, 0.25, 0.48, 0.48]

const H2_WORDS = ['Security', 'and', 'privacy', 'at', 'Cradle']

function Avatar() {
  return (
    <div className="sticky top-[120px] shrink-0">
      <div className="fborder h-8 w-8 overflow-hidden rounded-full [--fb:1px_solid_#fff] md:h-14 md:w-14 md:[--fb:2px_solid_#fff]">
        <img src="/assets/pages/security/page-header-46aE6Z.png" alt="Noé Lutz" className="h-full w-full object-cover" />
      </div>
    </div>
  )
}

function About({ className = '' }) {
  return (
    <div className={className}>
      <h5 className="m-0 font-heading text-[16px] font-semibold leading-5 tracking-[-0.16px] text-white md:text-[18px] md:leading-[25.2px] md:tracking-[-0.18px]">About Noé</h5>
      <p className="m-0 mt-[10px] font-sans text-[14px] font-medium leading-[22.4px] tracking-[-0.28px] text-white/60 md:text-[12px] md:leading-[18px] md:tracking-normal">
        Noé is responsible for security and steers the ship of Cradle&apos;s ML engineering wizards and scrubs the deck when needed.
      </p>
      <p className="m-0 mt-5 font-sans text-[14px] font-medium leading-[22.4px] tracking-[-0.28px] text-white/60 md:mt-2 md:text-[12px] md:leading-[18px] md:tracking-normal">
        {ph(220, 5)}
      </p>
    </div>
  )
}

function PolicyItem({ item, k }) {
  if (typeof item === 'number') return <p className={BODY}>{ph(len(item), k)}</p>
  const [type, a, b] = item
  if (type === 'h') return <h5 className={H5}>{a}</h5>
  if (type === 'link') return <p className={BODY}>{ph(len(a) - b.length - 2, k).slice(0, -1)} <PolicyLink>{b}</PolicyLink>.</p>
  if (type === 'ul') {
    return (
      <ul className="m-0 list-disc pl-[21px]">
        {a.map((n, i) => <li key={i} className={BODY}>{ph(len(n) - 3, k + i)}</li>)}
      </ul>
    )
  }
  return null
}

export default function Security() {
  return (
    <div className="flex w-full flex-col items-center pt-16">
      {/* S1 header: 630 tall (phone 590.8), padding 80 40 (phone 40 16), content bottom-aligned */}
      <section className="flex h-[590.8px] w-full justify-center bg-ink px-4 py-10 md:h-[630px] md:px-10 md:py-20">
        <div className="flex w-full max-w-container flex-col justify-end gap-10">
          <h1 className="m-0 w-full text-center font-heading text-[36px] font-medium leading-9 tracking-[-0.72px] text-white md:max-w-[1120px] md:text-left md:text-[72px] md:leading-[72px] md:tracking-[-2.88px]">
            Security and<br />privacy at Cradle
          </h1>
          <p className="m-0 w-full text-center font-sans text-[14px] font-medium leading-[22.4px] tracking-[-0.28px] text-white/80 md:max-w-[560px] md:text-left md:text-[20px] md:leading-[30px] md:tracking-[-0.8px]">
            {ph(265, 3)}
          </p>
          <div className="h-px w-full bg-white/[.08]" />
        </div>
      </section>

      {/* S2 letter */}
      <section className="flex w-full justify-center bg-[linear-gradient(#030712_0%,#1f2937_100%)] px-4 pb-10 md:px-10 md:pb-[120px]">
        <div className="flex w-full max-w-container flex-col md:flex-row md:items-start md:gap-10 md:pb-10 md:pr-20">
          <div className="flex items-start gap-[10px] md:contents">
            <Avatar />
            <div className="flex min-w-0 flex-1 flex-col gap-[10px] md:max-w-[560px] md:flex-[2_1_0%] md:gap-5">
              {BUBBLES.map((b, i) => (
                <motion.div
                  key={i}
                  className={`${b.pw} ${b.w} origin-left rounded-3xl bg-[#1d2e8b] p-4 shadow-[inset_0_0_40px_0_rgba(146,186,254,.5)] md:rounded-[32px] md:p-8`}
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: BUBBLE_DELAY[i] }}
                >
                  <p className="m-0 font-sans text-[13px] font-medium leading-[18.2px] text-white/90 md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]">{b.text}</p>
                </motion.div>
              ))}
              {/* Phone: about block below bubbles, divider above */}
              <div className="mt-[33.5px] border-t border-solid border-white/[.08] pt-[33.5px] md:hidden">
                <About />
              </div>
            </div>
          </div>
          <aside className="sticky top-[120px] hidden min-w-0 flex-1 pl-10 pt-2 md:block md:max-w-[504px]">
            <About className="max-w-[300px]" />
          </aside>
        </div>
      </section>

      {/* S3 title — word reveal */}
      <section className="flex w-full max-w-container items-center justify-center px-4 pt-10 md:h-[450px] md:px-10 md:py-20">
        <motion.h2
          className="m-0 w-full text-left font-heading text-[32px] font-medium leading-[35.2px] tracking-[-0.64px] text-ink md:text-center md:text-[64px] md:leading-[64px] md:tracking-[-2.56px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.05 }}
        >
          {H2_WORDS.map((w, i) => (
            <span key={i}>
              <motion.span
                className="inline-block"
                variants={{ hidden: { opacity: 0.001, y: 10 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease: [0.12, 0.23, 0.5, 1] }}
              >
                {w}
              </motion.span>
              {i === 1 ? <br /> : null}
              {i < H2_WORDS.length - 1 ? ' ' : ''}
            </span>
          ))}
        </motion.h2>
      </section>

      {/* S4 policy body */}
      <section className="flex w-full max-w-[960px] flex-col gap-10 px-4 pb-40 pt-10 md:gap-[93px] md:px-10 md:pb-80 md:pt-20">
        {POLICY.map(([title, items], s) => (
          <div key={title} className="flex flex-col gap-5 md:flex-row md:items-start md:gap-12">
            <h4 className="m-0 font-heading text-[18px] font-medium leading-[21.6px] text-ink md:sticky md:top-[120px] md:w-[33%] md:max-w-[290.4px] md:shrink-0 md:text-[24px] md:leading-[28.8px]">
              {title}
            </h4>
            <div className="flex min-w-0 flex-1 flex-col gap-[19px]">
              {items.map((it, i) => <PolicyItem key={i} item={it} k={s * 7 + i} />)}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
