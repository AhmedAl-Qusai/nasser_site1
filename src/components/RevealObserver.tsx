'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
export default function RevealObserver() {
  const path = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-r]:not(.in)'));
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [path]);
  useEffect(() => {
    const f = (e: PointerEvent) => { const s = (e.target as HTMLElement).closest?.('.spot') as HTMLElement | null; if (!s) return; const r = s.getBoundingClientRect(); s.style.setProperty('--mx', `${e.clientX - r.left}px`); s.style.setProperty('--my', `${e.clientY - r.top}px`); };
    addEventListener('pointermove', f, { passive: true }); return () => removeEventListener('pointermove', f);
  }, []);
  return null;
}
