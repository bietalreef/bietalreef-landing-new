import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const WeyakChat = dynamic(() => import('./WeyakChat'), { ssr: false });

const WEYAAK_PATHS = new Set(['/weyaak', '/en/weyaak']);

export default function WeyaakChatLauncher({ locale = 'ar' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [chatLocale, setChatLocale] = useState(locale === 'en' ? 'en' : 'ar');

  useEffect(() => {
    setChatLocale(locale === 'en' ? 'en' : 'ar');
  }, [locale]);

  useEffect(() => {
    const openWeyaak = (requestedLocale) => {
      setChatLocale(requestedLocale === 'en' ? 'en' : 'ar');
      setIsOpen(true);
    };

    const handleClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const trigger = event.target.closest('[data-weyaak-launch], a[href]');
      if (!trigger) return;

      if (trigger.matches('[data-weyaak-launch]')) {
        event.preventDefault();
        openWeyaak(trigger.getAttribute('data-weyaak-locale') || locale);
        return;
      }

      if (trigger.target === '_blank' || trigger.hasAttribute('download')) return;

      let url;
      try {
        url = new URL(trigger.href, window.location.origin);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin || !WEYAAK_PATHS.has(url.pathname)) return;

      event.preventDefault();
      openWeyaak(url.pathname.startsWith('/en/') ? 'en' : 'ar');
    };

    const handleCustomOpen = (event) => openWeyaak(event.detail?.locale || locale);

    document.addEventListener('click', handleClick);
    window.addEventListener('weyaak:open', handleCustomOpen);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('weyaak:open', handleCustomOpen);
    };
  }, [locale]);

  return <WeyakChat open={isOpen} onClose={() => setIsOpen(false)} initialLocale={chatLocale} />;
}
