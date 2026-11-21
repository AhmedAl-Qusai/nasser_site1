import { MessageCircle } from 'lucide-react';
import { waLink } from '@/data/siteConfig';
export default function WhatsAppFab() {
  return (<a href={waLink('السلام عليكم، أرغب بالاستفسار')} aria-label="تواصل عبر واتساب" className="fixed bottom-5 start-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"><MessageCircle size={26} /></a>);
}
