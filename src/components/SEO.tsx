import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

const SEO = ({
  title = 'LankaEVPlus - Powering the EV Revolution in Sri Lanka',
  description = 'Sri Lanka\'s leading EV charging solutions. Premium EV chargers, electric scooters, and a complete charging ecosystem for sustainable mobility.',
  keywords = 'EV chargers Sri Lanka, electric vehicle charging, EV ecosystem, electric scooters, charging stations, LankaEVPlus',
  image = '/og-image.jpg',
  url = 'https://lankaevplus.lk',
  type = 'website',
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title.includes('LankaEVPlus') ? title : `${title} | LankaEVPlus`

    // Update meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name'
      let element = document.querySelector(`meta[${attr}="${name}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attr, name)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // Basic meta tags
    updateMeta('description', description)
    updateMeta('keywords', keywords)

    // Open Graph tags
    updateMeta('og:title', title, true)
    updateMeta('og:description', description, true)
    updateMeta('og:image', image, true)
    updateMeta('og:url', url, true)
    updateMeta('og:type', type, true)
    updateMeta('og:site_name', 'LankaEVPlus', true)

    // Twitter Card tags
    updateMeta('twitter:card', 'summary_large_image')
    updateMeta('twitter:title', title)
    updateMeta('twitter:description', description)
    updateMeta('twitter:image', image)

    // Additional SEO tags
    updateMeta('robots', 'index, follow')
    updateMeta('author', 'LankaEVPlus')
    updateMeta('theme-color', '#00FF88')

    // Structured data for local business
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'LankaEVPlus',
      description: 'Sri Lanka\'s leading EV charging solutions provider',
      url: 'https://lankaevplus.lk',
      telephone: '+94-11-234-5678',
      email: 'info@lankaevplus.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Colombo',
        addressCountry: 'LK',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 6.9271,
        longitude: 79.8612,
      },
      sameAs: [
        'https://facebook.com/lankaevplus',
        'https://instagram.com/lankaevplus',
        'https://twitter.com/lankaevplus',
        'https://linkedin.com/company/lankaevplus',
      ],
      priceRange: '$$',
      openingHours: 'Mo-Su 00:00-24:00',
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      // Cleanup on unmount if needed
    }
  }, [title, description, keywords, image, url, type])

  return null
}

export default SEO
