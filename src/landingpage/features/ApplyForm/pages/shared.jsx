import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import GreenTick from '../../../../assets/GreenTick.svg?react'
import ShieldCheck from '../../../../assets/ShieldCheck.svg?react'

const legalLinkClass =
  'font-medium text-brand-primary no-underline transition hover:underline hover:underline-offset-4 focus-visible:underline focus-visible:underline-offset-4'

export const Field = ({ label, placeholder, icon: Icon, full, forceActive = false, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  const isFilled = hasValue || (props.value && String(props.value).length > 0) || (props.defaultValue && String(props.defaultValue).length > 0)
  const isActive = forceActive || isFocused || isFilled
  const inputType = props.type === 'date' && !isActive ? 'text' : props.type || 'text'

  return (
    <label className={full ? 'block' : 'block'}>
      <span className={`mb-3 block text-base font-medium transition-colors ${isActive ? 'text-brand-title' : 'text-brand-label'}`}>
        {label}
      </span>
      <div className={`relative flex items-center border-b py-2 transition-colors ${isActive ? 'border-brand-title' : 'border-brand-stroke'}`}>
        <input
          {...props}
          type={inputType}
          className={`w-full bg-transparent text-base text-brand-title outline-none placeholder:text-brand-placeholder ${props.type === 'date' ? '[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0' : ''}`}
          placeholder={placeholder}
          onFocus={(e) => {
            setIsFocused(true);
            if (props.type === 'date') {
              e.target.type = 'date';
              try {
                e.target.showPicker()
              } catch {
                // Some browsers do not support programmatic date picker opening.
              }
            }
            if (props.onFocus) props.onFocus(e);
          }}
          onBlur={(e) => { setIsFocused(false); if (props.onBlur) props.onBlur(e); }}
          onChange={(e) => { setHasValue(e.target.value.length > 0); if (props.onChange) props.onChange(e); }}
        />
        {Icon ? <Icon className={`pointer-events-none h-4 w-4 transition-colors ${isActive ? 'text-brand-title' : 'text-brand-placeholder'}`} /> : null}
      </div>
    </label>
  )
}

export const Notice = ({ text }) => <p className="mt-3 text-sm font-light text-brand-body">{text}</p>

export const ConfidenceBox = ({ items }) => (
  <div className="mt-8 rounded-2xl border-2 border-brand-stroke bg-brand-offwhite p-4">
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-2 text-xs font-medium text-brand-title">
          <GreenTick className="h-3 w-3" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  </div>
)

export const SecureNoticeCard = ({ title, children }) => (
  <div className="mt-10 rounded-2xl border-2 border-brand-stroke bg-brand-offwhite p-4">
    <div className="flex items-center gap-3">
      <div className="">
        <ShieldCheck className="h-10 w-10"/>
      </div>
      <div>
        <h3 className="text-base font-bold text-brand-title">{title}</h3>
        <p className="mt-1 text-sm text-brand-body">{children}</p>
      </div>
    </div>
  </div>
)

export const ConsentText = () => (
  <p className="mt-4 text-sm font-light text-brand-body">
    By clicking &ldquo;See My Loan Options,&rdquo; I confirm that I have read and agree to YourCreditPal&apos;s{' '}
    <NavLink to="/legal/terms" className={legalLinkClass}>
      Terms of Use
    </NavLink>{' '}
    and{' '}
    <NavLink to="/legal/privacy" className={legalLinkClass}>
      Privacy Policy
    </NavLink>
    , and I provide my express written consent to be contacted by YourCreditPal and its network of{' '}
    <NavLink to="/legal/marketing-partners" className={legalLinkClass}>
      lending partners
    </NavLink>{' '}
    regarding personal loan products. I consent to be contacted by telephone, auto-dialer, pre-recorded message, and text message at the phone number I provided above, and by email at the address I provided above. I understand that consent is not required as a condition of obtaining any product or service, and that I may revoke my consent at any time by replying STOP to any text message or clicking Unsubscribe in any email. Message and data rates may apply.
  </p>
)

export const ConsentConfirmation = () => (
  <p className="mt-5 text-sm leading-6 text-brand-body">
    By submitting this form, I confirm that the information provided is accurate and complete, and I reaffirm my consent to be contacted as described above. I understand that YourCreditPal is a loan matching service, not a lender, and that we do not make credit decisions or guarantee loan approval. Loan offers, rates, and terms are determined by individual lenders based on your application.
  </p>
)
