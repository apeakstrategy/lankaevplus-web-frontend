import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { productApi, type Product } from '../../api/products'
import { useCart } from '../../contexts/CartContext'

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true)
        const productsData = await productApi.getAll()
        // Get first 8 products
        setProducts(productsData.slice(0, 8))
      } catch (err) {
        console.error('Failed to load products:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadProducts()
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

  const categories = [
    {
      title: 'EV Chargers',
      description: 'Home & commercial charging solutions',
      icon: '⚡',
      link: '/chargers',
      gradient: 'from-primary-500 to-cyan-500',
    },
    {
      title: 'Electric Scooters',
      description: 'Eco-friendly urban mobility',
      icon: '🛵',
      link: '/scooters',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Charging Network',
      description: 'Find stations near you',
      icon: '📍',
      link: '/stations',
      gradient: 'from-blue-500 to-indigo-500',
    },
  ]

  return (
    <section className="py-24 bg-dark-900">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-400 mb-4 block">
            What We Offer
          </span>
          <h2 className="display-font text-4xl sm:text-5xl text-white mb-4">
            EV SOLUTIONS
          </h2>
          <p className="text-dark-400 max-w-xl mx-auto">
            Everything you need to power your electric journey — from home chargers to electric scooters.
          </p>
        </motion.div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={cat.link} className="block group">
                <div className="relative bg-dark-800 border border-white/5 p-8 rounded-2xl overflow-hidden hover:border-primary-500/30 transition-all duration-300">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <span className="text-4xl mb-4 block">{cat.icon}</span>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-dark-400 text-sm mb-4">{cat.description}</p>
                    <span className="text-primary-400 text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                      Explore
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Featured Products */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-2">Featured Products</h3>
          <p className="text-dark-400">Our most popular EV charging solutions</p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="relative">
              <div className="w-12 h-12 border-2 border-dark-700 rounded-full"></div>
              <div className="absolute inset-0 w-12 h-12 border-2 border-primary-500 rounded-full animate-spin border-t-transparent"></div>
            </div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link to={`/product/${product.id}`} className="block group">
                  <div className="product-card h-full">
                    <div className="relative aspect-square bg-dark-800 overflow-hidden">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-12 h-12 text-dark-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Quick add overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          disabled={product.stock <= 0}
                          className="bg-white text-dark-950 px-5 py-2.5 font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 disabled:opacity-50"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      {product.category && (
                        <span className="text-xs font-medium uppercase tracking-wider text-primary-400 mb-2 block">
                          {product.category}
                        </span>
                      )}
                      <h4 className="text-white font-semibold mb-2 line-clamp-1 group-hover:text-primary-400 transition-colors">
                        {product.name}
                      </h4>
                      <div className="text-xl font-bold text-white">
                        {formatPrice(product.price)}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-dark-400">No products available. Check back soon!</p>
          </div>
        )}

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/chargers" className="btn-primary inline-flex items-center gap-2">
            View All Products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProducts
