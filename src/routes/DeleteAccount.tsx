import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const DeleteAccount = () => {
  const steps = [
    {
      number: 1,
      title: 'Open the Profile Page',
      content:
        'Open the Lanka EV+ app and tap the Profile icon at the bottom of the screen (bottom navigation bar).',
    },
    {
      number: 2,
      title: 'Scroll to the Bottom',
      content: `On the Profile page, scroll all the way down past:

• Account section (Personal Information, Privacy & Security)
• Support section (Help Center, Contact Support, Terms & Conditions, Privacy Policy)
• The red "Log Out" button

You will see a "Delete Account" button below the Log Out button. It has a 🗑️ trash icon and appears in light red text.`,
    },
    {
      number: 3,
      title: 'Tap "Delete Account"',
      content: `Tap the "Delete Account" button. A confirmation pop-up will appear asking:

"Are you sure you want to delete your account? This action cannot be undone."

You will see two options:

• Cancel — Go back without deleting (tap this if you change your mind)
• Yes, Delete — Continue with account deletion

Tap "Yes, Delete" to proceed.`,
    },
    {
      number: 4,
      title: 'Review the Final Warning',
      content: `A second pop-up will appear with a ⚠️ warning icon and more details. This screen includes:

• A reminder that the action is permanent and cannot be undone
• Wallet Refund information — with contact details if you want to request a refund for any remaining wallet balance:
  📧 Email: support@lankaevplus.com
  📞 Phone: +94 70 432 3391
  💬 WhatsApp: +94 70 432 3391

You will see two options:

• Cancel — Go back without deleting
• Delete — Permanently delete your account`,
    },
    {
      number: 5,
      title: 'Confirm Deletion',
      content:
        'Tap the red "Delete" button to permanently delete your account.\n\nA loading spinner will briefly appear with the message "Deleting account..."',
    },
    {
      number: 6,
      title: 'Done',
      content: `Once the deletion is complete:

• A message will appear saying "Your account has been deleted."
• You will be automatically taken back to the Login screen
• You will no longer be able to sign in with your previous credentials`,
    },
  ]

  const warningItems = [
    'Charging history',
    'Payment information',
    'Wallet balance',
  ]

  const contactMethods = [
    { icon: '📧', label: 'Email', value: 'support@lankaevplus.com', href: 'mailto:support@lankaevplus.com' },
    { icon: '📞', label: 'Phone', value: '+94 70 432 3391', href: 'tel:+94704323391' },
    { icon: '💬', label: 'WhatsApp', value: '+94 70 432 3391', href: 'https://wa.me/94704323391' },
  ]

  return (
    <>
      <SEO
        title="Delete Account"
        description="Step-by-step guide on how to delete your Lanka EV+ account from the mobile app. Learn about data removal, wallet refunds, and the permanent deletion process."
        keywords="delete account, remove account, Lanka EV Plus, data deletion, account removal"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-dark-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
          <motion.div
            className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-red-500/8 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[100px]"
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h1 className="display-font text-4xl sm:text-5xl text-white mb-4">
              DELETE YOUR ACCOUNT
            </h1>
            <p className="text-primary-400/80 uppercase tracking-widest text-xs font-semibold">
              How to Delete Your Lanka EV+ Account
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-dark-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-dark-300 text-lg mb-10"
          >
            This guide will walk you through deleting your account from the Lanka EV+ mobile app.
          </motion.p>

          {/* Warning Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 sm:p-8 mb-10"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-3">⚠️ Before You Delete</h2>
                <p className="text-dark-300 mb-4">Please read this carefully before proceeding:</p>
                <ul className="space-y-2">
                  <li className="text-red-400 font-semibold">
                    This action is permanent — once deleted, your account cannot be recovered.
                  </li>
                  <li className="text-dark-400">
                    All your data will be removed, including:
                    <ul className="mt-2 ml-4 space-y-1">
                      {warningItems.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-dark-400">
                          <span className="w-1.5 h-1.5 bg-red-400/60 rounded-full flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="text-dark-400 mt-3">
                    <span className="text-primary-400 font-medium">Wallet refunds</span> — If you have money remaining in your wallet, you can request a refund within 30 days after deletion by contacting support (details provided during the deletion process).
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Step-by-Step Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Step-by-Step Instructions</h2>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-dark-900 border border-white/5 p-6 sm:p-8 hover:border-white/10 transition-colors"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center text-primary-400 font-bold text-sm flex-shrink-0">
                      {step.number}
                    </span>
                    Step {step.number} — {step.title}
                  </h3>
                  <div className="text-dark-400 whitespace-pre-line leading-relaxed ml-0 sm:ml-[52px]">
                    {step.content}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Wallet Refund Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-primary-500/5 border border-primary-500/20 rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Need a Wallet Refund?</h3>
                <p className="text-dark-400 mb-6">
                  If you had money in your Lanka EV+ wallet at the time of deletion, you have <span className="text-primary-400 font-semibold">30 days</span> to request a refund. Contact us using any of the methods below:
                </p>

                <div className="grid gap-3 sm:grid-cols-3">
                  {contactMethods.map((method) => (
                    <a
                      key={method.label}
                      href={method.href}
                      target={method.label === 'WhatsApp' ? '_blank' : undefined}
                      rel={method.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3 bg-dark-900/50 border border-white/5 rounded-xl p-4 hover:border-primary-500/30 transition-colors group"
                    >
                      <span className="text-2xl">{method.icon}</span>
                      <div>
                        <div className="text-dark-500 text-xs uppercase tracking-wider">{method.label}</div>
                        <div className="text-white text-sm font-medium group-hover:text-primary-400 transition-colors">{method.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Need Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-dark-900 border border-white/5 rounded-2xl p-6 sm:p-8 text-center"
          >
            <h3 className="text-xl font-bold text-white mb-2">Need Help?</h3>
            <p className="text-dark-400 mb-2">
              If you experience any issues while trying to delete your account, please contact our support team using the details above. We're available to help you.
            </p>
            <p className="text-primary-400 font-semibold text-sm mt-4">
              Lanka EV+ — Electric Vehicle Charging Made Simple
            </p>
          </motion.div>

          {/* Navigation Links */}
          <div className="mt-12 flex items-center justify-center gap-6 flex-wrap">
            <Link
              to="/privacy"
              className="inline-flex items-center gap-2 text-primary-400 font-semibold hover:text-primary-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Privacy Policy
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-dark-400 font-semibold hover:text-dark-300 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default DeleteAccount
