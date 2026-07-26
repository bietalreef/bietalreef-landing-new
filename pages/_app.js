import "../styles/globals.css";
import { useRouter } from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";
import ClientSafetyBoundary from "../components/ClientSafetyBoundary";
import PrivacyConsentCenter from "../components/PrivacyConsentCenter";
import ConsentAwareSpeedInsights from "../components/ConsentAwareSpeedInsights";
import PwaLifecycleManager from "../components/PwaLifecycleManager";
import PwaInstallPrompt from "../components/PwaInstallPrompt";
import { initPublicAnalytics } from "../lib/publicAnalytics";
import { useEffect } from "react";

const ProviderProductInteraction = dynamic(
  () => import("../components/provider/ProviderProductInteraction"),
  { ssr: false }
);
const ArklineProfileEnhancements = dynamic(
  () => import("../components/provider/ArklineProfileEnhancements"),
  { ssr: false }
);
const ArklineProjectsAndChannels = dynamic(
  () => import("../components/provider/ArklineProjectsAndChannels"),
  { ssr: false }
);
const WeyakChat = dynamic(() => import('../components/WeyakChat'), { ssr: false });

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const currentPath = router.asPath?.split('?')[0] || '/';
  const isEnglishPage = currentPath === '/en' || currentPath.startsWith('/en/');
  const isProviderProfile = /^\/(?:en\/)?providers\/(?!register(?:\/|$))[^/?#]+/.test(currentPath);
  const isArkleenProfile = /^\/(?:en\/)?providers\/(?:arkleen|arkline)(?:\/|$)/.test(currentPath);

  useEffect(() => initPublicAnalytics(router), [router]);
  useEffect(() => {
    const openWeyaakLinksInWidget = (event) => {
      const link = event.target?.closest?.('a[href]');
      if (!link) return;
      let pathname = '';
      try { pathname = new URL(link.href, window.location.origin).pathname; } catch { return; }
      if (!['/weyaak', '/en/weyaak'].includes(pathname)) return;
      event.preventDefault();
      const parts = window.location.pathname.split('/').filter(Boolean);
      const uaeIndex = parts.indexOf('uae');
      window.dispatchEvent(new CustomEvent('weyaak:open', { detail: {
        path: window.location.pathname,
        sourceTitle: link.dataset.weyaakTitle || document.title,
        section: link.dataset.weyaakSection || (uaeIndex >= 0 ? (isEnglishPage ? 'UAE Directory' : 'دليل الإمارات') : ''),
        emirate: uaeIndex >= 0 ? parts[uaeIndex + 1] || '' : '',
        area: uaeIndex >= 0 ? parts[uaeIndex + 2] || '' : '',
        service: uaeIndex >= 0 ? parts[uaeIndex + 3] || '' : '',
        provider: parts.includes('providers') ? parts[parts.indexOf('providers') + 1] || '' : '',
        product: parts.includes('marketplace') ? parts[parts.indexOf('marketplace') + 1] || '' : '',
      } }));
    };
    document.addEventListener('click', openWeyaakLinksInWidget);
    return () => document.removeEventListener('click', openWeyaakLinksInWidget);
  }, [isEnglishPage]);

  return (
    <ClientSafetyBoundary>
      <Component {...pageProps} />
      <WeyakChat locale={isEnglishPage ? 'en' : 'ar'} standalone={currentPath === '/weyaak' || currentPath === '/en/weyaak'} />
      {isProviderProfile ? (
        <>
          <Head>
            <link rel="stylesheet" href="/styles/provider-profile.css" />
          </Head>
          <ProviderProductInteraction currentPath={router.asPath || ''} />
        </>
      ) : null}
      {isArkleenProfile ? (
        <>
          <ArklineProfileEnhancements currentPath={router.asPath || ''} />
          <ArklineProjectsAndChannels currentPath={router.asPath || ''} />
        </>
      ) : null}
      <PrivacyConsentCenter locale={isEnglishPage ? "en" : "ar"} />
      <ConsentAwareSpeedInsights />
      <PwaInstallPrompt locale={isEnglishPage ? "en" : "ar"} />
      <PwaLifecycleManager locale={isEnglishPage ? "en" : "ar"} />
    </ClientSafetyBoundary>
  );
}
