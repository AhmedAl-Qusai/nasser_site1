import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import ServicesGrid from '@/components/ServicesGrid';
import CtaBand from '@/components/CtaBand';
import { categories } from '@/data/categories';
export const metadata: Metadata = { title: 'خدماتنا: 16 تخصصاً تحت سقف واحد | بنيان BONYAN', description: 'خزائن، غرف نوم، غرف ملابس، وحدات تلفزيون، ركن قهوة، مطابخ، أبواب WPC، ترميم وأثاث مخصص في الدمام والخبر والجبيل والأحساء.', alternates: { canonical: '/services/' } };
export default function Page() {
  return (<><PageHero title="خدماتنا" text="ستة عشر تخصصاً تجمعها بنيان تحت سقف واحد بهوية متناغمة وعقد واحد." crumbs={[{ label: 'خدماتنا' }]} /><ServicesGrid page />
    <section className="mx-auto max-w-6xl px-5 pb-16"><h2 className="font-display text-2xl font-bold">تعرّف على أقسامنا الرئيسية</h2>
      <ul className="mt-4 flex flex-wrap gap-3">{categories.map((c) => <li key={c.slug}><Link href={`/products/${c.slug}/`} className="inline-block rounded-full border border-line px-5 py-2.5 transition hover:border-gold hover:text-gold">{c.title}</Link></li>)}</ul></section><CtaBand /></>);
}
