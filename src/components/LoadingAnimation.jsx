import logo from '../assets/final-logo.jpeg';

export default function LoadingAnimation({ text }) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-48 h-48 border-4 border-t-blue-500 border-r-purple-500 border-b-sky-500 border-l-transparent rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
        <div className="absolute w-32 h-32 border-4 border-t-purple-500 border-r-transparent border-b-blue-500 border-l-sky-500 rounded-full animate-spin" style={{ animationDuration: '1s', animationDirection: 'reverse' }}></div>
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.5)] overflow-hidden">
          <img src={logo} alt="Logo" className="w-full h-full object-contain p-1" />
        </div>
      </div>
      <div className="mt-20">
        <h2 className="text-4xl font-bold text-white tracking-wider animate-pulse">{text}</h2>
      </div>
    </div>
  );
}
