import type { MetadataRoute } from 'next';
import { articles } from '@/data/articles';
import { siteUrl } from '@/data/siteConfig';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/services/', '/portfolio/', '/studio/', '/blog/', '/about/', '/contact/'];
  return [...pages.map((p) => ({ url: siteUrl + p })), ...articles.map((a) => ({ url: `${siteUrl}/blog/${a.slug}/` }))];
}
