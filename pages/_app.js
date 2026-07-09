import "../styles/globals.css";
import "../styles/provider_styles.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import InstallPrompt from "../components/InstallPrompt";
import AppOpenGate from "../components/AppOpenGate";
import WeyakChat from "../components/WeyakChat";
import UniversalRequestCTA from "../components/UniversalRequestCTA";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isEnglishPage = router.asPath?.split('?')[0]?.startsWith('/en');

  useEffect(() => {
    // Register service worker for PWA
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
    }
  }, []);

  return (
    <>
      <InstallPrompt />
      <AppOpenGate />
      <WeyakChat />
      <Component {...pageProps} />
      {isEnglishPage ? <UniversalRequestCTA locale="en" /> : null}
      <SpeedInsights />
    </>
  );
}
