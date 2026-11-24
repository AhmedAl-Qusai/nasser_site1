import type { Metadata, Viewport } from 'next';
import './globals.css';
import { site, siteUrl } from '@/data/siteConfig';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import RevealObserver from '@/components/RevealObserver';
import StickyCta from '@/components/StickyCta';
import Analytics from '@/components/Analytics';

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#2A1F1A' };
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  openGraph: { locale: 'ar_SA', siteName: 'بنيان للديكورات', type: 'website' },
  title: 'بنيان BONYAN | خزائن وغرف نوم وأثاث مخصص في الدمام والخبر والجبيل والأحساء',
  description: 'تصميم وتصنيع خزائن وغرف نوم وغرف ملابس وأثاث مخصص بدقة المليمتر في الدمام والخبر والجبيل والأحساء. استشارة ورفع مقاسات مجانية وتصميم 3D.',
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
};
const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('bunyan-theme')||'light';var k=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);d.classList.toggle('dark',k)}catch(e){}})()`;
const jsonLd = { '@context': 'https://schema.org', '@type': 'HomeAndConstructionBusiness', name: site.name, telephone: '+' + site.whatsapp, areaServed: ['الدمام', 'الخبر', 'الجبيل', 'الأحساء'].map((n) => ({ '@type': 'City', name: n })), sameAs: [site.instagram, site.tiktok] };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@500;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Header /><main>{children}</main><Footer /><WhatsAppFab /><StickyCta /><RevealObserver /><Analytics />
      </body>
    </html>
  );
}
