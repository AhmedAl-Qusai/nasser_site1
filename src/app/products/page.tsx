import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Ph from '@/components/Ph';
import CtaBand from '@/components/CtaBand';
import { categories } from '@/data/categories';
import { findImage } from '@/lib/img';
export const metadata: Metadata = { title: 'منتجاتنا: خزائن، غرف ملابس، غرف نوم وأثاث | بنيان للديكورات', description: 'تصفّح أقسام بنيان للديكورات في الأحساء: خزائن ملابس، غرف ملابس، غرف نوم متكاملة وأثاث مفصّل بخشب MDF على مقاس مساحتك.', alternates: { canonical: '/products/' } };
export default function Page() {
  return (<><PageHero title="منتجاتنا" text="استكشف أقسامنا: كل قطعة تُفصَّل على مقاس مساحتك." crumbs={[{ label: 'المنتجات' }]} />
    <div className="mx-auto max-w-6xl space-y-16 px-5 py-16 md:py-24">
      {categories.map((c, i) => (
        <section key={c.slug} data-r className="grid items-center gap-8 md:grid-cols-2">
          <Link href={`/products/${c.slug}/`} className={`arch block aspect-[4/5] max-w-[380px] overflow-hidden bg-sand ${i % 2 ? 'md:order-2 md:justify-self-end' : ''}`}>
            {(findImage(`/images/products/${c.slug}/cover`) ?? c.image) ? <img src={findImage(`/images/products/${c.slug}/cover`) ?? c.image} alt={c.title} loading="lazy" className="h-full w-full object-cover" /> : <Ph icon={c.icon} className="h-full w-full" />}
          </Link>
          <div><p dir="ltr" className="text-start text-xs tracking-[0.25em] text-gold">{c.en.toUpperCase()}</p>
            <h2 className="mt-1 font-display text-4xl font-bold"><Link href={`/products/${c.slug}/`} className="hover:text-gold">{c.title}</Link></h2>
            <p className="mt-3 text-muted">{c.short}</p>
            <ul className="mt-5 flex flex-wrap gap-2">{c.types.map((t) => <li key={t.title} className="rounded-full border border-line px-4 py-1.5 text-sm">{t.title}</li>)}</ul>
            <Link href={`/products/${c.slug}/`} className="mt-6 inline-block border-b border-gold pb-1 hover:text-gold">استعرض القسم</Link></div>
        </section>
      ))}
    </div><CtaBand /></>);
}
