import Head from 'next/head';
import EnglishLayout from '../../components/EnglishLayout';
import { Bot, Download, Globe2 } from 'lucide-react';
import { GOOGLE_PLAY_URL, PROVIDERS_APP_URL } from '../../lib/platformUrls';

const SITE_URL = 'https://bietalreef.ae';

export default function EnglishWeyaakPage() {
  const title = 'Weyaak Smart Assistant | Biet Al Reef';
  const description = 'Download the Biet Al Reef app and use Weyaak to manage business tasks, find services and organise requests in the UAE.';

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
        <main className="min-h-[calc(100dvh-70px)] bg-[#F8F3E7] px-4 py-16 md:py-24" aria-label="Download Biet Al Reef and use Weyaak">
          <section className="mx-auto max-w-5xl rounded-[2.5rem] border border-[#D9C89F] bg-white p-8 text-center shadow-xl md:p-14">
            <Bot className="mx-auto h-14 w-14 text-[#0F3F1A]" />
            <p className="mt-5 font-black text-[#8A6A00]">Weyaak inside Biet Al Reef</p>
            <h1 className="mt-3 text-4xl font-black text-[#0F3F1A] md:text-6xl">Download the app and talk to Weyaak</h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-9 text-gray-600">Weyaak works inside your account and business context. Download the Android app for the complete experience, or open the browser version to continue from your computer.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-7 font-black text-[#0F3F1A]"><Download className="h-5 w-5" />Download Biet Al Reef</a>
              <a href={PROVIDERS_APP_URL} className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-7 font-black text-white"><Globe2 className="h-5 w-5" />Open the web app</a>
            </div>
          </section>
        </main>
      </EnglishLayout>
    </>
  );
}
