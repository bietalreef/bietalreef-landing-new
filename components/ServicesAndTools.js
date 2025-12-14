import { useState } from 'react';
import servicesAndTools from '../data/services_and_tools.json';

export default function ServicesAndTools() {
  const [activeTab, setActiveTab] = useState('tools'); // 'tools' or 'services'

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          اكتشف عالم بيت الريف
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          أدوات ذكية وخدمات متكاملة لإدارة مشاريعك من الألف إلى الياء
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="bg-white p-1 rounded-full shadow-md inline-flex">
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
              activeTab === 'tools'
                ? 'bg-primary text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            🧠 الأدوات الذكية (47 أداة)
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
              activeTab === 'services'
                ? 'bg-primary text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            🛒 سوق الخدمات (90+ خدمة)
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-12">
        {activeTab === 'tools' ? (
          <div className="space-y-12 animate-fadeIn">
            {servicesAndTools.smart_tools.map((category, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-primary mb-6 border-b pb-4 border-gray-100">
                  {category.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, i) => (
                    <div key={i} className="group p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300">
                      <h4 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-12 animate-fadeIn">
            {servicesAndTools.services_market.map((category, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-primary mb-6 border-b pb-4 border-gray-100">
                  {category.category}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-primary hover:shadow-sm transition-all bg-white">
                      <span className="text-primary text-lg">✓</span>
                      <span className="text-sm font-medium text-gray-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
