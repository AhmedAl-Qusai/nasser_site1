export type Project = { id: string; title: string; note: string; before: string; after: string; featured?: boolean };
const named: Record<string, { title: string; note: string; featured?: boolean }> = {
  t1pro1: { title: 'صالة بديكور تلفزيون', note: 'جدار تلفزيون مع إضاءة مخفية', featured: true },
  t2pro1: { title: 'ممر بوحدات خشبية', note: 'أرفف وإضاءة LED داخل الجدار', featured: true },
  t3pro1: { title: 'مدخل بمرآة مضيئة', note: 'وحدة مدخل ومرآة بإضاءة خلفية', featured: true },
  t3pro2: { title: 'صالة بجدار مشقّق ومرآة', note: 'تكسية عمودية ومرآة دائرية مضيئة', featured: true },
};
export const projects: Project[] = [1, 2, 3, 4].flatMap((t) => [1, 2, 3, 4].map((p) => {
  const id = `t${t}pro${p}`; const n = named[id];
  return { id, title: n?.title ?? `مشروع ${(t - 1) * 4 + p}`, note: n?.note ?? 'قبل وبعد التنفيذ', featured: n?.featured,
    before: `/images/work/${id}-before.webp`, after: `/images/work/${id}-after.webp` };
}));
export const featured = projects.filter((p) => p.featured);
