"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const LINES = [
  { text: "$ pip install pandas", delay: 0 },
  { text: "Successfully installed pandas-2.2.1", delay: 700 },
  { text: "$ python analyze.py", delay: 1400 },
  { text: "Loading dataset...        [████████░░] 80%", delay: 2100 },
  { text: "Loading dataset...        [██████████] 100%", delay: 2700 },
  { text: "Running analysis pipeline...", delay: 3200 },
  { text: "Output: insight generated ✓", delay: 4000 },
];

function TerminalLine({ line, started }: { line: (typeof LINES)[0]; started: boolean }) {
  const [visible, setVisible] = useState(false);

  if (started && !visible) {
    setTimeout(() => setVisible(true), line.delay);
  }

  if (!visible) return null;

  const isOutput = line.text.startsWith("Output:");

  return (
    <motion.p
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`font-mono text-sm ${isOutput
          ? "text-[#4ade80] font-bold"
          : line.text.startsWith("$")
            ? "text-white"
            : "text-white/60"
        }`}
    >
      {line.text}
    </motion.p>
  );
}

export default function BuildLogDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="border-b-2 border-[#1a1a1a] bg-white px-6 py-24" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50">
          // build_log.sh
        </p>
        <h2 className="mb-10 text-4xl font-black md:text-5xl">
          This is what{" "}
          <i className="not-italic text-[#f5c518]">learning looks like</i>.
        </h2>

        {/* Terminal window */}
        <div className="border-2 border-[#1a1a1a] shadow-[12px_12px_0px_#1a1a1a]">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b-2 border-[#1a1a1a] bg-[#2d2d2d] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e] border border-[#d4a027]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840] border border-[#1faa35]" />
            <span className="ml-3 font-mono text-xs text-white/50">
              genzcodemy@terminal ~ analyze.py
            </span>
          </div>

          {/* Body */}
          <div className="min-h-52 bg-[#1a1a1a] p-6 space-y-2">
            {LINES.map((line, i) => (
              <TerminalLine key={i} line={line} started={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
