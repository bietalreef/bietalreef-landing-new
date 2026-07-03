import "../styles/globals.css";
import "../styles/provider_styles.css";
import { useEffect } from "react";
import InstallPrompt from "../components/InstallPrompt";
import AppOpenGate from "../components/AppOpenGate";
import WeyakChat from "../components/WeyakChat";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function MyApp({ Component, pageProps }) {
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
      <SpeedInsights />
    </>
  );
}
