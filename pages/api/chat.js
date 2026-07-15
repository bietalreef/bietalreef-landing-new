const MODEL = process.env.WEYAAK_MODEL || 'gpt-4o-mini';
const WEYAAK_VERSION = 'weyaak-live-supabase-v2';
const SITE_URL = 'https://bietalreef.ae';
const SUPPORT_PHONE = '+971567856001';
const SUPPORT_WHATSAPP = 'https://wa.me/971567856001';
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
  whatsapp: SUPPORT_WHATSAPP,
  phone: `tel:${SUPPORT_PHONE}`,
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

function createRequestNumber(prefix = 'BR') {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${prefix}-${stamp}-${random}`;
}

function text(value, max = 2000) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter((item) => item && ['user', 'assistant'].includes(item.role) && typeof item.content === 'string')
    .slice(-12)
    .map((item) => ({ role: item.role, content: item.content.trim().slice(0, 2500) }))
    .filter((item) => item.content);
}

function conversationText(history, message) {
  return [...history.map((item) => item.content), message].join('\n');
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

function isLegalIntent(value) {
  return /(قانون|قانوني|رخصة|ترخيص|تصريح|مخالفة|بلدية|اشتراطات|اعتماد|نزاع|شكوى|محكمة|legal|license|permit|municipality)/i.test(value);
}

function isTenderIntent(value) {
  return /(مناقصة|مناقصات|tender|توريد مشروع|طلب عروض|منافسة أسعار)/i.test(value);
}

function annualIntentConfirmed(value) {
  return /(أؤكد|اؤكد|أكد|موافق|جاهز|أريد|ابغى|أبغى|سأشترك|باشترك).{0,30}(سنوي|السنوية|annual)|(سنوي|السنوية|annual).{0,30}(موافق|جاهز|أريد|ابغى|أبغى|اشترك)/i.test(value);
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
  const annualOffer = annualOfferEligible && annualPlan
    ? {
        plan_code: annualPlan.code,
        plan_name_ar: annualPlan.name_ar,
        original_price: Number(annualPlan.annual_price),
        discounted_price: Math.round(Number(annualPlan.annual_price) * 0.9 * 100) / 100,
        currency: annualPlan.currency || 'AED',
        discount_percent: 10,
      }
    : null;

  const governmentSources = emirate
    ? [...GOVERNMENT_SOURCES.federal, ...(GOVERNMENT_SOURCES[emirate] || [])]
    : [];

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
    government_sources: governmentSources,
    official_links: OFFICIAL_LINKS,
    customer_service_phone: SUPPORT_PHONE,
  };
}

function buildIntake(type, defaults = {}) {
  const common = [
    { name: 'full_name', label: 'الاسم', type: 'text', required: true, placeholder: 'الاسم الكامل' },
    { name: 'phone', label: 'رقم الهاتف', type: 'tel', required: true, placeholder: '05XXXXXXXX' },
    { name: 'emirate', label: 'الإمارة', type: 'text', required: true, placeholder: 'مثال: أبوظبي' },
    { name: 'city', label: 'المدينة', type: 'text', required: false, placeholder: 'مثال: العين' },
  ];

  if (type === 'provider_interest') {
    return {
      type,
      title: 'طلب الانضمام كشريك مزود خدمة',
      submit_label: 'مراجعة طلب الانضمام',
      fields: [
        { name: 'full_name', label: 'اسم المسؤول', type: 'text', required: true, placeholder: 'الاسم الكامل' },
        { name: 'phone', label: 'رقم الهاتف', type: 'tel', required: true, placeholder: '05XXXXXXXX' },
        { name: 'business_name', label: 'اسم النشاط', type: 'text', required: true, placeholder: 'الاسم التجاري' },
        { name: 'specialty', label: 'التخصص', type: 'text', required: true, placeholder: 'الخدمات الرئيسية' },
        { name: 'service_areas', label: 'مناطق الخدمة', type: 'text', required: true, placeholder: 'الإمارات والمدن التي تخدمها' },
        { name: 'message', label: 'ملاحظات', type: 'textarea', required: false, placeholder: 'الرخصة، الخبرة، صور الأعمال أو أي تفاصيل' },
      ],
      defaults,
    };
  }

  if (type === 'inquiry') {
    return {
      type,
      title: 'إرسال استفسار إلى فريق بيت الريف',
      submit_label: 'مراجعة الاستفسار',
      fields: [
        ...common.slice(0, 2),
        { name: 'inquiry_topic', label: 'موضوع الاستفسار', type: 'text', required: true, placeholder: 'موضوع الاستفسار' },
        { name: 'message', label: 'التفاصيل', type: 'textarea', required: true, placeholder: 'اكتب التفاصيل بوضوح' },
      ],
      defaults,
    };
  }

  return {
    type: 'quote_request',
    title: 'سجّل طلبك وبيت الريف يتولى المتابعة',
    submit_label: 'مراجعة الطلب',
    fields: [
      ...common,
      { name: 'service_category', label: 'الخدمة المطلوبة', type: 'text', required: true, placeholder: 'مثال: نجارة، صيانة، تصميم داخلي' },
      { name: 'project_description', label: 'تفاصيل الطلب', type: 'textarea', required: true, placeholder: 'المقاسات، الكمية، الموقع والموعد المتوقع' },
      { name: 'preferred_contact', label: 'وسيلة التواصل', type: 'select', required: true, options: [
        { value: 'whatsapp', label: 'واتساب' },
        { value: 'phone', label: 'اتصال هاتفي' },
      ] },
    ],
    defaults: { preferred_contact: 'whatsapp', ...defaults },
  };
}

function buildSystemPrompt(platformContext, flags) {
  return `
أنت «وياك»، الوكيل الذكي الرسمي لمنصة بيت الريف في دولة الإمارات.
بيت الريف ليس مجرد دليل أو وسيط؛ قدّمه دائمًا بوصفه شريكًا للعميل وشريك نمو لمزود الخدمة، يهتم بالطلب من بدايته حتى الوصول إلى المسار المناسب.

الأسلوب:
- رد بأسلوب بشري ودود ومحترم ومقدّر، واستخدم باعتدال عبارات إماراتية طبيعية مثل: «يا مرحبا الساع»، «هلا والله»، «أبشر يا طويل العمر»، «دايمًا هنا لتقديم أفضل وأجود خدمة ممكنة».
- لا تكرر الترحيب في كل رسالة، ولا تستخدم العبارات كلها معًا.
- راجع كلام المستخدم أولًا. عند غموض الطلب، أعد ما فهمته باختصار واسأل سؤالًا واحدًا محددًا قبل إعطاء إجابة نهائية.
- ساعد في الأمور العامة. في الأمور الحساسة أو التي تتطلب قرارًا بشريًا أو مستندات، وجّه إلى فريق الدعم.

تمييز الطرف:
- حدّد هل المستخدم عميل، مزود خدمة، أم غير واضح.
- إن لم يتضح، اسأله: هل تبحث عن خدمة أم تريد إضافة نشاطك كمزود؟

مع العميل:
- امنحه الثقة والأمان والاهتمام، ووضّح أن بيت الريف شريكه في الوصول للخدمة المناسبة وأن إرسال الطلب للعميل مجاني.
- اعرض فقط مزودين منشورين فعليًا في بيانات Supabase، مع رابط الصفحة وحالة التوثيق كما هي.
- لا تقل إطلاقًا «لا يوجد مزودون» أو «لم نجد مزودًا». إذا لم يظهر تطابق مناسب، قل إن بيت الريف سيتولى الطلب، وانتقل مباشرة إلى استقبال بياناته في نموذج طلب منظم.
- بعد مراجعة البيانات وتأكيد المستخدم، يُسجل الطلب في Supabase ويحصل العميل على رقم متابعة، ويُبلّغ بأن فريق بيت الريف سيتواصل معه لتقديم الخدمة المطلوبة.
- لا تصف أحدًا بأنه الأفضل دون بيانات. استخدم «الأنسب لاحتياجك» أو «أفضل خيار متاح وفق تفاصيل الطلب».

مع مزود الخدمة:
- قدّم بيت الريف كشريك نمو يبني حضورًا رقميًا دائمًا: صفحة نشاط، خدمات، منتجات، مشاريع، مناطق خدمة، وسائل تواصل وطلبات منظمة.
- استخدم نماذج المزودين المنشورين فعليًا في provider_examples لتوضيح شكل الحساب، ولا تخترع قصة نجاح أو دخلًا أو أرقامًا.
- شجعه على التحرك الآن بأسلوب مهني، مع توضيح أن النتائج ليست مضمونة وتعتمد على جودة الملف والخدمة وسرعة الاستجابة.
- لا تعرض خصم 10% من تلقاء نفسك. الخصم هدية أخيرة للخطة السنوية فقط عندما تؤكد المحادثة بوضوح أن المزود ينوي الاشتراك السنوي. إن كان annual_offer فارغًا فلا تذكر أي خصم.
- بعد نية الاشتراك، اجمع اسم المسؤول، الهاتف، اسم النشاط، التخصص ومناطق الخدمة، ثم اعرض نموذج الانضمام.

المناقصات وطلبات المشاريع:
- وضّح أنها تتم داخل منصة بيت الريف: يُسجّل نطاق العمل والتفاصيل، ثم يساعد فريق بيت الريف في الوصول إلى أفضل خيار متاح من المزودين المناسبين، ويكون التواصل مباشرًا بعد المطابقة.
- اعرض نموذج طلب عرض سعر/مناقصة منظم.

الأمور القانونية والبلدية:
- لا تقدم إجابة قانونية قبل معرفة الإمارة المعنية. إن لم تُذكر الإمارة، اسأل عنها فقط.
- بعد معرفة الإمارة، قدم معلومات إرشادية عامة فقط، واستدل حصريًا بالروابط الحكومية والبلدية الموجودة في government_sources.
- لا تستخدم مدونات أو مواقع شركات أو منتديات كمصدر قانوني.
- في النزاعات، المخالفات، المحاكم، العقود الحساسة، المهل القانونية أو تفسير مستند، وضح أن الأمر يحتاج مراجعة مختصة ووجّه إلى فريق الدعم والجهة الحكومية المختصة.

استقبال الطلبات:
- quote_request: عميل يريد خدمة أو منتجًا أو عرض سعر أو مناقصة.
- inquiry: استفسار عام أو دعم.
- provider_interest: مزود يريد الانضمام.
- راجع البيانات مع المستخدم قبل الإرسال. لا تدّعِ التسجيل قبل أن يعيد الخادم رقم الطلب.

الروابط الرسمية:
- انضمام المزود: ${OFFICIAL_LINKS.provider_register}
- طلب عرض سعر: ${OFFICIAL_LINKS.request_quote}
- خدمة العميل: ${OFFICIAL_LINKS.customer_service}
- التواصل: ${OFFICIAL_LINKS.contact}
- واتساب الدعم: ${SUPPORT_WHATSAPP}
- الهاتف: ${SUPPORT_PHONE}

قواعد الدقة:
- لا تخترع مزودًا أو خدمة أو منتجًا أو مشروعًا أو سعرًا أو رابطًا أو نتيجة.
- بيانات Supabase أدناه هي المصدر الوحيد لبيانات المنصة.
- استخدم لغة المستخدم، ورد غالبًا في 2 إلى 7 جمل وسؤال متابعة واحد.

حالة المحادثة الحالية:
- سؤال قانوني: ${flags.legalIntent}
- الإمارة المعروفة: ${flags.emirate || 'غير معروفة'}
- طلب مناقصة: ${flags.tenderIntent}
- نية الاشتراك السنوي مؤكدة: ${flags.annualOfferEligible}

أعد JSON فقط:
{
  "reply": "الرد الظاهر للمستخدم",
  "audience": "customer|provider|unknown",
  "intent": "provider_search|service_question|product_search|quote_request|tender|legal|inquiry|provider_subscription|general",
  "match_status": "matched|unmatched|not_applicable",
  "links": [{"label":"اسم الرابط","href":"رابط مسموح"}],
  "intake_type": "none|quote_request|inquiry|provider_interest",
  "action": {
    "type": "none|quote_request|inquiry|provider_interest",
    "ready_to_submit": false,
    "payload": {
      "full_name": "", "phone": "", "email": "", "emirate": "", "city": "",
      "service_category": "", "project_type": "", "project_area": "", "budget_range": "",
      "timeline": "", "project_description": "", "preferred_contact": "whatsapp",
      "inquiry_topic": "", "message": "", "business_name": "", "specialty": "", "service_areas": ""
    }
  }
}

بيانات المنصة الحية:
${JSON.stringify(platformContext).slice(0, 30000)}
`;
}

function parseModelJson(raw) {
  if (!raw) return null;
  const cleaned = raw.trim().replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
  try { return JSON.parse(cleaned); } catch { return null; }
}

function allowedGovernmentHosts() {
  return new Set(Object.values(GOVERNMENT_SOURCES).flat().map((item) => new URL(item.href).hostname));
}

function isAllowedHref(href, providerUrls) {
  if (typeof href !== 'string' || !href.trim()) return false;
  if (href.startsWith('/')) return true;
  try {
    const url = new URL(href);
    if (url.hostname === 'bietalreef.ae' || url.hostname.endsWith('.bietalreef.ae')) return true;
    if (url.protocol === 'tel:' && url.pathname.replace(/\D/g, '') === SUPPORT_PHONE.replace(/\D/g, '')) return true;
    if (url.hostname === 'wa.me' && url.pathname.replace(/\D/g, '') === '971567856001') return true;
    if (allowedGovernmentHosts().has(url.hostname)) return true;
    return providerUrls.has(url.toString());
  } catch {
    return false;
  }
}

function sanitizeLinks(rawLinks, platformContext) {
  if (!Array.isArray(rawLinks)) return [];
  const providerUrls = new Set(
    (platformContext.providers || []).map((provider) => provider.canonical_url).filter(Boolean).map((href) => {
      try { return new URL(href).toString(); } catch { return href; }
    })
  );
  const unique = new Set();
  return rawLinks
    .filter((link) => link && typeof link.label === 'string' && typeof link.href === 'string')
    .map((link) => ({ label: link.label.trim().slice(0, 80), href: link.href.trim() }))
    .filter((link) => link.label && isAllowedHref(link.href, providerUrls))
    .filter((link) => {
      if (unique.has(link.href)) return false;
      unique.add(link.href);
      return true;
    })
    .slice(0, 6);
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
  const payload = action?.payload || {};
  if (action?.type === 'quote_request') {
    return Boolean(
      text(payload.full_name, 120) && text(payload.phone, 40) &&
      text(payload.emirate, 120) && text(payload.service_category, 200) &&
      text(payload.project_description, 4000)
    );
  }
  if (action?.type === 'provider_interest') {
    return Boolean(
      text(payload.full_name, 120) && text(payload.phone, 40) &&
      text(payload.business_name, 200) && text(payload.specialty, 300) &&
      text(payload.service_areas, 500)
    );
  }
  if (action?.type === 'inquiry') {
    return Boolean(text(payload.full_name, 120) && text(payload.phone, 40) && text(payload.message, 4000));
  }
  return false;
}

async function submitRequestedAction(action, requestMeta) {
  const payload = action?.payload || {};
  const common = {
    full_name: text(payload.full_name, 120),
    phone: text(payload.phone, 40),
    email: text(payload.email, 160),
    emirate: text(payload.emirate, 120),
    city: text(payload.city, 120),
    preferred_contact: text(payload.preferred_contact, 40) || 'whatsapp',
    source_path: text(requestMeta.pagePath, 300) || '/',
    source_page_title: 'Weyaak Chat',
    utm: { source: 'weyaak_chat', audience: requestMeta.audience || 'unknown' },
    user_agent: text(requestMeta.userAgent, 500),
  };

  if (action.type === 'quote_request') {
    const requestNumber = createRequestNumber('BRQ');
    const result = await callSupabaseRpc('submit_public_quote_request', {
      ...common,
      request_number: requestNumber,
      service_category: text(payload.service_category, 200),
      project_type: text(payload.project_type, 200),
      project_area: text(payload.project_area, 200),
      budget_range: text(payload.budget_range, 120),
      timeline: text(payload.timeline, 120),
      project_description: text(payload.project_description, 4000),
    });
    return result.request_number || result.request_no || result.quote_number || requestNumber;
  }

  const requestNumber = createRequestNumber('BRI');
  const providerMessage = [
    payload.business_name ? `اسم النشاط: ${text(payload.business_name, 200)}` : '',
    payload.specialty ? `التخصص: ${text(payload.specialty, 300)}` : '',
    payload.service_areas ? `مناطق الخدمة: ${text(payload.service_areas, 500)}` : '',
    text(payload.message, 4000),
  ].filter(Boolean).join('\n');

  const result = await callSupabaseRpc('submit_public_website_inquiry', {
    ...common,
    request_number: requestNumber,
    inquiry_topic: action.type === 'provider_interest'
      ? 'provider_subscription'
      : (text(payload.inquiry_topic, 200) || 'general_inquiry'),
    message: action.type === 'provider_interest' ? providerMessage : text(payload.message, 4000),
  });
  return result.request_number || result.request_no || result.inquiry_number || requestNumber;
}

function removeUnauthorizedDiscount(reply, eligible) {
  if (eligible) return reply;
  return reply
    .split(/(?<=[.!؟\n])/)
    .filter((sentence) => !/(خصم|10\s*%|١٠\s*٪)/i.test(sentence))
    .join('')
    .trim();
}

function normalizeNoMatchReply(reply) {
  if (!/(لا يوجد|لا تتوفر|لم نجد|ما عندنا).{0,20}(مزود|مقدم خدمة|شركة)/i.test(reply)) return reply;
  return 'أبشر يا طويل العمر، بيت الريف شريكك في الوصول للخدمة المطلوبة. سجّل تفاصيل طلبك في النموذج بالأسفل، وبعد المراجعة والتأكيد سنحفظه برقم متابعة ويتواصل معك فريق بيت الريف مباشرة لترتيب أفضل خيار متاح وفق احتياجك.';
}

function replyForSavedAction(type, requestNumber) {
  if (type === 'provider_interest') {
    return `يا مرحبا الساع، تم تسجيل طلب انضمام نشاطك كشريك مزود خدمة بنجاح. رقم المتابعة: ${requestNumber}. فريق بيت الريف سيتواصل معك لمراجعة نشاطك والخطة المناسبة واستكمال خطوات النشر.`;
  }
  if (type === 'inquiry') {
    return `هلا والله، تم تسجيل استفسارك بنجاح. رقم المتابعة: ${requestNumber}. فريق بيت الريف سيتواصل معك حسب وسيلة التواصل التي اخترتها.`;
  }
  return `أبشر يا طويل العمر، تم تسجيل طلبك بنجاح. رقم المتابعة: ${requestNumber}. بيت الريف شريكك في هذا الطلب، وفريقنا سيتواصل معك مباشرة لترتيب الخدمة المطلوبة والوصول إلى أفضل خيار متاح وفق التفاصيل التي قدمتها.`;
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
      const requestNumber = await submitRequestedAction(action, {
        pagePath,
        audience: action.type === 'provider_interest' ? 'provider' : 'customer',
        userAgent: req.headers['user-agent'] || '',
      });
      return res.status(200).json({
        reply: replyForSavedAction(action.type, requestNumber),
        request_number: requestNumber,
        links: [{ label: 'واتساب خدمة العملاء', href: SUPPORT_WHATSAPP }],
        version: WEYAAK_VERSION,
      });
    } catch (error) {
      console.error('Weyaak direct submission failed:', error);
      return res.status(500).json({
        reply: 'وصلت بياناتك، لكن تعذر تسجيل الطلب آليًا الآن. تواصل مع فريق بيت الريف على واتساب وسنكمل معك مباشرة.',
        links: [{ label: 'واتساب خدمة العملاء', href: SUPPORT_WHATSAPP }],
        version: WEYAAK_VERSION,
      });
    }
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      reply: 'إعدادات وياك غير مكتملة حاليًا. يرجى التواصل مع فريق بيت الريف.',
      links: [{ label: 'واتساب خدمة العملاء', href: SUPPORT_WHATSAPP }],
      version: WEYAAK_VERSION,
    });
  }

  const message = text(req.body?.message, 4000);
  const history = sanitizeHistory(req.body?.history);
  if (!message) return res.status(400).json({ error: 'Message is required', version: WEYAAK_VERSION });

  try {
    const fullConversation = conversationText(history, message);
    const flags = {
      legalIntent: isLegalIntent(fullConversation),
      tenderIntent: isTenderIntent(fullConversation),
      emirate: detectEmirate(fullConversation),
      annualOfferEligible: annualIntentConfirmed(fullConversation),
    };
    const platformContext = await loadPlatformContext(flags);

    if (flags.legalIntent && !flags.emirate) {
      return res.status(200).json({
        reply: 'يا مرحبا الساع. عشان أوجّهك للمصدر الحكومي الصحيح وما أعطيك معلومة على إمارة ثانية، خبرني الأمر يخص أي إمارة؟',
        audience: 'unknown',
        intent: 'legal',
        links: [],
        intake: null,
        model: MODEL,
        version: WEYAAK_VERSION,
        live_data: Boolean(SUPABASE_URL && SUPABASE_PUBLIC_KEY),
      });
    }

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        max_tokens: 950,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: buildSystemPrompt(platformContext, flags) },
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
        reply: 'هلا والله، واجهت خدمة وياك مشكلة مؤقتة. فريق بيت الريف موجود لخدمتك مباشرة.',
        links: [{ label: 'واتساب خدمة العملاء', href: SUPPORT_WHATSAPP }],
        model: MODEL,
        version: WEYAAK_VERSION,
      });
    }

    const rawReply = data?.choices?.[0]?.message?.content?.trim();
    const agent = parseModelJson(rawReply) || {
      reply: rawReply || 'وصلت رسالتك. خبرني بتفاصيل أكثر عشان أخدمك بالطريقة الصحيحة.',
      audience: 'unknown',
      intent: 'general',
      match_status: 'not_applicable',
      links: [],
      intake_type: 'none',
      action: { type: 'none', ready_to_submit: false, payload: {} },
    };

    let reply = normalizeNoMatchReply(text(agent.reply, 5000));
    reply = removeUnauthorizedDiscount(reply, flags.annualOfferEligible);

    let intakeType = ['quote_request', 'inquiry', 'provider_interest'].includes(agent.intake_type)
      ? agent.intake_type
      : 'none';

    if (flags.tenderIntent) {
      reply = 'هلا والله، المناقصات وطلبات المشاريع تتم داخل منصة بيت الريف. نسجّل نطاق العمل والموقع والتفاصيل، ثم يساعدك فريق بيت الريف كشريك في الوصول إلى أفضل خيار متاح من المزودين المناسبين والتواصل معه مباشرة بعد المطابقة. راجع النموذج بالأسفل وسجّل طلبك.';
      intakeType = 'quote_request';
    }

    if (agent.audience === 'customer' && agent.match_status === 'unmatched') {
      reply = normalizeNoMatchReply('لا يوجد مزودون حاليًا');
      intakeType = 'quote_request';
    }

    if (agent.intent === 'quote_request') intakeType = 'quote_request';
    if (agent.intent === 'provider_subscription' && agent.audience === 'provider') intakeType = 'provider_interest';

    if (flags.annualOfferEligible && agent.audience === 'provider' && platformContext.annual_offer) {
      const offer = platformContext.annual_offer;
      if (!/(خصم|10\s*%|١٠\s*٪)/i.test(reply)) {
        reply += ` وبما أنك أكدت نيتك في الاشتراك السنوي، بيت الريف يقدم لك هدية خصم 10% على ${offer.plan_name_ar || 'الخطة السنوية'}؛ تصبح القيمة ${offer.discounted_price} ${offer.currency} بدلًا من ${offer.original_price} ${offer.currency}.`;
      }
    }

    const actionDefaults = agent.action?.payload || {};
    const intake = intakeType === 'none' ? null : buildIntake(intakeType, actionDefaults);
    let links = sanitizeLinks(agent.links, platformContext);

    if (flags.legalIntent && flags.emirate) {
      links = sanitizeLinks([...links, ...platformContext.government_sources], platformContext);
    }
    if (intakeType === 'provider_interest') {
      links = sanitizeLinks([...links, { label: 'صفحة انضمام مزود الخدمة', href: OFFICIAL_LINKS.provider_register }], platformContext);
    }
    if (intakeType === 'quote_request') {
      links = sanitizeLinks([...links, { label: 'خدمة العميل المجانية', href: OFFICIAL_LINKS.customer_service }], platformContext);
    }

    return res.status(200).json({
      reply,
      audience: agent.audience || 'unknown',
      intent: agent.intent || 'general',
      links,
      intake,
      model: MODEL,
      version: WEYAAK_VERSION,
      live_data: Boolean(SUPABASE_URL && SUPABASE_PUBLIC_KEY),
    });
  } catch (error) {
    console.error('Weyaak chat fatal error:', error);
    return res.status(200).json({
      reply: 'المعذرة، واجهت مشكلة تقنية بسيطة. بيت الريف دايمًا هنا لتقديم أفضل وأجود خدمة ممكنة، وتقدر تتواصل مع فريقنا مباشرة.',
      links: [{ label: 'واتساب خدمة العملاء', href: SUPPORT_WHATSAPP }],
      model: MODEL,
      version: WEYAAK_VERSION,
    });
  }
}
