import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react'

const STATS = [
  { value: '15+',      label: 'Engineers Led' },
  { value: 'Ministry', label: 'Scale System' },
  { value: 'R² > 0.8', label: 'ML Accuracy' },
  { value: '3+',       label: 'Major Systems' },
]

const ROLES = ['Technical Lead', 'Backend Engineer','Frontend Engineer', 'AI Integrator']

const up = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const go = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden">

      {/* Dot grid background — fades from center */}
      <div className="absolute inset-0 dot-grid" />

      {/* Subtle top gradient wash */}
      <div
        className="absolute top-0 inset-x-0 h-[480px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.09) 0%, transparent 70%)',
        }}
      />

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      {/* ── Main content ── */}
      <div className="relative z-10 container-inner flex flex-col items-center text-center pt-28 pb-16 gap-6">

        {/* Available badge */}
        <motion.div {...up(0.05)}>
          <span className="pill gap-2 text-[12px] px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.7)]" />
            <Sparkles size={11} strokeWidth={2.5} />
            Available for new opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.div {...up(0.15)}>
          <h1 className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-black tracking-tighter leading-[0.88]">
            <span className="text-gradient">Nguyễn Tùng</span>
          </h1>
        </motion.div>

        {/* Role tags */}
        <motion.div {...up(0.25)} className="flex flex-wrap justify-center gap-2">
          {ROLES.map((role, i) => (
            <span
              key={role}
              className="px-4 py-1.5 rounded-full text-[13px] font-medium bg-white border border-gray-200 text-gray-600 shadow-sm"
            >
              {role}
            </span>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.p
          {...up(0.35)}
          className="max-w-[600px] text-gray-500 text-base md:text-[17px] leading-[1.75]"
        >
          Experienced Technical Lead and Database Engineer who has managed a{' '}
          <strong className="font-semibold text-gray-800">15-member engineering team</strong>.
          {' '}Specializing in enterprise database systems, microservices, and leveraging{' '}
          <strong className="font-semibold text-gray-800">AI & Agentic Workflows</strong>{' '}
          to solve large-scale problems.
        </motion.p>

        {/* CTA buttons */}
        <motion.div {...up(0.45)} className="flex flex-col sm:flex-row gap-3 pt-2">
          <button onClick={() => go('#contact')} className="btn-primary group text-[14px] px-7 py-3.5">
            Get In Touch
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </button>
          <button onClick={() => go('#experience')} className="btn-ghost text-[14px] px-7 py-3.5">
            View My Work
          </button>
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          {...up(0.58)}
          className="mt-6 w-full max-w-lg"
        >
          {/* Horizontal rule */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8" />

          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden"
            style={{ background: '#e5e7eb', border: '1px solid #e5e7eb' }}
          >
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="bg-white py-5 px-3 text-center hover:bg-indigo-50/50 transition-colors duration-200 group cursor-default"
              >
                <p
                  className="text-xl md:text-2xl font-black tabular-nums"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {value}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-gray-400 font-medium">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={() => go('#skills')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
      >
        <span className="text-[9px] uppercase tracking-[0.2em] font-mono">scroll</span>
        <ChevronDown size={14} className="animate-bounce" />
      </motion.button>
    </section>
  )
}
