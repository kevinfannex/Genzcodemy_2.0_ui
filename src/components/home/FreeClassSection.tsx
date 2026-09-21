"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ── Form Data Types ── */
interface FormData {
  situation: string;
  education: string;
  careerGoal: string;
  interest: string;
  experience: string;
  challenge: string;
  availability: string;
  name: string;
  email: string;
  phone: string;
  preferredContact: string;
}

/* ── Questions Configuration ── */
const QUESTIONS = [
  {
    id: "situation",
    label: "ABOUT YOU",
    question: "Where are you right now?",
    options: [
      "Student — Still in college",
      "Graduated — Looking for a job",
      "Working — Want to switch to tech",
      "Working — Looking to upskill",
    ],
  },
  {
    id: "education",
    label: "YOUR BACKGROUND",
    question: "What's your educational background?",
    options: [
      "Computer Science / IT",
      "Engineering — Non-CS",
      "Degree — Non-Engineering",
      "Currently studying",
      "Other",
    ],
  },
  {
    id: "careerGoal",
    label: "YOUR GOAL",
    question: "What are you trying to achieve?",
    options: [
      "Get my first tech job",
      "Switch to a tech career",
      "Improve my current skills",
      "Prepare for interviews",
      "Build practical projects",
    ],
  },
  {
    id: "interest",
    label: "YOUR INTEREST",
    question: "What do you want to learn?",
    options: [
      "Data Analyst + Gen AI",
      "Python Full Stack",
      "Generative AI",
      "Web Development",
      "Not sure yet",
    ],
  },
  {
    id: "experience",
    label: "YOUR EXPERIENCE",
    question: "How would you describe your current technical experience?",
    options: [
      "Complete beginner",
      "I've learned the basics",
      "I've built a few projects",
      "I'm already working in tech",
    ],
  },
  {
    id: "challenge",
    label: "YOUR CHALLENGE",
    question: "What's stopping you right now?",
    options: [
      "I don't know what to learn",
      "I lack practical experience",
      "I'm not getting interview calls",
      "I'm struggling with interviews",
      "I don't know which career path to choose",
    ],
  },
  {
    id: "availability",
    label: "YOUR TIMELINE",
    question: "When would you prefer to start?",
    options: [
      "Immediately",
      "Within a month",
      "In 1–3 months",
      "Just exploring for now",
    ],
  },
];

