import UnifiedCard from './UnifiedCard';
import { ENTITY_TYPES } from '../data/siteTaxonomy';

/**
 * ProviderCard — غلاف متوافق مع المحرك الموحد
 */
export default function ProviderCard(props) {
  const { provider, ...rest } = props;
  return (
    <UnifiedCard 
      entity={provider} 
      type={ENTITY_TYPES.PROVIDER} 
      {...rest} 
    />
  );
}
