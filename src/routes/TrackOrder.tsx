import { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import SEO from '../components/SEO'
import { orderApi, type Order } from '../api/orders'
import { Link } from 'react-router-dom'

const statusSteps = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED']

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [order, setOrder] = useState<Order | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchMode, setSearchMode] = useState<'number' | 'email'>('number')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-LK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleTrackByNumber = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderNumber.trim()) return

    setIsLoading(true)
    setError(null)
    setOrder(null)
    setOrders([])

    try {
      const orderData = await orderApi.track(orderNumber.trim())
      setOrder(orderData)
    } catch (err) {
      console.error('Failed to track order:', err)
      setError('Order not found. Please check your order number and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchByEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    setError(null)
    setOrder(null)
    setOrders([])

    try {
      const ordersData = await orderApi.getByEmail(email.trim())
      if (ordersData.length === 0) {
        setError('No orders found for this email address.')
      } else {
        setOrders(ordersData)
      }
    } catch (err) {
      console.error('Failed to find orders:', err)
      setError('Failed to find orders. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIndex = (status: string) => {
    const index = statusSteps.indexOf(status)
    return index >= 0 ? index : 0
  }

  const OrderStatusTracker = ({ currentStatus }: { currentStatus: string }) => {
    const currentIndex = getStatusIndex(currentStatus)
    const isCancelled = currentStatus === 'CANCELLED'

      if (isCancelled) {
      return (
        <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <span className="text-red-400 font-semibold text-lg">Order Cancelled</span>
        </div>
      )
    }

    return (
      <div className="relative py-4">
        <div className="flex justify-between items-center relative z-10">
          {statusSteps.map((step, index) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
                  index <= currentIndex
                    ? 'bg-primary-500 text-dark-950'
                    : 'bg-dark-800 border-2 border-white/10 text-dark-400'
                }`}
              >
                {index < currentIndex ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </motion.div>
              <span
                className={`mt-2 text-xs text-center font-medium ${
                  index <= currentIndex ? 'text-primary-400' : 'text-dark-500'
                }`}
              >
                {step.charAt(0) + step.slice(1).toLowerCase()}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute top-[26px] left-0 right-0 h-1 bg-dark-800 rounded-full">
          <motion.div
            className="h-full bg-primary-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentIndex / (statusSteps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title="Track Order"
        description="Track your order status"
        keywords="track order, order status"
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-dark-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6"
            >
              <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span className="text-sm font-medium text-white/90">Real-time Updates</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white mb-4">
              Track Your Order
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              Enter your order number or email to check your order status
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-dark-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Search Mode Toggle */}
          <motion.div
            className="flex gap-2 mb-8 p-1 bg-dark-800 border border-white/5 rounded-xl w-fit mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => { setSearchMode('number'); setOrder(null); setOrders([]); setError(null); }}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                searchMode === 'number'
                  ? 'bg-primary-500 text-dark-950 shadow-lg'
                  : 'text-dark-400 hover:text-white'
              }`}
            >
              Track by Order Number
            </button>
            <button
              onClick={() => { setSearchMode('email'); setOrder(null); setOrders([]); setError(null); }}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                searchMode === 'email'
                  ? 'bg-primary-500 text-dark-950 shadow-lg'
                  : 'text-dark-400 hover:text-white'
              }`}
            >
              Find by Email
            </button>
          </motion.div>

          {/* Search Form */}
          <motion.div
            className="bg-dark-900 border border-white/5 rounded-2xl shadow-2xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {searchMode === 'number' ? (
              <form onSubmit={handleTrackByNumber} className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter your order number (e.g., ORD-XXXXX-XXXX)"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                  />
                </div>
                <Button type="submit" variant="primary" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Tracking...
                    </span>
                  ) : (
                    'Track'
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSearchByEmail} className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button type="submit" variant="primary" disabled={isLoading}>
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </motion.div>
          )}

          {/* Single Order Result */}
          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-dark-900 border border-white/5 rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
                <div className="mb-8">
                  <OrderStatusTracker currentStatus={order.status} />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-dark-800 rounded-xl p-5 border border-white/5">
                    <h3 className="text-lg font-bold text-white mb-4">Order Information</h3>
                    <div className="space-y-3 text-dark-300">
                      <div className="flex justify-between">
                        <span className="text-dark-400">Order Number</span>
                        <span className="font-mono font-semibold text-white">{order.orderNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark-400">Date</span>
                        <span className="text-white">{formatDate(order.createdAt)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-dark-400">Status</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          order.status === 'DELIVERED' ? 'bg-primary-500/20 text-primary-400' :
                          order.status === 'CANCELLED' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-white/10">
                        <div className="flex justify-between">
                          <span className="text-dark-400">Total</span>
                          <span className="text-xl font-bold text-primary-400">{formatPrice(order.totalAmount)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-800 rounded-xl p-5 border border-white/5">
                    <h3 className="text-lg font-bold text-white mb-4">Shipping Details</h3>
                    <div className="space-y-2 text-dark-300">
                      <p className="font-medium text-white">{order.customerName}</p>
                      <p>{order.customerEmail}</p>
                      {order.customerPhone && <p>{order.customerPhone}</p>}
                      {order.customerAddress && <p>{order.customerAddress}</p>}
                    </div>
                  </div>
                </div>

                {order.items && order.items.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4">Items</h3>
                    <div className="bg-dark-800/80 rounded-xl divide-y divide-white/5 border border-white/5">
                      {order.items.map((item) => (
                        <div key={item.id} className="p-4 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-white">{item.product?.name || 'Product'}</p>
                              <p className="text-sm text-dark-400">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-bold text-white">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Multiple Orders Result */}
          {orders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">Your Orders ({orders.length})</h2>
              <div className="space-y-4">
                {orders.map((ord, index) => (
                  <motion.div
                    key={ord.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-dark-900 border border-white/5 rounded-2xl shadow-xl p-6 cursor-pointer hover:border-white/10 transition-colors"
                    onClick={() => setOrder(ord)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-mono font-bold text-white">{ord.orderNumber}</p>
                        <p className="text-sm text-dark-500 mt-1">{formatDate(ord.createdAt)}</p>
                        <p className="text-sm text-dark-400 mt-1">{ord.items.length} item(s)</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          ord.status === 'DELIVERED' ? 'bg-primary-500/20 text-primary-400' :
                          ord.status === 'CANCELLED' ? 'bg-red-500/20 text-red-500' :
                          'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {ord.status}
                        </span>
                        <p className="text-xl font-bold text-primary-400 mt-2">
                          {formatPrice(ord.totalAmount)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* No Results */}
          {!isLoading && !error && !order && orders.length === 0 && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-20 h-20 bg-dark-800 border border-white/5 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <svg className="w-10 h-10 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-dark-400 mb-4">Enter your order number or email to track your orders.</p>
              <Link to="/shop" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
                Continue Shopping
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}

export default TrackOrder
