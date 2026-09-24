import { Star, Quote, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Vikram Malhotra",
    role: "Restaurant Owner",
    content: "Switching our takeaway packaging to Trumate's biodegradable containers was the best decision we made. Our customers love the eco-conscious touch, and they are surprisingly sturdy!",
    rating: 5,
    verified: "Verified Bulk Buyer",
  },
  {
    id: 2,
    name: "Ananya Sharma",
    role: "Event Planner",
    content: "We used their areca leaf plates and wooden cutlery for a major corporate eco-event. The quality was top-notch, elegant, and completely zero-waste. Highly recommended!",
    rating: 5,
    verified: "Verified Customer",
  },
  {
    id: 3,
    name: "Rajesh Patel",
    role: "Catering Service Director",
    content: "Finding reliable wholesale pricing for sustainable disposables used to be tough until we found Trumate. Great quality, fast delivery, and fantastic customer support.",
    rating: 5,
    verified: "Verified Wholesale Client",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-[#FAF9F5] py-12 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-stone-200/60">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] text-[#1C3516] uppercase mb-3">
            <Quote className="size-3.5" />
            Client Reviews
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#1C3516] tracking-tight mb-3 md:mb-4">
            Trusted by kitchens & green businesses.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-stone-600 leading-relaxed font-sans">
            Here is what our customers and partners have to say about our sustainable tableware and eco-friendly products.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white/80 border border-stone-300/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs transition-all duration-300 hover:shadow-md"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4 md:mb-5 text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm md:text-base text-stone-700 leading-relaxed font-sans mb-6 md:mb-8">
                  &quot;{item.content}&quot;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 md:pt-5 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-serif font-semibold text-stone-900">
                    {item.name}
                  </h4>
                  <p className="text-xs text-stone-500 font-sans">
                    {item.role}
                  </p>
                </div>
                {/* <div className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1C3516] bg-[#1C3516]/10 px-2.5 py-1 rounded-full shrink-0">
                  <CheckCircle2 className="size-3" />
                  <span>{item.verified}</span>
                </div> */}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}