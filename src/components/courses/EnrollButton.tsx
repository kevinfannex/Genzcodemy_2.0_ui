"use client";

import { useAuthGate } from "@/components/auth/AuthGateModal";
import { coursesApi } from "@/lib/api/courses";
import { ApiRequestError } from "@/lib/api/client";
import { useState } from "react";

export default function EnrollButton({
  courseId,
  courseSlug,
}: {
  courseId: string;
  courseSlug: string;
}) {
  const { requireAuth } = useAuthGate();
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const handleEnroll = async () => {
    if (!requireAuth(`/courses/${courseSlug}`)) return;

    setStatus("loading");
    try {
      await coursesApi.enroll(courseId);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof ApiRequestError && err.code === "already_enrolled"
          ? "You're already enrolled in this course."
          : "Something went wrong. Try again in a moment."
      );
    }
  };

  if (status === "done") {
    return (
      <p className="mt-4 font-bold text-green-700">
        You&apos;re enrolled   check your dashboard.
      </p>
    );
  }

  return (
    <div className="mt-4">
      <button
        onClick={handleEnroll}
        disabled={status === "loading"}
        className="w-full border-2 border-[#1a1a1a] bg-[#1a1a1a] px-6 py-3 font-bold text-white shadow-[4px_4px_0px_#f5c518] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-60"
      >
        {status === "loading" ? "Enrolling…" : "Enroll now"}
      </button>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">{errorMsg}</p>
      )}
    </div>
  );
}
