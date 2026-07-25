"use client";

import { adminFormsApi } from "@/lib/api/admin";
import type { CreateFormInput, FieldType, FormFieldInput, FormVisibility } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: "short_text", label: "Short text" },
  { value: "long_text", label: "Long text" },
  { value: "single_choice", label: "Single choice" },
  { value: "multi_choice", label: "Multi choice" },
  { value: "dropdown", label: "Dropdown" },
  { value: "date", label: "Date" },
  { value: "file_upload", label: "File upload" },
  { value: "rating", label: "Rating (1–5)" },
];

const NEEDS_OPTIONS: FieldType[] = ["single_choice", "multi_choice", "dropdown"];

function emptyField(order: number): FormFieldInput {
  return {
    label: "",
    field_type: "short_text",
    options: [],
    is_required: false,
    order_index: order,
  };
}

export default function FormBuilderPage() {
  const params = useParams<{ id: string }>();
  const isNew = params.id === "new";
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<FormVisibility>("restricted");
  const [fields, setFields] = useState<FormFieldInput[]>([emptyField(0)]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const updateField = (index: number, patch: Partial<FormFieldInput>) => {
    setFields((prev) =>
      prev.map((f, i) => (i === index ? { ...f, ...patch } : f))
    );
  };

  const addField = () =>
    setFields((prev) => [...prev, emptyField(prev.length)]);

  const removeField = (index: number) =>
    setFields((prev) => prev.filter((_, i) => i !== index));

  const addOption = (index: number) =>
    updateField(index, {
      options: [...(fields[index].options ?? []), ""],
    });

  const updateOption = (fieldIndex: number, optIndex: number, value: string) => {
    const options = [...(fields[fieldIndex].options ?? [])];
    options[optIndex] = value;
    updateField(fieldIndex, { options });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");

    const payload: CreateFormInput = {
      title,
      description,
      visibility,
      fields: fields.map((f, i) => ({ ...f, order_index: i })),
    };

    try {
      if (isNew) {
        await adminFormsApi.create(payload);
      } else {
        await adminFormsApi.update(params.id, payload);
      }
      router.push("/admin-portal/forms");
    } catch {
      setError("Couldn't save the form. Check all fields have labels.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-black">
        {isNew ? "New form" : "Edit form"}
      </h1>

      <div className="mt-6 space-y-4">
        <input
          required
          placeholder="Form title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-2 border-[#1a1a1a] px-3 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-[#f5c518]"
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full border-2 border-[#1a1a1a] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f5c518]"
        />

        <div>
          <label className="mb-1 block text-sm font-bold">Visibility</label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as FormVisibility)}
            className="border-2 border-[#1a1a1a] px-3 py-2"
          >
            <option value="restricted">Restricted — grant access per student</option>
            <option value="all_students">All students</option>
          </select>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-extrabold">Fields</h2>
      <div className="mt-4 space-y-4">
        {fields.map((field, i) => (
          <div key={i} className="border-2 border-[#1a1a1a] p-4">
            <div className="flex gap-2">
              <input
                placeholder="Question label"
                value={field.label}
                onChange={(e) => updateField(i, { label: e.target.value })}
                className="flex-1 border-2 border-[#1a1a1a] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f5c518]"
              />
              <select
                value={field.field_type}
                onChange={(e) =>
                  updateField(i, {
                    field_type: e.target.value as FieldType,
                    options: NEEDS_OPTIONS.includes(e.target.value as FieldType)
                      ? field.options?.length
                        ? field.options
                        : [""]
                      : [],
                  })
                }
                className="border-2 border-[#1a1a1a] px-2 py-2 text-sm"
              >
                {FIELD_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeField(i)}
                className="px-3 text-red-600 hover:underline"
                type="button"
              >
                ✕
              </button>
            </div>

            <label className="mt-2 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={field.is_required}
                onChange={(e) => updateField(i, { is_required: e.target.checked })}
              />
              Required
            </label>

            {NEEDS_OPTIONS.includes(field.field_type) && (
              <div className="mt-3 space-y-2 border-t border-[#1a1a1a]/20 pt-3">
                {(field.options ?? []).map((opt, optI) => (
                  <input
                    key={optI}
                    placeholder={`Option ${optI + 1}`}
                    value={opt}
                    onChange={(e) => updateOption(i, optI, e.target.value)}
                    className="w-full border border-[#1a1a1a]/40 px-2 py-1 text-sm"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => addOption(i)}
                  className="text-xs font-bold text-[#1a1a1a]/60 hover:text-[#1a1a1a]"
                >
                  + Add option
                </button>
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addField}
          className="w-full border-2 border-dashed border-[#1a1a1a]/40 py-3 text-sm font-bold text-[#1a1a1a]/60 hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
        >
          + Add field
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button
        onClick={handleSave}
        disabled={saving || !title || fields.some((f) => !f.label)}
        className="mt-8 w-full border-2 border-[#1a1a1a] bg-[#1a1a1a] px-6 py-3 font-bold text-white shadow-[6px_6px_0px_#f5c518] transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none disabled:opacity-50"
      >
        {saving ? "Saving…" : isNew ? "Create form" : "Save changes"}
      </button>
    </div>
  );
}
