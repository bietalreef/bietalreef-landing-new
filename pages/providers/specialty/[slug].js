import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import FAQ from '../../../components/FAQ';
import { SERVICE_CATEGORIES, UAE_EMIRATES, getServiceCategory } from '../../../data/siteTaxonomy';

export default function ProviderSpecialtyPage({ service }) {
  const title = `مزودو ${service.nameAr}`;
  const desc = `صفحة مخصصة لتصفح مزودي خدمة ${service.nameAr} داخل قسم مزودي الخدمات في بيت الريف، منفصلة عن دليل الإمارات والخدمات والعروض.`;
  const faqItems = [
    [`ما المقصود بمزودي ${service.nameAr}؟`, `هم الشركات أو الورش أو الأفراد أو المكاتب التي تقدم خدمات مرتبطة بـ ${service.nameAr}.`],
    ['هل هذه الصفحة من دليل الإمارات؟', 'لا، هذه الصفحة تتبع قسم مزودي الخدمات. البحث حسب المدينة أو الإمارة يتم من دليل الإمارات.'],
    ['كيف أضيف نشاطي ضمن هذا التخصص؟', 'يمكنك التسجيل كمزود خدمة أو التواصل مع بيت الريف لتجهيز بيانات نشاطك للمراجعة.'],
  ];

  return (
    <>
      <Head>
        <title>{title} | بيت الريف</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`https://bietalreef.ae/providers/specialty/${service.slug}`} />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar pageTitle="مزودو الخدمات" />
        <main>
          <section className="bg-[#0F3F1A] text-white">
            <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center md:text-right">
              <span className="inline-block rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-sm font-black text-[#D4AF37]">
                مزودو الخدمات
              </span>
              <div className="mt-6 text-5xl">{service.icon}</div>
              <h1 className="mt-6 text-3xl md:text-5xl font-black leading-tight">{title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-9 text-white/90 mx-auto md:mx-0">{desc}</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link href="/providers/register" className="rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#0F3F1A]">سجل كمزود خدمة</Link>
                <Link href="/providers" className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-black text-white">كل مزودي الخدمات</Link>
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-14">
            <div className="rounded-[2rem] bg-white border border-[#E6DCC8] p-8 shadow-sm">
              <h2 className="text-2xl font-black text-[#0F3F1A] mb-4">كيف يعمل هذا المسار؟</h2>
              <p className="text-gray-600 leading-8">هذا المسار يعرض التخصص من زاوية المزودين فقط. عند اكتمال بيانات المزودين المعتمدة سيتم عرض الشركات والورش والموردين المرتبطين بهذا التخصص هنا.</p>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['شركة', 'ورشة / مصنع', 'فرد / فني'].map((type) => (
                <div key={type} className="rounded-3xl bg-white border border-[#E6DCC8] p-7 shadow-sm">
                  <h3 className="font-black text-[#0F3F1A] mb-3">{type}</h3>
                  <p className="text-sm leading-8 text-gray-600">سيتم ربط هذا النوع من المزودين بالتخصص بعد اعتماد البيانات.</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-10">
            <div className="rounded-[2rem] bg-[#FFF8E5] border border-[#E6DCC8] p-8 shadow-sm">
              <h2 className="text-2xl font-black text-[#0F3F1A] mb-5">البحث حسب المكان</h2>
              <p className="text-gray-600 leading-8 mb-5">إذا أردت البحث عن {service.nameAr} حسب الإمارة أو المدينة، استخدم دليل الإمارات.</p>
              <div className="flex flex-wrap gap-3">
                {UAE_EMIRATES.map((emirate) => (
                  <Link key={emirate.slug} href={`/uae/${emirate.slug}`} className="rounded-full bg-white border border-[#E6DCC8] px-5 py-3 text-sm font-black text-gray-700 hover:text-primary hover:border-primary">
                    {emirate.nameAr}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <FAQ items={faqItems} title={`أسئلة شائعة حول ${title}`} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const service = getServiceCategory(params.slug);
  if (!service) return { notFound: true };
  return { props: { service }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return { paths: SERVICE_CATEGORIES.map((service) => ({ params: { slug: service.slug } })), fallback: 'blocking' };
}
