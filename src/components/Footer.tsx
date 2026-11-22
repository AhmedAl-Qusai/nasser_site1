import { Phone, MapPin, Instagram } from 'lucide-react';
import Link from 'next/link';
import { site, navAll, waLink } from '@/data/siteConfig';
export default function Footer() {
  return (
    <footer className="mt-0 overflow-hidden bg-pine text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-10 pt-16 md:grid-cols-4">
        <div>
          <img src="/images/logo2.png" alt="شعار بنيان" width={80} height={80} className="h-20 w-20 object-contain" loading="lazy" />
          <p className="mt-3 text-sm text-white/65"><b className="text-white">بنيان (BONYAN)</b> — وجهتك المتكاملة لتصميم وتصنيع الخزائن، غرف النوم، الأثاث المخصص، والديكور والترميم بدقة المليمتر تحت سقف واحد.</p>
        </div>
        <div><h3 className="font-display text-lg text-brass">ساعات العمل</h3><ul className="mt-3 space-y-1 text-sm text-white/70">{site.hours.map((h) => <li key={h.days}>{h.days}: {h.time}</li>)}<li>واتساب على مدار الساعة</li></ul></div>
        <div><h3 className="font-display text-lg text-brass">روابط سريعة</h3><ul className="mt-3 space-y-1 text-sm text-white/70">{navAll.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-brass">{n.label}</Link></li>)}</ul></div>
        <div><h3 className="font-display text-lg text-brass">تواصل معنا</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2"><Phone size={14} /><a href={`tel:${site.phone}`} dir="ltr" className="hover:text-brass">{site.phone}</a></li>
            <li className="flex items-center gap-2"><MapPin size={14} />الدمام · الخبر · الجبيل · الأحساء</li>
            <li className="flex items-center gap-2"><Instagram size={14} /><a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brass">انستقرام</a></li>
            <li><a href={site.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-brass">تيك توك</a> · <a href={waLink()} className="hover:text-brass">واتساب</a></li>
          </ul></div>
      </div>
      <p aria-hidden className="select-none whitespace-nowrap text-center font-display text-[22vw] leading-[.8] text-white/[.06]">BUNYAN</p>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">جميع الحقوق محفوظة © 2026 بنيان (BONYAN) · designed by Ahmed Al-qusai</div>
    </footer>
  );
}
