import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { z } from 'zod'
import SEO from '../components/SEO'
import { useAuth } from '../contexts/AuthContext'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError('')
    
    const success = await login(data.email, data.password)
    
    if (success) {
      navigate('/account')
    } else {
      setError('Invalid email or password')
    }
    
    setIsLoading(false)
  }

  return (
    <>
      <SEO
        title="Login - LankaEVPlus"
        description="Login to your LankaEVPlus account to manage your orders and preferences."
        keywords="login, account, EV charging, LankaEVPlus"
      />
      
      {/* Full Screen Login */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-950">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
          <motion.div
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[100px]"
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

        <div className="relative z-10 w-full max-w-md mx-auto px-6 mt-32 mb-16">
          {/* Logo */}
          {/* <motion.div
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
          </motion.div> */}

          {/* Login Card */}
          <motion.div
            className="bg-dark-800/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-dark-400">Sign in to your account to continue</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
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
                <label className="block text-sm font-medium text-dark-300 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  {...register('password')}
                  className="input-field"
                  autoComplete="current-password"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-400">{errors.password.message}</p>
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
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Sign In
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="text-sm text-dark-400">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary-500 font-semibold hover:text-primary-400 transition-colors">
                    Create Account
                  </Link>
                </p>
              </div>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-dark-800/60 px-4 text-sm text-dark-500">or</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-dark-500">
                  Continue as a guest during checkout
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

export default Login
