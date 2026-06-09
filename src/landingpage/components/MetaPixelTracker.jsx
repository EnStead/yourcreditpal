import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const PAGEVIEW_PIXEL_ID = '1160272862878464'
const VIEW_CONTENT_PIXEL_ID = '1689157452266597'
const VIEW_CONTENT_DELAY_MS = 5000
const VIEW_CONTENT_SCROLL_THRESHOLD = 0.35

const loadMetaPixel = () => {
  if (!PAGEVIEW_PIXEL_ID || typeof window === 'undefined') return
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

  window.fbq('init', PAGEVIEW_PIXEL_ID)
}

const MetaPixelTracker = () => {
  const { pathname } = useLocation()
  const lastTrackedPathRef = useRef('')
  const viewContentFiredRef = useRef(false)
  const viewContentTimerRef = useRef(null)
  const viewContentScrollHandlerRef = useRef(null)

  const fireViewContent = () => {
    if (viewContentFiredRef.current || typeof window === 'undefined') return
    viewContentFiredRef.current = true
    window.removeEventListener('scroll', viewContentScrollHandlerRef.current)
    window.clearTimeout(viewContentTimerRef.current)
    window.fbq?.('trackSingle', VIEW_CONTENT_PIXEL_ID, 'ViewContent')
  }

  useEffect(() => {
    if (!PAGEVIEW_PIXEL_ID || typeof window === 'undefined') return

    loadMetaPixel()

    if (window.__ycpMetaPixelLastPath === pathname || lastTrackedPathRef.current === pathname) return
    window.__ycpMetaPixelLastPath = pathname
    lastTrackedPathRef.current = pathname

    window.fbq?.('track', 'PageView')

    viewContentFiredRef.current = false
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
        fireViewContent()
      }
    }

    viewContentTimerRef.current = window.setTimeout(() => {
      fireViewContent()
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
