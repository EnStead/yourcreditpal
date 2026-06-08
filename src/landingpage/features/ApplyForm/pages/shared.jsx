import { useState } from 'react'
import GreenTick from '../../../../assets/GreenTick.svg?react'
import ShieldCheck from '../../../../assets/ShieldCheck.svg?react'

export const Field = ({ label, placeholder, icon: Icon, full, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  const isFilled = hasValue || (props.value && String(props.value).length > 0) || (props.defaultValue && String(props.defaultValue).length > 0)
  const isActive = isFocused || isFilled
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
              try { e.target.showPicker() } catch (err) {}
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

export const SecureNoticeCard = ({ title, text }) => (
  <div className="mt-10 rounded-2xl border-2 border-brand-stroke bg-brand-offwhite p-4">
    <div className="flex items-center gap-3">
      <div className="">
        <ShieldCheck className="h-10 w-10"/>
      </div>
      <div>
        <h3 className="text-base font-bold text-brand-title">{title}</h3>
        <p className="mt-1 text-sm text-brand-body">{text}</p>
      </div>
    </div>
  </div>
)

export const ConsentText = () => (
  <p className="mt-4 text-sm font-light text-brand-body">
    By clicking &ldquo;Continue,&rdquo; you agree to receive <span className="text-brand-primary">communications</span> from CreditPal and our <span className="text-brand-primary">lending partners</span> regarding your request, including calls, emails, and text messages where permitted.
  </p>
)

export const ConsentList = () => (
  <>
    <p className="mt-5 text-sm leading-6 text-brand-body">
      By submitting your request, you acknowledge and agree that:
    </p>
    <ul className="mt-3 list-disc space-y-3 pl-5 text-sm text-brand-body">
      <li>CreditPal may securely share your information with <span className="text-brand-primary">lending partners</span> to help identify potential loan opportunities.</li>
      <li>You may receive calls, emails, or text messages regarding your request, even if your number appears on a federal or state Do Not Call list. Message and data rates may apply.</li>
      <li>Your information is processed in accordance with our <span className="text-brand-primary">Terms &amp; Conditions</span>, <span className="text-brand-primary">Privacy Policy</span>, and <span className="text-brand-primary">E-Consent Agreement</span>.</li>
    </ul>
  </>
)
