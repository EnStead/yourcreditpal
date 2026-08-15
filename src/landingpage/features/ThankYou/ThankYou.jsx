import { NavLink } from 'react-router-dom'
import GreenTick from '../../../assets/GreenTick.svg?react'

const legalLinkClass =
  'font-medium text-brand-primary no-underline transition hover:underline hover:underline-offset-4 focus-visible:underline focus-visible:underline-offset-4'

const nextSteps = [
  'A lender or partner may review your request.',
  'You may be contacted if a matching option is available.',
  'Keep your phone and email available for updates.',
]

const ThankYou = () => {
  return (
    <section className="px-5 py-14 sm:px-8 lg:px-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-lightblue/40">
          <GreenTick className="h-10 w-10" />
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-[-0.04em] text-brand-title sm:text-5xl">
          Thank You For Applying
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-brand-body">
          Your request has been received. We're searching for lenders who match your request, and you may be
          contacted directly if a match is found.
        </p>

        <div className="mx-auto mt-10 max-w-xl rounded-2xl border-2 border-brand-stroke bg-brand-offwhite px-6 py-6 text-left sm:px-7 sm:py-7">
          <h2 className="text-lg font-semibold text-brand-title">What Happens Next</h2>
          <div className="mt-5 space-y-4">
            {nextSteps.map((item, index) => (
              <div key={item} className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center text-brand-title">
                  {index + 1}.
                </div>
                <p className="text-brand-title">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-sm text-brand-label">
          YourCreditPal is not a lender and does not make credit decisions.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <NavLink
            to="/"
            className="inline-flex min-w-60 items-center justify-center rounded-xl bg-brand-primary px-8 py-3 text-sm font-semibold text-brand-white transition hover:opacity-90"
          >
            Return Home
          </NavLink>
          <NavLink to="/unsubscribe" className={legalLinkClass}>
            Opt out of all contact
          </NavLink>
        </div>
      </div>
    </section>
  )
}

export default ThankYou
