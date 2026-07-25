"use client";

import Link from "next/link";

const TOOLS = [
  { name: "Python", icon: "🐍" },
  { name: "SQL", icon: "🗄️" },
  { name: "React", icon: "⚛️" },
  { name: "FastAPI", icon: "⚡" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Pandas", icon: "🐼" },
  { name: "Git", icon: "🔀" },
  { name: "Docker", icon: "🐋" },
  { name: "Jupyter", icon: "📓" },
  { name: "TypeScript", icon: "🔷" },
];

export default function TechStackMarquee() {
  const items = [...TOOLS, ...TOOLS]; // duplicate for seamless loop

  return (
    <section className="border-b-2 border-[#1a1a1a] bg-[#1a1a1a] py-6 overflow-hidden">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          gap: 0;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* <div className="marquee-track">
        {items.map((tool, i) => (
          <Link
            key={i}
            href="/courses"
            className="flex items-center gap-2 border-r-2 border-white/20 px-8 py-1 font-mono text-sm font-bold text-white/80 transition hover:text-[#f5c518] whitespace-nowrap"
          >
            <span className="text-lg">{tool.icon}</span>
            {tool.name}
          </Link>
        ))}
      </div> */}
    </section>
  );
}
