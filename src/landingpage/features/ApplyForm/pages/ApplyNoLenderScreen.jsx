import { NavLink } from 'react-router-dom'
import Warning from '../../../../assets/Warning.png'
import FolderPlane from '../../../../assets/FolderPlane.png'

const reasonMap = {
  first_name_invalid: 'First name could not be verified',
  last_name_invalid: 'Last name could not be verified',
  under_18: 'Applicant must be at least 18 years old',
  zip_state_mismatch: 'ZIP code does not match the selected state',
  email_suppressed: 'Email address could not be verified',
  phone_suppressed: 'Phone number could not be verified',
  trustedform_invalid: 'TrustedForm consent could not be verified',
  phone_invalid_or_disconnected: 'Phone number appears invalid or disconnected',
  phone_type_voip: 'VoIP numbers are not supported',
  phone_type_non_fixed_voip: 'Non-fixed VoIP numbers are not supported',
  phone_type_toll_free: 'Toll-free numbers are not supported',
  phone_type_unknown: 'Phone type could not be verified',
  email_invalid: 'Email address appears invalid',
  income_below_1500: 'Monthly income is below the supported threshold',
  credit_score_below_580: 'Credit score is below the supported threshold',
  credit_score_unknown: 'Credit score could not be determined',
  unemployed: 'Employment status is not currently supported',
  benefits_disability: 'Employment status is not currently supported',
  loan_purpose_other: 'Loan purpose is not currently supported',
  ip_submitted_more_than_3x_24h: 'Too many submissions were received from this IP recently',
}

const screenCopy = {
  hard_reject: {
    image: Warning,
    title: "We Couldn't Verify Some Information",
    body: 'The information provided could not be verified at this time. Please review your details and try again.',
    stepsTitle: 'Possible Reasons',
    button: 'Review Application',
  },
  soft_reject: {
    image: FolderPlane,
    title: "We're Still Reviewing Your Request",
    body: "We weren't able to identify an immediate match at this time, but your information may still be reviewed by participating partners.",
    stepsTitle: 'What We Know',
    steps: [
      'Request Received',
      'Information Stored',
      'Additional Reviews May Occur',
    ],
    button: 'Return Home',
  },
}

const formatReason = (reason) => reasonMap[reason] || reason.replaceAll('_', ' ')

const ApplyNoLenderScreen = ({
  variant = 'hard_reject',
  message,
  rejectionReasons = [],
  onReviewApplication,
}) => {
  const copy = screenCopy[variant] || screenCopy.hard_reject
  const hardRejectSteps = rejectionReasons.length ? rejectionReasons.map(formatReason) : [
    'Temporary verification issue',
    'Unsupported phone number type',
    'Email verification issue',
    'Information mismatch',
  ]
  const steps = variant === 'hard_reject' ? hardRejectSteps : copy.steps

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
            {message || copy.body}
          </p>
        </div>

        <div className="mx-auto max-w-2xl rounded-2xl border-2 border-brand-stroke bg-brand-offwhite px-6 py-6 text-left sm:px-7 sm:py-7">
          <h2 className="text-lg font-semibold text-brand-title">{copy.stepsTitle}</h2>
          <div className="mt-5 space-y-4">
            {steps.map((item, index) => (
              <div key={item} className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center text-brand-title">
                  {index + 1}.
                </div>
                <p className="text-brand-title">{item}</p>
              </div>
            ))}
          </div>
        </div>

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
