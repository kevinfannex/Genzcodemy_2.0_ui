import OriginStory from "@/components/about/OriginStory";
import MissionStatement from "@/components/about/MissionStatement";
import StatsBand from "@/components/about/StatsBand";
import HowWereDifferent from "@/components/about/HowWereDifferent";
import ValuesChecklist from "@/components/about/ValuesChecklist";
import LowCommitmentCTA from "@/components/about/LowCommitmentCTA";

export const metadata = {
  title: "About | Genzcodemy",
  description:
    "How Genzcodemy was founded, who builds it, and why we teach people to ship — not memorise.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="border-b-2 border-[#1a1a1a] bg-white px-6 pb-16 pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50">
            about_genzcodemy.md
          </p>
          <h1
            className="font-black leading-none tracking-tight text-[#1a1a1a]"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
          >
            About<br />
            <i className="not-italic text-[#f5c518]"
              style={{ fontFamily: "var(--font-gugi)" }}>GENZCODEMY.</i>
          </h1>
        </div>
      </section>

      {/* 1. Origin story as git log */}
      <OriginStory />

      {/* 2. Mission statement */}
      <MissionStatement />

      
      {/* 4. Animated stats */}
      <StatsBand />

      {/* 5. Comparison table */}
      <HowWereDifferent />

      {/* 6. Values checklist */}
      <ValuesChecklist />

      {/* 7. Low-commitment CTA */}
      <LowCommitmentCTA />
    </>
  );
}