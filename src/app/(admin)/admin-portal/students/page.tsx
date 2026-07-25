"use client";

import { adminStudentsApi } from "@/lib/api/admin";
import type { AdminStudentListItem } from "@/types";
import { useEffect, useState } from "react";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<AdminStudentListItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const load = (searchTerm = "") => {
    setLoading(true);
    adminStudentsApi
      .list({ search: searchTerm, page: 1, limit: 50 })
      .then((res) => setStudents(res.items))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    adminStudentsApi
      .list({ page: 1, limit: 50 })
      .then((res) => setStudents(res.items))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this student? This can't be undone.")) return;
    await adminStudentsApi.remove(id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black">Students</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          load(search);
        }}
        className="mt-6 flex gap-2"
      >
        <input
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border-2 border-[#1a1a1a] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f5c518]"
        />
        <button
          type="submit"
          className="border-2 border-[#1a1a1a] bg-[#1a1a1a] px-4 py-2 font-bold text-white"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p className="mt-6 text-[#1a1a1a]/60">Loading…</p>
      ) : (
        <table className="mt-6 w-full border-2 border-[#1a1a1a] text-left text-sm">
          <thead className="border-b-2 border-[#1a1a1a] bg-[#f5c518]/40">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Courses</th>
              <th className="p-3">Joined</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b border-[#1a1a1a]/20">
                <td className="p-3 font-bold">{s.full_name}</td>
                <td className="p-3">{s.email}</td>
                <td className="p-3">{s.enrolled_courses_count}</td>
                <td className="p-3">
                  {new Date(s.created_at).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
