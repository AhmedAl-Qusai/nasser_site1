'use client';
import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import type { Work } from '@/data/works';
import { waLink } from '@/data/siteConfig';
import CompareSlider from './CompareSlider';
export default function BeforeAfter({ items }: { items: (Work & { before: string })[] }) {
  const [idx, setIdx] = useState(0); const p = items[idx] ?? items[0];
  if (!p) return null;
  return (
    <section id="work" className="relative mx-3 overflow-hidden rounded-[2rem] bg-pine py-24 text-white md:py-32">
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)]">
        <div data-r className="min-w-0">
          <h2 className="font-display text-[1.85rem] font-bold leading-snug sm:text-4xl md:text-5xl">من المساحة الفارغة إلى التركيب النهائي</h2>
          <p className="mt-3 max-w-md text-white/70">نماذج من أعمالنا المنفّذة في الأحساء. اسحب على الصورة وشاهد المساحة تنقلب من قبل إلى بعد.</p>
          <div className="noscroll -mx-5 mt-7 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0" role="tablist" aria-label="المشاريع">
            {items.map((f, i) => (<button key={f.id} role="tab" aria-selected={i === idx} onClick={() => setIdx(i)} className={`inline-flex shrink-0 items-center rounded-full border px-4 py-2.5 text-sm transition ${i === idx ? 'border-brass bg-brass text-pine' : 'border-white/25 hover:border-brass'}`}>{f.title}</button>))}
          </div>
          <p className="mt-6 text-white/85">{p.note}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={waLink(`السلام عليكم، أرغب بتصميم مثل: ${p.title}`)} className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-medium text-pine transition hover:bg-brass2"><MessageCircle size={16} />اطلب تصميمًا مثل هذا</a>
            <Link href="/portfolio/" className="rounded-full border border-white/25 px-6 py-3 text-sm transition hover:border-brass">كل الأعمال</Link>
          </div>
        </div>
        <div data-r style={{ '--d': '150ms' } as React.CSSProperties}><CompareSlider key={p.id} before={p.before} after={p.after} label={p.title} className="mx-auto max-w-[440px]" /></div>
      </div>
    </section>
  );
}
