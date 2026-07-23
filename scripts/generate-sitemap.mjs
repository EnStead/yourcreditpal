import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

const SITE_URL = (process.env.VITE_SITE_URL || 'https://yourcreditpal.com').replace(/\/$/, '')
const CLIENT_DIR = join(process.cwd(), 'build', 'client')

// Prerendered routes we do not want indexed.
const EXCLUDE = new Set(['/unsubscribe'])

const CREDITS = `<!--
  YourCreditPal — built by Bami & Anjola
  Design & Development: Bami   (DesignedbyBami)  https://github.com/designedbybami
  Development:          Anjola (Anjyfade)        https://github.com/anjyfade1
-->`

async function htmlRoutes(dir) {
  const routes = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'assets') continue
      routes.push(...(await htmlRoutes(full)))
    } else if (entry.name === 'index.html') {
      const rel = relative(CLIENT_DIR, full).replace(/\\/g, '/').replace(/index\.html$/, '')
      routes.push('/' + rel.replace(/\/$/, ''))
    }
  }
  return routes
}

async function injectCredits(dir) {
  let count = 0
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'assets') continue
      count += await injectCredits(full)
    } else if (entry.name.endsWith('.html')) {
      const html = await readFile(full, 'utf8')
      if (html.includes('built by Bami & Anjola')) continue
      await writeFile(full, html.replace(/<head>/i, `<head>\n${CREDITS}`))
      count += 1
    }
  }
  return count
}

const routes = (await htmlRoutes(CLIENT_DIR))
  .map((r) => (r === '' ? '/' : r))
  .filter((r) => !EXCLUDE.has(r))
  .sort()

const today = new Date().toISOString().slice(0, 10)
const urls = routes
  .map((r) => `  <url>\n    <loc>${SITE_URL}${r === '/' ? '' : r}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
const robots = `User-agent: *\nAllow: /\nDisallow: /apply\n\nSitemap: ${SITE_URL}/sitemap.xml\n`

await writeFile(join(CLIENT_DIR, 'sitemap.xml'), sitemap)
await writeFile(join(CLIENT_DIR, 'robots.txt'), robots)

const credited = await injectCredits(CLIENT_DIR)

console.log(`[sitemap] wrote ${routes.length} urls -> build/client/sitemap.xml + robots.txt`)
console.log(`[credits] injected author comment into ${credited} html files`)
