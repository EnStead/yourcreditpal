import { Navigate, useParams } from 'react-router-dom'
import { legalPages } from './data/legalPages'
import LegalPage from './pages/LegalPage'

const Legal = () => {
  const { slug } = useParams()
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
  }

  const page = legalPages[slugMap[slug]]

  if (!page) {
    return <Navigate to="/" replace />
  }

  return <LegalPage page={page} />
}

export default Legal
