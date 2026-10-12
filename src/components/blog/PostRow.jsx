import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { shortDate } from './blogData.js'

const MotionLink = motion.create(Link)

function Thumb({ src }) {
  // 64×40 r6, cover, ::after 1px rgba(27,27,177,.04)
  return (
    <div className="fborder h-10 w-16 shrink-0 rounded-md" style={{ '--fb': '1px solid rgba(27,27,177,.04)' }}>
      <img src={src} alt="" loading="lazy" className="h-full w-full rounded-[inherit] object-cover" />
    </div>
  )
}

// §B1.7 PostRow (index). Hover: rowHoverText = title → #030712 (≈150ms) + underline (instant).
export function PostRowIndex({ post }) {
  return (
    <MotionLink
      to={post.path}
      initial="rest"
      whileHover="hover"
      className="group flex w-full flex-wrap items-center gap-x-3 gap-y-5 py-4 shadow-[inset_0_-0.5px_0_0_#f3f4f6] md:flex-nowrap md:gap-5"
    >
      <Thumb src={post.cover} />
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <motion.p
          variants={{ rest: { color: '#1f2937' }, hover: { color: '#030712' } }}
          transition={{ duration: 0.15 }}
          className="min-w-0 flex-1 font-sans text-[14px] font-medium leading-[22.4px] group-hover:underline"
        >
          {post.title}
        </motion.p>
        <time dateTime={post.date} className="hidden shrink-0 text-right font-sans text-[14px] font-medium leading-[22.4px] text-gray-400 md:block">
          {shortDate(post.date)}
        </time>
      </div>
    </MotionLink>
  )
}

// §B2.4 PostRow (recent). Hover: title underline (instant).
export function PostRowRecent({ post }) {
  return (
    <Link to={post.path} className="group flex w-full flex-wrap items-center gap-5 py-4 shadow-[inset_0_-1px_0_0_#f3f4f6] md:flex-nowrap">
      <Thumb src={post.cover} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="font-sans text-[16px] font-medium leading-[25.6px] text-gray-800 group-hover:underline">{post.title}</p>
        <time dateTime={post.date} className="font-sans text-[9px] font-bold uppercase leading-[11.7px] tracking-[1.08px] text-gray-400 md:text-[11px] md:leading-[14.3px] md:tracking-[-0.44px]">
          {shortDate(post.date)}
        </time>
      </div>
    </Link>
  )
}
