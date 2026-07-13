'use client';

import { useEffect, useState } from 'react';

export default function AppLifecycleManager() {
  const [registration, setRegistration] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    let hourlyCheck;

    const checkWaiting = (nextRegistration) => {
      if (nextRegistration.waiting && navigator.serviceWorker.controller) {
        setRegistration(nextRegistration);
        setShowUpdate(true);
      }
    };

    navigator.serviceWorker
      .register('/sw.js', { scope: '/', updateViaCache: 'none' })
      .then((nextRegistration) => {
        setRegistration(nextRegistration);
        checkWaiting(nextRegistration);

        nextRegistration.addEventListener('updatefound', () => {
          const worker = nextRegistration.installing;
          if (!worker) return;
          worker.addEventListener('statechange', () => {
            if (worker.state === 'installed' && navigator.serviceWorker.controller) {
              checkWaiting(nextRegistration);
            }
          });
        });

        nextRegistration.update().catch(() => {});
        hourlyCheck = window.setInterval(() => nextRegistration.update().catch(() => {}), 60 * 60 * 1000);
      })
      .catch((error) => console.warn('Service Worker registration skipped:', error));

    const handleControllerChange = () => window.location.reload();
    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
      if (hourlyCheck) window.clearInterval(hourlyCheck);
    };
  }, []);

  const updateNow = () => {
    registration?.waiting?.postMessage({ type: 'SKIP_WAITING' });
  };

  if (!showUpdate) return null;

  return (
    <div dir="rtl" className="fixed inset-x-4 bottom-4 z-[200] mx-auto max-w-xl rounded-[1.6rem] border border-[#D7C48D] bg-white/95 p-4 shadow-2xl backdrop-blur-xl md:bottom-6 md:p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FFF2C8] text-xl">✨</div>
        <div className="min-w-0 flex-1">
          <h2 className="font-black text-[#102F18]">تحديث جديد لبيت الريف جاهز</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">حدّث عند الحاجة للحصول على أحدث نسخة وتحسينات الاستقرار.</p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={updateNow} className="min-h-[44px] rounded-xl bg-[#102F18] px-5 py-2.5 text-sm font-black text-white">تحديث الآن</button>
            <button type="button" onClick={() => setShowUpdate(false)} className="min-h-[44px] rounded-xl border border-[#E6DCC8] bg-white px-5 py-2.5 text-sm font-black text-[#102F18]">لاحقًا</button>
          </div>
        </div>
      </div>
    </div>
  );
}
