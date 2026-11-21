export const site = {
  name: 'بنيان للديكورات', nameEn: 'Bunyan for Decorations', city: 'الأحساء',
  phone: '0555253178', whatsapp: '966555253178',
  instagram: 'https://www.instagram.com/hadada626', tiktok: 'https://www.tiktok.com/@mj_k_01',
  hours: [{ days: 'السبت – الخميس', time: '7 صباحًا – 11 مساءً' }, { days: 'الجمعة', time: '1 مساءً – 11 مساءً' }],
};
export const waLink = (text?: string) => `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
export const nav = [
  { label: 'خدماتنا', href: '/services/' }, { label: 'معرض الأعمال', href: '/portfolio/' },
  { label: 'استوديو 3D', href: '/studio/' }, { label: 'المدونة', href: '/blog/' },
  { label: 'من نحن', href: '/about/' }, { label: 'اتصل بنا', href: '/contact/' },
];
export const siteUrl = 'https://bunyan-company.vercel.app';
export const steps = [
  { title: 'استشارة مجانية', text: 'نسمع طلبك ونحدد معك الأولويات والميزانية.' },
  { title: 'المقاسات والصور', text: 'معاينة الموقع، أو ترسل لنا الصور والمقاسات عبر واتساب.' },
  { title: 'تصور التصميم', text: 'نقترح الخامات والألوان وتوزيع الإضاءة المناسبة لمساحتك.' },
  { title: 'عرض السعر', text: 'سعر واضح ومفصّل قبل أن نبدأ بأي عمل.' },
  { title: 'التنفيذ', text: 'فريقنا ينفّذ حسب الجدول المتفق عليه.' },
  { title: 'التسليم', text: 'مراجعة نهائية للتشطيب ثم تسليم الموقع جاهزًا.' },
];
