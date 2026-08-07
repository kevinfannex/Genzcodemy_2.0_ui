"use client";

import { motion } from "framer-motion";

interface Entry {
  question: string;
  answer: string;
}

const ENTRIES: Entry[] = [
  {
    question: "What if I don't have any technical experience?",
    answer:
      "You don't need prior experience to begin. At GenzCodemy we start with the fundamentals and guide you step by step towards building practical, industry-ready skills.",
  },
  {
    question: "Will I get to work on real-world projects?",
    answer:
      "Yes. Practical learning is a key part of the journey. Every course includes hands-on projects using tools like React, Python, FastAPI, SQL, Power BI, and Gen AI — helping you apply knowledge to real industry scenarios.",
  },
  {
    question: "Are there job opportunities for freshers?",
    answer:
      "Yes. Companies are actively looking for skilled professionals across data, technology, and development roles. We help you prepare for relevant career opportunities with resume reviews, mock interviews, and placement assistance.",
  },
  {
    question: "What if I find the concepts difficult to understand?",
    answer:
      "You won't have to learn alone. GenzCodemy mentors and trainers will guide you, clarify your doubts, and help you progress at a comfortable pace — with weekly doubt-clearing sessions and recorded resources.",
  },
  {
    question: "Will I get a certificate after completing the course?",
    answer:
      "Yes. You'll receive an industry-recognised completion certificate. More importantly, you'll graduate with a live portfolio of deployed projects that proves your skills to any employer.",
  },
  {
    question: "Do I need to be available full-time?",
    answer:
      "No. GenzCodemy offers flexible live online and classroom batches with structured schedules designed around working students, college-goers, and career changers.",
  },
  {
    question: "What happens if I'm still looking for a job after the course ends?",
    answer:
      "Our support doesn't stop after the course. From referrals and internships to salary negotiation guidance, we continue supporting you until you are confident, interview-ready, and hired.",
  },
];

export default function SevenThings() {
  return (
    <section className="relative border-b-4 border-[#1a1a1a] bg-[#FAF9F5] px-6 py-24">
      <div className="relative mx-auto max-w-5xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end"
        >
          <div className="md:col-span-7">
            <h2 className="text-4xl font-black leading-tight text-[#1a1a1a] sm:text-5xl md:text-6xl md:leading-[1.1] tracking-tight">
              The things that turn learners into{" "}
             <motion.span
                  className="inline-block -rotate-1 border-2 border-[#1a1a1a] bg-[#f5c518] px-3 py-1 shadow-[4px_4px_0px_#1a1a1a]"
                  initial={{ rotate: 4, scale: 0.85, opacity: 0 }}
                  whileInView={{ rotate: -1, scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35, ease: "backOut" }}
                >
                  Job Ready
                </motion.span>{" "}
              
              professionals.
            </h2>
          </div>
          <div className="md:col-span-5 md:pl-6 border-l-2 border-[#1a1a1a]/10">
            <p className="text-sm font-medium leading-relaxed text-[#1a1a1a]/70 pt-4">
              Getting hired takes more than completing a course. It takes practical skills, real projects, expert mentorship, interview preparation, and continuous career support. That&apos;s how every GenzCodemy student becomes job-ready.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 font-bold">
              THE GENZCODEMY METHOD
            </p>
          </div>
        </motion.div>

        {/* Q&A rows */}
        <div className="flex flex-col">
          {ENTRIES.map((entry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: idx * 0.09, ease: "easeOut" }}
              className="group"
            >
              {/* Horizontal rule above each row */}
              <div className="border-t border-[#1a1a1a]/15" />

              {/* Row — full-width hover bg */}
              <div className="grid grid-cols-1 gap-6 px-4 py-8 transition-colors duration-300 group-hover:bg-[#FAF5E7] md:grid-cols-2 md:gap-16 md:px-6">
                {/* Left — italic question */}
                <p
                  className="text-lg font-semibold italic leading-snug text-[#3a3028]"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  &ldquo;{entry.question}&rdquo;
                </p>

                {/* Right — plain answer */}
                <p className="text-sm font-medium leading-relaxed text-[#1a1a1a]/60">
                  {entry.answer}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Closing rule */}
          <div className="border-t border-[#1a1a1a]/15" />
        </div>
      </div>
    </section>
  );
}
