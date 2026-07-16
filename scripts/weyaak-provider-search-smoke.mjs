import { spawn } from 'node:child_process';
import path from 'node:path';

if (process.env.VERCEL_ENV !== 'preview') {
  console.log('[Weyaak provider smoke] skipped outside Vercel Preview.');
  process.exit(0);
}

const port = 4001;
const baseUrl = `http://127.0.0.1:${port}`;
const nextBin = path.join(process.cwd(), 'node_modules', 'next', 'dist', 'bin', 'next');
const server = spawn(process.execPath, [nextBin, 'start', '-p', String(port)], {
  env: { ...process.env, PORT: String(port) },
  stdio: ['ignore', 'pipe', 'pipe'],
});

let output = '';
server.stdout.on('data', (chunk) => {
  output += chunk.toString();
  process.stdout.write(`[next-provider] ${chunk}`);
});
server.stderr.on('data', (chunk) => {
  output += chunk.toString();
  process.stderr.write(`[next-provider] ${chunk}`);
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForServer() {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) throw new Error(`Next exited early: ${server.exitCode}\n${output.slice(-2000)}`);
    try {
      const response = await fetch(`${baseUrl}/weyaak`);
      if (response.ok) return;
    } catch {
      // Still starting.
    }
    await sleep(700);
  }
  throw new Error('Timed out waiting for Weyaak provider smoke server.');
}

async function chat(message, history = [], state = {}) {
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, state, pagePath: '/weyaak' }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`API ${response.status}: ${JSON.stringify(data)}`);
  if (data.error_code) throw new Error(`Agent error: ${data.error_code}\n${JSON.stringify(data, null, 2)}`);
  return data;
}

function assert(condition, message, data) {
  if (!condition) throw new Error(`${message}\n${JSON.stringify(data, null, 2).slice(0, 5000)}`);
}

function hasArkleen(data) {
  return (data.links || []).some((link) => /providers\/arkleen/i.test(link.href || ''));
}

function providerTool(data) {
  return (data.tool_calls || []).find((call) => call.name === 'search_providers');
}

try {
  await waitForServer();

  const carpenter = await chat('أعطيني مزود خدمة نجار في العين');
  assert(carpenter.intent === 'provider_search', 'Carpenter request must use provider_search.', carpenter);
  assert(providerTool(carpenter)?.status === 'matched', 'Carpenter search must call the Supabase provider tool and match.', carpenter);
  assert(hasArkleen(carpenter), 'Carpenter request in Al Ain must return Arkleen from live Supabase data.', carpenter);
  assert(!/ميزانية|مقاسات/i.test(carpenter.reply), 'Provider search must not start a quotation questionnaire.', carpenter);

  const marble = await chat('أعطيني مزود رخام وجرانيت في العين');
  assert(marble.intent === 'provider_search', 'Marble request must use provider_search.', marble);
  assert(providerTool(marble)?.status === 'unmatched', 'Marble search must call the tool and return unmatched with current live data.', marble);
  assert(!hasArkleen(marble), 'A carpentry provider must never be returned for marble and granite.', marble);
  assert((marble.links || []).length === 0, 'Unmatched provider search must not invent provider links.', marble);

  const changed = await chat(
    'لا، قصدي رخام وجرانيت في العين',
    [
      { role: 'user', content: 'أعطيني مزود خدمة نجار في العين' },
      { role: 'assistant', content: carpenter.reply },
    ],
    carpenter.state,
  );
  assert(changed.intent === 'provider_search', 'Changing the requested trade must start a fresh provider search.', changed);
  assert(providerTool(changed)?.status === 'unmatched', 'Changed request must search the new specialty.', changed);
  assert(!hasArkleen(changed), 'The previous carpenter result must not leak into a marble search.', changed);

  const providerOwner = await chat('أنا صاحب شركة تنظيف وأريد أن يظهر نشاطي في المنصة');
  assert(providerOwner.audience === 'provider', 'A business owner must enter the provider onboarding flow.', providerOwner);
  assert(providerOwner.intent === 'provider_subscription', 'Business owner must not be treated as a customer provider search.', providerOwner);
  assert(!providerTool(providerOwner), 'Provider onboarding must not search for another provider.', providerOwner);

  const objection = await chat(
    'يا وكيل فهمتني غلط، أنا أبحث عن نجار في العين',
    [
      { role: 'user', content: 'أريد مزود' },
      { role: 'assistant', content: 'وضح لي الخدمة' },
    ],
    {},
  );
  assert(objection.intent === 'provider_search', 'User correction must be understood as a new provider request.', objection);
  assert(providerTool(objection)?.status === 'matched', 'Correction must trigger a fresh tool call.', objection);
  assert(hasArkleen(objection), 'Correction to carpenter in Al Ain must return Arkleen.', objection);
  assert(objection.intent !== 'out_of_scope', 'A user objection must never be classified out of scope.', objection);

  console.log('[Weyaak provider smoke] PASS: tool-call, strict-specialty, intent-switch, provider-owner, correction-recovery');
} finally {
  server.kill('SIGTERM');
  await Promise.race([new Promise((resolve) => server.once('exit', resolve)), sleep(3000)]);
  if (server.exitCode === null) server.kill('SIGKILL');
}
