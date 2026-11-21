import Link from 'next/link';
import { Footprints } from 'lucide-react';
export default function StudioTeaser() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:py-32">
      <div data-r="mask" className="arch relative mx-auto aspect-[4/5] w-full max-w-[400px] overflow-hidden bg-sand">
        <img src="/images/gallery/portfolio4.webp" alt="غرفة معيشة بجدار تلفزيون وإضاءة مخفية" className="kb h-full w-full object-cover" loading="lazy" width={800} height={800} />
        <span className="ringp absolute bottom-6 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-brass text-brass"><Footprints className="text-pine" /></span>
      </div>
      <div data-r>
        <h2 className="font-display text-4xl font-bold sm:text-5xl">امشِ داخل تصميمك قبل التنفيذ</h2>
        <p className="mt-4 max-w-md text-muted">ادخل الاستوديو ثلاثي الأبعاد وتجوّل في الغرفة بحرية: غيّر خامة الجدار والأرضية وألوان الإضاءة المخفية، وجرّب الغرفة نهارًا وليلًا، ثم أرسل تصميمك لنا عبر واتساب.</p>
        <Link href="/studio/" className="mt-8 inline-block rounded-full bg-pine px-8 py-4 font-medium text-white transition hover:-translate-y-0.5 hover:bg-pine2 dark:bg-brass dark:text-pine">ادخل الاستوديو</Link>
      </div>
    </section>
  );
}
