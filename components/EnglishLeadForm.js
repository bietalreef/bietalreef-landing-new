import { useMemo, useState } from 'react';
import { CheckCircle2, Loader2, MessageSquareText, Phone } from 'lucide-react';

const emirates = ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'];
const serviceCategories = ['Contracting and finishing', 'Interior design', 'Carpentry and doors', 'Marble and ceramic', 'General maintenance', 'Electrical and plumbing', 'Building materials', 'Other'];

const initialState = {
  full_name: '',
  phone: '',
  email: '',
  emirate: '',
  city: '',
  service_category: '',
  project_type: '',
  project_area: '',
  budget_range: '',
  timeline: '',
  project_description: '',
  message: '',
  preferred_contact: 'whatsapp',
  accepted: false,
};

export default function EnglishLeadForm({ formType = 'quote' }) {
  const isQuote = formType === 'quote';
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('idle');
  const [serverMessage, setServerMessage] = useState('');
  const [requestNumber, setRequestNumber] = useState('');

  const canSubmit = useMemo(() => {
    if (!form.accepted) return false;
    if (!form.full_name.trim() || !form.phone.trim()) return false;
    return isQuote ? form.project_description.trim().length >= 10 : form.message.trim().length >= 8;
  }, [form, isQuote]);

  function patch(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit || status === 'submitting') return;
    setStatus('submitting');
    setServerMessage('');
    setRequestNumber('');

    const payload = {
      ...form,
      source_path: typeof window !== 'undefined' ? window.location.pathname : '',
      source_page_title: typeof document !== 'undefined' ? document.title : '',
      attachments: [],
    };

    try {
      const response = await fetch('/api/public-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType, payload }),
      });
      const data = await response.json();
      if (!response.ok || !data?.ok) throw new Error(data?.message || 'Unable to submit the request.');
      setStatus('success');
      setRequestNumber(data.request_number || '');
      setServerMessage('Your request has been received. The Biet Al Reef team will contact you soon.');
      setForm(initialState);
    } catch (error) {
      setStatus('error');
      setServerMessage(error?.message || 'Unable to submit the request now. Please try again.');
    }
  }

  return (
    <section dir="ltr" className="mx-auto max-w-4xl px-4 py-10 text-left md:py-14">
      <div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-xl shadow-[#0F3F1A]/10 md:p-8">
        <div className="mb-7 flex flex-col gap-4 text-center md:flex-row md:items-center md:text-left">
          <div className="mx-auto flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-[#0F3F1A] text-white shadow-lg shadow-[#0F3F1A]/20 md:mx-0">
            {isQuote ? <MessageSquareText className="h-8 w-8" /> : <Phone className="h-8 w-8" />}
          </div>
          <div>
            <p className="text-sm font-black text-[#6F5400]">Biet Al Reef — Request form</p>
            <h1 className="mt-1 text-3xl font-black text-[#0F3F1A] md:text-4xl">{isQuote ? 'Request a quotation' : 'Send a service inquiry'}</h1>
            <p className="mt-3 text-sm font-semibold leading-8 text-gray-600 md:text-base">{isQuote ? 'Share your project details and we will route the request to the right path.' : 'Send your question or service need and the Biet Al Reef team will respond.'}</p>
          </div>
        </div>

        {status === 'success' ? (
          <div className="rounded-[1.75rem] border border-green-200 bg-green-50 p-6 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
            <h2 className="mt-3 text-2xl font-black text-green-800">Request received</h2>
            <p className="mt-2 font-bold text-green-700">{serverMessage}</p>
            {requestNumber ? <p className="mt-3 rounded-2xl bg-white px-4 py-3 text-lg font-black text-[#0F3F1A]">Request number: {requestNumber}</p> : null}
            <button type="button" onClick={() => setStatus('idle')} className="mt-5 rounded-2xl bg-[#0F3F1A] px-6 py-3 font-black text-white">Submit another request</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full name" required><input value={form.full_name} onChange={(e) => patch('full_name', e.target.value)} className="input" placeholder="Your name" /></Field>
              <Field label="Phone / WhatsApp" required><input value={form.phone} onChange={(e) => patch('phone', e.target.value)} className="input" inputMode="tel" placeholder="05xxxxxxxx" /></Field>
              <Field label="Email"><input value={form.email} onChange={(e) => patch('email', e.target.value)} className="input" type="email" placeholder="name@email.com" /></Field>
              <Field label="Preferred contact"><select value={form.preferred_contact} onChange={(e) => patch('preferred_contact', e.target.value)} className="input"><option value="whatsapp">WhatsApp</option><option value="phone">Phone call</option><option value="email">Email</option></select></Field>
              <Field label="Emirate"><select value={form.emirate} onChange={(e) => patch('emirate', e.target.value)} className="input"><option value="">Choose emirate</option>{emirates.map((item) => <option key={item} value={item}>{item}</option>)}</select></Field>
              <Field label="City / area"><input value={form.city} onChange={(e) => patch('city', e.target.value)} className="input" placeholder="Example: Al Ain, Al Shamkha, Dubai" /></Field>
            </div>

            {isQuote ? (
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Service type"><select value={form.service_category} onChange={(e) => patch('service_category', e.target.value)} className="input"><option value="">Choose service</option>{serviceCategories.map((item) => <option key={item} value={item}>{item}</option>)}</select></Field>
                <Field label="Project type"><input value={form.project_type} onChange={(e) => patch('project_type', e.target.value)} className="input" placeholder="Villa, apartment, shop, office" /></Field>
                <Field label="Area / quantity"><input value={form.project_area} onChange={(e) => patch('project_area', e.target.value)} className="input" placeholder="120 sqm or 8 doors" /></Field>
                <Field label="Approx. budget"><input value={form.budget_range} onChange={(e) => patch('budget_range', e.target.value)} className="input" placeholder="Optional" /></Field>
                <Field label="Timeline"><input value={form.timeline} onChange={(e) => patch('timeline', e.target.value)} className="input" placeholder="Urgent, this week, next month" /></Field>
                <Field label="Project details" required wide><textarea value={form.project_description} onChange={(e) => patch('project_description', e.target.value)} className="input min-h-[140px]" placeholder="Describe what you need, sizes, material, location and any important details." /></Field>
              </div>
            ) : (
              <Field label="Inquiry details" required><textarea value={form.message} onChange={(e) => patch('message', e.target.value)} className="input min-h-[150px]" placeholder="Write your inquiry or service need." /></Field>
            )}

            <label className="flex items-start gap-3 rounded-2xl bg-[#FDFBF7] p-4 text-sm font-bold leading-7 text-gray-700">
              <input type="checkbox" checked={form.accepted} onChange={(e) => patch('accepted', e.target.checked)} className="mt-1 h-4 w-4" />
              I agree to send this request to Biet Al Reef for follow-up.
            </label>

            {serverMessage && status === 'error' ? <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">{serverMessage}</p> : null}
            <button type="submit" disabled={!canSubmit || status === 'submitting'} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-6 py-4 font-black text-white shadow-lg transition hover:bg-[#D4AF37] hover:text-[#0F3F1A] disabled:cursor-not-allowed disabled:opacity-50">
              {status === 'submitting' ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
              {isQuote ? 'Submit quotation request' : 'Submit inquiry'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({ label, required = false, children, wide = false }) {
  return <label className={`block ${wide ? 'md:col-span-2' : ''}`}><span className="mb-2 block text-sm font-black text-[#0F3F1A]">{label}{required ? ' *' : ''}</span>{children}</label>;
}
