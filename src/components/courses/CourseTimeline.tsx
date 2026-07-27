"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Static curriculum data keyed by course slug.
// Replace/extend with real API data when the backend exposes modules.
const CURRICULUM: Record<string, { module: string; weeks: string[] }[]> = {
  "data-analytics": [
    {
      module: "Excel for Data Analysis:",
      weeks: [
        " Formulas (VLOOKUP, INDEX-MATCH, IF), Pivot Tables, Conditional Formatting, Data Validation & Chartss",
      ],
    },
    {
      module: "SQL for Database Management:",
      weeks: [
        "SELECT & Filtering, JOINs (INNER / LEFT / RIGHT), GROUP BY & Aggregations, Subqueries",
      ],
    },
    {
      module: "Power BI Essentials:",
      weeks: [
        "Connecting data sources, Building reports, Visuals (Bar, Line, Pie, Map), Slicers & Filters",
      ],
    },
    {module: "Data Cleaning Techniques:",
      weeks: [
        "Handling nulls & duplicates, Text cleaning, Data type conversion, Outlier identification",
      ],
    },
    {module: "Basic DAX Measures:",
      weeks: [
        "Calculated columns vs Measures, SUM / COUNT / AVERAGE, CALCULATE, IF, basic Date functions",
      ],
    },
     {module: "Basic Power Query:",
      weeks: [
        "Importing & shaping data, Filtering rows, Merging queries, Removing errors & duplicates",
      ],
    },
     {module: "Interactive Dashboard:",
      weeks: [
        "KPI cards, Cross-filtering, Drill-through, Layout design, Publishing & sharing reports",
      ],
    }
  ],
  "python-full-stack": [
    {
      module: " Frontend: ",
      weeks: [
        "HTML, CSS, JavaScript, ReactJS",
      ],
    },
    {
      module: "Backend:",
      weeks: [
        "Python, FastAPI fundamentals",
      ],
    },
    {
      module: "Database:",
      weeks: [
        "PostgreSQL basics & advanced queries",
      ],
    },
    {
      module: "Full Stack:",
      weeks: [
        "Advanced React, FastAPI, REST APIs",
      ],
    },
     {
      module: "AI Integration:",
      weeks: [
        "OpenAI API, Claude API",
      ],
    },
     {
      module: "AI tools: ",
      weeks: [
        "Prompt engineering, RAG systems",
      ],
    },
     {
      module: "Full Stack Advanced:",
      weeks: [
        "NextJS, Microservices, GraphQL",
      ],
    },
     {
      module: "AI Advanced:",
      weeks: [
        "Custom model fine-tuning, Multi-modal AI",
      ],
    },
     {
      module: "Enterprise:",
      weeks: [
        "Scalable AI architecture & deployment",
      ],
    },
  ],
};

interface CourseTimelineProps {
  slug: string;
}

export default function CourseTimeline({ slug }: CourseTimelineProps) {
  const modules = CURRICULUM[slug] ?? [];
  const [open, setOpen] = useState<number | null>(0);
  const [activeModule, setActiveModule] = useState(0);

  if (modules.length === 0) return null;

  const toggle = (i: number) => {
    setOpen((prev) => (prev === i ? null : i));
    setActiveModule(i);
  };

  return (
    <section className="border-b-2 border-[#1a1a1a] bg-white px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/50 md:text-xs">
          // curriculum
        </p>
        <h2 className="mb-8 text-3xl font-black md:mb-12 md:text-5xl">
          What you&apos;ll <i className="not-italic text-[#f5c518]">learn</i>
        </h2>

        <div className="flex gap-10">
          {/* Sticky left nav */}
          <aside className="hidden w-48 shrink-0 md:block">
            <nav className="sticky top-24 space-y-1">
              {modules.map((m, i) => (
                <button
                  key={i}
                  onClick={() => toggle(i)}
                  className={`w-full border-l-4 px-3 py-2 text-left font-mono text-xs font-bold transition ${
                    activeModule === i
                      ? "border-[#f5c518] bg-[#f5c518]/10 text-[#1a1a1a]"
                      : "border-transparent text-[#1a1a1a]/50 hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
                  }`}
                >
                  {m.module}
                </button>
              ))}
            </nav>
          </aside>

          {/* Accordion */}
          <div className="flex-1 space-y-0">
            {modules.map((m, i) => (
              <div key={i} className="border-2 border-b-0 border-[#1a1a1a] last:border-b-2">
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left md:px-6 md:py-4"
                >
                  <span className="font-extrabold text-sm md:text-base">{m.module}</span>
                  <span className="font-mono text-lg text-[#1a1a1a]/50">
                    {open === i ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden border-t-2 border-[#1a1a1a]"
                    >
                      <ul className="space-y-2 px-4 py-3 md:px-6 md:py-4">
                        {m.weeks.map((w, wi) => (
                          <li key={wi} className="flex items-start gap-2 text-xs text-[#1a1a1a]/70 md:text-sm">
                            <span className="mt-0.5 text-[#f5c518]">▸</span>
                            {w}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
