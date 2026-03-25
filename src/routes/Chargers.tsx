import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { productApi, type Product } from '../api/products'
import { useCart } from '../contexts/CartContext'

const Chargers = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addToCart } = useCart()

  const categories = [
    { id: 'all', label: 'All Chargers', icon: '⚡' },
    { id: 'home', label: 'Home Chargers', icon: '🏠' },
    { id: 'commercial', label: 'Commercial', icon: '🏢' },
    { id: 'fast', label: 'Fast Chargers', icon: '🚀' },
    { id: 'accessories', label: 'Accessories', icon: '🔌' },
  ]

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const category = selectedCategory === 'all' ? undefined : selectedCategory
        const productsData = await productApi.getAll(category)
        setProducts(productsData)
      } catch (err) {
        console.error('Failed to load products:', err)
        setError('Failed to load products. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
    loadProducts()
  }, [selectedCategory])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    if (category === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', category)
    }
    setSearchParams(searchParams)
  }

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

  return (
    <>
      <SEO
        title="EV Chargers - Home, Commercial & Fast Charging Solutions"
        description="Shop premium EV chargers for home and business. Level 2 wall chargers, commercial charging stations, and DC fast chargers. Professional installation across Sri Lanka."
        keywords="EV chargers, home charger, Level 2 charger, DC fast charger, commercial charging station, EV charger installation Sri Lanka"
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-dark-950">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
          <motion.div
            className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
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
              Premium Charging Solutions
            </span>
            
            <h1 className="display-font text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
              EV CHARGERS
            </h1>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto">
              From home wall boxes to commercial fast chargers — find the perfect charging solution for your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-dark-950">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          {/* Category Filter */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-6 py-3 font-medium text-sm uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-white text-dark-950'
                      : 'bg-dark-800 text-dark-300 border border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-2 border-dark-700 rounded-full"></div>
                <div className="absolute inset-0 w-16 h-16 border-2 border-primary-500 rounded-full animate-spin border-t-transparent"></div>
              </div>
              <p className="mt-6 text-dark-400 font-medium uppercase tracking-wide text-sm">Loading chargers...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
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
          )}

          {/* Products Grid */}
          {!isLoading && !error && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link to={`/product/${product.id}`} className="block group">
                    <div className="product-card h-full">
                      {/* Product Image */}
                      <div className="relative aspect-square bg-dark-800 overflow-hidden">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-16 h-16 text-dark-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                        )}
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                          {product.discountPercent && product.discountPercent > 0 && (
                            <span className="bg-red-500 text-white px-3 py-1 text-xs font-bold uppercase tracking-wide">
                              -{product.discountPercent}%
                            </span>
                          )}
                          <div className="ml-auto">
                            {product.stock > 0 ? (
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
                            onClick={(e) => handleAddToCart(product, e)}
                            disabled={product.stock <= 0}
                            className="bg-white text-dark-950 px-6 py-3 font-semibold text-sm uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 disabled:opacity-50"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                      
                      {/* Product Info */}
                      <div className="p-6">
                        {product.category && (
                          <span className="text-xs font-medium uppercase tracking-wider text-primary-400 mb-2 block">
                            {product.category}
                          </span>
                        )}
                        
                        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
                          {product.name}
                        </h3>
                        
                        <p className="text-sm text-dark-400 mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        
                        <div className="flex items-end justify-between">
                          <div>
                            <div className="text-2xl font-bold text-white">
                              {formatPrice(product.price)}
                            </div>
                            {product.originalPrice && product.discountPercent && product.discountPercent > 0 && (
                              <span className="text-sm text-dark-500 line-through">
                                {formatPrice(product.originalPrice)}
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
            </motion.div>
          )}

          {/* Empty State */}
          {!isLoading && !error && products.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-dark-800 border border-white/10 rounded-lg mb-6">
                <svg className="w-10 h-10 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
              <p className="text-dark-400 mb-6">Try selecting a different category or check back later.</p>
              <button 
                onClick={() => handleCategoryChange('all')}
                className="btn-secondary"
              >
                View All Chargers
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-dark-900 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="display-font text-4xl sm:text-5xl text-white mb-4">WHY CHOOSE US</h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Premium quality chargers with professional installation and lifetime support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '⚡',
                title: 'Fast Charging',
                description: 'Up to 22kW Level 2 and 150kW DC fast charging options',
              },
              {
                icon: '🛡️',
                title: 'Certified Safe',
                description: 'All chargers meet international safety standards',
              },
              {
                icon: '🔧',
                title: 'Pro Installation',
                description: 'Expert installation included with every purchase',
              },
              {
                icon: '📱',
                title: 'Smart Features',
                description: 'App control, scheduling, and energy monitoring',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-dark-800/50 border border-white/5 p-8 text-center hover:border-primary-500/30 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-dark-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Chargers
