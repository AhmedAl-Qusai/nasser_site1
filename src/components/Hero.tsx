import { MessageCircle, Phone } from 'lucide-react';
import { site, waLink } from '@/data/siteConfig';
const W = ({ t, i }: { t: string; i: number }) => (<span className="inline-block overflow-hidden align-bottom pb-1"><span className="rise" style={{ animationDelay: `${250 + i * 120}ms` }}>{t}</span></span>);
export default function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-28 md:pt-32">
      <span aria-hidden className="pointer-events-none absolute -end-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-60 blur-3xl" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--gold) 35%, transparent), transparent 70%)' }} />
      <div className="relative mx-auto grid min-h-[calc(100svh-9rem)] max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <p dir="ltr" className="fadeup mb-5 text-start text-xs tracking-[0.3em] text-gold" style={{ animationDelay: '.1s' }}>BESPOKE INTERIORS · AL-AHSA</p>
          <h1 className="font-display text-[3.4rem] font-bold leading-[1.15] sm:text-7xl lg:text-[5.4rem]">
            <W t="ديكورات" i={0} /> <W t="الأحساء" i={1} />
            <span className="block text-[.5em] font-semibold text-gold"><W t="تبدأ" i={2} /> <W t="من" i={3} /> <W t="التفاصيل" i={4} /></span>
          </h1>
          <p className="fadeup mt-6 max-w-md text-lg text-muted" style={{ animationDelay: '.9s' }}>أصباغ، جبس بورد، بديل رخام وخشب، وديكورات تلفزيون بإضاءة مخفية. نصمّم وننفّذ لمنزلك في كل أحياء الأحساء.</p>
          <div className="fadeup mt-9 flex flex-wrap gap-3" style={{ animationDelay: '1.05s' }}>
            <a href="#consult" className="rounded-full bg-pine px-8 py-4 font-medium text-white transition hover:-translate-y-0.5 hover:bg-pine2 dark:bg-brass dark:text-pine">احجز استشارة مجانية</a>
            <a href={waLink('السلام عليكم، أرغب بالاستفسار')} className="inline-flex items-center gap-2 rounded-full border border-line px-8 py-4 transition hover:border-gold hover:text-gold"><MessageCircle size={18} />واتساب</a>
          </div>
          <a href={`tel:${site.phone}`} dir="ltr" className="fadeup mt-6 inline-flex w-fit items-center gap-2 text-sm text-muted hover:text-gold" style={{ animationDelay: '1.2s' }}><Phone size={14} />{site.phone}</a>
        </div>
        <div className="relative mx-auto w-full max-w-[420px]">
          <span aria-hidden className="absolute -inset-3 arch border border-gold/50" style={{ animation: 'float 8s ease-in-out infinite' }} />
          <div className="arch relative aspect-[3/4] overflow-hidden bg-sand" data-r="mask">
            <img src="/images/work/t3pro2-after.webp" alt="صالة منفّذة بجدار مشقّق ومرآة دائرية مضيئة" width={900} height={1604} fetchPriority="high" className="kb h-full w-full object-cover" />
          </div>
          <span className="float absolute -start-2 top-1/4 sm:-start-6 rounded-full bg-pine px-4 py-2 text-sm text-white shadow-xl dark:bg-brass dark:text-pine">إضاءة مخفية</span>
          <span className="float absolute -end-1 bottom-16 sm:-end-4 rounded-full bg-surface px-4 py-2 text-sm shadow-xl" style={{ animationDelay: '-3s' }}>تنفيذ في الأحساء</span>
        </div>
      </div>
    </section>
  );
}
