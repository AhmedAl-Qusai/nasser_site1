import type { Metadata } from 'next';
import StudioClient from '@/components/studio/StudioClient';
export const metadata: Metadata = { title: 'استوديو التصميم ثلاثي الأبعاد | بنيان للديكورات', description: 'تجوّل داخل غرفة ثلاثية الأبعاد وجرّب خامات بديل الرخام والخشب والأرضيات وإضاءة LED المخفية نهارًا وليلًا قبل التنفيذ.', alternates: { canonical: '/studio/' } };
export default function Page() { return <StudioClient />; }
