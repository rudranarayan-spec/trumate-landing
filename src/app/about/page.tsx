import Link from "next/link";
import { Leaf, Sparkles, ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full bg-[#FAF9F5] min-h-screen py-10 sm:py-14 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-5xl">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-semibold tracking-widest uppercase mb-4">
            <Leaf className="size-3.5" />
            Our Story & Mission
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#1C3516] tracking-tight mb-4 sm:mb-6 leading-tight">
            Quality for Every Kitchen, Rooted in Sustainability.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-stone-600 leading-relaxed font-sans px-2 sm:px-0">
            Trumate was founded with a single vision: to bring uncompromised purity to kitchen spices while eliminating single-use plastics through 100% biodegradable tableware.
          </p>
        </div>

        {/* Feature / Value Split Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
          
          {/* Spices Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-[#1C3516]/10 flex items-center justify-center text-[#1C3516]">
                  <Sparkles className="size-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-[#1C3516]">Pure & Authentic Spices</h3>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-stone-600 leading-relaxed font-sans">
                We source our spices directly to preserve rich aromas, natural colors, and traditional flavors. Every packet contains zero artificial coloring or chemical preservatives—just pure kitchen goodness.
              </p>
            </div>
          </div>

          {/* Tableware Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-[#1C3516]/10 flex items-center justify-center text-[#1C3516]">
                  <Leaf className="size-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-[#1C3516]">100% Biodegradable Products</h3>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-stone-600 leading-relaxed font-sans">
                From areca palm leaf plates to bagasse containers and wooden cutlery, our eco-friendly disposables are designed for modern events and restaurants looking for zero-waste, plastic-free solutions.
              </p>
            </div>
          </div>

        </div>

        {/* Core Values Banner */}
        <div className="bg-[#1C3516] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-amber-50 mb-12 sm:mb-16 md:mb-20 shadow-lg">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl md:text-3xl font-serif text-amber-100 mb-2 sm:mb-3">What Drives Us Every Day</h2>
            <p className="text-xs md:text-sm text-stone-300">
              Our core principles ensure that every product leaving our warehouse meets the highest standards of ethics and quality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-10 w-10 mx-auto rounded-full bg-white/10 flex items-center justify-center text-amber-200 mb-4">
                <ShieldCheck className="size-5" />
              </div>
              <h4 className="font-serif font-medium text-base mb-1 text-amber-100">Uncompromising Quality</h4>
              <p className="text-xs text-stone-300 leading-relaxed">Rigorous testing on all food-service items and spices.</p>
            </div>
            <div className="text-center">
              <div className="h-10 w-10 mx-auto rounded-full bg-white/10 flex items-center justify-center text-amber-200 mb-4">
                <Leaf className="size-5" />
              </div>
              <h4 className="font-serif font-medium text-base mb-1 text-amber-100">Eco-Responsibility</h4>
              <p className="text-xs text-stone-300 leading-relaxed">Committed to protecting nature with zero plastic waste.</p>
            </div>
            <div className="text-center">
              <div className="h-10 w-10 mx-auto rounded-full bg-white/10 flex items-center justify-center text-amber-200 mb-4">
                <HeartHandshake className="size-5" />
              </div>
              <h4 className="font-serif font-medium text-base mb-1 text-amber-100">Customer First</h4>
              <p className="text-xs text-stone-300 leading-relaxed">Dedicated support for homes, restaurants, and wholesale buyers.</p>
            </div>
          </div>
        </div>

        {/* Call to Action Footer */}
        <div className="text-center px-2 sm:px-0">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#1C3516] mb-3 sm:mb-4">Ready to make the switch to sustainable living?</h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-6 sm:mb-8 font-sans">
            Explore our range of pure kitchen spices and biodegradable tableware today.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1C3516] text-amber-50 px-8 py-3.5 rounded-xl text-sm font-medium shadow-md transition-all hover:bg-[#274a20]"
            >
              Explore Products
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-stone-900 border border-stone-300 px-8 py-3.5 rounded-xl text-sm font-medium transition-all hover:bg-stone-50"
            >
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}