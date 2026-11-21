import Link from 'next/link';
export default function PageHero({ title, text, crumbs }: { title: string; text?: string; crumbs: { label: string; href?: string }[] }) {
  return (
    <section className="bg-navy px-5 py-14 text-white md:py-20">
      <div className="mx-auto max-w-6xl">
        <nav aria-label="مسار التنقل" className="mb-5 flex flex-wrap gap-2 text-sm text-white/65">
          <Link href="/" className="hover:text-white">الرئيسية</Link>
          {crumbs.map((c) => (<span key={c.label} className="flex gap-2"><span aria-hidden>/</span>{c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-white">{c.label}</span>}</span>))}
        </nav>
        <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
        {text && <p className="mt-4 max-w-xl text-lg text-white/75">{text}</p>}
      </div>
    </section>
  );
}
