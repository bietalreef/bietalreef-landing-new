import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { getAllServices } from "../lib/services-detailed";
import { getSectorCardImage } from "../lib/sectorCards";
import { ArrowRight, MessageCircle, Search, Wrench, ChevronLeft } from "lucide-react";

const servicesItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "جميع خدمات وعروض بيت الريف في الإمارات",
  "description": "قسم مستقل للخدمات والعروض في البناء والصيانة والتصميم، منفصل عن دليل الإمارات والمنتجات.",
  "url": "https://bietalreef.ae/services",
  "numberOfItems": 9,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "مقاولات البناء", "url": "https://bietalreef.ae/services/general-contracting" },
    { "@type": "ListItem", "position": 2, "name": "الاستشارات الهندسية", "url": "https://bietalreef.ae/services/engineering-consultants" },
    { "@type": "ListItem", "position": 3, "name": "شركات الصيانة", "url": "https://bietalreef.ae/services/general-maintenance" },
    { "@type": "ListItem", "position": 4, "name": "العمالة الحرفية", "url": "https://bietalreef.ae/services/carpentry" },
    { "@type": "ListItem", "position": 5, "name": "الورش الصناعية", "url": "https://bietalreef.ae/services/workshops" },
    { "@type": "ListItem", "position": 6, "name": "تأجير المعدات", "url": "https://bietalreef.ae/services/equipment-rental" },
    { "@type": "ListItem", "position": 7, "name": "محلات مواد البناء", "url": "https://bietalreef.ae/services/building-materials" },
    { "@type": "ListItem", "position": 8, "name": "الأثاث والديكور", "url": "https://bietalreef.ae/services/furniture-decor" },
    { "@type": "ListItem", "position": 9, "name": "خدمات النظافة", "url": "https://bietalreef.ae/services/cleaning-services" }
  ]
};

function getCategorySlug(serviceId) {
  const categoryMap = {
    construction: 'general-contracting',
    'interior-design': 'interior-design',
    'project-management': 'general-contracting',
    'engineering-consultants': 'engineering-consultants',
    maintenance: 'general-maintenance',
    'equipment-rental': 'equipment-rental',
    'cleaning-services': 'cleaning-services',
    'furniture-decoration': 'furniture-decor',
    'building-materials': 'building-materials',
    'specialized-services': 'general-maintenance',
    craftsmen: 'carpentry',
    workshops: 'workshops',
    cleaning: 'cleaning-services',
    'furniture-decor': 'furniture-decor'
  };
  return categoryMap[serviceId] || serviceId;
}

