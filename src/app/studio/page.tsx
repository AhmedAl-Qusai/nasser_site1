import type { Metadata } from 'next';
import StudioClient from '@/components/studio/StudioClient';
export const metadata: Metadata = { title: 'استوديو التصميم ثلاثي الأبعاد (17 قسماً تفاعلياً) | بنيان BONYAN', description: 'تجوّل داخل 17 تصميماً ثلاثي الأبعاد للخزائن وغرف النوم وغرف الملابس والمطابخ وأبواب WPC والسحب المخفي والتكسيات وبدّل الخامات والألوان والإضاءة قبل التصنيع.', alternates: { canonical: '/studio/' } };
export default function Page() { return <StudioClient />; }
