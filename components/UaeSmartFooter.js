import { UaeDirectoryExploreFooter } from './UaeDirectoryHomeContent';
import UaeProviderJoinCTA from './UaeProviderJoinCTA';

// Keeps every emirate, area and specialty footer visually identical to the
// navigation system approved on the UAE Directory home page.
export default function UaeSmartFooter({ locale = 'ar', emirate = null, area = null, service = null }) {
  return <><UaeProviderJoinCTA locale={locale} emirate={emirate} area={area} service={service} /><UaeDirectoryExploreFooter locale={locale} emirate={emirate} area={area} /></>;
}
