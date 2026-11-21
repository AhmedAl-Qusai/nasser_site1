'use client';
import { useEffect, useRef, useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
const N = 10;
// before/after: شرائح عمودية تنقلب بحركة 3D مثل جدار الشيبورد. السحب يتحكم بالانقلاب.
export default function CompareSlider({ before, after, label, intro = true, className = '' }: { before: string; after: string; label: string; intro?: boolean; className?: string }) {
  const box = useRef<HTMLDivElement>(null); const p = useRef(0); const raf = useRef(0); const drag = useRef(false);
  const [ready, setReady] = useState(false); const [touched, setTouched] = useState(false);
  const set = (v: number) => { p.current = v; const b = box.current; if (!b) return; b.style.setProperty('--p', String(v)); b.setAttribute('aria-valuenow', String(Math.round(v * 100))); };
  const tween = (to: number, ms: number, done?: () => void) => {
    cancelAnimationFrame(raf.current); const from = p.current, t0 = performance.now();
    const step = (t: number) => { const k = Math.min(1, (t - t0) / ms), e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; set(from + (to - from) * e); if (k < 1) raf.current = requestAnimationFrame(step); else done?.(); };
    raf.current = requestAnimationFrame(step);
  };
  useEffect(() => {
    const el = box.current!; set(0);
    const near = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setReady(true); near.disconnect(); } }, { rootMargin: '400px' });
    const view = new IntersectionObserver(([e]) => { if (!e.isIntersecting) return; view.disconnect(); if (!intro || matchMedia('(prefers-reduced-motion: reduce)').matches) set(0.5); else tween(1, 2600); }, { threshold: 0.55 });
    near.observe(el); view.observe(el);
    return () => { near.disconnect(); view.disconnect(); cancelAnimationFrame(raf.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const move = (x: number) => { const r = box.current!.getBoundingClientRect(); set(Math.min(1, Math.max(0, (x - r.left) / r.width))); };
  const bg = (u: string) => (ready ? { backgroundImage: `url(${u})` } : undefined);
  return (
    <div className={`arch relative aspect-[4/5] w-full overflow-hidden bg-sand ${className}`} style={{ touchAction: 'pan-y' }}>
      <div ref={box} dir="ltr" role="slider" tabIndex={0} aria-label={`مقارنة قبل وبعد: ${label}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}
        className="slats absolute inset-0 cursor-ew-resize select-none" style={{ ['--n' as string]: N }}
        onPointerDown={(e) => { cancelAnimationFrame(raf.current); drag.current = true; setTouched(true); e.currentTarget.setPointerCapture(e.pointerId); move(e.clientX); }}
        onPointerMove={(e) => drag.current && move(e.clientX)} onPointerUp={() => (drag.current = false)}
        onKeyDown={(e) => { if (e.key === 'ArrowLeft') set(Math.max(0, p.current - 0.08)); if (e.key === 'ArrowRight') set(Math.min(1, p.current + 0.08)); }}>
        {Array.from({ length: N }, (_, i) => (
          <div key={i} className="slat" style={{ ['--i' as string]: i }} aria-hidden="true">
            <div className="face" style={bg(before)} /><div className="face b" style={bg(after)} />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-brass shadow-[0_0_18px_4px_rgba(221,176,106,.6)]" style={{ left: 'clamp(26px, calc(var(--p) * 100%), calc(100% - 26px))' }}>
          <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brass text-pine shadow-xl"><ChevronsLeftRight size={20} /></span>
        </div>
        <span dir="rtl" className="pointer-events-none absolute bottom-6 right-4 rounded-full bg-black/55 px-3 py-1 text-xs text-white">قبل</span>
        <span dir="rtl" className="pointer-events-none absolute bottom-6 left-4 rounded-full bg-brass px-3 py-1 text-xs text-pine">بعد</span>
        {!touched && <span dir="rtl" className="pointer-events-none absolute inset-x-0 top-5 mx-auto w-fit rounded-full bg-black/55 px-4 py-1.5 text-xs text-white">اسحب لترى الموقع قبل التنفيذ</span>}
      </div>
    </div>
  );
}
