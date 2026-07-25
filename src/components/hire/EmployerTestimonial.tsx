"use client";

import { useState } from "react";
import HiringEnquiryForm from "./HiringEnquiryForm";

// No real employer testimonial exists yet — rendering an empty state instead of fabricating a quote.
// TODO: Once a hiring partner provides a testimonial, replace this empty state with the real quote block.

const HAS_REAL_TESTIMONIAL = false;

const REAL_TESTIMONIAL = {
  quote:
    "TODO: Replace with a real employer testimonial once a hiring partner approves the copy.",
  name: "TODO: Name",
  role: "TODO: Role, Company",
};

export default function EmployerTestimonial() {
  const [showPopup, setShowPopup] = useState(false);

  if (!HAS_REAL_TESTIMONIAL) {
    return (
      <section className="border-b-2 border-[#1a1a1a] bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="border-2 border-dashed border-[#1a1a1a]/30 p-10 text-center">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/40">
              // BUILD_TEAMS.MD
            </p>
            <h3 className="mb-4 text-2xl font-extrabold text-[#1a1a1a]">
             Build Your Team with Job-Ready Talent.
            </h3>
            <p className="mb-6 text-[#1a1a1a]/60">
              Skip contacting multiple agencies to find the right talent. Our platform offers a wide range of tech experts, allowing you to hire the perfect candidate instantly, all at no cost to you
            </p>
            <button
              onClick={() => setShowPopup(true)}
              className="inline-block border-2 border-[#1a1a1a] bg-[#f5c518] px-6 py-3 font-bold text-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Schedule a Call →
            </button>
          </div>
        </div>
        {showPopup && <HiringEnquiryForm isPopup={true} onClose={() => setShowPopup(false)} />}
      </section>
    );
  }

  return (
    <section className="border-b-2 border-[#1a1a1a] bg-[#f5c518] px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-8 text-3xl font-black italic leading-snug text-[#1a1a1a] md:text-4xl">
          &ldquo;{REAL_TESTIMONIAL.quote}&rdquo;
        </p>
        <p className="font-bold text-[#1a1a1a]">{REAL_TESTIMONIAL.name}</p>
        <p className="font-mono text-sm text-[#1a1a1a]/60">{REAL_TESTIMONIAL.role}</p>
      </div>
    </section>
  );
}