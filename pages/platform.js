import Head from "next/head";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Platform() {
  const [activeTab, setActiveTab] = useState("client");

  return (
    <>
      <Head>
        <title>منصة بيت الريف – كيفية العمل | منصة الخدمات الذكية</title>
        <meta name="description" content="اكتشف كيفية عمل منصة بيت الريف - المنصة الذكية لربط العملاء مع مزودي الخدمات المعتمدين في الإمارات" />
        <meta property="og:title" content="منصة بيت الريف – كيفية العمل" />
        <meta property="og:description" content="اكتشف كيفية عمل منصة بيت الريف - المنصة الذكية لربط العملاء مع مزودي الخدمات المعتمدين" />
      </Head>

      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-blue-600 to-blue-800 text-white py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                🏗️ كيفية عمل منصة بيت الريف
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
                منصة ذكية تربط العملاء مع أفضل مزودي الخدمات المعتمدين في الإمارات
              </p>
            </div>
          </section>

          {/* Introduction Section */}
          <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  ما هي منصة بيت الريف؟
                </h2>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  منصة رقمية ذكية تجمع أصحاب المشاريع والعملاء مع أفضل مزودي الخدمات المعتمدين والموثوقين في الإمارات. نوفر لك تجربة سهلة وآمنة للبحث عن الخدمات وإدارة مشاريعك.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  من خلال منصتنا، يمكنك متابعة مشروعك من أول فكرة وحتى التسليم النهائي، مع ضمان جودة الخدمة والالتزام بالمواعيد والأسعار.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://app.bietalreef.ae"
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                  >
                    ابدأ الآن
                  </a>
                  <a
                    href="https://wa.me/971567856001"
                    className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition"
                  >
                    تواصل معنا
                  </a>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 border-2 border-blue-200">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white text-xl">
                        ✅
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">آمن وموثوق</h3>
                      <p className="text-gray-600 text-sm">جميع مزودي الخدمات معتمدون وموثقون</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white text-xl">
                        ⚡
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">سريع وسهل</h3>
                      <p className="text-gray-600 text-sm">ابحث واختر الخدمة المناسبة في دقائق</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white text-xl">
                        💰
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">بدون عمولات</h3>
                      <p className="text-gray-600 text-sm">لا توجد رسوم إضافية على العملاء</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tab Navigation */}
          <section className="bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-center gap-4 mb-12">
                <button
                  onClick={() => setActiveTab("client")}
                  className={`px-8 py-3 rounded-lg font-bold transition ${
                    activeTab === "client"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-900 border-2 border-gray-200 hover:border-blue-600"
                  }`}
                >
                  👤 رحلة العميل
                </button>
                <button
                  onClick={() => setActiveTab("provider")}
                  className={`px-8 py-3 rounded-lg font-bold transition ${
                    activeTab === "provider"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-900 border-2 border-gray-200 hover:border-blue-600"
                  }`}
                >
                  🏢 رحلة مزود الخدمة
                </button>
              </div>

              {/* Client Journey */}
              {activeTab === "client" && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                    كيف يستخدم العميل المنصة؟
                  </h2>

                  {/* Step 1 */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-blue-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-600 text-white text-3xl font-bold">
                            1
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            إنشاء حساب
                          </h3>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                          قم بتحميل تطبيق بيت الريف أو زيارة الموقع الإلكتروني، ثم أنشئ حسابك بسهولة باستخدام بريدك الإلكتروني أو رقم هاتفك.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-blue-600 font-bold">✓</span>
                            بيانات شخصية أساسية
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-blue-600 font-bold">✓</span>
                            تحديد موقعك الجغرافي
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-blue-600 font-bold">✓</span>
                            تأكيد رقم الهاتف
                          </li>
                        </ul>
                      </div>
                      <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8">
                        <div className="text-center">
                          <div className="text-6xl mb-4">📱</div>
                          <p className="text-gray-600 font-semibold">تطبيق سهل الاستخدام</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-green-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-600 text-white text-3xl font-bold">
                            2
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            البحث عن الخدمات
                          </h3>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                          استعرض قائمة الخدمات المتاحة أو استخدم البحث المتقدم للعثور على الخدمة المناسبة لاحتياجاتك.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-green-600 font-bold">✓</span>
                            تصفية حسب النوع والموقع
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-green-600 font-bold">✓</span>
                            عرض التقييمات والتعليقات
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-green-600 font-bold">✓</span>
                            مقارنة الأسعار والعروض
                          </li>
                        </ul>
                      </div>
                      <div className="flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🔍</div>
                          <p className="text-gray-600 font-semibold">بحث ذكي وسهل</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-orange-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-600 text-white text-3xl font-bold">
                            3
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            طلب عرض سعر
                          </h3>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                          قدم طلبك مع تفاصيل مشروعك والميزانية المتاحة، وسيتلقى مزودو الخدمات طلبك مباشرة.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-orange-600 font-bold">✓</span>
                            وصف تفصيلي للمشروع
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-orange-600 font-bold">✓</span>
                            تحديد الميزانية والمواعيد
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-orange-600 font-bold">✓</span>
                            إرسال الصور والمرفقات
                          </li>
                        </ul>
                      </div>
                      <div className="flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8">
                        <div className="text-center">
                          <div className="text-6xl mb-4">📝</div>
                          <p className="text-gray-600 font-semibold">طلب احترافي</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-purple-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-600 text-white text-3xl font-bold">
                            4
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            مقارنة العروض
                          </h3>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                          تلقى عروضاً من عدة مزودي خدمات، وقارن بينها بناءً على السعر والجودة والمواعيد.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-purple-600 font-bold">✓</span>
                            عروض مفصلة وواضحة
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-purple-600 font-bold">✓</span>
                            تقييمات مزودي الخدمات
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-purple-600 font-bold">✓</span>
                            استشارة وياك الذكي
                          </li>
                        </ul>
                      </div>
                      <div className="flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8">
                        <div className="text-center">
                          <div className="text-6xl mb-4">⚖️</div>
                          <p className="text-gray-600 font-semibold">اختيار ذكي</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-red-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-600 text-white text-3xl font-bold">
                            5
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            متابعة المشروع
                          </h3>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                          بعد اختيار مزود الخدمة، تابع مشروعك من البداية إلى النهاية عبر لوحة التحكم الذكية.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-red-600 font-bold">✓</span>
                            تحديثات يومية عن التقدم
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-red-600 font-bold">✓</span>
                            التواصل المباشر مع المزود
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-red-600 font-bold">✓</span>
                            تقارير دورية وصور التقدم
                          </li>
                        </ul>
                      </div>
                      <div className="flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8">
                        <div className="text-center">
                          <div className="text-6xl mb-4">📊</div>
                          <p className="text-gray-600 font-semibold">متابعة شاملة</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Provider Journey */}
              {activeTab === "provider" && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                    كيف يستخدم مزود الخدمة المنصة؟
                  </h2>

                  {/* Account Type Selection */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-blue-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-600 text-white text-3xl font-bold">
                            1
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            اختيار نوع الحساب
                          </h3>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                          اختر نوع حسابك بناءً على طبيعة عملك:
                        </p>
                        <div className="space-y-4">
                          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                            <h4 className="font-bold text-gray-900 mb-2">👤 أنا عميل</h4>
                            <p className="text-gray-700 text-sm">
                              للبحث عن الخدمات والمقاولين والمصممين
                            </p>
                          </div>
                          <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                            <h4 className="font-bold text-gray-900 mb-2">🏢 أنا مزود خدمة</h4>
                            <p className="text-gray-700 text-sm">
                              لعرض خدماتك والحصول على طلبات من العملاء
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🎯</div>
                          <p className="text-gray-600 font-semibold">اختر دورك</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Provider Type Selection */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-green-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-600 text-white text-3xl font-bold">
                            2
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            تحديد نوع مزود الخدمة
                          </h3>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                          اختر نوع حسابك بناءً على طبيعة عملك:
                        </p>
                        <div className="space-y-4">
                          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                            <h4 className="font-bold text-gray-900 mb-2">🏢 شركة برخصة</h4>
                            <p className="text-gray-700 text-sm">
                              شركة مسجلة رسمياً مع رخصة تجارية
                            </p>
                          </div>
                          <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                            <h4 className="font-bold text-gray-900 mb-2">🔧 حرف / عامل ماهر</h4>
                            <p className="text-gray-700 text-sm">
                              فرد متخصص يقدم خدمات بدون رخصة تجارية
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🏭</div>
                          <p className="text-gray-600 font-semibold">نوع العمل</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Verification */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-orange-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-600 text-white text-3xl font-bold">
                            3
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            توثيق الحساب
                          </h3>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                          قم بتوثيق حسابك لزيادة الثقة والحصول على المزيد من الطلبات:
                        </p>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <span className="text-orange-600 font-bold text-xl">📞</span>
                            <div>
                              <p className="font-semibold text-gray-900">رقم الهاتف</p>
                              <p className="text-gray-600 text-sm">للتحقق من الهوية</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-orange-600 font-bold text-xl">📍</span>
                            <div>
                              <p className="font-semibold text-gray-900">الموقع</p>
                              <p className="text-gray-600 text-sm">تحديد المحافظة والمنطقة</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-orange-600 font-bold text-xl">📄</span>
                            <div>
                              <p className="font-semibold text-gray-900">الهوية الإماراتية</p>
                              <p className="text-gray-600 text-sm">صورة واضحة من الهوية</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-orange-600 font-bold text-xl">💼</span>
                            <div>
                              <p className="font-semibold text-gray-900">الرخصة التجارية</p>
                              <p className="text-gray-600 text-sm">للشركات المسجلة رسمياً</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🛡️</div>
                          <p className="text-gray-600 font-semibold">أمان وموثوقية</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Setup */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-purple-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-600 text-white text-3xl font-bold">
                            4
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            إضافة خدماتك
                          </h3>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                          أضف خدماتك وحدد أسعارك والمناطق التي تخدمها:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-purple-600 font-bold">✓</span>
                            اختر من قائمة الخدمات المتاحة
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-purple-600 font-bold">✓</span>
                            حدد أسعارك والباقات المختلفة
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-purple-600 font-bold">✓</span>
                            أضف صوراً واحترافية للخدمات
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-purple-600 font-bold">✓</span>
                            حدد المناطق التي تخدمها
                          </li>
                        </ul>
                      </div>
                      <div className="flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8">
                        <div className="text-center">
                          <div className="text-6xl mb-4">📋</div>
                          <p className="text-gray-600 font-semibold">عرض احترافي</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Receive Requests */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-red-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-600 text-white text-3xl font-bold">
                            5
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            استقبال الطلبات
                          </h3>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                          استقبل طلبات من العملاء وأرسل عروضك:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-red-600 font-bold">✓</span>
                            تنبيهات فورية للطلبات الجديدة
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-red-600 font-bold">✓</span>
                            عرض تفاصيل الطلب كاملة
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-red-600 font-bold">✓</span>
                            إرسال عروض سعر احترافية
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-red-600 font-bold">✓</span>
                            التواصل المباشر مع العميل
                          </li>
                        </ul>
                      </div>
                      <div className="flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8">
                        <div className="text-center">
                          <div className="text-6xl mb-4">📬</div>
                          <p className="text-gray-600 font-semibold">طلبات مستمرة</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Key Features Section */}
          <section className="bg-gradient-to-b from-gray-50 to-white py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
                ✨ المميزات الرئيسية للمنصة
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="bg-white rounded-xl shadow-soft p-8 border-t-4 border-blue-600 hover:shadow-lg transition">
                  <div className="text-4xl mb-4">🤖</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">وياك - الذكاء الاصطناعي</h3>
                  <p className="text-gray-700">
                    مساعد ذكي يساعدك على اتخاذ القرارات الصحيحة من خلال استشارات فورية وتوصيات مخصصة.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white rounded-xl shadow-soft p-8 border-t-4 border-green-600 hover:shadow-lg transition">
                  <div className="text-4xl mb-4">🗺️</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">خرائط ذكية</h3>
                  <p className="text-gray-700">
                    خرائط تفاعلية تعرض موقع مزودي الخدمات والمشاريع القريبة منك مع صور 360 درجة.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white rounded-xl shadow-soft p-8 border-t-4 border-orange-600 hover:shadow-lg transition">
                  <div className="text-4xl mb-4">💰</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">أسعار فورية</h3>
                  <p className="text-gray-700">
                    احصل على أسعار فورية وعروض من عدة مزودي خدمات مع مقارنة سهلة وسريعة.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="bg-white rounded-xl shadow-soft p-8 border-t-4 border-purple-600 hover:shadow-lg transition">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">لوحة تحكم متقدمة</h3>
                  <p className="text-gray-700">
                    متابعة شاملة لمشاريعك مع تقارير دورية وتحديثات فورية عن التقدم.
                  </p>
                </div>

                {/* Feature 5 */}
                <div className="bg-white rounded-xl shadow-soft p-8 border-t-4 border-red-600 hover:shadow-lg transition">
                  <div className="text-4xl mb-4">🛡️</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">أمان وموثوقية</h3>
                  <p className="text-gray-700">
                    جميع مزودي الخدمات معتمدون وموثقون مع نظام تقييم شفاف وعادل.
                  </p>
                </div>

                {/* Feature 6 */}
                <div className="bg-white rounded-xl shadow-soft p-8 border-t-4 border-pink-600 hover:shadow-lg transition">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">سرعة وسهولة</h3>
                  <p className="text-gray-700">
                    واجهة سهلة الاستخدام وسريعة تجعل البحث والاختيار في دقائق فقط.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                لماذا تختار منصة بيت الريف؟
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white bg-opacity-10 rounded-lg p-8 backdrop-blur-sm text-center">
                  <div className="text-5xl mb-4">🏆</div>
                  <h3 className="text-xl font-bold mb-3">الأفضل في الإمارات</h3>
                  <p className="opacity-90">أكبر منصة متخصصة في خدمات البناء والتصميم</p>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-8 backdrop-blur-sm text-center">
                  <div className="text-5xl mb-4">👥</div>
                  <h3 className="text-xl font-bold mb-3">آلاف المزودين</h3>
                  <p className="opacity-90">شبكة واسعة من مزودي الخدمات المعتمدين</p>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-8 backdrop-blur-sm text-center">
                  <div className="text-5xl mb-4">⭐</div>
                  <h3 className="text-xl font-bold mb-3">تقييمات عالية</h3>
                  <p className="opacity-90">نسبة رضا عملاء تزيد عن 98%</p>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-8 backdrop-blur-sm text-center">
                  <div className="text-5xl mb-4">💬</div>
                  <h3 className="text-xl font-bold mb-3">دعم 24/7</h3>
                  <p className="opacity-90">فريق دعم متاح على مدار الساعة</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-12 text-center border-2 border-blue-200">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                هل أنت مستعد للبدء؟
              </h2>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                انضم إلى آلاف العملاء الراضين الذين استخدموا منصة بيت الريف وحققوا أحلامهم
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://app.bietalreef.ae"
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  ابدأ الآن
                </a>
                <a
                  href="https://wa.me/971567856001"
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition"
                >
                  تواصل معنا
                </a>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
