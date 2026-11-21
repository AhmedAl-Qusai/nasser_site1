import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import StudioClient from '@/components/studio/StudioClient';
export const metadata: Metadata = { title: 'استوديو التصميم ثلاثي الأبعاد | بنيان للديكورات', description: 'جرّب خامات بديل الرخام والخشب والدهان وإضاءة LED المخفية على جدار التلفزيون بشكل ثلاثي الأبعاد قبل التنفيذ.', alternates: { canonical: '/studio/' } };
export default function Page() {
  return (<><PageHero title="استوديو التصميم" text="غيّر الخامة واللون والإضاءة، ثم أرسل تصميمك عبر واتساب." crumbs={[{ label: 'استوديو 3D' }]} /><StudioClient /></>);
}
