'use client';
import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { ChevronsLeftRight } from 'lucide-react';
export default function CompareSlider({ before, after, label, intro = true, className = '' }: { before: string; after: string; label: string; intro?: boolean; className?: string }) {
  const [pos, setPos] = useState(intro ? 94 : 50);
  const box = useRef<HTMLDivElement>(null); const anim = useRef<{ stop: () => void } | null>(null); const drag = useRef(false);
  const inView = useInView(box, { once: true, amount: 0.5 }); const reduce = useReducedMotion();
  useEffect(() => {
    if (!intro || !inView) return;
    if (reduce) { setPos(50); return; }
    anim.current = animate(94, 50, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: setPos });
    return () => anim.current?.stop();
  }, [inView, reduce, intro]);
  const move = (x: number) => { const r = box.current!.getBoundingClientRect(); setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100))); };
  return (
    <div ref={box} dir="ltr" role="slider" tabIndex={0} aria-label="مقارنة قبل وبعد" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)}
      className={`relative aspect-[4/5] w-full cursor-ew-resize select-none overflow-hidden bg-surface ${className}`} style={{ touchAction: 'pan-y' }}
      onPointerDown={(e) => { anim.current?.stop(); drag.current = true; e.currentTarget.setPointerCapture(e.pointerId); move(e.clientX); }}
      onPointerMove={(e) => drag.current && move(e.clientX)} onPointerUp={() => (drag.current = false)}
      onKeyDown={(e) => { if (e.key === 'ArrowLeft') setPos((v) => Math.max(0, v - 5)); if (e.key === 'ArrowRight') setPos((v) => Math.min(100, v + 5)); }}>
      <img src={after} alt={`${label} بعد التنفيذ`} draggable={false} className="absolute inset-0 h-full w-full object-cover" />
      <img src={before} alt={`${label} قبل التنفيذ`} draggable={false} className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
      <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,.15)]" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-lg"><ChevronsLeftRight size={20} /></span>
      </div>
      <span dir="rtl" className="pointer-events-none absolute start-3 top-3 bg-black/60 px-3 py-1 text-xs text-white">قبل</span>
      <span dir="rtl" className="pointer-events-none absolute end-3 top-3 bg-black/60 px-3 py-1 text-xs text-white">بعد</span>
    </div>
  );
}
