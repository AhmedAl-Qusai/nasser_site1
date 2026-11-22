// معرض الأعمال: أضف صورك الجديدة هنا. category: walkin (غرف ملابس وخزائن) | bedrooms | living (وحدات معيشة) | renovation (ترميم وتطوير)
export type Work = { id: string; title: string; note: string; category: 'walkin' | 'bedrooms' | 'living' | 'renovation'; after: string; before?: string };
export const works: Work[] = [
  { id: 't2pro1', title: 'خزانة بأبواب زجاجية في ممر', note: 'أبواب زجاج منزلقة مع إضاءة داخلية', category: 'walkin', before: '/images/work/t2pro1-before.webp', after: '/images/work/t2pro1-after.webp' },
  { id: 't2pro2', title: 'خزانة منزلقة بإضاءة داخلية', note: 'رفوف داخلية وإضاءة LED مخفية', category: 'walkin', before: '/images/work/t2pro2-before.webp', after: '/images/work/t2pro2-after.webp' },
  { id: 't2pro3', title: 'غرفة ملابس برفوف مفتوحة', note: 'رفوف خشبية مفتوحة مع إضاءة', category: 'walkin', before: '/images/work/t2pro3-before.webp', after: '/images/work/t2pro3-after.webp' },
  { id: 't2pro4', title: 'رفوف ومكتبة خشبية', note: 'وحدة رفوف بإطار معدني وخشب', category: 'living', before: '/images/work/t2pro4-before.webp', after: '/images/work/t2pro4-after.webp' },
  { id: 't1pro1', title: 'وحدة تلفزيون وإضاءة مخفية', note: 'جدار تلفزيون مع إضاءة', category: 'living', before: '/images/work/t1pro1-before.webp', after: '/images/work/t1pro1-after.webp' },
  { id: 't1pro2', title: 'وحدة تلفزيون بألواح', note: 'تكسية ألواح ووحدة سفلية', category: 'living', before: '/images/work/t1pro2-before.webp', after: '/images/work/t1pro2-after.webp' },
  { id: 't1pro3', title: 'وحدة تلفزيون بأرفف مضاءة', note: 'وحدة مع أرفف وإضاءة جانبية', category: 'living', before: '/images/work/t1pro3-before.webp', after: '/images/work/t1pro3-after.webp' },
  { id: 't1pro4', title: 'وحدة تلفزيون ومدفأة', note: 'وحدة منخفضة مع تكسية خلفية', category: 'living', before: '/images/work/t1pro4-before.webp', after: '/images/work/t1pro4-after.webp' },
  { id: 't3pro1', title: 'وحدة مدخل بمرآة مضيئة', note: 'وحدة مدخل ومرآة بإضاءة خلفية', category: 'living', before: '/images/work/t3pro1-before.webp', after: '/images/work/t3pro1-after.webp' },
  { id: 't3pro4', title: 'كونسول مدخل بمرآة بيضاوية', note: 'وحدة مدخل بمرآة مضيئة', category: 'living', before: '/images/work/t3pro4-before.webp', after: '/images/work/t3pro4-after.webp' },
  { id: 'pra5', title: 'تصور غرفة نوم', note: 'فكرة تصميم (تصور)', category: 'bedrooms', after: '/images/gallery/pra5.webp' },
  { id: 'pra8', title: 'كونسول بخلفية خشبية', note: 'فكرة تصميم (تصور)', category: 'living', after: '/images/gallery/pra8.webp' },
];
export const featured = works.filter((w) => ['t2pro1', 't2pro2', 't2pro3', 't3pro4'].includes(w.id)) as (Work & { before: string })[];
