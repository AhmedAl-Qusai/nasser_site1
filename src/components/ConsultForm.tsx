'use client';
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { services } from '@/data/services';
import { waLink } from '@/data/siteConfig';
const field = 'w-full rounded-sm border border-line bg-surface px-4 py-3 text-ink placeholder:text-muted focus:border-gold';
export default function ConsultForm() {
  const [f, setF] = useState({ name: '', phone: '', area: '', service: '', details: '' });
  const [err, setErr] = useState('');
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const send = () => {
    if (!f.name.trim() || !f.phone.trim()) { setErr('اكتب اسمك ورقم جوالك ليتواصل معك فريقنا.'); return; }
    setErr('');
    const msg = ['السلام عليكم، أرغب بطلب استشارة مجانية.', `الاسم: ${f.name}`, `الجوال: ${f.phone}`, f.area && `الحي: ${f.area}`, f.service && `الخدمة: ${f.service}`, f.details && `التفاصيل: ${f.details}`].filter(Boolean).join('\n');
    window.open(waLink(msg), '_blank', 'noopener');
  };
  return (
    <section id="consult" className="bg-navy py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">احجز استشارتك المجانية</h2>
          <p className="mt-4 max-w-md text-white/75">عبّئ البيانات وتصلنا طلبك مباشرة على واتساب. نرد عليك بأسرع وقت خلال ساعات العمل.</p>
        </div>
        <div className="grid gap-4 text-ink">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm text-white/85">الاسم<input className={field} value={f.name} onChange={set('name')} autoComplete="name" /></label>
            <label className="grid gap-1.5 text-sm text-white/85">رقم الجوال<input className={field} dir="ltr" inputMode="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" /></label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm text-white/85">الحي<input className={field} value={f.area} onChange={set('area')} /></label>
            <label className="grid gap-1.5 text-sm text-white/85">الخدمة المطلوبة
              <select className={field} value={f.service} onChange={set('service')}><option value="">اختر الخدمة</option>{services.map((s) => <option key={s.id}>{s.title}</option>)}<option>غير متأكد بعد</option></select></label>
          </div>
          <label className="grid gap-1.5 text-sm text-white/85">تفاصيل إضافية<textarea className={field} rows={3} value={f.details} onChange={set('details')} /></label>
          {err && <p role="alert" className="text-sm text-[#f3c98b]">{err}</p>}
          <button onClick={send} className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#D2AE68] px-7 py-3.5 font-medium text-navy transition-colors hover:bg-[#e0bf7e]"><MessageCircle size={18} />أرسل الطلب عبر واتساب</button>
        </div>
      </div>
    </section>
  );
}
