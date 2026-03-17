import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Database, Server, Monitor, Brain } from 'lucide-react'

const CATEGORIES = [
  {
    icon:   Users,
    title:  'Leadership & Management',
    accent: '#d97706',
    light:  '#fffbeb',
    border: '#fde68a',
    skills: [
      'Technical Team Management',
      'Project Delivery & Planning',
      'Mentoring & Code Review',
      'Cross-functional Coordination',
      'Upskilling & Knowledge Sharing',
      'Fault detection and diagnosis',
      'Secure software development practices',
    ],
  },
  {
    icon:   Database,
    title:  'Database & Architecture',
    accent: '#0891b2',
    light:  '#ecfeff',
    border: '#a5f3fc',
    skills: [
      'SQL Server',
      'PostgreSQL',
      'MongoDB',
      'Always On Availability Groups',
      'Performance Tuning',
      'Database Administration',
      'Schema Design & Optimization',
    ],
  },
  {
    icon:   Server,
    title:  'Backend Engineering',
    accent: '#4f46e5',
    light:  '#eef2ff',
    border: '#c7d2fe',
    skills: [
      '.NET full version stack (Framework, Core, MVC, WebAPI)',
      'C#',
      'RESTful API Design',
      'Microservices Architecture',
      'Scalability & Performance Optimization',
      'Cloud Deployment (Azure, AWS)',
      'Containerization (Docker)',
      'Analytics & Monitoring Integration',
    ],
  },
  {
    icon:   Monitor,
    title:  'Frontend & Enterprise UI',
    accent: '#7c3aed',
    light:  '#f5f3ff',
    border: '#ddd6fe',
    skills: [
      'ASP.NET full version stack (Framework, Core, MVC, WebAPI)',
      'Telerik UI Components',                  
      'Reactjs',
      'Nextjs',
    ],
  },
  {
    icon:   Brain,
    title:  'AI & Optimization',
    accent: '#059669',
    light:  '#ecfdf5',
    border: '#a7f3d0',
    skills: [
      'ML.NET',
      'Google OR-Tools',
      'Agentic Workflows',
      'Claude Code (AI Orchestration)',
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative overflow-hidden" style={{ background: '#f9fafb' }}>

      {/* Very subtle gradient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 85% 30%, rgba(99,102,241,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="container-inner relative z-10">

        {/* Section header */}
        <div className="text-center mb-16">
          <span className="section-eyebrow">Technical Expertise</span>
          <h2 className="section-title">Skills &amp; Competencies</h2>
          <p className="section-sub">
            A curated overview of tools, technologies, and domains I work with professionally.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {CATEGORIES.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCard({ category: cat, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card p-5 flex flex-col gap-4 overflow-hidden relative"
    >
      {/* Colored top line */}
      <div
        className="absolute top-0 inset-x-0 h-[3px]"
        style={{ background: cat.accent }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mt-1">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: cat.light, border: `1.5px solid ${cat.border}` }}
        >
          <cat.icon size={17} style={{ color: cat.accent }} strokeWidth={2} />
        </div>
        <h3 className="font-bold text-gray-900 text-[14px] tracking-tight leading-snug">
          {cat.title}
        </h3>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {cat.skills.map(skill => (
          <span
            key={skill}
            className="px-2.5 py-1 rounded-lg text-[11px] font-medium leading-none"
            style={{
              background: cat.light,
              border: `1px solid ${cat.border}`,
              color: cat.accent,
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
