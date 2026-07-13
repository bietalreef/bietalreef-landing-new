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

function buildSupportMessage(type) {
  const isReview = type === 'review';

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
  const isArklinePage = currentPath.split('?')[0] === '/providers/arkline';

  useEffect(() => {
    if (!isArklinePage || typeof document === 'undefined') return undefined;

    let observer;
    let animationFrame;

    const ensureEnhancements = () => {
      const tabLink = document.querySelector('nav a[href="#faq"], nav a[data-arkline-reviews-tab="true"]');
      if (tabLink) {
        tabLink.href = '#reviews';
        tabLink.textContent = 'التقييمات والشكاوى';
        tabLink.dataset.arklineReviewsTab = 'true';
      }

      const overview = document.getElementById('overview');
      if (overview) {
        const joinedTitle = Array.from(overview.querySelectorAll('p')).find(
          (node) => node.textContent?.trim() === 'تاريخ الانضمام'
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

          if (workingHoursTarget !== hoursSlot) setWorkingHoursTarget(hoursSlot);
        }
      }

      const faqSection = document.getElementById('faq');
      const main = faqSection?.parentElement;

      if (faqSection && main) {
        faqSection.style.display = 'none';
        faqSection.setAttribute('aria-hidden', 'true');

        let reviewsHost = document.querySelector('[data-arkline-reviews-host="true"]');
        if (!reviewsHost) {
          reviewsHost = document.createElement('section');
          reviewsHost.id = 'reviews';
          reviewsHost.dataset.arklineReviewsHost = 'true';
          reviewsHost.className = 'scroll-mt-28 mx-auto max-w-6xl px-4 py-14';
          main.insertBefore(reviewsHost, faqSection);
        }

        if (reviewsTarget !== reviewsHost) setReviewsTarget(reviewsHost);
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

      document.querySelector('[data-arkline-working-hours-slot="true"]')?.remove();
      document.querySelector('[data-arkline-reviews-host="true"]')?.remove();

      const faqSection = document.getElementById('faq');
      if (faqSection) {
        faqSection.style.display = '';
        faqSection.removeAttribute('aria-hidden');
      }
    };
  }, [isArklinePage, reviewsTarget, workingHoursTarget]);

  if (!isArklinePage) return null;

  return (
    <>
      {workingHoursTarget
        ? createPortal(<WorkingHoursCard />, workingHoursTarget)
        : null}
      {reviewsTarget
        ? createPortal(<ReviewsAndComplaints />, reviewsTarget)
        : null}
    </>
  );
}

function WorkingHoursCard() {
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
        <p className="text-[11px] font-black text-[#A66B19]">مواعيد العمل</p>
        <p className="mt-1 text-sm font-black leading-6 text-[#0F3F1A]">
          السبت إلى الخميس — بتنسيق مسبق
        </p>
        <p className="text-[11px] font-bold leading-5 text-[#6A6258]">
          الجمعة حسب الموعد
        </p>
      </div>
    </article>
  );
}

function ReviewsAndComplaints() {
  const reviewMessage = buildSupportMessage('review');
  const complaintMessage = buildSupportMessage('complaint');

  return (
    <div data-provider-id={PROVIDER_ID}>
      <div className="text-center">
        <span className="text-sm font-black text-[#A66B19]">جودة التعامل وحماية العميل</span>
        <h2 className="mt-2 text-3xl font-black leading-tight text-[#0F3F1A] md:text-4xl">
          التقييمات والشكاوى
        </h2>
        <p className="mx-auto mt-4 max-w-3xl leading-8 text-[#625A50]">
          شارك تجربتك بعد التعامل الفعلي مع أركلين، أو أرسل شكوى وملاحظة خاصة إلى فريق بيت الريف لمراجعتها ومتابعتها بسرية.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <article className="rounded-[2rem] border border-[#E6DCC8] bg-white p-5 shadow-[0_16px_42px_rgba(67,45,17,.09)] md:p-7">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFECA8] via-[#E1B33B] to-[#A86F14] text-[#17351E] shadow-[0_8px_0_rgba(123,78,10,.16),0_16px_28px_rgba(123,78,10,.16)]">
              <Star className="h-7 w-7" />
            </span>
            <div>
              <p className="text-xs font-black text-[#A66B19]">تجارب العملاء</p>
              <h3 className="mt-1 text-xl font-black text-[#0F3F1A]">تقييم مزود الخدمة</h3>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-[#EDE3D2] bg-[#FBF8F2] p-4">
            <p className="font-black text-[#0F3F1A]">لا توجد تقييمات منشورة حتى الآن</p>
            <p className="mt-2 text-sm leading-7 text-[#625A50]">
              تُراجع التقييمات قبل نشرها للتأكد من ارتباطها بخدمة أو طلب فعلي وحماية الطرفين من التقييمات غير الموثوقة.
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
            إضافة تقييم موثق
          </a>
        </article>

        <article className="rounded-[2rem] border border-[#E6DCC8] bg-white p-5 shadow-[0_16px_42px_rgba(67,45,17,.09)] md:p-7">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FFF2CF] text-[#0F3F1A] shadow-[0_8px_0_rgba(123,78,10,.10),0_16px_28px_rgba(123,78,10,.12)]">
              <ShieldAlert className="h-7 w-7" />
            </span>
            <div>
              <p className="text-xs font-black text-[#A66B19]">قناة خاصة وآمنة</p>
              <h3 className="mt-1 text-xl font-black text-[#0F3F1A]">الشكاوى والملاحظات</h3>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-[#EDE3D2] bg-[#FBF8F2] p-4">
            <p className="font-black text-[#0F3F1A]">الشكاوى لا تُعرض للعامة</p>
            <p className="mt-2 text-sm leading-7 text-[#625A50]">
              تصل الشكوى مباشرة إلى فريق بيت الريف، وتُراجع مع بيانات الطلب والمرفقات قبل التواصل مع الأطراف المعنية.
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
            تقديم شكوى أو ملاحظة
          </a>
        </article>
      </div>
    </div>
  );
}
