import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Facebook,
  FolderKanban,
  Globe2,
  Images,
  Instagram,
  Mail,
  MapPin,
  Music2,
  Ruler,
  X,
} from 'lucide-react';

const PROVIDERS = {
  arkleen: {
    id: 'BR-PROV-ARK-001',
    code: 'ARK',
    paths: ['/providers/arkline', '/providers/arkleen', '/en/providers/arkline', '/en/providers/arkleen'],
    base: '/images/providers/arkline/',
    website: 'https://bietalreef.ae/providers/arkleen',
    websiteEn: 'https://bietalreef.ae/providers/arkleen',
    copy: {
      ar: {
        projectsTab: 'المشاريع', eyebrow: 'المشاريع', title: 'مشاريع وأعمال أركلين',
        intro: 'بطاقة مشروع واحدة تجمع صور مزود الخدمة وتوضح جاهزية أركلين لدراسة وتصميم وتصنيع وتنفيذ المشروع المطلوب حسب المقاسات والخامات وموقع العمل.',
        details: 'التفاصيل', digitalEyebrow: 'الحضور الرقمي', digitalTitle: 'تواصل مع أركلين',
      },
      en: {
        projectsTab: 'Projects', eyebrow: 'Projects', title: 'Arkline Projects & Work',
        intro: 'One project card brings the provider imagery together and presents ARKLEEN’s readiness to review, design, manufacture and deliver the requested project.',
        details: 'Details', digitalEyebrow: 'Digital presence', digitalTitle: 'Connect with Arkline',
      },
    },
    projects: [
      {
        id: 'BR-PRJ-ARK-001',
        title: 'مشروعك القادم مع أركلين',
        category: 'تصميم وتنفيذ حسب الطلب',
        location: 'العين وأبوظبي',
        year: '2026',
        cover: '/images/providers/arkleen-premium/service-interior-fitout.webp',
        images: [
          '/images/providers/arkleen-premium/service-interior-fitout.webp',
          '/images/providers/arkleen-premium/service-custom-kitchens.webp',
          '/images/providers/arkleen-premium/service-custom-wardrobes.webp',
          '/images/providers/arkleen-premium/service-wooden-doors-decor.webp',
          '/images/providers/arkline/arkline-workshop.webp',
          '/images/providers/arkline/arkline-production.webp',
        ],
        description: 'أركلين جاهزة لدراسة وتصميم وتصنيع وتنفيذ مشروعك القادم في العين أو أبوظبي، سواء كان مطبخاً أو خزائن أو أبواباً أو أثاثاً أو كسوات وديكورات خشبية أو تجهيزاً داخلياً متكاملاً. تعرض البطاقة صوراً من هوية الورشة ونماذج مجالات عمل المزود لتوضيح قدرته على تحويل الفكرة والمقاسات والصور المرجعية إلى نطاق عمل قابل للتسعير والتنفيذ. أرسل موقع المشروع والمقاسات والمخططات والصور والخامة والتشطيب والميزانية التقريبية للحصول على مراجعة أولية وعرض سعر مناسب.',
        scope: ['فهم الفكرة واحتياج المشروع', 'مراجعة الموقع والمقاسات والصور', 'تصميم واختيار الخامات والتشطيبات', 'تصنيع وتوريد وتركيب حسب نطاق الطلب'],
        en: {
          title: 'Your Next Custom Project with ARKLEEN',
          category: 'Custom design & delivery',
          location: 'Al Ain and Abu Dhabi',
          description: 'ARKLEEN is ready to review, design, manufacture and deliver your next project in Al Ain or Abu Dhabi, whether it involves a kitchen, wardrobes, doors, furniture, wooden cladding, decorative joinery or a coordinated interior fit-out. This single card brings together verified provider imagery and the available fields of work. Share the location, dimensions, drawings, photographs, preferred materials, finish and approximate budget for an initial review and quotation.',
          scope: ['Understand the project idea and requirements', 'Review the site, dimensions and photographs', 'Coordinate design, materials and finishes', 'Manufacture, supply and install to the approved scope'],
        },
      },
    ],
  },
  alrehab: {
    id: 'BR-PROV-ALR-001',
    code: 'ALR',
    paths: ['/providers/alrehab-cleaning-sanitizing', '/en/providers/alrehab-cleaning-sanitizing'],
    base: '/images/providers/alrehab/',
    website: 'https://bietalreef.ae/providers/alrehab-cleaning-sanitizing',
    websiteEn: 'https://bietalreef.ae/en/providers/alrehab-cleaning-sanitizing',
    copy: {
      ar: {
        projectsTab: 'المشاريع', eyebrow: 'المشاريع', title: 'مشاريع وأعمال الرحاب',
        intro: 'نماذج الأعمال المنشورة توضح أنواع خدمات التنظيف التي تنفذها الرحاب، مع صور ومعلومات قبل كل مشروع تساعد العميل على فهم الخدمة المطلوبة.',
        details: 'التفاصيل', digitalEyebrow: 'الحضور الرقمي', digitalTitle: 'تواصل مع الرحاب',
      },
      en: {
        projectsTab: 'Projects', eyebrow: 'Projects', title: 'Al Rehab Projects & Work',
        intro: 'Published work examples present the cleaning services delivered by Al Rehab, with images and information before each project to help customers understand the requested service.',
        details: 'Details', digitalEyebrow: 'Digital presence', digitalTitle: 'Connect with Al Rehab',
      },
    },
    projects: [
      {
        id: 'BR-PRJ-ALR-001',
        title: 'نماذج أعمال التنظيف العميق',
        category: 'تنظيف وتعقيم احترافي',
        location: 'العين وأبوظبي ودبي',
        year: '2026',
        cover: '/images/providers/alrehab/service-sofa.webp',
        images: [
          '/images/providers/alrehab/service-sofa.webp',
          '/images/providers/alrehab/service-carpet.webp',
          '/images/providers/alrehab/service-majlis.webp',
          '/images/providers/alrehab/service-mattress.webp',
        ],
        description: 'بطاقة مشروع تجمع نماذج مصورة لتنظيف الكنب والسجاد والموكيت والمجالس والمراتب. يبدأ تقييم كل طلب بمراجعة الصور والعدد والمقاسات ونوع القماش وحالة البقع وموقع الخدمة قبل اعتماد السعر والموعد.',
        scope: ['مراجعة الصور وحالة القماش والبقع', 'تحديد العدد والمقاسات وموقع الخدمة', 'اختيار المعدات والمواد المناسبة', 'تأكيد السعر والموعد قبل التنفيذ'],
        en: {
          title: 'Deep Cleaning Work Examples',
          category: 'Professional cleaning & sanitizing',
          location: 'Al Ain, Abu Dhabi and Dubai',
          description: 'One project card brings together examples of sofa, carpet, rug, majlis and mattress cleaning. Each request starts with a review of photos, quantity, dimensions, fabric, stain condition and service location before the price and appointment are confirmed.',
          scope: ['Review photos, fabric and stain condition', 'Confirm quantity, dimensions and location', 'Select suitable equipment and products', 'Confirm price and appointment before service'],
        },
      },
    ],
  },
};

