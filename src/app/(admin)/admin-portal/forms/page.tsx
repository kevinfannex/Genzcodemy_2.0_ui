"use client";

import { adminFormsApi } from "@/lib/api/admin";
import type { AdminFormListItem } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminFormsPage() {
  const [forms, setForms] = useState<AdminFormListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFormsApi
      .list()
      .then((res) => setForms(res.forms))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this form and all its responses?")) return;
    await adminFormsApi.remove(id);
    setForms((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black">Forms</h1>
        <Link
          href="/admin-portal/forms/builder/new"
          className="border-2 border-[#1a1a1a] bg-[#f5c518] px-4 py-2 font-bold hover:translate-x-[1px] hover:translate-y-[1px]"
        >
          + New form
        </Link>
      </div>

      {loading ? (
        <p className="mt-6 text-[#1a1a1a]/60">Loading…</p>
      ) : forms.length === 0 ? (
        <p className="mt-6 border-2 border-dashed border-[#1a1a1a]/40 p-6 text-[#1a1a1a]/60">
          No forms yet — create one to start collecting responses.
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          {forms.map((f) => (
            <div
              key={f.id}
              className="flex items-center justify-between border-2 border-[#1a1a1a] p-4"
            >
              <div>
                <p className="font-bold">{f.title}</p>
                <p className="text-xs text-[#1a1a1a]/50">
                  {f.responses_count}/{f.assigned_count} responses ·{" "}
                  {f.visibility === "all_students" ? "All students" : "Restricted"}
                </p>
              </div>
              <div className="flex gap-4 text-sm font-bold">
                <Link
                  href={`/admin-portal/forms/${f.id}/responses`}
                  className="hover:underline"
                >
                  Responses
                </Link>
                <Link
                  href={`/admin-portal/forms/builder/${f.id}`}
                  className="hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(f.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
