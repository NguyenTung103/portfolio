import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Database, Server, Brain, Users,
  ExternalLink, FileText, Award, Cpu, ArrowRight,
} from 'lucide-react'

/* ── Data ─────────────────────────────────────────────────────────── */

const EXPERIENCE = {
  badge:   'Lead Engineer',
  icon:    Database,
  title:   'National Education Sector Database',
  subtitle:'CSDL Ngành GD&ĐT — Ministry of Education & Training',
  stack:   ['SQL Server', 'ASP.NET WebForm', 'Telerik UI'],
  tag:     'Ministry-Level System',
  description:
    'Played a key role in developing and maintaining the centralized educational database for the Ministry and Department of Education and Training. Handled complex enterprise data requirements and large-scale deployments across multiple provinces and institutions.',
  highlights: [
    { icon: Users,  text: 'Led & coordinated a 15-member technical team' },
    { icon: Award,  text: 'Ensured system stability and feature delivery at national scale' },
    { icon: Server, text: 'Multi-region deployments across provinces and institutions' },
  ],
}

const PROJECTS = [
  {
    badge:    'Optimization',
    icon:     Cpu,
    accent:   '#d97706',
    light:    '#fffbeb',
    border:   '#fde68a',
    title:    'Smart School Timetabling System',
    stack:    ['.NET 8', 'SQL Server', 'Google OR-Tools'],
    description:
      'Engineered a backend system to automate and optimize complex school scheduling using constraint-based algorithms. Reduces schedule generation from days to seconds with zero hard conflicts.',
    hasPRD:   true,
    metrics:  [
      { label: 'Generation Time', value: '< 30s' },
      { label: 'Hard Conflicts',  value: '0%' },
    ],
  },
  {
    badge:    'Machine Learning',
    icon:     Brain,
    accent:   '#059669',
    light:    '#ecfdf5',
    border:   '#a7f3d0',
    title:    'Student Score Prediction Engine',
    stack:    ['ML.NET', 'SQL Server', 'Agentic AI'],
    description:
      'Built a predictive model using historical student data to forecast academic performance. Orchestrated the workflow with AI agents (Claude Code, Gemini) for rapid iteration.',
    hasPRD:   false,
    metrics:  [
      { label: 'R² Score', value: '> 0.8' },
      { label: 'MAE',      value: '~ 0.45' },
    ],
  },
]

/* ── Shared micro-components ───────────────────────────────────────── */

function TechBadge({ label }) {
  return (
    <span className="tech-badge">{label}</span>
  )
}

/* ── Featured Experience Card ─────────────────────────────────────── */

function ExperienceCard({ data }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const Icon   = data.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card overflow-hidden"
      style={{ borderColor: '#c7d2fe' }}
    >
      {/* Gradient top bar */}
      <div
        className="h-1 w-full"
        style={{ background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)' }}
      />

      <div className="p-7 md:p-9">
        {/* Top row: identity + stack */}
        <div className="flex flex-wrap items-start justify-between gap-5 mb-7">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: '#eef2ff',
                border: '1.5px solid #c7d2fe',
              }}
            >
              <Icon size={22} className="text-indigo-600" strokeWidth={1.75} />
            </div>

            {/* Title block */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="pill text-[11px]">{data.badge}</span>
                <span className="text-[11px] font-mono text-gray-400">{data.tag}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight leading-tight">
                {data.title}
              </h3>
              <p className="text-[13px] text-gray-500 mt-1 font-medium">{data.subtitle}</p>
            </div>
          </div>

          {/* Stack badges */}
          <div className="flex flex-wrap gap-1.5">
            {data.stack.map(s => <TechBadge key={s} label={s} />)}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-[15px] leading-[1.75] mb-7">{data.description}</p>

        {/* Highlights */}
        <div className="grid sm:grid-cols-3 gap-3">
          {data.highlights.map(({ icon: HIcon, text }) => (
            <div
              key={text}
              className="flex items-start gap-3 p-4 rounded-2xl"
              style={{
                background: '#fafafa',
                border: '1px solid #e5e7eb',
                borderLeft: '3px solid #6366f1',
              }}
            >
              <HIcon size={14} className="text-indigo-500 mt-0.5 flex-shrink-0" strokeWidth={2} />
              <span className="text-[13px] text-gray-600 leading-snug font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Project Card ─────────────────────────────────────────────────── */

function ProjectCard({ data, index, onOpenPRD }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const Icon   = data.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.08 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card p-6 flex flex-col gap-5 overflow-hidden relative"
    >
      {/* Top color bar */}
      <div
        className="absolute top-0 inset-x-0 h-[3px]"
        style={{ background: data.accent }}
      />

      {/* Header */}
      <div className="flex items-start gap-3 mt-1">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: data.light, border: `1.5px solid ${data.border}` }}
        >
          <Icon size={20} style={{ color: data.accent }} strokeWidth={1.75} />
        </div>
        <div>
          <span
            className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1.5"
            style={{ background: data.light, color: data.accent, border: `1px solid ${data.border}` }}
          >
            {data.badge}
          </span>
          <h3 className="text-[15px] font-black text-gray-900 tracking-tight leading-snug">
            {data.title}
          </h3>
        </div>
      </div>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5">
        {data.stack.map(s => <TechBadge key={s} label={s} />)}
      </div>

      {/* Description */}
      <p className="text-gray-500 text-[13px] leading-[1.75] flex-1">{data.description}</p>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3">
        {data.metrics.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center py-3.5 px-3 rounded-xl"
            style={{
              background: data.light,
              border: `1px solid ${data.border}`,
            }}
          >
            <span
              className="text-xl font-black tabular-nums"
              style={{ color: data.accent }}
            >
              {value}
            </span>
            <span className="text-[10px] uppercase tracking-[0.12em] mt-0.5 font-medium text-gray-400">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* PRD CTA */}
      {data.hasPRD && (
        <button
          onClick={onOpenPRD}
          className="btn-primary w-full justify-center text-[13px] py-3 mt-auto"
        >
          <FileText size={13} strokeWidth={2} />
          View Full PRD
          <ExternalLink size={11} className="opacity-70" />
        </button>
      )}
    </motion.div>
  )
}

/* ── Main Section ─────────────────────────────────────────────────── */

export default function Experience({ onOpenPRD }) {
  return (
    <section id="experience" className="section-pad bg-white relative overflow-hidden">

      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 15% 50%, rgba(99,102,241,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="container-inner relative z-10">

        {/* Section header */}
        <div className="text-center mb-14">
          <span className="section-eyebrow">Work &amp; Projects</span>
          <h2 className="section-title">Experience &amp; Featured Work</h2>
          <p className="section-sub">
            Enterprise-scale systems, optimization engines, and AI-powered applications
            built with precision and purpose.
          </p>
        </div>

        {/* Featured card */}
        <div className="mb-6">
          <ExperienceCard data={EXPERIENCE} />
        </div>

        {/* Project cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.map((proj, i) => (
            <ProjectCard
              key={proj.title}
              data={proj}
              index={i}
              onOpenPRD={onOpenPRD}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
