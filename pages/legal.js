import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Legal() {
  return (
    <>
      <Head>
        <title>الشروط والأحكام – بيت الريف</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-beige">
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-10 space-y-8 text-sm text-gray-800 leading-relaxed">
          <section id="terms" className="bg-white rounded-xl2 shadow-soft p-5">
            <h1 className="text-xl font-bold text-gray-900 mb-3">
              الشروط والأحكام
            </h1>
            <p className="mb-3">
              باستخدامك لموقع ومنصة بيت الريف، فإنك توافق على هذه الشروط والأحكام. نرجو قراءة هذه
              الصفحة بعناية قبل استخدام المنصة أو أي من خدماتها.
            </p>
            <ul className="list-disc pr-5 space-y-2">
              <li>
                يلتزم المستخدم بإدخال بيانات صحيحة وحديثة عند التسجيل أو استخدام الخدمات المختلفة.
              </li>
              <li>
                لا يجوز استخدام المنصة في أي أنشطة مخالفة للقوانين المعمول بها في دولة الإمارات العربية المتحدة.
              </li>
              <li>
                بيت الريف منصة وسيطة تربط بين أصحاب المشاريع ومقدّمي الخدمات، ولا تتحمل المسؤولية المباشرة عن
                تنفيذ الأعمال بين الطرفين، ما لم يُنص خلاف ذلك في اتفاقيات خاصة.
              </li>
              <li>
                تحتفظ بيت الريف بالحق في إيقاف أو تعليق حساب أي مستخدم يسيء استخدام الخدمات أو يخالف السياسات.
              </li>
            </ul>
          </section>

          <section id="privacy" className="bg-white rounded-xl2 shadow-soft p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              سياسة الخصوصية
            </h2>
            <p className="mb-3">
              نحترم خصوصيتك ونسعى لحماية بياناتك الشخصية. توضح هذه السياسة كيفية جمعنا للمعلومات واستخدامها
              وحمايتها.
            </p>
            <ul className="list-disc pr-5 space-y-2">
              <li>
                نجمع البيانات التي يقدّمها المستخدم مثل الاسم، رقم الهاتف، البريد الإلكتروني، وبيانات المشاريع
                لأغراض تقديم الخدمة وتحسينها.
              </li>
              <li>
                قد نستخدم بياناتك للتواصل معك بشأن تحديثات المنصة أو العروض أو التغييرات في السياسات.
              </li>
              <li>
                لا نقوم ببيع بياناتك لطرف ثالث، وقد نشارك جزءًا منها فقط مع مقدّمي الخدمات المرتبطين بمشروعك
                وبالقدر اللازم لتنفيذ الخدمة.
              </li>
              <li>
                نستخدم وسائل تقنية مناسبة لحماية البيانات من الوصول غير المصرح به قدر الإمكان.
              </li>
            </ul>
          </section>

          <section id="usage" className="bg-white rounded-xl2 shadow-soft p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              سياسة الاستخدام
            </h2>
            <p className="mb-3">
              يلتزم المستخدم باستخدام المنصة للأغراض المشروعة فقط، والامتناع عن أي محتوى مسيء أو مضلل أو
              ينتهك حقوق الآخرين.
            </p>
            <ul className="list-disc pr-5 space-y-2">
              <li>عدم نشر أي محتوى يتضمن إساءة، تمييز، أو انتهاك لحقوق الملكية الفكرية.</li>
              <li>عدم محاولة اختراق أو تعطيل أنظمة المنصة أو العبث بها.</li>
              <li>عدم إنشاء حسابات وهمية أو استخدام المنصة لانتحال هوية الغير.</li>
            </ul>
          </section>

          <section className="bg-white rounded-xl2 shadow-soft p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              حقوق وواجبات المستخدم
            </h2>
            <p className="mb-3">
              يحق للمستخدم الاستفادة من الخدمات المتاحة وفقًا للخطط والسياسات المعمول بها، وفي المقابل يلتزم
              بتسديد أي مبالغ مالية مترتبة على الخدمات المدفوعة في الوقت المحدد.
            </p>
            <p className="mb-3">
              يتحمل المستخدم مسؤولية اختيار المقاول أو مزوّد الخدمة المناسب، ومراجعة العروض والاتفاقيات قبل
              الموافقة عليها.
            </p>
          </section>

          <section className="bg-white rounded-xl2 shadow-soft p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              حماية البيانات
            </h2>
            <p className="mb-3">
              نبذل جهدنا لحماية بياناتك باستخدام بروتوكولات أمان محدثة، مع العلم أن نقل البيانات عبر الإنترنت قد
              لا يكون آمنًا بنسبة ١٠٠٪.
            </p>
          </section>

          <section className="bg-white rounded-xl2 shadow-soft p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              معلومات التواصل
            </h2>
            <p className="mb-1">
              لأي استفسارات تتعلق بالشروط والأحكام أو سياسة الخصوصية، يمكن التواصل معنا عبر:
            </p>
            <p className="mb-1">البريد الإلكتروني: support@bietalreef.ae</p>
            <p>أو من خلال نموذج التواصل داخل المنصة.</p>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
