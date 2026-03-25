import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { z } from 'zod'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import SEO from '../components/SEO'
import { useAuth } from '../contexts/AuthContext'
import { orderApi, type Order } from '../api/orders'

const accountSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  address: z.string().optional(),
})

type AccountFormData = z.infer<typeof accountSchema>

const statusColors: Record<string, 'success' | 'primary' | 'error' | 'warning'> = {
  PENDING: 'warning',
  CONFIRMED: 'primary',
  PROCESSING: 'primary',
  SHIPPED: 'primary',
  DELIVERED: 'success',
  CANCELLED: 'error',
}

const Account = () => {
  const navigate = useNavigate()
  const { user, updateUser, logout, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile')
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: user ? {
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      address: user.address || '',
    } : {},
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    const loadOrders = async () => {
      const email = user?.email || localStorage.getItem('customerEmail')
      if (!email) return
      
      setIsLoadingOrders(true)
      try {
        const userOrders = await orderApi.getByEmail(email)
        setOrders(userOrders)
      } catch (error) {
        console.error('Failed to load orders:', error)
      } finally {
        setIsLoadingOrders(false)
      }
    }
    
    if (activeTab === 'orders') {
      loadOrders()
    }
  }, [activeTab, user?.email])

  const onSubmit = (data: AccountFormData) => {
    updateUser(data)
    alert('Profile updated successfully!')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <>
      <SEO
        title="My Account"
        description="Manage your account, view orders, and update your information"
        keywords="account, profile, orders"
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
            <div className="w-20 h-20 bg-primary-500/10 backdrop-blur-sm border border-primary-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-primary-400 font-bold">{user.name?.charAt(0).toUpperCase()}</span>
            </div>
            <h1 className="display-font text-4xl sm:text-5xl lg:text-6xl text-white mb-2">
              WELCOME, {user.name?.split(' ')[0].toUpperCase()}
            </h1>
            <p className="text-lg text-dark-300">{user.email}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-dark-950">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          {/* Tabs */}
          <motion.div
            className="flex gap-2 mb-8 p-1 bg-dark-800 border border-white/10 rounded-xl w-fit mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'profile'
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-dark-300 hover:text-white'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === 'orders'
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-dark-300 hover:text-white'
              }`}
            >
              Orders
              {orders.length > 0 && (
                <span className="bg-primary-400 text-dark-950 text-xs px-2 py-0.5 rounded-full">{orders.length}</span>
              )}
            </button>
          </motion.div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-dark-800/60 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    <Input
                      type="text"
                      label="Full Name"
                      {...register('name')}
                      error={errors.name?.message}
                      required
                    />

                    <Input
                      type="email"
                      label="Email"
                      {...register('email')}
                      error={errors.email?.message}
                      required
                      disabled
                    />

                    <Input
                      type="tel"
                      label="Phone Number"
                      {...register('phone')}
                      error={errors.phone?.message}
                    />

                    <Input
                      type="text"
                      label="Address"
                      {...register('address')}
                      error={errors.address?.message}
                    />

                    <Button type="submit" variant="primary" size="lg" className="w-full">
                      Update Profile
                    </Button>
                  </form>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="bg-dark-800/60 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => navigate('/chargers')}
                      className="w-full flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-primary-500/50 hover:bg-primary-500/10 transition-all group"
                    >
                      <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <span className="font-medium text-white">Continue Shopping</span>
                    </button>
                    
                    <button
                      onClick={() => navigate('/cart')}
                      className="w-full flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-primary-500/50 hover:bg-primary-500/10 transition-all group"
                    >
                      <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <span className="font-medium text-white">View Cart</span>
                    </button>

                    <button
                      onClick={() => navigate('/track-order')}
                      className="w-full flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-primary-500/50 hover:bg-primary-500/10 transition-all group"
                    >
                      <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      </div>
                      <span className="font-medium text-white">Track Order</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        logout()
                        navigate('/')
                      }}
                      className="w-full flex items-center gap-3 p-4 rounded-xl border border-red-500/30 hover:border-red-500/50 hover:bg-red-500/10 transition-all group"
                    >
                      <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center text-red-400 group-hover:bg-red-500 group-hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <span className="font-medium text-red-400">Logout</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {isLoadingOrders ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-dark-800/60 backdrop-blur-sm rounded-2xl border border-white/10 p-12 text-center">
                  <div className="w-20 h-20 bg-dark-700 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No orders yet</h3>
                  <p className="text-dark-400 mb-6">You haven't placed any orders yet.</p>
                  <Link to="/chargers">
                    <Button variant="primary">Start Shopping</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-dark-800/60 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-primary-500/30 transition-all cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-xl font-bold text-white">
                              {order.orderNumber}
                            </h3>
                            <Badge variant={statusColors[order.status] || 'primary'}>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-dark-400 text-sm">
                            {formatDate(order.createdAt)}
                          </p>
                          <p className="text-dark-300 text-sm mt-1">
                            {order.items.length} {order.items.length === 1 ? 'item' : 'items'} • <span className="font-semibold text-primary-400">{formatPrice(order.totalAmount)}</span>
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation()
                              setSelectedOrder(order)
                            }}
                          >
                            View Details
                          </Button>
                          <Link to={`/track-order`} onClick={(e) => e.stopPropagation()}>
                            <Button variant="primary">
                              Track
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-dark-800 rounded-2xl border border-white/10 p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedOrder.orderNumber}</h2>
                <p className="text-dark-400 mt-1">{formatDate(selectedOrder.createdAt)}</p>
              </div>
              <Badge variant={statusColors[selectedOrder.status] || 'primary'} className="text-sm">
                {selectedOrder.status}
              </Badge>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h3 className="font-bold text-white mb-3">Order Items</h3>
              <div className="bg-dark-700/50 rounded-xl divide-y divide-white/10">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      {item.product?.imageUrl ? (
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product?.name} 
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-primary-500/10 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-white">{item.product?.name || 'Product'}</p>
                        <p className="text-sm text-dark-400">
                          {formatPrice(item.price)} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-white">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <div className="mb-6 grid md:grid-cols-2 gap-6">
              <div className="bg-dark-700/50 rounded-xl p-4">
                <h3 className="font-bold text-white mb-2">Shipping Address</h3>
                <p className="text-dark-300 text-sm">
                  {selectedOrder.customerName}<br />
                  {selectedOrder.customerEmail}<br />
                  {selectedOrder.customerPhone && <>{selectedOrder.customerPhone}<br /></>}
                  {selectedOrder.customerAddress}
                </p>
              </div>
              {selectedOrder.notes && (
                <div className="bg-dark-700/50 rounded-xl p-4">
                  <h3 className="font-bold text-white mb-2">Order Notes</h3>
                  <p className="text-dark-300 text-sm">{selectedOrder.notes}</p>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="border-t border-white/10 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-primary-400">{formatPrice(selectedOrder.totalAmount)}</span>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                Close
              </Button>
              <Link to="/track-order">
                <Button variant="primary">
                  Track Order
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default Account
