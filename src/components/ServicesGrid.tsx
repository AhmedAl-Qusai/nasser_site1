import Link from 'next/link';
import ServiceIcon from './ServiceIcon';
import { services16 } from '@/data/services16';
import { waLink } from '@/data/siteConfig';
import { findImage } from '@/lib/img';
export default function ServicesGrid({ page = false }: { page?: boolean }) {
  return (
    <section id="services" className={`mx-auto max-w-6xl px-5 ${page ? 'py-16 md:py-24' : 'py-14 sm:py-20 md:py-32'}`}>
      {!page && <div data-r className="max-w-2xl">
        <h2 className="font-display text-4xl font-bold sm:text-5xl">حِرفية تتجلى في كل زاوية من زوايا المنزل</h2>
        <p className="mt-3 text-muted">لا حاجة للتعامل مع عدة مقاولين ونجارين؛ ستة عشر تخصصاً يجمعها <b className="text-ink">بنيان</b> تحت سقف واحد بهوية متناغمة وعقد واحد.</p>
      </div>}
      <div className={`${page ? '' : 'mt-12'} grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:rounded-[2rem] lg:grid-cols-4`}>
        {services16.map((s, i) => {
          const img = findImage(`/images/services/${s.id}`);
          return (
          <article key={s.id} data-r className="spot group flex flex-col bg-bg p-4 transition-colors hover:bg-surface sm:p-7" style={{ '--d': `${(i % 4) * 70}ms` } as React.CSSProperties}>
            {img ? <img src={img} alt={s.title} loading="lazy" className="mb-4 aspect-[4/3] w-full rounded-2xl object-cover" /> : <span className="inline-block w-fit transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-8deg] group-hover:scale-110"><ServiceIcon name={s.icon} size={30} /></span>}
            <h3 className="mt-2.5 text-[15px] font-semibold leading-snug sm:mt-3 sm:text-[17px]">{s.title}</h3>
            <p className="mt-1 line-clamp-3 flex-1 text-[13px] leading-6 text-muted sm:text-[14.5px] sm:line-clamp-none">{s.desc}</p>
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-0.5 text-[13px] sm:mt-4 sm:gap-x-4 sm:text-sm">
              {s.link && <Link href={s.link} className="text-gold hover:underline">التفاصيل</Link>}
              {s.studio && <Link href={`/studio/?mode=${s.studio}`} className="text-gold hover:underline">جرّب في 3D</Link>}
              <a href={waLink(`السلام عليكم، أرغب بالاستفسار عن: ${s.title}`)} className="text-muted hover:text-gold">اطلب الخدمة</a>
            </div>
          </article>
        ); })}
      </div>
    </section>
  );
}
