import SectionSmartFooter from './SectionSmartFooter';

export default function ProvidersSmartFooter({ locale = 'ar', directoryCards = [] }) {
  return (
    <SectionSmartFooter
      locale={locale}
      sectionKey="providers"
      directoryCards={directoryCards}
    />
  );
}
