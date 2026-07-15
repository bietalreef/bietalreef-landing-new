import { buildWeyaakSystemPrompt } from '../../lib/weyaakPrompt';

const MODEL = process.env.WEYAAK_MODEL || 'gpt-4o-mini';
const WEYAAK_VERSION = 'weyaak-human-flow-v4';
const SITE_URL = 'https://bietalreef.ae';
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_PUBLIC_KEY =
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const OFFICIAL_LINKS = {
  provider_register: `${SITE_URL}/providers/register`,
  request_quote: `${SITE_URL}/request-quote`,
  customer_service: `${SITE_URL}/customer-service`,
  contact: `${SITE_URL}/contact`,
};

const GOVERNMENT_SOURCES = {
  federal: [{ label: 'البوابة الرسمية لحكومة الإمارات', href: 'https://u.ae/' }],
  abu_dhabi: [
    { label: 'دائرة البلديات والنقل – أبوظبي', href: 'https://www.dmt.gov.ae/' },
    { label: 'منصة تم – أبوظبي', href: 'https://www.tamm.abudhabi/' },
  ],
  dubai: [
    { label: 'بلدية دبي', href: 'https://www.dm.gov.ae/' },
    { label: 'البوابة الرسمية لحكومة دبي', href: 'https://www.dubai.ae/' },
  ],
  sharjah: [{ label: 'بلدية مدينة الشارقة', href: 'https://www.shjmun.gov.ae/' }],
};

const CUSTOMER_REQUIRED_FIELDS = [
  'service_category', 'emirate', 'city', 'specifications',
  'measurements', 'budget_range', 'timeline',
];
const PROVIDER_REQUIRED_FIELDS = [
  'business_name', 'specialty', 'service_areas', 'license_status', 'portfolio_status',
];

const PROVIDER_SEARCH_WORDS = /(مزود|مزودين|شركة|مؤسسة|ورشة|محل|مقاول|نجار|نجارة|سباك|سباكة|كهربائي|كهرباء|فني|رخام|جرانيت|المنيوم|ألمنيوم|تنظيف|صيانة|تصميم|مطبخ|مطابخ|ابواب|أبواب|خزائن|حداد|تكييف)/i;
const PROVIDER_REQUEST_WORDS = /(اعطني|أعطني|عطني|ابغى|أبغى|اريد|أريد|عايز|أبحث|ابحث|دور|دلني|وين|فيه|هل يوجد|هل في|موجود|مزودين ام لا|مزودين أم لا)/i;
const COMPLAINT_WORDS = /^(انت مالك|أنت مالك|شو فيك|وش فيك|ايه ده|إيه ده|ده ايه|ده إيه|مش ده|مو هذا|فهمت غلط|ركز|يا وكيل|ياوكيل|ما هذا|شو هذا|هذا شو|تهريج)/i;

