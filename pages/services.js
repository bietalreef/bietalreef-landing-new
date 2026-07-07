import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { getAllServices } from "../lib/services-detailed";

// JSON-LD: ItemList of services
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

      <div className="min-h-screen flex flex-col bg-white">
        <Navbar pageTitle="الخدمات والعروض" />
        <main className="flex-1">
          <section className="bg-gradient-to-b from-primary via-primary-dark to-primary-dark text-white py-12 md:py-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white bg-opacity-20 text-white text-xs mb-6"><span>⚒️</span><span>قسم مستقل للخدمات والعروض</span></div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">الخدمات والعروض</h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto mb-2">اختر نوع الخدمة أولًا، ثم أرسل تفاصيل مشروعك للحصول على توجيه أو عرض سعر مناسب.</p>
              <p className="text-base md:text-lg max-w-3xl mx-auto opacity-90">هذا القسم مستقل عن دليل الإمارات. البحث حسب الموقع يبدأ من دليل الإمارات، أما هنا فالبداية من نوع الخدمة.</p>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => {
                const categoryMap = {
                  'construction': 'general-contracting',
                  'interior-design': 'interior-design',
                  'project-management': 'general-contracting',
                  'engineering-consultants': 'engineering-consultants',
                  'maintenance': 'general-maintenance',
                  'equipment-rental': 'equipment-rental',
                  'cleaning-services': 'cleaning-services',
                  'furniture-decoration': 'furniture-decor',
                  'building-materials': 'building-materials',
                  'specialized-services': 'general-maintenance',
                  'craftsmen': 'carpentry',
                  'workshops': 'workshops',
                  'cleaning': 'cleaning-services',
                  'furniture-decor': 'furniture-decor'
                };
                const categorySlug = categoryMap[service.id] || service.id;
                return (
                  <Link key={service.id} href={`/services/${categorySlug}`}>
                    <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer h-full border border-gray-100 hover:border-primary">
                      <div className="h-40 bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 flex items-center justify-center overflow-hidden relative border-b-2 border-gray-100">
                        <div className="relative w-32 h-32"><Image src={service.icon} alt={service.title} fill className="object-contain p-2 group-hover:scale-125 transition-transform duration-500 drop-shadow-lg" /></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.shortDesc}</p>
                        <div className="flex items-center gap-2 mb-4"><span className="text-yellow-400 text-lg">⭐</span><span className="font-bold text-gray-900">{service.rating}</span><span className="text-gray-500 text-xs">({service.reviews}+)</span></div>
                        <div className="mb-4 pb-4 border-b border-gray-200"><p className="text-xs text-gray-600 mb-1">طريقة التسعير:</p><p className="text-base font-bold text-primary bg-primary bg-opacity-10 px-3 py-2 rounded-lg inline-block">حسب تفاصيل المشروع</p></div>
                        <div className="mb-4"><ul className="space-y-1.5">{service.benefits.slice(0, 2).map((benefit, index) => (<li key={index} className="text-xs text-gray-700 flex items-start gap-2"><span className="text-primary font-bold flex-shrink-0 mt-0.5">✓</span><span>{benefit}</span></li>))}</ul></div>
                        <button className="w-full py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-all duration-300 text-sm group-hover:shadow-lg">تفاصيل الخدمة →</button>
                      </div>
                    </div>
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
