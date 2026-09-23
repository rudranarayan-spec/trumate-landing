/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Trash2, Edit, Package, Layers } from "lucide-react";

export default function ProductsManagementPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch products and categories from your API
  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories")
        ]);
        
        const prodJson = await prodRes.json();
        const catJson = await catRes.json();

        setProducts(prodJson.data || prodJson || []);
        setCategories(catJson.data || catJson || []);
      } catch (err) {
        console.error("Failed to load inventory data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter products based on search query and selected category
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Handle category matching whether category is an object or populated ID
    const catId = p.category?._id || p.category;
    const matchesCategory = selectedCategory === "all" || catId === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Products Management</h1>
          <p className="text-sm text-gray-500">Manage inventory, update pricing, and view stock status by category.</p>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition shadow-sm">
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            selectedCategory === "all"
              ? "bg-gray-900 text-white shadow-sm"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          All Products ({products.length})
        </button>
        {categories.map((cat) => {
          const count = products.filter((p) => (p.category?._id || p.category) === cat._id).length;
          return (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat._id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedCategory === cat._id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Search & Stats Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-sm text-gray-500 font-medium self-end sm:self-center">
          Showing: <span className="text-gray-900 font-bold">{filteredProducts.length}</span> items
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading inventory...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Package className="w-12 h-12 mx-auto text-gray-300 mb-2" />
            <p className="font-medium">No products found</p>
            <p className="text-xs text-gray-400 mt-1">Try switching categories or adjusting your search query.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-3 px-6">Product Name</th>
                  <th className="py-3 px-6">Category</th>
                  <th className="py-3 px-6">Price (₹)</th>
                  <th className="py-3 px-6">Stock</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredProducts.map((product) => {
                  // Find category name safely from either object lookup or matching ID in fetched list
                  const matchedCat = categories.find((c) => c._id === (product.category?._id || product.category));
                  const categoryName = product.category?.name || matchedCat?.name || "Uncategorized";

                  return (
                    <tr key={product._id || product.slug} className="hover:bg-gray-50/50 transition">
                      <td className="py-4 px-6 font-medium text-gray-900">{product.name}</td>
                      <td className="py-4 px-6 text-gray-600">
                        <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">
                          {categoryName}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-900 font-semibold">₹{product.price}</td>
                      <td className="py-4 px-6 text-gray-600">{product.stock} units</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          {product.status || "Published"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-1">
                        <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}