// تتبع الأحداث: يعمل تلقائيًا مع Google Analytics وMeta Pixel وTikTok Pixel إذا كانت مفعّلة
/* eslint-disable @typescript-eslint/no-explicit-any */
export function track(name: 'lead' | 'calculator' | 'bundle', data?: Record<string, unknown>) {
  try {
    const w = window as any;
    w.gtag?.('event', name === 'lead' ? 'generate_lead' : name, data);
    w.fbq?.('track', name === 'lead' ? 'Lead' : 'Contact', data);
    w.ttq?.track(name === 'lead' ? 'SubmitForm' : 'Contact', data);
  } catch {}
}
