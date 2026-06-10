import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const PAGEVIEW_PIXEL_ID = '1160272862878464'
const VIEW_CONTENT_PIXEL_ID = '1689157452266597'
const VIEW_CONTENT_DELAY_MS = 5000
const VIEW_CONTENT_SCROLL_THRESHOLD = 0.35
const META_PIXEL_IDS = Array.from(new Set([PAGEVIEW_PIXEL_ID, VIEW_CONTENT_PIXEL_ID].filter(Boolean)))

const loadMetaPixel = () => {
  if (!META_PIXEL_IDS.length || typeof window === 'undefined') return
  if (window.fbq) return

  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = true
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = true
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

  META_PIXEL_IDS.forEach((pixelId) => {
    window.fbq('init', pixelId)
  })
}

const MetaPixelTracker = () => {
  const { pathname } = useLocation()
  const lastTrackedPathRef = useRef('')
  const viewContentFiredRef = useRef(false)
  const viewContentTimerRef = useRef(null)
  const viewContentScrollHandlerRef = useRef(null)
  const viewContentTimePassedRef = useRef(false)
  const viewContentScrollPassedRef = useRef(false)

  const maybeFireViewContent = () => {
    if (viewContentFiredRef.current || typeof window === 'undefined') return
    if (!viewContentTimePassedRef.current || !viewContentScrollPassedRef.current) return

    viewContentFiredRef.current = true
    window.removeEventListener('scroll', viewContentScrollHandlerRef.current)
    window.clearTimeout(viewContentTimerRef.current)
    window.fbq?.('trackSingle', VIEW_CONTENT_PIXEL_ID, 'ViewContent', {
      content_name: 'YourCreditPal Landing Page',
      content_category: 'Personal Loan Matching',
    })
  }

  useEffect(() => {
    if (!PAGEVIEW_PIXEL_ID || typeof window === 'undefined') return

    loadMetaPixel()

    if (window.__ycpMetaPixelLastPath === pathname || lastTrackedPathRef.current === pathname) return
    window.__ycpMetaPixelLastPath = pathname
    lastTrackedPathRef.current = pathname

    window.fbq?.('track', 'PageView')

    viewContentFiredRef.current = false
    viewContentTimePassedRef.current = false
    viewContentScrollPassedRef.current = false
    window.clearTimeout(viewContentTimerRef.current)
    window.removeEventListener('scroll', viewContentScrollHandlerRef.current)

    const getScrollProgress = () => {
      const documentHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
      const viewportHeight = window.innerHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
      const maxScrollable = Math.max(documentHeight - viewportHeight, 1)
      return scrollTop / maxScrollable
    }

    viewContentScrollHandlerRef.current = () => {
      if (getScrollProgress() >= VIEW_CONTENT_SCROLL_THRESHOLD) {
        viewContentScrollPassedRef.current = true
        maybeFireViewContent()
      }
    }

    viewContentTimerRef.current = window.setTimeout(() => {
      viewContentTimePassedRef.current = true
      maybeFireViewContent()
    }, VIEW_CONTENT_DELAY_MS)

    window.addEventListener('scroll', viewContentScrollHandlerRef.current, { passive: true })
    viewContentScrollHandlerRef.current()

    return () => {
      window.clearTimeout(viewContentTimerRef.current)
      window.removeEventListener('scroll', viewContentScrollHandlerRef.current)
    }
  }, [pathname])

  if (!PAGEVIEW_PIXEL_ID) return null

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        alt=""
        src={`https://www.facebook.com/tr?id=${PAGEVIEW_PIXEL_ID}&ev=PageView&noscript=1`}
      />
    </noscript>
  )
}

export default MetaPixelTracker
