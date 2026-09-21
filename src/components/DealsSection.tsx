import Link from "next/link";
import { Tag, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";

export default function DealsSection() {
  return (
    <section className="w-full bg-[#FAF9F5] py-16 md:py-24 px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#1C3516] uppercase mb-2">
              <Tag className="size-3.5" />
              Today&apos;s Deals
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1C3516] tracking-tight">
              Stock up while the price is right.
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-sm leading-relaxed">
            Handpicked discounts on sustainable disposables and kitchen essentials — refreshed regularly, gone once they&apos;re gone.
          </p>
        </div>

        {/* Two Banner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
          
          {/* Left Card: Biodegradable Tableware Combo */}
          <div className="relative group overflow-hidden rounded-2xl bg-stone-900 aspect-[16/10] md:aspect-[4/3] flex flex-col justify-end p-8 md:p-10 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
            {/* Background Image Placeholder (Replace with your asset) */}
            <div className="absolute inset-0 bg-stone-800 transition-transform duration-700 group-hover:scale-105">
              <img 
                src="/catalog1.webp" 
                alt="Biodegradable Tableware Pack" 
                className="w-full h-full object-cover opacity-80"
              />
            </div>

            {/* Content Overlay */}
            <div className="relative z-20">
              <span className="inline-block bg-white/20 backdrop-blur-md text-amber-100 text-[11px] font-semibold tracking-widest px-3 py-1 rounded-full uppercase mb-3">
                Eco Bundle
              </span>
              <div className="text-3xl md:text-4xl lg:text-5xl font-serif text-white font-bold tracking-tight mb-2">
                15% <span className="text-xl md:text-2xl font-sans font-normal text-amber-200">OFF</span>
              </div>
              <h3 className="text-lg md:text-xl font-medium text-amber-50 mb-1">
                Green Tableware Starter Pack
              </h3>
              <p className="text-xs md:text-sm text-stone-300 mb-6 max-w-sm">
                Compostable plates, bowls & wooden cutlery. The more you stock, the more you save.
              </p>
              <Link
                href="/products?category=biodegradables"
                className="inline-flex items-center gap-2 bg-white text-stone-900 px-5 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all hover:bg-amber-100 shadow-sm"
              >
                Grab the Deal
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Right Card: Bulk Eco Disposables */}
          <div className="relative group overflow-hidden rounded-2xl bg-stone-900 aspect-[16/10] md:aspect-[4/3] flex flex-col justify-end p-8 md:p-10 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
            {/* Background Image Placeholder (Replace with your asset) */}
            <div className="absolute inset-0 bg-stone-800 transition-transform duration-700 group-hover:scale-105">
              <img 
                src="/catalog2.webp" 
                alt="Bulk Event Disposables" 
                className="w-full h-full object-cover opacity-80"
              />
            </div>

            {/* Content Overlay */}
            <div className="relative z-20">
              <span className="inline-block bg-white/20 backdrop-blur-md text-amber-100 text-[11px] font-semibold tracking-widest px-3 py-1 rounded-full uppercase mb-3">
                Disposables Bulk
              </span>
              <div className="text-3xl md:text-4xl lg:text-5xl font-serif text-white font-bold tracking-tight mb-2">
                20% <span className="text-xl md:text-2xl font-sans font-normal text-amber-200">OFF</span>
              </div>
              <h3 className="text-lg md:text-xl font-medium text-amber-50 mb-1">
                Party & Event Eco Pack
              </h3>
              <p className="text-xs md:text-sm text-stone-300 mb-6 max-w-sm">
                100% plant-based cups, trays & containers designed for zero-waste catering.
              </p>
              <Link
                href="/bulk-orders"
                className="inline-flex items-center gap-2 bg-white text-stone-900 px-5 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all hover:bg-amber-100 shadow-sm"
              >
                Grab the Deal
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Tiered Discount Banner */}
        <div className="w-full bg-[#1C3516] rounded-2xl p-6 md:p-8 text-amber-50 shadow-md">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Left Info */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100/10 text-amber-200">
                <Sparkles className="size-5" />
              </div>
              <div>
                <h4 className="text-base md:text-lg font-serif font-medium text-amber-100">
                  Buy more & save on biodegradable essentials
                </h4>
                <p className="text-xs md:text-sm text-stone-300">
                  Stock your green kitchen or upcoming eco-friendly event in one simple order.
                </p>
              </div>
            </div>

            {/* Right Tiers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
              <div className="bg-[#24461d] border border-stone-600/40 rounded-xl px-4 py-3 flex items-center justify-between gap-6">
                <span className="text-xs text-stone-300">Buy 2 packs</span>
                <span className="bg-white/10 text-amber-200 text-xs font-semibold px-2.5 py-1 rounded-md">Save 5%</span>
              </div>
              <div className="bg-[#24461d] border border-stone-600/40 rounded-xl px-4 py-3 flex items-center justify-between gap-6">
                <span className="text-xs text-stone-300">Buy 5 packs</span>
                <span className="bg-white/10 text-amber-200 text-xs font-semibold px-2.5 py-1 rounded-md">Save 10%</span>
              </div>
              <div className="bg-[#24461d] border border-stone-600/40 rounded-xl px-4 py-3 flex items-center justify-between gap-6">
                <span className="text-xs text-stone-300">Buy 10+ packs</span>
                <span className="bg-amber-200 text-[#1C3516] text-xs font-bold px-2.5 py-1 rounded-md">Save 15%</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}