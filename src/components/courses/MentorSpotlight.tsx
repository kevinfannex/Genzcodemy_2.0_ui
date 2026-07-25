"use client";

import { motion } from "framer-motion";

// Static mentor data keyed by course slug.
// TODO: Add real mentor photos under /public/mentors/ and update image paths.
const MENTORS: Record<
  string,
  {
    name: string;
    background: string;
    focus: string;
    // TODO: replace with /mentors/<name>.jpg
    photo: string | null;
  }
> = {
  "data-analytics": {
    name: "Santhosh R.",
    background: "Ex-Razorpay · 5 yrs data engineering",
    focus:
      "I focus on teaching you to ask the right question before you write a single line of SQL — that instinct is what separates analysts from reporters.",
    photo: null,
  },
  "python-full-stack": {
    name: "Divya K.",
    background: "Ex-Meesho · 4 yrs backend & platform eng",
    focus:
      "We will ship something real together. Every concept I teach has a direct counterpart in the codebase you're building — no throwaway exercises.",
    photo: null,
  },
};

interface MentorSpotlightProps {
  slug: string;
}

export default function MentorSpotlight({ slug }: MentorSpotlightProps) {
  const mentor = MENTORS[slug];
  if (!mentor) return null;

  return (
    <section className="border-b-2 border-[#1a1a1a] bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50">
          // mentor_spotlight
        </p>
        <h2 className="mb-10 text-4xl font-black md:text-5xl">
          Your <i className="not-italic text-[#f5c518]">mentor</i>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl border-2 border-[#1a1a1a] bg-white shadow-[8px_8px_0px_#1a1a1a]"
        >
          {/* macOS-style title bar */}
          <div className="flex items-center gap-2 border-b-2 border-[#1a1a1a] bg-[#2d2d2d] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e] border border-[#d4a027]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840] border border-[#1faa35]" />
            <span className="ml-3 font-mono text-xs text-white/50">
              mentor_profile.sh
            </span>
          </div>

          {/* Card body */}
          <div className="flex items-start gap-6 p-6">
            {/* Circular photo / placeholder */}
            <div className="shrink-0">
              {mentor.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mentor.photo}
                  alt={mentor.name}
                  className="h-20 w-20 rounded-full border-2 border-[#1a1a1a] object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#1a1a1a] bg-[#f5c518] text-2xl font-black text-[#1a1a1a]">
                  {mentor.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <h3 className="text-xl font-extrabold">{mentor.name}</h3>
              <p className="mt-0.5 font-mono text-xs text-[#1a1a1a]/50">
                {mentor.background}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#1a1a1a]/70">
                &ldquo;{mentor.focus}&rdquo;
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
