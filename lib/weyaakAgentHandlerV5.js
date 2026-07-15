import { buildWeyaakV5Prompt } from './weyaakAgentV5Prompt';
import { WEYAAK_OUTPUT_FORMAT, WEYAAK_TOOLS } from './weyaakAgentV5Schema';
import {
  CUSTOMER_FIELDS,
  PROVIDER_FIELDS,
  buildIntake,
  firstMissing,
  governmentSources,
  loadAnnualOffer,
  mergePayload,
  normalizePayload,
  requiredForSubmission,
  searchProviders,
  submitAction,
} from './weyaakDataV5';

const MODEL = process.env.WEYAAK_MODEL || 'gpt-5-mini';
const REASONING_EFFORT = process.env.WEYAAK_REASONING_EFFORT || 'low';
const VERSION = 'weyaak-agent-v5-responses';
const MAX_ROUNDS = 3;

const txt = (value, max = 2000) => typeof value === 'string' ? value.trim().slice(0, max) : '';

function historyOf(value) {
  return Array.isArray(value)
    ? value.filter((item) => item && ['user', 'assistant'].includes(item.role) && typeof item.content === 'string')
      .slice(-18).map((item) => ({ role: item.role, content: item.content.trim().slice(0, 2400) })).filter((item) => item.content)
    : [];
}

function emirateKey(value) {
  if (/(أبو\s*ظبي|ابو\s*ظبي|العين|الظفرة|abu\s*dhabi|al\s*ain)/i.test(value)) return 'abu_dhabi';
  if (/(دبي|dubai)/i.test(value)) return 'dubai';
  if (/(الشارقة|شارقة|sharjah)/i.test(value)) return 'sharjah';
  if (/(عجمان|ajman)/i.test(value)) return 'ajman';
  if (/(أم\s*القيوين|ام\s*القيوين|umm\s*al\s*quwain)/i.test(value)) return 'umm_al_quwain';
  if (/(رأس\s*الخيمة|راس\s*الخيمة|ras\s*al\s*khaimah)/i.test(value)) return 'ras_al_khaimah';
  if (/(الفجيرة|فجيرة|fujairah)/i.test(value)) return 'fujairah';
  return '';
}

const annualConfirmed = (value) => /(أؤكد|اؤكد|موافق|جاهز|أريد|اريد|ابغى|أبغى|سأشترك|باشترك).{0,40}(سنوي|السنوية|annual)|(سنوي|السنوية|annual).{0,40}(موافق|جاهز|أريد|اريد|ابغى|أبغى|اشترك)/i.test(value);
const sensitiveLegal = (value) => /(نزاع|محكمة|قضية|شكوى|مخالفة|غرامة|عقد|تعويض|مهلة|استئناف|court|dispute|fine|contract|appeal)/i.test(value);

function outputText(response) {
  if (typeof response?.output_text === 'string' && response.output_text.trim()) return response.output_text.trim();
  return (response?.output || []).filter((item) => item?.type === 'message')
    .flatMap((item) => item.content || []).filter((item) => item?.type === 'output_text' && typeof item.text === 'string')
    .map((item) => item.text).join('\n').trim();
}

function parsedAgent(response) {
  const raw = outputText(response);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch (error) {
    console.error('Weyaak structured response parse failed:', error, raw.slice(0, 500));
    return null;
  }
}

async function responses(input, instructions, toolChoice = 'auto') {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      instructions,
      input,
      tools: WEYAAK_TOOLS,
      tool_choice: toolChoice,
      parallel_tool_calls: false,
      max_output_tokens: 1000,
      reasoning: { effort: REASONING_EFFORT },
      text: { format: WEYAAK_OUTPUT_FORMAT },
      store: false,
    }),
  });
  const raw = await response.text();
  let data = {};
  try { data = raw ? JSON.parse(raw) : {}; } catch { data = { raw: raw.slice(0, 1000) }; }
  if (!response.ok) {
    const error = new Error(data?.error?.message || `OPENAI_RESPONSES_${response.status}`);
    error.status = response.status;
    error.details = data;
    throw error;
  }
  return data;
}

async function execute(call) {
  let args = {};
  try { args = JSON.parse(call.arguments || '{}'); } catch { return { status: 'error', error: 'INVALID_TOOL_ARGUMENTS' }; }
  if (call.name === 'search_providers') {
    return searchProviders({ service: txt(args.service, 300), city: txt(args.city || '', 120), emirate: txt(args.emirate || '', 120) });
  }
  return { status: 'error', error: 'UNKNOWN_TOOL' };
}

