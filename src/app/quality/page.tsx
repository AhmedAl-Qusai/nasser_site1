import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import QualityPassport from '@/components/QualityPassport';
import CtaBand from '@/components/CtaBand';
export const metadata: Metadata = { title: 'جواز جودة بنيان: مواصفات الخامات والضمان | BONYAN', description: 'ألواح بسماكة 18 ملم معالجة ضد الرطوبة والحرارة، مفصلات أوروبية بإغلاق ناعم، تصنيع دقيق وضمان مكتوب مع زيارة صيانة مجانية.', alternates: { canonical: '/quality/' } };
export default function Page() { return (<><PageHero title="جواز جودة بنيان" text="شفافية كاملة في المواصفات لبناء الثقة." crumbs={[{ label: 'جواز الجودة' }]} /><QualityPassport page /><CtaBand /></>); }
