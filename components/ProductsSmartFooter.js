import SectionSmartFooter from './SectionSmartFooter';

export default function ProductsSmartFooter({ locale = 'ar', directoryCards = [] }) {
  return (
    <SectionSmartFooter
      locale={locale}
      sectionKey="products_stores"
      directoryCards={directoryCards}
    />
  );
}
