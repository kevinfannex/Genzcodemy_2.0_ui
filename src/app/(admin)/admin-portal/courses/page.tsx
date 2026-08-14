"use client";

import { adminCoursesApi } from "@/lib/api/admin";
import { coursesApi } from "@/lib/api/courses";
import type { Course } from "@/types";
import { useEffect, useState } from "react";

type FormState = Omit<Course, "id">;

const emptyForm: FormState = {
  slug: "",
  title: "",
  description: "",
  tools: [],
  duration_weeks: 8,
  price: 0,
  priceMYR: 0,
  is_published: true,
};

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [toolsInput, setToolsInput] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    coursesApi
      .list()
      .then((res) => setCourses(res.courses))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    coursesApi
      .list()
      .then((res) => setCourses(res.courses))
      .finally(() => setLoading(false));
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setToolsInput("");
    setShowForm(true);
    setError("");
  };

  const openEdit = (course: Course) => {
    setEditingId(course.id);
    setForm({
      slug: course.slug,
      title: course.title,
      description: course.description,
      tools: course.tools,
      duration_weeks: course.duration_weeks,
      price: course.price,
      priceMYR: course.priceMYR,
      is_published: course.is_published,
    });
    setToolsInput(course.tools.join(", "));
    setShowForm(true);
    setError("");
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");

    const payload: FormState = {
      ...form,
      tools: toolsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await adminCoursesApi.update(editingId, payload);
      } else {
        await adminCoursesApi.create(payload);
      }
      setShowForm(false);
      load();
    } catch {
      setError("Couldn't save the course. Check the slug is unique.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this course? Existing enrollments will be orphaned.")) return;
    await adminCoursesApi.remove(id);
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black">Courses</h1>
        <button
          onClick={openCreate}
          className="border-2 border-[#1a1a1a] bg-[#f5c518] px-4 py-2 font-bold hover:translate-x-[1px] hover:translate-y-[1px]"
        >
          + New course
        </button>
      </div>

      {showForm && (
        <div className="mt-6 max-w-xl border-2 border-[#1a1a1a] p-5 shadow-[6px_6px_0px_#1a1a1a]">
          <h2 className="text-xl font-extrabold">
            {editingId ? "Edit course" : "New course"}
          </h2>

          <div className="mt-4 space-y-3">
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border-2 border-[#1a1a1a] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f5c518]"
            />
            <input
              placeholder="Slug (e.g. data-analytics)"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full border-2 border-[#1a1a1a] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f5c518]"
            />
            <textarea
              placeholder="Description"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border-2 border-[#1a1a1a] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f5c518]"
            />
            <input
              placeholder="Tools (comma separated: Python, Pandas, SQL)"
              value={toolsInput}
              onChange={(e) => setToolsInput(e.target.value)}
              className="w-full border-2 border-[#1a1a1a] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f5c518]"
            />
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Duration (weeks)"
                value={form.duration_weeks}
                onChange={(e) =>
                  setForm({ ...form, duration_weeks: Number(e.target.value) })
                }
                className="w-1/2 border-2 border-[#1a1a1a] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f5c518]"
              />
              <input
                type="number"
                placeholder="Price (₹)"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="w-1/3 border-2 border-[#1a1a1a] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f5c518]"
              />
              <input
                type="number"
                placeholder="Price (RM)"
                value={form.priceMYR}
                onChange={(e) => setForm({ ...form, priceMYR: Number(e.target.value) })}
                className="w-1/3 border-2 border-[#1a1a1a] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f5c518]"
              />
            </div>
            <label className="flex items-center gap-2 text-sm font-bold">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(e) =>
                  setForm({ ...form, is_published: e.target.checked })
                }
              />
              Published (visible on the public site)
            </label>
          </div>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          <div className="mt-5 flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving || !form.title || !form.slug}
              className="flex-1 border-2 border-[#1a1a1a] bg-[#1a1a1a] px-4 py-2 font-bold text-white disabled:opacity-50"
            >
              {saving ? "Saving…" : editingId ? "Save changes" : "Create course"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="border-2 border-[#1a1a1a] px-4 py-2 font-bold hover:bg-[#1a1a1a] hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="mt-6 text-[#1a1a1a]/60">Loading…</p>
      ) : (
        <div className="mt-6 space-y-3">
          {courses.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between border-2 border-[#1a1a1a] p-4"
            >
              <div>
                <p className="font-bold">
                  {c.title}{" "}
                  {!c.is_published && (
                    <span className="ml-2 border border-[#1a1a1a]/40 px-2 py-0.5 text-xs font-normal text-[#1a1a1a]/50">
                      draft
                    </span>
                  )}
                </p>
                <p className="text-xs text-[#1a1a1a]/50">
                  /{c.slug} · {c.duration_weeks}w · ₹{c.price.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="flex gap-4 text-sm font-bold">
                <button onClick={() => openEdit(c)} className="hover:underline">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
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
