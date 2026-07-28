import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BadgeCheck, MapPin, MessageCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import EnglishLayout from './EnglishLayout';
import SecondaryHeader from './SecondaryHeader';
import UaeDirectoryHero from './UaeDirectoryHero';
import UaeDirectoryWeyaakCard from './UaeDirectoryWeyaakCard';
import UaeSmartFooter from './UaeSmartFooter';

function itemsForCard(card) {
  if (card.sectionKey === 'services_offers') return card.activity.services;
  if (card.sectionKey === 'products_stores') return card.activity.categories;
  return card.activity.specialties;
}

function pageCopy(card, locale, area, emirate) {
  const isEn = locale === 'en';
  const location = area
    ? (isEn ? area.nameEn : area.nameAr)
    : (isEn ? emirate.nameEn : emirate.nameAr);
  const type = card.sectionKey;
  if (isEn) {
    const title = type === 'providers'
      ? card.activity.slug === 'construction-contracting'
        ? `Best verified general construction contractors in ${location}`
        : `Best verified ${card.activity.name.toLowerCase()} providers in ${location}`
      : `${card.title} in ${location}`;
    return {
      location,
      title,
      description: `Explore ${card.activity.name.toLowerCase()} in ${location} through Biet Al Reef. Compare the related ${type === 'providers' ? 'specialties and verified providers' : type === 'services_offers' ? 'services and offers' : 'product categories, stores and suppliers'}, then ask Weyaak for the right next step.`,
      coverageTitle: `${card.activity.name} categories in ${location}`,
      coverageText: `This search-focused page organizes every category shown on the directory card before you opened it, while preserving a clear route back to ${location} and its related areas.`,
      back: `Back to ${location}`,
    };
  }
  const title = type === 'providers'
    ? card.activity.slug === 'construction-contracting'
      ? `أفضل المقاولين الموثقين في المقاولات والإنشاءات العامة في ${location}`
      : `أفضل مزودي ${card.activity.name} الموثقين في ${location}`
    : `${card.title} في ${location}`;
  return {
    location,
    title,
    description: `استكشف ${card.activity.name} في ${location} عبر بيت الريف، وقارن ${type === 'providers' ? 'التخصصات ومزودي الخدمة الموثقين' : type === 'services_offers' ? 'الخدمات والعروض المتاحة' : 'فئات المنتجات والمتاجر والموردين'}، ثم اطلب من وياك توجيهك إلى الخطوة المناسبة.`,
    coverageTitle: `أقسام ${card.activity.name} في ${location}`,
    coverageText: `تنظم هذه الصفحة الموجهة لمحركات البحث جميع الأقسام التي ظهرت على بطاقة الدليل قبل فتحها، مع الحفاظ على مسار واضح للعودة إلى ${location} ومناطقها.`,
    back: `العودة إلى ${location}`,
  };
}

