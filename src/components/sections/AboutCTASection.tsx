import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const AboutCTASection = () => {
  return (
    <section className="relative py-32 lg:py-48 bg-dark-900 border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <div className="w-full h-full max-w-4xl bg-primary-500/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tighter mb-8 leading-[1.1]">
            Be part of Sri Lanka’s <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-300 to-primary-500">
              transition to electric mobility.
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-dark-300 font-light max-w-2xl mx-auto leading-relaxed mb-12">
            Whether you're exploring EV solutions, infrastructure, or partnerships — LankaEVPlus is building the future, powered by a decade of energy expertise.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-8 py-4 bg-primary-500 text-dark-950 font-semibold rounded-full hover:bg-white transition-colors duration-300 text-sm tracking-wide uppercase shadow-[0_0_20px_rgba(0,212,170,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              Get in Touch
            </Link>
            <Link 
              to="/ecosystem#partners" 
              className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-semibold rounded-full border border-white/10 hover:bg-white/10 transition-colors duration-300 text-sm tracking-wide uppercase"
            >
              Partner With Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutCTASection
