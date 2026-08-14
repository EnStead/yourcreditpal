import { NavLink } from 'react-router-dom'
import Warning from '../../../../assets/Warning.webp'
import FolderPlane from '../../../../assets/FolderPlane.webp'

const HARD_REJECT_DEFAULT_MESSAGE =
  'We were unable to process your application, please check your information and try again.'
const SOFT_REJECT_MESSAGE = 'We are still searching for lenders, you may be contacted shortly.'
const NEUTRAL_MESSAGE = 'We cannot process this request.'
const NEUTRAL_PHONE_MESSAGE = 'Please enter a valid mobile or landline number.'
const NEUTRAL_EMAIL_MESSAGE = 'Please enter a valid email address.'

// Safe to name specifically: self-correctable field issues, not fraud/suppression signals.
const BENIGN_REASON_COPY = {
  first_name_invalid: 'First name could not be verified.',
  last_name_invalid: 'Last name could not be verified.',
  under_18: 'You must be 18 or older to apply.',
  zip_state_mismatch: "Your ZIP code doesn't match the selected state.",
}

const PHONE_NEUTRAL_REASONS = new Set([
  'phone_suppressed',
  'phone_invalid_or_disconnected',
  'phone_type_voip',
  'phone_type_non_fixed_voip',
  'phone_type_toll_free',
  'phone_type_unknown',
])

const EMAIL_NEUTRAL_REASONS = new Set(['email_suppressed', 'email_invalid'])

const BENIGN_REASONS = new Set(Object.keys(BENIGN_REASON_COPY))

// Never named individually: suppression, credit, employment, duplicate/IP-velocity, TrustedForm,
// loan purpose, etc. Naming any of these gives litigator-scan sites a map of our fraud/suppression
// logic, so they all collapse to one neutral sentence with no itemized reasons.
const resolveHardRejectCopy = (rejectionReasons, fallbackMessage) => {
  if (!rejectionReasons.length) {
    return { body: fallbackMessage || HARD_REJECT_DEFAULT_MESSAGE, bullets: [] }
  }

  const hasOtherSensitiveReason = rejectionReasons.some(
    (reason) =>
      !BENIGN_REASONS.has(reason) &&
      !PHONE_NEUTRAL_REASONS.has(reason) &&
      !EMAIL_NEUTRAL_REASONS.has(reason),
  )
  if (hasOtherSensitiveReason) {
    return { body: NEUTRAL_MESSAGE, bullets: [] }
  }

  if (rejectionReasons.some((reason) => PHONE_NEUTRAL_REASONS.has(reason))) {
    return { body: NEUTRAL_PHONE_MESSAGE, bullets: [] }
  }

  if (rejectionReasons.some((reason) => EMAIL_NEUTRAL_REASONS.has(reason))) {
    return { body: NEUTRAL_EMAIL_MESSAGE, bullets: [] }
  }

  return {
    body: fallbackMessage || HARD_REJECT_DEFAULT_MESSAGE,
    bullets: rejectionReasons.map((reason) => BENIGN_REASON_COPY[reason] || reason.replaceAll('_', ' ')),
  }
}

const screenCopy = {
  hard_reject: {
    image: Warning,
    title: "We Couldn't Verify Some Information",
    stepsTitle: 'Possible Reasons',
    button: 'Review Application',
  },
  soft_reject: {
    image: FolderPlane,
    title: "We're Still Reviewing Your Request",
    body: SOFT_REJECT_MESSAGE,
    button: 'Return Home',
  },
}

const ApplyNoLenderScreen = ({
  variant = 'hard_reject',
  message,
  rejectionReasons = [],
  onReviewApplication,
}) => {
  const copy = screenCopy[variant] || screenCopy.hard_reject
  const { body, bullets } =
    variant === 'hard_reject'
      ? resolveHardRejectCopy(rejectionReasons, message)
      : { body: message || copy.body, bullets: [] }

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4 text-center lg:px-6">
      <div className="w-full space-y-8">
        <div className="mx-auto flex h-42 w-42 items-center justify-center">
          <img src={copy.image} alt="" aria-hidden="true" className="h-full w-full" />
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-bold tracking-[-0.03em] text-brand-title">
            {copy.title}
          </h1>
          <p className="mx-auto max-w-lg text-lg text-brand-label">
            {body}
          </p>
        </div>

        {bullets.length ? (
          <div className="mx-auto max-w-2xl rounded-2xl border-2 border-brand-stroke bg-brand-offwhite px-6 py-6 text-left sm:px-7 sm:py-7">
            <h2 className="text-lg font-semibold text-brand-title">{copy.stepsTitle}</h2>
            <div className="mt-5 space-y-4">
              {bullets.map((item, index) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center text-brand-title">
                    {index + 1}.
                  </div>
                  <p className="text-brand-title">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {variant === 'hard_reject' ? (
          <button
            type="button"
            onClick={onReviewApplication}
            className="inline-flex min-w-60 items-center justify-center rounded-xl bg-brand-primary px-8 py-3 text-sm font-semibold text-brand-white transition hover:opacity-90"
          >
            {copy.button}
          </button>
        ) : (
          <NavLink
            to="/"
            className="inline-flex min-w-60 items-center justify-center rounded-xl bg-brand-primary px-8 py-3 text-sm font-semibold text-brand-white transition hover:opacity-90"
          >
            {copy.button}
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default ApplyNoLenderScreen
