import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Ph from '@/components/Ph';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import { categories } from '@/data/categories';
import { articles } from '@/data/articles';
import { findImage } from '@/lib/img';
export const dynamicParams = false;
export const generateStaticParams = () => categories.map((c) => ({ slug: c.slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = categories.find((x) => x.slug === params.slug); if (!c) return {};
  return { title: c.seoTitle, description: c.seoDesc, alternates: { canonical: `/products/${c.slug}/` }, openGraph: c.image ? { images: [c.image] } : undefined };
}
export default function Page({ params }: { params: { slug: string } }) {
  const c = categories.find((x) => x.slug === params.slug); if (!c) notFound();
  const cover = findImage(`/images/products/${c.slug}/cover`) ?? c.image;
  const rel = articles.filter((a) => c.articles.includes(a.slug));
  return (<>
    <PageHero title={c.title} text={c.short} crumbs={[{ label: 'المنتجات', href: '/products/' }, { label: c.title }]} />
    <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1fr_380px] md:py-24">
      <div className="space-y-5 text-lg leading-9">{c.intro.map((t) => <p key={t}>{t}</p>)}</div>
      <div data-r="mask" className="arch aspect-[4/5] w-full max-w-[380px] justify-self-center overflow-hidden bg-sand">{cover ? <img src={cover} alt={c.title} className="h-full w-full object-cover" /> : <Ph icon={c.icon} className="h-full w-full" />}</div>
    </div>
    <section className="bg-sand py-16 md:py-24"><div className="mx-auto max-w-6xl px-5">
      <h2 data-r className="font-display text-3xl font-bold sm:text-4xl">أنواع {c.title}</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{c.types.map((t, i) => { const ti = findImage(`/images/products/${c.slug}/${i + 1}`) ?? t.image; return (
        <article key={t.title} data-r style={{ '--d': `${i * 80}ms` } as React.CSSProperties}>
          <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-bg">{ti ? <img src={ti} alt={t.title} loading="lazy" className="h-full w-full object-cover" /> : <Ph icon={c.icon} className="h-full w-full" />}</div>
          <h3 className="mt-4 text-lg font-semibold">{t.title}</h3><p className="mt-1 text-[15px] text-muted">{t.text}</p></article>); })}</div>
    </div></section>
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
      <div><h2 className="font-display text-3xl font-bold sm:text-4xl">ما يميّز تصاميمنا</h2>
        <ul className="mt-6 space-y-3">{c.features.map((f) => <li key={f} className="flex gap-3"><Check size={20} className="mt-1 shrink-0 text-gold" />{f}</li>)}</ul>
        <Link href={`/studio/?mode=${({ closets: 'closets', 'walk-in-closets': 'walkin', bedrooms: 'bedroom', furniture: 'tv' } as Record<string, string>)[c.slug]}`} className="mt-8 inline-block rounded-full bg-pine px-7 py-3.5 font-medium text-white transition hover:bg-pine2 dark:bg-brass dark:text-pine">جرّب التصميم في الاستوديو</Link></div>
      <div><h2 className="font-display text-3xl font-bold sm:text-4xl">أسئلة شائعة</h2><div className="mt-6"><Faq items={c.faq} /></div></div>
    </section>
    {rel.length > 0 && <section className="mx-auto max-w-6xl px-5 pb-16"><h2 className="font-display text-2xl font-bold">مقالات ذات صلة</h2>
      <ul className="mt-4 space-y-2">{rel.map((a) => <li key={a.slug}><Link href={`/blog/${a.slug}/`} className="text-gold hover:underline">{a.title}</Link></li>)}</ul></section>}
    <CtaBand text={`مهتم بـ ${c.title}؟ أرسل لنا صور المكان ومقاساته ونرد عليك.`} />
  </>);
}
