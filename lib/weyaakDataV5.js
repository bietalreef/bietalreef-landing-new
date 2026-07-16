const SITE_URL = 'https://bietalreef.ae';
const SUPPORT_NUMBER = '971567856001';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_PUBLIC_KEY =
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const CUSTOMER_FIELDS = [
  'service_category',
  'emirate',
  'city',
  'specifications',
  'measurements',
  'budget_range',
  'timeline',
];

export const PROVIDER_FIELDS = [
  'business_name',
  'specialty',
  'service_areas',
  'license_status',
  'portfolio_status',
];

const PAYLOAD_FIELDS = [
  'full_name', 'phone', 'email', 'emirate', 'city', 'service_category',
  'specifications', 'measurements', 'budget_range', 'timeline',
  'project_description', 'preferred_contact', 'inquiry_topic', 'message',
  'business_name', 'specialty', 'service_areas', 'license_status', 'portfolio_status',
];

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

const SERVICE_FAMILIES = [
  ['نجار', 'نجاره', 'خشب', 'خشبي', 'خشبيه', 'مطابخ', 'خزائن', 'دواليب', 'ابواب', 'كسوات'],
  ['رخام', 'جرانيت', 'حجر', 'كونترتوب', 'سطح', 'اسطح'],
  ['تنظيف', 'تعقيم', 'تطهير', 'كنب', 'سجاد', 'مجالس', 'خزانات'],
  ['سباك', 'سباكه', 'صحي', 'تمديدات صحيه', 'صرف'],
  ['كهربائي', 'كهرباء', 'تمديدات كهربائيه', 'لوحات كهرباء'],
  ['تكييف', 'مكيف', 'مكيفات', 'تبريد'],
  ['المنيوم', 'الومنيوم', 'زجاج', 'واجهات', 'نوافذ'],
  ['دهان', 'صبغ', 'اصباغ', 'ديكور'],
  ['تصميم داخلي', 'تشطيب', 'تشطيبات', 'ديكور داخلي'],
  ['سمارت هوم', 'منزل ذكي', 'اضاءه ذكيه', 'اقفال ذكيه', 'ستائر ذكيه', 'كاميرات'],
].map((family) => family.map(normalizeArabic));

const GENERIC_WORDS = new Set([
  'مزود', 'مزودين', 'خدمه', 'خدمات', 'شركة', 'مؤسسة', 'محل', 'ورشة', 'مقاول',
  'ابغى', 'اريد', 'عايز', 'اعطني', 'عطني', 'ابحث', 'دور', 'دلني', 'مناسب',
  'في', 'من', 'على', 'عن', 'هل', 'يوجد', 'موجود', 'الان', 'الآن',
].map(normalizeArabic));

const LOCATION_WORDS = new Set([
  'الامارات', 'ابوظبي', 'العين', 'دبي', 'الشارقه', 'عجمان', 'الفجيره',
  'راس', 'الخيمه', 'ام', 'القيوين', 'الظفره',
].map(normalizeArabic));

function text(value, max = 2000) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export function normalizeArabic(value) {
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

export function normalizePayload(raw = {}) {
  return Object.fromEntries(
    PAYLOAD_FIELDS.map((field) => [
      field,
      text(raw?.[field], ['project_description', 'message', 'specifications'].includes(field) ? 4000 : 700),
    ]),
  );
}

export function mergePayload(previous = {}, extracted = {}) {
  const oldPayload = normalizePayload(previous);
  const newPayload = normalizePayload(extracted);
  return Object.fromEntries(
    PAYLOAD_FIELDS.map((field) => [field, newPayload[field] || oldPayload[field] || '']),
  );
}

export function firstMissing(payload, fields) {
  return fields.find((field) => !text(payload?.[field], 1000)) || '';
}

function serviceTerms(value) {
  const base = normalizeArabic(value)
    .split(' ')
    .filter((token) => token.length > 1 && !GENERIC_WORDS.has(token) && !LOCATION_WORDS.has(token));

  const expanded = new Set(base);
  for (const token of base) {
    for (const family of SERVICE_FAMILIES) {
      if (family.some((term) => term === token || term.includes(token) || token.includes(term))) {
        family.forEach((term) => expanded.add(term));
      }
    }
  }
  return [...expanded];
}

function locationAliases(value) {
  const normalized = normalizeArabic(value);
  if (!normalized) return [];

  const aliases = new Set([normalized]);
  if (normalized.includes('العين') || normalized.includes('al ain')) {
    aliases.add('العين');
    aliases.add('al ain');
  }
  if (normalized.includes('ابوظبي') || normalized.includes('abu dhabi')) {
    aliases.add('ابوظبي');
    aliases.add('abu dhabi');
  }
  if (normalized.includes('دبي') || normalized.includes('dubai')) {
    aliases.add('دبي');
    aliases.add('dubai');
  }
  if (normalized.includes('الشارقه') || normalized.includes('sharjah')) {
    aliases.add('الشارقه');
    aliases.add('sharjah');
  }
  if (normalized.includes('عجمان') || normalized.includes('ajman')) {
    aliases.add('عجمان');
    aliases.add('ajman');
  }
  if (normalized.includes('الفجيره') || normalized.includes('fujairah')) {
    aliases.add('الفجيره');
    aliases.add('fujairah');
  }
  if (normalized.includes('راس الخيمه') || normalized.includes('ras al khaimah')) {
    aliases.add('راس الخيمه');
    aliases.add('ras al khaimah');
  }
  if (normalized.includes('ام القيوين') || normalized.includes('umm al quwain')) {
    aliases.add('ام القيوين');
    aliases.add('umm al quwain');
  }

  return [...aliases];
}

async function supabaseGet(path) {
  if (!SUPABASE_URL || !SUPABASE_PUBLIC_KEY) throw new Error('SUPABASE_NOT_CONFIGURED');

  const response = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/${path}`, {
    headers: {
      apikey: SUPABASE_PUBLIC_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLIC_KEY}`,
      Accept: 'application/json',
    },
  });

  const body = await response.text();
  if (!response.ok) throw new Error(`SUPABASE_READ_${response.status}:${body.slice(0, 300)}`);
  const parsed = body ? JSON.parse(body) : [];
  return Array.isArray(parsed) ? parsed : [];
}

