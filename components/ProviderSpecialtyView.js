import Image from 'next/image';
import Link from 'next/link';
import { Building2, MapPin, Sparkles } from 'lucide-react';
import { ProviderCard } from './cards/SmartEntityCard';

const serviceLabels = { 'رخام طبيعي': 'Natural Marble', 'جرانيت': 'Granite', 'كوارتز': 'Quartz', 'حجر صناعي': 'Engineered Stone', 'تصنيع حسب الطلب': 'Custom Fabrication', 'توريد': 'Supply', 'تركيب': 'Installation', 'مطابخ': 'Kitchens', 'مغاسل': 'Washbasins', 'واجهات': 'Façades', 'أرضيات': 'Floors', 'سلالم': 'Stairs' };

function providerItem(provider, isEn) {
  return {
    id: provider.slug,
    entityType: 'provider',
    premium: provider.slug === 'al-hoot-marble-granite-factory',
    name: isEn ? provider.nameEn || provider.nameAr : provider.nameAr,
    nameEn: provider.nameEn,
    providerType: isEn ? provider.providerTypeEn || provider.providerTypeAr : provider.providerTypeAr,
    emirate: provider.emirate,
    city: provider.city === 'al-ain' ? (isEn ? 'Al Ain' : 'العين') : provider.city,
    area: provider.area === 'mazid-company-camp' ? (isEn ? 'Mazid - Company Camp' : 'مزيد - معسكر الشركات') : provider.area,
    specialties: (provider.services || []).map((value) => isEn ? serviceLabels[value] || value : value),
    verified: provider.verified,
    coverImage: provider.cover || provider.logo,
    logoImage: provider.logo,
    logoText: (isEn ? provider.nameEn : provider.nameAr)?.slice(0, 1) || 'م',
    providerId: provider.providerId,
    establishedAt: provider.establishedAt,
    acceptsQuotes: provider.acceptsQuotes,
    href: `${isEn ? '/en' : ''}/providers/${provider.slug}`,
    whatsapp: provider.whatsapp ? `https://wa.me/${String(provider.whatsapp).replace(/\D/g, '')}` : undefined,
    summary: isEn ? provider.descriptionEn || provider.descriptionAr : provider.descriptionAr,
  };
}

export default function ProviderSpecialtyView({ service, providers, locale = 'ar' }) {
  const isEn = locale === 'en';
  const name = isEn ? service.nameEn || service.nameAr : service.nameAr;
  const image = service.image || '/images/providers-hero.webp';
  const joinHref = isEn ? '/en/providers/register' : '/providers/register';
  return (
    <main dir={isEn ? 'ltr' : 'rtl'} className="bg-[#FDFBF7] text-[#0F3F1A]">
      <section className="mx-auto max-w-6xl px-4 pt-6 md:pt-10">
        <div className="relative min-h-[460px] overflow-hidden rounded-[2.5rem] border border-[#D4AF37]/35 shadow-[0_28px_70px_rgba(18,58,70,.16)] md:min-h-[560px]">
          <Image src={image} alt={name} fill priority className="object-cover" sizes="(max-width: 1200px) 100vw, 1200px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071A10]/95 via-[#071A10]/48 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F7E7A0]/40 bg-[#123A46]/85 px-4 py-2 text-xs font-black backdrop-blur-xl"><Building2 className="h-4 w-4 text-[#F7E7A0]" />{isEn ? 'Service provider sector' : 'قطاع مزودي الخدمات'}</span>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">{isEn ? `${name} Providers` : `مزودو ${name}`}</h1>
            <p className="mt-4 max-w-3xl text-sm font-semibold leading-8 text-white/85 md:text-lg">{isEn ? 'Browse approved providers in this specialty, then open the modern provider profile for verified location, services and direct contact.' : 'تصفح المزودين المعتمدين في هذا التخصص، ثم افتح الملف الحديث لمعرفة الموقع والخدمات ووسيلة التواصل المباشر.'}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className={`mb-8 ${isEn ? 'text-left' : 'text-right'}`}><span className="inline-flex items-center gap-2 rounded-full bg-[#FFF8E5] px-4 py-2 text-xs font-black text-[#8A6A00]"><Sparkles className="h-4 w-4" />{isEn ? 'Published from approved provider data' : 'منشور من بيانات المزودين المعتمدة'}</span><h2 className="mt-4 text-3xl font-black">{isEn ? 'Available providers now' : 'مزودون متاحون الآن'}</h2></div>
        {providers.length ? <div className="grid gap-6 md:grid-cols-2">{providers.map((provider) => <ProviderCard key={provider.slug} item={providerItem(provider, isEn)} />)}</div> : <div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-10 text-center shadow-sm"><h2 className="text-2xl font-black">{isEn ? 'No approved provider is published yet' : 'لا يوجد مزود معتمد منشور حالياً'}</h2><p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-600">{isEn ? 'Your business can be the first visible option where customers search for this service.' : 'يمكن أن يكون نشاطك أول خيار ظاهر للعملاء الباحثين عن هذه الخدمة.'}</p></div>}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#123A46] p-7 text-white shadow-xl md:p-11"><div className="absolute -top-16 right-0 h-48 w-48 rounded-full bg-[#D4AF37]/20 blur-3xl" /><div className="relative"><span className="inline-flex items-center gap-2 text-sm font-black text-[#F7E7A0]"><MapPin className="h-4 w-4" />{isEn ? 'Appear in the right specialty and location' : 'اظهر في التخصص والمكان الصحيح'}</span><h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight md:text-4xl">{isEn ? 'Your company should appear here when a customer needs your service' : 'يجب أن تظهر شركتك هنا عندما يبحث العميل عن خدمتك'}</h2><p className="mt-4 max-w-3xl font-semibold leading-8 text-white/80">{isEn ? 'Join now to publish a trusted profile connected to your services and approved coverage areas.' : 'انضم الآن لنشر ملف موثوق مرتبط بخدماتك ومناطق تقديم الخدمة المعتمدة.'}</p><Link href={joinHref} className="mt-7 inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-[#D4AF37] px-8 font-black text-[#0F3F1A]">{isEn ? 'Join now' : 'انضم الآن'}</Link></div></div>
      </section>
    </main>
  );
}
