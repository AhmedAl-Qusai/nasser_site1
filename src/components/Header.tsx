'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { nav, waLink } from '@/data/siteConfig';
export default function Header() {
  const [open, setOpen] = useState(false); const path = usePathname();
  const cur = (h: string) => (path.startsWith(h) ? 'page' : undefined);
  return (
    <header className="glass sticky top-0 z-40 border-b border-line">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" aria-label="بنيان للديكورات - الرئيسية" className="flex items-center">
          <img src="/images/logo.png" alt="شعار بنيان" width={56} height={56} className="h-14 w-14 object-contain dark:hidden" />
          <img src="/images/logo2.png" alt="شعار بنيان" width={56} height={56} className="hidden h-14 w-14 object-contain dark:block" />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="التنقل الرئيسي">
          {nav.map((n) => (<Link key={n.href} href={n.href} aria-current={cur(n.href)} className="text-[15px] font-medium text-ink/80 transition-colors hover:text-gold aria-[current=page]:text-gold">{n.label}</Link>))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href={waLink('السلام عليكم، أرغب بالاستفسار')} className="hidden rounded-sm bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#16396a] sm:inline-block">واتساب</a>
          <button className="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}>{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </div>
      {open && (<nav className="border-t border-line bg-bg px-5 py-3 lg:hidden" aria-label="القائمة">
        {nav.map((n) => (<Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-line py-3 last:border-0">{n.label}</Link>))}
      </nav>)}
    </header>
  );
}
