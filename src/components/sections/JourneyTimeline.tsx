import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'

const milestones = [
  { year: '2013', title: 'Foundation', description: 'Greenlight Solar Lanka was established, introducing sustainable energy solutions to Sri Lanka.' },
  { year: '2015', title: 'Early Growth', description: 'Expanded solar installations rapidly across both residential and commercial sectors.' },
  { year: '2018', title: 'Scaling Impact', description: 'Strengthened presence in the renewable energy market with massive large-scale deployments.' },
  { year: '2020', title: 'Industry Recognition', description: 'Became a highly trusted name in Sri Lanka’s solar energy sector with hundreds of active systems.' },
  { year: '2023', title: 'EV Vision Begins', description: 'Recognized the global shift toward electric mobility and began engineering EV infrastructure solutions.' },
  { year: '2024', title: 'LankaEVPlus Launch', description: 'Launched LankaEVPlus to completely extend our expertise from energy generation into electric mobility.' },
  { year: '2025', title: 'Building the Future', description: 'Laser-focused on aggressively developing EV infrastructure and mobility solutions for all of Sri Lanka.' },
]

const JourneyTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section className="relative py-24 lg:py-40 bg-dark-950" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-primary-400 mb-6 block">
            Our Timeline
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            THE JOURNEY
          </h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Main Track Line (Desktop Center / Mobile Left) */}
          <div className="absolute top-0 bottom-0 left-8 md:left-1/2 md:-ml-px w-[2px] bg-white/5" />
          
          {/* Glowing Progress Line */}
          <motion.div 
            className="absolute top-0 bottom-0 left-8 md:left-1/2 md:-ml-px w-[2px] bg-gradient-to-b from-primary-400 to-primary-600 origin-top shadow-[0_0_15px_rgba(0,212,170,0.5)]"
            style={{ scaleY }}
          />

          <div className="space-y-16 md:space-y-24 relative z-10">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Visual Node mapping */}
                  <div className="hidden md:block md:w-1/2" />
                  
                  {/* Node Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-dark-950 border-2 border-primary-500 transform -translate-x-1/2 mt-2 md:mt-0 z-20" />
                  
                  {/* Content Box */}
                  <div className={`pl-20 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                    <div className="text-primary-500 font-mono text-xl sm:text-2xl font-bold mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
                      {item.title}
                    </h3>
                    <p className="text-dark-300 font-light leading-relaxed text-base sm:text-lg">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default JourneyTimeline
