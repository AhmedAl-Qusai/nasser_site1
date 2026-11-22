import { DoorClosed, DoorOpen, Shirt, Tv, Coffee, BedDouble, Library, WashingMachine, Bath, Warehouse, Layers, Armchair, RectangleVertical, Hammer, CookingPot, Store, Cog, Ruler, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react';
// أيقونات محددة فقط (استيراد كل المكتبة يضيف أكثر من 150KB)
const map: Record<string, LucideIcon> = { DoorClosed, DoorOpen, Shirt, Tv, Coffee, BedDouble, Library, WashingMachine, Bath, Warehouse, Layers, Armchair, RectangleVertical, Hammer, CookingPot, Store, Cog, Ruler, ShieldCheck };
export default function ServiceIcon({ name, size = 28 }: { name: string; size?: number }) {
  const Icon = map[name] ?? Sparkles;
  return <Icon size={size} strokeWidth={1.3} className="text-gold" />;
}
