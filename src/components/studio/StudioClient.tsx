'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { MessageCircle, Footprints, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, LayoutGrid, Lightbulb, Moon, Sun, DoorOpen } from 'lucide-react';
import { waLink } from '@/data/siteConfig';
import type { Mat, Zone, Mode } from './Scene';

const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => <p className="grid h-full place-items-center text-white/70">جارٍ تحميل المشهد ثلاثي الأبعاد…</p>,
});

const finishes: Mat[] = [
  { id: 'oak', label: 'بلوط فاتح', kind: 'wood', base: '#c9a77a', accent: '#8d6b43' },
  { id: 'walnut', label: 'جوزي', kind: 'wood', base: '#5a3b26', accent: '#2a190e' },
  { id: 'white', label: 'أبيض مطفي', kind: 'paint', base: '#f1eee8', accent: '' },
  { id: 'greige', label: 'رمادي بيج', kind: 'paint', base: '#b9b1a4', accent: '' },
  { id: 'olive', label: 'أخضر زيتي', kind: 'paint', base: '#667a63', accent: '' },
  { id: 'char', label: 'فحمي', kind: 'paint', base: '#383c3f', accent: '' },
  { id: 'm1', label: 'رخام أبيض', kind: 'marble', base: '#ece9e2', accent: '#8d939c' },
  { id: 'm2', label: 'رخام داكن', kind: 'marble', base: '#3c3f43', accent: '#a9aaa9' },
];

const floors: Mat[] = [
  { id: 'f1', label: 'بورسلان فاتح', kind: 'marble', base: '#dcd6ca', accent: '#b9b1a2' },
  { id: 'f2', label: 'باركيه بلوط', kind: 'wood', base: '#b88f5e', accent: '#7a5a33' },
  { id: 'f3', label: 'حجر داكن', kind: 'marble', base: '#4b4a48', accent: '#8a8a86' },
];

const sides = [
  { c: '#efe9de', n: 'أبيض دافئ' },
  { c: '#d5c8b4', n: 'بيج' },
  { c: '#a9b8ae', n: 'أخضر فاتح' },
  { c: '#c9d2d6', n: 'رمادي مزرق' },
  { c: '#dcc6bb', n: 'وردي ترابي' },
];

const fabrics = [
  { c: '#d8d0c2', n: 'بيج' },
  { c: '#8d9a90', n: 'أخضر رمادي' },
  { c: '#3a4a5c', n: 'كحلي' },
  { c: '#a67f7a', n: 'وردي ترابي' },
  { c: '#4a4f55', n: 'رمادي داكن' },
];

const leds = [
  { c: '#ffb561', n: 'دافئة 3000K' },
  { c: '#fff1d8', n: 'محايدة 4000K' },
  { c: '#cfe3ff', n: 'باردة 6000K' },
];

type StyleLabels = { flat: string; grooved: string; glass: string };

type ModeInfo = {
  k: Mode;
  l: string;
  doorTab: string;
  openLabel: [string, string];
  accentTab?: string;
  accentLabel?: string;
  fabricLabel?: string;
  hideKind?: boolean;
  styleLabels?: StyleLabels;
  defaultKind?: 'sliding' | 'hinged';
  defaultStyle?: 'flat' | 'grooved' | 'glass';
};

const defaultStyles: StyleLabels = { flat: 'مسطح سادة', grooved: 'مخدّد شرائح', glass: 'واجهة زجاج' };

