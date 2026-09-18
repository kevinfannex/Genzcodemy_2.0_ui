"use client";

import { useState } from "react";
import type { Course } from "@/types";
import { useCurrency } from "@/context/CurrencyContext";

interface FeeComparisonTableProps {
  courses: Course[];
}

const PREREQS: Record<string, string> = {
  "data-analytics": "Basic computer literacy",
  "python-full-stack": "Some programming exposure",
};

const EXPECTED_SALARY: Record<string, string> = {
  "data-analytics": "₹3–7 LPA",
  "python-full-stack": "₹4–9 LPA",
};


const COURSE_OUTCOME: Record<string, string> = {
  "data-analytics": "Analyze data, build dashboards, generate business insights",
  "python-full-stack": "Build full-stack applications and integrate AI features",
};

const CAREER_PATHS: Record<string, string> = {
  "data-analytics": "Data Analyst, BI Analyst, Reporting Analyst",
  "python-full-stack": "Full Stack Developer, Python Developer, AI Application Developer",
};

export default function FeeComparisonTable({ courses }: FeeComparisonTableProps) {
  const published = courses.filter((c) => c.is_published);
  const [visible, setVisible] = useState<string[]>(published.map((c) => c.id));
  const { formatPrice } = useCurrency();

  if (published.length < 2) return null;

  const shownCourses = published.filter((c) => visible.includes(c.id));

  const toggle = (id: string) =>
    setVisible((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <section className="relative border-b-2 border-[#1a1a1a] bg-[#faf9f5] px-6 py-24 overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `linear-gradient(to right, #1a1a1a10 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a10 1px, transparent 1px)`,
          backgroundSize: "36px 36px"
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50 font-bold">
          // compare_courses
        </p>
        <h2 className="mb-10 text-4xl font-black md:text-5xl">
          Compare <i className="not-italic text-[#f5c518] underline decoration-[#1a1a1a]/20">courses</i>
        </h2>

        {/* Toggle checkboxes as premium pills */}
        <div className="mb-8 flex flex-wrap gap-4">
          {published.map((c) => (
            <label
              key={c.id}
              className={`flex cursor-pointer items-center gap-3 border-2 border-[#1a1a1a] px-5 py-2.5 font-bold text-sm transition-all select-none ${visible.includes(c.id)
                  ? "bg-[#f5c518] shadow-[4px_4px_0px_#1a1a1a]"
                  : "bg-white text-[#1a1a1a]/60 hover:bg-gray-50"
                }`}
            >
              <input
                type="checkbox"
                checked={visible.includes(c.id)}
                onChange={() => toggle(c.id)}
                className="accent-[#1a1a1a] w-4 h-4 cursor-pointer"
              />
              {c.title}
            </label>
          ))}
        </div>

        {/* Table */}
        {shownCourses.length > 0 && (
          <div className="overflow-x-auto border-2 border-[#1a1a1a] bg-white shadow-[8px_8px_0px_#1a1a1a]">
            <table className="w-full text-left text-sm md:text-base">
              <thead>
                <tr className="border-b-2 border-[#1a1a1a] bg-[#1a1a1a] text-white">
                  <th className="px-6 py-4 font-black tracking-wide uppercase text-xs w-[150px]">Feature</th>
                  {shownCourses.map((c) => (
                    <th key={c.id} className="px-6 py-4 font-black">
                      {c.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price */}
                <tr className="border-b-2 border-[#1a1a1a]/10">
                  <td className="px-6 py-5 font-bold text-[#1a1a1a]/60">Price</td>
                  {shownCourses.map((c) => (
                    <td key={c.id} className="px-6 py-5 font-mono text-xl font-bold text-[#1a1a1a]">
                      {formatPrice(c.price, c.priceMYR)}
                    </td>
                  ))}
                </tr>
                {/* Duration */}
                <tr className="border-b-2 border-[#1a1a1a]/10 bg-[#faf9f5]">
                  <td className="px-6 py-5 font-bold text-[#1a1a1a]/60">Duration</td>
                  {shownCourses.map((c) => (
                    <td key={c.id} className="px-6 py-5 font-mono font-bold">
                      {c.duration_weeks} weeks
                    </td>
                  ))}
                </tr>
                {/* Tools */}
                <tr className="border-b-2 border-[#1a1a1a]/10">
                  <td className="px-6 py-5 font-bold text-[#1a1a1a]/60">Tools</td>
                  {shownCourses.map((c) => (
                    <td key={c.id} className="px-6 py-5">
                      <div className="flex flex-wrap gap-1.5">
                        {c.tools.map((t) => (
                          <span
                            key={t}
                            className="border border-[#1a1a1a] bg-[#f5c518] px-2 py-0.5 font-mono text-[10px] font-bold"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                {/* Prerequisites */}
                <tr>
                  <td className="px-6 py-5 font-bold text-[#1a1a1a]/60">Prerequisites</td>
                  {shownCourses.map((c) => (
                    <td key={c.id} className="px-6 py-5 font-medium text-[#1a1a1a]/80">
                      {PREREQS[c.slug] ?? "Open to all"}
                    </td>
                  ))}
                </tr>
                {/* Expected Salary */}
                <tr className="border-t-2 border-[#1a1a1a]/10 bg-[#faf9f5]">
                  <td className="px-6 py-5 font-bold text-[#1a1a1a]/60">Expected Salary</td>
                  {shownCourses.map((c) => (
                    <td key={c.id} className="px-6 py-5 font-mono font-bold text-[#1a1a1a]">
                      {EXPECTED_SALARY[c.slug] ?? " "}
                    </td>
                  ))}
                </tr>
                {/* Course Outcome */}
                <tr className="border-t-2 border-[#1a1a1a]/10">
                  <td className="px-6 py-5 font-bold text-[#1a1a1a]/60">Course Outcome</td>
                  {shownCourses.map((c) => (
                    <td key={c.id} className="px-6 py-5 font-medium text-[#1a1a1a]/80">
                      {COURSE_OUTCOME[c.slug] ?? " "}
                    </td>
                  ))}
                </tr>
                {/* Career Paths */}
                <tr className="border-t-2 border-[#1a1a1a]/10 bg-[#faf9f5]">
                  <td className="px-6 py-5 font-bold text-[#1a1a1a]/60">Career Paths</td>
                  {shownCourses.map((c) => (
                    <td key={c.id} className="px-6 py-5 font-medium text-[#1a1a1a]/80">
                      {CAREER_PATHS[c.slug] ?? " "}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
