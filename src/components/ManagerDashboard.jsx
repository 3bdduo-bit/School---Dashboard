import { useState, useMemo, useRef } from 'react';
import { allStudents, teacherData } from '../data';
import TeacherSection from './TeacherSection';
import GradeTag, { getGradeInfo } from './GradeTag';

const validStudents = allStudents.filter(s => s.total > 0 && s.name);
const totalPct = validStudents.reduce((sum, s) => sum + s.percentage * 100, 0);
const avgScore = validStudents.length ? (totalPct / validStudents.length).toFixed(1) + '%' : '0%';
const passCount = validStudents.filter(s => s.percentage * 100 >= 50).length;
const passRate = validStudents.length ? ((passCount / validStudents.length) * 100).toFixed(1) + '%' : '0%';

const sortedStudents = [...validStudents].sort((a, b) => b.percentage - a.percentage);

const teacherStats = Object.values(teacherData)
  .map(t => {
    const exc = t.grades['امتياز'];
    return { name: t.name, total: t.total, excellentCount: exc, excellentPercentage: t.total > 0 ? (exc / t.total) * 100 : 0 };
  })
  .filter(t => t.total > 0)
  .sort((a, b) => b.excellentPercentage - a.excellentPercentage || b.excellentCount - a.excellentCount);

const GRADE_OPTIONS = [
  { label: 'جميع التقديرات', value: '' },
  { label: 'امتياز (90-100%)', value: 'امتياز' },
  { label: 'جيد جدا (80-89%)', value: 'جيد جدا' },
  { label: 'جيد (70-79%)', value: 'جيد' },
  { label: 'مقبول (50-69%)', value: 'مقبول' },
  { label: 'راسب (أقل من 50%)', value: 'راسب' },
];