function text(value, max = 2000) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function createRequestNumber(prefix = 'BR') {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${prefix}-${stamp}-${random}`;
}

function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter((item) => item && ['user', 'assistant'].includes(item.role) && typeof item.content === 'string')
    .slice(-16)
    .map((item) => ({ role: item.role, content: item.content.trim().slice(0, 2200) }))
    .filter((item) => item.content);
}

function userConversationText(history, message) {
  return [...history.filter((item) => item.role === 'user').map((item) => item.content), message].join('\n');
}

function previousUserMessage(history) {
  return [...history].reverse().find((item) => item.role === 'user')?.content || '';
}

function detectEmirate(value) {
  if (/(أبو\s*ظبي|ابو\s*ظبي|العين|الظفرة|abu\s*dhabi|al\s*ain)/i.test(value)) return 'abu_dhabi';
  if (/(دبي|dubai)/i.test(value)) return 'dubai';
  if (/(الشارقة|شارقة|sharjah)/i.test(value)) return 'sharjah';
  if (/(عجمان|ajman)/i.test(value)) return 'ajman';
  if (/(أم\s*القيوين|ام\s*القيوين|umm\s*al\s*quwain)/i.test(value)) return 'umm_al_quwain';
  if (/(رأس\s*الخيمة|راس\s*الخيمة|ras\s*al\s*khaimah)/i.test(value)) return 'ras_al_khaimah';
  if (/(الفجيرة|فجيرة|fujairah)/i.test(value)) return 'fujairah';
  return '';
}

function emirateLabel(value) {
  return {
    abu_dhabi: 'أبوظبي', dubai: 'دبي', sharjah: 'الشارقة', ajman: 'عجمان',
    umm_al_quwain: 'أم القيوين', ras_al_khaimah: 'رأس الخيمة', fujairah: 'الفجيرة',
  }[value] || '';
}

function detectCity(value) {
  const matches = [
    ['العين', /(العين|al\s*ain)/i],
    ['مدينة أبوظبي', /(مدينة\s*أبو\s*ظبي|abu\s*dhabi\s*city)/i],
    ['دبي', /(دبي|dubai)/i], ['الشارقة', /(الشارقة|sharjah)/i],
    ['عجمان', /(عجمان|ajman)/i], ['أم القيوين', /(أم\s*القيوين|ام\s*القيوين|umm\s*al\s*quwain)/i],
    ['رأس الخيمة', /(رأس\s*الخيمة|راس\s*الخيمة|ras\s*al\s*khaimah)/i],
    ['الفجيرة', /(الفجيرة|fujairah)/i],
  ];
  return matches.find(([, pattern]) => pattern.test(value))?.[0] || '';
}

function isLegalIntent(value) {
  return /(قانون|قانوني|رخصة|ترخيص|تصريح|مخالفة|بلدية|اشتراطات|اعتماد|نزاع|شكوى|محكمة|عقد|legal|license|permit|municipality|court|contract)/i.test(value);
}
function isSensitiveLegal(value) {
  return /(نزاع|محكمة|قضية|شكوى|مخالفة|غرامة|عقد|تعويض|مهلة|استئناف|court|dispute|fine|contract|appeal)/i.test(value);
}
function isTenderIntent(value) {
  return /(مناقصة|مناقصات|tender|توريد مشروع|طلب عروض|منافسة أسعار)/i.test(value);
}
function annualIntentConfirmed(value) {
  return /(أؤكد|اؤكد|موافق|جاهز|أريد|ابغى|أبغى|سأشترك|باشترك).{0,35}(سنوي|السنوية|annual)|(سنوي|السنوية|annual).{0,35}(موافق|جاهز|أريد|ابغى|أبغى|اشترك)/i.test(value);
}
function isComplaint(value) {
  return COMPLAINT_WORDS.test(text(value, 300));
}
function isDirectProviderSearch(value) {
  const valueText = text(value, 1000);
  return PROVIDER_SEARCH_WORDS.test(valueText) && (PROVIDER_REQUEST_WORDS.test(valueText) || /في\s+(العين|دبي|أبوظبي|الشارقة|عجمان|الفجيرة|رأس الخيمة)/i.test(valueText));
}

function normalizeArabic(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[إأآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const STOP_WORDS = new Set('اعطني أعطني عطني ابغى أبغى اريد أريد عايز ابحث أبحث دور دلني في من على الى إلى عن هل يوجد فيه ام أم لا لي لنا خدمة خدمات مزود مزودين مناسب مناسبة الآن الان'.split(' ').map(normalizeArabic));
const SYNONYMS = {
  نجار: ['نجار', 'نجاره', 'خشب', 'خشبيه', 'مطابخ', 'خزائن', 'ابواب'],
  نجاره: ['نجار', 'نجاره', 'خشب', 'خشبيه', 'مطابخ', 'خزائن', 'ابواب'],
  رخام: ['رخام', 'جرانيت', 'حجر'],
  جرانيت: ['جرانيت', 'رخام', 'حجر'],
  كهربائي: ['كهربائي', 'كهرباء', 'تمديدات'],
  سباك: ['سباك', 'سباكه', 'صحيه'],
  تنظيف: ['تنظيف', 'تعقيم', 'تطهير'],
};

function searchTokens(value) {
  const base = normalizeArabic(value).split(' ').filter((token) => token.length > 1 && !STOP_WORDS.has(token));
  const expanded = new Set(base);
  for (const token of base) for (const synonym of SYNONYMS[token] || []) expanded.add(normalizeArabic(synonym));
  return [...expanded];
}

function normalizePayload(raw = {}) {
  const fields = [
    'full_name', 'phone', 'email', 'emirate', 'city', 'service_category',
    'specifications', 'measurements', 'budget_range', 'timeline',
    'project_description', 'preferred_contact', 'inquiry_topic', 'message',
    'business_name', 'specialty', 'service_areas', 'license_status', 'portfolio_status',
  ];
  return Object.fromEntries(fields.map((field) => [field, text(raw?.[field], ['project_description', 'message'].includes(field) ? 4000 : 600)]));
}

function mergePayload(previous, extracted) {
  const oldPayload = normalizePayload(previous);
  const newPayload = normalizePayload(extracted);
  return Object.fromEntries(Object.keys(oldPayload).map((key) => [key, newPayload[key] || oldPayload[key] || '']));
}
function firstMissing(payload, fields) {
  return fields.find((field) => !text(payload[field], 1000)) || '';
}

async function supabaseGet(path) {
  if (!SUPABASE_URL || !SUPABASE_PUBLIC_KEY) return [];
  const response = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/${path}`, {
    headers: { apikey: SUPABASE_PUBLIC_KEY, Authorization: `Bearer ${SUPABASE_PUBLIC_KEY}`, Accept: 'application/json' },
  });
  if (!response.ok) {
    const body = await response.text().catch(() => '');
    console.warn('Weyaak Supabase read failed:', response.status, path, body.slice(0, 300));
    return [];
  }
  const data = await response.json().catch(() => []);
  return Array.isArray(data) ? data : [];
}

