import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ChevronLeft } from 'lucide-react';

const directorySectors = [
  { slug: 'general-contracting', titleAr: 'المقاولات العامة والبناء والتشييد', titleEn: 'General Contracting, Construction & Building', eyebrowAr: 'قطاع البناء', eyebrowEn: 'Construction sector', descAr: 'شركات ومقاولون لتنفيذ الفلل والملاحق والمجالس والمشاريع السكنية والتجارية.', descEn: 'Contracting companies and providers for villas, extensions, majlis and commercial projects.', image: '/images/sector-cards/general-contracting-construction-card.webp', tagsAr: ['مقاولات', 'بناء', 'تشييد'], tagsEn: ['Contracting', 'Construction', 'Building'] },
  { slug: 'engineering-consultants', titleAr: 'مكاتب هندسية واستشارات وتصميم', titleEn: 'Engineering Offices, Consultancy & Design', eyebrowAr: 'قطاع التصميم', eyebrowEn: 'Design sector', descAr: 'مكاتب هندسية للتصميم المعماري والإنشائي وMEP والاعتمادات والإشراف.', descEn: 'Engineering offices for architectural, structural and MEP design, approvals and supervision.', image: '/images/sector-cards/engineering-consultants-design-card.webp', tagsAr: ['تصميم', 'استشارات', 'إشراف'], tagsEn: ['Design', 'Consultancy', 'Supervision'] },
  { slug: 'building-materials', titleAr: 'مواد البناء والمحلات والمتاجر', titleEn: 'Building Materials, Stores & Showrooms', eyebrowAr: 'قطاع التوريد', eyebrowEn: 'Supply sector', descAr: 'مصادر مواد البناء والتشطيب والمتاجر المرتبطة بالمشاريع والمقاولين.', descEn: 'Building and finishing material sources, stores and suppliers connected to projects.', image: '/images/sector-cards/building-materials-stores-card.webp', tagsAr: ['مواد بناء', 'متاجر', 'توريد'], tagsEn: ['Materials', 'Stores', 'Supply'] },
  { slug: 'general-maintenance', titleAr: 'الصيانة والتشطيبات والتكييف والسباكة والكهرباء', titleEn: 'Maintenance, Finishing, AC, Plumbing & Electrical', eyebrowAr: 'قطاع الصيانة', eyebrowEn: 'Maintenance sector', descAr: 'مزودون لأعمال الصيانة العامة والتشطيبات والتكييف والسباكة والكهرباء.', descEn: 'Providers for maintenance, finishing, AC, plumbing, electrical and repair work.', image: '/images/sector-cards/maintenance-finishing-ac-plumbing-electrical-card.webp', tagsAr: ['صيانة', 'تشطيبات', 'MEP'], tagsEn: ['Maintenance', 'Finishing', 'MEP'] },
  { slug: 'aluminium-glass', titleAr: 'ألمنيوم وزجاج وأخشاب', titleEn: 'Aluminium, Glass & Wood Works', eyebrowAr: 'قطاع الواجهات والنجارة', eyebrowEn: 'Facade and carpentry sector', descAr: 'أعمال الألمنيوم والزجاج والأبواب والخزائن والمطابخ والأعمال الخشبية.', descEn: 'Aluminium, glass, doors, wardrobes, kitchens, woodwork and fabrication paths.', image: '/images/sector-cards/aluminium-glass-wood-card.webp', tagsAr: ['ألمنيوم', 'زجاج', 'أخشاب'], tagsEn: ['Aluminium', 'Glass', 'Wood'] },
  { slug: 'cleaning-services', titleAr: 'تنظيف وخدمات وتأجير معدات', titleEn: 'Cleaning, Services & Equipment Rental', eyebrowAr: 'قطاع التشغيل', eyebrowEn: 'Operations sector', descAr: 'خدمات التنظيف وما بعد البناء وتأجير المعدات والسقالات ومعدات المواقع.', descEn: 'Cleaning, post-construction cleaning, equipment rental, scaffolding and site support.', image: '/images/sector-cards/cleaning-equipment-rental-card.webp', tagsAr: ['تنظيف', 'معدات', 'تشغيل'], tagsEn: ['Cleaning', 'Equipment', 'Operations'] },
  { slug: 'building-materials', titleAr: 'مصانع وشركات توريد وورش', titleEn: 'Factories, Supply Companies & Workshops', eyebrowAr: 'قطاع التصنيع والتوريد', eyebrowEn: 'Manufacturing and supply sector', descAr: 'مصانع وورش وشركات توريد تخدم مشاريع البناء والتشطيب والمواد حسب الطلب.', descEn: 'Factories, workshops and supply companies for building, finishing and custom materials.', image: '/images/sector-cards/factories-suppliers-workshops-card.webp', tagsAr: ['مصانع', 'ورش', 'توريد'], tagsEn: ['Factories', 'Workshops', 'Supply'] },
];

