import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calculator, Footprints, Images } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import { articles } from '@/data/articles';
import { categories } from '@/data/categories';
import { siteUrl } from '@/data/siteConfig';

export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = articles.find((x) => x.slug === params.slug);
  if (!a) return {};
  return {
    title: `${a.title} | بنيان للديكورات`,
    description: a.desc,
    keywords: a.keywords,
    alternates: { canonical: `/blog/${a.slug}/` },
    openGraph: {
      title: a.title,
      description: a.desc,
      url: `${siteUrl}/blog/${a.slug}/`,
      images: [a.image],
      type: 'article',
      locale: 'ar_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: a.title,
      description: a.desc,
      images: [a.image],
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const i = articles.findIndex((x) => x.slug === params.slug);
  if (i < 0) notFound();
  const a = articles[i];
  const c = categories.find((x) => x.slug === a.cat);
  const rel = a.related?.length
    ? articles.filter((x) => a.related!.includes(x.slug))
    : [articles[(i + 1) % articles.length], articles[(i + 2) % articles.length], articles[(i + 3) % articles.length]];

  const ldArticle = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: a.title,
    description: a.summary ?? a.desc,
    image: `${siteUrl}${a.image}`,
    inLanguage: 'ar',
    mainEntityOfPage: `${siteUrl}/blog/${a.slug}/`,
    author: { '@type': 'Organization', name: 'بنيان للديكورات BONYAN', url: siteUrl },
    publisher: { '@type': 'Organization', name: 'بنيان للديكورات BONYAN', logo: { '@type': 'ImageObject', url: `${siteUrl}/images/logo.png` } },
  };

  const ldBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'المدونة', item: `${siteUrl}/blog/` },
      { '@type': 'ListItem', position: 3, name: a.title, item: `${siteUrl}/blog/${a.slug}/` },
    ],
  };

  const ldFaq = a.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: a.faq.map((q) => ({
          '@type': 'Question',
          name: q.q,
          acceptedAnswer: { '@type': 'Answer', text: q.a },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldArticle) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBreadcrumb) }} />
      {ldFaq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldFaq) }} />}
      <PageHero title={a.title} crumbs={[{ label: 'المدونة', href: '/blog/' }, { label: 'مقال' }]} />
      <article className="mx-auto max-w-2xl px-5 py-12 md:py-16">
        <img src={a.image} alt={a.alt} className="mb-8 aspect-[3/2] w-full rounded-3xl object-cover shadow-md" />
        <p className="text-xl leading-9 text-muted">{a.desc}</p>

        {a.summary && (
          <aside className="mt-6 rounded-3xl border border-gold/40 bg-sand/70 p-5">
            <p className="font-display text-sm font-bold text-gold">الخلاصة السريعة</p>
            <p className="mt-1.5 text-[15px] leading-8 text-ink">{a.summary}</p>
          </aside>
        )}

        {a.blocks.map((b, k) =>
          b.t === 'p' ? (
            <p key={k} className="mt-5 leading-9">
              {b.x}
            </p>
          ) : b.t === 'h' ? (
            <h2 key={k} className="mt-10 font-display text-2xl font-bold text-gold">
              {b.x}
            </h2>
          ) : (
            <ul key={k} className="mt-4 space-y-2 border-s-2 border-gold ps-5">
              {(b.x as string[]).map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          )
        )}

        <div className="mt-10 flex flex-wrap gap-2.5 rounded-3xl border border-line bg-surface p-5">
          {a.serviceId && (
            <Link
              href={`/studio/?mode=${a.serviceId}`}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-pine px-5 py-2 text-sm font-medium text-white transition hover:bg-pine2 dark:bg-brass dark:text-pine"
            >
              <Footprints size={16} />
              جرّب التصميم في استوديو 3D
            </Link>
          )}
          {a.galleryCat && (
            <Link
              href={`/portfolio/?cat=${a.galleryCat}`}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-line px-5 py-2 text-sm transition hover:border-gold hover:text-gold"
            >
              <Images size={16} />
              شاهد صور القسم في المعرض
            </Link>
          )}
          <Link
            href="/calculator/"
            className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-line px-5 py-2 text-sm transition hover:border-gold hover:text-gold"
          >
            <Calculator size={16} />
            احسب التكلفة في 30 ثانية
          </Link>
          {c && (
            <Link
              href={`/products/${c.slug}/`}
              className="inline-flex min-h-[42px] items-center rounded-full border border-line px-5 py-2 text-sm transition hover:border-gold hover:text-gold"
            >
              قسم {c.title}
            </Link>
          )}
        </div>

        {a.faq && a.faq.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 font-display text-2xl font-bold">أسئلة شائعة</h2>
            <Faq items={a.faq} />
          </section>
        )}

        <div className="mt-10 border-t border-line pt-6">
          <p className="font-bold">مقالات ذات صلة</p>
          <ul className="mt-3 space-y-2">
            {rel.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}/`} className="text-ink underline decoration-gold/70 underline-offset-4 hover:text-gold">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