async function loadPlatformContext({ annualOfferEligible = false, emirate = '' } = {}) {
  const [providers, platformServices, providerServices, products, projects, categories, plans, serviceAreas] = await Promise.all([
    supabaseGet('provider_public_profiles?select=id,provider_profile_id,slug,name_ar,name_en,provider_type,short_description_ar,short_description_en,description_ar,description_en,phone,whatsapp,canonical_url,verification_status,accepts_quote_requests,direct_contact_enabled,search_keywords_ar,search_keywords_en&publication_status=eq.published&limit=80'),
    supabaseGet('platform_services?select=id,slug,name_ar,name_en,short_description_ar,short_description_en,search_terms_ar,search_terms_en&is_active=eq.true&order=display_order.asc&limit=120'),
    supabaseGet('provider_services?select=provider_id,service_id,title_ar,title_en,description_ar,description_en,price_from,price_to,currency,pricing_model,is_published&is_published=eq.true&limit=300'),
    supabaseGet('provider_products?select=provider_id,slug,name_ar,name_en,description_ar,description_en,price,price_visibility,currency,stock_status,is_published&is_published=eq.true&limit=150'),
    supabaseGet('provider_public_projects?select=provider_id,slug,title_ar,title_en,description_ar,description_en,publication_status&publication_status=eq.published&limit=120'),
    supabaseGet('platform_categories?select=id,slug,name_ar,name_en,is_active&is_active=eq.true&order=display_order.asc&limit=120'),
    supabaseGet('subscription_plans?select=code,name_ar,name_en,description_ar,description_en,monthly_price,annual_price,setup_fee,currency,features,is_free,is_active&is_active=eq.true&order=display_order.asc&limit=20'),
    supabaseGet('provider_service_area_profiles?select=provider_profile_id,emirate,main_city,all_emirate,areas,coverage_notes&limit=300'),
  ]);

  const publicProviders = providers.map((provider) => ({
    ...provider,
    phone: provider.direct_contact_enabled ? provider.phone : null,
    whatsapp: provider.direct_contact_enabled ? provider.whatsapp : null,
    services: providerServices.filter((service) => service.provider_id === provider.id),
    service_areas: serviceAreas.filter((area) => area.provider_profile_id === provider.provider_profile_id),
  }));

  const annualPlan = plans.find((plan) => !plan.is_free && Number(plan.annual_price) > 0);
  const annualOffer = annualOfferEligible && annualPlan ? {
    plan_code: annualPlan.code,
    plan_name_ar: annualPlan.name_ar,
    original_price: Number(annualPlan.annual_price),
    discounted_price: Math.round(Number(annualPlan.annual_price) * 0.9 * 100) / 100,
    currency: annualPlan.currency || 'AED',
    discount_percent: 10,
  } : null;

  return {
    generated_at: new Date().toISOString(), providers: publicProviders,
    platform_services: platformServices, provider_services: providerServices,
    products, projects, categories, subscription_plans: plans,
    provider_examples: publicProviders.slice(0, 3), annual_offer: annualOffer,
    government_sources: emirate ? [...GOVERNMENT_SOURCES.federal, ...(GOVERNMENT_SOURCES[emirate] || [])] : [],
    official_links: OFFICIAL_LINKS,
  };
}

function findProviders(platformContext, query, previousPayload = {}) {
  const combinedQuery = [query, previousPayload.service_category, previousPayload.city, previousPayload.emirate].filter(Boolean).join(' ');
  const tokens = searchTokens(combinedQuery);
  const city = detectCity(combinedQuery);
  const normalizedCity = normalizeArabic(city);

  return (platformContext.providers || [])
    .map((provider) => {
      const serviceText = (provider.services || []).flatMap((service) => [service.title_ar, service.title_en, service.description_ar, service.description_en]);
      const areaText = (provider.service_areas || []).flatMap((area) => [area.emirate, area.main_city, ...(area.areas || []), area.coverage_notes]);
      const haystack = normalizeArabic([
        provider.name_ar, provider.name_en, provider.short_description_ar, provider.short_description_en,
        provider.description_ar, provider.description_en, ...(provider.search_keywords_ar || []),
        ...(provider.search_keywords_en || []), ...serviceText, ...areaText,
      ].filter(Boolean).join(' '));
      let score = tokens.reduce((sum, token) => sum + (haystack.includes(token) ? (token.length >= 5 ? 3 : 2) : 0), 0);
      const hasLocationData = areaText.filter(Boolean).length > 0 || /(العين|دبي|أبوظبي|الشارقة|عجمان|الفجيرة|رأس الخيمة)/i.test(provider.short_description_ar || '');
      if (normalizedCity && haystack.includes(normalizedCity)) score += 5;
      else if (normalizedCity && hasLocationData) score -= 3;
      if (provider.verification_status === 'verified') score += 1;
      return { provider, score };
    })
    .filter((item) => item.score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.provider);
}

