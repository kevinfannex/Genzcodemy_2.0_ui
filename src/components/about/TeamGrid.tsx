"use client";

import { useState } from "react";

// TODO: Replace placeholder names, roles, quotes, and photo paths with real team data.
// Add real mentor photos under /public/team/ and update the `photo` field.
const TEAM = [
  {
    name: "Santhosh R.",
    role: "Co-founder · Ex-Razorpay · 5 yrs data eng",
    quote:
      "I teach you to ask the right question before you write a line of SQL. That instinct is what separates analysts from reporters.",
    photo: null, // TODO: replace with "/team/santhosh.jpg"
    initial: "S",
  },
  {
    name: "Divya K.",
    role: "Co-founder · Ex-Meesho · 4 yrs backend & platform",
    quote:
      "We ship something real together. Every concept I teach maps directly to the codebase you are building — no throwaway exercises.",
    photo: null, // TODO: replace with "/team/divya.jpg"
    initial: "D",
  },
  {
    name: "Arjun M.",
    role: "Mentor · Ex-Zepto · 3 yrs analytics & growth",
    quote:
      "Data without context is noise. I help students learn to find the story in the numbers and communicate it to stakeholders who can act on it.",
    photo: null, // TODO: replace with "/team/arjun.jpg"
    initial: "A",
  },
  {
    name: "Priya N.",
    role: "Mentor · Freelance · Full-stack product developer",
    quote:
      "There is no shortcut to muscle memory. We code every day, review every day, and ship every milestone — that is how the habit forms.",
    photo: null, // TODO: replace with "/team/priya.jpg"
    initial: "P",
  },
];

function TeamCard({ member }: { member: (typeof TEAM)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="border-2 border-[#1a1a1a] bg-white shadow-[8px_8px_0px_#1a1a1a] transition hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[10px_10px_0px_#1a1a1a]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* macOS-style title bar */}
      <div className="flex items-center gap-2 border-b-2 border-[#1a1a1a] bg-[#2d2d2d] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full border border-[#e0443e] bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full border border-[#d4a027] bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full border border-[#1faa35] bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-white/40">
          {member.name.toLowerCase().replace(" ", "_")}.sh
        </span>
      </div>

      {/* Card body */}
      <div className="relative overflow-hidden p-6">
        <div className="flex items-start gap-4">
          {/* Photo / placeholder */}
          {member.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.photo}
              alt={member.name}
              className="h-16 w-16 shrink-0 rounded-full border-2 border-[#1a1a1a] object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#1a1a1a] bg-[#f5c518] text-2xl font-black text-[#1a1a1a]">
              {member.initial}
            </div>
          )}

          <div>
            <h3 className="text-lg font-extrabold">{member.name}</h3>
            <p className="mt-0.5 font-mono text-xs text-[#1a1a1a]/50">
              {member.role}
            </p>
          </div>
        </div>

        {/* Hover quote — slides up */}
        <div
          className="mt-4 transition-all duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <p className="border-t-2 border-[#1a1a1a]/10 pt-4 text-sm leading-relaxed text-[#1a1a1a]/70">
            &ldquo;{member.quote}&rdquo;
          </p>
        </div>

        {/* Default "hover to reveal" hint */}
        <p
          className="mt-4 font-mono text-xs text-[#1a1a1a]/30 transition-opacity duration-300"
          style={{ opacity: hovered ? 0 : 1 }}
        >
          hover to read →
        </p>
      </div>
    </div>
  );
}

export default function TeamGrid() {
  return (
    <section className="border-b-2 border-[#1a1a1a] bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50">
          {/* team.json */}
        </p>
        <h2 className="mb-12 text-4xl font-black md:text-5xl">
          The people <span className="not-italic text-[#f5c518]">behind it</span>.
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {TEAM.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
  // return (
  //   <section className="border-b-2 border-[#1a1a1a] bg-white px-6 py-24">
  //     <div className="mx-auto max-w-6xl">
  //       <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50">
  //         // team.json
  //       </p>
  //       <h2 className="mb-12 text-4xl font-black md:text-5xl">
  //         The people{" "}
  //         <i className="not-italic text-[#f5c518]">behind it</i>.
  //       </h2>
  //       <div className="grid gap-8 md:grid-cols-2">
  //         {TEAM.map((m) => (
  //           <TeamCard key={m.name} member={m} />
  //         ))}
  //       </div>
  //     </div>
  //   </section>
  // );
}