import { spawn } from 'node:child_process';
import path from 'node:path';

if (process.env.VERCEL_ENV !== 'preview') {
  console.log('[Postbuild smoke] skipped outside Vercel Preview.');
  process.exit(0);
}

const requiredEnv = [
  process.env.SUPABASE_URL ? 'SUPABASE_URL' : 'NEXT_PUBLIC_SUPABASE_URL',
];

for (const key of requiredEnv) {
  if (!key || !process.env[key]) {
    throw new Error(`[Postbuild smoke] missing required environment variable: ${key || 'SUPABASE_URL'}`);
  }
}

const port = 3999;
const baseUrl = `http://127.0.0.1:${port}`;
const nextBin = path.join(process.cwd(), 'node_modules', 'next', 'dist', 'bin', 'next');
const server = spawn(process.execPath, [nextBin, 'start', '-p', String(port)], {
  env: { ...process.env, PORT: String(port) },
  stdio: ['ignore', 'pipe', 'pipe'],
});

let serverOutput = '';
server.stdout.on('data', (chunk) => {
  const value = chunk.toString();
  serverOutput += value;
  process.stdout.write(`[next] ${value}`);
});
server.stderr.on('data', (chunk) => {
  const value = chunk.toString();
  serverOutput += value;
  process.stderr.write(`[next] ${value}`);
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function assert(condition, message, context = '') {
  if (!condition) {
    throw new Error(`[Postbuild smoke] ${message}${context ? `\n${String(context).slice(0, 3000)}` : ''}`);
  }
}

async function waitForServer() {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`[Postbuild smoke] Next server exited early (${server.exitCode}).\n${serverOutput.slice(-3000)}`);
    }
    try {
      const response = await fetch(`${baseUrl}/products/arkleen/custom-wooden-kitchen`);
      if (response.ok) return;
    } catch {
      // Server is still starting.
    }
    await sleep(500);
  }
  throw new Error('[Postbuild smoke] timed out waiting for Next server.');
}

async function fetchText(pagePath) {
  const response = await fetch(`${baseUrl}${pagePath}`);
  const body = await response.text();
  assert(response.ok, `${pagePath} returned ${response.status}`, body);
  return body;
}

async function chat(message) {
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history: [], state: {}, pagePath: '/weyaak' }),
  });
  const body = await response.json().catch(() => ({}));
  assert(response.ok, `Weyaak API returned ${response.status}`, JSON.stringify(body));
  return body;
}

const productPages = [
  ['/products/arkleen/custom-wooden-kitchen', '980'],
  ['/products/arkleen/custom-wooden-wardrobe', '2500'],
  ['/products/arkleen/custom-wooden-door', '800'],
  ['/en/products/arkleen/custom-wooden-kitchen', '980'],
  ['/en/products/arkleen/custom-wooden-wardrobe', '2500'],
  ['/en/products/arkleen/custom-wooden-door', '800'],
];

try {
  await waitForServer();

  for (const [pagePath, price] of productPages) {
    const html = await fetchText(pagePath);
    const canonical = `https://bietalreef.ae${pagePath}`;
    const productEntities = html.match(/"@type":"Product"/g) || [];
    assert(productEntities.length === 1, `${pagePath} must contain exactly one Product entity`, html);
    assert(html.includes(`rel="canonical" href="${canonical}"`), `${pagePath} must have its own canonical URL`, html);
    assert(html.includes(`"price":"${price}"`), `${pagePath} must expose the matching product price`, html);
    assert(html.includes('https://schema.org/InStock'), `${pagePath} must expose InStock availability`, html);
    assert(!html.includes('https://schema.org/PreOrder'), `${pagePath} must not expose PreOrder`, html);
    assert(html.includes('OfferShippingDetails'), `${pagePath} must expose shipping details`, html);
    assert(html.includes('MerchantReturnNotPermitted'), `${pagePath} must expose the made-to-order return policy`, html);
  }

  for (const pagePath of ['/marketplace/furniture-decor', '/en/marketplace/furniture-decor']) {
    const html = await fetchText(pagePath);
    assert(!(html.match(/"@type":"Product"/g) || []).length, `${pagePath} must remain a product list, not a single-product page`, html);
    assert(!html.includes('https://schema.org/PreOrder'), `${pagePath} must not expose the legacy PreOrder value`, html);
    assert(html.includes('/products/arkleen/custom-wooden-kitchen'), `${pagePath} must link to the dedicated product page`, html);
  }

  const sitemap = await fetchText('/sitemap.xml');
  for (const [pagePath] of productPages) {
    assert(sitemap.includes(`<loc>https://bietalreef.ae${pagePath}</loc>`), `sitemap is missing ${pagePath}`, sitemap);
  }

  const directorySearch = await chat('اعرض مزودي الخدمات في العين');
  assert(directorySearch.intent === 'provider_search', 'generic directory search must use provider_search', JSON.stringify(directorySearch));
  assert(directorySearch.match_status === 'matched', 'generic directory search must return live Supabase matches', JSON.stringify(directorySearch));
  assert(
    (directorySearch.tool_calls || []).some((call) => call.name === 'search_providers_by_location' && call.status === 'matched'),
    'generic directory search must use the deterministic Supabase location tool',
    JSON.stringify(directorySearch),
  );

  console.log('[Postbuild smoke] PASS: dedicated-products, product-schema, canonical-links, sitemap, live-directory-data');
} finally {
  server.kill('SIGTERM');
  await Promise.race([
    new Promise((resolve) => server.once('exit', resolve)),
    sleep(3000),
  ]);
  if (server.exitCode === null) server.kill('SIGKILL');
}
