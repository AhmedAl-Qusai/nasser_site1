import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import { articles } from '@/data/articles';
export const dynamicParams = false;
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = articles.find((x) => x.slug === params.slug); if (!a) return {};
  return { title: `${a.title} | بنيان للديكورات`, description: a.excerpt, alternates: { canonical: `/blog/${a.slug}/` }, openGraph: { images: [a.image], type: 'article' } };
}
export default function Page({ params }: { params: { slug: string } }) {
  const i = articles.findIndex((x) => x.slug === params.slug); if (i < 0) notFound();
  const a = articles[i]; const rel = [articles[(i + 1) % articles.length], articles[(i + 2) % articles.length]];
  const ld = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: a.title, description: a.excerpt, image: a.image, inLanguage: 'ar', author: { '@type': 'Organization', name: 'بنيان للديكورات' } };
  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <PageHero title={a.title} crumbs={[{ label: 'المدونة', href: '/blog/' }, { label: a.title.split('–')[0].trim() }]} />
    <article className="mx-auto max-w-2xl px-5 py-12 md:py-16">
      <img src={a.image} alt={a.alt} className="mb-8 aspect-[3/2] w-full object-cover" />
      <p className="text-xl leading-9">{a.excerpt}</p>
      {a.blocks.map((b, k) => b.t === 'p' ? <p key={k} className="mt-5 leading-9">{b.x}</p>
        : b.t === 'h' ? <h2 key={k} className="mt-10 font-display text-2xl font-semibold text-gold">{b.x}</h2>
        : <ul key={k} className="mt-4 space-y-2 border-s-2 border-gold ps-5">{(b.x as string[]).map((li) => <li key={li}>{li}</li>)}</ul>)}
      <div className="mt-12 border-t border-line pt-6"><p className="font-bold">اقرأ أيضًا</p>
        <ul className="mt-2 space-y-1">{rel.map((r) => <li key={r.slug}><Link href={`/blog/${r.slug}/`} className="text-gold hover:underline">{r.title}</Link></li>)}</ul></div>
    </article>
    <CtaBand />
  </>);
}
