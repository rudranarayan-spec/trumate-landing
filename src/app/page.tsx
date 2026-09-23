import BulkOrdersSection from "@/components/BulkOrdersSection";
import DealsSection from "@/components/DealsSection";
import DownloadAppSection from "@/components/DownloadAppSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <Header />
      <WhatsAppButton />
      <HeroCarousel />
      <DealsSection />
      <BulkOrdersSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <DownloadAppSection />
      <FAQSection />
      <Footer />
    </div>
  );
}