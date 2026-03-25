import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { z } from 'zod'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import SEO from '../components/SEO'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Card number must be 16 digits').max(19),
  cardName: z.string().min(2, 'Cardholder name is required'),
  expiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, 'Invalid month'),
  expiryYear: z.string().regex(/^\d{2}$/, 'Invalid year'),
  cvv: z.string().regex(/^\d{3,4}$/, 'Invalid CVV'),
})

type PaymentFormData = z.infer<typeof paymentSchema>

interface OrderData {
  id: string;
  total: number;
  items: { id: string; name: string; quantity: number; price: number }[];
  shipping: { firstName: string; lastName: string; address: string; city: string; postalCode: string };
}

const Payment = () => {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [order, setOrder] = useState<OrderData | null>(null)

  useEffect(() => {
    const savedOrder = localStorage.getItem('currentOrder')
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder))
    } else {
      navigate('/checkout')
    }
  }, [navigate])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const onSubmit = async (data: PaymentFormData) => {
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update order status
    if (order) {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      const orderIndex = orders.findIndex((o: OrderData) => o.id === order.id)
      if (orderIndex !== -1) {
        orders[orderIndex].status = 'paid'
        orders[orderIndex].paymentDetails = {
          method: 'card',
          last4: data.cardNumber.slice(-4),
        }
        localStorage.setItem('orders', JSON.stringify(orders))
      }
    }
    
    setIsProcessing(false)
    navigate('/order-success', { state: { orderId: order?.id } })
  }

  if (!order) {
    return (
      <>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-950">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
          </div>
          <div className="relative z-10 text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-dark-400">Loading payment details...</p>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <SEO
        title="Payment"
        description="Complete your payment securely"
        keywords="payment, checkout, card payment"
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
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm">✓</div>
                <span className="text-white/70 text-sm hidden sm:block">Cart</span>
              </div>
              <div className="w-8 border-t border-white/30" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm">✓</div>
                <span className="text-white/70 text-sm hidden sm:block">Checkout</span>
              </div>
              <div className="w-8 border-t border-white/30" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 font-bold text-sm">3</div>
                <span className="text-white font-medium text-sm hidden sm:block">Payment</span>
              </div>
            </div>
            
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            
            <h1 className="display-font text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
              SECURE PAYMENT
            </h1>
            <p className="text-lg text-dark-300">
              Complete your payment securely
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-dark-950">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <motion.div
              className="bg-dark-800/60 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">Card Details</h2>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <Input
                  type="text"
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  {...register('cardNumber')}
                  error={errors.cardNumber?.message}
                  required
                />

                <Input
                  type="text"
                  label="Cardholder Name"
                  placeholder="John Doe"
                  {...register('cardName')}
                  error={errors.cardName?.message}
                  required
                />

                <div className="grid grid-cols-3 gap-4">
                  <Input
                    type="text"
                    label="Month"
                    placeholder="MM"
                    maxLength={2}
                    {...register('expiryMonth')}
                    error={errors.expiryMonth?.message}
                    required
                  />
                  <Input
                    type="text"
                    label="Year"
                    placeholder="YY"
                    maxLength={2}
                    {...register('expiryYear')}
                    error={errors.expiryYear?.message}
                    required
                  />
                  <Input
                    type="text"
                    label="CVV"
                    placeholder="123"
                    maxLength={4}
                    {...register('cvv')}
                    error={errors.cvv?.message}
                    required
                  />
                </div>

                <div className="p-4 bg-primary-500/10 border border-primary-500/30 rounded-xl flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p className="text-sm text-primary-300">
                    Your payment is secured with SSL encryption. We do not store your card details.
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <LoadingSpinner size="sm" />
                      Processing Payment...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Pay {formatPrice(order.total)}
                    </span>
                  )}
                </Button>

                {/* Card brand logos */}
                <div className="flex items-center justify-center gap-3 pt-4">
                  <div className="px-3 py-1 bg-blue-600 rounded text-white text-xs font-bold">VISA</div>
                  <div className="px-3 py-1 bg-red-500 rounded text-white text-xs font-bold">MC</div>
                  <div className="px-3 py-1 bg-gray-800 rounded text-white text-xs font-bold">AMEX</div>
                </div>
              </form>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              className="bg-dark-800/60 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-14 h-14 bg-primary-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-sm text-dark-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-white">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-2xl font-bold text-primary-400">{formatPrice(order.total)}</span>
                </div>
              </div>

              <div className="bg-dark-700/50 rounded-xl p-5">
                <h3 className="font-semibold text-white mb-3">Shipping Address</h3>
                <div className="text-sm text-dark-300 space-y-1">
                  <p className="font-medium text-white">{order.shipping.firstName} {order.shipping.lastName}</p>
                  <p>{order.shipping.address}</p>
                  <p>{order.shipping.city}, {order.shipping.postalCode}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Payment
