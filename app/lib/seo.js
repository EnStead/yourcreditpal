// Central SEO config + meta helpers shared by every route module.
export const SITE_URL = (import.meta.env?.VITE_SITE_URL || 'https://yourcreditpal.com').replace(/\/$/, '')
export const SITE_NAME = 'YourCreditPal'
export const DEFAULT_TITLE = 'YourCreditPal — Find Personal Loan Offers That Match Your Needs'
export const DEFAULT_DESCRIPTION =
  'YourCreditPal matches you with lenders based on your financial profile. Complete a quick, secure application and compare personal loan offers — no hidden fees, no complicated process.'
export const OG_IMAGE = `${SITE_URL}/og-image.png`

export const AUTHORS = [
  { name: 'Bami', handle: 'DesignedbyBami', role: 'Design & Development', url: 'https://github.com/designedbybami' },
  { name: 'Anjola', handle: 'Anjyfade', role: 'Development', url: 'https://github.com/anjyfade1' },
]
const AUTHOR_LABEL = AUTHORS.map((a) => `${a.name} (${a.handle})`).join(' & ')

export const canonical = (path = '/') => `${SITE_URL}${path === '/' ? '' : path}`

// Build a full react-router meta descriptor array (title, description, canonical, OpenGraph, Twitter).
export function buildMeta({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = OG_IMAGE,
  type = 'website',
  noindex = false,
} = {}) {
  const url = canonical(path)
  const tags = [
    { title },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:type', content: type },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    { name: 'author', content: AUTHOR_LABEL },
    ...AUTHORS.map((a) => ({ property: 'article:author', content: a.url })),
  ]
  if (noindex) tags.push({ name: 'robots', content: 'noindex, nofollow' })
  return tags
}
