import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const copy = {
  ar: {
    title: 'اجعل رحلتك أسهل مع وياك',
    description: 'صف احتياج مشروعك، وسيساعدك وياك في الوصول إلى الإمارة والقطاع والخدمة أو المزود المناسب.',
    button: 'اسأل وياك',
    href: '/weyaak',
    logoAlt: 'شعار وياك الرسمي',
  },
  en: {
    title: 'Make your journey easier with Weyaak',
    description: 'Describe your project needs, and Weyaak will guide you to the right emirate, sector, service or provider.',
    button: 'Ask Weyaak',
    href: '/en/weyaak',
    logoAlt: 'Official Weyaak logo',
  },
};

export default function UaeDirectoryWeyaakCard({ locale = 'ar' }) {
  const isEnglish = locale === 'en';
  const t = copy[isEnglish ? 'en' : 'ar'];

  return (
    <section className="bg-[#FDFBF7] px-4 pb-4 md:pb-6">
      <div className={`mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-[1.75rem] border border-[#D9C89F] bg-white/92 px-4 py-4 shadow-lg shadow-[#0F3F1A]/5 sm:flex-row sm:justify-between md:px-6 ${isEnglish ? 'text-left' : 'text-right'}`}>
        <div className={`flex min-w-0 flex-1 items-center gap-4 ${isEnglish ? '' : 'sm:flex-row-reverse'}`}>
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[1.25rem] border border-[#E6DCC8] bg-[#FDFBF7] p-1.5 shadow-inner md:h-[4.5rem] md:w-[4.5rem]">
            <Image src="/images/weyaak-new-logo.jpg" alt={t.logoAlt} fill sizes="72px" className="object-contain" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-black leading-tight text-[#0F3F1A] md:text-2xl">{t.title}</h2>
            <p className="mt-1.5 text-sm font-semibold leading-6 text-gray-600 md:text-base">{t.description}</p>
          </div>
        </div>
        <Link href={t.href} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-5 py-3 text-sm font-black text-white shadow-md shadow-[#0F3F1A]/15 transition hover:-translate-y-0.5 hover:bg-[#D4AF37] hover:text-[#1F170D]">
          {t.button}
          <ArrowLeft size={17} />
        </Link>
      </div>
    </section>
  );
}
