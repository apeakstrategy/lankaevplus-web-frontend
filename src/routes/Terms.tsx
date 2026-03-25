import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const Terms = () => {
  const lastUpdated = 'March 26, 2026'

  const sections = [
    {
      title: 'Introduction',
      content: `These Terms and Conditions (“Terms”) form a legally binding agreement between you and Lanka EV Plus (pvt) ltd. governing your use of the Lanka EV+ mobile application, website, wallet, customer support channels, and EV charging services (collectively, the “Services”).

By creating an account, accessing the app or website, topping up your wallet, starting a charging session, or otherwise using the Services, you agree to these Terms. If you do not agree, do not use the Services.`,
    },
    {
      title: 'Eligibility',
      content: `You may use the Services only if:

• You are at least 18 years old or the age of majority in your jurisdiction.
• You have legal authority to enter into this agreement.
• You are authorized to use the vehicle connected to the charging station.
• You provide accurate account and payment information.`,
    },
    {
      title: 'Account Registration and Security',
      content: `You may need an account to use some or all features of the Services. You agree to:

• Provide accurate, current, and complete information.
• Keep your account information updated.
• Maintain the confidentiality of your login credentials and verification methods.
• Notify us promptly of any suspected unauthorized access or security issue.

You are responsible for activity under your account unless prohibited by law.`,
    },
    {
      title: 'Description of Services',
      content: `The Services may include:

• Charger discovery and availability
• Account and wallet management
• Charging session start/stop controls
• Payment processing and receipts
• Charging history and account history
• Support and notifications

We may change, suspend, or discontinue features at any time.`,
    },
    {
      title: 'Charger Availability and Compatibility',
      content: `We do not guarantee that any charger, connector, or station will always be available, uninterrupted, or suitable for your vehicle. You are responsible for ensuring compatibility between your vehicle, connector type, charging standard, and selected station.`,
    },
    {
      title: 'Charging Sessions',
      content: `A charging session begins when the charger authorizes and starts charging and ends when the session is stopped, terminated, or disconnected. You agree to:

• Follow all on-screen and on-site instructions.
• Inspect visible cables and connectors before use.
• Stop using damaged or unsafe equipment and report issues promptly.
• Comply with parking rules, site rules, and local laws.
• Remove your vehicle promptly after charging where required.`,
    },
    {
      title: 'Pricing, Wallet, and Payments',
      content: `Charging fees may include one or more of the following: per-kWh fees, time-based connection fees, idle or overstay fees, taxes or mandatory surcharges, and other fees clearly shown before confirmation where applicable.

Where a wallet system is used:
• You may be required to maintain sufficient balance before starting a session.
• Wallet top-ups may be processed by a third-party payment provider.
• Top-ups, holds, reversals, and refunds may be subject to payment-provider rules and processing delays.
• We may suspend charging or prevent session initiation if balance, authorization, or risk controls fail.`,
    },
    {
      title: 'Billing and Metering',
      content: `We calculate charges based on the pricing shown in the app and charging-session records, which may include charger logs, session records, meter values, time connected, and internal billing systems. In case of disputes, our internal technical records, charger logs, and payment records will be considered when reviewing the matter.`,
    },
    {
      title: 'Idle Fees and Fair Use',
      content: `To promote fair access, we may charge idle or overstay fees if a vehicle remains connected or occupies a charging space beyond the permitted charging or grace period. Applicable fees, if any, should be shown before or during the session where supported.`,
    },
    {
      title: 'Refunds and Disputes',
      content: `You must report billing or session disputes within 7 days of the relevant charge unless a longer period is required by law. Refunds, credits, and adjustments are granted at our discretion or as required by law, based on the evidence available, including charger logs and payment records.`,
    },
    {
      title: 'Acceptable Use',
      content: `You must not:

• Misuse, damage, tamper with, or interfere with any charger, connector, station, app, or backend system.
• Attempt to reverse engineer, scrape, exploit, or disrupt the Services.
• Use the Services for illegal, fraudulent, or unauthorized purposes.
• Interfere with another user’s charging session.
• Upload malware, abuse the API, or attempt unauthorized access.
• Occupy EV charging spaces unlawfully or with incompatible vehicles.`,
    },
    {
      title: 'Service Availability',
      content: `The Services may be unavailable or degraded due to maintenance, firmware issues, charger faults, communications outages, site restrictions, utility interruptions, weather, force majeure events, or third-party failures. We do not guarantee uninterrupted availability.`,
    },
    {
      title: 'Intellectual Property',
      content: `The app, website, branding, UI, software, text, graphics, trademarks, and service content are owned by or licensed to us and protected by applicable intellectual-property laws. Except for the limited right to use the Services under these Terms, no rights are granted to you.`,
    },
    {
      title: 'Suspension and Termination',
      content: `We may suspend or terminate access to the Services, with or without notice where appropriate, if:

• You violate these Terms.
• We suspect fraud, abuse, or unlawful activity.
• A payment is reversed, rejected, or unpaid.
• Your use poses a security, safety, or operational risk or we are required to do so by law or a network/operator partner.

You may stop using the Services at any time. Account deletion and outstanding balances remain subject to applicable payment and legal obligations.`,
    },
    {
      title: 'Disclaimers',
      content: `To the maximum extent permitted by law, the Services are provided “as is” and “as available.” We disclaim implied warranties, including merchantability, fitness for a particular purpose, and non-infringement, except where such disclaimers are prohibited by law.`,
    },
    {
      title: 'Limitation of Liability',
      content: `To the maximum extent permitted by law:

• We are not liable for indirect, incidental, consequential, special, exemplary, or punitive damages.
• We are not liable for losses caused by charger unavailability, communication failures, utility outages, station host restrictions, vehicle incompatibility, or user error.
• Our aggregate liability arising out of or relating to the Services will not exceed the greater of: the amount you paid us for the specific disputed session or transaction or the minimum amount required by applicable law.`,
    },
    {
      title: 'Indemnity',
      content: `You agree to indemnify and hold harmless Lanka EV Plus (pvt) ltd., its affiliates, officers, staff, partners, station hosts, and service providers from claims, liabilities, losses, and expenses arising from your misuse of the Services, violation of these Terms, unlawful conduct, or negligence.`,
    },
    {
      title: 'Privacy',
      content: `Your use of the Services is also subject to our Privacy Policy, which explains how we collect, use, and protect personal information.`,
    },
    {
      title: 'Changes to These Terms',
      content: `We may update these Terms from time to time. Material changes will be posted in the app, on the website, by email, or through other reasonable notice. Continued use of the Services after the effective date of the updated Terms means you accept the revised Terms.`,
    },
    {
      title: 'Governing Law and Dispute Resolution',
      content: `These Terms are governed by the laws of Sri Lanka, unless another jurisdiction is required by applicable law. Disputes will be subject to the exclusive jurisdiction of the competent courts of Sri Lanka, unless consumer law requires otherwise.`,
    },
    {
      title: 'Contact Information',
      content: `For questions about these Terms of Service, please contact us:

• Email: info@lankaevplus.com
• Phone: +94 70 432 3391
• WhatsApp: +94 70 432 3306
• Address: No.3/10, Centra Park, Gampaha Road, Yakkala.`,
    },
  ]

  return (
    <>
      <SEO
        title="Terms of Service | Lanka EV+"
        description="Read the terms and conditions for using Lanka EV+ website and services."
        keywords="terms of service, terms and conditions, user agreement, Lanka EV Plus"
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
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="display-font text-4xl sm:text-5xl text-white mb-4">
              TERMS OF SERVICE
            </h1>
            <p className="text-lg text-primary-400/80 uppercase tracking-widest text-xs font-semibold">
              Last updated: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-dark-950">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-dark-300 text-lg mb-8">
              Please read these Terms of Service carefully before using the Lanka EV+ website or engaging our services. These terms govern your use of our website and services.
            </p>

            <div className="space-y-6">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.03 }}
                  className="bg-dark-900 border border-white/5 p-6 sm:p-8 hover:border-white/10 transition-colors"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary-500/10 rounded-lg flex items-center justify-center text-primary-400 font-bold text-sm">
                      {index + 1}
                    </span>
                    {section.title}
                  </h2>
                  <div className="text-dark-400 whitespace-pre-line leading-relaxed">
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Agreement Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 bg-primary-500/5 border border-primary-500/20 rounded-2xl p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Agreement Acknowledgment</h3>
                  <p className="text-dark-400">
                    By using our website, app, or engaging our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you have any questions, please contact us before proceeding.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Back Link */}
            <div className="mt-12 text-center">
              <Link 
                to="/"
                className="inline-flex items-center gap-2 text-primary-400 font-semibold hover:text-primary-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Terms
