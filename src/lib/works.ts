import { works as curated, type Work } from '@/data/works';
import { workTitles } from '@/data/workTitles';
import { EXT, listDir } from './img';
const cats: { dir: Work['category']; label: string }[] = [{ dir: 'walkin', label: 'خزائن وغرف ملابس' }, { dir: 'bedrooms', label: 'غرفة نوم' }, { dir: 'living', label: 'وحدة معيشة' }, { dir: 'renovation', label: 'ترميم وتطوير' }];
// يقرأ public/images/works/<القسم>/ : name-after.webp (+ name-before.webp اختياري) أو name.webp لصورة واحدة
function scan(): Work[] {
  const out: Work[] = [];
  for (const c of cats) {
    const files = listDir(`images/works/${c.dir}`).filter((f) => EXT.includes(f.split('.').pop()!.toLowerCase()));
    const bases = new Set(files.map((f) => f.replace(/\.[^.]+$/, '').replace(/-(before|after)$/, '')));
    [...bases].sort().forEach((b, i) => {
      const find = (suffix: string) => files.find((f) => f.replace(/\.[^.]+$/, '') === b + suffix);
      const after = find('-after') ?? find('');
      if (!after) return;
      const before = find('-before');
      const id = `${c.dir}-${b}`; const t = workTitles[id];
      out.push({ id, title: t?.title ?? `${c.label} ${i + 1}`, note: t?.note ?? '', category: c.dir, after: `/images/works/${c.dir}/${after}`, before: before ? `/images/works/${c.dir}/${before}` : undefined });
    });
  }
  return out;
}
export function getWorks(): Work[] { return [...scan(), ...curated]; }
export function getFeatured(): (Work & { before: string })[] {
  const all = getWorks().filter((w): w is Work & { before: string } => !!w.before);
  const fixed = ['t2pro1', 't2pro2', 't2pro3', 't3pro4'];
  return [...all.filter((w) => !fixed.includes(w.id)), ...all.filter((w) => fixed.includes(w.id))].slice(0, 5);
}
