import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const ReturnPolicy = () => {
  const lastUpdated = 'March 26, 2026'

//   const sections = [
//     {
//       title: 'Returns',
//       content: `We accept returns within 14 days from the date of purchase. To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.`,
//     },
//     {
//       title: 'Refunds',
//       content: `Once we receive your return and inspect the item, we will notify you of the status of your refund. If your return is approved, we will initiate a refund to your original method of payment. Please note that the refund amount will exclude any shipping charges incurred during the initial purchase.`,
//     },
//     {
//       title: 'Exchanges',
//       content: `If you would like to exchange your item for a different size, color, or style, please contact our customer support team within 14 days of receiving your order. We will provide you with further instructions on how to proceed with the exchange.`,
//     },
//     {
//       title: 'Non-Returnable Items',
//       content: `Certain items are non-returnable and non-refundable. These include:

// • Gift cards
// • Downloadable software products
// • Personalized or custom-made items
// • Perishable goods`,
//     },
//     {
//       title: 'Damaged or Defective Items',
//       content: `In the unfortunate event that your item arrives damaged or defective, please contact us immediately. We will arrange for a replacement or issue a refund, depending on your preference and product availability.`,
//     },
//     {
//       title: 'Return Shipping',
//       content: `You will be responsible for paying the shipping costs for returning your item unless the return is due to our error (e.g., wrong item shipped, defective product). In such cases, we will provide you with a prepaid shipping label.`,
//     },
//     {
//       title: 'Processing Time',
//       content: `Refunds and exchanges will be processed within 5 business days after we receive your returned item. Please note that it may take additional time for the refund to appear in your account, depending on your payment provider.`,
//     },
//     {
//       title: 'Contact Us',
//       content: `If you have any questions or concerns regarding our return or refund policy, please contact our customer support team. We are here to assist you and ensure your shopping experience with us is enjoyable and hassle-free.

// • Email: info@lankaevplus.com
// • Phone: +94 70 432 3391
// • WhatsApp: +94 70 432 3306
// • Address: No.3/10, Centra Park, Gampaha Road, Yakkala.`,
//     },
//   ]

const sections = [
  {
    title: 'Introduction',
    content: `This Refund & Return Policy explains how Lanka EV Plus (pvt) ltd. (“we,” “us,” or “our”) handles refunds, billing adjustments, and dispute resolutions related to the Lanka EV+ mobile application, website, wallet system, and EV charging services (collectively, the “Services”).

By using the Services, you agree to this Refund & Return Policy.`,
  },
  {
    title: 'Scope',
    content: `This policy applies to:

• EV charging sessions  
• Wallet-based payments and balances  
• Billing disputes and adjustments  
• Failed or interrupted charging sessions  
• Incorrect or duplicate charges  

This policy does not apply to third-party payment processing timelines or policies, which may affect refund processing durations.`,
  },
  {
    title: 'Refund Eligibility',
    content: `Refunds may be granted under the following circumstances:

3.1 Failed or Interrupted Charging Sessions
• Charging session did not start after payment authorization  
• Charging stopped prematurely due to technical issues  
• Charger malfunction or communication failure  
• Network or backend system errors  

3.2 Incorrect or Excess Charges
• Overbilling due to system or metering error  
• Duplicate transactions  
• Incorrect tariff or pricing application  

3.3 Unauthorized or Erroneous Transactions
• Transactions not initiated by the user (subject to investigation)  
• Wallet deductions caused by system faults  

All refund requests are subject to verification using system logs, charger data, and payment records.`,
  },
  {
    title: 'Non-Refundable Cases',
    content: `Refunds will not be provided in the following situations:

• Fully completed charging sessions without technical issues  
• Idle fees, overstay fees, or time-based penalties  
• User errors (e.g., selecting wrong charger, disconnecting early)  
• Wallet top-ups once successfully processed  
• Charges incurred due to user negligence or misuse`,
  },
  {
    title: 'Refund Method',
    content: `5.1 Wallet Refunds (Default Method)
• Approved refunds will be credited to the user’s Lanka EV+ wallet  
• Wallet refunds can be used for future charging sessions  

5.2 Bank Transfers (On Request)
• Users may request a refund to a bank account  
• Such requests are subject to manual review and approval  
• Additional verification may be required  
• Processing may take longer depending on financial institutions`,
  },
  {
    title: 'Refund Processing Time',
    content: `Refunds are typically processed within 3–7 business days after approval.

Delays may occur due to payment gateway processing, banking systems, or verification procedures.`,
  },
  {
    title: 'Dispute and Refund Requests',
    content: `Users must report disputes or refund requests within 7 days of the transaction.

To request a refund, users should provide:
• Transaction ID or reference number  
• Date and time of the charging session  
• Charger or station details (if available)  
• Description of the issue  

Requests can be submitted via:
• Email: support@lankaevplus.com`,
  },
  {
    title: 'Verification and Investigation',
    content: `All refund requests will be reviewed based on:

• Charging session logs and telemetry data  
• Meter values and usage records  
• Payment and transaction records  
• System audit logs  

We reserve the right to approve, partially approve, or reject refund requests based on the evidence available.`,
  },
  {
    title: 'Partial Refunds',
    content: `In certain cases, partial refunds may be issued where:

• Only part of the session was affected by an error  
• Pricing discrepancies impacted a portion of the transaction`,
  },
  {
    title: 'Abuse and Fraud Prevention',
    content: `We reserve the right to:

• Reject refund requests that are fraudulent, abusive, or unsupported  
• Suspend or restrict accounts involved in suspicious activities  
• Take legal or administrative action where necessary`,
  },
  {
    title: 'Changes to This Policy',
    content: `We may update this Refund & Return Policy from time to time. Updates will be posted within the app or website with a revised “Last Updated” date.`,
  },
  {
    title: 'Contact Us',
    content: `Lanka EV Plus (pvt) ltd.

• Support: support@lankaevplus.com  
• Address: No.3/10, Centra Park, Gampaha Road, Yakkala.`,
  },
]

  return (
    <>
      <SEO
        title="Return Policy | Lanka EV+"
        description="Learn about Lanka EV+ return and refund policies."
        keywords="return policy, refund policy, exchanges, Lanka EV Plus"
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
              RETURN POLICY
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
              Lanka EV Plus (pvt) ltd. ("we", "our", or "us") values your satisfaction and strives to provide you with the best online shopping experience possible. If, for any reason, you are not completely satisfied with your purchase, we are here to help. This Return Policy explains your rights and our obligations in relation to returns and refunds.
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

export default ReturnPolicy
