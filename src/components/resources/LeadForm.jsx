import { useState } from 'react'
import { Link } from 'react-router-dom'
import { placeholderChars as ph } from './placeholder.js'

// Static local replacement for the HubSpot form embed (PAGES_A /solutions/academia A2 field
// styling, /get-started G2 and /contact C2 field lists). Measured inside the live iframe:
// inset 40; labels Inter 16/400 #4a5463 (20px box) 10px above inputs; help text 12.8px
// rgba(81,99,131,.89); inputs h54 radius 12 border #9fa8b5 text #212d3a; placeholder
// rgba(160,167,181,.64); 2-col fields gap 30; row pitch 104; Submit 103×44 #0151f8.

const COUNTRIES = [
  ['🇺🇸', '+1'], ['🇬🇧', '+44'], ['🇩🇪', '+49'], ['🇳🇱', '+31'], ['🇨🇭', '+41'], ['🇫🇷', '+33'], ['🇮🇳', '+91'],
]

function Label({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="block font-sans text-[16px] font-normal leading-[20px] text-[#4a5463]">
      {children}{required && <span className="text-[#e51520]">*</span>}
    </label>
  )
}

function Help({ children }) {
  return <div className="font-sans text-[12.8px] font-normal leading-[normal] text-[rgba(81,99,131,.89)]">{children}</div>
}

const inputCls = 'lead-input block w-full h-[54px] rounded-xl border border-solid border-[#9fa8b5] bg-white px-4 font-sans text-[16px] font-normal text-[#212d3a] outline-none focus:border-[#0151f8]'

function Field({ id, label, required, help, children }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-[10px]">
      <Label htmlFor={id} required={required}>{label}</Label>
      {help && <Help>{help}</Help>}
      {children}
    </div>
  )
}

function PhoneField({ id }) {
  const [c, setC] = useState(0)
  const [tel, setTel] = useState(COUNTRIES[0][1])
  return (
    <div className="flex">
      <div className="relative flex h-[54px] w-[68px] shrink-0 items-center gap-[5px] rounded-l-xl border border-solid border-[#9fa8b5] bg-white pl-4">
        <span className="font-sans text-[16px] leading-4" aria-hidden>{COUNTRIES[c][0]}</span>
        <span aria-hidden className="h-0 w-0 border-x-[6px] border-t-[6px] border-x-transparent border-t-black" />
        <select
          aria-label="Country code"
          value={c}
          onChange={(e) => { const i = Number(e.target.value); setC(i); setTel(COUNTRIES[i][1]) }}
          className="absolute inset-0 cursor-pointer opacity-0"
        >
          {COUNTRIES.map(([f, code], i) => <option key={i} value={i}>{f} {code}</option>)}
        </select>
      </div>
      <input id={id} name="phone" type="tel" value={tel} onChange={(e) => setTel(e.target.value)} className={`${inputCls} rounded-l-none border-l-0`} />
    </div>
  )
}

/**
 * variant: 'get-started' | 'contact'
 */
export default function LeadForm({ variant }) {
  const [sent, setSent] = useState(false)
  const gs = variant === 'get-started'
  const onSubmit = (e) => { e.preventDefault(); setSent(true) }

  if (sent) {
    return (
      <div className="p-10 font-sans text-[16px] leading-[20px] text-[#212d3a]" role="status">
        Thanks! We&apos;ll be in touch shortly.
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col p-10">
      {gs && (
        <p className="mb-8 mt-3 font-sans text-[12px] font-normal leading-[15px] text-[#4a5463]">
          Working in academia? Apply to join Cradle&apos;s academic research program instead.{' '}
          <Link to="/solutions/academia" className="text-[#0000ee] underline">Learn more</Link>
          <span className="text-[#0151f8]">.</span>
        </p>
      )}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row md:gap-[30px]">
          <Field id={`${variant}-fn`} label="First name" required><input id={`${variant}-fn`} name="firstname" required placeholder="First name" className={inputCls} /></Field>
          <Field id={`${variant}-ln`} label="Last name" required><input id={`${variant}-ln`} name="lastname" required placeholder="Last name" className={inputCls} /></Field>
        </div>
        <div className="flex flex-col gap-5 md:flex-row md:gap-[30px]">
          <Field id={`${variant}-jt`} label="Job Title" required><input id={`${variant}-jt`} name="jobtitle" required placeholder="Your job title" className={inputCls} /></Field>
          <Field id={`${variant}-co`} label="Company name" required><input id={`${variant}-co`} name="company" required placeholder="Your company name" className={inputCls} /></Field>
        </div>
        <Field id={`${variant}-em`} label="Email" required help="Please use your work email address.">
          <input id={`${variant}-em`} name="email" type="email" required placeholder="you@acme.bio" className={inputCls} />
        </Field>
        <Field id={`${variant}-ph`} label="Phone number (optional)" help="If you'd like us to call you, please provide your phone number below.">
          <PhoneField id={`${variant}-ph`} />
        </Field>
        {gs ? (
          <Field id={`${variant}-msg`} label="Tell us more about your project" required help={ph(206, 1)}>
            <textarea id={`${variant}-msg`} name="message" required placeholder="Please provide project context." className={`${inputCls} mb-1 h-[74px] resize-y py-4`} />
          </Field>
        ) : (
          <Field id={`${variant}-msg`} label="Message" required>
            <textarea id={`${variant}-msg`} name="message" required placeholder="Please provide context on your ask." className={`${inputCls} mb-1 h-[74px] resize-y py-4`} />
          </Field>
        )}
        <Field id={`${variant}-src`} label="Where did you hear about Cradle? (optional)">
          <input id={`${variant}-src`} name="source" placeholder="Where did you hear about Cradle?" className={inputCls} />
        </Field>
      </div>
      {/* Consent (279 chars live, placeholder); "Privacy Policy" pointed at an external HubSpot target → no href */}
      <p className="mt-5 font-sans text-[16px] font-normal leading-[20px] text-[#4a5463]">
        {ph(218, 3)} For more information, please see our{' '}
        <span className="text-[#0000ee] underline">Privacy Policy</span>.
      </p>
      <div className="mt-[60px] flex justify-end">
        <button type="submit" className="h-11 w-full cursor-pointer rounded-xl border-0 bg-[#0151f8] px-6 py-3 font-sans text-[16px] font-bold leading-5 text-white md:w-[103px]">
          Submit
        </button>
      </div>
    </form>
  )
}
