'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, TriangleAlert } from 'lucide-react';
import pricing from '@/data/pricing.json';
import { cities, waLink } from '@/data/siteConfig';
import { track } from '@/lib/track';
import ServiceIcon from './ServiceIcon';
type Tier = 'standard' | 'vip';
const tiers: Record<Tier, { name: string; desc: string }> = {
  standard: { name: 'قياسي', desc: 'خشب MDF عالي الكثافة + مفصلات إغلاق ناعم' },
  vip: { name: 'فاخر (VIP)', desc: 'تشطيبات مطفية/لامعة + إضاءة LED مدمجة + أبواب زجاجية بإطار ألمنيوم' },
};
const fmt = (n: number) => n.toLocaleString('ar-SA');
const field = 'w-full rounded-2xl border border-line bg-bg px-4 py-3 focus:border-gold';
export default function CostCalculator() {
  const [step, setStep] = useState(1); const [svc, setSvc] = useState(''); const [w, setW] = useState(''); const [h, setH] = useState('2.6'); const [tier, setTier] = useState<Tier>('standard');
  const [city, setCity] = useState(cities[0]); const [phone, setPhone] = useState(''); const [err, setErr] = useState('');
  const L = pricing.limits; const s = pricing.services.find((x) => x.id === svc);
  const W = parseFloat(w.replace(',', '.')), H = parseFloat(h.replace(',', '.'));
  const t = s?.[tier]; const area = W * H;
  const lo = t ? Math.round((area * t.min + t.fixedMin) / pricing.round) * pricing.round : 0, hi = t ? Math.round((area * t.max + t.fixedMax) / pricing.round) * pricing.round : 0;
  const next = () => {
    if (step === 1 && !svc) return setErr('اختر الخدمة أولًا.');
    if (step === 2) { if (!(W >= L.minW && W <= L.maxW)) return setErr(`العرض يجب أن يكون بين ${L.minW} و${L.maxW} متر.`); if (!(H >= L.minH && H <= L.maxH)) return setErr(`الارتفاع يجب أن يكون بين ${L.minH} و${L.maxH} متر.`); }
    setErr(''); setStep(step + 1);
  };
  const send = () => {
    track('calculator', { service: s?.label, tier });
    const msg = ['السلام عليكم، حسبت التكلفة المبدئية في موقع بنيان وأرغب بحجز رفع مقاسات مجاني:', `الخدمة: ${s?.label}`, `المقاس التقريبي: ${W} × ${H} متر`, `المستوى: ${tiers[tier].name}`, `التقدير المبدئي: ${fmt(lo)} – ${fmt(hi)} ${pricing.currency}`, `المدينة: ${city}`, phone && `الجوال: ${phone}`].filter(Boolean).join('\n');
    window.open(waLink(msg), '_blank', 'noopener');
  };
  const nb = 'inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition';
  return (
    <div className="mx-auto w-full max-w-3xl rounded-[2rem] border border-line bg-surface p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,.35)] md:p-10">
      <ol className="mb-8 flex items-center gap-2" aria-label="خطوات الحاسبة">{['الخدمة', 'المقاسات', 'المستوى', 'النتيجة'].map((l, i) => (
        <li key={l} className="flex flex-1 items-center gap-2"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm transition ${step > i + 1 ? 'bg-gold text-white' : step === i + 1 ? 'bg-pine text-white dark:bg-brass dark:text-pine' : 'border border-line text-muted'}`}>{step > i + 1 ? <Check size={16} /> : i + 1}</span><span className={`hidden text-sm sm:block ${step === i + 1 ? 'font-semibold' : 'text-muted'}`}>{l}</span><span className="h-px flex-1 bg-line" /></li>))}</ol>
      <div key={step} className="fadeup" style={{ animationDuration: '.5s' }}>
        {step === 1 && (<><h3 className="font-display text-2xl font-bold">ماذا تريد أن نصمّم لك؟</h3>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{pricing.services.map((x) => (
            <button key={x.id} aria-pressed={svc === x.id} onClick={() => { setSvc(x.id); setErr(''); }} className={`flex flex-col items-start gap-1 rounded-2xl border p-4 text-start transition ${svc === x.id ? 'border-gold bg-sand' : 'border-line hover:border-gold'}`}>
              <ServiceIcon name={x.icon} size={26} /><span className="mt-1 font-semibold">{x.label}</span><span className="text-xs text-muted">{x.hint}</span></button>))}</div></>)}
        {step === 2 && (<><h3 className="font-display text-2xl font-bold">ما المقاسات التقريبية؟</h3><p className="mt-1 text-sm text-muted">تقدير مبدئي، والمقاس النهائي نرفعه عندك مجاناً.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm">العرض (بالمتر)<input className={field} inputMode="decimal" dir="ltr" placeholder="مثال: 3" value={w} onChange={(e) => setW(e.target.value)} /></label>
            <label className="grid gap-1.5 text-sm">الارتفاع (بالمتر)<input className={field} inputMode="decimal" dir="ltr" placeholder="2.6" value={h} onChange={(e) => setH(e.target.value)} /></label></div></>)}
        {step === 3 && (<><h3 className="font-display text-2xl font-bold">اختر مستوى التشطيب</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">{(Object.keys(tiers) as Tier[]).map((k) => (
            <button key={k} aria-pressed={tier === k} onClick={() => setTier(k)} className={`rounded-2xl border p-5 text-start transition ${tier === k ? 'border-gold bg-sand' : 'border-line hover:border-gold'}`}><span className="font-display text-xl font-semibold">{tiers[k].name}</span><span className="mt-1 block text-sm text-muted">{tiers[k].desc}</span></button>))}</div></>)}
        {step === 4 && s && (<>
          <p className="text-muted">التكلفة التقديرية لمشروعك تتراوح بين</p>
          <p className="mt-2 font-display text-4xl font-bold text-gold sm:text-5xl">{fmt(lo)} <span className="text-2xl text-ink">و</span> {fmt(hi)}</p>
          <p className="mt-1 text-lg">{pricing.currency}</p>
          <ul className="mt-5 flex flex-wrap gap-2 text-sm">{[s.label, `${W} × ${H} م`, tiers[tier].name].map((c) => <li key={c} className="rounded-full border border-line px-3 py-1">{c}</li>)}</ul>
          {pricing.placeholder && <p role="note" className="mt-5 flex gap-2 rounded-2xl bg-[#fff3cd] p-3 text-sm text-[#664d03]"><TriangleAlert size={18} className="mt-0.5 shrink-0" />أسعار تجريبية: عدّلها في src/data/pricing.json ثم غيّر placeholder إلى false لإخفاء هذا التنبيه.</p>}
          <p className="mt-4 text-sm text-muted">هذا تقدير مبدئي فقط، ويُحدَّد السعر النهائي بعد رفع المقاسات واعتماد التصميم.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm">المدينة<select className={field} value={city} onChange={(e) => setCity(e.target.value)}>{cities.map((c) => <option key={c}>{c}</option>)}</select></label>
            <label className="grid gap-1.5 text-sm">رقم الجوال (اختياري)<input className={field} dir="ltr" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" /></label></div></>)}
      </div>
      {err && <p role="alert" className="mt-4 text-sm text-red-600 dark:text-red-400">{err}</p>}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        {step > 1 ? <button onClick={() => { setErr(''); setStep(step - 1); }} className={`${nb} border border-line hover:border-gold`}><ArrowRight size={16} />السابق</button> : <span />}
        {step < 4 ? <button onClick={next} className={`${nb} bg-pine text-white hover:bg-pine2 dark:bg-brass dark:text-pine`}>التالي<ArrowLeft size={16} /></button>
          : <button onClick={send} className={`${nb} bg-brass text-pine hover:bg-brass2`}>اعتماد السعر المبدئي وحجز رفع مقاسات مجاني</button>}
      </div>
    </div>
  );
}
