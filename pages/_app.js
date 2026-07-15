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

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const currentPath = router.asPath?.split('?')[0] || '/';
  const isEnglishPage = currentPath === '/en' || currentPath.startsWith('/en/');
  const isProviderProfile = /^\/(?:en\/)?providers\/(?!register(?:\/|$))[^/?#]+/.test(currentPath);
  const isArkleenProfile = /^\/(?:en\/)?providers\/(?:arkleen|arkline)(?:\/|$)/.test(currentPath);

  useEffect(() => initPublicAnalytics(router), [router]);

  return (
    <ClientSafetyBoundary>
      <Component {...pageProps} />
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
