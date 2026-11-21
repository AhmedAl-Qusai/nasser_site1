'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
let first = true;
// ستارة انتقال تظهر عند التنقل بين الصفحات فقط (ليست عند أول تحميل)
export default function Template({ children }: { children: React.ReactNode }) {
  const v = useRef<HTMLDivElement>(null);
  useIso(() => { if (first) { first = false; return; } v.current?.classList.add('go'); }, []);
  return (<><div ref={v} className="veil" aria-hidden="true"><img src="/images/logo2.png" alt="" width={72} height={72} /></div>{children}</>);
}
