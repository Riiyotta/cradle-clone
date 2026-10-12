import FormPage from '../components/resources/FormPage.jsx'

// PAGES_A /contact (C1 header, C2 FormCard, C3 TrustTicker) — same template as /get-started
export default function Contact() {
  return (
    <FormPage
      variant="contact"
      title="Nice to meet you."
      lead="Do you want to partner with Cradle, or just get in touch? You can do that with the form below."
      cardTitle="Get in touch with Cradle"
    />
  )
}
