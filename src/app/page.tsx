import BulkOrdersSection from "@/components/BulkOrdersSection";
import DealsSection from "@/components/DealsSection";
import DownloadAppSection from "@/components/DownloadAppSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div>
      {/* Render the Hero Carousel on your landing page */}
      <HeroCarousel />
      <DealsSection/>
      <BulkOrdersSection/>
      <WhyChooseUs/>
      <TestimonialsSection/>
      <DownloadAppSection/>
      <FAQSection/>
    </div>
  );
}