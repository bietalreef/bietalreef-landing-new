import Link from 'next/link';
import Image from 'next/image';
import { Star, ShieldCheck, MapPin } from 'lucide-react';

/**
 * ProviderCard — المكون الموحد لبطاقة مزود الخدمة
 * يستخدم في جميع أنحاء الموقع لضمان تجربة مستخدم متسقة.
 * الوجهة دائماً: /provider/[slug]
 */
export default function ProviderCard({ 
  provider, 
  mode = 'medium', // small, medium, large, horizontal
  className = '' 
}) {
  if (!provider) return null;

  const {
    slug,
    name,
    logo,
    coverImage,
    primarySpecialty,
    city,
    emirate,
    rating = 4.8,
    isVerified = true,
    isFeatured = false,
    projectsCount,
  } = provider;

  const profileUrl = `/provider/${slug}`;

  return (
    <Link href={profileUrl} className={`group block ${className}`}>
      <div className={`bg-white rounded-2xl border border-[#E6DCC8] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex ${mode === 'horizontal' ? 'flex-row' : 'flex-col'}`}>
        
        {/* Cover Image / Logo Section */}
        <div className={`relative overflow-hidden bg-gray-100 ${mode === 'horizontal' ? 'w-1/3' : 'w-full aspect-[16/9]'}`}>
          {coverImage ? (
            <Image 
              src={coverImage} 
              alt={name} 
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
            <h3 className="font-black text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
              {name}
            </h3>
            {isVerified && (
              <ShieldCheck className="w-4 h-4 text-emerald-500 fill-emerald-50" />
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">
              {primarySpecialty}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3 h-3 fill-amber-500" />
              {rating}
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-3">
            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
              <MapPin className="w-3 h-3" />
              {city}، {emirate}
            </div>
            {projectsCount && (
              <div className="text-[10px] text-gray-400 font-bold">
                {projectsCount} مشروع
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
