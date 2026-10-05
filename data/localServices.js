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
module.exports = { CITY, AREAS, CATEGORY, PILOT_REVIEW_DATE };
