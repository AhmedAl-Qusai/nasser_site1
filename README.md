# بنيان للديكورات — النسخة 3 (تصميم جديد)

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion + Lenis. تصدير ثابت (static export).

## التشغيل
npm install
npm run dev      # للتطوير
npm run build    # ينتج مجلد out/ جاهز للرفع (Vercel أو Hostinger Shared)

## تعديل المحتوى بدون لمس التصميم
- src/data/siteConfig.ts  → الجوال، واتساب، ساعات العمل، خطوات العمل
- src/data/services.ts    → الخدمات
- src/data/projects.ts    → مشاريع قبل/بعد (الصور في public/images/work)
- scripts/prep_images.py  → يقسم صور t#pro# إلى قبل/بعد ويحوّلها WebP

## الصفحات
/ ، /services ، /portfolio ، /studio (3D) ، /blog و/blog/[slug] (10 مقالات) ، /about ، /contact + sitemap وrobots.

## المقالات
مولّدة من decorations.html القديم عبر scripts/build_articles.py إلى src/data/articles.ts (عدّلها من هناك).

## استوديو 3D
src/components/studio/Scene.tsx (المشهد) و StudioClient.tsx (الخيارات). الخامات مولّدة برمجيًا بلا ملفات صور.


## النسخة 3
- هوية جديدة: ألوان الصنوبري والنحاسي والجص (متغيرات في globals.css وtailwind.config.ts)، خطوط El Messiri وReadex Pro.
- حذفنا framer-motion وlenis وdrei: الحركة كلها CSS + IntersectionObserver (الموقع أخف).
- انتقال بين الصفحات: ستارة CSS في src/app/template.tsx.
- قبل/بعد: شرائح 3D تنقلب (CompareSlider.tsx).
- الاستوديو: مشي حر (WASD + سحب للنظر + عصا حركة للجوال) في studio/Scene.tsx.


## النسخة 4 (إعادة هيكلة: خزائن وغرف نوم وأثاث)
- الأقسام في src/data/categories.ts (خزائن، غرف ملابس، غرف نوم، أثاث) وتولّد صفحات /products/[slug] تلقائيًا.
- الأعمال في src/data/works.ts: أضف صورك الجديدة هناك (category: closets | walkin | bedrooms | furniture) وضع before اختياريًا.
- المقالات في src/data/articles.ts، والأسئلة الشائعة في src/data/faqs.ts.
- أرقامك (سنوات الخبرة، عدد المشاريع...) في src/data/siteConfig.ts داخل stats وتظهر تلقائيًا.
- الاستوديو: وضعان (خزائن وغرفة ملابس / غرفة نوم) في src/components/studio.


## النسخة 5 (حسب وثيقة المواصفات)
- الأسعار: src/data/pricing.json (عدّلها من GitHub مباشرة ثم غيّر placeholder إلى false).
- الباقات: src/data/bundles.ts | جواز الجودة: quality.ts | الخدمات الـ16: services16.ts
- غرفة النوم التفاعلية: src/data/hotspots.ts (غيّر الصورة والإحداثيات)
- آراء العملاء: testimonials.ts (القسم لا يظهر إلا بعد إضافة آراء حقيقية)
- النصوص العامة والمدن وشريط الإعلان: siteConfig.ts
- التتبع: انسخ المتغيرات من .env.example إلى Vercel (GA / Meta Pixel / TikTok Pixel / Search Console)
