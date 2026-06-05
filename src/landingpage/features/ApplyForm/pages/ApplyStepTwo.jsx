import { CalendarDays, ChevronRight, CircleDot, Mail, UserRound } from 'lucide-react'
import { ConfidenceBox, ConsentText, Field, Notice } from './shared'

const ApplyStepTwo = () => {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-[-0.04em] text-brand-title sm:text-4xl">
        Let&apos;s Find Loan Options That Match Your Needs
      </h1>
      <p className="mt-4 text-base leading-7 text-brand-body">
        Tell us a little about your request so we can connect you with relevant partners.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field label="First Name" placeholder="Enter your first name" icon={UserRound} />
        <Field label="Last Name" placeholder="Enter your last name" />
        <Field label="Email Address" placeholder="johndoe@gmail.com" icon={Mail} full />
        <Field label="Phone Number" placeholder="(555) 123-4567" icon={CircleDot} full />
        <Field label="Date of Birth" placeholder="MM/DD/YYYY" icon={CalendarDays} />
        <Field label="State" placeholder="Select state" icon={ChevronRight} />
      </div>
      <Notice text="Applicants must be at least 18 years old." />
      <ConfidenceBox items={['Secure Application', 'No Upfront Fees', 'Takes Just a Few Minutes', 'No Obligation to Accept an Offer']} />
      <ConsentText />
    </>
  )
}

export default ApplyStepTwo
