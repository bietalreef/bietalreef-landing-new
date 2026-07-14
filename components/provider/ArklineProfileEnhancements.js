import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  BadgeCheck,
  Clock3,
  MessageCircle,
  ShieldAlert,
  Star,
} from 'lucide-react';

const BIET_AL_REEF_WHATSAPP = '971567856001';
const PROVIDER_ID = 'BR-PROV-ARK-001';
const PROVIDER_NAME = 'أركلين لأعمال النجارة والتصميم الداخلي';
const PREVIEW_LOGO = '/images/providers/arkleen-logo.png?v=5701b2c';

const copy = {
  ar: {
    providerName: PROVIDER_NAME, tab: 'التقييمات والشكاوى', joined: 'تاريخ الانضمام', hours: 'مواعيد العمل',
    hoursMain: 'السبت إلى الخميس — بتنسيق مسبق', hoursNote: 'الجمعة حسب الموعد', eyebrow: 'جودة التعامل وحماية العميل',
    title: 'التقييمات والشكاوى', intro: 'شارك تجربتك بعد التعامل الفعلي مع أركلين، أو أرسل شكوى وملاحظة خاصة إلى فريق بيت الريف لمراجعتها ومتابعتها بسرية.',
    reviewEyebrow: 'تجارب العملاء', reviewTitle: 'تقييم مزود الخدمة', emptyTitle: 'لا توجد تقييمات منشورة حتى الآن',
    emptyBody: 'تُراجع التقييمات قبل نشرها للتأكد من ارتباطها بخدمة أو طلب فعلي وحماية الطرفين من التقييمات غير الموثوقة.',
    addReview: 'إضافة تقييم موثق', complaintEyebrow: 'قناة خاصة وآمنة', complaintTitle: 'الشكاوى والملاحظات',
    privateTitle: 'الشكاوى لا تُعرض للعامة', privateBody: 'تصل الشكوى مباشرة إلى فريق بيت الريف، وتُراجع مع بيانات الطلب والمرفقات قبل التواصل مع الأطراف المعنية.',
    addComplaint: 'تقديم شكوى أو ملاحظة',
  },
  en: {
    providerName: 'Arkline Carpentry & Interior Design', tab: 'Reviews & Complaints', joined: 'Joined', hours: 'Business hours',
    hoursMain: 'Saturday to Thursday — by prior arrangement', hoursNote: 'Friday by appointment', eyebrow: 'Service quality & customer protection',
    title: 'Reviews & Complaints', intro: 'Share your experience after a completed service, or send a private complaint or note to the Biet Al Reef team for confidential review and follow-up.',
    reviewEyebrow: 'Customer experiences', reviewTitle: 'Rate this provider', emptyTitle: 'No published reviews yet',
    emptyBody: 'Reviews are checked before publication to confirm that they relate to a genuine service or request and to protect both parties from unreliable feedback.',
    addReview: 'Add a verified review', complaintEyebrow: 'Private & secure channel', complaintTitle: 'Complaints & notes',
    privateTitle: 'Complaints are not shown publicly', privateBody: 'Your complaint goes directly to the Biet Al Reef team and is reviewed with the request details and attachments before the relevant parties are contacted.',
    addComplaint: 'Submit a complaint or note',
  },
};

function buildSupportMessage(type, locale) {
  const isReview = type === 'review';
  const t = copy[locale];

  if (locale === 'en') {
    return encodeURIComponent([
      `Hello, I would like to ${isReview ? 'add a review' : 'submit a complaint or note'} about “${t.providerName}” through Biet Al Reef.`,
      '', `Provider ID: ${PROVIDER_ID}`, `Request type: ${isReview ? 'Provider review' : 'Private complaint or note'}`, '',
      isReview ? 'I will provide the service received, transaction date and details of my experience.' : 'Please handle this complaint confidentially. I will provide the request details and any available documents or photos.',
    ].join('\n'));
  }

  return encodeURIComponent(
    [
      `مرحباً، أرغب في ${isReview ? 'إضافة تقييم' : 'تقديم شكوى أو ملاحظة'} بخصوص مزود الخدمة «${PROVIDER_NAME}» عبر منصة بيت الريف.`,
      '',
      `معرف المزود: ${PROVIDER_ID}`,
      `نوع الطلب: ${isReview ? 'تقييم مزود خدمة' : 'شكوى أو ملاحظة خاصة'}`,
      '',
      isReview
        ? 'سأوضح الخدمة التي حصلت عليها وتاريخ التعامل وتفاصيل تجربتي.'
        : 'أرجو التعامل مع الشكوى بسرية، وسأرسل تفاصيل الطلب والمستندات أو الصور المتوفرة.',
    ].join('\n')
  );
}

