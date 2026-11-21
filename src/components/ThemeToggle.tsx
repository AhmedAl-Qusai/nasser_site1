'use client';
import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
type T = 'light' | 'dark' | 'system';
const order: T[] = ['light', 'dark', 'system'];
const labels: Record<T, string> = { light: 'المظهر: ساطع', dark: 'المظهر: داكن', system: 'المظهر: حسب الجهاز' };
export default function ThemeToggle() {
  const [t, setT] = useState<T>('light');
  const apply = (v: T) => document.documentElement.classList.toggle('dark', v === 'dark' || (v === 'system' && matchMedia('(prefers-color-scheme: dark)').matches));
  useEffect(() => { setT((localStorage.getItem('bunyan-theme') as T) || 'light'); }, []);
  useEffect(() => {
    if (t !== 'system') return;
    const mq = matchMedia('(prefers-color-scheme: dark)'); const f = () => apply('system');
    mq.addEventListener('change', f); return () => mq.removeEventListener('change', f);
  }, [t]);
  const next = () => { const n = order[(order.indexOf(t) + 1) % 3]; setT(n); localStorage.setItem('bunyan-theme', n); apply(n); };
  const Icon = t === 'light' ? Sun : t === 'dark' ? Moon : Monitor;
  return (<button onClick={next} aria-label={labels[t] + ' (اضغط للتبديل)'} title={labels[t]} className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-gold"><Icon size={18} /></button>);
}
