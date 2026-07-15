import { buildWeyaakSystemPrompt } from '../../lib/weyaakPrompt';

const MODEL = process.env.WEYAAK_MODEL || 'gpt-4o-mini';
const WEYAAK_VERSION = 'weyaak-human-flow-v3';
const SITE_URL = 'https://bietalreef.ae';
const SUPPORT_PHONE = '+971567856001';
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
  'service_category',
  'emirate',
  'city',
  'specifications',
  'measurements',
  'budget_range',
  'timeline',
];

const PROVIDER_REQUIRED_FIELDS = [
  'business_name',
  'specialty',
  'service_areas',
  'license_status',
  'portfolio_status',
];

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
  return [
    ...history.filter((item) => item.role === 'user').map((item) => item.content),
    message,
  ].join('\n');
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
    abu_dhabi: 'أبوظبي',
    dubai: 'دبي',
    sharjah: 'الشارقة',
    ajman: 'عجمان',
    umm_al_quwain: 'أم القيوين',
    ras_al_khaimah: 'رأس الخيمة',
    fujairah: 'الفجيرة',
  }[value] || '';
}

function detectCity(value) {
  const matches = [
    ['العين', /(العين|al\s*ain)/i],
    ['مدينة أبوظبي', /(مدينة\s*أبو\s*ظبي|abu\s*dhabi\s*city)/i],
    ['دبي', /(دبي|dubai)/i],
    ['الشارقة', /(الشارقة|sharjah)/i],
    ['عجمان', /(عجمان|ajman)/i],
    ['أم القيوين', /(أم\s*القيوين|ام\s*القيوين|umm\s*al\s*quwain)/i],
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

function normalizePayload(raw = {}) {
  const fields = [
    'full_name', 'phone', 'email', 'emirate', 'city', 'service_category',
    'specifications', 'measurements', 'budget_range', 'timeline',
    'project_description', 'preferred_contact', 'inquiry_topic', 'message',
    'business_name', 'specialty', 'service_areas', 'license_status', 'portfolio_status',
  ];
  return Object.fromEntries(fields.map((field) => [field, text(raw?.[field], field === 'project_description' || field === 'message' ? 4000 : 600)]));
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
    headers: {
      apikey: SUPABASE_PUBLIC_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLIC_KEY}`,
      Accept: 'application/json',
    },
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
  const [providers, platformServices, providerServices, products, projects, categories, plans] = await Promise.all([
    supabaseGet('provider_public_profiles?select=id,slug,name_ar,name_en,provider_type,short_description_ar,short_description_en,phone,whatsapp,canonical_url,verification_status,accepts_quote_requests,direct_contact_enabled,search_keywords_ar,search_keywords_en&publication_status=eq.published&limit=40'),
    supabaseGet('platform_services?select=id,slug,name_ar,name_en,short_description_ar,short_description_en,search_terms_ar,search_terms_en&is_active=eq.true&order=display_order.asc&limit=100'),
    supabaseGet('provider_services?select=provider_id,service_id,title_ar,title_en,description_ar,description_en,price_from,price_to,currency,pricing_model,is_published&is_published=eq.true&limit=200'),
    supabaseGet('provider_products?select=provider_id,slug,name_ar,name_en,description_ar,description_en,price,price_visibility,currency,stock_status,is_published&is_published=eq.true&limit=120'),
    supabaseGet('provider_public_projects?select=provider_id,slug,title_ar,title_en,description_ar,description_en,publication_status&publication_status=eq.published&limit=100'),
    supabaseGet('platform_categories?select=id,slug,name_ar,name_en,is_active&is_active=eq.true&order=display_order.asc&limit=100'),
    supabaseGet('subscription_plans?select=code,name_ar,name_en,description_ar,description_en,monthly_price,annual_price,setup_fee,currency,features,is_free,is_active&is_active=eq.true&order=display_order.asc&limit=20'),
  ]);

  const publicProviders = providers.map((provider) => ({
    ...provider,
    phone: provider.direct_contact_enabled ? provider.phone : null,
    whatsapp: provider.direct_contact_enabled ? provider.whatsapp : null,
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
    generated_at: new Date().toISOString(),
    providers: publicProviders,
    platform_services: platformServices,
    provider_services: providerServices,
    products,
    projects,
    categories,
    subscription_plans: plans,
    provider_examples: publicProviders.slice(0, 3),
    annual_offer: annualOffer,
    government_sources: emirate ? [...GOVERNMENT_SOURCES.federal, ...(GOVERNMENT_SOURCES[emirate] || [])] : [],
    official_links: OFFICIAL_LINKS,
  };
}

function parseModelJson(raw) {
  if (!raw) return null;
  const cleaned = raw.trim().replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
  try { return JSON.parse(cleaned); } catch { return null; }
}

function customerQuestion(field, payload) {
  const replies = {
    service_category: 'يا مرحبا الساع 👋 خلّنا نرتب طلبك صح من البداية. شو الخدمة المطلوبة بالضبط؟',
    emirate: `تمام، وصلتني الخدمة المطلوبة 👍 في أي إمارة تحتاجها؟`,
    city: `ممتاز، كذا نحدد الخيارات بدقة. في أي مدينة أو منطقة داخل ${payload.emirate || 'الإمارة'}؟`,
    specifications: 'تمام، الموقع واضح. خبرني بالمواصفات المطلوبة: النوع أو الخامة والكمية، وهل المطلوب توريد وتركيب؟',
    measurements: 'وصلت المواصفات 👍 عندك المقاسات أو المساحة التقريبية؟',
    budget_range: 'ممتاز، الصورة صارت أوضح. هل عندك ميزانية تقريبية، أو نخليها غير محددة؟',
    timeline: 'بقيت نقطة أخيرة يا طويل العمر: متى تحب يبدأ التنفيذ أو يكتمل؟',
  };
  return replies[field] || 'خبرني بالنقطة الناقصة عشان أرتب الطلب بشكل صحيح.';
}

function providerQuestion(field) {
  const replies = {
    business_name: 'هلا والله بك 👋 وجودك اليوم خطوة ممتازة؛ العميل صار يبحث في جوجل والذكاء الاصطناعي قبل الاتصال. ما اسم نشاطك التجاري؟',
    specialty: 'ممتاز 👍 الظهور الواضح يبدأ بتخصص محدد. وش الخدمات الرئيسية اللي يقدمها نشاطك؟',
    service_areas: 'تمام، وكل ما كانت مناطق العمل واضحة صار وصول العميل لك أدق. أي إمارات ومدن تخدمون؟',
    license_status: 'حلو. عشان يكون ملف النشاط موثوق وواضح، هل الرخصة التجارية سارية حاليًا؟',
    portfolio_status: 'بقيت خطوة بسيطة: عندكم صور أو نماذج أعمال جاهزة للنشر؟',
  };
  return replies[field] || 'خبرني بالتفصيل الناقص عشان أجهز طلب الانضمام.';
}

function buildIntake(type, defaults = {}) {
  if (type === 'provider_interest') {
    return {
      type,
      title: 'راجع طلب انضمام نشاطك',
      submit_label: 'مراجعة طلب الانضمام',
      fields: [
        { name: 'business_name', label: 'اسم النشاط', type: 'text', required: true },
        { name: 'specialty', label: 'التخصص', type: 'text', required: true },
        { name: 'service_areas', label: 'مناطق الخدمة', type: 'text', required: true },
        { name: 'license_status', label: 'حالة الرخصة', type: 'text', required: true },
        { name: 'portfolio_status', label: 'صور أو نماذج الأعمال', type: 'text', required: true },
        { name: 'full_name', label: 'اسم المسؤول', type: 'text', required: true, placeholder: 'الاسم الكامل' },
        { name: 'phone', label: 'رقم الهاتف', type: 'tel', required: true, placeholder: '05XXXXXXXX' },
        { name: 'message', label: 'ملاحظات إضافية', type: 'textarea', required: false },
      ],
      defaults,
    };
  }

  if (type === 'inquiry') {
    return {
      type,
      title: 'مراجعة الاستفسار الحساس',
      submit_label: 'مراجعة الاستفسار',
      fields: [
        { name: 'full_name', label: 'الاسم', type: 'text', required: true },
        { name: 'phone', label: 'رقم الهاتف', type: 'tel', required: true },
        { name: 'emirate', label: 'الإمارة', type: 'text', required: true },
        { name: 'inquiry_topic', label: 'موضوع الاستفسار', type: 'text', required: true },
        { name: 'message', label: 'التفاصيل', type: 'textarea', required: true },
      ],
      defaults,
    };
  }

  return {
    type: 'quote_request',
    title: 'راجع تفاصيل طلبك قبل التسجيل',
    submit_label: 'مراجعة الطلب',
    fields: [
      { name: 'service_category', label: 'الخدمة المطلوبة', type: 'text', required: true },
      { name: 'emirate', label: 'الإمارة', type: 'text', required: true },
      { name: 'city', label: 'المدينة أو المنطقة', type: 'text', required: true },
      { name: 'specifications', label: 'المواصفات', type: 'textarea', required: true },
      { name: 'measurements', label: 'المقاسات أو المساحة', type: 'text', required: true },
      { name: 'budget_range', label: 'الميزانية', type: 'text', required: true },
      { name: 'timeline', label: 'موعد التنفيذ', type: 'text', required: true },
      { name: 'full_name', label: 'الاسم', type: 'text', required: true, placeholder: 'الاسم الكامل' },
      { name: 'phone', label: 'رقم الهاتف', type: 'tel', required: true, placeholder: '05XXXXXXXX' },
      { name: 'preferred_contact', label: 'وسيلة التواصل', type: 'select', required: true, options: [
        { value: 'whatsapp', label: 'واتساب' },
        { value: 'phone', label: 'اتصال هاتفي' },
      ] },
      { name: 'project_description', label: 'ملاحظات إضافية', type: 'textarea', required: false },
    ],
    defaults: { preferred_contact: 'whatsapp', ...defaults },
  };
}

async function callSupabaseRpc(rpcName, payload) {
  if (!SUPABASE_URL || !SUPABASE_PUBLIC_KEY) throw new Error('SUPABASE_NOT_CONFIGURED');
  const response = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/rpc/${rpcName}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_PUBLIC_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLIC_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ p_payload: payload }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.message || data?.error || 'SUPABASE_REQUEST_FAILED');
  return Array.isArray(data) ? (data[0] || {}) : (data || {});
}

function requiredFieldsPresent(action) {
  const payload = normalizePayload(action?.payload);
  if (action?.type === 'quote_request') {
    return Boolean(
      payload.full_name && payload.phone &&
      CUSTOMER_REQUIRED_FIELDS.every((field) => payload[field])
    );
  }
  if (action?.type === 'provider_interest') {
    return Boolean(
      payload.full_name && payload.phone &&
      PROVIDER_REQUIRED_FIELDS.every((field) => payload[field])
    );
  }
  if (action?.type === 'inquiry') {
    return Boolean(payload.full_name && payload.phone && payload.emirate && payload.inquiry_topic && payload.message);
  }
  return false;
}

async function submitRequestedAction(action, requestMeta) {
  const payload = normalizePayload(action?.payload);
  const common = {
    full_name: payload.full_name,
    phone: payload.phone,
    email: payload.email,
    emirate: payload.emirate,
    city: payload.city,
    preferred_contact: payload.preferred_contact || 'whatsapp',
    source_path: text(requestMeta.pagePath, 300) || '/',
    source_page_title: 'Weyaak Chat',
    utm: { source: 'weyaak_chat', audience: requestMeta.audience || 'unknown' },
    user_agent: text(requestMeta.userAgent, 500),
  };

  if (action.type === 'quote_request') {
    const requestNumber = createRequestNumber('BRQ');
    const projectDescription = [
      `الخدمة: ${payload.service_category}`,
      `المواصفات: ${payload.specifications}`,
      `المقاسات/المساحة: ${payload.measurements}`,
      `الميزانية: ${payload.budget_range}`,
      `الموعد: ${payload.timeline}`,
      payload.project_description ? `ملاحظات: ${payload.project_description}` : '',
    ].filter(Boolean).join('\n');
    const result = await callSupabaseRpc('submit_public_quote_request', {
      ...common,
      request_number: requestNumber,
      service_category: payload.service_category,
      project_type: payload.service_category,
      project_area: payload.measurements,
      budget_range: payload.budget_range,
      timeline: payload.timeline,
      project_description: projectDescription,
    });
    return { requestNumber: result.request_number || result.request_no || result.quote_number || requestNumber, payload };
  }

  const requestNumber = createRequestNumber('BRI');
  const providerMessage = [
    payload.business_name ? `اسم النشاط: ${payload.business_name}` : '',
    payload.specialty ? `التخصص: ${payload.specialty}` : '',
    payload.service_areas ? `مناطق الخدمة: ${payload.service_areas}` : '',
    payload.license_status ? `حالة الرخصة: ${payload.license_status}` : '',
    payload.portfolio_status ? `نماذج الأعمال: ${payload.portfolio_status}` : '',
    payload.message,
  ].filter(Boolean).join('\n');

  const result = await callSupabaseRpc('submit_public_website_inquiry', {
    ...common,
    request_number: requestNumber,
    inquiry_topic: action.type === 'provider_interest' ? 'provider_subscription' : (payload.inquiry_topic || 'general_inquiry'),
    message: action.type === 'provider_interest' ? providerMessage : payload.message,
  });
  return { requestNumber: result.request_number || result.request_no || result.inquiry_number || requestNumber, payload };
}

function buildWhatsAppUrl(type, payload, requestNumber) {
  const lines = type === 'provider_interest'
    ? [
        'مرحبًا فريق بيت الريف،',
        'تم تسجيل طلب انضمام نشاطي عبر وياك.',
        `رقم المتابعة: ${requestNumber}`,
        `اسم النشاط: ${payload.business_name}`,
        `التخصص: ${payload.specialty}`,
        `مناطق الخدمة: ${payload.service_areas}`,
      ]
    : type === 'inquiry'
      ? [
          'مرحبًا فريق بيت الريف،',
          'تم تسجيل استفساري عبر وياك.',
          `رقم المتابعة: ${requestNumber}`,
          `الموضوع: ${payload.inquiry_topic}`,
        ]
      : [
          'مرحبًا فريق بيت الريف،',
          'تم تسجيل طلبي عبر وياك.',
          `رقم المتابعة: ${requestNumber}`,
          `الخدمة: ${payload.service_category}`,
          `الموقع: ${payload.emirate} - ${payload.city}`,
          `المواصفات: ${payload.specifications}`,
          `المقاسات: ${payload.measurements}`,
          `الميزانية: ${payload.budget_range}`,
          `موعد التنفيذ: ${payload.timeline}`,
        ];
  return `https://wa.me/971567856001?text=${encodeURIComponent(lines.join('\n'))}`;
}

function replyForSavedAction(type, requestNumber) {
  if (type === 'provider_interest') {
    return `تم يا طويل العمر 🤝 سجلت طلب انضمام نشاطك بنجاح، ورقم المتابعة ${requestNumber}. الحين تقدر ترسل الرقم لفريق الخدمة على واتساب لاستكمال النشر.`;
  }
  if (type === 'inquiry') {
    return `تم تسجيل استفسارك بنجاح 🤝 رقم المتابعة ${requestNumber}. تقدر الآن ترسل الرقم والتفاصيل لفريق الخدمة على واتساب.`;
  }
  return `تم يا طويل العمر 🤝 سجلت طلبك بنجاح، ورقم المتابعة ${requestNumber}. تقدر الآن ترسل الطلب لفريق الخدمة على واتساب لمتابعة التنفيذ.`;
}

function sanitizeLinks(rawLinks, platformContext) {
  if (!Array.isArray(rawLinks)) return [];
  const providerUrls = new Set((platformContext.providers || []).map((provider) => provider.canonical_url).filter(Boolean));
  const governmentHosts = new Set(Object.values(GOVERNMENT_SOURCES).flat().map((item) => new URL(item.href).hostname));
  return rawLinks
    .filter((link) => link && typeof link.label === 'string' && typeof link.href === 'string')
    .filter((link) => {
      try {
        const url = new URL(link.href);
        return url.hostname === 'bietalreef.ae' || url.hostname.endsWith('.bietalreef.ae') || providerUrls.has(link.href) || governmentHosts.has(url.hostname);
      } catch {
        return link.href.startsWith('/');
      }
    })
    .slice(0, 4);
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
    if (!requiredFieldsPresent(action)) {
      return res.status(400).json({ error: 'REQUIRED_FIELDS_MISSING', version: WEYAAK_VERSION });
    }
    try {
      const saved = await submitRequestedAction(action, {
        pagePath,
        audience: action.type === 'provider_interest' ? 'provider' : 'customer',
        userAgent: req.headers['user-agent'] || '',
      });
      return res.status(200).json({
        reply: replyForSavedAction(action.type, saved.requestNumber),
        request_number: saved.requestNumber,
        links: [{
          label: 'إرسال الطلب إلى خدمة العملاء على واتساب',
          href: buildWhatsAppUrl(action.type, saved.payload, saved.requestNumber),
        }],
        version: WEYAAK_VERSION,
      });
    } catch (error) {
      console.error('Weyaak direct submission failed:', error);
      return res.status(500).json({
        reply: 'المعذرة، ما تم حفظ الطلب حتى الآن. حاول مرة ثانية بعد لحظات؛ لن أحوّلك لواتساب قبل إصدار رقم متابعة رسمي.',
        links: [],
        version: WEYAAK_VERSION,
      });
    }
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      reply: 'إعدادات وياك غير مكتملة حاليًا. ما تم تسجيل أي بيانات.',
      links: [],
      version: WEYAAK_VERSION,
    });
  }

  const message = text(req.body?.message, 4000);
  const history = sanitizeHistory(req.body?.history);
  const previousState = req.body?.state && typeof req.body.state === 'object' ? req.body.state : {};
  if (!message) return res.status(400).json({ error: 'Message is required', version: WEYAAK_VERSION });

  try {
    const userConversation = userConversationText(history, message);
    const flags = {
      legalIntent: isLegalIntent(userConversation),
      sensitiveLegal: isSensitiveLegal(userConversation),
      tenderIntent: isTenderIntent(userConversation),
      emirate: detectEmirate(userConversation),
      annualOfferEligible: annualIntentConfirmed(userConversation),
    };

    if (flags.legalIntent && !flags.emirate) {
      return res.status(200).json({
        reply: 'يا مرحبا الساع. عشان أراجع لك الجهة الحكومية الصحيحة، الأمر يخص أي إمارة؟',
        audience: 'customer',
        intent: 'legal',
        links: [],
        intake: null,
        state: { audience: 'customer', intent: 'legal', payload: normalizePayload(previousState.payload) },
        model: MODEL,
        version: WEYAAK_VERSION,
      });
    }

    const platformContext = await loadPlatformContext(flags);
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.15,
        max_tokens: 750,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: buildWeyaakSystemPrompt(platformContext, flags) },
          ...history,
          { role: 'user', content: message },
        ],
      }),
    });

    const rawText = await openaiResponse.text();
    const data = rawText ? JSON.parse(rawText) : null;
    if (!openaiResponse.ok) {
      console.error('Weyaak OpenAI error:', { status: openaiResponse.status, body: data });
      return res.status(200).json({
        reply: 'لحظة يا طويل العمر، واجهت مشكلة مؤقتة أثناء مراجعة المعلومات. جرّب إرسال رسالتك مرة ثانية.',
        links: [],
        intake: null,
        state: previousState,
        model: MODEL,
        version: WEYAAK_VERSION,
      });
    }

    const rawReply = data?.choices?.[0]?.message?.content?.trim();
    const agent = parseModelJson(rawReply) || {
      reply: 'وصلت فكرتك. خبرني بالتفصيل الناقص عشان أرتبها لك.',
      audience: previousState.audience || 'unknown',
      intent: previousState.intent || 'general',
      match_status: 'not_applicable',
      links: [],
      intake_type: 'none',
      action: { type: 'none', payload: {} },
    };

    let audience = ['customer', 'provider', 'unknown'].includes(agent.audience) ? agent.audience : (previousState.audience || 'unknown');
    const intent = text(agent.intent, 80) || previousState.intent || 'general';
    let payload = mergePayload(previousState.payload, agent.action?.payload);

    if (flags.emirate && !payload.emirate) payload.emirate = emirateLabel(flags.emirate);
    const detectedCity = detectCity(userConversation);
    if (detectedCity && !payload.city) payload.city = detectedCity;

    if (intent === 'out_of_scope') {
      return res.status(200).json({
        reply: 'أقدّر سؤالك، لكن تدريبي مخصص لخدمة العملاء في مجالات البناء والمقاولات والصيانة والتصميم والخدمات المرتبطة بمنصة بيت الريف.',
        audience: 'unknown',
        intent,
        links: [],
        intake: null,
        state: { audience: 'unknown', intent, payload: {} },
        model: MODEL,
        version: WEYAAK_VERSION,
      });
    }

    if (flags.sensitiveLegal && flags.emirate) {
      const inquiryPayload = {
        ...payload,
        emirate: payload.emirate || emirateLabel(flags.emirate),
        inquiry_topic: payload.inquiry_topic || 'استفسار قانوني أو بلدي حساس',
        message: payload.message || message,
      };
      return res.status(200).json({
        reply: 'أقدّر حساسية الموضوع. هذا يحتاج مراجعة بشرية مختصة، فجهزت لك استفسارًا منظمًا بدون إعطاء حكم قانوني.',
        audience: 'customer',
        intent: 'legal',
        links: platformContext.government_sources,
        intake: buildIntake('inquiry', inquiryPayload),
        state: { audience: 'customer', intent: 'legal', payload: inquiryPayload },
        model: MODEL,
        version: WEYAAK_VERSION,
      });
    }

    const customerFlow = audience === 'customer' && [
      'provider_search', 'service_question', 'product_search', 'quote_request', 'tender',
    ].includes(intent);

    if (customerFlow) {
      const missing = firstMissing(payload, CUSTOMER_REQUIRED_FIELDS);
      if (missing) {
        return res.status(200).json({
          reply: customerQuestion(missing, payload),
          audience,
          intent,
          links: [],
          intake: null,
          state: { audience, intent, payload },
          model: MODEL,
          version: WEYAAK_VERSION,
          live_data: Boolean(SUPABASE_URL && SUPABASE_PUBLIC_KEY),
        });
      }

      const summary = `لحظة يا طويل العمر، أراجع لك بعض البيانات والمعلومات… تم ترتيب الطلب: ${payload.service_category} في ${payload.city}، بالمواصفات والمقاسات والميزانية والموعد اللي ذكرتها. راجع البطاقة وأضف الاسم ورقم الهاتف، وبعد تأكيدك أسجله رسميًا وأصدر لك رقم متابعة.`;
      return res.status(200).json({
        reply: summary,
        audience,
        intent,
        links: [],
        intake: buildIntake('quote_request', payload),
        state: { audience, intent, payload },
        model: MODEL,
        version: WEYAAK_VERSION,
        live_data: Boolean(SUPABASE_URL && SUPABASE_PUBLIC_KEY),
      });
    }

    if (audience === 'provider' || intent === 'provider_subscription') {
      audience = 'provider';
      const missing = firstMissing(payload, PROVIDER_REQUIRED_FIELDS);
      if (missing) {
        return res.status(200).json({
          reply: providerQuestion(missing),
          audience,
          intent: 'provider_subscription',
          links: [],
          intake: null,
          state: { audience, intent: 'provider_subscription', payload },
          model: MODEL,
          version: WEYAAK_VERSION,
          live_data: Boolean(SUPABASE_URL && SUPABASE_PUBLIC_KEY),
        });
      }

      let reply = 'لحظة يا طويل العمر، أراجع لك بعض البيانات والمعلومات… بيانات نشاطك واضحة، والحين راجع بطاقة الانضمام وأضف اسم المسؤول ورقم الهاتف.';
      if (flags.annualOfferEligible && platformContext.annual_offer) {
        const offer = platformContext.annual_offer;
        reply += ` وبما أنك أكدت الاشتراك السنوي، لك هدية خصم 10%؛ تصبح القيمة ${offer.discounted_price} ${offer.currency} بدل ${offer.original_price} ${offer.currency}.`;
      }
      return res.status(200).json({
        reply,
        audience,
        intent: 'provider_subscription',
        links: [],
        intake: buildIntake('provider_interest', payload),
        state: { audience, intent: 'provider_subscription', payload },
        model: MODEL,
        version: WEYAAK_VERSION,
        live_data: Boolean(SUPABASE_URL && SUPABASE_PUBLIC_KEY),
      });
    }

    let links = sanitizeLinks(agent.links, platformContext);
    if (flags.legalIntent && flags.emirate) links = platformContext.government_sources;

    return res.status(200).json({
      reply: text(agent.reply, 900) || 'وصلت فكرتك. خبرني بشيء واحد: هل تبحث عن خدمة، أم لديك نشاط تجاري؟',
      audience,
      intent,
      links,
      intake: null,
      state: { audience, intent, payload },
      model: MODEL,
      version: WEYAAK_VERSION,
      live_data: Boolean(SUPABASE_URL && SUPABASE_PUBLIC_KEY),
    });
  } catch (error) {
    console.error('Weyaak chat fatal error:', error);
    return res.status(200).json({
      reply: 'المعذرة يا طويل العمر، ما قدرت أكمل مراجعة المعلومات الآن. جرّب مرة ثانية بعد لحظات.',
      links: [],
      intake: null,
      state: req.body?.state || {},
      model: MODEL,
      version: WEYAAK_VERSION,
    });
  }
}
