import { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import SEO from '../components/SEO'
import { orderApi, type Order } from '../api/orders'

const OrderSuccess = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [order, setOrder] = useState<Order | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>('cod')

  useEffect(() => {
    const loadOrder = async () => {
      const orderNumber = location.state?.orderNumber
      
      if (orderNumber) {
        try {
          const orderData = await orderApi.track(orderNumber)
          setOrder(orderData)
          
          const savedOrder = localStorage.getItem('currentOrder')
          if (savedOrder) {
            const parsed = JSON.parse(savedOrder)
            setPaymentMethod(parsed.paymentMethod || 'cod')
          }
        } catch (err) {
          console.error('Failed to load order:', err)
        }
      } else {
        const savedOrder = localStorage.getItem('currentOrder')
        if (savedOrder) {
          const parsed = JSON.parse(savedOrder)
          setOrder(parsed)
          setPaymentMethod(parsed.paymentMethod || 'cod')
        }
      }
    }
    
    loadOrder()
  }, [location])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (!order) {
    return (
      <>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-950">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
          </div>
          <div className="relative z-10 max-w-md mx-auto text-center px-6">
            <div className="w-20 h-20 bg-dark-800 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Order Not Found</h1>
            <Link to="/chargers">
              <Button variant="primary">Continue Shopping</Button>
            </Link>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <SEO
        title="Order Confirmed"
        description="Your order has been confirmed successfully"
        keywords="order success, order confirmed"
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-dark-950">
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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            
            <h1 className="display-font text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
              ORDER CONFIRMED!
            </h1>
            <p className="text-lg text-dark-300 max-w-xl mx-auto">
              Thank you for your order. We've received it and will process it shortly.
              {paymentMethod === 'cod' && (
                <span className="block mt-2 font-semibold text-primary-400">
                  You will pay when you receive your order.
                </span>
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-dark-950">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="bg-dark-800/60 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold text-white mb-6">Order Details</h2>
              
              <div className="space-y-5">
                <div className="flex items-center justify-between p-4 bg-primary-500/10 border border-primary-500/30 rounded-xl">
                  <span className="font-semibold text-white">Order Number</span>
                  <span className="text-white font-mono font-bold">{order.orderNumber}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-dark-700/50 rounded-xl">
                    <span className="text-sm text-dark-400 block mb-1">Total Amount</span>
                    <span className="text-2xl font-bold text-primary-400">{formatPrice(order.totalAmount)}</span>
                  </div>
                  
                  <div className="p-4 bg-dark-700/50 rounded-xl">
                    <span className="text-sm text-dark-400 block mb-1">Payment Method</span>
                    <span className="text-lg font-semibold text-white">
                      {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 bg-dark-700/50 rounded-xl">
                  <span className="text-sm text-dark-400 block mb-1">Status</span>
                  <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-sm font-semibold">
                    {order.status}
                  </span>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h3 className="font-semibold text-white mb-3">Shipping Address</h3>
                  <div className="text-dark-300 space-y-1">
                    <p className="font-medium text-white">{order.customerName}</p>
                    <p>{order.customerEmail}</p>
                    {order.customerPhone && <p>{order.customerPhone}</p>}
                    <p>{order.customerAddress}</p>
                  </div>
                </div>

                {order.items && order.items.length > 0 && (
                  <div className="pt-4 border-t border-white/10">
                    <h3 className="font-semibold text-white mb-3">Items Ordered</h3>
                    <div className="bg-dark-700/50 rounded-xl divide-y divide-white/10">
                      {order.items.map((item) => (
                        <div key={item.id} className="p-4 flex justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
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

            <motion.div
              className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-5 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-primary-300">Track your order</p>
                  <p className="text-primary-400 text-sm mt-1">
                    Use order number <code className="bg-primary-500/20 px-2 py-1 rounded font-mono text-primary-300">{order.orderNumber}</code> to track your order status.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/chargers')}
            >
              Continue Shopping
            </Button>
            <Link to="/track-order">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Track Order
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default OrderSuccess
