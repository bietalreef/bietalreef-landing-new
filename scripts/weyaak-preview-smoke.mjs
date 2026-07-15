import { spawn } from 'node:child_process';
import path from 'node:path';

const isPreview = process.env.VERCEL_ENV === 'preview';

if (!isPreview) {
  console.log('[Weyaak smoke] skipped outside Vercel Preview.');
  process.exit(0);
}

const requiredEnv = [
  'OPENAI_API_KEY',
  process.env.SUPABASE_URL ? 'SUPABASE_URL' : 'NEXT_PUBLIC_SUPABASE_URL',
];

for (const key of requiredEnv) {
  if (!key || !process.env[key]) {
    throw new Error(`[Weyaak smoke] missing required environment variable: ${key || 'SUPABASE_URL'}`);
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

async function waitForServer() {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`[Weyaak smoke] Next server exited early (${server.exitCode}).\n${serverOutput.slice(-3000)}`);
    }
    try {
      const response = await fetch(`${baseUrl}/weyaak`, { redirect: 'manual' });
      if (response.status >= 200 && response.status < 500) return;
    } catch {
      // Server is still starting.
    }
    await sleep(750);
  }
  throw new Error('[Weyaak smoke] timed out waiting for Next server.');
}

async function chat(message, history = []) {
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, pagePath: '/weyaak' }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`[Weyaak smoke] API ${response.status}: ${JSON.stringify(body).slice(0, 1200)}`);
  }
  if (!body.reply || typeof body.reply !== 'string') {
    throw new Error(`[Weyaak smoke] missing reply: ${JSON.stringify(body).slice(0, 1200)}`);
  }
  return body;
}

function assert(condition, message, body) {
  if (!condition) {
    throw new Error(`[Weyaak smoke] ${message}\nResponse: ${JSON.stringify(body, null, 2).slice(0, 4000)}`);
  }
}

function hasForbiddenNoProvider(reply) {
  return /(لا يوجد|لا تتوفر|لم نجد|ما عندنا).{0,30}(مزود|مقدم خدمة|شركة)/i.test(reply || '');
}

try {
  await waitForServer();

  const tests = [];

  const legal = await chat('عندي سؤال قانوني عن تصريح بناء');
  assert(legal.intent === 'legal', 'legal question must use legal intent', legal);
  assert(/إمارة/i.test(legal.reply), 'legal question without an emirate must ask for the emirate', legal);
  assert(!Array.isArray(legal.links) || legal.links.length === 0, 'legal question without emirate must not return sources', legal);
  tests.push('legal-emirate-gate');

  const tender = await chat('عندي مناقصة تشطيب في دبي وأريد تسجيلها داخل بيت الريف');
  assert(tender.intake?.type === 'quote_request', 'tender must open a quote/tender intake', tender);
  assert(/مناقص|طلبات المشاريع/i.test(tender.reply) && /بيت الريف/i.test(tender.reply), 'tender reply must explain Biet Al Reef flow', tender);
  tests.push('tender-intake');

  const unmatched = await chat('أحتاج صيانة مصاعد في أم القيوين ولا أرى مزوداً مناسباً');
  assert(unmatched.intake?.type === 'quote_request', 'unmatched service must open a structured request intake', unmatched);
  assert(!hasForbiddenNoProvider(unmatched.reply), 'unmatched service must not tell the client there are no providers', unmatched);
  assert(/بيت الريف|فريق/i.test(unmatched.reply), 'unmatched service must present Biet Al Reef as the partner', unmatched);
  tests.push('unmatched-service-partner-flow');

  const provider = await chat('أنا مزود خدمات صيانة وأريد أعرف مميزات الانضمام إلى المنصة');
  assert(provider.audience === 'provider', 'provider inquiry must be classified as provider', provider);
  assert(!/(خصم|10\s*%|١٠\s*٪)/i.test(provider.reply), '10% annual discount must stay hidden before explicit annual intent', provider);
  assert(provider.intake?.type === 'provider_interest', 'provider inquiry must offer provider-interest intake', provider);
  tests.push('provider-conversion-no-early-discount');

  const annual = await chat('أنا مزود خدمة وأؤكد أني جاهز للاشتراك السنوي وأريد تسجيل نشاطي الآن');
  assert(annual.audience === 'provider', 'annual subscription intent must be classified as provider', annual);
  assert(annual.intake?.type === 'provider_interest', 'annual subscription intent must open provider intake', annual);
  assert(/خصم\s*10\s*%|10\s*%|١٠\s*٪/i.test(annual.reply), 'explicit annual intent must receive the approved 10% gift', annual);
  tests.push('provider-annual-discount-gate');

  const knownProvider = await chat('أنا عميل وأبحث عن مزود مطابخ خشبية في العين');
  assert(knownProvider.audience === 'customer', 'client provider search must be classified as customer', knownProvider);
  assert(knownProvider.live_data === true, 'client provider search must confirm live Supabase configuration', knownProvider);
  assert(!hasForbiddenNoProvider(knownProvider.reply), 'client provider search must not use the forbidden no-provider phrase', knownProvider);
  tests.push('live-provider-search');

  console.log(`[Weyaak smoke] PASS: ${tests.join(', ')}`);
} finally {
  server.kill('SIGTERM');
  await Promise.race([
    new Promise((resolve) => server.once('exit', resolve)),
    sleep(3000),
  ]);
  if (server.exitCode === null) server.kill('SIGKILL');
}
