import { motion } from 'framer-motion'

const StorySplitSection = () => {
  return (
    <section className="relative py-24 lg:py-40 bg-dark-950 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Side: Sticky Title */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                  Who We Are
                </h2>
                <div className="w-12 h-1 bg-primary-500 mb-8" />
                <p className="text-lg text-primary-400 font-medium tracking-wide">
                  11+ Years of Real-World Engineering
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Side: Flowing Narrative */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="prose prose-invert prose-lg max-w-none text-dark-300"
            >
              <p className="text-xl sm:text-2xl text-white font-light leading-relaxed mb-10">
                LankaEVPlus is the next step in a journey that began over a decade ago — not just in mobility, but in energy itself.
              </p>

              <div className="space-y-8 lg:space-y-12 text-base sm:text-lg leading-relaxed">
                <p>
                  Our foundation comes from <strong className="text-white font-medium">Greenlight Solar Lanka</strong>, a company established in 2013 that has played a key role in advancing renewable energy adoption across Sri Lanka. Through years of delivering solar solutions, we built deep expertise in power systems, infrastructure, and sustainable technologies that are now shaping the future of transportation.
                </p>
                
                <p>
                  Recognizing the global shift toward electric mobility, <strong>LankaEVPlus was launched to bridge the gap between energy and transportation.</strong> We are focused on building the ecosystem required for EV adoption in Sri Lanka — from charging infrastructure to electric mobility solutions — backed by real-world experience in powering homes and businesses across the island.
                </p>
                
                <p>
                  While LankaEVPlus is in its early stages, it is built on a strong and proven foundation. Our approach is not experimental — it is an extension of years of engineering expertise, customer trust, and operational excellence established through Greenlight Solar Lanka. This allows us to develop EV solutions that are practical, reliable, and tailored to Sri Lanka’s unique energy landscape.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default StorySplitSection
