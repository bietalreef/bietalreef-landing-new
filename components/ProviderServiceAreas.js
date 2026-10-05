import Link from 'next/link';
import { AREAS } from '../data/localServices';
import { localPath } from '../lib/localServices';
export default function ProviderServiceAreas({ locale = 'ar' }) {
  const en = locale === 'en';
  return <section className="mx-auto max-w-6xl px-4 py-8" aria-labelledby="provider-al-ain-areas">
    <nav aria-label={en ? 'Provider breadcrumbs' : 'مسار المزود'} className="mb-5 flex flex-wrap gap-3 text-sm"><Link href={en ? '/en/uae' : '/uae'}>{en ? 'UAE directory' : 'دليل الإمارات'}</Link><Link href={localPath({ locale })}>{en ? 'Al Ain' : 'العين'}</Link><Link href={localPath({ locale, category: 'cleaning-services' })}>{en ? 'Cleaning services' : 'خدمات التنظيف'}</Link></nav>
    <h2 id="provider-al-ain-areas" className="text-2xl font-black text-[#0F3F1A]">{en ? 'Areas we serve in Al Ain' : 'مناطق نخدمها في العين'}</h2>
    <p className="my-4 leading-8">{en ? 'Service coverage includes the following Al Ain districts. Confirm the service scope and appointment directly with Alrehab. These are service areas, not branches.' : 'يشمل نطاق الخدمة مناطق العين التالية. أكد نطاق العمل والموعد مباشرة مع الرحاب. هذه مناطق خدمة وليست فروعًا.'}</p>
    <div className="flex flex-wrap gap-3">{AREAS.map(area => <Link key={area.slug} href={localPath({ locale, area: area.slug })} className="rounded-xl border border-[#D8C8AA] bg-white px-4 py-3 font-bold text-[#0F3F1A]">{en ? area.nameEn : area.nameAr}</Link>)}</div>
  </section>;
}
