import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Section from '../components/ui/Section'
import SEO from '../components/SEO'
import { blogApi, Blog } from '../api/blogs'
import { APP_NAME } from '../lib/constants'

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return

      try {
        setLoading(true)
        const data = await blogApi.getBySlug(slug)
        setBlog(data)
      } catch (err) {
        console.error('Failed to fetch blog:', err)
        setError('Blog post not found')
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [slug])

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
        <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
        <Link 
          to="/blog" 
          className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <>
      <SEO
        title={blog.title}
        description={blog.excerpt || blog.title}
        keywords={`solar blog, ${blog.category || ''}, ${blog.tags?.join(', ') || ''}`}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: blog.title,
          description: blog.excerpt || blog.title,
          image: blog.imageUrl,
          datePublished: blog.publishedAt || blog.createdAt,
          dateModified: blog.updatedAt || blog.createdAt,
          author: blog.author
            ? {
                '@type': 'Person',
                name:
                  blog.author.firstName && blog.author.lastName
                    ? `${blog.author.firstName} ${blog.author.lastName}`
                    : blog.author.email,
              }
            : {
                '@type': 'Organization',
                name: APP_NAME,
              },
        }}
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient">
          <div className="absolute inset-0 mesh-bg opacity-50" />
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 bg-green-400/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-20" preserveAspectRatio="none">
            <path d="M0,120 L0,60 Q360,0 720,60 T1440,60 L1440,120 Z" fill="rgb(249 250 251)" />
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/70 text-sm mb-6">
              <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span>/</span>
              {blog.category && (
                <>
                  <span>{blog.category}</span>
                  <span>/</span>
                </>
              )}
              <span className="text-white/90 truncate">{blog.title}</span>
            </div>
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {blog.category && (
                <span className="px-4 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                  {blog.category}
                </span>
              )}
              <span className="text-white/70 text-sm">
                {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span className="text-white/70 text-sm">•</span>
              <span className="text-white/70 text-sm">{getReadTime(blog.content)}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white mb-4">
              {blog.title}
            </h1>
            
            {blog.excerpt && (
              <p className="text-lg text-white/80 max-w-3xl">
                {blog.excerpt}
              </p>
            )}
            
            {/* Author */}
            {blog.author && (
              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold">
                  {(blog.author.firstName?.[0] || blog.author.email[0]).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-medium">
                    {blog.author.firstName && blog.author.lastName 
                      ? `${blog.author.firstName} ${blog.author.lastName}`
                      : blog.author.email}
                  </p>
                  <p className="text-white/60 text-sm">Author</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          {blog.imageUrl && (
            <motion.div
              className="mb-12 -mt-20 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src={blog.imageUrl} 
                alt={blog.title}
                className="w-full h-64 sm:h-96 object-cover rounded-2xl shadow-xl"
              />
            </motion.div>
          )}

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-2 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {blog.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Content */}
          <motion.article
            className="prose prose-lg max-w-none prose-green prose-headings:font-display prose-headings:font-bold prose-a:text-green-600 prose-img:rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Back to Blog */}
          <motion.div
            className="mt-12 pt-8 border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Blog
            </Link>
          </motion.div>
        </div>
      </Section>
    </>
  )
}

export default BlogDetail
