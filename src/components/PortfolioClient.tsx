'use client';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { Work } from '@/data/works';
import CompareSlider from './CompareSlider';
const tabs = [{ k: 'all', l: 'الكل' }, { k: 'walkin', l: 'غرف ملابس' }, { k: 'bedrooms', l: 'غرف نوم' }, { k: 'living', l: 'وحدات معيشة' }, { k: 'renovation', l: 'ترميم وتطوير' }];
export default function PortfolioClient({ works }: { works: Work[] }) {
  const [tab, setTab] = useState('all'); const [open, setOpen] = useState<Work | null>(null);
  useEffect(() => { if (!open) return; const f = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null); addEventListener('keydown', f); return () => removeEventListener('keydown', f); }, [open]);
  const list = works.filter((w) => tab === 'all' || w.category === tab);
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <div className="noscroll -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0" role="tablist" aria-label="تصفية الأعمال">
        {tabs.map((t) => <button key={t.k} role="tab" aria-selected={tab === t.k} onClick={() => setTab(t.k)} className={`inline-flex shrink-0 items-center rounded-full border px-4 py-2.5 text-sm transition-colors ${tab === t.k ? 'border-pine bg-pine text-white dark:border-brass dark:bg-brass dark:text-pine' : 'border-line hover:border-gold'}`}>{t.l}</button>)}
      </div>
      {list.length === 0 && <p className="mt-10 text-muted">تُضاف أعمال هذا القسم قريبًا. تواصل معنا لنرسل لك نماذج.</p>}
      <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {list.map((w) => (
          <li key={w.id}><button onClick={() => setOpen(w)} className="group relative block aspect-[4/5] w-full overflow-hidden bg-sand text-start">
            <img src={w.after} alt={w.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10 text-sm text-white">{w.title}{w.before && <span className="ms-2 text-xs text-brass">قبل وبعد</span>}</span>
          </button></li>
        ))}
      </ul>
      {open && (
        <div role="dialog" aria-modal="true" aria-label={open.title} data-lenis-prevent className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/85 p-4" onClick={() => setOpen(null)}>
          <button aria-label="إغلاق" className="absolute end-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white" onClick={() => setOpen(null)}><X /></button>
          <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            {open.before ? <CompareSlider key={open.id} before={open.before} after={open.after} label={open.title} /> : <img src={open.after} alt={open.title} className="max-h-[85vh] w-full object-contain" />}
            <p className="mt-3 text-center text-white">{open.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}
