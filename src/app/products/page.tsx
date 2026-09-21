"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Leaf, Sparkles, ArrowRight, Search, PackageOpen } from "lucide-react";
import { PRODUCTS_DATA } from "@/data/products";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "biodegradable" | "spices">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full bg-[#FAF9F5] min-h-screen py-12 px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-semibold tracking-widest uppercase mb-4">
            <PackageOpen className="size-3.5" />
            Our Catalog
          </div>
          <h1 className="text-3xl md:text-5xl font-serif text-[#1C3516] tracking-tight mb-4">
            Sustainable Consumables & Kitchen Essentials
          </h1>
          <p className="text-sm md:text-base text-stone-600 leading-relaxed font-sans">
            Explore Trumate’s professional-grade eco-friendly tableware, hospitality items, and upcoming pure kitchen spices.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-stone-200 pb-6">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[#1C3516] text-amber-50 shadow-md"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              All Products ({PRODUCTS_DATA.length})
            </button>
            <button
              onClick={() => setSelectedCategory("biodegradable")}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === "biodegradable"
                  ? "bg-[#1C3516] text-amber-50 shadow-md"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              <Leaf className="size-3.5" />
              Biodegradable & Hospitality
            </button>
            <button
              onClick={() => setSelectedCategory("spices")}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === "spices"
                  ? "bg-[#1C3516] text-amber-50 shadow-md"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              <Sparkles className="size-3.5" />
              Spices (Coming Soon)
            </button>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-white pl-10 pr-4 py-2.5 text-xs text-stone-800 outline-none focus:border-[#1C3516] transition-all"
            />
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200">
            <p className="text-stone-500 text-sm font-sans">No products found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase ${
                        product.status === "active"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {product.status === "active" ? (
                        <>
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span> Active
                        </>
                      ) : (
                        <>
                          <Sparkles className="size-3" /> Coming Soon
                        </>
                      )}
                    </span>
                    <span className="text-[10px] tracking-wider uppercase text-stone-400 font-medium">
                      {product.category === "biodegradable" ? "Eco Packaging" : "Kitchen Spice"}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-medium text-[#1C3516] mb-2 group-hover:text-emerald-900 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans mb-6">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <Link
                    href="/bulk-orders"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C3516] hover:underline"
                  >
                    Request Bulk Quote
                    <ArrowRight className="size-3.5" />
                  </Link>
                  <span className="text-[11px] text-stone-400 italic">B2B / Wholesale</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}