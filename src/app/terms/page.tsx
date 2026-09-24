import Link from "next/link";
import { FileText, Shield, Scale, Mail, ArrowRight } from "lucide-react";

export default function TermsAndConditionsPage() {
  return (
    <div className="w-full bg-[#FAF9F5] min-h-screen py-10 sm:py-14 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-4xl">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-semibold tracking-widest uppercase mb-4">
            <FileText className="size-3.5" />
            Legal Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1C3516] tracking-tight mb-4 sm:mb-6 leading-tight">
            Terms and Conditions
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-sans">
            Last updated: September 24, 2026
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 border border-stone-200 shadow-sm space-y-8 sm:space-y-10 text-stone-700 font-sans">
          
          {/* Introduction */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif text-[#1C3516]">1. Introduction</h2>
            <p className="text-sm sm:text-base leading-relaxed text-stone-600">
              Welcome to Trumate. These Terms and Conditions govern your access to and use of our website, services, and the purchase of our pure kitchen spices and 100% biodegradable tableware. By accessing or using our platform, you agree to comply with and be bound by these terms.
            </p>
          </section>

          <hr className="border-stone-100" />

          {/* Use of Website */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif text-[#1C3516]">2. Use of Our Website</h2>
            <p className="text-sm sm:text-base leading-relaxed text-stone-600">
              You agree to use our website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of Trumate. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
            </p>
          </section>

          <hr className="border-stone-100" />

          {/* Products, Pricing & Availability */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif text-[#1C3516]">3. Products and Pricing</h2>
            <p className="text-sm sm:text-base leading-relaxed text-stone-600">
              We strive to ensure that all details, descriptions, and prices of our spices and eco-friendly tableware appear accurately. However, errors may occur. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.
            </p>
          </section>

          <hr className="border-stone-100" />

          {/* Orders & Wholesale */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif text-[#1C3516]">4. Orders and Fulfillment</h2>
            <p className="text-sm sm:text-base leading-relaxed text-stone-600">
              All orders placed through our platform are subject to acceptance and availability. For retail, restaurant, or wholesale bulk inquiries, we reserve the right to refuse or cancel any order under specific conditions (e.g., product unavailability or suspicion of fraudulent transactions).
            </p>
          </section>

          <hr className="border-stone-100" />

          {/* Intellectual Property */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif text-[#1C3516]">5. Intellectual Property</h2>
            <p className="text-sm sm:text-base leading-relaxed text-stone-600">
              All content included on this site—such as text, graphics, logos, product imagery, and software—is the property of Trumate and protected by applicable copyright and intellectual property laws. You may not reproduce, duplicate, or copy material from our site for commercial use without express written consent.
            </p>
          </section>

          <hr className="border-stone-100" />

          {/* Limitation of Liability */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif text-[#1C3516]">6. Limitation of Liability</h2>
            <p className="text-sm sm:text-base leading-relaxed text-stone-600">
              Trumate shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our products or services, ensuring our commitment remains bound strictly to the value of the purchased goods.
            </p>
          </section>

          <hr className="border-stone-100" />

          {/* Contact Information */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif text-[#1C3516]">7. Contact Us</h2>
            <p className="text-sm sm:text-base leading-relaxed text-stone-600">
              If you have any questions or concerns regarding these Terms and Conditions, please feel free to reach out to our team:
            </p>
            <div className="pt-2">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 text-sm font-medium text-[#1C3516] hover:underline"
              >
                <Mail className="size-4" />
                Contact our support team
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </section>

        </div>

        {/* Footer Navigation Link */}
        <div className="text-center mt-10">
          <Link
            href="/"
            className="text-xs sm:text-sm font-medium text-stone-600 hover:text-[#1C3516] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}