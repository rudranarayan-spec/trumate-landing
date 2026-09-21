import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAF9F5] border-t border-stone-200 text-stone-800">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-20">
        
        {/* Top Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-14 border-b border-stone-200/80">
          
          {/* Brand Info & Mission (Spans 2 columns on large screens) */}
          <div className="lg:col-span-2 flex flex-col justify-start">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="Trumate"
                width={180}
                height={90}
                unoptimized
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-stone-600 max-w-sm leading-relaxed mb-6 font-sans">
              Bringing quality to every kitchen with authentic pure spices and sustainable, 100% biodegradable food-service packaging for a greener tomorrow.
            </p>
            
            {/* Newsletter Mini Form */}
            <div className="w-full max-w-sm">
              <span className="block text-xs font-semibold tracking-wider uppercase text-[#1C3516] mb-2">
                Stay updated on new eco-arrivals
              </span>
              <div className="flex items-center rounded-lg border border-stone-300 bg-white overflow-hidden shadow-2xs">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent px-3 py-2.5 text-xs text-stone-800 outline-none placeholder:text-stone-400"
                />
                <button
                  type="button"
                  className="bg-[#1C3516] text-amber-50 px-4 py-2.5 text-xs font-medium transition-colors hover:bg-[#274a20] flex items-center justify-center shrink-0"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#1C3516] mb-4">
              Shop Categories
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="text-stone-600 hover:text-[#1C3516] transition-colors">
                  Pure Spices & Masalas
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-stone-600 hover:text-[#1C3516] transition-colors">
                  Biodegradable Tableware
                </Link>
              </li>
              <li>
                <Link href="/bulk-orders" className="text-stone-600 hover:text-[#1C3516] transition-colors">
                  Bulk & Event Orders
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-stone-600 hover:text-[#1C3516] transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="flex flex-col">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#1C3516] mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-stone-600 hover:text-[#1C3516] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-stone-600 hover:text-[#1C3516] transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-stone-600 hover:text-[#1C3516] transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-stone-600 hover:text-[#1C3516] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#1C3516] mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-xs md:text-sm text-stone-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="size-4 text-[#1C3516] shrink-0 mt-0.5" />
                <span>India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-[#1C3516] shrink-0" />
                <span>+91 (000) 000-0000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-[#1C3516] shrink-0" />
                <span>support@trumate.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Trumate. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-[#1C3516] transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-[#1C3516] transition-colors">Privacy Policy</Link>
            <Link href="/shipping" className="hover:text-[#1C3516] transition-colors">Shipping & Returns</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}