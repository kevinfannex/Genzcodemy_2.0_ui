"use client";

import Link from "next/link";

const TOOLS = [
  { name: "Python", icon: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/Python-logo.png" },
  { name: "SQL", icon: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/sql_logo.png" },
  { name: "React", icon: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/react-native-logo-square.webp" },
  { name: "FastAPI", icon: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/fastapi_logo.webp" },
  { name: "PostgreSQL", icon: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/postgreysql_logo.png" },
  { name: "PowerBI", icon: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/microsoft-power-bi_logo.webp" },
  { name: "Git", icon: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/github-logo.png" },
  { name: "JavaScript", icon: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/javascript-logo.webp" },
  {name: "Microsoft Excel", icon: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/Microsoftexcel_logo.jpg"},
  {name: "OpenAI API", icon: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/openai_logo.svg"} 
];



export default function TechStackMarquee() {
  const items = [...TOOLS, ...TOOLS]; // duplicate for seamless loop

  return (
    <section className="border-b-2 border-[#1a1a1a] bg-white py-3 overflow-hidden">
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

      <div className="marquee-track">
        {items.map((tool, i) => (
          <Link
            key={i}
            href="/courses"
            className="flex items-center gap-2 border-r-2 border-white/20 px-8  font-mono text-sm font-bold text-black/80 transition hover:text-[#f5c518] whitespace-nowrap"
          >
            <span className="text-lg">
              <img src={tool.icon} alt={tool.name} className="w-8 h-8" />
            </span>
            {tool.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
