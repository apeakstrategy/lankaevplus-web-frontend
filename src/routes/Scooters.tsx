import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { productApi, type Product } from '../api/products'
import { useCart } from '../contexts/CartContext'

const Scooters = () => {
  const [scooters, setScooters] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addToCart } = useCart()

  useEffect(() => {
    const loadScooters = async () => {
      try {
        setIsLoading(true)
        setError(null)
        // Fetch products with "Electric Scooters" category
        const productsData = await productApi.getAll('Electric Scooters')
        setScooters(productsData)
      } catch (err) {
        console.error('Failed to load scooters:', err)
        setError('Failed to load scooters. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
    loadScooters()
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description || '',
      image: product.imageUrl || '',
    })
  }

  const displayScooters = scooters.length > 0 ? scooters : null

  return (
    <>
      <SEO
        title="Electric Scooters - Eco-Friendly Urban Mobility"
        description="Premium electric scooters designed for Sri Lankan roads. Efficient, reliable, and eco-friendly transportation. Compare models, specs, and prices."
        keywords="electric scooter Sri Lanka, e-scooter, electric bike, urban mobility, eco-friendly transport, electric vehicle"
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-dark-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
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
              Urban Mobility Redefined
            </span>
            
            <h1 className="display-font text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
              ELECTRIC SCOOTERS
            </h1>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto mb-8">
              Zero emissions. Zero fuel costs. Pure riding pleasure.
              <br />
              Designed for Sri Lankan roads.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <div className="text-center">
                <div className="stat-number text-primary-400 text-4xl">80+</div>
                <div className="text-xs uppercase tracking-wider text-dark-400">km Range</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <div className="stat-number text-primary-400 text-4xl">60</div>
                <div className="text-xs uppercase tracking-wider text-dark-400">km/h Top Speed</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <div className="stat-number text-amber-400 text-4xl">Rs.0</div>
                <div className="text-xs uppercase tracking-wider text-dark-400">Fuel Cost</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <section className="py-24 bg-dark-950">
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 border-2 border-dark-700 rounded-full"></div>
              <div className="absolute inset-0 w-16 h-16 border-2 border-primary-500 rounded-full animate-spin border-t-transparent"></div>
            </div>
            <p className="mt-6 text-dark-400 font-medium uppercase tracking-wide text-sm">Loading scooters...</p>
          </div>
        </section>
      )}

      {/* Error State */}
      {error && (
        <section className="py-24 bg-dark-950">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-lg mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-red-400 mb-4 font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-secondary"
            >
              Try Again
            </button>
          </div>
        </section>
      )}

      {/* Scooter Products from API */}
      {!isLoading && !error && displayScooters && displayScooters.length > 0 && (
        <section className="py-24 bg-dark-950">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="display-font text-4xl sm:text-5xl text-white mb-4">CHOOSE YOUR RIDE</h2>
              <p className="text-dark-400 max-w-xl mx-auto">
                Each scooter is designed for specific needs — from daily commuting to delivery operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayScooters.map((scooter, index) => (
                <motion.div
                  key={scooter.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/product/${scooter.id}`} className="block group">
                    <div className="product-card h-full">
                      <div className="relative aspect-[4/3] bg-dark-800 overflow-hidden">
                        {scooter.imageUrl ? (
                          <img
                            src={scooter.imageUrl}
                            alt={scooter.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-20 h-20 text-dark-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                        )}
                        
                        {/* Badge */}
                        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                          {scooter.discountPercent && scooter.discountPercent > 0 && (
                            <span className="bg-red-500 text-white px-3 py-1 text-xs font-bold uppercase tracking-wide">
                              -{scooter.discountPercent}%
                            </span>
                          )}
                          <div className="ml-auto">
                            {scooter.stock > 0 ? (
                              <span className="tag-available">In Stock</span>
                            ) : (
                              <span className="bg-dark-700 text-dark-300 px-3 py-1 text-xs font-medium">
                                Out of Stock
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quick Add Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={(e) => handleAddToCart(scooter, e)}
                            disabled={scooter.stock <= 0}
                            className="bg-white text-dark-950 px-6 py-3 font-semibold text-sm uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 disabled:opacity-50"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>

                      <div className="p-6">
                        <span className="text-xs font-medium uppercase tracking-wider text-primary-400 mb-2 block">
                          Electric Scooter
                        </span>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                          {scooter.name}
                        </h3>
                        <p className="text-sm text-dark-400 mb-4 line-clamp-2">
                          {scooter.description}
                        </p>
                        <div className="flex items-end justify-between">
                          <div>
                            <div className="text-2xl font-bold text-white">
                              {formatPrice(scooter.price)}
                            </div>
                            {scooter.originalPrice && scooter.discountPercent && scooter.discountPercent > 0 && (
                              <span className="text-sm text-dark-500 line-through">
                                {formatPrice(scooter.originalPrice)}
                              </span>
                            )}
                          </div>
                          <svg className="w-5 h-5 text-dark-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State (shown when no products from API) */}
      {!isLoading && !error && (!displayScooters || displayScooters.length === 0) && (
        // <section className="py-24 bg-dark-950">
        //   <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        //     <div className="text-center py-12">
        //       <div className="text-dark-500 mb-2">No scooters found</div>
        //     </div>
        //   </div>
        // </section>
        <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-dark-800 border border-white/10 rounded-lg mb-6">
                <svg className="w-10 h-10 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
            </div>
      )}

      {/* Compare Section */}
      {/* <section className="py-24 bg-dark-900 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="display-font text-4xl sm:text-5xl text-white mb-4">COMPARE MODELS</h2>
            <p className="text-dark-400">Find the perfect scooter for your needs</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-dark-400 text-sm uppercase tracking-wider font-medium">Feature</th>
                  {demoScooters.map((s) => (
                    <th key={s.id} className="text-center py-4 px-4 text-white font-semibold">{s.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {['range', 'topSpeed', 'battery', 'chargeTime', 'motor', 'weight'].map((spec) => (
                  <tr key={spec} className="border-b border-white/5">
                    <td className="py-4 px-4 text-dark-400 capitalize">{spec.replace(/([A-Z])/g, ' $1').trim()}</td>
                    {demoScooters.map((s) => (
                      <td key={s.id} className="text-center py-4 px-4 text-white">
                        {s.specs[spec as keyof typeof s.specs]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-b border-white/5">
                  <td className="py-4 px-4 text-dark-400">Price</td>
                  {demoScooters.map((s) => (
                    <td key={s.id} className="text-center py-4 px-4 text-primary-400 font-bold">
                      {formatPrice(s.price)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section> */}

      {/* Benefits */}
      <section className="py-24 bg-dark-950">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary-400 mb-4 block">
                Why Go Electric?
              </span>
              <h2 className="display-font text-4xl sm:text-5xl text-white mb-8">
                SAVE MONEY.<br />SAVE THE PLANET.
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Zero Fuel Costs', desc: 'Charge at home for a fraction of petrol cost' },
                  { title: 'Low Maintenance', desc: 'No oil changes, fewer moving parts to replace' },
                  { title: 'Tax Benefits', desc: 'Government incentives for EV purchases' },
                  { title: 'Quiet & Clean', desc: 'No emissions, no noise pollution' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                      <p className="text-dark-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-dark-900 border border-white/5 p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-white mb-6">Ready to go electric?</h3>
              <p className="text-dark-400 mb-8">
                Book a free test ride at our showroom and experience the future of urban mobility.
              </p>
              <Link to="/contact" className="btn-primary w-full justify-center">
                Book Test Ride
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Scooters
