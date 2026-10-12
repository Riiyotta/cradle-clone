import { ph } from './primitives.jsx'

// /solutions/academia A2 FormCard. The live page embeds a HubSpot iframe (EXTERNAL); this is a static local
// form reproducing the measured layout. Desktop: card max-w 960, padding 40, radius 24; form area 880 wide with a
// 40px inset, 2-column rows 385 + 30 gap. Phone: card radius 12, padding 20 0 0; fields single column, 270 wide.
// Labels Inter 16/20 #4a5463 (+ #e51520 asterisk), help 12.8/15 rgba(81,99,131,.89), inputs h54 r12 1px #9fa8b5.

const INPUT = 'h-[54px] w-full rounded-xl border border-[#9fa8b5] bg-white px-4 font-sans text-[16px] font-normal text-[#212d3a] outline-offset-0'

function Label({ children, required }) {
  return (
    <label className="block font-sans text-[16px] font-normal leading-5 text-[#4a5463]">
      {children}
      {required && <span className="text-[#e51520]">*</span>}
    </label>
  )
}
const Help = ({ children }) => (
  <p className="mt-[10px] font-sans text-[12.8px] font-normal leading-[15px] text-[rgba(81,99,131,0.89)]">{children}</p>
)

function Field({ label, required, help, className = '', children }) {
  return (
    <div className={`flex min-w-0 flex-col ${className}`}>
      <Label required={required}>{label}</Label>
      {help && <Help>{help}</Help>}
      <div className="mt-[10px]">{children}</div>
    </div>
  )
}

function Caret() {
  return (
    <svg viewBox="0 0 10 6" className="h-[6px] w-[10px]" fill="none" aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="#4a5463" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function AcademiaForm() {
  return (
    <section className="flex w-full flex-col items-center gap-10 bg-[#1e5e35] px-5 pb-[50px] md:px-10 md:pb-[100px] md:pt-10">
      <div className="flex w-full max-w-[960px] items-center gap-6">
        <span className="h-px flex-1 rounded-[10px] bg-white/[0.08]" />
        <p className="font-sans text-[14px] font-medium leading-[22.4px] tracking-[-0.28px] text-white/80 md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]">
          Submit your application today
        </p>
        <span className="h-px flex-1 rounded-[10px] bg-white/[0.08]" />
      </div>

      <div className="flex w-full max-w-[960px] flex-col gap-[10px] rounded-xl bg-white pt-5 shadow-[0_1px_16px_0_rgba(0,0,0,0.08)] md:rounded-3xl md:p-10">
        <h2 className="text-center font-heading text-[24px] font-medium leading-[28.8px] tracking-[-0.48px] text-ink md:text-left md:text-[32px] md:leading-[38.4px] md:tracking-[-0.64px]">
          Let's talk!
        </h2>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex min-h-[1509px] w-full flex-col px-10 pb-10 pt-10 md:min-h-[1086px]"
        >
          <div className="flex flex-col gap-5 md:flex-row md:gap-[30px]">
            <Field label="First name" required className="md:flex-1"><input className={INPUT} type="text" name="firstname" placeholder="First name" /></Field>
            <Field label="Last name" required className="md:flex-1"><input className={INPUT} type="text" name="lastname" placeholder="Last name" /></Field>
          </div>
          <div className="mt-5 flex flex-col gap-5 md:flex-row md:gap-[30px]">
            <Field label="Position" required className="md:flex-1"><input className={INPUT} type="text" name="position" placeholder="Position" /></Field>
            <Field label="Academic/Research Institution" required className="md:flex-1"><input className={INPUT} type="text" name="institution" placeholder="Name of institution" /></Field>
          </div>
          <Field label="Lab/Group" required className="mt-5"><input className={INPUT} type="text" name="lab" placeholder="Name of lab/group" /></Field>
          <Field label="Email" required help="Please use your work/university email address." className="mt-5">
            <input className={INPUT} type="email" name="email" placeholder="you@acme.edu" />
          </Field>
          <Field label="Phone number (optional)" help="If you'd like us to call you, please provide your phone number below." className="mt-5">
            <div className="flex">
              <div className="relative h-[54px] w-[67.7px] shrink-0">
                <select
                  name="country"
                  defaultValue="US"
                  aria-label="Country code"
                  className="h-full w-full appearance-none rounded-l-xl border border-r-0 border-[#9fa8b5] bg-white pl-4 pr-6 font-sans text-[16px] text-[#212d3a]"
                >
                  <option value="US">🇺🇸</option>
                  <option value="GB">🇬🇧</option>
                  <option value="NL">🇳🇱</option>
                  <option value="CH">🇨🇭</option>
                  <option value="DE">🇩🇪</option>
                  <option value="IN">🇮🇳</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"><Caret /></span>
              </div>
              <input className={`${INPUT} !rounded-l-none`} type="tel" name="phone" />
            </div>
          </Field>
          <Field label="Tell us more about your project" required help={ph(25, 60)} className="mt-5">
            <textarea className={`${INPUT} block h-[74px] resize-y py-3`} name="project" placeholder="Please provide project context." />
          </Field>
          <Field label="Where did you hear about Cradle? (optional)" className="mt-6">
            <input className={INPUT} type="text" name="source" placeholder="Where did you hear about Cradle?" />
          </Field>
          <p className="mt-5 font-sans text-[16px] font-normal leading-5 text-[#4a5463]">
            {ph(39, 61)}{' '}
            {/* EXTERNAL Privacy Policy link (HubSpot) — rendered without a target */}
            <span className="text-[#0000ee] underline">Privacy Policy</span>.
          </p>
          <div className="mt-auto flex pt-[60px] md:justify-end">
            <button
              type="submit"
              className="h-11 w-full rounded-xl bg-[#0151f8] px-6 font-sans text-[16px] font-bold leading-5 text-white md:w-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
