import type {
  AdminFormListItem,
  AdminStats,
  AdminStudentDetail,
  AdminStudentListItem,
  Course,
  CreateFormInput,
  FormResponseItem,
  Paginated,
} from "@/types";

const MOCK_STUDENTS: AdminStudentListItem[] = [
  {
    id: "user-1",
    full_name: "Kevin Fannex",
    email: "kfannex@gmail.com",
    phone: "+91 98765 43210",
    enrolled_courses_count: 2,
    created_at: new Date(Date.now() - 1000000000).toISOString(),
  },
  {
    id: "user-2",
    full_name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    phone: "+91 91234 56789",
    enrolled_courses_count: 1,
    created_at: new Date(Date.now() - 2000000000).toISOString(),
  },
  {
    id: "user-3",
    full_name: "Rahul Sharma",
    email: "rahul.s@example.com",
    phone: null,
    enrolled_courses_count: 0,
    created_at: new Date(Date.now() - 500000000).toISOString(),
  },
  {
    id: "user-4",
    full_name: "Emily Chen",
    email: "emily.c@example.com",
    phone: "+91 99887 76655",
    enrolled_courses_count: 3,
    created_at: new Date(Date.now() - 8000000000).toISOString(),
  }
];

export let MOCK_FORMS: AdminFormListItem[] = [
  {
    id: "form-1",
    title: "Course Feedback Survey",
    is_active: true,
    visibility: "all_students",
    responses_count: 12,
    assigned_count: 42,
    created_at: new Date().toISOString(),
  }
];

export const MOCK_FORM_DETAILS: Record<string, CreateFormInput> = {
  "form-1": {
    title: "Course Feedback Survey",
    description: "Please let us know your thoughts on the recent course.",
    visibility: "all_students",
    fields: [
      {
        label: "Your Feedback",
        field_type: "long_text",
        is_required: true,
        order_index: 0,
      }
    ]
  }
};

export const adminStudentsApi = {
  list: async (params: { search?: string; page?: number; limit?: number } = {}) => {
    return {
      total: MOCK_STUDENTS.length,
      page: params.page || 1,
      limit: params.limit || 10,
      items: MOCK_STUDENTS,
    } as Paginated<AdminStudentListItem>;
  },

  getById: async (id: string) => {
    const s = MOCK_STUDENTS.find(x => x.id === id);
    return {
      id,
      full_name: s ? s.full_name : "Mock Student",
      email: s ? s.email : "mock@example.com",
      phone: s ? s.phone : null,
      enrollments: [
        { course_title: "Data Analytics", status: "active" as const }
      ],
      bookings: [],
      created_at: s ? s.created_at : new Date().toISOString(),
    } as AdminStudentDetail;
  },

  update: async (id: string, patch: Partial<{ full_name: string; phone: string }>) => {
    const s = MOCK_STUDENTS.find(x => x.id === id);
    if (s) {
      if (patch.full_name) s.full_name = patch.full_name;
      if (patch.phone !== undefined) s.phone = patch.phone;
    }
    return adminStudentsApi.getById(id);
  },

  remove: async (id: string) => {
    const idx = MOCK_STUDENTS.findIndex(x => x.id === id);
    if (idx > -1) MOCK_STUDENTS.splice(idx, 1);
    return { success: true };
  },
};

export const adminCoursesApi = {
  create: async (input: Omit<Course, "id">) => {
    return {
      id: "mock-course-id",
      ...input,
    } as Course;
  },

  update: async (id: string, input: Omit<Course, "id">) => {
    return {
      id,
      ...input,
    } as Course;
  },

  remove: async (id: string) => {
    return { success: true };
  },
};

export const adminFormsApi = {
  list: async () => {
    return { forms: MOCK_FORMS };
  },

  create: async (input: CreateFormInput) => {
    const newForm: AdminFormListItem = {
      id: "form-" + Date.now(),
      title: input.title,
      is_active: true,
      visibility: input.visibility,
      responses_count: 0,
      assigned_count: input.visibility === "all_students" ? MOCK_STUDENTS.length : 0,
      created_at: new Date().toISOString(),
    };
    MOCK_FORMS.unshift(newForm);
    MOCK_FORM_DETAILS[newForm.id] = input;
    return { id: newForm.id, ...input };
  },

  update: async (id: string, input: CreateFormInput) => {
    const form = MOCK_FORMS.find(f => f.id === id);
    if (form) {
      form.title = input.title;
      form.visibility = input.visibility;
    }
    MOCK_FORM_DETAILS[id] = input;
    return { id, ...input };
  },

  remove: async (id: string) => {
    const idx = MOCK_FORMS.findIndex(f => f.id === id);
    if (idx > -1) {
      MOCK_FORMS.splice(idx, 1);
      delete MOCK_FORM_DETAILS[id];
    }
    return { success: true };
  },

  grantAccess: async (id: string, payload: { student_ids?: string[]; all_students?: boolean }) => {
    const form = MOCK_FORMS.find(f => f.id === id);
    let granted = 0;
    if (form) {
      if (payload.all_students) {
        form.visibility = "all_students";
        form.assigned_count = MOCK_STUDENTS.length;
        granted = MOCK_STUDENTS.length;
      } else if (payload.student_ids) {
        form.assigned_count += payload.student_ids.length;
        granted = payload.student_ids.length;
      }
    }
    return { granted };
  },

  revokeAccess: async (id: string, student_ids: string[]) => {
    const form = MOCK_FORMS.find(f => f.id === id);
    if (form) {
      form.assigned_count = Math.max(0, form.assigned_count - student_ids.length);
    }
    return { revoked: student_ids.length };
  },

  responses: async (id: string) => {
    return { responses: [] as FormResponseItem[] };
  },
};

export const adminStatsApi = {
  get: async () => {
    return {
      total_students: MOCK_STUDENTS.length,
      total_courses: 5,
      total_enrollments: 12,
      pending_bookings: 3,
      open_enquiries: 7,
      active_forms: MOCK_FORMS.length,
    } as AdminStats;
  },
};
