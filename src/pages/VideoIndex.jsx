import { useState } from 'react'
import cms from '../data/cms.json'
import { CategorySelect, VideoRow, LoadMore } from '../components/media/VideoIndexParts.jsx'

// B5 /video. Page size 4 in CMS order. The category filter runs locally over cms.json.
const PAGE = 4

export default function VideoIndex() {
  const [category, setCategory] = useState('All')
  const [count, setCount] = useState(PAGE)
  const list = category === 'All' ? cms.video : cms.video.filter((v) => v.category === category)
  const shown = list.slice(0, count)

  return (
    <section className="flex w-full flex-col items-center gap-[10px] bg-ink pt-[65px]">
      <div className="flex w-full flex-col gap-6 md:flex-row md:items-center md:gap-[130px] px-4 py-[60px] md:p-[60px]">
        <h1 className="font-heading text-[40px] font-medium leading-[38px] tracking-[-1.6px] text-white md:text-[80px] md:leading-[76px] md:tracking-[-3.2px]">Cradle Videos</h1>
        <CategorySelect value={category} onChange={(c) => { setCategory(c); setCount(PAGE) }} />
      </div>
      <div className="flex w-full flex-col items-start gap-5 p-4 md:p-[60px]">
        {shown.map((v) => <VideoRow key={v.slug} video={v} />)}
        {list.length > count && <LoadMore onClick={() => setCount((c) => c + PAGE)} />}
      </div>
    </section>
  )
}
