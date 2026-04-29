export default function RoleSelection({ onSelect }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
          النتيجة السنوية لمدرسة التربية بالقرءان الكريم
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          مدرسة التربية بالقرآن الكريم - يرجى اختيار طريقة الدخول
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        <RoleCard
          onClick={() => onSelect('manager')}
          color="blue"
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />}
          title="دخول كمدير"
          desc="عرض لوحة التحكم الشاملة والبحث المتقدم في جميع الفصول"
        />
        <RoleCard
          onClick={() => onSelect('teacher')}
          color="sky"
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />}
          title="دخول كمعلم"
          desc="عرض نتائج وتقييمات طلاب فصلك فقط وتحديد نسب النجاح"
        />
        <RoleCard
          onClick={() => onSelect('student')}
          color="purple"
          icon={<><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></>}
          title="دخول كطالب"
          desc="استعلام عن نتيجتك الشخصية ومجموعك الكلي (متاح 3 مرات كحد أقصى)"
        />
      </div>
    </div>
  );
}

const colorMap = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'hover:border-blue-500' },
  sky: { bg: 'bg-sky-100', text: 'text-sky-600', border: 'hover:border-sky-500' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'hover:border-purple-500' },
};

function RoleCard({ onClick, color, icon, title, desc }) {
  const c = colorMap[color];
  return (
    <button
      onClick={onClick}
      className={`bg-white dark:bg-slate-800 p-8 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 border-transparent ${c.border} rounded-2xl shadow-sm`}
    >
      <div className={`w-20 h-20 ${c.bg} ${c.text} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{title}</h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm">{desc}</p>
    </button>
  );
}
