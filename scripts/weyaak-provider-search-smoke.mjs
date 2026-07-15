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
  return data;
}

function assert(condition, message, data) {
  if (!condition) throw new Error(`${message}\n${JSON.stringify(data, null, 2).slice(0, 4000)}`);
}

function hasArkleen(data) {
  return (data.links || []).some((link) => /providers\/arkleen/i.test(link.href || ''));
}

try {
  await waitForServer();

  const staleState = {
    audience: 'customer',
    intent: 'quote_request',
    payload: {
      service_category: 'نجار',
      emirate: 'أبوظبي',
      city: 'العين',
      specifications: 'أعمال نجارة',
    },
  };

  const availability = await chat('فيه مزودين ام لا', [], staleState);
  assert(availability.intent === 'provider_search', 'Availability question must interrupt the quotation flow.', availability);
  assert(hasArkleen(availability), 'Availability search must return Arkleen from live Supabase data.', availability);
  assert(!/ميزانية|مقاسات/i.test(availability.reply), 'Provider search must not continue quotation questions.', availability);

  const directMessage = 'اعطيني مزود خدمة نجار في العين';
  const direct = await chat(directMessage, [], staleState);
  assert(direct.intent === 'provider_search', 'Direct provider request must use provider_search.', direct);
  assert(hasArkleen(direct), 'Direct carpenter request in Al Ain must return Arkleen.', direct);

  const complaint = await chat('انت مالك', [
    { role: 'user', content: directMessage },
    { role: 'assistant', content: 'هل عندك ميزانية؟' },
  ], direct.state || staleState);
  assert(complaint.intent !== 'out_of_scope', 'A user objection must never be classified out of scope.', complaint);
  assert(hasArkleen(complaint), 'After an objection, Weyaak must recover the previous provider request.', complaint);
  assert(/حقك علي/i.test(complaint.reply), 'Recovery reply must acknowledge the misunderstanding.', complaint);

  console.log('[Weyaak provider smoke] PASS: availability-interrupt, direct-provider-search, complaint-recovery');
} finally {
  server.kill('SIGTERM');
  await Promise.race([new Promise((resolve) => server.once('exit', resolve)), sleep(3000)]);
  if (server.exitCode === null) server.kill('SIGKILL');
}
