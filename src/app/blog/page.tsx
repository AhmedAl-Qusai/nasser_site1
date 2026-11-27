import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import BlogClient from '@/components/BlogClient';
import CtaBand from '@/components/CtaBand';
import { articles } from '@/data/articles';
import { siteUrl } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'المدونة والأدلة الشاملة: خزائن، غرف نوم، مطابخ، أبواب WPC وأثاث | بنيان BONYAN',
  description: 'أدلة تفصيلية تغطي جميع الأقسام الـ17 في الدمام والخبر والجبيل والأحساء: مقاسات الخزائن وغرف النوم، أبواب WPC والسحب المخفي، المطابخ، المغاسل، والتكسيات الخشبية.',
  alternates: { canonical: '/blog/' },
  openGraph: {
    title: 'المدونة والأدلة الهندسية | بنيان للديكورات BONYAN',
    description: 'دليل شامل لتفصيل الخزائن وغرف النوم والمطابخ والأبواب في المنطقة الشرقية.',
    url: `${siteUrl}/blog/`,
    type: 'website',
    locale: 'ar_SA',
  },
};

export default function Page() {
  return (
    <>
      <PageHero title="المدونة والأدلة الهندسية" text="أدلة متخصصة لكل قسم من أقسام بنيان الـ17: المقاسات، الخامات، الأسعار، ونصائح الاختيار في المنطقة الشرقية." crumbs={[{ label: 'المدونة' }]} />
      <BlogClient articles={articles} />
      <CtaBand />
    </>
  );
}
