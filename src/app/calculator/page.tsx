import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import CostCalculator from '@/components/CostCalculator';
import FaqSection from '@/components/FaqSection';
export const metadata: Metadata = { title: 'حاسبة التكلفة التقديرية للخزائن وغرف النوم | بنيان BONYAN', description: 'احسب تكلفة خزانتك أو غرفة ملابسك أو غرفة نومك أو وحدة التلفزيون تقريبياً في 30 ثانية، ثم احجز رفع مقاسات مجاني.', alternates: { canonical: '/calculator/' } };
export default function Page() {
  return (<><PageHero title="حاسبة التكلفة" text="اختر الخدمة وأدخل المقاسات، واحصل على تقدير فوري لتكلفة مشروعك." crumbs={[{ label: 'حاسبة التكلفة' }]} />
    <div className="px-5 py-16 md:py-24"><CostCalculator sticky /></div><FaqSection /></>);
}
