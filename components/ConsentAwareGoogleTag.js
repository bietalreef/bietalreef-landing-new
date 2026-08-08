import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { analyticsConsent, CONSENT_EVENT } from './PrivacyConsentCenter';

export const GOOGLE_ADS_TAG_ID = 'AW-17691718176';
export const GOOGLE_TAG_ID = 'GT-TXH7M28M';

export default function ConsentAwareGoogleTag() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const syncConsent = () => setEnabled(analyticsConsent() === 'accepted');
    syncConsent();
    window.addEventListener(CONSENT_EVENT, syncConsent);
    return () => window.removeEventListener(CONSENT_EVENT, syncConsent);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const trackPage = (url) => {
      window.gtag?.('config', GOOGLE_ADS_TAG_ID, {
        page_path: url,
        page_location: window.location.href,
      });
    };

    router.events.on('routeChangeComplete', trackPage);
    return () => router.events.off('routeChangeComplete', trackPage);
  }, [enabled, router.events]);

  if (!enabled) return null;

  return (
    <>
      <Script
        id="bietalreef-google-tag-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_TAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="bietalreef-google-tag-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_TAG_ID}');
        `}
      </Script>
    </>
  );
}
