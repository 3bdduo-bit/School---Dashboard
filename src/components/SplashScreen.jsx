import logo from '../assets/logo-m.png';

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="relative">
        <div className="absolute -inset-10 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="relative flex flex-col items-center">
          <div className="w-48 h-48 mb-8 bg-white/10 backdrop-blur-md  flex items-center justify-center border border-white/20 shadow-2xl animate-bounce overflow-hidden">
            
            <img src={logo} alt="Logo" className="w-full h-full object-contain p-4" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center tracking-tighter">
            النتيجة السنوية لمدرسة التربية بالقرءان الكريم
          </h1>
          <div className="h-1 w-48 bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-6"></div>
          <p className="text-blue-200 text-xl md:text-2xl font-light tracking-widest animate-pulse">
            النتيجة السنوية لعام 2025
          </p>
        </div>
      </div>
      <div className="absolute bottom-10 flex gap-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 bg-blue-300 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}
