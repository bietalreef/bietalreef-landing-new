import { useEffect, useState } from 'react';
import Image from 'next/image';

const DISMISS_KEY = 'bietalreef_pwa_install_dismissed_at';
const DISMISS_FOR_MS = 7 * 24 * 60 * 60 * 1000;

export default function PwaInstallPrompt({ locale = 'ar' }) {
  const [installEvent, setInstallEvent] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (standalone) return undefined;
    let dismissedAt = 0;
    try {
      dismissedAt = Number(window.localStorage.getItem(DISMISS_KEY) || 0);
    } catch {
      dismissedAt = 0;
    }
    const recentlyDismissed = Date.now() - dismissedAt < DISMISS_FOR_MS;
    const onInstallAvailable = (event) => {
      event.preventDefault();
      setInstallEvent(event);
      if (!recentlyDismissed) setVisible(true);
    };
    const onInstalled = () => {
      setInstallEvent(null);
      setVisible(false);
      try { window.localStorage.removeItem(DISMISS_KEY); } catch {}
    };
    window.addEventListener('beforeinstallprompt', onInstallAvailable);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onInstallAvailable);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (!visible || !installEvent) return null;
  const isEnglish = locale === 'en';
  const install = async () => {
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === 'accepted') setVisible(false);
    setInstallEvent(null);
  };
  const dismiss = () => {
    try { window.localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch {}
    setVisible(false);
  };

  return (
    <aside dir={isEnglish ? 'ltr' : 'rtl'} className="fixed inset-x-4 bottom-4 z-[205] mx-auto max-w-md rounded-[1.6rem] border border-[#D7C48D] bg-white/95 p-4 shadow-2xl backdrop-blur-xl" aria-label={isEnglish ? 'Install Biet Al Reef' : 'تثبيت بيت الريف'}>
      <div className="flex items-start gap-3">
        <Image src="/icons/logo-512.webp" alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-xl object-cover" />
        <div className="min-w-0 flex-1">
          <h2 className="font-black text-[#102F18]">{isEnglish ? 'Add Biet Al Reef to your device' : 'ثبّت بيت الريف على جهازك'}</h2>
          <p className="mt-1 text-xs font-semibold leading-6 text-gray-600">{isEnglish ? 'Faster access from your home screen with the same public website and identity.' : 'وصول أسرع من الشاشة الرئيسية إلى نفس الموقع العام وبنفس الهوية.'}</p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={install} className="min-h-[44px] flex-1 rounded-xl bg-[#102F18] px-4 py-2 text-xs font-black text-white">{isEnglish ? 'Install' : 'تثبيت'}</button>
            <button type="button" onClick={dismiss} className="min-h-[44px] rounded-xl border border-[#E6DCC8] bg-white px-4 py-2 text-xs font-black text-[#102F18]">{isEnglish ? 'Not now' : 'ليس الآن'}</button>
          </div>
        </div>
      </div>
    </aside>
  );
}
