"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Sparkles, Leaf } from "lucide-react";
import { Product } from "@/data/products";

interface CustomSelectProps {
  biodegradableProducts: Product[];
  spiceProducts: Product[];
  value: string;
  onChange: (value: string) => void;
}

export default function CustomSelect({
  biodegradableProducts,
  spiceProducts,
  value,
  onChange,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find currently selected product object to display its name
  const allProducts = [...biodegradableProducts, ...spiceProducts];
  const selectedProduct = allProducts.find((p) => p.name === value) || allProducts[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between rounded-xl border bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition-all duration-200 cursor-pointer ${
          isOpen ? "border-[#1C3516] bg-white ring-2 ring-[#1C3516]/10 shadow-sm" : "border-stone-300 hover:border-stone-400"
        }`}
      >
        <span className="truncate font-medium flex items-center gap-2">
          {selectedProduct?.name}
          {selectedProduct?.category === "spices" && (
            <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">
              Coming Soon
            </span>
          )}
        </span>
        <ChevronDown
          className={`size-4 text-stone-500 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#1C3516]" : ""
          }`}
        />
      </button>

      {/* Smooth Animated Dropdown Menu Box */}
      <div
        className={`absolute left-0 right-0 top-full mt-2 z-50 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl transition-all duration-300 origin-top ${
          isOpen
            ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="max-h-72 overflow-y-auto p-2 space-y-3 custom-scrollbar">
          
          {/* Category 1: Biodegradable */}
          <div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-emerald-800 bg-emerald-50/80 rounded-lg mb-1">
              <Leaf className="size-3" />
              Biodegradable & Hospitality (Active)
            </div>
            <div className="space-y-0.5">
              {biodegradableProducts.map((product) => {
                const isSelected = value === product.name;
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      onChange(product.name);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#1C3516] text-amber-50 font-medium"
                        : "text-stone-700 hover:bg-stone-100"
                    }`}
                  >
                    <span>{product.name}</span>
                    {isSelected && <Check className="size-3.5 text-amber-300" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category 2: Spices */}
          <div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-amber-800 bg-amber-50/80 rounded-lg mb-1">
              <Sparkles className="size-3" />
              Spices (Coming Soon)
            </div>
            <div className="space-y-0.5">
              {spiceProducts.map((product) => {
                const isSelected = value === product.name;
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      onChange(product.name);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#1C3516] text-amber-50 font-medium"
                        : "text-stone-700 hover:bg-stone-100"
                    }`}
                  >
                    <span>{product.name}</span>
                    {isSelected && <Check className="size-3.5 text-amber-300" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}