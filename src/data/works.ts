// معرض الأعمال: يتم تحميل الصور تلقائيًا من public/images/works/<القسم>
export type WorkCategory = 'closets' | 'bedrooms' | 'walkin' | 'tv' | 'display' | 'renovation';
export type BedroomSubcategory = 'design' | 'dimensions';

export type Work = {
  id: string;
  title: string;
  note?: string;
  category: WorkCategory;
  subcategory?: BedroomSubcategory;
  subLabel?: string;
  after: string;
  before?: string;
};

export const works: Work[] = [];
