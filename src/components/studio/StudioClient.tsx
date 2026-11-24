'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { MessageCircle, Footprints, ChevronUp, ChevronDown } from 'lucide-react';
import { waLink } from '@/data/siteConfig';
import type { Mat, Zone, Mode } from './Scene';
const Scene = dynamic(() => import('./Scene'), { ssr: false, loading: () => <p className="grid h-full place-items-center text-white/70">جارٍ تحميل المشهد…</p> });
const finishes: Mat[] = [
  { id: 'oak', label: 'بلوط فاتح', kind: 'wood', base: '#c9a77a', accent: '#8d6b43' }, { id: 'walnut', label: 'جوزي', kind: 'wood', base: '#5a3b26', accent: '#2a190e' },
  { id: 'white', label: 'أبيض مطفي', kind: 'paint', base: '#f1eee8', accent: '' }, { id: 'greige', label: 'رمادي بيج', kind: 'paint', base: '#b9b1a4', accent: '' },
  { id: 'olive', label: 'أخضر زيتي', kind: 'paint', base: '#667a63', accent: '' }, { id: 'char', label: 'فحمي', kind: 'paint', base: '#383c3f', accent: '' },
  { id: 'm1', label: 'رخام أبيض', kind: 'marble', base: '#ece9e2', accent: '#8d939c' }, { id: 'm2', label: 'رخام داكن', kind: 'marble', base: '#3c3f43', accent: '#a9aaa9' },
];
const floors: Mat[] = [{ id: 'f1', label: 'بورسلان فاتح', kind: 'marble', base: '#dcd6ca', accent: '#b9b1a2' }, { id: 'f2', label: 'باركيه بلوط', kind: 'wood', base: '#b88f5e', accent: '#7a5a33' }, { id: 'f3', label: 'حجر داكن', kind: 'marble', base: '#4b4a48', accent: '#8a8a86' }];
const sides = [{ c: '#efe9de', n: 'أبيض دافئ' }, { c: '#d5c8b4', n: 'بيج' }, { c: '#a9b8ae', n: 'أخضر فاتح' }, { c: '#c9d2d6', n: 'رمادي مزرق' }, { c: '#dcc6bb', n: 'وردي ترابي' }];
const beds = [{ c: '#d8d0c2', n: 'بيج' }, { c: '#8d9a90', n: 'أخضر رمادي' }, { c: '#3a4a5c', n: 'كحلي' }, { c: '#a67f7a', n: 'وردي ترابي' }, { c: '#4a4f55', n: 'رمادي داكن' }];
const leds = [{ c: '#ffb561', n: 'دافئة' }, { c: '#fff1d8', n: 'محايدة' }, { c: '#cfe3ff', n: 'باردة' }];
const modes: { k: Mode; l: string }[] = [{ k: 'closets', l: 'خزائن' }, { k: 'walkin', l: 'غرفة ملابس' }, { k: 'bedroom', l: 'غرفة نوم' }, { k: 'tv', l: 'وحدة تلفزيون' }, { k: 'coffee', l: 'ركن قهوة' }];
const accentLabel: Record<Mode, string> = { closets: '', walkin: '', bedroom: 'ظهر السرير', tv: 'خلفية التلفزيون', coffee: 'سطح الرخام والخلفية' };
const chip = (on: boolean) => `inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm transition ${on ? 'border-brass bg-brass text-pine' : 'border-white/25 hover:border-brass'}`;
const dot = (on: boolean) => `h-9 w-9 rounded-full border-2 transition ${on ? 'border-brass scale-110' : 'border-white/30'}`;
function Joystick({ onMove }: { onMove: (x: number, y: number) => void }) {
  const base = useRef<HTMLDivElement>(null); const [k, setK] = useState({ x: 0, y: 0 });
  const upd = (e: React.PointerEvent) => { const r = base.current!.getBoundingClientRect(); let dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2), dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2); const l = Math.hypot(dx, dy); if (l > 1) { dx /= l; dy /= l; } setK({ x: dx, y: dy }); onMove(dx, -dy); };
  const end = () => { setK({ x: 0, y: 0 }); onMove(0, 0); };
  return (<div ref={base} aria-label="عصا الحركة" onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); upd(e); }} onPointerMove={(e) => e.currentTarget.hasPointerCapture(e.pointerId) && upd(e)} onPointerUp={end} onPointerCancel={end} className="relative h-28 w-28 touch-none rounded-full border border-white/40 bg-black/30 backdrop-blur">
    <span className="absolute left-1/2 top-1/2 -ml-6 -mt-6 h-12 w-12 rounded-full bg-brass/90" style={{ transform: `translate(${k.x * 32}px,${k.y * 32}px)` }} /></div>);
}
type Tab = { k: Zone; l: string };
const tabsFor = (m: Mode): Tab[] => {
  const first: Tab[] = m === 'bedroom' ? [{ k: 'doors', l: 'الخزانة' }, { k: 'bed', l: 'السرير' }] : m === 'tv' ? [{ k: 'doors', l: 'الوحدة' }, { k: 'bed', l: 'الخلفية والأريكة' }] : m === 'coffee' ? [{ k: 'doors', l: 'الخزائن' }, { k: 'bed', l: 'الرخام والخلفية' }] : [{ k: 'doors', l: m === 'walkin' ? 'الخزائن' : 'الأبواب' }];
  return [...first, { k: 'side', l: 'الجدران' }, { k: 'floor', l: 'الأرضية' }, { k: 'light', l: 'الإضاءة' }];
};
export default function StudioClient() {
  const [mode, setMode] = useState<Mode | null>(null); const [tab, setTab] = useState<Zone>('doors'); const [panel, setPanel] = useState(true); const [touch, setTouch] = useState(false); const [hint, setHint] = useState(true);
  const [fd, setFd] = useState(0); const [fh, setFh] = useState(1); const [kind, setKind] = useState<'hinged' | 'sliding'>('sliding'); const [style, setStyle] = useState<'flat' | 'grooved' | 'glass'>('flat'); const [handle, setHandle] = useState<'hidden' | 'gold' | 'black'>('gold'); const [open, setOpen] = useState(false);
  const [bedc, setBedc] = useState(0); const [side, setSide] = useState(0); const [fl, setFl] = useState(0);
  const [led, setLed] = useState(true); const [lc, setLc] = useState(0); const [lv, setLv] = useState(0.8); const [night, setNight] = useState(false);
  const move = useRef({ x: 0, y: 0 });
  useEffect(() => { setTouch(matchMedia('(pointer: coarse)').matches); setPanel(innerWidth >= 640); }, []);
  useEffect(() => { const q = new URLSearchParams(location.search).get('mode') as Mode | null; if (q && modes.some((x) => x.k === q)) start(q); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { if (!mode) return; setHint(true); const t = setTimeout(() => setHint(false), 9000); return () => clearTimeout(t); }, [mode]);
  const m = mode ?? 'closets'; const tabs = tabsFor(m); const mlabel = modes.find((x) => x.k === m)!.l;
  const msg = `السلام عليكم، صممت في استوديو بنيان وأرغب بهذا التصميم (${mlabel}):\nلون/خامة الأبواب: ${finishes[fd].label}\nنوع الأبواب: ${kind === 'sliding' ? 'منزلقة' : 'مفصلية'} - ${style === 'flat' ? 'مسطحة' : style === 'grooved' ? 'مخددة' : 'زجاج'}\nالمقابض: ${handle === 'hidden' ? 'مخفية' : handle === 'gold' ? 'ذهبية' : 'سوداء'}${m !== 'closets' && m !== 'walkin' ? `\n${accentLabel[m]}: ${finishes[fh].label}` : ''}${m === 'bedroom' || m === 'tv' ? `\nلون ${m === 'tv' ? 'الأريكة' : 'المفروشات'}: ${beds[bedc].n}` : ''}\nلون الجدران: ${sides[side].n}\nالأرضية: ${floors[fl].label}\nالإضاءة المخفية: ${led ? leds[lc].n : 'مطفأة'}`;
  const start = (md: Mode) => { try { const c = document.createElement('canvas'); if (c.getContext('webgl2') || c.getContext('webgl')) { setTab('doors'); setStyle(md === 'walkin' ? 'glass' : 'flat'); setOpen(false); setMode(md); return; } } catch {} alert('جهازك لا يدعم العرض ثلاثي الأبعاد. تواصل معنا عبر واتساب ونرسل لك تصورًا.'); };
  const pick = (z: Zone) => { setTab(z); setPanel(true); if (z === 'doors') setOpen((o) => !o); };
  const set = (n: Mode) => { start(n); };
  return (
    <div className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#1B1310]">
      {mode ? <Scene cfg={{ mode, doors: finishes[fd], style, kind, handle, open, head: finishes[fh], bed: beds[bedc].c, side: sides[side].c, floor: floors[fl], led, ledColor: leds[lc].c, ledLevel: lv, night }} ctl={{ move, onPick: pick }} /> : (<>
        <img src="/images/work/t2pro2-after.webp" alt="" className="kb absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 grid place-content-center justify-items-center gap-5 px-6 text-center text-white">
          <h1 className="font-display text-4xl font-bold sm:text-6xl">استوديو بنيان ثلاثي الأبعاد</h1>
          <p className="max-w-md text-white/75">تجوّل بحرية داخل الغرفة، افتح الأبواب، وبدّل الخامات والألوان والإضاءة وشاهد النتيجة فورًا.</p>
          <div className="flex max-w-xl flex-wrap justify-center gap-2.5">{modes.map((x, i) => <button key={x.k} onClick={() => start(x.k)} className={`relative inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-medium ${i === 0 ? 'ringp bg-brass text-brass' : 'border border-white/40 text-white hover:border-brass'}`}><Footprints size={20} className={i === 0 ? 'text-pine' : ''} /><span className={i === 0 ? 'text-pine' : ''}>{x.l}</span></button>)}</div>
        </div></>)}
      {mode && hint && <p className="pointer-events-none absolute inset-x-0 top-44 mx-auto w-fit max-w-[90%] rounded-full bg-black/60 px-5 py-2 text-center text-xs text-white backdrop-blur">{touch ? 'اسحب للنظر · العصا للمشي · اضغط على الباب لفتحه' : 'WASD للمشي · Shift للجري · اسحب للنظر · اضغط على الباب لفتحه'}</p>}
      {mode && <div className="noscroll absolute inset-x-0 top-28 z-10 flex gap-2 overflow-x-auto px-4 sm:justify-center" role="tablist" aria-label="أقسام الاستوديو">{modes.map((x) => <button key={x.k} role="tab" aria-selected={mode === x.k} onClick={() => set(x.k)} className={`shrink-0 rounded-full px-4 py-2.5 text-sm shadow-lg backdrop-blur transition ${mode === x.k ? 'bg-brass text-pine' : 'bg-black/45 text-white hover:bg-black/60'}`}>{x.l}</button>)}</div>}
      {mode && touch && <div className="absolute bottom-24 start-5 z-10"><Joystick onMove={(x, y) => { move.current = { x, y }; }} /></div>}
      {mode && (
        <div className="absolute inset-x-3 bottom-3 z-10 max-h-[58%] overflow-auto rounded-[28px] bg-pine/90 p-3 text-white backdrop-blur-md sm:inset-x-auto sm:bottom-auto sm:end-4 sm:top-44 sm:max-h-[calc(100svh-12rem)] sm:w-80">
          <div className="flex items-center gap-1.5">
            <div className="flex flex-1 gap-1 overflow-x-auto" role="tablist">{tabs.map((t) => <button key={t.k} role="tab" aria-selected={tab === t.k} onClick={() => { setTab(t.k); setPanel(true); }} className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm transition ${tab === t.k ? 'bg-white/15 text-brass' : 'text-white/70'}`}>{t.l}</button>)}</div>
            <button aria-label={panel ? 'طي اللوحة' : 'فتح اللوحة'} onClick={() => setPanel(!panel)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10">{panel ? <ChevronDown size={16} /> : <ChevronUp size={16} />}</button>
          </div>
          {panel && (<div className="mt-3 grid gap-4">
            {tab === 'doors' && (<>
              <div><p className="mb-2 text-xs text-white/60">لون وخامة الأبواب</p><div className="flex flex-wrap gap-2">{finishes.slice(0, 6).map((f, i) => <button key={f.id} aria-label={f.label} title={f.label} aria-pressed={i === fd} onClick={() => setFd(i)} className={dot(i === fd)} style={{ background: f.base }} />)}</div></div>
              <div><p className="mb-2 text-xs text-white/60">نوع الأبواب</p><div className="flex flex-wrap gap-2">{([['sliding', 'منزلقة'], ['hinged', 'مفصلية']] as const).map(([k, l]) => <button key={k} aria-pressed={kind === k} onClick={() => setKind(k)} className={chip(kind === k)}>{l}</button>)}</div></div>
              <div><p className="mb-2 text-xs text-white/60">شكل الباب</p><div className="flex flex-wrap gap-2">{([['flat', 'مسطح'], ['grooved', 'مخدّد'], ['glass', 'زجاج']] as const).map(([k, l]) => <button key={k} aria-pressed={style === k} onClick={() => setStyle(k)} className={chip(style === k)}>{l}</button>)}</div></div>
              <div><p className="mb-2 text-xs text-white/60">المقابض</p><div className="flex flex-wrap gap-2">{([['hidden', 'مخفية'], ['gold', 'ذهبية'], ['black', 'سوداء']] as const).map(([k, l]) => <button key={k} aria-pressed={handle === k} onClick={() => setHandle(k)} className={chip(handle === k)}>{l}</button>)}</div></div>
              <button aria-pressed={open} onClick={() => setOpen(!open)} className={chip(open)}>{open ? 'إغلاق الأبواب' : 'افتح الأبواب'}</button></>)}
            {tab === 'bed' && (<>
              <div><p className="mb-2 text-xs text-white/60">{accentLabel[m]}</p><div className="flex flex-wrap gap-2">{finishes.map((f, i) => <button key={f.id} aria-label={f.label} title={f.label} aria-pressed={i === fh} onClick={() => setFh(i)} className={dot(i === fh)} style={{ background: f.base }} />)}</div></div>
              {(m === 'bedroom' || m === 'tv') && <div><p className="mb-2 text-xs text-white/60">{m === 'tv' ? 'لون الأريكة' : 'لون المفروشات'}</p><div className="flex flex-wrap gap-2">{beds.map((b, i) => <button key={b.c} aria-label={b.n} title={b.n} aria-pressed={i === bedc} onClick={() => setBedc(i)} className={dot(i === bedc)} style={{ background: b.c }} />)}</div></div>}</>)}
            {tab === 'side' && <div className="flex flex-wrap gap-2">{sides.map((x, i) => <button key={x.c} aria-label={x.n} title={x.n} aria-pressed={i === side} onClick={() => setSide(i)} className={dot(i === side)} style={{ background: x.c }} />)}</div>}
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
