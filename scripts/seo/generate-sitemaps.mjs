import fs from 'node:fs/promises'
import path from 'node:path'

const SITE_URL = process.env.SITE_URL || 'https://lankaevplus.com'
const API_BASE_URL =
  process.env.VITE_API_BASE_URL || process.env.API_BASE_URL || 'http://localhost:3000'

const XML_URLSET_NS = 'http://www.sitemaps.org/schemas/sitemap/0.9'

function todayISODate() {
  return new Date().toISOString().slice(0, 10)
}

function xmlEscape(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function normalizeList(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.data)) return payload.data
  if (payload && Array.isArray(payload.items)) return payload.items
  return []
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status} for ${url}${text ? `: ${text.slice(0, 200)}` : ''}`)
  }
  return res.json()
}

function buildUrlEntry(locPathOrUrl, lastmod) {
  // We expect paths like "/about"; convert to full URL for <loc>.
  const loc =
    locPathOrUrl === '/'
      ? SITE_URL
      : locPathOrUrl.startsWith('http')
        ? locPathOrUrl
        : `${SITE_URL}${locPathOrUrl}`
  return {
    loc,
    lastmod: lastmod ? String(lastmod).slice(0, 10) : todayISODate(),
  }
}

function toSitemapXml(entries) {
  const body = entries
    .map(
      (e) => `  <url>
    <loc>${xmlEscape(e.loc)}</loc>
    <lastmod>${xmlEscape(e.lastmod)}</lastmod>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="${XML_URLSET_NS}">
${body}
</urlset>
`
}

async function generate() {
  const publicDir = path.join(process.cwd(), 'public')
  const sitemapPath = path.join(publicDir, 'sitemap.xml')
  const robotsPath = path.join(publicDir, 'robots.txt')

  const lastmod = todayISODate()

  // Pages we consider indexable.
  const staticIndexableRoutes = [
    '/',
    '/about',
    '/chargers',
    '/scooters',
    '/ecosystem',
    '/stations',
    '/support',
    '/blog',
    '/contact',
    '/gallery',
    '/privacy',
    '/terms',
    '/returns',
    '/coming-soon',
  ]

  // Pages we don’t want indexed (cart/checkout/auth flows).
  const disallowRoutes = [
    '/cart',
    '/checkout',
    '/payment',
    '/login',
    '/register',
    '/account',
    '/track-order',
    '/order-success',
  ]

  const urlMap = new Map() // de-dupe by loc

  for (const r of staticIndexableRoutes) {
    const loc = `${SITE_URL}${r === '/' ? '' : r}`
    urlMap.set(loc, buildUrlEntry(r, lastmod))
  }

  // Fetch dynamic URLs.
  const productsUrl = `${API_BASE_URL}/products`
  const blogsUrl = `${API_BASE_URL}/blogs`
  const projectsUrl = `${API_BASE_URL}/projects`

  try {
    const products = normalizeList(await fetchJson(productsUrl))
    for (const p of products) {
      if (!p?.id) continue
      const locPath = `/product/${encodeURIComponent(String(p.id))}`
      const entry = buildUrlEntry(locPath, p.updatedAt || p.createdAt || lastmod)
      urlMap.set(entry.loc, entry)
    }
  } catch (err) {
    console.warn('[SEO sitemap] Failed fetching products:', err?.message || err)
  }

  try {
    const blogs = normalizeList(await fetchJson(blogsUrl))
    for (const b of blogs) {
      // Only publish published articles.
      if (b?.status && b.status !== 'PUBLISHED') continue
      if (!b?.slug) continue
      const locPath = `/blog/${encodeURIComponent(String(b.slug))}`
      const entry = buildUrlEntry(locPath, b.publishedAt || b.updatedAt || b.createdAt || lastmod)
      urlMap.set(entry.loc, entry)
    }
  } catch (err) {
    console.warn('[SEO sitemap] Failed fetching blogs:', err?.message || err)
  }

  try {
    const projects = normalizeList(await fetchJson(projectsUrl))
    for (const pr of projects) {
      if (pr?.status && pr.status !== 'PUBLISHED') continue
      if (!pr?.slug) continue
      const locPath = `/gallery/${encodeURIComponent(String(pr.slug))}`
      const entry = buildUrlEntry(locPath, pr.updatedAt || pr.createdAt || lastmod)
      urlMap.set(entry.loc, entry)
    }
  } catch (err) {
    console.warn('[SEO sitemap] Failed fetching projects:', err?.message || err)
  }

  const entries = Array.from(urlMap.values())

  const sitemapXml = toSitemapXml(entries)
  const robotsTxt = [
    'User-agent: *',
    ...disallowRoutes.map((p) => `Disallow: ${p}`),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n')

  await fs.mkdir(publicDir, { recursive: true })
  await Promise.all([
    fs.writeFile(sitemapPath, sitemapXml, 'utf8'),
    fs.writeFile(robotsPath, robotsTxt, 'utf8'),
  ])
}

generate().catch((err) => {
  console.warn('[SEO sitemap] Generation failed. Keeping existing files if any.', err?.message || err)
  process.exit(0)
})

