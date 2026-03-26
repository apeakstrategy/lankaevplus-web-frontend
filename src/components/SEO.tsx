import { Helmet } from 'react-helmet-async'

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
  image = 'https://lankaevplus.com/og-image.jpg',
  url = 'https://lankaevplus.com',
  type = 'website',
}: SEOProps) => {
  const siteTitle = title.includes('LankaEVPlus') ? title : `${title} | LankaEVPlus`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'LankaEVPlus',
    description: 'Sri Lanka\'s leading EV charging solutions provider',
    url: 'https://lankaevplus.com',
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

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="LankaEVPlus" />
      <meta name="theme-color" content="#00FF88" />
      <meta name="robots" content="index, follow" />
      

      {/* Open Graph tags */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="LankaEVPlus" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}

export default SEO
