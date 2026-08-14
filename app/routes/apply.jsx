import ApplyForm from '../../src/landingpage/features/ApplyForm'
import { buildMeta } from '../lib/seo'

export const meta = () =>
  buildMeta({
    title: 'Apply | YourCreditPal',
    description: 'Complete your YourCreditPal loan application and get matched with lenders.',
    path: '/apply',
    noindex: true,
  })

export default function ApplyRoute() {
  return <ApplyForm />
}
