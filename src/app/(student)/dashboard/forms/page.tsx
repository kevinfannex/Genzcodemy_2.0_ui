"use client";

import { formsApi } from "@/lib/api/forms";
import type { FormSummary } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyFormsPage() {
  const [forms, setForms] = useState<FormSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    formsApi
      .myForms()
      .then((res) => setForms(res.forms))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-black">Forms</h1>

      {loading && <p className="mt-6 text-[#1a1a1a]/60">Loading…</p>}

      {!loading && forms.length === 0 && (
        <p className="mt-6 border-2 border-dashed border-[#1a1a1a]/40 p-6 text-[#1a1a1a]/60">
          No forms assigned to you right now.
        </p>
      )}

      <div className="mt-6 space-y-3">
        {forms.map((f) => (
          <Link
            key={f.id}
            href={`/dashboard/forms/${f.id}`}
            className="flex items-center justify-between border-2 border-[#1a1a1a] p-4 transition hover:bg-[#f5c518]/20"
          >
            <div>
              <p className="font-bold">{f.title}</p>
              <p className="text-xs text-[#1a1a1a]/50">{f.description}</p>
            </div>
            <span
              className={`border-2 border-[#1a1a1a] px-3 py-1 text-xs font-bold uppercase ${
                f.is_submitted ? "bg-green-200" : "bg-[#f5c518]"
              }`}
            >
              {f.is_submitted ? "Submitted" : "Pending"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
