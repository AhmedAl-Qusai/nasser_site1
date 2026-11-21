/** @type {import('next').NextConfig} */
// static export: ينتج مجلد out/ جاهز للرفع على Vercel أو Hostinger (Shared بدون Node)
export default { output: 'export', trailingSlash: true, images: { unoptimized: true } };
