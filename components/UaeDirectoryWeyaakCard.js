import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GOOGLE_PLAY_URL } from '../lib/platformUrls';

const copy = {
  ar: {
    homeTitle: 'اجعل رحلتك أسهل مع وياك',
    homeText: 'صف احتياج مشروعك، وسيساعدك وياك في الوصول إلى الإمارة والقطاع والخدمة أو المزود المناسب.',
    abuDhabiTitle: 'وياك في أبوظبي',
    abuDhabiText: 'أخبر وياك بما يحتاجه مشروعك في أبوظبي أو العين، وسيساعدك في الوصول إلى القسم أو الخدمة أو المنتج والمسار الأنسب.',
    action: 'حمّل التطبيق وتحدث مع وياك',
    logoAlt: 'شعار وياك الرسمي',
  },
  en: {
    homeTitle: 'Make your journey easier with Weyaak',
    homeText: 'Describe your project needs, and Weyaak will guide you to the right emirate, sector, service or provider.',
    abuDhabiTitle: 'Wayaak in Abu Dhabi',
    abuDhabiText: 'Tell Wayaak what your project needs in Abu Dhabi or Al Ain, and it will guide you to the most relevant sector, service, product or directory path.',
    action: 'Download the app and ask Weyaak',
    logoAlt: 'Official Weyaak logo',
  },
};

export default function UaeDirectoryWeyaakCard({ locale = 'ar', context = 'home', title: customTitle, description: customDescription, className = '' }) {
  const isEnglish = locale === 'en';
  const t = copy[isEnglish ? 'en' : 'ar'];
  const title = customTitle || (context === 'abu-dhabi' ? t.abuDhabiTitle : t.homeTitle);
  const description = customDescription || (context === 'abu-dhabi' ? t.abuDhabiText : t.homeText);
  const Arrow = isEnglish ? ArrowRight : ArrowLeft;

  return (
    <section dir={isEnglish ? 'ltr' : 'rtl'} className={`bg-[#FDFBF7] px-4 pb-4 md:pb-6 ${className}`.trim()}>
      <div className={`mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-[1.75rem] border border-[#D9C89F] bg-white/92 px-4 py-4 shadow-lg shadow-[#0F3F1A]/5 sm:flex-row sm:justify-between md:px-6 ${isEnglish ? 'text-left' : 'text-right'}`}>
        <div className={`flex min-w-0 flex-1 items-center gap-4 ${isEnglish ? '' : 'sm:flex-row-reverse'}`}>
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[1.25rem] border border-[#E6DCC8] bg-[#FDFBF7] p-1.5 shadow-inner md:h-[4.5rem] md:w-[4.5rem]">
            <Image src="/images/weyaak-new-logo.jpg" alt={t.logoAlt} fill sizes="72px" className="object-contain" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-black leading-tight text-[#0F3F1A] md:text-2xl">{title}</h2>
            <p className="mt-1.5 text-sm font-semibold leading-6 text-gray-600 md:text-base">{description}</p>
          </div>
        </div>
        <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" data-weyaak-title={title} data-weyaak-section={isEnglish ? 'UAE Directory' : 'دليل الإمارات'} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-5 py-3 text-sm font-black text-white shadow-md shadow-[#0F3F1A]/15 transition hover:-translate-y-0.5 hover:bg-[#D4AF37] hover:text-[#1F170D]">
          {t.action}
          <Arrow size={17} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
