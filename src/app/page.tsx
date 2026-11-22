import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
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
export default function Home() {
  return (<><Hero /><Marquee /><WhyUs /><ServicesGrid />
    <section id="calculator" className="px-5 pb-24 md:pb-32"><div data-r className="mx-auto mb-10 max-w-2xl text-center"><h2 className="font-display text-4xl font-bold sm:text-5xl">احسب تكلفة مشروعك في 30 ثانية</h2><p className="mt-3 text-muted">اختر الخدمة وأدخل المقاسات، واحصل على تقدير فوري لتكلفة مشروعك.</p></div><CostCalculator /></section>
    <Bundles /><BeforeAfter /><RoomHotspots /><QualityPassport /><div className="pt-24 md:pt-32"><Process /></div><StudioTeaser /><Testimonials /><FaqSection /><ConsultForm /></>);
}
