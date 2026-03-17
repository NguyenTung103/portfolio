import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cpu, CheckCircle, AlertCircle, Code2, BarChart3, ArrowRight } from 'lucide-react'

/* ── PRD Data ───────────────────────────────────────────────────────── */

const PRD = {
  title:    'Smart School Timetabling System',
  version:  'v1.0 — PRD Summary',
  stack:    ['.NET 8 Web API', 'Google OR-Tools (CP-SAT)', 'SQL Server', 'RESTful Architecture'],

  overview:
    'An automated scheduling platform designed to eliminate manual timetable creation for educational institutions. Uses constraint-based optimization to generate conflict-free, resource-optimal schedules within seconds.',

  problem:
    'Manual timetabling is error-prone and time-consuming (often taking days to weeks). Conflicts between teacher assignments, room capacities, and curriculum requirements cause operational inefficiencies across departments.',

  constraints: {
    hard: [
      'A teacher cannot be assigned to two classes at the same time slot',
      'A classroom cannot host more than one class simultaneously',
      'Each subject must meet its required weekly frequency',
      'No class exceeds its designated classroom capacity',
    ],
    soft: [
      'Distribute workload evenly across the week for each teacher',
      'Honor teacher time-slot preferences where feasible',
      'Minimize room switches per teacher per day',
      'Cluster consecutive periods for the same class when possible',
    ],
  },

  apiEndpoints: [
    { method: 'POST', path: '/api/schedules/generate',             desc: 'Trigger optimization engine with constraint payload' },
    { method: 'GET',  path: '/api/schedules/{id}',                 desc: 'Retrieve a generated schedule by ID' },
    { method: 'PUT',  path: '/api/schedules/{id}/constraints',     desc: 'Update constraints and re-solve' },
    { method: 'GET',  path: '/api/schedules/{id}/conflicts',       desc: 'List detected soft-constraint violations' },
    { method: 'DELETE',path: '/api/schedules/{id}',               desc: 'Remove a schedule from the system' },
  ],

  schema: [
    { table: 'Teachers',       desc: 'Id, Name, SubjectIds[], AvailabilitySlots[]' },
    { table: 'Classrooms',     desc: 'Id, Name, Capacity, Facilities[]' },
    { table: 'Subjects',       desc: 'Id, Name, WeeklyPeriods, GradeLevel' },
    { table: 'Schedules',      desc: 'Id, AcademicYear, Status, GeneratedAt, Metadata' },
    { table: 'ScheduleSlots',  desc: 'ScheduleId, DayOfWeek, Period, TeacherId, ClassroomId, SubjectId' },
  ],

  metrics: [
    { icon: BarChart3, label: 'Schedule Generation',    value: '< 30 seconds',  sub: 'for 50 teachers + 30 rooms' },
    { icon: CheckCircle,label: 'Hard Constraint Rate',  value: '0% violation',  sub: 'guaranteed by CP-SAT solver' },
    { icon: Cpu,        label: 'Optimization Algorithm',value: 'CP-SAT',        sub: 'Google OR-Tools constraint programming' },
    { icon: BarChart3,  label: 'Target Satisfaction',   value: '≥ 90%',         sub: 'administrator acceptance rate' },
  ],
}

const METHOD_COLORS = {
  GET:    { bg: 'rgba(52,211,153,0.1)', color: '#34d399', border: 'rgba(52,211,153,0.3)' },
  POST:   { bg: 'rgba(99,102,241,0.1)', color: '#818cf8', border: 'rgba(99,102,241,0.3)' },
  PUT:    { bg: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: 'rgba(251,191,36,0.3)' },
  DELETE: { bg: 'rgba(248,113,113,0.1)',color: '#f87171', border: 'rgba(248,113,113,0.3)' },
}

/* ── Components ─────────────────────────────────────────────────────── */

function SectionTitle({ children }) {
  return (
    <h3 className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-3 flex items-center gap-2">
      <span className="w-4 h-px bg-indigo-500/50" />
      {children}
    </h3>
  )
}

