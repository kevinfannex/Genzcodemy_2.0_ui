"use client";

import { formsApi } from "@/lib/api/forms";
import { ApiRequestError } from "@/lib/api/client";
import type { FormAnswers, FormDetail } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FillFormPage() {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<FormDetail | null>(null);
  const [answers, setAnswers] = useState<FormAnswers>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    formsApi
      .getById(id)
      .then(setForm)
      .catch(() => setError("You don't have access to this form."))
      .finally(() => setLoading(false));
  }, [id]);

  const setAnswer = (fieldId: string, value: string | string[]) =>
    setAnswers((prev) => ({ ...prev, [fieldId]: value }));

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      await formsApi.submit(id, answers);
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : "Couldn't submit — check required fields and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-[#1a1a1a]/60">Loading…</p>;

  if (error && !form) {
    return (
      <p className="border-2 border-[#1a1a1a] bg-[#fff8e1] p-4 font-mono text-sm">
        {error}
      </p>
    );
  }

  if (submitted) {
    return (
      <div className="border-2 border-[#1a1a1a] p-8 text-center shadow-[8px_8px_0px_#1a1a1a]">
        <h1 className="text-2xl font-black">Response submitted ✓</h1>
        <p className="mt-2 text-[#1a1a1a]/70">Thanks — we&apos;ve got it.</p>
      </div>
    );
  }

  if (!form) return null;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-black">{form.title}</h1>
      {form.description && (
        <p className="mt-2 text-[#1a1a1a]/70">{form.description}</p>
      )}

      <div className="mt-8 space-y-6">
        {form.fields
          .sort((a, b) => a.order_index - b.order_index)
          .map((field) => (
            <div key={field.id} className="border-2 border-[#1a1a1a] p-4">
              <label className="mb-2 block font-bold">
                {field.label}
                {field.is_required && <span className="text-red-600"> *</span>}
              </label>

              {(field.field_type === "short_text" ||
                field.field_type === "date") && (
                <input
                  type={field.field_type === "date" ? "date" : "text"}
                  required={field.is_required}
                  onChange={(e) => setAnswer(field.id, e.target.value)}
                  className="w-full border-2 border-[#1a1a1a] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f5c518]"
                />
              )}

              {field.field_type === "long_text" && (
                <textarea
                  required={field.is_required}
                  rows={4}
                  onChange={(e) => setAnswer(field.id, e.target.value)}
                  className="w-full border-2 border-[#1a1a1a] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f5c518]"
                />
              )}

              {field.field_type === "dropdown" && (
                <select
                  required={field.is_required}
                  defaultValue=""
                  onChange={(e) => setAnswer(field.id, e.target.value)}
                  className="w-full border-2 border-[#1a1a1a] px-3 py-2"
                >
                  <option value="" disabled>
                    Select…
                  </option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {field.field_type === "single_choice" && (
                <div className="space-y-2">
                  {field.options?.map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={field.id}
                        value={opt}
                        onChange={(e) => setAnswer(field.id, e.target.value)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}

              {field.field_type === "multi_choice" && (
                <div className="space-y-2">
                  {field.options?.map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={opt}
                        onChange={(e) => {
                          const current = (answers[field.id] as string[]) || [];
                          setAnswer(
                            field.id,
                            e.target.checked
                              ? [...current, opt]
                              : current.filter((v) => v !== opt)
                          );
                        }}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}

              {field.field_type === "rating" && (
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setAnswer(field.id, String(n))}
                      className={`h-10 w-10 border-2 border-[#1a1a1a] font-bold ${
                        answers[field.id] === String(n) ? "bg-[#f5c518]" : ""
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              )}

              {field.field_type === "file_upload" && (
                <p className="text-sm text-[#1a1a1a]/50">
                  File upload — wired once Storage endpoint is available.
                </p>
              )}
            </div>
          ))}
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="mt-8 w-full border-2 border-[#1a1a1a] bg-[#1a1a1a] px-6 py-3 font-bold text-white shadow-[6px_6px_0px_#f5c518] transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Submit"}
      </button>
    </div>
  );
}
