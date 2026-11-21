import Link from 'next/link';
import ServiceIcon from './ServiceIcon';
import { services } from '@/data/services';
export default function ServicesGrid() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <div data-r className="max-w-xl">
        <h2 className="font-display text-4xl font-bold sm:text-5xl">خدمات تُفصَّل على مقاس مساحتك</h2>
        <p className="mt-3 text-muted">كل عمل يُنفَّذ حسب الطلب، من الدهان البسيط حتى تشطيب الفيلا كاملة.</p>
      </div>
      <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <article key={s.id} data-r className="spot group bg-bg p-8 transition-colors hover:bg-surface" style={{ '--d': `${(i % 3) * 90}ms` } as React.CSSProperties}>
            <span className="inline-block transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-8deg] group-hover:scale-110"><ServiceIcon name={s.icon} size={34} /></span>
            <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
            <p className="mt-1.5 text-[15px] text-muted">{s.desc}</p>
          </article>
        ))}
      </div>
      <Link href="/services/" className="mt-8 inline-block border-b border-gold pb-1 hover:text-gold">تفاصيل كل الخدمات</Link>
    </section>
  );
}
