import { testimonials } from '@/data/testimonials';
export default function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:py-28">
      <h2 data-r className="font-display text-4xl font-bold sm:text-5xl">ثقة عملائنا هي سر نجاحنا</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">{testimonials.map((t) => (
        <figure key={t.name + t.text} data-r className="rounded-[1.75rem] border border-line bg-surface p-7"><blockquote className="leading-8">«{t.text}»</blockquote><figcaption className="mt-4 text-sm text-muted">{t.name} · {t.city}</figcaption></figure>))}</div>
    </section>
  );
}
