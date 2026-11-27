import { works as curated, type BedroomSubcategory, type Work, type WorkCategory } from '@/data/works';
import { workTitles } from '@/data/workTitles';
import { EXT, listDir } from './img';

type ScanSource = {
  dir: string;
  category: WorkCategory;
  label: string;
  subcategory?: BedroomSubcategory;
  subLabel?: string;
};

const sources: ScanSource[] = [
  { dir: 'closets', category: 'closets', label: 'حلول الخزائن' },
  { dir: 'bedrooms/design', category: 'bedrooms', subcategory: 'design', label: 'تصميم غرف النوم', subLabel: 'قسم تصميم غرف النوم' },
  { dir: 'bedrooms/dimensions', category: 'bedrooms', subcategory: 'dimensions', label: 'مقاسات غرف النوم', subLabel: 'قسم مقاسات غرف النوم' },
  { dir: 'walkin', category: 'walkin', label: 'غرف الملابس' },
  { dir: 'tv', category: 'tv', label: 'وحدات التلفزيون' },
  { dir: 'display', category: 'display', label: 'وحدات العرض والمكتبات' },
  { dir: 'renovation', category: 'renovation', label: 'ترميم وتطوير' },
];

// يقرأ الصور تلقائيًا من public/images/works/<المسار>/ (صور مفردة أو أزواج -before/-after)
function scan(): Work[] {
  const out: Work[] = [];
  for (const s of sources) {
    const files = listDir(`images/works/${s.dir}`).filter((f) => EXT.includes(f.split('.').pop()?.toLowerCase() ?? ''));
    const bases = new Set(files.map((f) => f.replace(/\.[^.]+$/, '').replace(/-(before|after)$/, '')));
    [...bases].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).forEach((b, i) => {
      const find = (suffix: string) => files.find((f) => f.replace(/\.[^.]+$/, '') === b + suffix);
      const after = find('-after') ?? find('');
      if (!after) return;
      const before = find('-before');
      const id = `${s.category}${s.subcategory ? `-${s.subcategory}` : ''}-${b}`;
      const t = workTitles[id];
      out.push({
        id,
        title: t?.title ?? `${s.label} ${i + 1}`,
        note: t?.note ?? s.subLabel ?? '',
        category: s.category,
        subcategory: s.subcategory,
        subLabel: s.subLabel,
        after: `/images/works/${s.dir}/${after}`,
        before: before ? `/images/works/${s.dir}/${before}` : undefined,
      });
    });
  }
  return out;
}

export function getWorks(): Work[] {
  return [...scan(), ...curated];
}

export function getFeatured(): (Work & { before: string })[] {
  return getWorks().filter((w): w is Work & { before: string } => !!w.before).slice(0, 5);
}

export function getHomeShowcase(): Work[] {
  const all = getWorks();
  const order: WorkCategory[] = ['closets', 'bedrooms', 'walkin', 'tv', 'display'];
  const picked: Work[] = [];
  for (let round = 0; round < 2; round++) {
    for (const cat of order) {
      const match = all.filter((w) => w.category === cat && (!w.subcategory || w.subcategory === 'design'))[round];
      if (match) picked.push(match);
    }
  }
  return picked;
}
