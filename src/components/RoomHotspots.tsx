'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { room, hotspots } from '@/data/hotspots';
export default function RoomHotspots() {
  const [a, setA] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:py-32">
      <div data-r className="max-w-2xl"><h2 className="font-display text-4xl font-bold sm:text-5xl">التناغم المتكامل</h2>
        <p className="mt-3 text-muted">غرفة كاملة بهوية واحدة: سرير وخزانة وتكسيات وإضاءة. اضغط على النقاط لتعرف تفاصيل كل قطعة وكيف تتناغم مع بقية الغرفة.</p></div>
      <div data-r className="relative mt-10 aspect-[3/2] overflow-hidden rounded-[2rem] bg-sand">
        <img src={room.image} alt={room.alt} loading="lazy" className="h-full w-full object-cover" onClick={() => setA(null)} />
        {hotspots.map((p, i) => (
          <div key={p.title} className="absolute" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            <button aria-label={p.title} aria-expanded={a === i} onClick={() => setA(a === i ? null : i)} className={`ringp relative -ms-4 -mt-4 grid h-8 w-8 place-items-center rounded-full bg-brass text-brass shadow-lg transition-transform ${a === i ? 'scale-110' : ''}`}><Plus size={18} className={`text-pine transition-transform ${a === i ? 'rotate-45' : ''}`} /></button>
            {a === i && (
              <div className={`absolute z-10 ${p.y > 55 ? 'bottom-full pb-3' : 'top-full pt-3'} ${p.x > 65 ? 'right-0' : p.x < 35 ? 'left-0' : 'left-1/2 -translate-x-1/2'}`}>
                <div role="status" className="fadeup rounded-2xl bg-pine p-4 text-white shadow-2xl" style={{ width: 'min(16rem, 62vw)', animationDuration: '.35s' }}>
                  <p className="font-display text-lg text-brass">{p.title}</p><p className="mt-1 text-[13.5px] leading-6 text-white/85">{p.text}</p></div></div>)}
          </div>))}
      </div>
    </section>
  );
}
