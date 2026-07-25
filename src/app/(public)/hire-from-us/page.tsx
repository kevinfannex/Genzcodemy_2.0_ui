import EmployerHero from "@/components/hire/EmployerHero";
import TalentPoolStats from "@/components/hire/TalentPoolStats";
import HiringProcessSteps from "@/components/hire/HiringProcessSteps";
import SkillFilterTool from "@/components/hire/SkillFilterTool";
import EmployerTestimonial from "@/components/hire/EmployerTestimonial";
import HiringEnquiryForm from "@/components/hire/HiringEnquiryForm";
import Link from "next/link";

export const metadata = {
  title: "Hire from Genzcodemy | Job-ready developers",
  description:
    "Hire developers and analysts who have shipped real projects. Browse our graduate pool and submit a hiring enquiry.",
};

export default function HireFromUsPage() {
  return (
    <>
      {/* 1. Employer hero + partner logo strip */}
      <EmployerHero />

      {/* 2. Animated stat strip */}
      <TalentPoolStats />

      {/* 3. How it works */}
      <HiringProcessSteps />

      {/* 4+5. Skill filter + filtered graduate showcase */}
      {/* <SkillFilterTool /> */}

      {/* 6. Employer testimonial / empty state */}
      <EmployerTestimonial />

      {/* 7. Hiring enquiry form */}
      {/* <HiringEnquiryForm /> */}

      {/* Quick jump anchor */}
      <div className="border-b-2 border-[#1a1a1a] bg-[#f5f5f5] px-6 py-6 text-center">
        <p className="font-mono text-xs text-[#1a1a1a]/40">
          Not ready to hire yet?{" "}
          <Link href="/contact" className="underline hover:text-[#1a1a1a]">
            Send us a general enquiry
          </Link>{" "}
          or{" "}
          <Link href="/courses" className="underline hover:text-[#1a1a1a]">
            browse our courses
          </Link>
          .
        </p>
      </div>
    </>
  );
}