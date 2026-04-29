export default function RoleSelection({ onSelect }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="text-center mb-10 animate-fade-in">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight drop-shadow-sm">
          النتيجة السنوية لمدرسة التربية بالقرءان الكريم
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
          مدرسة التربية بالقرآن الكريم - يرجى اختيار طريقة الدخول
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        <div className="animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <RoleCard
            onClick={() => onSelect('manager')}
            color="blue"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />}
            title="دخول كمدير"
            desc="عرض لوحة التحكم الشاملة والبحث المتقدم في جميع الفصول"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
          <RoleCard
            onClick={() => onSelect('teacher')}
            color="sky"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />}
            title="دخول كمعلم"
            desc="عرض نتائج وتقييمات طلاب فصلك فقط وتحديد نسب النجاح"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
          <RoleCard
            onClick={() => onSelect('student')}
            color="purple"
            icon={<><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></>}
            title="دخول كطالب"
            desc="استعلام عن نتيجتك الشخصية ومجموعك الكلي (متاح 5 مرات كحد أقصى)"
          />
        </div>
      </div>
    </div>
  );
}

const colorMap = {
  blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', border: 'hover:border-blue-500' },
  sky: { bg: 'bg-sky-100 dark:bg-sky-900/30', text: 'text-sky-600 dark:text-sky-400', border: 'hover:border-sky-500' },
  purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400', border: 'hover:border-purple-500' },
};

function RoleCard({ onClick, color, icon, title, desc }) {
  const c = colorMap[color];
  return (
    <button
      onClick={onClick}
      className={`w-full bg-white dark:bg-slate-800 p-6 md:p-10 flex flex-col items-center text-center card-hover group border-2 border-transparent ${c.border} rounded-2xl md:rounded-3xl shadow-sm h-full`}
    >
      <div className={`w-16 h-16 md:w-24 md:h-24 ${c.bg} ${c.text} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-8 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-sm`}>
        <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-2 md:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h2>
      <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{desc}</p>
    </button>
  );
}
