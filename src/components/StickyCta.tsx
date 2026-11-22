'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarCheck, MessageCircle } from 'lucide-react';
import { waLink } from '@/data/siteConfig';
// جوال: شريط سفلي ثابت (احجز + واتساب). الكمبيوتر: زر عائم.
export default function StickyCta() {
  const path = usePathname();
  if (path.startsWith('/studio')) return null;
  const href = path === '/' || path.startsWith('/contact') ? '#consult' : '/contact/#consult';
  return (<>
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2.5 border-t border-line bg-bg/92 px-3 pt-2.5 backdrop-blur-md md:hidden" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
      <Link href={href} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-pine font-medium text-white active:scale-[.98] dark:bg-brass dark:text-pine"><CalendarCheck size={18} />احجز استشارة مجانية</Link>
      <a href={waLink('السلام عليكم، أرغب بالاستفسار')} aria-label="واتساب" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#25D366] text-white active:scale-95"><MessageCircle size={24} /></a>
    </div>
    <Link href={href} className="fixed bottom-5 end-5 z-30 hidden items-center gap-2 rounded-full bg-pine px-5 py-3.5 text-sm font-medium text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-pine2 md:inline-flex dark:bg-brass dark:text-pine"><CalendarCheck size={18} />احجز استشارة مجانية</Link>
  </>);
}
