import Link from 'next/link';
import ServiceIcon from './ServiceIcon';
import { services16 } from '@/data/services16';
import { waLink } from '@/data/siteConfig';
export default function ServicesGrid({ page = false }: { page?: boolean }) {
  return (
    <section id="services" className={`mx-auto max-w-6xl px-5 ${page ? 'py-16 md:py-24' : 'py-24 md:py-32'}`}>
      {!page && <div data-r className="max-w-2xl">
        <h2 className="font-display text-4xl font-bold sm:text-5xl">حِرفية تتجلى في كل زاوية من زوايا المنزل</h2>
        <p className="mt-3 text-muted">لا حاجة للتعامل مع عدة مقاولين ونجارين؛ ستة عشر تخصصاً يجمعها <b className="text-ink">بنيان</b> تحت سقف واحد بهوية متناغمة وعقد واحد.</p>
      </div>}
      <div className={`${page ? '' : 'mt-12'} grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4`}>
        {services16.map((s, i) => (
          <article key={s.id} data-r className="spot group flex flex-col bg-bg p-7 transition-colors hover:bg-surface" style={{ '--d': `${(i % 4) * 70}ms` } as React.CSSProperties}>
            <span className="inline-block w-fit transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-8deg] group-hover:scale-110"><ServiceIcon name={s.icon} size={32} /></span>
            <h3 className="mt-4 text-[17px] font-semibold leading-snug">{s.title}</h3>
            <p className="mt-1.5 flex-1 text-[14.5px] text-muted">{s.desc}</p>
            <div className="mt-4 flex gap-4 text-sm">
              {s.link && <Link href={s.link} className="text-gold hover:underline">التفاصيل</Link>}
              <a href={waLink(`السلام عليكم، أرغب بالاستفسار عن: ${s.title}`)} className="text-muted hover:text-gold">اطلب الخدمة</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
