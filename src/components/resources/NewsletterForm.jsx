import { useState } from 'react'

// Static local replacement for the MailerLite embed (PAGES_A /careers C5, /case K2 + K3 modal).
// Measured inside the live srcdoc iframe: inputs h43 Inter 14/400 #666, bg white, 1px #ccc,
// radius 12, padding 10, gap 10; checkbox row (13px box, label 12/400 #5c5c5c, 24px indent)
// 20px below; Subscribe 41 tall, #2d66f8, radius 12, Inter 14/700 white, 20px below.
const input = 'block w-full h-[43px] rounded-xl border border-solid border-[#ccc] bg-white px-[10px] font-sans text-[14px] font-normal text-[#666] outline-none placeholder:text-[#666] focus:border-[#2d66f8]'

export default function NewsletterForm({ id = 'nl' }) {
  const [sent, setSent] = useState(false)
  if (sent) {
    return (
      <div role="status" className="flex min-h-[201px] flex-col justify-center gap-2 font-sans text-ink">
        <p className="text-[20px] font-semibold leading-[26px]">Thanks!</p>
        <p className="text-[14px] leading-[20px] text-[#5c5c5c]">You&apos;re on the list.</p>
      </div>
    )
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="flex w-full flex-col">
      <div className="flex flex-col gap-[10px]">
        <input aria-label="First name" name="name" placeholder="First name" className={input} />
        <input aria-label="Email" name="email" type="email" required placeholder="Email" className={input} />
      </div>
      <label htmlFor={`${id}-optin`} className="relative mt-5 flex min-h-6 cursor-pointer items-center pl-6">
        <input id={`${id}-optin`} type="checkbox" className="absolute left-0 top-[5px] m-0 h-[13px] w-[13px]" />
        <span className="font-sans text-[12px] font-normal leading-[18px] text-[#5c5c5c]">Yes, I want to receive updates from Cradle.</span>
      </label>
      <button type="submit" className="mt-5 h-[41px] w-full cursor-pointer rounded-xl border-0 bg-accent px-[10px] font-sans text-[14px] font-bold text-white">
        Subscribe
      </button>
    </form>
  )
}
