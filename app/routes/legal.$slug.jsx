import Legal, { legalPages } from '../../src/landingpage/features/Legal'
import { buildMeta } from '../lib/seo'

// Mirrors the alias handling in the Legal feature so canonical + aliased slugs resolve identically.
const slugMap = {
  terms: 'terms',
  'terms-conditions': 'terms',
  'terms-and-conditions': 'terms',
  privacy: 'privacy',
  'privacy-policy': 'privacy',
  'financial-disclosures': 'financial-disclosures',
  'electronic-consent': 'electronic-consent',
  'marketing-partners': 'marketing-partners',
  'do-not-sell': 'do-not-sell',
  'vulnerability-disclosure': 'vulnerability-disclosure',
}

const introText = (intro) => (Array.isArray(intro) ? intro[0] : intro) || ''

export function meta({ params }) {
  const page = legalPages[slugMap[params.slug]]
  if (!page) return buildMeta({ title: 'Legal — YourCreditPal', path: `/legal/${params.slug}`, noindex: true })
  return buildMeta({
    title: `${page.title} — YourCreditPal`,
    description: introText(page.intro).slice(0, 300),
    path: `/legal/${params.slug}`,
    type: 'article',
  })
}

export default function LegalRoute() {
  return <Legal />
}
