import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ProviderProfile({ slug }) {
  const title = `مزود خدمة ${slug} | بيت الريف`;
  return <><Head><title>{title}</title><meta name="description" content="صفحة مزود خدمة عامة داخل موقع بيت الريف التعريفي، مهيأة للفهرسة وتربط لاحقاً بحساب المزود داخل التطبيق."/><link rel="canonical" href={`https://bietalreef.ae/provider/${slug}`}/></Head><div dir="rtl" className="min-h-screen bg-[#FDFBF7]"><Navbar/><main className="max-w-6xl mx-auto px-4 py-14"><h1 className="text-4xl font-black text-[#0F3F1A] mb-4">صفحة مزود خدمة</h1><p className="text-gray-600 leading-8 mb-6">هذه صفحة عامة مؤقتة لمزود الخدمة: {slug}. سيتم ربطها لاحقاً ببيانات المزود الفعلية من التطبيق.</p><Link href="/providers" className="rounded-full bg-[#0F3F1A] text-white px-6 py-3 font-black">مزودو الخدمات</Link></main><Footer/></div></>;
}

export async function getServerSideProps({ params }) { return { props: { slug: params.slug } }; }
