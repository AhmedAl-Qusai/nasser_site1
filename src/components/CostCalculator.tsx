'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import pricing from '@/data/pricing.json';
import { cities, waLink } from '@/data/siteConfig';
import { track } from '@/lib/track';
import ServiceIcon from './ServiceIcon';
const fmt = (n: number) => n.toLocaleString('ar-SA');
const field = 'w-full rounded-2xl border border-line bg-bg px-4 py-3.5 text-base focus:border-gold';
type Step = 'service' | 'design' | 'size' | 'material' | 'result';
const labels: Record<Step, string> = { service: 'الخدمة', design: 'النوع', size: 'المقاسات', material: 'الخامة', result: 'النتيجة' };
export default function CostCalculator() {
  const enabled = pricing.services.filter((s) => s.designs);
  const steps: Step[] = [...(enabled.length > 1 ? (['service'] as Step[]) : []), 'design', 'size', 'material', 'result'];
  const [i, setI] = useState(0); const [svcId, setSvcId] = useState(enabled.length === 1 ? enabled[0].id : ''); const [designId, setDesignId] = useState(''); const [matId, setMatId] = useState('');
  const [w, setW] = useState(''); const [h, setH] = useState('2.6'); const [city, setCity] = useState(cities[0]); const [phone, setPhone] = useState(''); const [err, setErr] = useState('');
  const step = steps[i]; const L = pricing.limits;
  const svc = enabled.find((s) => s.id === svcId); const design = svc?.designs?.find((d) => d.id === designId); const mat = pricing.materials.find((m) => m.id === matId);
  const per = svc?.unit === 'm' ? 'm' : 'm2';
  const W = parseFloat(w.replace(',', '.')), H = parseFloat(h.replace(',', '.'));
  const rate = design && mat ? (design.prices as Record<string, number>)[mat.id] : 0; const qty = per === 'm' ? W : W * H;
  const price = Math.round((qty * rate) / pricing.round) * pricing.round; const withVat = Math.round((price * (1 + pricing.vat)) / pricing.round) * pricing.round;
  const go = (d: 1 | -1) => {
    if (d === 1) {
      if (step === 'service' && !svc) return setErr('اختر الخدمة أولًا.');
      if (step === 'design' && !design) return setErr('اختر نوع التصميم أولًا.');
      if (step === 'size') { if (!(W >= L.minW && W <= L.maxW)) return setErr(`العرض يجب أن يكون بين ${L.minW} و${L.maxW} متر.`); if (per === 'm2' && !(H >= L.minH && H <= L.maxH)) return setErr(`الارتفاع يجب أن يكون بين ${L.minH} و${L.maxH} متر.`); }
      if (step === 'material' && !mat) return setErr('اختر الخامة أولًا.');
    }
    setErr(''); setI(i + d);
  };
  const send = () => {
    track('calculator', { service: svc?.label, design: design?.label });
    const msg = ['السلام عليكم، حسبت التكلفة التقريبية في موقع بنيان وأرغب بحجز رفع مقاسات مجاني:', `الخدمة: ${svc?.label} - ${design?.label}`, `الخامة: ${mat?.label}`, `المقاس التقريبي: ${W} × ${H} متر`, `التكلفة التقديرية: ${fmt(price)} ${pricing.currency} (غير شامل القيمة المضافة)`, `المدينة: ${city}`, phone && `الجوال: ${phone}`].filter(Boolean).join('\n');
    window.open(waLink(msg), '_blank', 'noopener');
  };
  const opt = (on: boolean) => `flex w-full flex-col items-start gap-1 rounded-2xl border p-4 text-start transition active:scale-[.98] ${on ? 'border-gold bg-sand' : 'border-line hover:border-gold'}`;
  const nb = 'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-medium transition';
  return (
    <div className="mx-auto w-full max-w-3xl rounded-[2rem] border border-line bg-surface p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,.35)] sm:p-8 md:p-10">
      <ol className="mb-7 flex items-center gap-1.5" aria-label="خطوات الحاسبة">{steps.map((s, k) => (
        <li key={s} className="flex flex-1 items-center gap-1.5"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm transition ${i > k ? 'bg-gold text-white' : i === k ? 'bg-pine text-white dark:bg-brass dark:text-pine' : 'border border-line text-muted'}`}>{i > k ? <Check size={16} /> : k + 1}</span><span className={`hidden text-sm sm:block ${i === k ? 'font-semibold' : 'text-muted'}`}>{labels[s]}</span><span className="h-px flex-1 bg-line" /></li>))}</ol>
      <div key={step} className="fadeup" style={{ animationDuration: '.45s' }}>
        {step === 'service' && (<><h3 className="font-display text-2xl font-bold">ماذا تريد أن نصمّم لك؟</h3><div className="mt-5 grid gap-3 sm:grid-cols-3">{enabled.map((x) => (
          <button key={x.id} aria-pressed={svcId === x.id} onClick={() => { setSvcId(x.id); setDesignId(''); setErr(''); }} className={opt(svcId === x.id)}><ServiceIcon name={x.icon} size={26} /><span className="font-semibold">{x.label}</span><span className="text-xs text-muted">{x.hint}</span></button>))}</div></>)}
        {step === 'design' && svc && (<><h3 className="font-display text-2xl font-bold">اختر تصميم {svc.label}</h3><div className="mt-5 grid gap-3 sm:grid-cols-3">{svc.designs!.map((d) => (
          <button key={d.id} aria-pressed={designId === d.id} onClick={() => { setDesignId(d.id); setErr(''); }} className={opt(designId === d.id)}><span className="font-semibold">{d.label}</span><span className="text-xs text-muted">{d.hint}</span></button>))}</div></>)}
        {step === 'size' && (<><h3 className="font-display text-2xl font-bold">ما المقاسات التقريبية؟</h3><p className="mt-1 text-sm text-muted">تقدير مبدئي، والمقاس النهائي نرفعه عندك مجاناً.</p>
          <div className={`mt-5 grid gap-4 ${per === 'm2' ? 'sm:grid-cols-2' : ''}`}>
            <label className="grid gap-1.5 text-sm">{per === 'm' ? 'الطول (بالمتر)' : 'العرض (بالمتر)'}<input className={field} inputMode="decimal" dir="ltr" placeholder="مثال: 3" value={w} onChange={(e) => setW(e.target.value)} /></label>
            {per === 'm2' && <label className="grid gap-1.5 text-sm">الارتفاع (بالمتر)<input className={field} inputMode="decimal" dir="ltr" placeholder="2.6" value={h} onChange={(e) => setH(e.target.value)} /></label>}</div></>)}
        {step === 'material' && design && (<><h3 className="font-display text-2xl font-bold">اختر الخامة</h3><div className="mt-5 grid gap-3">{pricing.materials.map((m) => (
          <button key={m.id} aria-pressed={matId === m.id} onClick={() => { setMatId(m.id); setErr(''); }} className={opt(matId === m.id)}><span className="flex w-full items-center justify-between gap-3"><span className="font-semibold">{m.label}</span><span className="shrink-0 text-xs text-gold">{m.hint}</span></span><span className="text-sm text-muted">{fmt((design.prices as Record<string, number>)[m.id])} ريال لكل {per === 'm' ? 'متر' : 'متر مربع'}</span></button>))}</div></>)}
        {step === 'result' && svc && design && mat && (<>
          <p className="text-muted">التكلفة التقديرية لمشروعك حوالي</p>
          <p className="mt-1 font-display text-5xl font-bold text-gold">{fmt(price)}</p><p className="mt-1 text-lg">{pricing.currency}</p>
          <p className="mt-2 text-sm text-muted">غير شامل القيمة المضافة. مع القيمة المضافة ({Math.round(pricing.vat * 100).toLocaleString('ar-SA')}٪) ≈ {fmt(withVat)} ريال.</p>
          <ul className="mt-5 flex flex-wrap gap-2 text-sm">{[`${svc.label} - ${design.label}`, mat.label, `${W} × ${H} م`].map((c) => <li key={c} className="rounded-full border border-line px-3 py-1">{c}</li>)}</ul>
          <ul className="mt-5 space-y-2 rounded-2xl bg-sand p-4 text-sm">{pricing.includes.map((x) => <li key={x} className="flex gap-2"><Check size={16} className="mt-1 shrink-0 text-gold" />{x}</li>)}</ul>
          <p className="mt-4 text-sm text-muted">هذا تقدير مبدئي فقط، ويُحدَّد السعر النهائي بعد رفع المقاسات واعتماد التصميم.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm">المدينة<select className={field} value={city} onChange={(e) => setCity(e.target.value)}>{cities.map((c) => <option key={c}>{c}</option>)}</select></label>
            <label className="grid gap-1.5 text-sm">رقم الجوال (اختياري)<input className={field} dir="ltr" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" /></label></div></>)}
      </div>
      {err && <p role="alert" className="mt-4 text-sm text-red-600 dark:text-red-400">{err}</p>}
      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {i > 0 ? <button onClick={() => go(-1)} className={`${nb} border border-line hover:border-gold`}><ArrowRight size={16} />السابق</button> : <span />}
        {step !== 'result' ? <button onClick={() => go(1)} className={`${nb} bg-pine text-white hover:bg-pine2 dark:bg-brass dark:text-pine`}>التالي<ArrowLeft size={16} /></button>
          : <button onClick={send} className={`${nb} bg-brass text-pine hover:bg-brass2`}>اعتماد السعر المبدئي وحجز رفع مقاسات مجاني</button>}
      </div>
    </div>
  );
}
