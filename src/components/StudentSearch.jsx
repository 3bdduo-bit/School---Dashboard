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
      if (searchCount >= 3) {
        Swal.fire({
          icon: 'warning',
          title: 'تنبيه',
          text: 'لقد استنفدت عدد مرات البحث المتاحة (3 مرات كحد أقصى).',
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
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 md:p-10 shadow-sm max-w-2xl mx-auto text-center rounded-2xl">
      <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">عرض نتيجة الطالب</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
        اختر المعلم أولاً ثم اختر اسم الطالب من القائمة، ثم اضغط زر عرض النتيجة.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-right">
        <select
          value={selectedTeacher}
          onChange={e => { setSelectedTeacher(e.target.value); setSelectedStudent(''); setResult(null); }}
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800 dark:text-white dark:bg-slate-700 font-semibold"
        >
          <option value="">-- اختر المعلم --</option>
          {teachers.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <select
          value={selectedStudent}
          onChange={e => setSelectedStudent(e.target.value)}
          disabled={!selectedTeacher}
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-800 dark:text-white dark:bg-slate-700 font-semibold disabled:opacity-50"
        >
          <option value="">-- اختر الطالب --</option>
          {studentsForTeacher.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
        </select>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleShow}
          className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-md"
        >
          عرض النتيجة
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mt-3 font-semibold">{error}</p>}

      {result && (
        <div className="mt-8 text-right bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl p-6 shadow-inner animate-fade-in">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white border-b dark:border-slate-600 pb-3 mb-4 text-center">نتيجة الطالب</h3>
          <div className="space-y-3 mb-4 text-center">
            <p className="text-purple-600 dark:text-purple-400 font-bold text-sm">
              عدد مرات البحث المستخدمة: {result.searchCount} من 3
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard label="الاسم" value={result.name} />
            <InfoCard label="المعلم / الفصل" value={result.sheet} />
            <InfoCard label="المجموع" value={<span className="font-bold text-xl text-blue-700 dark:text-blue-400">{result.total}</span>} />
            <InfoCard label="النسبة" value={
              <span className="bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-white px-3 py-1 rounded text-lg font-bold inline-block">
                {(result.percentage * 100).toFixed(1)}%
              </span>
            } />
            <div className="col-span-1 md:col-span-2 bg-white dark:bg-slate-600 p-4 rounded-xl border border-slate-100 dark:border-slate-500 shadow-sm text-center">
              <span className="text-slate-500 dark:text-slate-300 text-sm block mb-2">التقدير العام</span>
              <div className="text-2xl"><GradeTag percentage={result.percentage} /></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="bg-white dark:bg-slate-600 p-4 rounded-xl border border-slate-100 dark:border-slate-500 shadow-sm">
      <span className="text-slate-500 dark:text-slate-300 text-sm block mb-1">{label}</span>
      <span className="font-bold text-lg text-slate-800 dark:text-white">{value}</span>
    </div>
  );
}
