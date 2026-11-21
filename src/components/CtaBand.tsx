import { MessageCircle } from 'lucide-react';
import { waLink } from '@/data/siteConfig';
export default function CtaBand({ text = 'عندك مشروع؟ أرسل لنا صور المكان ونرد عليك بأقرب وقت.' }: { text?: string }) {
  return (
    <section className="bg-sand px-5 py-14">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5">
        <p className="max-w-lg font-display text-2xl">{text}</p>
        <a href={waLink('السلام عليكم، أرغب بطلب استشارة مجانية')} className="inline-flex items-center gap-2 rounded-sm bg-navy px-7 py-3.5 font-medium text-white transition-colors hover:bg-[#16396a]"><MessageCircle size={18} />تواصل عبر واتساب</a>
      </div>
    </section>
  );
}
