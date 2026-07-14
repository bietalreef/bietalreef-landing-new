import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
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

const PROVIDER_ID = 'BR-PROV-ARK-001';
const PROVIDER_BASE = '/images/providers/arkline/';
const WEBSITE_URL = 'https://bietalreef.ae/providers/arkline';

const projects = [
  {
    id: 'BR-PRJ-ARK-001',
    title: 'واجهة وهوية ورشة أركلين',
    category: 'تجهيز واجهات',
    location: 'العين – مزيد',
    year: '2026',
    cover: 'arkline-hero-exterior.webp',
    images: ['arkline-hero-exterior.webp', 'arkline-workshop.webp'],
    description: 'تجهيز واجهة الورشة وإظهار الهوية البصرية للنشاط بصورة واضحة ومتناسقة مع مجال النجارة والتصميم الداخلي.',
    scope: ['تصميم الواجهة', 'تنظيم لوحة النشاط', 'إظهار بيانات التواصل', 'توحيد الهوية البصرية'],
  },
  {
    id: 'BR-PRJ-ARK-002',
    title: 'تجهيز ورشة النجارة والإنتاج',
    category: 'تجهيز ورش',
    location: 'العين – مزيد',
    year: '2026',
    cover: 'arkline-workshop.webp',
    images: ['arkline-workshop.webp', 'arkline-production.webp'],
    description: 'تنظيم مساحة الورشة ومناطق العمل والمعدات بما يخدم مراحل القص والتجميع والتشطيب للأعمال الخشبية.',
    scope: ['تنظيم مناطق العمل', 'توزيع المعدات', 'مسارات الإنتاج', 'تجهيز مساحة التصنيع'],
  },
  {
    id: 'BR-PRJ-ARK-003',
    title: 'مساحة التصميم والتشطيبات الداخلية',
    category: 'تصميم داخلي',
    location: 'العين',
    year: '2026',
    cover: 'arkline-showroom.webp',
    images: ['arkline-showroom.webp', 'arkline-hero-exterior.webp'],
    description: 'مساحة مخصصة لمراجعة الخامات والألوان والتفاصيل الداخلية قبل اعتماد الأعمال الخشبية والتنفيذ.',
    scope: ['مراجعة الخامات', 'اختيار التشطيبات', 'تنسيق الألوان', 'تجهيز نماذج التنفيذ'],
  },
  {
    id: 'BR-PRJ-ARK-004',
    title: 'خط إنتاج وتصنيع الأعمال الخشبية',
    category: 'إنتاج وتصنيع',
    location: 'العين – مزيد',
    year: '2026',
    cover: 'arkline-production.webp',
    images: ['arkline-production.webp', 'arkline-workshop.webp'],
    description: 'عرض منطقة الإنتاج والمعدات المستخدمة في تجهيز وتصنيع المطابخ والخزائن والأبواب والأعمال الخشبية حسب المقاس.',
    scope: ['قص وتجهيز الخشب', 'تصنيع حسب المقاس', 'تجميع القطع', 'التشطيب قبل التركيب'],
  },
];

const digitalChannels = [
  {
    id: 'BR-CH-ARK-WEB',
    label: 'الموقع الإلكتروني',
    value: 'صفحة أركلين داخل بيت الريف',
    href: WEBSITE_URL,
    icon: Globe2,
    external: true,
    active: true,
  },
  {
    id: 'BR-CH-ARK-EMAIL',
    label: 'البريد الإلكتروني',
    value: 'غير مضاف بعد',
    icon: Mail,
    active: false,
  },
  {
    id: 'BR-CH-ARK-IG',
    label: 'Instagram',
    value: 'غير مضاف بعد',
    icon: Instagram,
    active: false,
  },
  {
    id: 'BR-CH-ARK-FB',
    label: 'Facebook',
    value: 'غير مضاف بعد',
    icon: Facebook,
    active: false,
  },
  {
    id: 'BR-CH-ARK-TT',
    label: 'TikTok',
    value: 'غير مضاف بعد',
    icon: Music2,
    active: false,
  },
];

