import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { blogApi, Blog as BlogType } from '../api/blogs'

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [blogsData, categoriesData] = await Promise.all([
          blogApi.getAll(),
          blogApi.getCategories(),
        ])
        setBlogs(blogsData)
        setCategories(['All', ...categoriesData])
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredBlogs = selectedCategory === 'All' 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory)

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  return (
    <>
      <SEO
        title="Blog - EV Charging News & Tips"
        description="Stay informed about EV charging, electric vehicles, industry news, and helpful tips for Sri Lankan EV owners."
        keywords="EV blog, EV charging tips, electric vehicle news, Sri Lanka EV"
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-dark-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
          <motion.div
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-400 mb-4 block">
              Latest Articles
            </span>
            
            <h1 className="display-font text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
              BLOG
            </h1>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto">
              Stay informed about EV charging, electric vehicles, and the sustainable mobility revolution in Sri Lanka.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-dark-950">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          {/* Category Filter */}
          {categories.length > 1 && (
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 text-sm font-medium uppercase tracking-wider transition-all ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-dark-950'
                      : 'bg-dark-800 text-dark-300 border border-white/10 hover:border-primary-500/50 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-2 border-dark-700 rounded-full"></div>
                <div className="absolute inset-0 w-16 h-16 border-2 border-primary-500 rounded-full animate-spin border-t-transparent"></div>
              </div>
              <p className="mt-6 text-dark-400 font-medium uppercase tracking-wide text-sm">Loading posts...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-dark-800 border border-white/10 rounded-lg mb-6">
                <svg className="w-10 h-10 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No blog posts available yet</h3>
              <p className="text-dark-400 mb-6">Check back soon for updates!</p>
            </div>
          ) : (
            /* Blog Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`} className="block group">
                    <div className="product-card h-full">
                      {/* Image */}
                      <div className="h-48 bg-dark-800 overflow-hidden">
                        {post.imageUrl ? (
                          <img 
                            src={post.imageUrl} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-16 h-16 text-dark-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          {post.category && (
                            <span className="px-3 py-1 bg-primary-500/10 text-primary-400 text-xs font-semibold rounded-full border border-primary-500/20">
                              {post.category}
                            </span>
                          )}
                          <span className="text-xs text-dark-500">{getReadTime(post.content)}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        
                        {post.excerpt && (
                          <p className="text-dark-400 text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <span className="text-sm text-dark-500">
                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                          <span className="text-primary-400 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read more
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}

          {/* Newsletter CTA */}
          <motion.div
            className="mt-20 bg-dark-900 border border-white/5 rounded-2xl p-8 sm:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-dark-400 mb-6 max-w-lg mx-auto">
              Get the latest EV news, charging tips, and exclusive offers delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 bg-dark-800 border border-white/10 text-white rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-500 text-dark-950 font-semibold rounded-lg hover:bg-primary-400 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Blog
