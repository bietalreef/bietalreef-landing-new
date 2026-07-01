import Link from 'next/link';
import Image from 'next/image';
import { Star, ShieldCheck, MapPin, Package, Tag, FileText, ChevronLeft } from 'lucide-react';
import { ENTITY_TYPES } from '../data/siteTaxonomy';

/**
 * UnifiedCard — المكون المعماري الموحد لجميع الكيانات
 * يدعم: Provider, Product, Service, Offer, Article
 */
export default function UnifiedCard({ 
  entity, 
  type = ENTITY_TYPES.PROVIDER,
  mode = 'medium', // small, medium, large, horizontal
  className = '' 
}) {
  if (!entity) return null;

  // استخراج البيانات بناءً على نوع الكيان
  const config = {
    [ENTITY_TYPES.PROVIDER]: {
      url: `/provider/${entity.slug}`,
      icon: <ShieldCheck className="w-4 h-4 text-emerald-500 fill-emerald-50" />,
      tag: entity.primarySpecialty,
      location: `${entity.city || ''}، ${entity.emirate || ''}`,
      meta: entity.projectsCount ? `${entity.projectsCount} مشروع` : null
    },
    [ENTITY_TYPES.PRODUCT]: {
      url: `/product/${entity.slug}`,
      icon: <Package className="w-4 h-4 text-blue-500" />,
      tag: 'منتج',
      location: entity.brand,
      meta: entity.price ? `${entity.price} د.إ` : null
    },
    [ENTITY_TYPES.SERVICE]: {
      url: `/services/${entity.slug}`,
      icon: <Tag className="w-4 h-4 text-primary" />,
      tag: 'خدمة',
      location: 'متاح في جميع الإمارات',
      meta: null
    },
    [ENTITY_TYPES.OFFER]: {
      url: `/offers/${entity.slug}`,
      icon: <Star className="w-4 h-4 text-amber-500 fill-amber-50" />,
      tag: 'عرض خاص',
      location: entity.providerName,
      meta: entity.discount ? `خصم ${entity.discount}` : null
    },
    [ENTITY_TYPES.ARTICLE]: {
      url: `/blog/${entity.slug}`,
      icon: <FileText className="w-4 h-4 text-gray-500" />,
      tag: 'مقال',
      location: entity.author,
      meta: entity.date
    }
  }[type] || {};

  const {
    name,
    title,
    logo,
    image,
    coverImage,
    rating = 4.8,
    isVerified = true,
    isFeatured = false,
  } = entity;

  const displayName = name || title;
  const displayImage = coverImage || image || logo;
  const profileUrl = config.url || '#';

  return (
    <Link href={profileUrl} className={`group block h-full ${className}`}>
      <div className={`bg-white rounded-2xl border border-[#E6DCC8] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex ${mode === 'horizontal' ? 'flex-row' : 'flex-col'}`}>
        
        {/* Visual Section */}
        <div className={`relative overflow-hidden bg-gray-100 ${mode === 'horizontal' ? 'w-1/3' : 'w-full aspect-[16/9]'}`}>
          {displayImage ? (
            <Image 
              src={displayImage} 
              alt={displayName} 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
              <span className="text-primary/20 text-4xl font-black">بر</span>
            </div>
          )}
          
          {isFeatured && (
            <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm z-10">
              متميز
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className={`p-4 flex flex-col flex-1 ${mode === 'horizontal' ? 'w-2/3' : ''}`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-black text-gray-900 group-hover:text-primary transition-colors line-clamp-1 text-sm md:text-base">
              {displayName}
            </h3>
            {isVerified && config.icon}
          </div>

          <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-500 mb-3">
            {config.tag && (
              <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">
                {config.tag}
              </span>
            )}
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3 h-3 fill-amber-500" />
              {rating}
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-3">
            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium truncate max-w-[120px]">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              {config.location}
            </div>
            {config.meta && (
              <div className="text-[10px] text-gray-400 font-bold">
                {config.meta}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
