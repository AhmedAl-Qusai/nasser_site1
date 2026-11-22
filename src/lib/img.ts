// يعمل وقت البناء فقط (Server): يكتشف الصور التي تضيفها داخل public/images بدون تعديل أي كود
import fs from 'fs';
import path from 'path';
const root = path.join(process.cwd(), 'public');
export const EXT = ['webp', 'jpg', 'jpeg', 'png', 'avif'];
export function findImage(base: string): string | undefined {
  for (const e of EXT) if (fs.existsSync(path.join(root, `${base}.${e}`))) return `${base}.${e}`;
  return undefined;
}
export function listDir(rel: string): string[] { try { return fs.readdirSync(path.join(root, rel)); } catch { return []; } }
