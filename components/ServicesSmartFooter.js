import SectionSmartFooter from './SectionSmartFooter';

export default function ServicesSmartFooter({ locale = 'ar', directoryCards = [] }) {
  return (
    <SectionSmartFooter
      locale={locale}
      sectionKey="services_offers"
      directoryCards={directoryCards}
    />
  );
}
