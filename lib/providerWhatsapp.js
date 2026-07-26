const SITE_URL = 'https://bietalreef.ae';

function clean(value) {
  if (value === null || value === undefined) return '';
  if (Array.isArray(value)) return value.map(clean).filter(Boolean).join('، ');
  if (typeof value === 'object') {
    return Object.entries(value)
      .map(([key, item]) => `${key}: ${clean(item)}`)
      .filter((item) => !item.endsWith(': '))
      .join('، ');
  }
  return String(value).replace(/\s+/g, ' ').trim();
}

function absolutePageUrl(pathOrUrl) {
  const value = clean(pathOrUrl);
  if (!value) return SITE_URL;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`;
}

function whatsappUrl(phone, lines) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits) return null;
  const message = lines.map(clean).filter(Boolean).join('\n');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function detailLine(label, value) {
  const normalized = clean(value);
  return normalized ? `${label}: ${normalized}` : null;
}

export function buildProviderWhatsappUrl({
  phone,
  locale = 'ar',
  providerName,
  providerCode,
  providerNumericId,
  location,
  summary,
  profilePath,
}) {
  const isEn = locale === 'en';
  const pageUrl = absolutePageUrl(profilePath);

  return whatsappUrl(phone, isEn
    ? [
      `Hello, I would like to contact ${clean(providerName) || 'this provider'} through Biet Al Reef.`,
      '',
      'Source: provider profile',
      detailLine('Provider', providerName),
      detailLine('Provider code', providerCode),
      detailLine('Provider numeric ID', providerNumericId),
      detailLine('Location', location),
      detailLine('Profile summary', summary),
      detailLine('Profile link', pageUrl),
      '',
      'My request:',
    ]
    : [
      `مرحباً، أرغب في التواصل مع ${clean(providerName) || 'هذا المزود'} عبر منصة بيت الريف.`,
      '',
      'مصدر التواصل: الملف الشخصي للمزود',
      detailLine('المزود', providerName),
      detailLine('رمز المزود', providerCode),
      detailLine('الرقم التعريفي للمزود', providerNumericId),
      detailLine('الموقع', location),
      detailLine('نبذة الملف', summary),
      detailLine('رابط الملف', pageUrl),
      '',
      'تفاصيل طلبي:',
    ]);
}

export function buildCardWhatsappUrl({
  phone,
  locale = 'ar',
  cardType = 'service',
  providerName,
  providerCode,
  providerNumericId,
  cardCode,
  cardId,
  title,
  description,
  category,
  price,
  pricingModel,
  duration,
  specifications,
  stockStatus,
  countryOfOrigin,
  location,
  pagePath,
}) {
  const isEn = locale === 'en';
  const pageUrl = absolutePageUrl(pagePath);
  const typeLabels = isEn
    ? { service: 'service', product: 'product', offer: 'offer', project: 'project' }
    : { service: 'خدمة', product: 'منتج', offer: 'عرض', project: 'مشروع' };
  const type = typeLabels[cardType] || (isEn ? 'card' : 'بطاقة');

  return whatsappUrl(phone, isEn
    ? [
      `Hello, I would like to enquire about the ${type} “${clean(title)}” through Biet Al Reef.`,
      '',
      `Source: ${type} card`,
      detailLine('Provider', providerName),
      detailLine('Provider code', providerCode),
      detailLine('Provider numeric ID', providerNumericId),
      detailLine('Card code', cardCode),
      detailLine('Card ID', cardId),
      detailLine('Title', title),
      detailLine('Description', description),
      detailLine('Category', category),
      detailLine('Price', price),
      detailLine('Pricing model', pricingModel),
      detailLine('Duration', duration),
      detailLine('Specifications', specifications),
      detailLine('Stock status', stockStatus),
      detailLine('Country of origin', countryOfOrigin),
      detailLine('Location', location),
      detailLine('Card link', pageUrl),
      '',
      'My request details:',
    ]
    : [
      `مرحباً، أرغب في الاستفسار عن ${type} «${clean(title)}» عبر منصة بيت الريف.`,
      '',
      `مصدر التواصل: بطاقة ${type}`,
      detailLine('المزود', providerName),
      detailLine('رمز المزود', providerCode),
      detailLine('الرقم التعريفي للمزود', providerNumericId),
      detailLine('رمز البطاقة', cardCode),
      detailLine('معرّف البطاقة', cardId),
      detailLine('العنوان', title),
      detailLine('التفاصيل', description),
      detailLine('التصنيف', category),
      detailLine('السعر', price),
      detailLine('نظام التسعير', pricingModel),
      detailLine('المدة', duration),
      detailLine('المواصفات', specifications),
      detailLine('حالة التوفر', stockStatus),
      detailLine('بلد المنشأ', countryOfOrigin),
      detailLine('الموقع', location),
      detailLine('رابط البطاقة', pageUrl),
      '',
      'تفاصيل طلبي:',
    ]);
}