const sharedCopy = {
  ar: { unavailable: 'غير مضاف بعد', close: 'إغلاق تفاصيل المشروع', image: 'صورة', scope: 'نطاق المشروع', back: 'العودة إلى المشاريع' },
  en: { unavailable: 'Not added yet', close: 'Close project details', image: 'Image', scope: 'Project scope', back: 'Back to projects' },
};

function resolveProvider(cleanPath) {
  return Object.values(PROVIDERS).find((provider) => provider.paths.includes(cleanPath)) || null;
}

function getCopy(provider, locale) {
  return { ...sharedCopy[locale], ...provider.copy[locale] };
}

function resolveProjectMedia(provider, src) {
  return src?.startsWith('/') ? src : `${provider.base}${src}`;
}

function getDigitalChannels(provider, locale) {
  const unavailable = sharedCopy[locale].unavailable;
  const isEnglish = locale === 'en';
  return [
    {
      id: `BR-CH-${provider.code}-WEB`,
      label: isEnglish ? 'Website' : 'الموقع الإلكتروني',
      value: isEnglish ? 'Provider page on Biet Al Reef' : 'صفحة المزود داخل بيت الريف',
      href: isEnglish ? provider.websiteEn : provider.website,
      icon: Globe2,
      external: true,
      active: true,
    },
    { id: `BR-CH-${provider.code}-EMAIL`, label: isEnglish ? 'Email' : 'البريد الإلكتروني', value: unavailable, icon: Mail, active: false },
    { id: `BR-CH-${provider.code}-IG`, label: 'Instagram', value: unavailable, icon: Instagram, active: false },
    { id: `BR-CH-${provider.code}-FB`, label: 'Facebook', value: unavailable, icon: Facebook, active: false },
    { id: `BR-CH-${provider.code}-TT`, label: 'TikTok', value: unavailable, icon: Music2, active: false },
  ];
}