export default function FreeClassSection() {
  const [step, setStep] = useState(0); // 0 to 6 are questions, 7 is contact, 8 is success
  const [formData, setFormData] = useState<FormData>({
    situation: "",
    education: "",
    careerGoal: "",
    interest: "",
    experience: "",
    challenge: "",
    availability: "",
    name: "",
    email: "",
    phone: "",
    preferredContact: "WhatsApp",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const TOTAL_STEPS = QUESTIONS.length;
  // Progress up to step 7 (contact form). At step 7, progress is 100%
  const progressPercentage = Math.round((Math.min(step, TOTAL_STEPS) / TOTAL_STEPS) * 100);

  const handleOptionSelect = (questionId: keyof FormData, option: string) => {
    setFormData((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleNext = () => {
    setSubmitError("");
    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setSubmitError("");
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear specific error on change
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateContactForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Valid email is required";
    }
    if (!formData.phone.trim() || !/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      errors.phone = "Valid phone number is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateContactForm()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/free-class", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      // Success
      setStep(TOTAL_STEPS + 1); // Move to success step (8)
    } catch (err) {
      console.error(err);
      setSubmitError("Something went wrong while submitting your details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCurrentStepAnswered = () => {
    if (step < TOTAL_STEPS) {
      const currentQId = QUESTIONS[step].id as keyof FormData;
      return !!formData[currentQId];
    }
    return true;
  };

  return (
    <section className="bg-[#1a1a1a] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        
        {/* ── Intro Header ── */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#f5c518] md:text-xs">
            // BOOK YOUR FREE CLASS
          </p>
          <h2 className="text-3xl font-black leading-[1.1] tracking-tight text-white md:text-5xl">
            Register now. We&apos;d love to{" "}
            <i className="not-italic text-[#f5c518]">talk to you.</i>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base font-medium leading-relaxed text-white/60 md:text-lg">
            One honest conversation to understand where you are, what you&apos;re trying to achieve, and what you should do next.
          </p>
        </div>

        {/* ── Form Container ── */}
        <div className="border-4 border-[#1a1a1a] bg-[#faf9f5] shadow-[8px_8px_0px_#f5c518] md:shadow-[12px_12px_0px_#f5c518] transition-all relative overflow-hidden">
          
          {/* Progress Indicator (hidden on success step) */}
          {step <= TOTAL_STEPS && (
            <div className="border-b-2 border-[#1a1a1a] p-4 md:px-8 md:py-5">
              <div className="flex items-center justify-between mb-4">
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a] md:text-xs">
                  {step < TOTAL_STEPS ? `STEP ${step + 1} OF ${TOTAL_STEPS} · ${QUESTIONS[step].label}` : "ALMOST THERE"}
                </p>
                <p className="font-mono text-[10px] font-black text-[#1a1a1a] md:text-xs">
                  {progressPercentage}%
                </p>
              </div>
              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-[#1a1a1a]/10">
                <motion.div 
                  className="h-full bg-[#1a1a1a]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>
          )}

          {/* Form Content Area */}
          <div className="p-6 md:p-10 min-h-[400px] flex flex-col justify-center relative">
            <AnimatePresence mode="wait">
              
              {/* ── Questions (Steps 0-6) ── */}
              {step < TOTAL_STEPS && (
                <motion.div
                  key={`step-${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1"
                >
                  <h3 className="mb-8 text-2xl font-black leading-tight text-[#1a1a1a] md:text-3xl">
                    {QUESTIONS[step].question}
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {QUESTIONS[step].options.map((option) => {
                      const qId = QUESTIONS[step].id as keyof FormData;
                      const isSelected = formData[qId] === option;
                      return (
                        <button
                          key={option}
                          onClick={() => handleOptionSelect(qId, option)}
                          className={`flex items-start md:items-center p-4 text-left border-2 transition-all duration-200 ${
                            isSelected 
                              ? "border-[#1a1a1a] bg-[#f5c518] shadow-[4px_4px_0px_#1a1a1a] -translate-y-[2px]" 
                              : "border-[#1a1a1a]/20 bg-white hover:border-[#1a1a1a]/50 hover:bg-[#1a1a1a]/5"
                          }`}
                        >
                          {/* Custom radio button */}
                          <div className={`mt-0.5 md:mt-0 mr-4 shrink-0 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? "border-[#1a1a1a] bg-white" : "border-[#1a1a1a]/30"
                          }`}>
                            {isSelected && <div className="h-2 w-2 rounded-full bg-[#1a1a1a]" />}
                          </div>
                          <span className={`font-semibold ${isSelected ? "text-[#1a1a1a]" : "text-[#1a1a1a]/70"}`}>
                            {option}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ── Contact Details (Step 7) ── */}
              {step === TOTAL_STEPS && (
                <motion.div
                  key="step-contact"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1"
                >
                  <h3 className="mb-2 text-2xl font-black leading-tight text-[#1a1a1a] md:text-3xl">
                    Where can we reach you?
                  </h3>
                  <p className="mb-8 font-medium text-[#1a1a1a]/60">
                    Leave your details and we&apos;ll get back to you about your free class.
                  </p>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full border-2 bg-white px-4 py-3 font-semibold text-[#1a1a1a] focus:outline-none focus:ring-0 ${formErrors.name ? "border-red-500" : "border-[#1a1a1a]"}`}
                        placeholder="e.g. John Doe"
                      />
                      {formErrors.name && <p className="mt-1 text-xs font-bold text-red-500">{formErrors.name}</p>}
                    </div>

                    <div>
                      <label className="block mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full border-2 bg-white px-4 py-3 font-semibold text-[#1a1a1a] focus:outline-none focus:ring-0 ${formErrors.email ? "border-red-500" : "border-[#1a1a1a]"}`}
                        placeholder="e.g. john@example.com"
                      />
                      {formErrors.email && <p className="mt-1 text-xs font-bold text-red-500">{formErrors.email}</p>}
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <div>
                        <label className="block mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full border-2 bg-white px-4 py-3 font-semibold text-[#1a1a1a] focus:outline-none focus:ring-0 ${formErrors.phone ? "border-red-500" : "border-[#1a1a1a]"}`}
                          placeholder="+91 98765 43210"
                        />
                        {formErrors.phone && <p className="mt-1 text-xs font-bold text-red-500">{formErrors.phone}</p>}
                      </div>
                      
                      <div>
                        <label className="block mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">Preferred Contact</label>
                        <div className="relative">
                          <select
                            name="preferredContact"
                            value={formData.preferredContact}
                            onChange={handleInputChange}
                            className="w-full appearance-none border-2 border-[#1a1a1a] bg-white px-4 py-3 font-semibold text-[#1a1a1a] focus:outline-none focus:ring-0"
                          >
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="Phone Call">Phone Call</option>
                            <option value="Email">Email</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {submitError && (
                    <div className="mt-6 border-l-4 border-red-500 bg-red-50 p-4">
                      <p className="text-sm font-bold text-red-700">{submitError}</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── Success State (Step 8) ── */}
              {step === TOTAL_STEPS + 1 && (
                <motion.div
                  key="step-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="mb-6 flex h-20 w-20 items-center justify-center border-4 border-[#1a1a1a] bg-[#f5c518]">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/50">
                    // YOU&apos;RE IN
                  </p>
                  <h3 className="mb-4 text-3xl font-black text-[#1a1a1a] md:text-5xl">
                    Thanks for registering.
                  </h3>
                  <p className="mb-10 text-base font-semibold text-[#1a1a1a]/70 md:text-lg max-w-sm">
                    We&apos;ve received your details. Someone from Genzcodemy will reach out to you shortly.
                  </p>
                  <Link 
                    href="/courses"
                    className="border-2 border-[#1a1a1a] bg-white px-8 py-4 font-black text-[#1a1a1a] transition-all hover:bg-[#1a1a1a] hover:text-white"
                  >
                    Explore our courses →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Bottom Navigation Bar ── */}
          {step <= TOTAL_STEPS && (
            <div className="flex items-center justify-between border-t-2 border-[#1a1a1a] bg-white p-4 md:px-8 md:py-5">
              <button
                onClick={handleBack}
                disabled={step === 0 || isSubmitting}
                className={`font-semibold uppercase tracking-wider text-sm transition-all flex items-center gap-2 ${
                  step === 0 || isSubmitting
                    ? "text-[#1a1a1a]/20 cursor-not-allowed"
                    : "text-[#1a1a1a]/60 hover:text-[#1a1a1a]"
                }`}
              >
                ← <span className="hidden sm:inline">Back</span>
              </button>

              {step < TOTAL_STEPS ? (
                <button
                  onClick={handleNext}
                  disabled={!isCurrentStepAnswered()}
                  className={`border-2 border-[#1a1a1a] px-6 py-2.5 text-sm font-black transition-all ${
                    !isCurrentStepAnswered()
                      ? "bg-gray-100 text-[#1a1a1a]/30 cursor-not-allowed"
                      : "bg-[#1a1a1a] text-white hover:bg-[#333] shadow-[4px_4px_0px_#f5c518]"
                  }`}
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`border-2 border-[#1a1a1a] px-8 py-3 text-sm font-black transition-all ${
                    isSubmitting
                      ? "bg-gray-100 text-[#1a1a1a]/50 cursor-not-allowed"
                      : "bg-[#f5c518] text-[#1a1a1a] hover:-translate-y-[2px] shadow-[4px_4px_0px_#1a1a1a]"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit & Book My Free Class →"}
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
