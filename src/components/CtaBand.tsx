import { MessageCircle } from 'lucide-react';
import { waLink } from '@/data/siteConfig';
export default function CtaBand({ text = 'عندك مشروع؟ أرسل لنا صور المكان ونرد عليك بأقرب وقت.' }: { text?: string }) {
  return (
    <section className="px-5 py-16">
      <div data-r className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 rounded-[2rem] bg-sand px-8 py-10">
        <p className="max-w-lg font-display text-2xl font-semibold sm:text-3xl">{text}</p>
        <a href={waLink('السلام عليكم، أرغب بطلب استشارة مجانية')} className="inline-flex items-center gap-2 rounded-full bg-pine px-7 py-3.5 font-medium text-white transition hover:bg-pine2 dark:bg-brass dark:text-pine"><MessageCircle size={18} />تواصل عبر واتساب</a>
      </div>
    </section>
  );
}