const modes: ModeInfo[] = [
  { k: 'closets', l: 'حلول الخزائن', doorTab: 'الخزانة والأبواب', openLabel: ['افتح أبواب الخزانة', 'أغلق أبواب الخزانة'], accentTab: 'البنش والمقعد', fabricLabel: 'لون وسادة المقعد' },
  { k: 'bedroom', l: 'غرف النوم', doorTab: 'الخزانة والأدراج', openLabel: ['افتح الخزانة والأدراج', 'أغلق الخزانة والأدراج'], accentTab: 'السرير والخلفية', accentLabel: 'خلفية الجدار والتسريحة', fabricLabel: 'لون السرير والمفروشات' },
  { k: 'walkin', l: 'غرف الملابس', doorTab: 'الخزائن والجزيرة', openLabel: ['افتح الخزائن وأدراج الجزيرة', 'أغلق الخزائن والأدراج'], accentTab: 'سطح الجزيرة والمقعد', accentLabel: 'رخام الجزيرة الوسطية', fabricLabel: 'لون البوف', defaultStyle: 'glass' },
  { k: 'tv', l: 'وحدات التلفزيون', doorTab: 'الوحدة والخزائن', openLabel: ['افتح خزائن التلفزيون', 'أغلق خزائن التلفزيون'], accentTab: 'الخلفية والأريكة', accentLabel: 'لوح الخلفية والطاولة', fabricLabel: 'لون الأريكة' },
  { k: 'display', l: 'وحدات العرض والمكتبات', doorTab: 'المكتبة والواجهات', openLabel: ['افتح خزائن المكتبة', 'أغلق خزائن المكتبة'], accentTab: 'الخلفية والكرسي', accentLabel: 'خلفية المكتبة والطاولة', fabricLabel: 'لون كرسي القراءة', defaultStyle: 'glass' },
  { k: 'coffee', l: 'ركن القهوة', doorTab: 'خزائن ركن القهوة', openLabel: ['افتح الخزائن ودرج الكبسولات', 'أغلق الخزائن والدرج'], accentTab: 'الرخام والكراسي', accentLabel: 'سطح الرخام والخلفية', fabricLabel: 'لون الكراسي' },
  { k: 'entry', l: 'خزائن المداخل', doorTab: 'خزانة المدخل والأحذية', openLabel: ['افتح خزائن المدخل والأحذية', 'أغلق خزائن المدخل'], accentTab: 'الرخام ومقعد الجلوس', accentLabel: 'سطح الكونسول', fabricLabel: 'لون مقعد الجلوس', defaultKind: 'hinged' },
  { k: 'laundry', l: 'غرف الغسيل', doorTab: 'خزائن الغسيل', openLabel: ['افتح الخزائن وسلة الفرز', 'أغلق الخزائن والسلة'], accentTab: 'سطح الطي والخلفية', accentLabel: 'سطح الرخام والخلفية', defaultKind: 'hinged' },
  { k: 'vanity', l: 'وحدات المغاسل', doorTab: 'وحدة المغسلة والخزانة', openLabel: ['افتح أدراج وخزانة المغسلة', 'أغلق الأدراج والخزانة'], accentTab: 'الرخام والخلفية', accentLabel: 'سطح الرخام والتكسية', defaultKind: 'hinged', defaultStyle: 'grooved' },
  { k: 'storage', l: 'غرف التخزين', doorTab: 'الخزائن والأرفف', openLabel: ['افتح الخزائن وأدراج الفرز', 'أغلق الخزائن والأدراج'], accentTab: 'طاولة الفرز', accentLabel: 'سطح طاولة الفرز الوسطية', defaultKind: 'hinged' },
  {
    k: 'cladding',
    l: 'التكسيات الخشبية',
    doorTab: 'التكسية والباب المخفي',
    openLabel: ['افتح الباب المخفي والدرج', 'أغلق الباب المخفي والدرج'],
    accentTab: 'الرخام والأريكة',
    accentLabel: 'لوح الرخام الجداري',
    fabricLabel: 'لون الأريكة',
    hideKind: true,
    defaultKind: 'hinged',
    defaultStyle: 'grooved',
    styleLabels: { flat: 'ألواح خشب عريضة', grooved: 'شرائح بديل الخشب', glass: 'دمج مرايا مدخنة' },
  },
  { k: 'furniture', l: 'الأثاث المخصص', doorTab: 'الستائر والوحدات', openLabel: ['افتح الستائر ووحدة البوفيه', 'أغلق الستائر والوحدة'], accentTab: 'الكنب والطاولات', accentLabel: 'رخام الطاولات', fabricLabel: 'قماش الكنب والستائر' },
  {
    k: 'wpc',
    l: 'الأبواب الداخلية WPC',
    doorTab: 'تصميم الأبواب',
    openLabel: ['افتح الأبواب الداخلية', 'أغلق الأبواب الداخلية'],
    accentTab: 'البرواز والإطار',
    accentLabel: 'لون البرواز المحيط',
    hideKind: true,
    defaultKind: 'hinged',
    defaultStyle: 'grooved',
    styleLabels: { flat: 'مسطح مودرن', grooved: 'محفور خطوط CNC', glass: 'مدمج بزجاج' },
  },
  {
    k: 'renovation',
    l: 'الترميم والتطوير',
    doorTab: 'التشطيب والخزائن',
    openLabel: ['افتح خزائن الحائط', 'أغلق خزائن الحائط'],
    accentTab: 'الرخام والأثاث',
    accentLabel: 'تكسية النيش الجداري',
    fabricLabel: 'لون الجلسة',
    styleLabels: { flat: 'بانوهات نيو كلاسيك', grooved: 'تكسية شرائح مودرن', glass: 'واجهات مرايا' },
  },
  { k: 'kitchens', l: 'حلول المطابخ', doorTab: 'خزائن المطبخ والجزيرة', openLabel: ['افتح خزائن المطبخ والجزيرة', 'أغلق خزائن المطبخ'], accentTab: 'الرخام والكراسي', accentLabel: 'رخام السطح والجزيرة الشلال', fabricLabel: 'لون كراسي البار', defaultKind: 'hinged' },
  { k: 'commercial', l: 'القطاع التجاري', doorTab: 'الكاونتر ووحدات العرض', openLabel: ['افتح خزائن العرض الخلفية', 'أغلق الخزائن'], accentTab: 'الرخام وجلسات الضيافة', accentLabel: 'رخام الكاونتر والطاولات', fabricLabel: 'لون كراسي الضيافة', defaultKind: 'hinged', defaultStyle: 'grooved' },
  {
    k: 'pocket',
    l: 'أبواب السحب المخفي',
    doorTab: 'الباب السحب المخفي',
    openLabel: ['اسحب الباب داخل الجدار', 'أغلق الباب المخفي'],
    accentTab: 'الإطار والغرفة الداخلية',
    accentLabel: 'إطار الفتحة والجدار الداخلي',
    hideKind: true,
    defaultKind: 'sliding',
    defaultStyle: 'grooved',
  },
];

