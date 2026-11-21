'use client';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { projects } from '@/data/projects';
import CompareSlider from './CompareSlider';
const ideas = ['portfolio1', 'portfolio2', 'portfolio3', 'portfolio4', 'image1', 'image2', 'image3', 'image4', 'image5', 'ml', 'tll', 'fll', 'gdr', 'jpspord'];
type Item = { id: string; kind: 'done' | 'idea'; title: string; thumb: string; before?: string; after?: string };
const items: Item[] = [
  ...projects.map((p): Item => ({ id: p.id, kind: 'done', title: p.title, thumb: p.after, before: p.before, after: p.after })),
  ...ideas.map((n, i): Item => ({ id: n, kind: 'idea', title: `فكرة تصميم ${i + 1}`, thumb: `/images/gallery/${n}.webp` })),
];
const tabs = [{ k: 'all', l: 'الكل' }, { k: 'done', l: 'أعمال منفّذة (قبل وبعد)' }, { k: 'idea', l: 'أفكار وتصاميم' }] as const;
export default function PortfolioClient() {
  const [tab, setTab] = useState<'all' | 'done' | 'idea'>('all'); const [open, setOpen] = useState<Item | null>(null);
  useEffect(() => { if (!open) return; const f = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null); addEventListener('keydown', f); return () => removeEventListener('keydown', f); }, [open]);
  const list = items.filter((i) => tab === 'all' || i.kind === tab);
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="تصفية الأعمال">
        {tabs.map((t) => <button key={t.k} role="tab" aria-selected={tab === t.k} onClick={() => setTab(t.k)} className={`inline-flex items-center rounded-full border px-4 py-2 text-sm transition-colors ${tab === t.k ? 'border-pine bg-pine text-white' : 'border-line hover:border-gold'}`}>{t.l}</button>)}
      </div>
      <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {list.map((i) => (
          <li key={i.id}><button onClick={() => setOpen(i)} className="group relative block aspect-[4/5] w-full overflow-hidden bg-sand text-start">
            <img src={i.thumb} alt={i.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10 text-sm text-white">{i.title}{i.kind === 'done' && <span className="ms-2 text-xs text-brass">قبل وبعد</span>}</span>
          </button></li>
        ))}
      </ul>
      {open && (
        <div role="dialog" aria-modal="true" aria-label={open.title} data-lenis-prevent className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/85 p-4" onClick={() => setOpen(null)}>
          <button aria-label="إغلاق" className="absolute end-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white" onClick={() => setOpen(null)}><X /></button>
          <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            {open.kind === 'done' ? <CompareSlider key={open.id} before={open.before!} after={open.after!} label={open.title} /> : <img src={open.thumb} alt={open.title} className="max-h-[85vh] w-full object-contain" />}
            <p className="mt-3 text-center text-white">{open.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}