export default function ManagerDashboard() {
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('');
  const searchRef = useRef(null);

  const teacherList = Object.values(teacherData);

  const filteredStudents = useMemo(() => {
    return sortedStudents.filter(s => {
      const matchName = !search || s.name.includes(search);
      const pct = s.percentage * 100;
      let matchGrade = true;
      if (gradeFilter === 'امتياز')  matchGrade = pct >= 90;
      else if (gradeFilter === 'جيد جدا') matchGrade = pct >= 80 && pct < 90;
      else if (gradeFilter === 'جيد')   matchGrade = pct >= 70 && pct < 80;
      else if (gradeFilter === 'مقبول') matchGrade = pct >= 50 && pct < 70;
      else if (gradeFilter === 'راسب')  matchGrade = pct < 50;
      return matchName && matchGrade;
    });
  }, [search, gradeFilter]);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header Stats */}
      <header className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 md:p-6 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-6 rounded-2xl">
        <div className="text-center lg:text-right w-full lg:w-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">لوحة تحكم الإدارة</h1>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400">نظرة عامة على أداء جميع الفصول والمعلمين</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full lg:w-auto">
          <StatCard label="إجمالي الطلاب" value={validStudents.length} color="slate" />
          <StatCard label="متوسط النسبة" value={avgScore} color="blue" />
          <StatCard label="نسبة النجاح" value={passRate} color="sky" extra="col-span-2 md:col-span-1" />
        </div>
      </header>

      {/* Group & Teacher Selection Section */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 md:p-6 shadow-sm rounded-2xl">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 text-center border-b dark:border-slate-700 pb-4">
          تصفح نتائج المجموعات والمعلمين
        </h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 mr-2">اختر المعلم / المجموعة:</label>
            <select
              value={teacherFilter}
              onChange={e => setTeacherFilter(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-800 dark:text-white dark:bg-slate-700 font-bold cursor-pointer"
            >
              <option value="">-- عرض جميع المعلمين --</option>
              {teacherList.map((t, idx) => (
                <option key={idx} value={t.name}>{t.name}</option>
              ))}
            </select>
          </div>
          {teacherFilter && (
            <div className="flex items-end">
              <button
                onClick={() => setTeacherFilter('')}
                className="px-6 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-white font-bold rounded-xl transition-colors border border-slate-200 dark:border-slate-600"
              >
                عرض الكل
              </button>
            </div>
          )}
        </div>

        {!teacherFilter && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teacherList.map((t, i) => (
              <button
                key={i}
                onClick={() => setTeacherFilter(t.name)}
                className="p-4 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all text-right group"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">{t.name}</span>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-lg font-bold">
                    {t.total} طالب
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">نسبة الامتياز:</span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                    {t.total > 0 ? ((t.grades['امتياز'] / t.total) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Teacher Sections - Only show when a teacher is selected */}
      {teacherFilter && teacherList
        .filter(t => t.name === teacherFilter)
        .map((t, i) => (
          <TeacherSection key={i} teacher={t} />
        ))}

      {/* Teacher Ranking - Always Show */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 md:p-6 shadow-sm rounded-2xl">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-4 md:mb-6 border-b dark:border-slate-700 pb-4 text-center">
          ترتيب المعلمين حسب نسبة الامتياز
        </h2>
        <div className="overflow-x-auto overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700" style={{ maxHeight: 600 }}>
          <table className="w-full text-right mobile-card-table">
            <thead className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white border-b border-slate-200 dark:border-slate-600 sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="p-3 md:p-4 font-bold">الترتيب</th>
                <th className="p-3 md:p-4 font-bold">المعلم / الفصل</th>
                <th className="p-3 md:p-4 font-bold">إجمالي الطلاب</th>
                <th className="p-3 md:p-4 font-bold">عدد الامتياز</th>
                <th className="p-3 md:p-4 font-bold">نسبة الامتياز</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {teacherStats.map((t, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="p-3 md:p-4 text-slate-500 dark:text-slate-400 font-medium" data-label="الترتيب">{i + 1}</td>
                  <td className="p-3 md:p-4 font-bold text-slate-800 dark:text-white" data-label="المعلم / الفصل">{t.name}</td>
                  <td className="p-3 md:p-4 text-slate-600 dark:text-slate-300" data-label="إجمالي الطلاب">{t.total}</td>
                  <td className="p-3 md:p-4 font-semibold text-slate-800 dark:text-white" data-label="عدد الامتياز">{t.excellentCount}</td>
                  <td className="p-3 md:p-4" data-label="نسبة الامتياز">
                    <span className="bg-slate-100 dark:bg-slate-600 text-sky-700 dark:text-sky-300 py-1 px-3 rounded-md text-sm font-bold border border-slate-200 dark:border-slate-500">
                      {t.excellentPercentage.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* All Students Ranking - Always Show */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 md:p-6 shadow-sm rounded-2xl">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-4 md:mb-6 border-b dark:border-slate-700 pb-4 text-center">
          نتائج جميع الطلاب
        </h2>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-800 dark:text-white dark:bg-slate-700 font-semibold"
              placeholder="ابحث باسم الطالب..."
            />
            <svg className="w-5 h-5 text-slate-400 absolute right-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="relative">
            <select
              value={gradeFilter}
              onChange={e => setGradeFilter(e.target.value)}
              className="appearance-none w-full md:w-56 px-4 py-3 pr-10 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-800 dark:text-white dark:bg-slate-700 font-semibold cursor-pointer"
            >
              {GRADE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {(search || gradeFilter) && (
            <button
              onClick={() => { setSearch(''); setGradeFilter(''); searchRef.current?.focus(); }}
              className="px-4 py-3 rounded-xl border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              مسح الفلتر
            </button>
          )}
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 font-semibold">
          يتم عرض <span className="text-blue-600 dark:text-blue-400 font-bold">{filteredStudents.length}</span> من أصل {sortedStudents.length} طالب
        </p>

        <div className="overflow-x-auto overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700" style={{ maxHeight: 600 }}>
          <table className="w-full text-right mobile-card-table">
            <thead className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white border-b border-slate-200 dark:border-slate-600 sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="p-3 md:p-4 font-bold">الترتيب</th>
                <th className="p-3 md:p-4 font-bold">اسم الطالب</th>
                <th className="p-3 md:p-4 font-bold">المعلم / الفصل</th>
                <th className="p-3 md:p-4 font-bold">المجموع</th>
                <th className="p-3 md:p-4 font-bold">النسبة</th>
                <th className="p-3 md:p-4 font-bold">التقدير</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredStudents.map((s, i) => {
                const p = (s.percentage * 100).toFixed(1);
                return (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <td className="p-3 md:p-4 text-slate-500 dark:text-slate-400 font-medium" data-label="الترتيب">{sortedStudents.indexOf(s) + 1}</td>
                    <td className="p-3 md:p-4 font-bold text-slate-800 dark:text-white" data-label="اسم الطالب">{s.name}</td>
                    <td className="p-3 md:p-4 text-slate-600 dark:text-slate-300" data-label="المعلم / الفصل">{s.sheet}</td>
                    <td className="p-3 md:p-4 font-semibold text-slate-800 dark:text-white" data-label="المجموع">{s.total}</td>
                    <td className="p-3 md:p-4" data-label="النسبة">
                      <span className="bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-white py-1 px-3 rounded-md text-sm font-bold border border-slate-200 dark:border-slate-500">{p}%</span>
                    </td>
                    <td className="p-3 md:p-4" data-label="التقدير"><GradeTag percentage={s.percentage} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, color, extra = '' }) {
  const colors = {
    slate: 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white',
    blue: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
    sky: 'bg-sky-50 dark:bg-sky-900/30 border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300',
  };
  const labelColors = {
    slate: 'text-slate-500 dark:text-slate-400',
    blue: 'text-blue-600 dark:text-blue-400',
    sky: 'text-sky-600 dark:text-sky-400',
  };
  return (
    <div className={`p-3 md:px-6 md:py-4 rounded-xl border text-center ${colors[color]} ${extra}`}>
      <p className={`text-xs md:text-sm font-semibold mb-1 ${labelColors[color]}`}>{label}</p>
      <p className="text-xl md:text-3xl font-bold">{value}</p>
    </div>
  );
}
