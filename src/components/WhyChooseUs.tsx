import { ShieldCheck, CreditCard, Truck, Headphones, PackageCheck, Leaf } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description: "Carefully tested, plant-based products sourced from certified sustainable manufacturers.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Safe and trusted online payment options with instant checkout protection.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Reliable, green-routed delivery across supported business and residential locations.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "We're available when you need guidance on bulk sizing or eco-alternatives.",
  },
  {
    icon: PackageCheck,
    title: "Bulk Orders",
    description: "Special wholesale pricing and plastic-free packaging for institutions and events.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden bg-stone-900">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src="/bg-2.webp"
          alt="Eco friendly background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-12 lg:px-20">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-amber-100 text-xs font-semibold tracking-widest uppercase mb-4">
            <Leaf className="size-3.5" />
            Why Choose Us
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white tracking-tight mb-3 md:mb-4">
            Why Shop With Us?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-stone-300 leading-relaxed font-sans">
            We&apos;re committed to providing you with the best sustainable shopping experience possible. Here&apos;s why thousands of eco-conscious customers and businesses trust us.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-[#FAF9F5]/95 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between shadow-xl border border-white/20 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white"
              >
                <div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#1C3516]/10 text-[#1C3516] mb-4 md:mb-5">
                    <IconComponent className="size-6" />
                  </div>
                  <h3 className="text-base md:text-lg font-serif font-medium text-stone-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-stone-600 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}