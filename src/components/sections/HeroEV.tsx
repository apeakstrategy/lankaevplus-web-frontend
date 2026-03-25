import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// Glow ring component - Responsive
const GlowRing = ({ size, delay = 0 }: { size: number; delay?: number }) => (
  <motion.div
    className="absolute rounded-full border border-primary-500/20 hidden sm:block"
    style={{ 
      width: size, 
      height: size,
      left: '50%',
      top: '50%',
      marginLeft: -size / 2,
      marginTop: -size / 2,
    }}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ 
      scale: [0.8, 1.2, 0.8],
      opacity: [0.3, 0, 0.3],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
)

// Mobile glow ring
const MobileGlowRing = ({ size, delay = 0 }: { size: number; delay?: number }) => (
  <motion.div
    className="absolute rounded-full border border-primary-500/20 sm:hidden"
    style={{ 
      width: size, 
      height: size,
      left: '50%',
      top: '50%',
      marginLeft: -size / 2,
      marginTop: -size / 2,
    }}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ 
      scale: [0.8, 1.1, 0.8],
      opacity: [0.2, 0, 0.2],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
)

// Charging bolt SVG
const ChargingBolt = () => (
  <svg className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" viewBox="0 0 24 24" fill="none">
    <motion.path
      d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"
      fill="url(#boltGradient)"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
    />
    <defs>
      <linearGradient id="boltGradient" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" />
        <stop offset="1" stopColor="#00D4AA" />
      </linearGradient>
    </defs>
  </svg>
)

const HeroEV = () => {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-dark-950" id="hero">
      {/* Deep Background Effects (Inspired by About Us) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
        
        {/* Subtle Light Sweeps */}
        <motion.div
          className="absolute top-1/4 left-0 sm:left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-500/5 rounded-full blur-[120px]"
          animate={{ x: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 sm:right-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-primary-600/5 rounded-full blur-[100px]"
          animate={{ x: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        
        {/* Engineering Grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-[120px] lg:pt-[150px] pb-8 lg:pb-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 lg:mb-6"
            >
              <span className="inline-block py-1 sm:py-1.5 px-4 border border-white/10 rounded-full bg-white/5 backdrop-blur-md text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-primary-400 mb-4 lg:mb-6 shadow-xl">
                Next-Gen Mobility
              </span>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold text-white tracking-tighter leading-[0.95] mb-4 lg:mb-6">
                POWER <br className="hidden lg:block"/> YOUR <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500">ELECTRIC</span> <br/>
                JOURNEY
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg lg:text-xl text-dark-300 font-light leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8 lg:mb-10"
            >
              Sri Lanka's most advanced EV charging ecosystem. Find stations, charge seamlessly, and join the sustainable mobility revolution.
            </motion.p>

            {/* CTA Buttons (Inspired by AboutCTASection) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button 
                onClick={() => navigate('/chargers')}
                className="w-full sm:w-auto px-8 py-4 bg-primary-500 text-dark-950 font-semibold rounded-full hover:bg-white transition-colors duration-300 text-sm tracking-wide uppercase shadow-[0_0_20px_rgba(0,212,170,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
              >
                Shop Chargers
              </button>
              <button 
                onClick={() => navigate('/stations')}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-semibold rounded-full border border-white/10 hover:bg-white/10 transition-colors duration-300 text-sm tracking-wide uppercase flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Find Stations
              </button>
            </motion.div>
          </div>

          {/* Right Column - Interactive Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center order-1 lg:order-2"
          >
            <div className="relative w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px]">
              
              {/* Glow Rings */}
              <GlowRing size={360} delay={0} />
              <GlowRing size={280} delay={1} />
              <GlowRing size={200} delay={2} />
              
              <MobileGlowRing size={220} delay={0} />
              <MobileGlowRing size={160} delay={1} />
              <MobileGlowRing size={100} delay={2} />
              
              {/* Rotating Orbit Ring */}
              <motion.div
                className="absolute inset-4 sm:inset-10 lg:inset-16 rounded-full border border-white/5"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                {/* Orbital Dots */}
                {[0, 120, 240].map((angle) => (
                  <div
                    key={angle}
                    className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-400 rounded-full shadow-[0_0_10px_rgba(0,212,170,0.8)]"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${angle}deg) translateX(calc(50% + 60px)) translateY(-50%)`,
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Inner Glowing Circle with Bolt */}
              <motion.div
                className="absolute inset-12 sm:inset-20 lg:inset-28 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center backdrop-blur-xl"
                animate={{ 
                  boxShadow: [
                    '0 0 40px rgba(0, 212, 170, 0.1)',
                    '0 0 80px rgba(0, 212, 170, 0.2)',
                    '0 0 40px rgba(0, 212, 170, 0.1)',
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/10 to-transparent" />
                <ChargingBolt />
              </motion.div>

              {/* Floating Stat Cards (Premium Glass Style) */}
              
              {/* Powered By Badge */}
              <motion.div
                className="hidden sm:block absolute top-0 right-0 lg:top-8 lg:-right-4 bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-2xl px-4 py-3 lg:px-5 lg:py-3.5 shadow-2xl hover:border-white/20 transition-colors"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <a href="https://www.greenlightsolarlanka.lk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 sm:gap-3 hover:opacity-80 transition-opacity">
                  <span className="text-[10px] sm:text-[11px] text-dark-300 font-medium whitespace-nowrap uppercase tracking-widest leading-none mt-0.5">Powered By</span>
                  <img src="/glsl-logo.png" alt="GreenlightSolarLanka" className="h-5 sm:h-7 w-auto object-contain" />
                </a>
              </motion.div>

              {/* 150kW Badge */}
              <motion.div
                className="hidden sm:block absolute bottom-0 left-0 lg:bottom-12 lg:-left-8 bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl hover:border-white/20 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-500/10 border border-primary-500/20 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white tracking-tight">150kW</div>
                    <div className="text-[10px] text-dark-400 uppercase tracking-widest">Fast Charging</div>
                  </div>
                </div>
              </motion.div>

              {/* 24/7 Support Badge */}
              <motion.div
                className="hidden xl:block absolute top-1/2 -left-16 -translate-y-1/2 bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl hover:border-white/20 transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <div>
                    <span className="text-sm font-bold text-white tracking-wide">24/7 Support</span>
                    <div className="text-[10px] text-dark-400 uppercase tracking-widest mt-0.5">Online</div>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-white">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  )
}

export default HeroEV
