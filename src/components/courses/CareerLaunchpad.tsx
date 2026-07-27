"use client";

import { motion } from "framer-motion";

const CARDS = [
  {
    id: "card-1",
    topLabelLeft: "SUPPORT 01",
    topLabelRight: "INTERNSHIP",
    title: "How do I get real experience before my first job?",
    bg: "bg-white",
    border: "border-2 border-[#1a1a1a]",
    shadow: "shadow-[8px_8px_0px_#1a1a1a]",
    topTextColor: "text-[#1a1a1a]/50",
    titleColor: "text-[#1a1a1a]",
    content: (
      <>
        <div className="mt-6 border-2 border-[#1a1a1a] bg-[#f4f4f4] p-5 space-y-3">
          {[
            "100% Internship Guarantee",
            "Resume & LinkedIn Optimized",
            "Mock interviews, live feedback",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 font-mono text-xs font-bold text-[#1a1a1a]">
              <span className="flex h-5 w-5 items-center justify-center bg-[#30a14e] text-white text-[10px] leading-none border-2 border-[#1a1a1a]">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm font-medium leading-relaxed text-[#1a1a1a]/70">
          A structured internship plan that checks your readiness and places you with our 100+ partners. You build proof before you ever need it.
        </p>
      </>
    ),
  },
  {
    id: "card-2",
    topLabelLeft: "SUPPORT 02",
    topLabelRight: "PLACEMENT",
    title: "Why does my resume keep getting rejected?",
    bg: "bg-[#1a1a1a]",
    border: "border-2 border-[#1a1a1a]",
    shadow: "shadow-[8px_8px_0px_#f5c518] md:scale-105 z-10",
    topTextColor: "text-[#f5c518]/70",
    titleColor: "text-white",
    content: (
      <>
        <div className="mt-6 border-2 border-[#333] bg-[#242424] p-5">
          <div className="space-y-4">
            {["ATS Resume", "Profile Visibility Boost", "Naukri Manager"].map((item) => (
              <div key={item} className="flex items-center justify-between font-mono text-xs font-bold text-white/80">
                <span>{item}</span>
                <span className="h-3 w-3 border-2 border-[#1a1a1a] bg-[#30a14e] shadow-[2px_2px_0px_#1a1a1a]"></span>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t-2 border-[#333] font-mono text-[10px] font-black text-[#f5c518] tracking-widest uppercase">
            50+ companies &middot; Direct referrals
          </div>
        </div>
        <p className="mt-6 text-sm font-medium leading-relaxed text-white/70">
          A tool that reads your resume against a real job and shows you what&apos;s missing. You fix it, we submit it to 50+ companies directly.
        </p>
      </>
    ),
  },
  {
    id: "card-3",
    topLabelLeft: "BONUS 03",
    topLabelRight: "SUPPORT",
    title: "How do I prepare for one specific company?",
    bg: "bg-[#f5c518]",
    border: "border-2 border-[#1a1a1a]",
    shadow: "shadow-[8px_8px_0px_#1a1a1a]",
    topTextColor: "text-[#1a1a1a]/60",
    titleColor: "text-[#1a1a1a]",
    content: (
      <>
        <div className="mt-6 border-2 border-[#1a1a1a] bg-white p-5 space-y-3">
          {[
            "Fetch job openings",
            "Filter role",
            "Score fit",
            "Draft email",
            "Tag row",
            "Schedule task",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 font-mono text-xs font-bold text-[#1a1a1a]">
              <span className="h-3 w-3 border-2 border-[#1a1a1a] bg-[#1a1a1a]"></span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm font-bold leading-relaxed text-[#1a1a1a]/80">
          A tool that takes any job and makes a study plan just for it. You make it yourself, with 1 year of career mentorship guiding you.
        </p>
      </>
    ),
  },
];

export default function CareerLaunchpad() {
  return (
    <section className="border-b-2 border-[#1a1a1a] bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/50 font-bold md:text-xs">
          // career_launchpad
        </p>
        <h2 className="mb-14 text-3xl font-black md:text-5xl">
          We don&apos;t just teach.{" "}
          <i className="not-italic text-[#f5c518] underline decoration-[#1a1a1a]/20">We place.</i>
        </h2>

        <div className="grid gap-8 md:grid-cols-3 items-center">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`group flex flex-col justify-between ${card.border} ${card.bg} ${card.shadow} rounded-2xl p-8 transition-transform hover:-translate-y-2 h-full`}
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <p className={`font-mono text-[10px] font-bold uppercase tracking-widest ${card.topTextColor}`}>
                    {card.topLabelLeft}
                  </p>
                  <p className={`font-mono text-[10px] font-bold uppercase tracking-widest ${card.topTextColor}`}>
                    {card.topLabelRight}
                  </p>
                </div>
                <h3 className={`text-2xl font-black ${card.titleColor} leading-tight`}>
                  {card.title}
                </h3>
                {card.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
