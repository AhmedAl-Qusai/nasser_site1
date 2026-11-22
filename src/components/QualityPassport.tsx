import { quality } from '@/data/quality';
import ServiceIcon from './ServiceIcon';
export default function QualityPassport({ page = false }: { page?: boolean }) {
  return (
    <section id="quality" className={`bg-sand ${page ? 'py-16 md:py-24' : 'py-24 md:py-28'}`}>
      <div className="mx-auto max-w-6xl px-5">
        {!page && <div data-r className="max-w-2xl"><h2 className="font-display text-4xl font-bold sm:text-5xl">جواز جودة بنيان</h2><p className="mt-3 text-muted">شفافية كاملة في المواصفات، لأن الثقة تبدأ من التفاصيل.</p></div>}
        <div className={`${page ? '' : 'mt-12'} grid gap-5 sm:grid-cols-2 lg:grid-cols-4`}>
          {quality.map((q, i) => (
            <article key={q.title} data-r className="relative rounded-[1.75rem] border border-dashed border-gold/70 bg-bg p-7" style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
              <span className="absolute end-5 top-4 font-display text-3xl text-gold/25">{(i + 1).toLocaleString('ar-SA')}</span>
              <ServiceIcon name={q.icon} size={34} /><h3 className="mt-4 text-lg font-semibold">{q.title}</h3><p className="mt-1.5 text-[15px] text-muted">{q.text}</p>
            </article>))}
        </div>
      </div>
    </section>
  );
}
