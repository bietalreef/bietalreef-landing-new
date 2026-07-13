import "../styles/globals.css";
import "../styles/provider_styles.css";
import "../styles/provider_product_cards.css";
import { useRouter } from "next/router";
import InstallPrompt from "../components/InstallPrompt";
import AppLifecycleManager from "../components/AppLifecycleManager";
import ClientSafetyBoundary from "../components/ClientSafetyBoundary";
import ProtectedContentGuard from "../components/ProtectedContentGuard";
import WeyakChat from "../components/WeyakChat";
import UniversalRequestCTA from "../components/UniversalRequestCTA";
import ProviderProductInteraction from "../components/provider/ProviderProductInteraction";
import ArklineProfileEnhancements from "../components/provider/ArklineProfileEnhancements";
import ArklineProjectsAndChannels from "../components/provider/ArklineProjectsAndChannels";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isEnglishPage = router.asPath?.split('?')[0]?.startsWith('/en');

  return (
    <ClientSafetyBoundary>
      <AppLifecycleManager />
      <ProtectedContentGuard />
      <InstallPrompt />
      <WeyakChat />
      <Component {...pageProps} />
      <ProviderProductInteraction currentPath={router.asPath || ''} />
      <ArklineProfileEnhancements currentPath={router.asPath || ''} />
      <ArklineProjectsAndChannels currentPath={router.asPath || ''} />
      {isEnglishPage ? <UniversalRequestCTA locale="en" /> : null}
    </ClientSafetyBoundary>
  );
}
