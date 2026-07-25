"use client";

import { adminFormsApi } from "@/lib/api/admin";
import type { FormResponseItem } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FormResponsesPage() {
  const { id } = useParams<{ id: string }>();
  const [responses, setResponses] = useState<FormResponseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFormsApi
      .responses(id)
      .then((res) => setResponses(res.responses))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div>
      <h1 className="text-3xl font-black">Responses</h1>

      {loading ? (
        <p className="mt-6 text-[#1a1a1a]/60">Loading…</p>
      ) : responses.length === 0 ? (
        <p className="mt-6 border-2 border-dashed border-[#1a1a1a]/40 p-6 text-[#1a1a1a]/60">
          No responses yet.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {responses.map((r) => (
            <div key={r.id} className="border-2 border-[#1a1a1a] p-4">
              <p className="font-bold">{r.student.full_name}</p>
              <p className="text-xs text-[#1a1a1a]/50">
                {r.student.email} · {new Date(r.submitted_at).toLocaleString()}
              </p>
              <div className="mt-3 space-y-1 border-t border-[#1a1a1a]/20 pt-3 font-mono text-sm">
                {Object.entries(r.answers).map(([fieldId, value]) => (
                  <p key={fieldId}>
                    <span className="text-[#1a1a1a]/50">{fieldId}:</span>{" "}
                    {Array.isArray(value) ? value.join(", ") : value}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
