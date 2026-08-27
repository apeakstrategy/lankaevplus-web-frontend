import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const Ecosystem = () => {
  const features = [
    {
      title: 'Find Charging Stations',
      description: 'Real-time availability of charging stations across Sri Lanka. Filter by charger type, speed, and amenities.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: 'Smart Payments',
      description: 'Pay seamlessly via the app. No cards needed. Automatic billing and detailed charging history.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      title: 'Reserve in Advance',
      description: 'Book your charging slot ahead of time. Never wait for an available charger again.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Charging Analytics',
      description: 'Track your charging patterns, costs, and carbon savings. Optimize your EV experience.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ]

  const benefits = {
    owners: [
      { title: 'Find Chargers Fast', desc: 'Never run out of charge with real-time station locator' },
      { title: 'Pay Easily', desc: 'In-app payments with multiple options' },
      { title: 'Track Everything', desc: 'Detailed charging history and analytics' },
      { title: 'Get Notified', desc: 'Alerts when your car is fully charged' },
    ],
    businesses: [
      { title: 'Attract Customers', desc: 'EV drivers seek out charging locations' },
      { title: 'New Revenue', desc: 'Earn from charging fees' },
      { title: 'Easy Management', desc: 'Dashboard to monitor and control chargers' },
      { title: 'Brand Image', desc: 'Show your sustainability commitment' },
    ],
    operators: [
      { title: 'Remote Monitoring', desc: 'Real-time status of all stations' },
      { title: 'Maintenance Alerts', desc: 'Get notified before issues occur' },
      { title: 'Revenue Reports', desc: 'Detailed financial analytics' },
      { title: 'User Management', desc: 'Control access and pricing' },
    ],
  }

  return (
    <>
      <SEO
        title="EV Charging Ecosystem - Platform & Network"
        description="Sri Lanka's first complete EV charging ecosystem. Find charging stations, pay seamlessly, and manage your EV experience with our comprehensive platform."
        keywords="EV ecosystem, charging network, EV app, charging station finder, EV platform Sri Lanka"
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-dark-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
          <motion.div
            className="absolute top-1/3 left-1/3 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[150px]"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px]"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 15, repeat: Infinity, delay: 5 }}
          />
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }}
          />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-primary-400 mb-4 block">
                The Complete Platform
              </span>
              
              <h1 className="display-font text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-[0.9]">
                ONE ECOSYSTEM.<br />
                <span 
                  className="inline-block"
                  style={{
                    background: 'linear-gradient(135deg, #00D4AA 0%, #00E5E5 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  INFINITE POSSIBILITIES.
                </span>
              </h1>
              
              <p className="text-lg text-dark-300 mb-8 max-w-lg">
                Connect to Sri Lanka's largest EV charging network. Find stations, pay seamlessly, and drive with confidence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/stations" className="btn-primary">
                  View Charging Map
                </Link>
                <a href="#benefits" className="btn-secondary">
                  Learn More
                </a>
              </div>

              <div className="flex gap-4 relative">
                <a href="https://apps.apple.com/lk/app/lanka-ev-plus/id6762481492" target="_blank" rel="noopener noreferrer" className="block w-36 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                  <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on App Store" className="w-full" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.lankaevplus.app" target="_blank" rel="noopener noreferrer" className="block w-36 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                  <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" className="w-full" />
                </a>
              </div>
            </motion.div>

            {/* Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto w-[280px] sm:w-[320px]">
                {/* Phone frame */}
                <div className="bg-dark-800 rounded-[3rem] p-3 border border-white/10 shadow-2xl">
                  <div className="bg-dark-900 rounded-[2.5rem] overflow-hidden">
                    {/* Status bar */}
                    <div className="bg-dark-950 px-6 py-3 flex items-center justify-between">
                      <span className="text-xs text-white">9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-4 bg-white/80 rounded-sm" />
                        <div className="w-4 h-4 bg-white/60 rounded-sm" />
                        <div className="w-4 h-4 bg-primary-500 rounded-sm" />
                      </div>
                    </div>
                    
                    {/* App content mock */}
                    <div className="aspect-[9/16] bg-gradient-to-b from-dark-900 to-dark-950 p-4">
                      {/* Map area */}
                      <div className="bg-dark-800 rounded-2xl h-48 mb-4 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-primary-500/20 to-primary-500/20" />
                        <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        {/* Station markers */}
                        <div className="absolute top-8 left-12 w-3 h-3 bg-primary-500 rounded-full animate-pulse" />
                        <div className="absolute top-16 right-8 w-3 h-3 bg-primary-500 rounded-full animate-pulse animation-delay-200" />
                        <div className="absolute bottom-12 left-20 w-3 h-3 bg-primary-500 rounded-full animate-pulse animation-delay-400" />
                      </div>
                      
                      {/* Station cards */}
                      <div className="space-y-3">
                        {[1, 2].map((i) => (
                          <div key={i} className="bg-dark-800/50 rounded-xl p-3 border border-white/5">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <div className="text-sm font-medium text-white">Station {i}</div>
                                <div className="text-xs text-dark-400">0.{i} km away</div>
                              </div>
                              <span className="px-2 py-1 bg-primary-500/20 text-primary-400 text-[10px] rounded-full">Available</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="px-2 py-0.5 bg-dark-700 text-dark-300 text-[10px] rounded">22kW</span>
                              <span className="px-2 py-0.5 bg-dark-700 text-dark-300 text-[10px] rounded">Type 2</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements - Hidden per user request
                <motion.div
                  className="absolute -left-16 top-1/4 bg-dark-900 border border-white/10 rounded-xl p-4 shadow-xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="text-primary-400 text-2xl font-bold">50+</div>
                  <div className="text-dark-400 text-xs">Stations</div>
                </motion.div>
                
                <motion.div
                  className="absolute -right-12 bottom-1/4 bg-dark-900 border border-white/10 rounded-xl p-4 shadow-xl"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                >
                  <div className="text-primary-400 text-2xl font-bold">5K+</div>
                  <div className="text-dark-400 text-xs">Users</div>
                </motion.div>
                */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-dark-900 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-400 mb-4 block">
              How It Works
            </span>
            <h2 className="display-font text-4xl sm:text-5xl text-white mb-4">CHARGE IN 3 STEPS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Find', desc: 'Open the app and find available stations near you' },
              { step: '02', title: 'Plug In', desc: 'Navigate to the station and connect your EV' },
              { step: '03', title: 'Pay & Go', desc: 'Pay through the app and drive away' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-center p-8"
              >
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/4 right-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                )}
                <div className="stat-number text-dark-700 text-7xl mb-4">{item.step}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-dark-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-dark-950">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-400 mb-4 block">
              Platform Features
            </span>
            <h2 className="display-font text-4xl sm:text-5xl text-white mb-4">EVERYTHING YOU NEED</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-dark-900/50 border border-white/5 p-8 hover:border-primary-500/30 transition-colors"
              >
                <div className="w-16 h-16 bg-primary-500/10 rounded-xl flex items-center justify-center text-primary-400 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-dark-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Tabs */}
      <section id="benefits" className="py-24 bg-dark-900 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-400 mb-4 block">
              Benefits For Everyone
            </span>
            <h2 className="display-font text-4xl sm:text-5xl text-white">WHO IT'S FOR</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* EV Owners */}
            <motion.div
              id="owners"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-dark-800/50 border border-white/5 p-8"
            >
              <div className="text-primary-400 text-5xl mb-6">🚗</div>
              <h3 className="text-2xl font-bold text-white mb-6">EV Owners</h3>
              <ul className="space-y-4">
                {benefits.owners.map((b) => (
                  <li key={b.title} className="flex gap-3">
                    <svg className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <div className="text-white font-medium">{b.title}</div>
                      <div className="text-dark-400 text-sm">{b.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Businesses */}
            <motion.div
              id="businesses"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-dark-800/50 border border-white/5 p-8"
            >
              <div className="text-primary-400 text-5xl mb-6">🏢</div>
              <h3 className="text-2xl font-bold text-white mb-6">Businesses</h3>
              <ul className="space-y-4">
                {benefits.businesses.map((b) => (
                  <li key={b.title} className="flex gap-3">
                    <svg className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <div className="text-white font-medium">{b.title}</div>
                      <div className="text-dark-400 text-sm">{b.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Operators */}
            <motion.div
              id="partners"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-dark-800/50 border border-white/5 p-8"
            >
              <div className="text-amber-400 text-5xl mb-6">⚡</div>
              <h3 className="text-2xl font-bold text-white mb-6">Station Operators</h3>
              <ul className="space-y-4">
                {benefits.operators.map((b) => (
                  <li key={b.title} className="flex gap-3">
                    <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <div className="text-white font-medium">{b.title}</div>
                      <div className="text-dark-400 text-sm">{b.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Link to="/contact" className="btn-primary">
              Become a Partner
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Ecosystem