function providerSearchResponse(matches, query, previousPayload = {}) {
  if (matches.length) {
    const city = detectCity(query) || previousPayload.city;
    const first = matches[0];
    const extra = matches.length > 1 ? ` وظهر لي ${matches.length - 1} خيار إضافي` : '';
    return {
      reply: `أبشر يا طويل العمر 👍 ظهر لي ${first.name_ar}${city ? ` لخدمة ${city}` : ''}${extra}. هذا مزود منشور على المنصة، وتقدر تراجع صفحته وخدماته قبل التواصل.`,
      audience: 'customer', intent: 'provider_search', match_status: 'matched',
      links: matches.map((provider) => ({ label: `عرض ${provider.name_ar}`, href: provider.canonical_url || `${SITE_URL}/providers/${provider.slug}` })),
      intake: null,
      state: {
        audience: 'customer', intent: 'provider_search',
        payload: { ...normalizePayload(previousPayload), city: detectCity(query) || previousPayload.city || '', emirate: emirateLabel(detectEmirate(query)) || previousPayload.emirate || '' },
      },
    };
  }

  const payload = normalizePayload(previousPayload);
  const city = detectCity(query);
  if (city) payload.city = city;
  const emirate = detectEmirate(query);
  if (emirate) payload.emirate = emirateLabel(emirate);
  if (!payload.service_category) payload.service_category = text(query, 300);
  return {
    reply: 'وصلت طلبك يا طويل العمر 👍 خلّني أرتب تفاصيل الخدمة عشان يسجلها الفريق ويتابعها لك بشكل صحيح. شو المواصفات المطلوبة بالضبط؟',
    audience: 'customer', intent: 'quote_request', match_status: 'unmatched', links: [], intake: null,
    state: { audience: 'customer', intent: 'quote_request', payload },
  };
}

function parseModelJson(raw) {
  if (!raw) return null;
  const cleaned = raw.trim().replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
  try { return JSON.parse(cleaned); } catch { return null; }
}

function customerQuestion(field, payload) {
  const replies = {
    service_category: 'يا مرحبا الساع 👋 شو الخدمة المطلوبة بالضبط؟',
    emirate: 'تمام، وصلتني الخدمة 👍 في أي إمارة تحتاجها؟',
    city: `ممتاز. في أي مدينة أو منطقة داخل ${payload.emirate || 'الإمارة'}؟`,
    specifications: 'تمام، الموقع واضح. خبرني بالمواصفات المطلوبة: النوع أو الخامة والكمية، وهل المطلوب توريد وتركيب؟',
    measurements: 'وصلت المواصفات 👍 عندك المقاسات أو المساحة التقريبية؟',
    budget_range: 'ممتاز، الصورة صارت أوضح. هل عندك ميزانية تقريبية، أو نخليها غير محددة؟',
    timeline: 'بقيت نقطة أخيرة يا طويل العمر: متى تحب يبدأ التنفيذ أو يكتمل؟',
  };
  return replies[field] || 'خبرني بالنقطة الناقصة عشان أرتب الطلب بشكل صحيح.';
}

function providerQuestion(field) {
  const replies = {
    business_name: 'هلا والله بك 👋 العميل اليوم يبحث في جوجل والذكاء الاصطناعي قبل الاتصال، وظهورك المبكر فرصة مهمة. ما اسم نشاطك التجاري؟',
    specialty: 'ممتاز 👍 وش الخدمات الرئيسية اللي يقدمها نشاطك؟',
    service_areas: 'تمام. أي إمارات ومدن تخدمون؟',
    license_status: 'هل الرخصة التجارية سارية حاليًا؟',
    portfolio_status: 'عندكم صور أو نماذج أعمال جاهزة للنشر؟',
  };
  return replies[field] || 'خبرني بالتفصيل الناقص عشان أجهز طلب الانضمام.';
}

