import { useRef, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import GradeTag from './GradeTag';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TeacherSection({ teacher }) {
  const { name, students, grades, total } = teacher;
  const sorted = [...students].sort((a, b) => b.total - a.total);

  const chartData = {
    labels: ['امتياز (90-100%)', 'جيد جدا (80-89%)', 'جيد (70-79%)', 'مقبول (50-69%)', 'راسب (أقل من 50%)'],
    datasets: [{
      data: [grades['امتياز'], grades['جيد جدا'], grades['جيد'], grades['مقبول'], grades['راسب']],
      backgroundColor: ['#3b82f6', '#eab308', '#f97316', '#ef4444', '#6b7280'],
      borderWidth: 1,
      borderColor: '#ffffff',
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { boxWidth: 12, padding: 10, font: { size: 10 } } },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const val = ctx.parsed;
            const perc = ((val / total) * 100).toFixed(1);
            return `${ctx.label}: ${val} (${perc}%)`;
          },
        },
      },
    },
  };

  return (
    <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 md:p-6 shadow-sm rounded-2xl animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-4 md:mb-6 border-b dark:border-slate-700 pb-4 text-center">
        المعلم / الفصل: {name}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl p-4 flex flex-col items-center card-hover shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 text-center">تحليل التقديرات</h3>
          <div className="h-[250px] md:h-[300px] w-full relative">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className="lg:col-span-2 overflow-y-auto overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 custom-scrollbar" style={{ maxHeight: 400 }}>
          <table className="w-full text-right relative mobile-card-table">
            <thead className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white border-b border-slate-200 dark:border-slate-600 sticky top-0 shadow-sm z-10">
              <tr>
                <th className="p-3 md:p-4 font-bold">م</th>
                <th className="p-3 md:p-4 font-bold">اسم الطالب</th>
                <th className="p-3 md:p-4 font-bold">المجموع</th>
                <th className="p-3 md:p-4 font-bold">النسبة</th>
                <th className="p-3 md:p-4 font-bold">التقدير</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {sorted.map((s, i) => {
                const p = (s.percentage * 100).toFixed(1);
                return (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200">
                    <td className="p-3 md:p-4 text-slate-500 dark:text-slate-400 font-medium" data-label="م">{i + 1}</td>
                    <td className="p-3 md:p-4 font-bold text-slate-800 dark:text-white" data-label="اسم الطالب">{s.name}</td>
                    <td className="p-3 md:p-4 font-semibold text-slate-800 dark:text-white" data-label="المجموع">{s.total}</td>
                    <td className="p-3 md:p-4" data-label="النسبة">
                      <span className="bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-white py-1.5 px-4 rounded-lg text-sm font-bold border border-slate-200 dark:border-slate-500 shadow-sm">{p}%</span>
                    </td>
                    <td className="p-3 md:p-4" data-label="التقدير">
                      <GradeTag percentage={s.percentage} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
