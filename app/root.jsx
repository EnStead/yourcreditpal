import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { buildMeta, SITE_NAME, SITE_URL } from './lib/seo'
import '../src/index.css'
import MetaPixelTracker from '../src/landingpage/components/MetaPixelTracker'
import CookieConsentBanner from '../src/landingpage/components/CookieConsentBanner'

export const links = () => [
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  { rel: 'icon', type: 'image/png', href: '/favicon-32.png', sizes: '32x32' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/site.webmanifest' },
]

export const meta = () => buildMeta()

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
}

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
}

const GTM_ID = import.meta.env.VITE_GTM_CONTAINER_ID

// Must run before the GTM tag: seeds Consent Mode defaults from the existing consent cookie and
// captures UTM/click-ids into sessionStorage. Keys here must match CookieConsentBanner's
// CONSENT_KEY and attribution.js's ATTRIBUTION_STORAGE_KEY — this is plain inline JS, not a module.
const earlyCaptureScript = `(function(){
  try {
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = window.gtag || gtag;

    var consentMatch = document.cookie.match(/(?:^|; )ycp_cookie_consent=([^;]*)/);
    var consentValue = consentMatch ? decodeURIComponent(consentMatch[1]) : null;
    var granted = consentValue === 'accepted' ? 'granted' : 'denied';
    gtag('consent', 'default', {
      ad_storage: granted,
      analytics_storage: granted,
      ad_user_data: granted,
      ad_personalization: granted,
    });

    var params = new URLSearchParams(window.location.search);
    var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];
    var stored = {};
    try { stored = JSON.parse(sessionStorage.getItem('ycp_attribution') || '{}'); } catch (e) {}
    var hasNewParam = false;
    keys.forEach(function (key) {
      var value = params.get(key);
      if (value) { stored[key] = value; hasNewParam = true; }
    });
    if (!stored.landing_url) stored.landing_url = window.location.href;
    if (hasNewParam || !sessionStorage.getItem('ycp_attribution')) {
      sessionStorage.setItem('ycp_attribution', JSON.stringify(stored));
    }
  } catch (e) {}
})();`

const gtmBootstrapScript = GTM_ID
  ? `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`
  : null

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0157FE" />
        <Meta />
        <Links />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
        <script dangerouslySetInnerHTML={{ __html: earlyCaptureScript }} />
        {gtmBootstrapScript ? <script dangerouslySetInnerHTML={{ __html: gtmBootstrapScript }} /> : null}
      </head>
      <body>
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
        {children}
        <MetaPixelTracker />
        <CookieConsentBanner />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return <Outlet />
}
