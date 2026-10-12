import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import NotFound from './NotFound.jsx'
import { POST_BY_SLUG } from '../components/blog/blogData.js'
import { buildBody } from '../components/blog/postBody.js'
import { PostHeader, RichText } from '../components/blog/PostParts.jsx'
import RecentPosts from '../components/blog/RecentPosts.jsx'

// PAGES_B §B2 post template for the 53 CMS posts. Body text is generated placeholder.
export default function BlogPost() {
  const { slug } = useParams()
  const post = POST_BY_SLUG[slug]
  const blocks = useMemo(() => (post ? buildBody(post) : null), [post])
  if (!post) return <NotFound />
  return (
    <>
      {/* postEnter (exact): opacity .001→1, y 80→0, perspective 1200, tween 0.3s [0.15,0.45,0.15,1.15] */}
      <motion.article
        key={slug}
        initial={{ opacity: 0.001, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.15, 0.45, 0.15, 1.15] }}
        style={{ transformPerspective: 1200 }}
        className="flex w-full max-w-container flex-col items-center gap-10 px-5 pb-[60px] pt-[90px] md:px-0 md:pb-10 md:pt-36"
      >
        <div className="flex w-full flex-col items-center pt-5 md:px-10 md:pt-0">
          <div className="flex w-full max-w-[350px] flex-col items-center md:max-w-[640px]">
            <PostHeader post={post} />
            <RichText blocks={blocks} post={post} />
          </div>
        </div>
      </motion.article>
      <RecentPosts />
    </>
  )
}