export default function ArklineProfileEnhancements({ currentPath = '' }) {
  const [workingHoursTarget, setWorkingHoursTarget] = useState(null);
  const [reviewsTarget, setReviewsTarget] = useState(null);
  const cleanPath = currentPath.split('?')[0];
  const locale = cleanPath.startsWith('/en/') ? 'en' : 'ar';
  const t = copy[locale];
  const isArklinePage = ['/providers/arkline', '/providers/arkleen', '/en/providers/arkline', '/en/providers/arkleen'].includes(cleanPath);

  useEffect(() => {
    if (!isArklinePage || typeof document === 'undefined') return undefined;

    let observer;
    let animationFrame;

    const ensureEnhancements = () => {
      document
        .querySelectorAll('img[alt="شعار أركلين لأعمال النجارة والتصميم الداخلي"], img[alt="Arkline Carpentry & Interior Design logo"], img[alt="ARKLEEN Carpentry & Interior Design logo"]')
        .forEach((logoImage) => {
          if (logoImage.getAttribute('src') !== PREVIEW_LOGO) {
            logoImage.setAttribute('src', PREVIEW_LOGO);
          }

          if (logoImage.hasAttribute('srcset')) {
            logoImage.removeAttribute('srcset');
          }

          logoImage.setAttribute('data-arkline-logo-preview', 'white-brand-logo');
          logoImage.style.backgroundColor = '#ffffff';
          logoImage.style.objectFit = 'contain';
          logoImage.style.padding = '0.35rem';
        });

      const tabLink = document.querySelector('nav a[href="#faq"], nav a[data-arkline-reviews-tab="true"]');
      if (tabLink) {
        tabLink.href = '#reviews';
        tabLink.textContent = t.tab;
        tabLink.dataset.arklineReviewsTab = 'true';
      }

      const overview = document.getElementById('overview');
      if (overview) {
        const joinedTitle = Array.from(overview.querySelectorAll('p')).find(
          (node) => node.textContent?.trim() === t.joined
        );
        const infoGrid = joinedTitle?.closest('article')?.parentElement;

        if (infoGrid) {
          infoGrid.classList.add('lg:grid-cols-4');
          let hoursSlot = infoGrid.querySelector('[data-arkline-working-hours-slot="true"]');

          if (!hoursSlot) {
            hoursSlot = document.createElement('div');
            hoursSlot.dataset.arklineWorkingHoursSlot = 'true';
            hoursSlot.style.display = 'contents';
            infoGrid.appendChild(hoursSlot);
          }

          setWorkingHoursTarget((current) => (current === hoursSlot ? current : hoursSlot));
        }
      }

      const faqSection = document.getElementById('faq');
      const main = faqSection?.parentElement;

      if (faqSection && main) {
        let reviewsHost = document.querySelector('[data-arkline-reviews-host="true"]');
        if (!reviewsHost) {
          reviewsHost = document.createElement('section');
          reviewsHost.id = 'reviews';
          reviewsHost.dataset.arklineReviewsHost = 'true';
          reviewsHost.className = 'scroll-mt-28 mx-auto max-w-6xl px-4 py-14';
          main.insertBefore(reviewsHost, faqSection);
        }

        setReviewsTarget((current) => (current === reviewsHost ? current : reviewsHost));
      }
    };

    const scheduleEnsure = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(ensureEnhancements);
    };

    ensureEnhancements();
    observer = new MutationObserver(scheduleEnsure);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'srcset'],
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      observer?.disconnect();
      document.querySelector('[data-arkline-working-hours-slot="true"]')?.remove();
      document.querySelector('[data-arkline-reviews-host="true"]')?.remove();
    };
  }, [isArklinePage, t.joined, t.tab]);

  if (!isArklinePage) return null;

  return (
    <>
      {workingHoursTarget
        ? createPortal(<WorkingHoursCard locale={locale} />, workingHoursTarget)
        : null}
      {reviewsTarget
        ? createPortal(<ReviewsAndComplaints locale={locale} />, reviewsTarget)
        : null}
    </>
  );
}

