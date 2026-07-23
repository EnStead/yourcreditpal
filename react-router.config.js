import { createClient } from '@sanity/client'
import { legalPages } from './src/landingpage/features/Legal/data/legalPages.js'

// Static content routes worth prerendering. /apply is intentionally excluded (noindex, client-only form).
const STATIC_PATHS = ['/', '/faq', '/blog', '/unsubscribe']
const LEGAL_PATHS = Object.keys(legalPages).map((slug) => `/legal/${slug}`)

// Public, non-secret Sanity coordinates (mirrors .env.example) so build-time slug enumeration
// works without VITE_ env plumbing in the config context.
const buildClient = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'xqdkz7sb',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2026-06-02',
  useCdn: true,
})

async function blogPaths() {
  try {
    const slugs = await buildClient.fetch(`*[_type == "blogPost" && defined(slug.current)].slug.current`)
    return (slugs || []).map((slug) => `/blog/${slug}`)
  } catch (err) {
    console.warn('[prerender] Sanity slug fetch failed, skipping blog posts:', err?.message || err)
    return []
  }
}

export default {
  appDirectory: 'app',
  ssr: false,
  async prerender() {
    return [...STATIC_PATHS, ...LEGAL_PATHS, ...(await blogPaths())]
  },
}
