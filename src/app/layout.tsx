import type { Metadata } from 'next';
import './globals.css';
import { site, siteUrl } from '@/data/siteConfig';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import RevealObserver from '@/components/RevealObserver';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  openGraph: { locale: 'ar_SA', siteName: 'بنيان للديكورات', type: 'website' },
  title: 'أصباغ وديكورات الأحساء | بنيان للديكورات',
  description: 'أصباغ وديكورات الأحساء: دهانات داخلية وخارجية، جبس بورد، بديل الرخام والخشب، شيبورد، وديكورات خلف التلفزيون.',
};
const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('bunyan-theme')||'light';var k=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);d.classList.toggle('dark',k)}catch(e){}})()`;
const jsonLd = { '@context': 'https://schema.org', '@type': 'HomeAndConstructionBusiness', name: site.name, telephone: '+' + site.whatsapp, areaServed: { '@type': 'AdministrativeArea', name: 'الأحساء' }, sameAs: [site.instagram, site.tiktok] };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=El+Messiri:wght@600;700&family=Readex+Pro:wght@300;400;500;600&display=swap" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Header /><main>{children}</main><Footer /><WhatsAppFab /><RevealObserver />
      </body>
    </html>
  );
}
