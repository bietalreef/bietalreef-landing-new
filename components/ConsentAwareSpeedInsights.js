import { useEffect, useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { analyticsConsent, CONSENT_EVENT } from './PrivacyConsentCenter';

export default function ConsentAwareSpeedInsights() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const syncConsent = () => setEnabled(analyticsConsent() === 'accepted');
    syncConsent();
    window.addEventListener(CONSENT_EVENT, syncConsent);
    return () => window.removeEventListener(CONSENT_EVENT, syncConsent);
  }, []);

  return enabled ? <SpeedInsights /> : null;
}
