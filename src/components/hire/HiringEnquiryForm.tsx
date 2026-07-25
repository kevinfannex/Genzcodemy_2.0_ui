"use client";

/**
 * DECISION POINT — Auth gate for employer enquiry form:
 *
 * The current site gates all form submissions behind useAuthGate() (see ContactPage).
 * However, employers/recruiters should NOT need a student account to submit a
 * hiring enquiry. This form deliberately SKIPS the auth gate so any visitor can
 * submit it, which is the correct UX for a B2B hire page.
 *
 * If the backend /enquiries endpoint later requires auth, two options:
 *   1. Create a separate unauthenticated endpoint (e.g. POST /hire-enquiries).
 *   2. Allow a "guest enquiry" flow that skips token sending.
 *
 * For now, we call enquiriesApi.submit() with source_page "/hire-from-us"
 * exactly as ContactPage does, but WITHOUT requireAuth(). The backend
 * may or may not accept unauthenticated requests — flag this with the
 * backend team.
 *
 * TODO: Confirm with backend whether POST /enquiries accepts unauthenticated calls.
 * If not, implement a dedicated /hire-enquiries endpoint.
 */

import { enquiriesApi } from "@/lib/api/bookings";
import { ApiRequestError } from "@/lib/api/client";
import { useState, type FormEvent } from "react";

const ROLE_OPTIONS = [
  "Data Analyst",
  "Python Full-Stack + Gen AI",
  "Others"
];

interface HiringForm {
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  role_needed: string;
  headcount: string;
  message: string;
}

const EMPTY: HiringForm = {
  company_name: "",
  contact_name: "",
  email: "",
  phone: "",
  role_needed: "",
  headcount: "1",
  message: "",
};

const inputCls =
  "w-full border-2 border-[#1a1a1a] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f5c518] bg-white";

export default function HiringEnquiryForm({
  isPopup = false,
  onClose,
}: {
  isPopup?: boolean;
  onClose?: () => void;
} = {}) {
  const [form, setForm] = useState<HiringForm>(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: keyof HiringForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const message = [
        `Company: ${form.company_name}`,
        `Role needed: ${form.role_needed}`,
        `Headcount: ${form.headcount}`,
        `---`,
        form.message,
      ].join("\n");

      await enquiriesApi.submit({
        name: form.contact_name,
        email: form.email,
        phone: form.phone,
        message,
        source_page: "/hire-from-us",
      });
      setStatus("done");
    } catch (err) {
      setErrorMsg(
        err instanceof ApiRequestError ? err.message : "Something went wrong."
      );
      setStatus("error");
    }
  };

  const Content = (
    <div className={`mx-auto max-w-2xl bg-white ${isPopup ? "p-8 border-2 border-[#1a1a1a] shadow-[8px_8px_0px_#1a1a1a] relative max-h-[90vh] overflow-y-auto" : ""}`}>
      {isPopup && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 font-bold text-[#1a1a1a]/50 hover:text-[#1a1a1a]"
        >
          ✕
        </button>
      )}
      
      {status === "done" ? (
        <div className={`border-2 border-[#1a1a1a] bg-[#f5c518] p-10 text-center shadow-[8px_8px_0px_#1a1a1a] ${isPopup ? "mt-4" : ""}`}>
          <p className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/60">
            enquiry_sent.sh
          </p>
          <h2 className="mt-3 text-3xl font-black text-[#1a1a1a]">
            We&apos;ll be in touch.
          </h2>
          <p className="mt-3 text-[#1a1a1a]/70">
            Expect a reply within 1–2 business days with shortlisted candidate profiles.
          </p>
          {isPopup && (
            <button
              onClick={onClose}
              className="mt-6 border-2 border-[#1a1a1a] bg-white px-6 py-2 font-bold hover:bg-[#1a1a1a] hover:text-white"
            >
              Close
            </button>
          )}
        </div>
      ) : (
        <>
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50">
            // hiring_enquiry_form
          </p>
          <h2 className="mb-2 text-3xl font-black md:text-4xl">
            Start a{" "}
            <i className="not-italic text-[#f5c518]">conversation</i>.
          </h2>
          <p className="mb-8 text-[#1a1a1a]/60">
            Tell us who you need. We&apos;ll get back to you within 48 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Company + contact name */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-mono text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/60">
                Company name *
              </label>
              <input required className={inputCls} placeholder="Acme Corp" value={form.company_name} onChange={set("company_name")} />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/60">
                Your name *
              </label>
              <input required className={inputCls} placeholder="Jane Smith" value={form.contact_name} onChange={set("contact_name")} />
            </div>
          </div>

          {/* Email + phone */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-mono text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/60">
                Work email *
              </label>
              <input required type="email" className={inputCls} placeholder="jane@acme.com" value={form.email} onChange={set("email")} />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/60">
                Phone
              </label>
              <input className={inputCls} placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} />
            </div>
          </div>

          {/* Role needed + headcount */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-mono text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/60">
                Role needed *
              </label>
              <select required className={inputCls} value={form.role_needed} onChange={set("role_needed")}>
                <option value="">Select a role</option>
                {ROLE_OPTIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/60">
                Headcount *
              </label>
              <input
                required
                type="number"
                min="1"
                max="50"
                className={inputCls}
                placeholder="1"
                value={form.headcount}
                onChange={set("headcount")}
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="mb-1 block font-mono text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/60">
              Additional requirements
            </label>
            <textarea
              rows={4}
              className={inputCls}
              placeholder="Tech stack, timeline, remote vs on-site, anything else..."
              value={form.message}
              onChange={set("message")}
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full border-2 border-[#1a1a1a] bg-[#1a1a1a] px-6 py-4 font-bold text-white shadow-[6px_6px_0px_#f5c518] transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Send hiring enquiry →"}
          </button>

          {status === "error" && (
            <p className="text-sm text-red-600">{errorMsg || "Something went wrong. Please try again."}</p>
          )}
        </form>
        </>
      )}
    </div>
  );

  if (isPopup) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
        {Content}
      </div>
    );
  }

  return (
    <section className="border-b-2 border-[#1a1a1a] bg-[#faf9f5] px-6 py-20 text-center" id="hiring-enquiry">
      {Content}
    </section>
  );
}