async function supabaseRpc(name, payload) {
  if (!SUPABASE_URL || !SUPABASE_PUBLIC_KEY) throw new Error('SUPABASE_NOT_CONFIGURED');

  const response = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_PUBLIC_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLIC_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ p_payload: payload }),
  });

  const body = await response.text();
  const parsed = body ? JSON.parse(body) : {};
  if (!response.ok) throw new Error(parsed?.message || parsed?.error || `SUPABASE_RPC_${response.status}`);
  return Array.isArray(parsed) ? (parsed[0] || {}) : parsed;
}

async function loadProviders() {
  const locationSelect = [
    'provider_id',
    'coverage_type',
    'coverage_notes_ar',
    'coverage_notes_en',
    'is_primary',
    'is_active',
    'emirate:platform_emirates!provider_service_locations_emirate_id_fkey(name_ar,name_en,slug)',
    'city:platform_cities!provider_service_locations_city_id_fkey(name_ar,name_en,slug)',
    'area:platform_areas!provider_service_locations_area_id_fkey(name_ar,name_en,slug)',
  ].join(',');

  const [profiles, services, locations] = await Promise.all([
    supabaseGet('provider_public_profiles?select=id,slug,name_ar,name_en,provider_type,short_description_ar,short_description_en,description_ar,description_en,canonical_url,verification_status,search_keywords_ar,search_keywords_en&publication_status=eq.published&limit=100'),
    supabaseGet('provider_services?select=provider_id,title_ar,title_en,description_ar,description_en,is_published&is_published=eq.true&limit=500'),
    supabaseGet(`provider_service_locations?select=${locationSelect}&is_active=eq.true&limit=500`),
  ]);

  return profiles.map((provider) => ({
    ...provider,
    services: services.filter((service) => service.provider_id === provider.id),
    locations: locations.filter((location) => location.provider_id === provider.id),
  }));
}

function locationMatches(provider, requestedCity, requestedEmirate) {
  const cityAliases = locationAliases(requestedCity);
  const emirateAliases = locationAliases(requestedEmirate);
  if (!cityAliases.length && !emirateAliases.length) return true;

  return (provider.locations || []).some((location) => {
    const locationText = normalizeArabic([
      location.emirate?.name_ar,
      location.emirate?.name_en,
      location.emirate?.slug,
      location.city?.name_ar,
      location.city?.name_en,
      location.city?.slug,
      location.area?.name_ar,
      location.area?.name_en,
      location.area?.slug,
      location.coverage_notes_ar,
      location.coverage_notes_en,
    ].filter(Boolean).join(' '));

    const nationwide = location.coverage_type === 'nationwide';
    const emirateMatched = !emirateAliases.length || emirateAliases.some((term) => locationText.includes(term));
    const cityMatched = !cityAliases.length || cityAliases.some((term) => locationText.includes(term));
    const coversWholeEmirate = location.coverage_type === 'emirate' && emirateMatched;

    if (nationwide) return true;
    if (cityAliases.length) return cityMatched || coversWholeEmirate;
    return emirateMatched;
  });
}

