import Home from '../../src/landingpage/features/Home'
import { buildMeta } from '../lib/seo'

export const meta = () =>
  buildMeta({
    title: 'YourCreditPal — Find Personal Loan Offers That Match Your Needs',
    description:
      'Complete a quick, secure application and get matched with lenders based on your financial profile. No hidden fees, no complicated process.',
    path: '/',
  })

export default function HomeRoute() {
  return <Home />
}
