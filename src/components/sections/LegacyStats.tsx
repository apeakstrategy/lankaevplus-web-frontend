import { motion } from 'framer-motion'
import { useCountUp } from '../../hooks/useCountUp'
import { useIntersection } from '../../hooks/useIntersection'

const AnimatedStat = ({ value, label, subtitle, suffix = '' }: { value: number; label: string; subtitle: string; suffix?: string }) => {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.5 })
  const count = useCountUp(hasIntersected ? value : 0, 2000)

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="relative flex flex-col group">
      <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-2">
        {count.toLocaleString()}<span className="text-primary-400">{suffix}</span>
      </div>
      <div className="text-sm sm:text-base text-white font-medium tracking-widest uppercase mb-1">
        {label}
      </div>
      <div className="text-xs sm:text-sm text-dark-500 font-medium">
        {subtitle}
      </div>
      
      {/* Subtle bottom border glow on hover */}
      <div className="absolute -bottom-6 left-0 w-12 h-[2px] bg-white/10 transition-all duration-500 group-hover:w-full group-hover:bg-primary-500" />
    </div>
  )
}

const LegacyStats = () => {
  return (
    <section className="relative py-24 lg:py-32 bg-dark-900 border-t border-b border-white/5 overflow-hidden">
      {/* Glassy Background Flare */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-[800px] h-[300px] bg-primary-500/5 blur-[120px] rounded-[100%]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16"
        >
          <AnimatedStat 
            value={1000} 
            suffix="+" 
            label="Systems Installed" 
            subtitle="Commercial & Residential Projects" 
          />
          <AnimatedStat 
            value={150} 
            suffix="MW+" 
            label="Solar Power Generated" 
            subtitle="Clean Energy Contributed" 
          />
          <AnimatedStat 
            value={11} 
            suffix="+" 
            label="Years Expertise" 
            subtitle="Foundation of Greenlight Solar Lanka" 
          />
        </motion.div>
      </div>
    </section>
  )
}

export default LegacyStats
