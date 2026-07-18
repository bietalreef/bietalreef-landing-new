import Link from 'next/link';

const copy = {
  ar: {
    homeTitle: 'وياك في دليل الإمارات',
    homeText: 'أخبر وياك بما يحتاجه مشروعك، وسيساعدك في اختيار الإمارة والقطاع والخدمة أو المنتج والمسار الأنسب داخل دليل الإمارات.',
    abuDhabiTitle: 'وياك في أبوظبي',
    abuDhabiText: 'أخبر وياك بما يحتاجه مشروعك في أبوظبي أو العين، وسيساعدك في الوصول إلى القسم أو الخدمة أو المنتج والمسار الأنسب.',
    action: 'اسأل وياك',
    href: '/weyaak',
  },
  en: {
    homeTitle: 'Wayaak in the UAE Directory',
    homeText: 'Tell Wayaak what your project needs, and it will help you choose the emirate, sector, service, product or most relevant directory path.',
    abuDhabiTitle: 'Wayaak in Abu Dhabi',
    abuDhabiText: 'Tell Wayaak what your project needs in Abu Dhabi or Al Ain, and it will guide you to the most relevant sector, service, product or directory path.',
    action: 'Ask Wayaak',
    href: '/en/weyaak',
  },
};

export default function UaeDirectoryWeyaakCard({ locale = 'ar', context = 'home', className = '' }) {
  const isEn = locale === 'en';
  const t = copy[locale];
  const title = context === 'abu-dhabi' ? t.abuDhabiTitle : t.homeTitle;
  const text = context === 'abu-dhabi' ? t.abuDhabiText : t.homeText;

  return (
    <section dir={isEn ? 'ltr' : 'rtl'} className={`mx-auto max-w-6xl px-4 ${className}`.trim()}>
      <div className="rounded-[2rem] border border-[#D8B75A]/55 bg-[linear-gradient(135deg,#FFFDF7_0%,#F8F0DA_100%)] p-5 shadow-[0_16px_38px_rgba(138,106,0,.08)] sm:flex sm:items-center sm:gap-6 md:p-7">
        <div className="flex-1 text-center sm:text-start">
          <h2 className="text-2xl font-black text-[#0F3F1A] md:text-3xl">{title}</h2>
          <p className="mt-2 text-sm font-semibold leading-7 text-gray-600 md:text-base">{text}</p>
        </div>
        <Link href={t.href} className="mt-5 inline-flex min-h-[50px] w-full items-center justify-center rounded-2xl bg-[#0F3F1A] px-6 py-3 text-sm font-black text-white transition hover:bg-[#B8922B] sm:mt-0 sm:w-auto">
          {t.action}
        </Link>
      </div>
    </section>
  );
}
