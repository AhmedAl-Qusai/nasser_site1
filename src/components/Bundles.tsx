'use client';
import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { bundles } from '@/data/bundles';
import { cities, waLink } from '@/data/siteConfig';
import { track } from '@/lib/track';
const field = 'w-full rounded-2xl border border-line bg-bg px-4 py-3 focus:border-gold';
export default function Bundles() {
  const [sel, setSel] = useState<(typeof bundles)[number] | null>(null); const [city, setCity] = useState(cities[0]); const [phone, setPhone] = useState(''); const [err, setErr] = useState('');
  useEffect(() => { if (!sel) return; const f = (e: KeyboardEvent) => e.key === 'Escape' && setSel(null); addEventListener('keydown', f); document.body.style.overflow = 'hidden'; return () => { removeEventListener('keydown', f); document.body.style.overflow = ''; }; }, [sel]);
  const send = () => {
    if (phone.replace(/\D/g, '').length < 9) return setErr('اكتب رقم جوال صحيح.');
    setErr(''); track('bundle', { bundle: sel?.title });
    window.open(waLink(`السلام عليكم، أرغب بعرض سعر لـ ${sel?.title}.\nالمدينة: ${city}\nالجوال: ${phone}`), '_blank', 'noopener'); setSel(null);
  };
  return (
    <section id="bundles" className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:py-32">
      <div data-r className="max-w-2xl"><h2 className="font-display text-[1.85rem] font-bold leading-snug sm:text-4xl md:text-5xl">باقات انتقالك لمنزلك الجديد</h2>
        <p className="mt-3 text-muted">خدمات متعددة في عقد واحد وبهوية واحدة، لأصحاب الفلل والشقق الجديدة.</p></div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {bundles.map((b, i) => (
          <article key={b.id} data-r className="spot flex flex-col rounded-[2rem] border border-line bg-surface p-8" style={{ '--d': `${i * 100}ms` } as React.CSSProperties}>
            <p className="text-xs text-gold">{b.tag}</p><h3 className="mt-1 font-display text-2xl font-semibold">{b.title}</h3>
            <ul className="mt-6 flex-1 space-y-3">{b.items.map((it) => <li key={it} className="flex gap-3"><Check size={20} className="mt-0.5 shrink-0 text-sage" />{it}</li>)}</ul>
            <button onClick={() => setSel(b)} className="mt-8 rounded-full bg-pine px-6 py-3.5 font-medium text-white transition hover:bg-pine2 dark:bg-brass dark:text-pine">اطلب عرض سعر للباقة</button>
          </article>))}
      </div>
      {sel && (
        <div role="dialog" aria-modal="true" aria-label={sel.title} className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm" onClick={() => setSel(null)}>
          <div className="fadeup w-full max-w-md rounded-[2rem] bg-surface p-7 shadow-2xl" style={{ animationDuration: '.4s' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs text-gold">طلب عرض سعر</p><h3 className="font-display text-2xl font-semibold">{sel.title}</h3></div>
              <button aria-label="إغلاق" onClick={() => setSel(null)} className="grid h-9 w-9 place-items-center rounded-full border border-line"><X size={16} /></button></div>
            <div className="mt-6 grid gap-4">
              <label className="grid gap-1.5 text-sm">المدينة<select autoFocus className={field} value={city} onChange={(e) => setCity(e.target.value)}>{cities.map((c) => <option key={c}>{c}</option>)}</select></label>
              <label className="grid gap-1.5 text-sm">رقم الجوال<input className={field} dir="ltr" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /></label>
              {err && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{err}</p>}
              <button onClick={send} className="rounded-full bg-brass px-6 py-3.5 font-medium text-pine transition hover:bg-brass2">أرسل الطلب عبر واتساب</button></div>
          </div>
        </div>)}
    </section>
  );
}
