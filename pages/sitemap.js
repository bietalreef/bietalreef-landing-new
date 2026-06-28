import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { UAE_EMIRATES, SERVICE_CATEGORIES } from '../data/siteTaxonomy';

export default function SitemapPage() {
  return (
    <>
      <Head>
        <title>خريطة الموقع | بيت الريف</title>
        <meta name="description" content="خريطة الموقع الشاملة لمنصة بيت الريف - تصفح جميع الخدمات والمناطق في الإمارات." />
        <link rel="canonical" href="https://bietalreef.ae/sitemap" />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-14 md:py-20">
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-10">خريطة الموقع</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Main Sections */}
            <section>
              <h2 className="text-xl font-bold text-[#B8922B] mb-5 pb-2 border-b border-[#E6DCC8]">الأقسام الرئيسية</h2>
              <ul className="space-y-3">
                <li><Link href="/" className="hover:text-[#B8922B]">الرئيسية</Link></li>
                <li><Link href="/services" className="hover:text-[#B8922B]">جميع الخدمات</Link></li>
                <li><Link href="/uae" className="hover:text-[#B8922B]">دليل الإمارات</Link></li>
                <li><Link href="/providers" className="hover:text-[#B8922B]">مزودو الخدمات</Link></li>
                <li><Link href="/marketplace" className="hover:text-[#B8922B]">السوق</Link></li>
                <li><Link href="/tools" className="hover:text-[#B8922B]">الأدوات الذكية</Link></li>
                <li><Link href="/weyaak" className="hover:text-[#B8922B]">وياك AI</Link></li>
                <li><Link href="/platform" className="hover:text-[#B8922B]">تعرف على المنصة</Link></li>
                <li><Link href="/about" className="hover:text-[#B8922B]">من نحن</Link></li>
              </ul>
            </section>

            {/* Services */}
            <section>
              <h2 className="text-xl font-bold text-[#B8922B] mb-5 pb-2 border-b border-[#E6DCC8]">خدماتنا</h2>
              <ul className="space-y-3">
                {SERVICE_CATEGORIES.map(service => (
                  <li key={service.slug}>
                    <Link href={`/categories/${service.slug}`} className="hover:text-[#B8922B]">{service.nameAr}</Link>
                  </li>
                ))}
                <li><Link href="/building-materials-uae" className="hover:text-[#B8922B]">مواد بناء</Link></li>
              </ul>
            </section>

            {/* Emirates */}
            <section>
              <h2 className="text-xl font-bold text-[#B8922B] mb-5 pb-2 border-b border-[#E6DCC8]">دليل الإمارات</h2>
              <ul className="space-y-3">
                {UAE_EMIRATES.map(emirate => (
                  <li key={emirate.slug}>
                    <Link href={`/uae/${emirate.slug}`} className="hover:text-[#B8922B]">{emirate.nameAr}</Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
