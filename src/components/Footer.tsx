import { Phone, MapPin, Instagram } from 'lucide-react';
import { site, nav, waLink } from '@/data/siteConfig';
export default function Footer() {
  return (
    <footer className="border-t border-line bg-sand">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <img src="/images/logo.png" alt="شعار بنيان" width={72} height={72} className="h-[72px] w-[72px] object-contain dark:hidden" loading="lazy" />
          <img src="/images/logo2.png" alt="شعار بنيان" width={72} height={72} className="hidden h-[72px] w-[72px] object-contain dark:block" loading="lazy" />
          <p className="mt-3 text-sm text-muted">ديكورات ودهانات داخلية وخارجية في جميع أحياء الأحساء.</p>
        </div>
        <div><h3 className="font-bold">ساعات العمل</h3><ul className="mt-3 space-y-1 text-sm text-muted">{site.hours.map((h) => <li key={h.days}>{h.days}: {h.time}</li>)}<li>واتساب على مدار الساعة</li></ul></div>
        <div><h3 className="font-bold">روابط سريعة</h3><ul className="mt-3 space-y-1 text-sm text-muted">{nav.map((n) => <li key={n.href}><a href={n.href} className="hover:text-gold">{n.label}</a></li>)}</ul></div>
        <div><h3 className="font-bold">تواصل معنا</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li className="flex items-center gap-2"><Phone size={14} /><a href={`tel:${site.phone}`} dir="ltr" className="hover:text-gold">{site.phone}</a></li>
            <li className="flex items-center gap-2"><MapPin size={14} />الأحساء، المملكة العربية السعودية</li>
            <li className="flex items-center gap-2"><Instagram size={14} /><a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold">انستقرام</a></li>
            <li><a href={site.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-gold">تيك توك</a> · <a href={waLink()} className="hover:text-gold">واتساب</a></li>
          </ul></div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-muted">جميع الحقوق محفوظة © 2026 بنيان للديكورات الأحساء · designed by Ahmed Al-qusai</div>
    </footer>
  );
}
