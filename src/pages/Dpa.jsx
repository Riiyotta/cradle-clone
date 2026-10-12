import DocViewer from '../components/misc/DocViewer.jsx'

// PAGES_B §B11 /dpa (light nav + dark footer are handled globally). No motion on live.
export default function Dpa() {
  return (
    <div className="w-full flex flex-row justify-center items-center pt-[84px]">
      <div className="w-full flex flex-col items-center justify-center gap-10 pt-14 px-5 pb-20 md:p-20 md:gap-20">
        <div className="w-full max-w-container flex flex-col items-center justify-center gap-5 md:gap-10">
          <h1 className="w-full text-center font-heading font-medium text-ink text-[40px] leading-[38px] tracking-[-1.6px] md:text-[80px] md:leading-[76px] md:tracking-[-3.2px]">
            Data Processing
            <br />
            Addendum
          </h1>
          {/* Download → framerusercontent PDF (EXTERNAL): rendered without an href */}
          <a className="flex flex-row items-center gap-[5px] h-11 md:h-12 px-5 rounded-lg bg-blue-50 font-sans font-semibold text-[16px] leading-4 text-brand cursor-pointer" aria-disabled="true">
            Download
          </a>
        </div>
        <DocViewer />
      </div>
    </div>
  )
}
