import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { articles } from '@/data/articles';
export const metadata: Metadata = { title: 'المدونة: نصائح الديكور والدهانات في الأحساء | بنيان للديكورات', description: 'مقالات عن الدهانات والجبس بورد وبديل الرخام والخشب وديكورات التلفزيون وترميم المنازل في الأحساء.', alternates: { canonical: '/blog/' } };
export default function Page() {
  return (<><PageHero title="المدونة" text="أفكار ونصائح لتجديد مساحتك." crumbs={[{ label: 'المدونة' }]} />
    <div className="mx-auto grid max-w-6xl gap-x-6 gap-y-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-3 md:py-16">
      {articles.map((a) => (
        <article key={a.slug}><Link href={`/blog/${a.slug}/`} className="group block">
          <div className="aspect-[3/2] overflow-hidden bg-sand"><img src={a.image} alt={a.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
          <h2 className="mt-4 text-lg font-bold leading-snug group-hover:text-gold">{a.title}</h2>
          <p className="mt-2 line-clamp-3 text-[15px] text-muted">{a.excerpt}</p>
        </Link></article>
      ))}
    </div></>);
}
