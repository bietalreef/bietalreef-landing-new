import React from 'react';

const RECOVERY_KEY = 'bietalreef_client_recovery_attempted';

function isChunkLoadError(error) {
  const message = String(error?.message || error || '');
  return /ChunkLoadError|Loading chunk|Failed to fetch dynamically imported module|Importing a module script failed/i.test(message);
}

export default class ClientSafetyBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Biet Al Reef client error:', error, info);

    if (typeof window === 'undefined' || !isChunkLoadError(error)) return;

    const alreadyAttempted = window.sessionStorage.getItem(RECOVERY_KEY) === '1';
    if (!alreadyAttempted) {
      window.sessionStorage.setItem(RECOVERY_KEY, '1');
      window.location.reload();
    }
  }

  handleRetry = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(RECOVERY_KEY);
      window.location.reload();
    }
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#F8F4EC] px-5 py-10 text-[#102F18]">
        <section className="w-full max-w-xl rounded-[2rem] border border-[#E6DCC8] bg-white p-7 text-center shadow-2xl md:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF3CC] text-3xl">🛡️</div>
          <h1 className="mt-5 text-2xl font-black md:text-3xl">تعذر عرض الصفحة بصورة صحيحة</h1>
          <p className="mt-4 leading-8 text-gray-600">
            تم إيقاف الخطأ لحماية تجربة الاستخدام. حدّث الصفحة للحصول على أحدث نسخة من بيت الريف.
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            className="mt-7 min-h-[52px] w-full rounded-2xl bg-[#102F18] px-6 py-3 font-black text-white shadow-lg transition hover:bg-[#174A27]"
          >
            تحديث الصفحة الآن
          </button>
          <a href="/" className="mt-3 inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl border border-[#D9C99D] bg-[#FFF9E8] px-6 py-3 font-black text-[#102F18]">
            العودة إلى الرئيسية
          </a>
        </section>
      </main>
    );
  }
}
