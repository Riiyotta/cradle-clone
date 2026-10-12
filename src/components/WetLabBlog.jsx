// CLONE_SPEC §12 Learnings from our wet lab (`lab-blog-posts` #2). Card styles/hover identical to §5.

const CARDS = [
  { img: 'blog-beyond-the-bench.png', href: './blog/beyond-the-bench', title: 'We put our CTO in a lab coat. Here’s what happened next.' },
  { img: 'blog-sample-tracking.jpg', href: './blog/sample-tracking', title: 'Backbone of high-throughput experimentation: Design principles for ML-ready sample tracking' },
  { img: 'blog-webinar-lab-automation.jpg', href: './blog/webinar-lab-automation', title: 'Lab automation for faster ML-driven protein engineering' },
  { img: 'blog-protein-tags.png', href: './blog/how-protein-tags-revolutionize-lab-automation', title: "Next-level high throughput workflows: Gotta tag 'em all" },
]

function Card({ img, href, title, className = '' }) {
  return (
    <a href={href} className={`group flex min-w-0 flex-col items-start gap-4 self-start no-underline md:w-px md:flex-1 ${className}`}>
      {/* Image aspect 1.88235 (302×160.4), r16; ::after 4px rgba(45,102,248,0) → #2d66f8 on hover. Live: border + title colour tween 150ms, ease [0.12,0.23,0.5,1] */}
      <div
        className="fborder fborder-anim w-full aspect-[1.88235] rounded-2xl group-hover:[--wl-border:#2d66f8]"
        style={{ '--fb': '4px solid var(--wl-border,rgba(45,102,248,0))' }}
      >
        <img src={`/assets/${img}`} alt="" className="absolute inset-0 h-full w-full rounded-[inherit] object-cover object-center" />
      </div>
      <p className="w-full font-sans font-medium text-muted text-[14px] leading-[22.4px] md:leading-[21px] tracking-[-0.28px] transition-colors duration-150 ease-[cubic-bezier(0.12,0.23,0.5,1)] group-hover:text-ink lg:text-[16px] lg:leading-[25.6px] lg:tracking-[-0.32px]">
        {title}
      </p>
    </a>
  )
}

export default function WetLabBlog() {
  return (
    <section className="relative flex w-full flex-col items-center bg-white px-4 pt-10 pb-16 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.04)] md:px-10 md:pb-20 lg:pt-20 lg:pb-[120px]">
      <div className="flex w-full max-w-container flex-col items-start gap-8 md:gap-10">
        <h3 className="w-full font-heading font-medium text-ink text-[24px] leading-[28.8px] tracking-[-0.48px] lg:text-[32px] lg:leading-[38.4px] lg:tracking-[-0.64px]">
          Learnings from our wet lab
        </h3>
        <div className="grid w-full grid-cols-2 auto-rows-fr gap-6 md:flex md:items-start md:gap-3 lg:gap-6">
          {CARDS.map((c, i) => <Card key={c.href} {...c} className={i === 3 ? 'md:hidden lg:flex' : ''} />)}
        </div>
      </div>
    </section>
  )
}
