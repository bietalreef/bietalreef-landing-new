import Head from 'next/head';
import EnglishLayout from '../../components/EnglishLayout';

const SITE_URL = 'https://bietalreef.ae';

export default function EnglishWeyaakPage() {
  const title = 'Weyaak Smart Assistant | Biet Al Reef';
  const description = 'Chat directly with Weyaak to find published providers and services or organize your request in the UAE.';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={`${SITE_URL}/en/weyaak`} />
        <link rel="alternate" hrefLang="ar-AE" href={`${SITE_URL}/weyaak`} />
        <link rel="alternate" hrefLang="en-AE" href={`${SITE_URL}/en/weyaak`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/en/weyaak`} />
        <meta property="og:image" content={`${SITE_URL}/og-weyaak.jpg`} />
      </Head>
      <EnglishLayout>
        <main className="min-h-[calc(100dvh-70px)] bg-[#F8F3E7]" aria-label="Weyaak chat interface">
          <h1 className="sr-only">Chat with Weyaak, Biet Al Reef smart assistant</h1>
        </main>
      </EnglishLayout>
    </>
  );
}
