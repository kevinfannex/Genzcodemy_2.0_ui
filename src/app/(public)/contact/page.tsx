"use client";

import { useAuthGate } from "@/components/auth/AuthGateModal";
import { ApiRequestError } from "@/lib/api/client";
import { enquiriesApi } from "@/lib/api/bookings";
import { useState, type FormEvent, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PostSubmitTimeline from "@/components/contact/PostSubmitTimeline";
import ReachUsDirectly from "@/components/contact/ReachUsDirectly";
import EnquiryTypeChips from "@/components/contact/EnquiryTypeChips";
import ContactFAQ from "@/components/contact/ContactFAQ";
import ConfettiOnSuccess from "@/components/contact/ConfettiOnSuccess";

function ContactFormSection() {
  const { requireAuth } = useAuthGate();
  const searchParams = useSearchParams();
  const prefill = searchParams.get("prefill") || "";
  const initialType = searchParams.get("type") || "";

  // Map incoming type from low-commitment CTA or hire CTA to chip value
  const getMappedType = (t: string) => {
    if (t === "intro-call") return "Course info";
    if (t === "hiring-partner") return "Hiring partnership";
    return "";
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: prefill,
    enquiry_type: getMappedType(initialType),
  });

  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  // Sync prefill from URL if it loads dynamically
  useEffect(() => {
    if (prefill) {
      setForm((prev) => ({ ...prev, message: prefill }));
    }
  }, [prefill]);

  // Sync type from URL if it loads dynamically
  useEffect(() => {
    if (initialType) {
      setForm((prev) => ({ ...prev, enquiry_type: getMappedType(initialType) }));
    }
  }, [initialType]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!requireAuth("/contact")) return;

    setStatus("loading");
    try {
      await enquiriesApi.submit({ ...form, source_page: "/contact" });
      setStatus("done");
    } catch (err) {
      console.error(err instanceof ApiRequestError ? err.message : err);
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        {/* Confetti triggered on success */}
        <ConfettiOnSuccess />
        <h1 className="text-3xl font-black">Enquiry sent</h1>
        <p className="mt-4 text-[#1a1a1a]/70">
          We&apos;ll get back to you within 1–2 business days.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-4xl font-black mb-10">Get in touch</h1>

      {/* SplitLayout: Reposition form and direct contact panel */}
      <div className="grid gap-10 lg:grid-cols-12">
        {/* Left Column: Timeline + Form */}
        <div className="lg:col-span-7">
          <PostSubmitTimeline />

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border-2 border-[#1a1a1a] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f5c518] bg-white"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border-2 border-[#1a1a1a] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f5c518] bg-white"
            />
            <input
              required
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border-2 border-[#1a1a1a] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f5c518] bg-white"
            />

            {/* EnquiryTypeChips inserted inside form above message field */}
            <EnquiryTypeChips
              selectedType={form.enquiry_type}
              onChange={(type) => setForm({ ...form, enquiry_type: type })}
            />

            <textarea
              required
              placeholder="Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border-2 border-[#1a1a1a] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f5c518] bg-white"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full border-2 border-[#1a1a1a] bg-[#1a1a1a] px-6 py-3 font-bold text-white shadow-[4px_4px_0px_#f5c518] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Send enquiry"}
            </button>
            {status === "error" && (
              <p className="text-sm text-red-600">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>

        {/* Right Column: Direct Contact Info */}
        <div className="lg:col-span-5">
          <ReachUsDirectly />
        </div>
      </div>

      {/* Pre-sales FAQ section */}
      <ContactFAQ />
    </section>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-4xl font-black">Get in touch</h1>
        <p className="mt-4 text-[#1a1a1a]/70">Loading page...</p>
      </section>
    }>
      <ContactFormSection />
    </Suspense>
  );
}
