import Hero from '@/components/Hero';
import WhyUs from '@/components/WhyUs';
import ServicesGrid from '@/components/ServicesGrid';
import CostCalculator from '@/components/CostCalculator';
import Bundles from '@/components/Bundles';
import BeforeAfter from '@/components/BeforeAfter';
import RoomHotspots from '@/components/RoomHotspots';
import QualityPassport from '@/components/QualityPassport';
import Process from '@/components/Process';
import StudioTeaser from '@/components/StudioTeaser';
import Testimonials from '@/components/Testimonials';
import FaqSection from '@/components/FaqSection';
import ConsultForm from '@/components/ConsultForm';
import { getFeatured } from '@/lib/works';
export default function Home() {
  return (<><Hero /><WhyUs /><ServicesGrid />
    <section id="calculator" className="px-5 pb-14 sm:pb-20 md:pb-32"><div data-r className="mx-auto mb-10 max-w-2xl text-center"><h2 className="font-display text-4xl font-bold sm:text-5xl">احسب تكلفة مشروعك في 30 ثانية</h2><p className="mt-3 text-muted">اختر الخدمة وأدخل المقاسات، واحصل على تقدير فوري لتكلفة مشروعك.</p></div><CostCalculator /></section>
    <Bundles /><BeforeAfter items={getFeatured()} /><RoomHotspots /><QualityPassport /><div className="pt-14 sm:pt-20 md:pt-32"><Process /></div><StudioTeaser /><Testimonials /><FaqSection /><ConsultForm /></>);
}
