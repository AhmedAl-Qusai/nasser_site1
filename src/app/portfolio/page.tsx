import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import PortfolioClient from '@/components/PortfolioClient';
import CtaBand from '@/components/CtaBand';
export const metadata: Metadata = { title: 'معرض الأعمال | بنيان للديكورات', description: 'أعمال منفّذة في الأحساء بمقارنة قبل وبعد، وأفكار تصاميم لديكورات التلفزيون والجبس بورد وبديل الرخام والخشب.', alternates: { canonical: '/portfolio/' } };
export default function Page() {
  return (<><PageHero title="معرض الأعمال" text="اسحب في صور قبل وبعد لترى الفرق الحقيقي." crumbs={[{ label: 'معرض الأعمال' }]} /><PortfolioClient /><CtaBand /></>);
}