export default function ArklineProjectsAndChannels({ currentPath = '' }) {
  const [projectsTarget, setProjectsTarget] = useState(null);
  const [channelsTarget, setChannelsTarget] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const cleanPath = currentPath.split('?')[0];
  const locale = cleanPath.startsWith('/en/') ? 'en' : 'ar';
  const provider = resolveProvider(cleanPath);
  const isSupportedProviderPage = Boolean(provider);
  const t = provider ? getCopy(provider, locale) : sharedCopy[locale];

  useEffect(() => {
    if (!isSupportedProviderPage || typeof document === 'undefined') return undefined;

    let observer;
    let animationFrame;

    const ensureEnhancements = () => {
      const projectsTab = document.querySelector('nav a[href="#gallery"], nav a[href="#projects"], nav a[data-arkline-projects-tab="true"]');
      if (projectsTab) {
        projectsTab.href = '#projects';
        projectsTab.textContent = t.projectsTab;
        projectsTab.dataset.arklineProjectsTab = 'true';
      }

      const originalGallery = document.getElementById('gallery') || document.querySelector('[data-arkline-original-gallery="true"]');
      if (originalGallery) {
        originalGallery.dataset.arklineOriginalGallery = 'true';
        originalGallery.id = 'gallery-original';
        originalGallery.style.display = 'none';
        originalGallery.setAttribute('aria-hidden', 'true');

        let projectsHost = document.querySelector('[data-arkline-projects-host="true"]');
        if (!projectsHost) {
          projectsHost = document.createElement('section');
          projectsHost.id = 'projects';
          projectsHost.dataset.arklineProjectsHost = 'true';
          projectsHost.className = 'scroll-mt-28 border-y border-[#E6DCC8] bg-white/65 py-12 md:py-14';
          originalGallery.parentElement?.insertBefore(projectsHost, originalGallery);
        }

        setProjectsTarget((current) => (current === projectsHost ? current : projectsHost));
      }

      const overview = document.getElementById('overview');
      const mapCard = overview?.querySelector('a[href*="google.com/maps"]');
      if (mapCard?.parentElement) {
        let channelsHost = mapCard.parentElement.querySelector('[data-arkline-channels-host="true"]');
        if (!channelsHost) {
          channelsHost = document.createElement('div');
          channelsHost.dataset.arklineChannelsHost = 'true';
          channelsHost.className = 'mt-6';
          mapCard.insertAdjacentElement('afterend', channelsHost);
        }

        setChannelsTarget((current) => (current === channelsHost ? current : channelsHost));
      }
    };

    const scheduleEnsure = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(ensureEnhancements);
    };

    ensureEnhancements();
    observer = new MutationObserver(scheduleEnsure);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(animationFrame);
      observer?.disconnect();
      document.querySelector('[data-arkline-projects-host="true"]')?.remove();
      document.querySelector('[data-arkline-channels-host="true"]')?.remove();

      const originalGallery = document.querySelector('[data-arkline-original-gallery="true"]');
      if (originalGallery) {
        originalGallery.id = 'gallery';
        originalGallery.style.display = '';
        originalGallery.removeAttribute('aria-hidden');
        delete originalGallery.dataset.arklineOriginalGallery;
      }
    };
  }, [isSupportedProviderPage, provider, t.projectsTab]);

  useEffect(() => {
    if (!selectedProject || typeof document === 'undefined') return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedProject]);

  if (!isSupportedProviderPage) return null;

  return (
    <>
      {projectsTarget
        ? createPortal(
            <ProjectsSection provider={provider} locale={locale} onDetails={setSelectedProject} />,
            projectsTarget
          )
        : null}
      {channelsTarget
        ? createPortal(<DigitalChannels provider={provider} locale={locale} />, channelsTarget)
        : null}
      {selectedProject ? (
        <ProjectDetailsModal
          project={selectedProject}
          provider={provider}
          locale={locale}
          onClose={() => setSelectedProject(null)}
        />
      ) : null}
    </>
  );
}

