import { ImageResponse } from 'next/og';

export const config = { runtime: 'edge' };

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#F4E7D4',
          color: '#0F3F1A',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <img
          src="https://bietalreef.ae/images/bietalreef-option-one-villa.webp"
          width="1200"
          height="675"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(7,31,25,.94) 0%, rgba(7,31,25,.80) 45%, rgba(7,31,25,.16) 100%)' }} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '720px', padding: '58px 66px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#F4C95D', fontSize: 25, fontWeight: 800 }}>
            <span style={{ width: '13px', height: '13px', borderRadius: '50%', background: '#F4C95D' }} />
            Biet Al Reef Platform • منصة بيت الريف
          </div>
          <div style={{ marginTop: '28px', color: '#FFFFFF', fontSize: 55, lineHeight: 1.18, fontWeight: 900 }}>
            منظومة تشغيل رقمية لقطاع البناء في الإمارات
          </div>
          <div style={{ marginTop: '22px', color: '#E8EEE9', fontSize: 25, lineHeight: 1.45, fontWeight: 650 }}>
            العميل • مزود الخدمة • السوق • المستندات • وياك AI
          </div>
          <div style={{ marginTop: '30px', display: 'flex', color: '#F4C95D', fontSize: 21, fontWeight: 800 }}>
            bietalreef.ae/press/smart-platform-launch
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 627,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000',
      },
    },
  );
}
