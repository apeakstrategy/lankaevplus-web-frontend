import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { z } from 'zod'
import Input from '../components/ui/Input'
import TextArea from '../components/ui/TextArea'
import Button from '../components/ui/Button'
import SEO from '../components/SEO'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { orderApi } from '../api/orders'

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(10, 'Please enter your complete address'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().min(5, 'Postal code is required'),
  paymentMethod: z.enum(['card', 'cod'] as const),
  notes: z.string().optional(),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

const Checkout = () => {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: user ? {
      firstName: user.name?.split(' ')[0] || '',
      lastName: user.name?.split(' ').slice(1).join(' ') || '',
      email: user.email,
      phone: user.phone || '',
      address: user.address || '',
    } : {},
  })

  const paymentMethod = watch('paymentMethod')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      const order = await orderApi.create({
        customerName: `${data.firstName} ${data.lastName}`,
        customerEmail: data.email,
        customerPhone: data.phone,
        customerAddress: `${data.address}, ${data.city}, ${data.postalCode}`,
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        notes: data.notes,
      })
      
      localStorage.setItem('currentOrder', JSON.stringify({
        ...order,
        paymentMethod: data.paymentMethod,
      }))
      
      localStorage.setItem('customerEmail', data.email)
      
      clearCart()
      
      if (data.paymentMethod === 'card') {
        navigate('/payment', { state: { orderId: order.id, orderNumber: order.orderNumber } })
      } else {
        navigate('/order-success', { state: { orderId: order.id, orderNumber: order.orderNumber } })
      }
    } catch (err: unknown) {
      console.error('Failed to create order:', err)
      const errorMessage = err && typeof err === 'object' && 'response' in err 
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Failed to create order. Please try again.'
      setError(errorMessage || 'Failed to create order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-950">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
          </div>
          <div className="relative z-10 max-w-md mx-auto text-center px-6">
            <div className="w-20 h-20 bg-dark-800 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h1>
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
        title="Checkout"
        description="Complete your order and choose your payment method"
        keywords="checkout, order, payment"
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
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary-500 font-bold text-sm">2</div>
                <span className="text-white font-medium text-sm hidden sm:block">Checkout</span>
              </div>
              <div className="w-8 border-t border-white/30" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white/70 font-bold text-sm">3</div>
                <span className="text-white/70 text-sm hidden sm:block">Complete</span>
              </div>
            </div>
            
            <h1 className="display-font text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
              CHECKOUT
            </h1>
            {!isAuthenticated && (
              <p className="text-lg text-dark-300">
                Checkout as guest or <Link to="/login" className="text-primary-400 underline font-semibold hover:text-primary-300">login</Link> to your account
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-dark-950">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          {error && (
            <motion.div 
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <motion.div
                className="bg-dark-800/60 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white">Shipping Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    type="text"
                    label="First Name"
                    {...register('firstName')}
                    error={errors.firstName?.message}
                    required
                  />
                  
                  <Input
                    type="text"
                    label="Last Name"
                    {...register('lastName')}
                    error={errors.lastName?.message}
                    required
                  />
                </div>

                <div className="mt-5">
                  <Input
                    type="email"
                    label="Email"
                    {...register('email')}
                    error={errors.email?.message}
                    required
                  />
                </div>

                <div className="mt-5">
                  <Input
                    type="tel"
                    label="Phone Number"
                    {...register('phone')}
                    error={errors.phone?.message}
                    required
                  />
                </div>

                <div className="mt-5">
                  <TextArea
                    label="Address"
                    rows={3}
                    {...register('address')}
                    error={errors.address?.message}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                  <Input
                    type="text"
                    label="City"
                    {...register('city')}
                    error={errors.city?.message}
                    required
                  />
                  
                  <Input
                    type="text"
                    label="Postal Code"
                    {...register('postalCode')}
                    error={errors.postalCode?.message}
                    required
                  />
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                className="bg-dark-800/60 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white">Payment Method</h2>
                </div>
                
                <div className="space-y-4">
                  <label className={`flex items-center p-5 rounded-xl cursor-pointer transition-all border-2 ${
                    paymentMethod === 'card' ? 'border-primary-500 bg-primary-500/10' : 'border-white/10 hover:border-white/20'
                  }`}>
                    <input
                      type="radio"
                      value="card"
                      {...register('paymentMethod')}
                      className="w-5 h-5 text-primary-500 focus:ring-primary-500"
                    />
                    <div className="ml-4 flex-grow">
                      <div className="font-semibold text-white">Credit/Debit Card</div>
                      <div className="text-sm text-dark-400">Pay securely with your card (coming soon)</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                      <div className="w-10 h-6 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                    </div>
                  </label>

                  <label className={`flex items-center p-5 rounded-xl cursor-pointer transition-all border-2 ${
                    paymentMethod === 'cod' ? 'border-primary-500 bg-primary-500/10' : 'border-white/10 hover:border-white/20'
                  }`}>
                    <input
                      type="radio"
                      value="cod"
                      {...register('paymentMethod')}
                      className="w-5 h-5 text-primary-500 focus:ring-primary-500"
                    />
                    <div className="ml-4 flex-grow">
                      <div className="font-semibold text-white">Cash on Delivery</div>
                      <div className="text-sm text-dark-400">Pay when you receive your order</div>
                    </div>
                    <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                      <span className="text-lg">💵</span>
                    </div>
                  </label>
                </div>
                
                {errors.paymentMethod && (
                  <p className="mt-3 text-sm text-red-400">{errors.paymentMethod.message}</p>
                )}
              </motion.div>

              {/* Order Notes */}
              <motion.div
                className="bg-dark-800/60 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <TextArea
                  label="Order Notes (Optional)"
                  rows={4}
                  placeholder="Any special instructions for your order..."
                  {...register('notes')}
                  error={errors.notes?.message}
                />
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-dark-800/60 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 bg-dark-700 rounded-lg overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900">
                            <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{item.name}</p>
                        <p className="text-sm text-dark-400">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold text-primary-400">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-dark-300">
                    <span>Subtotal</span>
                    <span className="font-medium text-white">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-dark-300">
                    <span>Shipping</span>
                    <span className="text-primary-400 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-white/10">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-2xl font-bold text-primary-400">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : paymentMethod === 'cod' ? (
                    'Place Order'
                  ) : (
                    'Proceed to Payment'
                  )}
                </Button>

                {/* Trust badges */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-3">
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
          </form>
        </div>
      </section>
    </>
  )
}

export default Checkout
