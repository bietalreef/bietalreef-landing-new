import { buildWeyaakV5Prompt } from '../../lib/weyaakAgentV5Prompt';
import { WEYAAK_OUTPUT_FORMAT, WEYAAK_TOOLS } from '../../lib/weyaakAgentV5Schema';
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
  whatsappUrl,
} from '../../lib/weyaakDataV5';

const MODEL = process.env.WEYAAK_MODEL || 'gpt-5-mini';
const REASONING_EFFORT = process.env.WEYAAK_REASONING_EFFORT || 'low';
const WEYAAK_VERSION = 'weyaak-agent-v5-responses';
const MAX_AGENT_ROUNDS = 3;

function text(value, max = 2000) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter((item) => item && ['user', 'assistant'].includes(item.role) && typeof item.content === 'string')
    .slice(-18)
    .map((item) => ({ role: item.role, content: item.content.trim().slice(0, 2400) }))
    .filter((item) => item.content);
}

function conversationText(history, message) {
  return [...history.map((item) => item.content), message].filter(Boolean).join('\n');
}

function detectEmirateKey(value) {
  if (/(أبو\s*ظبي|ابو\s*ظبي|العين|الظفرة|abu\s*dhabi|al\s*ain)/i.test(value)) return 'abu_dhabi';
  if (/(دبي|dubai)/i.test(value)) return 'dubai';
  if (/(الشارقة|شارقة|sharjah)/i.test(value)) return 'sharjah';
  if (/(عجمان|ajman)/i.test(value)) return 'ajman';
  if (/(أم\s*القيوين|ام\s*القيوين|umm\s*al\s*quwain)/i.test(value)) return 'umm_al_quwain';
  if (/(رأس\s*الخيمة|راس\s*الخيمة|ras\s*al\s*khaimah)/i.test(value)) return 'ras_al_khaimah';
  if (/(الفجيرة|فجيرة|fujairah)/i.test(value)) return 'fujairah';
  return '';
}

function annualIntentConfirmed(value) {
  return /(أؤكد|اؤكد|موافق|جاهز|أريد|اريد|ابغى|أبغى|سأشترك|باشترك).{0,40}(سنوي|السنوية|annual)|(سنوي|السنوية|annual).{0,40}(موافق|جاهز|أريد|اريد|ابغى|أبغى|اشترك)/i.test(value);
}

function sensitiveLegalIntent(value) {
  return /(نزاع|محكمة|قضية|شكوى|مخالفة|غرامة|عقد|تعويض|مهلة|استئناف|court|dispute|fine|contract|appeal)/i.test(value);
}

function responseOutputText(response) {
  if (typeof response?.output_text === 'string' && response.output_text.trim()) return response.output_text.trim();
  return (response?.output || [])
    .filter((item) => item?.type === 'message')
    .flatMap((item) => item.content || [])
    .filter((item) => item?.type === 'output_text' && typeof item.text === 'string')
    .map((item) => item.text)
    .join('\n')
    .trim();
}

function parseAgentResponse(response) {
  const raw = responseOutputText(response);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error('Weyaak structured response parse failed:', error, raw.slice(0, 500));
    return null;
  }
}

async function callResponses({ input, instructions, toolChoice = 'auto' }) {
  const body = {
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
  };

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const raw = await response.text();
  let data = {};
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    data = { raw: raw.slice(0, 1000) };
  }

  if (!response.ok) {
    const error = new Error(data?.error?.message || `OPENAI_RESPONSES_${response.status}`);
    error.status = response.status;
    error.details = data;
    throw error;
  }
  return data;
}

async function executeToolCall(call) {
  let args = {};
  try {
    args = JSON.parse(call.arguments || '{}');
  } catch {
    return { status: 'error', error: 'INVALID_TOOL_ARGUMENTS' };
  }

  if (call.name === 'search_providers') {
    return searchProviders({
      service: text(args.service, 300),
      city: text(args.city || '', 120),
      emirate: text(args.emirate || '', 120),
    });
  }

  return { status: 'error', error: 'UNKNOWN_TOOL' };
}

async function runAgent({ input, instructions }) {
  let workingInput = [...input];
  const toolTrace = [];

  for (let round = 0; round < MAX_AGENT_ROUNDS; round += 1) {
    let response = await callResponses({ input: workingInput, instructions });
    let calls = (response.output || []).filter((item) => item?.type === 'function_call');

    if (calls.length === 0) {
      const agent = parseAgentResponse(response);

      // Provider searches must never be answered from memory. If the model classified
      // the request as a provider search but skipped the tool, force one tool call.
      if (agent?.intent === 'provider_search' && toolTrace.length === 0 && round < MAX_AGENT_ROUNDS - 1) {
        response = await callResponses({
          input: workingInput,
          instructions,
          toolChoice: { type: 'function', name: 'search_providers' },
        });
        calls = (response.output || []).filter((item) => item?.type === 'function_call');
        if (calls.length === 0) return { agent, toolTrace, responseId: response.id || null };
      } else {
        return { agent, toolTrace, responseId: response.id || null };
      }
    }

    workingInput.push(...(response.output || []));

    for (const call of calls) {
      const result = await executeToolCall(call);
      toolTrace.push({ name: call.name, arguments: call.arguments, result });
      workingInput.push({
        type: 'function_call_output',
        call_id: call.call_id,
        output: JSON.stringify(result),
      });
    }
  }

  throw new Error('WEYAAK_AGENT_MAX_ROUNDS');
}