function buildIntake(type, defaults = {}) {
  if (type === 'provider_interest') return {
    type, title: 'راجع طلب انضمام نشاطك', submit_label: 'مراجعة طلب الانضمام', defaults,
    fields: [
      { name: 'business_name', label: 'اسم النشاط', type: 'text', required: true },
      { name: 'specialty', label: 'التخصص', type: 'text', required: true },
      { name: 'service_areas', label: 'مناطق الخدمة', type: 'text', required: true },
      { name: 'license_status', label: 'حالة الرخصة', type: 'text', required: true },
      { name: 'portfolio_status', label: 'صور أو نماذج الأعمال', type: 'text', required: true },
      { name: 'full_name', label: 'اسم المسؤول', type: 'text', required: true },
      { name: 'phone', label: 'رقم الهاتف', type: 'tel', required: true },
      { name: 'message', label: 'ملاحظات إضافية', type: 'textarea', required: false },
    ],
  };
  if (type === 'inquiry') return {
    type, title: 'مراجعة الاستفسار الحساس', submit_label: 'مراجعة الاستفسار', defaults,
    fields: [
      { name: 'full_name', label: 'الاسم', type: 'text', required: true },
      { name: 'phone', label: 'رقم الهاتف', type: 'tel', required: true },
      { name: 'emirate', label: 'الإمارة', type: 'text', required: true },
      { name: 'inquiry_topic', label: 'موضوع الاستفسار', type: 'text', required: true },
      { name: 'message', label: 'التفاصيل', type: 'textarea', required: true },
    ],
  };
  return {
    type: 'quote_request', title: 'راجع تفاصيل طلبك قبل التسجيل', submit_label: 'مراجعة الطلب',
    defaults: { preferred_contact: 'whatsapp', ...defaults },
    fields: [
      { name: 'service_category', label: 'الخدمة المطلوبة', type: 'text', required: true },
      { name: 'emirate', label: 'الإمارة', type: 'text', required: true },
      { name: 'city', label: 'المدينة أو المنطقة', type: 'text', required: true },
      { name: 'specifications', label: 'المواصفات', type: 'textarea', required: true },
      { name: 'measurements', label: 'المقاسات أو المساحة', type: 'text', required: true },
      { name: 'budget_range', label: 'الميزانية', type: 'text', required: true },
      { name: 'timeline', label: 'موعد التنفيذ', type: 'text', required: true },
      { name: 'full_name', label: 'الاسم', type: 'text', required: true },
      { name: 'phone', label: 'رقم الهاتف', type: 'tel', required: true },
      { name: 'preferred_contact', label: 'وسيلة التواصل', type: 'select', required: true, options: [
        { value: 'whatsapp', label: 'واتساب' }, { value: 'phone', label: 'اتصال هاتفي' },
      ] },
      { name: 'project_description', label: 'ملاحظات إضافية', type: 'textarea', required: false },
    ],
  };
}

async function callSupabaseRpc(rpcName, payload) {
  if (!SUPABASE_URL || !SUPABASE_PUBLIC_KEY) throw new Error('SUPABASE_NOT_CONFIGURED');
  const response = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/rpc/${rpcName}`, {
    method: 'POST',
    headers: { apikey: SUPABASE_PUBLIC_KEY, Authorization: `Bearer ${SUPABASE_PUBLIC_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_payload: payload }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.message || data?.error || 'SUPABASE_REQUEST_FAILED');
  return Array.isArray(data) ? (data[0] || {}) : (data || {});
}

function requiredFieldsPresent(action) {
  const payload = normalizePayload(action?.payload);
  if (action?.type === 'quote_request') return Boolean(payload.full_name && payload.phone && CUSTOMER_REQUIRED_FIELDS.every((field) => payload[field]));
  if (action?.type === 'provider_interest') return Boolean(payload.full_name && payload.phone && PROVIDER_REQUIRED_FIELDS.every((field) => payload[field]));
  if (action?.type === 'inquiry') return Boolean(payload.full_name && payload.phone && payload.emirate && payload.inquiry_topic && payload.message);
  return false;
}

async function submitRequestedAction(action, requestMeta) {
  const payload = normalizePayload(action?.payload);
  const common = {
    full_name: payload.full_name, phone: payload.phone, email: payload.email,
    emirate: payload.emirate, city: payload.city,
    preferred_contact: payload.preferred_contact || 'whatsapp',
    source_path: text(requestMeta.pagePath, 300) || '/', source_page_title: 'Weyaak Chat',
    utm: { source: 'weyaak_chat', audience: requestMeta.audience || 'unknown' },
    user_agent: text(requestMeta.userAgent, 500),
  };
  if (action.type === 'quote_request') {
    const requestNumber = createRequestNumber('BRQ');
    const projectDescription = [
      `الخدمة: ${payload.service_category}`, `المواصفات: ${payload.specifications}`,
      `المقاسات/المساحة: ${payload.measurements}`, `الميزانية: ${payload.budget_range}`,
      `الموعد: ${payload.timeline}`, payload.project_description ? `ملاحظات: ${payload.project_description}` : '',
    ].filter(Boolean).join('\n');
    const result = await callSupabaseRpc('submit_public_quote_request', {
      ...common, request_number: requestNumber, service_category: payload.service_category,
      project_type: payload.service_category, project_area: payload.measurements,
      budget_range: payload.budget_range, timeline: payload.timeline, project_description: projectDescription,
    });
    return { requestNumber: result.request_number || result.request_no || result.quote_number || requestNumber, payload };
  }
  const requestNumber = createRequestNumber('BRI');
  const providerMessage = [
    payload.business_name ? `اسم النشاط: ${payload.business_name}` : '',
    payload.specialty ? `التخصص: ${payload.specialty}` : '',
    payload.service_areas ? `مناطق الخدمة: ${payload.service_areas}` : '',
    payload.license_status ? `حالة الرخصة: ${payload.license_status}` : '',
    payload.portfolio_status ? `نماذج الأعمال: ${payload.portfolio_status}` : '', payload.message,
  ].filter(Boolean).join('\n');
  const result = await callSupabaseRpc('submit_public_website_inquiry', {
    ...common, request_number: requestNumber,
    inquiry_topic: action.type === 'provider_interest' ? 'provider_subscription' : (payload.inquiry_topic || 'general_inquiry'),
    message: action.type === 'provider_interest' ? providerMessage : payload.message,
  });
  return { requestNumber: result.request_number || result.request_no || result.inquiry_number || requestNumber, payload };
}

