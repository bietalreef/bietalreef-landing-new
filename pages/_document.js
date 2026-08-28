import Document, { Html, Head, Main, NextScript } from 'next/document';

const GOOGLE_VERIFICATION = 'HIY1XgYFRFCLwaTob54Dtx0InJae_SFmyX1bNslZDRg';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://bietalreef.ae/#organization',
  name: 'بيت الريف',
  alternateName: ['منصة بيت الريف', 'Biet Al Reef', 'Biet Alreef Platform'],
  legalName: 'مؤسسة بيت الريف للمقاولات العامة',
  url: 'https://bietalreef.ae',
  logo: { '@type': 'ImageObject', url: 'https://bietalreef.ae/logo.png' },
  description: 'بيت الريف منصة رقمية إماراتية متخصصة في قطاع البناء والمقاولات والتشطيبات، تربط العملاء بمزودي الخدمات والمقاولين والموردين وتوفر مسارات لاكتشاف الخدمات والمنتجات.',
  areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
  knowsLanguage: ['ar-AE', 'en-AE'],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+971567856001',
    contactType: 'customer support',
    areaServed: 'AE',
    availableLanguage: ['Arabic', 'English'],
  },
  sameAs: [
    'https://www.instagram.com/bietalreef',
    'https://www.facebook.com/share/14fy6hGM7SJ/',
    'https://youtube.com/@bietalreef',
    'https://www.tiktok.com/@bietalreef0',
    'https://www.linkedin.com/in/bietalreef',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://bietalreef.ae/#website',
  url: 'https://bietalreef.ae',
  name: 'بيت الريف',
  alternateName: ['منصة بيت الريف', 'Biet Al Reef', 'Biet Alreef Platform'],
  inLanguage: ['ar-AE', 'en-AE'],
  publisher: { '@id': 'https://bietalreef.ae/#organization' },
};

export default class BietAlReefDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const pathname = ctx.pathname || '';
    const isEnglish = pathname === '/en' || pathname.startsWith('/en/');
    return { ...initialProps, documentLanguage: isEnglish ? 'en' : 'ar' };
  }

  render() {
    const isEnglish = this.props.documentLanguage === 'en';
    return (
      <Html lang={isEnglish ? 'en-AE' : 'ar-AE'} dir={isEnglish ? 'ltr' : 'rtl'}>
        <Head>
          <link rel="icon" href="/icons/favicon-48.png" sizes="48x48" type="image/png" />
          <link rel="shortcut icon" href="/icons/favicon-48.png" type="image/png" />
          <link rel="manifest" href="/manifest.webmanifest" />
          <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" sizes="180x180" />
          <meta name="google-site-verification" content={GOOGLE_VERIFICATION} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content={isEnglish ? 'Biet Al Reef' : 'بيت الريف'} />
          <meta name="application-name" content={isEnglish ? 'Biet Al Reef' : 'بيت الريف'} />
          <meta name="theme-color" content="#0F3F1A" />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c') }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema).replace(/</g, '\\u003c') }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}