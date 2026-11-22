import type { MetadataRoute } from 'next';
import { articles } from '@/data/articles';
import { categories } from '@/data/categories';
import { siteUrl } from '@/data/siteConfig';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/services/', '/calculator/', '/quality/', '/products/', '/portfolio/', '/studio/', '/process/', '/blog/', '/about/', '/contact/'];
  return [...pages.map((p) => ({ url: siteUrl + p })), ...categories.map((c) => ({ url: `${siteUrl}/products/${c.slug}/` })), ...articles.map((a) => ({ url: `${siteUrl}/blog/${a.slug}/` }))];
}
