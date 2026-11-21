import Link from 'next/link';
import ServiceIcon from './ServiceIcon';
import { services } from '@/data/services';
export default function ServicesGrid() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="max-w-xl">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">خدمات تُفصَّل على مقاس مساحتك</h2>
        <p className="mt-3 text-muted">كل عمل يُنفَّذ حسب الطلب، من الدهان البسيط حتى تشطيب الفيلا كاملة.</p>
      </div>
      <div className="mt-12 grid border-s border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          return (
            <article key={s.id} className="group border-b border-e border-line p-7 transition-colors hover:bg-surface">
              <ServiceIcon name={s.icon} />
              <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 text-[15px] text-muted">{s.desc}</p>
            </article>
          );
        })}
      </div>
      <Link href="/services/" className="mt-8 inline-block border-b border-gold pb-1 hover:text-gold">تفاصيل كل الخدمات</Link>
    </section>
  );
}
