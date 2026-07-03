'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

function isStandaloneMode() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

export default function AppOpenGate() {
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const markInstalled = () => {
      window.localStorage.setItem('bietalreef_pwa_installed', '1');
    };

    const checkMode = () => {
      const installedFlag = window.localStorage.getItem('bietalreef_pwa_installed') === '1';
      const standalone = isStandaloneMode();
      const dismissedUntil = Number(window.localStorage.getItem('bietalreef_open_app_dismissed_until') || 0);
      const isBrowser = !standalone;

      if (installedFlag && isBrowser && Date.now() > dismissedUntil) {
        setShowGate(true);
      } else {
        setShowGate(false);
      }
    };

    if (isStandaloneMode()) {
      markInstalled();
    }

    window.addEventListener('appinstalled', markInstalled);
    window.addEventListener('focus', checkMode);
    checkMode();

    return () => {
      window.removeEventListener('appinstalled', markInstalled);
      window.removeEventListener('focus', checkMode);
    };
  }, []);

  const dismissForToday = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('bietalreef_open_app_dismissed_until', String(Date.now() + 24 * 60 * 60 * 1000));
    }
    setShowGate(false);
  };

  if (!showGate) return null;

  return (
    <div dir="rtl" className="fixed inset-0 z-[120] flex items-end justify-center bg-black/45 px-4 pb-4 backdrop-blur-sm md:items-center md:pb-0">
      <section className="safe-bottom w-full max-w-md rounded-[2rem] border border-[#E6DCC8] bg-white p-6 text-center shadow-2xl">
        <Image src="/logo.png" alt="بيت الريف" width={82} height={82} className="mx-auto h-20 w-20 object-contain" />
        <h2 className="mt-4 text-2xl font-black text-[#0F3F1A]">افتح بيت الريف كتطبيق</h2>
        <p className="mt-3 text-sm leading-8 text-gray-600">
          يبدو أن التطبيق مثبت على جهازك. للحصول على أفضل تجربة ومقاسات ثابتة، افتحه من أيقونة بيت الريف على الشاشة الرئيسية.
        </p>
        <div className="mt-6 grid gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="min-h-[48px] rounded-2xl bg-[#0F3F1A] px-5 py-3 text-base font-black text-white shadow-lg"
          >
            تحديث وفتح التجربة المحسنة
          </button>
          <button
            type="button"
            onClick={dismissForToday}
            className="min-h-[48px] rounded-2xl border border-[#E6DCC8] bg-white px-5 py-3 text-base font-black text-[#0F3F1A]"
          >
            أكمل من المتصفح اليوم
          </button>
        </div>
      </section>
    </div>
  );
}
