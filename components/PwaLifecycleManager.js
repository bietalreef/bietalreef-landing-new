import { useEffect, useState } from 'react';

export default function PwaLifecycleManager({ locale = 'ar' }) {
  const [registration, setRegistration] = useState(null);
  const [updateReady, setUpdateReady] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return undefined;

    let updateTimer;
    let refreshing = false;
    let cancelled = false;
    const showWaitingWorker = (nextRegistration) => {
      if (nextRegistration.waiting && navigator.serviceWorker.controller) {
        setRegistration(nextRegistration);
        setUpdateReady(true);
      }
    };
    const register = async () => {
      try {
        const nextRegistration = await navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' });
        if (cancelled) return;
        setRegistration(nextRegistration);
        showWaitingWorker(nextRegistration);
        nextRegistration.addEventListener('updatefound', () => {
          const worker = nextRegistration.installing;
          worker?.addEventListener('statechange', () => {
            if (worker.state === 'installed') showWaitingWorker(nextRegistration);
          });
        });
        await nextRegistration.update().catch(() => undefined);
        updateTimer = window.setInterval(() => nextRegistration.update().catch(() => undefined), 60 * 60 * 1000);
      } catch (error) {
        console.warn('Biet Al Reef PWA registration was skipped.', error);
      }
    };
    const onControllerChange = () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    };
    if (document.readyState === 'complete') register();
    else window.addEventListener('load', register, { once: true });
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);
    return () => {
      cancelled = true;
      window.removeEventListener('load', register);
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
      if (updateTimer) window.clearInterval(updateTimer);
    };
  }, []);

  if (!updateReady) return null;
  const isEnglish = locale === 'en';
  const applyUpdate = () => registration?.waiting?.postMessage({ type: 'SKIP_WAITING' });

  return (
    <aside dir={isEnglish ? 'ltr' : 'rtl'} className="fixed inset-x-4 bottom-4 z-[210] mx-auto max-w-xl rounded-[1.6rem] border border-[#D7C48D] bg-white/95 p-4 shadow-2xl backdrop-blur-xl md:bottom-6 md:p-5" aria-live="polite">
      <h2 className="font-black text-[#102F18]">{isEnglish ? 'A Biet Al Reef update is ready' : 'تحديث جديد لبيت الريف جاهز'}</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">{isEnglish ? 'Refresh once to use the latest stable version.' : 'حدّث مرة واحدة لاستخدام أحدث نسخة مستقرة.'}</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <button type="button" onClick={applyUpdate} className="min-h-[44px] rounded-xl bg-[#102F18] px-5 py-2.5 text-sm font-black text-white">{isEnglish ? 'Update now' : 'تحديث الآن'}</button>
        <button type="button" onClick={() => setUpdateReady(false)} className="min-h-[44px] rounded-xl border border-[#E6DCC8] bg-white px-5 py-2.5 text-sm font-black text-[#102F18]">{isEnglish ? 'Later' : 'لاحقًا'}</button>
      </div>
    </aside>
  );
}
