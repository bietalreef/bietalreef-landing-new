import Link from "next/link";

export default function ServiceCard({ title, description, slug }) {
  return (
    <Link href={slug ? `/services/${slug}` : "#"}>
      <div className="bg-white rounded-xl shadow-soft p-4 sm:p-5 flex flex-col items-start gap-3 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer h-full">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-xl sm:text-2xl shadow-soft">
          ✦
        </div>
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">{title}</h3>
        {description && (
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{description}</p>
        )}
        <div className="mt-auto pt-2 text-primary text-xs sm:text-sm font-semibold">
          اعرف المزيد →
        </div>
      </div>
    </Link>
  );
}
