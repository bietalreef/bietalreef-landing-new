export type Locale = 'ar' | 'en';
export interface Emirate { slug: string; nameAr: string; nameEn: string }
export interface City extends Emirate { emirate: string }
export interface Area extends City { city: string; editorial: { reviewed: boolean; source: string | null; blocks: { ar: string; en: string }[] } }
export interface Category extends Emirate {}
export interface Service { id: string; slug: string; category: string; published: boolean; title: Record<Locale, string>; summary: Record<Locale, string> }
export interface ProviderServiceArea { emirate: string; city: string; areas: string[]; approved: boolean; source: string }
export interface ProviderSubscription { active: boolean; expiresAt?: string; entitlements?: string[] }
export interface FeaturedProvider { providerId: string; area: string; category: string; kind: 'featured' | 'sponsored'; active: boolean; expiresAt: string; label: Record<Locale, string> }
export interface Provider { id: string; slug: string; name: Record<Locale, string>; published: boolean; verified: boolean; phone: string; whatsapp: string; image: string; visibility: { directory: boolean; requiresSubscription: boolean }; subscription: ProviderSubscription; services: Service[]; coverage: ProviderServiceArea[]; placements: FeaturedProvider[] }
