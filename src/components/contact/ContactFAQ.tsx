"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FAQS = [
  {
    q: "Do you offer EMI payment options?",
    a: "Yes. We offer zero-cost EMI options for 3, 6, or 9 months through our financing partners. Contact us to see if you qualify.",
  },
  {
    q: "Are the classes online or offline?",
    a: "All core lectures are delivered online and asynchronously, so you can learn at your own pace. However, we host weekly live interactive Q&A sessions and weekend office hours.",
  },
  {
    q: "When do the next batches start?",
    a: "Batches start on the first Monday of every month. Seats are limited to 50 students per cohort to ensure high-quality mentor feedback.",
  },
  {
    q: "What is your refund policy?",
    a: "We offer a 100% refund within the first 7 days of the batch start date, no questions asked. Simply drop us an email.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof FAQS)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const qRef = useRef(null);

  return (
    <div className="border-b-2 border-[#1a1a1a]/20 last:border-b-0">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-start justify-between py-5 text-left"
      >
        <span className="relative font-mono text-sm font-bold italic pr-8">
          <motion.span
            ref={qRef}
            className="absolute inset-x-0 bottom-0 h-[40%] origin-left bg-[#f5c518]/60"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          />
          <span className="relative">{faq.q}</span>
        </span>
        <span className="shrink-0 font-mono text-lg text-[#1a1a1a]/50">
          {open ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-[#1a1a1a]/70">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactFAQ() {
  return (
    <div className="mt-16">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50">
        // pre_sales_faq
      </p>
      <h2 className="mb-6 text-3xl font-black text-[#1a1a1a]">
        Frequently Asked{" "}
        <i className="not-italic text-[#f5c518]">Questions</i>
      </h2>

      <div className="border-2 border-[#1a1a1a] bg-white p-6 shadow-[8px_8px_0px_#1a1a1a]">
        {FAQS.map((faq, i) => (
          <FAQItem key={i} faq={faq} index={i} />
        ))}
      </div>
    </div>
  );
}