export async function searchProviders({ service, city = '', emirate = '' }) {
  const requestedService = text(service, 300);
  const requestedCity = text(city || '', 120);
  const requestedEmirate = text(emirate || '', 120);
  const wantedServiceTerms = serviceTerms(requestedService);

  if (!requestedService || wantedServiceTerms.length === 0) {
    return {
      status: 'needs_service',
      query: { service: requestedService, city: requestedCity, emirate: requestedEmirate },
      providers: [],
    };
  }

  const providers = await loadProviders();
  const matches = providers
    .map((provider) => {
      const serviceText = normalizeArabic([
        provider.name_ar,
        provider.name_en,
        provider.short_description_ar,
        provider.short_description_en,
        provider.description_ar,
        provider.description_en,
        ...(provider.search_keywords_ar || []),
        ...(provider.search_keywords_en || []),
        ...(provider.services || []).flatMap((item) => [
          item.title_ar,
          item.title_en,
          item.description_ar,
          item.description_en,
        ]),
      ].filter(Boolean).join(' '));

      const matchedTerms = wantedServiceTerms.filter((term) => serviceText.includes(term));
      const specialtyMatched = matchedTerms.length > 0;
      const providerLocationMatched = locationMatches(provider, requestedCity, requestedEmirate);

      // الموقع لا يمكن أن يعوّض عن تخصص خاطئ.
      if (!specialtyMatched || !providerLocationMatched) return null;

      return {
        score: matchedTerms.length * 10 + (provider.verification_status === 'verified' ? 1 : 0),
        provider: {
          id: provider.id,
          name: provider.name_ar || provider.name_en,
          url: provider.canonical_url || `${SITE_URL}/providers/${provider.slug}`,
          verified: provider.verification_status === 'verified',
          summary: provider.short_description_ar || provider.description_ar || '',
          matched_service_terms: matchedTerms.slice(0, 8),
          services: (provider.services || [])
            .map((item) => item.title_ar || item.title_en)
            .filter(Boolean)
            .slice(0, 8),
          coverage: (provider.locations || []).map((location) => ({
            coverage_type: location.coverage_type || '',
            emirate: location.emirate?.name_ar || location.emirate?.name_en || '',
            city: location.city?.name_ar || location.city?.name_en || '',
            area: location.area?.name_ar || location.area?.name_en || '',
          })),
        },
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return {
    status: matches.length ? 'matched' : 'unmatched',
    query: { service: requestedService, city: requestedCity, emirate: requestedEmirate },
    providers: matches.map((item) => item.provider),
  };
}

export function governmentSources(emirateKey = '') {
  return [
    ...GOVERNMENT_SOURCES.federal,
    ...(GOVERNMENT_SOURCES[emirateKey] || []),
  ];
}

export async function loadAnnualOffer(enabled) {
  if (!enabled) return null;
  const plans = await supabaseGet('subscription_plans?select=code,name_ar,annual_price,currency,is_free,is_active&is_active=eq.true&order=display_order.asc&limit=20');
  const plan = plans.find((item) => !item.is_free && Number(item.annual_price) > 0);
  if (!plan) return null;
  return {
    plan_code: plan.code,
    plan_name: plan.name_ar,
    original_price: Number(plan.annual_price),
    discounted_price: Math.round(Number(plan.annual_price) * 0.9 * 100) / 100,
    currency: plan.currency || 'AED',
    discount_percent: 10,
  };
}

export function buildIntake(type, defaults = {}) {
  if (type === 'provider_interest') {
    return {
      type,
      title: 'راجع طلب انضمام نشاطك',
      submit_label: 'مراجعة طلب الانضمام',
      defaults,
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
  }

  if (type === 'inquiry') {
    return {
      type,
      title: 'مراجعة الاستفسار',
      submit_label: 'مراجعة الاستفسار',
      defaults,
      fields: [
        { name: 'full_name', label: 'الاسم', type: 'text', required: true },
        { name: 'phone', label: 'رقم الهاتف', type: 'tel', required: true },
        { name: 'emirate', label: 'الإمارة', type: 'text', required: true },
        { name: 'inquiry_topic', label: 'موضوع الاستفسار', type: 'text', required: true },
        { name: 'message', label: 'التفاصيل', type: 'textarea', required: true },
      ],
    };
  }

  return {
    type: 'quote_request',
    title: 'راجع تفاصيل طلبك قبل التسجيل',
    submit_label: 'مراجعة الطلب',
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
      {
        name: 'preferred_contact',
        label: 'وسيلة التواصل',
        type: 'select',
        required: true,
        options: [
          { value: 'whatsapp', label: 'واتساب' },
          { value: 'phone', label: 'اتصال هاتفي' },
        ],
      },
      { name: 'project_description', label: 'ملاحظات إضافية', type: 'textarea', required: false },
    ],
  };
}

function requestNumber(prefix) {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${prefix}-${date}-${random}`;
}

export function requiredForSubmission(action) {
  const payload = normalizePayload(action?.payload);
  if (action?.type === 'quote_request') {
    return Boolean(payload.full_name && payload.phone && CUSTOMER_FIELDS.every((field) => payload[field]));
  }
  if (action?.type === 'provider_interest') {
    return Boolean(payload.full_name && payload.phone && PROVIDER_FIELDS.every((field) => payload[field]));
  }
  if (action?.type === 'inquiry') {
    return Boolean(payload.full_name && payload.phone && payload.emirate && payload.inquiry_topic && payload.message);
  }
  return false;
}

export async function submitAction(action, meta = {}) {
  const payload = normalizePayload(action?.payload);
  const common = {
    full_name: payload.full_name,
    phone: payload.phone,
    email: payload.email,
    emirate: payload.emirate,
    city: payload.city,
    preferred_contact: payload.preferred_contact || 'whatsapp',
    source_path: text(meta.pagePath, 300) || '/',
    source_page_title: 'Weyaak Chat',
    utm: { source: 'weyaak_agent_v5', audience: meta.audience || 'unknown' },
    user_agent: text(meta.userAgent, 500),
  };

  if (action.type === 'quote_request') {
    const fallback = requestNumber('BRQ');
    const projectDescription = [
      `الخدمة: ${payload.service_category}`,
      `المواصفات: ${payload.specifications}`,
      `المقاسات/المساحة: ${payload.measurements}`,
      `الميزانية: ${payload.budget_range}`,
      `الموعد: ${payload.timeline}`,
      payload.project_description ? `ملاحظات: ${payload.project_description}` : '',
    ].filter(Boolean).join('\n');

    const result = await supabaseRpc('submit_public_quote_request', {
      ...common,
      request_number: fallback,
      service_category: payload.service_category,
      project_type: payload.service_category,
      project_area: payload.measurements,
      budget_range: payload.budget_range,
      timeline: payload.timeline,
      project_description: projectDescription,
    });

    return {
      requestNumber: result.request_number || result.request_no || result.quote_number || fallback,
      payload,
    };
  }

  const fallback = requestNumber('BRI');
  const providerMessage = [
    payload.business_name ? `اسم النشاط: ${payload.business_name}` : '',
    payload.specialty ? `التخصص: ${payload.specialty}` : '',
    payload.service_areas ? `مناطق الخدمة: ${payload.service_areas}` : '',
    payload.license_status ? `حالة الرخصة: ${payload.license_status}` : '',
    payload.portfolio_status ? `نماذج الأعمال: ${payload.portfolio_status}` : '',
    payload.message,
  ].filter(Boolean).join('\n');

  const result = await supabaseRpc('submit_public_website_inquiry', {
    ...common,
    request_number: fallback,
    inquiry_topic: action.type === 'provider_interest'
      ? 'provider_subscription'
      : (payload.inquiry_topic || 'general_inquiry'),
    message: action.type === 'provider_interest' ? providerMessage : payload.message,
  });

  return {
    requestNumber: result.request_number || result.request_no || result.inquiry_number || fallback,
    payload,
  };
}

export function whatsappUrl(type, payload, number) {
  const lines = type === 'provider_interest'
    ? [
        'مرحبًا فريق بيت الريف،',
        'تم تسجيل طلب انضمام نشاطي عبر وياك.',
        `رقم المتابعة: ${number}`,
        `اسم النشاط: ${payload.business_name}`,
        `التخصص: ${payload.specialty}`,
        `مناطق الخدمة: ${payload.service_areas}`,
      ]
    : type === 'inquiry'
      ? [
          'مرحبًا فريق بيت الريف،',
          'تم تسجيل استفساري عبر وياك.',
          `رقم المتابعة: ${number}`,
          `الموضوع: ${payload.inquiry_topic}`,
        ]
      : [
          'مرحبًا فريق بيت الريف،',
          'تم تسجيل طلبي عبر وياك.',
          `رقم المتابعة: ${number}`,
          `الخدمة: ${payload.service_category}`,
          `الموقع: ${payload.emirate} - ${payload.city}`,
          `المواصفات: ${payload.specifications}`,
          `المقاسات: ${payload.measurements}`,
          `الميزانية: ${payload.budget_range}`,
          `موعد التنفيذ: ${payload.timeline}`,
        ];

  return `https://wa.me/${SUPPORT_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}
