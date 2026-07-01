import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Star, ShieldCheck, MapPin, Package, Tag, FileText, ChevronDown, ChevronLeft, Info } from 'lucide-react';
import { ENTITY_TYPES } from '../data/siteTaxonomy';

/**
 * UnifiedCard — المكون المعماري الموحد لجميع الكيانات
 * يدعم: Provider, Product, Service, Offer, Article, Emirate
 */
export default function UnifiedCard({ 
  entity, 
  type = ENTITY_TYPES.PROVIDER,
  mode = 'medium', // small, medium, large, horizontal
  className = '' 
}) {
  const [isExpanded, setIsExpanded] = useState(false);
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
    },
    [ENTITY_TYPES.EMIRATE]: {
      url: `/${entity.slug}`,
      icon: <MapPin className="w-4 h-4 text-primary" />,
      tag: 'إمارة',
      location: entity.emirate,
      meta: entity.city
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
    seo,
    services,
    description
  } = entity;

  const displayName = name || title;
  const displayImage = coverImage || image || logo;
  const profileUrl = config.url || '#';

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`group bg-white rounded-2xl border border-[#E6DCC8] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col ${className}`}>
      <Link href={profileUrl} className="block relative overflow-hidden bg-gray-100 aspect-[16/9]">
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
        <div className="absolute bottom-3 left-3 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg border border-white/20">
          {config.tag}
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <Link href={profileUrl}>
            <h3 className="font-black text-gray-900 group-hover:text-primary transition-colors line-clamp-1 text-sm md:text-base">
              {displayName}
            </h3>
          </Link>
          {isVerified && config.icon}
        </div>

        <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
          {description || `استكشف أفضل الخدمات والمزودين في ${config.location}.`}
        </p>

        {(seo || services) && (
          <button 
            onClick={handleToggle}
            className="flex items-center gap-2 text-primary font-bold text-xs mb-4 hover:opacity-80 transition"
          >
            {isExpanded ? 'إخفاء التفاصيل' : 'عرض المزيد'}
            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        )}

        {isExpanded && (
          <div className="mb-4 bg-blue-50/50 rounded-xl p-4 border-r-4 border-primary animate-in fade-in slide-in-from-top-2 duration-300">
            {seo?.what && <p className="text-[11px] text-gray-600 leading-relaxed mb-3">{seo.what}</p>}
            {seo?.check && (
              <div className="flex gap-2 items-start mb-3">
                <Info className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-[11px] text-gray-700 font-bold">
                  {seo.check}
                </p>
              </div>
            )}
            {services && (
              <div className="flex flex-wrap gap-1.5">
                {services.slice(0, 6).map((s, i) => (
                  <span key={i} className="text-[9px] font-bold bg-white border border-primary/10 text-primary px-2 py-1 rounded-md">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
          <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium truncate max-w-[150px]">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            {config.location}
          </div>
          <Link 
            href={profileUrl}
            className="text-xs font-black text-primary hover:text-primary-dark transition flex items-center gap-1"
          >
            استكشف <ChevronLeft className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
