import EnrollButton from "@/components/courses/EnrollButton";
import { coursesApi } from "@/lib/api/courses";
import { notFound } from "next/navigation";
import CourseTimeline from "@/components/courses/CourseTimeline";
import WhatYoullBuild from "@/components/courses/WhatYoullBuild";
import MentorSpotlight from "@/components/courses/MentorSpotlight";
import CareerLaunchpad from "@/components/courses/CareerLaunchpad";
import RealQuestionFAQ from "@/components/courses/RealQuestionFAQ";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let course;
  try {
    course = await coursesApi.getBySlug(slug);
  } catch {
    notFound();
  }

  if (!course) notFound();

  return (
    <>
      {/* Course overview (Hero) */}
      <section className="relative border-b-2 border-[#1a1a1a] bg-[#faf9f5] px-6 py-20 md:py-28 overflow-hidden">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `linear-gradient(to right, #1a1a1a10 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a10 1px, transparent 1px)`,
            backgroundSize: "36px 36px"
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-12 md:gap-8 items-center">

            {/* Left side: Title and details */}
            <div className="md:col-span-7 lg:col-span-7">
              <p className="mb-5 font-mono text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/60">
                // course.{course.slug}
              </p>
              <h1 className="text-5xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                {course.title.split(' ').map((word, i, arr) => (
                  <span key={i}>
                    {i === arr.length - 1 ? (
                      <i className="not-italic text-[#f5c518] underline decoration-[#1a1a1a]/20">{word}</i>
                    ) : (
                      word
                    )}{" "}
                  </span>
                ))}
              </h1>
              <p className="mt-6 text-xl font-medium leading-relaxed text-[#1a1a1a]/75 max-w-xl">
                {course.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {course.tools.map((tool) => (
                  <span
                    key={tool}
                    className="border-2 border-[#1a1a1a] bg-white px-3.5 py-1.5 font-mono text-sm font-bold shadow-[2px_2px_0px_#1a1a1a]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side: Enrollment block */}
            <div className="md:col-span-5 lg:col-span-5 md:pl-6 lg:pl-10 mt-10 md:mt-0">
              <div className="relative group">
                {/* Decorative background shadow block */}
                <div className="absolute inset-0 translate-x-[12px] translate-y-[12px] bg-[#f5c518] border-2 border-[#1a1a1a]"></div>

                <div className="relative border-2 border-[#1a1a1a] bg-white p-8 sm:p-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="inline-block border-2 border-[#1a1a1a] bg-[#1a1a1a] text-white px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest">
                      {course.is_published ? "Enrolling now" : "Coming soon"}
                    </span>
                    <span className="font-mono text-xs font-bold uppercase text-[#1a1a1a]/50">
                      {course.duration_weeks} weeks
                    </span>
                  </div>

                  <div className="mb-2">
                    <p className="text-5xl font-black tracking-tight">
                      {`\u20b9`}{course.price.toLocaleString("en-IN")}
                    </p>
                    <p className="mt-2 font-mono text-sm font-bold text-[#1a1a1a]/60">
                      One-time payment {`\u00b7`} Full access
                    </p>
                  </div>

                  <div className="mt-8">
                    <EnrollButton courseId={course.id} courseSlug={course.slug} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CourseTimeline slug={slug} />
      <WhatYoullBuild slug={slug} />
      <MentorSpotlight slug={slug} />
      <CareerLaunchpad />
      <RealQuestionFAQ />
    </>
  );
}