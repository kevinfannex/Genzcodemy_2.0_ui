// TODO: Replace with real mission statement copy

export default function MissionStatement() {
  return (
    <section className="border-b-2 border-[#1a1a1a] bg-white px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50">
          mission_statement.md
        </p>
        {/* Oversized bold sentence — key word italicised + yellow */}
        <p
          className="font-black leading-[1.05] tracking-tight text-[#1a1a1a]"
          style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)" }}
        >
          We teach people to {" "}
          <i className="not-italic text-[#f5c518]">build</i>,<br />
          not just learn. &nbsp;
        </p>

        {/* Supporting sentence */}
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[#1a1a1a]/65">
          {/* TODO: Replace with real supporting copy */}
         Every course is built around practical learning, real-world projects, expert mentorship, and career support so you graduate with skills that employers value, not just another certificate.
        </p>
      </div>
    </section>
  );
}