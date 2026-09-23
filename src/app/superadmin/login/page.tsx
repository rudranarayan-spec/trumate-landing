"use client";

import { useState } from "react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Lock, Mail, ShieldAlert } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdminAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(email, password);
    if (!success) {
      setError("Invalid email or password. Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-[#FAF9F5]">
      <div className="w-full max-w-md bg-white rounded-3xl border border-stone-200 shadow-xl p-8 md:p-10">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-[#1C3516]/10 text-[#1C3516] mb-3">
            <Lock className="size-6" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#1C3516]">Superadmin Portal</h1>
          <p className="text-xs text-stone-500 mt-1">Enter your credentials to access the management console</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <ShieldAlert className="size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 size-4 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@trumate.com"
                className="w-full rounded-xl border border-stone-300 bg-stone-50 pl-10 pr-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1C3516]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 size-4 text-stone-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-stone-300 bg-stone-50 pl-10 pr-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1C3516]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#1C3516] text-white text-sm font-medium shadow-md transition-all hover:bg-[#274a20]"
          >
            Sign In to Dashboard
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-stone-400">
          Protected Environment Configuration
        </div>

      </div>
    </div>
  );
}