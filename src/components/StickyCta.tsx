'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarCheck } from 'lucide-react';
// زر "احجز استشارة مجانية" ثابت أسفل الشاشة (بجانب أيقونة واتساب العائمة)
export default function StickyCta() {
  const path = usePathname();
  if (path.startsWith('/studio')) return null;
  const href = path === '/' || path.startsWith('/contact') ? '#consult' : '/contact/#consult';
  return (<Link href={href} className="fixed bottom-5 end-5 z-30 inline-flex items-center gap-2 rounded-full bg-pine px-5 py-3.5 text-sm font-medium text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-pine2 dark:bg-brass dark:text-pine"><CalendarCheck size={18} />احجز استشارة مجانية</Link>);
}
