import Link from 'next/link';
export default function StudioTeaser() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
      <div className="relative aspect-[16/10] overflow-hidden bg-sand"><img src="/images/gallery/portfolio4.webp" alt="غرفة معيشة بجدار تلفزيون وإضاءة مخفية" className="h-full w-full object-cover" loading="lazy" /></div>
      <div>
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">جرّب الخامات والإضاءة قبل التنفيذ</h2>
        <p className="mt-3 max-w-md text-muted">في استوديو الـ 3D غيّر خامة جدار التلفزيون بين رخام وخشب ودهان، وشغّل الإضاءة المخفية بالألوان التي تعجبك، ثم أرسل تصميمك لنا عبر واتساب.</p>
        <Link href="/studio/" className="mt-7 inline-block rounded-sm bg-navy px-7 py-3.5 font-medium text-white transition-colors hover:bg-[#16396a]">افتح الاستوديو</Link>
      </div>
    </section>
  );
}
