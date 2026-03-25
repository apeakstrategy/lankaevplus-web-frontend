import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { z } from 'zod'
import SEO from '../components/SEO'
import { useAuth } from '../contexts/AuthContext'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').optional().or(z.literal('')),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

const Register = () => {
  const navigate = useNavigate()
  const { register: registerUser } = useAuth()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError('')
    
    const success = await registerUser(
      data.name,
      data.email,
      data.password,
      data.phone || undefined
    )
    
    if (success) {
      navigate('/account')
    } else {
      setError('Email already exists. Please login instead.')
    }
    
    setIsLoading(false)
  }

  return (
    <>
      <SEO
        title="Create Account - LankaEVPlus"
        description="Create a new LankaEVPlus account to manage your orders and join the EV revolution."
        keywords="register, sign up, account, EV charging, LankaEVPlus"
      />
      
      {/* Full Screen Register */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-950 py-20">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[100px]"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 212, 170, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 170, 0.03) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-md mx-auto px-6">
          {/* Logo */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="inline-flex items-center justify-center mb-8 w-full">
              <img 
                src="/LankaEvPluslogo.png" 
                alt="LankaEVPlus Logo" 
                className="h-24 sm:h-32 w-auto object-contain drop-shadow-lg"
              />
            </Link>
          </motion.div>

          {/* Register Card */}
          <motion.div
            className="bg-dark-800/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
              <p className="text-dark-400">Join the EV revolution in Sri Lanka</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {error && (
                <motion.div 
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  {...register('name')}
                  className="input-field"
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  {...register('email')}
                  className="input-field"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Phone Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="+94 XX XXX XXXX"
                  {...register('phone')}
                  className="input-field"
                  autoComplete="tel"
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-400">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  {...register('password')}
                  className="input-field"
                  autoComplete="new-password"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-400">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  {...register('confirmPassword')}
                  className="input-field"
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-400">{errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>

              <div className="text-center pt-4">
                <p className="text-sm text-dark-400">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary-500 font-semibold hover:text-primary-400 transition-colors">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>

          {/* Back to home link */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/" className="text-dark-500 hover:text-primary-500 transition-colors text-sm">
              ← Back to Home
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Register