function WorkingHoursCard({ locale }) {
  const t = copy[locale];
  return (
    <article
      data-provider-id={PROVIDER_ID}
      data-info-type="business-hours"
      className="flex min-h-[78px] items-center gap-3 rounded-[1.35rem] border border-[#E6DCC8] bg-white/90 px-4 py-3 shadow-[0_10px_24px_rgba(67,45,17,.07)]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF2CF] text-[#0F3F1A] shadow-inner">
        <Clock3 className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-black text-[#A66B19]">{t.hours}</p>
        <p className="mt-1 text-sm font-black leading-6 text-[#0F3F1A]">
          {t.hoursMain}
        </p>
        <p className="text-[11px] font-bold leading-5 text-[#6A6258]">
          {t.hoursNote}
        </p>
      </div>
    </article>
  );
}

function ReviewsAndComplaints({ locale }) {
  const t = copy[locale];
  const reviewMessage = buildSupportMessage('review', locale);
  const complaintMessage = buildSupportMessage('complaint', locale);

  return (
    <div data-provider-id={PROVIDER_ID}>
      <div className="text-center">
        <span className="text-sm font-black text-[#A66B19]">{t.eyebrow}</span>
        <h2 className="mt-2 text-3xl font-black leading-tight text-[#0F3F1A] md:text-4xl">
          {t.title}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl leading-8 text-[#625A50]">
          {t.intro}
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <article className="rounded-[2rem] border border-[#E6DCC8] bg-white p-5 shadow-[0_16px_42px_rgba(67,45,17,.09)] md:p-7">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFECA8] via-[#E1B33B] to-[#A86F14] text-[#17351E] shadow-[0_8px_0_rgba(123,78,10,.16),0_16px_28px_rgba(123,78,10,.16)]">
              <Star className="h-7 w-7" />
            </span>
            <div>
              <p className="text-xs font-black text-[#A66B19]">{t.reviewEyebrow}</p>
              <h3 className="mt-1 text-xl font-black text-[#0F3F1A]">{t.reviewTitle}</h3>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-[#EDE3D2] bg-[#FBF8F2] p-4">
            <p className="font-black text-[#0F3F1A]">{t.emptyTitle}</p>
            <p className="mt-2 text-sm leading-7 text-[#625A50]">
              {t.emptyBody}
            </p>
          </div>

          <a
            href={`https://wa.me/${BIET_AL_REEF_WHATSAPP}?text=${reviewMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            data-action-id="BR-REV-ARK-NEW"
            className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-4 py-3 text-sm font-black text-white shadow-[0_7px_0_rgba(5,37,13,.16)]"
          >
            <BadgeCheck className="h-5 w-5 text-[#F4CA61]" />
            {t.addReview}
          </a>
        </article>

        <article className="rounded-[2rem] border border-[#E6DCC8] bg-white p-5 shadow-[0_16px_42px_rgba(67,45,17,.09)] md:p-7">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FFF2CF] text-[#0F3F1A] shadow-[0_8px_0_rgba(123,78,10,.10),0_16px_28px_rgba(123,78,10,.12)]">
              <ShieldAlert className="h-7 w-7" />
            </span>
            <div>
              <p className="text-xs font-black text-[#A66B19]">{t.complaintEyebrow}</p>
              <h3 className="mt-1 text-xl font-black text-[#0F3F1A]">{t.complaintTitle}</h3>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-[#EDE3D2] bg-[#FBF8F2] p-4">
            <p className="font-black text-[#0F3F1A]">{t.privateTitle}</p>
            <p className="mt-2 text-sm leading-7 text-[#625A50]">
              {t.privateBody}
            </p>
          </div>

          <a
            href={`https://wa.me/${BIET_AL_REEF_WHATSAPP}?text=${complaintMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            data-action-id="BR-CMP-ARK-NEW"
            className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl border border-[#D8C8AA] bg-white px-4 py-3 text-sm font-black text-[#0F3F1A]"
          >
            <MessageCircle className="h-5 w-5 text-[#159447]" />
            {t.addComplaint}
          </a>
        </article>
      </div>
    </div>
  );
}
