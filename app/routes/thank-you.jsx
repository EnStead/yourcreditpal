import ThankYou from '../../src/landingpage/features/ThankYou/ThankYou'
import { buildMeta } from '../lib/seo'

export const meta = () =>
  buildMeta({
    title: 'Thank You | YourCreditPal',
    description: 'Your application has been received. YourCreditPal is searching for lenders that match your request.',
    path: '/thank-you',
    noindex: true,
  })

export default function ThankYouRoute() {
  return <ThankYou />
}
