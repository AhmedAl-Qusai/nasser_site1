import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import { steps } from '@/data/siteConfig';
import { faqs } from '@/data/faqs';
export const metadata: Metadata = { title: 'آلية العمل: من الاستشارة إلى التركيب | بنيان للديكورات', description: 'خطوات تفصيل الخزائن وغرف النوم والأثاث في الأحساء: استشارة، رفع مقاسات، تصميم، عرض سعر، تصنيع وتركيب.', alternates: { canonical: '/process/' } };
export default function Page() {
  return (<><PageHero title="آلية العمل" text="ست خطوات واضحة من أول فكرة إلى آخر تركيب." crumbs={[{ label: 'آلية العمل' }]} />
    <ol className="mx-auto max-w-3xl divide-y divide-line px-5 py-16 md:py-24">{steps.map((s, i) => (
      <li key={s.title} data-r className="grid grid-cols-[4rem_1fr] gap-4 py-8">
        <span className="font-display text-5xl font-bold num">{(i + 1).toLocaleString('ar-SA')}</span>
        <div><h2 className="text-xl font-semibold">{s.title}<span dir="ltr" className="ms-2 text-xs font-normal tracking-widest text-gold">{s.en.toUpperCase()}</span></h2><p className="mt-1 text-muted">{s.text}</p></div></li>))}</ol>
    <section className="mx-auto max-w-3xl px-5 pb-16"><h2 className="mb-6 font-display text-3xl font-bold">أسئلة شائعة</h2><Faq items={faqs} /></section>
    <CtaBand /></>);
}
