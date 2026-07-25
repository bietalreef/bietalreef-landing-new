import { useRouter } from 'next/router';
import { Building2, ChevronDown, PackageSearch, Wrench } from 'lucide-react';

const SECTION_META = {
  providers: {
    title: (name) => `شركات ومؤسسات ${name} في أبوظبي`,
    description: 'اختر القسم ثم التخصص للوصول إلى الشركات والمؤسسات والورش والحرفيين المنشورين داخل إمارة أبوظبي.',
    label: 'الشركات والمؤسسات',
    Icon: Building2,
  },
  services_offers: {
    title: (name) => `خدمات وعروض ${name} في أبوظبي`,
    description: 'اختر القسم والتخصص، ثم استعرض الخدمات المعتمدة والعروض المنشورة داخل إمارة أبوظبي.',
    label: 'الخدمات والعروض',
    Icon: Wrench,
  },
  products_stores: {
    title: (name) => `منتجات ومتاجر ${name} في أبوظبي`,
    description: 'اختر القسم والتخصص للوصول إلى المنتجات والمتاجر والمصانع والورش والموردين داخل إمارة أبوظبي.',
    label: 'المنتجات والمتاجر',
    Icon: PackageSearch,
  },
};

export default function AbuDhabiActivityDirectory({ activity }) {
  const router = useRouter();
  const sectionKey = SECTION_META[router.query.section] ? router.query.section : 'providers';
  const meta = SECTION_META[sectionKey];
  const Icon = meta.Icon;

  return (
    <section dir="rtl" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-[0_18px_45px_rgba(18,58,70,.07)] md:p-9">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#FDF7E8] px-4 py-2 text-xs font-black text-[#8A6A00]">
              <Icon className="h-4 w-4" />{meta.label}
            </span>
            <h1 className="mt-4 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">{meta.title(activity.name)}</h1>
            <p className="mt-4 max-w-4xl font-semibold leading-8 text-gray-600">{meta.description}</p>
          </div>
          <div className="grid shrink-0 grid-cols-3 gap-2">
            <span className="rounded-2xl bg-[#FDF7E8] px-4 py-3 text-center text-xs font-black text-[#8A6A00]"><b className="block text-xl text-[#0F3F1A]">{activity.categoryCount}</b>أقسام</span>
            <span className="rounded-2xl bg-[#FDF7E8] px-4 py-3 text-center text-xs font-black text-[#8A6A00]"><b className="block text-xl text-[#0F3F1A]">{activity.specialtyCount}</b>تخصصات</span>
            <span className="rounded-2xl bg-[#FDF7E8] px-4 py-3 text-center text-xs font-black text-[#8A6A00]"><b className="block text-xl text-[#0F3F1A]">{activity.serviceCount}</b>خدمات</span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {activity.categories.map((category, categoryIndex) => {
          const serviceCount = category.specialties.reduce((sum, specialty) => sum + specialty.services.length, 0);
          return (
            <details key={category.id} open={categoryIndex === 0} className="group overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_16px_40px_rgba(18,58,70,.07)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6">
                <div>
                  <span className="text-xs font-black text-[#8A6A00]">قسم رئيسي</span>
                  <h2 className="mt-1 text-2xl font-black text-[#0F3F1A]">{category.name}</h2>
                  <p className="mt-2 text-sm font-bold text-gray-500">{category.specialties.length} تخصصات · {serviceCount} خدمات معتمدة</p>
                </div>
                <ChevronDown className="h-6 w-6 shrink-0 text-[#B8922B] transition group-open:rotate-180" />
              </summary>
              <div className="border-t border-[#EEE4D3] bg-[#FDFBF7] p-5">
                <div className="space-y-3">
                  {category.specialties.map((specialty) => (
                    <details key={specialty.id} className="rounded-2xl border border-[#E6DCC8] bg-white">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
                        <div>
                          <h3 className="font-black text-[#0F3F1A]">{specialty.name}</h3>
                          <span className="mt-1 block text-xs font-bold text-gray-500">{specialty.services.length} خدمات</span>
                        </div>
                        <ChevronDown className="h-5 w-5 shrink-0 text-[#B8922B]" />
                      </summary>
                      <div className="flex flex-wrap gap-2 border-t border-[#EEE4D3] p-4">
                        {specialty.services.map((service) => (
                          <span key={service.id} className="rounded-full border border-[#E6DCC8] bg-[#FFF9EC] px-3 py-2 text-xs font-bold text-[#0F3F1A]">{service.name}</span>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
