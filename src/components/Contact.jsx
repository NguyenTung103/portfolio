import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUpRight, MapPin } from 'lucide-react'

const LINKS = [
  {
    icon:    Github,
    label:   'GitHub',
    sub:     'github.com/your-handle',
    href:    'https://github.com/NguyenTung103',
    accent:  '#1e293b',
    light:   '#f8fafc',
    border:  '#e2e8f0',
    hover:   '#f1f5f9',
    shadow:  'rgba(15,23,42,0.1)',
  },  
  {
    icon:    Mail,
    label:   'Email',
    sub:     'nguyentientung.tk.hd@gmail.com',
    href:    'mailto:nguyentientung.tk.hd@gmail.com',
    accent:  '#7c3aed',
    light:   '#f5f3ff',
    border:  '#ddd6fe',
    hover:   '#ede9fe',
    shadow:  'rgba(124,58,237,0.15)',
  },
]

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="contact" className="section-pad relative overflow-hidden" style={{ background: '#f9fafb' }}>

      {/* Gradient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 110%, rgba(99,102,241,0.07) 0%, transparent 60%)',
        }}
      />

      <div ref={ref} className="container-inner relative z-10">

        {/* ── CTA header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="section-eyebrow">Let's Connect</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-sub">
            Open to senior engineering, technical lead, and architectural consulting
            opportunities. Feel free to reach out — I respond within 24 hours.
          </p>
          <div className="inline-flex items-center gap-1.5 mt-5 text-[12px] text-gray-500">
            <MapPin size={12} strokeWidth={2} className="text-gray-400" />
            Vietnam — Remote friendly
          </div>
        </motion.div>

        {/* ── Contact cards ── */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
          {LINKS.map(({ icon: Icon, label, sub, href, accent, light, border, hover, shadow }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.12 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, boxShadow: `0 12px 32px ${shadow}` }}
              whileTap={{ y: 0 }}
              className="flex-1 flex items-center gap-3.5 p-5 rounded-2xl cursor-pointer transition-colors duration-200 group"
              style={{
                background: light,
                border: `1px solid ${border}`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = hover}
              onMouseLeave={e => e.currentTarget.style.background = light}
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: '#ffffff', border: `1.5px solid ${border}` }}
              >
                <Icon size={18} style={{ color: accent }} strokeWidth={1.75} />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold text-gray-900">{label}</p>
                <p className="text-[11px] text-gray-400 truncate font-mono mt-0.5">{sub}</p>
              </div>

              {/* Arrow */}
              <ArrowUpRight
                size={15}
                strokeWidth={2}
                style={{ color: accent, opacity: 0.5 }}
                className="flex-shrink-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.a>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-20"
      >
        <div className="container-inner">
          {/* Divider */}
          <div className="h-px bg-gray-200 mb-8" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Brand */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black font-mono text-white"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
              >
                NT
              </div>
              <span className="text-[14px] font-semibold text-gray-700">Nguyễn Tùng</span>
            </div>

            {/* Copyright */}
            <p className="text-[12px] text-gray-400 font-mono">
              © {new Date().getFullYear()} — Technical Lead · Backend · AI
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {LINKS.map(({ icon: Icon, label, href, accent }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 group"
                  style={{ border: '1px solid #e5e7eb' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = accent
                    e.currentTarget.style.borderColor = accent
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = '#e5e7eb'
                    e.currentTarget.style.color = '#9ca3af'
                  }}
                >
                  <Icon size={14} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </section>
  )
}
