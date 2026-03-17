import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import PRDModal from './components/PRDModal'

export default function App() {
  const [isPRDOpen, setIsPRDOpen] = useState(false)

  return (
    <div className="min-h-screen bg-canvas text-slate-900 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Experience onOpenPRD={() => setIsPRDOpen(true)} />
        <Contact />
      </main>
      <PRDModal isOpen={isPRDOpen} onClose={() => setIsPRDOpen(false)} />
    </div>
  )
}
