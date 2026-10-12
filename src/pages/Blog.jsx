import { useEffect } from 'react'
import { POSTS, CASE_RAIL, NEWS_RAIL, TEAM_RAIL } from '../components/blog/blogData.js'
import { BlogHeading, FeaturedPostCard, GroupRail, MaturityPromoCard, NewsletterBand, SubscribeCard, railTitle } from '../components/blog/BlogIndexParts.jsx'
import { PostRowIndex } from '../components/blog/PostRow.jsx'
import { Secondary36P16 } from '../components/blog/Buttons.jsx'

// PAGES_B §B1 /blog index. No filters, no pagination; "All posts" = all 53 CMS posts in cms.json order.
export default function Blog() {
  useEffect(() => { document.title = 'Blog - Cradle' }, [])
  return (
    <>
      {/* §B1.1 frame: max-w 1280, padding 144 40 80, gap 40 (phone: 0 0 58) */}
      <div className="flex w-full max-w-container flex-col gap-10 pb-[58px] md:px-10 md:pb-20 md:pt-36">
        <BlogHeading />
        {/* §B1.3 sections row: left 777.1 (gap 80) + sticky subscribe card, gap 64 */}
        <div className="flex items-start gap-16">
          <div className="flex min-w-0 flex-1 flex-col gap-10 pb-6 md:gap-20 md:pb-0 lg:w-[777.1px] lg:flex-none">
            <FeaturedPostCard post={POSTS[0]} />
            <GroupRail
              title="Case studies"
              posts={CASE_RAIL}
              titleColor="#1f2937"
              mobileCount={4}
              action={<Secondary36P16 to="/case">See all case studies</Secondary36P16>}
            />
            <MaturityPromoCard />
            <GroupRail title="News & Updates" posts={NEWS_RAIL} />
            <GroupRail title="Meet the team" posts={TEAM_RAIL} />
          </div>
          <SubscribeCard />
        </div>
        {/* §B1.7 All posts */}
        <section className="flex flex-col gap-5 px-5 pb-5 md:p-0">
          <h3 className={railTitle}>All posts</h3>
          <div className="flex flex-col">
            {/* Live quirk (measured 390): the phone list omits the 9 "Stories" posts; desktop shows all 53. */}
            {POSTS.map((p) => (
              <div key={p.slug} className={p.categories.includes('Stories') ? 'max-md:hidden' : ''}>
                <PostRowIndex post={p} />
              </div>
            ))}
          </div>
        </section>
      </div>
      <NewsletterBand />
    </>
  )
}
