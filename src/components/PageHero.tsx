import Link from 'next/link';
export default function PageHero({ title, text, crumbs }: { title: string; text?: string; crumbs: { label: string; href?: string }[] }) {
  return (
    <section className="relative overflow-hidden rounded-b-[3rem] bg-pine px-5 pb-14 pt-32 text-white md:pb-20 md:pt-40">
      <span aria-hidden className="pointer-events-none absolute -start-24 top-10 h-96 w-96 rounded-full border border-brass/25" />
      <span aria-hidden className="pointer-events-none absolute -start-10 top-24 h-72 w-72 rounded-full border border-brass/15" />
      <div className="relative mx-auto max-w-6xl">
        <nav aria-label="مسار التنقل" className="fadeup mb-5 flex flex-wrap gap-2 text-sm text-white/60">
          <Link href="/" className="hover:text-white">الرئيسية</Link>
          {crumbs.map((c) => (<span key={c.label} className="flex gap-2"><span aria-hidden>/</span>{c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-white">{c.label}</span>}</span>))}
        </nav>
        <h1 className="fadeup font-display text-4xl font-bold leading-tight sm:text-6xl" style={{ animationDelay: '.1s' }}>{title}</h1>
        {text && <p className="fadeup mt-4 max-w-xl text-lg text-white/70" style={{ animationDelay: '.25s' }}>{text}</p>}
      </div>
    </section>
  );
}
