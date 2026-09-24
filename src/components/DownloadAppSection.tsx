import Link from "next/link";
import { Download, Smartphone, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

export default function AppDownloadSection() {
  return (
    <section className="w-full bg-[#FAF9F5] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-stone-200/60 overflow-hidden">
      <div className="mx-auto max-w-7xl">

        {/* Main Banner Box */}
        <div className="relative rounded-3xl bg-[#f4ebd0] border border-stone-300/60 p-6 sm:p-8 md:p-12 lg:p-16 shadow-xl overflow-hidden">

          {/* Subtle Decorative Background Blob */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-[#1C3516]/5 blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">

            {/* Left Content Area */}
            <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-semibold tracking-wider mb-4 sm:mb-5">
                <Smartphone className="size-3.5" />
                Trumate Mobile App
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#1C3516] tracking-tight leading-[1.15] mb-4 sm:mb-5">
                Order our eco-products anytime, anywhere.
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-stone-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans mb-6 sm:mb-8">
                Experience faster checkouts, exclusive app-only deals on sustainable tableware and pure spices, and real-time order tracking right from your pocket.
              </p>

              {/* Action Button */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <Link
                  href="/download/trumate-app.apk"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-[#1C3516] px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-medium text-amber-50 shadow-md transition-all hover:bg-[#274a20] hover:shadow-lg active:scale-95"
                >
                  <Download className="size-5 text-amber-200" />
                  Download App Now
                </Link>
                <span className="text-xs text-stone-500 font-medium">
                  Direct Download • Secure & Safe
                </span>
              </div>

              {/* Feature Points */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-stone-400/30 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs font-medium text-stone-700">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-[#1C3516]" />
                  Verified Secure APK
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="size-4 text-[#1C3516]" />
                  Lightning Fast Ordering
                </span>
              </div>
            </div>

            {/* Right Mockup Area: Custom Pure Tailwind Phone Frame */}
            <div className="lg:col-span-5 flex items-center justify-center mt-4 lg:mt-0">
              <div className="relative w-full max-w-[220px] sm:max-w-[250px] lg:max-w-[270px] flex items-center justify-center">

                {/* Ambient background glow */}
                <div className="absolute inset-0 bg-[#1C3516]/10 rounded-full blur-3xl -z-10 transform scale-90"></div>

                {/* Phone Outer Shell */}
                <div className="relative w-full aspect-[9/19] rounded-[38px] sm:rounded-[42px] bg-white border-[7px] sm:border-[8px] border-white shadow-2xl ring-1 ring-stone-900/10 flex flex-col overflow-hidden">
                  
                  {/* Phone Speaker / Camera Notch Pill */}
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-3.5 sm:h-4 bg-stone-100 rounded-full z-20 flex items-center justify-center">
                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-stone-200 mr-2"></div>
                    <div className="w-6 sm:w-8 h-1 bg-stone-300 rounded-full"></div>
                  </div>

                  {/* Phone Screen Viewport Content */}
                  <div className="relative flex-1 bg-[#FAF9F5] rounded-[30px] sm:rounded-[34px] flex flex-col items-center justify-center p-5 sm:p-6 text-center overflow-hidden pt-10">
                    
                    {/* Brand Logo Container */}
                    <div className="h-14 w-14 sm:h-20 sm:w-20 rounded-2xl bg-white shadow-sm border border-stone-200/80 flex items-center justify-center mb-3 sm:mb-4 p-3 transition-transform hover:scale-105">
                      <Image
                        src="/logo.png"
                        alt="Trumate Logo"
                        width={100}
                        height={100}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <h3 className="text-base sm:text-lg font-serif font-semibold text-[#1C3516] mb-1">
                      Trumate App
                    </h3>

                    <p className="text-[11px] sm:text-xs text-stone-600 max-w-[160px] sm:max-w-[170px] leading-relaxed mb-4 sm:mb-5">
                      Get instant access to wholesale pricing and green disposables.
                    </p>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-[10px] font-semibold tracking-wider uppercase">
                      Download now
                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}