export default function Services({ services }) {
  return (
    <>
      <SEOHead
        title="الخدمات والعروض | مقاولات، صيانة، تصميم داخلي، مواد بناء في الإمارات"
        description="قسم الخدمات والعروض في بيت الريف: اختر الخدمة المطلوبة في البناء والصيانة والتصميم والمواد، ثم اطلب عرض سعر حسب تفاصيل مشروعك."
        keywords="خدمات بناء الإمارات, عروض مقاولات, صيانة, تصميم داخلي, سباكة, كهرباء, تكييف, دهانات, نجارة, مواد بناء"
        ogImage="https://bietalreef.ae/og-weyaak.jpg"
        structuredData={servicesItemListSchema}
        breadcrumbs={[{ name: "الخدمات والعروض", item: "https://bietalreef.ae/services" }]}
        includePWA={false}
      />

      <div dir="rtl" className="min-h-screen flex flex-col bg-[#FDFBF7]">
        <Navbar pageTitle="الخدمات والعروض" />
        <main className="flex-1 -mt-[1px]">
          <section className="relative isolate overflow-hidden bg-[#FDFBF7]">
            <div className="relative min-h-[600px] overflow-hidden md:min-h-[680px] lg:min-h-[740px]">
              <Image
                src="/images/services-offers-hero.webp"
                alt="خدمات وعروض البناء والصيانة والتشطيبات في بيت الريف"
                fill
                priority
                className="scale-[1.16] object-cover object-[52%_36%] -translate-y-[6%] md:scale-110 md:object-center md:-translate-y-[4%]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/18 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-[#FDFBF7]/48 via-[#FDFBF7]/8 to-transparent" />

              <Link href="/" className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37]/45 bg-white/76 px-3 py-2 text-xs font-black text-[#123A46] shadow-xl shadow-[#123A46]/16 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white md:right-8 md:top-8 md:px-4 md:py-3 md:text-sm">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner"><ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
                العودة إلى الرئيسية
              </Link>

              <div className="relative z-10 mx-auto flex min-h-[600px] max-w-6xl flex-col justify-end px-4 pb-8 pt-20 md:min-h-[680px] md:pb-12 lg:min-h-[740px]">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#123A46]/95 px-4 py-2 text-xs font-black text-white shadow-lg shadow-[#123A46]/22 backdrop-blur-xl md:text-sm">
                  <Wrench className="h-4 w-4 text-[#F7E7A0]" aria-hidden="true" />
                  بوابة الخدمات والعروض
                </div>

                <h1 className="max-w-3xl text-4xl font-black leading-tight text-[#0F3F1A] drop-shadow-[0_2px_12px_rgba(255,255,255,0.85)] md:text-6xl">
                  اختر الخدمة المطلوبة<br />وحول احتياجك إلى مسار واضح
                </h1>

                <div className="mt-5 max-w-3xl rounded-[2.1rem] border border-white/70 bg-white/64 p-4 shadow-2xl shadow-[#123A46]/14 backdrop-blur-2xl md:p-6">
                  <p className="max-w-2xl text-sm font-bold leading-8 text-gray-700 md:text-lg md:leading-9">
                    هذا القسم يبدأ من نوع الخدمة: مقاولات، صيانة، تشطيبات، نجارة، تنظيف أو تأجير معدات. اختر ما تحتاجه، ثم أرسل تفاصيل مشروعك للحصول على توجيه أو طلب عرض سعر مناسب.
                  </p>
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Link href="#services-list" className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl bg-[#D4AF37] px-5 py-4 text-base font-black text-[#0F3F1A] shadow-[0_12px_0_rgba(138,106,0,0.22),0_22px_38px_rgba(212,175,55,0.25)] transition hover:-translate-y-0.5 hover:bg-[#c9a52f]">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner transition group-hover:scale-105"><Search className="h-5 w-5" aria-hidden="true" /></span>
                      تصفح الخدمات الآن
                    </Link>
                    <a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl border border-[#123A46]/20 bg-white/86 px-5 py-4 text-base font-black text-[#123A46] shadow-[0_10px_0_rgba(18,58,70,0.08),0_18px_30px_rgba(18,58,70,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner transition group-hover:scale-105"><MessageCircle className="h-5 w-5" aria-hidden="true" /></span>
                      اطلب توجيه من الفريق
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="services-list" className="max-w-6xl mx-auto px-4 py-14 md:py-20">
            <div className="mb-8 text-center md:text-right">
              <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] shadow-sm">قطاعات الخدمات</span>
              <h2 className="mt-4 text-3xl font-black text-[#0F3F1A] md:text-4xl">اختر نوع الخدمة</h2>
              <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:mx-0 md:text-base">الكروت مصممة Mobile First: صورة واضحة، محتوى مختصر، ومسار مباشر لفتح الخدمة.</p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => {
                const categorySlug = getCategorySlug(service.id);
                return (
                  <Link key={service.id} href={`/services/${categorySlug}`}>
                    <article className="group h-full overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_18px_45px_rgba(18,58,70,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-[0_24px_60px_rgba(18,58,70,0.15)]">
                      <div className="relative h-52 overflow-hidden bg-[#F5EFE4] sm:h-56 lg:h-52">
                        <Image src={getSectorCardImage(categorySlug)} alt={service.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A]/78 via-[#0F3F1A]/16 to-transparent" />
                        <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between gap-3">
                          <span className="rounded-2xl bg-white/92 px-4 py-2 text-sm font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl">{service.title}</span>
                          <span className="rounded-2xl bg-[#123A46] px-3 py-2 text-xs font-black text-[#F7E7A0] shadow-lg ring-1 ring-[#D4AF37]/40">خدمة</span>
                        </div>
                      </div>
                      <div className="p-5 md:p-6">
                        <h3 className="mb-3 text-xl font-black leading-8 text-[#0F3F1A] group-hover:text-[#B8922B]">{service.title}</h3>
                        <p className="mb-5 text-sm font-semibold leading-7 text-gray-600">{service.shortDesc}</p>
                        <div className="mb-5 rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-3">
                          <p className="text-xs font-black text-gray-500">طريقة التسعير</p>
                          <p className="mt-1 text-sm font-black text-[#0F3F1A]">حسب تفاصيل المشروع</p>
                        </div>
                        <div className="mb-5 space-y-2">
                          {service.benefits.slice(0, 2).map((benefit) => (
                            <div key={benefit} className="flex items-start gap-2 text-xs font-bold leading-6 text-gray-700"><span className="mt-1 text-[#B8922B]">✓</span><span>{benefit}</span></div>
                          ))}
                        </div>
                        <span className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123A46] px-5 py-3 text-sm font-black text-white shadow-[0_10px_0_rgba(18,58,70,0.12)] transition group-hover:bg-[#D4AF37] group-hover:text-[#0F3F1A]">
                          تفاصيل الخدمة <ChevronLeft className="h-4 w-4" />
                        </span>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4"><h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">كيف تختار الخدمة المناسبة؟</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-8"><div className="text-center p-6 rounded-xl bg-white shadow-soft"><div className="text-5xl mb-4">1️⃣</div><h3 className="font-bold text-lg mb-3">حدد الخدمة</h3><p className="text-gray-600 text-sm">ابدأ من نوع العمل المطلوب: مقاولات، صيانة، نجارة، رخام أو غيرها.</p></div><div className="text-center p-6 rounded-xl bg-white shadow-soft"><div className="text-5xl mb-4">2️⃣</div><h3 className="font-bold text-lg mb-3">أضف التفاصيل</h3><p className="text-gray-600 text-sm">الموقع، المقاسات، الصور، والمواد المطلوبة تساعد على توجيه الطلب.</p></div><div className="text-center p-6 rounded-xl bg-white shadow-soft"><div className="text-5xl mb-4">3️⃣</div><h3 className="font-bold text-lg mb-3">اطلب عرض سعر</h3><p className="text-gray-600 text-sm">لا نعتمد على سعر عام؛ السعر الصحيح يحتاج تفاصيل المشروع.</p></div></div></div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const services = getAllServices();
  return { props: { services } };
}
