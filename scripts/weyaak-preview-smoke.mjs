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

async function chat(message, history = [], state = {}) {
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, state, pagePath: '/weyaak' }),
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

function createFlow() {
  return { history: [], state: {} };
}

async function step(flow, message) {
  const body = await chat(message, flow.history, flow.state);
  flow.history.push({ role: 'user', content: message });
  flow.history.push({ role: 'assistant', content: body.reply });
  flow.state = body.state || flow.state;
  return body;
}

function assert(condition, message, body) {
  if (!condition) {
    throw new Error(`[Weyaak smoke] ${message}\nResponse: ${JSON.stringify(body, null, 2).slice(0, 5000)}`);
  }
}

function hasWhatsApp(body) {
  return (body.links || []).some((link) => /wa\.me/i.test(link.href || ''));
}

try {
  await waitForServer();
  const tests = [];

  const legal = await chat('عندي سؤال عن مخالفة بناء');
  assert(legal.intent === 'legal', 'legal question must use legal intent', legal);
  assert(/إمارة/i.test(legal.reply), 'legal question must ask for the emirate first', legal);
  assert(!legal.intake && !hasWhatsApp(legal), 'legal gate must not open an intake or WhatsApp', legal);
  tests.push('legal-emirate-gate');

  const outside = await chat('من فاز في مباراة كرة القدم أمس؟');
  assert(outside.intent === 'out_of_scope', 'unrelated question must be classified out of scope', outside);
  assert(/تدريبي مخصص/i.test(outside.reply), 'out-of-scope reply must politely state the specialization', outside);
  assert(!outside.intake && (outside.links || []).length === 0, 'out-of-scope reply must not suggest links or forms', outside);
  tests.push('out-of-scope-boundary');

  const customer = createFlow();
  const c1 = await step(customer, 'أحتاج رخام وجرانيت للمطبخ');
  assert(c1.audience === 'customer', 'service request must be classified as customer', c1);
  assert(!c1.intake && !hasWhatsApp(c1), 'customer intake must not open before details are complete', c1);
  assert(/إمارة/i.test(c1.reply), 'after the service Weyaak should ask for the emirate', c1);

  const c2 = await step(customer, 'في العين');
  assert(!c2.intake && /مواصفات|خامة|النوع/i.test(c2.reply), 'after location Weyaak should ask for specifications', c2);

  const c3 = await step(customer, 'جرانيت أسود، توريد وتركيب لسطح المطبخ');
  assert(!c3.intake && /مقاس|مساحة/i.test(c3.reply), 'after specifications Weyaak should ask for measurements', c3);

  const c4 = await step(customer, 'حوالي أربعة متر طولي');
  assert(!c4.intake && /ميزانية/i.test(c4.reply), 'after measurements Weyaak should ask for budget', c4);

  const c5 = await step(customer, 'الميزانية غير محددة');
  assert(!c5.intake && /متى|موعد|التنفيذ/i.test(c5.reply), 'after budget Weyaak should ask for timing', c5);

  const c6 = await step(customer, 'خلال أسبوعين');
  assert(c6.intake?.type === 'quote_request', 'complete customer details must open the review card', c6);
  assert(!hasWhatsApp(c6), 'WhatsApp must stay hidden before Supabase registration', c6);
  assert(/أراجع لك بعض البيانات/i.test(c6.reply), 'completed request should show the human review phrase', c6);
  tests.push('guided-customer-intake');

  const provider = createFlow();
  const p1 = await step(provider, 'أنا صاحب شركة وأريد أن يظهر نشاطي في المنصة');
  assert(p1.audience === 'provider', 'business owner must be classified as provider', p1);
  assert(!p1.intake && !/(خصم|10\s*%|١٠\s*٪)/i.test(p1.reply), 'provider must get a brief greeting without an early discount', p1);
  assert(p1.reply.length < 420, 'provider greeting must stay brief', p1);

  await step(provider, 'اسم النشاط أركلين');
  await step(provider, 'نقدم المطابخ والأبواب والتصميم الداخلي');
  await step(provider, 'نخدم أبوظبي والعين ودبي');
  await step(provider, 'الرخصة سارية');
  const p6 = await step(provider, 'عندنا صور مشاريع جاهزة للنشر');
  assert(p6.intake?.type === 'provider_interest', 'complete provider details must open the provider review card', p6);
  assert(!hasWhatsApp(p6), 'provider WhatsApp must stay hidden before Supabase registration', p6);
  assert(!/(خصم|10\s*%|١٠\s*٪)/i.test(p6.reply), 'discount must remain hidden without annual confirmation', p6);

  const annual = await step(provider, 'أؤكد أني أريد الاشتراك السنوي');
  assert(annual.intake?.type === 'provider_interest', 'annual confirmation must keep provider intake ready', annual);
  assert(/خصم\s*10\s*%|10\s*%|١٠\s*٪/i.test(annual.reply), 'annual confirmation must receive the approved 10% gift', annual);
  tests.push('brief-provider-conversion');

  console.log(`[Weyaak smoke] PASS: ${tests.join(', ')}`);
} finally {
  server.kill('SIGTERM');
  await Promise.race([
    new Promise((resolve) => server.once('exit', resolve)),
    sleep(3000),
  ]);
  if (server.exitCode === null) server.kill('SIGKILL');
}
