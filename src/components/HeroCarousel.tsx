"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    badge: "Eco-Friendly Innovation",
    title: "Eco-Friendly Food Packaging.",
    subtitle: "Sustainable, biodegradable disposables designed for modern green businesses and sustainable living.",
    primaryCta: { text: "Shop Disposables", href: "/products?category=biodegradables" },
    secondaryCta: { text: "Bulk Orders", href: "/bulk-orders" },
    image: "/hero1.png",
    features: ["100% Biodegradable", "Compostable Packaging", "Sustainable Choice"],
  },
  {
    id: 2,
    badge: "Available Soon",
    title: "Quality for Every Kitchen.",
    subtitle: "Authentic spices and dependable food-service essentials for homes and businesses across India.",
    primaryCta: { text: "Notify Me", href: "/products?category=spices" },
    secondaryCta: { text: "Explore Range", href: "/products" },
    image: "/hero2.png",
    features: ["Quality-Focused Products", "Growing Product Range", "Quality You Can Trust"],
  },
];

const tickerItems = [
  "Materials",
  "Recyclable at Home",
  "Made from Renewable Resources",
  "Biodegradable",
  "Compostable Packaging",
  "Eco-Friendly Materials",
  "Recyclable at Home",
  "Made from Renewable Resources",
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Drag / Swipe tracking states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  // Auto-play control with pause on hover support
  useEffect(() => {
    if (!isPaused && !isDragging) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, isDragging, nextSlide]);

  // Touch & Mouse Drag Handlers for "slide to scroll"
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const currentX = clientX;
    const diff = currentX - startX;
    setCurrentTranslate(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 50; // Minimum swipe distance to trigger slide change

    if (currentTranslate < -threshold && currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else if (currentTranslate > threshold && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
    setCurrentTranslate(0);
  };

  return (
    <section 
      className="relative w-full bg-[#faeedc] overflow-hidden select-none border-b border-stone-300/40"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Full-Width Main Carousel Container with Drag / Touch Support */}
      <div 
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        <div 
          className="flex transition-transform duration-700 ease-out will-change-transform"
          style={{ 
            transform: `translateX(calc(-${currentSlide * 100}% + ${isDragging ? currentTranslate : 0}px))` 
          }}
        >
          {slides.map((slide) => (
            <div 
              key={slide.id} 
              className="w-full shrink-0 grow-0 basis-full py-12 sm:py-12 md:py-26 lg:py-25 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 flex items-center"
            >
              <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Text Column */}
                <div className="lg:col-span-7 flex flex-col justify-center z-10 pr-0 lg:pr-8 order-2 lg:order-1">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 self-start px-3.5 py-1.5 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-semibold tracking-wider mb-4 sm:mb-5 shadow-2xs">
                    <Sparkles className="size-3.5" />
                    {slide.badge}
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-[#1C3516] tracking-tight leading-[1.15] sm:leading-[1.1]">
                    {slide.title}
                  </h1>
                  
                  <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg lg:text-xl text-stone-700 max-w-xl leading-relaxed font-sans">
                    {slide.subtitle}
                  </p>

                  {/* CTAs */}
                  <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
                    <Link
                      href={slide.primaryCta.href}
                      className="rounded-xl bg-[#1C3516] px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-medium text-amber-50 shadow-md transition-all hover:bg-[#274a20] hover:shadow-lg active:scale-95 text-center"
                    >
                      {slide.primaryCta.text}
                    </Link>
                    <Link
                      href={slide.secondaryCta.href}
                      className="px-4 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-medium text-stone-800 underline underline-offset-4 transition-colors hover:text-[#1C3516]"
                    >
                      {slide.secondaryCta.text}
                    </Link>
                  </div>

                  {/* Feature Checkpoints */}
                  <div className="mt-10 sm:mt-14 pt-6 border-t border-stone-400/30 flex flex-wrap gap-4 sm:gap-6 md:gap-8 text-xs md:text-sm font-medium text-stone-700">
                    {slide.features.map((feature, idx) => (
                      <span key={idx} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#1C3516] shrink-0"></span>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Image Column */}
                <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2">
                  <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg aspect-[4/3] flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#1C3516]/10 rounded-full blur-3xl -z-10 transform scale-90"></div>
                    <img
                      src={slide.image}
                      alt={slide.title}
                      draggable={false}
                      className="max-h-[240px] sm:max-h-[320px] md:max-h-[400px] lg:max-h-[480px] w-auto object-contain drop-shadow-xl transition-transform duration-700 hover:scale-105 pointer-events-none"
                    />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Controls & Pagination Bar */}
      <div className="w-full bg-[#faeedc]/80 backdrop-blur-xs pb-6 sm:pb-10 pt-2 px-4 sm:px-8 md:px-16 lg:px-24 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-2 sm:p-2.5 rounded-full bg-[#1C3516]/10 text-[#1C3516] hover:bg-[#1C3516] hover:text-amber-50 transition-colors cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 sm:p-2.5 rounded-full bg-[#1C3516]/10 text-[#1C3516] hover:bg-[#1C3516] hover:text-amber-50 transition-colors cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Indicator Dots */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === index ? "w-8 sm:w-10 bg-[#1C3516]" : "w-2 sm:w-2.5 bg-stone-400/60 hover:bg-stone-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Spacer to balance flex layout */}
        <div className="hidden sm:block w-20"></div>
      </div>

      {/* Bottom Infinite Scrolling Ticker Tape */}
      <div className="w-full bg-[#1C3516] py-3 sm:py-3.5 overflow-hidden whitespace-nowrap shadow-inner">
        <div className="inline-flex animate-marquee gap-8 sm:gap-12 text-[11px] sm:text-xs md:text-sm tracking-widest text-amber-100 font-medium uppercase">
          {tickerItems.concat(tickerItems).map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-3 sm:gap-4">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300/80 shrink-0"></span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}