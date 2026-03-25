import { motion } from 'framer-motion'
import { useCountUp } from '../../hooks/useCountUp'
import { useIntersection } from '../../hooks/useIntersection'

interface StatCardProps {
  value: number
  label: string
  sublabel: string
  suffix?: string
  index: number
}

const StatCard = ({ value, label, sublabel, suffix = '', index }: StatCardProps) => {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.5 })
  const count = useCountUp(hasIntersected ? value : 0, 2000)

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative text-center p-8 lg:p-12"
      initial={{ opacity: 0, y: 30 }}
      animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Vertical divider on the right (except last item) */}
      {index < 3 && (
        <div className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-px bg-white/10" />
      )}
      
      <div className="stat-number text-white mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-semibold text-white uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="text-xs text-dark-500">
        {sublabel}
      </div>
    </motion.div>
  )
}

const StatsSection = () => {
  const stats = [
    { 
      value: 500, 
      label: 'Chargers Deployed', 
      sublabel: 'Across Sri Lanka',
      suffix: '+' 
    },
    { 
      value: 50, 
      label: 'Charging Stations', 
      sublabel: 'Island-wide network',
      suffix: '+' 
    },
    { 
      value: 2000, 
      label: 'Happy Customers', 
      sublabel: 'And growing daily',
      suffix: '+' 
    },
    { 
      value: 99, 
      label: 'Uptime', 
      sublabel: 'Network reliability',
      suffix: '%' 
    },
  ]

  return (
    <section className="relative py-24 lg:py-32 bg-dark-900">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-50">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.03) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-400 mb-4 block">
            Impact
          </span>
          <h2 className="display-font text-5xl sm:text-6xl text-white">
            DRIVING CHANGE
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-white/5">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              sublabel={stat.sublabel}
              suffix={stat.suffix}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-dark-400 mb-6">
            Join Sri Lanka's fastest-growing EV charging network
          </p>
          <a
            href="/ecosystem#partners"
            className="inline-flex items-center gap-3 text-primary-400 hover:text-primary-300 transition-colors font-medium uppercase tracking-wider text-sm"
          >
            Become a Partner
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection
