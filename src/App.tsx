import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/ui/WhatsAppButton'
import ScrollToTop from './components/ScrollToTop'
import PageTracker from './components/PageTracker'
import SEO from './components/SEO'

// Lazy load routes for better performance
const Home = lazy(() => import('./routes/Home'))
const About = lazy(() => import('./routes/About'))
const Chargers = lazy(() => import('./routes/Chargers'))
const Scooters = lazy(() => import('./routes/Scooters'))
const Ecosystem = lazy(() => import('./routes/Ecosystem'))
const Stations = lazy(() => import('./routes/Stations'))
const Support = lazy(() => import('./routes/Support'))
const Blog = lazy(() => import('./routes/Blog'))
const BlogDetail = lazy(() => import('./routes/BlogDetail'))
const Gallery = lazy(() => import('./routes/Gallery'))
const ProjectDetail = lazy(() => import('./routes/ProjectDetail'))
const Contact = lazy(() => import('./routes/Contact'))
const ProductDetail = lazy(() => import('./routes/ProductDetail'))
const Cart = lazy(() => import('./routes/Cart'))
const Checkout = lazy(() => import('./routes/Checkout'))
const Payment = lazy(() => import('./routes/Payment'))
const OrderSuccess = lazy(() => import('./routes/OrderSuccess'))
const Login = lazy(() => import('./routes/Login'))
const Register = lazy(() => import('./routes/Register'))
const Account = lazy(() => import('./routes/Account'))
const TrackOrder = lazy(() => import('./routes/TrackOrder'))
const Privacy = lazy(() => import('./routes/Privacy'))
const Terms = lazy(() => import('./routes/Terms'))
const ReturnPolicy = lazy(() => import('./routes/ReturnPolicy'))
const ComingSoon = lazy(() => import('./routes/ComingSoon'))

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark-950" role="status" aria-live="polite">
    <div className="text-center">
      <div className="relative inline-block mb-6">
        <div className="w-16 h-16 border-2 border-dark-700 rounded-full"></div>
        <div className="absolute inset-0 w-16 h-16 border-2 border-primary-500 rounded-full animate-spin border-t-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
      <p className="text-dark-400 font-medium tracking-wide uppercase text-sm">Loading...</p>
    </div>
  </div>
)

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <PageTracker />
          <SEO />
          <ScrollToTop />
          <a 
            href="#main-content" 
            className="skip-to-main"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" tabIndex={-1}>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Main Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                
                {/* Products */}
                <Route path="/chargers" element={<Chargers />} />
                <Route path="/scooters" element={<Scooters />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                
                {/* Ecosystem & Stations */}
                <Route path="/ecosystem" element={<Ecosystem />} />
                <Route path="/stations" element={<Stations />} />
                
                {/* Support & Resources */}
                <Route path="/support" element={<Support />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Gallery / Projects */}
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/gallery/:slug" element={<ProjectDetail />} />
                
                {/* E-commerce Flow */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                
                {/* Authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/account" element={<Account />} />
                <Route path="/track-order" element={<TrackOrder />} />
                
                {/* Legal */}
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/returns" element={<ReturnPolicy />} />
                
                {/* Misc */}
                <Route path="/coming-soon" element={<ComingSoon />} />
                
                {/* Legacy redirects */}
                <Route path="/shop" element={<Navigate to="/chargers" replace />} />
                <Route path="/services" element={<Navigate to="/ecosystem" replace />} />
                <Route path="/calculator" element={<Navigate to="/chargers" replace />} />
                <Route path="/products" element={<Navigate to="/chargers" replace />} />
                
                {/* 404 - Redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <WhatsAppButton />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