export default function ArklineProjectsAndChannels({ currentPath = '' }) {
  const [projectsTarget, setProjectsTarget] = useState(null);
  const [channelsTarget, setChannelsTarget] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const isArklinePage = ['/providers/arkline', '/providers/arkleen'].includes(currentPath.split('?')[0]);

  useEffect(() => {
    if (!isArklinePage || typeof document === 'undefined') return undefined;

    let observer;
    let animationFrame;

    const ensureEnhancements = () => {
      const projectsTab = document.querySelector('nav a[href="#gallery"], nav a[href="#projects"], nav a[data-arkline-projects-tab="true"]');
      if (projectsTab) {
        projectsTab.href = '#projects';
        projectsTab.textContent = 'المشاريع';
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
  }, [isArklinePage]);

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

  if (!isArklinePage) return null;

  return (
    <>
      {projectsTarget
        ? createPortal(
            <ProjectsSection onDetails={setSelectedProject} />,
            projectsTarget
          )
        : null}
      {channelsTarget
        ? createPortal(<DigitalChannels />, channelsTarget)
        : null}
      {selectedProject ? (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      ) : null}
    </>
  );
}

function ProjectsSection({ onDetails }) {
  return (
    <div className="mx-auto max-w-6xl px-4" data-provider-id={PROVIDER_ID}>
      <div>
        <span className="text-sm font-black text-[#A66B19]">المشاريع</span>
        <h2 className="mt-2 text-3xl font-black leading-tight text-[#0F3F1A] md:text-4xl">
          مشاريع وأعمال أركلين
        </h2>
        <p className="mt-4 max-w-3xl leading-8 text-[#625A50]">
          كل مشروع له بطاقة مستقلة ومعرف خاص وصور وتفاصيل يمكن فتحها داخل الصفحة دون الانتقال إلى رابط أو مسار جديد.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onDetails={onDetails}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, onDetails }) {
  return (
    <article
      data-project-id={project.id}
      className="overflow-hidden rounded-[2rem] border border-[#E3D4BA] bg-white shadow-[0_18px_48px_rgba(67,45,17,.10)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[#EFE7D8]">
        <Image
          src={`${PROVIDER_BASE}${project.cover}`}
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
          التفاصيل
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>
    </article>
  );
}

function DigitalChannels() {
  return (
    <section data-provider-id={PROVIDER_ID} aria-labelledby="arkline-digital-channels-title">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF2CF] text-[#0F3F1A] shadow-inner">
          <Globe2 className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-black text-[#A66B19]">الحضور الرقمي</p>
          <h3 id="arkline-digital-channels-title" className="text-xl font-black text-[#0F3F1A]">
            قنوات أركلين الإلكترونية
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {digitalChannels.map((channel) => {
          const Icon = channel.icon;
          const content = (
            <>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF2CF] text-[#0F3F1A] shadow-inner">
                <Icon className="h-5 w-5" />
              </span>
              <span className="mt-3 block text-sm font-black text-[#0F3F1A]">
                {channel.label}
              </span>
              <span className="mt-1 block text-[11px] font-bold leading-5 text-[#756A5C]">
                {channel.value}
              </span>
              {channel.active ? (
                <ExternalLink className="absolute left-3 top-3 h-4 w-4 text-[#A66B19]" />
              ) : null}
            </>
          );

          if (!channel.active) {
            return (
              <div
                key={channel.id}
                aria-disabled="true"
                className="relative min-h-[132px] rounded-[1.5rem] border border-[#E7DCC8] bg-white/65 p-4 opacity-75 shadow-[0_10px_25px_rgba(67,45,17,.06)]"
              >
                {content}
              </div>
            );
          }

          return (
            <a
              key={channel.id}
              href={channel.href}
              target={channel.external ? '_blank' : undefined}
              rel={channel.external ? 'noopener noreferrer' : undefined}
              className="group relative min-h-[132px] rounded-[1.5rem] border border-[#DCCBAE] bg-white p-4 shadow-[0_10px_25px_rgba(67,45,17,.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(67,45,17,.12)]"
            >
              {content}
            </a>
          );
        })}
      </div>
    </section>
  );
}

function ProjectDetailsModal({ project, onClose }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`تفاصيل ${project.title}`}
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
            aria-label="إغلاق تفاصيل المشروع"
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
                  src={`${PROVIDER_BASE}${image}`}
                  alt={`${project.title} — صورة ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes={index === 0 ? '100vw' : '(max-width:768px)100vw,50vw'}
                />
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl">
                  <Images className="h-4 w-4 text-[#A66B19]" />
                  صورة {index + 1}
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
              نطاق المشروع
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
            العودة إلى المشاريع
          </button>
        </div>
      </div>
    </div>
  );
}
