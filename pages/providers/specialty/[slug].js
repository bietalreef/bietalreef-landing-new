import SEOHead from '../../../components/SEOHead';
import ProvidersSmartFooter from '../../../components/ProvidersSmartFooter';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import FAQ from '../../../components/FAQ';
import { SERVICE_CATEGORIES, UAE_EMIRATES, getServiceCategory } from '../../../data/siteTaxonomy';
import { getProvidersByCategory } from '../../../data/providers';
import SectionBackBar from '../../../components/SectionBackBar';

export default function ProviderSpecialtyPage({ service, matchedProviders }) {
  const title = 'مزودو ' + service.nameAr;
  const desc = 'صفحة مخصصة لتصفح مزودي ' + service.nameAr + ' داخل قسم مزودي الخدمات في بيت الريف.';
  const faqItems = [
    ['ما وظيفة هذه الصفحة؟', 'تعرض المزودين المعتمدين المرتبطين بهذا التخصص داخل قسم مزودي الخدمات.'],
    ['هل هذه الصفحة من دليل الإمارات؟', 'لا، هذه الصفحة تتبع قسم مزودي الخدمات. البحث حسب المدينة أو الإمارة يتم من دليل الإمارات.'],
    ['كيف أضيف نشاطي ضمن هذا التخصص؟', 'يمكنك التسجيل كمزود خدمة أو التواصل مع بيت الريف لتجهيز بيانات نشاطك للمراجعة.'],
  ];

  return (
    <>
      <SEOHead
        title={`${title} | بيت الريف`}
        description={desc}
        canonicalPath={`/providers/specialty/${service.slug}`}
        alternatePath={`/en/providers/specialty/${service.slug}`}
        ogImage={`https://bietalreef.ae${service.image || '/images/providers-hero.webp'}`}
        breadcrumbs={[{ name: 'مزودو الخدمات', href: '/providers' }, { name: service.nameAr, href: `/providers/specialty/${service.slug}` }]}
      />
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar pageTitle="مزودو الخدمات" />
        <SectionBackBar href="/providers" label="العودة إلى مزودي الخدمات" />
        <main>
          <section className="bg-[#0F3F1A] text-white">
            <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center md:text-right">
              <span className="inline-block rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-sm font-black text-[#D4AF37]">مزودو الخدمات</span>
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
            <h2 className="text-2xl md:text-3xl font-black text-[#0F3F1A] mb-6">مزودون متاحون الآن</h2>
            {matchedProviders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matchedProviders.map((provider) => (
                  <Link key={provider.slug} href={'/providers/' + provider.slug} className="block rounded-3xl border border-[#E6DCC8] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">{provider.providerTypeAr}</span>
                      {provider.verified && <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">موثق</span>}
                    </div>
                    <h3 className="text-xl font-black text-[#0F3F1A]">{provider.nameAr}</h3>
                    <p className="mt-3 text-sm leading-7 text-gray-600">{provider.descriptionAr}</p>
                    <div className="mt-5 border-t border-gray-100 pt-4 text-sm font-black text-primary">افتح ملف المزود</div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-[#E6DCC8] bg-white p-8 text-center shadow-sm">
                <h3 className="text-xl font-black text-[#0F3F1A]">لا توجد ملفات معتمدة لهذا التخصص حاليًا</h3>
                <p className="mt-4 text-gray-600">يمكنك تسجيل نشاطك أو التواصل معنا لإضافة مزود مناسب.</p>
              </div>
            )}
          </section>

          <section className="max-w-6xl mx-auto px-4 py-10">
            <div className="rounded-[2rem] bg-[#FFF8E5] border border-[#E6DCC8] p-8 shadow-sm">
              <h2 className="text-2xl font-black text-[#0F3F1A] mb-5">البحث حسب المكان</h2>
              <p className="text-gray-600 leading-8 mb-5">إذا أردت البحث حسب الإمارة أو المدينة، استخدم دليل الإمارات.</p>
              <div className="flex flex-wrap gap-3">
                {UAE_EMIRATES.map((emirate) => (
                  <Link key={emirate.slug} href={'/uae/' + emirate.slug} className="rounded-full bg-white border border-[#E6DCC8] px-5 py-3 text-sm font-black text-gray-700 hover:text-primary hover:border-primary">
                    {emirate.nameAr}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <FAQ items={faqItems} title={'أسئلة شائعة حول ' + title} />
        </main>
        <ProvidersSmartFooter locale="ar" />
        <Footer showRequestCTA={false} />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const service = getServiceCategory(params.slug);
  if (!service) return { notFound: true };
  const matchedProviders = getProvidersByCategory(params.slug);
  return { props: { service, matchedProviders }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return { paths: SERVICE_CATEGORIES.map((service) => ({ params: { slug: service.slug } })), fallback: 'blocking' };
}
