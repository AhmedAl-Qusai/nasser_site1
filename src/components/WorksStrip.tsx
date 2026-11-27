import Link from 'next/link';
import { getHomeShowcase } from '@/lib/works';
// شريط أفقي يعرض نماذج من الأقسام المضافة في المعرض
export default function WorksStrip() {
  const items = getHomeShowcase();
  if (items.length === 0) return null;
  return (
    <section id="works" className="py-14 sm:py-20 md:py-28">
      <div className="mx-auto flex max-w-6xl items-end justify-between gap-4 px-5">
        <div data-r><p dir="ltr" className="text-start text-xs tracking-[0.25em] text-gold">REAL PROJECTS</p><h2 className="mt-1 font-display text-[1.85rem] font-bold leading-snug sm:text-4xl md:text-5xl">من أعمالنا الحقيقية</h2></div>
        <Link href="/portfolio/" className="shrink-0 text-sm text-ink underline decoration-gold/70 underline-offset-4 hover:text-gold">كل الأعمال</Link>
      </div>
      <ul className="noscroll mx-auto mt-8 flex max-w-6xl snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
        {items.map((w) => (
          <li key={w.id} className="w-[72%] shrink-0 snap-start sm:w-[36%] lg:w-[24%]">
            <Link href={`/portfolio/?cat=${w.category}`} className="group block">
              <div className="aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-sand"><img src={w.after} alt={w.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
              <p className="mt-3 font-semibold leading-snug">{w.title}</p>{w.note && <p className="text-sm text-muted">{w.note}</p>}
            </Link>
          </li>))}
      </ul>
    </section>
  );
}
