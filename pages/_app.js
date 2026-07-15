import "../styles/globals.css";
import "../styles/provider_styles.css";
import "../styles/provider_product_cards.css";
import "../styles/arkleen_provider_preview.css";
import { useRouter } from "next/router";
import InstallPrompt from "../components/InstallPrompt";
import AppLifecycleManager from "../components/AppLifecycleManager";
import ClientSafetyBoundary from "../components/ClientSafetyBoundary";
import ProtectedContentGuard from "../components/ProtectedContentGuard";
import UniversalRequestCTA from "../components/UniversalRequestCTA";
import ProviderProductInteraction from "../components/provider/ProviderProductInteraction";
import ArklineProfileEnhancements from "../components/provider/ArklineProfileEnhancements";
import ArklineProjectsAndChannels from "../components/provider/ArklineProjectsAndChannels";
import PrivacyConsentCenter from "../components/PrivacyConsentCenter";
import { initPublicAnalytics } from "../lib/publicAnalytics";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const currentPath = router.asPath?.split('?')[0] || '/';
  const isEnglishPage = currentPath === '/en' || currentPath.startsWith('/en/');

  useEffect(() => initPublicAnalytics(router), [router]);

  return (
    <ClientSafetyBoundary>
      <AppLifecycleManager />
      <ProtectedContentGuard />
      <InstallPrompt />
      <Component {...pageProps} />
      <ProviderProductInteraction currentPath={router.asPath || ''} />
      <ArklineProfileEnhancements currentPath={router.asPath || ''} />
      <ArklineProjectsAndChannels currentPath={router.asPath || ''} />
      {isEnglishPage ? <UniversalRequestCTA locale="en" /> : null}
      <PrivacyConsentCenter locale={isEnglishPage ? "en" : "ar"} />
    </ClientSafetyBoundary>
  );
}
