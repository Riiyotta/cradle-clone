import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// PAGES_B §B0.4 new shared buttons. `to` = same-site route (react-router Link); without `to` the
// element renders with no href (EXTERNAL targets are removed per §B12).
function Base({ to, className, children, ...rest }) {
  if (to) return <Link to={to} className={className} {...rest}>{children}</Link>
  return <span className={className} {...rest}>{children}</span>
}

const label36 = 'font-sans font-semibold text-ink text-[13px] leading-[15.6px] tracking-[-0.13px] md:text-[14px] md:leading-[16.8px] md:tracking-[-0.14px]'

// Secondary36 with padding 0 16px. Measured hover: no change.
export function Secondary36P16({ to, className = '', children }) {
  return (
    <Base to={to} className={`inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-white px-4 shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)] ${label36} ${className}`}>
      {children}
    </Base>
  )
}

// Ghost36: transparent; hover bg rgba(0,0,0,.02) ≈100ms.
const MotionLink = motion.create(Link)
export function Ghost36({ to, className = '', children }) {
  const M = to ? MotionLink : motion.span
  return (
    <M
      {...(to ? { to } : {})}
      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
      transition={{ duration: 0.1 }}
      className={`inline-flex h-9 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-lg px-4 ${label36} ${className}`}
    >
      {children}
    </M>
  )
}

// SecondaryOnDark40: no hover change.
export function SecondaryOnDark40({ to, className = '', children }) {
  return (
    <Base to={to} className={`inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-white/[.08] px-5 font-sans text-[14px] font-semibold leading-[16.8px] tracking-[-0.14px] text-white shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)] ${className}`}>
      {children}
    </Base>
  )
}

// ButtonDefault ("Subscribe"): bg #224eee → rgb(0,87,186) ≈250ms ease-out. The live action is a
// MailerLite popup (EXTERNAL), so the clone button does nothing.
export function ButtonDefault({ className = '', children, type = 'button', onClick }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      initial={{ backgroundColor: '#224eee' }}
      whileHover={{ backgroundColor: 'rgb(0,87,186)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl px-6 font-sans text-[14px] font-semibold leading-[18.2px] text-white md:text-[16px] md:leading-[20.8px] ${className}`}
    >
      {children}
    </motion.button>
  )
}
