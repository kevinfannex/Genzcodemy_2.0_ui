import React from "react";

export default function PostSubmitTimeline() {
  const steps = [
    { label: "You submit", desc: "Fill & send the enquiry" },
    { label: "We review", desc: "Within 24 hours" },
    { label: "We call you", desc: "To discuss your goals" },
  ];

  return (
    <div className="mb-8 border-2 border-[#1a1a1a] bg-white p-4 shadow-[4px_4px_0px_#1a1a1a]">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50">
        // process_timeline
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="flex-1">
              <span className="font-mono text-xs font-bold text-[#f5c518] mr-2">
                0{idx + 1}.
              </span>
              <span className="font-bold text-[#1a1a1a]">{step.label}</span>
              <p className="text-xs text-[#1a1a1a]/60">{step.desc}</p>
            </div>
            {idx < steps.length - 1 && (
              <span className="hidden text-[#1a1a1a]/30 sm:inline">➔</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
