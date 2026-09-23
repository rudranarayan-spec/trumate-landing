/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Building2, CheckCircle2, Send, Loader2, ShieldCheck, Sparkles, Package } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import CategorySelect from "@/components/CategorySelect";

export default function BulkOrdersPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loadingCatalog, setLoadingCatalog] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "restaurant",
    selectedCategory: "",
    productInterest: "",
    quantity: "",
    message: "",
  });

  const [status, setStatus] = useState<{
    submitting: boolean;
    success: boolean;
    error: string | null;
  }>({
    submitting: false,
    success: false,
    error: null,
  });

  // Fetch categories and products on mount
  useEffect(() => {
    async function fetchCatalog() {
      try {
        setLoadingCatalog(true);
        const [catRes, prodRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/products")
        ]);

        const catJson = await catRes.json();
        const prodJson = await prodRes.json();

        if (catJson.success && catJson.data.length > 0) {
          setCategories(catJson.data);
          const defaultCatId = catJson.data[0]._id;

          if (prodJson.success && prodJson.data.length > 0) {
            setProducts(prodJson.data);

            // Filter products belonging to the initial default category
            const initialProds = prodJson.data.filter((p: any) => {
              const catId = typeof p.category === "object" ? p.category?._id : p.category;
              return catId === defaultCatId;
            });

            setFormData((prev) => ({
              ...prev,
              selectedCategory: defaultCatId,
              productInterest: initialProds[0]?.name || prodJson.data[0]?.name || "",
            }));
          }
        }
      } catch (err) {
        console.error("Failed to load catalog data", err);
      } finally {
        setLoadingCatalog(false);
      }
    }

    fetchCatalog();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler when user changes the category dropdown
  const handleCategoryChange = (catId: string) => {
    const matchingProducts = products.filter((p) => {
      const cId = typeof p.category === "object" ? p.category?._id : p.category;
      return cId === catId;
    });

    setFormData({
      ...formData,
      selectedCategory: catId,
      productInterest: matchingProducts[0]?.name || "",
    });
  };

  // Dedicated handler for the custom product interest dropdown
  const handleProductChange = (productName: string) => {
    setFormData({ ...formData, productInterest: productName });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      const response = await fetch("/api/bulk-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      setStatus({ submitting: false, success: true, error: null });
      // Reset form fields while preserving initial category/product defaults
      const defaultCatId = categories[0]?._id || "";
      const defaultProds = products.filter((p) => {
        const cId = typeof p.category === "object" ? p.category?._id : p.category;
        return cId === defaultCatId;
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        businessType: "restaurant",
        selectedCategory: defaultCatId,
        productInterest: defaultProds[0]?.name || "",
        quantity: "",
        message: "",
      });
    } catch (err: any) {
      setStatus({ submitting: false, success: false, error: err.message });
    }
  };

  // Filter products for the CustomSelect based on active category
  const filteredProductsForSelect = products.filter((p) => {
    const cId = typeof p.category === "object" ? p.category?._id : p.category;
    return cId === formData.selectedCategory;
  });

  return (
    <div className="w-full bg-[#FAF9F5] min-h-screen py-16 px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-semibold tracking-widest uppercase mb-4">
            <Building2 className="size-3.5" />
            Wholesale & Partnerships
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#1C3516] tracking-tight mb-4">
            Bulk Orders, Made Simple.
          </h1>
          <p className="text-sm md:text-base text-stone-600 leading-relaxed font-sans">
            Equip your restaurant, café, catering business, or upcoming event with 100% biodegradable tableware and pure spices at exclusive wholesale pricing.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/80 border border-stone-300/60 rounded-2xl p-6 shadow-2xs">
            <div className="h-10 w-10 rounded-xl bg-[#1C3516]/10 flex items-center justify-center text-[#1C3516] mb-4">
              <Sparkles className="size-5" />
            </div>
            <h3 className="font-serif font-medium text-lg text-stone-900 mb-1">Wholesale Pricing</h3>
            <p className="text-xs text-stone-600 leading-relaxed">Tiered discounts starting from 10% to 25% off regular retail pricing for larger volumes.</p>
          </div>
          <div className="bg-white/80 border border-stone-300/60 rounded-2xl p-6 shadow-2xs">
            <div className="h-10 w-10 rounded-xl bg-[#1C3516]/10 flex items-center justify-center text-[#1C3516] mb-4">
              <Package className="size-5" />
            </div>
            <h3 className="font-serif font-medium text-lg text-stone-900 mb-1">Priority Fulfillment</h3>
            <p className="text-xs text-stone-600 leading-relaxed">Dedicated batch packaging and priority delivery pipelines so your business never runs low.</p>
          </div>
          <div className="bg-white/80 border border-stone-300/60 rounded-2xl p-6 shadow-2xs">
            <div className="h-10 w-10 rounded-xl bg-[#1C3516]/10 flex items-center justify-center text-[#1C3516] mb-4">
              <ShieldCheck className="size-5" />
            </div>
            <h3 className="font-serif font-medium text-lg text-stone-900 mb-1">Custom Requirements</h3>
            <p className="text-xs text-stone-600 leading-relaxed">Tailored box sizes, recurring auto-shipments, and dedicated account support for high-volume accounts.</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-8 md:p-12">
          <h2 className="text-2xl font-serif text-[#1C3516] mb-2">Request a Wholesale Quote</h2>
          <p className="text-xs md:text-sm text-stone-500 mb-8 font-sans">
            Fill out the details below, and our corporate desk will email you a custom quotation and payment link within 24 hours.
          </p>

          {status.success ? (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center flex flex-col items-center justify-center">
              <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
                <CheckCircle2 className="size-8" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-emerald-900 mb-1">Bulk Order Inquiry Sent!</h3>
              <p className="text-xs md:text-sm text-emerald-700 max-w-md mb-6">
                Thank you! Your details have been emailed directly to our admin desk. We will review your requirements and get back to you shortly.
              </p>
              <button
                onClick={() => setStatus({ submitting: false, success: false, error: null })}
                className="bg-[#1C3516] text-amber-50 px-6 py-2.5 rounded-xl text-xs font-medium hover:bg-[#274a20]"
              >
                Submit Another Request
              </button>
            </div>
          ) : loadingCatalog ? (
            <div className="py-16 text-center text-stone-500 text-xs animate-pulse">
              Loading catalog options from database...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status.error && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-xs text-red-700">
                  {status.error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none focus:border-[#1C3516] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="rahul@restaurant.com"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none focus:border-[#1C3516] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none focus:border-[#1C3516] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Business / Organization Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="GreenLeaf Catering Co."
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none focus:border-[#1C3516] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Business Type
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none focus:border-[#1C3516] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="restaurant">Restaurant / Café</option>
                    <option value="caterer">Catering Service</option>
                    <option value="event">Event Planner / Wedding Organizer</option>
                    <option value="retail">Retail Store / Distributor</option>
                    <option value="other">Other Institution</option>
                  </select>
                </div>

                {/* Database Category Dropdown */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Product Category
                  </label>
                  <CategorySelect
                    categories={categories}
                    value={formData.selectedCategory}
                    onChange={handleCategoryChange}
                  />
                </div>

                {/* Custom Animated Product Dropdown */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Product Interest
                  </label>
                  <CustomSelect
                    products={filteredProductsForSelect}
                    value={formData.productInterest}
                    onChange={handleProductChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  Estimated Quantity / Monthly Requirement *
                </label>
                <input
                  type="text"
                  name="quantity"
                  required
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 500 plates per month / 50 packs"
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none focus:border-[#1C3516] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  Additional Details or Delivery Timeline
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your specific requirements, event date, or delivery location..."
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none focus:border-[#1C3516] focus:bg-white transition-all"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status.submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1C3516] text-amber-50 px-8 py-4 rounded-xl text-sm font-medium shadow-md transition-all hover:bg-[#274a20] disabled:opacity-50 cursor-pointer"
              >
                {status.submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending Inquiry...
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Submit Bulk Order Request
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
