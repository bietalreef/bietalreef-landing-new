import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SERVICE_CATEGORIES } from "../../data/siteTaxonomy";

export default function CategoriesPage() {
  return (
    <>
      <Head>
        <title>تصنيفات الخدمات | بيت الريف</title>
        <meta name="description" content="استكشف جميع تصنيفات خدمات البناء والصيانة والتصميم في بيت الريف." />
      </Head>
      <div dir="rtl" className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">تصنيفات الخدمات</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SERVICE_CATEGORIES.map((category) => (
                <Link key={category.slug} href={`/categories/${category.slug}`}>
                  <div className="p-6 border rounded-xl hover:shadow-lg transition cursor-pointer">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h2 className="text-xl font-bold mb-2">{category.nameAr}</h2>
                    <p className="text-gray-600">{category.descAr}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
