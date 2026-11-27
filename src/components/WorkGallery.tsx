'use client';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, MessageCircle, X, ZoomIn, ZoomOut } from 'lucide-react';
import type { Work } from '@/data/works';
import { waLink } from '@/data/siteConfig';
import CompareSlider from './CompareSlider';

export default function WorkGallery({
  works,
  fit = 'auto',
  cols = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
}: {
  works: Work[];
  fit?: 'auto' | 'contain' | 'cover';
  cols?: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);
  const touchX = useRef<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const open = openIdx !== null ? works[openIdx] ?? null : null;

  const go = (delta: number) => {
    setZoom(false);
    setOpenIdx((i) => (i === null ? null : (i + delta + works.length) % works.length));
  };

  useEffect(() => {
    if (openIdx === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoom(false);
        setOpenIdx(null);
      } else if (e.key === 'ArrowLeft') go(1);
      else if (e.key === 'ArrowRight') go(-1);
    };
    addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIdx, works.length]);

  useEffect(() => {
    if (openIdx === null || !stripRef.current) return;
    const active = stripRef.current.children[openIdx] as HTMLElement | undefined;
    active?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [openIdx]);

  if (works.length === 0) return null;

  const isContain = (w: Work) => (fit === 'contain' ? true : fit === 'cover' ? false : w.subcategory === 'dimensions');

  return (
    <>
      <ul className={`grid gap-3 sm:gap-4 ${cols}`}>
        {works.map((w, i) => {
          const contain = isContain(w);
          return (
            <li key={w.id}>
              <button
                onClick={() => {
                  setZoom(false);
                  setOpenIdx(i);
                }}
                className="group flex h-full w-full flex-col overflow-hidden rounded-[22px] border border-line bg-surface p-2 text-start shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/70 hover:shadow-xl active:scale-[.99]"
              >
                <div
                  className={`relative aspect-[4/5] w-full overflow-hidden rounded-[16px] ${
                    contain ? 'bg-white p-1.5 dark:bg-[#1e1612]' : 'bg-sand'
                  }`}
                >
                  <img
                    src={w.after}
                    alt={w.title}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full transition-transform duration-500 ${
                      contain ? 'object-contain group-hover:scale-[1.03]' : 'object-cover group-hover:scale-105'
                    }`}
                  />
                  <span className="pointer-events-none absolute end-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-pine/75 text-white opacity-90 backdrop-blur-sm transition group-hover:bg-brass group-hover:text-pine sm:opacity-0 sm:group-hover:opacity-100">
                    <Expand size={14} />
                  </span>
                  {w.before && (
                    <span className="pointer-events-none absolute start-2.5 top-2.5 rounded-full bg-brass px-2.5 py-0.5 text-[11px] font-medium text-pine">
                      قبل وبعد
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2 px-1.5 pb-1 pt-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{w.title}</p>
                    {w.note && <p className="truncate text-xs text-muted">{w.note}</p>}
                  </div>
                  <span className="shrink-0 rounded-full border border-line px-2 py-0.5 text-[11px] text-muted">
                    #{i + 1}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {open && openIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          data-lenis-prevent
          className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white backdrop-blur-sm"
          onClick={() => {
            setZoom(false);
            setOpenIdx(null);
          }}
        >
          <div
            className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold sm:text-base">{open.title}</p>
              <p className="truncate text-xs text-white/65">
                {open.note ? `${open.note} · ` : ''}
                {openIdx + 1} من {works.length}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {!open.before && (
                <button
                  aria-label={zoom ? 'تصغير الصورة' : 'تكبير الصورة'}
                  onClick={() => setZoom((z) => !z)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                >
                  {zoom ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
                </button>
              )}
              <a
                href={waLink(`السلام عليكم، أعجبني هذا التصميم (${open.title}${open.note ? ` - ${open.note}` : ''}) وأرغب بالاستفسار عنه.`)}
                className="inline-flex h-10 items-center gap-1.5 rounded-full bg-brass px-4 text-xs font-semibold text-pine transition hover:bg-brass2 sm:text-sm"
              >
                <MessageCircle size={15} />
                <span className="hidden sm:inline">اطلب تصميم مشابه</span>
                <span className="sm:hidden">اطلب مشابه</span>
              </a>
              <button
                aria-label="إغلاق"
                onClick={() => {
                  setZoom(false);
                  setOpenIdx(null);
                }}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div
            className={`relative flex flex-1 items-center justify-center p-3 sm:p-6 ${
              zoom ? 'overflow-auto' : 'overflow-hidden'
            }`}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              if (!zoom && e.touches.length === 1) touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (zoom || touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 45) go(dx > 0 ? -1 : 1);
            }}
          >
            {works.length > 1 && !zoom && (
              <>
                <button
                  aria-label="السابق"
                  onClick={() => go(-1)}
                  className="absolute start-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-brass hover:text-pine"
                >
                  <ChevronRight size={20} />
                </button>
                <button
                  aria-label="التالي"
                  onClick={() => go(1)}
                  className="absolute end-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-brass hover:text-pine"
                >
                  <ChevronLeft size={20} />
                </button>
              </>
            )}

            <div className={zoom ? 'max-w-none' : 'flex max-h-full max-w-4xl items-center justify-center'}>
              {open.before ? (
                <div className="w-[min(92vw,32rem)]">
                  <CompareSlider key={open.id} before={open.before} after={open.after} label={open.title} />
                </div>
              ) : (
                <img
                  src={open.after}
                  alt={open.title}
                  onClick={() => setZoom((z) => !z)}
                  className={`rounded-2xl border border-white/15 bg-white/5 shadow-2xl transition-all duration-300 ${
                    zoom
                      ? 'w-[160vw] max-w-none cursor-zoom-out sm:w-[95vw]'
                      : 'max-h-[68vh] w-auto max-w-full cursor-zoom-in object-contain'
                  }`}
                />
              )}
            </div>
          </div>

          {works.length > 1 && (
            <div
              className="border-t border-white/10 px-3 py-2.5"
              onClick={(e) => e.stopPropagation()}
            >
              <div ref={stripRef} className="noscroll mx-auto flex max-w-4xl gap-2 overflow-x-auto pb-0.5">
                {works.map((item, idx) => (
                  <button
                    key={item.id}
                    aria-label={item.title}
                    onClick={() => {
                      setZoom(false);
                      setOpenIdx(idx);
                    }}
                    className={`h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                      idx === openIdx ? 'scale-105 border-brass' : 'border-transparent opacity-55 hover:opacity-100'
                    }`}
                  >
                    <img src={item.after} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
