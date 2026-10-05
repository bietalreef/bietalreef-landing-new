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
  { slug: 'facade-glass-cleaning', sourceSlugs: ['facades-tanks-cleaning-316'], phase: 'P0',
    name: { ar: 'تنظيف الواجهات والزجاج', en: 'Facade & Glass Cleaning' },
    queries: { ar: ['تنظيف واجهات العين', 'تنظيف زجاج العين', 'تنظيف واجهات زجاجية العين'], en: ['facade cleaning Al Ain', 'glass cleaning Al Ain'] },
    when: { ar: 'عندما تحتاج واجهات المنزل أو المبنى والزجاج الخارجي إلى تنظيف مع مراعاة الارتفاع وإمكانية الوصول وحالة السطح قبل تحديد طريقة التنفيذ.', en: 'When home or building facades and exterior glass need cleaning, with height, access and surface condition reviewed before the work method is confirmed.' },
    details: { ar: ['مساحة الواجهة ونوع الزجاج أو السطح', 'الارتفاع وإمكانية الوصول الآمن للموقع', 'صور واضحة للواجهة ودرجة الاتساخ', 'المنطقة والموعد وأي قيود دخول للمبنى'], en: ['Facade area and glass or surface type', 'Height and safe access to the work area', 'Clear photos of the facade and its condition', 'District, preferred date and any building access restrictions'] } },
  { slug: 'home-disinfection-pest-control', sourceSlugs: ['pest-control-disinfection-327'], phase: 'P0',
    name: { ar: 'التعقيم وخدمات مكافحة الحشرات', en: 'Sanitization & Pest-Control Services' },
    queries: { ar: ['تعقيم منازل العين', 'مكافحة حشرات العين', 'رش وتعقيم منازل العين'], en: ['home sanitization Al Ain', 'pest control Al Ain'] },
    when: { ar: 'عندما يحتاج المنزل إلى تعقيم أو معالجة مرتبطة بالحشرات بعد تحديد نوع الموقع والحالة؛ يراجع المزود المشكلة قبل تأكيد المواد ونطاق المعالجة.', en: 'When a home needs sanitization or pest-control related treatment after the property type and condition are identified; the provider reviews the issue before confirming materials and treatment scope.' },
    details: { ar: ['نوع الموقع والمساحات المطلوب معالجتها', 'وصف المشكلة والمناطق المتأثرة', 'صور للحالة عندما يكون إرسالها مناسبًا وآمنًا', 'المنطقة والموعد وأي معلومات لازمة لاختيار المعالجة'], en: ['Property type and areas requiring treatment', 'Description of the issue and affected rooms or areas', 'Photos when they are appropriate and safe to share', 'District, preferred date and information needed to choose the treatment'] } },
  { slug: 'carpet-rug-cleaning', sourceSlugs: ['steam-upholstery-cleaning-310', 'steam-upholstery-cleaning-311'], phase: 'P0', name: { ar: 'تنظيف السجاد والموكيت', en: 'Carpet and Rug Cleaning' }, queries: { ar: ['تنظيف سجاد العين', 'تنظيف موكيت العين'], en: ['carpet cleaning Al Ain'] } },
  { slug: 'majlis-cleaning', sourceSlugs: ['steam-upholstery-cleaning-312'], phase: 'P0', name: { ar: 'تنظيف المجالس العربية', en: 'Arabic Majlis Cleaning' }, queries: { ar: ['تنظيف مجالس العين'], en: ['majlis cleaning Al Ain'] } },
  { slug: 'mattress-upholstery-cleaning', sourceSlugs: ['steam-upholstery-cleaning-313'], phase: 'P0', name: { ar: 'تنظيف المراتب والمفروشات', en: 'Mattress and Upholstery Cleaning' }, queries: { ar: ['تنظيف مراتب العين', 'تنظيف مفروشات العين'], en: ['mattress cleaning Al Ain'] } },
].map(item => ({ ...item, category: CATEGORY.slug, editorial: { reviewed: Boolean(item.when && item.details), reviewedAt: PILOT_REVIEW_DATE, source: 'provider_services + platform_services; live audit 2026-10-05', reviewer: 'Phase 2 execution review', independentValue: Boolean(item.when && item.details) } }));
module.exports = { CITY, AREAS, CATEGORY, PILOT_REVIEW_DATE, SERVICE_INTENTS };
