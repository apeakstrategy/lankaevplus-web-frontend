import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { projectApi, Project } from '../api/projects'

const Gallery = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [systemTypes, setSystemTypes] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string>('All')
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [projectsData, typesData] = await Promise.all([
          projectApi.getAll(),
          projectApi.getSystemTypes(),
        ])
        setProjects(projectsData)
        setSystemTypes(['All', ...typesData])
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProjects = selectedType === 'All' 
    ? projects 
    : projects.filter(project => project.systemType === selectedType)

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    })
  }

  return (
    <>
      <SEO
        title="Project Gallery - EV Charging Installations"
        description="Explore our completed EV charging installations across Sri Lanka. See real examples of residential, commercial, and public charging stations."
        keywords="EV charging projects, charging station installations, Sri Lanka EV projects"
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-dark-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 10, repeat: Infinity }}
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
              Our Work
            </span>
            
            <h1 className="display-font text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
              PROJECT GALLERY
            </h1>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto">
              Explore our completed EV charging installations across Sri Lanka
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-dark-950">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          {/* Filter Tabs */}
          {systemTypes.length > 1 && (
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {systemTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-6 py-3 text-sm font-medium uppercase tracking-wider transition-all ${
                    selectedType === type
                      ? 'bg-primary-500 text-dark-950'
                      : 'bg-dark-800 text-dark-300 border border-white/10 hover:border-primary-500/50 hover:text-white'
                  }`}
                >
                  {type}
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
              <p className="mt-6 text-dark-400 font-medium uppercase tracking-wide text-sm">Loading projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-dark-800 border border-white/10 rounded-lg mb-6">
                <svg className="w-10 h-10 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No projects available yet</h3>
              <p className="text-dark-400 mb-6">Check back soon for updates!</p>
            </div>
          ) : (
            /* Projects Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="product-card h-full group">
                    {/* Image */}
                    <div 
                      className="h-56 bg-dark-800 relative cursor-pointer overflow-hidden"
                      onClick={() => project.imageUrl && setSelectedImage(project.imageUrl)}
                    >
                      {project.imageUrl ? (
                        <img 
                          src={project.imageUrl} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-16 h-16 text-dark-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Featured Badge */}
                      {project.isFeatured && (
                        <span className="absolute top-3 right-3 px-3 py-1 bg-amber-500 text-dark-950 text-xs font-semibold rounded-full flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Featured
                        </span>
                      )}

                      {/* Gallery images indicator */}
                      {project.galleryImages && project.galleryImages.length > 0 && (
                        <span className="absolute bottom-3 right-3 px-2 py-1 bg-dark-950/70 backdrop-blur-sm text-white text-xs rounded flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                          </svg>
                          +{project.galleryImages.length}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {project.systemType && (
                          <span className="px-2.5 py-1 bg-primary-500/10 text-primary-400 text-xs font-medium rounded border border-primary-500/20">
                            {project.systemType}
                          </span>
                        )}
                        {project.systemSize && (
                          <span className="px-2.5 py-1 bg-dark-700 text-dark-300 text-xs font-medium rounded">
                            {project.systemSize}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors line-clamp-1">
                        {project.title}
                      </h3>

                      {project.location && (
                        <div className="flex items-center gap-1 text-dark-400 text-sm mb-3">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {project.location}
                        </div>
                      )}

                      {project.description && (
                        <p className="text-dark-400 text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>
                      )}

                      {/* Features */}
                      {project.features && project.features.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.features.slice(0, 3).map((feature, i) => (
                            <span key={i} className="px-2 py-0.5 bg-dark-800 text-dark-400 text-xs rounded">
                              {feature}
                            </span>
                          ))}
                          {project.features.length > 3 && (
                            <span className="px-2 py-0.5 bg-dark-800 text-dark-500 text-xs rounded">
                              +{project.features.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        {project.completionDate && (
                          <span className="text-sm text-dark-500">
                            {formatDate(project.completionDate)}
                          </span>
                        )}
                        <Link 
                          to={`/gallery/${project.slug}`}
                          className="text-primary-400 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                        >
                          View Details
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <motion.div
            className="mt-20 bg-dark-900 border border-white/5 rounded-2xl p-8 sm:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Start Your EV Charging Project?
            </h3>
            <p className="text-dark-400 mb-6 max-w-lg mx-auto">
              Join hundreds of satisfied customers who have installed EV charging solutions with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/chargers"
                className="px-6 py-3 bg-primary-500 text-dark-950 font-semibold rounded-lg hover:bg-primary-400 transition-colors"
              >
                Shop Chargers
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 bg-dark-800 text-white font-semibold rounded-lg hover:bg-dark-700 transition-colors border border-white/10"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-dark-950/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Project"
              className="max-w-full max-h-full object-contain rounded-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            />
            <button
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Gallery
