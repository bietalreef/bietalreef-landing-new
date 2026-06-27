import "../styles/globals.css";
import { useEffect } from "react";
import InstallPrompt from "../components/InstallPrompt";
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
      <WeyakChat />
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
}
// Trigger build Sat Jun 27 08:58:38 UTC 2026
