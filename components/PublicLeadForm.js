import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, ImagePlus, Loader2, MessageSquareText, Phone, ShieldCheck, X } from 'lucide-react';

const emirates = ['أبوظبي', 'دبي', 'الشارقة', 'عجمان', 'رأس الخيمة', 'الفجيرة', 'أم القيوين'];
const serviceCategories = ['مقاولات وتشطيبات', 'تصميم داخلي', 'نجارة وأبواب', 'رخام وسيراميك', 'صيانة عامة', 'كهرباء وسباكة', 'مواد بناء', 'أخرى'];
const MAX_ATTACHMENTS = 4;
const MAX_ORIGINAL_IMAGE_SIZE = 8 * 1024 * 1024;
const MAX_COMPRESSED_SIZE = 1_500_000;
const MAX_IMAGE_DIMENSION = 1400;

function readUtm() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const result = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
    if (params.get(key)) result[key] = params.get(key);
  });
  return result;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('تعذر قراءة الصورة.'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('تعذر تجهيز الصورة.'));
    image.src = src;
  });
}

function dataUrlSize(dataUrl) {
  const base64 = String(dataUrl || '').split(',')[1] || '';
  return Math.ceil((base64.length * 3) / 4);
}

async function compressImage(file) {
  const source = await readFileAsDataUrl(file);
  const image = await loadImage(source);
  const ratio = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * ratio));
  const height = Math.max(1, Math.round(image.height * ratio));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(image, 0, 0, width, height);

  let quality = 0.78;
  let dataUrl = canvas.toDataURL('image/jpeg', quality);
  while (dataUrlSize(dataUrl) > MAX_COMPRESSED_SIZE && quality > 0.45) {
    quality -= 0.08;
    dataUrl = canvas.toDataURL('image/jpeg', quality);
  }
  return dataUrl;
}

async function fileToAttachment(file) {
  if (!file.type?.startsWith('image/')) throw new Error('الملفات المسموحة صور فقط.');
  if (file.size > MAX_ORIGINAL_IMAGE_SIZE) throw new Error('حجم الصورة كبير جدًا. اختر صورة أقل من 8MB.');
  const dataUrl = await compressImage(file);
  const size = dataUrlSize(dataUrl);
  if (size > MAX_COMPRESSED_SIZE) throw new Error('الصورة ما زالت كبيرة بعد الضغط. اختر صورة أوضح بحجم أقل.');
  return {
    name: file.name || 'project-image.jpg',
    type: 'image/jpeg',
    size,
    data_url: dataUrl,
  };
}

const initialState = {
  full_name: '',
  phone: '',
  email: '',
  emirate: '',
  city: '',
  inquiry_topic: '',
  message: '',
  service_category: '',
  project_type: '',
  project_area: '',
  budget_range: '',
  timeline: '',
  project_description: '',
  preferred_contact: 'whatsapp',
  accepted: false,
};

