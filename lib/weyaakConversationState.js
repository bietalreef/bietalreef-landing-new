export const CUSTOMER_FLOW_FIELDS = [
  'service_category',
  'emirate',
  'city',
  'specifications',
  'measurements',
  'budget_range',
  'timeline',
];

export const PROVIDER_FLOW_FIELDS = [
  'business_name',
  'specialty',
  'service_areas',
  'license_status',
  'portfolio_status',
];

const CUSTOMER_INTENTS = new Set([
  'service_question',
  'product_search',
  'quote_request',
  'tender',
]);

const PROVIDER_SEARCH_WORDS = /(مزود|مزودين|شركة|مؤسسة|ورشة|محل|مقاول|نجار|نجارة|سباك|سباكة|كهربائي|كهرباء|فني|رخام|جرانيت|المنيوم|ألمنيوم|تنظيف|صيانة|تصميم|مطبخ|مطابخ|ابواب|أبواب|خزائن|حداد|تكييف)/i;
const PROVIDER_REQUEST_WORDS = /(اعطني|أعطني|عطني|ابغى|أبغى|اريد|أريد|عايز|أبحث|ابحث|دور|دلني|وين|فيه|هل يوجد|هل في|موجود|مزودين ام لا|مزودين أم لا)/i;
const INTERRUPTION_WORDS = /^(انت مالك|أنت مالك|شو فيك|وش فيك|ايه ده|إيه ده|ده ايه|ده إيه|مش ده|مو هذا|فهمت غلط|ركز|يا وكيل|ياوكيل|ما هذا|شو هذا|هذا شو|تهريج)/i;

function cleanAnswer(field, value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const patterns = {
    business_name: /^(اسم\s*(النشاط|الشركة|المؤسسة)\s*[:：-]?\s*)/i,
    specialty: /^(نقدم|نشتغل|التخصص\s*[:：-]?\s*)/i,
    service_areas: /^(نخدم|مناطق\s*(الخدمة|العمل)\s*[:：-]?\s*)/i,
    license_status: /^(الرخصة\s*[:：-]?\s*)/i,
    portfolio_status: /^(عندنا|لدينا|صور\s*(الأعمال|المشاريع)\s*[:：-]?\s*)/i,
  };
  return patterns[field] ? raw.replace(patterns[field], '').trim() || raw : raw;
}

function isDirectProviderSearch(value) {
  const raw = String(value || '').trim();
  return PROVIDER_SEARCH_WORDS.test(raw) && (
    PROVIDER_REQUEST_WORDS.test(raw) ||
    /في\s+(العين|دبي|أبوظبي|الشارقة|عجمان|الفجيرة|رأس الخيمة)/i.test(raw)
  );
}

function isPlausibleAnswer(field, value) {
  const raw = String(value || '').trim();
  if (!raw || INTERRUPTION_WORDS.test(raw) || isDirectProviderSearch(raw) || raw.endsWith('؟')) return false;

  if (field === 'measurements') {
    return /(\d|متر|سم|قدم|طولي|مربع|مساحة|تقريباً|تقريبا|حوالي)/i.test(raw);
  }
  if (field === 'budget_range') {
    return /(\d|درهم|ميزانية|الميزانية|غير محددة|غير محدد|مفتوحة|حسب السعر)/i.test(raw);
  }
  if (field === 'timeline') {
    return /(اليوم|غداً|غدا|أسبوع|اسبوع|شهر|يوم|خلال|فوراً|فورا|موعد|تاريخ|عاجل)/i.test(raw);
  }
  if (field === 'license_status') return /(سارية|منتهية|موجودة|غير موجودة|تحت الإجراء|رخصة)/i.test(raw);
  if (field === 'portfolio_status') return /(صور|مشاريع|أعمال|اعمال|موجود|جاهز|نعم|لا)/i.test(raw);
  return raw.length >= 2;
}

export function applyAnswerToWeyaakState(state = {}, message = '') {
  const next = {
    audience: state.audience || 'unknown',
    intent: state.intent || 'general',
    payload: { ...(state.payload || {}) },
  };

  const value = String(message || '').trim();
  if (!value) return next;

  // A new provider request or objection interrupts the old questionnaire.
  if (isDirectProviderSearch(value)) {
    return { audience: 'customer', intent: 'provider_search', payload: { ...next.payload } };
  }
  if (INTERRUPTION_WORDS.test(value)) return next;

  if (next.audience === 'customer' && CUSTOMER_INTENTS.has(next.intent)) {
    const missing = CUSTOMER_FLOW_FIELDS.find((field) => !String(next.payload[field] || '').trim());
    // Emirate and city are normalized by the server.
    if (missing && !['emirate', 'city'].includes(missing) && isPlausibleAnswer(missing, value)) {
      next.payload[missing] = cleanAnswer(missing, value);
    }
  }

  if (next.audience === 'provider' || next.intent === 'provider_subscription') {
    const missing = PROVIDER_FLOW_FIELDS.find((field) => !String(next.payload[field] || '').trim());
    if (missing && isPlausibleAnswer(missing, value)) next.payload[missing] = cleanAnswer(missing, value);
  }

  return next;
}
