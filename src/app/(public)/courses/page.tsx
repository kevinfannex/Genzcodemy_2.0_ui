import { coursesApi } from "@/lib/api/courses";
import Link from "next/link";
import CoursesHero from "@/components/courses/CoursesHero";
import FeeComparisonTable from "@/components/courses/FeeComparisonTable";
import CareerLaunchpad from "@/components/courses/CareerLaunchpad";
import RealQuestionFAQ from "@/components/courses/RealQuestionFAQ";
import WhyOnline from "@/components/courses/WhyOnline";
import CompareOptions from "@/components/courses/CourseValueComparison";
import CoursePrice from "@/components/courses/CoursePrice";
import SavingsCalculator from "@/components/courses/SavingsCalculator";
import type { Course } from "@/types";

const FALLBACK_COURSES: Course[] = [
  {
    id: "data-analytics",
    slug: "data-analytics",
    title: "Data Analyst + Gen AI",
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
    description: "FastAPI, React, Postgres � ship a real product end to end.",
    tools: ["HTML / CSS", "JavaScript", "ReactJS", "Python", "FastAPI", "PostgreSQL", "OpenAI API", "Claude API", "NextJS", "GraphQL"],
    duration_weeks: 12,
    price: 20000,
    priceMYR: 1500,
    is_published: true,
  },
];

export default async function CoursesPage() {
  let courses: Course[] = [];

  try {
    const res = await coursesApi.list();
    courses = res.courses;
  } catch {
    // Fallback to static courses on error
  }

  const displayCourses = courses.length > 0 ? courses : FALLBACK_COURSES;

  return (
    <>
      {/* 1. Hero with sticky sub-nav */}
      <CoursesHero courses={displayCourses.map((c) => ({ slug: c.slug, title: c.title }))} />
      <div className="flex justify-center pt-12 pb-4">
        <h2 className="inline-block border-2 border-[#1a1a1a] bg-[#8993f4] px-8 py-3 text-3xl font-black uppercase text-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] md:text-4xl">
          Available Courses
        </h2>
      </div>

      {/* 2. Course card grid (anchored for sub-nav scroll) */}
      <section className="border-b-2 border-[#1a1a1a] bg-white px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2">
            {displayCourses.map((course) => (
              <div
                key={course.id}
                id={`course-${course.slug}`}
                className="scroll-mt-24 group relative"
              >
                {/* Decorative background shadow block */}
                <div className="absolute inset-0 translate-x-[8px] translate-y-[8px] bg-[#1a1a1a] transition-transform group-hover:translate-x-[4px] group-hover:translate-y-[4px]"></div>

                <Link
                  href={`/courses/${course.slug}`}
                  className="relative flex flex-col h-full border-2 border-[#1a1a1a] bg-white p-8 transition-transform group-hover:translate-x-[4px] group-hover:translate-y-[4px]"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="inline-block border-2 border-[#1a1a1a] bg-[#f5c518] px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest shadow-[2px_2px_0px_#1a1a1a]">
                      {course.is_published ? " Enroll now" : "Coming soon"}
                    </span>
                    <span className="font-mono text-xs uppercase text-[#1a1a1a]/40 font-bold mt-1">
                      {course.duration_weeks} weeks
                    </span>
                  </div>

                  <h2 className="mb-4 text-3xl font-black md:text-4xl">{course.title}</h2>
                  <p className="mb-8 text-lg font-medium leading-relaxed text-[#1a1a1a]/70 flex-grow">{course.description}</p>

                  <div className="mb-8 flex flex-wrap gap-2">
                    {course.tools.map((t) => (
                      <span
                        key={t}
                        className="border-2 border-[#1a1a1a]/10 bg-gray-50 px-3 py-1 font-mono text-xs font-bold text-[#1a1a1a]/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t-2 border-[#1a1a1a]/10 pt-6">
                    <p className="font-mono text-lg font-bold">
                      <CoursePrice priceINR={course.price} priceMYR={course.priceMYR} />
                    </p>
                    <span className="flex items-center gap-2 font-bold text-[#1a1a1a] transition-colors">
                      View details
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Fee comparison table (only when 2+ published courses) */}
      <div id="fees" className="scroll-mt-20">
        <FeeComparisonTable courses={displayCourses} />
      </div>

      {/* Why Online section */}
      <WhyOnline />

      {/* Savings Calculator section */}
      <SavingsCalculator />

      {/* Compare the options */}
      <CompareOptions />

      {/* 4. Career launchpad  always shown */}
      <CareerLaunchpad />

      {/* 5. FAQ */}
      <RealQuestionFAQ />
    </>
  );
}