function buildWhatsAppUrl(type, payload, requestNumber) {
  const lines = type === 'provider_interest'
    ? ['مرحبًا فريق بيت الريف،', 'تم تسجيل طلب انضمام نشاطي عبر وياك.', `رقم المتابعة: ${requestNumber}`, `اسم النشاط: ${payload.business_name}`, `التخصص: ${payload.specialty}`, `مناطق الخدمة: ${payload.service_areas}`]
    : type === 'inquiry'
      ? ['مرحبًا فريق بيت الريف،', 'تم تسجيل استفساري عبر وياك.', `رقم المتابعة: ${requestNumber}`, `الموضوع: ${payload.inquiry_topic}`]
      : ['مرحبًا فريق بيت الريف،', 'تم تسجيل طلبي عبر وياك.', `رقم المتابعة: ${requestNumber}`, `الخدمة: ${payload.service_category}`, `الموقع: ${payload.emirate} - ${payload.city}`, `المواصفات: ${payload.specifications}`, `المقاسات: ${payload.measurements}`, `الميزانية: ${payload.budget_range}`, `موعد التنفيذ: ${payload.timeline}`];
  return `https://wa.me/971567856001?text=${encodeURIComponent(lines.join('\n'))}`;
}

function replyForSavedAction(type, requestNumber) {
  if (type === 'provider_interest') return `تم يا طويل العمر 🤝 سجلت طلب انضمام نشاطك، ورقم المتابعة ${requestNumber}. الحين تقدر ترسل الرقم لفريق الخدمة على واتساب.`;
  if (type === 'inquiry') return `تم تسجيل استفسارك 🤝 رقم المتابعة ${requestNumber}. تقدر الآن ترسل الرقم لفريق الخدمة على واتساب.`;
  return `تم يا طويل العمر 🤝 سجلت طلبك، ورقم المتابعة ${requestNumber}. تقدر الآن ترسله لفريق الخدمة على واتساب.`;
}

