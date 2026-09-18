// TODO: Replace partner placeholder boxes with real partner logos under /public/partners/
// Use Next.js <Image> with grayscale filter once real logo files are added.

export default function EmployerHero() {
  const PARTNERS = [
    "Razorpay",
    "Meesho",
    "Zepto",
    "CRED",
    "Accenture"
  ];

  return (
    <section className="border-b-2 border-[#1a1a1a] bg-white px-6 pb-16 pt-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50">
          hiring_partners.sh
        </p>

        {/* Headline */}
        <h1
          className="font-black leading-none tracking-tight text-[#1a1a1a]"
          style={{ fontSize: "clamp(2.8rem, 8vw, 8rem)" }}
        >
          Hire developers<br />
          who&apos;ve already{" "}
          <i className="not-italic text-[#f5c518]">contribute</i>.
        </h1>

        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[#1a1a1a]/65">
          {/* TODO: Replace with real copy */}
          Every <span style={{ fontFamily: "var(--font-gugi)" }}>Genzcodemy</span> graduate has shipped a real capstone project, worked
          through a mentor-reviewed codebase, and interviewed against production
          scenarios   not whiteboard puzzles.
        </p>

        {/* Partner logo strip */}
        <div className="mt-14">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/30">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {PARTNERS.map((name) => (
              <div
                key={name}
                // TODO: Replace this div with <Image> for the real logo, styled grayscale + opacity-50
                className="border-2 border-[#1a1a1a]/20 bg-[#f5f5f5] px-6 py-3 font-mono text-sm font-bold text-[#1a1a1a]/40 grayscale"
              >
                {name}
              </div>
            ))}
            <div className="border-2 border-dashed border-[#1a1a1a]/20 px-6 py-3 font-mono text-xs text-[#1a1a1a]/30">
              + your company
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}