const MODE_MAP = Object.fromEntries(modes.map((m) => [m.k, m])) as Record<Mode, ModeInfo>;

const chip = (on: boolean) =>
  `inline-flex min-h-[38px] items-center rounded-full border px-3.5 py-1.5 text-sm transition ${
    on ? 'border-brass bg-brass font-medium text-pine' : 'border-white/25 hover:border-brass'
  }`;

const dot = (on: boolean) =>
  `h-9 w-9 rounded-full border-2 transition ${on ? 'scale-110 border-brass ring-2 ring-brass/40' : 'border-white/30'}`;

function Joystick({ onMove }: { onMove: (x: number, y: number) => void }) {
  const base = useRef<HTMLDivElement>(null);
  const [k, setK] = useState({ x: 0, y: 0 });
  const upd = (e: React.PointerEvent) => {
    const r = base.current!.getBoundingClientRect();
    let dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    let dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    const l = Math.hypot(dx, dy);
    if (l > 1) {
      dx /= l;
      dy /= l;
    }
    setK({ x: dx, y: dy });
    onMove(dx, -dy);
  };
  const end = () => {
    setK({ x: 0, y: 0 });
    onMove(0, 0);
  };
  return (
    <div
      ref={base}
      aria-label="عصا الحركة"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        upd(e);
      }}
      onPointerMove={(e) => e.currentTarget.hasPointerCapture(e.pointerId) && upd(e)}
      onPointerUp={end}
      onPointerCancel={end}
      className="relative h-24 w-24 touch-none rounded-full border border-white/40 bg-black/35 backdrop-blur sm:h-28 sm:w-28"
    >
      <span
        className="absolute left-1/2 top-1/2 -ml-5 -mt-5 h-10 w-10 rounded-full bg-brass/90 sm:-ml-6 sm:-mt-6 sm:h-12 sm:w-12"
        style={{ transform: `translate(${k.x * 28}px,${k.y * 28}px)` }}
      />
    </div>
  );
}

