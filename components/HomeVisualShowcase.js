import Image from 'next/image';
import Link from 'next/link';

const visualSections = [
  {
    eyebrow: 'منصة ذكية للبناء والصيانة',
    title: 'منظومة بيت الريف تربط العميل بالمقاول والمورد والمصمم',
    desc: 'نعرض رؤية بيت الريف بشكل واضح: موقع تعريفي للأرشفة والتسويق، وتطبيق للتشغيل لاحقاً، ووياك كمساعد ذكي داخل الرحلة.',
    image: '/images/webp/bait-alreef-smart-construction-ecosystem-cover.webp',
    href: '/how-it-works',
    cta: 'تعرف على المنصة'
  },
  {
    eyebrow: 'تصميم قبل التنفيذ',
    title: 'تصميم داخلي وخارجي ثلاثي الأبعاد قبل بدء العمل',
    desc: 'صفحات الموقع تشرح كيف يمكن للعميل رؤية الفكرة والتصميم والتكلفة قبل التنفيذ، ثم الانتقال إلى طلب عرض سعر منظم.',
    image: '/images/webp/bait-alreef-3d-room-designer-before-execution.webp',
    href: '/categories/interior-design',
    cta: 'استكشف التصميم الداخلي'
  },
  {
    eyebrow: 'إدارة وشفافية',
    title: 'لوحات تحكم وبيانات تساعد على متابعة المشروع بوضوح',
    desc: 'نوضح للعميل ومزود الخدمة أن بيت الريف ليس صفحة عرض فقط، بل بنية منظمة لإدارة الطلبات، العروض، البيانات، ومراحل المشروع.',
    image: '/images/webp/bait-alreef-control-dashboard-leadership-transparency.webp',
    href: '/providers',
    cta: 'مزودو الخدمات'
  },
  {
    eyebrow: 'أدوات ذكية',
    title: 'أدوات تساعد في حساب المواد والتكلفة وتنظيم القرار',
    desc: 'نستخدم الصور الاحترافية الموجودة داخل الموقع لشرح الأدوات بدون إغراق الصفحة الرئيسية بنصوص طويلة.',
    image: '/images/webp/bait-alreef-smart-materials-calculator-investment-protection.webp',
    href: '/tools',
    cta: 'الأدوات الذكية'
  }
];

const quickLinks = [
  { href: '/uae', title: 'دليل الإمارات', desc: 'صفحات لجميع الإمارات والمدن والمناطق', icon: '🇦🇪' },
  { href: '/providers', title: 'مزودو الخدمات', desc: 'مقاولون وموردون وحرفيون ومكاتب هندسية', icon: '👷' },
  { href: '/marketplace', title: 'السوق', desc: 'مواد بناء وأثاث وديكور ومنتجات', icon: '🛒' },
  { href: '/weyaak', title: 'وياك', desc: 'المساعد الذكي داخل منظومة بيت الريف', icon: '🤖' }
];

export default function HomeVisualShowcase() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-16" dir="rtl">
      <div className="text-center mb-10">
        <p className="text-[#B8922B] font-black mb-2">رحلة بيت الريف</p>
        <h2 className="text-2xl md:text-4xl font-black text-[#0F3F1A] mb-4">من الفكرة إلى التنفيذ داخل منظومة واحدة</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-8">كل الروابط هنا صفحات عامة داخل الموقع التعريفي، وليست صفحات تطبيق محمية، حتى لا تظهر أخطاء 401 للزائر.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-12">
        {quickLinks.map((item) => (
          <Link key={item.href} href={item.href} className="bg-white border border-[#E6DCC8] rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#D4AF37] transition">
            <div className="flex items-start gap-4">
              <div className="text-3xl">{item.icon}</div>
              <div>
                <h3 className="font-black text-[#0F3F1A] mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-7">{item.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="space-y-10">
        {visualSections.map((section, index) => (
          <article key={section.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-6 items-center bg-white rounded-3xl border border-[#E6DCC8] shadow-sm overflow-hidden ${index % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''}`}>
            <div className="relative min-h-[280px] md:min-h-[420px] bg-[#F9F6F0]">
              <Image src={section.image} alt={section.title} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="p-6 md:p-10">
              <p className="text-[#B8922B] font-black mb-3">{section.eyebrow}</p>
              <h3 className="text-2xl md:text-3xl font-black text-[#0F3F1A] mb-4 leading-tight">{section.title}</h3>
              <p className="text-gray-600 leading-8 mb-6">{section.desc}</p>
              <Link href={section.href} className="inline-flex rounded-full bg-[#0F3F1A] text-white px-6 py-3 font-black hover:bg-[#1F6B3A] transition">{section.cta}</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