function MethodBadge({ method }) {
  const c = METHOD_COLORS[method] ?? METHOD_COLORS.GET
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-[10px] font-bold font-mono"
      style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}
    >
      {method}
    </span>
  )
}

/* ── Main Modal ─────────────────────────────────────────────────────── */

export default function PRDModal({ isOpen, onClose }) {
  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60]"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-[5vh] bottom-[5vh] z-[70] mx-auto max-w-3xl rounded-2xl flex flex-col overflow-hidden"
            style={{
              background: '#0e0e1f',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header ── */}
            <div
              className="flex-shrink-0 px-6 py-5 flex items-start justify-between"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)' }}
                >
                  <Cpu size={18} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest mb-0.5">
                    {PRD.version}
                  </p>
                  <h2 className="text-lg font-bold text-slate-100 leading-tight">{PRD.title}</h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-200 transition-colors hover:bg-white/[0.06]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Scrollable body ── */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {PRD.stack.map(s => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium"
                    style={{
                      background: 'rgba(99,102,241,0.08)',
                      border: '1px solid rgba(99,102,241,0.2)',
                      color: '#a5b4fc',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <div>
                <SectionTitle>Overview</SectionTitle>
                <p className="text-slate-400 text-sm leading-relaxed">{PRD.overview}</p>
              </div>

              {/* Problem Statement */}
              <div>
                <SectionTitle>Problem Statement</SectionTitle>
                <div
                  className="flex gap-3 p-4 rounded-xl text-sm text-slate-400 leading-relaxed"
                  style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)' }}
                >
                  <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                  {PRD.problem}
                </div>
              </div>

              {/* Constraints */}
              <div>
                <SectionTitle>Constraint Model</SectionTitle>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-red-400 mb-2.5 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400" /> Hard Constraints
                    </p>
                    <ul className="space-y-2">
                      {PRD.constraints.hard.map(c => (
                        <li key={c} className="flex items-start gap-2 text-xs text-slate-400 leading-snug">
                          <ArrowRight size={11} className="text-red-400 mt-0.5 flex-shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-amber-400 mb-2.5 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" /> Soft Constraints
                    </p>
                    <ul className="space-y-2">
                      {PRD.constraints.soft.map(c => (
                        <li key={c} className="flex items-start gap-2 text-xs text-slate-400 leading-snug">
                          <ArrowRight size={11} className="text-amber-400 mt-0.5 flex-shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* API Endpoints */}
              <div>
                <SectionTitle>RESTful API — .NET 8</SectionTitle>
                <div className="space-y-2">
                  {PRD.apiEndpoints.map(ep => (
                    <div
                      key={ep.path}
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <MethodBadge method={ep.method} />
                      <code className="text-xs font-mono text-slate-300 flex-shrink-0">{ep.path}</code>
                      <span className="text-xs text-slate-600 hidden sm:block truncate">{ep.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Database Schema */}
              <div>
                <SectionTitle>SQL Server Schema (Key Tables)</SectionTitle>
                <div className="space-y-1.5">
                  {PRD.schema.map(s => (
                    <div
                      key={s.table}
                      className="flex items-baseline gap-3 px-3 py-2.5 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      <code className="text-xs font-mono text-cyan-400 w-32 flex-shrink-0">{s.table}</code>
                      <span className="text-xs text-slate-500 font-mono truncate">{s.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Metrics */}
              <div>
                <SectionTitle>Success Metrics</SectionTitle>
                <div className="grid sm:grid-cols-2 gap-3">
                  {PRD.metrics.map(({ icon: Icon, label, value, sub }) => (
                    <div
                      key={label}
                      className="flex items-start gap-3 p-4 rounded-xl"
                      style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.12)' }}
                    >
                      <Icon size={16} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                        <p className="text-sm font-bold text-indigo-300">{value}</p>
                        <p className="text-[10px] text-slate-600 mt-0.5">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Footer ── */}
            <div
              className="flex-shrink-0 px-6 py-4 flex items-center justify-between"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="text-xs text-slate-600 font-mono">
                Smart Timetabling System — Internal PRD v1.0
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white transition-colors hover:bg-white/[0.06]"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