type Tab = { k: Zone; l: string };
const tabsFor = (m: Mode): Tab[] => {
  const info = MODE_MAP[m];
  const out: Tab[] = [{ k: 'doors', l: 'الخشب' }];
  if (info.accentTab) out.push({ k: 'bed', l: 'التفاصيل' });
  return [...out, { k: 'side', l: 'الجدران' }, { k: 'floor', l: 'الأرضية' }, { k: 'light', l: 'الإضاءة' }];
};

export default function StudioClient() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [tab, setTab] = useState<Zone>('doors');
  const [panel, setPanel] = useState(true);
  const [touch, setTouch] = useState(false);
  const [hint, setHint] = useState(true);
  const [fd, setFd] = useState(0);
  const [fh, setFh] = useState(6);
  const [kind, setKind] = useState<'hinged' | 'sliding'>('sliding');
  const [style, setStyle] = useState<'flat' | 'grooved' | 'glass'>('flat');
  const [handle, setHandle] = useState<'hidden' | 'gold' | 'black'>('gold');
  const [open, setOpen] = useState(false);
  const [bedc, setBedc] = useState(0);
  const [side, setSide] = useState(0);
  const [fl, setFl] = useState(0);
  const [led, setLed] = useState(true);
  const [lc, setLc] = useState(0);
  const [lv, setLv] = useState(0.95);
  const [roomLight, setRoomLight] = useState(true);
  const [night, setNight] = useState(false);
  const move = useRef({ x: 0, y: 0 });
  const modeBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mode || !modeBarRef.current) return;
    const idx = modes.findIndex((x) => x.k === mode);
    const el = modeBarRef.current.children[idx] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [mode]);

  useEffect(() => {
    const sync = () => setTouch(matchMedia('(pointer: coarse)').matches || innerWidth < 768);
    sync();
    setPanel(innerWidth >= 640);
    addEventListener('resize', sync);
    return () => removeEventListener('resize', sync);
  }, []);

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('mode') as Mode | null;
    if (q && MODE_MAP[q]) start(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mode) return;
    setHint(true);
    const t = setTimeout(() => setHint(false), 8000);
    return () => clearTimeout(t);
  }, [mode]);

  const m = mode ?? 'closets';
  const info = MODE_MAP[m];
  const tabs = tabsFor(m);
  const sLabels = info.styleLabels ?? defaultStyles;

  const msg = `السلام عليكم، صممت في استوديو بنيان وأرغب بهذا التصميم (${info.l}):\nلون وخامة الخشب: ${finishes[fd].label}${!info.hideKind ? `\nنوع الأبواب: ${kind === 'sliding' ? 'منزلقة' : 'مفصلية'}` : ''}\nالنمط/الشكل: ${sLabels[style]}\nالمقابض: ${handle === 'hidden' ? 'مخفية' : handle === 'gold' ? 'ذهبية' : 'سوداء'}${info.accentLabel ? `\n${info.accentLabel}: ${finishes[fh].label}` : ''}${info.fabricLabel ? `\n${info.fabricLabel}: ${fabrics[bedc].n}` : ''}\nلون الجدران: ${sides[side].n}\nالأرضية: ${floors[fl].label}\nالإضاءة المخفية: ${led ? leds[lc].n : 'مطفأة'}`;

  const start = (md: Mode) => {
    try {
      const c = document.createElement('canvas');
      if (c.getContext('webgl2') || c.getContext('webgl')) {
        const nextInfo = MODE_MAP[md];
        setTab('doors');
        setKind(nextInfo.defaultKind ?? 'sliding');
        setStyle(nextInfo.defaultStyle ?? 'flat');
        setOpen(false);
        setMode(md);
        return;
      }
    } catch {}
    alert('جهازك لا يدعم العرض ثلاثي الأبعاد. تواصل معنا عبر واتساب ونرسل لك تصورًا.');
  };

  const pick = (z: Zone) => {
    setTab(z);
    setPanel(true);
    if (z === 'doors') setOpen((o) => !o);
  };

  return (
    <div className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#1B1310]">
      {mode ? (
        <Scene
          cfg={{
            mode,
            doors: finishes[fd],
            style,
            kind,
            handle,
            open,
            head: finishes[fh],
            bed: fabrics[bedc].c,
            side: sides[side].c,
            floor: floors[fl],
            led,
            ledColor: leds[lc].c,
            ledLevel: lv,
            roomLight,
            night,
          }}
          ctl={{ move, onPick: pick }}
        />
      ) : (
        <>
          <img src="/images/works/walkin/walkin-01.jpg" alt="استوديو بنيان ثلاثي الأبعاد" className="kb absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 flex flex-col items-center justify-center overflow-y-auto px-4 pb-8 pt-28 text-center text-white">
            <h1 className="font-display text-3xl font-bold sm:text-5xl">استوديو بنيان ثلاثي الأبعاد</h1>
            <p className="mt-2 max-w-lg text-sm text-white/80 sm:text-base">
              اختر أي قسم من الأقسام السبعة عشر، تجوّل داخله، افتح الأبواب والأدراج، وتحكّم بالإضاءة المخفية والليل والنهار فورًا.
            </p>
            <div className="mt-5 flex max-w-4xl flex-wrap justify-center gap-2">
              {modes.map((x, i) => (
                <button
                  key={x.k}
                  onClick={() => start(x.k)}
                  className={`relative inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                    i === 0 ? 'ringp bg-brass text-brass' : 'border border-white/35 bg-black/35 text-white backdrop-blur-sm hover:border-brass hover:bg-black/55'
                  }`}
                >
                  <Footprints size={16} className={i === 0 ? 'text-pine' : 'text-brass'} />
                  <span className={i === 0 ? 'text-pine' : ''}>{x.l}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {mode && (
        <div className="absolute inset-x-0 top-[6.75rem] z-10 flex items-center gap-1.5 px-2.5 sm:top-28 sm:px-4">
          <button
            type="button"
            onClick={() => setMode(null)}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-pine/95 px-3 text-xs font-medium text-brass shadow-lg ring-1 ring-brass/40 transition hover:bg-pine sm:h-10 sm:px-3.5"
          >
            <LayoutGrid size={14} />
            <span>كل الأقسام</span>
          </button>
          <button
            type="button"
            aria-label="تمرير لليمين"
            onClick={() => modeBarRef.current?.scrollBy({ left: 240, behavior: 'smooth' })}
            className="hidden h-9 w-9 shrink-0 place-items-center rounded-full bg-black/60 text-white shadow backdrop-blur hover:bg-black/80 md:grid"
          >
            <ChevronRight size={16} />
          </button>
          <div ref={modeBarRef} className="noscroll flex flex-1 gap-1.5 overflow-x-auto py-1" role="tablist" aria-label="أقسام الاستوديو">
            {modes.map((x) => (
              <button
                key={x.k}
                role="tab"
                aria-selected={mode === x.k}
                onClick={() => start(x.k)}
                className={`shrink-0 rounded-full px-3.5 py-2 text-xs shadow-lg backdrop-blur transition sm:px-4 sm:text-sm ${
                  mode === x.k ? 'bg-brass font-semibold text-pine' : 'bg-pine/80 text-white hover:bg-pine'
                }`}
              >
                {x.l}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="تمرير لليسار"
            onClick={() => modeBarRef.current?.scrollBy({ left: -240, behavior: 'smooth' })}
            className="hidden h-9 w-9 shrink-0 place-items-center rounded-full bg-black/60 text-white shadow backdrop-blur hover:bg-black/80 md:grid"
          >
            <ChevronLeft size={16} />
          </button>
        </div>
      )}

      {mode && (
        <div className="absolute start-3 top-[9.5rem] z-10 flex flex-wrap gap-1.5 sm:start-4 sm:top-40">
          <button
            type="button"
            aria-pressed={open}
            onClick={() => setOpen((o) => !o)}
            className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-3.5 text-xs font-medium shadow-lg backdrop-blur transition ${
              open ? 'bg-brass text-pine' : 'bg-pine/90 text-white ring-1 ring-white/20 hover:bg-pine'
            }`}
          >
            <DoorOpen size={15} />
            <span>{open ? info.openLabel[1] : info.openLabel[0]}</span>
          </button>
          <button
            type="button"
            aria-pressed={led}
            onClick={() => setLed((l) => !l)}
            className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-3.5 text-xs font-medium shadow-lg backdrop-blur transition ${
              led ? 'bg-brass text-pine' : 'bg-pine/90 text-white ring-1 ring-white/20 hover:bg-pine'
            }`}
          >
            <Lightbulb size={15} />
            <span>{led ? 'LED يعمل' : 'LED مطفأ'}</span>
          </button>
          <button
            type="button"
            aria-pressed={night}
            onClick={() => setNight((n) => !n)}
            className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-3.5 text-xs font-medium shadow-lg backdrop-blur transition ${
              night ? 'bg-brass text-pine' : 'bg-pine/90 text-white ring-1 ring-white/20 hover:bg-pine'
            }`}
          >
            {night ? <Moon size={15} /> : <Sun size={15} />}
            <span>{night ? 'وضع الليل' : 'وضع النهار'}</span>
          </button>
        </div>
      )}

      {mode && hint && (
        <p className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto hidden w-fit max-w-[90%] rounded-full bg-pine/90 px-5 py-2 text-center text-xs text-white shadow-lg backdrop-blur md:block">
          WASD أو الأسهم للمشي · اسحب للنظر · اضغط على الأبواب أو الأسطح للتخصيص
        </p>
      )}

      {mode && touch && !panel && (
        <div className="absolute bottom-24 start-4 z-10 sm:hidden">
          <Joystick
            onMove={(x, y) => {
              move.current = { x, y };
            }}
          />
        </div>
      )}
      {mode && touch && (
        <div className="absolute bottom-6 start-4 z-10 hidden sm:block">
          <Joystick
            onMove={(x, y) => {
              move.current = { x, y };
            }}
          />
        </div>
      )}

      {mode && (
        <div className="absolute inset-x-3 bottom-3 z-10 max-h-[48%] overflow-auto rounded-[26px] bg-pine/95 p-3.5 text-white shadow-2xl ring-1 ring-white/15 backdrop-blur-md sm:inset-x-auto sm:bottom-auto sm:end-4 sm:top-40 sm:max-h-[calc(100svh-11rem)] sm:w-[21rem]">
          <div className="flex items-start justify-between gap-1.5">
            <div className="flex flex-1 flex-wrap gap-1" role="tablist">
              {tabs.map((t) => (
                <button
                  key={t.k}
                  role="tab"
                  aria-selected={tab === t.k}
                  onClick={() => {
                    setTab(t.k);
                    setPanel(true);
                  }}
                  className={`rounded-full px-2.5 py-1 text-xs transition ${tab === t.k ? 'bg-brass font-semibold text-pine' : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'}`}
                >
                  {t.l}
                </button>
              ))}
            </div>
            <button aria-label={panel ? 'طي اللوحة' : 'فتح اللوحة'} onClick={() => setPanel(!panel)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10">
              {panel ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>
          </div>

          {panel && (
            <div className="mt-3 grid gap-3.5">
              {tab === 'doors' && (
                <>
                  <div>
                    <p className="mb-2 text-xs text-white/65">لون وخامة الخشب</p>
                    <div className="flex flex-wrap gap-2">
                      {finishes.slice(0, 6).map((f, i) => (
                        <button key={f.id} aria-label={f.label} title={f.label} aria-pressed={i === fd} onClick={() => setFd(i)} className={dot(i === fd)} style={{ background: f.base }} />
                      ))}
                    </div>
                  </div>
                  {!info.hideKind && (
                    <div>
                      <p className="mb-2 text-xs text-white/65">آلية فتح الأبواب</p>
                      <div className="flex flex-wrap gap-2">
                        {([['sliding', 'سحب منزلقة'], ['hinged', 'مفصلية']] as const).map(([k, l]) => (
                          <button key={k} aria-pressed={kind === k} onClick={() => setKind(k)} className={chip(kind === k)}>
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="mb-2 text-xs text-white/65">نمط التصميم</p>
                    <div className="flex flex-wrap gap-2">
                      {(['flat', 'grooved', 'glass'] as const).map((k) => (
                        <button key={k} aria-pressed={style === k} onClick={() => setStyle(k)} className={chip(style === k)}>
                          {sLabels[k]}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs text-white/65">المقابض والإكسسوارات</p>
                    <div className="flex flex-wrap gap-2">
                      {([['hidden', 'مخفية'], ['gold', 'ذهبية'], ['black', 'سوداء']] as const).map(([k, l]) => (
                        <button key={k} aria-pressed={handle === k} onClick={() => setHandle(k)} className={chip(handle === k)}>
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button aria-pressed={open} onClick={() => setOpen(!open)} className={chip(open)}>
                    {open ? info.openLabel[1] : info.openLabel[0]}
                  </button>
                </>
              )}

              {tab === 'bed' && (
                <>
                  {info.accentLabel && (
                    <div>
                      <p className="mb-2 text-xs text-white/65">{info.accentLabel}</p>
                      <div className="flex flex-wrap gap-2">
                        {finishes.map((f, i) => (
                          <button key={f.id} aria-label={f.label} title={f.label} aria-pressed={i === fh} onClick={() => setFh(i)} className={dot(i === fh)} style={{ background: f.base }} />
                        ))}
                      </div>
                    </div>
                  )}
                  {info.fabricLabel && (
                    <div>
                      <p className="mb-2 text-xs text-white/65">{info.fabricLabel}</p>
                      <div className="flex flex-wrap gap-2">
                        {fabrics.map((b, i) => (
                          <button key={b.c} aria-label={b.n} title={b.n} aria-pressed={i === bedc} onClick={() => setBedc(i)} className={dot(i === bedc)} style={{ background: b.c }} />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {tab === 'side' && (
                <div>
                  <p className="mb-2 text-xs text-white/65">لون دهان الجدران</p>
                  <div className="flex flex-wrap gap-2">
                    {sides.map((x, i) => (
                      <button key={x.c} aria-label={x.n} title={x.n} aria-pressed={i === side} onClick={() => setSide(i)} className={dot(i === side)} style={{ background: x.c }} />
                    ))}
                  </div>
                </div>
              )}

              {tab === 'floor' && (
                <div>
                  <p className="mb-2 text-xs text-white/65">خامة الأرضية</p>
                  <div className="flex flex-wrap gap-2">
                    {floors.map((f, i) => (
                      <button key={f.id} aria-pressed={i === fl} onClick={() => setFl(i)} className={chip(i === fl)}>
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'light' && (
                <>
                  <div>
                    <p className="mb-2 text-xs text-white/65">التحكم بالإنارة</p>
                    <div className="flex flex-wrap gap-2">
                      <button aria-pressed={led} onClick={() => setLed(!led)} className={chip(led)}>
                        {led ? 'الإضاءة المخفية: تعمل' : 'الإضاءة المخفية: مطفأة'}
                      </button>
                      <button aria-pressed={roomLight} onClick={() => setRoomLight(!roomLight)} className={chip(roomLight)}>
                        {roomLight ? 'سبوت السقف: يعمل' : 'سبوت السقف: مطفأ'}
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs text-white/65">لون الإضاءة المخفية LED</p>
                    <div className="flex flex-wrap gap-2">
                      {leds.map((l, i) => (
                        <button
                          key={l.c}
                          aria-pressed={led && i === lc}
                          onClick={() => {
                            setLc(i);
                            setLed(true);
                          }}
                          className={chip(led && i === lc)}
                        >
                          {l.n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <label className="grid gap-1 text-xs text-white/75">
                    شدة الإضاءة المخفية ({Math.round(lv * 100)}%)
                    <input
                      type="range"
                      min={0.15}
                      max={1.5}
                      step={0.05}
                      value={lv}
                      onChange={(e) => {
                        setLv(+e.target.value);
                        if (!led) setLed(true);
                      }}
                      className="accent-[#E4A877]"
                    />
                  </label>
                  <div>
                    <p className="mb-2 text-xs text-white/65">وقت المشهد</p>
                    <div className="flex gap-2">
                      <button aria-pressed={!night} onClick={() => setNight(false)} className={chip(!night)}>
                        نهار طبيعي
                      </button>
                      <button aria-pressed={night} onClick={() => setNight(true)} className={chip(night)}>
                        مساء وليل
                      </button>
                    </div>
                  </div>
                </>
              )}

              <a href={waLink(msg)} className="inline-flex items-center justify-center gap-2 rounded-full bg-brass px-5 py-3 text-sm font-semibold text-pine transition hover:bg-brass2">
                <MessageCircle size={16} />
                اطلب هذا التصميم عبر واتساب
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
