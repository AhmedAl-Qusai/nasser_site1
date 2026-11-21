'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { MessageCircle, Footprints, ChevronUp, ChevronDown } from 'lucide-react';
import { waLink } from '@/data/siteConfig';
import type { Mat, Zone } from './Scene';
const Scene = dynamic(() => import('./Scene'), { ssr: false, loading: () => <p className="grid h-full place-items-center text-white/70">جارٍ تحميل المشهد…</p> });
const paints = [{ c: '#e9e4da', n: 'عاجي' }, { c: '#c9b79c', n: 'رملي' }, { c: '#7f9486', n: 'أخضر رمادي' }, { c: '#1b4540', n: 'صنوبري' }];
const mains: Mat[] = [
  { id: 'mw', label: 'بديل رخام أبيض', kind: 'marble', base: '#ece9e2', accent: '#8d939c' }, { id: 'mg', label: 'بديل رخام رمادي', kind: 'marble', base: '#a9aaa9', accent: '#34373d' },
  { id: 'ww', label: 'بديل خشب جوزي', kind: 'wood', base: '#5a3b26', accent: '#2a190e' }, { id: 'wo', label: 'بديل خشب بلوط', kind: 'wood', base: '#c9a77a', accent: '#8d6b43' },
  { id: 'fl', label: 'شيبورد مشقّق', kind: 'flute', base: '#cbb89c', accent: '#a08c70' }, { id: 'pt', label: 'دهان', kind: 'paint', base: paints[0].c, accent: '' },
];
const floors: Mat[] = [{ id: 'f1', label: 'بورسلان فاتح', kind: 'marble', base: '#dcd6ca', accent: '#b9b1a2' }, { id: 'f2', label: 'باركيه بلوط', kind: 'wood', base: '#b88f5e', accent: '#7a5a33' }, { id: 'f3', label: 'حجر داكن', kind: 'marble', base: '#4b4a48', accent: '#8a8a86' }];
const sides = [{ c: '#efe9de', n: 'أبيض دافئ' }, { c: '#d5c8b4', n: 'بيج' }, { c: '#a9b8ae', n: 'أخضر فاتح' }, { c: '#c9d2d6', n: 'رمادي مزرق' }, { c: '#dcc6bb', n: 'وردي ترابي' }];
const leds = [{ c: '#ffb561', n: 'دافئة' }, { c: '#fff1d8', n: 'محايدة' }, { c: '#cfe3ff', n: 'باردة' }];
const tabs: { k: Zone; l: string }[] = [{ k: 'main', l: 'جدار التلفزيون' }, { k: 'side', l: 'الجدران' }, { k: 'floor', l: 'الأرضية' }, { k: 'light', l: 'الإضاءة' }];
const chip = (on: boolean) => `inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm transition ${on ? 'border-brass bg-brass text-pine' : 'border-white/25 hover:border-brass'}`;
const dot = (on: boolean) => `h-9 w-9 rounded-full border-2 transition ${on ? 'border-brass scale-110' : 'border-white/30'}`;
function Joystick({ onMove }: { onMove: (x: number, y: number) => void }) {
  const base = useRef<HTMLDivElement>(null); const [k, setK] = useState({ x: 0, y: 0 });
  const upd = (e: React.PointerEvent) => { const r = base.current!.getBoundingClientRect(); let dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2), dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2); const l = Math.hypot(dx, dy); if (l > 1) { dx /= l; dy /= l; } setK({ x: dx, y: dy }); onMove(dx, -dy); };
  const end = () => { setK({ x: 0, y: 0 }); onMove(0, 0); };
  return (<div ref={base} aria-label="عصا الحركة" onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); upd(e); }} onPointerMove={(e) => e.currentTarget.hasPointerCapture(e.pointerId) && upd(e)} onPointerUp={end} onPointerCancel={end} className="relative h-28 w-28 touch-none rounded-full border border-white/40 bg-black/30 backdrop-blur">
    <span className="absolute left-1/2 top-1/2 -ml-6 -mt-6 h-12 w-12 rounded-full bg-brass/90" style={{ transform: `translate(${k.x * 32}px,${k.y * 32}px)` }} /></div>);
}
export default function StudioClient() {
  const [on, setOn] = useState(false); const [tab, setTab] = useState<Zone>('main'); const [open, setOpen] = useState(true); const [touch, setTouch] = useState(false); const [hint, setHint] = useState(true);
  const [mi, setMi] = useState(0); const [paint, setPaint] = useState(0); const [side, setSide] = useState(0); const [fl, setFl] = useState(0);
  const [led, setLed] = useState(true); const [lc, setLc] = useState(0); const [lv, setLv] = useState(0.8); const [night, setNight] = useState(false);
  const move = useRef({ x: 0, y: 0 });
  useEffect(() => { setTouch(matchMedia('(pointer: coarse)').matches); setOpen(innerWidth >= 640); }, []);
  useEffect(() => { if (!on) return; const t = setTimeout(() => setHint(false), 9000); return () => clearTimeout(t); }, [on]);
  const main: Mat = mains[mi].kind === 'paint' ? { ...mains[mi], base: paints[paint].c } : mains[mi];
  const msg = `السلام عليكم، صممت في استوديو بنيان وأرغب بهذا التصميم:\nجدار التلفزيون: ${main.label}${main.kind === 'paint' ? ' (' + paints[paint].n + ')' : ''}\nلون الجدران: ${sides[side].n}\nالأرضية: ${floors[fl].label}\nالإضاءة المخفية: ${led ? leds[lc].n : 'مطفأة'}`;
  const start = () => { try { const c = document.createElement('canvas'); if (c.getContext('webgl2') || c.getContext('webgl')) { setOn(true); return; } } catch {} alert('جهازك لا يدعم العرض ثلاثي الأبعاد. تواصل معنا عبر واتساب ونرسل لك تصورًا.'); };
  const pick = (z: Zone) => { setTab(z); setOpen(true); };
  return (
    <div className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#0b1412]">
      {on ? <Scene cfg={{ main, side: sides[side].c, floor: floors[fl], led, ledColor: leds[lc].c, ledLevel: lv, night }} ctl={{ move, onPick: pick }} /> : (<>
        <img src="/images/work/t3pro2-after.webp" alt="" className="kb absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 grid place-content-center justify-items-center gap-5 px-6 text-center text-white">
          <h1 className="font-display text-4xl font-bold sm:text-6xl">استوديو بنيان ثلاثي الأبعاد</h1>
          <p className="max-w-md text-white/75">تجوّل داخل الغرفة بحرية، وغيّر الخامات والإضاءة وشاهد النتيجة فورًا.</p>
          <button onClick={start} className="ringp relative inline-flex items-center gap-2 rounded-full bg-brass px-8 py-4 font-medium text-pine"><Footprints size={20} />ادخل الاستوديو</button>
        </div></>)}
      {on && hint && <p className="pointer-events-none absolute inset-x-0 top-24 mx-auto w-fit max-w-[90%] rounded-full bg-black/60 px-5 py-2 text-center text-xs text-white backdrop-blur">{touch ? 'اسحب على الشاشة للنظر · استخدم العصا للمشي · اضغط على الجدار أو الأرضية لتخصيصها' : 'WASD أو الأسهم للمشي · Shift للجري · اسحب للنظر · اضغط على الجدار أو الأرضية لتخصيصها'}</p>}
      {on && touch && <div className="absolute bottom-24 start-5 z-10"><Joystick onMove={(x, y) => { move.current = { x, y }; }} /></div>}
      {on && (
        <div className="absolute inset-x-3 bottom-3 z-10 max-h-[58%] overflow-auto rounded-3xl bg-pine/90 p-3 text-white backdrop-blur-md sm:inset-x-auto sm:bottom-4 sm:end-4 sm:top-24 sm:bottom-auto sm:max-h-[calc(100svh-7rem)] sm:w-80">
          <div className="flex items-center gap-1.5">
            <div className="flex flex-1 gap-1 overflow-x-auto" role="tablist">{tabs.map((t) => <button key={t.k} role="tab" aria-selected={tab === t.k} onClick={() => { setTab(t.k); setOpen(true); }} className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm transition ${tab === t.k ? 'bg-white/15 text-brass' : 'text-white/70'}`}>{t.l}</button>)}</div>
            <button aria-label={open ? 'طي اللوحة' : 'فتح اللوحة'} onClick={() => setOpen(!open)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10">{open ? <ChevronDown size={16} /> : <ChevronUp size={16} />}</button>
          </div>
          {open && (<div className="mt-3 grid gap-4">
            {tab === 'main' && (<><div className="flex flex-wrap gap-2">{mains.map((m, i) => <button key={m.id} aria-pressed={i === mi} onClick={() => setMi(i)} className={chip(i === mi)}>{m.label}</button>)}</div>
              {mains[mi].kind === 'paint' && <div className="flex flex-wrap gap-2">{paints.map((p, i) => <button key={p.c} aria-label={p.n} title={p.n} aria-pressed={i === paint} onClick={() => setPaint(i)} className={dot(i === paint)} style={{ background: p.c }} />)}</div>}</>)}
            {tab === 'side' && <div className="flex flex-wrap gap-2">{sides.map((s, i) => <button key={s.c} aria-label={s.n} title={s.n} aria-pressed={i === side} onClick={() => setSide(i)} className={dot(i === side)} style={{ background: s.c }} />)}</div>}
            {tab === 'floor' && <div className="flex flex-wrap gap-2">{floors.map((f, i) => <button key={f.id} aria-pressed={i === fl} onClick={() => setFl(i)} className={chip(i === fl)}>{f.label}</button>)}</div>}
            {tab === 'light' && (<>
              <div className="flex flex-wrap gap-2"><button aria-pressed={led} onClick={() => setLed(!led)} className={chip(led)}>{led ? 'الإضاءة المخفية: مضاءة' : 'الإضاءة المخفية: مطفأة'}</button>
                {leds.map((l, i) => <button key={l.c} aria-pressed={led && i === lc} onClick={() => { setLc(i); setLed(true); }} className={chip(led && i === lc)}>{l.n}</button>)}</div>
              <label className="grid gap-1 text-sm text-white/70">شدة الإضاءة<input type="range" min={0.2} max={1.4} step={0.05} value={lv} onChange={(e) => setLv(+e.target.value)} className="accent-[#DDB06A]" /></label>
              <div className="flex gap-2"><button aria-pressed={!night} onClick={() => setNight(false)} className={chip(!night)}>نهار</button><button aria-pressed={night} onClick={() => setNight(true)} className={chip(night)}>ليل</button></div></>)}
            <a href={waLink(msg)} className="inline-flex items-center justify-center gap-2 rounded-full bg-brass px-5 py-3 text-sm font-medium text-pine transition hover:bg-brass2"><MessageCircle size={16} />اطلب هذا التصميم عبر واتساب</a>
          </div>)}
        </div>)}
    </div>
  );
}
