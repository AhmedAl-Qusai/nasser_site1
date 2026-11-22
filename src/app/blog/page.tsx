import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { articles } from '@/data/articles';
export const metadata: Metadata = { title: 'المدونة: نصائح الخزائن وغرف النوم والأثاث في الأحساء | بنيان', description: 'مقالات عن اختيار الخزائن وغرف الملابس وغرف النوم والأثاث المفصّل بخشب MDF، والمقاسات والإضاءة والتنظيم.', alternates: { canonical: '/blog/' } };
export default function Page() {
  return (<><PageHero title="المدونة" text="أفكار ونصائح لخزائنك وغرفك." crumbs={[{ label: 'المدونة' }]} />
    <div className="mx-auto grid max-w-6xl gap-x-6 gap-y-10 px-5 py-12 sm:grid-cols-2 md:py-16 lg:grid-cols-3">
      {articles.map((a) => (<article key={a.slug} data-r><Link href={`/blog/${a.slug}/`} className="group block">
        <div className="aspect-[3/2] overflow-hidden rounded-3xl bg-sand"><img src={a.image} alt={a.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
        <h2 className="mt-4 text-lg font-bold leading-snug group-hover:text-gold">{a.title}</h2><p className="mt-2 line-clamp-3 text-[15px] text-muted">{a.desc}</p></Link></article>))}
    </div></>);
}
