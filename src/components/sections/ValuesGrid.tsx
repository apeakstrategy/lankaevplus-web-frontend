import { motion } from 'framer-motion'

const values = [
  { 
    number: '01',
    title: 'Innovation', 
    desc: 'Driving the transition from energy to electric mobility through constant, practical innovation.' 
  },
  { 
    number: '02',
    title: 'Sustainability', 
    desc: 'Deeply committed to a cleaner, zero-emission future for Sri Lanka, building on our solar roots.' 
  },
  { 
    number: '03',
    title: 'Trust', 
    desc: 'Our foundation. Built on years of verified customer trust and proven delivery in infrastructure.' 
  },
  { 
    number: '04',
    title: 'Excellence', 
    desc: 'Delivering high-quality, resilient solutions backed by real engineering expertise.' 
  },
  { 
    number: '05',
    title: 'Accessibility', 
    desc: 'Making sustainable, cutting-edge mobility technology accessible across the entire island.' 
  },
]

const ValuesGrid = () => {
  return (
    <section className="relative py-24 lg:py-40 bg-dark-900 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 lg:mb-24 flex flex-col items-center text-center"
        >
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-primary-400 mb-6 block">
            Core Principles
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            WHAT DRIVES US
          </h2>
        </motion.div>

        {/* Bending Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {values.map((val, i) => (
            <motion.div
              key={val.number}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`p-10 lg:p-12 rounded-[2rem] bg-dark-800/20 hover:bg-dark-800/40 border border-white/5 hover:border-white/10 transition-colors duration-500
                ${i === 0 || i === 1 ? 'lg:col-span-1' : ''} 
                ${i === 2 && 'sm:col-span-2 lg:col-span-1'}
              `}
            >
              <div className="text-4xl text-primary-500/50 font-bold font-mono tracking-tighter mb-8">
                {val.number}
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight mb-4">
                {val.title}
              </h3>
              <p className="text-dark-300 font-light leading-relaxed">
                {val.desc}
              </p>
            </motion.div>
          ))}
          {/* Empty spacer to complete the 3x2 grid beautifully */}
          <div className="hidden lg:block p-10 rounded-[2rem] border border-dashed border-white/5 opacity-50 flex items-center justify-center">
            <span className="text-dark-600 uppercase tracking-widest text-xs">LankaEVPlus</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ValuesGrid
