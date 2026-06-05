import { BadgeCheck, ShieldCheck } from 'lucide-react'

export const Field = ({ label, placeholder, icon: Icon, full }) => (
  <label className={full ? 'block' : 'block'}>
    <span className="mb-3 block text-base font-medium text-brand-body">{label}</span>
    <div className="flex items-center border-b border-brand-body/40 py-2">
      <input
        className="w-full bg-transparent text-base text-brand-title outline-none placeholder:text-brand-stroke"
        placeholder={placeholder}
      />
      {Icon ? <Icon className="h-4 w-4 text-brand-stroke" /> : null}
    </div>
  </label>
)

export const Notice = ({ text }) => <p className="mt-3 text-sm text-brand-body">{text}</p>

export const ConfidenceBox = ({ items }) => (
  <div className="mt-8 rounded-2xl border border-brand-stroke/20 bg-brand-offwhite p-4">
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-2 text-sm text-brand-title">
          <BadgeCheck className="h-4 w-4 text-green-600" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  </div>
)

export const SecureNoticeCard = ({ title, text }) => (
  <div className="mt-10 rounded-2xl border border-brand-stroke/15 bg-brand-offwhite p-4">
    <div className="flex items-start gap-3">
      <div className="rounded-full bg-brand-title/10 p-2 text-brand-title">
        <ShieldCheck className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-base font-bold text-brand-title">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-brand-body">{text}</p>
      </div>
    </div>
  </div>
)

export const ConsentText = () => (
  <p className="mt-4 text-sm leading-6 text-brand-body">
    By clicking &ldquo;Continue,&rdquo; you agree to receive <span className="text-brand-secondary">communications</span> from CreditPal and our <span className="text-brand-secondary">lending partners</span> regarding your request, including calls, emails, and text messages where permitted.
  </p>
)

export const ConsentList = () => (
  <>
    <p className="mt-5 text-sm leading-6 text-brand-body">
      By submitting your request, you acknowledge and agree that:
    </p>
    <ul className="mt-3 list-disc space-y-3 pl-5 text-sm leading-6 text-brand-body">
      <li>CreditPal may securely share your information with <span className="text-brand-secondary">lending partners</span> to help identify potential loan opportunities.</li>
      <li>You may receive calls, emails, or text messages regarding your request, even if your number appears on a federal or state Do Not Call list. Message and data rates may apply.</li>
      <li>Your information is processed in accordance with our <span className="text-brand-secondary">Terms &amp; Conditions</span>, <span className="text-brand-secondary">Privacy Policy</span>, and <span className="text-brand-secondary">E-Consent Agreement</span>.</li>
    </ul>
  </>
)
