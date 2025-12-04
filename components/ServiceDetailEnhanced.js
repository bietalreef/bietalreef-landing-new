import Image from "next/image";
import { getSubServices } from "../lib/comprehensive-services";

export default function ServiceDetailEnhanced({ service }) {
  const subServices = getSubServices(service.id);

  return (
    <>
      {/* Sub-Services Section */}
      {subServices && subServices.length > 0 && (
        <section className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              الخدمات الفرعية
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              استكشف جميع الخدمات الفرعية المتاحة ضمن هذه الفئة
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subServices.map((subService, index) => (
                <div
                  key={subService.id}
                  className="group bg-white rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary"
                >
                  {/* Card Header with Icon */}
                  <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{subService.name}</h3>
                      <p className="text-sm opacity-90">{subService.description}</p>
                    </div>
                    <div className="text-4xl flex-shrink-0">{subService.icon}</div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-xs font-semibold">
                        الخدمة {index + 1}
                      </span>
                      <span className="text-primary font-bold">→</span>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full py-2 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark transition text-sm">
                      اطلب هذه الخدمة
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service Features Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          مميزات هذه الفئة
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="flex gap-4 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-gray-200 hover:border-primary transition">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-white text-xl">
                ⭐
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">متخصصون معتمدون</h3>
              <p className="text-gray-600 text-sm">فريق من المتخصصين المعتمدين والموثوقين</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex gap-4 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-gray-200 hover:border-primary transition">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-white text-xl">
                💰
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">أسعار منافسة</h3>
              <p className="text-gray-600 text-sm">أفضل الأسعار مع ضمان الجودة العالية</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex gap-4 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-gray-200 hover:border-primary transition">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-white text-xl">
                🎯
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">خدمة مخصصة</h3>
              <p className="text-gray-600 text-sm">خدمات مخصصة حسب احتياجات كل عميل</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex gap-4 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-gray-200 hover:border-primary transition">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-white text-xl">
                ✅
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">ضمان الجودة</h3>
              <p className="text-gray-600 text-sm">ضمان كامل على جودة الخدمة المقدمة</p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="flex gap-4 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-gray-200 hover:border-primary transition">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-white text-xl">
                📞
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">دعم 24/7</h3>
              <p className="text-gray-600 text-sm">فريق دعم متاح على مدار الساعة</p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="flex gap-4 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-gray-200 hover:border-primary transition">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-white text-xl">
                🗺️
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">توفر في جميع المناطق</h3>
              <p className="text-gray-600 text-sm">متوفرة في جميع مناطق الإمارات</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Comparison Table */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            مقارنة الخدمات الفرعية
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-primary to-primary-dark text-white">
                  <th className="px-6 py-4 text-right font-bold">الخدمة</th>
                  <th className="px-6 py-4 text-center font-bold">الوصف</th>
                  <th className="px-6 py-4 text-center font-bold">التقييم</th>
                  <th className="px-6 py-4 text-center font-bold">الإجراء</th>
                </tr>
              </thead>
              <tbody>
                {subServices && subServices.map((subService, index) => (
                  <tr
                    key={subService.id}
                    className={`border-b border-gray-200 hover:bg-blue-50 transition ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 font-bold text-gray-900">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{subService.icon}</span>
                        {subService.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {subService.description}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                        ⭐ 4.8
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-semibold text-sm">
                        اطلب الآن
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            هل أنت مستعد للبدء؟
          </h2>
          <p className="text-lg mb-8 opacity-90">
            اختر الخدمة المناسبة لك الآن واحصل على عرض سعر مخصص من متخصصينا
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://app.bietalreef.ae"
              className="px-8 py-4 rounded-full bg-white text-primary font-bold hover:bg-gray-100 transition shadow-lg"
            >
              ابدأ الآن
            </a>
            <a
              href="https://wa.me/971567856001"
              className="px-8 py-4 rounded-full border-2 border-white text-white font-bold hover:bg-white hover:text-primary transition"
            >
              تواصل معنا عبر WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