function DirectoryEntityCard({ entity, locale }) {
  const isEn = locale === 'en';
  const Arrow = isEn ? ArrowRight : ArrowLeft;
  const typeLabel = entity.entityType === 'provider'
    ? (isEn ? 'Verified provider' : 'مزود خدمة')
    : entity.entityType === 'service'
      ? (isEn ? 'Published service' : 'خدمة منشورة')
      : (isEn ? 'Published product' : 'منتج منشور');
  return (
    <article data-directory-entity={entity.entityType} className="group overflow-hidden rounded-[2rem] border border-[#DCC895] bg-white shadow-[0_10px_0_#E7DAC0,0_22px_45px_rgba(18,58,70,.12)] transition hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden bg-[#F3EEE4]">
        {entity.image ? <Image src={entity.image} alt={entity.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 92vw, 420px" /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className={`absolute bottom-4 rounded-full border border-white/50 bg-white/92 px-3 py-1.5 text-xs font-black text-[#0F3F1A] shadow-lg ${isEn ? 'left-4' : 'right-4'}`}>{typeLabel}</span>
      </div>
      <div className={`relative p-5 ${isEn ? 'text-left' : 'text-right'}`}>
        {entity.logo && entity.entityType === 'provider' ? (
          <span className={`absolute -top-11 flex h-[82px] w-[82px] items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white shadow-xl ${isEn ? 'right-5' : 'left-5'}`}>
            <Image src={entity.logo} alt={isEn ? `${entity.providerName} logo` : `شعار ${entity.providerName}`} fill className="object-contain p-1" sizes="82px" />
          </span>
        ) : null}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-black leading-8 text-[#0F3F1A]">{entity.name}</h3>
            {entity.entityType !== 'provider' ? <p className="mt-1 text-xs font-black text-[#8A611B]">{entity.providerName}</p> : null}
          </div>
          {entity.verified ? <BadgeCheck className="h-6 w-6 shrink-0 text-[#B8860B]" aria-label={isEn ? 'Verified' : 'موثق'} /> : null}
        </div>
        <p className="mt-3 line-clamp-3 min-h-[72px] text-sm font-semibold leading-7 text-gray-600">{entity.description}</p>
        {entity.location ? <p className="mt-3 flex items-center gap-2 text-xs font-bold text-[#6B5530]"><MapPin className="h-4 w-4" />{entity.location}</p> : null}
        {entity.code ? <p dir="ltr" className="mt-3 rounded-xl bg-[#F8F4EB] px-3 py-2 font-mono text-xs font-black text-[#0F3F1A]">{entity.code}</p> : null}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link href={entity.href} className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#0F3F1A] px-3 text-sm font-black text-white">
            {isEn ? 'Open details' : 'فتح التفاصيل'}<Arrow className="h-4 w-4" />
          </Link>
          {entity.whatsapp ? (
            <a href={entity.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#DCCBAE] px-3 text-sm font-black text-[#0F3F1A]">
              <MessageCircle className="h-4 w-4" />{isEn ? 'Contact' : 'تواصل'}
            </a>
          ) : (
            <Link href={isEn ? '/en/weyaak' : '/weyaak'} className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-[#DCCBAE] px-3 text-sm font-black text-[#0F3F1A]">{isEn ? 'Ask Weyaak' : 'اسأل وياك'}</Link>
          )}
        </div>
      </div>
    </article>
  );
}

function LandingContent({
  card,
  entities = [],
  directoryCards = [],
  locale,
  area,
  emirate,
  path,
  alternatePath,
}) {
  const isEn = locale === 'en';
  const copy = pageCopy(card, locale, area, emirate);
  const items = itemsForCard(card);
  const canonical = `https://bietalreef.ae${path}`;
  const image = card.image.startsWith('http') ? card.image : `https://bietalreef.ae${card.image}`;
  const hubPath = `${isEn ? '/en' : ''}/uae/${emirate.slug}${area ? `/${area.slug}` : ''}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isEn ? 'UAE Directory' : 'دليل الإمارات', item: `https://bietalreef.ae${isEn ? '/en' : ''}/uae` },
          { '@type': 'ListItem', position: 2, name: isEn ? emirate.nameEn : emirate.nameAr, item: `https://bietalreef.ae${isEn ? '/en' : ''}/uae/${emirate.slug}` },
          ...(area ? [{ '@type': 'ListItem', position: 3, name: copy.location, item: `https://bietalreef.ae${hubPath}` }] : []),
          { '@type': 'ListItem', position: area ? 4 : 3, name: copy.title, item: canonical },
        ],
      },
      {
        '@type': 'ItemList',
        name: copy.coverageTitle,
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          url: `${canonical}#${item.slug}`,
        })),
      },
    ],
  };

  const body = (
    <>
      <SecondaryHeader locale={locale} backUrl={hubPath} backLabel={copy.back} />
      <main className="bg-[#FDFBF7]">
        <UaeDirectoryHero locale={locale} title={copy.title} description={copy.description} emirate={emirate} area={area} image={card.image} cleanNavigation />

        <section dir={isEn ? 'ltr' : 'rtl'} className="mx-auto max-w-6xl px-4 py-10">
          <div className={`rounded-[2rem] border border-[#E4D6BA] bg-white p-6 shadow-[0_18px_50px_rgba(18,58,70,.08)] md:p-9 ${isEn ? 'text-left' : 'text-right'}`}>
            <span className="inline-flex rounded-full bg-[#F7EDCE] px-4 py-2 text-xs font-black text-[#765A00]">
              {isEn ? 'Search guide for customers and AI answers' : 'دليل بحث للعملاء ومحركات الإجابة'}
            </span>
            <h2 className="mt-4 text-2xl font-black text-[#0F3F1A] md:text-3xl">{copy.coverageTitle}</h2>
            <p className="mt-3 max-w-4xl text-sm font-semibold leading-8 text-gray-600 md:text-base">{copy.coverageText}</p>
          </div>
        </section>

        <UaeDirectoryWeyaakCard
          locale={locale}
          title={isEn ? `Weyaak for ${card.activity.name} in ${copy.location}` : `وياك في ${card.activity.name} داخل ${copy.location}`}
          description={isEn ? 'Describe your project, location and budget. Weyaak will help you choose the suitable category and prepare a clear request.' : 'اكتب احتياج مشروعك وموقعه وميزانيته، وسيساعدك وياك في اختيار القسم المناسب وتجهيز طلب واضح.'}
        />

        <section dir={isEn ? 'ltr' : 'rtl'} className="mx-auto max-w-6xl px-4 py-12">
          <div className={`mb-7 ${isEn ? 'text-left' : 'text-right'}`}>
            <span className="inline-flex rounded-full border border-[#DCCAA7] bg-[#FFF9EC] px-4 py-1.5 text-xs font-black text-[#8A611B]">{isEn ? 'Published results from Biet Al Reef database' : 'نتائج منشورة من قاعدة بيانات بيت الريف'}</span>
            <h2 className="mt-4 text-3xl font-black text-[#0F3F1A]">
              {isEn
                ? `${card.title} available in ${copy.location}`
                : `${card.title} المتاحة في ${copy.location}`}
            </h2>
          </div>
          {entities.length ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {entities.map((entity) => <DirectoryEntityCard key={`${entity.entityType}-${entity.id}`} entity={entity} locale={locale} />)}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-[#D7C7A7] bg-white p-8 text-center">
              <p className="text-sm font-bold leading-7 text-gray-600">{isEn ? 'No published card currently matches this activity and location. Approved providers and content will appear here automatically.' : 'لا توجد بطاقة منشورة حاليًا تطابق هذا النشاط والموقع. سيظهر المزود أو المحتوى هنا تلقائيًا بعد اعتماده من لوحة الإدارة.'}</p>
            </div>
          )}
        </section>

        <section dir={isEn ? 'ltr' : 'rtl'} className="mx-auto max-w-6xl px-4 py-12">
          <div className={`mb-7 ${isEn ? 'text-left' : 'text-right'}`}>
            <h2 className="text-3xl font-black text-[#0F3F1A]">{copy.coverageTitle}</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-gray-600">{card.description}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article id={item.slug} key={item.slug} className="group flex min-h-[150px] items-center gap-4 rounded-[1.6rem] border border-[#DCC895] bg-gradient-to-br from-white to-[#FFF7E3] p-5 shadow-[0_8px_0_#E7DAC0,0_18px_35px_rgba(18,58,70,.09)] transition hover:-translate-y-1">
                <span className="relative h-14 w-14 shrink-0">
                  <Image src={card.sectionKey === 'products_stores' ? '/images/ui-icons-3d/products-box.webp' : card.sectionKey === 'services_offers' ? '/images/ui-icons-3d/tools-maintenance.webp' : '/images/ui-icons-3d/provider-worker.webp'} alt="" fill className="object-contain" sizes="56px" />
                </span>
                <div className={isEn ? 'text-left' : 'text-right'}>
                  <h3 className="text-base font-black leading-7 text-[#0F3F1A]">{item.name}</h3>
                  <p className="mt-1 text-xs font-semibold leading-6 text-gray-600">{isEn ? `Explore this category in ${copy.location}.` : `استكشف هذا القسم داخل ${copy.location}.`}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <UaeSmartFooter locale={locale} pageType="area" emirate={emirate} area={area} directoryCards={directoryCards} />
      </main>
    </>
  );

  return (
    <>
      <Head>
        <title>{copy.title} | {isEn ? 'Biet Al Reef' : 'بيت الريف'}</title>
        <meta name="description" content={copy.description} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang={isEn ? 'en-AE' : 'ar-AE'} href={canonical} />
        <link rel="alternate" hrefLang={isEn ? 'ar-AE' : 'en-AE'} href={`https://bietalreef.ae${alternatePath}`} />
        <meta property="og:title" content={copy.title} />
        <meta property="og:description" content={copy.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={copy.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      {isEn ? (
        <EnglishLayout>{body}</EnglishLayout>
      ) : (
        <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
          <Navbar pageTitle={copy.title} />
          {body}
          <Footer showRequestCTA={false} />
        </div>
      )}
    </>
  );
}

export default function AbuDhabiDirectoryLanding(props) {
  return <LandingContent {...props} />;
}
