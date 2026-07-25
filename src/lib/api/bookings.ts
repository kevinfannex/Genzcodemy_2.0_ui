import type { ClassBooking, Enquiry } from "@/types";

export const bookingsApi = {
  myBookings: async () => {
    return { bookings: [] as ClassBooking[] };
  },

  create: async (course_id: string, requested_slot: string) => {
    return {
      id: "mock-booking-123",
      course: { id: course_id, title: "Mock Course Title" },
      requested_slot,
      status: "pending",
      created_at: new Date().toISOString(),
    } as ClassBooking;
  },
};

export const enquiriesApi = {
  submit: async (input: {
    name: string;
    email: string;
    phone: string;
    message: string;
    source_page: string;
    enquiry_type?: string;
  }) => {
    return {
      id: "mock-enquiry-123",
      status: "open",
      created_at: new Date().toISOString(),
    } as Enquiry;
  },
};
