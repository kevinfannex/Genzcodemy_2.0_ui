"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// TODO: Replace with real stats from backend/analytics
const STATS = [
  { label: "Job-ready graduates this quarter", target: 200, suffix: "+" },
  { label: "Avg. projects per portfolio", target: 5, suffix: "+" },
  { label: "Weeks from enroll to job-ready", target: 12, suffix: "" },
  { label: "Hiring partners across startups & companies", target: 100, suffix: "+" },
];

function useCountUp(target: number, active: boolean) {
  const [val, setVal] = useState(0);
  const fired = useRef(false);
  useEffect(() => {
    if (!active || fired.current) return;
    fired.current = true;
    const steps = 60;
    const inc = target / steps;
    let cur = 0;
    const id = setInterval(() => {
      cur = Math.min(cur + inc, target);
      setVal(Math.round(cur));
      if (cur >= target) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [active, target]);
  return val;
}

function StatCard({ stat }: { stat: (typeof STATS)[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const count = useCountUp(stat.target, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45 }}
      className="border-2 border-[#1a1a1a] bg-white p-6 text-center shadow-[6px_6px_0px_#1a1a1a] md:p-8 md:shadow-[8px_8px_0px_#1a1a1a]"
    >
      <p className="font-mono text-4xl font-black tabular-nums text-[#1a1a1a] md:text-5xl">
        {count.toLocaleString()}
        <span className="text-[#f5c518]">{stat.suffix}</span>
      </p>
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function TalentPoolStats() {
  return (
    <section className="border-b-2 border-[#1a1a1a] bg-[#f5c518] px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/50 md:text-xs">
          // the_talent_pool
        </p>
        <h2 className="mb-10 text-3xl font-black text-[#1a1a1a] md:mb-14 md:text-5xl">
          By the <i className="not-italic text-white">numbers</i>.
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {STATS.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>
        {/* Trained-in tag row */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/60">
            Trained in:
          </span>
          {["Python", "SQL", "React", "FastAPI", "Postgres", "Pandas", "JavaScript", "Power BI","DAX"].map((t) => (
            <span
              key={t}
              className="border-2 border-[#1a1a1a] bg-white px-3 py-1 font-mono text-xs font-bold"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}