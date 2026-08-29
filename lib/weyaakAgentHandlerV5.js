import { buildWeyaakV5Prompt } from './weyaakAgentV5Prompt';
import { WEYAAK_OUTPUT_FORMAT, WEYAAK_TOOLS } from './weyaakAgentV5Schema';
import {
  CUSTOMER_FIELDS,
  PROVIDER_FIELDS,
  buildIntake,
  firstMissing,
  governmentSources,
  mergePayload,
  normalizePayload,
  requiredForSubmission,
  searchProviders,
  searchProvidersByLocation,
  submitAction,
} from './weyaakDataV5';

const MODEL = process.env.WEYAAK_MODEL || 'gpt-5-mini';
const REASONING_EFFORT = process.env.WEYAAK_REASONING_EFFORT || 'low';
const VERSION = 'weyaak-agent-v5-stage1';
const MAX_ROUNDS = 3;

const PLATFORM_LINKS = [
  { key: 'home', label: 'الرئيسية', href: 'https://bietalreef.ae/' },
  { key: 'how_it_works', label: 'كيف تعمل منصة بيت الريف', href: 'https://bietalreef.ae/how-it-works' },
  { key: 'uae_directory', label: 'دليل الإمارات', href: 'https://bietalreef.ae/uae' },
  { key: 'providers', label: 'مزودو الخدمات', href: 'https://bietalreef.ae/providers' },
  { key: 'services', label: 'الخدمات والعروض', href: 'https://bietalreef.ae/services' },
  { key: 'marketplace', label: 'سوق بيت الريف', href: 'https://app.bietalreef.ae/' },
  { key: 'provider_register', label: 'حمّل التطبيق وانضم كمزود خدمة', href: 'https://play.google.com/store/apps/details?id=ae.bietalreef.app' },
  { key: 'request_quote', label: 'طلب عرض سعر', href: 'https://bietalreef.ae/request-quote' },
  { key: 'customer_service', label: 'خدمة العملاء', href: 'https://bietalreef.ae/customer-service' },
  { key: 'about', label: 'عن بيت الريف', href: 'https://bietalreef.ae/about' },
  { key: 'contact', label: 'تواصل معنا', href: 'https://bietalreef.ae/contact' },
];

const EN_PLATFORM_LINKS = [
  { key: 'home', label: 'Home', href: 'https://bietalreef.ae/en' },
  { key: 'how_it_works', label: 'How Biet Al Reef works', href: 'https://bietalreef.ae/en/how-it-works' },
  { key: 'uae_directory', label: 'UAE Directory', href: 'https://bietalreef.ae/en/uae' },
  { key: 'providers', label: 'Service Providers', href: 'https://bietalreef.ae/en/providers' },
  { key: 'services', label: 'Services & Offers', href: 'https://bietalreef.ae/en/services' },
  { key: 'marketplace', label: 'Biet Al Reef Market', href: 'https://app.bietalreef.ae/' },
  { key: 'provider_register', label: 'Download the app and join as a provider', href: 'https://play.google.com/store/apps/details?id=ae.bietalreef.app' },
  { key: 'request_quote', label: 'Request a quote', href: 'https://bietalreef.ae/en/request-quote' },
  { key: 'customer_service', label: 'Customer service', href: 'https://bietalreef.ae/en/customer-service' },
  { key: 'about', label: 'About Biet Al Reef', href: 'https://bietalreef.ae/en/about' },
  { key: 'contact', label: 'Contact us', href: 'https://bietalreef.ae/en/contact' },
];

const platformLinksFor = (locale) => locale === 'en' ? EN_PLATFORM_LINKS : PLATFORM_LINKS;
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
      max_output_tokens: 1600,
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

