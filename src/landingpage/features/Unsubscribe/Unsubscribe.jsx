import { useState } from 'react'
import HeaderSection from './pages/HeaderSection'
import FormSection from './pages/FormSection'
import GetInTouchSection from './pages/GetInTouchSection'

const Unsubscribe = () => {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <HeaderSection />
      <FormSection submitted={submitted} onSubmit={() => setSubmitted(true)} />
      <GetInTouchSection/>
    </>
  )
}

export default Unsubscribe
