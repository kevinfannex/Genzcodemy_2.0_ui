// ── Auth & Users ────────────────────────────────────────────────
export type Role = "student" | "admin";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  role: Role;
  avatar_url: string | null;
  created_at: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
}

// ── Courses ─────────────────────────────────────────────────────
export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  tools: string[];
  duration_weeks: number;
  price: number;
  priceMYR: number;
  is_published: boolean;
}

// ── Enrollments ─────────────────────────────────────────────────
export type EnrollmentStatus = "active" | "completed" | "dropped";

export interface Enrollment {
  id: string;
  course: Pick<Course, "id" | "slug" | "title">;
  status: EnrollmentStatus;
  enrolled_at: string;
}

// ── Bookings ────────────────────────────────────────────────────
export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface ClassBooking {
  id: string;
  course: Pick<Course, "id" | "title">;
  requested_slot: string;
  status: BookingStatus;
  created_at: string;
}

// ── Enquiries ───────────────────────────────────────────────────
export interface Enquiry {
  id: string;
  status: "open" | "resolved";
  created_at: string;
}

// ── Forms ───────────────────────────────────────────────────────
export type FieldType =
  | "short_text"
  | "long_text"
  | "single_choice"
  | "multi_choice"
  | "dropdown"
  | "date"
  | "file_upload"
  | "rating";

export interface FormField {
  id: string;
  label: string;
  field_type: FieldType;
  options: string[] | null;
  is_required: boolean;
  order_index: number;
}

export interface FormSummary {
  id: string;
  title: string;
  description: string;
  is_submitted: boolean;
  created_at: string;
}

export interface FormDetail {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}

export interface FormAnswers {
  [field_id: string]: string | string[];
}

// ── Admin: students ─────────────────────────────────────────────
export interface AdminStudentListItem {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  enrolled_courses_count: number;
  created_at: string;
}

export interface AdminStudentDetail {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  enrollments: { course_title: string; status: EnrollmentStatus }[];
  bookings: { course_title: string; status: BookingStatus }[];
  created_at: string;
}

// ── Admin: forms ────────────────────────────────────────────────
export type FormVisibility = "restricted" | "all_students";

export interface AdminFormListItem {
  id: string;
  title: string;
  is_active: boolean;
  visibility: FormVisibility;
  responses_count: number;
  assigned_count: number;
  created_at: string;
}

export interface FormFieldInput {
  label: string;
  field_type: FieldType;
  options?: string[];
  is_required: boolean;
  order_index: number;
}

export interface CreateFormInput {
  title: string;
  description: string;
  visibility: FormVisibility;
  fields: FormFieldInput[];
}

export interface FormResponseItem {
  id: string;
  student: { id: string; full_name: string; email: string };
  answers: FormAnswers;
  submitted_at: string;
}

// ── Admin: dashboard stats ──────────────────────────────────────
export interface AdminStats {
  total_students: number;
  total_courses: number;
  total_enrollments: number;
  pending_bookings: number;
  open_enquiries: number;
  active_forms: number;
}

// ── API envelope ────────────────────────────────────────────────
export interface ApiError {
  error: { code: string; message: string };
}

export interface Paginated<T> {
  total: number;
  page: number;
  limit: number;
  items: T[];
}
