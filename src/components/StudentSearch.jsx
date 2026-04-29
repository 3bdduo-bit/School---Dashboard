import { useState } from 'react';
import { allStudents, teachers } from '../data';
import GradeTag from './GradeTag';
import Swal from 'sweetalert2';

export default function StudentSearch() {
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const studentsForTeacher = allStudents
    .filter(s => s.sheet === selectedTeacher)
    .sort((a, b) => a.name.localeCompare(b.name, 'ar'));

  const handleShow = () => {
    if (!selectedTeacher || !selectedStudent) {
      setError('يرجى اختيار المعلم ثم الطالب أولاً.');
      return;
    }
    setError('');

    const searchKey = `${selectedTeacher}|${selectedStudent}`;
    const lastSearched = localStorage.getItem('lastSearchedStudent_2025_v2');
    let searchCount = parseInt(localStorage.getItem('studentSearchCount_2025_v2') || '0');

    if (lastSearched !== searchKey) {
      if (searchCount >= 5) {
        Swal.fire({
          icon: 'warning',
          title: 'تنبيه',
          text: 'لقد استنفدت عدد مرات البحث المتاحة (5 مرات كحد أقصى).',
          confirmButtonText: 'موافق',
          confirmButtonColor: '#9333ea',
        });
        return;
      }
      searchCount++;
      localStorage.setItem('studentSearchCount_2025_v2', searchCount);
      localStorage.setItem('lastSearchedStudent_2025_v2', searchKey);
    }

    const student = allStudents.find(s => s.sheet === selectedTeacher && s.name === selectedStudent);
    if (!student) {
      setError('لم يتم العثور على الطالب.');
      return;
    }
    setResult({ ...student, searchCount });
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 md:p-10 shadow-sm max-w-2xl mx-auto text-center rounded-2xl animate-fade-in">
      <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 hover:rotate-0 transition-transform duration-300 shadow-sm">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">عرض نتيجة الطالب</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8 text-base font-medium">
        اختر المعلم أولاً ثم اختر اسم الطالب من القائمة، ثم اضغط زر عرض النتيجة.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right mb-8">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 mr-2">1. اختيار المعلم</label>
          <select
            value={selectedTeacher}
            onChange={e => { setSelectedTeacher(e.target.value); setSelectedStudent(''); setResult(null); }}
            className="w-full px-4 py-3.5 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800 dark:text-white dark:bg-slate-700 font-bold cursor-pointer"
          >
            <option value="">-- اختر المعلم --</option>
            {teachers.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 mr-2">2. اختيار الطالب</label>
          <select
            value={selectedStudent}
            onChange={e => setSelectedStudent(e.target.value)}
            disabled={!selectedTeacher}
            className="w-full px-4 py-3.5 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800 dark:text-white dark:bg-slate-700 font-bold disabled:opacity-50 cursor-pointer"
          >
            <option value="">-- اختر الطالب --</option>
            {studentsForTeacher.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleShow}
          className="bg-purple-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-purple-700 hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-purple-500/20"
        >
          عرض النتيجة
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mt-4 font-bold animate-pulse">{error}</p>}

      {result && (
        <div className="mt-10 text-right bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-2xl p-6 md:p-8 shadow-inner animate-scale-up">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white border-b dark:border-slate-600 pb-4 mb-6 text-center">تفاصيل نتيجة الطالب</h3>
          <div className="space-y-4 mb-6 text-center">
            <div className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-1.5 rounded-full font-bold text-xs">
              عدد مرات البحث المستخدمة: {result.searchCount} من 5
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard label="الاسم الكامل" value={result.name} />
            <InfoCard label="المعلم / الفصل" value={result.sheet} />
            <InfoCard label="المجموع الكلي" value={<span className="font-extrabold text-2xl text-blue-700 dark:text-blue-400">{result.total}</span>} />
            <InfoCard label="النسبة المئوية" value={
              <span className="bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-white px-4 py-1.5 rounded-lg text-xl font-black inline-block shadow-sm">
                {(result.percentage * 100).toFixed(1)}%
              </span>
            } />
            <div className="col-span-1 md:col-span-2 bg-white dark:bg-slate-600 p-6 rounded-2xl border border-slate-100 dark:border-slate-500 shadow-sm text-center card-hover">
              <span className="text-slate-500 dark:text-slate-300 text-xs font-bold block mb-3 uppercase tracking-wider">التقدير النهائي العام</span>
              <div className="transform scale-125 origin-center"><GradeTag percentage={result.percentage} /></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="bg-white dark:bg-slate-600 p-5 rounded-2xl border border-slate-100 dark:border-slate-500 shadow-sm card-hover">
      <span className="text-slate-500 dark:text-slate-300 text-xs font-bold block mb-2 uppercase tracking-wider">{label}</span>
      <span className="font-bold text-lg text-slate-800 dark:text-white">{value}</span>
    </div>
  );
}
