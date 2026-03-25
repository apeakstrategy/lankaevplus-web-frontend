import { motion } from 'framer-motion'
import { useState } from 'react'

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  
  const testimonials = [
    {
      id: 1,
      quote: "Installing the LankaEVPlus home charger was the best decision for our EV. We charge overnight and never worry about range anymore. The installation team was professional and efficient.",
      author: "Samantha Perera",
      role: "Tesla Model 3 Owner",
      location: "Colombo",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    },
    {
      id: 2,
      quote: "As a hotel owner, adding EV charging stations has attracted a new segment of environmentally conscious travelers. LankaEVPlus handled everything from permits to installation.",
      author: "Rajitha Fernando",
      role: "Hotel Chain Owner",
      location: "Kandy",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    },
    {
      id: 3,
      quote: "The electric scooter has transformed my daily commute. Zero fuel costs, minimal maintenance, and it's perfect for navigating Colombo traffic. Highly recommend!",
      author: "Dinesh Jayawardena",
      role: "IT Professional",
      location: "Colombo",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    },
    {
      id: 4,
      quote: "The charging ecosystem app makes it so easy to find available stations across the island. Real-time updates and seamless payment integration. This is the future!",
      author: "Nadeesha Silva",
      role: "EV Enthusiast",
      location: "Galle",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    },
  ]

  return (
    <section className="relative py-24 lg:py-32 bg-dark-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[120px]"
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-400 mb-4 block">
            Testimonials
          </span>
          <h2 className="display-font text-5xl sm:text-6xl text-white">
            CUSTOMER STORIES
          </h2>
        </motion.div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <motion.div
            key={testimonials[activeIndex].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Quote Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/10 rounded-full mb-8">
              <svg className="w-8 h-8 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>

            {/* Quote */}
            <blockquote className="text-2xl sm:text-3xl text-white font-light leading-relaxed mb-10">
              "{testimonials[activeIndex].quote}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <img
                src={testimonials[activeIndex].image}
                alt={testimonials[activeIndex].author}
                className="w-14 h-14 rounded-full object-cover border-2 border-primary-500/30"
              />
              <div className="text-left">
                <div className="text-white font-semibold">{testimonials[activeIndex].author}</div>
                <div className="text-dark-400 text-sm">{testimonials[activeIndex].role}</div>
                <div className="text-dark-500 text-xs">{testimonials[activeIndex].location}</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-12 h-1 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-primary-500' 
                  : 'bg-dark-700 hover:bg-dark-600'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center gap-4 mt-12">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setActiveIndex(index)}
              className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'ring-2 ring-primary-500 ring-offset-2 ring-offset-dark-950' 
                  : 'opacity-50 hover:opacity-75'
              }`}
            >
              <img
                src={testimonial.image}
                alt={testimonial.author}
                className="w-12 h-12 object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