async function runAgent(input, instructions) {
  let working = [...input];
  const trace = [];
  for (let round = 0; round < MAX_ROUNDS; round += 1) {
    let response = await responses(working, instructions);
    let calls = (response.output || []).filter((item) => item?.type === 'function_call');
    if (!calls.length) {
      const agent = parsedAgent(response);
      if (agent?.intent === 'provider_search' && !trace.length && round < MAX_ROUNDS - 1) {
        response = await responses(working, instructions, { type: 'function', name: 'search_providers' });
        calls = (response.output || []).filter((item) => item?.type === 'function_call');
        if (!calls.length) return { agent, trace, responseId: response.id || null };
      } else return { agent, trace, responseId: response.id || null };
    }
    working.push(...(response.output || []));
    for (const call of calls) {
      const result = await execute(call);
      trace.push({ name: call.name, arguments: call.arguments, result });
      working.push({ type: 'function_call_output', call_id: call.call_id, output: JSON.stringify(result) });
    }
  }
  throw new Error('WEYAAK_AGENT_MAX_ROUNDS');
}

const providerResults = (trace) => trace.filter((entry) => entry.name === 'search_providers').flatMap((entry) => entry.result?.providers || []);
const lastSearch = (trace) => [...trace].reverse().find((entry) => entry.name === 'search_providers')?.result || null;

function safeLinks(raw, trace, official) {
  const providers = providerResults(trace);
  const providerUrls = new Set(providers.map((item) => item.url).filter(Boolean));
  const officialUrls = new Set((official || []).map((item) => item.href));
  const internal = new Set(['https://bietalreef.ae/providers/register', 'https://bietalreef.ae/request-quote', 'https://bietalreef.ae/contact']);
  const safe = (Array.isArray(raw) ? raw : []).filter((link) => link && typeof link.label === 'string' && typeof link.href === 'string')
    .filter((link) => providerUrls.has(link.href) || officialUrls.has(link.href) || internal.has(link.href));
  for (const provider of providers) if (provider.url && !safe.some((link) => link.href === provider.url)) safe.push({ label: `عرض ${provider.name}`, href: provider.url });
  return safe.slice(0, 5);
}

function cleanReply(reply, annual) {
  let result = txt(reply, 1200);
  if (!annual) result = result.split(/(?<=[.!؟\n])/).filter((sentence) => !/(خصم\s*10\s*%|10\s*%|١٠\s*٪|خصم عشرة بالمئة)/i.test(sentence)).join('').trim();
  return result.replace(/لا\s*يوجد\s*مزود(?:ون|ين)?/gi, 'لم يظهر تطابق منشور لهذه الخدمة في البحث الحالي')
    .replace(/ما\s*في\s*مزود(?:ون|ين)?/gi, 'لم يظهر تطابق منشور لهذه الخدمة في البحث الحالي')
    .replace(/لم\s*نجد\s*مزود(?:اً|ا|ين)?/gi, 'لم يظهر تطابق منشور لهذه الخدمة في البحث الحالي');
}

function stateOf(agent, previousPayload) {
  return {
    audience: ['customer', 'provider', 'unknown'].includes(agent?.audience) ? agent.audience : 'unknown',
    intent: txt(agent?.intent, 80) || 'general',
    payload: mergePayload(previousPayload, agent?.action?.payload),
  };
}

function intakeOf(agent, state) {
  const type = agent?.action?.type || agent?.intake_type || 'none';
  if (type === 'quote_request' && !firstMissing(state.payload, CUSTOMER_FIELDS)) return buildIntake('quote_request', state.payload);
  if (type === 'provider_interest' && !firstMissing(state.payload, PROVIDER_FIELDS)) return buildIntake('provider_interest', state.payload);
  if (type === 'inquiry' && state.payload.emirate && state.payload.inquiry_topic && state.payload.message) return buildIntake('inquiry', state.payload);
  return null;
}

function successReply(type, number) {
  if (type === 'provider_interest') return `تم يا طويل العمر 🤝 سُجل طلب انضمام نشاطك بنجاح في بيت الريف، ورقم المتابعة ${number}. سيراجع الفريق البيانات ويتواصل معك من خلال الرقم المسجل.`;
  if (type === 'inquiry') return `تم تسجيل استفسارك بنجاح 🤝 رقم المتابعة ${number}. سيراجع فريق بيت الريف التفاصيل ويتواصل معك من خلال الرقم المسجل.`;
  return `تم يا طويل العمر 🤝 سُجل طلبك بنجاح في بيت الريف، ورقم المتابعة ${number}. سيراجع الفريق التفاصيل ويتواصل معك من خلال الرقم المسجل.`;
}

