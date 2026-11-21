import type { Metadata } from 'next';
import { Phone, MessageCircle, Clock, MapPin } from 'lucide-react';
import PageHero from '@/components/PageHero';
import ConsultForm from '@/components/ConsultForm';
import { site, waLink } from '@/data/siteConfig';
export const metadata: Metadata = { title: 'اتصل بنا | بنيان للديكورات', description: 'تواصل مع بنيان للديكورات في الأحساء عبر الجوال أو واتساب لحجز استشارة مجانية.', alternates: { canonical: '/contact/' } };
const card = 'flex items-start gap-3 border border-line p-5';
export default function Page() {
  return (<>
    <PageHero title="اتصل بنا" text="نرد عليك عبر واتساب على مدار الساعة." crumbs={[{ label: 'اتصل بنا' }]} />
    <div className="mx-auto grid max-w-6xl gap-4 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
      <a href={`tel:${site.phone}`} className={card}><Phone className="text-gold" /><span><b>اتصال مباشر</b><br /><span dir="ltr">{site.phone}</span></span></a>
      <a href={waLink()} className={card}><MessageCircle className="text-gold" /><span><b>واتساب</b><br />ابدأ المحادثة الآن</span></a>
      <div className={card}><Clock className="text-gold" /><span><b>ساعات العمل</b>{site.hours.map((h) => <span key={h.days} className="block text-sm text-muted">{h.days}: {h.time}</span>)}</span></div>
      <div className={card}><MapPin className="text-gold" /><span><b>التغطية</b><br />جميع أحياء الأحساء</span></div>
    </div>
    <ConsultForm />
  </>);
}
