export function getGradeInfo(p) {
  if (p >= 90) return { label: 'امتياز', className: 'text-sky-600 font-bold' };
  if (p >= 80) return { label: 'جيد جدا', className: 'text-blue-600 font-bold' };
  if (p >= 70) return { label: 'جيد', className: 'text-yellow-600 font-bold' };
  if (p >= 50) return { label: 'مقبول', className: 'text-orange-500 font-bold' };
  return { label: 'راسب', className: 'text-red-600 font-bold' };
}

export default function GradeTag({ percentage }) {
  const p = percentage * 100;
  const { label, className } = getGradeInfo(p);
  return <span className={className}>{label}</span>;
}
