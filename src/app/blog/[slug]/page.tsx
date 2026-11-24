import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import { articles } from '@/data/articles';
import { categories } from '@/data/categories';
export const dynamicParams = false;
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = articles.find((x) => x.slug === params.slug); if (!a) return {};
  return { title: `${a.title} | بنيان للديكورات`, description: a.desc, alternates: { canonical: `/blog/${a.slug}/` }, openGraph: { images: [a.image], type: 'article' } };
}
export default function Page({ params }: { params: { slug: string } }) {
  const i = articles.findIndex((x) => x.slug === params.slug); if (i < 0) notFound();
  const a = articles[i]; const c = categories.find((x) => x.slug === a.cat); const rel = [articles[(i + 1) % articles.length], articles[(i + 2) % articles.length]];
  const ld = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: a.title, description: a.desc, image: a.image, inLanguage: 'ar', author: { '@type': 'Organization', name: 'بنيان للديكورات' } };
  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <PageHero title={a.title} crumbs={[{ label: 'المدونة', href: '/blog/' }, { label: 'مقال' }]} />
    <article className="mx-auto max-w-2xl px-5 py-12 md:py-16">
      <img src={a.image} alt={a.alt} className="mb-8 aspect-[3/2] w-full rounded-3xl object-cover" />
      <p className="text-xl leading-9 text-muted">{a.desc}</p>
      {a.blocks.map((b, k) => b.t === 'p' ? <p key={k} className="mt-5 leading-9">{b.x}</p>
        : b.t === 'h' ? <h2 key={k} className="mt-10 font-display text-2xl font-bold text-gold">{b.x}</h2>
        : <ul key={k} className="mt-4 space-y-2 border-s-2 border-gold ps-5">{(b.x as string[]).map((li) => <li key={li}>{li}</li>)}</ul>)}
      {c && <p className="mt-10 rounded-3xl bg-sand p-5">اطّلع على قسم <Link href={`/products/${c.slug}/`} className="font-semibold text-gold hover:underline">{c.title}</Link> وتصاميمه.</p>}
      <div className="mt-10 border-t border-line pt-6"><p className="font-bold">اقرأ أيضًا</p><ul className="mt-2 space-y-1">{rel.map((r) => <li key={r.slug}><Link href={`/blog/${r.slug}/`} className="text-ink underline decoration-gold/70 underline-offset-4 hover:text-gold">{r.title}</Link></li>)}</ul></div>
    </article><CtaBand /></>);
}