export default function PublicLeadForm({ formType = 'quote' }) {
  const isQuote = formType === 'quote';
  const [form, setForm] = useState(initialState);
  const [attachments, setAttachments] = useState([]);
  const [attachmentMessage, setAttachmentMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [serverMessage, setServerMessage] = useState('');
  const [requestNumber, setRequestNumber] = useState('');
  const [source, setSource] = useState({ source_path: '', source_page_title: '', utm: {} });

  useEffect(() => {
    setSource({
      source_path: window.location.pathname,
      source_page_title: document.title,
      utm: readUtm(),
    });
  }, []);

  const title = isQuote ? 'طلب عرض سعر' : 'إرسال استفسار';
  const description = isQuote
    ? 'اكتب تفاصيل مشروعك أو الخدمة المطلوبة وسنحوّل الطلب لمسار منظم داخل بيت الريف.'
    : 'اكتب سؤالك أو احتياجك وسنرد عليك من خلال فريق بيت الريف.';

  const canSubmit = useMemo(() => {
    if (!form.accepted) return false;
    if (!form.full_name.trim() || !form.phone.trim()) return false;
    if (isQuote) return form.project_description.trim().length >= 10;
    return form.message.trim().length >= 8;
  }, [form, isQuote]);

  function patch(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleFiles(event) {
    const files = Array.from(event.target.files || []);
    event.target.value = '';
    if (!files.length) return;
    setAttachmentMessage('');

    if (attachments.length + files.length > MAX_ATTACHMENTS) {
      setAttachmentMessage(`يمكن إرفاق ${MAX_ATTACHMENTS} صور كحد أقصى.`);
      return;
    }

    try {
      const prepared = [];
      for (const file of files) {
        prepared.push(await fileToAttachment(file));
      }
      setAttachments((current) => [...current, ...prepared].slice(0, MAX_ATTACHMENTS));
    } catch (error) {
      setAttachmentMessage(error?.message || 'تعذر إرفاق الصور.');
    }
  }

  function removeAttachment(index) {
    setAttachments((current) => current.filter((_, i) => i !== index));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit || status === 'submitting') return;
    setStatus('submitting');
    setServerMessage('');
    setRequestNumber('');

    const payload = {
      ...form,
      ...source,
      attachments,
    };

    try {
      const response = await fetch('/api/public-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType, payload }),
      });
      const data = await response.json();
      if (!response.ok || !data?.ok) throw new Error(data?.message || 'تعذر إرسال الطلب');
      setStatus('success');
      setRequestNumber(data.request_number || '');
      setServerMessage('تم استلام الطلب بنجاح. سنعود إليك قريبًا بإذن الله.');
      setForm(initialState);
      setAttachments([]);
      setAttachmentMessage('');
    } catch (error) {
      setStatus('error');
      setServerMessage(error?.message || 'تعذر إرسال الطلب الآن. حاول مرة أخرى.');
    }
  }

  return (
    <section dir="rtl" className="mx-auto max-w-4xl px-4 py-10 md:py-14">
      <div className="mb-6 rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-xl shadow-[#0F3F1A]/7 md:p-8">
        <div className="mb-6 flex flex-col gap-4 text-center md:flex-row md:items-center md:text-right">
          <div className="mx-auto flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-[#0F3F1A] text-white shadow-lg shadow-[#0F3F1A]/20 md:mx-0">
            {isQuote ? <MessageSquareText className="h-8 w-8" /> : <Phone className="h-8 w-8" />}
          </div>
          <div>
            <p className="text-sm font-black text-[#6F5400]">بيت الريف — نموذج مبدئي</p>
            <h1 className="mt-1 text-3xl font-black text-[#0F3F1A] md:text-4xl">{title}</h1>
            <p className="mt-3 text-sm font-semibold leading-8 text-gray-600 md:text-base">{description}</p>
          </div>
        </div>

        {status === 'success' ? (
          <div className="rounded-[1.75rem] border border-green-200 bg-green-50 p-6 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
            <h2 className="mt-3 text-2xl font-black text-green-800">تم استلام الطلب</h2>
            <p className="mt-2 font-bold text-green-700">{serverMessage}</p>
            {requestNumber ? <p className="mt-3 rounded-2xl bg-white px-4 py-3 text-lg font-black text-[#0F3F1A]">رقم الطلب: {requestNumber}</p> : null}
            <button type="button" onClick={() => setStatus('idle')} className="mt-5 inline-flex items-center justify-center rounded-2xl bg-[#0F3F1A] px-6 py-3 font-black text-white">إرسال طلب آخر</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="الاسم" required>
                <input value={form.full_name} onChange={(e) => patch('full_name', e.target.value)} className="input" placeholder="اكتب اسمك" />
              </Field>
              <Field label="رقم الهاتف / واتساب" required>
                <input value={form.phone} onChange={(e) => patch('phone', e.target.value)} className="input" dir="ltr" inputMode="tel" placeholder="05xxxxxxxx" />
              </Field>
              <Field label="البريد الإلكتروني">
                <input value={form.email} onChange={(e) => patch('email', e.target.value)} className="input" dir="ltr" type="email" placeholder="name@email.com" />
              </Field>
              <Field label="طريقة التواصل المفضلة">
                <select value={form.preferred_contact} onChange={(e) => patch('preferred_contact', e.target.value)} className="input">
                  <option value="whatsapp">واتساب</option>
                  <option value="phone">اتصال</option>
                  <option value="email">بريد إلكتروني</option>
                </select>
              </Field>
              <Field label="الإمارة">
                <select value={form.emirate} onChange={(e) => patch('emirate', e.target.value)} className="input">
                  <option value="">اختر الإمارة</option>
                  {emirates.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </Field>
              <Field label="المدينة / المنطقة">
                <input value={form.city} onChange={(e) => patch('city', e.target.value)} className="input" placeholder="مثال: العين، الشامخة، دبي" />
              </Field>
            </div>

            {isQuote ? (
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="نوع الخدمة">
                  <select value={form.service_category} onChange={(e) => patch('service_category', e.target.value)} className="input">
                    <option value="">اختر نوع الخدمة</option>
                    {serviceCategories.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </Field>
                <Field label="نوع المشروع">
                  <input value={form.project_type} onChange={(e) => patch('project_type', e.target.value)} className="input" placeholder="مثال: فيلا، شقة، محل، مكتب" />
                </Field>
                <Field label="المساحة / الكمية">
                  <input value={form.project_area} onChange={(e) => patch('project_area', e.target.value)} className="input" placeholder="مثال: 120 متر أو 8 أبواب" />
                </Field>
                <Field label="الميزانية التقريبية">
                  <input value={form.budget_range} onChange={(e) => patch('budget_range', e.target.value)} className="input" placeholder="اختياري" />
                </Field>
                <Field label="موعد التنفيذ">
                  <input value={form.timeline} onChange={(e) => patch('timeline', e.target.value)} className="input" placeholder="مثال: خلال أسبوعين" />
                </Field>
                <div className="md:col-span-2">
                  <Field label="تفاصيل الطلب" required>
                    <textarea value={form.project_description} onChange={(e) => patch('project_description', e.target.value)} className="input min-h-[150px]" placeholder="اكتب تفاصيل العمل المطلوب، المقاسات، الموقع، أي ملاحظات مهمة..." />
                  </Field>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Field label="موضوع الاستفسار">
                  <input value={form.inquiry_topic} onChange={(e) => patch('inquiry_topic', e.target.value)} className="input" placeholder="مثال: طريقة طلب خدمة / التسجيل / الأسعار" />
                </Field>
                <Field label="الرسالة" required>
                  <textarea value={form.message} onChange={(e) => patch('message', e.target.value)} className="input min-h-[150px]" placeholder="اكتب استفسارك هنا..." />
                </Field>
              </div>
            )}

            <div className="rounded-2xl border border-dashed border-[#D4AF37]/60 bg-[#FFF8E7] p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-black text-[#0F3F1A]">إرفاق صور</p>
                  <p className="mt-1 text-xs font-bold leading-6 text-gray-600">اختياري — أضف صورًا للمكان، المقاسات، الخامة، أو المشكلة. الحد الأقصى {MAX_ATTACHMENTS} صور.</p>
                </div>
                <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#0F3F1A] shadow-sm ring-1 ring-[#E6DCC8]">
                  <ImagePlus className="h-5 w-5 text-[#B0912F]" />
                  اختيار صور
                  <input type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
                </label>
              </div>
              {attachmentMessage ? <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-black text-red-700">{attachmentMessage}</p> : null}
              {attachments.length > 0 ? (
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                  {attachments.map((item, index) => (
                    <div key={`${item.name}-${index}`} className="relative overflow-hidden rounded-2xl border border-[#E6DCC8] bg-white p-2">
                      <img src={item.data_url} alt={item.name} className="h-24 w-full rounded-xl object-cover" />
                      <button type="button" onClick={() => removeAttachment(index)} className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[#0F3F1A] shadow">
                        <X className="h-4 w-4" />
                      </button>
                      <p className="mt-2 truncate text-[11px] font-bold text-gray-600" title={item.name}>{item.name}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] p-4 text-sm font-bold leading-7 text-gray-700">
              <input type="checkbox" checked={form.accepted} onChange={(e) => patch('accepted', e.target.checked)} className="mt-1 h-5 w-5 accent-[#0F3F1A]" />
              <span>أوافق على استخدام بياناتي والصور المرفقة للتواصل بخصوص هذا الطلب فقط، وفق سياسة الخصوصية في بيت الريف.</span>
            </label>

            {status === 'error' ? <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-black text-red-700">{serverMessage}</div> : null}

            <button disabled={!canSubmit || status === 'submitting'} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-6 py-4 text-lg font-black text-white shadow-lg shadow-[#0F3F1A]/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50">
              {status === 'submitting' ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
              {status === 'submitting' ? 'جاري الإرسال...' : isQuote ? 'إرسال طلب عرض السعر' : 'إرسال الاستفسار'}
              <ArrowLeft className="h-5 w-5" />
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid #E6DCC8;
          background: #fff;
          padding: 0.95rem 1rem;
          font-weight: 700;
          color: #0F3F1A;
          outline: none;
        }
        .input:focus {
          border-color: #0F3F1A;
          box-shadow: 0 0 0 3px rgba(15, 63, 26, 0.10);
        }
      `}</style>
    </section>
  );
}

function Field({ label, required = false, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-[#0F3F1A]">
        {label} {required ? <span className="text-[#B0912F]">*</span> : null}
      </span>
      {children}
    </label>
  );
}
