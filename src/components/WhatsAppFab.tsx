import { MessageCircle } from 'lucide-react';
import { waLink } from '@/data/siteConfig';
export default function WhatsAppFab() {
  return (<a href={waLink('السلام عليكم، أرغب بالاستفسار')} aria-label="تواصل عبر واتساب" className="ringp fixed bottom-5 start-5 z-30 hidden md:grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-[#25D366] shadow-lg transition-transform hover:scale-105"><MessageCircle size={26} className="text-white" /></a>);
}
