import { services } from '@/data/services';
export default function Marquee() {
  const row = services.map((s) => s.title);
  return (
    <div dir="ltr" aria-hidden className="overflow-hidden bg-pine py-4 text-brass">
      <div className="marq flex w-max gap-10 whitespace-nowrap font-display text-xl">
        {[...row, ...row].map((t, i) => (<span key={i} className="flex items-center gap-10">{t}<span className="text-white/30">✦</span></span>))}
      </div>
    </div>
  );
}
