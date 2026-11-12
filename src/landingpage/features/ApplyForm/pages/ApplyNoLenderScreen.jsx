import { NavLink } from 'react-router-dom'
import Warning from '../../../../assets/Warning.webp'
import FolderPlane from '../../../../assets/FolderPlane.webp'
import { resolveRejectionCopy } from '../rejectionCopy.js'

const HARD_REJECT_DEFAULT_MESSAGE =
  'We were unable to process your application.'
const SOFT_REJECT_MESSAGE = 'We are still searching for lenders, you may be contacted shortly.'

const screenCopy = {
  hard_reject: {
    image: Warning,
    title: "We Couldn't Complete Your Application",
    body: HARD_REJECT_DEFAULT_MESSAGE,
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
  const { title = copy.title, body, bullets } = resolveRejectionCopy(
    rejectionReasons,
    message || copy.body,
  )

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4 text-center lg:px-6">
      <div className="w-full space-y-8">
        <div className="mx-auto flex h-42 w-42 items-center justify-center">
          <img src={copy.image} alt="" aria-hidden="true" className="h-full w-full" />
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-bold tracking-[-0.03em] text-brand-title">
            {title}
          </h1>
          <p className="mx-auto max-w-lg text-lg text-brand-label">
            {body}
          </p>
        </div>

        {bullets.length ? (
          <div className="mx-auto max-w-2xl rounded-2xl border-2 border-brand-stroke bg-brand-offwhite px-6 py-6 text-left sm:px-7 sm:py-7">
            <h2 className="text-lg font-semibold text-brand-title">Application details</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-brand-title">
              {bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
