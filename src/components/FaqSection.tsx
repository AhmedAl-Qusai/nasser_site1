import Faq from './Faq';
import { faqs } from '@/data/faqs';
export default function FaqSection() {
  return (<section className="mx-auto max-w-3xl px-5 pb-14 sm:pb-20 md:pb-28"><h2 data-r className="mb-8 font-display text-4xl font-bold sm:text-5xl">أسئلة شائعة</h2><div data-r><Faq items={faqs} /></div></section>);
}
