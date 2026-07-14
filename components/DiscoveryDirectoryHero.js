import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, MessageCircle, Search, ShoppingBag, Wrench } from 'lucide-react';

const content = {
  services: {
    ar: { label: 'الخدمات والعروض', title: 'اختر الخدمة، ثم انتقل إلى تفاصيل الطلب وعرض السعر', description: 'ابدأ من نوع الخدمة المطلوبة، ثم أضف موقع المشروع والصور والمقاسات للوصول إلى مسار واضح يربط احتياجك بالخدمة والمزود المناسب.', browse: 'استعرض الخدمات', contact: 'اطلب توجيه من الفريق', alt: 'خدمات وعروض البناء والصيانة والتشطيبات في بيت الريف' },
    en: { label: 'Services & Offers', title: 'Choose a service, then continue to request and quotation details', description: 'Start with the required service, then add the project location, photos and measurements to reach a clear path connecting your need with the right service and provider.', browse: 'Browse services', contact: 'Ask our team', alt: 'Construction, maintenance and finishing services and offers on Biet Al Reef' },
    image: '/images/services-offers-hero.webp',
    target: '#services-list',
    Icon: Wrench,
  },
  products: {
    ar: { label: 'المنتجات والمتاجر', title: 'اختر المادة أو المنتج، ثم انتقل إلى المورد ومسار التسعير', description: 'ابدأ من فئة المنتج، وحدد الكمية والمواصفات وموقع التوريد، ثم انتقل إلى البطاقة أو المورد المناسب دون خلط المنتجات بالخدمات.', browse: 'استعرض المنتجات', contact: 'اطلب مساعدة في التوريد', alt: 'مواد ومنتجات ومتاجر البناء والتشطيب في بيت الريف' },
    en: { label: 'Products & Stores', title: 'Choose a material or product, then continue to supplier and pricing', description: 'Start with the product category, add quantity, specifications and supply location, then continue to the right card or supplier without mixing products with services.', browse: 'Browse products', contact: 'Ask for sourcing help', alt: 'Building and finishing materials, products and stores on Biet Al Reef' },
    image: '/images/materials-products-hero.webp',
    target: '#marketplace-categories',
    Icon: ShoppingBag,
  },
};

export default function DiscoveryDirectoryHero({ type, locale = 'ar' }) {
  const isAr = locale === 'ar';
  const section = content[type];
  const t = section[locale];
  const DirectionArrow = isAr ? ArrowLeft : ArrowRight;
  const Icon = section.Icon;

  return (
    <section dir={isAr ? 'rtl' : 'ltr'} className="bg-[#FDFBF7] px-4 pb-8 pt-6 md:pb-12 md:pt-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_20px_55px_rgba(18,58,70,0.08)] md:rounded-[2.5rem]">
        <div className="grid lg:grid-cols-[1.05fr_.95fr] lg:items-stretch">
          <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-bold text-gray-500"><Link href={isAr ? '/' : '/en'} className="transition hover:text-[#0F3F1A]">{isAr ? 'الرئيسية' : 'Home'}</Link><span aria-hidden="true">/</span><span className="text-[#8A6A00]">{t.label}</span></nav>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#FFF8E5] px-4 py-2 text-xs font-black text-[#8A6A00]"><Icon className="h-4 w-4" aria-hidden="true" />{t.label}</span>
            <h1 className="mt-5 max-w-2xl text-3xl font-black leading-[1.35] text-[#0F3F1A] md:text-5xl">{t.title}</h1>
            <p className="mt-5 max-w-2xl text-sm font-semibold leading-8 text-gray-600 md:text-base md:leading-9">{t.description}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={section.target} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#123A46] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"><Search className="h-5 w-5 text-[#F7E7A0]" aria-hidden="true" />{t.browse}<DirectionArrow className="h-4 w-4" aria-hidden="true" /></a>
              <a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/45 bg-white px-6 py-3 text-sm font-black text-[#0F3F1A] transition hover:-translate-y-0.5 hover:bg-[#FFF8E5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"><MessageCircle className="h-5 w-5 text-[#8A6A00]" aria-hidden="true" />{t.contact}</a>
            </div>
          </div>
          <div className="relative min-h-[300px] overflow-hidden bg-[#F5EFE4] lg:min-h-[500px]"><Image src={section.image} alt={t.alt} fill priority className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 48vw" /><div className={`absolute inset-0 ${isAr ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-white/20 via-transparent to-[#0F3F1A]/12`} /></div>
        </div>
      </div>
    </section>
  );
}
