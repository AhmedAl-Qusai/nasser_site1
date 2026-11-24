// شريط الخامات: ألوان الخامات الحقيقية (نفس ألوان الاستوديو)
export default function FinishStrip({ className = 'h-1.5' }: { className?: string }) {
  return (<div aria-hidden className={`flex ${className}`}>{['#C9A77A', '#5A3B26', '#F1EEE8', '#B9B1A4', '#667A63', '#383C3F'].map((c) => <i key={c} className="flex-1" style={{ background: c }} />)}</div>);
}
