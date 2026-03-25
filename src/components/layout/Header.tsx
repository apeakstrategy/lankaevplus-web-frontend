import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const { getTotalItems } = useCart()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const mainNavLinks = [
    { path: '/chargers', label: 'Chargers', icon: '⚡' },
    { path: '/scooters', label: 'Scooters', icon: '🛵' },
    { path: '/ecosystem', label: 'Ecosystem', icon: '🌐' },
    { path: '/stations', label: 'Stations', icon: '📍' },
  ]

  const secondaryNavLinks = [
    { path: '/blog', label: 'Blog', icon: '📰' },
    { path: '/gallery', label: 'Gallery', icon: '🖼️' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/support', label: 'Support', icon: '💬' },
    { path: '/contact', label: 'Contact Us', icon: '📞' },
  ]

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-2 sm:py-3 bg-dark-950/95 backdrop-blur-2xl border-b border-white/[0.08] shadow-lg shadow-black/10' 
          : 'py-3 sm:py-5 bg-transparent'
      }`} 
      role="banner"
    >
      <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 sm:gap-3 group relative z-10"
            aria-label="LankaEVPlus - Home"
          >
            <motion.div 
              className="relative flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <img 
                src="/LankaEvPluslogo.png" 
                alt="LankaEVPlus Logo" 
                className={`h-20 sm:h-24 w-auto object-contain transition-all duration-300 ${
                  scrolled ? 'drop-shadow-lg' : 'drop-shadow-xl'
                }`}
              />
            </motion.div>
          </Link>
          
          {/* Center Navigation - Desktop Only */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-8 xl:px-12">
            <div className="flex items-center gap-1 bg-white/[0.03] backdrop-blur-sm rounded-full px-2 py-1.5 border border-white/[0.06]">
              {mainNavLinks.map((link) => {
                const isActive = location.pathname === link.path || 
                  location.pathname.startsWith(link.path + '/')
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 xl:px-5 py-2.5 text-[13px] font-medium tracking-wide whitespace-nowrap transition-all duration-300 rounded-full ${
                      isActive 
                        ? 'text-dark-950 bg-primary-400' 
                        : 'text-dark-300 hover:text-white hover:bg-white/[0.06]'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                )
              })}
              
              {/* Divider */}
              <div className="w-px h-5 bg-white/10 mx-1" />
              
              {secondaryNavLinks.map((link) => {
                const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/')
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3 xl:px-4 py-2.5 text-[13px] font-medium tracking-wide whitespace-nowrap transition-all duration-300 rounded-full ${
                      isActive 
                        ? 'text-white' 
                        : 'text-dark-400 hover:text-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 sm:p-3 text-dark-400 hover:text-white transition-all duration-200 hover:bg-white/[0.05] rounded-lg sm:rounded-xl"
              aria-label="Shopping cart"
            >
              <svg className="w-5 h-5 sm:w-[22px] sm:h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {getTotalItems() > 0 && (
                <motion.span 
                  className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 min-w-[16px] sm:min-w-[18px] h-[16px] sm:h-[18px] px-1 bg-primary-500 text-dark-950 text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                >
                  {getTotalItems()}
                </motion.span>
              )}
            </Link>

            {/* User Menu / Sign In */}
            <div className="relative">
              {isAuthenticated ? (
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1.5 sm:p-2 hover:bg-white/[0.05] rounded-lg sm:rounded-xl transition-all duration-200"
                  aria-label="User menu"
                  aria-expanded={showUserMenu}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary-400 to-primary-600 text-dark-950 rounded-lg flex items-center justify-center font-semibold text-xs sm:text-sm">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-[12px] sm:text-[13px] font-medium text-dark-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
              )}

              {/* User Dropdown */}
              <AnimatePresence>
                {showUserMenu && isAuthenticated && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                    <motion.div
                      className="absolute right-0 mt-3 w-48 sm:w-56 bg-dark-900/95 backdrop-blur-2xl border border-white/10 rounded-xl sm:rounded-2xl py-2 z-50 shadow-2xl shadow-black/40"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-white/10">
                        <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                        <p className="text-xs text-dark-400 truncate">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/account"
                          className="flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-dark-300 hover:bg-white/5 hover:text-white transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          My Account
                        </Link>
                        <Link
                          to="/track-order"
                          className="flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-dark-300 hover:bg-white/5 hover:text-white transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Track Order
                        </Link>
                      </div>
                      <div className="border-t border-white/10 pt-1">
                        <button
                          onClick={() => { logout(); setShowUserMenu(false); navigate('/'); }}
                          className="flex items-center gap-3 w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Primary CTA - Desktop */}
            <motion.div
              className="hidden md:block"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/chargers"
                className="flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 bg-primary-500 text-dark-950 font-semibold text-[12px] lg:text-[13px] rounded-lg lg:rounded-xl hover:bg-primary-400 transition-all duration-300 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
                </svg>
                <span className="hidden lg:inline">Get Started</span>
                <span className="lg:hidden">Start</span>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 sm:p-3 text-dark-400 hover:text-white hover:bg-white/[0.05] rounded-lg sm:rounded-xl transition-all duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>

    {/* Mobile Menu - Full Screen Scrollable */}
    <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="lg:hidden fixed inset-0 top-[96px] sm:top-[112px] bg-dark-950/98 backdrop-blur-2xl z-40 overflow-y-auto border-t border-white/5"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="min-h-full px-4 sm:px-6 py-6 pb-24">
                {/* Main Navigation */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-3 px-2">Products</p>
                  <div className="space-y-1">
                    {mainNavLinks.map((link, index) => {
                      const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/')
                      return (
                        <motion.div
                          key={link.path}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            to={link.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-4 text-base font-medium transition-colors rounded-xl ${
                              isActive 
                                ? 'text-primary-400 bg-primary-500/10 border border-primary-500/20' 
                                : 'text-dark-200 hover:text-white hover:bg-white/5 active:bg-white/10'
                            }`}
                          >
                            <span className="text-lg">{link.icon}</span>
                            {link.label}
                            <svg className="w-4 h-4 ml-auto text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* Secondary Navigation */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-3 px-2">More</p>
                  <div className="space-y-1">
                    {secondaryNavLinks.map((link, index) => {
                      const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/')
                      return (
                        <motion.div
                          key={link.path}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index + mainNavLinks.length) * 0.05 }}
                        >
                          <Link
                            to={link.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-4 text-base font-medium transition-colors rounded-xl ${
                              isActive 
                                ? 'text-primary-400 bg-primary-500/10 border border-primary-500/20' 
                                : 'text-dark-200 hover:text-white hover:bg-white/5 active:bg-white/10'
                            }`}
                          >
                            <span className="text-lg">{link.icon}</span>
                            {link.label}
                            <svg className="w-4 h-4 ml-auto text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* Account Section */}
                <div className="mb-6 border-t border-white/5 pt-6">
                  <p className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-3 px-2">Account</p>
                  <div className="space-y-1">
                    {isAuthenticated ? (
                      <>
                        <Link
                          to="/account"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-4 text-base font-medium text-dark-200 hover:text-white hover:bg-white/5 rounded-xl"
                        >
                          <span className="text-lg">👤</span>
                          My Account
                        </Link>
                        <Link
                          to="/track-order"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-4 text-base font-medium text-dark-200 hover:text-white hover:bg-white/5 rounded-xl"
                        >
                          <span className="text-lg">📦</span>
                          Track Order
                        </Link>
                        <button
                          onClick={() => { logout(); setMobileMenuOpen(false); navigate('/'); }}
                          className="flex items-center gap-3 w-full px-4 py-4 text-base font-medium text-red-400 hover:bg-red-500/10 rounded-xl"
                        >
                          <span className="text-lg">🚪</span>
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-4 text-base font-medium text-dark-200 hover:text-white hover:bg-white/5 rounded-xl"
                      >
                        <span className="text-lg">🔐</span>
                        Sign In
                      </Link>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-auto pt-4"
                >
                  <Link
                    to="/chargers"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-primary-500 text-dark-950 font-semibold text-base rounded-xl shadow-lg shadow-primary-500/20"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
                    </svg>
                    Get Started
                  </Link>
                </motion.div>

                {/* Contact Info */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="flex items-center justify-center gap-6">
                    <a href="tel:+94112345678" className="text-dark-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </a>
                    <a href="https://wa.me/94704323306" className="text-dark-400 hover:text-primary-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </a>
                    <a href="mailto:info@lankaevplus.com" className="text-dark-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </>
  )
}

export default Header
