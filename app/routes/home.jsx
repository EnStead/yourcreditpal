import Home from '../../src/landingpage/features/Home'
import { buildMeta } from '../lib/seo'

export const meta = () =>
  buildMeta({
    title: 'YourCreditPal | Compare Personal Loan Offers',
    description:
      'Complete a quick, secure application and get matched with lenders based on your financial profile. No hidden fees, no complicated process.',
    path: '/',
  })

export default function HomeRoute() {
  return <Home />
}
