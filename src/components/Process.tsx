import { steps } from '@/data/siteConfig';
export default function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-5 pb-24 md:pb-32">
      <div data-r><h2 className="font-display text-4xl font-bold sm:text-5xl">كيف نعمل معك، خطوة بخطوة</h2>
        <p className="mt-3 max-w-md text-muted">رحلة واضحة من أول رسالة حتى تسليم المفتاح.</p></div>
      <ol className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} data-r style={{ '--d': `${(i % 3) * 100}ms` } as React.CSSProperties}>
            <div data-r="line" className="h-px w-full bg-gold" style={{ '--d': `${200 + (i % 3) * 100}ms` } as React.CSSProperties} />
            <span className="mt-4 block font-display text-6xl font-bold text-transparent [-webkit-text-stroke:1.2px_var(--gold)]">{(i + 1).toLocaleString('ar-SA')}</span>
            <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
            <p className="mt-1.5 text-[15px] text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
