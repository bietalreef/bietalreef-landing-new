import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import { getEmirate, getArea, getServiceCategory, getAllAreaServicePaths } from '../../../../data/siteTaxonomy';

export default function AreaServicePage({ emirate, area, service }) {
  const pageUrl = `https://bietalreef.ae/uae/${emirate.slug}/${area.slug}/${service.slug}`;
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `كيف أجد ${service.nameAr} في ${area.nameAr}؟`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `من خلال بيت الريف يمكنك استعراض صفحة ${service.nameAr} في ${area.nameAr} والانتقال إلى مزودي الخدمة أو التواصل مع فريق بيت الريف لترتيب الطلب.`
        }
      },
      {
        '@type': 'Question',
        name: `هل تغطي بيت الريف ${emirate.nameAr}؟`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `نعم، بيت الريف ينظم صفحات الخدمات حسب الإمارة والمنطقة والتخصص داخل ${emirate.nameAr}.`
        }
      }
    ]
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://bietalreef.ae/' },
      { '@type': 'ListItem', position: 2, name: 'الإمارات', item: 'https://bietalreef.ae/uae' },
      { '@type': 'ListItem', position: 3, name: emirate.nameAr, item: `https://bietalreef.ae/uae/${emirate.slug}` },
      { '@type': 'ListItem', position: 4, name: area.nameAr, item: `https://bietalreef.ae/uae/${emirate.slug}/${area.slug}` },
      { '@type': 'ListItem', position: 5, name: service.nameAr, item: pageUrl }
    ]
  };

  return (
    <>
      <Head>
        <title>{`${service.nameAr} في ${area.nameAr} - ${emirate.nameAr} | بيت الريف`}</title>
        <meta name="description" content={`ابحث عن ${service.nameAr} في ${area.nameAr}، ${emirate.nameAr} عبر بيت الريف. صفحة مخصصة للظهور المحلي وربط العملاء بمزودي الخدمات داخل المنصة.`} />
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar />
        <main>
          <section className="bg-gradient-to-br from-[#0F3F1A] via-[#1F6B3A] to-[#0F3F1A] text-white py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
              <nav className="mb-4 text-sm text-white/70" aria-label="Breadcrumb">
                <Link href="/uae" className="hover:text-[#D4AF37]">الإمارات</Link> / <Link href={`/uae/${emirate.slug}`} className="hover:text-[#D4AF37]">{emirate.nameAr}</Link> / <Link href={`/uae/${emirate.slug}/${area.slug}`} className="hover:text-[#D4AF37]">{area.nameAr}</Link> / {service.nameAr}
              </nav>
              <div className="text-5xl mb-5">{service.icon}</div>
              <h1 className="text-3xl md:text-5xl font-black mb-5">{service.nameAr} في {area.nameAr}</h1>
              <p className="text-white/80 max-w-3xl leading-8">{service.descAr} هذه الصفحة مهيأة للأرشفة المحلية وتعمل كبوابة وصول لمزودي الخدمة المسجلين لاحقاً داخل بيت الريف.</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link href="/providers" className="px-7 py-3 rounded-full bg-[#D4AF37] text-[#0F3F1A] font-black text-center hover:bg-[#c49b2e] transition">استعرض مزودي الخدمة</Link>
                <a href="https://wa.me/971567856001" className="px-7 py-3 rounded-full border-2 border-white text-white font-bold text-center hover:bg-white hover:text-[#0F3F1A] transition">تواصل معنا</a>
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: 'مزودون محليون', desc: `تهيئة الصفحة لاستقبال مزودي ${service.nameAr} في ${area.nameAr}.`, icon: '📍' },
                { title: 'طلبات وعروض أسعار', desc: 'الهدف ربط العميل لاحقاً بطلب عرض سعر داخل بيت الريف.', icon: '🧾' },
                { title: 'ظهور في جوجل', desc: 'بنية URL واضحة للأرشفة حسب الإمارة والمنطقة والتخصص.', icon: '🔎' },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h2 className="font-black text-[#0F3F1A] mb-2">{item.title}</h2>
                  <p className="text-sm text-gray-600 leading-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 pb-16">
            <div className="bg-white rounded-3xl border border-[#E6DCC8] p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-black mb-4">كيف يساعدك بيت الريف؟</h2>
              <p className="text-gray-600 leading-8 mb-6">بيت الريف ينظم مزودي الخدمة حسب الإمارة والمنطقة والتخصص، ويجهز صفحات هبوط يمكن ربطها مستقبلاً بحسابات مزودي الخدمة، المنتجات، العروض، والتقييمات داخل التطبيق.</p>
              <Link href={`/uae/${emirate.slug}/${area.slug}`} className="inline-flex text-[#0F3F1A] font-black hover:text-[#B8922B]">استعرض خدمات أخرى في {area.nameAr} ←</Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const emirate = getEmirate(params.emirate);
  const area = getArea(params.emirate, params.area);
  const service = getServiceCategory(params.service);
  if (!emirate || !area || !service) return { notFound: true };
  return { props: { emirate, area, service }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return {
    paths: getAllAreaServicePaths().map((item) => ({ params: item })),
    fallback: 'blocking'
  };
}
