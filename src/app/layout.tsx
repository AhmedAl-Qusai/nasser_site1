import type { Metadata } from 'next';
import './globals.css';
import { site, siteUrl } from '@/data/siteConfig';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  openGraph: { locale: 'ar_SA', siteName: 'بنيان للديكورات', type: 'website' },
  title: 'أصباغ وديكورات الأحساء | بنيان للديكورات',
  description: 'أصباغ وديكورات الأحساء: دهانات داخلية وخارجية، جبس بورد، بديل الرخام والخشب، شيبورد، وديكورات خلف التلفزيون.',
};
const themeScript = `(function(){try{var t=localStorage.getItem('bunyan-theme')||'light';var d=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})()`;
const jsonLd = {
  '@context': 'https://schema.org', '@type': 'HomeAndConstructionBusiness', name: site.name,
  telephone: '+' + site.whatsapp, areaServed: { '@type': 'AdministrativeArea', name: 'الأحساء' },
  sameAs: [site.instagram, site.tiktok],
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;700&family=Reem+Kufi:wght@500;600;700&display=swap" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <SmoothScroll /><Header />
        <main>{children}</main>
        <Footer /><WhatsAppFab />
      </body>
    </html>
  );
}
