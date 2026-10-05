// Run against a Next production server. Requires Playwright in NODE_PATH or node_modules.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { AREAS, CATEGORY } = require('../data/localServices');
const { localPath } = require('../lib/localServices');
const base = process.env.LOCAL_SEO_BASE_URL || 'http://127.0.0.1:3099';
const local = (locale, context = {}) => localPath({ locale, ...context });
const server = process.env.LOCAL_SEO_START === '1' ? spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3099'], { env: process.env, stdio: 'ignore' }) : null;
(async () => {
  if (server) for (let attempt = 0; attempt < 40; attempt++) {
    try { if ((await fetch(base + '/uae/abu-dhabi/al-ain')).ok) break; } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const context = await browser.newContext();
  const checks = [];
  try {
    for (const locale of ['ar', 'en']) {
      const paths = [local(locale), local(locale, { category: CATEGORY.slug }), ...AREAS.flatMap(area => [local(locale, { area: area.slug }), local(locale, { area: area.slug, category: CATEGORY.slug })])];
      for (const path of paths) {
        const response = await context.request.get(base + path);
        assert.equal(response.status(), 200, path);
        const html = await response.text();
        assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, 'single H1: ' + path);
        assert.ok(html.includes(`rel="canonical" href="https://bietalreef.ae${path}"`), 'canonical: ' + path);
        assert.ok(html.includes('hrefLang="ar-AE"') || html.includes('hreflang="ar-AE"'), path);
        assert.ok(html.includes('hrefLang="en-AE"') || html.includes('hreflang="en-AE"'), path);
        assert.ok(html.includes('alrehab-home-clean'), 'provider visible in SSR: ' + path);
        const district = AREAS.find(area => path.includes('/' + area.slug));
        assert.ok(html.includes(district ? 'noindex, follow' : 'index, follow'), 'quality gate: ' + path);
        for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) {
          const schema = JSON.parse(match[1]);
          assert.ok(schema['@context'] || Array.isArray(schema));
          assert.ok(!match[1].includes('CleaningService') && !match[1].includes('PostalAddress'), 'schema misuse: ' + path);
        }
        checks.push({ path, status: response.status(), indexable: !district });
      }
      const providerPath = `${locale === 'en' ? '/en' : ''}/providers/alrehab-home-clean`;
      const response = await context.request.get(base + providerPath);
      assert.equal(response.status(), 200);
      const html = await response.text();
      assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
      assert.ok(html.includes('https://bietalreef.ae/providers/alrehab-home-clean#provider'));
      assert.ok(!html.includes('"@type":"CleaningService"') && !html.includes('"@type":"PostalAddress"'));
      assert.ok(html.includes('hrefLang="en-AE"') || html.includes('hreflang="en-AE"'));
      checks.push({ path: providerPath, status: response.status() });
    }
    for (const path of ['/uae/abu-dhabi/al-ain/missing', '/en/uae/abu-dhabi/al-ain/missing', '/uae/abu-dhabi/al-ain/al-jimi/unknown', '/uae/abu-dhabi/al-ain/al-jimi/cleaning-services/missing']) {
      assert.equal((await context.request.get(base + path)).status(), 404, path);
    }
    for (const locale of ['ar', 'en']) {
      const old = `${locale === 'en' ? '/en' : ''}/uae/abu-dhabi/al-jimi`;
      const response = await context.request.get(base + old, { maxRedirects: 0 });
      assert.equal(response.status(), 308); assert.equal(response.headers().location, local(locale, { area: 'al-jimi' }));
    }
    const sitemap = await (await context.request.get(base + '/sitemap.xml')).text();
    for (const locale of ['ar', 'en']) {
      assert.ok(sitemap.includes('https://bietalreef.ae' + local(locale)));
      assert.ok(sitemap.includes('https://bietalreef.ae' + local(locale, { category: CATEGORY.slug })));
      for (const area of AREAS) assert.ok(!sitemap.includes('https://bietalreef.ae' + local(locale, { area: area.slug })), 'noindex excluded');
    }
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const events = [];
    await page.route('**/api/analytics-event', async route => { events.push(route.request().postDataJSON()); await route.fulfill({ json: { ok: true } }); });
    // Block external Google transmissions while checking Consent Mode and event calls.
    await page.route('https://www.googletagmanager.com/**', route => route.fulfill({ body: '', contentType: 'application/javascript' }));
    await page.addInitScript(() => { localStorage.setItem('bietalreef.privacy.v1', JSON.stringify({ analytics: 'accepted', functional: true })); });
    for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
      await page.setViewportSize(viewport);
      await page.goto(base + local('ar', { area: 'al-jimi', category: CATEGORY.slug }), { waitUntil: 'networkidle' });
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'horizontal overflow');
      assert.equal(await page.locator('[data-nextjs-dialog]').count(), 0);
      const links = await page.locator('main a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')).filter(href => href?.startsWith('/')));
      for (const href of [...new Set(links)]) {
        const response = await context.request.get(base + href.split('#')[0]);
        assert.equal(response.status(), 200, 'broken link: ' + href);
      }
      await page.screenshot({ path: `/tmp/local-seo-${viewport.width}.png`, fullPage: true });
    }
    await page.evaluate(() => { document.addEventListener('click', event => { if (event.target.closest('main a')) event.preventDefault(); }, { capture: true }); });
    for (const selector of ['main a[href^="tel:"]', 'main a[href^="https://wa.me/"]', 'main a[href^="https://share.google/"]', 'main a[href^="/request-quote?"]', 'main a[href="/providers/alrehab-home-clean"]']) await page.locator(selector).first().click();
    await page.waitForTimeout(300);
    assert.ok(events.some(event => event.metadata?.local_event === 'area_page_view'));
    assert.ok(events.some(event => event.metadata?.local_event === 'phone_click'));
    assert.ok(events.some(event => event.metadata?.local_event === 'provider_area_conversion'));
    const googleEvents = await page.evaluate(() => window.dataLayer?.filter(item => item[0] === 'event').map(item => item[1]) || []);
    for (const name of ['area_page_view', 'provider_view_from_area', 'phone_click', 'whatsapp_click', 'request_quote', 'map_click', 'provider_area_conversion']) assert.ok(googleEvents.includes(name), name);
    assert.equal(googleEvents.filter(name => name === 'phone_click').length, 1, 'no duplicate phone event');
    await page.evaluate(() => { localStorage.setItem('bietalreef.privacy.v1', JSON.stringify({ analytics: 'rejected' })); });
    const prior = events.length;
    await page.evaluate(() => { document.querySelector('main a[href^="tel:"]').click(); });
    await page.waitForTimeout(100); assert.equal(events.length, prior, 'rejected analytics consent respected');
    assert.deepEqual(errors, [], 'application console errors');
    console.log(JSON.stringify({ routesChecked: checks.length, invalidRoutes: 4, redirects: 2, mobile: 'pass', desktop: 'pass', internalLinks: 'pass', analytics: 'pass', consent: 'pass', applicationErrors: errors, checks }, null, 2));
  } finally { await browser.close(); server?.kill('SIGTERM'); }
})().catch(error => { console.error(error); server?.kill('SIGTERM'); process.exit(1); });