export default async function weyaakAgentHandler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Weyaak-Version', VERSION);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const pagePath = txt(req.body?.pagePath, 300) || '/';

  if (req.body?.mode === 'submit_intake') {
    const action = req.body?.action || {};
    if (req.body?.confirmed !== true || !['quote_request', 'inquiry', 'provider_interest'].includes(action.type)) return res.status(400).json({ error: 'CONFIRMATION_REQUIRED', version: VERSION });
    if (!requiredForSubmission(action)) return res.status(400).json({ error: 'REQUIRED_FIELDS_MISSING', version: VERSION });
    try {
      const saved = await submitAction(action, { pagePath, audience: action.type === 'provider_interest' ? 'provider' : 'customer', userAgent: req.headers['user-agent'] || '' });
      return res.status(200).json({ reply: successReply(action.type, saved.requestNumber), request_number: saved.requestNumber, links: [], saved_to: 'supabase', model: MODEL, version: VERSION });
    } catch (error) {
      console.error('Weyaak submission failed:', error);
      return res.status(500).json({ reply: 'المعذرة، ما تم حفظ الطلب حتى الآن، ولم يصدر رقم متابعة. جرّب مرة ثانية بعد لحظات.', links: [], saved_to: null, model: MODEL, version: VERSION });
    }
  }

  if (!process.env.OPENAI_API_KEY) return res.status(500).json({ reply: 'إعدادات وياك غير مكتملة حاليًا، وما تم تسجيل أي بيانات.', links: [], model: MODEL, version: VERSION });
  const message = txt(req.body?.message, 4000);
  const history = historyOf(req.body?.history);
  const previous = req.body?.state && typeof req.body.state === 'object' ? req.body.state : { audience: 'unknown', intent: 'general', payload: {} };
  if (!message) return res.status(400).json({ error: 'Message is required', version: VERSION });

  try {
    const conversation = [...history.map((item) => item.content), message].join('\n');
    const official = governmentSources(emirateKey(conversation));
    const annual = annualConfirmed(conversation);
    const offer = await loadAnnualOffer(annual).catch(() => null);
    const instructions = buildWeyaakV5Prompt({ state: { audience: previous.audience || 'unknown', intent: previous.intent || 'general', payload: normalizePayload(previous.payload) }, governmentSources: official, annualOffer: offer });
    const result = await runAgent([...history, { role: 'user', content: message }], instructions);
    const agent = result.agent || { reply: 'وصلت فكرتك. وضّح لي الطلب بجملة واحدة، وأنا أرتبه معك.', audience: previous.audience || 'unknown', intent: previous.intent || 'general', match_status: 'not_applicable', links: [], intake_type: 'none', action: { type: 'none', ready_to_submit: false, payload: {} } };
    const state = stateOf(agent, previous.payload);
    const search = lastSearch(result.trace);
    let matchStatus = agent.match_status || 'not_applicable';
    if (state.intent === 'provider_search') matchStatus = search?.status === 'matched' ? 'matched' : 'unmatched';
    if (sensitiveLegal(conversation) && state.intent === 'legal') {
      state.payload.inquiry_topic = state.payload.inquiry_topic || 'استفسار قانوني أو بلدي حساس';
      state.payload.message = state.payload.message || message;
    }
    return res.status(200).json({
      reply: cleanReply(agent.reply, annual) || 'وصلت فكرتك. خبرني بالنقطة التالية عشان أكملها معك.',
      audience: state.audience,
      intent: state.intent,
      match_status: matchStatus,
      links: safeLinks(agent.links, result.trace, official),
      intake: intakeOf(agent, state),
      state,
      tool_calls: result.trace.map((entry) => ({ name: entry.name, status: entry.result?.status || 'unknown', result_count: Array.isArray(entry.result?.providers) ? entry.result.providers.length : 0 })),
      response_id: result.responseId,
      model: MODEL,
      version: VERSION,
      live_data: true,
    });
  } catch (error) {
    console.error('Weyaak agent error:', { message: error.message, status: error.status, details: error.details });
    return res.status(200).json({ reply: 'لحظة يا طويل العمر، واجهت مشكلة مؤقتة وأنا أراجع البيانات. أرسل طلبك مرة ثانية بعد لحظات.', links: [], intake: null, state: previous, model: MODEL, version: VERSION, error_code: error.message });
  }
}
