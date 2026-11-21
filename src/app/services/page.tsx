import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import ServiceIcon from '@/components/ServiceIcon';
import CtaBand from '@/components/CtaBand';
import { services } from '@/data/services';
import { waLink } from '@/data/siteConfig';
export const metadata: Metadata = { title: 'خدماتنا | بنيان للديكورات', description: 'دهانات، جبس بورد، بديل رخام وخشب، شيبورد، ديكورات تلفزيون، ورق جدران، ترميم وتشطيب فلل وشقق في الأحساء.', alternates: { canonical: '/services/' } };
export default function Page() {
  return (<>
    <PageHero title="خدماتنا" text="من الدهان البسيط حتى تشطيب الفيلا كاملة، كل عمل يُنفَّذ حسب الطلب." crumbs={[{ label: 'خدماتنا' }]} />
    <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <ul className="divide-y divide-line border-y border-line">
        {services.map((s) => (
          <li key={s.id} className="grid items-center gap-4 py-7 md:grid-cols-[48px_1fr_auto]">
            <ServiceIcon name={s.icon} size={32} />
            <div><h2 className="text-xl font-bold">{s.title}</h2><p className="mt-1 text-muted">{s.desc}</p>
              {'article' in s && <Link href={`/blog/${s.article}/`} className="mt-2 inline-block text-sm text-gold hover:underline">اقرأ التفاصيل</Link>}</div>
            <a href={waLink(`السلام عليكم، أرغب بالاستفسار عن خدمة: ${s.title}`)} className="w-fit rounded-sm border border-line px-5 py-2.5 text-sm transition-colors hover:border-gold">اطلب هذه الخدمة</a>
          </li>
        ))}
      </ul>
    </div>
    <CtaBand />
  </>);
}
