import { Eyebrow, Button } from './ui.jsx'

// CLONE_SPEC §11 The Cradle lab (`lab`)

const P = 'font-sans font-medium text-muted text-[16px] leading-[24px] tracking-[-0.64px] lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.8px]'

export default function Lab() {
  return (
    <section id="lab" className="relative flex w-full flex-col items-center gap-8 overflow-hidden bg-white px-4 pt-16 pb-10 md:px-10 md:pt-20 lg:gap-20 lg:pt-[120px] lg:pb-20">
      <div className="flex w-full max-w-container flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
        {/* Left */}
        <div className="flex w-full flex-col items-start gap-5 md:gap-10 lg:w-px lg:flex-1 lg:gap-[30px]">
          <div className="flex w-full flex-col gap-3 lg:gap-5">
            <Eyebrow>THE CRADLE LAB</Eyebrow>
            <h2 className="w-full font-heading font-medium text-ink text-[32px] leading-[35.2px] tracking-[-0.64px] md:text-[48px] md:leading-[48px] md:tracking-[-1.92px] lg:text-[64px] lg:leading-[64px] lg:tracking-[-2.56px]">
              AI that gets better<br />every two weeks
            </h2>
          </div>
          {/* One rich-text block, paragraph spacing 20px; <br><br> inside paragraph 1.
              Spec §11 says phone has no blank line, but live-390.png shows a 48px (= 2×24 line) step, so the blank line is kept on phone too. */}
          <div className="flex w-full flex-col gap-5">
            <p className={P}>
              Cradle isn’t a CRO, so why do we run our own wet lab in Amsterdam?
              <br />
              <br />
              It's simple. So you get reliable and high-performing models from day one, while your proprietary data remains completely private.
            </p>
            <p className={P}>
              Much like a self-driving car company: they wouldn’t just design algorithms and cross their fingers. They need to test real-world scenarios and collect data in order to fine-tune performance. We take the same approach, ensuring our models are performant even before seeing your data.
            </p>
          </div>
          <Button href="./lab" className="hidden md:inline-flex">Get to know our wet lab</Button>
          {/* Phone: Secondary36, padding 0 24, text 13/600/15.6/-0.13 */}
          <Button
            variant="secondary"
            size={36}
            href="./lab"
            className="md:hidden !px-6 !text-[13px] !leading-[15.6px] !tracking-[-0.13px]"
          >
            Get to know our wet lab
          </Button>
        </div>
        {/* Right: image 600×576.9 (aspect 1.04) r24; phone 358×250 r16, padding-top 6 */}
        <div className="flex w-full pt-[6px] md:pt-0 lg:w-px lg:flex-1 lg:pt-14">
          <div className="relative h-[250px] w-full overflow-hidden rounded-2xl md:h-[400px] md:rounded-3xl lg:h-auto lg:aspect-[1.04]">
            <img src="/assets/lab-photo.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
          </div>
        </div>
      </div>
    </section>
  )
}
