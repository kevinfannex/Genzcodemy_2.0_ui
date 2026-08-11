"use client";

import { motion, AnimatePresence } from "framer-motion";

// TODO: Replace anonymized data with real graduate profiles when students opt-in.
// Real thumbnail screenshots should go under /public/portfolios/
export const GRADUATES = [
  {
    id: "g1",
    initials: "A.M.",
    skills: ["Python", "SQL", "Pandas", "Power BI"],
    track: "Data Analytics",
    project: "Sales Churn Dashboard — Postgres + Power BI",
    thumbnail: null, // TODO: /portfolios/g1-thumbnail.png
    portfolioUrl: "#", // TODO: real GitHub/portfolio URL
  },
  {
    id: "g2",
    initials: "R.K.",
    skills: ["FastAPI", "React", "Postgres"],
    track: "Full Stack",
    project: "SaaS Task Manager — FastAPI + React, deployed on Railway",
    thumbnail: null,
    portfolioUrl: "#",
  },
  {
    id: "g3",
    initials: "P.S.",
    skills: ["Python", "SQL", "Seaborn", "Pandas"],
    track: "Data Analytics",
    project: "E-commerce KPI Report Automation — Python + Postgres",
    thumbnail: null,
    portfolioUrl: "#",
  },
  {
    id: "g4",
    initials: "D.T.",
    skills: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
    track: "Full Stack",
    project: "Freelance CRM — full stack product shipped in 8 weeks",
    thumbnail: null,
    portfolioUrl: "#",
  },
];

function PlaceholderThumb({ label }: { label: string }) {
  return (
    <div className="flex h-36 w-full items-center justify-center border-b-2 border-[#1a1a1a] bg-[#f0f0f0]">
      <svg width="100%" height="100%" viewBox="0 0 300 144" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="144" fill="#ebebeb" />
        <line x1="0" y1="0" x2="300" y2="144" stroke="#ddd" strokeWidth="1" />
        <line x1="300" y1="0" x2="0" y2="144" stroke="#ddd" strokeWidth="1" />
        <text x="150" y="72" textAnchor="middle" dominantBaseline="middle" fill="#bbb" fontFamily="monospace" fontSize="11">
          {label}
        </text>
      </svg>
    </div>
  );
}

interface GraduateShowcaseProps {
  graduates?: typeof GRADUATES;
}

export default function GraduateShowcase({ graduates = GRADUATES }: GraduateShowcaseProps) {
  return (
    <section className="border-b-2 border-[#1a1a1a] bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50">
          // graduate_profiles
        </p>
        <h2 className="mb-12 text-4xl font-black md:text-5xl">
          See who you&apos;re{" "}
          <i className="not-italic text-[#f5c518]">hiring</i>.
        </h2>

        <motion.div
          layout
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {graduates.map((g) => (
              <motion.div
                key={g.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25 }}
                className="border-2 border-[#1a1a1a] bg-white shadow-[6px_6px_0px_#1a1a1a] transition hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0px_#1a1a1a]"
              >
                {/* Project thumbnail */}
                {g.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={g.thumbnail}
                    alt={g.project}
                    className="h-36 w-full border-b-2 border-[#1a1a1a] object-cover"
                  />
                ) : (
                  <PlaceholderThumb label={g.project} />
                )}

                <div className="p-5">
                  {/* Initials + track */}
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-[#1a1a1a] bg-[#f5c518] font-mono text-xs font-black">
                      {g.initials}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#1a1a1a]/50">
                      {g.track}
                    </span>
                  </div>

                  {/* Project */}
                  <p className="mb-3 text-xs leading-relaxed text-[#1a1a1a]/70">
                    {g.project}
                  </p>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-1">
                    {g.skills.map((s) => (
                      <span
                        key={s}
                        className="border border-[#1a1a1a]/30 px-2 py-0.5 font-mono text-[10px] text-[#1a1a1a]/60"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Portfolio link */}
                  <a
                    href={g.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center gap-1 font-mono text-xs font-bold text-[#1a1a1a] underline hover:text-[#1a1a1a]/60"
                  >
                    View portfolio ↗
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}