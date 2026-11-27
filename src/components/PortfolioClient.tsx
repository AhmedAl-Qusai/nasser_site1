'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Footprints, LayoutGrid, Maximize2, Search, Square } from 'lucide-react';
import type { BedroomSubcategory, Work, WorkCategory } from '@/data/works';
import WorkGallery from './WorkGallery';

type TabKey = 'all' | WorkCategory;
type SubTabKey = 'all' | BedroomSubcategory;

const baseTabs: { k: TabKey; l: string; studio?: string }[] = [
  { k: 'all', l: 'الكل' },
  { k: 'closets', l: 'حلول الخزائن', studio: 'closets' },
  { k: 'bedrooms', l: 'غرف النوم', studio: 'bedroom' },
  { k: 'walkin', l: 'غرف الملابس', studio: 'walkin' },
  { k: 'tv', l: 'وحدات التلفزيون', studio: 'tv' },
  { k: 'display', l: 'وحدات العرض والمكتبات', studio: 'display' },
  { k: 'renovation', l: 'ترميم وتطوير', studio: 'renovation' },
];

const bedroomSubTabs: { k: SubTabKey; l: string }[] = [
  { k: 'all', l: 'الكل' },
  { k: 'design', l: 'قسم تصميم غرف النوم' },
  { k: 'dimensions', l: 'قسم مقاسات غرف النوم' },
];

export default function PortfolioClient({ works }: { works: Work[] }) {
  const [tab, setTab] = useState<TabKey>('all');
  const [sub, setSub] = useState<SubTabKey>('all');
  const [q, setQ] = useState('');
  const [fit, setFit] = useState<'auto' | 'contain'>('auto');
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const cat = p.get('cat') as TabKey | null;
    const s = p.get('sub') as SubTabKey | null;
    if (cat && baseTabs.some((t) => t.k === cat)) setTab(cat);
    if (s && bedroomSubTabs.some((t) => t.k === s)) setSub(s);
  }, []);

  const tabs = baseTabs.filter((t) => t.k === 'all' || t.k !== 'renovation' || works.some((w) => w.category === 'renovation'));
  const needle = q.trim();

  const list = works.filter((w) => {
    if (tab !== 'all' && w.category !== tab) return false;
    if (tab === 'bedrooms' && sub !== 'all' && w.subcategory !== sub) return false;
    if (needle && !w.title.includes(needle) && !(w.note ?? '').includes(needle)) return false;
    return true;
  });

  const bedroomDesigns = list.filter((w) => w.category === 'bedrooms' && w.subcategory === 'design');
  const bedroomDimensions = list.filter((w) => w.category === 'bedrooms' && w.subcategory === 'dimensions');

  const countFor = (k: TabKey) => (k === 'all' ? works.length : works.filter((w) => w.category === k).length);
  const subCountFor = (k: SubTabKey) => {
    const allBeds = works.filter((w) => w.category === 'bedrooms');
    if (k === 'all') return allBeds.length;
    return allBeds.filter((w) => w.subcategory === k).length;
  };

  const activeTab = baseTabs.find((t) => t.k === tab);
  const cols = wide ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-5 md:py-16">
      <div className="noscroll -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0" role="tablist" aria-label="تصفية الأعمال">
        {tabs.map((t) => (
          <button
            key={t.k}
            role="tab"
            aria-selected={tab === t.k}
            onClick={() => {
              setTab(t.k);
              if (t.k !== 'bedrooms') setSub('all');
            }}
            className={`inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors ${
              tab === t.k ? 'border-pine bg-pine text-white dark:border-brass dark:bg-brass dark:text-pine' : 'border-line hover:border-gold'
            }`}
          >
            <span>{t.l}</span>
            <span className="text-xs opacity-70">({countFor(t.k)})</span>
          </button>
        ))}
      </div>

      {tab === 'bedrooms' && (
        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="أقسام غرف النوم">
          {bedroomSubTabs.map((st) => (
            <button
              key={st.k}
              role="tab"
              aria-selected={sub === st.k}
              onClick={() => setSub(st.k)}
              className={`inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs transition-colors sm:text-sm ${
                sub === st.k ? 'border-gold bg-gold font-medium text-pine' : 'border-line bg-sand/60 hover:border-gold'
              }`}
            >
              <span>{st.l}</span>
              <span className="text-xs opacity-75">({subCountFor(st.k)})</span>
            </button>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-3">
        <div className="relative min-w-[200px] flex-1">
          <Search size={16} className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث بالاسم أو الرقم (مثلاً: مقاسات غرف النوم 25)"
            aria-label="بحث في معرض الأعمال"
            className="h-10 w-full rounded-full border border-line bg-bg pe-4 ps-10 text-sm outline-none transition focus:border-gold"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFit((f) => (f === 'auto' ? 'contain' : 'auto'))}
            aria-pressed={fit === 'contain'}
            className={`inline-flex h-10 items-center gap-1.5 rounded-full border px-3.5 text-xs transition sm:text-sm ${
              fit === 'contain' ? 'border-pine bg-pine text-white dark:border-brass dark:bg-brass dark:text-pine' : 'border-line hover:border-gold'
            }`}
          >
            <Maximize2 size={14} />
            <span>{fit === 'contain' ? 'عرض كامل اللوحة' : 'تأطير تلقائي'}</span>
          </button>
          <button
            type="button"
            onClick={() => setWide((w) => !w)}
            aria-pressed={wide}
            aria-label="تبديل حجم البطاقات"
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line px-3.5 text-xs transition hover:border-gold sm:text-sm"
          >
            {wide ? <LayoutGrid size={14} /> : <Square size={14} />}
            <span>{wide ? 'شبكة مدمجة' : 'بطاقات كبيرة'}</span>
          </button>
          {activeTab?.studio && (
            <Link
              href={`/studio/?mode=${activeTab.studio}`}
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-brass px-4 text-xs font-medium text-pine transition hover:bg-brass2 sm:text-sm"
            >
              <Footprints size={15} />
              <span>جرّب في 3D</span>
            </Link>
          )}
        </div>
      </div>

      {list.length === 0 && <p className="mt-10 text-muted">لا توجد نتائج مطابقة. جرّب تغيير القسم أو كلمة البحث.</p>}

      {tab === 'bedrooms' && sub === 'all' ? (
        <div className="mt-8 space-y-12">
          {bedroomDesigns.length > 0 && (
            <section>
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <h2 className="font-display text-2xl font-bold">قسم تصميم غرف النوم ({bedroomDesigns.length})</h2>
                <span className="text-xs text-muted">اضغط على أي صورة للتكبير والتمرير</span>
              </div>
              <WorkGallery works={bedroomDesigns} fit={fit} cols={cols} />
            </section>
          )}
          {bedroomDimensions.length > 0 && (
            <section>
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <h2 className="font-display text-2xl font-bold">قسم مقاسات غرف النوم ({bedroomDimensions.length})</h2>
                <span className="text-xs text-muted">مخططات ولوحات مقاسات تفصيلية</span>
              </div>
              <WorkGallery works={bedroomDimensions} fit={fit} cols={cols} />
            </section>
          )}
        </div>
      ) : (
        <div className="mt-8">
          <WorkGallery works={list} fit={fit} cols={cols} />
        </div>
      )}
    </div>
  );
}
