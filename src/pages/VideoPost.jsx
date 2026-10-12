import { useParams } from 'react-router-dom'
import cms from '../data/cms.json'
import NotFound from './NotFound.jsx'
import { PosterPlayer } from '../components/media/shared.jsx'

// B4 Video template /video/:slug. Hero has a fixed height of 1039 with content centered vertically.
// Content can be taller than the 959px box; it then overflows evenly, as on live (h1 top = 83 at 1440).
// Live bug (B14) not reproduced: the h1 stays 62px on mobile. Here it shrinks to 40/38/-1.6, the /video h1 mobile scale.
export default function VideoPost() {
  const { slug } = useParams()
  const video = cms.video.find((v) => v.slug === slug)
  if (!video) return <NotFound />

  return (
    <section className="flex h-[1039px] w-full flex-col items-center justify-center bg-ink pt-20">
      <div className="flex w-full flex-col items-center gap-[70px] p-10">
        <h1 className="w-full max-w-[1360px] text-center font-heading text-[40px] font-medium leading-[38px] tracking-[-1.6px] text-white md:text-[62px] md:leading-[58.9px] md:tracking-[-2.48px]">
          {video.title}
        </h1>
        <PosterPlayer poster={video.poster} title={video.title} className="aspect-video w-full max-w-[1360px] rounded-[20px]" />
      </div>
    </section>
  )
}
