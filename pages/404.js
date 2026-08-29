import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { Home, MapPinned, UsersRound, Wrench, ShoppingBag, ArrowLeft } from 'lucide-react';
import { MARKET_URL } from '../lib/platformUrls';

const links = [
  { href: '/', label: 'الرئيسية', icon: Home },
  { href: '/uae', label: 'دليل الإمارات', icon: MapPinned },
  { href: '/providers', label: 'مزودو الخدمات', icon: UsersRound },
  { href: '/services', label: 'الخدمات والعروض', icon: Wrench },
  { href: MARKET_URL, label: 'سوق بيت الريف', icon: ShoppingBag },
];

export default function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="الصفحة غير موجودة | بيت الريف"
        description="الصفحة التي تبحث عنها غير موجودة داخل بيت الريف. يمكنك العودة إلى الرئيسية أو استكشاف دليل الإمارات ومزودي الخدمات والخدمات والعروض والمنتجات والمتاجر."
        canonicalPath="/404"
        noIndex
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'الصفحة غير موجودة',
          description: 'صفحة 404 مخصصة لموقع بيت الريف.',
          url: 'https://bietalreef.ae/404',
          inLanguage: 'ar-AE',
        }}
      />
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <section className="overflow-hidden rounded-[2.5rem] border border-[#E6DCC8] bg-white shadow-sm">
            <div className="bg-[#0F3F1A] px-6 py-14 text-center text-white md:px-12">
              <span className="inline-flex rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-sm font-black text-[#F4D35E]">404</span>
              <h1 className="mt-6 text-3xl font-black leading-tight md:text-5xl">الصفحة غير موجودة</h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-9 text-white/85 md:text-lg">الرابط الذي فتحته غير متاح أو تم نقله. يمكنك الرجوع إلى أحد أقسام بيت الريف الرئيسية ومتابعة التصفح بسهولة.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-5 md:p-8">
              {links.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} className="group rounded-3xl border border-[#E6DCC8] bg-[#FDFBF7] p-5 text-center transition hover:-translate-y-1 hover:border-primary hover:bg-white hover:shadow-lg">
                    <Icon className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
                    <h2 className="mt-3 text-sm font-black text-[#0F3F1A]">{item.label}</h2>
                    <span className="mt-3 inline-flex items-center justify-center gap-1 text-xs font-black text-[#6F5400]">افتح القسم <ArrowLeft className="h-3 w-3" aria-hidden="true" /></span>
                  </Link>
                );
              })}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
