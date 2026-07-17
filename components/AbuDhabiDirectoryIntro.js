import Image from 'next/image';
import Link from 'next/link';

const copy = {
  ar: {
    title: 'كيف يساعدك دليل أبوظبي في الوصول إلى ما يحتاجه مشروعك؟',
    text: 'يجمع دليل أبوظبي في بيت الريف بين المقاولين ومزودي الخدمات والموردين والمتاجر والمنتجات ضمن مسار جغرافي منظم يبدأ من الإمارة، ثم القطاع، ثم المدينة أو المنطقة، ثم التخصص. يساعد هذا التنظيم أصحاب الفلل والمباني والمشاريع التجارية على الوصول إلى الخيارات الأقرب داخل أبوظبي والعين ومناطق الإمارة.',
    weyaakTitle: 'اجعل رحلتك داخل أبوظبي أسهل مع وياك',
    weyaakText: 'أخبر وياك بما يحتاج إليه مشروعك في أبوظبي أو العين، وسيساعدك في تحديد القسم والخدمة أو المنتج والمسار الأنسب.',
    weyaakAction: 'اسأل وياك',
    cards: [
      { title: 'اختر حسب الموقع', text: 'ابدأ من أبوظبي أو العين أو المنطقة الأقرب إلى مشروعك.', icon: '/images/ui-icons-3d/location-map.webp' },
      { title: 'استكشف الخدمات والمنتجات', text: 'انتقل بين المقاولين والخدمات والعروض والمواد والمتاجر.', icon: '/images/ui-icons-3d/products-box.webp' },
      { title: 'قارن مع وياك', text: 'نظّم احتياجك وحدد المسار الأنسب قبل التواصل.', icon: '/images/ui-icons-3d/search-magnifier.webp' },
    ],
  },
  en: {
    title: 'How does the Abu Dhabi Directory help you reach what your project needs?',
    text: 'Biet Al Reef Abu Dhabi Directory brings contractors, service providers, suppliers, stores and products together through an organised geographic path: emirate, sector, city or area, then specialty. This structure helps villa owners, building managers and commercial projects reach relevant options across Abu Dhabi, Al Ain and surrounding areas.',
    weyaakTitle: 'Make your Abu Dhabi journey easier with Weyaak',
    weyaakText: 'Tell Weyaak what your project needs in Abu Dhabi or Al Ain, and it will help identify the right section, service, product and route.',
    weyaakAction: 'Ask Weyaak',
    cards: [
      { title: 'Choose by location', text: 'Start with Abu Dhabi, Al Ain or the area closest to your project.', icon: '/images/ui-icons-3d/location-map.webp' },
      { title: 'Explore services and products', text: 'Move between contractors, services, offers, materials and stores.', icon: '/images/ui-icons-3d/products-box.webp' },
      { title: 'Compare with Weyaak', text: 'Organise your needs and identify the best route before contacting providers.', icon: '/images/ui-icons-3d/search-magnifier.webp' },
    ],
  },
};

function Icon({ src }) {
  return <span className="relative block h-16 w-16 shrink-0"><Image src={src} alt="" fill className="object-contain" sizes="64px" /></span>;
}

export default function AbuDhabiDirectoryIntro({ locale = 'ar' }) {
  const isEn = locale === 'en';
  const t = copy[locale];
  return (
    <section dir={isEn ? 'ltr' : 'rtl'} className="mx-auto max-w-6xl px-4 pt-8 md:pt-10">
      <div className="rounded-[2rem] border border-[#D8B75A]/55 bg-[linear-gradient(135deg,#FFFDF7_0%,#F8F0DA_100%)] p-5 shadow-[0_16px_38px_rgba(138,106,0,.08)] md:flex md:items-center md:gap-6 md:p-7">
        <Icon src="/images/ui-icons-3d/customer-support.webp" />
        <div className="mt-4 flex-1 md:mt-0">
          <h2 className="text-2xl font-black text-[#0F3F1A]">{t.weyaakTitle}</h2>
          <p className="mt-2 text-sm font-semibold leading-7 text-gray-600 md:text-base">{t.weyaakText}</p>
        </div>
        <Link href={isEn ? '/en/weyaak' : '/weyaak'} className="mt-5 inline-flex min-h-[50px] items-center justify-center rounded-2xl bg-[#0F3F1A] px-6 py-3 text-sm font-black text-white transition hover:bg-[#B8922B] md:mt-0">{t.weyaakAction}</Link>
      </div>

      <div className="mt-9 text-center">
        <h2 className="text-3xl font-black leading-tight text-[#0F3F1A] md:text-4xl">{t.title}</h2>
        <p className="mx-auto mt-4 max-w-5xl text-base font-semibold leading-9 text-gray-650 md:text-lg">{t.text}</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {t.cards.map((item) => <article key={item.title} className="flex min-h-[150px] flex-col items-center justify-center rounded-[1.5rem] border border-[#E4D6BA] bg-white px-5 py-5 text-center shadow-[0_10px_28px_rgba(18,58,70,.04)]"><Icon src={item.icon} /><h3 className="mt-2 text-lg font-black text-[#0F3F1A]">{item.title}</h3><p className="mt-2 text-sm font-semibold leading-7 text-gray-600">{item.text}</p></article>)}
      </div>
    </section>
  );
}
