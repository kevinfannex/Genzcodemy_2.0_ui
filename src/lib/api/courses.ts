import type { Course, Enrollment } from "@/types";

const MOCK_COURSES: Course[] = [
  {
    id: "data-analytics",
    slug: "data-analytics",
    title: "Data Analytics",
    description: "SQL, Python, Pandas, Power BI  from raw data to decisions.",
    tools: ["Microsoft Excel", "SQL", "Power BI", "Power Query", "DAX"],
    duration_weeks: 12,
    price: 15000,
    priceMYR: 1000,
    is_published: true,
  },
  {
    id: "python-full-stack",
    slug: "python-full-stack",
    title: "Python Full Stack + Gen AI",
    description: "FastAPI, React, Postgres   ship a real product end to end.",
    tools: ["HTML / CSS", "JavaScript", "ReactJS", "Python", "FastAPI", "PostgreSQL", "OpenAI API", "Claude API", "NextJS", "GraphQL"],
    duration_weeks: 12,
    price: 20000,
    priceMYR: 1500,
    is_published: true,
  },
];

export const coursesApi = {
  list: async () => {
    return { courses: MOCK_COURSES };
  },

  getBySlug: async (slug: string) => {
    const course = MOCK_COURSES.find((c) => c.slug === slug);
    if (!course) throw new Error("Course not found");
    return course;
  },

  myEnrollments: async () => {
    return { enrollments: [] as Enrollment[] };
  },

  enroll: async (course_id: string) => {
    const course = MOCK_COURSES.find((c) => c.id === course_id);
    if (!course) throw new Error("Course not found");
    return {
      id: "mock-enrollment-id",
      course: {
        id: course.id,
        slug: course.slug,
        title: course.title,
      },
      status: "active",
      enrolled_at: new Date().toISOString(),
    } as Enrollment;
  },
};
