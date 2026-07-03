import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['.loca.lt'],
  },
  preview: {
    host: true,
    allowedHosts: ['.loca.lt'],
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    svgr({
      svgrOptions: {
        replaceAttrValues: {
          '#0157FE': 'currentColor',
          '#000000': 'currentColor',
          '#000': 'currentColor',
          black: 'currentColor',
        },
      },
    }),
    // Dev-time API proxy: handle /api/validate-aba locally to avoid CORS issues
    {
      name: 'dev-api-validate-aba',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          try {
            if (!req.url) return next()
            const url = req.url.split('?')[0]
            if (url !== '/api/validate-aba') return next()

            const params = new URL(req.url, 'http://localhost')
            const routing = params.searchParams.get('routing') || ''
            if (!/^\d{9}$/.test(routing)) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false, message: 'Missing or invalid routing parameter' }))
              return
            }

            const validateUrl = `https://bankrouting.io/api/v1/aba/${routing}/validate`
            const lookupUrl = `https://bankrouting.io/api/v1/aba/${routing}`

            const [validateRes, lookupRes] = await Promise.all([
              fetch(validateUrl),
              fetch(lookupUrl),
            ])

            const validateJson = await validateRes.json().catch(() => null)
            const lookupJson = await lookupRes.json().catch(() => null)

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, validate: validateJson, lookup: lookupJson }))
            return
          } catch (err) {
            console.error('dev proxy error', err)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: false, message: 'Proxy error' }))
            return
          }
        })
      },
    },
  ],
})
