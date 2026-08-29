import Navbar from '../components/Navbar';
import SEOHead from '../components/SEOHead';
import Footer from '../components/Footer';
import { Bot, Download, Globe2 } from 'lucide-react';
import { GOOGLE_PLAY_URL, PROVIDERS_APP_URL } from '../lib/platformUrls';

const SITE_URL = 'https://bietalreef.ae';

export default function WeyaakPage() {
  const title = 'وياك | مساعد بيت الريف الذكي';
  const description = 'حمّل تطبيق بيت الريف وتحدث مع وياك لإدارة أعمالك والبحث في الخدمات وتنظيم طلبك داخل دولة الإمارات.';

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        keywords="وياك, Weyaak, مساعد بيت الريف, مزودو الخدمات, خدمات الإمارات"
        canonicalPath="/weyaak"
        ogImage={`${SITE_URL}/og-weyaak.jpg`}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          description,
          url: `${SITE_URL}/weyaak`,
          isPartOf: { '@type': 'WebSite', name: 'بيت الريف', url: SITE_URL },
        }}
        breadcrumbs={[{ name: 'وياك', href: '/weyaak' }]}
      />
      <div dir="rtl" className="min-h-[100dvh] bg-[#F8F3E7] text-[#1F3D2B]">
        <Navbar />
        <main className="px-4 py-16 md:py-24" aria-label="تحميل تطبيق بيت الريف واستخدام وياك">
          <section className="mx-auto max-w-5xl rounded-[2.5rem] border border-[#D9C89F] bg-white p-8 text-center shadow-xl md:p-14">
            <Bot className="mx-auto h-14 w-14 text-[#0F3F1A]" />
            <p className="mt-5 font-black text-[#8A6A00]">وياك داخل تطبيق بيت الريف</p>
            <h1 className="mt-3 text-4xl font-black text-[#0F3F1A] md:text-6xl">حمّل التطبيق وتحدث مع وياك</h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-9 text-gray-600">وياك يعمل داخل حسابك وسياق أعمالك في تطبيق بيت الريف. حمّل تطبيق Android للوصول الكامل، أو افتح نسخة المتصفح لاستكمال العمل من الكمبيوتر.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-7 font-black text-[#0F3F1A]"><Download className="h-5 w-5" />حمّل تطبيق بيت الريف</a>
              <a href={PROVIDERS_APP_URL} className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-7 font-black text-white"><Globe2 className="h-5 w-5" />الدخول من المتصفح</a>
            </div>
          </section>
        </main>
        <Footer showRequestCTA={false} />
      </div>
    </>
  );
}
