import Head from 'next/head';

const SITE_URL = 'https://bietalreef.ae';

const PAGE_META = {
  'platform-for-business': {
    ar: {
      title: 'كيف تعمل منصة بيت الريف للأعمال | بيت الريف',
      description: 'مسار عملي للشركات ومزودي الخدمات لتنظيم ملف النشاط وإدارة ما ينشرونه واستخدام أدوات بيت الريف من المكتب أو موقع العمل.',
    },
    en: {
      title: 'How Biet Al Reef Works for Business | Biet Al Reef',
      description: 'A practical path for companies and service providers to organise their business profile, manage publishing and use Biet Al Reef from the office or on site.',
    },
    image: '/bait-alreef-ecosystem-overview.webp',
  },
  'join-provider': {
    ar: {
      title: 'انضم كمزود خدمة إلى بيت الريف | بيت الريف',
      description: 'أنشئ حضورًا مهنيًا لنشاطك واستكمل بيانات الشركة والتخصصات ومناطق الخدمة ومرحلة التحقق قبل النشر العام.',
    },
    en: {
      title: 'Join Biet Al Reef as a Service Provider | Biet Al Reef',
      description: 'Build a professional business presence, complete company details, specialties and service areas, and move through verification before public publishing.',
    },
    image: '/bait-alreef-benefits-platform.webp',
  },
  'business-solutions': {
    ar: {
      title: 'حلول وخدمات بيت الريف للأعمال | بيت الريف',
      description: 'حلول أعمال رقمية تشمل حضور الشركة والمتجر والنشر وخدمات Google والذكاء الاصطناعي وياك ضمن مسارات بيت الريف للأعمال.',
    },
    en: {
      title: 'Biet Al Reef Business Solutions | Biet Al Reef',
      description: 'Digital business solutions covering company presence, stores, publishing, Google services and Weyaak AI through Biet Al Reef business paths.',
    },
    image: '/bait-alreef-core-system.webp',
  },
  'start-your-store': {
    ar: {
      title: 'أنشئ متجرك على بيت الريف | بيت الريف',
      description: 'فعّل حساب شركتك ونظّم منتجاتك وخدماتك وعروضك ومعلومات وسياسات متجرك داخل منظومة بيت الريف.',
    },
    en: {
      title: 'Start Your Store on Biet Al Reef | Biet Al Reef',
      description: 'Activate your company account and organise products, services, offers and store information within the Biet Al Reef ecosystem.',
    },
    image: '/bait-alreef-ecommerce-optimization.webp',
  },
  'business-plans': {
    ar: {
      title: 'خطط الأعمال والاشتراكات | بيت الريف',
      description: 'تعرّف على خطط الأعمال ومزايا الاشتراك والصلاحيات المتاحة للشركات ومزودي الخدمات قبل تفعيل حساب بيت الريف.',
    },
    en: {
      title: 'Business Plans & Subscriptions | Biet Al Reef',
      description: 'Explore business plans, subscription benefits and permissions available to companies and service providers before activating Biet Al Reef.',
    },
    image: '/bait-alreef-benefits-platform.webp',
  },
  'partner-with-biet-alreef': {
    ar: {
      title: 'الشراكة مع بيت الريف | بيت الريف',
      description: 'مسار للشراكات التجارية والتقنية التي تضيف قيمة عملية لمنصة بيت الريف وشركاتها ومزودي الخدمات والعملاء.',
    },
    en: {
      title: 'Partner with Biet Al Reef | Biet Al Reef',
      description: 'A route for commercial and technology partnerships that add practical value to Biet Al Reef, its companies, providers and customers.',
    },
    image: '/bait-alreef-ecosystem-overview.webp',
  },
  'join-biet-alreef': {
    ar: {
      title: 'ضم شركتك إلى بيت الريف | بيت الريف',
      description: 'ابدأ بحساب شركتك واستكمل الهوية والنشاط والتخصصات ومناطق الخدمة ثم استخدم أدوات بيت الريف وفق حالة الحساب والخطة.',
    },
    en: {
      title: 'Bring Your Company to Biet Al Reef | Biet Al Reef',
      description: 'Start with your company account, complete business identity, activity, specialties and service areas, then use Biet Al Reef according to account status and plan.',
    },
    image: '/bait-alreef-future-construction-uae.webp',
  },
  'google-cloud-biet-alreef': {
    ar: {
      title: 'Google Cloud مع بيت الريف | بيت الريف',
      description: 'حلول Google Cloud للأعمال تشمل التطبيقات والبيانات والذكاء الاصطناعي وMaps والأتمتة والتكاملات وفق احتياجات كل شركة.',
    },
    en: {
      title: 'Google Cloud with Biet Al Reef | Biet Al Reef',
      description: 'Google Cloud business solutions covering applications, data, AI, Maps, automation and integrations according to each company’s needs.',
    },
    image: '/bait-alreef-ai-tools.webp',
  },
  'google-workspace-biet-alreef': {
    ar: {
      title: 'Google Workspace مع بيت الريف | بيت الريف',
      description: 'نظّم بريد شركتك وملفاتها واجتماعاتها وتقويمها وإدارة المستخدمين عبر بيئة Google Workspace للأعمال مع بيت الريف.',
    },
    en: {
      title: 'Google Workspace with Biet Al Reef | Biet Al Reef',
      description: 'Organise company email, files, meetings, calendars and user administration through a professional Google Workspace business environment with Biet Al Reef.',
    },
    image: '/bait-alreef-core-system.webp',
  },
  'weyaak-ai': {
    ar: {
      title: 'وياك – الذكاء الاصطناعي من بيت الريف | بيت الريف',
      description: 'وياك مساعد أعمال ذكي داخل منظومة بيت الريف يساعد الشركات على فهم معلوماتها وتنظيم المحتوى والعمل والمسارات المرتبطة بالحساب.',
    },
    en: {
      title: 'Weyaak – AI from Biet Al Reef | Biet Al Reef',
      description: 'Weyaak is an intelligent business assistant inside Biet Al Reef that helps companies understand their information and organise work, content and account-related paths.',
    },
    image: '/bait-alreef-ai-tools.webp',
  },
  'suppliers-biet-alreef': {
    ar: {
      title: 'الموردون مع بيت الريف | بيت الريف',
      description: 'مسار أعمال للموردين لعرض المنتجات والخدمات وربط النشاط بالسوق والمشاريع والعملاء داخل دولة الإمارات.',
    },
    en: {
      title: 'Suppliers with Biet Al Reef | Biet Al Reef',
      description: 'A business route for suppliers to present products and services and connect their activity with the marketplace, projects and customers in the UAE.',
    },
    image: '/bait-alreef-construction-catalog.webp',
  },
  'factories-workshops-biet-alreef': {
    ar: {
      title: 'المصانع والورش مع بيت الريف | بيت الريف',
      description: 'صفحة أعمال للمصانع والورش لعرض القدرات والمنتجات والخدمات وربطها بمسارات السوق والمشاريع في بيت الريف.',
    },
    en: {
      title: 'Factories & Workshops with Biet Al Reef | Biet Al Reef',
      description: 'A business page for factories and workshops to present capabilities, products and services and connect them with Biet Al Reef marketplace and project paths.',
    },
    image: '/bait-alreef-construction-catalog.webp',
  },
  'refund-policy': {
    ar: {
      title: 'سياسة الاسترداد | بيت الريف',
      description: 'تعرّف على سياسة استرداد رسوم اشتراكات بيت الريف والمدة والشروط والاستثناءات المعلنة قبل الاشتراك.',
    },
    en: {
      title: 'Refund Policy | Biet Al Reef',
      description: 'Review the Biet Al Reef subscription refund policy, applicable period, conditions and published exclusions before subscribing.',
    },
    image: '/bait-alreef-benefits-platform.webp',
  },
};

