import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import ts from 'typescript'

// Reuse the route catalog and translated metadata used by the React pages.
async function loadSource(path) {
  const source = await readFile(new URL(path, import.meta.url), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  })
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
}
const [{ SITE, ROUTES }, { it }, { en }] = await Promise.all([
  loadSource('../src/content/site.ts'),
  loadSource('../src/i18n/it.ts'),
  loadSource('../src/i18n/en.ts'),
])
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const template = await readFile('dist/index.html', 'utf8')
const entries = []
for (const [locale, dictionary] of Object.entries({ it, en })) {
  for (const [key, route] of Object.entries(ROUTES)) {
    const italian = `${SITE.domain}${route}`
    const english = `${SITE.domain}/en${route === '/' ? '' : route}`
    const path = locale === 'it' ? route : `/en${route === '/' ? '' : route}`
    const canonical = locale === 'it' ? italian : english
    const { metaTitle, metaDesc } = dictionary[key === 'diventaSocio' ? 'socio' : key]
    const alternates = [['it', italian], ['en', english], ['x-default', italian]]
    const links = [
      `<link rel="canonical" href="${canonical}" />`,
      ...alternates.map(([lang, url]) => `<link rel="alternate" hreflang="${lang}" href="${url}" />`),
    ].join('\n    ')
    const html = template
      .replace('<html lang="it">', `<html lang="${locale}">`)
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(metaTitle)}</title>`)
      .replace(/(<meta\s+name="description"\s+content=")[^"]*("\s*\/?>)/, (_, before, after) => `${before}${escape(metaDesc)}${after}`)
      .replace(/(<meta property="og:url" content=")[^"]*("\s*\/?>)/, (_, before, after) => `${before}${canonical}${after}`)
      .replace(/(<meta property="og:title" content=")[^"]*("\s*\/?>)/, (_, before, after) => `${before}${escape(metaTitle)}${after}`)
      .replace(/(<meta\s+property="og:description"\s+content=")[^"]*("\s*\/?>)/, (_, before, after) => `${before}${escape(metaDesc)}${after}`)
      .replace('</head>', `    ${links}\n  </head>`)
    const output = resolve('dist', `.${path}`, 'index.html')
    await mkdir(dirname(output), { recursive: true })
    await writeFile(output, html)
    entries.push(`  <url>\n    <loc>${canonical}</loc>\n${alternates.map(([lang, url]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}"/>`).join('\n')}\n  </url>`)
  }
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`)
console.log(`Generated ${entries.length} localized HTML heads and reciprocal sitemap entries.`)
