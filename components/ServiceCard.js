export default function ServiceCard({ title, description }) {
  return (
    <div className="bg-softBlue rounded-xl2 shadow-soft p-4 flex flex-col items-start gap-2">
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary text-lg shadow-soft">
        ✦
      </div>
      <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
      {description && (
        <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
      )}
    </div>
  );
}
