import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { useCart } from '../contexts/CartContext'

const Cart = () => {
  const navigate = useNavigate()
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (items.length === 0) {
    return (
      <>
        <SEO
          title="Shopping Cart - LankaEVPlus"
          description="Your shopping cart at LankaEVPlus"
          keywords="cart, shopping cart, EV chargers, electric scooters"
        />
        
        {/* Empty Cart */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-950">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
            <motion.div
              className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>

          <motion.div
            className="relative z-10 max-w-md mx-auto text-center px-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 bg-dark-800 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Your Cart is Empty</h1>
            <p className="text-dark-400 mb-8">
              Start shopping to add items to your cart
            </p>
            <button 
              onClick={() => navigate('/chargers')}
              className="btn-primary"
            >
              Browse Chargers
            </button>
          </motion.div>
        </section>
      </>
    )
  }

  return (
    <>
      <SEO
        title="Shopping Cart - LankaEVPlus"
        description="Review your cart items and proceed to checkout"
        keywords="cart, shopping cart, checkout, EV chargers"
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden bg-dark-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
          <motion.div
            className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full mb-6">
              <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm font-medium text-primary-400">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
            </div>
            
            <h1 className="display-font text-5xl sm:text-6xl text-white mb-4">
              SHOPPING CART
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12 bg-dark-950">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-dark-800/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                >
                  <div className="flex gap-6">
                    <div className="w-24 h-24 bg-dark-700 rounded-xl overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-white mb-1">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-dark-400 text-sm mb-4 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-9 h-9 rounded-lg border border-white/10 bg-dark-700 hover:bg-dark-600 flex items-center justify-center text-white transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-12 text-center font-semibold text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-9 h-9 rounded-lg border border-white/10 bg-dark-700 hover:bg-dark-600 flex items-center justify-center text-white transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary-400">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm text-red-400 hover:text-red-300 mt-1 flex items-center gap-1 ml-auto transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <motion.div
                className="pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={clearCart}
                  className="text-sm text-dark-400 hover:text-red-400 flex items-center gap-2 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear Cart
                </button>
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-dark-800/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-dark-300">
                    <span>Subtotal</span>
                    <span className="font-medium text-white">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-dark-300">
                    <span>Shipping</span>
                    <span className="text-sm text-dark-500">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-white/10 pt-4 flex justify-between">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-2xl font-bold text-primary-400">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full btn-primary mb-4 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                <Link to="/chargers" className="block">
                  <button className="w-full btn-secondary">
                    Continue Shopping
                  </button>
                </Link>

                {/* Trust badges */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-xs text-dark-400">
                      <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Secure Checkout
                    </div>
                    <div className="flex items-center gap-2 text-xs text-dark-400">
                      <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Free Delivery
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Cart
