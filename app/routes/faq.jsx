import Faq from '../../src/landingpage/features/FAQ'
import { faqSchemaItems } from '../../src/landingpage/features/FAQ/pages/FaqTabSection'
import { buildMeta } from '../lib/seo'

export const meta = () => {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqSchemaItems.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }

  return [
    ...buildMeta({
      title: 'Frequently Asked Questions | YourCreditPal',
      description:
        'Answers about how YourCreditPal matches you with lenders: applications, loan process, eligibility, security & privacy, and repayment.',
      path: '/faq',
    }),
    { 'script:ld+json': faqJsonLd },
  ]
}

export default function FaqRoute() {
  return <Faq />
}
