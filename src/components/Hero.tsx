'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { site, waLink } from '@/data/siteConfig';
export default function Hero() {
  const ref = useRef<HTMLElement>(null); const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '12%']);
  return (
    <section id="top" ref={ref} className="grid min-h-[calc(100svh-72px)] lg:grid-cols-2">
      <div className="flex flex-col justify-center bg-navy px-6 py-16 text-white sm:px-12 lg:px-16">
        <p dir="ltr" className="mb-6 text-start text-xs tracking-[0.3em] text-[#D2AE68]">BESPOKE INTERIORS · AL-AHSA</p>
        <h1 className="font-display text-5xl font-semibold leading-[1.25] sm:text-6xl">ديكورات الأحساء<span className="block text-[0.62em] font-medium text-white/75">تبدأ من التفاصيل</span></h1>
        <p className="mt-6 max-w-md text-lg text-white/80">أصباغ، جبس بورد، بديل رخام وخشب، وديكورات تلفزيون بإضاءة مخفية. نصمّم وننفّذ لمنزلك أو مشروعك في كل أحياء الأحساء.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#consult" className="rounded-sm bg-[#D2AE68] px-7 py-3.5 font-medium text-navy transition-colors hover:bg-[#e0bf7e]">احجز استشارة مجانية</a>
          <a href={waLink('السلام عليكم، أرغب بالاستفسار')} className="inline-flex items-center gap-2 rounded-sm border border-white/40 px-7 py-3.5 transition-colors hover:border-white"><MessageCircle size={18} />واتساب</a>
        </div>
        <a href={`tel:${site.phone}`} dir="ltr" className="mt-6 inline-flex w-fit items-center gap-2 text-sm text-white/70 hover:text-white"><Phone size={14} />{site.phone}</a>
      </div>
      <div className="relative min-h-[420px] overflow-hidden bg-sand">
        <motion.div className="absolute inset-0" initial={reduce ? false : { clipPath: 'inset(0 0 0 100%)' }} animate={{ clipPath: 'inset(0 0 0 0%)' }} transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}>
          <motion.img src="/images/work/t3pro2-after.webp" alt="صالة منفّذة بجدار مشقّق ومرآة دائرية مضيئة" style={{ y }} className="absolute inset-0 h-[112%] w-full object-cover" fetchPriority="high" />
        </motion.div>
      </div>
    </section>
  );
}
