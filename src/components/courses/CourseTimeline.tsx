"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Static curriculum data keyed by course slug.
// Replace/extend with real API data when the backend exposes modules.
const CURRICULUM: Record<string, { module: string; weeks: string[] }[]> = {
  "data-analytics": [
    {
      module: "Excel for Data Analysis",
      weeks: [
        "Week 1: SELECT, WHERE, JOINs, and aggregate functions",
        "Week 2: Subqueries, CTEs, and window functions",
        "Week 3: Indexes, query optimisation, real datasets",
      ],
    },
    {
      module: "SQL for Database Management",
      weeks: [
        "Week 4: Python basics, pandas DataFrames, data cleaning",
        "Week 5: numpy, matplotlib, seaborn — EDA & visualisations",
        "Week 6: Automating reports with Python scripts",
      ],
    },
    {
      module: "Power BI Essentials:",
      weeks: [
        "Week 7: Power BI Desktop — DAX, relationships, slicers",
        "Week 8: Publishing dashboards, capstone project kickoff",
        "Week 9–12: Capstone build, mentor reviews, presentation",
      ],
    },
    {module: "Data Cleaning Techniques:",
      weeks: [
        "Week 7: Power BI Desktop — DAX, relationships, slicers",
        "Week 8: Publishing dashboards, capstone project kickoff",
        "Week 9–12: Capstone build, mentor reviews, presentation",
      ],
    },
    {module: "Basic DAX Measures:",
      weeks: [
        "Week 7: Power BI Desktop — DAX, relationships, slicers",
        "Week 8: Publishing dashboards, capstone project kickoff",
        "Week 9–12: Capstone build, mentor reviews, presentation",
      ],
    },
     {module: "Basic Power Query:",
      weeks: [
        "Week 7: Power BI Desktop — DAX, relationships, slicers",
        "Week 8: Publishing dashboards, capstone project kickoff",
        "Week 9–12: Capstone build, mentor reviews, presentation",
      ],
    },
     {module: "Interactive Dashboard:",
      weeks: [
        "Week 7: Power BI Desktop — DAX, relationships, slicers",
        "Week 8: Publishing dashboards, capstone project kickoff",
        "Week 9–12: Capstone build, mentor reviews, presentation",
      ],
    }
  ],
  "python-full-stack": [
    {
      module: " Frontend: ",
      weeks: [
        "Week 1: Python refresher, virtual envs, FastAPI project setup",
        "Week 2: Routes, Pydantic models, dependency injection",
        "Week 3: JWT auth, OAuth2, role-based access control",
      ],
    },
    {
      module: "Backend:",
      weeks: [
        "Week 4: Postgres schema design, SQLAlchemy ORM",
        "Week 5: Alembic migrations, seeding, query optimisation",
      ],
    },
    {
      module: "Database",
      weeks: [
        "Week 6: React + TypeScript, component architecture",
        "Week 7: React Query, Tailwind, form handling",
        "Week 8: Routing, auth integration with backend",
      ],
    },
    {
      module: "Full Stack",
      weeks: [
        "Week 9: Docker, CI/CD basics, Render/Railway deploy",
        "Week 10–12: Capstone product build, demo day",
      ],
    },
     {
      module: "AI Integration",
      weeks: [
        "Week 6: React + TypeScript, component architecture",
        "Week 7: React Query, Tailwind, form handling",
        "Week 8: Routing, auth integration with backend",
      ],
    },
     {
      module: "AI tools ",
      weeks: [
        "Week 6: React + TypeScript, component architecture",
        "Week 7: React Query, Tailwind, form handling",
        "Week 8: Routing, auth integration with backend",
      ],
    },
     {
      module: "Full Stack Advanced",
      weeks: [
        "Week 6: React + TypeScript, component architecture",
        "Week 7: React Query, Tailwind, form handling",
        "Week 8: Routing, auth integration with backend",
      ],
    },
     {
      module: "AI Advanced ",
      weeks: [
        "Week 6: React + TypeScript, component architecture",
        "Week 7: React Query, Tailwind, form handling",
        "Week 8: Routing, auth integration with backend",
      ],
    },
     {
      module: "Enterprise",
      weeks: [
        "Week 6: React + TypeScript, component architecture",
        "Week 7: React Query, Tailwind, form handling",
        "Week 8: Routing, auth integration with backend",
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
    <section className="border-b-2 border-[#1a1a1a] bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50">
          // curriculum
        </p>
        <h2 className="mb-12 text-4xl font-black md:text-5xl">
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
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-extrabold">{m.module}</span>
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
                      <ul className="space-y-2 px-6 py-4">
                        {m.weeks.map((w, wi) => (
                          <li key={wi} className="flex items-start gap-2 text-sm text-[#1a1a1a]/70">
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
