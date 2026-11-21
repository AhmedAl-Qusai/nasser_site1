'use client';
import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { featured } from '@/data/projects';
import { waLink } from '@/data/siteConfig';
import CompareSlider from './CompareSlider';
export default function BeforeAfter() {
  const [idx, setIdx] = useState(0); const p = featured[idx];
  return (
    <section id="work" className="bg-sand py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1fr_minmax(0,460px)]">
        <div>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">من الموقع الخام إلى التشطيب النهائي</h2>
          <p className="mt-3 max-w-md text-muted">أعمال منفّذة في الأحساء. اسحب الخط لمقارنة الموقع قبل التنفيذ وبعده.</p>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="المشاريع">
            {featured.map((f, i) => (<button key={f.id} role="tab" aria-selected={i === idx} onClick={() => setIdx(i)} className={`inline-flex items-center rounded-full border px-4 py-2 text-sm transition-colors ${i === idx ? 'border-navy bg-navy text-white' : 'border-line hover:border-gold'}`}>{f.title}</button>))}
          </div>
          <p className="mt-6">{p.note}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={waLink(`السلام عليكم، أرغب بتصميم مثل: ${p.title}`)} className="inline-flex items-center gap-2 rounded-sm bg-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#16396a]"><MessageCircle size={16} />اطلب تصميمًا مثل هذا</a>
            <Link href="/portfolio/" className="rounded-sm border border-line px-6 py-3 text-sm transition-colors hover:border-gold">كل الأعمال</Link>
          </div>
        </div>
        <CompareSlider key={p.id} before={p.before} after={p.after} label={p.title} className="mx-auto max-w-[460px]" />
      </div>
    </section>
  );
}
