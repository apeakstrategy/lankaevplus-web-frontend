import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const Support = () => {
  const [activeSection, setActiveSection] = useState<string>('guides')
  const [activeFaq, setActiveFaq] = useState<string | null>(null)

  const guides = [
    {
      id: 'home-charger-install',
      title: 'Home Charger Installation Guide',
      description: 'Complete step-by-step guide for installing your home EV charger',
      category: 'Installation',
      readTime: '10 min',
      icon: '🏠',
    },
    {
      id: 'app-setup',
      title: 'LankaEVPlus App Setup',
      description: 'How to set up and use the LankaEVPlus charging app',
      category: 'App',
      readTime: '5 min',
      icon: '📱',
    },
    {
      id: 'scooter-maintenance',
      title: 'Electric Scooter Maintenance',
      description: 'Essential maintenance tips to keep your e-scooter running smoothly',
      category: 'Maintenance',
      readTime: '8 min',
      icon: '🔧',
    },
    {
      id: 'charging-best-practices',
      title: 'EV Charging Best Practices',
      description: 'Optimize your charging routine for battery longevity',
      category: 'Tips',
      readTime: '6 min',
      icon: '⚡',
    },
    {
      id: 'troubleshooting',
      title: 'Common Issues & Troubleshooting',
      description: 'Solutions to frequently encountered problems',
      category: 'Support',
      readTime: '12 min',
      icon: '🔍',
    },
    {
      id: 'commercial-setup',
      title: 'Commercial Charger Setup',
      description: 'Guide for businesses installing commercial charging stations',
      category: 'Business',
      readTime: '15 min',
      icon: '🏢',
    },
  ]

  const faqs = [
    {
      id: 'faq-1',
      question: 'How long does it take to install a home charger?',
      answer: 'A typical home charger installation takes 2-4 hours, depending on your electrical setup. Our certified technicians will assess your property and provide an exact timeline during the consultation.',
    },
    {
      id: 'faq-2',
      question: 'What type of charger do I need for my EV?',
      answer: 'Most EVs can use Level 2 chargers (7-22kW). We recommend a 7.4kW or 11kW charger for home use. Our team can help you choose the right charger based on your vehicle and driving habits.',
    },
    {
      id: 'faq-3',
      question: 'How much does it cost to charge an EV at home?',
      answer: 'Charging costs depend on your electricity tariff. On average, it costs around Rs. 400-600 for a full charge (assuming 40-60 kWh battery). This is significantly cheaper than fuel for equivalent distances.',
    },
    {
      id: 'faq-4',
      question: 'Do you offer installation warranty?',
      answer: 'Yes, all installations come with a 2-year workmanship warranty. The chargers themselves typically have 3-5 year manufacturer warranties.',
    },
    {
      id: 'faq-5',
      question: 'Can I use the charging network without buying a charger?',
      answer: 'Absolutely! You can use any of our public charging stations by downloading the LankaEVPlus app. No hardware purchase required.',
    },
    {
      id: 'faq-6',
      question: 'What is the warranty on electric scooters?',
      answer: 'Our electric scooters come with a 1-year comprehensive warranty covering the motor, battery, and controller. Extended warranty options are available.',
    },
    {
      id: 'faq-7',
      question: 'How often do electric scooters need servicing?',
      answer: 'We recommend a service check every 3,000 km or 6 months, whichever comes first. This includes brake check, tire inspection, and battery health assessment.',
    },
    {
      id: 'faq-8',
      question: 'Can businesses become charging partners?',
      answer: 'Yes! We partner with hotels, malls, offices, and parking facilities to install and manage charging stations. Contact us for partnership opportunities.',
    },
  ]

  /* Hidden per user request
  const manuals = [
    { name: 'Home Charger 7.4kW User Manual', size: '2.3 MB', type: 'PDF' },
    { name: 'Home Charger 11kW User Manual', size: '2.5 MB', type: 'PDF' },
    { name: 'Commercial Charger 22kW Manual', size: '4.1 MB', type: 'PDF' },
    { name: 'DC Fast Charger 50kW Manual', size: '5.8 MB', type: 'PDF' },
    { name: 'Urban Cruiser Scooter Manual', size: '3.2 MB', type: 'PDF' },
    { name: 'Sport Rider Pro Manual', size: '3.5 MB', type: 'PDF' },
    { name: 'LankaEVPlus App Guide', size: '1.8 MB', type: 'PDF' },
    { name: 'Installation Requirements', size: '0.9 MB', type: 'PDF' },
  ]
  */

  const sections = [
    { id: 'guides', label: 'Guides', icon: '📖' },
    { id: 'faq', label: 'FAQs', icon: '❓' },
    { id: 'warranty', label: 'Warranty', icon: '🛡️' },
  ]

  return (
    <>
      <SEO
        title="Support & Resources - Guides, FAQs, Manuals"
        description="Get help with your EV charger installation, app setup, and scooter maintenance. Download manuals, browse FAQs, and find answers to common questions."
        keywords="EV support, charger installation guide, EV FAQ, user manuals, warranty, LankaEVPlus help"
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-dark-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
          <motion.div
            className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-400 mb-4 block">
              Help & Resources
            </span>
            
            <h1 className="display-font text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
              SUPPORT CENTER
            </h1>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto">
              Everything you need to get the most out of your EV experience
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section Navigation */}
      <section className="py-4 sm:py-8 bg-dark-950 sticky top-[80px] sm:top-[120px] z-30 border-b border-white/5 backdrop-blur-xl bg-dark-950/90">
        <div className="max-w-[1400px] mx-auto px-0 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto no-scrollbar sm:justify-center gap-2 px-4 sm:px-0 pb-2 sm:pb-0">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-shrink-0 whitespace-nowrap px-5 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-sm font-medium uppercase tracking-wider transition-all flex items-center gap-2 rounded-full sm:rounded-none ${
                  activeSection === section.id
                    ? 'bg-primary-500 text-dark-950 shadow-lg shadow-primary-500/20'
                    : 'bg-dark-800 text-dark-300 border border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <span>{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-dark-950">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          
          {/* Guides Section */}
          {activeSection === 'guides' && (
            <motion.div
              id="guides"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <h2 className="display-font text-4xl text-white mb-4">GUIDES & TUTORIALS</h2>
                <p className="text-dark-400">Step-by-step instructions for installation, setup, and maintenance</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide, index) => (
                  <motion.div
                    key={guide.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-dark-900 border border-white/5 p-6 hover:border-primary-500/30 transition-colors cursor-pointer group"
                  >
                    <div className="text-4xl mb-4">{guide.icon}</div>
                    <span className="text-xs font-medium uppercase tracking-wider text-primary-400 mb-2 block">
                      {guide.category}
                    </span>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-dark-400 text-sm mb-4">{guide.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-dark-500 text-xs">{guide.readTime} read</span>
                      <svg className="w-5 h-5 text-dark-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* FAQ Section */}
          {activeSection === 'faq' && (
            <motion.div
              id="faq"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <h2 className="display-font text-4xl text-white mb-4">FREQUENTLY ASKED QUESTIONS</h2>
                <p className="text-dark-400">Find answers to common questions</p>
              </div>

              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-dark-900 border border-white/5"
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-dark-800/50 transition-colors"
                    >
                      <span className="text-white font-medium pr-4">{faq.question}</span>
                      <motion.svg
                        className="w-5 h-5 text-dark-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ rotate: activeFaq === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                    {activeFaq === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-5 text-dark-300"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Manuals Section - Hidden per user request */}

          {/* Warranty Section */}
          {activeSection === 'warranty' && (
            <motion.div
              id="warranty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <h2 className="display-font text-4xl text-white mb-4">WARRANTY INFORMATION</h2>
                <p className="text-dark-400">Coverage details for all products</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-dark-900 border border-white/5 p-8 text-center">
                  <div className="w-16 h-16 bg-primary-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">EV Chargers</h3>
                  <div className="stat-number text-primary-400 text-5xl mb-2">3-5</div>
                  <div className="text-dark-400 text-sm uppercase tracking-wider mb-4">Years Warranty</div>
                  <p className="text-dark-500 text-sm">Covers manufacturer defects, electrical components, and software issues.</p>
                </div>

                <div className="bg-dark-900 border border-white/5 p-8 text-center">
                  <div className="w-16 h-16 bg-primary-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Installation</h3>
                  <div className="stat-number text-primary-400 text-5xl mb-2">2</div>
                  <div className="text-dark-400 text-sm uppercase tracking-wider mb-4">Years Warranty</div>
                  <p className="text-dark-500 text-sm">Workmanship warranty covering all installation work performed by our team.</p>
                </div>

                <div className="bg-dark-900 border border-white/5 p-8 text-center">
                  <div className="w-16 h-16 bg-amber-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Scooters</h3>
                  <div className="stat-number text-amber-400 text-5xl mb-2">1</div>
                  <div className="text-dark-400 text-sm uppercase tracking-wider mb-4">Year Warranty</div>
                  <p className="text-dark-500 text-sm">Comprehensive coverage for motor, battery, and controller. Extended options available.</p>
                </div>
              </div>

              <div className="text-center mt-12">
                <p className="text-dark-500 mb-6">Need to file a warranty claim or have questions?</p>
                <Link to="/contact" className="btn-secondary">
                  Contact Support
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-dark-900 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="display-font text-4xl sm:text-5xl text-white mb-6">
            STILL NEED HELP?
          </h2>
          <p className="text-dark-400 max-w-xl mx-auto mb-8">
            Our support team is available to assist you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+94112345678" className="btn-primary inline-flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Support
            </a>
            <Link to="/contact" className="btn-secondary">
              Send Message
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Support
