import { Phone } from 'lucide-react';
import Link from 'next/link';
import { site, trust } from '@/data/siteConfig';
const W = ({ t, i }: { t: string; i: number }) => (<span className="inline-block overflow-hidden align-bottom pb-1"><span className="rise" style={{ animationDelay: `${250 + i * 110}ms` }}>{t}</span></span>);
export default function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-40 md:pt-44">
      <span aria-hidden className="pointer-events-none absolute -end-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-60 blur-3xl" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--gold) 35%, transparent), transparent 70%)' }} />
      <div className="relative mx-auto grid min-h-[calc(100svh-11rem)] max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <p dir="ltr" className="fadeup mb-5 text-start text-xs tracking-[0.3em] text-gold" style={{ animationDelay: '.1s' }}>BESPOKE CLOSETS &amp; BEDROOMS · EASTERN PROVINCE</p>
          <h1 className="font-display text-[3rem] font-bold leading-[1.15] sm:text-6xl lg:text-[4.4rem]">
            <W t="شكّل" i={0} /> <W t="عالمك" i={1} /> <W t="بدقة" i={2} /> <W t="المليمتر" i={3} />
            <span className="block text-[.5em] font-semibold text-gold"><W t="مساحات" i={4} /> <W t="مصمّمة" i={5} /> <W t="لتناسب" i={6} /> <W t="أسلوب" i={7} /> <W t="حياتك" i={8} /></span>
          </h1>
          <p className="fadeup mt-6 max-w-lg text-lg text-muted" style={{ animationDelay: '1.2s' }}>في <b className="text-ink">بنيان</b>، نحوّل زوايا منزلك إلى تحف عملية تدوم لسنوات. نصمّم وننفّذ الخزائن، غرف النوم، والأثاث المخصص بالكامل في ورشنا الخاصة، لنمنحك تناغماً يجمع بين فخامة التصميم واستثمار كل سنتيمتر بذكاء.</p>
          <div className="fadeup mt-9 flex flex-wrap gap-3" style={{ animationDelay: '1.35s' }}>
            <a href="#consult" className="rounded-full bg-pine px-7 py-4 font-medium text-white transition hover:-translate-y-0.5 hover:bg-pine2 dark:bg-brass dark:text-pine">احجز استشارتك المجانية الآن</a>
            <Link href="/calculator/" className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 transition hover:border-gold hover:text-gold">احسب تكلفة مشروعك في 30 ثانية</Link>
          </div>
          <ul className="fadeup mt-8 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted" style={{ animationDelay: '1.5s' }}>{trust.map((t) => <li key={t} className="flex items-center gap-1.5"><span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />{t}</li>)}</ul>
          <a href={`tel:${site.phone}`} dir="ltr" className="fadeup mt-5 inline-flex w-fit items-center gap-2 text-sm text-muted hover:text-gold" style={{ animationDelay: '1.6s' }}><Phone size={14} />{site.phone}</a>
        </div>
        <div className="relative mx-auto w-full max-w-[420px]">
          <span aria-hidden className="absolute -inset-3 arch border border-gold/50" style={{ animation: 'float 8s ease-in-out infinite' }} />
          <div className="arch relative aspect-[3/4] overflow-hidden bg-sand" data-r="mask">
            <img src="/images/work/t2pro1-after.webp" alt="خزانة بأبواب زجاجية منزلقة وإضاءة داخلية في ممر" width={900} height={1604} fetchPriority="high" className="kb h-full w-full object-cover" />
          </div>
          <span className="float absolute -start-2 top-1/4 rounded-full bg-pine px-4 py-2 text-sm text-white shadow-xl sm:-start-6 dark:bg-brass dark:text-pine">تصميم 3D مجاناً</span>
          <span className="float absolute -end-1 bottom-16 rounded-full bg-surface px-4 py-2 text-sm shadow-xl sm:-end-4" style={{ animationDelay: '-3s' }}>ورش خاصة</span>
        </div>
      </div>
    </section>
  );
}
