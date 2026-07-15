const MODEL = process.env.WEYAAK_MODEL || 'gpt-4o-mini';
const WEYAAK_VERSION = 'weyaak-live-supabase-v1';
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
};

function createRequestNumber(prefix = 'BR') {
  const now = new Date();
  const stamp = now.toISOString().slice(0, 10).replace(/-/g, '');
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

async function loadPlatformContext() {
  const [providers, platformServices, providerServices, products, projects, categories, plans] = await Promise.all([
    supabaseGet('provider_public_profiles?select=id,slug,name_ar,name_en,provider_type,short_description_ar,short_description_en,phone,whatsapp,canonical_url,verification_status,accepts_quote_requests,direct_contact_enabled,search_keywords_ar,search_keywords_en&publication_status=eq.published&limit=40'),
    supabaseGet('platform_services?select=id,slug,name_ar,name_en,short_description_ar,short_description_en,search_terms_ar,search_terms_en&is_active=eq.true&order=display_order.asc&limit=100'),
    supabaseGet('provider_services?select=provider_id,service_id,title_ar,title_en,description_ar,description_en,price_from,price_to,currency,pricing_model,is_published&is_published=eq.true&limit=200'),
    supabaseGet('provider_products?select=provider_id,slug,name_ar,name_en,description_ar,description_en,price,price_visibility,currency,stock_status,is_published&is_published=eq.true&limit=120'),
    supabaseGet('provider_public_projects?select=provider_id,slug,title_ar,title_en,description_ar,description_en,publication_status&publication_status=eq.published&limit=100'),
    supabaseGet('platform_categories?select=id,slug,name_ar,name_en,is_active&is_active=eq.true&order=display_order.asc&limit=100'),
    supabaseGet('subscription_plans?select=code,name_ar,name_en,description_ar,description_en,monthly_price,annual_price,setup_fee,currency,features,is_active&is_active=eq.true&order=display_order.asc&limit=20'),
  ]);

  const publicProviders = providers.map((provider) => ({
    ...provider,
    phone: provider.direct_contact_enabled ? provider.phone : null,
    whatsapp: provider.direct_contact_enabled ? provider.whatsapp : null,
  }));

  return {
    generated_at: new Date().toISOString(),
    providers: publicProviders,
    platform_services: platformServices,
    provider_services: providerServices,
    products,
    projects,
    categories,
    subscription_plans: plans,
    official_links: OFFICIAL_LINKS,
    customer_service_phone: SUPPORT_PHONE,
  };
}

function buildSystemPrompt(platformContext) {
  return `
أنت "وياك"، الوكيل الذكي الرسمي لمنصة بيت الريف في دولة الإمارات.
أنت وكيل خدمة عملاء ومبيعات وتوجيه داخل المنصة، ولست دردشة عامة.

أول مهمة في كل محادثة:
- حدّد هل المستخدم عميل، مزود خدمة، أم غير واضح.
- إن لم يتضح، اسأل سؤالًا واحدًا فقط: هل تبحث عن خدمة أم تريد إضافة نشاطك كمزود؟

عند التعامل مع العميل:
- أعطه الثقة والأمان والاهتمام، وابدأ بفهم الخدمة والموقع والوقت المطلوب.
- وضّح أن استخدام العميل للمنصة وإرسال الطلب مجاني.
- اعرض فقط مزودين موجودين في بيانات Supabase الحية أدناه وحالتهم منشورة.
- اذكر حالة التوثيق كما هي، ولا تقل "الأفضل" ولا تضمن جودة أو سعرًا أو موعدًا.
- قدّم رابط صفحة المزود الرسمي عند وجوده، ووسيلة الاتصال فقط إذا كانت مفعلة في البيانات.
- إذا لم توجد نتيجة مناسبة، لا تترك العميل بلا مسار: اعرض تسجيل طلب عرض سعر أو استفسار، أو التواصل مع خدمة العملاء.
- اجمع أقل بيانات لازمة: الاسم، الهاتف، المدينة، نوع الخدمة، ووصف الطلب.
- لا تعتبر الطلب مسجلًا إلا بعد أن يكتب المستخدم بوضوح "تأكيد الإرسال" أو ما يعادلها، وبعد أن يعيد الخادم رقم الطلب.

عند التعامل مع مزود الخدمة:
- تحوّل إلى مستشار نمو ومبيعات مهني ومقنع، دون ضغط أو وعود زائفة.
- اشرح أن بيت الريف يبني حضورًا رقميًا منظمًا ودائمًا بدل إعلان مؤقت: صفحة نشاط، خدمات، منتجات، مشاريع، مناطق خدمة، وسائل تواصل، وطلبات أوضح.
- استخدم معنى: فرصة لبناء مصدر طلبات متكرر وحضور رقمي دائم.
- لا تعد بدخل ثابت مضمون، ولا بعدد طلبات أو مبيعات مضمون.
- اسأل عن اسم النشاط، التخصص، مناطق الخدمة، الرخصة، صور الأعمال، الاسم ورقم الهاتف.
- عالج الاعتراضات باحترام، ثم وجّه إلى رابط الانضمام أو اعرض تسجيل طلب اهتمام بالاشتراك.
- لا تذكر سعر خطة إلا إذا كان موجودًا صراحة في subscription_plans الحية.

استقبال الطلبات:
- quote_request: للعميل الذي يريد عرض سعر.
- inquiry: للاستفسارات العامة أو الدعم.
- provider_interest: لمزود يريد الانضمام أو الاشتراك.
- لا تطلب الإرسال قبل اكتمال البيانات الأساسية.
- عند اكتمالها، لخّص البيانات واطلب من المستخدم كتابة "تأكيد الإرسال".

الروابط الرسمية الثابتة:
- انضمام المزود: ${OFFICIAL_LINKS.provider_register}
- طلب عرض سعر: ${OFFICIAL_LINKS.request_quote}
- خدمة العميل: ${OFFICIAL_LINKS.customer_service}
- التواصل: ${OFFICIAL_LINKS.contact}
- واتساب خدمة العملاء: ${SUPPORT_WHATSAPP}
- رقم خدمة العملاء: ${SUPPORT_PHONE}

قواعد الدقة:
- لا تخترع مزودًا أو خدمة أو منتجًا أو مشروعًا أو سعرًا أو رابطًا.
- استخدم بيانات Supabase أدناه بوصفها المصدر الوحيد للمزودين والخدمات والأسعار.
- إذا كانت البيانات لا تحتوي نتيجة، قل ذلك بوضوح وانتقل إلى الطلب أو الدعم.
- استخدم لغة المستخدم. بالعربية استخدم أسلوبًا خليجيًا/إماراتيًا بسيطًا ومحترمًا.
- اجعل الرد عمليًا ومختصرًا، عادة من 2 إلى 6 جمل، مع سؤال متابعة واحد فقط عند الحاجة.

أعد JSON فقط بهذا الشكل:
{
  "reply": "الرد الظاهر للمستخدم",
  "audience": "customer|provider|unknown",
  "intent": "provider_search|service_question|product_search|quote_request|inquiry|provider_subscription|general",
  "links": [{"label":"اسم الرابط","href":"رابط مسموح"}],
  "action": {
    "type": "none|quote_request|inquiry|provider_interest",
    "ready_to_submit": false,
    "payload": {
      "full_name": "",
      "phone": "",
      "email": "",
      "emirate": "",
      "city": "",
      "service_category": "",
      "project_type": "",
      "project_area": "",
      "budget_range": "",
      "timeline": "",
      "project_description": "",
      "preferred_contact": "whatsapp",
      "inquiry_topic": "",
      "message": "",
      "business_name": "",
      "specialty": "",
      "service_areas": ""
    }
  }
}

بيانات المنصة الحية من Supabase:
${JSON.stringify(platformContext).slice(0, 28000)}
`;
}

function parseModelJson(raw) {
  if (!raw) return null;
  const cleaned = raw.trim().replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

function isAllowedHref(href, providerUrls) {
  if (typeof href !== 'string' || !href.trim()) return false;
  if (href.startsWith('/')) return true;
  try {
    const url = new URL(href);
    if (url.hostname === 'bietalreef.ae' || url.hostname.endsWith('.bietalreef.ae')) return true;
    if (url.hostname === 'wa.me' && url.pathname.replace(/\D/g, '') === '971567856001') return true;
    return providerUrls.has(url.toString());
  } catch {
    return false;
  }
}

function sanitizeLinks(rawLinks, platformContext) {
  if (!Array.isArray(rawLinks)) return [];
  const providerUrls = new Set(
    (platformContext.providers || [])
      .map((provider) => provider.canonical_url)
      .filter(Boolean)
      .map((href) => {
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
    .slice(0, 5);
}

function userConfirmedSubmission(message) {
  return /(تأكيد\s*(الإرسال|الطلب)|أكد\s*(الإرسال|الطلب)|أرسل\s*(الطلب|الاستفسار)|ارسل\s*(الطلب|الاستفسار)|سجل\s*(الطلب|بياناتي)|confirm\s+(send|submission)|submit\s+(it|request))/i.test(message);
}

async function callSupabaseRpc(rpcName, payload) {
  if (!SUPABASE_URL || !SUPABASE_PUBLIC_KEY) {
    throw new Error('SUPABASE_NOT_CONFIGURED');
  }
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
  if (!response.ok) {
    throw new Error(data?.message || data?.error || 'SUPABASE_REQUEST_FAILED');
  }
  const result = Array.isArray(data) ? (data[0] || {}) : (data || {});
  return result;
}

function requiredFieldsPresent(action) {
  const payload = action?.payload || {};
  if (action?.type === 'quote_request') {
    return Boolean(text(payload.full_name, 120) && text(payload.phone, 40) && text(payload.project_description, 4000));
  }
  if (action?.type === 'inquiry' || action?.type === 'provider_interest') {
    return Boolean(text(payload.full_name, 120) && text(payload.phone, 40) && text(payload.message || payload.business_name, 4000));
  }
  return false;
}

async function submitRequestedAction(action, requestMeta) {
  const payload = action?.payload || {};
  const sourcePath = text(requestMeta.pagePath, 300) || '/';
  const common = {
    full_name: text(payload.full_name, 120),
    phone: text(payload.phone, 40),
    email: text(payload.email, 160),
    emirate: text(payload.emirate, 120),
    city: text(payload.city, 120),
    preferred_contact: text(payload.preferred_contact, 40) || 'whatsapp',
    source_path: sourcePath,
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

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Weyaak-Version', WEYAAK_VERSION);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error('Weyaak chat missing OPENAI_API_KEY');
    return res.status(500).json({
      reply: 'إعدادات وياك غير مكتملة حاليًا. يرجى المحاولة لاحقًا.',
      version: WEYAAK_VERSION,
    });
  }

  const message = text(req.body?.message, 4000);
  const history = sanitizeHistory(req.body?.history);
  const pagePath = text(req.body?.pagePath, 300) || '/';

  if (!message) {
    return res.status(400).json({ error: 'Message is required', version: WEYAAK_VERSION });
  }

  try {
    const platformContext = await loadPlatformContext();
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        max_tokens: 850,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: buildSystemPrompt(platformContext) },
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
        reply: 'المعذرة، خدمة وياك واجهت مشكلة مؤقتة. تقدر تتواصل مباشرة مع خدمة العملاء على 0567856001.',
        links: [{ label: 'واتساب خدمة العملاء', href: SUPPORT_WHATSAPP }],
        model: MODEL,
        version: WEYAAK_VERSION,
      });
    }

    const rawReply = data?.choices?.[0]?.message?.content?.trim();
    const agent = parseModelJson(rawReply) || {
      reply: rawReply || 'وصلت رسالتك، لكن لم أتمكن من تجهيز رد مناسب الآن.',
      audience: 'unknown',
      intent: 'general',
      links: [],
      action: { type: 'none', ready_to_submit: false, payload: {} },
    };

    let reply = text(agent.reply, 5000) || 'وصلت رسالتك، كيف أقدر أساعدك داخل منصة بيت الريف؟';
    let requestNumber = null;
    const action = agent.action || { type: 'none', ready_to_submit: false, payload: {} };

    if (
      action.type !== 'none' &&
      action.ready_to_submit === true &&
      userConfirmedSubmission(message) &&
      requiredFieldsPresent(action)
    ) {
      try {
        requestNumber = await submitRequestedAction(action, {
          pagePath,
          audience: agent.audience,
          userAgent: req.headers['user-agent'] || '',
        });
        reply = `تم تسجيل ${action.type === 'provider_interest' ? 'طلب انضمام نشاطك' : action.type === 'quote_request' ? 'طلب عرض السعر' : 'استفسارك'} بنجاح. رقم المتابعة: ${requestNumber}. فريق بيت الريف سيتابع معك حسب وسيلة التواصل التي اخترتها.`;
      } catch (submissionError) {
        console.error('Weyaak submission failed:', submissionError);
        reply = 'وصلت بياناتك، لكن تعذر تسجيل الطلب آليًا الآن. تواصل مع خدمة العملاء على واتساب وسنكمل معك مباشرة.';
      }
    }

    const links = sanitizeLinks(agent.links, platformContext);
    if (requestNumber || reply.includes('تعذر تسجيل')) {
      links.push({ label: 'واتساب خدمة العملاء', href: SUPPORT_WHATSAPP });
    }

    return res.status(200).json({
      reply,
      audience: agent.audience || 'unknown',
      intent: agent.intent || 'general',
      links: sanitizeLinks(links, platformContext),
      request_number: requestNumber,
      model: MODEL,
      version: WEYAAK_VERSION,
      live_data: Boolean(SUPABASE_URL && SUPABASE_PUBLIC_KEY),
    });
  } catch (error) {
    console.error('Weyaak chat fatal error:', error);
    return res.status(200).json({
      reply: 'المعذرة، واجهت مشكلة تقنية بسيطة. تقدر تعيد المحاولة أو تتواصل مع خدمة العملاء على 0567856001.',
      links: [{ label: 'واتساب خدمة العملاء', href: SUPPORT_WHATSAPP }],
      model: MODEL,
      version: WEYAAK_VERSION,
    });
  }
}
