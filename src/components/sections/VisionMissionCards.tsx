import { motion } from 'framer-motion'
import { useState } from 'react'

const SpotlightCard = ({ title, children, icon, delay = 0 }: { title: string, children: React.ReactNode, icon: string, delay?: number }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/5 p-10 sm:p-14 transition-all duration-500 hover:border-white/10"
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0, 212, 170, 0.1), transparent 40%)`,
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full items-start">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-dark-900 border border-white/5 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-xl shadow-black/50 mb-10">
          {icon}
        </div>
        <h3 className="text-2xl sm:text-4xl text-white font-bold tracking-tight mb-6">
          {title}
        </h3>
        <p className="text-lg text-dark-300 font-light leading-relaxed">
          {children}
        </p>
      </div>
    </motion.div>
  )
}

const VisionMissionCards = () => {
  return (
    <section className="relative py-24 lg:py-40 bg-dark-950 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          <SpotlightCard title="Mission" icon="🎯" delay={0.1}>
            To accelerate the adoption of electric vehicles in Sri Lanka by providing world-class charging infrastructure, innovative mobility solutions, and exceptional customer experience.
          </SpotlightCard>

          <SpotlightCard title="Vision" icon="🔭" delay={0.3}>
            A Sri Lanka where electric mobility is the standard, not the exception. Where every driver has access to reliable charging, and sustainable transportation powers economic growth.
          </SpotlightCard>

        </div>
      </div>
    </section>
  )
}

export default VisionMissionCards
