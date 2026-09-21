"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqList = [
  {
    id: "01",
    question: "What kinds of masalas do you sell?",
    answer: "We offer an authentic selection of pure ground spices, whole spices, and signature kitchen spice blends sourced directly to ensure rich aroma, natural color, and traditional flavor profiles.",
  },
  {
    id: "02",
    question: "How fresh are your spices, and what's the shelf life?",
    answer: "Our spices are hygienically packed in small batches to preserve volatile oils and freshness. They typically feature a shelf life of 12 months when stored in a cool, dry place away from direct sunlight.",
  },
  {
    id: "03",
    question: "Are your spices free from additives and preservatives?",
    answer: "Yes, 100%. Our entire range contains zero artificial coloring, chemical preservatives, or fillers, ensuring pure, unadulterated quality for your kitchen.",
  },
  {
    id: "04",
    question: "What biodegradable tableware do you offer?",
    answer: "We provide an extensive range of eco-conscious disposables including areca leaf plates, bagasse (sugarcane pulp) containers, bowls, compartment trays, and natural wooden cutlery suitable for all events.",
  },
  {
    id: "05",
    question: "Are your biodegradable plates and spoons truly eco-friendly?",
    answer: "Absolutely. Our tableware is made from fallen palm leaves or renewable agricultural plant waste, meaning they are 100% biodegradable and compostable, returning safely to the earth without leaving microplastics.",
  },
  {
    id: "06",
    question: "How durable are your biodegradable spoons and plates?",
    answer: "They are sturdy, leak-proof, and designed to handle both hot and cold foods effortlessly. Unlike flimsy paper alternatives, our items won't get soggy easily during meals.",
  },
  {
    id: "07",
    question: "What sizes of biodegradable plates do you stock?",
    answer: "We stock multiple sizes ranging from small snack bowls and 6-inch dessert plates to full-sized 10-inch dinner plates and multi-compartment catering trays.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#FAF9F5] py-20 px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-4xl">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#1C3516] uppercase mb-3">
            <span className="h-px w-6 bg-[#1C3516]/40"></span>
            EcoSpice & Tableware
            <span className="h-px w-6 bg-[#1C3516]/40"></span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1C3516] tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm md:text-base text-stone-600 max-w-lg mx-auto leading-relaxed">
            Everything you need to know about our spices, sustainable tableware, and eco-friendly products.
          </p>
        </div>

        {/* FAQ Container Box */}
        <div className="rounded-2xl bg-white shadow-md border border-stone-200/60 overflow-hidden">
          
          {/* Box Header Banner */}
          <div className="bg-[#1C3516] px-6 py-5 md:px-8 text-amber-50">
            <h3 className="text-base md:text-lg font-serif font-medium tracking-wide">
              Spices & Sustainable Living
            </h3>
            <p className="text-[11px] md:text-xs tracking-wider text-amber-200/80 font-medium uppercase mt-1">
              Fresh Spices · Biodegradable Tableware · Eco-Conscious Living
            </p>
          </div>

          {/* Accordion List */}
          <div className="divide-y divide-stone-200/70">
            {faqList.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.id} className="transition-colors hover:bg-stone-50/50">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between px-6 py-5 md:px-8 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4 pr-4">
                      <span className="text-xs font-mono text-stone-400 font-semibold">
                        {faq.id}
                      </span>
                      <span className="text-sm md:text-base font-medium text-stone-800">
                        {faq.question}
                      </span>
                    </div>
                    
                    {/* Toggle Icon Button */}
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen ? "bg-[#1C3516] text-amber-100" : "bg-amber-100/70 text-[#1C3516] hover:bg-amber-200"
                    }`}>
                      {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </div>
                  </button>

                  {/* Accordion Expandable Answer Body */}
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 md:px-8 md:pb-6 pl-12 md:pl-14 text-xs md:text-sm text-stone-600 leading-relaxed font-sans">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}