/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/**' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  compress: true,
  async headers() {
    const securityHeaders = [
      { key: 'Content-Security-Policy', value: "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://*.supabase.co https://vitals.vercel-insights.com https://*.vercel-insights.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://www.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net; frame-src https://www.youtube-nocookie.com; upgrade-insecure-requests" },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
    ];
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
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
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.bietalreef.ae' }],
        destination: 'https://bietalreef.ae/:path*',
        permanent: true,
      },
      {
        source: '/provider/:slug',
        destination: '/providers/:slug',
        permanent: true,
      },
      {
        source: '/en/provider/:slug',
        destination: '/en/providers/:slug',
        permanent: true,
      },
      {
        source: '/cards-preview',
        destination: '/providers',
        permanent: true,
      },
      {
        source: '/test-small-page',
        destination: '/',
        permanent: true,
      },
      {
        source: '/providers/arkline',
        destination: '/providers/arkleen',
        permanent: true,
      },
      {
        source: '/en/providers/arkline',
        destination: '/en/providers/arkleen',
        permanent: true,
      },
      {
        source: '/en/inquiry',
        destination: '/en/service-inquiry',
        permanent: false,
      },
      {
        source: '/en/platform',
        destination: '/en/how-it-works',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/home',
        destination: '/en',
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
        source: '/en/categories',
        destination: '/en/services',
        permanent: true,
      },
      {
        source: '/uae/:emirate/sectors/:service',
        destination: '/uae/:emirate/:service',
        permanent: true,
      },
      {
        source: '/en/uae/:emirate/sectors/:service',
        destination: '/en/uae/:emirate/:service',
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
        source: '/services/furniture-stores',
        destination: '/categories/furniture-decor',
        permanent: true,
      },
      {
        source: '/en/services/equipment-rental',
        destination: '/en/categories/equipment-rental',
        permanent: true,
      },
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
