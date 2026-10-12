import { Link } from 'react-router-dom'

// B5 /video index parts: CategorySelect, VideoRow, LoadMore

export const CATEGORIES = ['All', 'Academy', 'Keynote', 'Webinar', 'Case study', 'Other']

// Framer default form styles (grey on dark), as measured.
export function CategorySelect({ value, onChange }) {
  return (
    <label className="flex w-[180px] shrink-0 flex-col gap-2">
      <p className="font-sans text-[12px] font-medium leading-[14.4px] text-[#666]">Category</p>
      <div className="fborder relative h-10 w-[180px] rounded-[10px] bg-[rgba(187,187,187,.15)] pr-3 [--fb:1px_solid_rgba(136,136,136,.1)]">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-full w-full cursor-pointer appearance-none bg-transparent p-3 font-sans text-[14px] font-normal leading-[16.8px] text-[#222] outline-none"
        >
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <svg viewBox="0 0 16 16" className="pointer-events-none absolute right-[10px] top-1/2 h-4 w-4 -translate-y-1/2" aria-hidden="true">
          <path d="M3.5 6 L8 10.5 L12.5 6" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </label>
  )
}

// Live desktop: row with 560×315 media, gap 27, height 315, text vertically centered. No hover.
// Mobile (B5 recommended fix for the live overflow bug): media stacks full width above the text.
export function VideoRow({ video }) {
  return (
    <Link to={`/video/${video.slug}`} className="flex w-full flex-col gap-4 md:h-[315px] md:flex-row md:items-center md:gap-[27px]">
      <div className="aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-black md:aspect-auto md:h-[315px] md:w-[560px]">
        <img src={video.poster} alt="" className="h-full w-full object-cover" draggable={false} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[10px]">
        <p className="font-mono text-[13px] font-medium uppercase leading-[13px] tracking-[0.26px] text-gray-400 md:text-[16px] md:leading-4 md:tracking-normal">{video.category}</p>
        <h4 className="font-heading text-[18px] font-medium leading-[21.6px] text-white md:text-[24px] md:leading-[28.8px]">{video.title}</h4>
      </div>
    </Link>
  )
}

// "Load More": measured 100×40, bg #444, radius 10, Inter 14/16.8/600 white.
export function LoadMore({ onClick }) {
  return (
    <button type="button" onClick={onClick} className="flex h-10 w-[100px] items-center justify-center rounded-[10px] bg-[#444] px-[14px] font-sans text-[14px] font-semibold leading-[16.8px] text-white">
      Load More
    </button>
  )
}
