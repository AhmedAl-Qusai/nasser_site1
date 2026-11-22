import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import PortfolioClient from '@/components/PortfolioClient';
import CtaBand from '@/components/CtaBand';
import { getWorks } from '@/lib/works';
export const metadata: Metadata = { title: 'معرض الأعمال: خزائن وغرف ملابس وأثاث | بنيان للديكورات', description: 'أعمال منفّذة في الأحساء: خزائن بأبواب زجاجية ومنزلقة، غرف ملابس، وحدات تلفزيون وكونسول مدخل، مع مقارنة قبل وبعد.', alternates: { canonical: '/portfolio/' } };
export default function Page() { return (<><PageHero title="معرض الأعمال" text="اسحب في صور قبل وبعد لترى الفرق الحقيقي." crumbs={[{ label: 'معرض الأعمال' }]} /><PortfolioClient works={getWorks()} /><CtaBand /></>); }
