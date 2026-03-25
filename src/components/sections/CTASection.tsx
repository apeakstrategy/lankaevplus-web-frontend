import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const CTASection = () => {
  return (
    <section className="relative py-32 lg:py-40 bg-dark-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary-500/10 rounded-full blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-400 mb-6 block">
              Start Your EV Journey
            </span>
            
            <h2 className="display-font text-5xl sm:text-6xl lg:text-7xl text-white mb-8 leading-tight">
              READY TO GO
              <br />
              <span 
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, #00D4AA 0%, #00E5E5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ELECTRIC?
              </span>
            </h2>
            
            <p className="text-lg text-dark-300 mb-12 max-w-2xl mx-auto">
              Whether you're an EV owner looking for home charging, a business wanting to install charging stations, 
              or someone considering an electric scooter — we've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/chargers"
                className="btn-primary inline-flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Shop Chargers
              </Link>
              <Link
                to="/contact"
                className="btn-secondary inline-flex items-center justify-center gap-3"
              >
                Get Consultation
              </Link>
            </div>
          </motion.div>

          {/* Feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-dark-900/50 border border-white/5 p-8 text-left hover:border-primary-500/30 transition-colors">
              <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Home Charging</h3>
              <p className="text-dark-400 text-sm mb-4">Professional installation of Level 2 chargers for your home. Wake up to a fully charged EV every day.</p>
              <Link to="/chargers?category=home" className="text-primary-400 text-sm font-medium hover:text-primary-300 transition-colors">
                Learn more →
              </Link>
            </div>

            <div className="bg-dark-900/50 border border-white/5 p-8 text-left hover:border-primary-500/30 transition-colors">
              <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Commercial Solutions</h3>
              <p className="text-dark-400 text-sm mb-4">Install charging stations at your business. Attract EV drivers and generate additional revenue.</p>
              <Link to="/chargers?category=commercial" className="text-primary-400 text-sm font-medium hover:text-primary-300 transition-colors">
                Learn more →
              </Link>
            </div>

            <div className="bg-dark-900/50 border border-white/5 p-8 text-left hover:border-primary-500/30 transition-colors">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Fast Charging</h3>
              <p className="text-dark-400 text-sm mb-4">DC fast chargers for rapid charging. Get up to 80% charge in just 30 minutes.</p>
              <Link to="/chargers?category=fast" className="text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors">
                Learn more →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
