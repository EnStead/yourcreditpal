import { index, layout, route } from '@react-router/dev/routes'

export default [
  layout('routes/effects.jsx', [
    route('apply', 'routes/apply.jsx'),
    layout('routes/landing-layout.jsx', [
      index('routes/home.jsx'),
      route('faq', 'routes/faq.jsx'),
      route('blog', 'routes/blog.jsx'),
      route('blog/:slug', 'routes/blog.$slug.jsx'),
      route('legal/:slug', 'routes/legal.$slug.jsx'),
      route('unsubscribe', 'routes/unsubscribe.jsx'),
      route('thank-you', 'routes/thank-you.jsx'),
    ]),
  ]),
]
