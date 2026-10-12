import { useEffect, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import { routes } from './routes.jsx'
import { chromeFor } from './chrome.js'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Shell() {
  const { pathname } = useLocation()
  const chrome = chromeFor(pathname)
  return (
    <>
      <ScrollToTop />
      {chrome.nav && <Navbar desktop={chrome.nav.desktop} phone={chrome.nav.phone} />}
      <main id="main" className="flex flex-col items-center overflow-x-clip">
        <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {routes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      {chrome.footer && <Footer variant={chrome.footer} />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
