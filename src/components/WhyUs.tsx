import { why, stats } from '@/data/siteConfig';
export default function WhyUs() {
  return (
    <section className="bg-sand py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div data-r className="max-w-xl"><h2 className="font-display text-[1.85rem] font-bold leading-snug sm:text-4xl md:text-5xl">راحة بالك تبدأ من دقة التفاصيل.. وعود نلتزم بها كتابياً</h2>
          </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((w, i) => (<div key={w.title} data-r style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
            <span className="font-display text-5xl font-bold num">{(i + 1).toLocaleString('ar-SA')}</span>
            <h3 className="mt-2 text-lg font-semibold">{w.title}</h3><p className="mt-1.5 text-[15px] text-muted">{w.text}</p></div>))}
        </div>
        {stats.length > 0 && <div className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-10 sm:grid-cols-4">{stats.map((s) => (<div key={s.l} data-r><p className="font-display text-5xl font-bold text-gold">{s.n}</p><p className="text-muted">{s.l}</p></div>))}</div>}
      </div>
    </section>
  );
}
