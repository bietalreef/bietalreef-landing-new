import { UaeDirectoryExploreFooter } from './UaeDirectoryHomeContent';

// Keeps every emirate, area and specialty footer visually identical to the
// navigation system approved on the UAE Directory home page.
export default function UaeSmartFooter({ locale = 'ar', emirate = null, area = null }) {
  return <UaeDirectoryExploreFooter locale={locale} emirate={emirate} area={area} />;
}
