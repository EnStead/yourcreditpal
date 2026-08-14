import { Check, House } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import Home from "../../../../assets/Homes.svg?react";
import Rent from "../../../../assets/Rent.svg?react";
import Family from "../../../../assets/Family.svg?react";
import { SecureNoticeCard, Field } from './shared'
import { streetAddressError } from '../validators'

const legalLinkClass =
  'font-medium text-brand-primary no-underline transition hover:underline hover:underline-offset-4 focus-visible:underline focus-visible:underline-offset-4'

const iconMap = {
  "Own": Home,
  "Rent": Rent,
  "Family / Other": Family,
};

const ApplyStepFour = ({
  housing,
  setHousing,
  housingOptions,
  streetAddress,
  setStreetAddress,
  city,
  zipCode,
  hasConsent,
  setHasConsent,
}) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-brand-title">
        Almost There
      </h1>
      <p className="mt-3 text-base text-brand-body">
        Lenders use this information to review your request and match you with available options.
      </p>

      <div className="mt-8">
        <h2 className="font-bold text-brand-title">Housing Status</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {housingOptions.map((item) => {
            const active = housing === item
            const Icon = iconMap[item] || House;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setHousing(item)}
                className={`flex items-center gap-3 font-sans font-medium rounded-xl border-2 px-4 py-3 text-left text-sm transition ${
                  active
                    ? 'border-brand-primary bg-brand-lightblue text-brand-title'
                    : 'border-brand-stroke bg-brand-white text-brand-title hover:border-brand-secondary'
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? 'text-brand-primary' : 'text-brand-secondary'}`} />
                {item}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-6 font-sans">
        <div>
          <Field
            label="Street Address"
            placeholder="123 Main Street"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            onBlur={() => setStreetAddress((current) => current.trim())}
          />
          {streetAddressError(streetAddress) ? (
            <p className="mt-2 text-sm text-red-500">{streetAddressError(streetAddress)}</p>
          ) : null}
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Field label="City" value={city} readOnly forceActive />
          </div>
          <div>
            <Field label="Postal/Zip Code" value={zipCode} readOnly forceActive />
          </div>
        </div>
      </div>

      <SecureNoticeCard title="Your Information Is Secure">
        We take your privacy seriously. Your information is shared only with licensed lending partners who may be able to help you. We do not sell your data to marketing companies or data brokers. You can{' '}
        <NavLink to="/unsubscribe" className={legalLinkClass}>
          opt out of all contact
        </NavLink>{' '}
        at any time.
      </SecureNoticeCard>
      <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-brand-body">
        <input
          type="checkbox"
          checked={hasConsent}
          onChange={(event) => setHasConsent(event.target.checked)}
          className="peer sr-only"
        />
        <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 border-brand-title/50 bg-brand-white transition peer-checked:border-brand-primary peer-checked:bg-brand-primary">
          {hasConsent ? <Check className="h-3 w-3 text-brand-white" strokeWidth={3} /> : null}
        </span>
        <span>
          By checking this box and clicking Submit My Application, I confirm that the information I&apos;ve provided is accurate and complete, and I provide my express written consent to be contacted by YourCreditPal and its{' '}
          <NavLink to="/legal/marketing-partners" className={legalLinkClass}>
            current lending partners listed here
          </NavLink>{' '}
          via automated calls, prerecorded messages, or texts at the number provided. Consent is not a condition of purchase. YourCreditPal is a loan matching service, not a lender, and does not make credit decisions or guarantee loan approval; loan offers, rates, and terms are determined by individual lenders. I also certify that I am 18 years of age or older and agree to YourCreditPal&apos;s{' '}
          <NavLink to="/legal/terms-conditions" className={legalLinkClass}>
            Terms of Use
          </NavLink>{' '}
          and{' '}
          <NavLink to="/legal/privacy-policy" className={legalLinkClass}>
            Privacy Policy
          </NavLink>
          .
        </span>
      </label>
    </>
  )
}

export default ApplyStepFour
