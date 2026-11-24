import Link from 'next/link';
import FinishStrip from './FinishStrip';
export default function PageHero({ title, text, crumbs }: { title: string; text?: string; crumbs: { label: string; href?: string }[] }) {
  return (
    <section className="relative overflow-hidden rounded-b-[2rem] bg-pine text-white">
      <div className="px-5 pb-12 pt-40 md:pb-16 md:pt-48">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="مسار التنقل" className="fadeup mb-4 flex flex-wrap gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            {crumbs.map((c) => (<span key={c.label} className="flex gap-2"><span aria-hidden>/</span>{c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-white">{c.label}</span>}</span>))}
          </nav>
          <h1 className="fadeup font-display text-[1.9rem] font-bold leading-snug sm:text-5xl md:text-6xl" style={{ animationDelay: '.1s' }}>{title}</h1>
          {text && <p className="fadeup mt-3 max-w-xl text-base text-white/70 sm:text-lg" style={{ animationDelay: '.25s' }}>{text}</p>}
        </div>
      </div>
      <FinishStrip className="h-1.5" />
    </section>
  );
}
