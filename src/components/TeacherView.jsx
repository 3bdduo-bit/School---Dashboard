import { useState } from 'react';
import { teachers, teacherData } from '../data';
import TeacherSection from './TeacherSection';
import Swal from 'sweetalert2';

export default function TeacherView() {
  const [selectedTeacher, setSelectedTeacher] = useState('');

  const handleSelect = async (e) => {
    const selected = e.target.value;
    if (!selected) return;

    const lockedTeacher = localStorage.getItem('lockedTeacher_2025');
    const loginCount = parseInt(localStorage.getItem('teacherLoginCount_2025') || '0');

    if (lockedTeacher && lockedTeacher !== selected && loginCount >= 1) {
      await Swal.fire({
        icon: 'warning',
        title: 'تنبيه',
        text: 'عفواً، لا يمكنك تسجيل الدخول لمعلم آخر على هذا الجهاز (مسموح لمعلم واحد فقط).',
        confirmButtonText: 'موافق',
        confirmButtonColor: '#0ea5e9',
      });
      e.target.value = lockedTeacher || '';
      return;
    }

    const { isConfirmed, value: pass } = await Swal.fire({
      title: 'كلمة مرور المعلم',
      input: 'password',
      inputLabel: 'أدخل كلمة المرور الخاصة بالمعلم المحدد',
      inputPlaceholder: 'أدخل كلمة المرور',
      confirmButtonText: 'دخول',
      cancelButtonText: 'إلغاء',
      showCancelButton: true,
      confirmButtonColor: '#0ea5e9',
      cancelButtonColor: '#ef4444',
      allowOutsideClick: false,
      didOpen: () => {
        const input = Swal.getInput();
        if (input) {
          const toggleContainer = document.createElement('div');
          toggleContainer.style.display = 'flex';
          toggleContainer.style.justifyContent = 'center';
          toggleContainer.style.marginTop = '8px';

          const toggleBtn = document.createElement('button');
          toggleBtn.type = 'button';
          toggleBtn.className = 'text-slate-500 dark:text-slate-400 text-sm font-semibold flex items-center gap-1';
          toggleBtn.style.background = 'none';
          toggleBtn.style.border = 'none';
          toggleBtn.style.cursor = 'pointer';
          
          const showIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>`;
          const hideIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/></svg>`;

          toggleBtn.innerHTML = `${showIcon} <span>إظهار كلمة المرور</span>`;
          
          toggleBtn.onclick = () => {
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            toggleBtn.innerHTML = isPassword 
              ? `${hideIcon} <span>إخفاء كلمة المرور</span>`
              : `${showIcon} <span>إظهار كلمة المرور</span>`;
          };
          
          toggleContainer.appendChild(toggleBtn);
          input.parentElement.appendChild(toggleContainer);
        }
      },
      preConfirm: (val) => {
        if ((val || '') !== selected) {
          Swal.showValidationMessage('كلمة المرور غير صحيحة لهذا المعلم.');
          return false;
        }
        return val;
      },
    });

    if (!isConfirmed) {
      e.target.value = lockedTeacher || '';
      return;
    }

    if (lockedTeacher !== selected) {
      localStorage.setItem('teacherLoginCount_2025', '1');
      localStorage.setItem('lockedTeacher_2025', selected);
    }

    setSelectedTeacher(selected);
  };

  const handleTeacherLogout = () => {
    setSelectedTeacher('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-sm rounded-2xl flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="text-center md:text-right">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {selectedTeacher ? `مرحباً بك: أ / ${selectedTeacher}` : 'مرحباً بك أستاذي الفاضل'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {selectedTeacher 
              ? 'يتم الآن عرض بيانات طلاب فصلك حصرياً' 
              : 'اختر اسمك من القائمة لعرض بيانات طلاب فصلك حصرياً'}
          </p>
        </div>

        {selectedTeacher ? (
          <button
            onClick={handleTeacherLogout}
            className="px-6 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4-4H3" />
            </svg>
            تسجيل الخروج من الحساب
          </button>
        ) : (
          <select
            onChange={handleSelect}
            defaultValue=""
            className="px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none w-full md:w-72 bg-slate-50 dark:bg-slate-700 dark:text-white font-bold text-slate-700 cursor-pointer"
          >
            <option value="">-- اضغط لاختيار اسمك --</option>
            {teachers.map(t => {
              const locked = localStorage.getItem('lockedTeacher_2025');
              // If someone is locked, we can either hide others or just let the handleSelect handle it
              // Hiding others makes it "don't allow" more clear
              if (locked && t !== locked) return null;
              return <option key={t} value={t}>{t}</option>
            })}
          </select>
        )}
      </div>

      {selectedTeacher && teacherData[selectedTeacher] && (
        <TeacherSection teacher={teacherData[selectedTeacher]} />
      )}
    </div>
  );
}