async function runAgent(input, instructions, forceProviderSearch = false) {
  let working = [...input];
  const trace = [];
  for (let round = 0; round < MAX_ROUNDS; round += 1) {
    let response = await responses(working, instructions, forceProviderSearch && round === 0 ? { type: 'function', name: 'search_providers' } : 'auto');
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

function matchedProviderReply(providers, locale = 'ar') {
  const provider = providers[0];
  if (!provider) return '';
  const name = locale === 'en'
    ? provider.name_en || provider.name
    : provider.name_ar || provider.name;
  const verified = provider.verified
    ? (locale === 'en' ? 'verified' : 'موثّق')
    : (locale === 'en' ? 'published' : 'منشور');
  return locale === 'en'
    ? `I found a ${verified} provider matching the requested specialty and location: ${name}. Open the provider profile below to review the published details, or tell me if you want to continue with a quotation request.`
    : `وجدت مزودًا ${verified} يطابق التخصص والموقع المطلوبين: ${name}. افتح ملف المزود أدناه لمراجعة بياناته المنشورة، أو أخبرني إذا أردت متابعة طلب عرض سعر.`;
}

function suggestedPlatformLinks(value, locale = 'ar') {
  const message = txt(value, 1200);
  const platformLinks = platformLinksFor(locale);
  const links = [];
  const add = (key) => {
    const item = platformLinks.find((link) => link.key === key);
    if (item && !links.some((link) => link.href === item.href)) links.push(item);
  };
  if (/(كيف\s*تعمل|كيف\s*تشتغل|فكرة\s*المنصة|ما\s*هي\s*بيت\s*الريف|عن\s*بيت\s*الريف|how\s+(?:does|it)|about\s+biet)/i.test(message)) add('how_it_works');
  if (/(دليل\s*الإمارات|حسب\s*الإمارة|حسب\s*المنطقة|المناطق|uae\s+directory|by\s+(?:emirate|area))/i.test(message)) add('uae_directory');
  if (/(مزودو\s*الخدمات|مزودي\s*الخدمات|قائمة\s*المزودين|أين\s*المزودين|service\s+providers?|provider\s+list)/i.test(message)) add('providers');
  if (/(الخدمات\s*والعروض|العروض|خدمات\s*التنفيذ|services?\s*(?:and|&)\s*offers?)/i.test(message)) add('services');
  if (/(المنتجات|المواد|المتاجر|السوق|products?|stores?|marketplace)/i.test(message)) add('marketplace');
  if (/(انضم|تسجيل\s*مزود|إضافة\s*نشاط|اضافة\s*نشاط|صاحب\s*شركة|صاحب\s*مؤسسة|join\s+as\s+(?:a\s+)?provider|register\s+(?:my\s+)?business)/i.test(message)) add('provider_register');
  if (/(طلب\s*عرض\s*سعر|عرض\s*سعر|request\s+(?:a\s+)?quote)/i.test(message)) add('request_quote');
  if (/(خدمة\s*العملاء|الدعم|لم\s*أجد|لم\s*اجد|customer\s+service|support)/i.test(message)) add('customer_service');
  if (/(تواصل|اتصال|راسل|contact)/i.test(message)) add('contact');
  return links.slice(0, 3);
}

function safeLinks(raw, trace, official, message, intent, locale = 'ar') {
  const providers = providerResults(trace);
  const providerUrls = new Set(providers.flatMap((item) => [item.url, item.url_ar, item.url_en]).filter(Boolean));
  const officialUrls = new Set((official || []).map((item) => item.href));
  const platformUrls = new Set([...PLATFORM_LINKS, ...EN_PLATFORM_LINKS].map((item) => item.href));
  const safe = (Array.isArray(raw) ? raw : []).filter((link) => link && typeof link.label === 'string' && typeof link.href === 'string')
    .filter((link) => providerUrls.has(link.href) || officialUrls.has(link.href) || platformUrls.has(link.href));
  for (const provider of providers) {
    const providerUrl = locale === 'en' ? (provider.url_en || provider.url) : (provider.url_ar || provider.url);
    const providerName = locale === 'en' ? (provider.name_en || provider.name) : (provider.name_ar || provider.name);
    if (providerUrl && !safe.some((link) => link.href === providerUrl)) {
      safe.push({
        label: locale === 'en'
          ? `${provider.verified ? 'Verified provider' : 'Published provider'} — ${providerName}`
          : `${provider.verified ? 'ملف مزود موثّق' : 'ملف مزود منشور'} — ${providerName}`,
        href: providerUrl,
      });
    }
  }
  if (intent === 'platform_info' || !safe.length) {
    for (const link of suggestedPlatformLinks(message, locale)) if (!safe.some((item) => item.href === link.href)) safe.push({ label: link.label, href: link.href });
  }
  return safe.slice(0, 5);
}

function cleanReply(reply) {
  return txt(reply, 1200)
    .replace(/لا\s*يوجد\s*مزود(?:ون|ين)?/gi, 'لم يظهر تطابق منشور لهذه الخدمة في البحث الحالي')
    .replace(/ما\s*في\s*مزود(?:ون|ين)?/gi, 'لم يظهر تطابق منشور لهذه الخدمة في البحث الحالي')
    .replace(/لم\s*نجد\s*مزود(?:اً|ا|ين)?/gi, 'لم يظهر تطابق منشور لهذه الخدمة في البحث الحالي')
    .replace(/إيمتى|ايمتى|يمتى/gi, 'متى');
}

function isDirectCustomerSearch(message) {
  const value = txt(message, 1200);
  const asksAvailability = /(هل\s*(?:يوجد|في|عندكم)|وين|أين|ابحث|أبحث|احتاج|أحتاج|اريد|أريد|ابغى|دلني|عطني|find|show|list|looking\s+for|i\s+need|available)/i.test(value);
  const asksForTrade = /(نجار|فني|مقاول|سباك|كهربائي|شركة\s+(?:تنظيف|صيانة|مقاولات)|ورشة|مصنع|مزود\s+خدمة|رخام|جرانيت|تكييف|ألمنيوم|المنيوم|زجاج|دهان|carpenter|technician|contractor|plumber|electrician|cleaning\s+company|maintenance\s+company|workshop|factory|service\s+provider|marble|granite|air\s+conditioning|aluminium|glass|painter)/i.test(value);
  const providerOnboarding = /(انضم|انضمام|اشتراك|سجل\s+شركتي|تسجيل\s+شركتي|إضافة\s+نشاطي|اضافة\s+نشاطي)/i.test(value);
  const identifiesAsProvider = /(أنا|انا)\s+(?:صاحب|مالك|مدير)|(?:عندي|لدي)\s+(?:شركة|مؤسسة|ورشة|مصنع|نشاط)|(?:شركتي|مؤسستي|ورشتي|مصنعي|نشاطي)|أريد\s+أن\s+(?:يظهر|أسجل)|اريد\s+ان\s+(?:يظهر|اسجل)/i.test(value);
  return asksAvailability && asksForTrade && !providerOnboarding && !identifiesAsProvider;
}

function responseLocale(message, pagePath) {
  if (String(pagePath || '').startsWith('/en')) return 'en';
  const value = txt(message, 1200);
  return /[A-Za-z]/.test(value) && !/[\u0600-\u06FF]/.test(value) ? 'en' : 'ar';
}

function isGenericProviderLocationSearch(message) {
  const value = txt(message, 1200);
  const asksForProviders = /(مزود[وي]?\s*الخدمات|قائمة\s*المزودين|service\s+providers?|provider\s+list)/i.test(value);
  const asksToFind = /(اعرض|اظهر|أظهر|ابحث|أبحث|المتاح|find|show|list|available|looking\s+for|i\s+need)/i.test(value);
  return asksForProviders && asksToFind;
}

const EMIRATE_CONTEXT = {
  abu_dhabi: { ar: 'أبوظبي', en: 'Abu Dhabi', slug: 'abu-dhabi' },
  dubai: { ar: 'دبي', en: 'Dubai', slug: 'dubai' },
  sharjah: { ar: 'الشارقة', en: 'Sharjah', slug: 'sharjah' },
  ajman: { ar: 'عجمان', en: 'Ajman', slug: 'ajman' },
  umm_al_quwain: { ar: 'أم القيوين', en: 'Umm Al Quwain', slug: 'umm-al-quwain' },
  ras_al_khaimah: { ar: 'رأس الخيمة', en: 'Ras Al Khaimah', slug: 'ras-al-khaimah' },
  fujairah: { ar: 'الفجيرة', en: 'Fujairah', slug: 'fujairah' },
};

function stateOf(agent, previousPayload) {
  const intent = txt(agent?.intent, 80) || 'general';
  const customerIntents = new Set(['provider_search', 'service_question', 'product_search', 'quote_request', 'tender']);
  const audience = intent === 'provider_subscription'
    ? 'provider'
    : customerIntents.has(intent)
      ? 'customer'
      : ['customer', 'provider', 'unknown'].includes(agent?.audience) ? agent.audience : 'unknown';
  const payload = mergePayload(previousPayload, agent?.action?.payload);
  if (audience === 'customer') PROVIDER_FIELDS.forEach((field) => { payload[field] = ''; });
  if (audience === 'provider') CUSTOMER_FIELDS.forEach((field) => { payload[field] = ''; });
  return {
    audience,
    intent,
    payload,
  };
}

function normalizeEmirateCity(payload) {
  const sameNameEmirates = /^(?:أبوظبي|ابوظبي|دبي|الشارقة|الشارقه|عجمان|الفجيرة|الفجيره|أم القيوين|ام القيوين|رأس الخيمة|راس الخيمه)$/i;
  if (!payload.emirate && sameNameEmirates.test(payload.city || '')) payload.emirate = payload.city;
  if (!payload.city && sameNameEmirates.test(payload.emirate || '')) payload.city = payload.emirate;
  return payload;
}

function intakeOf(agent, state) {
  const type = agent?.action?.type || agent?.intake_type || 'none';
  if (type === 'quote_request' && !firstMissing(state.payload, CUSTOMER_FIELDS)) return buildIntake('quote_request', state.payload);
  if (type === 'provider_interest' && !firstMissing(state.payload, PROVIDER_FIELDS)) return buildIntake('provider_interest', state.payload);
  if (type === 'inquiry' && state.payload.emirate && state.payload.inquiry_topic && state.payload.message) return buildIntake('inquiry', state.payload);
  return null;
}

function successReply(type, number) {
  if (type === 'provider_interest') return `تم يا طويل العمر 🤝 سُجل طلب انضمام نشاطك بنجاح في بيت الريف. رقم المتابعة: ${number}.`;
  if (type === 'inquiry') return `تم تسجيل استفسارك بنجاح 🤝 رقم المتابعة: ${number}.`;
  return `تم يا طويل العمر 🤝 سُجل طلبك بنجاح في بيت الريف. رقم المتابعة: ${number}.`;
}

export default async function weyaakAgentHandler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Weyaak-Version', VERSION);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const pagePath = txt(req.body?.pagePath, 300) || '/';
  const rawPageContext = req.body?.pageContext && typeof req.body.pageContext === 'object' ? req.body.pageContext : {};
  const pageContext = {
    path: pagePath,
    section: txt(rawPageContext.section, 100),
    emirate: txt(rawPageContext.emirate, 100),
    area: txt(rawPageContext.area, 140),
    service: txt(rawPageContext.service, 140),
    provider: txt(rawPageContext.provider, 160),
    product: txt(rawPageContext.product, 160),
    sourceTitle: txt(rawPageContext.sourceTitle, 200),
  };

  if (req.body?.mode === 'submit_intake') {
    const action = req.body?.action || {};
    if (req.body?.confirmed !== true || !['quote_request', 'inquiry', 'provider_interest'].includes(action.type)) return res.status(400).json({ error: 'CONFIRMATION_REQUIRED', version: VERSION });
    if (!requiredForSubmission(action)) return res.status(400).json({ error: 'REQUIRED_FIELDS_MISSING', version: VERSION });
    try {
      const saved = await submitAction(action, { pagePath, audience: action.type === 'provider_interest' ? 'provider' : 'customer', userAgent: req.headers['user-agent'] || '' });
      return res.status(200).json({ reply: successReply(action.type, saved.requestNumber), request_number: saved.requestNumber, registered: true, links: [], saved_to: 'supabase', model: MODEL, version: VERSION });
    } catch (error) {
      console.error('Weyaak submission failed:', error);
      return res.status(500).json({ reply: 'المعذرة، ما تم حفظ الطلب حتى الآن، ولم يصدر رقم متابعة. جرّب مرة ثانية بعد لحظات.', registered: false, links: [], saved_to: null, model: MODEL, version: VERSION });
    }
  }

  const message = txt(req.body?.message, 4000);
  const history = historyOf(req.body?.history);
  const previous = req.body?.state && typeof req.body.state === 'object' ? req.body.state : { audience: 'unknown', intent: 'general', payload: {} };
  if (!message) return res.status(400).json({ error: 'Message is required', version: VERSION });
  const locale = responseLocale(message, pagePath);
  pageContext.locale = locale;

  try {
    const conversation = [...history.map((item) => item.content), message].join('\n');
    const locationKey = emirateKey(`${conversation}\n${pageContext.emirate}\n${pageContext.area}\n${pagePath}`);
    const location = EMIRATE_CONTEXT[locationKey] || null;

    if (isGenericProviderLocationSearch(message)) {
      const locationName = location ? location[locale] : '';
      const search = await searchProvidersByLocation({
        emirate: locationName,
        city: locationName,
        locale,
      });
      const links = search.providers.map((provider) => ({
        label: locale === 'en'
          ? `${provider.verified ? 'Verified provider' : 'Published provider'} — ${provider.name}`
          : `${provider.verified ? 'مزود موثّق' : 'مزود منشور'} — ${provider.name}`,
        href: locale === 'en' ? provider.url_en : provider.url_ar,
      }));
      if (location) {
        links.push({
          label: locale === 'en' ? `${location.en} directory` : `دليل ${location.ar}`,
          href: `https://bietalreef.ae${locale === 'en' ? '/en' : ''}/uae/${location.slug}`,
        });
      }
      const payload = normalizePayload(previous.payload);
      if (locationName) {
        payload.emirate = locationName;
        payload.city = locationName;
      }
      return res.status(200).json({
        reply: search.providers.length
          ? (locale === 'en'
            ? `I found ${search.providers.length} published provider${search.providers.length === 1 ? '' : 's'} serving ${locationName || 'the requested location'}. Open a profile below to review its published specialties, or tell me the specialty to narrow the results.`
            : `وجدت ${search.providers.length} من مزودي الخدمات المنشورين الذين يخدمون ${locationName || 'الموقع المطلوب'}. افتح الملف لمراجعة تخصصاته المنشورة، أو اذكر التخصص لتضييق النتائج.`)
          : (locale === 'en'
            ? `The published data currently shows no provider serving ${locationName || 'the requested location'}. You can open the directory below or tell me the specialty so I can check a more specific match.`
            : `لم تُظهر البيانات المنشورة حاليًا مزودًا يخدم ${locationName || 'الموقع المطلوب'}. يمكنك فتح الدليل أدناه أو ذكر التخصص لأبحث عن تطابق أدق.`),
        audience: 'customer',
        intent: 'provider_search',
        match_status: search.status === 'matched' ? 'matched' : 'unmatched',
        links: links.slice(0, 5),
        intake: null,
        state: { audience: 'customer', intent: 'provider_search', payload },
        tool_calls: [{ name: 'search_providers_by_location', status: search.status, result_count: search.providers.length }],
        model: MODEL,
        version: VERSION,
        live_data: true,
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        reply: locale === 'en'
          ? 'Weyaak configuration is incomplete right now. No information was submitted.'
          : 'إعدادات وياك غير مكتملة حاليًا، وما تم تسجيل أي بيانات.',
        links: [],
        model: MODEL,
        version: VERSION,
      });
    }

    const official = governmentSources(locationKey);
    const forcedCustomerSearch = isDirectCustomerSearch(message);
    const promptState = {
      audience: forcedCustomerSearch ? 'customer' : previous.audience || 'unknown',
      intent: forcedCustomerSearch ? 'provider_search' : previous.intent || 'general',
      payload: normalizePayload(previous.payload),
      forced_route: forcedCustomerSearch ? 'provider_search' : '',
    };
    if (forcedCustomerSearch) PROVIDER_FIELDS.forEach((field) => { promptState.payload[field] = ''; });
    const instructions = buildWeyaakV5Prompt({ state: promptState, governmentSources: official, pageContext });
    const result = await runAgent([...history, { role: 'user', content: message }], instructions, forcedCustomerSearch);
    const agent = result.agent || { reply: locale === 'en' ? 'I understand. Describe the request in one sentence and I will organise the next step.' : 'وصلت فكرتك. وضّح لي الطلب بجملة واحدة، وأنا أرتبه معك.', audience: previous.audience || 'unknown', intent: previous.intent || 'general', match_status: 'not_applicable', links: [], intake_type: 'none', action: { type: 'none', ready_to_submit: false, payload: {} } };
    const state = stateOf(agent, previous.payload);
    if (forcedCustomerSearch) {
      state.audience = 'customer';
      state.intent = 'provider_search';
      PROVIDER_FIELDS.forEach((field) => { state.payload[field] = ''; });
    }
    state.payload = normalizeEmirateCity(state.payload);
    const search = lastSearch(result.trace);
    const matchedProviders = providerResults(result.trace);
    let matchStatus = agent.match_status || 'not_applicable';
    if (state.intent === 'provider_search') matchStatus = search?.status === 'matched' ? 'matched' : 'unmatched';
    if (sensitiveLegal(conversation) && state.intent === 'legal') {
      state.payload.inquiry_topic = state.payload.inquiry_topic || 'استفسار قانوني أو بلدي حساس';
      state.payload.message = state.payload.message || message;
    }
    const reply = state.intent === 'provider_search' && matchStatus === 'matched'
      ? matchedProviderReply(matchedProviders, locale)
      : cleanReply(agent.reply) || (locale === 'en' ? 'I understand. Tell me the next detail and I will continue.' : 'وصلت فكرتك. خبرني بالنقطة التالية عشان أكملها معك.');
    return res.status(200).json({
      reply,
      audience: state.audience,
      intent: state.intent,
      match_status: matchStatus,
      links: safeLinks(agent.links, result.trace, official, message, state.intent, locale),
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
    return res.status(200).json({ reply: locale === 'en' ? 'I hit a temporary issue while checking the live data. Please send the request again in a moment.' : 'لحظة يا طويل العمر، واجهت مشكلة مؤقتة وأنا أراجع البيانات. أرسل طلبك مرة ثانية بعد لحظات.', links: [], intake: null, state: previous, model: MODEL, version: VERSION, error_code: error.message });
  }
}
