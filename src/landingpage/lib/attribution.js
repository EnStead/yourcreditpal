// Mirrors the capture keys in the inline script in app/root.jsx (must match exactly).
export const ATTRIBUTION_STORAGE_KEY = 'ycp_attribution'

export const getAttribution = () => {
  if (typeof window === 'undefined') return {}

  try {
    return JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

// Written into hidden lead-payload fields at submission so UTM/click-id data survives all form steps.
export const buildAttributionFields = () => {
  const attribution = getAttribution()

  return {
    utm_source: attribution.utm_source || '',
    utm_medium: attribution.utm_medium || '',
    utm_campaign: attribution.utm_campaign || '',
    utm_content: attribution.utm_content || '',
    utm_term: attribution.utm_term || '',
    gclid: attribution.gclid || '',
    fbclid: attribution.fbclid || '',
    landing_url: attribution.landing_url || '',
  }
}
