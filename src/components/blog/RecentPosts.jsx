import { RECENT } from './blogData.js'
import { PostRowRecent } from './PostRow.jsx'
import { ButtonDefault, Ghost36, Secondary36P16 } from './Buttons.jsx'

// §B2.4 RecentPosts (bottom of every CMS post and /blog/maturity). 5 rows desktop, 3 on phone.
// "Print this article" → /blog/<slug>/print is unmeasured, so it renders without a link (brief: drop print hrefs).
// /blog/maturity's copy has no buttons row (reference/pages/blog-maturity-1440.png).
export default function RecentPosts({ showButtons = true }) {
  return (
    <section className="flex w-full flex-col items-center gap-10 bg-gray-50 px-4 py-10 md:px-0 md:py-20">
      <div className="flex w-full max-w-[358px] flex-col gap-10 md:max-w-[640px]">
        <div className="flex flex-col items-start gap-5">
          <h3 className="font-heading text-[24px] font-medium leading-[28.8px] tracking-[-0.48px] text-ink md:text-[32px] md:leading-[38.4px] md:tracking-[-0.64px]">
            Recent posts
          </h3>
          <p className="max-w-[400px] font-sans text-[14px] font-medium leading-[22.4px] tracking-[-0.28px] text-muted md:text-[16px] md:leading-[25.6px] md:tracking-[-0.32px]">
            Subscribe and get new posts and updates from Cradle straight to your inbox.
          </p>
          <ButtonDefault className="h-10 w-full md:w-auto">Subscribe</ButtonDefault>
        </div>
        <div className="flex flex-col">
          {RECENT.map((p, i) => (
            <div key={p.slug} className={i >= 3 ? 'hidden md:block' : ''}>
              <PostRowRecent post={p} />
            </div>
          ))}
        </div>
        {showButtons && (
          <div className="flex gap-[10px]">
            <Secondary36P16 to="/blog" className="max-md:h-[49px] max-md:flex-1">See all posts</Secondary36P16>
            <Ghost36 className="max-md:h-[49px] max-md:flex-1">Print this article</Ghost36>
          </div>
        )}
      </div>
    </section>
  )
}
