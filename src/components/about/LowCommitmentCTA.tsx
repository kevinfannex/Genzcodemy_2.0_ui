// No booking flow found in the project — linking to /contact?type=intro-call
// TODO: If a booking system is added, replace the href with the booking page URL

import Link from "next/link";

export default function LowCommitmentCTA() {
  return (
    <section className="border-b-2 border-[#1a1a1a] bg-[#1a1a1a] px-6 py-28 text-center">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-white/30">
          no pressure
        </p>

        <h2
          className="font-black leading-tight text-white"
          style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}
        >
          Meet us before{" "}
          <i className="not-italic text-[#f5c518]">you commit</i>.
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
          {/* TODO: Replace with real copy */}
          Book a free 20-minute intro call. No sales pitch — just a chance to
          ask questions, see our curriculum, and decide if this is the right
          move for you.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact?type=intro-call"
            className="border-2 border-[#f5c518] bg-[#f5c518] px-8 py-4 text-lg font-black text-[#1a1a1a] shadow-[6px_6px_0px_#ffffff] transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
          >
            Book a free intro call →
          </Link>
          <Link
            href="/courses"
            className="border-2 border-white/30 px-8 py-4 text-lg font-bold text-white/70 transition hover:border-white hover:text-white"
          >
            Browse courses first
          </Link>
        </div>

        <p className="mt-6 font-mono text-xs text-white/25">
          No commitment required. Cancel or reschedule any time.
        </p>
      </div>
    </section>
  );
}