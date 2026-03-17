import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About',      href: '#hero' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

function smoothScroll(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (e, href) => { e.preventDefault(); smoothScroll(href); setOpen(false) }

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/92 backdrop-blur-xl border-b border-gray-200/70 shadow-sm shadow-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="container-inner">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <a href="#hero" onClick={e => go(e, '#hero')}
             className="flex items-center gap-2.5 group select-none">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black font-mono text-white transition-transform duration-200 group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 2px 8px rgba(99,102,241,0.4)',
              }}
            >
              NT
            </div>
            <span className="font-bold text-gray-900 text-[15px] tracking-tight group-hover:text-indigo-600 transition-colors hidden sm:block">
              Nguyễn Tùng
            </span>
          </a>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} onClick={e => go(e, href)}
                 className="px-3.5 py-2 rounded-lg text-[13px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-150">
                {label}
              </a>
            ))}
            <a href="#contact" onClick={e => go(e, '#contact')}
               className="ml-3 btn-primary text-[13px] py-2 px-5">
              Hire Me
            </a>
          </nav>

          {/* ── Mobile toggle ── */}
          <button onClick={() => setOpen(v => !v)}
                  className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  aria-label="Menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white border-b border-gray-200"
          >
            <div className="container-inner py-3 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <a key={label} href={href} onClick={e => go(e, href)}
                   className="px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 transition-all duration-150">
                  {label}
                </a>
              ))}
              <a href="#contact" onClick={e => go(e, '#contact')}
                 className="mt-1 btn-primary justify-center text-[13px] py-3">
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
