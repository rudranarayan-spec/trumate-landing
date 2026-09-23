"use client";

import { useState } from "react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { LayoutDashboard, FolderTree, Package, LogOut, Plus, Trash2, Edit } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: string;
}

export default function AdminDashboardPage() {
  const { logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<"categories" | "products">("categories");

  // Mock State for Categories
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Sustainable Tableware", slug: "sustainable-tableware" },
    { id: "2", name: "Pure Spices", slug: "pure-spices" },
  ]);
  const [newCatName, setNewCatName] = useState("");

  // Mock State for Products
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Areca Leaf Plates (Pack of 25)", category: "Sustainable Tableware", price: "$14.99", stock: "120" },
    { id: "2", name: "Organic Kashmiri Chilli Powder", category: "Pure Spices", price: "$8.50", stock: "85" },
  ]);
  const [newProdName, setNewProdName] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("Sustainable Tableware");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdStock, setNewProdStock] = useState("");

  // Handlers for Categories
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const newCat: Category = {
      id: Date.now().toString(),
      name: newCatName,
      slug: newCatName.toLowerCase().replace(/\s+/g, "-"),
    };
    setCategories([...categories, newCat]);
    setNewCatName("");
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  // Handlers for Products
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdPrice.trim()) return;
    const newProd: Product = {
      id: Date.now().toString(),
      name: newProdName,
      category: newProdCategory,
      price: newProdPrice,
      stock: newProdStock || "0",
    };
    setProducts([...products, newProd]);
    setNewProdName("");
    setNewProdPrice("");
    setNewProdStock("");
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((prod) => prod.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAF9F5]">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-stone-200 p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="size-9 rounded-xl bg-[#1C3516] text-white flex items-center justify-center font-bold">
              T
            </div>
            <div>
              <h2 className="font-serif font-bold text-[#1C3516] leading-tight">Trumate Admin</h2>
              <span className="text-[10px] text-stone-400 uppercase tracking-widest">Management Panel</span>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("categories")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium transition-all ${
                activeTab === "categories"
                  ? "bg-[#1C3516] text-white shadow-md"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              <FolderTree className="size-4" />
              Manage Categories
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium transition-all ${
                activeTab === "products"
                  ? "bg-[#1C3516] text-white shadow-md"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              <Package className="size-4" />
              Manage Products
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-stone-200">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="size-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200">
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1C3516]">
                {activeTab === "categories" ? "Category Management" : "Product Inventory"}
              </h1>
              <p className="text-xs text-stone-500 mt-1">
                {activeTab === "categories" ? "Add and organize catalog categories" : "Add products and assign them to active categories"}
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-semibold self-start">
              Live Session Active
            </div>
          </div>

          {/* CATEGORIES TAB VIEW */}
          {activeTab === "categories" && (
            <div className="space-y-8">
              {/* Add Category Form */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-[#1C3516] mb-4">Add New Category</h3>
                <form onSubmit={handleAddCategory} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Category Name (e.g., Organic Spices)"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="flex-1 rounded-xl border border-stone-300 px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#1C3516]"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#1C3516] text-white text-xs font-medium hover:bg-[#274a20]"
                  >
                    <Plus className="size-4" /> Add Category
                  </button>
                </form>
              </div>

              {/* Categories Table List */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider">
                      <th className="p-4">ID</th>
                      <th className="p-4">Category Name</th>
                      <th className="p-4">Slug</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {categories.map((cat) => (
                      <tr key={cat.id} className="hover:bg-stone-50/50">
                        <td className="p-4 font-mono text-stone-400">{cat.id}</td>
                        <td className="p-4 font-semibold text-[#1C3516]">{cat.name}</td>
                        <td className="p-4 font-mono text-stone-500">{cat.slug}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Category"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {categories.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-stone-400">No categories found. Add one above.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PRODUCTS TAB VIEW */}
          {activeTab === "products" && (
            <div className="space-y-8">
              {/* Add Product Form */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-[#1C3516] mb-4">Add New Product Under Category</h3>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="rounded-xl border border-stone-300 px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#1C3516]"
                  />
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="rounded-xl border border-stone-300 px-4 py-2.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1C3516]"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Price (e.g., $12.99)"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="rounded-xl border border-stone-300 px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#1C3516]"
                  />
                  <input
                    type="text"
                    placeholder="Stock Qty"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    className="rounded-xl border border-stone-300 px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#1C3516]"
                  />
                  <div className="sm:col-span-2 lg:col-span-4 flex justify-end mt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#1C3516] text-white text-xs font-medium hover:bg-[#274a20]"
                    >
                      <Plus className="size-4" /> Add Product
                    </button>
                  </div>
                </form>
              </div>

              {/* Products Table List */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider">
                      <th className="p-4">Product Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-stone-50/50">
                        <td className="p-4 font-semibold text-[#1C3516]">{prod.name}</td>
                        <td className="p-4">
                          <span className="inline-flex px-2.5 py-1 rounded-full bg-[#1C3516]/10 text-[#1C3516] font-medium text-[10px]">
                            {prod.category}
                          </span>
                        </td>
                        <td className="p-4 font-mono font-medium text-stone-700">{prod.price}</td>
                        <td className="p-4 font-mono text-stone-500">{prod.stock} units</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-stone-400">No products found. Add one above.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}