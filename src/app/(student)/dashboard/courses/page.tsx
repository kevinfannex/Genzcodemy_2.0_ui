"use client";

import { coursesApi } from "@/lib/api/courses";
import type { Enrollment } from "@/types";
import { useEffect, useState } from "react";

export default function MyCoursesPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    coursesApi
      .myEnrollments()
      .then((res) => setEnrollments(res.enrollments))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-black">My courses</h1>

      {loading && <p className="mt-6 text-[#1a1a1a]/60">Loading…</p>}

      {!loading && enrollments.length === 0 && (
        <p className="mt-6 border-2 border-dashed border-[#1a1a1a]/40 p-6 text-[#1a1a1a]/60">
          You haven&apos;t enrolled in any courses yet.
        </p>
      )}

      <div className="mt-6 space-y-3">
        {enrollments.map((e) => (
          <div
            key={e.id}
            className="flex items-center justify-between border-2 border-[#1a1a1a] p-4"
          >
            <div>
              <p className="font-bold">{e.course.title}</p>
              <p className="text-xs text-[#1a1a1a]/50">
                Enrolled {new Date(e.enrolled_at).toLocaleDateString()}
              </p>
            </div>
            <span className="border-2 border-[#1a1a1a] bg-[#f5c518] px-3 py-1 text-xs font-bold uppercase">
              {e.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
