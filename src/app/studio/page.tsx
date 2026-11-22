import type { Metadata } from 'next';
import StudioClient from '@/components/studio/StudioClient';
export const metadata: Metadata = { title: 'استوديو التصميم ثلاثي الأبعاد | بنيان للديكورات', description: 'تجوّل داخل غرفة ملابس أو غرفة نوم ثلاثية الأبعاد، افتح الأبواب وجرّب ألوان الخشب والمقابض والإضاءة المخفية قبل التصنيع.', alternates: { canonical: '/studio/' } };
export default function Page() { return <StudioClient />; }
