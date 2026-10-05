const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { AREAS, CATEGORY } = require('../data/localServices');
const { localPath } = require('../lib/localServices');
const base = 'http://127.0.0.1:3099';
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3099'], { env: process.env, stdio: ['ignore', 'ignore', 'pipe'] });
let serverErrors = ''; server.stderr.on('data', chunk => { serverErrors += chunk; });
(async () => {
  try {
    for (let attempt = 0; attempt < 40; attempt++) {
      try { if ((await fetch(base + '/uae/abu-dhabi/al-ain')).ok) break; } catch {}
      await new Promise(resolve => setTimeout(resolve, 250));
    }
    const checked = [];
    for (const locale of ['ar', 'en']) {
      const contexts = [{}, { category: CATEGORY.slug }, ...AREAS.flatMap(area => [{ area: area.slug }, { area: area.slug, category: CATEGORY.slug }])];
      for (const context of contexts) {
        const path = localPath({ locale, ...context });
        const response = await fetch(base + path); assert.equal(response.status, 200, path);
        const html = await response.text();
        assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, 'H1 ' + path);
        assert.ok(html.includes(`rel="canonical" href="https://bietalreef.ae${path}"`), 'canonical ' + path);
        assert.ok(html.includes('hrefLang="ar-AE"') || html.includes('hreflang="ar-AE"'));
        assert.ok(html.includes('hrefLang="en-AE"') || html.includes('hreflang="en-AE"'));
        assert.ok(html.includes(context.area ? 'noindex, follow' : 'index, follow'), 'quality ' + path);
        assert.ok(html.includes('/providers/alrehab-home-clean'), 'published provider ' + path);
        for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) {
          const schema = JSON.parse(match[1]); assert.ok(schema['@context'] || Array.isArray(schema));
          assert.ok(!match[1].includes('CleaningService') && !match[1].includes('PostalAddress'));
        }
        checked.push(path);
      }
      const path = `${locale === 'en' ? '/en' : ''}/providers/alrehab-home-clean`;
      const response = await fetch(base + path); assert.equal(response.status, 200);
      const html = await response.text(); assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
      assert.ok(!html.includes('"@type":"CleaningService"') && !html.includes('"@type":"PostalAddress"'));
      checked.push(path);
    }
    for (const path of ['/uae/abu-dhabi/al-ain/missing', '/en/uae/abu-dhabi/al-ain/missing', '/uae/abu-dhabi/al-ain/al-jimi/unknown', '/uae/abu-dhabi/al-ain/al-jimi/cleaning-services/missing']) assert.equal((await fetch(base + path)).status, 404, path);
    for (const locale of ['ar', 'en']) {
      const response = await fetch(base + `${locale === 'en' ? '/en' : ''}/uae/abu-dhabi/al-jimi`, { redirect: 'manual' });
      assert.equal(response.status, 308); assert.equal(response.headers.get('location'), localPath({ locale, area: 'al-jimi' }));
    }
    const sitemap = await (await fetch(base + '/sitemap.xml')).text();
    assert.ok(!sitemap.includes('<lastmod>undefined</lastmod>'));
    for (const locale of ['ar', 'en']) {
      assert.ok(sitemap.includes('https://bietalreef.ae' + localPath({ locale })));
      for (const area of AREAS) assert.ok(!sitemap.includes('https://bietalreef.ae' + localPath({ locale, area: area.slug })));
    }
    console.log(JSON.stringify({ routesChecked: checked.length, invalidRoutes: 4, redirects: 2, sitemap: 'pass', SSR: 'pass', checked }, null, 2));
  } finally { server.kill('SIGTERM'); }
})().catch(error => { console.error(error); console.error(serverErrors.slice(-1500)); process.exitCode = 1; });
