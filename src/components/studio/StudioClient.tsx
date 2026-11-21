'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { MessageCircle, Box } from 'lucide-react';
import { waLink } from '@/data/siteConfig';
import type { Mat } from './Scene';
const Scene = dynamic(() => import('./Scene'), { ssr: false, loading: () => <p className="grid h-full place-items-center text-white/70">جارٍ تحميل المشهد…</p> });
const paints = [{ c: '#e9e4da', n: 'عاجي' }, { c: '#c9b79c', n: 'رملي' }, { c: '#8a9a8c', n: 'أخضر رمادي' }, { c: '#1f3a5f', n: 'كحلي' }];
const mats: Mat[] = [
  { id: 'mw', label: 'بديل رخام أبيض', kind: 'marble', base: '#ece9e2', accent: '#8d939c' },
  { id: 'mg', label: 'بديل رخام رمادي', kind: 'marble', base: '#a9aaa9', accent: '#34373d' },
  { id: 'ww', label: 'بديل خشب جوزي', kind: 'wood', base: '#5a3b26', accent: '#2a190e' },
  { id: 'wo', label: 'بديل خشب بلوط', kind: 'wood', base: '#c9a77a', accent: '#8d6b43' },
  { id: 'fl', label: 'شيبورد مشقّق', kind: 'flute', base: '#cbb89c', accent: '#a08c70' },
  { id: 'pt', label: 'دهان', kind: 'paint', base: paints[0].c, accent: '' },
];
const walls = [{ c: '#f3efe7', n: 'أبيض دافئ' }, { c: '#d9cfbf', n: 'بيج' }, { c: '#b9c3c9', n: 'رمادي مزرق' }, { c: '#e6d6d0', n: 'وردي فاتح' }];
const leds = [{ c: '#ffb561', n: 'دافئة' }, { c: '#fff1d8', n: 'محايدة' }, { c: '#cfe3ff', n: 'باردة' }];
const chip = (on: boolean) => `inline-flex items-center rounded-full border px-4 py-2 text-sm transition-colors ${on ? 'border-navy bg-navy text-white' : 'border-line hover:border-gold'}`;
export default function StudioClient() {
  const [on, setOn] = useState(false); const [mi, setMi] = useState(0); const [paint, setPaint] = useState(0);
  const [wall, setWall] = useState(0); const [led, setLed] = useState(true); const [lc, setLc] = useState(0); const [lv, setLv] = useState(0.7);
  const mat: Mat = mats[mi].kind === 'paint' ? { ...mats[mi], base: paints[paint].c } : mats[mi];
  const msg = `السلام عليكم، صممت في استوديو بنيان وأرغب بهذا التصميم:\nخامة جدار التلفزيون: ${mat.label}${mat.kind === 'paint' ? ' (' + paints[paint].n + ')' : ''}\nلون الجدران: ${walls[wall].n}\nالإضاءة المخفية: ${led ? leds[lc].n : 'مطفأة'}`;
  const webgl = () => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } };
  const start = () => { if (webgl()) setOn(true); else alert('جهازك لا يدعم العرض ثلاثي الأبعاد. تواصل معنا عبر واتساب ونرسل لك تصورًا.'); };
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[1fr_340px] lg:py-16">
      <div className="relative aspect-[4/3] min-h-[340px] overflow-hidden bg-[#0f1722]">
        {on ? <Scene cfg={{ mat, wall: walls[wall].c, led, ledColor: leds[lc].c, ledLevel: lv }} /> : (<>
          <img src="/images/work/t3pro2-after.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
          <button onClick={start} className="absolute inset-0 m-auto flex h-14 w-fit items-center gap-2 rounded-sm bg-[#D2AE68] px-7 font-medium text-navy"><Box size={20} />ابدأ التجربة ثلاثية الأبعاد</button></>)}
        {on && <p className="pointer-events-none absolute bottom-3 start-3 bg-black/55 px-3 py-1 text-xs text-white">اسحب للدوران · قرّب بإصبعين أو العجلة</p>}
      </div>
      <div className="grid content-start gap-7">
        <fieldset><legend className="mb-3 font-bold">خامة جدار التلفزيون</legend>
          <div className="flex flex-wrap gap-2">{mats.map((m, i) => <button key={m.id} aria-pressed={i === mi} onClick={() => setMi(i)} className={chip(i === mi)}>{m.label}</button>)}</div>
          {mats[mi].kind === 'paint' && <div className="mt-3 flex flex-wrap gap-2">{paints.map((p, i) => <button key={p.c} aria-label={p.n} aria-pressed={i === paint} onClick={() => setPaint(i)} className={`h-9 w-9 rounded-full border-2 ${i === paint ? 'border-gold' : 'border-line'}`} style={{ background: p.c }} />)}</div>}
        </fieldset>
        <fieldset><legend className="mb-3 font-bold">لون الجدران</legend>
          <div className="flex flex-wrap gap-2">{walls.map((w, i) => <button key={w.c} aria-label={w.n} title={w.n} aria-pressed={i === wall} onClick={() => setWall(i)} className={`h-9 w-9 rounded-full border-2 ${i === wall ? 'border-gold' : 'border-line'}`} style={{ background: w.c }} />)}</div>
        </fieldset>
        <fieldset><legend className="mb-3 font-bold">الإضاءة المخفية</legend>
          <div className="flex flex-wrap gap-2"><button aria-pressed={led} onClick={() => setLed(!led)} className={chip(led)}>{led ? 'مضاءة' : 'مطفأة'}</button>
            {leds.map((l, i) => <button key={l.c} aria-pressed={i === lc} onClick={() => { setLc(i); setLed(true); }} className={chip(led && i === lc)}>{l.n}</button>)}</div>
          <label className="mt-4 grid gap-1 text-sm text-muted">شدة الإضاءة<input type="range" min={0.2} max={1.2} step={0.05} value={lv} onChange={(e) => setLv(+e.target.value)} className="accent-[var(--gold)]" /></label>
        </fieldset>
        <a href={waLink(msg)} className="inline-flex items-center justify-center gap-2 rounded-sm bg-navy px-6 py-3.5 font-medium text-white transition-colors hover:bg-[#16396a]"><MessageCircle size={18} />اطلب هذا التصميم عبر واتساب</a>
        <p className="text-xs text-muted">المشهد تقريبي للتجربة فقط، والتنفيذ الفعلي حسب مقاسات موقعك.</p>
      </div>
    </div>
  );
}
