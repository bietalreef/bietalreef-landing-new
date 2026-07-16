import { spawn } from 'node:child_process';
import path from 'node:path';

if (process.env.VERCEL_ENV !== 'preview') {
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

async function chat(message, history = [], state = {}) {
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, state, pagePath: '/weyaak' }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`[Weyaak smoke] API ${response.status}: ${JSON.stringify(body).slice(0, 1200)}`);
  if (!body.reply || typeof body.reply !== 'string') throw new Error(`[Weyaak smoke] missing reply: ${JSON.stringify(body).slice(0, 1200)}`);
  if (body.error_code) throw new Error(`[Weyaak smoke] agent error: ${body.error_code}\n${JSON.stringify(body).slice(0, 2000)}`);
  return body;
}

function assert(condition, message, body) {
  if (!condition) throw new Error(`[Weyaak smoke] ${message}\nResponse: ${JSON.stringify(body, null, 2).slice(0, 5000)}`);
}

function hasLink(body, pattern) {
  return (body.links || []).some((link) => pattern.test(link.href || ''));
}

function hasWhatsApp(body) {
  return hasLink(body, /wa\.me/i);
}

try {
  await waitForServer();
  const tests = [];

  const platform = await chat('كيف تعمل منصة بيت الريف؟');
  assert(platform.intent === 'platform_info', 'platform question must use platform_info intent', platform);
  assert(hasLink(platform, /\/how-it-works$/), 'platform answer must provide the official how-it-works link', platform);
  assert(!hasWhatsApp(platform), 'platform information must not expose WhatsApp', platform);
  tests.push('platform-knowledge-links');

  const legal = await chat('عندي سؤال عن اشتراطات بناء');
  assert(['legal', 'inquiry'].includes(legal.intent), 'municipal question must enter a legal or inquiry flow', legal);
  assert(/إمارة|امارة|وين|أين/i.test(legal.reply), 'municipal question must ask for the emirate first', legal);
  assert(hasLink(legal, /u\.ae|dmt\.gov\.ae|tamm\.abudhabi|dm\.gov\.ae|dubai\.ae|shjmun\.gov\.ae/i), 'municipal answer must use an official government source', legal);
  assert(!legal.intake && !hasWhatsApp(legal), 'municipal gate must not open an intake or WhatsApp', legal);
  tests.push('legal-emirate-gate');

  const outside = await chat('من فاز في مباراة كرة القدم أمس؟');
  assert(outside.intent === 'out_of_scope', 'unrelated question must be classified out of scope', outside);
  assert(!outside.intake && (outside.links || []).length === 0, 'out-of-scope reply must not suggest links or forms', outside);
  tests.push('out-of-scope-boundary');

  const customer = await chat('أريد تسجيل طلب عرض سعر لرخام وجرانيت في العين، جرانيت أسود توريد وتركيب لسطح مطبخ بطول أربعة أمتار، الميزانية غير محددة والتنفيذ خلال أسبوعين.');
  assert(customer.audience === 'customer', 'complete service request must be classified as customer', customer);
  if (customer.match_status === 'matched') {
    assert(hasLink(customer, /providers\/al-hoot-marble-granite-factory/i), 'matched marble request must identify White Whale before review', customer);
    const asksForProviderConfirmation = /تأكيد|تأكيدك|مزود/i.test(customer.reply);
    // The live model may phrase the next step as confirmation or as a
    // clarification. The structured quote intake is the stable contract;
    // exact Arabic wording is intentionally not used as a deployment gate.
    const asksForRequiredClarification = customer.intake?.type === 'quote_request';
    assert(
      asksForProviderConfirmation || asksForRequiredClarification,
      'matched request must ask for provider confirmation or a required quote clarification',
      customer,
    );
  } else {
    assert(customer.intake?.type === 'quote_request', 'unmatched complete customer details must open the review card', customer);
  }
  assert(!hasWhatsApp(customer), 'customer review must not expose WhatsApp', customer);
  tests.push('customer-provider-match-or-review');

  const providerMessage = 'أنا صاحب شركة اسمها النخبة للتنظيف، تخصصنا تنظيف وتعقيم الخزانات والكنب والسجاد، نخدم العين وأبوظبي، الرخصة سارية وعندنا صور أعمال جاهزة.';
  const provider = await chat(providerMessage);
  assert(provider.audience === 'provider', 'business owner must be classified as provider', provider);
  assert(provider.intent === 'provider_subscription', 'business owner must use provider subscription flow', provider);
  assert(!hasWhatsApp(provider), 'provider flow must not expose WhatsApp', provider);
  assert(!/(خصم|10\s*%|١٠\s*٪)/i.test(provider.reply), 'stage one must not mention discounts', provider);

  let providerReview = provider;
  if (providerReview.intake?.type !== 'provider_interest') {
    providerReview = await chat(
      'نخدم العين ومدينة أبوظبي فقط، والبيانات جاهزة للمراجعة.',
      [
        { role: 'user', content: providerMessage },
        { role: 'assistant', content: provider.reply },
      ],
      provider.state,
    );
  }

  assert(providerReview.intake?.type === 'provider_interest', 'provider details must open the review card after at most one clarification', providerReview);
  assert(!hasWhatsApp(providerReview), 'provider review must not expose WhatsApp', providerReview);
  tests.push('provider-review-ready');

  assert(customer.model === 'gpt-5-mini' || Boolean(process.env.WEYAAK_MODEL), 'Weyaak must use the configured modern model', customer);
  assert(customer.version === 'weyaak-agent-v5-stage1', 'Weyaak must use the stage-one Responses API version', customer);
  tests.push('responses-api-stage1');

  console.log(`[Weyaak smoke] PASS: ${tests.join(', ')}`);
} finally {
  server.kill('SIGTERM');
  await Promise.race([new Promise((resolve) => server.once('exit', resolve)), sleep(3000)]);
  if (server.exitCode === null) server.kill('SIGKILL');
}
