import { steps } from '@/data/siteConfig';
export default function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <h2 className="font-display text-3xl font-semibold sm:text-4xl">كيف نعمل معك، خطوة بخطوة</h2>
      <p className="mt-3 max-w-md text-muted">رحلة واضحة من أول رسالة حتى تسليم المفتاح.</p>
      <ol className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="relative border-t border-line pt-5">
            <span className="font-display text-4xl text-gold">{(i + 1).toLocaleString('ar-SA')}</span>
            <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
            <p className="mt-1.5 text-[15px] text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
