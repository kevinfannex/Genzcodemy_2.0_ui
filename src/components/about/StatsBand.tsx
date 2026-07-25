"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// TODO: Replace with real stats sourced from the backend or analytics
const STATS = [
  { label: "Students Upskilled", target: 250, suffix: "+" },
  { label: "Success Rate", target: 90, suffix: "%" },
  { label: "Industry Projects Built", target: 120, suffix: "+" },
  { label: "Internship partners", target: 100, suffix: "+" },
];

function useCountUp(target: number, active: boolean, duration = 2000) {
  const [value, setValue] = useState(0);
  const fired = useRef(false);

  useEffect(() => {
    if (!active || fired.current) return;
    fired.current = true;
    const steps = 60;
    const stepMs = duration / steps;
    const increment = target / steps;
    let current = 0;
    const id = setInterval(() => {
      current = Math.min(current + increment, target);
      setValue(Math.round(current));
      if (current >= target) clearInterval(id);
    }, stepMs);
    return () => clearInterval(id);
  }, [active, target, duration]);

  return value;
}

function StatItem({ stat }: { stat: (typeof STATS)[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const count = useCountUp(stat.target, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="border-2 border-[#1a1a1a] bg-white p-8 text-center shadow-[8px_8px_0px_#1a1a1a]"
    >
      <p className="font-mono text-5xl font-black tabular-nums text-[#1a1a1a] md:text-6xl">
        {count.toLocaleString()}
        <span className="text-[#f5c518]">{stat.suffix}</span>
      </p>
      <p className="mt-3 font-mono text-sm uppercase tracking-widest text-[#1a1a1a]/50">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function StatsBand() {
  return (
    <section className="border-b-2 border-[#1a1a1a] bg-[#f5c518] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/60">
// PROOF_OF_WORK.md
        </p>
        <h2 className="mb-12 text-4xl font-black md:text-5xl">
          Results You Can {" "}
          <i className="not-italic underline decoration-[#1a1a1a]"> Measure.</i>.
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <StatItem key={s.label} stat={s} />
          ))}
        </div>
      </div>
    </section>
  );
}