function normalizePath(path) {
  if (!path) return '/';
  const clean = String(path).split(/[?#]/)[0];
  return clean.length > 1 ? clean.replace(/\/$/, '') : clean;
}

export function resolveBusinessLandingPath({ currentPath, pathname, pageProps }) {
  const clean = normalizePath(currentPath);
  const cleanSlug = clean.replace(/^\/en\//, '').replace(/^\//, '');
  if (PAGE_META[cleanSlug]) return clean;

  const slug = pageProps?.slug || pageProps?.page?.slug;
  if (!slug || !PAGE_META[slug]) return clean;
  if (pathname === '/en/[slug]' || pageProps?.businessPage) return `/en/${slug}`;
  if (pathname === '/[slug]') return `/${slug}`;
  return clean;
}

export default function BusinessLandingMeta({ path }) {
  const cleanPath = normalizePath(path);
  const isEnglish = cleanPath.startsWith('/en/');
  const slug = cleanPath.replace(/^\/en\//, '').replace(/^\//, '');
  const page = PAGE_META[slug];
  if (!page) return null;

  const language = isEnglish ? 'en' : 'ar';
  const meta = page[language];
  const arPath = `/${slug}`;
  const enPath = `/en/${slug}`;
  const canonical = `${SITE_URL}${cleanPath}`;
  const arUrl = `${SITE_URL}${arPath}`;
  const enUrl = `${SITE_URL}${enPath}`;
  const imageUrl = `${SITE_URL}${page.image}`;
  const locale = isEnglish ? 'en_AE' : 'ar_AE';
  const alternateLocale = isEnglish ? 'ar_AE' : 'en_AE';

  return (
    <Head>
      <title key={`business-title-${language}`}>{meta.title}</title>
      <meta key={`business-description-${language}`} name="description" content={meta.description} />
      <meta key="business-robots" name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link key="business-canonical" rel="canonical" href={canonical} />
      <link key="business-hreflang-ar" rel="alternate" hrefLang="ar-AE" href={arUrl} />
      <link key="business-hreflang-en" rel="alternate" hrefLang="en-AE" href={enUrl} />
      <link key="business-hreflang-default" rel="alternate" hrefLang="x-default" href={arUrl} />

      <meta key="business-og-type" property="og:type" content="website" />
      <meta key="business-og-url" property="og:url" content={canonical} />
      <meta key="business-og-title" property="og:title" content={meta.title} />
      <meta key="business-og-description" property="og:description" content={meta.description} />
      <meta key="business-og-image" property="og:image" content={imageUrl} />
      <meta key="business-og-image-secure" property="og:image:secure_url" content={imageUrl} />
      <meta key="business-og-image-alt" property="og:image:alt" content={meta.title} />
      <meta key="business-og-locale" property="og:locale" content={locale} />
      <meta key="business-og-locale-alt" property="og:locale:alternate" content={alternateLocale} />
      <meta key="business-og-site" property="og:site_name" content={isEnglish ? 'Biet Al Reef' : 'بيت الريف'} />

      <meta key="business-twitter-card" name="twitter:card" content="summary_large_image" />
      <meta key="business-twitter-title" name="twitter:title" content={meta.title} />
      <meta key="business-twitter-description" name="twitter:description" content={meta.description} />
      <meta key="business-twitter-image" name="twitter:image" content={imageUrl} />
      <meta key="business-twitter-image-alt" name="twitter:image:alt" content={meta.title} />

      <script
        key="business-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${canonical}#webpage`,
            url: canonical,
            name: meta.title,
            headline: meta.title,
            description: meta.description,
            inLanguage: isEnglish ? 'en-AE' : 'ar-AE',
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': `${SITE_URL}/#organization` },
            primaryImageOfPage: {
              '@type': 'ImageObject',
              url: imageUrl,
            },
          }).replace(/</g, '\\u003c'),
        }}
      />
    </Head>
  );
}

export { PAGE_META };
