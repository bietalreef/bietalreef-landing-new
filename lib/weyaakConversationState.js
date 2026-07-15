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
  'provider_search',
  'service_question',
  'product_search',
  'quote_request',
  'tender',
]);

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

export function applyAnswerToWeyaakState(state = {}, message = '') {
  const next = {
    audience: state.audience || 'unknown',
    intent: state.intent || 'general',
    payload: { ...(state.payload || {}) },
  };

  const value = String(message || '').trim();
  if (!value) return next;

  if (next.audience === 'customer' && CUSTOMER_INTENTS.has(next.intent)) {
    const missing = CUSTOMER_FLOW_FIELDS.find((field) => !String(next.payload[field] || '').trim());
    // Emirate is normalized by the server from names such as العين or دبي.
    if (missing && missing !== 'emirate') next.payload[missing] = cleanAnswer(missing, value);
  }

  if (next.audience === 'provider' || next.intent === 'provider_subscription') {
    const missing = PROVIDER_FLOW_FIELDS.find((field) => !String(next.payload[field] || '').trim());
    if (missing) next.payload[missing] = cleanAnswer(missing, value);
  }

  return next;
}
