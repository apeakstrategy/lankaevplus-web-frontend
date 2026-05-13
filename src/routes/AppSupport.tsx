import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const supportCategories = [
  {
    id: 'charging',
    title: 'Charging Issues',
    icon: '⚡',
    color: '#00D4AA',
    description: 'Troubleshoot charging problems, connection issues, and session errors',
  },
  {
    id: 'billing',
    title: 'Billing & Payments',
    icon: '💳',
    color: '#FFC107',
    description: 'Help with wallet top-ups, payment failures, refund requests, and receipts',
  },
  {
    id: 'qr',
    title: 'QR Scanning',
    icon: '📱',
    color: '#4CAF50',
    description: 'Resolve QR code scanning problems, manual charger entry, and verification',
  },
  {
    id: 'account',
    title: 'Account Settings',
    icon: '⚙️',
    color: '#9C27B0',
    description: 'Profile management, password reset, notification preferences, and account deletion',
  },
]

const faqs = [
  {
    q: 'How do I start charging my EV?',
    a: 'Scan the QR code on the charger or enter the charger code manually to begin charging. Make sure your wallet has sufficient balance.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept payments securely through PayHere, including major credit/debit cards (Visa, MasterCard, American Express), mobile wallets, and supported internet banking/payment apps available in Sri Lanka.',
  },
  {
    q: 'What happens if charging stops unexpectedly?',
    a: 'Check your internet connection and wallet balance. If issues persist, contact support immediately. You will only be charged for energy actually delivered.',
  },
  {
    q: 'How do I add funds to my wallet?',
    a: 'Go to the Wallet section in the app, tap "Top Up", and select your preferred payment method. Funds are added instantly after successful payment.',
  },
  {
    q: 'Can I book a charging slot in advance?',
    a: 'Yes! Use the Booking feature to reserve a charging slot at your preferred station. You can view available time slots and confirm your booking directly in the app.',
  },
  {
    q: 'How do I report a faulty charger?',
    a: 'You can report issues through the Contact Support section in the app or reach us via email, phone, or WhatsApp. Please include the charger/station name and a description of the issue.',
  },
  {
    q: 'How do I delete my account?',
    a: 'Go to Profile → scroll to the bottom → tap "Delete Account". Please note this action is permanent. If you have a remaining wallet balance and wish to request a refund, contact us within 30 days at support@lankaevplus.com.',
  },
  {
    q: 'Is my payment information secure?',
    a: 'Absolutely. We use PayHere, a PCI-DSS compliant payment gateway. We never store your card details directly. All transactions are encrypted end-to-end.',
  },
]

const troubleshootingSteps = [
  { step: 1, title: 'Check Connection', desc: 'Ensure the charging cable is properly connected to both your vehicle and the charger.' },
  { step: 2, title: 'Verify Wallet Balance', desc: 'Make sure you have sufficient balance in your LankaEV+ wallet.' },
  { step: 3, title: 'Restart the Session', desc: 'Stop the current session and start a new one. Sometimes a fresh start resolves communication issues.' },
  { step: 4, title: 'Check Station Status', desc: 'Verify the charging station is online and available. Look for status lights on the charger.' },
  { step: 5, title: 'Contact Support', desc: 'If issues persist, contact our 24/7 support team for immediate assistance.' },
]

