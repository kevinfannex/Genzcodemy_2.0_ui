"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

const FAQS = [
  {
    q: "What if I don't have any technical experience?",
    a: "You don't need prior experience to begin. We start with the fundamentals and guide you step by step towards building practical, industry-ready skills.",
  },
  {
    q: "Will I get to work on real-world projects?",
    a: "Yes. Practical learning is a key part of the journey, helping you apply your knowledge to projects based on real industry scenarios.",
  },
  {
    q: "Are there job opportunities for freshers?",
    a: "Yes. Companies are actively looking for skilled professionals across data, technology, and development roles. We help you prepare for relevant career opportunities.",
  },
  {
    q: "What if I find the concepts difficult to understand??",
    a: "You won't have to learn alone. Trainers and mentors will guide you, clarify your doubts, and help you progress at a comfortable pace.",
  },
  {
    q: "What happens after I complete the course?",
    a: "Your journey continues with career guidance, interview preparation, and placement support to help you move towards the right opportunity.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof FAQS)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const qRef = useRef(null);

  return (
    <div className="border-b-2 border-[#1a1a1a]/20 last:border-b-0">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-start justify-between py-6 text-left"
      >
        {/* Question with brush-stroke highlight */}
        <span className="relative font-mono text-base font-bold italic pr-8">
          {/* Scroll-triggered yellow brush underlay */}
          <motion.span
            ref={qRef}
            className="absolute inset-x-0 bottom-1 h-[40%] origin-left bg-[#f5c518]/60"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          />
          <span className="relative">{faq.q}</span>
        </span>
        <span className="shrink-0 font-mono text-xl text-[#1a1a1a]/50">
          {open ? "-" : "+"}
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
            <p className="pb-6 text-base font-medium leading-relaxed text-[#1a1a1a]/70">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RealQuestionFAQ() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/contact?prefill=${encodeURIComponent(query.trim())}`);
  };

  return (
    <section className="border-b-2 border-[#1a1a1a] bg-[#faf9f5] px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50 font-bold">
          // faq.md
        </p>
        <h2 className="mb-12 text-4xl font-black md:text-5xl">
          Real questions,{" "}
          <i className="not-italic text-[#f5c518] underline decoration-[#1a1a1a]/20">real answers</i>.
        </h2>

        <div className="border-2 border-[#1a1a1a] bg-white p-8 shadow-[8px_8px_0px_#1a1a1a]">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        {/* Still confused? */}
        <div className="mt-14 max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50 font-bold">
            $ still_confused �� ask_us
          </p>
          <form 
            onSubmit={handleAsk} 
            className="relative flex items-center border-2 border-[#1a1a1a] bg-white p-2 shadow-[6px_6px_0px_#1a1a1a] transition hover:shadow-[8px_8px_0px_#1a1a1a]"
          >
            <input
              type="text"
              placeholder="What's on your mind?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent px-2 py-3 text-sm md:text-base font-medium text-[#1a1a1a] placeholder-[#1a1a1a]/40 focus:outline-none"
            />
            <button
              type="submit"
              className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-[#1a1a1a] bg-[#f5c518] font-bold text-[#1a1a1a] transition hover:bg-[#1a1a1a] hover:text-white"
              title="Ask question"
            >
              💡 
              {/* <img
                src="https://ik.imagekit.io/g4lukt2ll/Genzcodemy/happy-conceptual-lightbulb-icon-happy-conceptual-lightbulb-icon-vector-illustration-design-115766905-removebg-preview.png"
                alt="Ask"
                className="w-6 h-6 object-contain"
              /> */}
            </button>
          </form>
          <p className="mt-3 font-mono text-xs text-[#1a1a1a]/40 font-bold">
            Submitting navigates to /contact with your question pre-filled.
          </p>
        </div>
      </div>
    </section>
  );
}
