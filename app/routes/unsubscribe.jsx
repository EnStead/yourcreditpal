import Unsubscribe from '../../src/landingpage/features/Unsubscribe/Unsubscribe'
import { buildMeta } from '../lib/seo'

export const meta = () =>
  buildMeta({
    title: 'Unsubscribe — YourCreditPal',
    description: 'Manage your communication preferences or unsubscribe from YourCreditPal messages.',
    path: '/unsubscribe',
    noindex: true,
  })

export default function UnsubscribeRoute() {
  return <Unsubscribe />
}
