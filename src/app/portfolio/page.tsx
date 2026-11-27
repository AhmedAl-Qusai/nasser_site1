import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import PortfolioClient from '@/components/PortfolioClient';
import CtaBand from '@/components/CtaBand';
import { getWorks } from '@/lib/works';
export const metadata: Metadata = { title: 'معرض الأعمال: حلول الخزائن وغرف النوم والملابس ووحدات التلفزيون | بنيان BONYAN', description: 'تصفح أكثر من 126 تصميمًا ومخطط مقاسات في الدمام والخبر والجبيل والأحساء: حلول الخزائن، غرف النوم وتصاميمها ومقاساتها، غرف الملابس، وحدات التلفزيون، ووحدات العرض والمكتبات.', alternates: { canonical: '/portfolio/' } };
export default function Page() { return (<><PageHero title="معرض الأعمال" text="اسحب في صور قبل وبعد لترى الفرق الحقيقي." crumbs={[{ label: 'معرض الأعمال' }]} /><PortfolioClient works={getWorks()} /><CtaBand /></>); }
