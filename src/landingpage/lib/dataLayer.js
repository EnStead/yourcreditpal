export const pushToDataLayer = (event, payload = {}) => {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...payload })
}
