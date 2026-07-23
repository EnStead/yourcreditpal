import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const CONSENT_KEY = 'ycp_cookie_consent'
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 30

export const getCookieConsent = () => {
  if (typeof window === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_KEY}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

export const setCookieConsent = (value) => {
  if (typeof window === 'undefined') return
  document.cookie = `${CONSENT_KEY}=${encodeURIComponent(value)}; max-age=${CONSENT_MAX_AGE_SECONDS}; path=/; samesite=lax`
  window.dispatchEvent(new Event('ycp-cookie-consent-changed'))
}

const CookieConsentBanner = () => {
  const [mounted, setMounted] = useState(false)
  const [consent, setConsentState] = useState(() => getCookieConsent())

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || consent) return null

  return createPortal(
    <div className="fixed inset-x-0 bottom-4 z-[80] px-4">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-2xl border border-brand-stroke/30 bg-brand-white px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand-title">Cookies and tracking</p>
          <p className="mt-1 text-sm leading-6 text-brand-body">
            We use strictly necessary cookies to keep the site working and optional analytics
            and advertising cookies to measure performance and improve the experience.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              setCookieConsent('rejected')
              setConsentState('rejected')
            }}
            className="rounded-xl border border-brand-stroke/40 px-4 py-2 text-sm font-semibold text-brand-title transition hover:border-brand-secondary hover:text-brand-secondary"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => {
              setCookieConsent('accepted')
              setConsentState('accepted')
            }}
            className="rounded-xl bg-brand-secondary px-4 py-2 text-sm font-semibold text-brand-white transition hover:opacity-90"
          >
            Accept cookies
          </button>
        </div>
      </div>
    </div>
  , document.body)
}

export default CookieConsentBanner
