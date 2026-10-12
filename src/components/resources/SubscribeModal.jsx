import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import NewsletterForm from './NewsletterForm.jsx'

// PAGES_A /case K3 modal: overlay rgba(0,0,0,.8); dialog 720×409.6, bg #f3f4f6, radius 16,
// padding-top 50, gap 10, shadow rgba(0,0,0,.25) 0 1px 9px (measured live). Live opens with
// no measurable tween (fully visible at the first 50ms sample); a short fade is used here.
export default function SubscribeModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: [0.12, 0.23, 0.5, 1] }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="subscribe-modal-title"
            className="flex w-full max-w-[720px] flex-col items-center gap-[10px] rounded-2xl bg-gray-100 px-5 pb-[30px] pt-[50px] shadow-[rgba(0,0,0,.25)_0_1px_9px_0]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.12, 0.23, 0.5, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="subscribe-modal-title" className="m-0 text-center font-heading text-[24px] font-medium leading-[28.8px] tracking-[-0.48px] text-ink md:text-[32px] md:leading-[38.4px] md:tracking-[-0.64px]">
              Subscribe to updates
            </h3>
            <p className="m-0 max-w-[400px] text-center font-sans text-[16px] font-medium leading-[25.6px] tracking-[-0.32px] text-muted">
              Get new posts and other Cradle updates directly to your inbox. No spam :)
            </p>
            <div className="mt-[10px] w-full max-w-[560px] pb-[8.8px]">
              <NewsletterForm id="nl-modal" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