function sanitizeLinks(rawLinks, platformContext) {
  if (!Array.isArray(rawLinks)) return [];
  const providerUrls = new Set((platformContext.providers || []).map((provider) => provider.canonical_url).filter(Boolean));
  const governmentHosts = new Set(Object.values(GOVERNMENT_SOURCES).flat().map((item) => new URL(item.href).hostname));
  return rawLinks.filter((link) => link && typeof link.label === 'string' && typeof link.href === 'string').filter((link) => {
    try {
      const url = new URL(link.href);
      return url.hostname === 'bietalreef.ae' || url.hostname.endsWith('.bietalreef.ae') || providerUrls.has(link.href) || governmentHosts.has(url.hostname);
    } catch { return link.href.startsWith('/'); }
  }).slice(0, 4);
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Weyaak-Version', WEYAAK_VERSION);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const pagePath = text(req.body?.pagePath, 300) || '/';
  if (req.body?.mode === 'submit_intake') {
    const action = req.body?.action || {};
    if (req.body?.confirmed !== true || !['quote_request', 'inquiry', 'provider_interest'].includes(action.type)) return res.status(400).json({ error: 'CONFIRMATION_REQUIRED', version: WEYAAK_VERSION });
    if (!requiredFieldsPresent(action)) return res.status(400).json({ error: 'REQUIRED_FIELDS_MISSING', version: WEYAAK_VERSION });
    try {
      const saved = await submitRequestedAction(action, { pagePath, audience: action.type === 'provider_interest' ? 'provider' : 'customer', userAgent: req.headers['user-agent'] || '' });
      return res.status(200).json({
        reply: replyForSavedAction(action.type, saved.requestNumber), request_number: saved.requestNumber,
        links: [{ label: 'إرسال الطلب إلى خدمة العملاء على واتساب', href: buildWhatsAppUrl(action.type, saved.payload, saved.requestNumber) }],
        version: WEYAAK_VERSION,
      });
    } catch (error) {
      console.error('Weyaak direct submission failed:', error);
      return res.status(500).json({ reply: 'المعذرة، ما تم حفظ الطلب حتى الآن. حاول مرة ثانية بعد لحظات.', links: [], version: WEYAAK_VERSION });
    }
  }

  if (!process.env.OPENAI_API_KEY) return res.status(500).json({ reply: 'إعدادات وياك غير مكتملة حاليًا.', links: [], version: WEYAAK_VERSION });

  const message = text(req.body?.message, 4000);
  const history = sanitizeHistory(req.body?.history);
  const previousState = req.body?.state && typeof req.body.state === 'object' ? req.body.state : {};
  if (!message) return res.status(400).json({ error: 'Message is required', version: WEYAAK_VERSION });

  try {
    const userConversation = userConversationText(history, message);
    const flags = {
      legalIntent: isLegalIntent(userConversation), sensitiveLegal: isSensitiveLegal(userConversation),
      tenderIntent: isTenderIntent(userConversation), emirate: detectEmirate(userConversation),
      annualOfferEligible: annualIntentConfirmed(userConversation),
    };

    if (flags.legalIntent && !flags.emirate) return res.status(200).json({
      reply: 'يا مرحبا الساع. عشان أراجع لك الجهة الحكومية الصحيحة، الأمر يخص أي إمارة؟',
      audience: 'customer', intent: 'legal', links: [], intake: null,
      state: { audience: 'customer', intent: 'legal', payload: normalizePayload(previousState.payload) },
      model: MODEL, version: WEYAAK_VERSION,
    });

    const platformContext = await loadPlatformContext(flags);

    const priorRequest = previousUserMessage(history);
    const effectiveProviderQuery = isDirectProviderSearch(message)
      ? message
      : (isComplaint(message) && isDirectProviderSearch(priorRequest) ? priorRequest : '');
    if (effectiveProviderQuery) {
      const matches = findProviders(platformContext, effectiveProviderQuery, previousState.payload || {});
      const result = providerSearchResponse(matches, effectiveProviderQuery, previousState.payload || {});
      if (isComplaint(message) && matches.length) result.reply = `حقك علي يا طويل العمر، فهمت طلبك غلط. ${result.reply}`;
      return res.status(200).json({ ...result, model: MODEL, version: WEYAAK_VERSION, live_data: true });
    }

    if (isComplaint(message)) return res.status(200).json({
      reply: 'حقك علي يا طويل العمر، فهمت مسارك غلط. قل لي طلبك بجملة واحدة وأنا أجاوبك مباشرة بدون ما أكمل النموذج القديم.',
      audience: previousState.audience || 'unknown', intent: 'clarification', links: [], intake: null,
      state: { audience: previousState.audience || 'unknown', intent: 'general', payload: {} },
      model: MODEL, version: WEYAAK_VERSION,
    });

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: MODEL, temperature: 0.15, max_tokens: 750, response_format: { type: 'json_object' },
        messages: [{ role: 'system', content: buildWeyaakSystemPrompt(platformContext, flags) }, ...history, { role: 'user', content: message }],
      }),
    });
    const rawText = await openaiResponse.text();
    const data = rawText ? JSON.parse(rawText) : null;
    if (!openaiResponse.ok) {
      console.error('Weyaak OpenAI error:', { status: openaiResponse.status, body: data });
      return res.status(200).json({ reply: 'لحظة يا طويل العمر، واجهت مشكلة مؤقتة أثناء مراجعة المعلومات. جرّب مرة ثانية.', links: [], intake: null, state: previousState, model: MODEL, version: WEYAAK_VERSION });
    }

    const agent = parseModelJson(data?.choices?.[0]?.message?.content?.trim()) || {
      reply: 'وصلت فكرتك. خبرني بالتفصيل الناقص عشان أرتبها لك.',
      audience: previousState.audience || 'unknown', intent: previousState.intent || 'general',
      match_status: 'not_applicable', links: [], intake_type: 'none', action: { type: 'none', payload: {} },
    };

    let audience = ['customer', 'provider', 'unknown'].includes(agent.audience) ? agent.audience : (previousState.audience || 'unknown');
    const intent = text(agent.intent, 80) || previousState.intent || 'general';
    let payload = mergePayload(previousState.payload, agent.action?.payload);
    if (flags.emirate && !payload.emirate) payload.emirate = emirateLabel(flags.emirate);
    const detectedCity = detectCity(userConversation);
    if (detectedCity && !payload.city) payload.city = detectedCity;

    if (intent === 'out_of_scope') return res.status(200).json({
      reply: 'أقدّر سؤالك، لكن تدريبي مخصص لخدمة العملاء في مجالات البناء والمقاولات والصيانة والتصميم والخدمات المرتبطة بمنصة بيت الريف.',
      audience: 'unknown', intent, links: [], intake: null,
      state: { audience: 'unknown', intent, payload: {} }, model: MODEL, version: WEYAAK_VERSION,
    });

    if (flags.sensitiveLegal && flags.emirate) {
      const inquiryPayload = { ...payload, emirate: payload.emirate || emirateLabel(flags.emirate), inquiry_topic: payload.inquiry_topic || 'استفسار قانوني أو بلدي حساس', message: payload.message || message };
      return res.status(200).json({
        reply: 'أقدّر حساسية الموضوع. هذا يحتاج مراجعة بشرية مختصة، فجهزت لك استفسارًا منظمًا بدون إعطاء حكم قانوني.',
        audience: 'customer', intent: 'legal', links: platformContext.government_sources,
        intake: buildIntake('inquiry', inquiryPayload), state: { audience: 'customer', intent: 'legal', payload: inquiryPayload },
        model: MODEL, version: WEYAAK_VERSION,
      });
    }

    const customerFlow = audience === 'customer' && ['provider_search', 'service_question', 'product_search', 'quote_request', 'tender'].includes(intent);
    if (customerFlow) {
      if (intent === 'provider_search' && payload.service_category && (payload.city || payload.emirate)) {
        const query = [payload.service_category, payload.city, payload.emirate].filter(Boolean).join(' ');
        const matches = findProviders(platformContext, query, payload);
        const result = providerSearchResponse(matches, query, payload);
        return res.status(200).json({ ...result, model: MODEL, version: WEYAAK_VERSION, live_data: true });
      }
      const missing = firstMissing(payload, CUSTOMER_REQUIRED_FIELDS);
      if (missing) return res.status(200).json({
        reply: customerQuestion(missing, payload), audience, intent, links: [], intake: null,
        state: { audience, intent, payload }, model: MODEL, version: WEYAAK_VERSION,
        live_data: Boolean(SUPABASE_URL && SUPABASE_PUBLIC_KEY),
      });
      const summary = `لحظة يا طويل العمر، أراجع لك بعض البيانات والمعلومات… تم ترتيب الطلب: ${payload.service_category} في ${payload.city}. راجع البطاقة وأضف الاسم ورقم الهاتف، وبعد تأكيدك أسجله رسميًا وأصدر لك رقم متابعة.`;
      return res.status(200).json({
        reply: summary, audience, intent, links: [], intake: buildIntake('quote_request', payload),
        state: { audience, intent, payload }, model: MODEL, version: WEYAAK_VERSION,
        live_data: Boolean(SUPABASE_URL && SUPABASE_PUBLIC_KEY),
      });
    }

    if (audience === 'provider' || intent === 'provider_subscription') {
      audience = 'provider';
      const missing = firstMissing(payload, PROVIDER_REQUIRED_FIELDS);
      if (missing) return res.status(200).json({
        reply: providerQuestion(missing), audience, intent: 'provider_subscription', links: [], intake: null,
        state: { audience, intent: 'provider_subscription', payload }, model: MODEL, version: WEYAAK_VERSION,
        live_data: Boolean(SUPABASE_URL && SUPABASE_PUBLIC_KEY),
      });
      let reply = 'لحظة يا طويل العمر، أراجع لك بعض البيانات والمعلومات… بيانات نشاطك واضحة، والحين راجع بطاقة الانضمام وأضف اسم المسؤول ورقم الهاتف.';
      if (flags.annualOfferEligible && platformContext.annual_offer) {
        const offer = platformContext.annual_offer;
        reply += ` وبما أنك أكدت الاشتراك السنوي، لك هدية خصم 10%؛ تصبح القيمة ${offer.discounted_price} ${offer.currency} بدل ${offer.original_price} ${offer.currency}.`;
      }
      return res.status(200).json({
        reply, audience, intent: 'provider_subscription', links: [], intake: buildIntake('provider_interest', payload),
        state: { audience, intent: 'provider_subscription', payload }, model: MODEL, version: WEYAAK_VERSION,
        live_data: Boolean(SUPABASE_URL && SUPABASE_PUBLIC_KEY),
      });
    }

    let links = sanitizeLinks(agent.links, platformContext);
    if (flags.legalIntent && flags.emirate) links = platformContext.government_sources;
    return res.status(200).json({
      reply: text(agent.reply, 900) || 'وصلت فكرتك. هل تبحث عن خدمة، أم لديك نشاط تجاري؟',
      audience, intent, links, intake: null, state: { audience, intent, payload },
      model: MODEL, version: WEYAAK_VERSION, live_data: Boolean(SUPABASE_URL && SUPABASE_PUBLIC_KEY),
    });
  } catch (error) {
    console.error('Weyaak chat fatal error:', error);
    return res.status(200).json({ reply: 'المعذرة يا طويل العمر، ما قدرت أكمل مراجعة المعلومات الآن. جرّب مرة ثانية بعد لحظات.', links: [], intake: null, state: req.body?.state || {}, model: MODEL, version: WEYAAK_VERSION });
  }
}
