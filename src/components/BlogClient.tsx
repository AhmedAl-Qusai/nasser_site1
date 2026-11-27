'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import type { Article } from '@/data/articles';

const catTabs = [
  { k: 'all', l: 'جميع المقالات' },
  { k: 'closets', l: 'الخزائن والأبواب والمداخل' },
  { k: 'bedrooms', l: 'غرف النوم والترميم' },
  { k: 'walk-in-closets', l: 'غرف الملابس' },
  { k: 'furniture', l: 'التلفزيون والمطابخ والديكور' },
];

export default function BlogClient({ articles }: { articles: Article[] }) {
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const needle = q.trim();

  const filtered = articles.filter((a) => {
    if (cat !== 'all' && a.cat !== cat) return false;
    if (needle && !a.title.includes(needle) && !a.desc.includes(needle)) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="noscroll -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0" role="tablist" aria-label="تصنيف المقالات">
          {catTabs.map((t) => (
            <button
              key={t.k}
              role="tab"
              aria-selected={cat === t.k}
              onClick={() => setCat(t.k)}
              className={`inline-flex min-h-[42px] shrink-0 items-center rounded-full border px-4 py-2 text-sm transition ${
                cat === t.k ? 'border-pine bg-pine text-white dark:border-brass dark:bg-brass dark:text-pine' : 'border-line hover:border-gold'
              }`}
            >
              {t.l}
            </button>
          ))}
        </div>
        <div className="relative min-w-[230px]">
          <Search size={16} className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث في الأدلة والمقالات…"
            aria-label="ابحث في المدونة"
            className="h-11 w-full rounded-full border border-line bg-surface pe-4 ps-10 text-sm outline-none transition focus:border-gold"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-muted">لا توجد مقالات مطابقة للبحث الحالي.</p>
      ) : (
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <article key={a.slug} className="flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-3 transition hover:border-gold/70 hover:shadow-lg">
              <Link href={`/blog/${a.slug}/`} className="group block flex-1">
                <div className="aspect-[3/2] overflow-hidden rounded-2xl bg-sand">
                  <img
                    src={a.image}
                    alt={a.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h2 className="mt-4 px-1 text-lg font-bold leading-snug group-hover:text-gold">{a.title}</h2>
                <p className="mt-2 line-clamp-3 px-1 text-[15px] text-muted">{a.desc}</p>
              </Link>
              <div className="mt-4 flex flex-wrap gap-2 px-1 pb-1 text-xs">
                <Link href={`/blog/${a.slug}/`} className="font-medium text-gold underline underline-offset-4">
                  اقرأ الدليل
                </Link>
                {a.serviceId && (
                  <Link href={`/studio/?mode=${a.serviceId}`} className="text-muted hover:text-gold">
                    · استوديو 3D
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