const AppSupport = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  return (
    <>
      <SEO
        title="App Support - Lanka EV Plus | EV Charging App for Sri Lanka"
        description="Get help with Lanka EV Plus - Sri Lanka's premier EV charging app. Find answers to FAQs, troubleshoot charging issues, and contact our 24/7 support team."
        keywords="Lanka EV Plus support, EV charging app help, charging issues, FAQ, contact support Sri Lanka"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-dark-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
          <motion.div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/8 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.15, 1] }}
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-500/10 border border-primary-500/20 rounded-2xl mb-6">
              <svg className="w-10 h-10 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="display-font text-4xl sm:text-5xl lg:text-6xl text-white mb-3">
              LANKA EV PLUS
            </h1>
            <p className="text-primary-400 text-sm uppercase tracking-widest font-semibold mb-4">
              Powering Sri Lanka's Electric Future
            </p>
            <p className="text-dark-300 text-lg max-w-2xl mx-auto mb-8">
              Your complete EV charging companion. Find chargers, scan QR codes, manage payments, and charge your electric vehicle across Sri Lanka.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#" className="btn-primary inline-flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                Download on App Store
              </a>
              <a href="#contact-support" className="btn-secondary inline-flex items-center justify-center gap-2">
                Contact Support
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-16 bg-dark-950">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="display-font text-3xl sm:text-4xl text-white mb-3">HOW CAN WE HELP?</h2>
            <p className="text-dark-400">Select a category to find the help you need</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {supportCategories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-dark-900 border border-white/5 p-6 hover:border-primary-500/30 transition-all duration-300 cursor-pointer group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: `${cat.color}15` }}
                >
                  {cat.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-dark-400 text-sm">{cat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-dark-900/50 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="display-font text-3xl sm:text-4xl text-white mb-3">FREQUENTLY ASKED QUESTIONS</h2>
            <p className="text-dark-400">Find answers to common questions</p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-dark-900 border border-white/5"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-dark-800/50 transition-colors"
                  aria-expanded={activeFaq === i}
                >
                  <span className="text-white font-medium pr-4">{faq.q}</span>
                  <motion.svg
                    className="w-5 h-5 text-dark-400 flex-shrink-0"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    animate={{ rotate: activeFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                {activeFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-6 pb-5 text-dark-300 text-sm leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="py-16 bg-dark-950 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="display-font text-3xl sm:text-4xl text-white mb-3">TROUBLESHOOTING GUIDE</h2>
            <p className="text-dark-400">Follow these steps to resolve common charging issues</p>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-4">
            {troubleshootingSteps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 bg-dark-900 border border-white/5 p-5 hover:border-primary-500/20 transition-colors"
              >
                <div className="w-10 h-10 bg-primary-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-400 font-bold text-sm">{s.step}</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{s.title}</h3>
                  <p className="text-dark-400 text-sm">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section id="contact-support" className="py-16 bg-dark-900/50 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="display-font text-3xl sm:text-4xl text-white mb-3">CONTACT SUPPORT</h2>
            <p className="text-dark-400">Reach out to us through your preferred channel</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            {/* Phone */}
            <motion.a
              href="tel:+94704323391"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-dark-900 border border-white/5 p-6 text-center hover:border-green-500/30 transition-all group"
            >
              <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">Call Us</h3>
              <p className="text-primary-400 text-sm font-medium mb-2">+94 70 432 3391</p>
              <span className="text-dark-500 text-xs">24/7</span>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:support@lankaevplus.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-dark-900 border border-white/5 p-6 text-center hover:border-amber-500/30 transition-all group"
            >
              <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">Email Us</h3>
              <p className="text-primary-400 text-sm font-medium mb-2">support@lankaevplus.com</p>
              <span className="text-dark-500 text-xs">Response within 24 hours</span>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/94704323391"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-dark-900 border border-white/5 p-6 text-center hover:border-[#25D366]/30 transition-all group"
            >
              <div className="w-14 h-14 bg-[#25D366]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">WhatsApp</h3>
              <p className="text-primary-400 text-sm font-medium mb-2">+94 70 432 3391</p>
              <span className="text-dark-500 text-xs">8 AM – 10 PM (Sri Lanka Time)</span>
            </motion.a>
          </div>

          {/* Support Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto bg-dark-900 border border-white/5 p-6 mb-8"
          >
            <h3 className="text-white font-semibold mb-4 text-center">Support Hours</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-dark-400">📞 Phone Support</span>
                <span className="text-white font-medium">24/7</span>
              </div>
              <div className="border-t border-white/5" />
              <div className="flex justify-between items-center">
                <span className="text-dark-400">📧 Email Support</span>
                <span className="text-white font-medium">24/7 (response within 24hrs)</span>
              </div>
              <div className="border-t border-white/5" />
              <div className="flex justify-between items-center">
                <span className="text-dark-400">📱 WhatsApp</span>
                <span className="text-white font-medium">8 AM – 10 PM (Sri Lanka Time)</span>
              </div>
            </div>
          </motion.div>

          {/* Emergency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto bg-red-500/5 border border-red-500/20 rounded-2xl p-6"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🚨</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-1">Emergency?</h3>
                <p className="text-dark-400 text-sm mb-3">
                  For charging station emergencies, call our emergency hotline immediately.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <a
                    href="tel:+94704323391"
                    className="inline-flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-xl font-semibold text-sm transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +94 70 432 3391
                  </a>
                  <span className="text-xs bg-red-500/15 text-red-400 px-2 py-1 rounded-lg font-semibold">24/7</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* App Footer */}
      <section className="py-12 bg-dark-950 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-dark-500 text-sm mb-2">
            © {new Date().getFullYear()} LankaEVPlus. All rights reserved.
          </p>
          <p className="text-dark-600 text-xs mb-4">
            A product of Greenlight Solar Lanka
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-dark-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <span>·</span>
            <Link to="/delete-account" className="hover:text-white transition-colors">Delete Account</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default AppSupport
