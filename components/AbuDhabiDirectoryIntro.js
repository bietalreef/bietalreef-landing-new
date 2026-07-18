import Image from 'next/image';
import UaeDirectoryWeyaakCard from './UaeDirectoryWeyaakCard';

const copy = {
  ar: {
    title: 'كيف يساعدك دليل أبوظبي في الوصول إلى ما يحتاجه مشروعك؟',
    text: 'يجمع دليل أبوظبي في بيت الريف بين المقاولين ومزودي الخدمات والموردين والمتاجر والمنتجات ضمن مسار جغرافي منظم يبدأ من الإمارة، ثم القطاع، ثم المدينة أو المنطقة، ثم التخصص. ويساعد هذا النظام أصحاب الفلل والمباني والمشاريع التجارية على الوصول إلى الخيارات الأقرب لاحتياجات المشروع داخل أبوظبي والعين ومناطق الإمارة.',
    cards: [
      { title: 'اختر حسب الموقع', text: 'ابدأ من أبوظبي أو العين أو المنطقة الأقرب إلى مشروعك.', icon: '/images/ui-icons-3d/location-map.webp' },
      { title: 'استكشف الخدمات والمنتجات', text: 'انتقل بين المقاولين والخدمات والعروض والمواد والمتاجر.', icon: '/images/ui-icons-3d/products-box.webp' },
      { title: 'قارن مع وياك', text: 'نظّم احتياجك وحدد المسار الأنسب قبل التواصل.', icon: '/images/ui-icons-3d/search-magnifier.webp' },
    ],
  },
  en: {
    title: 'How does the Abu Dhabi Directory help you find what your project needs?',
    text: 'The Biet Al Reef Abu Dhabi Directory brings contractors, service providers, suppliers, stores and products together within an organized geographic journey that starts with the emirate, then the sector, city or area, and finally the specialty. It helps villa owners, building managers and commercial projects find options that are more relevant to their needs across Abu Dhabi, Al Ain and the wider emirate.',
    cards: [
      { title: 'Choose by location', text: 'Start with Abu Dhabi, Al Ain or the area closest to your project.', icon: '/images/ui-icons-3d/location-map.webp' },
      { title: 'Explore services and products', text: 'Move between contractors, services, offers, materials and stores.', icon: '/images/ui-icons-3d/products-box.webp' },
      { title: 'Compare with Wayaak', text: 'Organize your needs and identify the best route before contacting providers.', icon: '/images/ui-icons-3d/search-magnifier.webp' },
    ],
  },
};

function Icon({ src }) {
  return <span className="relative block h-12 w-12 shrink-0 sm:h-11 sm:w-11 lg:h-14 lg:w-14"><Image src={src} alt="" fill className="object-contain" sizes="56px" /></span>;
}

export default function AbuDhabiDirectoryIntro({ locale = 'ar' }) {
  const isEn = locale === 'en';
  const t = copy[locale];
  return (
    <div dir={isEn ? 'ltr' : 'rtl'} className="pt-8 md:pt-10">
      <UaeDirectoryWeyaakCard locale={locale} context="abu-dhabi" />

      <section className="mx-auto max-w-6xl px-4 pt-7">
        <div className={`${isEn ? 'text-left' : 'text-right'} rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-[0_16px_38px_rgba(18,58,70,.06)] md:p-8`}>
          <h2 className="text-2xl font-black leading-tight text-[#0F3F1A] md:text-3xl">{t.title}</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-gray-600 md:text-lg md:leading-9">{t.text}</p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 min-[560px]:grid-cols-3 sm:gap-4">
          {t.cards.map((item) => (
            <article key={item.title} className="flex min-h-[150px] flex-col items-center justify-center rounded-[1.5rem] border border-[#E4D6BA] bg-white px-3 py-4 text-center shadow-[0_10px_28px_rgba(18,58,70,.04)] sm:min-h-[170px] sm:px-3 lg:px-5">
              <Icon src={item.icon} />
              <h3 className="mt-2 text-sm font-black leading-6 text-[#0F3F1A] sm:text-[15px] lg:text-lg">{item.title}</h3>
              <p className="mt-2 text-xs font-semibold leading-6 text-gray-600 sm:text-[12px] lg:text-sm lg:leading-7">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
