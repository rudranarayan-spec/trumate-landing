/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, MessageSquare } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
    });

    const [status, setStatus] = useState({
        submitting: false,
        success: false,
        error: null as string | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus({ submitting: true, success: false, error: null });

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to send message. Please try again.");
            }

            setStatus({ submitting: false, success: true, error: null });
            setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
        } catch (err: any) {
            setStatus({ submitting: false, success: false, error: err.message });
        }
    };

    return (
        <div className="w-full bg-[#FAF9F5] min-h-screen py-10 sm:py-14 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20">
            <div className="mx-auto max-w-6xl">

                {/* Page Header */}
                <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 md:mb-16">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-semibold tracking-widest uppercase mb-4">
                        <MessageSquare className="size-3.5" />
                        Get in Touch
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1C3516] tracking-tight mb-4">
                        We&apos;d love to hear from you.
                    </h1>
                    <p className="text-sm md:text-base text-stone-600 leading-relaxed font-sans px-2 sm:px-0">
                        Have questions about our biodegradable tableware or pure kitchen spices? Reach out to our team and we&apos;ll get back to you shortly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">

                    {/* Left Contact Info Cards */}
                    <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-6">
                        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs">
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1C3516]/10 text-[#1C3516]">
                                    <MapPin className="size-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-serif font-semibold text-stone-900 mb-1">Our Location</h3>
                                    <p className="text-xs text-stone-600 leading-relaxed">
                                        Trumate Headquarters<br />
                                        India
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs">
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1C3516]/10 text-[#1C3516]">
                                    <Phone className="size-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-serif font-semibold text-stone-900 mb-1">Phone Support</h3>
                                    <p className="text-xs text-stone-600 leading-relaxed">
                                        +91 (000) 000-0000<br />
                                        Mon - Sat (9:00 AM - 6:00 PM)
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs">
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1C3516]/10 text-[#1C3516]">
                                    <Mail className="size-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-serif font-semibold text-stone-900 mb-1">Email Us</h3>
                                    <p className="text-xs text-stone-600 leading-relaxed break-all">
                                        support@trumate.com<br />
                                        bulk@trumate.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Contact Form */}
                    <div className="lg:col-span-8 bg-white rounded-2xl sm:rounded-3xl border border-stone-200 shadow-xl p-6 sm:p-8 md:p-12">
                        <h2 className="text-xl sm:text-2xl font-serif text-[#1C3516] mb-2">Send us a Message</h2>
                        <p className="text-xs md:text-sm text-stone-500 mb-6 sm:mb-8 font-sans">
                            Fill out the form below and our customer care team will respond within 24 hours.
                        </p>

                        {status.error && (
                            <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-xs text-red-700">
                                {status.error}
                            </div>
                        )}

                        {status.success ? (
                            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 sm:p-8 text-center flex flex-col items-center justify-center">
                                <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
                                    <CheckCircle2 className="size-8" />
                                </div>
                                <h3 className="text-lg font-serif font-semibold text-emerald-900 mb-1">Message Sent Successfully!</h3>
                                <p className="text-xs md:text-sm text-emerald-700 max-w-md mb-6">
                                    Thank you for reaching out to Trumate. Your message has been emailed directly to our team.
                                </p>
                                <button
                                    onClick={() => setStatus({ submitting: false, success: false, error: null })}
                                    className="bg-[#1C3516] text-amber-50 px-6 py-2.5 rounded-xl text-xs font-medium hover:bg-[#274a20] cursor-pointer"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
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
                                            placeholder="e.g. Priya Sharma"
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
                                            placeholder="priya@example.com"
                                            className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none focus:border-[#1C3516] focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                            className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none focus:border-[#1C3516] focus:bg-white transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                                            Subject
                                        </label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none focus:border-[#1C3516] focus:bg-white transition-all"
                                        >
                                            <option value="General Inquiry">General Inquiry</option>
                                            <option value="Product Question">Product & Quality Question</option>
                                            <option value="Bulk Order Support">Bulk Order Support</option>
                                            <option value="Feedback">Feedback & Suggestions</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                                        Your Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="How can we help you today?"
                                        className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none focus:border-[#1C3516] focus:bg-white transition-all resize-y"
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
                                            Sending Message...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="size-4" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        )}

                    </div>

                </div>

            </div>
        </div>
    );
}