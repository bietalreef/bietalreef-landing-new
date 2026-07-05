/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  compress: true,
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/public/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://bietalreef.ae',
  },
};

module.exports = {
  ...nextConfig,
  async redirects() {
    return [
      // Legacy navigation and old sitemap aliases found in Search Console
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/dashboard',
        destination: '/',
        permanent: true,
      },
      {
        source: '/categories',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/ar-sitemap',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/en-sitemap',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/sitemap',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/services/construction-contracting',
        destination: '/categories/general-contracting',
        permanent: true,
      },
      {
        source: '/categories/engineering-consultation',
        destination: '/categories/engineering-consultants',
        permanent: true,
      },
      {
        source: '/services/engineering-consultation',
        destination: '/categories/engineering-consultants',
        permanent: true,
      },
      {
        source: '/services/maintenance-companies',
        destination: '/categories/general-maintenance',
        permanent: true,
      },
      {
        source: '/services/craftsmen',
        destination: '/categories/carpentry',
        permanent: true,
      },
      {
        source: '/services/workshops',
        destination: '/categories/carpentry',
        permanent: true,
      },
      {
        source: '/services/building-materials',
        destination: '/building-materials-uae',
        permanent: true,
      },
      {
        source: '/services/furniture-stores',
        destination: '/categories/furniture-decor',
        permanent: true,
      },
      // Redirect old city-specific service links to general category pages
      {
        source: '/services/construction-contracting/dubai',
        destination: '/categories/general-contracting',
        permanent: true,
      },
      {
        source: '/services/maintenance-companies/dubai',
        destination: '/categories/general-maintenance',
        permanent: true,
      },
      {
        source: '/services/construction-contracting/abu-dhabi',
        destination: '/categories/general-contracting',
        permanent: true,
      },
      {
        source: '/services/construction-contracting/al-ain',
        destination: '/categories/general-contracting',
        permanent: true,
      },
    ];
  },
};
