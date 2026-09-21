import Link from "next/link";
import { Shield, Lock, FileText, ArrowLeft, Mail, CheckCircle } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-[#FAF9F5] min-h-screen py-16 px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-4xl">

        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1C3516] hover:underline"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
        </div>

        {/* Header Container */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-8 md:p-14 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-semibold tracking-widest uppercase mb-4">
            <Shield className="size-3.5" />
            Legal & Trust
          </div>
          <h1 className="text-3xl md:text-5xl font-serif text-[#1C3516] tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs md:text-sm text-stone-500 font-sans">
            <strong>Effective Date:</strong> September 21, 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> September 21, 2026
          </p>
          <p className="text-sm md:text-base text-stone-700 leading-relaxed mt-6 font-sans">
            Welcome to Trumate. We respect your privacy and are deeply committed to safeguarding your personal and business data. This comprehensive Privacy Policy outlines our transparent practices regarding data collection, usage, and protection across our web platforms and mobile apps.
          </p>
        </div>

        {/* Policy Points Container */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-8 md:p-14 space-y-10 text-stone-800">

          {/* Point 1 */}
          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-serif font-semibold text-[#1C3516] flex items-center gap-2">
              <span className="flex items-center justify-center size-7 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-sans font-bold">1</span>
              Information We Collect Directly
            </h2>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
              When you interact with our platform, register an account, request a wholesale quotation, or fill out inquiry forms, we collect personal and corporate identifiers. This includes your full name, email address, telephone number, postal address, and specific business classifications (such as restaurant, catering service, retail store, or event planner).
            </p>
          </section>

          {/* Point 2 */}
          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-serif font-semibold text-[#1C3516] flex items-center gap-2">
              <span className="flex items-center justify-center size-7 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-sans font-bold">2</span>
              Automated Data Collection & Technical Logs
            </h2>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
              As you browse or download assets from our digital ecosystem, our web servers automatically log standard technical data. This incorporates your internet protocol (IP) address, browser type and version, operating system, device characteristics, referral URLs, page interaction streams, and access timestamps.
            </p>
          </section>

          {/* Point 3 */}
          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-serif font-semibold text-[#1C3516] flex items-center gap-2">
              <span className="flex items-center justify-center size-7 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-sans font-bold">3</span>
              Cookies and Tracking Technologies
            </h2>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
              We deploy cookies, web beacons, pixels, and similar session-management storage components to remember user credentials, track performance metrics, evaluate traffic patterns, and personalize content displays to match your preferences. You retain the option to disable cookies via your browser configurations.
            </p>
          </section>

          {/* Point 4 */}
          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-serif font-semibold text-[#1C3516] flex items-center gap-2">
              <span className="flex items-center justify-center size-7 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-sans font-bold">4</span>
              Primary Purposes of Data Processing
            </h2>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
              The information we gather is processed exclusively to fulfill commercial obligations. This includes handling wholesale volume quotes, preparing custom invoices, tracking product deliveries, maintaining account security, providing customer support, and refining our product line catalogs (biodegradables and spices).
            </p>
          </section>

          {/* Point 5 */}
          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-serif font-semibold text-[#1C3516] flex items-center gap-2">
              <span className="flex items-center justify-center size-7 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-sans font-bold">5</span>
              Communications & Transactional Alerts
            </h2>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
              We utilize your contact details to issue essential service notifications, order confirmation receipts, payment completion updates, security alerts, and administrative changes. Promotional notices or special corporate offers are shared only where explicit subscription consent has been granted.
            </p>
          </section>

          {/* Point 6 */}
          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-serif font-semibold text-[#1C3516] flex items-center gap-2">
              <span className="flex items-center justify-center size-7 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-sans font-bold">6</span>
              Data Sharing and Third-Party Disclosure Policy
            </h2>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
              We do not sell, trade, rent, or lease your personal identifiable information to third parties for monetary consideration. Information sharing is strictly confined to vital operations partners, such as vetted logistics carriers, secure cloud hosting providers, and encrypted payment gateways.
            </p>
          </section>

          {/* Point 7 */}
          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-serif font-semibold text-[#1C3516] flex items-center gap-2">
              <span className="flex items-center justify-center size-7 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-sans font-bold">7</span>
              Compliance with Legal Obligations
            </h2>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
              We reserve the absolute right to disclose personal user records when mandated by statutory law, court orders, or governmental regulatory authorities. Such measures are undertaken strictly to enforce our user policies, safeguard corporate assets, or protect public safety rights.
            </p>
          </section>

          {/* Point 8 */}
          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-serif font-semibold text-[#1C3516] flex items-center gap-2">
              <span className="flex items-center justify-center size-7 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-sans font-bold">8</span>
              Information Security Measures
            </h2>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
              We implement industry-standard administrative, physical, and technical safeguards, including Secure Sockets Layer (SSL) encryption, firewalls, and restricted database access controls. While these systems heavily mitigate risks, absolute data security across internet environments cannot be mathematically guaranteed.
            </p>
          </section>

          {/* Point 9 */}
          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-serif font-semibold text-[#1C3516] flex items-center gap-2">
              <span className="flex items-center justify-center size-7 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-sans font-bold">9</span>
              Data Retention and Archival Schedules
            </h2>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
              Personal and transactional records are preserved only for the duration necessary to satisfy operational purposes, resolve corporate accounting requirements, comply with tax laws, execute legal defense claims, and honor contractual stipulations.
            </p>
          </section>

          {/* Point 10 */}
          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-serif font-semibold text-[#1C3516] flex items-center gap-2">
              <span className="flex items-center justify-center size-7 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-sans font-bold">10</span>
              User Rights and Access Controls
            </h2>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
              Depending on your regional jurisdiction, you possess explicit rights regarding your data profile. These include the right to request access copies, correct incomplete entries, demand data deletion (the right to be forgotten), or restrict processing scopes.
            </p>
          </section>

          {/* Point 11 */}
          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-serif font-semibold text-[#1C3516] flex items-center gap-2">
              <span className="flex items-center justify-center size-7 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-sans font-bold">11</span>
              Third-Party External Links and Services
            </h2>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
              Our website and mobile applications may reference external links pointing to third-party domains, vendor portals, or social networks. We exercise zero governance over external privacy frameworks and advise reviewing independent policies before engagement.
            </p>
          </section>

          {/* Point 12 */}
          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-serif font-semibold text-[#1C3516] flex items-center gap-2">
              <span className="flex items-center justify-center size-7 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-sans font-bold">12</span>
              Policy Updates and Revisions
            </h2>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
              We retain the flexibility to modify, update, or revise this Privacy Policy periodically to match corporate growth or regulatory adaptations. Notice of modifications will be clearly signaled via a revised "Last Updated" dateline at the top of this documentation page.
            </p>
          </section>

          {/* Point 13 */}
          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-serif font-semibold text-[#1C3516] flex items-center gap-2">
              <span className="flex items-center justify-center size-7 rounded-full bg-[#1C3516]/10 text-[#1C3516] text-xs font-sans font-bold">13</span>
              Contact and Administrative Desk Inquiries
            </h2>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
              If you have any questions, formal grievances, or specific requests regarding our data protection protocols or privacy practices, please reach out directly to our compliance department:
            </p>
            <div className="mt-4 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs font-medium text-stone-700 flex items-center gap-3">
              <Mail className="size-5 text-[#1C3516]" />
              <span>Email: privacy@trumate.com | Support Desk: support@trumate.com</span>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}