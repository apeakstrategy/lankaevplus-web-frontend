import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Section from '../components/ui/Section'
import SEO from '../components/SEO'
import { projectApi, Project } from '../api/projects'
import { APP_NAME, SITE_URL } from '../lib/constants'

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return

      try {
        setLoading(true)
        const data = await projectApi.getBySlug(slug)
        setProject(data)
      } catch (err) {
        console.error('Failed to fetch project:', err)
        setError('Project not found')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [slug])

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
        <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
        <Link 
          to="/gallery" 
          className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
        >
          Back to Gallery
        </Link>
      </div>
    )
  }

  const allImages = [project.imageUrl, ...(project.galleryImages || [])].filter(Boolean) as string[]

  return (
    <>
      <SEO
        title={project.title}
        description={project.description || `${project.systemSize} ${project.systemType} solar installation in ${project.location}`}
        keywords={`solar project, ${project.systemType}, ${project.location}, solar installation`}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: project.title,
          description: project.description,
          serviceType: project.systemType || 'Solar installation',
          provider: {
            '@type': 'Organization',
            name: APP_NAME,
            url: SITE_URL,
          },
          areaServed: project.location,
        }}
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient">
          <div className="absolute inset-0 mesh-bg opacity-50" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-20" preserveAspectRatio="none">
            <path d="M0,120 L0,60 Q360,0 720,60 T1440,60 L1440,120 Z" fill="rgb(249 250 251)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/70 text-sm mb-6">
              <Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link>
              <span>/</span>
              {project.systemType && (
                <>
                  <span>{project.systemType}</span>
                  <span>/</span>
                </>
              )}
              <span className="text-white/90 truncate">{project.title}</span>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {project.isFeatured && (
                <span className="px-3 py-1 bg-solar-500 text-white text-sm font-medium rounded-full flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Featured
                </span>
              )}
              {project.systemType && (
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                  {project.systemType}
                </span>
              )}
              {project.systemSize && (
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                  {project.systemSize}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white mb-4">
              {project.title}
            </h1>
            
            {project.location && (
              <div className="flex items-center gap-2 text-white/80 text-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {project.location}
                {project.completionDate && (
                  <>
                    <span className="mx-2">•</span>
                    <span>Completed {formatDate(project.completionDate)}</span>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Image Gallery */}
          {allImages.length > 0 && (
            <motion.div
              className="mb-12 -mt-20 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Main Image */}
              <div 
                className="aspect-video rounded-2xl overflow-hidden shadow-xl cursor-pointer"
                onClick={() => setSelectedImage(allImages[0])}
              >
                <img 
                  src={allImages[0]} 
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Gallery Thumbnails */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4">
                  {allImages.slice(1).map((img, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedImage(img)}
                    >
                      <img 
                        src={img} 
                        alt={`${project.title} - ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              {project.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="prose prose-lg max-w-none prose-green"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Project</h2>
                  <p className="text-gray-600 leading-relaxed">{project.description}</p>
                </motion.div>
              )}

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Highlights</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Testimonial */}
              {project.testimonial && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-700 text-lg italic mb-4">"{project.testimonial}"</p>
                      {project.testimonialAuthor && (
                        <p className="text-green-700 font-semibold">— {project.testimonialAuthor}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                className="sticky top-24 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Project Details Card */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Project Details</h3>
                  <div className="space-y-4">
                    {project.systemSize && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">System Size</span>
                        <span className="font-semibold text-gray-900">{project.systemSize}</span>
                      </div>
                    )}
                    {project.systemType && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Type</span>
                        <span className="font-semibold text-gray-900">{project.systemType}</span>
                      </div>
                    )}
                    {project.location && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Location</span>
                        <span className="font-semibold text-gray-900">{project.location}</span>
                      </div>
                    )}
                    {project.completionDate && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Completed</span>
                        <span className="font-semibold text-gray-900">{formatDate(project.completionDate)}</span>
                      </div>
                    )}
                    {project.clientName && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Client</span>
                        <span className="font-semibold text-gray-900">{project.clientName}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-2">Interested in a Similar Project?</h3>
                  <p className="text-white/80 text-sm mb-4">Get a free quote for your solar installation today.</p>
                  <Link
                    to="/contact"
                    className="block w-full py-3 bg-white text-green-600 font-semibold rounded-xl text-center hover:bg-green-50 transition-colors"
                  >
                    Get Free Quote
                  </Link>
                </div>

                {/* Back Link */}
                <Link 
                  to="/gallery"
                  className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  Back to Gallery
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
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

export default ProjectDetail
