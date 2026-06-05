import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HeroSection from './pages/HeroSection'
import HowItWorksSection from './pages/HowItWorksSection'
import LoanPurposeSection from './pages/LoanPurposeSection'
import SecuritySection from './pages/SecuritySection'
import TestimonialSection from './pages/TestimonialSection'
import WhySection from './pages/WhySection'

const Home = () => {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // A slight delay ensures the components have fully rendered before we scroll to them
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }, [hash])

  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <LoanPurposeSection/>
      <WhySection/>
      <TestimonialSection/>
      <SecuritySection/>
    </>
  )
}

export default Home
