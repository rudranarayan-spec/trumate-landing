/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Leaf, Sparkles, ArrowRight, Search, PackageOpen } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch products and categories on mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories")
        ]);

        const prodJson = await prodRes.json();
        const catJson = await catRes.json();

        if (prodJson.success) setProducts(prodJson.data);
        if (catJson.success) setCategories(catJson.data);
      } catch (err) {
        console.error("Failed to fetch catalog data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // product.category can be an object populated with slug or just an ID/string depending on your API
      const catSlug = typeof product.category === "object" ? product.category?.slug : product.category;
      
      const matchesCategory =
        selectedCategory === "all" || catSlug === selectedCategory;
      
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

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
          
          {/* Dynamic Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[#1C3516] text-amber-50 shadow-md"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              All Products ({products.length})
            </button>

            {categories.map((cat) => {
              const isSpices = cat.slug.includes("spice");
              return (
                <button
                  key={cat._id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat.slug
                      ? "bg-[#1C3516] text-amber-50 shadow-md"
                      : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  {isSpices ? <Sparkles className="size-3.5" /> : <Leaf className="size-3.5" />}
                  {cat.name} {isSpices ? "(Coming Soon)" : ""}
                </button>
              );
            })}
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

        {/* Loading / Product Grid */}
        {loading ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200">
            <p className="text-stone-500 text-sm font-sans animate-pulse">Loading live catalog from database...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200">
            <p className="text-stone-500 text-sm font-sans">No products found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const isPublished = product.status?.toLowerCase() === "published";
              const catName = typeof product.category === "object" ? product.category?.name : "Eco Packaging";
              
              return (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase ${
                          isPublished
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {isPublished ? (
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
                        {catName}
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
                    <span className="text-[11px] text-stone-400 italic">
                      {product.price ? `₹${product.price} / unit` : "B2B / Wholesale"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}