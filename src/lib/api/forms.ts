import type { FormAnswers, FormDetail, FormSummary } from "@/types";
import { MOCK_FORMS } from "./admin";

export const formsApi = {
  myForms: async () => {
    // Map admin forms to student form summaries
    // Real API would filter by assigned student ID or "all_students"
    const studentForms = MOCK_FORMS.filter(f => f.is_active).map(f => ({
      id: f.id,
      title: f.title,
      description: "Please complete this form.",
      is_submitted: false,
      created_at: f.created_at
    } as FormSummary));
    
    return { forms: studentForms };
  },

  getById: async (id: string) => {
    const adminForm = MOCK_FORMS.find(f => f.id === id);
    return {
      id,
      title: adminForm ? adminForm.title : "Mock Form",
      description: "Please complete this form.",
      fields: [
        {
          id: "field-1",
          label: "Your Feedback",
          field_type: "long_text",
          options: [],
          is_required: true,
          order_index: 0
        }
      ],
    } as FormDetail;
  },

  submit: async (id: string, answers: FormAnswers) => {
    // Increment response count in mock state
    const adminForm = MOCK_FORMS.find(f => f.id === id);
    if (adminForm) {
      adminForm.responses_count += 1;
    }
    
    return {
      id: "mock-response-123",
      submitted_at: new Date().toISOString(),
    };
  },
};
