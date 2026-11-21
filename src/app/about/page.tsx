import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
export const metadata: Metadata = { title: 'من نحن | بنيان للديكورات', description: 'مؤسسة بنيان للديكورات متخصصة في الدهانات والديكورات في الأحساء: تصميم وتنفيذ بإشراف معلم دهانات محترف.', alternates: { canonical: '/about/' } };
const why = ['خبرة طويلة في مجال الدهانات والديكور', 'جودة عالية في المواد المستخدمة', 'أسعار مناسبة وتنافسية', 'سرعة تنفيذ والتزام بالمواعيد', 'دقة في العمل والتشطيب النهائي'];
export default function Page() {
  return (<>
    <PageHero title="من نحن" text="مؤسسة بنيان للديكورات: رؤيتنا في عالم التصميم والتشطيب." crumbs={[{ label: 'من نحن' }]} />
    <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-14 md:grid-cols-2 md:py-20">
      <div>
        <h2 className="font-display text-3xl font-semibold">لماذا تختار بنيان للديكورات؟</h2>
        <p className="mt-5 leading-9">نحن مؤسسة متخصصة في الدهانات والديكورات في الأحساء، نقدم خدمات متكاملة تشمل التصميم والتنفيذ بأحدث الأساليب. نعمل بإشراف معلم دهانات محترف بخبرة طويلة، ونحرص على نتائج تجمع بين الجودة العالية والمظهر الأنيق لنضمن لك نتيجة تفوق توقعاتك.</p>
        <ul className="mt-7 space-y-3 border-s-2 border-gold ps-5">{why.map((w) => <li key={w}>{w}</li>)}</ul>
      </div>
      <img src="/images/work/t1pro1-after.webp" alt="مشروع منفّذ لجدار تلفزيون بإضاءة مخفية" className="aspect-[4/5] w-full object-cover" />
    </div>
    <CtaBand />
  </>);
}
