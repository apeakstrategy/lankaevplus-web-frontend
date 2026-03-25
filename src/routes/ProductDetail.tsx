import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import SEO from '../components/SEO'
import { productApi, type Product } from '../api/products'
import { useCart } from '../contexts/CartContext'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return
      
      try {
        setIsLoading(true)
        setError(null)
        const productData = await productApi.getById(id)
        setProduct(productData)
        
        // Load related products
        if (productData.category) {
          const allProducts = await productApi.getAll(productData.category)
          setRelatedProducts(allProducts.filter(p => p.id !== id).slice(0, 4))
        }
      } catch (err) {
        console.error('Failed to load product:', err)
        setError('Product not found')
      } finally {
        setIsLoading(false)
      }
    }
    
    loadProduct()
  }, [id])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = () => {
    if (!product) return
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description || '',
        image: product.imageUrl || '',
      })
    }
  }

  const handleBuyNow = () => {
    if (!product) return
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description || '',
        image: product.imageUrl || '',
      })
    }
    navigate('/checkout')
  }

  const getTagStyle = (tag: string) => {
    switch (tag) {
      case 'BEST_SELLER':
        return 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900'
      case 'NEW':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
      case 'LIMITED':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
      case 'SALE':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white'
      case 'PREMIUM':
        return 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white'
      case 'ECO_FRIENDLY':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
    }
  }

  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-dark-700 rounded-full animate-spin border-t-primary-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <p className="mt-4 text-dark-400 font-medium">Loading product...</p>
        </div>
      </section>
    )
  }

  if (error || !product) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
        </div>
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-dark-800 border border-white/10 rounded-full mb-6">
            <svg className="w-10 h-10 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
          <p className="text-dark-400 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/chargers">
            <Button variant="primary">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Shop
            </Button>
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <SEO
        title={product.name}
        description={product.description || `${product.name} - High quality solar product`}
        keywords={`${product.name}, solar products, ${product.category || 'solar'}`}
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
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link to="/" className="text-dark-400 hover:text-primary-400 transition-colors">Home</Link>
            <svg className="w-4 h-4 text-dark-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link to="/chargers" className="text-dark-400 hover:text-primary-400 transition-colors">Shop</Link>
            <svg className="w-4 h-4 text-dark-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white font-medium">{product.name}</span>
          </nav>
        </div>
      </section>
      
      <section className="py-8 sm:py-12 bg-dark-950">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="sticky top-32">
                <div className="bg-dark-800/60 backdrop-blur-sm rounded-3xl border border-white/10 p-4 overflow-hidden">
                  <div className="relative aspect-square bg-dark-900 rounded-2xl overflow-hidden">
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900">
                        <svg className="w-24 h-24 text-primary-500/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Discount Badge */}
                    {product.discountPercent && product.discountPercent > 0 && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-xl text-lg font-bold shadow-lg">
                          -{product.discountPercent}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.category && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-semibold bg-primary-500/10 text-primary-400 border border-primary-500/20">
                    {product.category}
                  </span>
                )}
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md shadow-primary-500/25">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    In Stock ({product.stock})
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-semibold bg-dark-700 text-dark-300">
                    Out of Stock
                  </span>
                )}
                {product.tags && product.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1.5 text-sm font-bold rounded-xl shadow-md ${getTagStyle(tag)}`}
                  >
                    {tag.replace('_', ' ')}
                  </span>
                ))}
              </div>

              {/* Name */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl display-font font-extrabold text-white mb-4">
                {product.name}
              </h1>

              {product.sku && (
                <p className="text-sm text-dark-400 mb-6">SKU: {product.sku}</p>
              )}

              {/* Price Section */}
              <div className="bg-dark-800/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
                <div className="flex items-end gap-4 mb-2">
                  <span className="text-4xl sm:text-5xl font-bold text-primary-400">
                    {formatPrice(product.price)}
                  </span>
                  {product.discountPercent && product.discountPercent > 0 && product.originalPrice && (
                    <span className="text-xl text-dark-500 line-through pb-1">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.discountPercent && product.discountPercent > 0 && product.originalPrice && (
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-primary-400 font-semibold text-lg">
                      🎉 You save {formatPrice(product.originalPrice - product.price)}!
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">Description</h3>
                <p className="text-dark-300 leading-relaxed font-body">
                  {product.description}
                </p>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4 mt-auto">
                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-white">Quantity:</span>
                  <div className="flex items-center border-2 border-white/10 rounded-xl overflow-hidden bg-dark-800">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 text-dark-300 hover:bg-dark-700 hover:text-white transition-colors disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="px-6 py-3 text-lg font-semibold text-white bg-dark-700">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-3 text-dark-300 hover:bg-dark-700 hover:text-white transition-colors disabled:opacity-50"
                      disabled={quantity >= product.stock}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    onClick={handleBuyNow}
                    disabled={product.stock <= 0}
                  >
                    Buy Now
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-500/10 rounded-xl mx-auto mb-2 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-white">Quality Guarantee</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-500/10 rounded-xl mx-auto mb-2 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-white">Fast Delivery</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-500/10 rounded-xl mx-auto mb-2 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-white">Secure Payment</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl sm:text-3xl display-font font-bold text-white">Related Products</h2>
                <Link to="/chargers" className="text-primary-400 font-semibold hover:text-primary-300 flex items-center gap-1">
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`} className="group">
                    <div className="product-card overflow-hidden transition-all duration-300 group-hover:-translate-y-1">
                      <div className="aspect-square bg-dark-800 overflow-hidden">
                        {relatedProduct.imageUrl ? (
                          <img 
                            src={relatedProduct.imageUrl} 
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900">
                            <svg className="w-12 h-12 text-primary-500/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-white mb-1 line-clamp-2 group-hover:text-primary-400 transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-primary-400 font-bold">
                          {formatPrice(relatedProduct.price)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default ProductDetail