const abuDhabiProductCards = [
  { slug: 'building-materials', titleAr: 'مواد البناء والتشييد', titleEn: 'Building & Construction Materials', eyebrowAr: 'منتجات ومتاجر', eyebrowEn: 'Products & stores', descAr: 'الأسمنت والحديد والطابوق والعزل والمواد الأساسية لمشاريع البناء.', descEn: 'Cement, steel, blocks, insulation and essential materials for construction projects.', image: '/images/sector-cards/building-materials-stores-card.webp', tagsAr: ['حديد', 'أسمنت', 'عزل'], tagsEn: ['Steel', 'Cement', 'Insulation'] },
  { slug: 'finishing-works', titleAr: 'التشطيبات والديكور', titleEn: 'Finishing & Décor Products', eyebrowAr: 'منتجات ومتاجر', eyebrowEn: 'Products & stores', descAr: 'الرخام والسيراميك والدهانات والزجاج والألمنيوم ومنتجات التشطيب.', descEn: 'Marble, tiles, paints, glass, aluminium and finishing products.', image: '/images/sector-cards/aluminium-glass-wood-card.webp', tagsAr: ['رخام', 'سيراميك', 'دهانات'], tagsEn: ['Marble', 'Tiles', 'Paints'] },
  { slug: 'furniture-decor', titleAr: 'الأثاث والتجهيزات', titleEn: 'Furniture & Interior Fittings', eyebrowAr: 'منتجات ومتاجر', eyebrowEn: 'Products & stores', descAr: 'الأثاث والمطابخ والنجارة والإضاءة والتجهيزات الداخلية للمشروع.', descEn: 'Furniture, kitchens, carpentry, lighting and interior fittings.', image: '/images/sector-cards/factories-suppliers-workshops-card.webp', tagsAr: ['أثاث', 'مطابخ', 'إضاءة'], tagsEn: ['Furniture', 'Kitchens', 'Lighting'] },
  { slug: 'smart-systems', titleAr: 'المعدات والأنظمة', titleEn: 'Equipment & Smart Systems', eyebrowAr: 'منتجات ومتاجر', eyebrowEn: 'Products & stores', descAr: 'المعدات والأدوات وأنظمة التكييف والكهرباء والسباكة والحلول الذكية.', descEn: 'Equipment, tools, AC, electrical, plumbing and smart-system solutions.', image: '/images/sector-cards/maintenance-finishing-ac-plumbing-electrical-card.webp', tagsAr: ['معدات', 'أنظمة ذكية', 'أدوات'], tagsEn: ['Equipment', 'Smart systems', 'Tools'] },
];

function getText(item, key, locale) { return item[`${key}${locale === 'en' ? 'En' : 'Ar'}`]; }

export default function UaeDirectorySectorCards({ emirate, locale = 'ar' }) {
  const isEn = locale === 'en';
  const isAbuDhabi = emirate.slug === 'abu-dhabi';
  const emirateName = isEn ? emirate.nameEn : emirate.nameAr;
  const cards = isAbuDhabi ? [...directorySectors, ...abuDhabiProductCards] : directorySectors;
  const hrefFor = (slug) => isEn ? `/en/uae/${emirate.slug}/${slug}` : `/uae/${emirate.slug}/${slug}`;
  return (
    <section dir={isEn ? 'ltr' : 'rtl'} id="uae-sector-cards" className="mx-auto max-w-6xl px-4 py-14 md:py-18">
      <div className={isEn ? 'mb-8 text-center md:text-left' : 'mb-8 text-center md:text-right'}>
        <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] shadow-sm">{isAbuDhabi ? (isEn ? '11 services and product sections' : '11 قسمًا للخدمات والمنتجات') : (isEn ? '7 main sectors' : '7 قطاعات رئيسية')}</span>
        <h2 className="mt-4 text-3xl font-black text-[#0F3F1A] md:text-4xl">{isAbuDhabi ? (isEn ? `Explore services and products in ${emirateName}` : `استكشف خدمات ومنتجات ${emirateName}`) : (isEn ? `Choose the sector in ${emirateName}` : `اختر القطاع في ${emirateName}`)}</h2>
        <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:mx-0 md:text-base">{isAbuDhabi ? (isEn ? 'Choose between service sectors, suppliers, stores and product categories across Abu Dhabi and Al Ain.' : 'اختر بين قطاعات الخدمات والمزودين والموردين والمتاجر وفئات المنتجات داخل أبوظبي والعين.') : (isEn ? 'Choose the closest sector to your request. Related areas and additional services are organized below.' : 'اختر القطاع الأقرب إلى طلبك، وستجد المناطق والخدمات الإضافية منظمة أسفل الصفحة.')}</p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => {
          const title = getText(card, 'title', locale);
          const eyebrow = getText(card, 'eyebrow', locale);
          const desc = getText(card, 'desc', locale);
          const tags = card[isEn ? 'tagsEn' : 'tagsAr'];
          return <article key={`${card.slug}-${index}`} className="group overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_18px_45px_rgba(18,58,70,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(18,58,70,0.15)]">
            <div className="relative h-48 overflow-hidden bg-[#F5EFE4] sm:h-52"><Image src={card.image} alt={title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" /><div className="absolute bottom-4 right-4 left-4 flex items-center justify-between gap-3"><span className="rounded-full border border-[#D4AF37]/45 bg-white/90 px-3 py-1.5 text-[11px] font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl">{eyebrow}</span>{!isAbuDhabi && <Sparkles className="h-5 w-5 text-[#F7E7A0] drop-shadow" />}</div></div>
            <div className="p-5 md:p-6"><h3 className="text-xl font-black leading-8 text-[#0F3F1A]">{title}</h3><p className="mt-3 min-h-[76px] text-sm font-semibold leading-7 text-gray-600">{desc}</p><div className="mt-4 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-full bg-[#FDF7E8] px-3 py-1 text-[11px] font-black text-[#8A6A00]">{tag}</span>)}</div><Link href={hrefFor(card.slug)} aria-label={`${isEn ? 'Open' : 'فتح'} ${title}`} className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-[#D8C59F] bg-[#FFF9EC] px-5 py-3 text-sm font-black text-[#0F3F1A] transition hover:border-[#D4AF37] hover:bg-[#F4D47A] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D4AF37]/35">{isEn ? 'Open section' : 'افتح القسم'}<ChevronLeft aria-hidden="true" className="h-4 w-4" /></Link></div>
          </article>;
        })}
      </div>
    </section>
  );
}
