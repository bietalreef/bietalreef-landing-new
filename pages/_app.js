import "../styles/globals.css";
import { useEffect } from "react";
import InstallPrompt from "../components/InstallPrompt";

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
      <Component {...pageProps} />
    </>
  );
}
