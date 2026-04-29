import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const Privacy = () => {
  const lastUpdated = 'March 26, 2026'

  const sections = [
    {
      title: 'Introduction',
      content: `Welcome to Lanka EV+! Your privacy is very important to us. This Privacy Policy explains how Lanka EV Plus (pvt) ltd. ("we," "us," or "our") collects, uses, shares, and protects information when you use our mobile application, website, and EV charging services (collectively, the "Services"). By using the Services, you consent to the data practices described in this Privacy Policy.`,
    },
    {
      title: 'Information We Collect',
      content: `We collect information to provide, improve, and secure our Services. The types of information we collect include:

a. Information You Provide to Us
• Account Information: Name, email address, phone number, and password when you register.
• Payment Information: Credit card details or mobile payment information (processed securely by our third-party payment gateways; we do not store full card numbers).
• Communications: Any messages, support requests, or feedback you send to us.

b. Information We Collect Automatically
• Usage Data: Information about how you use the app, such as features accessed, time spent, and screens viewed.
• Charging Data: Session start/stop times, duration, energy consumed (kWh), station location, and error logs.`,
    },
    {
      title: 'How We Use Your Information',
      content: `We use your information for the following purposes:

• Service Operations: To create your account, manage your wallet balance, process payments, and initiate/stop charging sessions.
• Customer Support: To respond to inquiries, troubleshoot issues, and notify you of network outages or maintenance.
• Service Improvement: To analyze usage trends, optimize station placement, and improve the app's functionality.
• Safety and Security: To detect, prevent, and respond to fraud, unauthorized access, or safety issues at charging stations.`,
    },
    {
      title: 'How We Share Your Information',
      content: `We do not sell your personal data. We may share your information only in the following ways:

• Service Providers: With payment processors, cloud hosting providers, and customer support platforms who need access to perform services for us.
• Station Hosts and Partners: We may share anonymized or aggregated charging session data (e.g., energy dispensed, time of day) with the property owners hosting the chargers.
• Legal Compliance: If required by law, regulation, subpoena, or to protect the safety, rights, or property of Lanka EV Plus (pvt) ltd., our users, or the public.`,
    },
    {
      title: 'Your Choices and Rights',
      content: `• Account Information: You can review and update your profile information within the app.
• Data Deletion: You may request the deletion of your account and associated personal data by contacting us. We will comply, subject to legal and accounting retention requirements.`,
    },
    {
      title: 'Data Security',
      content: `We use industry-standard security measures, including encryption and secure server infrastructure, to protect your information. However, no electronic transmission or storage is 100% secure. We cannot guarantee absolute security, but we strive to protect your data using commercially reasonable means.`,
    },
    {
      title: 'Data Retention',
      content: `We retain your personal information as long as you have an active account or as needed to provide the Services. We may retain certain information (like transaction records) for longer periods to comply with tax, legal, or accounting obligations, or to resolve disputes.`,
    },
    {
      title: "Children's Privacy",
      content: `Our Services are not directed to individuals under the age of 18 (or the applicable age of majority). We do not knowingly collect personal information from children. If we become aware that we have collected such data, we will take steps to delete it.`,
    },
    {
      title: 'Third-Party Links',
      content: `The Services may contain links to third-party websites or services (e.g., roaming partners). We are not responsible for the privacy practices of those third parties. We encourage you to review their privacy policies before sharing any information.`,
    },
    {
      title: 'Governing Law',
      content: `This Privacy Policy shall be governed by and interpreted in accordance with the laws of Sri Lanka, without giving effect to any principles of conflicts of law.`,
    },
    {
      title: 'Changes to This Privacy Policy',
      content: `We may update this Privacy Policy from time to time. We will post the updated version with a revised "Last Updated" date, and where required we will provide additional notice.`,
    },
    {
      title: 'Contact Us',
      content: `If you have any questions or concerns regarding our privacy policies, please contact us:

• Email: info@lankaevplus.com
• Phone: +94 70 432 3391
• WhatsApp: +94 70 432 3391
• Address: No.3/10, Centra Park, Gampaha Road, Yakkala.`,
    },
  ]

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Learn how Lanka EV Plus collects, uses, and protects your personal information when using our EV charging services."
        keywords="privacy policy, data protection, personal information, Lanka EV Plus, EV charging"
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
              PRIVACY POLICY
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
              Lanka EV Plus (pvt) ltd. ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our EV charging services.
            </p>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
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

export default Privacy
