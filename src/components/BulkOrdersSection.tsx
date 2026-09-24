import Link from "next/link";
import { Building2, ShoppingCart, ArrowRight } from "lucide-react";

export default function BulkOrdersSection() {
  return (
    <section className="w-full bg-[#FAF9F5] py-12 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-stone-200/60">
      <div className="mx-auto max-w-7xl">
        
        {/* Top Header Grid Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end mb-10 md:mb-14">
          
          {/* Left Title & Subtitle */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#1C3516] uppercase mb-3">
              <Building2 className="size-3.5" />
              For Businesses
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif text-[#1C3516] tracking-tight mb-3 md:mb-4">
              Bulk Orders, made simple.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-stone-600 max-w-2xl leading-relaxed font-sans">
              Restaurants, caterers, retailers and event businesses get dedicated wholesale pricing, priority packing and flexible delivery schedules — on spices and disposables alike.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-center gap-3">
            <Link
              href="/bulk-orders/checkout"
              className="inline-flex items-center justify-center gap-2.5 bg-[#1C3516] text-amber-50 px-6 py-3.5 rounded-xl text-sm font-medium shadow-md transition-all hover:bg-[#274a20] active:scale-95"
            >
              <ShoppingCart className="size-4" />
              Place Your Order
            </Link>
            <Link
              href="/bulk-orders"
              className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs md:text-sm font-medium text-stone-800 hover:text-[#1C3516] transition-colors py-1"
            >
              View bulk order details
              <ArrowRight className="size-4" />
            </Link>
          </div>

        </div>

        {/* Three Column Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: Small Business */}
          <div className="bg-white/80 border border-stone-300/70 rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xs transition-all hover:shadow-md">
            <div>
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h3 className="text-base sm:text-lg md:text-xl font-serif font-medium text-[#1C3516]">
                  Small Business
                </h3>
              </div>
              <div className="h-px w-full bg-stone-200 mb-4 md:mb-5"></div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 md:mb-8 font-sans">
                For cafes & small kitchens placing regular repeat orders.
              </p>
            </div>
            <div>
              <span className="inline-block bg-[#1C3516] text-amber-50 text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-2xs">
                Save up to 10%
              </span>
            </div>
          </div>

          {/* Card 2: Restaurants & Caterers */}
          <div className="bg-white/80 border border-stone-300/70 rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xs transition-all hover:shadow-md">
            <div>
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h3 className="text-base sm:text-lg md:text-xl font-serif font-medium text-[#1C3516]">
                  Restaurants & Caterers
                </h3>
              </div>
              <div className="h-px w-full bg-stone-200 mb-4 md:mb-5"></div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 md:mb-8 font-sans">
                Volume pricing on spices and disposables, combined into one order.
              </p>
            </div>
            <div>
              <span className="inline-block bg-[#1C3516] text-amber-50 text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-2xs">
                Save up to 15%
              </span>
            </div>
          </div>

          {/* Card 3: Events & Retail */}
          <div className="bg-white/80 border border-stone-300/70 rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xs transition-all hover:shadow-md">
            <div>
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h3 className="text-base sm:text-lg md:text-xl font-serif font-medium text-[#1C3516]">
                  Events & Retail
                </h3>
              </div>
              <div className="h-px w-full bg-stone-200 mb-4 md:mb-5"></div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 md:mb-8 font-sans">
                Large one-off or seasonal orders with dedicated support.
              </p>
            </div>
            <div>
              <span className="inline-block bg-[#1C3516] text-amber-50 text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-2xs">
                Custom pricing
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}