import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <section className="min-h-[70vh] w-full grid place-items-center pt-[140px] px-4 text-center">
      <div>
        <h1 className="font-heading font-medium text-[64px] leading-none tracking-[-2.56px] text-ink">Page not found</h1>
        <Link to="/" className="mt-6 inline-block font-semibold text-brand">Back to home</Link>
      </div>
    </section>
  )
}
