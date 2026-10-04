import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { analyticsConsent, CONSENT_EVENT } from './PrivacyConsentCenter';

export const GOOGLE_ADS_TAG_ID = 'AW-17691718176';
export const GOOGLE_ANALYTICS_ID = 'G-YXKFW0GEMF';
export const GOOGLE_TAG_ID = 'GT-TXH7M28M';

function consentState() {
  return analyticsConsent() === 'accepted' ? 'granted' : 'denied';
}

export default function ConsentAwareGoogleTag() {
  const router = useRouter();

  useEffect(() => {
    const syncConsent = () => {
      const state = consentState();
      window.gtag?.('consent', 'update', {
        analytics_storage: state,
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state,
      });
    };

    syncConsent();
    window.addEventListener(CONSENT_EVENT, syncConsent);
    return () => window.removeEventListener(CONSENT_EVENT, syncConsent);
  }, []);

  useEffect(() => {
    const trackPage = (url) => {
      window.gtag?.('config', GOOGLE_ANALYTICS_ID, {
        page_path: url,
        page_location: window.location.href,
      });
      window.gtag?.('config', GOOGLE_ADS_TAG_ID, {
        page_path: url,
        page_location: window.location.href,
      });
    };

    router.events.on('routeChangeComplete', trackPage);
    return () => router.events.off('routeChangeComplete', trackPage);
  }, [router.events]);

  return (
    <>
      <Script id="bietalreef-google-consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>
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
          gtag('config', '${GOOGLE_ANALYTICS_ID}');
        `}
      </Script>
    </>
  );
}
