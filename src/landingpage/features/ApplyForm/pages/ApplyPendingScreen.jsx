import { useEffect, useRef, useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import GreenTick from '../../../../assets/GreenTick.svg?react'
import hourGlassAnimation from '../../../../assets/HourGlass.lottie?url'

const loadingSteps = [
  'Verifying Information...',
  'Checking Eligibility...',
  'Searching Lending Partners...',
]

const loadingCopy = {
  title: 'Reviewing Your Request',
  body: 'Please wait while we verify your information and search for available lending partners.',
}

const successCopy = {
  title: "We're Matching You With Lenders",
  body: 'Your request has been accepted and is being routed to participating lenders.',
}

const HourGlassMark = ({ className = '', speed = 1 }) => {
  const playerRef = useRef(null)

  return (
    <DotLottieReact
      src={hourGlassAnimation}
      autoplay
      loop
      speed={speed}
      className={className}
      dotLottieRefCallback={(instance) => {
        playerRef.current = instance
        if (instance) {
          instance.setSpeed?.(speed)
          instance.setFrame?.(0)
          instance.play?.()
        }
      }}
    />
  )
}

const ApplyPendingScreen = ({ variant = 'loading', message = '' }) => {
  const [stage, setStage] = useState('verifying')
  const [completedCount, setCompletedCount] = useState(0)

  useEffect(() => {
    if (variant !== 'loading') return undefined

    const verifyTimer = window.setTimeout(() => {
      setStage('progress')
      setCompletedCount(0)
    }, 1400)

    return () => {
      window.clearTimeout(verifyTimer)
    }
  }, [variant])

  useEffect(() => {
    if (variant !== 'loading' || stage !== 'progress') return undefined

    const stepTimer = window.setInterval(() => {
      setCompletedCount((current) => {
        if (current >= loadingSteps.length) {
          window.clearInterval(stepTimer)
          return current
        }

        return current + 1
      })
    }, 850)

    return () => {
      window.clearInterval(stepTimer)
    }
  }, [stage, variant])

  if (variant === 'boberdoo_pending') {
    return (
      <div className="flex min-h-full flex-col items-center justify-center px-4 text-center lg:px-6">
        <div className="w-full max-w-2xl space-y-8">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-lightblue/40">
            <GreenTick className="h-14 w-14" />
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl font-bold tracking-[-0.03em] text-brand-title">
              {successCopy.title}
            </h1>
            <p className="mx-auto max-w-xl text-lg text-brand-label">
              {message || successCopy.body}
            </p>
          </div>

          <div className="mx-auto max-w-2xl rounded-2xl border-2 border-brand-stroke bg-brand-offwhite px-6 py-6 text-left sm:px-7 sm:py-7">
            <h2 className="text-lg font-semibold text-brand-title">What Happens Next</h2>
            <div className="mt-5 space-y-4">
              {[
                'A lender or partner may review your request.',
                'You may be contacted if a matching option is available.',
                'Keep your phone and email available for updates.',
              ].map((item, index) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center text-brand-title">
                    {index + 1}.
                  </div>
                  <p className="text-brand-title">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <a
            href="/"
            className="inline-flex min-w-60 items-center justify-center rounded-xl bg-brand-primary px-8 py-3 text-sm font-semibold text-brand-white transition hover:opacity-90"
          >
            Return Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4 text-center lg:px-6">
      <div className="w-full max-w-2xl space-y-10">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-brand-title">{loadingCopy.title}</h1>
          <p className="mx-auto max-w-xl text-lg text-brand-label">
            {loadingCopy.body}
          </p>
        </div>

        {stage === 'verifying' ? (
          <div className="flex items-center justify-center gap-3 pt-2">
            <HourGlassMark className="h-5 w-5" />
            <p className="text-base font-semibold text-brand-title">
              {loadingSteps[0]}
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-xl space-y-5 pt-2">
            {loadingSteps.map((item, index) => {
              const isDone = index < completedCount
              const isActive = index === completedCount && completedCount < loadingSteps.length

              return (
                <div
                  key={item}
                  className={`flex items-center justify-center gap-3 transition-all duration-300 ${
                    isDone || isActive ? 'opacity-100' : 'opacity-0 translate-y-2'
                  }`}
                >
                  {isDone ? (
                    <GreenTick className="h-5 w-5 shrink-0" />
                  ) : isActive ? (
                    <HourGlassMark className="h-5 w-5 shrink-0" />
                  ) : (
                    <span className="h-5 w-5 shrink-0" />
                  )}
                  <p className="text-base font-semibold text-brand-title sm:text-lg">{item}</p>
                </div>
              )
            })}
            {completedCount >= loadingSteps.length ? (
              <p className="pt-4 text-sm text-brand-label">We are still reviewing your request.</p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

export default ApplyPendingScreen