function providerResults(toolTrace) {
  return toolTrace
    .filter((entry) => entry.name === 'search_providers')
    .flatMap((entry) => entry.result?.providers || []);
}

function lastProviderSearch(toolTrace) {
  return [...toolTrace].reverse().find((entry) => entry.name === 'search_providers')?.result || null;
}

function sanitizeLinks(rawLinks, toolTrace, officialSources) {
  const providers = providerResults(toolTrace);
  const providerUrls = new Set(providers.map((provider) => provider.url).filter(Boolean));
  const governmentUrls = new Set((officialSources || []).map((source) => source.href));
  const allowedInternal = new Set([
    'https://bietalreef.ae/providers/register',
    'https://bietalreef.ae/request-quote',
    'https://bietalreef.ae/contact',
  ]);

  const safe = (Array.isArray(rawLinks) ? rawLinks : [])
    .filter((link) => link && typeof link.label === 'string' && typeof link.href === 'string')
    .filter((link) => providerUrls.has(link.href) || governmentUrls.has(link.href) || allowedInternal.has(link.href));

  for (const provider of providers) {
    if (provider.url && !safe.some((link) => link.href === provider.url)) {
      safe.push({ label: `عرض ${provider.name}`, href: provider.url });
    }
  }

  return safe.slice(0, 5);
}

function removeEarlyDiscount(reply, annualConfirmed) {
  if (annualConfirmed) return reply;
  return text(reply, 1200)
    .split(/(?<=[.!؟\n])/)
    .filter((sentence) => !/(خصم\s*10\s*%|10\s*%|١٠\s*٪|خصم عشرة بالمئة)/i.test(sentence))
    .join('')
    .trim();
}

function removeNoProviderLanguage(reply) {
  return text(reply, 1200)
    .replace(/لا\s*يوجد\s*مزود(?:ون|ين)?/gi, 'لم يظهر تطابق منشور لهذه الخدمة في البحث الحالي')
    .replace(/ما\s*في\s*مزود(?:ون|ين)?/gi, 'لم يظهر تطابق منشور لهذه الخدمة في البحث الحالي')
    .replace(/لم\s*نجد\s*مزود(?:اً|ا|ين)?/gi, 'لم يظهر تطابق منشور لهذه الخدمة في البحث الحالي');
}

function buildFinalState(agent, previousPayload) {
  const payload = mergePayload(previousPayload, agent?.action?.payload);
  return {
    audience: ['customer', 'provider', 'unknown'].includes(agent?.audience) ? agent.audience : 'unknown',
    intent: text(agent?.intent, 80) || 'general',
    payload,
  };
}

function resolveIntake(agent, state) {
  const actionType = agent?.action?.type || agent?.intake_type || 'none';

  if (actionType === 'quote_request' && !firstMissing(state.payload, CUSTOMER_FIELDS)) {
    return buildIntake('quote_request', state.payload);
  }

  if (actionType === 'provider_interest' && !firstMissing(state.payload, PROVIDER_FIELDS)) {
    return buildIntake('provider_interest', state.payload);
  }

  if (actionType === 'inquiry' && state.payload.emirate && state.payload.inquiry_topic && state.payload.message) {
    return buildIntake('inquiry', state.payload);
  }

  return null;
}

