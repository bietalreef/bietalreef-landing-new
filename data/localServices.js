// Reviewed geographic relationships. No coordinates, branches or proximity claims.
// Names supplied in the Al Ain pilot brief; legacy spellings are preserved.
const CITY = { slug: 'al-ain', emirate: 'abu-dhabi', nameAr: 'العين', nameEn: 'Al Ain' };
const AREAS = [
  ['al-jimi', 'الجيمي', 'Al Jimi'], ['al-hili', 'الهيلي', 'Al Hili'],
  ['al-muwaiji', 'المويجعي', 'Al Muwaiji'], ['al-markhaniya', 'المرخانية', 'Al Markhaniya'],
  ['al-towayya', 'الطوية', 'Al Towayya'], ['al-foah', 'الفوعة', 'Al Foah'],
  ['zakher', 'زاخر', 'Zakher'], ['asharej', 'عشارج', 'Asharej'],
  ['al-maqam', 'المقام', 'Al Maqam'], ['falaj-hazza', 'فلج هزاع', 'Falaj Hazza'],
  ['al-yahar', 'اليحر', 'Al Yahar'], ['al-dhahir', 'الظاهر', 'Al Dhahir'],
].map(([slug, nameAr, nameEn]) => ({
  slug, nameAr, nameEn, city: CITY.slug, emirate: CITY.emirate,
  // Do not index district permutations until independent local evidence is reviewed.
  editorial: { reviewed: false, source: null, blocks: [] },
}));
const CATEGORY = { slug: 'cleaning-services', nameAr: 'خدمات التنظيف', nameEn: 'Cleaning services' };
const PILOT_REVIEW_DATE = '2026-10-05';
// URL intent aliases map to existing taxonomy entities, never create services.
const SERVICE_INTENTS = [
  { slug: 'home-villa-cleaning', sourceSlugs: ['homes-buildings-cleaning-302'], phase: 'P0',
    name: { ar: 'تنظيف المنازل والفلل', en: 'Home and Villa Cleaning' },
    queries: { ar: ['تنظيف منازل العين', 'تنظيف فلل العين'], en: ['home cleaning Al Ain', 'villa cleaning Al Ain'] },
    when: { ar: 'عندما تحتاج إلى تنظيف أجزاء المنزل أو الفيلا وتحديد البنود المطلوبة لكل غرفة، بدل افتراض أن كل مساحة مشمولة.', en: 'When rooms or surfaces in a home or villa need cleaning and you need to agree which parts are included.' },
    details: { ar: ['مساحة الموقع وعدد الغرف والحمامات', 'الأرضيات والمطبخ والزجاج المطلوب تنظيفه', 'صور الحالة والمناطق التي تحتاج اهتمامًا', 'المنطقة وإمكانية الوصول والموعد المطلوب'], en: ['Property size and room/bathroom count', 'Floors, kitchen and glass to include', 'Photos of the condition and priority areas', 'District, access and preferred date'] } },
  { slug: 'sofa-cleaning', sourceSlugs: ['steam-sofa-cleaning', 'steam-upholstery-cleaning-309'], phase: 'P0',
    name: { ar: 'تنظيف الكنب بالبخار', en: 'Steam Sofa Cleaning' },
    queries: { ar: ['تنظيف كنب العين', 'تنظيف كنب بالبخار العين'], en: ['sofa cleaning Al Ain', 'steam sofa cleaning Al Ain'] },
    when: { ar: 'عند وجود بقع أو روائح أو اتساخ في الكنب. يراجع المزود نوع النسيج والحالة قبل تأكيد طريقة التنظيف المناسبة.', en: 'When sofas have stains, odours or accumulated dirt. The provider checks the fabric and condition before confirming a suitable cleaning method.' },
    details: { ar: ['عدد قطع الكنب ومقاسات كل قطعة', 'نوع القماش إن كان معروفًا', 'صور واضحة للبقع وحالة المفروشات', 'المنطقة والموعد وإمكانية الوصول'], en: ['Number and dimensions of sofa pieces', 'Fabric type if known', 'Clear photos of stains and upholstery condition', 'District, date and access'] } },
  { slug: 'carpet-rug-cleaning', sourceSlugs: ['steam-upholstery-cleaning-310', 'steam-upholstery-cleaning-311'], phase: 'P0', name: { ar: 'تنظيف السجاد والموكيت', en: 'Carpet and Rug Cleaning' }, queries: { ar: ['تنظيف سجاد العين', 'تنظيف موكيت العين'], en: ['carpet cleaning Al Ain'] } },
  { slug: 'majlis-cleaning', sourceSlugs: ['steam-upholstery-cleaning-312'], phase: 'P0', name: { ar: 'تنظيف المجالس العربية', en: 'Arabic Majlis Cleaning' }, queries: { ar: ['تنظيف مجالس العين'], en: ['majlis cleaning Al Ain'] } },
  { slug: 'mattress-upholstery-cleaning', sourceSlugs: ['steam-upholstery-cleaning-313'], phase: 'P0', name: { ar: 'تنظيف المراتب والمفروشات', en: 'Mattress and Upholstery Cleaning' }, queries: { ar: ['تنظيف مراتب العين', 'تنظيف مفروشات العين'], en: ['mattress cleaning Al Ain'] } },
].map(item => ({ ...item, category: CATEGORY.slug, editorial: { reviewed: Boolean(item.when && item.details), reviewedAt: PILOT_REVIEW_DATE, source: 'provider_services + platform_services; live audit 2026-10-05', reviewer: 'Phase 2 execution review', independentValue: Boolean(item.when && item.details) } }));
module.exports = { CITY, AREAS, CATEGORY, PILOT_REVIEW_DATE, SERVICE_INTENTS };
