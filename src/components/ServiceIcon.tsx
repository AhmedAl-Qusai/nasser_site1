import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
export default function ServiceIcon({ name, size = 28 }: { name: string; size?: number }) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[name] ?? Icons.Sparkles;
  return <Icon size={size} strokeWidth={1.3} className="text-gold" />;
}
