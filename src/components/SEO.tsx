import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

import { APP_NAME, APP_TAGLINE, COMPANY_EMAIL, COMPANY_PHONE, DEFAULT_OG_IMAGE_URL, SITE_URL } from '../lib/constants'
import { defaultSEO } from '../lib/seo'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  type?: string
  robots?: string
  structuredData?: any
}

const DEFAULT_ROBOTS_INDEX = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
const DEFAULT_ROBOTS_NOINDEX = 'noindex,nofollow'

const NOINDEX_PREFIXES = [
  '/cart',
  '/checkout',
  '/payment',
  '/login',
  '/register',
  '/account',
  '/track-order',
  '/order-success',
]

function normalizeCanonicalPath(pathname: string) {
  if (!pathname || pathname === '/') return '/'
  // Avoid `//` or trailing slashes for canonical stability.
  return `/${pathname.replace(/^\/+/, '').replace(/\/+$/, '')}`
}

function shouldNoIndex(pathname: string) {
  return NOINDEX_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

function enhanceJsonLdWithUrl(entity: any, pageUrl: string) {
  if (!entity || typeof entity !== 'object') return entity

  const copy = { ...entity }
  if (typeof copy.url === 'undefined') copy.url = pageUrl

  if (copy.offers && typeof copy.offers === 'object') {
    if (typeof copy.offers.url === 'undefined') {
      copy.offers = { ...copy.offers, url: pageUrl }
    }
  }

  // Common schema pattern for “where this page is located”.
  if (typeof copy.mainEntityOfPage === 'undefined') {
    copy.mainEntityOfPage = pageUrl
  }

  return copy
}

const SEO = ({
  title,
  description,
  keywords,
  image,
  type = 'website',
  robots,
  structuredData,
}: SEOProps) => {
  const location = useLocation()
  const pathname = normalizeCanonicalPath(location.pathname)
  const canonicalUrl = `${SITE_URL}${pathname === '/' ? '' : pathname}`

  const resolvedTitle = title ?? defaultSEO.title
  const resolvedDescription = description ?? defaultSEO.description
  const resolvedKeywords = keywords ?? defaultSEO.keywords
  const imageUrl = image ?? DEFAULT_OG_IMAGE_URL

  const lower = resolvedTitle.toLowerCase()
  const siteTitle =
    lower.includes(APP_NAME.toLowerCase()) || lower.includes('lanka ev') ? resolvedTitle : `${resolvedTitle} | ${APP_NAME}`

  const robotsContent = robots ?? (shouldNoIndex(pathname) ? DEFAULT_ROBOTS_NOINDEX : DEFAULT_ROBOTS_INDEX)

  const defaultJsonLdItems = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: APP_NAME,
      description: resolvedDescription || APP_TAGLINE,
      url: SITE_URL,
      telephone: COMPANY_PHONE,
      email: COMPANY_EMAIL,
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
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: APP_NAME,
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  const extraJsonLdItems = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : []

  const allJsonLdItems = [
    ...defaultJsonLdItems,
    ...extraJsonLdItems.map((item: any) => enhanceJsonLdWithUrl(item, canonicalUrl)),
  ]

  return (
    <Helmet>
      <title>{siteTitle}</title>

      {resolvedDescription && <meta name="description" content={resolvedDescription} />}
      {resolvedKeywords && <meta name="keywords" content={resolvedKeywords} />}
      <meta name="author" content={APP_NAME} />
      <meta name="theme-color" content="#00FF88" />
      <meta name="robots" content={robotsContent} />

      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={APP_NAME} />
      <meta property="og:locale" content="en_LK" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:url" content={canonicalUrl} />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(allJsonLdItems.length === 1 ? allJsonLdItems[0] : allJsonLdItems)}</script>
    </Helmet>
  )
}

export default SEO
