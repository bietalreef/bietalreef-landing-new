import Head from 'next/head';
import { UAE_ATLAS_IMAGES } from '../data/uaeAtlasImages';
import { getSectorCardImage } from '../lib/sectorCards';

const imageByEmirate = Object.fromEntries(UAE_ATLAS_IMAGES.emirates.map((item) => [item.slug, item.image]));

export default function UaeDirectorySeo({ locale = 'ar', title, description, path, alternatePath, emirate, service, image }) {
  const isEn = locale === 'en';
  const canonical = `https://bietalreef.ae${path}`;
  const alternate = `https://bietalreef.ae${alternatePath}`;
  const imagePath = image || (service ? getSectorCardImage(service.slug) : imageByEmirate[emirate.slug]) || UAE_ATLAS_IMAGES.heroDesktop;
  const shareImage = `https://bietalreef.ae${imagePath}`;
  const imageWidth = service ? 1536 : 1600;
  const imageHeight = service ? 864 : 1000;
  const fullTitle = `${title} | ${isEn ? 'Biet Al Reef' : 'بيت الريف'}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="ar-AE" href={isEn ? alternate : canonical} />
      <link rel="alternate" hrefLang="en-AE" href={isEn ? canonical : alternate} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={isEn ? 'Biet Al Reef' : 'بيت الريف'} />
      <meta property="og:locale" content={isEn ? 'en_AE' : 'ar_AE'} />
      <meta property="og:image" content={shareImage} />
      <meta property="og:image:secure_url" content={shareImage} />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      <meta property="og:image:alt" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={shareImage} />
    </Head>
  );
}
