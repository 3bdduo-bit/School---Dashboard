import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import LoadingAnimation from './components/LoadingAnimation';
import RoleSelection from './components/RoleSelection';
import ManagerDashboard from './components/ManagerDashboard';
import TeacherView from './components/TeacherView';
import StudentSearch from './components/StudentSearch';
import Swal from 'sweetalert2';

export default function App() {
  const [phase, setPhase] = useState('splash');
  const [role, setRole] = useState(null);
  const [loadingText, setLoadingText] = useState('');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('school_dashboard_theme') === 'dark');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPhase('roles'), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('school_dashboard_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleRoleSelect = async (selectedRole) => {
    if (selectedRole === 'manager') {
      const { isConfirmed } = await Swal.fire({
        title: 'تسجيل دخول المدير',
        input: 'password',
        inputPlaceholder: 'أدخل كلمة مرور المدير',
        confirmButtonText: 'دخول',
        cancelButtonText: 'إلغاء',
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#ef4444',
        didOpen: () => { 
          const input = Swal.getInput();
          if (input) {
            input.focus();
            // Create toggle button container
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
            input.style.paddingLeft = '12px'; // Reset padding
            input.style.paddingRight = '12px';
          }
        },
        preConfirm: (val) => {
          if ((val || '') !== 'أبو عمار') {
            Swal.showValidationMessage('كلمة مرور المدير غير صحيحة.');
            return false;
          }
          return true;
        },
      });
      if (!isConfirmed) return;
    }
    const texts = { manager: 'جاري الدخول كمدير...', teacher: 'جاري الدخول كمعلم...', student: 'جاري الدخول كطالب...' };
    setLoadingText(texts[selectedRole]);
    setPhase('loading');
    setTimeout(() => {
      setRole(selectedRole);
      setPhase('app');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  const handleLogout = () => {
    setPhase('roles');
    setRole(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sunPath = "M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z";
  const moonPath = "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z";

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white">
        <button
          onClick={() => setDarkMode(d => !d)}
          className="fixed top-6 right-6 z-[300] w-16 h-8 bg-slate-200 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-full cursor-pointer transition-all duration-300 flex items-center px-1"
          style={{ justifyContent: darkMode ? 'flex-end' : 'flex-start' }}
        >
          <div className="w-6 h-6 bg-white dark:bg-slate-900 rounded-full shadow flex items-center justify-center transition-all duration-300">
            <svg className="w-4 h-4 text-slate-700 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={darkMode ? sunPath : moonPath} />
            </svg>
          </div>
        </button>

        {phase === 'splash' && <SplashScreen />}
        {phase === 'loading' && <LoadingAnimation text={loadingText} />}
        {phase === 'roles' && <RoleSelection onSelect={handleRoleSelect} />}

        {phase === 'app' && (
          <div className="p-2 md:p-8 w-full max-w-7xl mx-auto space-y-6 md:space-y-8 animate-fade-in">
            <div className="flex justify-end pt-12 md:pt-0">
              <button
                onClick={handleLogout}
                className="text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 font-bold text-slate-700 dark:text-white transition-colors flex items-center gap-2"
              >
                <span>عودة للرئيسية</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
            {role === 'manager' && <ManagerDashboard />}
            {role === 'teacher' && <TeacherView />}
            {role === 'student' && <StudentSearch />}
          </div>
        )}

        {phase === 'app' && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-6 right-6 bg-slate-800 dark:bg-slate-600 text-white p-3 rounded-full shadow-lg z-50 transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
