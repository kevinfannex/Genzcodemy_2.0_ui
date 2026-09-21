"use client";

import { useState } from "react";
import GraduateShowcase, { GRADUATES } from "./GraduateShowcase";

const FILTERS = ["Data Analyst + Gen AI", "Full Stack", "Both"] as const;
type Filter = (typeof FILTERS)[number];

export default function SkillFilterTool() {
  const [active, setActive] = useState<Filter[]>([]);

  const toggle = (f: Filter) =>
    setActive((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );

  const filtered =
    active.length === 0
      ? GRADUATES
      : GRADUATES.filter((g) => {
        if (active.includes("Both")) return true;
        if (active.includes("Data Analyst + Gen AI") && g.track === "Data Analyst + Gen AI") return true;
        if (active.includes("Full Stack") && g.track === "Full Stack") return true;
        return false;
      });

  return (
    <div>
      {/* Filter bar */}
      <div className="border-b-2 border-[#1a1a1a] bg-[#f5f5f5] px-6 py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50">
            Filter by track:
          </span>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => toggle(f)}
              className={`border-2 border-[#1a1a1a] px-4 py-1.5 font-mono text-xs font-bold transition ${active.includes(f)
                  ? "bg-[#1a1a1a] text-white shadow-[3px_3px_0px_#f5c518]"
                  : "bg-white text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
                }`}
            >
              {f}
            </button>
          ))}
          {active.length > 0 && (
            <button
              onClick={() => setActive([])}
              className="font-mono text-xs text-[#1a1a1a]/40 underline hover:text-[#1a1a1a]"
            >
              Clear filter
            </button>
          )}
        </div>
      </div>

      {/* Filtered grid   GraduateShowcase accepts a graduates prop */}
      <GraduateShowcase graduates={filtered} />
    </div>
  );
}