function savedReply(type, number) {
  if (type === 'provider_interest') {
    return `تم يا طويل العمر 🤝 سُجل طلب انضمام نشاطك بنجاح، ورقم المتابعة ${number}. الحين يظهر لك واتساب لاستكمال النشر مع الفريق.`;
  }
  if (type === 'inquiry') {
    return `تم تسجيل استفسارك بنجاح 🤝 رقم المتابعة ${number}. تقدر الآن ترسل الرقم لفريق الخدمة على واتساب.`;
  }
  return `تم يا طويل العمر 🤝 سُجل طلبك بنجاح، ورقم المتابعة ${number}. تقدر الآن ترسل الطلب لفريق الخدمة على واتساب.`;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Weyaak-Version', WEYAAK_VERSION);

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const pagePath = text(req.body?.pagePath, 300) || '/';

  if (req.body?.mode === 'submit_intake') {
    const action = req.body?.action || {};
    if (req.body?.confirmed !== true || !['quote_request', 'inquiry', 'provider_interest'].includes(action.type)) {
      return res.status(400).json({ error: 'CONFIRMATION_REQUIRED', version: WEYAAK_VERSION });
    }
    if (!requiredForSubmission(action)) {
      return res.status(400).json({ error: 'REQUIRED_FIELDS_MISSING', version: WEYAAK_VERSION });
    }

    try {
      const saved = await submitAction(action, {
        pagePath,
        audience: action.type === 'provider_interest' ? 'provider' : 'customer',
        userAgent: req.headers['user-agent'] || '',
      });
      return res.status(200).json({
        reply: savedReply(action.type, saved.requestNumber),
        request_number: saved.requestNumber,
        links: [{
          label: 'إرسال الطلب إلى خدمة العملاء على واتساب',
          href: whatsappUrl(action.type, saved.payload, saved.requestNumber),
        }],
        model: MODEL,
        version: WEYAAK_VERSION,
      });
    } catch (error) {
      console.error('Weyaak submission failed:', error);
      return res.status(500).json({
        reply: 'المعذرة، ما تم حفظ الطلب حتى الآن. جرّب مرة ثانية بعد لحظات؛ واتساب لن يظهر قبل صدور رقم متابعة رسمي.',
        links: [],
        model: MODEL,
        version: WEYAAK_VERSION,
      });
    }
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      reply: 'إعدادات وياك غير مكتملة حاليًا، وما تم تسجيل أي بيانات.',
      links: [],
      model: MODEL,
      version: WEYAAK_VERSION,
    });
  }

  const message = text(req.body?.message, 4000);
  const history = sanitizeHistory(req.body?.history);
  const previousState = req.body?.state && typeof req.body.state === 'object'
    ? req.body.state
    : { audience: 'unknown', intent: 'general', payload: {} };

  if (!message) return res.status(400).json({ error: 'Message is required', version: WEYAAK_VERSION });

  try {
    const fullConversation = conversationText(history, message);
    const emirateKey = detectEmirateKey(fullConversation);
    const officialSources = governmentSources(emirateKey);
    const annualConfirmed = annualIntentConfirmed(fullConversation);
    const annualOffer = await loadAnnualOffer(annualConfirmed).catch((error) => {
      console.warn('Weyaak annual plan lookup failed:', error.message);
      return null;
    });

    const instructions = buildWeyaakV5Prompt({
      state: {
        audience: previousState.audience || 'unknown',
        intent: previousState.intent || 'general',
        payload: normalizePayload(previousState.payload),
      },
      governmentSources: officialSources,
      annualOffer,
    });

    const input = [
      ...history,
      { role: 'user', content: message },
    ];

    const result = await runAgent({ input, instructions });
    const agent = result.agent || {
      reply: 'وصلت فكرتك. وضّح لي الطلب بجملة واحدة، وأنا أرتبه معك.',
      audience: previousState.audience || 'unknown',
      intent: previousState.intent || 'general',
      match_status: 'not_applicable',
      links: [],
      intake_type: 'none',
      action: { type: 'none', ready_to_submit: false, payload: {} },
    };

    const state = buildFinalState(agent, previousState.payload);
    const searchResult = lastProviderSearch(result.toolTrace);
    let matchStatus = agent.match_status || 'not_applicable';

    if (state.intent === 'provider_search') {
      matchStatus = searchResult?.status === 'matched' ? 'matched' : 'unmatched';
    }

    let reply = removeEarlyDiscount(agent.reply, annualConfirmed);
    reply = removeNoProviderLanguage(reply);

    if (sensitiveLegalIntent(fullConversation) && state.intent === 'legal') {
      state.payload.inquiry_topic = state.payload.inquiry_topic || 'استفسار قانوني أو بلدي حساس';
      state.payload.message = state.payload.message || message;
    }

    const links = sanitizeLinks(agent.links, result.toolTrace, officialSources);
    const intake = resolveIntake(agent, state);

    return res.status(200).json({
      reply: reply || 'وصلت فكرتك. خبرني بالنقطة التالية عشان أكملها معك.',
      audience: state.audience,
      intent: state.intent,
      match_status: matchStatus,
      links,
      intake,
      state,
      tool_calls: result.toolTrace.map((entry) => ({
        name: entry.name,
        status: entry.result?.status || 'unknown',
        result_count: Array.isArray(entry.result?.providers) ? entry.result.providers.length : 0,
      })),
      response_id: result.responseId,
      model: MODEL,
      version: WEYAAK_VERSION,
      live_data: true,
    });
  } catch (error) {
    console.error('Weyaak agent error:', {
      message: error.message,
      status: error.status,
      details: error.details,
    });
    return res.status(200).json({
      reply: 'لحظة يا طويل العمر، واجهت مشكلة مؤقتة وأنا أراجع البيانات. أرسل طلبك مرة ثانية بعد لحظات.',
      links: [],
      intake: null,
      state: previousState,
      model: MODEL,
      version: WEYAAK_VERSION,
      error_code: error.message,
    });
  }
}
