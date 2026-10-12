import { PresskitTitle, PresskitFileList, PRESS_SECTIONS } from '../components/media/Presskit.jsx'

// B7 /presskit
export default function Presskit() {
  return (
    <div className="flex w-full flex-col items-center bg-white px-5 pb-20 md:px-20 md:pb-[120px]">
      <PresskitTitle />
      <div className="flex w-full max-w-[960px] flex-col gap-10">
        {PRESS_SECTIONS.map(([title, items]) => <PresskitFileList key={title} title={title} items={items} />)}
      </div>
    </div>
  )
}
