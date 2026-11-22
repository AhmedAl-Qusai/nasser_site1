'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { nav, navAll, waLink, announcement } from '@/data/siteConfig';
export default function Header() {
  const [open, setOpen] = useState(false); const [hide, setHide] = useState(false); const path = usePathname();
  useEffect(() => {
    let last = 0, tick = false;
    const f = () => { if (tick) return; tick = true; requestAnimationFrame(() => { const y = scrollY; setHide(y > last && y > 160); last = y; tick = false; }); };
    addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f);
  }, []);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);
  const cur = (h: string) => (path.startsWith(h) ? 'page' : undefined);
  return (<>
    <div className={`fixed inset-x-0 top-0 z-40 transition-transform duration-500 ${hide && !open ? '-translate-y-[160%]' : ''}`}>
      <div className="overflow-hidden bg-pine py-1.5 text-[12px] text-brass sm:text-[13px]">
        <p className="mx-auto hidden max-w-6xl px-4 text-center md:block">{announcement}</p>
        <div dir="ltr" className="md:hidden"><div className="marq flex w-max gap-16 whitespace-nowrap">{[0, 1].map((i) => <span key={i} dir="rtl">{announcement}</span>)}</div></div>
      </div>
      <header className="px-3 pt-2.5">
        <div className="glass mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border border-line ps-5 pe-2.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,.25)]">
          <Link href="/" aria-label="بنيان BONYAN - الرئيسية" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="شعار بنيان" width={56} height={56} className="h-14 w-14 object-contain dark:hidden" />
            <img src="/images/logo2.png" alt="شعار بنيان" width={56} height={56} className="hidden h-14 w-14 object-contain dark:block" />
          </Link>
          <nav className="hidden items-center gap-5 xl:flex" aria-label="التنقل الرئيسي">
            {nav.map((n) => (<Link key={n.href} href={n.href} aria-current={cur(n.href)} className="text-sm font-medium opacity-80 transition hover:text-gold hover:opacity-100 aria-[current=page]:text-gold aria-[current=page]:opacity-100">{n.label}</Link>))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href={waLink('السلام عليكم، أرغب بالاستفسار')} className="hidden rounded-full bg-pine px-5 py-2.5 text-sm font-medium text-white transition hover:bg-pine2 sm:inline-block dark:bg-brass dark:text-pine dark:hover:bg-brass2">واتساب</a>
            <button className="grid h-10 w-10 place-items-center rounded-full border border-line xl:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}>{open ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
      </header>
    </div>
    <nav aria-label="القائمة" aria-hidden={!open} className={`fixed inset-0 z-30 grid content-center gap-0.5 overflow-y-auto bg-pine px-8 py-24 text-white transition-all duration-500 xl:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`} style={{ clipPath: open ? 'circle(150% at 90% 5%)' : 'circle(0% at 90% 5%)', transitionProperty: 'clip-path, opacity, visibility' }}>
      {navAll.map((n, i) => (<Link key={n.href} href={n.href} className="font-display text-3xl transition-all duration-500" style={{ transitionDelay: open ? `${160 + i * 55}ms` : '0ms', opacity: open ? 1 : 0, transform: open ? 'none' : 'translateY(20px)' }}>{n.label}</Link>))}
    </nav>
  </>);
}