function ProjectsSection({ provider, locale, onDetails }) {
  const t = getCopy(provider, locale);
  return (
    <div className="mx-auto max-w-6xl px-4" data-provider-id={provider.id}>
      <div>
        <span className="text-sm font-black text-[#A66B19]">{t.eyebrow}</span>
        <h2 className="mt-2 text-3xl font-black leading-tight text-[#0F3F1A] md:text-4xl">
          {t.title}
        </h2>
        <p className="mt-4 max-w-3xl leading-8 text-[#625A50]">
          {t.intro}
        </p>
      </div>

      <div className="mt-8 grid gap-5">
        {provider.projects.map((project) => {
          const localizedProject = locale === 'en' ? { ...project, ...project.en } : project;
          return (
          <ProjectCard
            key={project.id}
            project={localizedProject}
            provider={provider}
            locale={locale}
            onDetails={onDetails}
          />
          );
        })}
      </div>
    </div>
  );
}

function ProjectCard({ project, provider, locale, onDetails }) {
  const t = getCopy(provider, locale);
  return (
    <article
      data-project-id={project.id}
      className="overflow-hidden rounded-[2rem] border border-[#E3D4BA] bg-white shadow-[0_18px_48px_rgba(67,45,17,.10)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[#EFE7D8]">
        <Image
          src={resolveProjectMedia(provider, project.cover)}
          alt={project.title}
          fill
          className="object-cover transition duration-500 hover:scale-[1.02]"
          sizes="(max-width:768px) 100vw,50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <span className="absolute right-4 top-4 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-xs font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl">
          {project.category}
        </span>
        <span className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-white/90 text-[#0F3F1A] shadow-lg backdrop-blur-xl">
          <FolderKanban className="h-6 w-6" />
        </span>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xl font-black text-[#0F3F1A] md:text-2xl">
            {project.title}
          </h3>
          <span className="rounded-full bg-[#F7F1E5] px-3 py-1 text-[11px] font-black tracking-wide text-[#8A611B]">
            {project.id}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-7 text-[#625A50]">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs font-black text-[#6D5A41]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBF7EF] px-3 py-2">
            <MapPin className="h-4 w-4 text-[#A66B19]" />
            {project.location}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBF7EF] px-3 py-2">
            <CalendarDays className="h-4 w-4 text-[#A66B19]" />
            {project.year}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onDetails(project)}
          className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl border border-[#CDA63B] bg-[#FFFDF8] px-5 py-3 font-black text-[#0F3F1A] transition hover:-translate-y-0.5 hover:bg-[#FFF7DB]"
        >
          {t.details}
          <ArrowLeft className={`h-5 w-5 ${locale === 'en' ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </article>
  );
}

function DigitalChannels({ provider, locale }) {
  const t = getCopy(provider, locale);
  const digitalChannels = getDigitalChannels(provider, locale);
  const channelStyles = [
    'from-[#0F3F1A] to-[#1F6A35] text-white',
    'from-[#8F2638] to-[#C54B62] text-white',
    'from-[#7C3AED] via-[#DB2777] to-[#F59E0B] text-white',
    'from-[#1877F2] to-[#0D55B5] text-white',
    'from-[#101010] to-[#2F2F2F] text-white',
  ];

  return (
    <section
      data-provider-id={provider.id}
      aria-labelledby={`${provider.code.toLowerCase()}-digital-channels-title`}
      className="rounded-[1.6rem] border border-[#DFD1B8] bg-white/96 p-3 shadow-[0_12px_34px_rgba(67,45,17,.09)] md:p-4"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-black text-[#A66B19]">{t.digitalEyebrow}</p>
          <h3 id={`${provider.code.toLowerCase()}-digital-channels-title`} className="mt-0.5 text-sm font-black text-[#0F3F1A] md:text-base">
            {t.digitalTitle}
          </h3>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {digitalChannels.map((channel, index) => {
            const Icon = channel.icon;
            const icon = (
              <>
                <span className={`flex h-10 w-10 items-center justify-center rounded-[.9rem] md:h-11 md:w-11 md:rounded-[1rem] bg-gradient-to-br ${channelStyles[index]} shadow-[inset_0_1px_1px_rgba(255,255,255,.35),0_6px_0_rgba(44,31,12,.13),0_10px_18px_rgba(44,31,12,.14)] transition group-hover:-translate-y-0.5 group-hover:scale-105`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="sr-only">{channel.label}</span>
              </>
            );

            return channel.active ? (
              <a
                key={channel.id}
                href={channel.href}
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noopener noreferrer' : undefined}
                title={channel.label}
                aria-label={channel.label}
                className="group rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C9952A] focus:ring-offset-2"
              >
                {icon}
              </a>
            ) : (
              <span
                key={channel.id}
                title={`${channel.label} — ${t.unavailable}`}
                aria-label={`${channel.label} — ${t.unavailable}`}
                aria-disabled="true"
                className="group opacity-45 grayscale-[30%]"
              >
                {icon}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectDetailsModal({ project, provider, locale, onClose }) {
  const t = getCopy(provider, locale);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${t.details}: ${project.title}`}
      className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/55 p-0 backdrop-blur-sm md:items-center md:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-[2.2rem] bg-[#F8F4EC] shadow-2xl md:rounded-[2.2rem]">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#E4D8C4] bg-[#F8F4EC]/95 px-5 py-4 backdrop-blur-xl">
          <div>
            <p className="text-xs font-black text-[#A66B19]">{project.id}</p>
            <h3 className="mt-1 text-lg font-black text-[#0F3F1A] md:text-xl">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#DCCBAE] bg-white text-[#0F3F1A] shadow-sm"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 md:p-7">
          <div className="grid gap-4 md:grid-cols-2">
            {project.images.map((image, index) => (
              <figure
                key={`${project.id}-${image}-${index}`}
                className={`relative overflow-hidden rounded-[1.7rem] border border-[#E2D4BB] bg-white ${index === 0 ? 'md:col-span-2 aspect-[16/8]' : 'aspect-[4/3]'}`}
              >
                <Image
                  src={resolveProjectMedia(provider, image)}
                  alt={`${project.title} — ${t.image} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes={index === 0 ? '100vw' : '(max-width:768px)100vw,50vw'}
                />
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl">
                  <Images className="h-4 w-4 text-[#A66B19]" />
                  {t.image} {index + 1}
                </span>
              </figure>
            ))}
          </div>

          <div className="mt-6 rounded-[1.7rem] border border-[#E2D4BB] bg-white p-5 md:p-6">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#FFF2CF] px-4 py-2 text-xs font-black text-[#6D4A0B]">
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F8F3] px-4 py-2 text-xs font-black text-[#0F3F1A]">
                <MapPin className="h-4 w-4" />
                {project.location}
              </span>
            </div>

            <p className="mt-5 text-base leading-8 text-[#625A50]">
              {project.description}
            </p>

            <h4 className="mt-6 flex items-center gap-2 font-black text-[#0F3F1A]">
              <Ruler className="h-5 w-5 text-[#A66B19]" />
              {t.scope}
            </h4>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {project.scope.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-2xl bg-[#FBF8F2] px-4 py-3 text-sm font-bold text-[#0F3F1A]"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#A66B19]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-[#0F3F1A] px-5 py-3 font-black text-white"
          >
            {t.back}
          </button>
        </div>
      </div>
    </div>
  );
}
