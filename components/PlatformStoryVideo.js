import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { ExternalLink, Play, Youtube } from 'lucide-react';

const videos = {
  ar: {
    id: 'WNYSsxsm1Ug',
    language: 'ar-AE',
    eyebrow: 'فيديو بيت الريف',
    heading: 'كلمة تلهم البناء والمسؤولية',
    title: 'شركة بيت الريف للمقاولات والصيانة العامة',
    description:
      'يبدأ الفيديو برسالة للشيخ زايد، طيب الله ثراه، تؤكد أن التنمية والبناء مسؤولية تتكامل فيها الجهود، ثم يعرّف بالتزام بيت الريف في أعمال المقاولات والصيانة العامة.',
    privacy: 'لن يتصل متصفحك بيوتيوب قبل الضغط على زر التشغيل.',
    play: 'تشغيل فيديو بيت الريف',
    watch: 'المشاهدة على يوتيوب',
    channel: 'قناة بيت الريف',
    uploadDate: '2023-04-15T20:28:53-07:00',
    duration: 'PT1M14S',
  },
  en: {
    id: 'ikJuHNzH3nc',
    language: 'en-AE',
    eyebrow: 'Biet Al Reef video',
    heading: 'Building with purpose and responsibility',
    title: 'Beit Al Reef, Smart Solutions to your CONSTRUCTION',
    description:
      'Discover how Biet Al Reef approaches construction, maintenance and smart project solutions with a clear commitment to quality and responsible development.',
    privacy: 'Your browser will not connect to YouTube until you press play.',
    play: 'Play the Biet Al Reef video',
    watch: 'Watch on YouTube',
    channel: 'Biet Al Reef channel',
    uploadDate: '2023-03-26T22:13:37-07:00',
    duration: 'PT1M4S',
  },
};

export default function PlatformStoryVideo({ locale = 'ar' }) {
  const language = locale === 'en' ? 'en' : 'ar';
  const video = videos[language];
  const [isLoaded, setIsLoaded] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`;
  const channelUrl = 'https://www.youtube.com/@bietalreef';
  const thumbnailUrl = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${video.id}?rel=0&playsinline=1`;
  const isArabic = language === 'ar';

  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `https://bietalreef.ae/${language === 'en' ? 'en#' : '#'}platform-story-video`,
    name: video.title,
    description: video.description,
    thumbnailUrl: [thumbnailUrl],
    uploadDate: video.uploadDate,
    duration: video.duration,
    embedUrl,
    contentUrl: watchUrl,
    inLanguage: video.language,
    publisher: { '@id': 'https://bietalreef.ae/#organization' },
    isFamilyFriendly: true,
  };

  return (
    <>
      <Head>
        <script
          key={`platform-story-video-${language}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema).replace(/</g, '\\u003c') }}
        />
      </Head>

      <section
        data-analytics-section="platform-story-video"
        dir={isArabic ? 'rtl' : 'ltr'}
        aria-labelledby={`platform-story-video-title-${language}`}
        className="bg-white py-10 md:py-16"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-7 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div className={isArabic ? 'text-right' : 'text-left'}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#FFF9E8] px-4 py-2 text-xs font-black text-[#806000]">
              <Youtube className="h-4 w-4" aria-hidden="true" />
              {video.eyebrow}
            </span>
            <h2
              id={`platform-story-video-title-${language}`}
              className="mt-4 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl"
            >
              {video.heading}
            </h2>
            <h3 className="mt-4 text-lg font-black leading-8 text-[#6F5400] md:text-xl">{video.title}</h3>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-9 text-gray-600">{video.description}</p>
            <p className="mt-3 text-xs font-semibold leading-6 text-gray-500">{video.privacy}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-event="cta_click"
                data-analytics-action="youtube_watch"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-6 py-3 text-sm font-black text-white transition hover:bg-[#174A27] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D4AF37]/35"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                {video.watch}
              </a>
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-event="cta_click"
                data-analytics-action="youtube_channel"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[#D8C59F] bg-white px-6 py-3 text-sm font-black text-[#0F3F1A] transition hover:border-[#D4AF37] hover:bg-[#FFF9E8] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D4AF37]/35"
              >
                <Youtube className="h-4 w-4" aria-hidden="true" />
                {video.channel}
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-[#071C15] shadow-[0_22px_60px_rgba(15,63,26,0.18)]">
            <div className="relative aspect-video">
              {isLoaded ? (
                <iframe
                  src={embedUrl}
                  title={video.title}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsLoaded(true)}
                  data-analytics-event="cta_click"
                  data-analytics-action="youtube_embed_load"
                  aria-label={video.play}
                  className="group absolute inset-0 h-full w-full overflow-hidden text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#D4AF37]"
                >
                  <Image
                    src={thumbnailUrl}
                    alt=""
                    fill
                    loading="lazy"
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/50 bg-[#D4AF37] text-[#102F18] shadow-2xl transition group-hover:scale-105">
                      <Play className="ml-1 h-9 w-9 fill-current" aria-hidden="true" />
                    </span>
                    <span className="max-w-lg text-center text-base font-black leading-7 drop-shadow md:text-xl">{video.play}</span>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
