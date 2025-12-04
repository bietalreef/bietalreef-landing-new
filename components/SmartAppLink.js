'use client';

import { useState, useEffect } from 'react';

export default function SmartAppLink({ children, className = '' }) {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if app is already installed
    const checkInstallation = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
      } else {
        setIsInstalled(false);
      }
      setIsLoading(false);
    };

    checkInstallation();

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleClick = (e) => {
    if (!isInstalled && !isLoading) {
      // Trigger install prompt if app is not installed
      const event = new Event('beforeinstallprompt');
      window.dispatchEvent(event);
    }
  };

  return (
    <a
      href="https://app.bietalreef.ae"
      onClick={handleClick}
      className={className}
      title={isInstalled ? 'فتح التطبيق' : 'تثبيت وفتح التطبيق'}
    >
      {children}
    </a>
  );
}
