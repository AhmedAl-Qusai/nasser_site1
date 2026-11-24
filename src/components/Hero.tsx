import Link from 'next/link';
import { Phone } from 'lucide-react';
import { site, trust } from '@/data/siteConfig';
import FinishStrip from './FinishStrip';
const W = ({ t, i }: { t: string; i: number }) => (<span className="inline-block overflow-hidden align-bottom pb-1"><span className="rise" style={{ animationDelay: `${200 + i * 100}ms` }}>{t}</span></span>);
export default function Hero() {
  return (
    <section className="relative px-5 pb-12 pt-32 sm:pt-40 md:pb-20 md:pt-44">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <div>
          <p dir="ltr" className="fadeup text-start text-[11px] tracking-[0.28em] text-gold sm:text-xs" style={{ animationDelay: '.1s' }}>BESPOKE CLOSETS &amp; BEDROOMS · EASTERN PROVINCE</p>
          <h1 className="mt-3 font-display text-[2.35rem] font-bold leading-[1.3] sm:text-6xl lg:text-[4rem]">
            <W t="شكّل" i={0} /> <W t="عالمك" i={1} /><br /><W t="بدقة" i={2} /> <W t="المليمتر" i={3} />
            <span className="mt-2 block text-[.42em] font-medium leading-snug text-muted"><W t="مساحات" i={4} /> <W t="مصمّمة" i={5} /> <W t="لتناسب" i={6} /> <W t="أسلوب" i={7} /> <W t="حياتك" i={8} /></span>
          </h1>
          <p className="fadeup mt-5 max-w-lg text-[16.5px] leading-8 text-muted sm:text-lg" style={{ animationDelay: '1.1s' }}>في <b className="text-ink">بنيان</b>، نحوّل زوايا منزلك إلى تحف عملية تدوم لسنوات. نصمّم وننفّذ الخزائن، غرف النوم، والأثاث المخصص بالكامل في ورشنا الخاصة، لنمنحك تناغماً يجمع بين فخامة التصميم واستثمار كل سنتيمتر بذكاء.</p>
          <div className="fadeup mt-7 grid gap-3 sm:flex sm:flex-wrap" style={{ animationDelay: '1.25s' }}>
            <a href="#consult" className="flex h-[52px] items-center justify-center rounded-full bg-copper px-8 font-medium text-white transition hover:bg-copper2 active:scale-[.98] dark:bg-brass dark:text-pine dark:hover:bg-brass2">احجز استشارتك المجانية الآن</a>
            <Link href="/calculator/" className="flex h-[52px] items-center justify-center rounded-full border border-ink/30 px-8 transition hover:border-ink active:scale-[.98]">احسب تكلفة مشروعك في 30 ثانية</Link>
          </div>
          <Link href="/studio/" className="fadeup mt-6 inline-flex items-center gap-3 text-sm text-muted hover:text-ink" style={{ animationDelay: '1.4s' }}>
            <span className="flex -space-x-1.5 space-x-reverse">{['#C9A77A', '#5A3B26', '#F1EEE8', '#B9B1A4', '#667A63', '#383C3F'].map((c) => <i key={c} className="h-6 w-6 rounded-full border-2 border-bg" style={{ background: c }} />)}</span>جرّب الخامات والألوان في استوديو 3D
          </Link>
          <ul className="fadeup mt-6 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-muted" style={{ animationDelay: '1.5s' }}>{trust.map((t) => <li key={t} className="flex items-center gap-1.5"><span aria-hidden className="h-1 w-1 rounded-full bg-ink/50" />{t}</li>)}</ul>
          <a href={`tel:${site.phone}`} dir="ltr" className="fadeup mt-4 inline-flex w-fit items-center gap-2 text-sm text-muted hover:text-ink" style={{ animationDelay: '1.6s' }}><Phone size={14} />{site.phone}</a>
        </div>
        <div className="relative mx-auto w-full max-w-[460px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-sand" data-r="mask">
            <img src="/images/work/t2pro1-after.webp" alt="خزانة بأبواب زجاجية منزلقة وإضاءة داخلية في ممر - من أعمالنا" width={900} height={1604} fetchPriority="high" className="kb h-full w-full object-cover" />
          </div>
          <span className="absolute end-3 top-3 rounded-full bg-pine px-4 py-2 text-[13px] text-white shadow-lg dark:bg-brass dark:text-pine">تصميم 3D مجاناً</span>
          <span className="absolute bottom-3 start-3 rounded-full bg-surface/95 px-4 py-2 text-[13px] shadow-lg backdrop-blur">من أعمالنا المنفّذة</span>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-full md:mt-16"><FinishStrip className="h-1.5" /></div>
    </section>
  );
}
