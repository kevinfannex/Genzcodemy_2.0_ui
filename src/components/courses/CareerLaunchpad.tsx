"use client";

import { motion } from "framer-motion";

const CARDS = [
  {
    // Card 1 � terminal simulator style
    label: "internships",
    title: "Internships",
    bg: "bg-[#0d1117]",
    border: "border-[#30a14e]",
    shadow: "shadow-[8px_8px_0px_#30a14e]",
    textColor: "text-[#30a14e]",
    content: (
      <div className="font-mono text-sm space-y-1.5 mt-2">
        <p className="text-[#30a14e]">$ genz apply --track data-analytics</p>
        <p className="text-white/50">Connecting to partner network...</p>
        <p className="text-[#30a14e]">? 12 active internship slots found</p>
        <p className="text-white/50">Filtering by your skill profile...</p>
        <p className="text-[#30a14e]">? 6 matches. Interview scheduled.</p>
      </div>
    ),
  },
  {
    // Card 2 � dark neon / referral
    label: "referrals",
    title: "Placement Referrals",
    bg: "bg-[#0a0a0f]",
    border: "border-[#f5c518]",
    shadow: "shadow-[8px_8px_0px_rgba(245,197,24,0.4)]",
    textColor: "text-[#f5c518]",
    content: (
      <div className="space-y-3 mt-2">
        <p className="font-mono text-xs text-[#f5c518]/60 uppercase tracking-widest">
          direct_referrals.json
        </p>
        {["Razorpay", "Meesho", "Zepto", "CRED", "Groww"].map((co) => (
          <div
            key={co}
            className="flex items-center justify-between border border-[#f5c518]/30 px-3 py-1.5"
          >
            <span className="font-bold text-white text-sm">{co}</span>
            <span className="font-mono text-[10px] text-[#000] bg-[#f5c518] px-1.5 py-0.5 font-bold uppercase tracking-widest">HIRING</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    // Card 3 � yellow checklist
    label: "study-plans",
    title: "Study Plans",
    bg: "bg-[#f5c518]",
    border: "border-[#1a1a1a]",
    shadow: "shadow-[8px_8px_0px_#1a1a1a]",
    textColor: "text-[#1a1a1a]",
    content: (
      <ul className="space-y-3 mt-2">
        {[
          "Week-by-week structured curriculum",
          "Daily 2-hr async video + exercises",
          "Live mentor Q&A every Saturday",
          "Peer review on every milestone",
          "Career prep sprint in final 2 weeks",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm font-bold leading-snug">
            <span className="mt-0.5 text-xl leading-none">?</span>
            {item}
          </li>
        ))}
      </ul>
    ),
  },
];

export default function CareerLaunchpad() {
  return (
    <section className="border-b-2 border-[#1a1a1a] bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50 font-bold">
          // career_launchpad
        </p>
        <h2 className="mb-14 text-4xl font-black md:text-5xl">
          We don&apos;t just teach.{" "}
          <i className="not-italic text-[#f5c518] underline decoration-[#1a1a1a]/20">We place.</i>
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`group border-2 ${card.border} ${card.bg} ${card.shadow} p-8 transition-transform hover:-translate-y-2`}
            >
              <p className={`mb-4 font-mono text-xs font-bold uppercase tracking-widest ${card.textColor}`}>
                {card.label}
              </p>
              <h3 className={`mb-5 text-2xl font-black ${card.textColor}`}>
                {card.title}
              </h3>
              {card.content}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
