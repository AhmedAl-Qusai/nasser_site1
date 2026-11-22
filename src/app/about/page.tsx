import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import { why } from '@/data/siteConfig';
export const metadata: Metadata = { title: 'من نحن | بنيان للديكورات', description: 'بنيان للديكورات في الأحساء: تصميم وتفصيل وتركيب الخزائن وغرف الملابس وغرف النوم والأثاث بخشب MDF على مقاس مساحتك.', alternates: { canonical: '/about/' } };
export default function Page() {
  return (<><PageHero title="من نحن" text="نصمّم لأسلوب حياتك، لا لمقاسٍ جاهز." crumbs={[{ label: 'من نحن' }]} />
    <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-14 md:grid-cols-2 md:py-20">
      <div><h2 className="font-display text-3xl font-bold">بنيان للديكورات</h2>
        <p className="mt-5 leading-9">نتخصص في تصميم وتفصيل الخزائن وغرف الملابس وغرف النوم والأثاث من خشب MDF في الأحساء. نبدأ معك من الفكرة والمقاسات، ونرسم لك التصميم ونعرض الخامات والألوان، ثم نصنّع ونركّب بدقة ونظافة.</p>
        <div className="mt-8 space-y-5">{why.map((w) => <div key={w.title}><h3 className="font-semibold text-gold">{w.title}</h3><p className="text-muted">{w.text}</p></div>)}</div></div>
      <div className="arch aspect-[4/5] w-full max-w-[420px] justify-self-center overflow-hidden bg-sand"><img src="/images/work/t2pro2-after.webp" alt="خزانة منزلقة بإضاءة داخلية منفّذة" className="h-full w-full object-cover" /></div>
    </div><CtaBand /></>);
}
