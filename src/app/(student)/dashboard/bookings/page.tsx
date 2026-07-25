"use client";

import { bookingsApi } from "@/lib/api/bookings";
import type { ClassBooking } from "@/types";
import { useEffect, useState } from "react";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<ClassBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingsApi
      .myBookings()
      .then((res) => setBookings(res.bookings))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-black">My bookings</h1>

      {loading && <p className="mt-6 text-[#1a1a1a]/60">Loading…</p>}

      {!loading && bookings.length === 0 && (
        <p className="mt-6 border-2 border-dashed border-[#1a1a1a]/40 p-6 text-[#1a1a1a]/60">
          No class bookings yet.
        </p>
      )}

      <div className="mt-6 space-y-3">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="flex items-center justify-between border-2 border-[#1a1a1a] p-4"
          >
            <div>
              <p className="font-bold">{b.course.title}</p>
              <p className="text-xs text-[#1a1a1a]/50">
                Requested {new Date(b.requested_slot).toLocaleString()}
              </p>
            </div>
            <span className="border-2 border-[#1a1a1a] px-3 py-1 text-xs font-bold uppercase">
              {b.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
