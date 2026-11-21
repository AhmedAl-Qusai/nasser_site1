'use client';
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { services } from '@/data/services';
import { waLink } from '@/data/siteConfig';
const field = 'w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-brass';
export default function ConsultForm() {
  const [f, setF] = useState({ name: '', phone: '', area: '', service: '', details: '' }); const [err, setErr] = useState('');
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const send = () => {
    if (!f.name.trim() || !f.phone.trim()) { setErr('اكتب اسمك ورقم جوالك ليتواصل معك فريقنا.'); return; }
    setErr('');
    const msg = ['السلام عليكم، أرغب بطلب استشارة مجانية.', `الاسم: ${f.name}`, `الجوال: ${f.phone}`, f.area && `الحي: ${f.area}`, f.service && `الخدمة: ${f.service}`, f.details && `التفاصيل: ${f.details}`].filter(Boolean).join('\n');
    window.open(waLink(msg), '_blank', 'noopener');
  };
  return (
    <section id="consult" className="px-3 pb-3">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-pine px-6 py-20 text-white md:px-14">
        <span aria-hidden className="pointer-events-none absolute -start-24 -top-24 h-80 w-80 rounded-full border border-brass/25" />
        <div className="relative grid gap-12 lg:grid-cols-2">
          <div data-r><h2 className="font-display text-4xl font-bold sm:text-5xl">احجز استشارتك المجانية</h2>
            <p className="mt-4 max-w-md text-white/70">عبّئ البيانات ويصلنا طلبك مباشرة على واتساب. نرد عليك بأسرع وقت خلال ساعات العمل.</p></div>
          <div data-r className="grid gap-4" style={{ '--d': '120ms' } as React.CSSProperties}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm text-white/80">الاسم<input className={field} value={f.name} onChange={set('name')} autoComplete="name" /></label>
              <label className="grid gap-1.5 text-sm text-white/80">رقم الجوال<input className={field} dir="ltr" inputMode="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" /></label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm text-white/80">الحي<input className={field} value={f.area} onChange={set('area')} /></label>
              <label className="grid gap-1.5 text-sm text-white/80">الخدمة المطلوبة
                <select className={`${field} [&>option]:text-ink`} value={f.service} onChange={set('service')}><option value="">اختر الخدمة</option>{services.map((s) => <option key={s.id}>{s.title}</option>)}<option>غير متأكد بعد</option></select></label>
            </div>
            <label className="grid gap-1.5 text-sm text-white/80">تفاصيل إضافية<textarea className={field} rows={3} value={f.details} onChange={set('details')} /></label>
            {err && <p role="alert" className="text-sm text-brass2">{err}</p>}
            <button onClick={send} className="inline-flex items-center justify-center gap-2 rounded-full bg-brass px-7 py-4 font-medium text-pine transition hover:-translate-y-0.5 hover:bg-brass2"><MessageCircle size={18} />أرسل الطلب عبر واتساب</button>
          </div>
        </div>
      </div>
    </section>
  );
}
