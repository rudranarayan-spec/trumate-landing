"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: "PRODUCTS", href: "/products" },
        { name: "BULK ORDERS", href: "/bulk-orders" },
        { name: "ABOUT US", href: "/about" },
        { name: "CONTACT", href: "/contact" },
    ];

    return (
        <header className="w-full bg-[#FAF9F5] border-b border-stone-200/60 sticky top-0 z-50 shadow-xs">
            {/* Top Announcement Bar */}
            <div className="bg-[#1C3516] py-2 text-center text-[10px] md:text-xs font-medium tracking-[0.2em] text-amber-100 px-4">
                FREE SHIPPING ABOVE ₹499 &nbsp;|&nbsp; USE CODE <span className="underline font-semibold">WELCOME10</span> FOR 10% OFF
            </div>

            {/* Main Header Container */}
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center py-1">
                    <Image
                        src="/logo.png"
                        alt="Trumate"
                        width={220}
                        height={110}
                        priority
                        unoptimized
                        className="h-10 w-auto object-contain md:h-14 lg:h-16"
                    />
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-xs font-semibold tracking-[0.2em] text-stone-700 hover:text-[#1C3516] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#1C3516] hover:after:w-full after:transition-all"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Action / Mobile Menu Toggle */}
                <div className="flex items-center gap-3 lg:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2.5 rounded-xl bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors"
                        aria-label="Toggle Mobile Menu"
                    >
                        {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-[#FAF9F5] border-b border-stone-200 shadow-xl lg:hidden transition-all animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex flex-col px-6 py-8 gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-between text-sm font-semibold tracking-[0.18em] text-stone-800 hover:text-[#1C3516] border-b border-stone-200/60 pb-4 transition-colors"
                            >
                                <span>{link.name}</span>
                                <ArrowRight className="size-4 text-stone-400" />
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}